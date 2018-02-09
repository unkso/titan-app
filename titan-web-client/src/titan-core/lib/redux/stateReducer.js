import { combineReducers } from 'redux'

export function createStateReducer (reducers) {
  return combineReducers(reducers)
}
