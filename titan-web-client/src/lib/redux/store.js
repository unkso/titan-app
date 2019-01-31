import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import localStorage from '../storage/localStorage';

let titanStore = null;

export function setupStore(stateReducer = {}, storageKey) {
  const persistedState = localStorage.load(storageKey);
  const stateToLoad = (persistedState) ? { auth: persistedState } : undefined;
  const store = createStore(
    stateReducer,
    stateToLoad,

    // @todo conditionally load dev tools depending on environment.
    composeWithDevTools(
      applyMiddleware(reduxImmutableStateInvariant())
    )
  );

  // When the redux store's state changes, persist the changes to
  // local storage.
  // @todo Allow modules to specify which state should be persisted. For now,
  // only auth state will be persisted for better performance.
  store.subscribe(() => {
    localStorage.save(storageKey, store.getState().auth);
  });

  titanStore = store;
  return titanStore;
}

export function getStore() {
  return titanStore;
}
