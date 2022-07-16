import { getOrderList } from '@/api/order'
const state = {
  orderList: []
}
const mutations = {
  getOrders (state, payload) {
    state.orderList = payload
  }
}
const actions = {
  async setOrders (content, params) {
    try {
      const res = await getOrderList(params)
      content.commit('getOrders',res.data.data.goods)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
