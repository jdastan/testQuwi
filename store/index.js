import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import projects from './projects'
import security from './security'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = () => new Vuex.Store({
  modules: {
    projects,
    security,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
})

export default store
