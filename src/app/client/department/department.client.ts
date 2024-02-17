import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department, DepartmentList, EmployeeList } from 'app/model';
import { ENVIRONMENT } from 'environment/environment';
import { DEPARTMENT } from 'app/constants';

@Injectable({
  providedIn: 'root',
})
export class DepartmentClient {
  constructor(private httpClient: HttpClient) {}

  findDepartments$(
    pageNumber: number,
    pageSize: number,
  ): Observable<DepartmentList> {
    const departments = this.httpClient.get<DepartmentList>(
      `${ENVIRONMENT.BASE_URL}/${DEPARTMENT.FIND_WITH_PAGINATION}`,
      { params: { pageNumber, pageSize } }
    );

    return departments;
  }

  findById$(id: number): Observable<Department> {
    const department = this.httpClient.get<Department>(
      `${ENVIRONMENT.BASE_URL}/${DEPARTMENT.FIND_BY_ID(id)}`
    );

    return department;
  }

  findAll$(): Observable<Department[]> {
    const departments = this.httpClient.get<Department[]>(
      `${ENVIRONMENT.BASE_URL}/${DEPARTMENT.FIND_ALL}`
    );

    return departments;
  }
}
