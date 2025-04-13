// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  ssr: false,
  srcDir: "src/",

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || "http://localhost:4100",
    },
  },

  modules: ["@pinia/nuxt"],
});