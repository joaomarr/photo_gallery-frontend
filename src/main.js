import Vue from 'vue'
import App from './App.vue'

import store from '@/store'
import router from '@/router'

import { createProvider, onLogin } from '@/apollo'

import Cookies from 'js-cookie'
import { AUTH_TOKEN_COOKIE_NAME } from './constants'

Vue.config.productionTip = false

import DefaultLayout from './layouts/Default'
Vue.component('defaultLayout', DefaultLayout)

// https://vue-apollo.netlify.com/api/apollo-provider.html#constructor
const apolloProvider = createProvider()

new Vue({
  router,
  store,
  apolloProvider,
  render: (h) => h(App),
  async beforeMount() {
    const token = Cookies.get(AUTH_TOKEN_COOKIE_NAME)
    if (token) {
      await onLogin(apolloProvider.defaultClient, token)
      await this.$store.dispatch('login')
    }
  }
}).$mount('#app')
