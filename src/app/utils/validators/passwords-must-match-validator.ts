import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordsMustMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value1 = control.get('password')?.value;
    const value2 = control.get('confirmedPassword')?.value;

    if (value1 !== value2) {
      control.get('confirmedPassword')?.setErrors({ passwordsMustMatch: true });
      return { passwordsMustMatch: true };
    }

    return null;
  };
}
