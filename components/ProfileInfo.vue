<template>
  <div
    class="profile-info"
  >
    <div class="profile-info__name">{{ firstName }}</div>
    <img :src="profilePhoto" alt="profile photo" class="profile-info__avatar">
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'ProfileInfo',
    computed: {
      ...mapGetters({
        user: 'user/user',
        receiving: 'user/receivingUserInfo'
      }),
      profilePhoto () {
        return this.user ? this.user.profilePhoto : ''
      },
      firstName () {
        return this.user ? this.user.firstName : ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .profile-info {
    display: flex;
    align-items: center;

    &__name {
      margin-right: map_get($spacers, 3);
    }

    &__avatar {
      height: $avatar-height;
      width: $avatar-width;
      border-radius: 50%;
    }
  }
</style>
