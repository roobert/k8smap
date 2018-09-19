//import Vue from 'vue'
import Vue from 'vue/dist/vue.js'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(BootstrapVue);

import App from './App.vue'
import K8sMapContextPicker from './components/K8sMapContextPicker.vue'
import K8sMap from './components/K8sMap.vue'

Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    panel: {
      display: false,
      text: ""
    },
  },
  getters: {
    panel: state => {
      return state.panel
    }
  },
  mutations: {
    panelText (state, text) {
      state.panel.text = text
      state.panel.display = true
    },
    panelClose (state) {
      state.panel.display = false
    }
  }
})


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
  store,
  router,
  render: h => h(App)
}).$mount('#app')
