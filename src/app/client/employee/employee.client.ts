import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee, EmployeeList } from 'app/model';
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

  add$(newEmployee: Omit<Employee, "id" | "department" | "status">): Observable<Employee> {
    const employee = this.httpClient.post<Employee>(`${ENVIRONMENT.BASE_URL}/${EMPLOYEE.ADD}`, newEmployee);
    return employee;
  }
}
