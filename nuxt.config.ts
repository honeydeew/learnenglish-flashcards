// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['vuetify-nuxt-module', 'nuxt-auth-utils'],
  vuetify: {
    moduleOptions: {
      // Vuetify's useLayout collides with Nuxt's built-in composable.
      prefixComposables: ['useLayout'],
    },
    vuetifyOptions: {
      // Vuetify 4 defaults to "system", which SSR cannot resolve and hydrates as dark.
      theme: {
        defaultTheme: 'light',
      },
    },
  },
})
