<template>
  <div class="error-page">
    Error
    <!--<v-error v-if="error.statusCode === 404" :body="e404"></v-error>-->
    <!--<v-error v-else :body="unknown"></v-error>-->

    <!--<div class="error-page__home-link">-->
      <!--<nuxt-link :to="$store.getters['menu/home']">Вернуться на главную</nuxt-link>-->
    <!--</div>-->
  </div>
</template>

<script>
  import Error from '~/components/Error'

  export default {
    components: {
      vError: Error
    },
    props: [
      'error'
    ],
    data () {
      return {
        e404: 'Страница не найдена',
        unknown: 'Неизвестная ошибка'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .error-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: $layout-min-height;
    min-width: $layout-min-width;
    height: 100%;
    padding: map_get($spacers, 3) map_get($spacers, 5) * 2;

    &__home-link {
      margin-top: map_get($spacers, 5);
    }
  }
</style>
