import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EMPLOYEE_MAX_SALARY, MESSAGE } from 'app/constants';
import { Department, Employee, Gender } from 'app/model';
import {
  AuthService,
  DepartmentService,
  EmployeeService,
  LoaderService,
} from 'app/service';
import {
  noWhitespaceValidator,
  selectBoxRequiredValidator,
  specialCharacterValidator,
} from 'app/utils/validators';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.css',
})
export class EmployeeDetailComponent implements OnInit {
  readonly #departmentRefetch$ = new Subject<void>();
  readonly #employeeRefetch$ = new Subject<void>();

  departmentList$ = this.#departmentRefetch$.pipe(
    startWith(true),
    switchMap(() => this.departmentService.findAll$())
  );

  employeeId: number = 1;

  employee$: Observable<Employee> = this.#employeeRefetch$.pipe(
    startWith(true),
    switchMap(() => this.employeeService.findById$(this.employeeId))
  );

  isEdit = false;
  isLoading = false;

  departmentId: number = 0;
  isShowDropDown: boolean = false;
  isDisableDropdown: boolean = true;

  editEmployeeForm = this.formBuilder.group({
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
    gender: [Gender.FEMALE, [Validators.required]],
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

  constructor(
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.markAllDisable(true);

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.employeeId = +(params.get('id') ?? '1');
    });

    this.employeeService.findById$(this.employeeId).subscribe({
      next: (res) => {
        this.resetForm(res);
      },
      error: (err) => {
        this.toastrService.error(err.error.message);
      },
    });
  }

  onEdit(employee: Employee): void {
    this.resetForm(employee);
    this.markAllDisable(false);
    this.isEdit = true;
  }

  onCancel(employee: Employee): void {
    this.resetForm(employee);
    this.markAllDisable(true);
    this.isEdit = false;
  }

  onSubmit(employee: Employee): void {
    const data = this.editEmployeeForm.getRawValue();

    const updatedEmployee: Omit<Employee, 'department' | 'status'> = {
      id: employee.id,
      firstName: data.firstName?.trim() ?? '',
      lastName: data.lastName?.trim() ?? '',
      middleName: data.middleName?.trim() ?? '',
      dateOfBirth: new Date(data.dateOfBirth ?? '1800-01-01'),
      gender: data.gender ?? Gender.FEMALE,
      salary: data.salary ?? 0,
      departmentId: data.department ?? 1,
    };

    this.employeeService.update$(updatedEmployee).subscribe({
      next: (res) => {
        this.toastrService.success(MESSAGE.UPDATE_EMPLOYEE_SUCCESS);

        this.employee$ = this.#employeeRefetch$.pipe(
          startWith(true),
          switchMap(() => this.employeeService.findById$(this.employeeId))
        );

        this.isEdit = false;
        this.markAllDisable(true);
      },
      error: (err) => {
        if (err.error?.validationErrors) {
          this.toastrService.error(err.error.validationErrors[0]);
        } else {
          this.toastrService.error(err.error.message);
        }
      },
    });
  }

  resetForm(employee: Employee): void {
    this.editEmployeeForm.controls.firstName.setValue(employee.firstName ?? '');

    this.editEmployeeForm.controls.lastName.setValue(employee.lastName ?? '');
    this.editEmployeeForm.controls.middleName.setValue(
      employee.middleName ?? ''
    );
    this.editEmployeeForm.controls.dateOfBirth.setValue(
      employee.dateOfBirth.toString() ?? ''
    );
    this.editEmployeeForm.controls.gender.setValue(
      employee.gender ?? Gender.FEMALE
    );
    this.editEmployeeForm.controls.salary.setValue(employee.salary ?? 0);
    this.editEmployeeForm.controls.department.setValue(
      employee.department.id ?? 0
    );

    this.departmentId = employee.department.id ?? 0;
  }

  isDirtyOrTouched(fieldName: string): boolean | undefined {
    const isDirty = this.editEmployeeForm.get(fieldName)?.dirty;
    const isTouched = this.editEmployeeForm.get(fieldName)?.touched;

    return isDirty || isTouched;
  }

  markAllDisable(isDisable: boolean) {
    Object.keys(this.editEmployeeForm.controls).map((key) => {
      const control =
        this.editEmployeeForm.controls[
          key as keyof typeof this.editEmployeeForm.controls
        ];

      if (isDisable) {
        this.isDisableDropdown = true;
        control.disable();
      } else {
        this.isDisableDropdown = false;
        control.enable();
      }
    });
  }

  onSelectDepartment(id: number): void {
    this.departmentId = id;

    this.editEmployeeForm.controls.department.markAsTouched();
    this.editEmployeeForm.controls.department.setValue(id);
    this.isShowDropDown = false;
  }

  onShowDepartmentName(departments: Department[]): string {
    if (this.departmentId === 0) {
      return 'All departments';
    }

    return (
      departments.find((department) => department.id === this.departmentId)
        ?.departmentName ?? ''
    );
  }

  onShowDropDown() {
    this.isShowDropDown = !this.isShowDropDown;
  }

  onBlurDropDown() {
    this.editEmployeeForm.controls.department.markAsTouched();
    setTimeout(() => {
      this.isShowDropDown = false;
    }, 200);
  }
}
