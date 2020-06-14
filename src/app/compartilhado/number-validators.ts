import { AbstractControl, ValidatorFn } from '@angular/forms';

export class NumberValidators {

  static faixa(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
        return { faixa: true };
      }
      return null;
    };
  }
}