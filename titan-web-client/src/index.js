import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from 'titan/registerServiceWorker';
import { getAppContext } from 'titan/titan';
import devConfig from 'titan/config/config.dev';
import prodConfig from 'titan/config/config.prod';
import TitanApp from 'titan/components/core/TitanApp';
import titanConfig from 'titan/config';

let config;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  config = devConfig;
} else {
  config = prodConfig;
}

const app = getAppContext();
titanConfig.merge(config);

ReactDOM.render(<TitanApp context={app} />, document.getElementById('root'));
registerServiceWorker();
