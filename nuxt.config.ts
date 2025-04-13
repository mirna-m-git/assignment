// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  ssr: false,
  srcDir: "src/",
  vue: {
    compilerOptions: {
      // treat all tags with a dash as custom elements
      isCustomElement: (tag) => tag.includes("-"),
    },
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || "http://localhost:4100",
    },
  },

  modules: ["@pinia/nuxt", "@nuxt/test-utils"],
});
