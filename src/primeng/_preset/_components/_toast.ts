import { ToastDesignTokens } from '@primeuix/themes/types/toast';

export const _TOAST: ToastDesignTokens = {
  root: {
    width: '20rem',
    borderRadius: '{content.border.radius}',
    borderWidth: '1px',
    transitionDuration: '{transition.duration}',
  },
  icon: {
    size: '1.75rem',
  },
  content: {
    padding: '0.35rem 0.25rem',
    gap: '0.25rem',
  },
  text: {
    gap: '0.5rem',
  },
  summary: {
    fontWeight: '500',
    fontSize: '1rem',
  },
  detail: {
    fontWeight: '500',
    fontSize: '0.875rem',
  },
  closeButton: {
    width: '1.15rem',
    height: '1.75rem',
    borderRadius: '50%',
    focusRing: {
      width: '{focus.ring.width}',
      style: '{focus.ring.style}',
      offset: '{focus.ring.offset}',
    },
  },
  closeIcon: {
    size: '1rem',
  },
  colorScheme: {
    light: {
      info: {
        background: '{surface.0}',
        borderColor: '{surface.200}',
        color: '{blue.400}',
        detailColor: '{surface.700}',
        shadow: '0px 4px 8px 0px color-mix(in srgb, {blue.400}, transparent 96%)',
        closeButton: {
          hoverBackground: 'none',
          focusRing: {
            color: '{blue.400}',
            shadow: 'none',
          },
        },
      },
      success: {
        background: '{surface.0}',
        borderColor: '{surface.200}',
        color: '{green.600}',
        detailColor: '{surface.700}',
        shadow: '0px 4px 8px 0px color-mix(in srgb, {green.600}, transparent 96%)',
        closeButton: {
          hoverBackground: 'none',
          focusRing: {
            color: '{green.600}',
            shadow: 'none',
          },
        },
      },
      warn: {
        background: '{surface.0}',
        borderColor: '{surface.200}',
        color: '{yellow.500}',
        detailColor: '{surface.700}',
        shadow: '0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)',
        closeButton: {
          hoverBackground: 'none',
          focusRing: {
            color: '{yellow.600}',
            shadow: 'none',
          },
        },
      },
      error: {
        background: '{surface.0}',
        borderColor: '{surface.200}',
        color: '{red.500}',
        detailColor: '{surface.700}',
        shadow: '0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)',
        closeButton: {
          hoverBackground: 'none',
          focusRing: {
            color: '{red.500}',
            shadow: 'none',
          },
        },
      },
      secondary: {
        background: '{surface.100}',
        borderColor: '{surface.200}',
        color: '{surface.600}',
        detailColor: '{surface.700}',
        shadow: '0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)',
        closeButton: {
          hoverBackground: '{surface.200}',
          focusRing: {
            color: '{surface.600}',
            shadow: 'none',
          },
        },
      },
      contrast: {
        background: '{surface.900}',
        borderColor: '{surface.950}',
        color: '{surface.50}',
        detailColor: '{surface.0}',
        shadow: '0px 4px 8px 0px color-mix(in srgb, {surface.50}, transparent 96%)',
        closeButton: {
          hoverBackground: 'none',
          focusRing: {
            color: '{surface.50}',
            shadow: 'none',
          },
        },
      },
    },
    dark: {
      info: {
        background: '{surface.950}',
        borderColor: '{surface.900}',
        color: '{blue.400}',
        detailColor: '{surface.0}',
        shadow: '0px 4px 8px 0px color-mix(in srgb, {blue.400}, transparent 96%)',
        closeButton: {
          hoverBackground: 'none',
          focusRing: {
            color: '{blue.400}',
            shadow: 'none',
          },
        },
      },
      success: {
        background: '{surface.950}',
        borderColor: '{surface.900}',
        color: '{green.600}',
        detailColor: '{surface.0}',
        shadow: '0px 4px 8px 0px color-mix(in srgb, {green.600}, transparent 96%)',
        closeButton: {
          hoverBackground: 'none',
          focusRing: {
            color: '{green.600}',
            shadow: 'none',
          },
        },
      },
      warn: {
        background: '{surface.950}',
        borderColor: '{surface.900}',
        color: '{yellow.500}',
        detailColor: '{surface.0}',
        shadow: '0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)',
        closeButton: {
          hoverBackground: 'none',
          focusRing: {
            color: '{yellow.500}',
            shadow: 'none',
          },
        },
      },
      error: {
        background: '{surface.950}',
        borderColor: '{surface.900}',
        color: '{red.500}',
        detailColor: '{surface.0}',
        shadow: '0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)',
        closeButton: {
          hoverBackground: 'none',
          focusRing: {
            color: '{red.500}',
            shadow: 'none',
          },
        },
      },
      secondary: {
        background: '{surface.950}',
        borderColor: '{surface.900}',
        color: '{surface.300}',
        detailColor: '{surface.0}',
        shadow: '0px 4px 8px 0px color-mix(in srgb, {surface.300}, transparent 96%)',
        closeButton: {
          hoverBackground: 'none',
          focusRing: {
            color: '{surface.300}',
            shadow: 'none',
          },
        },
      },
      contrast: {
        background: '{surface.0}',
        borderColor: '{surface.200}',
        color: '{surface.950}',
        detailColor: '{surface.950}',
        shadow: '0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)',
        closeButton: {
          hoverBackground: 'none',
          focusRing: {
            color: '{surface.950}',
            shadow: 'none',
          },
        },
      },
    },
  },
};
