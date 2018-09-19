//import Vue from 'vue'
import Vue from 'vue/dist/vue.js'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'

import App from './App.vue'
import K8sMapContextPicker from './components/K8sMapContextPicker.vue'
import K8sMap from './components/K8sMap.vue'

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(Vuex);

const routes = [
  {
    component: K8sMap,
    path: '/context/:project/:region/:zone/:cluster/',
    props: true
  },
  {
    component: K8sMapContextPicker,
    path: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
