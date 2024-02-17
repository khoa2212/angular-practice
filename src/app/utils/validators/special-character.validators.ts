import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function specialCharacterValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const invalidRegex: RegExp = new RegExp(/[!@#$%^&*+=\[\]{}"|<>\\\/?]/);
      if (control.value && invalidRegex.test(control.value)) {
        return { hasSpecialCharacter: true };
      }
      return null;
    };
  }