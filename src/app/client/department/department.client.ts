import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department, EmployeeList } from 'app/model';
import { ENVIRONMENT } from 'environment/environment';
import { DEPARTMENT } from 'app/constants';

@Injectable({
  providedIn: 'root',
})
export class DepartmentClient {
  constructor(private httpClient: HttpClient) {}

  findAll$(): Observable<Department[]> {
    const departments = this.httpClient.get<Department[]>(
      `${ENVIRONMENT.BASE_URL}/${DEPARTMENT.FIND_ALL}`
    );

    return departments;
  }
}
