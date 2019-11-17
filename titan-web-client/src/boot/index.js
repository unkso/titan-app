import modules from 'titan/modules';
import extensions from 'titan/extensions';
import { setupStore } from 'titan/lib/redux/store';
import titanConfig from 'titan/config';
import { mountReducer, mountRoutes } from 'titan/boot/common';
import { createStateReducer } from 'titan/lib/redux/stateReducer';

const routes = {};
const reducers = {};

// Mount core modules
modules.forEach(mountFeature);

// Mount extensions
extensions.forEach(mountFeature);

function mountFeature (init) {
  const module = init();
  mountRoutes(routes, module.routes);

  if (module.reducer) {
    mountReducer(reducers, module.name, module.reducer);
  }
}

// Prepare store
const store = setupStore(
  createStateReducer(reducers),
  titanConfig.get('storage.localStorage.storageKey')
);

export default () => {
  return {
    routes,
    store
  };
};
