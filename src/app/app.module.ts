import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';

import { SubmitFormReactive } from './shared/directives/submit-form-reactive/submit-form-reactive';
import { ControlFormReactive } from './shared/directives/control-form-reactive/control-form-reactive';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule, SubmitFormReactive, ControlFormReactive, InputTextModule, FloatLabelModule],
  exports: [CommonModule, ReactiveFormsModule, RouterModule, SubmitFormReactive, ControlFormReactive, InputTextModule, FloatLabelModule],
})
export class AppModule {}
