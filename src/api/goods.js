import request from '@/utils/request'
/**
 *获取商品列表
 * @param {*} params
 * @returns
 */
export const getGoodsList = (params) => {
  return request({
    url: 'goods',
    params
  })
}
/**
 *根据id搜索商品
 * @returns
 */
export const searchGoods = (id) => {
  return request({
    url: `goods/${id}`
  })
}
/**
 *添加商品
 * @param {*} data
 * @returns
 */
export const addGoods = (data) => {
  return request({
    url: 'goods',
    method: 'post',
    data
  })
}
/**
 *获取商品分类列表
 * @param {*} params
 * @returns
 */
export const GoodsKindList = (params) => {
  return request({
    url: 'categories',
    params
  })
}
/**
 *添加商品分类
 * @param {*} data
 * @returns
 */
export const addKindGoods = (data) => {
  return request({
    url: 'categories',
    method: 'post',
    data
  })
}
/**
 *添加动态参数或者静态属性
 attr_name 参数名称
 attr_sel 【only，many】
 attr_vals 可选参数 如果是many就需要添加值的选项，用逗号分隔
 * @param {*} data
 * @returns
 */
export const addSomeThing = (id, data) => {
  return request({
    url: `categories/${id}/attributes`,
    method: 'post',
    data
  })
}
/**
 *根据id查询参数
 attr_vals 如果是many就需要添加值的属性，以勾号分开
 * @param {*} params
 * @returns
 */
// eslint-disable-next-line camelcase
export const findCategoriesID = (id, attrId, attr_sel, attr_vals) => {
  return request({
    url: `categories/${id}/attributes/${attrId}`,
    params: {
      attr_vals,
      attr_sel
    }
  })
}
/**
 *参数列表
 * @param {*} id
 * @param {*} sel
 * @returns
 */
export const findCategories = (id, sel) => {
  return request({
    url: `categories/${id}/attributes`,
    params: {
      sel
    }
  })
}
/**
 *编辑提交参数
 * @param {*} id
 * @param {*} attrId
 * @param {*} data
 * @returns
 */
export const editCategories = (id, attrId, data) => {
  return request({
    url: `categories/${id}/attributes/${attrId}`,
    method: 'put',
    data
  })
}
/**
 *删除商品
 * @param {*} id
 * @param {*} attrid
 * @returns
 */
export const delCategories = (id, attrid) => {
  return request({
    url: `categories/${id}/attributes/${attrid}`,
    method: 'delete'
  })
}
