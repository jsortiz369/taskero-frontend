import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

import { _PRIMITIVE } from './_primitive';
import { _SEMANTIC } from './_semantic';
import { _COMPONENTS } from './_components';

export const _PRESET = definePreset(Aura, {
  primitive: _PRIMITIVE,
  semantic: _SEMANTIC,
  components: _COMPONENTS,
});
