import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeleteSuccess, Employee, EmployeeList } from 'app/model';
import { EmployeeClient } from 'app/client';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private employeeClient: EmployeeClient) {}

  findEmployees$(
    pageNumber: number,
    pageSize: number,
    departmentId: number,
    employeeFullName: string
  ): Observable<EmployeeList> {
    const employees = this.employeeClient.findEmployees$(
      pageNumber,
      pageSize,
      departmentId,
      employeeFullName
    );

    return employees;
  }

  add$(
    newEmployee: Omit<Employee, 'id' | 'department' | 'status'>
  ): Observable<Employee> {
    return this.employeeClient.add$(newEmployee);
  }

  update$(
    employee: Omit<Employee, 'department' | 'status'>
  ): Observable<Employee> {
    return this.employeeClient.update$(employee);
  }

  delete$(id: number): Observable<DeleteSuccess> {
    return this.employeeClient.delete$(id);
  }

  findById$(id: number): Observable<Employee> {
    return this.employeeClient.findById$(id);
  }

  findEmployeesByHoursInProjectMangedByDepartment$(
    departmentId: number,
    pageNumber: number,
    pageSize: number,
    numberOfHour: number
  ): Observable<EmployeeList> {
    return this.employeeClient.findEmployeesByHoursInProjectMangedByDepartment$(
      departmentId,
      pageNumber,
      pageSize,
      numberOfHour
    );
  }
}
