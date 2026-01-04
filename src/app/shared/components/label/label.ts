import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-label',
  imports: [CommonModule],
  template: ` <label [for]="id()">
    @if (required()) {
      {{ label() }} <span class="text-(--p-inputtext-invalid-border-color)">*</span>:
    } @else {
      {{ label() }}:
    }
  </label>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Label {
  label = input.required<string>();
  id = input<string>();
  required = input<boolean>();
}
