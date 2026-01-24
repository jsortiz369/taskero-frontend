import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of, switchMap, timer } from 'rxjs';
import { ZodError } from 'zod';

import { Auth } from '../services';
import { ResponseRegisterConflict } from '../models/register';

export const existUsername = (authService: Auth): AsyncValidatorFn => {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return timer(500).pipe(
      switchMap(() =>
        authService.registerConflictUsername(control.value).pipe(
          map((response: ResponseRegisterConflict) => {
            return response.exist ? { usernameExists: 'Ya existe un usuario con este nombre de usuario.' } : null;
          }),
          catchError((error: HttpErrorResponse | ZodError) => {
            if (!(error instanceof HttpErrorResponse)) error.issues.forEach((issue) => console.log(issue.message));
            return of({ usernameExists: 'No se pudo validar el nombre de usuario.' });
          }),
        ),
      ),
    );
  };
};

export const existEmail = (authService: Auth): AsyncValidatorFn => {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return timer(500).pipe(
      switchMap(() =>
        authService.registerConflictEmail(control.value).pipe(
          map((response: ResponseRegisterConflict) => {
            return response.exist ? { emailExists: 'Ya existe un usuario con este correo.' } : null;
          }),
          catchError((error: HttpErrorResponse | ZodError) => {
            if (!(error instanceof HttpErrorResponse)) error.issues.forEach((issue) => console.log(issue.message));
            return of({ emailExists: 'No se pudo validar el correo.' });
          }),
        ),
      ),
    );
  };
};

export const existPhone = (authService: Auth): AsyncValidatorFn => {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return timer(500).pipe(
      switchMap(() => {
        const phone = control.value.replace(/[^0-9]+/g, '');
        return authService.registerConflictPhone(phone).pipe(
          map((response: ResponseRegisterConflict) => {
            return response.exist ? { phoneExists: 'Ya existe un usuario con este teléfono.' } : null;
          }),
          catchError((error: HttpErrorResponse | ZodError) => {
            if (!(error instanceof HttpErrorResponse)) error.issues.forEach((issue) => console.log(issue.message));
            return of({ phoneExists: 'No se pudo validar el teléfono' });
          }),
        );
      }),
    );
  };
};

export const matchPassword = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('passwordConfirm')?.value;

    if (password !== confirmPassword && password.length > 0 && confirmPassword.length > 0) {
      control.get('passwordConfirm')?.setErrors({ passwordNotMatch: 'Las contraseña no coinciden' });
    }
    return null;
  };
};
