import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeePageComponent } from './employee-page/employee-page.component';
import { DepartmentsPageComponent } from './departments-page/departments-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ForbiddenPageComponent } from './forbidden-page/forbidden-page.component';
import { PrivateRouterComponent } from './private-router/private-router.component';
import { AuthGuard } from './employee-page/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'employees', component: EmployeePageComponent },
  { path: 'departments', component: DepartmentsPageComponent },
  { path: 'forbidden', component: ForbiddenPageComponent },
  {
    path: 'private-router',
    component: PrivateRouterComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
