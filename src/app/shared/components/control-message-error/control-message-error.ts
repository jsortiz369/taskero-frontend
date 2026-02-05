import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-control-error',
  template: `
    @if (text()) {
      <small class="text-(--p-inputtext-invalid-border-color) flex items-center gap-0.5 mt-1 text-xs"
        ><i class="pi pi-info-circle" style="font-size: 120%;"></i> {{ text() }}</small
      >
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlMessageError {
  text = input.required<string>();
}
