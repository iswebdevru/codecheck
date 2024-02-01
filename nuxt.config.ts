// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  // build: {
  //    transpile: ["jsonwebtoken"],
  // },
  modules: ["@pinia/nuxt"],
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
  css: ["~/assets/css/main.scss"],
  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },
});
