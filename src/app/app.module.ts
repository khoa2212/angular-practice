import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  DepartmentComponent,
  EmployeeComponent,
  ProjectComponent,
  LoginComponent,
  EmployeeDetailComponent,
  EmployeeModalComponent,
  HomeComponent,
  SignupComponent,
  ReportComponent,
  ProjectWithEmployeeReportComponent,
  ActivateAccountComponent,
  UserComponent,
  EmployeeWithHoursReportComponent,
} from './modules';
import { SharedModule } from './shared/shared.module';
import { AuthInterceptorService, LoadingInterceptor } from './service';

@NgModule({
  declarations: [
    AppComponent,
    DepartmentComponent,
    EmployeeComponent,
    ProjectComponent,
    HomeComponent,
    EmployeeModalComponent,
    EmployeeDetailComponent,
    LoginComponent,
    SignupComponent,
    ReportComponent,
    ProjectWithEmployeeReportComponent,
    ActivateAccountComponent,
    UserComponent,
    EmployeeWithHoursReportComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    HttpClientModule,
    ToastrModule.forRoot({ progressBar: true, timeOut: 1000 }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    {
      provide: Storage,
      useValue: localStorage,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
