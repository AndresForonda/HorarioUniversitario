import Vue from 'vue'
import Vuex from 'vuex'
import snackBar from './modules/snackBar'
import login from './modules/login'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    snackBar,
    login
  },
  plugins: [createPersistedState()]
})
