import { ChangeDetectionStrategy, Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService, ToastMessageOptions } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastCloseEvent, ToastModule, ToastPositionType } from 'primeng/toast';

@Component({
  selector: 'app-toast',
  imports: [CommonModule, ButtonModule, ToastModule],
  templateUrl: './toast.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toast implements OnInit {
  readonly progress = signal<Record<string, number>>({});
  readonly timers = signal<Record<string, any>>({});
  readonly icon = signal<Record<string, string>>({});
  readonly position = signal<ToastPositionType>('top-right');

  private readonly _messageService$ = inject(MessageService);

  constructor() {
    this._messageService$.messageObserver.subscribe({
      next: (message: ToastMessageOptions | ToastMessageOptions[]) => {
        if (Array.isArray(message)) return message;
        let icon = 'pi-check-circle';
        if (message.severity === 'info') icon = 'pi-info-circle';
        if (message.severity === 'warn') icon = 'pi-exclamation-triangle';
        if (message.severity === 'error') icon = 'pi-times-circle';
        this.icon.update((p) => ({ ...p, [message.id]: icon }));

        if (message.sticky == true) return;
        const life = message.life || 3000;
        this.progress.update((p) => ({ ...p, [message.id]: 100 }));
        this.startTimer(message.id, life, 100);
        return message;
      },
    });
  }

  ngOnInit(): void {
    this.onResize();
  }

  @HostListener('window:resize')
  onResize() {
    const width = window.innerWidth;
    if (width < 480) this.position.set('top-center');
    else this.position.set('top-right');
  }

  startTimer(id: string, life: number, percent: number) {
    const interval = 50;
    const step = percent / (life / interval);

    this.timers.update((t) => {
      t[id] = setInterval(() => {
        const progressMessage = this.progress()[id] || 0;
        this.progress.update((p) => ({ ...p, [id]: Math.max(0, Number((progressMessage - step).toFixed(2))) }));
        if (this.progress()[id] <= 0 || isNaN(this.progress()[id])) this.clear(id);
      }, interval);
      return t;
    });
  }

  onclose(event: ToastCloseEvent) {
    const id = event.message.id;
    this.clear(id);
  }

  onPause(message: ToastMessageOptions) {
    if (Array.isArray(message)) return;
    clearInterval(this.timers()[message.id]);
  }

  onResume(message: ToastMessageOptions) {
    if (Array.isArray(message)) return;
    this.startTimer(message.id, message.life!, this.progress()[message.id!]);
  }

  private clear(id: string) {
    clearInterval(this.timers()[id]);
    this.timers.update((t) => {
      delete t[id];
      return t;
    });
    this.progress.update((p) => {
      delete p[id];
      return p;
    });
  }
}
