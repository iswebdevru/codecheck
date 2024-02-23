// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: "ru",
      },
      link: [{ rel: "icon", type: "image/png", href: "/logo.png" }],
    },
  },

  devtools: { enabled: false },

  // build: {
  //    transpile: ["jsonwebtoken"],
  // },

  modules: ["nuxt-simple-robots", "@pinia/nuxt", "nuxt-primevue"],
  robots: {
    disallow: ["/admin/*"],
    credits: false,
  },
  primevue: {
    cssLayerOrder: "reset,primevue",
    components: {
      include: ["Multiselect", "Checkbox", "Paginator"],
    },
  },

  css: [
    "~/assets/css/main.scss",
    // "primevue/resources/themes/aura-light-green/theme.css",
    "~/assets/css/primevue/themes/codechecktheme/theme.scss",
  ],
  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },
});
