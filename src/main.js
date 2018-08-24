//import Vue from 'vue'
import Vue from 'vue/dist/vue.js';
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(BootstrapVue);

new Vue({
  render: h => h(App)
}).$mount('#app')
