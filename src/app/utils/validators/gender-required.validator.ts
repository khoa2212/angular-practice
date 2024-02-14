import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const genderRequiredValidator = (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const valueFemale: string = control.get('female')?.value;
      const valueMale: string = control.get('male')?.value;

      if (!valueFemale || !valueMale) {
        return { requiredGender: true };
      }

      return null;
    };
  };
