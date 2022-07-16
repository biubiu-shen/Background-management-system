import { roleList, delRolePower, rightList } from '@/api/premiss'
const state = {
  roleList: [],
  rightList: []
}
const mutations = {
  // 获取角色列表
  getRoleList (state, payload) {
    state.roleList = payload
  },
  // 删除玩指定权限，实时更新列表,但是有延时
  upatePower (state, payload) {
    state.roleList.forEach(item => {
      if (item.id === payload.id) {
        item.children = payload.children
      }
    })
  },
  // 获取所有权限列表
  getRightList (state, payload) {
    state.rightList = payload
  }

}
const actions = {
  // 请求角色列表
  async setRoleList (content) {
    try {
      const res = await roleList()
      content.commit('getRoleList', res.data.data)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  },
  // 删除角色指定权限
  async delRolePower1 (content, arr) {
    try {
      console.log('arr', arr[0], arr[1])
      const res = await delRolePower(arr[0], arr[1])
      const obj = {}
      obj.id = arr[0]
      obj.children = res.data.data
      content.commit('upatePower', obj)
      // console.log(res)
    } catch (err) {
      console.log(err)
    }
  },
  // 所有权限列表
  async setRights (content) {
    try {
      const res = await rightList('tree')
      content.commit('getRightList',res.data.data)
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
