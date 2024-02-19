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

  // nitro: {
  //   storage: {
  //     checks: {
  //       driver: "fs",
  //       base: "./checks",
  //     },
  //   },
  // },
  experimental: {
    // sharedPrerenderData: true,
  },

  modules: ["nuxt-simple-robots", "@pinia/nuxt", "nuxt-primevue"],
  robots: {
    disallow: ["/admin/*"],
    credits: false,
  },
  primevue: {
    options: {},
    components: {
      // include: ["MultiSelect", "Paginator"],
    },
  },
  // auth: {
  //   provider: {
  //     type: "local",
  //     endpoints: {
  //       getSession: { path: "/user" },
  //     },

  //     // pages: {
  //     //   login: "/login",
  //     // },
  //     token: {
  //       signInResponseTokenPointer: "/token/accessToken",
  //     },
  //   },
  //   session: {
  //     // Whether to refresh the session every time the browser window is refocused.
  //     enableRefreshOnWindowFocus: true,

  //     // Whether to refresh the session every `X` milliseconds. Set this to `false` to turn it off. The session will only be refreshed if a session already exists.
  //     enableRefreshPeriodically: false,
  //   },
  // },

  css: [
    "~/assets/css/main.scss",
    "~/assets/css/primevue/themes/codechecktheme/theme.scss",
  ],
  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },
});
