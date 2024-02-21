import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE, MESSAGE } from 'app/constants';
import {
  DEFAULT_DEPARTMENT_FILTER,
  DEFAULT_SEARCH,
  NUMBER_OF_PAGINATION,
} from 'app/constants/constants';
import { DepartmentService, EmployeeService, LoaderService } from 'app/service';
import {
  Subject,
  startWith,
  switchMap,
  debounceTime,
  takeUntil,
  distinct,
  Observable,
  distinctUntilChanged,
} from 'rxjs';
import { EmployeeModalComponent } from './employee-modal/employee-modal.component';
import { Employee, EmployeeList } from 'app/model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit {
  readonly #employeeRefetch$ = new Subject<void>();
  readonly #departmentRefetch$ = new Subject<void>();

  currentPage: number = DEFAULT_PAGE_NUMBER;
  pageSize: number = DEFAULT_PAGE_SIZE;

  numberOfPagination: number[] = NUMBER_OF_PAGINATION;

  departmentId: number = DEFAULT_DEPARTMENT_FILTER;

  employeeFullName = DEFAULT_SEARCH;

  @ViewChild('modal', { static: false }) modal!: EmployeeModalComponent;

  employeeList$ = this.#employeeRefetch$.pipe(
    startWith(true),
    switchMap(() =>
      this.employeeService.findEmployees$(
        this.currentPage,
        this.pageSize,
        this.departmentId,
        this.employeeFullName
      )
    )
  );

  departmentList$ = this.#departmentRefetch$.pipe(
    startWith(true),
    switchMap(() => this.departmentService.findAll$())
  );

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.chooseNumberOfPagination();
  }

  chooseNumberOfPagination(): void {
    console.log(this.employeeList$);
    this.employeeList$.subscribe((value) => {
      if (NUMBER_OF_PAGINATION.length > value.lastPage) {
        const page =
          value.totalCount % this.pageSize === 0
            ? value.lastPage - 1
            : value.lastPage;
        this.numberOfPagination = Array.from({ length: page }, (_, i) => i + 1);
      } else {
        this.numberOfPagination = NUMBER_OF_PAGINATION;
      }
    });
  }

  refreshPage(): void {
    this.employeeList$ = this.#employeeRefetch$.pipe(
      startWith(true),
      switchMap(() =>
        this.employeeService.findEmployees$(
          DEFAULT_PAGE_NUMBER,
          DEFAULT_PAGE_SIZE,
          DEFAULT_DEPARTMENT_FILTER,
          DEFAULT_SEARCH
        )
      )
    );

    this.departmentId = DEFAULT_DEPARTMENT_FILTER;
    const selectBox = document.getElementById('department-selections') ?? '';
    if (selectBox instanceof HTMLSelectElement) {
      selectBox.value = '0';
    }
    this.chooseNumberOfPagination();
  }

  onSelectDepartment(event: any): void {
    this.currentPage = 1;

    this.departmentId =
      event.target.value === 0
        ? DEFAULT_DEPARTMENT_FILTER
        : +event.target.value;

    this.employeeList$ = this.#employeeRefetch$.pipe(
      startWith(true),
      switchMap(() =>
        this.employeeService.findEmployees$(
          this.currentPage,
          this.pageSize,
          this.departmentId,
          this.employeeFullName
        )
      )
    );

    this.chooseNumberOfPagination();
  }

  onSelectPage(page: number): void {
    this.employeeList$ = this.#employeeRefetch$.pipe(
      startWith(true),
      switchMap(() =>
        this.employeeService.findEmployees$(
          page,
          this.pageSize,
          this.departmentId,
          this.employeeFullName
        )
      )
    );

    this.currentPage = page;
  }

  onNext(employeeList: EmployeeList): void {
    if (this.disableNext(employeeList)) {
      return;
    }

    const page = this.currentPage + 1;
    this.employeeList$ = this.#employeeRefetch$.pipe(
      startWith(true),
      switchMap(() =>
        this.employeeService.findEmployees$(
          page,
          this.pageSize,
          this.departmentId,
          this.employeeFullName
        )
      )
    );

    this.currentPage = page;
  }

  onPrev(): void {
    if (this.disablePrev()) {
      return;
    }

    const page = this.currentPage - 1;
    this.employeeList$ = this.#employeeRefetch$.pipe(
      startWith(true),
      switchMap(() =>
        this.employeeService.findEmployees$(
          page,
          this.pageSize,
          this.departmentId,
          this.employeeFullName
        )
      )
    );

    this.currentPage = page;
  }

  disablePrev(): boolean {
    if (this.currentPage === 1) {
      return true;
    }

    return false;
  }

  disableNext(employeeList: EmployeeList): boolean {
    const compareValue =
      employeeList.totalCount % this.pageSize === 0
        ? employeeList.lastPage - 1
        : employeeList.lastPage;

    if (this.currentPage === compareValue || employeeList.lastPage === 1) {
      return true;
    }

    return false;
  }

  showInfo(employeeList: EmployeeList) {
    let from = this.pageSize * (this.currentPage - 1) + 1;

    if (employeeList.totalCount === 0) {
      from = 0;
    }

    let to =
      employeeList.totalCount < this.pageSize
        ? employeeList.totalCount
        : this.pageSize * this.currentPage;

    if (to > employeeList.totalCount) {
      to = employeeList.totalCount;
    }

    return { from, to };
  }

  onShowModal(): void {
    this.modal.open(null);
  }

  onAddEmployee(
    newEmployee: Omit<Employee, 'id' | 'department' | 'status'>
  ): void {
    this.employeeService.add$(newEmployee).subscribe({
      next: (res) => {
        this.toastrService.success(MESSAGE.ADD_EMPLOYEE_SUCCESS);
        this.modal.close();
      },
      error: (err) => {
        if (err.error?.validationErrors) {
          this.toastrService.error(err.error.validationErrors[0]);
        } else {
          this.toastrService.error(err.error.message);
        }
      },
    });

    this.refreshPage();
  }

  onEditEmployee(employee: Omit<Employee, 'department' | 'status'>): void {
    this.employeeService.update$(employee).subscribe({
      next: (res) => {
        this.toastrService.success(MESSAGE.UPDATE_EMPLOYEE_SUCCESS);
        this.modal.close();
      },
      error: (err) => {
        if (err.error?.validationErrors) {
          this.toastrService.error(err.error.validationErrors[0]);
        } else {
          this.toastrService.error(err.error.message);
        }
      },
    });

    this.refreshPage();
  }

  onSelectEmployee(employee: Employee): void {
    this.modal.open(employee);
  }

  onDeleteEmployee(id: number): void {
    this.employeeService.delete$(id).subscribe({
      next: (res) => {
        this.toastrService.success(MESSAGE.DELETE_EMPLOYEE_SUCCESS);
      },
      error: (err) => {
        if (err.error?.validationErrors) {
          this.toastrService.error(err.error.validationErrors[0]);
        } else {
          this.toastrService.error(err.error.message);
        }
      },
    });

    this.refreshPage();
  }

  timeoutId: any = 0;

  onSearch(event: any) {
    this.employeeFullName = event;

    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.employeeList$ = this.#employeeRefetch$.pipe(
        startWith(true),
        switchMap(() =>
          this.employeeService.findEmployees$(
            this.currentPage,
            this.pageSize,
            this.departmentId,
            this.employeeFullName
          )
        )
      );
    }, 1000)
  }
}
