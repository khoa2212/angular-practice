import { Component, Input, OnInit } from '@angular/core';
import {
  DEFAULT_EMPLOYEE_FILTER,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PROJECT_FILTER,
  NUMBER_OF_PAGINATION,
} from 'app/constants';
import { AssignmentList } from 'app/model';
import { AssignmentService, AuthService } from 'app/service';
import { ToastrService } from 'ngx-toastr';
import { Subject, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-assignment-table',
  templateUrl: './assignment-table.component.html',
  styleUrl: './assignment-table.component.css',
})
export class AssignmentTableComponent implements OnInit {
  readonly #assignmentRefetch$ = new Subject<void>();

  @Input() employeeId: number = DEFAULT_EMPLOYEE_FILTER;

  @Input() projectId: number = DEFAULT_PROJECT_FILTER;

  currentPage: number = DEFAULT_PAGE_NUMBER;
  pageSize: number = DEFAULT_PAGE_SIZE;
  numberOfPagination: number[] = NUMBER_OF_PAGINATION;

  assignmentList$ = this.#assignmentRefetch$.pipe(
    startWith(true),
    switchMap(() =>
      this.assignmentService.findAssignments$(
        this.currentPage,
        this.pageSize,
        this.employeeId,
        this.projectId
      )
    )
  );

  constructor(
    private assignmentService: AssignmentService,
    private toastrService: ToastrService,
    public authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.chooseNumberOfPagination();
  }

  chooseNumberOfPagination(): void {
    this.assignmentList$.subscribe((value) => {
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
    this.assignmentList$ = this.#assignmentRefetch$.pipe(
      startWith(true),
      switchMap(() =>
        this.assignmentService.findAssignments$(
          page,
          this.pageSize,
          this.employeeId,
          this.projectId
        )
      )
    );

    this.currentPage = page;
  }

  onNext(assignmentList: AssignmentList): void {
    if (this.disableNext(assignmentList)) {
      return;
    }

    const page = this.currentPage + 1;
    this.assignmentList$ = this.#assignmentRefetch$.pipe(
      startWith(true),
      switchMap(() =>
        this.assignmentService.findAssignments$(
          page,
          this.pageSize,
          this.employeeId,
          this.projectId
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
    this.assignmentList$ = this.#assignmentRefetch$.pipe(
      startWith(true),
      switchMap(() =>
        this.assignmentService.findAssignments$(
          page,
          this.pageSize,
          this.employeeId,
          this.projectId
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

  disableNext(assignmentList: AssignmentList): boolean {
    const compareValue =
      assignmentList.totalCount % this.pageSize === 0
        ? assignmentList.lastPage - 1
        : assignmentList.lastPage;

    if (this.currentPage === compareValue || assignmentList.lastPage === 1) {
      return true;
    }

    return false;
  }

  showInfo(assignmentList: AssignmentList) {
    let from = this.pageSize * (this.currentPage - 1) + 1;

    if (assignmentList.totalCount === 0) {
      from = 0;
    }

    let to =
      assignmentList.totalCount < this.pageSize
        ? assignmentList.totalCount
        : this.pageSize * this.currentPage;

    if (to > assignmentList.totalCount) {
      to = assignmentList.totalCount;
    }

    return { from, to };
  }
}
