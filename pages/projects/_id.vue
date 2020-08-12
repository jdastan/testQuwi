<template>
  <div class="container">
    <div class="project-edit-nav">
      <a class="back-btn" href="/projects">BACK</a>
    </div>
    <div class="edit-name-card">
      <label for="projectName" class="label-name">Name</label>
      <input v-model="projectsName" type="text" name="projectName">
      <input
        type="button"
        class="ok-btn"
        value="OK"
        :disabled="disabled"
        @click="save()"
      >
    </div>
    <div v-if="error" class="snackbar error-snackbar">
      {{ error }}
    </div>
    <div v-if="success" class="snackbar">
      Saved successfully
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      projectsName: '',
      disabled: false,
      error: false,
      success: false,
    }
  },
  watch: {
    success () {
      setTimeout(() => {
        this.success = false
      }, 3000)
    },
    error () {
      setTimeout(() => {
        this.error = false
      }, 3000)
    },
  },
  async mounted () {
    const { project } = await this.$store.dispatch('projects/getProject', this.$route.params.id)
    this.projectsName = project.name
  },
  methods: {
    async save () {
      try {
        this.disabled = true
        if (this.$route.params.id) {
          await this.$store.dispatch('projects/update', { id: this.$route.params.id, name: this.projectsName })
          this.success = true
        }
      } catch (e) {
        this.error = e
      }
      this.disabled = false
    },
  },
}
</script>

<style scoped>
  @import '../../assets/main.scss';

  .back-btn {
    width: 50px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333;
    text-align: center;
    padding: 5px 8px;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 13px;
    font-weight: 700;
    background: #cecece;
    border: 1px solid #bfbfbe;
    border-radius: 4px;
    cursor: pointer;
    outline: none;
    margin: 4px 30px;
  }

  .back-btn:hover {
    background-color: darkgrey;
  }

  .project-edit-nav {
    width: 100%;
    height: 50px;
    background-color: #c1c8d2;
    display: flex;
    align-items: center;
    border-bottom: 2px solid white;
  }

  .edit-name-card {
    max-width: 700px;
    width: 100%;
    height: 120px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 0 8px rgba(0,0,0,0.5);
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
  }

  .label-name {
    margin-right: 20px;
  }

  .ok-btn {
    margin-left: 15px;
  }
</style>
