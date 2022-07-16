import Cookies from 'js-cookie'
const TokenKey = 'SHEH'
/**
 *获取身份标识
 * @returns
 */
export function getToken () {
  return Cookies.get(TokenKey)
}
/**
 *设置身份标识
 * @param {*} token
 * @returns
 */
export function setToken (token) {
  return Cookies.set(TokenKey, token)
}
/**
 *清除身份标识
 * @returns
 */
export function removeToken () {
  return Cookies.remove(TokenKey)
}
