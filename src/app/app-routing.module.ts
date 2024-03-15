import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ActivateAccountComponent,
  DepartmentComponent,
  EmployeeComponent,
  EmployeeDetailComponent,
  LoginComponent,
  ProjectComponent,
  ReportComponent,
  SignupComponent,
  UserComponent,
} from './modules';
import { HomeComponent } from './modules/home/home.component';
import { authGuard, roleGuard } from './service';
import { ForbiddenComponent, NotFoundComponent } from './shared/components';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'department',
        pathMatch: 'full',
      },
      { path: 'department', component: DepartmentComponent },
      { path: 'employee', component: EmployeeComponent },
      { path: 'project', component: ProjectComponent },
      {
        path: 'report',
        component: ReportComponent,
        canMatch: [authGuard, roleGuard],
        data: {
          expectedRoles: ['ADMIN', 'USER'],
        },
      },
      {
        path: 'employee/:id',
        component: EmployeeDetailComponent,
      },
      {
        path: 'user',
        component: UserComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
  },
  {
    path: 'verify',
    component: ActivateAccountComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
