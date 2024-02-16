import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EMPLOYEE_MAX_SALARY } from 'app/constants';
import { Department, Employee, Gender } from 'app/model';
;
import {
  noWhitespaceValidator,
  selectBoxRequiredValidator,
  specialCharacterValidator,
} from 'app/utils/validators';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrl: './employee-modal.component.css',
})
export class EmployeeModalComponent {
  @ViewChild('employeeModal', { static: false })
  modal!: ElementRef;

  @Input() departments: Department[] | null = [];

  @Output() addEmployee = new EventEmitter<
    Omit<Employee, 'id' | 'department' | 'status'>
  >();

  addEmployeeForm = this.formBuilder.group({
    firstName: [
      '',
      [
        Validators.required,
        noWhitespaceValidator(),
        specialCharacterValidator(),
      ],
    ],
    lastName: [
      '',
      [
        Validators.required,
        noWhitespaceValidator(),
        specialCharacterValidator(),
      ],
    ],
    middleName: ['', [noWhitespaceValidator(), specialCharacterValidator()]],
    dateOfBirth: ['', [Validators.required]],
    salary: [0, [Validators.max(EMPLOYEE_MAX_SALARY)]],
    department: [0, [selectBoxRequiredValidator()]],
    gender: [Gender.FEMALE],
  });

  validateMessages = {
    firstName: [
      {
        type: 'required',
        message: 'First name is required',
      },
      {
        type: 'whiteSpaceOnly',
        message: 'Invalid first name',
      },
      {
        type: 'hasSpecialCharacter',
        message: 'Invalid first name',
      },
    ],
    lastName: [
      {
        type: 'required',
        message: 'Last name is required',
      },
      {
        type: 'whiteSpaceOnly',
        message: 'Invalid last name',
      },
      {
        type: 'hasSpecialCharacter',
        message: 'Invalid last name',
      },
    ],
    middleName: [
      {
        type: 'whiteSpaceOnly',
        message: 'Invalid middle name',
      },
      {
        type: 'hasSpecialCharacter',
        message: 'Invalid middle name',
      },
    ],
    dateOfBirth: [
      {
        type: 'required',
        message: 'Date of birth is required',
      },
    ],
    department: [
      {
        type: 'requiredSelection',
        message: 'Department is required',
      },
    ],
    salary: [
      {
        type: 'max',
        message: 'Max salary is 1000000',
      },
    ],
    gender: [
      {
        type: 'required',
        message: 'Gender is required',
      },
    ],
  };

  constructor(private formBuilder: FormBuilder) {}

  open(): void {
    this.modal.nativeElement.style.display = 'flex';
  }

  close(): void {
    this.modal.nativeElement.style.display = 'none';
  }

  onSubmit(): void {
    const newEmployee: Omit<Employee, 'id' | 'department' | 'status'> = {
      firstName: this.addEmployeeForm.controls['firstName'].value?.trim() ?? '',
      lastName: this.addEmployeeForm.controls['lastName'].value?.trim() ?? '',
      middleName:
        this.addEmployeeForm.controls['middleName'].value?.trim() ?? '',
      dateOfBirth: new Date(
        this.addEmployeeForm.controls['dateOfBirth'].value ?? '1800-01-01'
      ),
      gender: this.addEmployeeForm.controls['gender'].value ?? Gender.FEMALE,
      salary: this.addEmployeeForm.controls['salary'].value ?? 0,
      departmentId: this.addEmployeeForm.controls['department'].value ?? 1,
    };

    this.addEmployee.emit(newEmployee);
  }

  isDirtyOrTouched(fieldName: string): boolean | undefined {
    const isDirty = this.addEmployeeForm.get(fieldName)?.dirty;
    const isTouched = this.addEmployeeForm.get(fieldName)?.touched;

    return isDirty || isTouched;
  }
}
