import request from '@/utils/request'
/**
 *
 * @returns 登录接口
 */
export const loginUser = ({ username, password }) => {
  return request({
    url: 'login',
    method: 'post',
    data: {
      username, password
    }
  })
}
