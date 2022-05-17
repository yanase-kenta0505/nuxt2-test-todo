import { NuxtConfig } from "@nuxt/types";

import colors from "vuetify/es5/util/colors";

/*
 * TODO: srcフォルダを有効にする。
 * amplifyを有効にすると、リポジトリ直下にnuxtビルドとは関係ないフォルダが出現します。
 * ビルドされて画面で使われるものと、それ以外のものが分かりにくくなります。
 * それを解消するために、srcフォルダにビルドされて画面に送出されるコードを置く、という運用があります。
 * components, hooks, pages, plugins, storeがsrcの下に移動します。
 */

const config: NuxtConfig = {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - nuxt2-test-todo",
    title: "nuxt2-test-todo",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/persistedState.js", ssr: false },
    { src: "~/plugins/amplify.js", ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    "@nuxtjs/composition-api/module",
    "@nuxt/typescript-build",
    'nuxt-typed-vuex'
  ],


  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};

export default config;
