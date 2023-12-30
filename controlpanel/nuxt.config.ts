import { defineNuxtConfig } from 'nuxt/config';
import { resolve } from 'path'; 

export default defineNuxtConfig({
  ssr: false,
  runtimeConfig: {
      public: {
          ENV: process.env.ENV || 'local',
          APP_TITLE: process.env.APP_TITLE || 'controlpanel',
          LOCALDOMAIN: process.env.LOCALDOMAIN || 'localhost',
          FIREBASE_API_KEY: process.env.FIREBASE_API_KEY || '',
          FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN || '',
          FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || '',
          FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET || '',
          FIREBASE_MESSAGING_SENDERID: process.env.FIREBASE_MESSAGING_SENDERID || '',
          FIREBASE_APPID: process.env.FIREBASE_APPID || '',
          FIREBASE_LOCAL_HOST: process.env.FIREBASE_LOCAL_FUNCTION_DOMAIN || 'localhost',
          FIREBASE_LOCAL_AUTH_PORT: process.env.FIREBASE_LOCAL_AUTH_HOST || '9099',
          FIREBASE_LOCAL_FIRESTORE_PORT: process.env.FIREBASE_LOCAL_FIRESTORE_PORT || '8080',
          FIREBASE_LOCAL_FUNCTION_PORT: process.env.FIREBASE_LOCAL_FUNCTION_PORT || '5001',
          FIREBASE_LOCAL_STORAGE_PORT: process.env.FIREBASE_LOCAL_STORAGE_PORT || '9199',
          AES_KEY: process.env.AES_KEY || '',
          AES_IV: process.env.AES_IV || '',
          // XXX 書き換え用
          superuseruids: ['QxEQhYJVEBUGxSx6CuSZVWCb2cb2',],
      },
  },

  app: {
    head: {
      title: process.env.APP_TITLE || "管理ツール",
      meta: [
        { 'http-equiv': 'x-ua-compatible', 'content': 'IE=edge' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' }
      ]
    }
  },

  build: {
    transpile: [
      'chart.js',
      'primevue'
    ]
  },

  components: {
    dirs: [
      {
        extensions: ['vue'],
        global: true,
        path: '~/components/common/',
        pathPrefix: false
      },
      '~/components/application/'
    ]
  },

  css: [
    'primevue/resources/primevue.css',
    'primeflex/primeflex.css',
    'primeicons/primeicons.css',
    'prismjs/themes/prism-coy.css',
    '~/assets/styles/application/layout-custom.scss',
    // '~/assets/demo/flags/flags.css',
    '~/assets/styles/application/main.css',
  ],

  dir: {
    public: '../public/'
  },

  experimental: {
    reactivityTransform: true
  },

  googleFonts: {
    families: {
      Inter: true
    }
  },

  imports: {
    autoImport: true,
    addons: {
      vueTemplate: true
    },
    dirs: [
      'composables/**'
    ]
  },

  macros: {
    reactivityTransform: true
  },

  modules: [
    'nuxt-icon',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@vite-pwa/nuxt',
    '@vue-macros/nuxt',
    'nuxt-typed-router',
    '@nuxtjs/google-fonts',
    '~/modules/primevue',
  ],

  nitro: {
    preset: 'vercel',
    output: {
      publicDir: process.env.ENV !== 'prod' ? '../../../private' : '../../../private'
    }
  },

  srcDir: 'src/',

  vite: {
    build: {
      sourcemap: false
    },
    clearScreen: true,
    logLevel: 'info'
  },

  pwa: {
    workbox: {
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'gstatic-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    }
  },
});
