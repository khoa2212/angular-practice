import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department, DepartmentList, EmployeeList } from 'app/model';
import { DepartmentClient } from 'app/client';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private departmentClient: DepartmentClient) {}

  findAll$(): Observable<Department[]> {
    const departments = this.departmentClient.findAll$();

    return departments;
  }

  findDepartments$(
    pageNumber: number,
    pageSize: number,
  ): Observable<DepartmentList> {
    const departments = this.departmentClient.findDepartments$(
      pageNumber,
      pageSize,
    );

    return departments;
  }

  findById$(id: number): Observable<Department> {
    return this.departmentClient.findById$(id);
  }
}
