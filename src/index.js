import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import Titan from 'titan-core'
import ApplicationProvider from './ApplicationProvider'

ReactDOM.render(
  <App>
    <Titan app={ApplicationProvider} />
  </App>, document.getElementById('root'))
registerServiceWorker()
