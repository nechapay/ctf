<template>
  <div class="task">
    <transition name="fade" mode="out-in">
      <div v-if="task === null" key="list" class="task__group">
        <template v-for="t in displayTasks">
          <div
            v-for="tt in t.tasks"
            :class="{ task__block: true, task__block_fail: tt.fail, task__block_done: tt.done}"
            @click="handleTaskBlockClick(tt, t)"
          >
            <h4 class="task__block-title">{{t.name}}</h4>
            <div class="task__block-task">{{tt.name}}</div>
            <div class="task__block-score">{{tt.score}}</div>
          </div>
        </template>
      </div>
      <div v-else key="one">
        <span class="task__btn-prev" @click="handlePrev"><i class="el-icon-arrow-left"></i>Назад</span>
        <task :task="task" class="mt-3"/>
      </div>
    </transition>
  </div>
</template>

<script>
  import Task from '~/components/Task'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Tasks',
    components: {
      Task
    },
    data () {
      return {
        // tasks: []
      }
    },
    computed: {
      displayTasks: function () {
        return this.tasks
      },
      ...mapGetters({
        tasks: 'user/tasks',
        task: 'user/task'
      })
    },
    async mounted () {
      await this.getData()
    },
    methods: {
      async getData () {
        this.$store.dispatch('user/getData')
      },
      handleTaskBlockClick (task, category) {
        this.setTask(task, category)
      },
      handlePrev () {
        this.setTask(null)
      },
      setTask (task, category) {
        if (task !== null) {
          const t = Object.assign({}, task)

          t.category = category.name
          t.categoryId = category.id

          this.$store.commit('user/SET_TASK', t)
        } else this.$store.commit('user/SET_TASK', task)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .task {
    width: 100%;

    &__group {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    &__block {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 140px;
      width: 220px;
      border-radius: 3px;
      background-color: transparent;
      border: 1px solid $invert-color;
      margin: 2px;
      padding: 10px;
      cursor: pointer;
      opacity: 1;
      transition: background-color 300ms ease, width 300ms ease;

      &:hover {
        background-color: transparentize($invert-color, .6);

        .task__block-title {
          color: $accent-color;
        }

        .task__block-score {
          color: $accent-color;
        }
      }

      &_active {
        width: 100%;
      }

      &_done {
        background-color: $success-color;
      }

      &_fail {
        background-color: $danger-color;
      }
    }

    &__block-title {
      color: $invert-color;
      transition: color 300ms ease;
    }

    &__block-task {
      color: darken($invert-color, 90%);
    }

    &__block-score {
      color: $invert-color;
      transition: color 300ms ease;
    }

    &__btn-prev {
      font-size: $font-size * 2;
      color: $invert-color;
      cursor: pointer;
    }
  }
</style>
