import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'app/employee-page/employee.service';

@Component({
  selector: 'app-departments-page',
  templateUrl: './departments-page.component.html',
  styleUrl: './departments-page.component.css',
})
export class DepartmentsPageComponent implements OnInit {
  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    console.log('🚀 ~ employee:', this.employeeService.employee);
  }
}
