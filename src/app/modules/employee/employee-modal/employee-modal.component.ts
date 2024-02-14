import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Department } from 'app/model';
import {
  genderRequiredValidator,
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

  private _prevSelected: any = null;

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
    salary: [0, [Validators.max(1000000)]],
    department: [0],
    female: [''],
    male: [''],
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
        type: 'required',
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

  onRadioChange(event: any): void {
    const target = event.target;

    if (!this._prevSelected) {
      this._prevSelected = target;
      return;
    }

    this._prevSelected.checked = false;
    this._prevSelected = target;
  }

  onSubmit(): void {
    console.log('🚀 ~ addEmployeeForm:', this.addEmployeeForm);
  }

  isDirtyOrTouched(fieldName: string): boolean | undefined {
    const isDirty = this.addEmployeeForm.get(fieldName)?.dirty;
    const isTouched = this.addEmployeeForm.get(fieldName)?.touched;

    return isDirty || isTouched;
  }
}
