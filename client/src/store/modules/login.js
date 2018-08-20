const state = {
  token: null,
  user: null,
  isUserLoggedIn: false
}
const mutations = {
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
  }
}
const actions = {
  setToken ({commit}, token) {
    commit('setToken', token)
  },
  setUser ({commit}, user) {
    commit('setUser', user)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
