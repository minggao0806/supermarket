// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import coms from './plugin/baseUi'
import icons from './components/SvgIcon'
import rem from './plugin/rem'
import notice from './plugin/notice'
import api from './api'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

import NutUI from '@nutui/nutui'
import '@nutui/nutui/dist/nutui.css'
NutUI.install(Vue)

Vue.use(VueAwesomeSwiper)

Vue.use(rem)
Vue.use(coms)
Vue.use(icons)
Vue.use(notice)
Vue.use(api)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
