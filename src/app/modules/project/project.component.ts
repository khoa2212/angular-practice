import { Component, OnInit } from '@angular/core';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE, NUMBER_OF_PAGINATION } from 'app/constants';
import { DEFAULT_DEPARTMENT_FILTER } from 'app/constants/constants';
import { ProjectList } from 'app/model';
import { AuthService, DepartmentService, LoaderService, ProjectService } from 'app/service';
import { ToastrService } from 'ngx-toastr';
import { Subject, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {

  readonly #projectRefetch$ = new Subject<void>();
  readonly #departmentRefetch$ = new Subject<void>();

  currentPage: number = DEFAULT_PAGE_NUMBER;
  pageSize: number = DEFAULT_PAGE_SIZE;

  numberOfPagination: number[] = NUMBER_OF_PAGINATION;

  departmentId: number = DEFAULT_DEPARTMENT_FILTER;

  projectList$ = this.#projectRefetch$.pipe(
    startWith(true),
    switchMap(() =>
      this.projectService.findProjects$(
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
    private projectService: ProjectService,
    private departmentService: DepartmentService,
    private toastrService: ToastrService,
    private loadingService: LoaderService,
    public authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.chooseNumberOfPagination();
  }

  chooseNumberOfPagination(): void {
    this.projectList$.subscribe((value) => {
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

  onSelectDepartment(event: any): void {
    this.currentPage = 1;

    this.departmentId =
      event.target.value === 0
        ? DEFAULT_DEPARTMENT_FILTER
        : +event.target.value;

    this.projectList$ = this.#projectRefetch$.pipe(
      startWith(true),
      switchMap(() =>
        this.projectService.findProjects$(
          this.currentPage,
          this.pageSize,
          this.departmentId
        )
      )
    );

    this.chooseNumberOfPagination();
  }

  onSelectPage(page: number): void {
    this.projectList$ = this.#projectRefetch$.pipe(
      startWith(true),
      switchMap(() =>
        this.projectService.findProjects$(
          page,
          this.pageSize,
          this.departmentId
        )
      )
    );

    this.currentPage = page;
  }

  onNext(projectList: ProjectList): void {
    
    if(this.disableNext(projectList)) {
      return;
    }
    
    const page = this.currentPage + 1;
    this.projectList$ = this.#projectRefetch$.pipe(
      startWith(true),
      switchMap(() =>
        this.projectService.findProjects$(
          page,
          this.pageSize,
          this.departmentId
        )
      )
    );

    this.currentPage = page;
  }

  onPrev(): void {

    if(this.disablePrev()) {
      return;
    } 

    const page = this.currentPage - 1;
    this.projectList$ = this.#projectRefetch$.pipe(
      startWith(true),
      switchMap(() =>
        this.projectService.findProjects$(
          page,
          this.pageSize,
          this.departmentId
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

  disableNext(projectList: ProjectList): boolean {
    const compareValue =
    projectList.totalCount % this.pageSize === 0
        ? projectList.lastPage - 1
        : projectList.lastPage;

    if (this.currentPage === compareValue || projectList.lastPage === 1) {
      return true;
    }

    return false;
  }

  showInfo(projectList: ProjectList) {
    let from = this.pageSize * (this.currentPage - 1) + 1;

    if(projectList.totalCount === 0) {
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

  
  isLoading(): boolean {
    return this.loadingService.getLoading();
  }
}
