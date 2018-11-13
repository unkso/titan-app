export default {
  spacing: {
    base: 8
  },
  typography: {
    fontFamily: 'Roboto',
    fontSize: 16
  },
  palette: {
    primary: {
      light: 'rgba(206,83,0,0.3)',
      main: 'rgba(206,83,0,1.0)',
      dark: '#ce5300',
      text: '#fff'
    },
    secondary: {
      light: '#383f48',
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
    success: '#43a047',
    danger: '#d32f2f',
    textPrimary: '#212121',
    inverseTextPrimary: '#616161',
    inverseTextSecondary: '#f5f5f5',
    backgroundPrimary: '#f5f5f5',
    backgroundInversePrimary: '#212121',
    backgroundInverseSecondary: '#2f2f2f'
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
    }
  }
}
