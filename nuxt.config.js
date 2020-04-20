const colors = require('vuetify/es5/util/colors').default

module.exports = {
  // server: {
  //   port: 3000, // default: 3000
  //   host: '0.0.0.0' // default: localhost, external access: 0.0.0.0
  // },
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + 'Web App', // process.env.npm_package_name,
    title: 'Pulmonapp', // || process.env.npm_package_name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  pwa: {
    meta: {
      name: 'Pulmonapp',
      author: 'Augusto Alves Silva',
      theme_color: '#03A9F4',
      lang: 'pt-br',
      mobileAppIOS: true
    }
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/vuetify-toast'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://auth.nuxtjs.org/
    '@nuxtjs/auth',
    // Doc: https://github.com/microcipcip/cookie-universal/tree/master/packages/cookie-universal-nuxt
    'cookie-universal-nuxt'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.API_URL
  },
  /*
   ** Auth module configuration
   ** See https://auth.nuxtjs.org/guide/scheme.html
   */
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/api/v1/auth/login',
            method: 'post',
            propertyName: 'token'
          },
          // refresh: { -> not yet supported before 5.x of @nuxt/auth : TO-DO
          //   url: '/users/refresh',
          //   method: 'post'
          // },
          logout: false,
          user: {
            url: '/api/v1/user/me',
            method: 'get',
            user: 'user'
          }
        },
        tokenRequired: true,
        tokenType: 'Bearer'
      },
      redirect: {
        login: '/login'
      }
    }
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        light: {
          primary: '#03a9f4',
          secondary: '#3f51b5',
          accent: '#9c27b0',
          error: '#ff5722',
          warning: '#ffeb3b',
          info: '#00bcd4',
          success: '#8bc34a'
        },
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
