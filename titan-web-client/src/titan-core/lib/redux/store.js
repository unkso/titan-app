import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import localStorage from './../storage/localStorage'
import config from './../../config'

const storageKey = config.get('storage.localStorage.storageKey')
let titanStore = null

function initStore (stateReducer) {
  const store = createStore(
    stateReducer,
    localStorage.load(storageKey),

    // @todo conditionally load dev tools depending on environment.
    composeWithDevTools(
      applyMiddleware(reduxImmutableStateInvariant())
    )
  )

  // When the redux store's state changes, persist the changes to
  // local storage.
  // @todo Allow modules to specify which state should be persisted.
  store.subscribe(() => {
    const currentState = localStorage.load(storageKey)
    localStorage.save(storageKey, JSON.stringify(currentState))
  })

  return store
}

export default (stateReducer = {}) => {
  if (titanStore === null) {
    titanStore = initStore(stateReducer)
  }

  return titanStore
}
