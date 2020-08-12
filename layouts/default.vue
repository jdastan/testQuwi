<template>
  <div>
    <ul class="app-nav-bar">
      <span class="nav-logo">Q</span>
      <router-link tag="li" active-class="active" to="/projects" exact><a>PROJECTS</a></router-link>
      <li v-if="isLoggedIn">
        <a class="logout-btn" @click="logout()">LOGOUT</a>
      </li>
      <router-link v-else tag="li" active-class="active" to="/login" exact><a>LOGIN</a></router-link>
    </ul>
    <Nuxt />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'security/isLoggedIn',
    }),
  },
  methods: {
    logout () {
      this.$store.dispatch('security/logOut')
    },
  },
}
</script>

<style>
html {
  font-family:
    'Work Sans',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li a {
  display: block;
  color: grey;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover {
  background-color: darkgrey;
}

.nav-logo {
  font-size: 33px;
  font-weight: bold;
  margin-right: auto;
  margin-left: 15px;
}

.app-nav-bar {
  background: #fafafa;
  border: none;
  -webkit-box-shadow: 0 0 5px rgba(0,0,0,.25);
  box-shadow: 0 0 5px rgba(0,0,0,.25);
  text-align: right;
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  z-index: 1001;
  display: flex;
  justify-content: flex-end;
}

.active {
  background-color: grey;
}

.active a {
  color: white;
}

.logout-btn {
  cursor: pointer;
}
</style>
