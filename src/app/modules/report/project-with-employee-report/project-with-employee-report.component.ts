import { Component } from '@angular/core';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE, NUMBER_OF_PAGINATION } from 'app/constants';
import { ProjectWithEmployeeList } from 'app/model';
import { AuthService, ProjectService } from 'app/service';
import { ToastrService } from 'ngx-toastr';
import { Subject, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-project-with-employee-report',
  templateUrl: './project-with-employee-report.component.html',
  styleUrl: './project-with-employee-report.component.css'
})
export class ProjectWithEmployeeReportComponent {
  readonly #projectRefetch$ = new Subject<void>();

  currentPage: number = DEFAULT_PAGE_NUMBER;
  pageSize: number = DEFAULT_PAGE_SIZE;
  numberOfPagination: number[] = NUMBER_OF_PAGINATION;
  numberOfEmployees: number = 0;
  totalHours: number = 0;
  totalSalaries: number = 0;

  projectList$ = this.#projectRefetch$.pipe(
    startWith(true),
    switchMap(() =>
      this.projectService.findProjectsWithEmployeesSalariesHours$(
        this.currentPage,
        this.pageSize,
        this.numberOfEmployees,
        this.totalHours,
        this.totalSalaries,
      )
    )
  );

  constructor(
    private projectService: ProjectService,
    private toastrService: ToastrService,
    public authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.chooseNumberOfPagination();
  }

  chooseNumberOfPagination(): void {
    this.projectList$.subscribe((value) => {
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
    this.projectList$ = this.#projectRefetch$.pipe(
      startWith(true),
      switchMap(() =>
        this.projectService.findProjectsWithEmployeesSalariesHours$(
          page,
          this.pageSize,
          this.numberOfEmployees,
          this.totalHours,
          this.totalSalaries,
        )
      )
    );

    this.currentPage = page;
  }

  onNext(projectList: ProjectWithEmployeeList): void {
    if (this.disableNext(projectList)) {
      return;
    }

    const page = this.currentPage + 1;
    this.projectList$ = this.#projectRefetch$.pipe(
      startWith(true),
      switchMap(() =>
        this.projectService.findProjectsWithEmployeesSalariesHours$(
          page,
          this.pageSize,
          this.numberOfEmployees,
          this.totalHours,
          this.totalSalaries,
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
    this.projectList$ = this.#projectRefetch$.pipe(
      startWith(true),
      switchMap(() =>
        this.projectService.findProjectsWithEmployeesSalariesHours$(
          page,
          this.pageSize,
          this.numberOfEmployees,
          this.totalHours,
          this.totalSalaries,
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

  disableNext(projectList: ProjectWithEmployeeList): boolean {
    const compareValue =
      projectList.totalCount % this.pageSize === 0
        ? projectList.lastPage - 1
        : projectList.lastPage;

    if (this.currentPage === compareValue || projectList.lastPage === 1) {
      return true;
    }

    return false;
  }

  showInfo(projectList: ProjectWithEmployeeList) {
    let from = this.pageSize * (this.currentPage - 1) + 1;

    if (projectList.totalCount === 0) {
      from = 0;
    }

    let to =
      projectList.totalCount < this.pageSize
        ? projectList.totalCount
        : this.pageSize * this.currentPage;

    if (to > projectList.totalCount) {
      to = projectList.totalCount;
    }

    return { from, to };
  }
}
