import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  getters: {

  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    app
  },
  plugins: [createPersistedState()]
})
