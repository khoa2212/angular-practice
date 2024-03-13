import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MESSAGE } from 'app/constants';
import { LoginRequestDTO, TokenType, User } from 'app/model';
import { AuthService, TokenService } from 'app/service';
import { noWhitespaceValidator } from 'app/utils/validators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isShowPassword = false;

  loginForm = this.formBuilder.group({
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
  });

  validateMessages = {
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
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  onSubmit() {
    const value = this.loginForm.getRawValue();

    const data: LoginRequestDTO = {
      email: value.email ?? '',
      password: value.password ?? '',
    };

    this.authService.login$(data).subscribe({
      next: (res) => {
        this.toastrService.success(MESSAGE.LOGIN_SUCCESS);
        this.tokenService.setToken(TokenType.ACCESS_TOKEN, res.accessToken);
        this.tokenService.setToken(TokenType.REFRESH_TOKEN, res.refreshToken);

        const user: User = { ...res };

        this.authService.setCurrentUser(user);
        this.router.navigateByUrl('/');
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

  isDirtyOrTouched(fieldName: string): boolean | undefined {
    const isDirty = this.loginForm.get(fieldName)?.dirty;
    const isTouched = this.loginForm.get(fieldName)?.touched;

    return isDirty || isTouched;
  }

  onShowPassword() {
    this.isShowPassword = !this.isShowPassword;
  }
}
