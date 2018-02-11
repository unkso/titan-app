import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import Titan from 'titan-core'
import applicationProvider from './applicationProvider'
import devConfig from './config/config.dev'
import prodConfig from './config/config.prod'

let config
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  config = devConfig
} else {
  config = prodConfig
}

ReactDOM.render(
  <Titan app={applicationProvider} config={config} />,
  document.getElementById('root')
)
registerServiceWorker()
