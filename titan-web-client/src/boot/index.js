import modules from 'titan/modules'
import extensions from 'titan/extensions'
import Config from 'titan/lib/config'
import { createStore } from 'redux'
import defaultConfig from 'titan/config/config.default'
import { mountConfig, mountReducer, mountRoutes } from 'titan/boot/common'
import { createStateReducer } from 'titan/lib/redux/stateReducer'

const routes = {}
const reducers = {}
const moduleConfig = {}

// Mount core modules
modules.forEach((init) => {
  const module = init()
  mountRoutes(routes, module.routes)
  mountReducer(reducers, module.name, module.reducer)
  mountConfig(moduleConfig, module.name, module.config)
})

// Mount extensions
extensions.forEach((init) => {
  const extension = init()
  mountRoutes(routes, extension.routes)
  mountReducer(reducers, extension.name, extension.reducer)
  mountConfig(moduleConfig, module.config)
})

// Prepare store
const store = createStore(
  createStateReducer(reducers)
)

// Prepare config
const config = new Config()
config.load({ ...defaultConfig, ...moduleConfig })

export default () => {
  return {
    config,
    routes,
    store
  }
}
