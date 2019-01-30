import { combineReducers } from 'redux';
import settings from './settings';

export default function getRootReducer(scope = 'main') {
  let reducers = {
    settings
  };

  if (scope === 'renderer') {
    reducers = {
      ...reducers
    };
  }

  return combineReducers({ ...reducers });
}
