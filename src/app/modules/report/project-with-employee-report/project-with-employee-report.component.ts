import { Component } from '@angular/core';
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  NUMBER_OF_PAGINATION,
} from 'app/constants';
import { ProjectWithEmployee, ProjectWithEmployeeList } from 'app/model';
import { AuthService, ProjectService } from 'app/service';
import { ToastrService } from 'ngx-toastr';
import { Subject, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-project-with-employee-report',
  templateUrl: './project-with-employee-report.component.html',
  styleUrl: './project-with-employee-report.component.css',
})
export class ProjectWithEmployeeReportComponent {
  readonly #projectRefetch$ = new Subject<void>();

  currentPage: number = DEFAULT_PAGE_NUMBER;
  pageSize: number = DEFAULT_PAGE_SIZE;
  numberOfPagination: number[] = NUMBER_OF_PAGINATION;
  numberOfEmployees: number = 0;
  totalHours: number = 0;
  totalSalaries: number = 0;
  projectIdsParam: string = '';
  projectIds: string[] = [];
  unSelectedProjectIds: string[] = [];
  isSelectedAll: boolean = false;
  isUnSelectedSome: boolean = false;

  projectList$ = this.#projectRefetch$.pipe(
    startWith(true),
    switchMap(() =>
      this.projectService.findProjectsWithEmployeesSalariesHours$(
        this.currentPage,
        this.pageSize,
        this.numberOfEmployees,
        this.totalHours,
        this.totalSalaries
      )
    )
  );

  constructor(
    private projectService: ProjectService,
    private toastrService: ToastrService,
    public authService: AuthService
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
          this.totalSalaries
        )
      )
    );

    this.currentPage = page;

    if (this.isSelectedAll || this.isUnSelectedSome) {
      this.projectList$.subscribe((value) => {
        value.projects.forEach((project) => {
          if (!this.unSelectedProjectIds.includes(project.id.toString())) {
            this.projectIds.push(project.id.toString());
          }
        });
      });
    }
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
          this.totalSalaries
        )
      )
    );

    this.currentPage = page;

    if (this.isSelectedAll || this.isUnSelectedSome) {
      this.projectList$.subscribe((value) => {
        value.projects.forEach((project) => {
          if (!this.unSelectedProjectIds.includes(project.id.toString())) {
            this.projectIds.push(project.id.toString());
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
    this.projectList$ = this.#projectRefetch$.pipe(
      startWith(true),
      switchMap(() =>
        this.projectService.findProjectsWithEmployeesSalariesHours$(
          page,
          this.pageSize,
          this.numberOfEmployees,
          this.totalHours,
          this.totalSalaries
        )
      )
    );

    this.currentPage = page;

    if (this.isSelectedAll || this.isUnSelectedSome) {
      this.projectList$.subscribe((value) => {
        value.projects.forEach((project) => {
          if (!this.unSelectedProjectIds.includes(project.id.toString())) {
            this.projectIds.push(project.id.toString());
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

  onExportExcel(): void {
    const setSelectedIds = new Set(this.projectIds);
    const setUnSelectedIds = new Set(this.unSelectedProjectIds);
    const selectedIds = [...setSelectedIds];
    const unSelectedIds = [...setUnSelectedIds];

    if (this.isSelectedAll) {
      this.projectIdsParam = 'all';
    }

    if (this.isUnSelectedSome) {
      this.projectIdsParam = 'notIn';

      unSelectedIds.forEach((id) => {
        this.projectIdsParam = this.projectIdsParam + `,${id}`;
      });
    }

    if (!this.isSelectedAll && !this.isUnSelectedSome) {
      this.projectIdsParam = 'in';

      selectedIds.forEach((id) => {
        this.projectIdsParam = this.projectIdsParam + `,${id}`;
      });
    }

    this.projectService
      .exportExcelProjectsWithEmployeesSalariesHours$(
        this.numberOfEmployees,
        this.totalHours,
        this.totalSalaries,
        this.projectIdsParam
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
            'projects-with-salaries-report.xlsx'
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
    this.unSelectedProjectIds = [];
    this.projectIds = [];
  }

  onCheck(event: any, projects: ProjectWithEmployee[]) {
    if (event.target.value === '0') {
      this.isSelectedAll = event.target.checked;
      this.isUnSelectedSome = false;
      this.unSelectedProjectIds = [];
      if (event.target.checked) {
        projects.forEach((project) => {
          this.projectIds.push(project.id.toString());
        });
      } else {
        this.projectIds = [];
      }
    }

    if (event.target.checked) {
      this.projectIds.push(event.target.value);
    } else {
      if (event.target.value !== '0') {
        if (this.isSelectedAll) {
          this.isUnSelectedSome = true;
          this.unSelectedProjectIds.push(event.target.value);
        }
      }
      this.projectIds = this.projectIds.filter(
        (item) => item !== event.target.value
      );
    }
  }

  isCheck(id: string): boolean {
    return this.projectIds.includes(id);
  }
}
