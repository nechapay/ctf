<template>
  <div class="task-block">
    <h2>{{title}}</h2>
    <div>{{name}}</div>
    <div>Баллы: {{score}}</div>
    <a href="" @click.prevent="downloadFile">Скачать задание</a>

    <template v-if="!task.fail && !task.done">
      <el-input v-if="auth" v-model="answer">
        <el-button :disabled="!isCheck" slot="append" @click="handleAnswer">Ответить</el-button>
      </el-input>
      <nuxt-link v-else to="login">Авторизация</nuxt-link>
    </template>
  </div>
</template>

<script>
  import FileSaver from 'file-saver'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Task',
    props: {
      task: {
        type: Object,
        default: null
      }
    },
    data () {
      return {
        answer: ''
      }
    },
    computed: {
      title: function () {
        return this.task ? this.task.category : ''
      },
      name: function () {
        return this.task ? this.task.name : ''
      },
      score: function () {
        return this.task ? this.task.score : ''
      },
      isCheck: function () {
        return !!this.answer
      },
      ...mapGetters({
        auth: 'user/auth',
        user: 'user/user'
      })
    },
    methods: {
      async downloadFile () {
        const path = `/api/tasks/get-file?cat=${this.task.categoryId}&id=${this.task.id}`

        const response = await fetch(path)

        if (response.ok) {
          let filename = ''
          response.headers.get('Content-Type') !== 'application/zip' ? filename = 'Задание.docx' : filename = 'Задание.zip'
          FileSaver.saveAs(await response.blob(), filename)
        }
      },
      async handleAnswer () {
        try {
          const response = await fetch('/api/tasks/answer', {
            method: 'post',
            headers: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
              user: this.user.id,
              category: this.task.categoryId,
              task: this.task.id,
              answer: this.answer
            })
          })

          if (response.ok) {
            const data = await response.json()

            if (data.success) {
              if (data.isTrue) {
                this.$message.success('Ответ верный')
              } else {
                this.$message.error('Ответ неверный')
              }

              await this.$store.dispatch('user/getAnswers')
            }
          } else {
            console.log(response)
            this.$message.error('Ошибка проверки ответа')
          }
        } catch (err) {
          console.log(err)
          this.$message.error('Ошибка проверки ответа')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .task-block {
    height: 220px;
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid lighten($accent-color, 50%);
    border-radius: 20px;
    padding: 1rem;
    background-color: white;
  }
</style>
