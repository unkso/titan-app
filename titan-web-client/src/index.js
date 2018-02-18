import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { getTitanInstance } from 'titan-core'
import devConfig from './config/config.dev'
import prodConfig from './config/config.prod'
import './app.css'

let config
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  config = devConfig
} else {
  config = prodConfig
}

const app = getTitanInstance()
app.setConfig(config)

ReactDOM.render(app.mount(), document.getElementById('root'))
registerServiceWorker()
