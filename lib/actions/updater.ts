import {UPDATE_INSTALL, UPDATE_AVAILABLE} from '../constants/updater';
import rpc from '../rpc';
import {TerfyActions} from '../terfy';

export function installUpdate(): TerfyActions {
  return {
    type: UPDATE_INSTALL,
    effect: () => {
      rpc.emit('quit and install', null);
    }
  };
}

export function updateAvailable(version: string, notes: string, releaseUrl: string, canInstall: boolean): TerfyActions {
  return {
    type: UPDATE_AVAILABLE,
    version,
    notes,
    releaseUrl,
    canInstall
  };
}
