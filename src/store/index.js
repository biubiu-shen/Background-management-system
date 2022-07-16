import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import premiss from './modules/premiss'
import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters,
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    premiss
  }
})
