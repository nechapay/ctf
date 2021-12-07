<template>
  <div class="loading">
    <transition name="fade" mode="out-in">
      <div v-if="loading" key="spinner" class="loading__spinner">
        <spinner-dots v-if="type === 'dots'" :color="color" :size="size"/>
      </div>

      <div v-else><slot/></div>
    </transition>
    <!--<transition-group name="fade" mode="out-in">-->
      <!--<div v-show="loading" key="spinner" class="loading__spinner">-->
        <!--<spinner-dots v-if="type === 'dots'" :color="color" :size="size"/>-->
      <!--</div>-->

      <!--<div v-show="!loading" key="slot"><slot/></div>-->
    <!--</transition-group>-->
  </div>
</template>

<script>
  import SpinnerDots from '~/components/helpers/SpinnerDots'

  export default {
    name: 'loading',
    components: {
      SpinnerDots
    },
    props: {
      color: {
        type: String,
        default: '#fff'
      },
      loading: {
        type: Boolean,
        default: false
      },
      size: {
        type: String,
        default: 'default'
      },
      type: {
        type: String,
        default: 'dots'
      }
    }
  }
</script>

<style lang="scss">
  .loading__spinner {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loading {
    .fade-enter-active,
    .fade-leave-active {
      transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
  }
</style>
