// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import vueResource from 'vue-resource'
import axios from 'axios'
import store from './vuex/store.js'
import artists from './components/artists'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import VueLazyload from 'vue-lazyload'
Vue.use(MuseUI)
Vue.use(VueLazyload)
Vue.use(VueLazyload, {
  error: require('./assets/imgs/404.png'),
  loading: require('./assets/imgs/loading.jpg'),
  attempt: 1
})

Vue.prototype.$http = axios
axios.defaults.withCredentials = true
// Vue.use(vueResource)
// Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.component('artists', artists)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
