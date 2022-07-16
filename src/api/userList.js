import request from '@/utils/request'
/**
 *获取用户列表
 * @param {查询参数（可选），当前页面，每页显示条数} param0
 * @returns
 */
export const getUserList = ({ query, pagenum, pagesize }) => {
  return request({
    url: 'users',
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}
/**
 *修改用户状态
 * @returns
 */
export const setUserState = (uId, type) => {
  return request({
    method: 'put',
    // eslint-disable-next-line object-curly-spacing
    url: `users/${uId}/state/${type}`
  })
}
/**
 *添加用户，必选参数为username password 可选为email mobile
 * @param {*} data
 * @returns
 */
export const addUsers = (data) => {
  return request({

    method: 'post',
    url: 'users',
    data
  })
}
/**
 *根据id搜索用户
 * @param {*} id
 * @returns
 */
export const searchUser = (id) => {
  return request({
    url: `users/${id}`
  })
}
/**
 *编辑用户
 * @param {*} id
 * @param {*} email
 * @param {*} mobile
 * @returns
 */
export const editUser = ({ id, email, mobile }) => {
  return request({
    method: 'put',
    url: `users/${id}`,
    data: {
      email,
      mobile
    }
  })
}
/**
 *删除用户
 * @param {*} id
 * @returns
 */
export const delUser = (id) => {
  return request({
    method: 'delete',
    url: `users/${id}`
  })
}
/**
 *分配用户角色
 * @param {用户id} id
 * @param {角色rid} rid
 * @returns
 */
export const roleUser = ({ id, rid }) => {
  return request({
    method: 'put',
    url: `users/${id}/role`,
    data: {
      rid
    }
  })
}
