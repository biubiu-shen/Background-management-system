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
      }
    ]
  },
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
