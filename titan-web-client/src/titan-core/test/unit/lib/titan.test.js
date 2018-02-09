import assert from 'assert'
import {describe, it, beforeEach} from 'mocha'
import * as titan from '../../../lib/titan'
import { buildFake } from '../../util/componentUtils'

describe('Titan', () => {
  let fakeModule1
  let fakeModule2

  beforeEach(async () => {
    fakeModule1 = {
      name: 'module 1',
      layouts: {
        layout1: 'layout1'
      },
      routes: [
        {
          path: '/route/1',
          layout: 'layout1',
          scene: await buildFake(),
          renderPriority: 0,
          layoutPriority: 0
        }
      ],
      dependencies: []
    }

    fakeModule2 = {
      name: 'module 2',
      layouts: {
        layout2: 'layout2'
      },
      routes: [
        {
          path: '/route/2',
          layout: 'layout2',
          scene: await buildFake(),
          renderPriority: 0,
          layoutPriority: 0
        }
      ],
      dependencies: []
    }
  })

  describe('#collectRoutes', () => {
    it('should return merged list of routes', () => {
      const routes = titan.collectRoutes([fakeModule1, fakeModule2])
      const expected = {
        '/route/1': {
          layout: 'layout1',
          layoutPriority: 0,
          scenes: [
            { scene: fakeModule1.routes[0].scene, renderPriority: 0 }
          ]
        },
        '/route/2': {
          layout: 'layout2',
          layoutPriority: 0,
          scenes: [
            { scene: fakeModule2.routes[0].scene, renderPriority: 0 }
          ]
        }
      }

      assert.equal(Object.keys(routes).length, 2)
      assert.deepEqual(routes, expected)
    })

    it('should override layout if route has higher priority', async () => {
      const testRoute = {
        path: '/route/1',
        layout: 'layout2',
        scene: await buildFake(),
        layoutPriority: 1
      }
      fakeModule2.routes.push(testRoute)

      const routes = titan.collectRoutes([fakeModule1, fakeModule2])
      const expected = {
        '/route/1': {
          layout: 'layout2',
          layoutPriority: 1,
          scenes: [
            { scene: fakeModule1.routes[0].scene, renderPriority: 0 },
            { scene: testRoute.scene, renderPriority: 0 }
          ]
        },
        '/route/2': {
          layout: 'layout2',
          layoutPriority: 0,
          scenes: [
            { scene: fakeModule2.routes[0].scene, renderPriority: 0 }
          ]
        }
      }

      assert.equal(Object.keys(routes).length, 2)
      assert.deepEqual(routes, expected)
    })

    it('should order scenes by renderPriority', async () => {
      const testRoute = {
        path: '/route/1',
        layout: 'layout1',
        scene: await buildFake(),
        renderPriority: 1
      }

      const testRoute2 = {
        path: '/route/1',
        layout: 'layout1',
        scene: await buildFake(),
        renderPriority: 2
      }

      fakeModule2.routes.push(testRoute)
      fakeModule2.routes.push(testRoute2)

      const routes = titan.collectRoutes([fakeModule1, fakeModule2])
      const expected = {
        '/route/1': {
          layout: 'layout1',
          layoutPriority: 0,
          scenes: [
            { scene: testRoute2.scene, renderPriority: 2 },
            { scene: testRoute.scene, renderPriority: 1 },
            { scene: fakeModule1.routes[0].scene, renderPriority: 0 }
          ]
        },
        '/route/2': {
          layout: 'layout2',
          layoutPriority: 0,
          scenes: [
            { scene: fakeModule2.routes[0].scene, renderPriority: 0 }
          ]
        }
      }

      assert.deepEqual(routes, expected)
    })
  })

  describe('#collectModules', () => {
    it('should return a list of all unique modules in dependency tree', () => {
      fakeModule1.dependencies.push({ name: 'module 3' })
      fakeModule2.dependencies.push({ name: 'module 3' })

      const fakeApp = {
        name: 'fake app',
        dependencies: [
          fakeModule1,
          fakeModule2
        ]
      }
      const modules = titan.collectModules([fakeApp])

      assert.equal(modules.length, 4)
      assert.equal(modules[0].name, 'fake app')
      assert.equal(modules[1].name, 'module 1')
      assert.equal(modules[3].name, 'module 2')
      assert.equal(modules[2].name, 'module 3')
    })
  })

  describe('#collectLayouts', () => {
    it('should return a merged list of layouts', () => {
      const layouts = titan.collectLayouts([fakeModule1, fakeModule2])

      assert.deepEqual(layouts, { layout1: 'layout1', layout2: 'layout2' })
    })
  })

  describe('#collectReducers', () => {
    it('should throw an error if a duplicate reducer key is found', () => {
      fakeModule1.reducers = { reducer1: null }
      fakeModule2.reducers = { reducer1: null }

      assert.throws(
        () => { titan.collectReducers([fakeModule1, fakeModule2]) },
        /Duplicate reducer key/g
      )
    })

    it('should return a map of all the reducers', () => {
      fakeModule1.reducers = { reducer1: null, reducer2: null }
      fakeModule2.reducers = { reducer3: null }

      const reducers = titan.collectReducers([fakeModule1, fakeModule2])
      assert.deepEqual(
        reducers,
        { reducer1: null, reducer2: null, reducer3: null }
      )
    })
  })
})
