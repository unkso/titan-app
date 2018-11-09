# Creating a custom theme

- [Base theme](#base-theme)
- [Overriding the base theme](#overriding-base-theme)
- [Using the theme from a component](#theme-from-component)
- [Using the theme from a helper](#theme-from-helper)


## Base theme
<a id="base-theme"></a>
The `titan-core` module contains a `defaultThemeProvider.js` file, which defines the fonts, colors, spacing, and other aspects of the application's design. This ensures that the design is consistent across all components.

```javascript
export default {
  palette: {
    primary: '#ce5300',
    success: '#43a047',
    danger: '#d32f2f',
    backgroundPrimary: '#f5f5f5',
    backgroundInversePrimary: '#212121'
  },
  typography: {
    
  },
  spacing: {
    
  }
}
```

## Overriding the base theme
<a id="overriding-base-theme"></a>
You can customize the default theme when you initialize the titan app inside of `~/src/index.js`. For example, if you would like to override the application's primary color, you can use the following:

```javascript
import { getTitanInstance } from 'titan-core'

const app = getTitanInstance()
app.setTheme({
  palette: {
    primary: "#006600"
  }
})

ReactDOM.render(app.mount(), document.getElementById('root'))
```

The primary palette color was initially `#ce5300`. The custom theme changes it to `#006600`. Note that any default theme options that are not explicitly overwritten will keep their default values as defined by the `titan-core` module.

> **Note**: You can also add your own custom theme options, which will be accessible anywhere you reference the theme.

## Using the theme from a component
<a id="theme-from-component"></a>
You can easily access the theme through the `WithTheme` component, which injects a `titanTheme` property into your component.

```jsx harmony
import React from 'react'
import WithTheme from 'titan-core/components/WithTheme'

class MyComponent extends React.Component {
    render () {
      const styles = {
        color: this.props.theme.palette.primary
      }

      return (
        <p style={styles}>Hello world</p>
      )
    }
}

export default WithTheme(MyComponent)
```

## Using the theme from a helper
<a id="theme-from-helper"></a>
If you need to access the theme from a non-component, you can access it from the titan app instance.

```javascript
import { getTitanInstance } from 'titan-core'

const app = getTitanInstance()
const primaryColor = app.getTheme().palette.primary
```
