<template>
  <div :class="styleClass">
    <img v-lazy-load="image" :alt="title" :src="placeholder" class="thumbnail__image lazy-loaded">
    <div v-show="selectable" :class="selectClass" :tabindex="tabindex"
         @click.stop="handleSelect"
         @keyup.enter.space="handleSelect"
    ></div>
    <div class="thumbnail__title-container">
      <div class="thumbnail__title-part"><span class="thumbnail__text">{{ title }}</span></div>
      <div v-if="count !== ''" class="thumbnail__count-part"><span class="thumbnail__text">{{ count }}</span></div>
    </div>
  </div>
</template>

<script>
  // eslint-disable-next-line no-unused-vars
  import placeholder from '~/assets/images/placeholder.png'

  export default {
    name: 'Thumbnail',
    props: {
      data: {
        type: Object,
        default: null
      },
      image: {
        type: String,
        default: ''
      },
      count: {
        type: [Number, String],
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      selectable: {
        type: Boolean,
        default: true
      },
      defaultChecked: {
        type: Boolean,
        default: true
      },
      styleClass: {
        type: Object,
        default: () => ({
          'thumbnail__block_default': true
        })
      },
      tabindex: Number
    },
    data () {
      return {
        selected: true,
        placeholder
      }
    },
    computed: {
      selectClass: function () {
        return {
          'thumbnail__block_selectable': true,
          'thumbnail__block_selectable-selected': this.selected
        }
      }
    },
    created () {
      if (!this.defaultChecked) this.selected = false
    },
    methods: {
      handleSelect () {
        this.selected = !this.selected

        this.$emit('change-selection', this.selected, this.data)
      }
    }
  }
</script>

<style lang="scss" scoped>
  $height: 130px;
  $ratio: 1.5;
  $background-color: rgba($primary-color, .7);

  .thumbnail {
    &__block {
      &_default {
        height: $height;
        width: $height * $ratio;
        background-size: cover;
        background-position: center center;
        position: relative;
        overflow: hidden;
      }

      &_selectable {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        border: 2px solid $accent-color;
        cursor: pointer;
        color: $accent-color;
        opacity: 0;
        transition: opacity 200ms ease 0s;

        &:focus {
          opacity: 1;
          border-color: $second-color;
        }
      }

      &_selectable-selected {
        opacity: 1;

        &::before {
          content: '';
          position: absolute;
          right: 0;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 0 50px 50px 0;
          border-color: transparent $accent-color transparent transparent;
        }

        &::after {
          content: '';
          position: absolute;
          width: 25px;
          height: 10px;
          top: 5px;
          right: 2px;
          border: 3px solid #fff;
          border-right: 0;
          border-top: 0;
          transform: rotate(-45deg);
          transform-origin: center;
        }
      }
    }

    &__title-container {
      font-size: $font-size * 0.8;
      font-weight: bold;
      color: #fff;
      background: $background-color;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      bottom: 0;
      width: 100%;
      max-height: $height / 2;
      overflow: hidden;
      padding: map_get($spacers, 2);
    }

    &__title-part {
      position: relative;
      max-width: 80%;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &__count-part {
      margin-left: map_get($spacers, 2);
    }

    &__text {
      font-size: $font-size * 0.8;
      font-weight: bold;
      color: #fff;
    }

    &__image {
      height: 100%;
      object-fit: cover;
    }
  }
</style>
