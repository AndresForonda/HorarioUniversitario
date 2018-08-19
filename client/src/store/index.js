import Vue from 'vue'
import Vuex from 'vuex'
import snackBar from './modules/snackbar'
import store from './modules/store'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    snackBar,
    store
  }
})
