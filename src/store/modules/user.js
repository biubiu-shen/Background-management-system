import { loginUser } from '@/api/login'
import { Message } from 'element-ui'
import { getToken, removeToken, setToken } from '@/utils/auth'
import { addUsers, getUserList, searchUser, setUserState, editUser, delUser, roleUser } from '@/api/userList'
const state = {
  token: getToken() || '',
  userList: {}
}
const mutations = {
  // 拿到用户身份标识
  getToken (state, payload) {
    state.token = payload
  },
  // 拿到用户列表数据
  getUserL (state, payload) {
    state.userList = payload
  },
  // 退出按钮清空用户身份标识
  removeToken1 (state) {
    removeToken()
    state.token = null
  }
}
const actions = {
  // 异步请求登录
  async getLoginUser (content, val) {
    try {
      const res = await loginUser(val)
      content.commit('getToken', res.data.data.token)
      setToken(res.data.data.token)
      // Vue.$router.push('/')
      Message.success('登录成功')
    } catch (err) {
      return Promise.reject(new Error(err))
      // Message.error('登录失败')
    }
  },
  // 请求用户列表数据
  async getuserList (content, obj) {
    try {
      const res = await getUserList(obj)
      content.commit('getUserL', res.data.data)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  },
  // 请求修改用户状态
  async setuserState (content, arr) {
    try {
      // console.log('obj', arr)
      const res = await setUserState(parseInt(arr[0]), arr[1])
      Message.success('修改状态成功')
      console.log(res)
    } catch (err) {
      Message.error('修改失败')
      // console.log(err)
    }
  },
  // 请求添加用户
  async adduser (content, data) {
    try {
      const res = await addUsers(data)
      if (res.data.meta.status === 400) {
        return Promise.reject(new Error(res.data.meta.msg))
      }
      Message.success('添加成功')
      console.log('res', res)
    } catch (err) {
      // console.log(err)
      // return Promise.reject(new Error('ss'))

      Message.error('添加失败')
    }
  },
  // 搜索用户
  async searchUsers (content, id) {
    try {
      const res = await searchUser(id)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  },
  // 编辑用户
  async editUsers (content, obj) {
    try {
      const res = await editUser(obj)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  },
  // 删除用户
  async delUsers (content, id) {
    try {
      const res = await delUser(id)
      console.log(res)
    } catch (err) {
      return Promise.reject(new Error(err))
      // console.log(err)
    }
  },
  // 分配用户角色
  async roleUsers (content, obj) {
    try {
      const res = await roleUser(obj)
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
