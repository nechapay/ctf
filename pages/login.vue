<template>
  <section
    class="login"
  >
    <div style="text-align: center;">
      <el-input v-model="login" placeholder="login" class="mb-2"></el-input>
      <el-input v-model="password" type="password" placeholder="password" class="mb-2"></el-input>
      <el-button @click="handleClick">Login</el-button>
    </div>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        login: '',
        password: ''
      }
    },
    methods: {
      async handleClick () {
        try {
          const response = await fetch(`/api/auth/login`, {
            method: 'post',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
              login: this.login,
              password: this.password
            })
          })
          if (response.ok) {
            const data = await response.json()
            this.$store.commit('user/SET_AUTHENTICATED', true)
            this.$store.commit('user/SET_USER', data.data)

            await this.$store.dispatch('user/getAnswers')

            this.$router.push('/')
          }
        } catch (err) {
          console.log(err)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~/assets/scss/mixins/_breackpoints.scss";

  $image-one-width: 150px;
  $image-two-width: $image-one-width;
  $image-three-width: $image-one-width * 2;

  $image-one-height: 300px;
  $image-two-height: $image-one-height;

  .login {
    height: 100%;
    width: 100%;
    position: relative;
    min-width: $layout-min-width;
    display: flex;
    flex-direction: column;
    justify-content: safe center;
    align-items: safe center;
    padding: map_get($spacers, 3);
    overflow: auto;
  }
</style>
