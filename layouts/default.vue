<template>
  <div class="main-layout">
    <v-base>
      <nuxt/>
    </v-base>
  </div>
</template>

<script>
  import Base from './base'
  // import Workspace from './workspace'
  // import { mapGetters } from 'vuex'

  export default {
    components: {
      vBase: Base
      // Workspace
    }
    // computed: {
    //   ...mapGetters({
    //     auth: 'user/auth'
    //   })
    // }
  }
</script>

<style lang="scss">
  .main-layout {
    overflow-y: hidden;
  }
</style>
