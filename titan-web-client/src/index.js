import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from '@titan/registerServiceWorker';
import { getAppContext } from '@titan/titan';
import devConfig from '@titan/config/config.dev';
import stagingConfig from '@titan/config/config.staging';
import prodConfig from '@titan/config/config.prod';
import Titan_app from '@titan/components/core/titan_app';
import titanConfig from '@titan/config';

let config;
const env = process.env.REACT_APP_TITAN_ENV || process.env.NODE_ENV;

switch (env) {
  case 'staging':
    config = stagingConfig;
    break;
  case 'production':
    config = prodConfig;
    break;
  default:
    config = devConfig
}

const app = getAppContext();
titanConfig.merge(config);

ReactDOM.render(<Titan_app context={app} />, document.getElementById('root'));
registerServiceWorker();
