import { Component } from '@angular/core';
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  NUMBER_OF_PAGINATION,
} from 'app/constants';
import { Employee, EmployeeList } from 'app/model';
import { AuthService, EmployeeService } from 'app/service';
import { ToastrService } from 'ngx-toastr';
import { Subject, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-employee-with-hours-report',
  templateUrl: './employee-with-hours-report.component.html',
  styleUrl: './employee-with-hours-report.component.css',
})
export class EmployeeWithHoursReportComponent {
  readonly #employeeRefetch$ = new Subject<void>();

  currentPage: number = DEFAULT_PAGE_NUMBER;
  pageSize: number = DEFAULT_PAGE_SIZE;
  numberOfPagination: number[] = NUMBER_OF_PAGINATION;
  departmentId: number = 0;
  numberOfHour: number = 0;
  employeeIdsParam: string = '';
  employeeIds: string[] = [];
  unSelectedEmployeeIds: string[] = [];
  isSelectedAll: boolean = false;
  isUnSelectedSome: boolean = false;
  employeeIdsShowMore: Set<Number> = new Set<Number>();

  employeeList$ = this.#employeeRefetch$.pipe(
    startWith(true),
    switchMap(() =>
      this.employeeService.findEmployeesByHoursInProjectMangedByDepartment$(
        this.departmentId,
        this.currentPage,
        this.pageSize,
        this.numberOfHour
      )
    )
  );

  constructor(
    private employeeService: EmployeeService,
    private toastrService: ToastrService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.chooseNumberOfPagination();
  }

  chooseNumberOfPagination(): void {
    this.employeeList$.subscribe((value) => {
      if (NUMBER_OF_PAGINATION.length >= value.lastPage) {
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

  onSelectPage(page: number): void {
    this.employeeList$ = this.#employeeRefetch$.pipe(
      startWith(true),
      switchMap(() =>
        this.employeeService.findEmployeesByHoursInProjectMangedByDepartment$(
          this.departmentId,
          page,
          this.pageSize,
          this.numberOfHour
        )
      )
    );

    this.currentPage = page;

    if (this.isSelectedAll || this.isUnSelectedSome) {
      this.employeeList$.subscribe((value) => {
        value.employees.forEach((Employee) => {
          if (!this.unSelectedEmployeeIds.includes(Employee.id.toString())) {
            this.employeeIds.push(Employee.id.toString());
          }
        });
      });
    }
  }

  onNext(EmployeeList: EmployeeList): void {
    if (this.disableNext(EmployeeList)) {
      return;
    }

    const page = this.currentPage + 1;
    this.employeeList$ = this.#employeeRefetch$.pipe(
      startWith(true),
      switchMap(() =>
        this.employeeService.findEmployeesByHoursInProjectMangedByDepartment$(
          this.departmentId,
          page,
          this.pageSize,
          this.numberOfHour
        )
      )
    );

    this.currentPage = page;

    if (this.isSelectedAll || this.isUnSelectedSome) {
      this.employeeList$.subscribe((value) => {
        value.employees.forEach((Employee) => {
          if (!this.unSelectedEmployeeIds.includes(Employee.id.toString())) {
            this.employeeIds.push(Employee.id.toString());
          }
        });
      });
    }
  }

  onPrev(): void {
    if (this.disablePrev()) {
      return;
    }

    const page = this.currentPage - 1;
    this.employeeList$ = this.#employeeRefetch$.pipe(
      startWith(true),
      switchMap(() =>
        this.employeeService.findEmployeesByHoursInProjectMangedByDepartment$(
          this.departmentId,
          page,
          this.pageSize,
          this.numberOfHour
        )
      )
    );

    this.currentPage = page;

    if (this.isSelectedAll || this.isUnSelectedSome) {
      this.employeeList$.subscribe((value) => {
        value.employees.forEach((employee) => {
          if (!this.unSelectedEmployeeIds.includes(employee.id.toString())) {
            this.employeeIds.push(employee.id.toString());
          }
        });
      });
    }
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

  onShowMore(id: number) {
    if (!this.employeeIdsShowMore.has(id)) {
      this.employeeIdsShowMore.add(id);
    } else {
      this.employeeIdsShowMore.delete(id);
    }
  }

  onExportExcel(): void {
    const setSelectedIds = new Set(this.employeeIds);
    const setUnSelectedIds = new Set(this.unSelectedEmployeeIds);
    const selectedIds = [...setSelectedIds];
    const unSelectedIds = [...setUnSelectedIds];

    if (this.isSelectedAll) {
      this.employeeIdsParam = 'all';
    }

    if (this.isUnSelectedSome) {
      this.employeeIdsParam = 'notIn';

      unSelectedIds.forEach((id) => {
        this.employeeIdsParam = this.employeeIdsParam + `,${id}`;
      });
    }

    if (!this.isSelectedAll && !this.isUnSelectedSome) {
      this.employeeIdsParam = 'in';

      selectedIds.forEach((id) => {
        this.employeeIdsParam = this.employeeIdsParam + `,${id}`;
      });
    }

    this.employeeService
      .exportEmployeeProfilesByHoursInProjectMangedByDepartment$(
        this.departmentId,
        this.numberOfHour,
        this.employeeIdsParam
      )
      .subscribe({
        next: (response) => {
          let dataType = response.type;
          let binaryData = [];
          binaryData.push(response);
          let downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(
            new Blob(binaryData, { type: dataType })
          );
          downloadLink.setAttribute(
            'download',
            'employee-profiles.zip'
          );
          document.body.appendChild(downloadLink);
          downloadLink.click();
        },
        error: (err) => {
          this.toastrService.error(err.message);
        },
      });

    this.isSelectedAll = false;
    this.isUnSelectedSome = false;
    this.unSelectedEmployeeIds = [];
    this.employeeIds = [];
  }

  onCheck(event: any, Employees: Employee[]) {
    if (event.target.value === '0') {
      this.isSelectedAll = event.target.checked;
      this.isUnSelectedSome = false;
      this.unSelectedEmployeeIds = [];
      if (event.target.checked) {
        Employees.forEach((Employee) => {
          this.employeeIds.push(Employee.id.toString());
        });
      } else {
        this.employeeIds = [];
      }
    }
    if (event.target.checked) {
      this.employeeIds.push(event.target.value);
    } else {
      if (event.target.value !== '0') {
        if (this.isSelectedAll) {
          this.isUnSelectedSome = true;
          this.unSelectedEmployeeIds.push(event.target.value);
        }
      }
      this.employeeIds = this.employeeIds.filter(
        (item) => item !== event.target.value
      );
    }
  }

  isCheck(id: string): boolean {
    return this.employeeIds.includes(id);
  }
}
