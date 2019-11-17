import * as assert from 'assert';
import { describe, it, beforeEach } from 'mocha';
import * as common from '../../../boot/common';
import { ROUTE_TYPE_UNAUTHENTICATED } from '../../../lib/routing';

describe('Common', () => {
  describe('mountRoutes', () => {
    let routes;

    beforeEach(() => {
      routes = [
        {
          layout: null,
          path: '/path/with/:param1/and/:param2',
          scene: null,
          type: ROUTE_TYPE_UNAUTHENTICATED
        }
      ];
    });

    it('generates correct route key', () => {
      const map = {};
      common.mountRoutes(map, routes);

      const keys = Object.keys(map);

      assert.strictEqual(keys.length, 1);
      assert.strictEqual('/path/with/{}/and/{}', keys[0]);
    });

    it('throws error when duplicate route is found', () => {
      assert.throws(
        () => { common.mountRoutes({}, [...routes, routes[0]]); },
        Error,
        'Duplicate route pattern: /path/with/{}/and/{}.'
      );
    });
  });

  describe('mountReducer', () => {
    it('throws error when duplicate reducer is found', () => {
      const reducerName = 'test_reducer';
      const map = {};
      common.mountReducer(map, reducerName, () => {});

      assert.throws(
        () => { common.mountReducer(map, reducerName, () => {}); },
        Error,
        'Duplicate module name for reducer: test_reducer.'
      );
    });
  });
});
