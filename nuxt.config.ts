// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },


  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  css: ['~/assets/css/tailwind.css'],

  routeRules: {
    '/': { prerender: true },
    '/articles': { prerender: true },
    '/articles/**': { swr: 3600 },
    '/projects': { prerender: true },
    '/projects/**': { swr: 3600 },
    '/resume': { prerender: true },
    '/resume/ats': { prerender: true },
  },

  nitro: {
    preset: 'cloudflare_module',

    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
      wrangler: {
        routes: [
          { pattern: 'labtime.web.id', custom_domain: true },
        ],
      },
    },

    experimental: {
      database: true
    }
  },

  vite: {
    // Vite defaults are usually better for HMR on Linux unless in a container/VM
  },

  modules: ['@nuxt/eslint', 'shadcn-nuxt', '@nuxtjs/color-mode', 'nitro-cloudflare-dev', '@nuxtjs/tailwindcss', '@nuxt/content', '@vueuse/motion/nuxt'],




  shadcn: {
    prefix: '',
    componentDir: './app/components/ui',
  },

  eslint: {
    config: {},
  },

  colorMode: {
    classSuffix: '',
  },

  mdc: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark'
      },
      preload: ['elixir']
    }
  },
})
