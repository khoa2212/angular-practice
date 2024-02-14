import { Component, ViewChild } from '@angular/core';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from 'app/constants';
import {
  DEFAULT_DEPARTMENT_FILTER,
  NUMBER_OF_PAGINATION,
} from 'app/constants/constants';
import { DepartmentService, EmployeeService } from 'app/service';
import { Subject, startWith, switchMap } from 'rxjs';
import { EmployeeModalComponent } from './employee-modal/employee-modal.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent {
  readonly #employeeRefetch$ = new Subject<void>();
  readonly #departmentRefetch$ = new Subject<void>();

  currentPage: number = DEFAULT_PAGE_NUMBER;
  pageSize: number = DEFAULT_PAGE_SIZE;

  numberOfPagination: number[] = NUMBER_OF_PAGINATION;

  @ViewChild('modal', { static: false }) modal!: EmployeeModalComponent;

  employeeList$ = this.#employeeRefetch$.pipe(
    startWith(true),
    switchMap(() =>
      this.employeeService.findEmployees$(
        this.currentPage,
        this.pageSize,
        DEFAULT_DEPARTMENT_FILTER
      )
    )
  );

  departmentList$ = this.#departmentRefetch$.pipe(
    startWith(true),
    switchMap(() => this.departmentService.findAll$())
  );

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService
  ) {}

  onSelectDepartment(event: any): void {
    const departmentId =
      event.target.value === 'all'
        ? DEFAULT_DEPARTMENT_FILTER
        : +event.target.value;

    this.employeeList$ = this.#employeeRefetch$.pipe(
      startWith(true),
      switchMap(() =>
        this.employeeService.findEmployees$(
          this.currentPage,
          this.pageSize,
          departmentId
        )
      )
    );
  }

  onSelectPage(page: number): void {
    this.employeeList$ = this.#employeeRefetch$.pipe(
      startWith(true),
      switchMap(() =>
        this.employeeService.findEmployees$(
          page,
          this.pageSize,
          DEFAULT_DEPARTMENT_FILTER
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
          DEFAULT_DEPARTMENT_FILTER
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
          DEFAULT_DEPARTMENT_FILTER
        )
      )
    );

    this.currentPage = page;
  }

  onShowModal(): void {
    this.modal.open();
  }
}
