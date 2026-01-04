import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export class ValidatorReactive {
  static required(message?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const error = Validators.required(control);
      return error ? { required: message ? message : true } : null;
    };
  }

  static email(message?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const error = Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)(control);
      return error ? { email: message ? message : true } : null;
    };
  }

  static pattern(pattern: string | RegExp, message?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const error = Validators.pattern(pattern)(control);
      return error ? { pattern: message ? message : true } : null;
    };
  }

  static minLength(min: number, message?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const error: ValidationErrors | null = Validators.minLength(min)(control);
      return error ? { minlength: message ? message : { ...error['minlength'] } } : null;
    };
  }

  static maxLength(max: number, message?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const error = Validators.maxLength(max)(control);
      return error ? { maxlength: message ? message : { ...error['maxlength'] } } : null;
    };
  }

  static min(min: number, message?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const error = Validators.min(min)(control);
      return error ? { min: message ? message : error } : null;
    };
  }
}
