import {CONFIG_LOAD, CONFIG_RELOAD} from '../constants/config';
import {TerfyActions} from '../terfy';
import {configOptions} from '../config';

export function loadConfig(config: configOptions): TerfyActions {
  return {
    type: CONFIG_LOAD,
    config
  };
}

export function reloadConfig(config: configOptions): TerfyActions {
  const now = Date.now();
  return {
    type: CONFIG_RELOAD,
    config,
    now
  };
}
