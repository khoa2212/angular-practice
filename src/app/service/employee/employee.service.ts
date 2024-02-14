import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeList } from 'app/model';
import { EmployeeClient } from 'app/client';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private employeeClient: EmployeeClient) {}

  findEmployees$(
    pageNumber: number,
    pageSize: number,
    departmentId: number
  ): Observable<EmployeeList> {
    const employees = this.employeeClient.findEmployees$(
      pageNumber,
      pageSize,
      departmentId
    );

    return employees;
  }
}
