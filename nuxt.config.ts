// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: "ru",
      },
      meta: [
        {
          name: "yandex-verification",
          content: "abcf376d3252e8d9",
        },
      ],
      link: [
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          sizes: "32x32",
          type: "image/png",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          sizes: "16x16",
          type: "image/png",
          href: "/favicon-16x16.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
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
      include: ["Multiselect", "Checkbox", "Paginator", "Dropdown"],
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

  plugins: ["~/plugins/particle-loader.client.ts"],
});
