import { ComponentRef, Directive, ElementRef, inject, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { EMPTY, fromEvent, merge, Subject, take, takeUntil, withLatestFrom } from 'rxjs';

import { SubmitFormReactive } from '../submit-form-reactive/submit-form-reactive';
import { ControlMessageError } from '../../components/control-message-error/control-message-error';

@Directive({
  selector: '[formControl], [formControlName]',
})
export class ControlFormReactive implements OnInit, OnDestroy {
  private readonly ngControl = inject(NgControl);
  private readonly form = inject(SubmitFormReactive, { optional: true });
  private readonly destroy$ = new Subject<void>();
  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly vcr = inject(ViewContainerRef);
  private readonly submit$ = this.form ? this.form.submit$ : EMPTY;
  private readonly focusoutEvent$ = fromEvent(this.elementRef.nativeElement, 'focusout');

  // datepicker

  private componentRef!: ComponentRef<ControlMessageError>;

  constructor() {}

  ngOnInit(): void {
    merge(this.submit$, this.focusoutEvent$, this.ngControl.statusChanges!)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.validatorsErrors());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private validatorsErrors() {
    const messageError = this.ControlErros();

    if (!this.componentRef) this.componentRef = this.vcr.createComponent(ControlMessageError);
    this.componentRef.setInput('text', messageError);

    const parentElement: HTMLElement | null = this.elementRef.nativeElement;
    const elementRef = parentElement.tagName !== 'INPUT' ? parentElement.querySelector('input') : parentElement;

    // append element message
    let appendNode: ParentNode | null | undefined = null;
    const float = parentElement.parentElement?.classList.contains('p-floatlabel');
    if (float) {
      const group = parentElement.parentElement;
      if (group?.classList.contains('p-inputgroup')) appendNode = group.parentNode?.parentNode;
      else appendNode = group?.parentNode;
    } else {
      appendNode = parentElement.parentNode;
    }

    const otp = parentElement.tagName === 'P-INPUTOTP';
    if (messageError) {
      if (otp) {
        parentElement.querySelectorAll('input').forEach((input) => {
          input.classList.add('ng-invalid', 'ng-touched', 'ng-dirty');
        });
      } else {
        elementRef?.classList.add('ng-invalid', 'ng-touched', 'ng-dirty');
      }

      if (appendNode) appendNode.appendChild(this.componentRef.location.nativeElement);
      return;
    }

    if (otp) {
      parentElement.querySelectorAll('input').forEach((input) => {
        input.classList.remove('ng-invalid');
      });
    } else {
      elementRef?.classList.remove('ng-invalid');
    }

    const elementError = String(this.componentRef.location.nativeElement.tagName).toLowerCase();
    const existElementError = appendNode?.querySelector(elementError);

    if (existElementError && existElementError.parentNode === appendNode) {
      if (appendNode) appendNode.removeChild(existElementError);
    }
  }

  private ControlErros(): string | null {
    if (!this.ngControl.dirty && !this.ngControl.touched) return null;

    const controlErros = this.ngControl.errors ?? {};
    const [key, value] = Object.entries(controlErros)[0] ?? [null, null];
    if (!value) return null;

    if (key === 'required') return this.messageRequired(value);
    if (key === 'pattern') return this.messagePattern(value);
    if (key === 'minlength') return this.messageMinlength(value);
    if (key === 'maxlength') return this.messageMaxlength(value);
    if (key === 'email') return this.messageEmail(value);
    return value;
  }

  private messageRequired(message: string | boolean): string {
    if (['true', true].includes(message)) return 'Campo requerido';
    return String(message);
  }

  private messagePattern(message: string | { actualValue: string; requiredPattern: string }): string {
    if (typeof message !== 'string') return 'El valor ingresado no es válido';
    return message;
  }

  private messageMinlength(message: string | { requiredLength: number; actualLength: number }) {
    if (typeof message !== 'string') return `Debe ser mínimo ${message.requiredLength} caracteres`;
    return message;
  }

  private messageMaxlength(message: string | { requiredLength: number; actualLength: number }) {
    if (typeof message !== 'string') return `Debe ser máximo ${message.requiredLength} caracteres`;
    return message;
  }

  private messageEmail(message: string | boolean): string {
    if (['true', true].includes(message)) return 'Correo electrónico no válido';
    return String(message);
  }
}
