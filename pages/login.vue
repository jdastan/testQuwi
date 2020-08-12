<template>
  <div class="container">
    <div class="card">
      <form class="login-form">
        <h3 class="login-title">
          LOGIN
        </h3>
        <div class="text-field" :class="errors.email ? 'error-field': 'normal-field'">
          <input
            v-model="email"
            type="text"
            name="email"
            placeholder="Email"
          >
          <span class="error-msg">
            {{ errors.email }}
          </span>
        </div>
        <div class="text-field" :class="errors.password ? 'error-field': 'normal-field'">
          <input
            v-model="password"
            type="password"
            name="password"
            placeholder="Password"
          >
          <span class="error-msg">
            {{ errors.password }}
          </span>
        </div>
        <input
          type="button"
          value="LOGIN"
          :disabled="disabled"
          @click="login()"
        >
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      disabled: false,
      email: '',
      password: '',
      errors: {
        email: '',
        password: '',
      },
    }
  },
  watch: {
    email () {
      this.errors.email = ''
    },
    password () {
      this.errors.password = ''
    },
  },
  methods: {
    async login () {
      try {
        if (this.validateAll()) {
          this.disabled = true
          await this.$auth.loginWith('local', {
            data: {
              email: this.email,
              password: this.password,
            },
          })

          this.$router.push({ name: 'projects' })
          this.disabled = false
        }
      } catch (e) {
        if (e.response.status === 417) {
          const { email, password } = e.response.data.first_errors
          this.errors.email = email
          this.errors.password = password
        }
        this.disabled = false
      }
    },
    validateAll () {
      if (!this.email) {
        this.errors.email = 'Email is required'
      } else if (!this.validateEmail(this.email)) {
        this.errors.email = 'Email is not a valid email address'
      } else {
        this.errors.email = ''
      }
      if (!this.password) {
        this.errors.password = 'Password is required'
      } else {
        this.errors.password = ''
      }

      return !(this.errors.password || this.errors.email)
    },
    validateEmail (email) {
      // eslint-disable-next-line
      const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      return re.test(email)
    },
  },
}
</script>

<style scoped>
  @import '../assets/main.scss';

  .container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .card {
    width: 350px;
    height: 250px;
    background-color: #f4f4f4;
    border-radius: 5px;
    box-shadow: 0 0 8px rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
  }

  .login-form {
    width: 300px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .login-title {
    margin-bottom: 8px;
  }
</style>
