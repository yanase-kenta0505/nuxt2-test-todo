/**
 * TODO: TypeScript化する
 */

import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'LocalTodos'
  })(store)
}