import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || "/",
  },
  ssr: false,
  nitro: {
    output: {
      dir: "dist",
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@nuxtjs/google-fonts", "@nuxt/icon", "@pinia/nuxt"],
  css: ["~/assets/css/main.css"],
});
