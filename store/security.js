// getters
const getters = {
  isLoggedIn (state, getters, rootState) {
    return rootState.auth.loggedIn
  },
}

// actions
const actions = {
  async logOut () {
    const { data } = await this.$axios.post('auth/logout')
    await this.$auth.logout()
    return data
  },
}

// mutations
const mutations = {}

export default {
  namespaced: true,
  getters,
  actions,
  mutations,
}
