import type { User, UserCredentials, UserData } from "~/@types/user";
import useApi from "~/composables/api";

export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>(null);
  const storedUser = localStorage.getItem("user");
  if (storedUser !== null) {
    try {
      user.value = JSON.parse(storedUser) as User;
    } catch (e) {
      user.value = null;
      console.error("Failed to parse user from localStorage", e);
    }
  }
  const api = useApi();

  const isAuthenticated = computed(
    () => (user.value && user.value.id > 0) || false
  );
  const signup = async (userForm: UserData) => {
    const { success, data, error } = await api.auth.signup(userForm);
    user.value = data;
    if (success) {
      localStorage.setItem("user", JSON.stringify(data));
      navigateTo("/");
    }
    return { success, error };
  };
  const login = async (userCredentials: UserCredentials) => {
    const { success, data, error } = await api.auth.login(userCredentials);
    user.value = data;
    if (success) {
      localStorage.setItem("user", JSON.stringify(data));
      navigateTo("/");
    }
    return { success, error };
  };
  const get = async () => {
    const { success, data } = await api.auth.getCurrentUser();
    user.value = data;
    console.log(data);
    if (success) {
      navigateTo("/");
      localStorage.setItem("user", JSON.stringify(data));
    }
  };
  const logout = async () => {
    const { success } = await api.auth.logout();
    if (success) {
      user.value = null;
      localStorage.removeItem("user");
      navigateTo("/login");
    }
  };
  return { user, isAuthenticated, signup, login, logout, get };
});
