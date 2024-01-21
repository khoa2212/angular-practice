// import {
//   CanActivate,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
//   Router,
//   UrlTree,
// } from '@angular/router';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { map, tap, take } from 'rxjs/operators';

import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from './employee.service';

@Injectable()
class PermissionsService {
  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}
  canActivate() {
    console.log('here');
    if (this.employeeService.isAuthenticated()) {
      return true;
    } else {
      this.router.createUrlTree(['/forbidden']);
      return false;
    }
  }
}

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  return inject(EmployeeService).isAuthenticated();
};
