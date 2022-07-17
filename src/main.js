import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/reset.less'
import dialogItem from '@/components/dialogItem.vue'
import BreadCrumb from '@/components/BreadCrumb.vue'
import '@/styles/index.less'
import * as obj from '@/filter/index'
// console.log('obj', obj)
Vue.config.productionTip = false
Vue.component('dialogItem', dialogItem)
Vue.component('BreadCrumb', BreadCrumb)
Object.keys(obj).forEach(item => {
  Vue.filter(item, obj[item])
})
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
