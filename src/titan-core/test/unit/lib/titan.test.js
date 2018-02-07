import sinon from 'sinon'
import assert from 'assert'
import {describe, it, beforeEach, afterEach} from 'mocha'
import * as titan from '../../../lib/titan'
import React, { Component } from 'react'

describe('Titan', () => {
  let fakeApplicationProvider
  let fakeModules

  beforeEach(() => {
    fakeModules = [
      {
        name: 'module 1',
        routes: {
          'route:1': {
            path: '/route/1',
            layout: <Component />,
            scene: <Component />
          }
        },
        dependencies: [
          {
            name: 'module 3'
          }
        ]
      },
      {
        name: 'module 2',
        routes: {
          'route:2': {
            path: '/route/2',
            layout: <Component />,
            scene: <Component />
          }
        },
        dependencies: [
          {
            name: 'module 3'
          }
        ]
      }
    ]

    fakeApplicationProvider = {
      name: 'fake app',
      dependencies: fakeModules
    }
  })

  describe('#collectRoutes', () => {
    let sandbox = sinon.sandbox.create()

    beforeEach(() => {
      let collectModulesStub = sandbox.stub(titan, 'collectModules')
      collectModulesStub.returns(null)
    })

    afterEach(() => {
      sandbox.verifyAndRestore()
    })

    it('should return merged list of routes', () => {
      const routes = titan.collectRoutes(fakeApplicationProvider)
      assert.equal(routes.length, 2)
      assert.deepEqual(
        routes,
        [fakeModules[0].routes['route:1'], fakeModules[1].routes['route:2']]
      )
    })

    it('should not return duplicate route keys', () => {
      fakeApplicationProvider.dependencies[0].routes['route:2'] = {
        path: '/route/2',
        layout: <Component />,
        scene: <Component />
      }

      const routes = titan.collectRoutes(fakeApplicationProvider)
      assert.equal(routes.length, 2)
      assert.deepEqual(
        routes,
        [fakeModules[0].routes['route:1'], fakeModules[1].routes['route:2']]
      )
    })
  })

  describe('#collectModules', () => {
    it('should return a list of all unique modules in dependency tree', () => {
      const modules = titan.collectModules([fakeApplicationProvider])

      assert.equal(modules.length, 5)
    })
  })
})
