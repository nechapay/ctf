<template>
  <v-button
    :disabled="disabled"
    :size="size"
    :type="type"
    rounded
    @click="handleClick"
  >{{ caption }}</v-button>
</template>

<script>
  export default {
    name: 'vk-login-button',
    props: {
      caption: {
        type: String,
        default: 'Войти'
      },
      disabled: {
        type: Boolean,
        default: false
      },
      size: String,
      type: String
    },
    methods: {
      async handleClick () {
        const scope = ['docs', 'photos', 'wall'].reduce((res, i) => {
          return res + this.$store.state.masks[i]
        }, 0)
        const scopeStandalone = ['docs', 'messages', 'photos', 'wall'].reduce((res, i) => {
          return res + this.$store.state.masks[i]
        }, 0)

        try {
          if (this.$store.state.hasExtension) {
            await this.$vk.loginStandalone(scopeStandalone, this.$store.state.extensionId)
            this.$emit('login', this.$vk.userId)
          } else {
            await this.$vk.login(scope)
            this.$emit('login', this.$vk.userId)
          }
        } catch (err) {
          this.$emit('error', err)
        }
      }
    }
  }
</script>

<style scoped>

</style>
