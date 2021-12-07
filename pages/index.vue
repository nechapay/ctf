<template>
  <section
    class="main"
  >
    <div class="main__header">
      <h1>CTF</h1>
      <nuxt-link v-if="!auth" to="login" class="main__login">Авторизация</nuxt-link>
      <span v-else class="main__login">{{$store.state.user.user.name}}</span>
    </div>
    <nuxt-child/>
  </section>
</template>

<script>
  export default {
    data () {
      return {
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
  @import "~/assets/scss/mixins/_breackpoints.scss";

  $image-one-width: 150px;
  $image-two-width: $image-one-width;
  $image-three-width: $image-one-width * 2;

  $image-one-height: 300px;
  $image-two-height: $image-one-height;

  .main {
    height: 100%;
    width: 100%;
    position: relative;
    min-width: $layout-min-width;
    display: flex;
    flex-direction: column;
    /*justify-content: safe center;*/
    align-items: safe start;
    padding: map_get($spacers, 3);
    overflow: auto;

    &__header {
      display: flex;
      justify-content: space-between;
      width: 100%;
      border-bottom: 1px solid $invert-color;
      margin-bottom: 1rem;
    }

    &__login {
      color: $invert-color;
      font-size: $font-size;
    }
  }
</style>
