import type { User, UserCredentials } from "~/@types/user";
import CoreAPI from "../core";

interface UserData {
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
  subscribeToUpdates: boolean;
}

class AuthAPI extends CoreAPI {
  async signup(userData: UserData) {
    const payload = {
      email: userData.email,
      first_name: userData.firstName,
      last_name: userData.lastName,
      password: userData.password,
      subscribe_to_updates: userData.subscribeToUpdates,
    };
    const { data, ok } = await this.$post("/account/signup", payload);

    return {
      success: !!ok,
      data: ok ? data as User : null,
    };
  }

  async login(loginForm: UserCredentials) {
    const payload = {
      email: loginForm.email,
      password: loginForm.password,
    };
    const { data, ok } = await this.$post("/account/login", payload);
    return {
      success: !!ok,
      data: ok ? data as User : null,
    };
  }
}

export default new AuthAPI();
