import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EmployeePageComponent } from './employee-page/employee-page.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { DepartmentsPageComponent } from './departments-page/departments-page.component';
import { EmployeeTableComponent } from './employee-table/employee-table.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, EmployeePageComponent, ErrorPageComponent, DepartmentsPageComponent, EmployeeTableComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
