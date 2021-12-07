<template>
  <div class="main">
    <score-table/>

    <!--<template v-if="auth">-->
      <h2 class="mb-3 mt-3">Задания</h2>
      <tasks></tasks>
    <!--</template>-->
  </div>
</template>

<script>
  import ScoreTable from '../../components/ScoreTable'
  import Tasks from '../../components/Tasks'

  export default {
    name: 'index',
    components: {
      ScoreTable,
      Tasks
    },
    data () {
      return {
        categories: [
          {
            name: ''
          }
        ]
      }
    },
    computed: {
      auth: function () {
        return this.$store.getters['user/auth']
      }
    }
  }
</script>

<style lang="scss" scoped>
  .main {
    width: 100%;
  }
</style>
