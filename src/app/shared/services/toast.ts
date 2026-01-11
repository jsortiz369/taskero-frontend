import { inject, Injectable } from '@angular/core';
import { MessageService, ToastMessageOptions as ToastMessageOptionsPNG } from 'primeng/api';

import { generateUUIDv4 } from '../utils/uuid';

type ToastMessageOptions = Omit<ToastMessageOptionsPNG, 'severity'> & {
  severity?: 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast';
  icon?: string;
};

@Injectable({
  providedIn: 'root',
})
export class Toast {
  private readonly _messageService$ = inject(MessageService);

  toast(data: ToastMessageOptions) {
    const id = generateUUIDv4();
    data.id = !data.id ? id : data.id;
    this._messageService$.add({ ...data });
  }
}
