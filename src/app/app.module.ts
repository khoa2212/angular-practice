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
} from './modules';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './modules/home/home.component';
import { EmployeeModalComponent } from './modules/employee/employee-modal/employee-modal.component';
import { LoadingInterceptor } from './service';
import { EmployeeDetailComponent } from './modules/employee-detail/employee-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    DepartmentComponent,
    EmployeeComponent,
    ProjectComponent,
    HomeComponent,
    EmployeeModalComponent,
    EmployeeDetailComponent,
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
