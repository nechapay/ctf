<template>
  <div class="header">
    <div class="container header__container">
      <div class="header__item"><logo text="avemystory" :link="home" tabindex="1"></logo></div>

      <loading v-if="$store.state.user.authenticated" :loading="receiving">
        <profile-info/>
      </loading>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import ProfileInfo from '~/components/ProfileInfo'
  import Logo from '~/components/Logo'

  export default {
    name: 'Header',
    components: {
      ProfileInfo,
      Logo
    },
    computed: {
      ...mapGetters({
        receiving: 'user/receivingUserInfo',
        home: 'menu/home'
      })
    }
  }
</script>

<style lang="scss" scoped>
  $padding: map_get($spacers, 3);

  .header {
    height: $avatar-height + $padding * 2;
    width: 100%;
    padding: $padding;
    color: $invert-color;
    background: linear-gradient(to right, $accent-color 0, $second-light-color 120%);

    &__container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
    }
  }
</style>
