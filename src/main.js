import Vue from 'vue'
import App from './App.vue'

import store from '@/store'
import router from '@/router'

import { createProvider } from '@/apollo'

Vue.config.productionTip = false

import Cookies from 'js-cookie'
import PortalVue from 'portal-vue'
import { AUTH_REFRESH_TOKEN_COOKIE_NAME } from './constants'
import './assets/index.css'

import DefaultLayout from './layouts/Default'
Vue.component('defaultLayout', DefaultLayout)

// https://vue-apollo.netlify.com/api/apollo-provider.html#constructor
const apolloProvider = createProvider()

Vue.use(PortalVue)

new Vue({
  router,
  store,
  apolloProvider,
  render: (h) => h(App),
  async beforeMount() {
    const token = Cookies.get(AUTH_REFRESH_TOKEN_COOKIE_NAME)
    if (token) {
      await this.$store.dispatch('refreshToken')
      await this.$store.dispatch('getUser')
    }
  }
}).$mount('#app')
