// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Rajdhani:wght@300;400;500;600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&display=swap' }
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
    // Prerendering disabled for content routes - Nuxt Content with Cloudflare D1
    // requires D1 bindings which are only available at runtime on Cloudflare.
    // SSR will handle these routes dynamically with D1 access.
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
    preference: 'light',
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
