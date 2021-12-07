const resolve = require('path').resolve

const isVueRule = (rule) => {
  return rule.test.toString() === '/\\.vue$/'
}
const isSASSRule = (rule) => {
  return ['/\\.sass$/', '/\\.scss$/'].indexOf(rule.test.toString()) !== -1
}
const sassResourcesLoader = {
  loader: 'sass-resources-loader',
  options: {
    resources: [
      resolve(__dirname, 'assets/scss/variables/_breackpoints.scss'),
      resolve(__dirname, 'assets/scss/variables/_colors.scss'),
      resolve(__dirname, 'assets/scss/variables/_fonts.scss'),
      resolve(__dirname, 'assets/scss/variables/_sizes.scss'),
    ]
  }
}

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    // title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:400,500&amp;subset=cyrillic' },
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Customize the loading indicator
  */
  loadingIndicator: {
    color: '#4A76A8',
    name: 'three-bounce'
  },

  /*
  ** Global CSS
  */
  css: [
    { src: '~assets/scss/main.scss', lang: 'scss' }
  ],

  router: {
    middleware: [
      'authentication'
    ]
  },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/error',
    '@/plugins/loading',
    '@/plugins/element-ui',
    '@/plugins/inputs',
    '@/plugins/lazy-loading',
    {
      src: '@/plugins/moment',
      ssr: false
    },
    // {
    //   src: '@/plugins/socket',
    //   ssr: false
    // },
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    // '@nuxtjs/axios'
  ],

  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    // analyze: {
    //   analyzerMode: 'static'
    // },
    babel: {
      'plugins': [
        'transform-async-generator-functions',
      ],
      'presets': [
        ['es2017', { modules: false }],
        'stage-2',
        'react'
      ]
    },
    transpile: ['element-ui'],

    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

      config.module.rules.forEach((rule) => {
        if (rule.test.toString() === '/\\.jsx?$/') {
          rule.use = []
        }

        if (isVueRule(rule)) {
          if (!rule.options.loaders) {
            rule.options.loaders = {
              sass: [],
              scss: []
            }
          }

          rule.options.loaders.sass.push(sassResourcesLoader)
          rule.options.loaders.scss.push(sassResourcesLoader)
        }
        if (isSASSRule(rule)) {
          if (rule.oneOf) {
            rule.oneOf.forEach(r => {
              r.use.push(sassResourcesLoader)
            })
          } else {
            rule.use.push(sassResourcesLoader)
          }
        }
      })
    }
  }
}
