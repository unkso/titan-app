import sinon from 'sinon'
import * as titan from '../../../lib/titan'
import React, { Component } from 'react'
import {describe, it} from 'mocha'
import assert from 'assert'

let fakeModules = [
  {
    name: 'module 1',
    routes: {
      'route:1': {
        route: '/route/1',
        layout: <Component />,
        scene: <Component />
      }
    }
  },
  {
    name: 'module 2',
    routes: {
      'route:2': {
        route: '/route/2',
        layout: <Component />,
        scene: <Component />
      }
    }
  }
]

const fakeApplicationProvider = {
  dependencies: fakeModules
}

let collectModulesStub = sinon.stub(titan, 'collectModules')
collectModulesStub.returns(fakeModules)

describe('Titan', () => {
  it('should return merged list of routes', () => {
    const routes = titan.collectApplicationRoutes(fakeApplicationProvider)
    assert.equal(routes.length, 2)
  })
})
