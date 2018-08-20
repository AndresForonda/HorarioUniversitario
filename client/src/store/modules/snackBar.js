const state = {
  status: false,
  color: '',
  text: ''
}

const mutations = {
  setSnackBar (state, options) {
    console.log(options[1])
    state.status = options[0]
    state.color = options[1]
    state.text = options[2]
  }
}

const actions = {
  setSnackBar ({commit}, options) {
    commit('setSnackBar', options)
  },
  clearSnackBar ({commit}, options) {
    setTimeout(commit('setSnackBar', options), 3000)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
