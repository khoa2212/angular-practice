import { Component, OnChanges, OnInit } from '@angular/core';
import { EmployeeService } from './employee-page/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private employeeService: EmployeeService) {}

  isAuth: boolean = false;

  ngOnInit(): void {
    this.employeeService.autoLogin();
  }

  ngDoCheck(): void {
    this.isAuth = this.employeeService.employee !== null;
  }
}
