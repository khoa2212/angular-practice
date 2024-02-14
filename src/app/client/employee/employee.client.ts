import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeList } from 'app/model';
import { ENVIRONMENT } from 'environment/environment';
import { EMPLOYEE } from 'app/constants';

@Injectable({
  providedIn: 'root',
})
export class EmployeeClient {
  constructor(private httpClient: HttpClient) {}

  findEmployees$(
    pageNumber: number,
    pageSize: number,
    departmentId: number
  ): Observable<EmployeeList> {
    const employees = this.httpClient.get<EmployeeList>(
      `${ENVIRONMENT.BASE_URL}/${EMPLOYEE.FIND_WITH_PAGINATION}`,
      { params: { pageNumber, pageSize, departmentId } }
    );

    return employees;
  }
}
