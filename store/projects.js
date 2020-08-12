// getters
const getters = {}

// actions
const actions = {
  async getList () {
    const { data } = await this.$axios.get('/projects-manage/index')
    return data.projects
  },

  async update ({ commit }, payload) {
    const { data } = await this.$axios.post(`/projects-manage/update?id=${payload.id}`, payload)
    return data
  },

  async getProject ({ commit }, id) {
    const { data } = await this.$axios.get(`/projects-manage/${id}`)
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
