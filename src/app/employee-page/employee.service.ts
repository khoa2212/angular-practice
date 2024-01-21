import { Injectable } from '@angular/core';
import { baseApiUrl } from '../constants';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { IEmployee } from '@interfaces/IEmployee';
import { httpOptions } from '../constants';
import { Router } from '@angular/router';

const empApi = {
  getAll: baseApiUrl + 'emp',
  add: baseApiUrl + 'emp/create',
};

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  employee: IEmployee | null = null;

  getAll(): Observable<IEmployee[]> {
    return this.httpClient.get<IEmployee[]>(empApi.getAll, httpOptions).pipe();
  }

  addEmp(emp: Omit<IEmployee, 'id'>) {
    // return this.httpClient.post<string>(empApi.add, emp).pipe();
    this.employee = {
      id: 1,
      dateOfBirth: new Date(),
      firstName: 'khoa',
      gender: 'male',
      lastName: 'nguyen',
      middleName: 'tuan',
      salary: 10,
      fullName: 'Nguyen Tuan Khoa',
    };
    localStorage.setItem('user', JSON.stringify(this.employee));
    this.router.navigateByUrl('/');
    return;
  }

  autoLogin() {
    const user = JSON.parse(localStorage.getItem('user') ?? '{}');
    if (user?.id) {
      this.employee = {
        id: user.id,
        dateOfBirth: user.dateOfBirth,
        firstName: user.firstName,
        gender: user.gender,
        lastName: user.lastName,
        middleName: user.middleName,
        salary: user.salary,
        fullName: user.fullName,
      };
    } else {
      this.employee = null;
    }
  }

  logout() {
    this.employee = null;
    localStorage.removeItem('user');
    this.router.navigateByUrl('/');
  }

  isAuthenticated(): boolean {
    if (this.employee) {
      return true;
    } else {
      this.router.navigateByUrl('/forbidden');
      return false;
    }
  }
}
