import { createTypography } from '@titan/lib/styles/typography';

export default {
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
