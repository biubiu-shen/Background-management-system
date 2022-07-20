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
