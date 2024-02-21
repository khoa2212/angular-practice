import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeleteSuccess, Employee, EmployeeList } from 'app/model';
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
    departmentId: number,
    employeeFullName: string
  ): Observable<EmployeeList> {
    const employees = this.httpClient.get<EmployeeList>(
      `${ENVIRONMENT.BASE_URL}/${EMPLOYEE.FIND_WITH_PAGINATION}`,
      { params: { pageNumber, pageSize, departmentId, name: employeeFullName } }
    );

    return employees;
  }

  add$(
    newEmployee: Omit<Employee, 'id' | 'department' | 'status'>
  ): Observable<Employee> {
    const employee = this.httpClient.post<Employee>(
      `${ENVIRONMENT.BASE_URL}/${EMPLOYEE.ADD}`,
      newEmployee
    );
    return employee;
  }

  update$(
    employee: Omit<Employee, 'department' | 'status'>
  ): Observable<Employee> {
    const updatedEmployee = this.httpClient.put<Employee>(
      `${ENVIRONMENT.BASE_URL}/${EMPLOYEE.UPDATE}`,
      employee
    );
    return updatedEmployee;
  }

  delete$(id: number): Observable<DeleteSuccess> {
    const data = this.httpClient.delete<DeleteSuccess>(
      `${ENVIRONMENT.BASE_URL}/${EMPLOYEE.DELETE}`,
      { body: { id } }
    );

    return data;
  }

  findById$(id: number): Observable<Employee> {
    const data = this.httpClient.get<Employee>(
      `${ENVIRONMENT.BASE_URL}/${EMPLOYEE.FIND_BY_ID(id)}`
    );
    return data;
  }
}
