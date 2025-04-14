import type { User, UserCredentials } from "~/@types/user";
import CoreAPI from "../core";

interface UserData {
  email: string;
  username: string;
  password: string;
  subscribeToUpdates: boolean;
}

class AuthAPI extends CoreAPI {
  _extractError(data: { message: string }) {
    if (data.message) {
      return data.message;
    }
    return "Unknown error";
  }
  async signup(userData: UserData) {
    const payload = {
      email: userData.email,
      username: userData.username,
      password: userData.password,
      subscribe_to_updates: userData.subscribeToUpdates,
    };
    const { data, ok } = await this.$post("/account/signup", payload, false);
    if (ok) {
      return { success: true, data: data as User };
    }
    return {
      success: false,
      error: this._extractError(data as { message: string }),
      data: null,
    };
  }

  async login(loginForm: UserCredentials) {
    const payload = {
      email: loginForm.email,
      password: loginForm.password,
    };
    const { data, ok } = await this.$post("/account/login", payload, false);
    if (ok) {
      return { success: true, data: data as User };
    }
    return {
      success: false,
      error: this._extractError(data as { message: string }),
      data: null,
    };
  }

  async logout() {
    const { ok, data } = await this.$post("/account/logout");
    if (ok) {
      return { success: true };
    }
    return {
      success: false,
      error: this._extractError(data as { message: string }),
    };
  }

  async getCurrentUser() {
    const { data, ok } = await this.$get("/me");
    if (ok) {
      return { success: true, data: data as User };
    }
    return {
      success: false,
      error: this._extractError(data as { message: string }),
      data: null,
    };
  }
}
const auth = new AuthAPI();
export default auth;