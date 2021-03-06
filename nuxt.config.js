export default {
  mode: 'universal',
  ssr: true,
  target: 'server',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'DIYAutoFeed',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
    ],
    script: [
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/theme.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/api.js', ssr: false },
    { src: '~/plugins/persist.js', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/tailwindcss',
    'nuxt-purgecss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    ['@nuxtjs/dotenv', { systemvars: true }],
    [
      'nuxt-fontawesome', {
        imports: [
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: ['fas'],
          },
          {
            set: '@fortawesome/free-brands-svg-icons',
            icons: ['fab'],
          },
          {
            set: '@fortawesome/free-regular-svg-icons',
            icons: ['far'],
          },
        ],
      },
    ],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    proxy: false,
    proxyHeaders: false,
    credentials: false,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  tailwindcss: {
    mode: 'jit',
  },

  publicRuntimeConfig: {
    API_URL: process.env.API_URL || 'http://localhost',
  },
  purgeCSS: {
    whitelistPatterns: [/(^|\.)fa-/, /-fa($|\.)/],
  },
};
