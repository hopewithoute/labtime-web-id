// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['~/assets/css/tailwind.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  nitro: {
    preset: 'cloudflare-pages',

    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
  },

  modules: ['@nuxt/eslint', 'shadcn-nuxt', 'nitro-cloudflare-dev'],

  shadcn: {
    prefix: '',
    componentDir: './app/components/ui',
  },

  eslint: {
    config: {
      standalone: false,
    },
  },
})
