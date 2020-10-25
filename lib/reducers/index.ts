import {combineReducers} from 'redux';
import ui, {IUiReducer} from './ui';
import sessions, {ISessionReducer} from './sessions';
import termGroups, {ITermGroupReducer} from './term-groups';
import {TerfyActions} from '../terfy';

export default combineReducers<
  {
    ui: ReturnType<IUiReducer>;
    sessions: ReturnType<ISessionReducer>;
    termGroups: ReturnType<ITermGroupReducer>;
  },
  TerfyActions
>({
  ui,
  sessions,
  termGroups
});
