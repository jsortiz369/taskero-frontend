import { providePrimeNG } from 'primeng/config';

import { _PRESET } from './_preset';
import { _TRANSLATION } from './_translation';

export const customerConfigPrimeNG = () =>
  providePrimeNG({
    inputVariant: 'filled',
    overlayAppendTo: 'self',
    overlayOptions: {
      appendTo: 'body',
      mode: 'overlay',
      hideOnEscape: false,
      responsive: {
        direction: 'top-end',
      },
    },
    zIndex: {
      modal: 1100,
      overlay: 1000,
      menu: 1000,
      tooltip: 1100,
    },

    theme: {
      preset: _PRESET,
      options: { darkModeSelector: '.taskero-dark' },
    },
    translation: _TRANSLATION,
    ripple: true,
  });
