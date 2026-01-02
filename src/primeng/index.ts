import { providePrimeNG } from 'primeng/config';
import { preset } from './theme';

export const customerConfigPrimeNG = () =>
  providePrimeNG({
    inputVariant: 'filled',
    overlayAppendTo: 'body',
    zIndex: {
      modal: 1100,
      overlay: 1000,
      menu: 1000,
      tooltip: 1100,
    },
    theme: { preset, options: { darkModeSelector: '.app-dark' } },
  });
