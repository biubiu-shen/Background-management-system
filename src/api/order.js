import request from '@/utils/request'
/**
 *获取所有订单
 * @returns
 */
export const getOrderList = (params) => {
  return request({
    url: 'orders',
    params
  })
}
