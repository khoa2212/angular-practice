import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MESSAGE } from 'app/constants';
import { SignupRequestDTO } from 'app/model';
import { AuthService, TokenService } from 'app/service';
import {
  noWhitespaceValidator,
  passwordsMustMatchValidator,
} from 'app/utils/validators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  isShowPassword = false;

  signupForm = this.formBuilder.group(
    {
      displayName: ['', [Validators.required, noWhitespaceValidator()]],
      email: [
        '',
        [
          Validators.required,
          noWhitespaceValidator(),
          Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,10}$/),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          noWhitespaceValidator(),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/
          ),
        ],
      ],
      confirmedPassword: [
        '',
        [
          Validators.required,
          noWhitespaceValidator(),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/
          ),
        ],
      ],
    },
    { updateOn: 'blur', validators: [passwordsMustMatchValidator()] }
  );

  validateMessages = {
    displayName: [
      {
        type: 'required',
        message: 'Email is required',
      },
      {
        type: 'whiteSpaceOnly',
        message: 'Invalid display name',
      },
    ],
    email: [
      {
        type: 'required',
        message: 'Email is required',
      },
      {
        type: 'whiteSpaceOnly',
        message: 'Invalid email',
      },
      {
        type: 'pattern',
        message: 'Invalid email',
      },
    ],
    password: [
      {
        type: 'required',
        message: 'Password is required',
      },
      {
        type: 'whiteSpaceOnly',
        message: 'Invalid password',
      },
      {
        type: 'pattern',
        message: 'Stronger password',
      },
    ],
    confirmedPassword: [
      {
        type: 'required',
        message: 'Confirmed password is required',
      },
      {
        type: 'whiteSpaceOnly',
        message: 'Invalid password',
      },
      {
        type: 'pattern',
        message: 'Stronger password',
      },
      {
        type: 'passwordsMustMatch',
        message: 'passwords must match',
      },
    ],
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  onSubmit() {
    const formValue = this.signupForm.getRawValue();
    const data: SignupRequestDTO = {
      displayName: formValue.displayName ?? '',
      email: formValue.email ?? '',
      password: formValue.password ?? '',
      confirmedPassword: formValue.confirmedPassword ?? '',
    };

    this.authService.signup$(data).subscribe({
      next: (res) => {
        this.toastrService.success(MESSAGE.PLEASE_VERIFY, '', {
          disableTimeOut: true,
          progressBar: false,
        });
      },
      error: (err) => {
        this.toastrService.error(err.error.message);
      },
    });
  }

  isDirtyOrTouched(fieldName: string): boolean | undefined {
    const isDirty = this.signupForm.get(fieldName)?.dirty;
    const isTouched = this.signupForm.get(fieldName)?.touched;

    return isDirty || isTouched;
  }

  onShowPassword() {
    this.isShowPassword = !this.isShowPassword;
  }
}
