//import Vue from 'vue'
import Vue from 'vue/dist/vue.js'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'

//import App from './App.vue'
import K8sMapContextPicker from './components/K8sMapContextPicker.vue'
import K8sMap from './components/K8sMap.vue'

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(VueRouter);

const routes = [
  {
    component: K8sMapContextPicker,
    path: '/'
  },
  {
    component: K8sMap,
    path: '/context/:project/:region/:zone/:cluster/',
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

new Vue({
  router,
  render: h => h(K8sMapContextPicker)
}).$mount('#app')
