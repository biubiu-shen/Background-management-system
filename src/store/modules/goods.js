import { getGoodsList } from '@/api/goods'

const state = {
  goodsList: {}
}
const mutations = {
  // 获取商品列表
  getGoodsList (state, payload) {
    state.goodsList = payload
  }
}
const actions = {
  // 请求商品列表
  async setGoodsList (content, params) {
    try {
      const res = await getGoodsList(params)
      content.commit('getGoodsList', res.data.data)
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
