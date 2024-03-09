import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project, ProjectList, ProjectWithEmployeeList } from 'app/model';
import { ENVIRONMENT } from 'environment/environment';
import { PROJECT } from 'app/constants';

@Injectable({
  providedIn: 'root',
})
export class ProjectClient {
  constructor(private httpClient: HttpClient) {}

  findProjects$(
    pageNumber: number,
    pageSize: number,
    departmentId: number
  ): Observable<ProjectList> {
    const projects = this.httpClient.get<ProjectList>(
      `${ENVIRONMENT.BASE_URL}/${PROJECT.FIND_WITH_PAGINATION}`,
      { params: { pageNumber, pageSize, departmentId } }
    );

    return projects;
  }

  findById$(id: number): Observable<Project> {
    const data = this.httpClient.get<Project>(
      `${ENVIRONMENT.BASE_URL}/${PROJECT.FIND_BY_ID(id)}`
    );
    return data;
  }

  findAll$(): Observable<Project[]> {
    const departments = this.httpClient.get<Project[]>(
      `${ENVIRONMENT.BASE_URL}/${PROJECT.FIND_ALL}`
    );

    return departments;
  }

  findProjectsWithEmployeesSalariesHours$(
    pageNumber: number,
    pageSize: number,
    numberOfEmployees: number,
    totalHours: number,
    totalSalaries: number
  ): Observable<ProjectWithEmployeeList> {
    const projects = this.httpClient.get<ProjectWithEmployeeList>(
      `${ENVIRONMENT.BASE_URL}/${PROJECT.WITH_EMPLOYEE}`,
      {
        params: {
          pageNumber,
          pageSize,
          numberOfEmployees,
          totalHours,
          totalSalaries,
        },
      }
    );

    return projects;
  }
}
