<template>
  <div class="button__wrapper">
    <button
      :disabled="disabled"
      :class="buttonClass"
      @click="handleClick"
    >
      <span class="button__text"><slot/></span>
    </button>

    <div v-if="disabled" class="button__wall"></div>
  </div>
</template>

<script>
  export default {
    name: 'Button',
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      bordered: Boolean,
      outline: Boolean,
      rounded: Boolean,
      simple: Boolean,
      size: String,
      type: String
    },
    data () {
      return {}
    },
    computed: {
      buttonClass: function () {
        let cl = {
          'button': true
        }

        cl = this.getSize(cl)
        cl = this.getType(cl)

        if (this.disabled) cl['button_disabled'] = true
        if (this.bordered) cl['button_bordered'] = true
        if (this.outline) cl['button_outline'] = true
        if (this.rounded) cl['button_rounded'] = true
        if (this.simple) cl['button_simple'] = true

        return cl
      }
    },
    methods: {
      getSize (cl) {
        if (this.size === 'xs') {
          cl['button_xs'] = true
        }
        if (this.size === 'sm') {
          cl['button_sm'] = true
        }
        if (this.size === 'md') {
          cl['button_md'] = true
        }
        if (this.size === 'lg') {
          cl['button_lg'] = true
        }
        if (this.size === 'xl') {
          cl['button_xl'] = true
        }

        return cl
      },
      getType (cl) {
        if (this.type === 'primary') {
          cl['button_primary'] = true
        }
        if (this.type === 'success') {
          cl['button_success'] = true
        }

        return cl
      },
      handleClick (e) {
        this.$emit('click', e)
      }
    }
  }
</script>

<style lang="scss" scoped>
  $border-radius: .6rem;
  $duration: 300ms;

  $name: button;
  $primary-name: '#{$name}_primary';
  $success-name: '#{$name}_success';

  @mixin button-layouts {
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition: opacity $duration ease-in;
  }

  @mixin gradient($color, $second-color, $duration) {
    background-image: linear-gradient(to top, $color 0%, $second-color 100%);
    display: inline-block;
    position: relative;
    -webkit-backface-visibility: hidden;
    z-index: 1;

    &::before {
      @include button-layouts;
      background-image: linear-gradient(to top, $second-color 0%, $color 100%);
      z-index: 2;
    }

    &::after {
      @include button-layouts;
      background: #fff;
      z-index: 3;
    }

    &:hover {
      &::after {
        opacity: .3;
      }
    }

    &:active {
      &::before {
        opacity: 1;
      }

      &:hover {
        &::after {
          opacity: 0;
        }
      }
    }
  }

  @mixin type($typeName, $color, $bg1, $bg2, $duration) {
    .#{$typeName} {
      color: $color;
      @include gradient($bg1, $bg2, $duration);
    }

    .#{$name}_bordered.#{$typeName} {
      border: 1px solid $bg1;
      transition: border $duration ease;

      &:hover {
        border-color: lighten($bg1, 25%);
      }
    }

    .#{$name}_simple.#{$typeName} {
      border: none;
      background: none !important;
      background-image: none !important;
      color: $bg1;

      &:hover {
        border-color: unset;
        color: lighten($bg1, 10%);
      }

      &::before,
      &::after {
        background: none !important;
        background-image: none !important;
      }
    }

    .#{$name}_outline.#{$typeName} {
      border: 1px solid $bg1;
      background: none !important;
      background-image: none !important;
      color: $bg1;

      &:hover {
        color: lighten($bg1, 10%);
        border-color: lighten($bg1, 25%);
      }
    }
  }

  .#{$name} {
    border: none;
    font-size: $font-size * 1.25;
    padding: map_get($spacers, 2) map_get($spacers, 3);
    color: $primary-color;
    background: $invert-color;
    font-family: $font-accent;
    cursor: pointer;

    &_bordered {
      border: 1px solid darken($invert-color, 20%);
    }

    &_rounded {
      border-radius: $border-radius;

      &::before {
        border-radius: $border-radius;
      }

      &:not(:active) {
        &::before {
          border-radius: inherit;
        }
      }
    }

    &__text {
      position: relative;
      z-index: 3;
    }

    &_xs {
      font-size: $font-size * .75;
      padding: map_get($spacers, 1) map_get($spacers, 2);

      .#{$name}__text {
        bottom: .6px;
      }
    }

    &_sm {
      font-size: $font-size;
      padding: map_get($spacers, 1) map_get($spacers, 3);
    }

    &_md {
      font-size: $font-size * 1.25;
      padding: map_get($spacers, 2) map_get($spacers, 3);
    }

    &_lg {
      font-size: $font-size * 1.5;
      padding: map_get($spacers, 2) map_get($spacers, 4);
    }

    &_xl {
      font-size: $font-size * 2;
      padding: map_get($spacers, 3) map_get($spacers, 5);

      .#{$name}__text {
        bottom: .6px;
      }
    }

    &__wrapper {
      display: inline-block;
      position: relative;
    }

    &__wall {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      border-radius: $border-radius;
      background: transparentize($invert-color, .5);
      cursor: not-allowed;
      z-index: 10;
    }
  }

  @include type($primary-name, $invert-color, $accent-color, lighten($accent-color, 20%), $duration);
  @include type($success-name, $invert-color, $third-color, lighten($third-color, 20%), $duration);
</style>
