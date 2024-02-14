import { Component } from '@angular/core';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from 'app/constants';
import {
  DEFAULT_DEPARTMENT_FILTER,
  NUMBER_OF_PAGINATION,
} from 'app/constants/constants';
import { EmployeeService } from 'app/service';
import { Subject, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent {
  readonly #employeeRefetch$ = new Subject<void>();

  currentPage: number = DEFAULT_PAGE_NUMBER;
  pageSize: number = DEFAULT_PAGE_SIZE;

  numberOfPagination: number[] = NUMBER_OF_PAGINATION;

  employeeList$ = this.#employeeRefetch$.pipe(
    startWith(true),
    switchMap(() =>
      this.employeeService.findEmployees$(
        DEFAULT_PAGE_NUMBER,
        DEFAULT_PAGE_SIZE,
        DEFAULT_DEPARTMENT_FILTER
      )
    )
  );

  constructor(private employeeService: EmployeeService) {}

  onSelectPage(page: number): void {
    this.employeeList$ = this.#employeeRefetch$.pipe(
      startWith(true),
      switchMap(() =>
        this.employeeService.findEmployees$(
          page,
          DEFAULT_PAGE_SIZE,
          DEFAULT_DEPARTMENT_FILTER
        )
      )
    );

    this.currentPage = page;
  }

  onNext(): void {

  }

  onPrev(): void {

  }
}
