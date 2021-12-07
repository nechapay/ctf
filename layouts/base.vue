<template>
  <div class="base">
    <!--<div class="base__header">-->
      <!--<v-header/>-->
    <!--</div>-->

    <div class="base__content">
      <slot/>
    </div>

    <!--<div class="base__footer">-->
      <!--<v-footer/>-->
    <!--</div>-->
  </div>
</template>

<script>
  import Header from '~/components/Header'
  import Footer from '~/components/Footer'

  export default {
    components: {
      vHeader: Header,
      vFooter: Footer
    },
    mounted () {
      // this.$io.on('updateTable', () => {
      //   this.$store.dispatch()
      // })
    }
  }
</script>

<style lang="scss" scoped>
  .base {
    height: 100vh;
    width: 100%;
    min-height: $layout-min-height;
    min-width: $layout-min-width;
    display: grid;
    grid-template-rows: [h-start] auto [h-end c-start] minmax(0, 1fr) [c-end footer-start] auto [footer-end];
    grid-template-columns: [h-start c-start footer-start] 1fr auto 1fr [h-end c-end footer-end];

    &__header {
      grid-row-start: h-start;
      grid-row-end: h-end;
      grid-column-start: h-start;
      grid-column-end: h-end;
    }

    &__content {
      grid-row: c-start / c-end;
      grid-column: c-start / c-end;

      /*background: linear-gradient(135deg, #B6CFFF 10%, lighten(#AEFFDA, 10%), #AEFFF6);*/
      background: lighten($accent-color, 0%);
    }

    &__footer {
      grid-row-start: footer-start;
      grid-row-end: footer-end;
      grid-column-start: footer-start;
      grid-column-end: footer-end;
    }
  }
</style>
