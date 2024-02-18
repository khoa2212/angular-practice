import { Component, Input, OnInit } from '@angular/core';
import { DEFAULT_EMPLOYEE_FILTER, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE, NUMBER_OF_PAGINATION } from 'app/constants';
import { RelativeList } from 'app/model';
import { RelativeService } from 'app/service';
import { ToastrService } from 'ngx-toastr';
import { Subject, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-relative-table',
  templateUrl: './relative-table.component.html',
  styleUrl: './relative-table.component.css'
})
export class RelativeTableComponent implements OnInit {
  readonly #relativeRefetch$ = new Subject<void>();

  @Input() employeeId: number = DEFAULT_EMPLOYEE_FILTER;

  currentPage: number = DEFAULT_PAGE_NUMBER;
  pageSize: number = DEFAULT_PAGE_SIZE;
  numberOfPagination: number[] = NUMBER_OF_PAGINATION;

  relativeList$ = this.#relativeRefetch$.pipe(
    startWith(true),
    switchMap(() =>
      this.relativeService.findRelatives$(
        this.currentPage,
        this.pageSize,
        this.employeeId,
      )
    )
  );

  constructor(
    private relativeService: RelativeService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.chooseNumberOfPagination();
  }

  chooseNumberOfPagination(): void {
    this.relativeList$.subscribe((value) => {
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
    this.relativeList$ = this.#relativeRefetch$.pipe(
      startWith(true),
      switchMap(() =>
        this.relativeService.findRelatives$(
          page,
          this.pageSize,
          this.employeeId,
        )
      )
    );

    this.currentPage = page;
  }

  onNext(relativeList: RelativeList): void {
    if (this.disableNext(relativeList)) {
      return;
    }

    const page = this.currentPage + 1;
    this.relativeList$ = this.#relativeRefetch$.pipe(
      startWith(true),
      switchMap(() =>
        this.relativeService.findRelatives$(
          page,
          this.pageSize,
          this.employeeId,
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
    this.relativeList$ = this.#relativeRefetch$.pipe(
      startWith(true),
      switchMap(() =>
        this.relativeService.findRelatives$(
          page,
          this.pageSize,
          this.employeeId,
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

  disableNext(relativeList: RelativeList): boolean {
    const compareValue =
      relativeList.totalCount % this.pageSize === 0
        ? relativeList.lastPage - 1
        : relativeList.lastPage;

    if (this.currentPage === compareValue || relativeList.lastPage === 1) {
      return true;
    }

    return false;
  }

  showInfo(relativeList: RelativeList) {
    let from = this.pageSize * (this.currentPage - 1) + 1;

    if (relativeList.totalCount === 0) {
      from = 0;
    }

    let to =
      relativeList.totalCount < this.pageSize
        ? relativeList.totalCount
        : this.pageSize * this.currentPage;

    if (to > relativeList.totalCount) {
      to = relativeList.totalCount;
    }

    return { from, to };
  }
}
