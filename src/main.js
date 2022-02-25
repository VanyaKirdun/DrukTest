import Vue from 'vue'
import App from './App.vue'
import store from './store'
import modal from './components/ModaleWindow'

Vue.config.productionTip = false

// eslint-disable-next-line
Vue.component("modal", modal);


new Vue({
  el: "#app",
  store,
  render: h => h(App)
}).$mount('#app')
