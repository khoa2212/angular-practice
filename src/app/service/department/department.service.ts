import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department, EmployeeList } from 'app/model';
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
}
