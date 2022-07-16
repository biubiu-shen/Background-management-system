import request from '@/utils/request'
/**
 *获取角色列表
 * @returns
 */
export const roleList = () => {
  return request({
    url: 'roles'
  })
}
/**
 *添加角色
 * @param {必选参数，角色名} roleName
 * @param {可选参数，角色描述} roleDesc
 * @returns
 */
export const addRole = (roleName, roleDesc) => {
  return request({
    url: '',
    method: 'post',
    data: {
      roleName,
      roleDesc
    }
  })
}
/**
 *删除角色
 * @param {*} id
 * @returns
 */
export const delRole = (id) => {
  return request({
    url: `role/${id}`,
    method: 'delete'
  })
}
/**
 *角色授权
 rids 以 , 分割的权限 ID 列表（获取所有被选中、叶子节点的 key 和半选中节点的 key, 包括 1，2，3 级节点）
 * @param { 角色id，必选参数}} roleId
 * @returns
 */
export const rolePower = (roleId, rids) => {
  return request({
    method: 'post',
    url: `roles/${roleId}/rights`,
    data: {
      rids
    }
  })
}
/**
 *删除角色指定权限
 * @param {必选参数，角色id} roleId
 * @param {必选参数，权限id} rightId
 * @returns
 */
export const delRolePower = (roleId, rightId) => {
  return request({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'delete'
  })
}
/**
 *所有权限列表
 * @param {list,tree} type
 * @returns
 */
export const rightList = (type) => {
  return request({
    url: `rights/${type}`
  })
}
