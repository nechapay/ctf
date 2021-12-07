<template>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
           xmlns:xlink="http://www.w3.org/1999/xlink"
           viewBox="0 0 200 100" enable-background="new 0 0 0 0"
           xml:space="preserve"
           :class="spinnerClass"
      >
        <circle class="circle" cx="35" cy="50" r="15" :style="circleStyle">
          <animate
            attributeName="opacity"
            dur="0.9s"
            values="0.3;1;0.3"
            repeatCount="indefinite"
            begin="0s"/>
          <animate attributeName="r" begin="0s" dur="0.9s" repeatCount="indefinite" values="15;30;15"/>
        </circle>
        <circle class="circle" cx="100" cy="50" r="15" :style="circleStyle">
          <animate
            attributeName="opacity"
            dur="0.9s"
            values="0.3;1;0.3"
            repeatCount="indefinite"
            begin="0.3s"/>
          <animate attributeName="r" begin="0.3s" dur="0.9s" repeatCount="indefinite" values="15;30;15"/>
        </circle>
        <circle class="circle" cx="165" cy="50" r="15" :style="circleStyle">
          <animate
            attributeName="opacity"
            dur="0.9s"
            values="0.3;1;0.3"
            repeatCount="indefinite"
            begin="0.6s"/>
          <animate attributeName="r" begin="0.6s" dur="0.9s" repeatCount="indefinite" values="15;30;15"/>
        </circle>
      </svg>
</template>

<script>
  export default {
    name: 'SpinnerDots',
    props: {
      color: String,
      size: {
        type: String,
        default: 'default'
      }
    },
    computed: {
      spinnerClass: function () {
        const cl = {
          'spinner': true
        }

        switch (this.size) {
          case 'lg':
            cl['spinner_lg'] = true
            break
          case 'xl':
            cl['spinner_xl'] = true
            break
        }

        return cl
      },
      circleStyle: function () {
        if (this.color) return { 'fill': this.color }
        return {}
      }
    }
  }
</script>

<style lang="scss">
  $height: 1rem;
  $width: 2rem;
  $color: #fff;

  .spinner {
    height: $height;
    width: $width;

    &_lg {
      height: $height * 2;
      width: $width * 2;
    }

    &_xl {
      height: $height * 3;
      width: $width * 3;
    }

    .circle {
      fill: $color;
      stroke: none;
    }
  }
</style>
