import { providePrimeNG } from 'primeng/config';

import { _PRESET } from './_preset';
import { _TRANSLATION } from './_translation';

export const customerConfigPrimeNG = () =>
  providePrimeNG({
    inputVariant: 'filled',
    overlayAppendTo: 'self',
    zIndex: {
      modal: 1100,
      overlay: 1000,
      menu: 1000,
      tooltip: 1100,
    },
    theme: {
      preset: _PRESET,
      options: { darkModeSelector: '.app-dark' },
    },
    translation: _TRANSLATION,
    ripple: false,
  });
