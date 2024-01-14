import { Injectable } from '@angular/core';
import { baseApiUrl } from '../constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmployee } from '@interfaces/IEmployee';
import { httpOptions } from '../constants';

const empApi = {
  getAll: baseApiUrl + 'emp',
  add: baseApiUrl + 'emp/create',
};

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<IEmployee[]> {
    return this.httpClient.get<IEmployee[]>(empApi.getAll, httpOptions).pipe();
  }

  addEmp(emp: Omit<IEmployee, "id">): Observable<string> {
    return this.httpClient.post<string>(empApi.add, emp).pipe();
  }
}
