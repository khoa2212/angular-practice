import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const selectBoxRequiredValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (+control.value === 0) {
      return { requiredSelection: true };
    }

    return null;
  };
};
