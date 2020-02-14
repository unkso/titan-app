import {environment} from '@titan/lib/config';
import {rootReducer} from '@titan/reducers';
import {AppStateStore} from '@titan/lib/redux/app_state_store';

let appStore: AppStateStore;

export function getStoreInstance(): AppStateStore {
  if (!appStore) {
    appStore = new AppStateStore(rootReducer, environment);
  }
  return appStore;
}
