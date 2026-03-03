// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['~/assets/css/tailwind.css'],

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
  },

  modules: ['@nuxt/eslint', 'shadcn-nuxt', 'nitro-cloudflare-dev', '@nuxtjs/tailwindcss', '@nuxt/content'],

  content: {
    highlight: {
      theme: 'github-dark',
    },
  },

  shadcn: {
    prefix: '',
    componentDir: './app/components/ui',
  },

  eslint: {
    config: {},
  },
})
