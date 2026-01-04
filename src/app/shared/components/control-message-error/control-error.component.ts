import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-control-error',
  template: `
    @if (text()) {
      <small class="text-(--p-inputtext-invalid-border-color)">{{ text() }}</small>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlMessageError {
  text = input.required<string>();
}
