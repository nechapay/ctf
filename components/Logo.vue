<template>
  <nuxt-link :to="link" class="logo" :style="logoStyle">
    <svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 64.168397 100.90326">
      <path
        class="logo__path"
        :style="logoPathStyle"
        d="m 61.447286,16.215963 c -3.42,-5.94 -7.92,-10.0799996 -13.5,-12.7799996 -5.76,-2.69999996 -12.24,-3.77999996 -18.54,-2.87999996 -7.02,0.89999996 -12.6,4.13999996 -16.92,8.45999996 -4.5,4.8599996 -7.38,10.9799996 -7.92,17.2799996 -0.36,4.5 0.54,9 2.52,13.5 1.98,4.14 4.5,7.56 8.46,10.8 2.88,2.16 5.58,3.96 8.64,5.04 2.34,0.9 4.86,1.8 7.56,2.34 1.98,0.54 3.6,1.08 5.58,1.8 1.26,0.54 3.0125,1.23625 4.338036,2.250714 1.825178,1.505536 2.681964,3.149286 3.401964,4.769286 0.72,1.62 0.9,3.24 0.9,5.22 -0.36,2.88 -1.44,5.22 -3.24,7.02 -1.98,1.98 -4.14,3.06 -7.02,3.6 -3.06,0.54 -6.48,0 -9.54,-1.44 -2.52,-1.08 -4.5,-3.06 -6.12,-5.76 -0.54,-0.9 -0.72,-1.8 -0.9,-2.34 -0.18,-0.54 -0.528839,-1.741339 -0.72,-2.7 l -18.17999998,2.52 c 0.36,2.34 0.72,4.32 1.25999998,5.94 0.72,1.98 1.26,3.42 2.34,5.4 3.24,6.3 8.64,10.8 14.4,13.5 6.3,3.059997 13.32,3.959997 19.8,3.059997 7.38,-0.899997 13.5,-4.139997 18,-8.999997 4.86,-5.22 7.56,-11.34 8.28,-18.36 0.36,-4.86 -0.36,-9.36 -2.52,-14.22 -1.98,-4.5 -5.04,-8.28 -9.18,-11.52 -2.7,-2.34 -5.58,-3.96 -8.46,-5.04 -2.52,-1.08 -5.04,-1.62 -7.56,-2.34 -1.98,-0.54 -3.6,-1.08 -5.58,-1.8 -1.26,-0.54 -2.7,-1.26 -3.96,-2.16 -1.62,-1.44 -2.7,-2.88 -3.24,-4.14 -0.72,-1.26 -0.9,-2.88 -0.72,-4.5 0.18,-2.34 1.08,-4.32 2.7,-5.94 1.62,-1.62 3.6,-2.7 5.94,-3.06 2.7,-0.36 5.4,0.18 8.28,1.44 2.16,1.26 3.96,2.7 5.22,4.86 z m 0,0 -16.2,8.82 z"
      />
    </svg>
    <div class="logo__text" :style="logoTextStyle">{{ text }}</div>
  </nuxt-link>
</template>

<script>
  export default {
    name: 'Logo',
    props: {
      link: {
        type: String,
        default: '/'
      },
      color: {
        type: String,
        default: '#fff'
      },
      letterColor: String,
      height: {
        type: [Number, String],
        default: 50
      },
      text: String
    },
    computed: {
      logoStyle: function () {
        return {
          'height': typeof this.height === 'number' ? this.height + 'px' : this.height
        }
      },
      logoPathStyle: function () {
        return {
          'fill': this.letterColor ? this.letterColor : this.color
        }
      },
      logoTextStyle: function () {
        return {
          'color': this.color
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .logo {
    display: flex;
    align-items: center;
    text-decoration: none;

    &:hover {
      text-decoration: none;
    }

    &__text {
      font-family: $font-accent;
      align-self: flex-end;
      font-size: $font-size * 2;
      line-height: .8;
    }
  }
</style>
