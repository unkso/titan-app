import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import localStorage from '../storage/localStorage';

let titanStore = null;

export function setupStore (stateReducer = {}, storageKey) {
  const store = createStore(
    stateReducer,
    localStorage.load(storageKey),

    // @todo conditionally load dev tools depending on environment.
    composeWithDevTools(
      applyMiddleware(reduxImmutableStateInvariant())
    )
  );

  // When the redux store's state changes, persist the changes to
  // local storage.
  // @todo Allow modules to specify which state should be persisted.
  store.subscribe(() => {
    localStorage.save(storageKey, store.getState());
  });

  titanStore = store;
  return titanStore;
}

export function getStore () {
  return titanStore;
}
