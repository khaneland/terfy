import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import effects from '../utils/effects';
import * as plugins from '../utils/plugins';
import writeMiddleware from './write-middleware';
import {TerfyState, TerfyThunkDispatch} from '../terfy';

export default () =>
  createStore(
    rootReducer,
    applyMiddleware<TerfyThunkDispatch, TerfyState>(thunk, plugins.middleware, thunk, writeMiddleware, effects)
  );
