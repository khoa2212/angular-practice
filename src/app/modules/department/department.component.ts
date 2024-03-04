import { Component, OnInit } from '@angular/core';
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  NUMBER_OF_PAGINATION,
} from 'app/constants';
import { DepartmentList } from 'app/model';
import { DepartmentService, LoaderService } from 'app/service';
import { ToastrService } from 'ngx-toastr';
import { Subject, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrl: './department.component.css',
})
export class DepartmentComponent implements OnInit {
  readonly #departmentRefetch$ = new Subject<void>();

  currentPage: number = DEFAULT_PAGE_NUMBER;
  pageSize: number = DEFAULT_PAGE_SIZE;

  numberOfPagination: number[] = NUMBER_OF_PAGINATION;

  departmentList$ = this.#departmentRefetch$.pipe(
    startWith(true),
    switchMap(() =>
      this.departmentService.findDepartments$(this.currentPage, this.pageSize)
    )
  );

  constructor(
    private departmentService: DepartmentService,
    private toastrService: ToastrService,
    private loadingService: LoaderService
  ) {}

  ngOnInit(): void {
    this.chooseNumberOfPagination();
  }

  chooseNumberOfPagination(): void {
    this.departmentList$.subscribe((value) => {
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
    this.departmentList$ = this.#departmentRefetch$.pipe(
      startWith(true),
      switchMap(() =>
        this.departmentService.findDepartments$(page, this.pageSize)
      )
    );

    this.currentPage = page;
  }

  onNext(departmentList: DepartmentList): void {
    if (this.disableNext(departmentList)) {
      return;
    }

    const page = this.currentPage + 1;
    this.departmentList$ = this.#departmentRefetch$.pipe(
      startWith(true),
      switchMap(() =>
        this.departmentService.findDepartments$(page, this.pageSize)
      )
    );

    this.currentPage = page;
  }

  onPrev(): void {
    if (this.disablePrev()) {
      return;
    }

    const page = this.currentPage - 1;
    this.departmentList$ = this.#departmentRefetch$.pipe(
      startWith(true),
      switchMap(() =>
        this.departmentService.findDepartments$(page, this.pageSize)
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

  disableNext(departmentList: DepartmentList): boolean {
    const compareValue =
      departmentList.totalCount % this.pageSize === 0
        ? departmentList.lastPage - 1
        : departmentList.lastPage;

    if (
      this.currentPage === compareValue ||
      departmentList.lastPage === 1
    ) {
      return true;
    }

    return false;
  }

  showInfo(departmentList: DepartmentList) {
    let from = this.pageSize * (this.currentPage - 1) + 1;

    if(departmentList.totalCount === 0) {
      from = 0;
    }

    let to =
      departmentList.totalCount < this.pageSize
        ? departmentList.totalCount
        : this.pageSize * this.currentPage;

    if (to > departmentList.totalCount) {
      to = departmentList.totalCount;
    }

    return { from, to };
  }

  isLoading(): boolean {
    return this.loadingService.getLoading();
  }
}
