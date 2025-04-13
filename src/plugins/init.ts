export default defineNuxtPlugin(async (nuxtApp) => {
  const { isAuthenticated, get } = useUserStore();
  if (isAuthenticated) {
    try {
      await get();
    } catch (err) {
      console.error("Failed to fetch current user", err);
    }
  }
});
