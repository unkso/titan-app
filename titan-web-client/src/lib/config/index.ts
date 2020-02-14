import {Config} from '@titan/lib/config/config';
import devConfig from '@titan/config/config.dev.json';
import stagingConfig from '@titan/config/config.staging.json';
import prodConfig from '@titan/config/config.prod.json';
import {Environment} from '@titan/lib/config/types';

export {Config} from '@titan/lib/config/config';

let instance;
const configuredEnv = process.env.REACT_APP_TITAN_ENV || process.env.NODE_ENV;
const validEnvironments: Environment[] = [
    Environment.DEVELOPMENT,
    Environment.STAGING,
    Environment.PRODUCTION
];
const env = validEnvironments.includes(configuredEnv as Environment)
    ? configuredEnv
    : Environment.DEVELOPMENT;

switch (env) {
  case Environment.STAGING:
    instance = new Config(stagingConfig);
    break;
  case Environment.PRODUCTION:
    instance = new Config(prodConfig);
    break;
  default:
    instance = new Config(devConfig);
}

export const config = instance;
export const environment: Environment = env as Environment;
