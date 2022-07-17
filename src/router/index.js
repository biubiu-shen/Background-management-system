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
        component: () => import('@/views/User/index.vue')
      },
      {
        path: 'prelist',
        name: 'prelist',
        component: () => import('@/views/PremissionUser/PremissionList.vue')
      },
      {
        path: 'roleist',
        name: 'rolelist',
        component: () => import('@/views/PremissionUser/RoleList.vue')
      },
      {
        path: 'order',
        name: 'order',
        component: () => import('@/views/order/index.vue')
      },
      {
        path: 'goodslist',
        name: 'goodslist',
        redirect: 'goodslist/s',
        component: () => import('@/views/Goods/GoodsList.vue'),
        children: [
          {
            path: 's',
            component: () => import('@/views/Goods/components/listGoods.vue')
          },
          {
            path: 'add',
            name: 'add',
            component: () => import('@/views/Goods/components/addGoods.vue')
          }
        ]
      },
      {
        path: 'goodskind',
        name: 'goodskind',
        component: () => import('@/views/Goods/GoodsKind.vue')
      },
      {
        path: 'kindinfo',
        name: 'kindinfo',
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
