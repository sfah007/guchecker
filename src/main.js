import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueSession from 'vue-session'
Vue.use(VueSession)

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
