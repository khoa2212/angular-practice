import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { noWhitespaceValidator } from 'app/utils/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
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

  constructor(private formBuilder: FormBuilder) {}

  onSubmit() {

  }

  isDirtyOrTouched(fieldName: string): boolean | undefined {
    const isDirty = this.loginForm.get(fieldName)?.dirty;
    const isTouched = this.loginForm.get(fieldName)?.touched;

    return isDirty || isTouched;
  }
}
