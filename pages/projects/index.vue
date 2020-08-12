<template>
  <div class="container">
    <div
      v-for="project in projects"
      :key="project.id"
      class="project-card"
      @click="editProjectsName(project.id)"
    >
      <div class="project-icon">
        <img v-if="project.logo_url" class="icon" :src="project.logo_url">
        <i v-else class="material-icons default-icon">featured_play_list</i>
      </div>
      <h3
        class="projects-name"
      >
        {{ project.name }}
      </h3>
      <h4
        class="projects-status"
        :class="project.is_active ? 'active-project' : 'inactive-project'"
      >
        {{ project.is_active ? 'ACTIVE' : 'INACTIVE' }}
      </h4>
      <div class="projects-time">
        <div class="time-headers">
          <p>time this week</p>
          <p>this month</p>
          <p>total</p>
        </div>
        <div>
          <p>{{ project.spent_time_week || '00:00:00' }}</p>
          <p>{{ project.spent_time_month || '00:00:00' }}</p>
          <p>{{ project.spent_time_all || '00:00:00' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data () {
    return {
      projects: {},
    }
  },
  async mounted () {
    this.projects = await this.$store.dispatch('projects/getList')
  },
  methods: {
    editProjectsName (projectId) {
      this.$router.push({ name: 'projects-id', params: { id: projectId } })
    },
  },
}
</script>

<style scoped>
  p {
    margin: 5px 0;
  }

  .container {
    padding-top: 40px;
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f4f4f4;
  }

  .project-card {
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
    cursor: pointer;
  }

  .project-icon {
    border-radius:50%;
    width:50px;
    height:50px;
    overflow:hidden;
    text-align:center;
  }

  .icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .default-icon {
    font-size: 40px;
    color: grey;
  }

  .active-project {
    color: green;
  }

  .inactive-project {
    color: darkred;
  }

  .projects-time {
    display: flex;
    flex-direction: row;
    font-weight: bold;
  }

  .time-headers {
    margin-right: 8px;
    font-weight: 500;
  }

  .projects-status {
    width: 20%;
  }

  .projects-name {
    width: 20%;
  }
</style>
