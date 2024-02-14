import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
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

@NgModule({
  declarations: [
    AppComponent,
    DepartmentComponent,
    EmployeeComponent,
    ProjectComponent,
    HomeComponent,
    EmployeeModalComponent,
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
    ToastrModule.forRoot({ progressBar: true, timeOut: 2000 }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
