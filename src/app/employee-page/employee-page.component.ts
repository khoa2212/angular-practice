import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EmployeeService } from './employee.service';
import { IEmployee } from '@interfaces/IEmployee';
import { IEmpForm } from '@interfaces/IEmpForm';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrl: './employee-page.component.css',
})
export class EmployeePageComponent implements OnInit, OnChanges {
  data: IEmployee[] = [];

  constructor(
    private employeeService: EmployeeService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // this.getAll();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('change');
  }

  ngDoCheck(): void {
    // console.log(this.data);
    // console.log('check');
  }

  getAll() {
    this.employeeService.getAll().subscribe((res: IEmployee[]) => {
      const customRes = res
        .map((item) => {
          if (item.id % 2 === 0) {
            item.classOdd = 'active-row';
            item.isOdd = true;
          } else {
            item.classOdd = '';
            item.isOdd = false;
          }
          item.fullName = `${item.lastName} ${item.middleName} ${item.firstName}`;

          return item;
        })
        .sort((res1, res2) => res1.id - res2.id);
      this.data = customRes;
    });
  }

  onSubmit(form: IEmpForm) {
    const newEmp: Omit<IEmployee, 'id'> = {
      fullName: `${form.lastName} ${form.middleName} ${form.lastName}`,
      lastName: form.lastName,
      middleName: form.middleName,
      firstName: form.firstName,
      salary: form.salary,
      gender: form.gender,
      dateOfBirth: form.dateOfBirth,
    };

    this.employeeService.addEmp(newEmp).subscribe(
      (res: any) => {
        console.log('🚀 ~ res:', res);
      },
      (err: any) => {
        console.log('🚀 ~ err:', err);
      }
    );
    this.toastr.error('Invalid email or password');
  }
}
