<template>
  <div class="link__wrapper">
    <nuxt-link
      v-if="!disabled"
      v-bind="$attrs"
      v-on="$listeners"
      :class="linkClass"
    ><slot/></nuxt-link>
    <div v-else class="link-disabled"><slot/></div>
  </div>
</template>

<script>
  export default {
    name: 'Link',
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      invert: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      linkClass: function () {
        return {
          'link': true,
          'link_invert': this.invert
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .link {
    display: inline-block;
    font-size: $font-size;
    text-decoration: none;
    color: $accent-color;
    transition: color 200ms ease 0ms;

    &:hover {
      color: darken($accent-color, 15%);
    }

    &__wrapper {
      display: inline-block;
    }

    &_invert,
    &_invert:hover {
      color: $invert-color;
    }
  }

  .link-disabled {
    display: inline;
    font-size: $font-size;
    color: $accent-color;
    cursor: not-allowed;
  }
</style>
