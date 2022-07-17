// import user from './modules/user'
// const token: state => state.user.token
const getters = {
  rightList: state => state.premiss.rightList,
  roleList: state => state.premiss.roleList,
  orderList: state => state.order.orderList,
  goodsList: state => state.goods.goodsList
}
export default getters
