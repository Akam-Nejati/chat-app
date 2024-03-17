// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@invictus.codes/nuxt-vuetify",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
  ],
  css: ["@fortawesome/fontawesome-svg-core/styles.css"],
  runtimeConfig: {
    public: {
      baseURL: "http://localhost:3000/",
    },
  },
  imports: {
    presets: [
      {
        from: "vue-toast-notification",
        imports: ["useToast"],
      },
    ],
  },
});