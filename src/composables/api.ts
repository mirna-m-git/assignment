import AuthAPI from "~/api/auth";
import { ApiConfig } from "~/api/core";

const useApi = () => {
  if (!ApiConfig._baseUrl) {
    const config = useRuntimeConfig();
    ApiConfig._baseUrl = config.public.apiBase;
  }

  return {
    auth: AuthAPI
  };
};

export default useApi;