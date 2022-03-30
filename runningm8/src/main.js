import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import Vuetify from 'vuetify/lib/framework'
import { firebaseApp, messaging } from './services/firebase'

Vue.config.productionTip = false
Vue.prototype.$messaging = messaging
Vue.use(Vuetify)
const vuetify = new Vuetify({})

new Vue({
  vuetify,
  router,
  firebaseApp,
  render: h => h(App)
}).$mount('#app')
