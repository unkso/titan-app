import modules from '@titan/modules';
import extensions from '@titan/extensions';
import { setupStore } from '@titan/lib/redux/store';
import titanConfig from '@titan/config';
import { mountReducer, mountRoutes } from '@titan/boot/common';
import {rootReducer} from "@titan/reducers";

const routes = {};

// Mount core modules
modules.forEach(mountFeature);

// Mount extensions
extensions.forEach(mountFeature);

function mountFeature (init) {
  const module = init();
  mountRoutes(routes, module.routes);
}

// Prepare store
const store = setupStore(
  rootReducer,
  titanConfig.get('storage.localStorage.storageKey')
);

export default () => {
  return {
    routes,
    store
  };
};
