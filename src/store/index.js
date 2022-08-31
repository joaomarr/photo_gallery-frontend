import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './Auth'
import Gallery from './Gallery'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    Auth,
    Gallery,
  }
})

export default store
