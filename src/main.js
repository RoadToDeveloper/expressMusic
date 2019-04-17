import Vue from 'vue'
import App from './App.vue'
import store from './store/index.js'
import VueResource from 'vue-resource';

Vue.config.productionTip = false
Vue.use(VueResource);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
