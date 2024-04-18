// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@invictus.codes/nuxt-vuetify",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@vite-pwa/nuxt",
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
  pwa: {
    injectRegister: "auto",
    workbox: {
      globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
    },
    manifest: {
      name: "My PWA App",
      short_name: "PWA App",
      description: "A Nuxt 3 PWA App",
      theme_color: "#1C1B1F",
      background_color: "#1C1B1F",
      display: "standalone",
      orientation: "portrait",
      icons: [
      {
        src: "/launcher-icon-0-75x.png",
        sizes: "36x36",
        type: "image/png",
      },
      {
        src: "/launcher-icon-1x.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/launcher-icon-1-5x.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "/launcher-icon-2x.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/launcher-icon-3x.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "/launcher-icon-4x.png",
        sizes: "192x192",
        type: "image/png",
      }
      ],
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: "module",
    },
    client: {
      installPrompt: true,
    },
  },
});
