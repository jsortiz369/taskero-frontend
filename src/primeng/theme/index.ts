import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

import { primitive } from './primitive';
import { semantic } from './semantic';
import { components } from './components';

export const preset = definePreset(Aura, { primitive, semantic, components });
