import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import Titan from 'titan-core'
import applicationProvider from './applicationProvider'

ReactDOM.render(
  <Titan app={applicationProvider} />,
  document.getElementById('root')
)
registerServiceWorker()
