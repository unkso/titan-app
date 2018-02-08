import sinon from 'sinon'
import assert from 'assert'
import {describe, it, beforeEach, afterEach} from 'mocha'
import * as titan from '../../../lib/titan'
import React, { Component } from 'react'

describe('Titan', () => {
  let fakeModule1
  let fakeModule2

  beforeEach(() => {
    fakeModule1 = {
      name: 'module 1',
      layouts: {
        layout1: 'layout1'
      },
      routes: {
        'route:1': {
          path: '/route/1',
          layout: <Component />,
          scene: <Component />
        }
      },
      dependencies: []
    }

    fakeModule2 = {
      name: 'module 2',
      layouts: {
        layout2: 'layout2'
      },
      routes: {
        'route:2': {
          path: '/route/2',
          layout: <Component />,
          scene: <Component />
        }
      },
      dependencies: []
    }
  })

  describe('#collectRoutes', () => {
    let sandbox = sinon.sandbox.create()

    // @todo fix
    beforeEach(() => {
      let collectModulesStub = sandbox.stub(titan, 'collectModules')
      collectModulesStub.returns(null)
    })

    afterEach(() => {
      sandbox.verifyAndRestore()
    })

    it('should return merged list of routes', () => {
      const routes = titan.collectRoutes([fakeModule1, fakeModule2])
      assert.equal(routes.length, 2)
      assert.deepEqual(
        routes,
        [fakeModule1.routes['route:1'], fakeModule2.routes['route:2']]
      )
    })

    it('should not return duplicate route keys', () => {
      // fake module 2 already has a route named "route:2"
      fakeModule1.routes['route:2'] = {
        path: '/route/2',
        layout: <Component />,
        scene: <Component />
      }

      const routes = titan.collectRoutes([fakeModule1, fakeModule2])
      assert.equal(routes.length, 2)
      assert.deepEqual(
        routes,
        [fakeModule1.routes['route:1'], fakeModule2.routes['route:2']]
      )
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
})
