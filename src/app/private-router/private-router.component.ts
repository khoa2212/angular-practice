import { Component } from '@angular/core';
import { EmployeeService } from 'app/employee-page/employee.service';

@Component({
  selector: 'app-private-router',
  templateUrl: './private-router.component.html',
  styleUrl: './private-router.component.css'
})
export class PrivateRouterComponent {
  constructor(private employeeService: EmployeeService){

  }
  onLogout() {
    this.employeeService.logout();
  }
}
