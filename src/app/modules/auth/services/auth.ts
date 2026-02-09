import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { RegisterForm, ResponseRegister, ResponseRegisterConflict } from '../models/register';
import { registerSchema, registerConflictSchema } from '../schemas/register';
import { LoginForm, ResponseLogin } from '../models/login';
import { loginSchema, validLoginSchema } from '../schemas/login';
import { ResponseConfirm, ResponseResend } from '../models/confirm';
import { messageSchema, successSchema } from '../schemas/generality';
import { ResponseRecoverPassword } from '../models/recover-password';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly _http$ = inject(HttpClient);
  private readonly _urlBase$ = environment.urlBase;

  constructor() {}

  registerConflictUsername(username: string): Observable<ResponseRegisterConflict> {
    return this._http$
      .get<ResponseRegisterConflict>(`${this._urlBase$}/auth/register/conflict/username?value=${username}`)
      .pipe(map((res: ResponseRegisterConflict) => registerConflictSchema.parse(res)));
  }

  registerConflictEmail(email: string): Observable<ResponseRegisterConflict> {
    return this._http$
      .get<ResponseRegisterConflict>(`${this._urlBase$}/auth/register/conflict/email?value=${email}`)
      .pipe(map((res: ResponseRegisterConflict) => registerConflictSchema.parse(res)));
  }

  registerConflictPhone(phone: string): Observable<ResponseRegisterConflict> {
    return this._http$
      .get<ResponseRegisterConflict>(`${this._urlBase$}/auth/register/conflict/phone?value=${phone}`)
      .pipe(map((res: ResponseRegisterConflict) => registerConflictSchema.parse(res)));
  }

  register(register: RegisterForm): Observable<ResponseRegister> {
    return this._http$.post<ResponseRegister>(`${this._urlBase$}/auth/register`, register).pipe(map((res) => registerSchema.parse(res)));
  }

  login(login: LoginForm): Observable<ResponseLogin> {
    return this._http$.post(`${this._urlBase$}/auth/login`, login).pipe(map((res) => validLoginSchema.parse(res)));
  }

  confirmAccount(token: string): Observable<ResponseConfirm> {
    return this._http$.post(`${this._urlBase$}/auth/confirm`, { otp: token }).pipe(map((res) => loginSchema.parse(res)));
  }

  resendConfirmationToken(): Observable<ResponseResend> {
    return this._http$.post(`${this._urlBase$}/auth/resend-confirmation-token`, {}).pipe(map((res) => successSchema.parse(res)));
  }

  recoverPassword(username: string): Observable<ResponseRecoverPassword> {
    return this._http$.post(`${this._urlBase$}/auth/recover-password`, { username }).pipe(map((res) => messageSchema.parse(res)));
  }
}
