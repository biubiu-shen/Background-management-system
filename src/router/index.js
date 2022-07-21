import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home/index.vue'
import Login from '@/views/Login/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: 'welcome',
        component: () => import('@/views/wecome.vue')
      },
      {
        path: 'user',
        name: 'user',
        meta: { title: '用户管理', son: '用户列表' },
        component: () => import('@/views/User/index.vue')
      },
      {
        path: 'prelist',
        name: 'prelist',
        meta: { title: '权限管理', son: '权限列表' },
        component: () => import('@/views/PremissionUser/PremissionList.vue')
      },
      {
        path: 'roleist',
        name: 'rolelist',
        meta: { title: '权限管理', son: '角色列表' },
        component: () => import('@/views/PremissionUser/RoleList.vue')
      },
      {
        path: 'order',
        name: 'order',
        meta: { title: '订单管理', son: '订单列表' },
        component: () => import('@/views/order/index.vue')
      },
      {
        path: 'goodslist',
        name: 'goodslist',
        meta: { title: '商品管理', son: '商品列表' },
        redirect: 'goodslist/s',
        component: () => import('@/views/Goods/GoodsList.vue'),
        children: [
          {
            path: 's',
            meta: { title: '商品管理', son: '商品列表' },
            component: () => import('@/views/Goods/components/listGoods.vue')
          },
          {
            path: 'add',
            name: 'add',
            meta: { title: '商品管理', son: '商品列表' },
            component: () => import('@/views/Goods/components/addGoods.vue')
          }
        ]
      },
      {
        path: 'goodskind',
        name: 'goodskind',
        meta: { title: '商品管理', son: '商品分类' },
        component: () => import('@/views/Goods/GoodsKind.vue')
      },
      {
        path: 'kindinfo',
        name: 'kindinfo',
        meta: { title: '商品管理', son: '分类参数' },
        component: () => import('@/views/Goods/KindInfo.vue')
      }
    ]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '*',
    redirect: '/404',
    component: () => import('@/views/NotFound/index.vue')

  }
]

const router = new VueRouter({
  routes
})

export default router
