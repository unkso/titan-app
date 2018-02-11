import assert from 'assert'
import { describe, it, beforeEach } from 'mocha'
import TitanConfig from '../../config'

describe('config', () => {
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

  describe('#load', () => {
    it('should replace config', () => {
      TitanConfig.load(fakeConfig2)
      assert.deepEqual(TitanConfig.config, fakeConfig2)
    })
  })

  describe('#get', () => {
    beforeEach(() => {
      TitanConfig.load(fakeConfig)
    })

    it('should return the whole config', () => {
      assert.deepEqual(TitanConfig.get(), fakeConfig)
    })

    it('should return value of nested config key', () => {
      assert.deepEqual(
        TitanConfig.get('storage.localStorage.key'),
        fakeConfig.storage.localStorage.key
      )
    })

    it('should return null when config does not exist', () => {
      assert.deepEqual(TitanConfig.get('foo.bar'), null)
    })
  })
})
