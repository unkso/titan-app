import { createTypography } from '@titan/lib/styles/typography';

export const Palette = {
  primary: {
    50: '#fcf2e2',
    100: '#f8dfb6',
    200: '#f4c985',
    300: '#f0b354',
    400: '#eca330',
    500: '#e9930b',
    600: '#e68b0a',
    700: '#e38008',
    800: '#df7606',
    900: '#d96403',
    A100: '#ffffff',
    A200: '#ffe1ce',
    A400: '#ffc29b',
    A700: '#ffb381',
    'contrastDefaultColor': 'dark',
  },
  background: {
    50: '#5f6980',
    100: '#495163',
    200: '#3e4554',
    300: '#333945',
    400: '#282d36',
    500: '#1d2228',
    600: '#1a1e24',
    700: '#15191e',
    800: '#111418',
    900: '#0a0c0f',
    A100: '#548dff',
    A200: '#216bff',
    A400: '#004fed',
    A700: '#0047d4',
    'contrastDefaultColor': 'light',
  }
};

/** Styles for Material-UI {@link Typography} component variants. */
export const MuiVariantTypography = {
  h1: {
    fontSize: '2.5rem',
    fontWeight: 600,
    letterSpacing: 1,
    lineHeight: '3.5rem',
    margin: 0,
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 500,
    letterSpacing: 1,
    lineHeight: '3rem',
    margin: 0,
  },
  h3: {
    fontSize: '1.5rem',
    fontWeight: 500,
    letterSpacing: 1,
    lineHeight: '2.5rem',
    margin: 0,
  },
};

/**
 * Styles for DOM elements (h1, h2, h3, etc.). Unlike
 * {@link MuiVariantTypography}, these styles include vertical margin.
 */
export const DomElementTypography = {
  h1: {
    ...MuiVariantTypography.h1,
    marginBottom: 24,
    marginTop: 8,
  },
  h2: {
    ...MuiVariantTypography.h2,
    marginBottom: 16,
    marginTop: 8,
  },
  h3: {
    ...MuiVariantTypography.h3,
    marginBottom: 8,
    marginTop: 8,
  }
};

/**
 * @deprecated
 */
export const oldDefaultTheme = {
  typography: {
    fontSize: 14,
    useNextVariants: true,
    ...createTypography({})
  },
  palette: {
    primary: {
      light: 'rgba(206,83,0,0.3)',
      main: 'rgba(206,83,0,1.0)',
      dark: '#ce5300',
      text: '#fff'
    },
    secondary: {
      light: '#9ba4b1',
      main: '#383f48',
      dark: '#383f48',
      text: '#fff'
    },
    text: {
      light: '#212121',
      main: '#212121',
      dark: '#212121'
    },
    neutral: '#ddd',
    neutralText: '#212121',
    neutralBackground: '#fff',
    primaryText: '#fff',
    secondaryText: '#fff',
    success: '#4caf50',
    warning: '#ffc107',
    danger: '#f44336',
    info: '#2196f3',
    textPrimary: '#212121',
    inverseTextPrimary: '#616161',
    inverseTextSecondary: '#f5f5f5',
    backgroundPrimary: '#f5f5f5',
    backgroundInversePrimary: '#212121',
    backgroundInverseSecondary: '#2b2b2b'
  },
  overrides: {
    MuiButton: {
      root: {
        minHeight: '30px'
      },
      label: {
        textTransform: 'none'
      },
      contained: {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: '0 0 0 3px rgba(206,83,0,0.3)'
        }
      }
    },
    MuiPaper: {
      elevation1: {
        boxShadow: `0px 1px 3px 0px rgba(0, 0, 0, 0.06),
                    0px 1px 1px 0px rgba(0, 0, 0, 0.08),
                    0px 2px 1px -1px rgba(0, 0, 0, 0.06)`
      },
      elevation2: {
        boxShadow: `0px 1px 5px 0px rgba(0, 0, 0, 0.06),
                    0px 2px 2px 0px rgba(0, 0, 0, 0.08),
                    0px 3px 1px -2px rgba(0, 0, 0, 0.06)`
      },
      elevation3: {
        boxShadow: `0px 1px 8px 0px rgba(0, 0, 0, 0.06),
                    0px 3px 4px 0px rgba(0, 0, 0, 0.08),
                    0px 3px 3px -2px rgba(0, 0, 0, 0.06)
        `
      },
      elevation4: {
        boxShadow: `0px 2px 20px -1px rgba(0, 0, 0, 0.06),
                    0px 4px 5px 0px rgba(0, 0, 0, 0.08),
                    0px 1px 10px 0px rgba(0, 0, 0, 0.06)
        `
      },
      elevation5: {
        boxShadow: `0px 3px 5px -1px rgba(0, 0, 0, 0.06),
                    0px 5px 8px 0px rgba(0, 0, 0, 0.08),
                    0px 1px 14px 0px rgba(0, 0, 0, 0.06)
        `
      },
      elevation6: {
        boxShadow: `0px 3px 5px -1px rgba(0, 0, 0, 0.06),
            0px 6px 10px 0px rgba(0, 0, 0, 0.08),
            0px 1px 18px 0px rgba(0, 0, 0, 0.06)
        `
      }
    }
  }
};
