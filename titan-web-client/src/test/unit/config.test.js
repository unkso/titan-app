import assert from 'assert'
import { describe, it, beforeEach } from 'mocha'
import TitanConfig from '../../lib/config'

describe('config', () => {
  let config = null
  const fakeConfig = {
    api: {
      baseUrl: 'http://localhost'
    },
    storage: {
      localStorage: {
        key: 'titan_app'
      }
    }
  }

  const fakeConfig2 = {
    foo: {
      bar: false
    }
  }

  beforeEach(() => {
    config = new TitanConfig()
  })

  describe('#load', () => {
    it('should replace config', () => {
      config.load(fakeConfig2)
      assert.deepEqual(config.config, fakeConfig2)
    })
  })

  describe('#get', () => {
    beforeEach(() => {
      config.load(fakeConfig)
    })

    it('should return the whole config', () => {
      assert.deepEqual(config.get(), fakeConfig)
    })

    it('should return value of nested config key', () => {
      assert.deepEqual(
        config.get('storage.localStorage.key'),
        fakeConfig.storage.localStorage.key
      )
    })

    it('should return null when config does not exist', () => {
      assert.deepEqual(config.get('foo.bar'), null)
    })
  })
})
