<template>
  <div class="score-table">
    <el-table
      :data="displayTeams"
      class="score-table__table"
    >
      <el-table-column
        type="index"
      />
      <el-table-column
        label="Название"
        prop="name"
      />
      <el-table-column
        label="Баллы"
        prop="score"
      />
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'ScoreTable',
    data () {
      return {
        teams: [],
        intervalId: 0
      }
    },
    computed: {
      displayTeams: function () {
        return this.teams.sort((a, b) => {
          if (a.score < b.score) return 1
          if (a.score > b.score) return -1
          return 0
        })
      }
    },
    async mounted () {
      this.intervalId = setInterval(() => {
        this.getData()
      }, 5000)
    },
    destroyed () {
      if (this.intervalId > 0) {
        clearInterval(this.intervalId)
        this.intervalId = 0
      }
    },
    methods: {
      async getData () {
        // await this.$store.dispatch('user/getScore')
        // this.teams = []

        const response = await fetch('/api/tasks/score')

        if (response.ok) {
          const res = await response.json()
          if (res.success) {
            this.teams = res.data
          } else {
            this.teams = []
          }
        } else {
          this.teams = []
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .score-table {
    width: 100%;

    &__table {
    }
  }
</style>
