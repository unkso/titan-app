# Configuration
Titan sets its default configuration inside of `titan-core/config.default.json`. You can override configuration options using your own config file.

- [Single config file](#single-config)
- [Single config file](#multiple-config)
- [Accessing config from a component](#access-from-component)

## Single config file
<a id="single-config"></a>

```json
// config.default.json
{
  "api": {
    "baseUrl": "http://localhost:8000"
  }
}
```

```json
// config.prod.json
{
  "api": {
    "baseUrl": "http://mytitanapp.com"
  }
}
```

```javascript
//...
import config from './config/config.prod.json'

ReactDOM.render(
  <Titan app={applicationProvider} config={config} />,
  document.getElementById('root')
)

// ....
```

## Multiple config files
<a id="multiple-config"></a>
Titan makes no assumptions about your application's environment. If you have `config.dev.json` for development and `config.prod.json` for production, it'll be up to you to implement the logic that determines which config to load into Titan.

```javascript
//...
import devConfig from './config/config.dev.json'
import prodConfig from './config/config.prod.json'

let config
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  config = devConfig
} else {
  config = prodConfig
}

ReactDOM.render(
  <Titan config={config} />,
  document.getElementById('root')
)

// ....
```

## Accessing config from a component
<a id="access-from-component"></a>
Titan provides a higher-order component called `WithConfig`, which will inject the application's configuration into your component through a `titanConfig` prop.

```jsx harmony
import React from 'react'
import WithConfig from 'titan-core/components/WithConfig'

class MyComponent extends React.Component {
    render () {
      const config = this.props.titanConfig
      
      if (config.get('api.baseUrl') === 'http://localhost') {
        return (<p>You are working in development mode.</p>)
      }

      return (<p>You are working in production mode.</p>)
    }
}

export default WithConfig(MyComponent)
```