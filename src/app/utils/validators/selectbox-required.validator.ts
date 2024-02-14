import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const selectBoxRequiredValidator =
  (fieldName: string) => (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      console.log('here');
      const value: number = control.get(fieldName)?.value;

      if (value === 0) {
        return { requiredSelection: true };
      }

      return null;
    };
  };
