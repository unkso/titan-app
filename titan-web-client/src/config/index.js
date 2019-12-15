import Config from '@titan/lib/config';
import defaultConfig from '@titan/config/config.default';

const config = new Config();
config.load(defaultConfig);

/** Global app context */
export default config;
