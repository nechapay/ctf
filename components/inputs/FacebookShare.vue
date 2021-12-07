<template>
    <div
      class="fb-share-button"
      :data-href="url"
      data-layout="button_count"
      data-size="small"
      data-mobile-iframe="true">
      <a target="_blank"
         :href="link"
         class="fb-xfbml-parse-ignore"
      >Поделиться</a>
    </div>
</template>

<script>
  import { fixedEncodeURIComponent } from '~/utilities'

  export default {
    name: 'FacebookShare',
    props: {
      idRoot: {
        type: String,
        default: 'fb-root'
      },
      url: String
    },
    data () {
      return {
        initialization: false,
        id: 'facebook-jssdk'
      }
    },
    computed: {
      link: function () {
        return `https://www.facebook.com/sharer/sharer.php?u=${fixedEncodeURIComponent(this.url)}&amp;src=sdkpreparse`
      }
    },
    async mounted () {
      this.initialization = true

      if (!this.testIdRoot()) {
        this.addIdRoot()
      }

      this.init()

      this.initialization = false
    },
    destroyed () {
      this.destroy()
    },
    methods: {
      testIdRoot () {
        return !!document.getElementById(this.idRoot)
      },
      addIdRoot () {
        const body = document.getElementsByTagName('body')[0]
        const el = document.createElement('div')
        el.id = this.idRoot

        body.appendChild(el)
      },
      init () {
        const s = 'script'
        const id = this.id

        const fjs = document.getElementsByTagName(s)[0]

        if (document.getElementById(id)) return

        const js = document.createElement(s)
        js.id = id

        js.src = 'https://connect.facebook.net/ru_RU/sdk.js#xfbml=1' +
          '&version=v3.0&appId=336824703510183&autoLogAppEvents=1'
        fjs.parentNode.insertBefore(js, fjs)
      },
      destroy () {
        if ('FB' in window) {
          delete window.FB
        }

        let el = document.getElementById(this.idRoot)
        if (el) el.remove()

        el = document.getElementById(this.id)
        if (el) el.remove()
      }
    }
  }
</script>
