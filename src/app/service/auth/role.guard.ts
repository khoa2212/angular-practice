import { inject } from '@angular/core';
import { CanMatchFn, Route, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const roleGuard: CanMatchFn = (route: Route) => {
  const data: any = route.data;

  const isMatch = inject(AuthService).hasRole(data.expectedRoles);

  if (isMatch) {
    return true;
  }

  inject(Router).navigateByUrl('/forbidden');
  return false;
};
