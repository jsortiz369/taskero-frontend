import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of, switchMap, timer } from 'rxjs';
import { ZodError } from 'zod';

import { Auth } from '../services';
import { ResponseRegisterExist } from '../models/register.model';

export const existEmail = (authService: Auth): AsyncValidatorFn => {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return timer(500).pipe(
      switchMap(() =>
        authService.registerValidExistEmail(control.value).pipe(
          map((response: ResponseRegisterExist) => {
            return response.exist ? { emailExists: 'El correo ya se encuentra registrado.' } : null;
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
        const phone = control.value.replace(/[^0-9+]/g, '');
        return authService.registerValidExistPhone(phone).pipe(
          map((response: ResponseRegisterExist) => {
            return response.exist ? { phoneExists: 'El teléfono ya se encuentra registrado.' } : null;
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
