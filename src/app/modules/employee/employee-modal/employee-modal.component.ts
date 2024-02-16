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

  @Output() editEmployee = new EventEmitter<
    Omit<Employee, 'department' | 'status'>
  >();

  selectedEmployee: Employee | null = null;

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

  open(employee: Employee | null): void {
    this.selectedEmployee = employee;

    if (this.selectedEmployee) {
      this.addEmployeeForm.controls.firstName.setValue(
        this.selectedEmployee.firstName ?? ''
      );
      this.addEmployeeForm.controls.lastName.setValue(
        this.selectedEmployee.lastName ?? ''
      );
      this.addEmployeeForm.controls.middleName.setValue(
        this.selectedEmployee.middleName ?? ''
      );
      this.addEmployeeForm.controls.dateOfBirth.setValue(
        this.selectedEmployee.dateOfBirth.toString() ?? ''
      );
      this.addEmployeeForm.controls.gender.setValue(
        this.selectedEmployee.gender ?? Gender.FEMALE
      );
      this.addEmployeeForm.controls.salary.setValue(
        this.selectedEmployee.salary ?? 0
      );
      this.addEmployeeForm.controls.department.setValue(
        this.selectedEmployee.department.id ?? 0
      );
    } else {
      this.addEmployeeForm.reset({
        firstName: '',
        lastName: '',
        middleName: '',
        dateOfBirth: '',
        gender: Gender.FEMALE,
        salary: 0,
        department: 0,
      });
    }

    this.modal.nativeElement.style.display = 'flex';
  }

  close(): void {
    this.modal.nativeElement.style.display = 'none';
  }

  onSubmit(): void {
    const data = this.addEmployeeForm.getRawValue();

    if (!this.selectedEmployee) {
      const newEmployee: Omit<Employee, 'id' | 'department' | 'status'> = {
        firstName: data.firstName?.trim() ?? '',
        lastName: data.lastName?.trim() ?? '',
        middleName: data.middleName?.trim() ?? '',
        dateOfBirth: new Date(data.dateOfBirth ?? '1800-01-01'),
        gender: data.gender ?? Gender.FEMALE,
        salary: data.salary ?? 0,
        departmentId: data.department ?? 1,
      };

      this.addEmployee.emit(newEmployee);
    } else {
      const employee: Omit<Employee, 'department' | 'status'> = {
        id: this.selectedEmployee.id,
        firstName: data.firstName?.trim() ?? '',
        lastName: data.lastName?.trim() ?? '',
        middleName: data.middleName?.trim() ?? '',
        dateOfBirth: new Date(data.dateOfBirth ?? '1800-01-01'),
        gender: data.gender ?? Gender.FEMALE,
        salary: data.salary ?? 0,
        departmentId: data.department ?? 1,
      };

      this.editEmployee.emit(employee);
    }
  }

  isDirtyOrTouched(fieldName: string): boolean | undefined {
    const isDirty = this.addEmployeeForm.get(fieldName)?.dirty;
    const isTouched = this.addEmployeeForm.get(fieldName)?.touched;

    return isDirty || isTouched;
  }
}
