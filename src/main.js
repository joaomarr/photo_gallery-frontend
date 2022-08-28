import Vue from 'vue'
import App from './App.vue'

import store from '@/store'
import router from '@/router'

import { createProvider } from '@/apollo'

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
    const token = await this.$store.dispatch('refreshToken')
    if (token) {
      await this.$store.dispatch('getUser')
    }
  }
}).$mount('#app')
