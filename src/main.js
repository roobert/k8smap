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

// FIXME: set history mode to remove '#' -- requires client handles 404s
const router = new VueRouter({
  routes: routes
})

new Vue({
  router
}).$mount('#app')
