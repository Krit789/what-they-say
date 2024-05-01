export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
        charset: 'utf-8',
        viewport: 'width=device-width, initial-scale=1',
        htmlAttrs: {
            lang: 'th',
        },
        link: [
            { rel: 'icon', type: 'image/png', href: '/favicon.ico' },
        ],
    },
},
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/google-fonts", 'nuxt-particles', '@vueuse/nuxt'],
  css: ['~/assets/css/input.css'],
  googleFonts: {
    families: {
      "IBM+Plex+Sans+Thai": true,
    },
  },
  runtimeConfig: {
    public: {
        hasSentHash: '', // can be overridden by NUXT_PUBLIC_API_BASE environment variable
    },
},
});
