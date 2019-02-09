import {createStore, applyMiddleware, compose, StoreEnhancerStoreCreator} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import getRootReducer from '../reducers';
import {
  forwardToMain,
  forwardToRenderer,
  triggerAlias,
  replayActionMain,
  replayActionRenderer,
} from 'electron-redux';
import {AppState} from "./store";

/**
 * @param  {Object} initialState
 * @param  {String} [scope='main|renderer']
 * @return {Object} store
 */
export default function configureStore(initialState, scope = 'main') {
  let middleware = [
    thunk,
    promise,
  ];

  /* if (!process.env.NODE_ENV) {
    middleware.push(logger);
  }*/

  if (scope === 'renderer') {
    middleware = [
      forwardToMain,
      ...middleware,
    ];
  }

  if (scope === 'main') {
    middleware = [
      triggerAlias,
      ...middleware,
      forwardToRenderer,
    ];
  }

  const enhanced = [
    applyMiddleware(...middleware),
  ];

  if (/*! process.env.NODE_ENV && */scope === 'renderer') {
  }

  const rootReducer = getRootReducer(scope);
  const enhancer = compose<StoreEnhancerStoreCreator<AppState>>(...enhanced);
  const store = createStore(rootReducer, initialState, enhancer);

  /* if (!process.env.NODE_ENV && module['hot']) {
    module['hot'].accept('../reducers', () => {
      store.replaceReducer(require('../reducers'));
    });
  }*/

  if (scope === 'main') {
    replayActionMain(store);
  } else {
    replayActionRenderer(store);
  }

  return store;
}
