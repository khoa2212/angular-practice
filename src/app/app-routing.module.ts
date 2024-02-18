import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  DepartmentComponent,
  EmployeeComponent,
  EmployeeDetailComponent,
  LoginComponent,
  ProjectComponent,
  SignupComponent,
} from './modules';
import { NotFoundComponent } from './shared/components';
import { HomeComponent } from './modules/home/home.component';

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
      { path: 'employee/:id', component: EmployeeDetailComponent },
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
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
