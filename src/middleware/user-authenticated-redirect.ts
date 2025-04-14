export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useUserStore();
  if (to.name !== "signup" && to.name !== "login" && !isAuthenticated) {
    return navigateTo("/login");
  }
  if ((to.name === "signup" || to.name === "login") && isAuthenticated) {
    return navigateTo("/");
  }
});
