import { Component, Input } from '@angular/core';
import { IEmployee } from '@interfaces/IEmployee';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.css',
})
export class EmployeeTableComponent {
  @Input() data: IEmployee[] = [];

  onEdit(emp: IEmployee): void {
    console.log('Edit: ', emp);
  }

  onDelete(emp: IEmployee): void {
    console.log('Delete: ', emp);
  }
}
