<template>
  <div class="error">
    <p class="error__title">{{ title }}</p>
    <p class="error__text">{{ body }}</p>
  </div>
</template>

<script>
  export default {
    name: 'Error',
    props: {
      title: {
        type: String,
        default: 'Ошибка'
      },
      body: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .error {
    &__title {
      font-size: $font-size * 2;
      margin-bottom: $title-space-bottom;
      color: $accent-color;
    }

    &__text {
      font-size: $font-size * 1.25;
      margin-bottom: map_get($spacers, 3);

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
