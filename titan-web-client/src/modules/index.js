import Auth from './auth';
import Roster from './roster';
import Organizations from './organizations';

/**
 * Add the default export for new modules to this array. The module should
 * export the following structure:
 *
 * {
 *    config: {...},
 *    name: "...",
 *    reducer: createStateReducer([...]),
 *    routes: [...]
 * }
 */
export default [
  Auth,
  Roster,
  Organizations
];
