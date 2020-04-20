import {Config, config} from '@titan/lib/config';

/** Returns global config context */
export function useConfig (): Config {
  return config;
}
