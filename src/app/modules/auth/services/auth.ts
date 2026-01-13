import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, map, Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { RegisterForm, ResponseRegisterExist } from '../models/register';
import { registerShema, registerValidatorsSchema } from '../schemas/register.schemas';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly _http$ = inject(HttpClient);
  private readonly environment = environment;

  constructor() {}

  registerConflictUsername(username: string): Observable<ResponseRegisterExist> {
    return this._http$.get<ResponseRegisterExist>(`${this.environment.urlBase}/auth/register/conflict/username?value=${username}`).pipe(
      delay(environment.timeRequest),
      map((res: ResponseRegisterExist) => registerValidatorsSchema.parse(res)),
    );
  }

  registerConflictEmail(email: string): Observable<ResponseRegisterExist> {
    return this._http$.get<ResponseRegisterExist>(`${this.environment.urlBase}/auth/register/conflict/email?value=${email}`).pipe(
      delay(environment.timeRequest),
      map((res: ResponseRegisterExist) => registerValidatorsSchema.parse(res)),
    );
  }

  registerConflictPhone(phone: string): Observable<ResponseRegisterExist> {
    return this._http$.get<ResponseRegisterExist>(`${this.environment.urlBase}/auth/register/conflict/phone?value=${phone}`).pipe(
      delay(environment.timeRequest),
      map((res: ResponseRegisterExist) => registerValidatorsSchema.parse(res)),
    );
  }

  register(register: RegisterForm): Observable<any> {
    return this._http$.post(`${this.environment.urlBase}/auth/register`, register).pipe(
      delay(environment.timeRequest),
      map((res) => registerShema.parse(res)),
    );
  }
}
