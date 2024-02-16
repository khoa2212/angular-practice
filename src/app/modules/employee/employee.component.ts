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
  NUMBER_OF_PAGINATION,
} from 'app/constants/constants';
import { DepartmentService, EmployeeService } from 'app/service';
import { Subject, startWith, switchMap } from 'rxjs';
import { EmployeeModalComponent } from './employee-modal/employee-modal.component';
import { Employee } from 'app/model';
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


  @ViewChild('modal', { static: false }) modal!: EmployeeModalComponent;

  employeeList$ = this.#employeeRefetch$.pipe(
    startWith(true),
    switchMap(() =>
      this.employeeService.findEmployees$(
        this.currentPage,
        this.pageSize,
        this.departmentId
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
    this.employeeList$.subscribe((value) => {
      if (this.numberOfPagination.length > value.lastPage) {
        const page =
          value.lastPage % this.pageSize ? value.lastPage - 1 : value.lastPage;
        this.numberOfPagination = Array.from({ length: page }, (_, i) => i + 1);
      }
    });
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
          this.departmentId
        )
      )
    );

    this.employeeList$.subscribe((value) => {
      if (this.numberOfPagination.length > value.lastPage) {
        const page =
          value.lastPage % this.pageSize === 0
            ? value.lastPage - 1
            : value.lastPage;
        this.numberOfPagination = Array.from({ length: page }, (_, i) => i + 1);
      }
      else {
        this.numberOfPagination = NUMBER_OF_PAGINATION;
      }
    });
  }

  onSelectPage(page: number): void {
    this.employeeList$ = this.#employeeRefetch$.pipe(
      startWith(true),
      switchMap(() =>
        this.employeeService.findEmployees$(
          page,
          this.pageSize,
          this.departmentId
        )
      )
    );

    this.currentPage = page;
  }

  onNext(): void {
    const page = this.currentPage + 1;
    this.employeeList$ = this.#employeeRefetch$.pipe(
      startWith(true),
      switchMap(() =>
        this.employeeService.findEmployees$(
          page,
          this.pageSize,
          this.departmentId
        )
      )
    );

    this.currentPage = page;
  }

  onPrev(): void {
    const page = this.currentPage - 1;
    this.employeeList$ = this.#employeeRefetch$.pipe(
      startWith(true),
      switchMap(() =>
        this.employeeService.findEmployees$(
          page,
          this.pageSize,
          this.departmentId
        )
      )
    );

    this.currentPage = page;
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

    this.employeeList$ = this.#employeeRefetch$.pipe(
      startWith(true),
      switchMap(() =>
        this.employeeService.findEmployees$(
          DEFAULT_PAGE_NUMBER,
          DEFAULT_PAGE_SIZE,
          DEFAULT_DEPARTMENT_FILTER
        )
      )
    );
  }

  onEditEmployee(employee: Omit<Employee, 'department' | 'status'>): void {
    console.log('🚀 ~ employee:', employee);
  }

  onSelectEmployee(employee: Employee): void {
    this.modal.open(employee);
  }

}
