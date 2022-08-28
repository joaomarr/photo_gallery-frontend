import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './Auth'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  modules: {
    Auth
  }
})

export default store
