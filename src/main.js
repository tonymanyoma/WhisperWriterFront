import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import Vuesax from 'vuesax'

import 'vuesax/dist/vuesax.css' //Vuesax styles
import 'material-icons/iconfont/material-icons.css';
Vue.use(Vuesax, {
  // options here
})


axios.defaults.baseURL = process.env.VUE_APP_API_URL;

Vue.prototype.$http = axios;


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
