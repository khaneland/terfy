import rpc from '../rpc';
import {INIT} from '../constants';
import {TerfyDispatch} from '../terfy';

export default function init() {
  return (dispatch: TerfyDispatch) => {
    dispatch({
      type: INIT,
      effect: () => {
        rpc.emit('init', null);
      }
    });
  };
}
