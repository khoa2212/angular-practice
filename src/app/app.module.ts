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
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrivateRouterComponent } from './private-router/private-router.component';
import { ForbiddenPageComponent } from './forbidden-page/forbidden-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeePageComponent,
    ErrorPageComponent,
    DepartmentsPageComponent,
    EmployeeTableComponent,
    PrivateRouterComponent,
    ForbiddenPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
