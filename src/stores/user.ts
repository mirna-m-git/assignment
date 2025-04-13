import type { User, UserCredentials, UserData } from "~/@types/user";
import useApi from "~/composables/api";

export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>(null);
  const api = useApi();

  const isAuthenticated = computed(() => user.value && user.value.id > 0);
  const signup = async (userForm: UserData) => {
    const { success, data } = await api.auth.signup(userForm);
    user.value = data;
    if (success) {
      navigateTo("/");
    }
  };
  const login = async (userCredentials: UserCredentials) => {
    const { success, data } = await api.auth.login(userCredentials);
    user.value = data;
    if (success) {
      navigateTo("/");
    }
  };
  return { user, isAuthenticated, signup, login };
});
