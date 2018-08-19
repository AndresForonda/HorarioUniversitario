import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false
  },
  snackBar: {
    status: false,
    timeout: '3000',
    right: true,
    top: true,
    color: '',
    vertical: true,
    text: ''
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      if (token) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
    },
    setUser (state, user) {
      state.user = user
    },
    setSnackBar (snackBar, status, color, text) {
      snackBar.status = status
      snackBar.color = color
      snackBar.text = text
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    },
    setSnackBar ({commit}, status, color, text) {
      commit('setSnackBar', status, color, text)
    }
  }
})
