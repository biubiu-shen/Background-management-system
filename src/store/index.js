import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import premiss from './modules/premiss'
import order from './modules/order'
import getters from './getters'
import goods from './modules/goods'
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
    premiss,
    order,
    goods
  }
})
