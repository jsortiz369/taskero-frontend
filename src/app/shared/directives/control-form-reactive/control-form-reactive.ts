import { Directive, ElementRef, inject, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { SubmitFormReactive } from '../submit-form-reactive/submit-form-reactive';
import { EMPTY, fromEvent, merge, shareReplay, Subject, takeUntil } from 'rxjs';

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

  constructor() {}

  ngOnInit(): void {
    merge(this.submit$, this.focusoutEvent$, this.ngControl.statusChanges!)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        console.log(this.ngControl);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
