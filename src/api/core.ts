type Params = Record<
  string,
  string | number | boolean | Array<string | number | boolean>
>;

interface APIResponse<T> {
  status: number;
  ok: boolean;
  data: T | null;
  rawData: any;
}

class Config {
  _baseUrl: string;
  constructor() {
    this._baseUrl = "";
  }

  get baseUrl() {
    return this._baseUrl;
  }

  set baseUrl(baseUrl) {
    this._baseUrl = baseUrl;
  }
}

export const ApiConfig = new Config();

class CoreAPI {
  _acceptVersion: number;

  constructor() {
    this._acceptVersion = 5;
  }

  get acceptVersion() {
    return this._acceptVersion;
  }

  set acceptVersion(acceptVersion) {
    this._acceptVersion = acceptVersion;
  }

  $url(path: string, params = {}) {
    const url = `${ApiConfig.baseUrl}${path}`;
    const queryParams = Object.entries(params)
      .map(([k, v]) => {
        if (Array.isArray(v)) {
          return v.map((_v) => `${k}=${encodeURIComponent(_v)}`).join("&");
        }
        return `${k}=${encodeURIComponent(v as string)}`;
      })
      .join("&");

    return queryParams ? `${url}?${queryParams}` : url;
  }

  async _decodeData(response: Response) {
    try {
      const _data = await response.json();
      return _data;
    } catch (e) {
      return null;
    }
  }

  async _tryRefreshToken() {
    try {
      const response = await fetch(`${ApiConfig.baseUrl}/auth/refresh/`, {
        method: "GET",
        credentials: "include",
      });
      return { success: response.status === 200 };
    } catch {
      return { success: false };
    }
  }

  async $request<T>(
    url: string,
    options: RequestInit = {
      method: "GET",
      body: null,
      headers: {},
    }
  ): Promise<APIResponse<T>> {
    const requestOptions = {
      ...options,
      headers: {
        accept: `application/json; version=${this.acceptVersion}`,
        "content-type": "application/json",
        ...options.headers,
      },
      credentials: "include" as RequestCredentials,
    };
    const response = await fetch(url, requestOptions);
    if (response.status === 401) {
      const { success } = await this._tryRefreshToken();
      if (success) {
        return this.$request(url, options);
      }
    }
    let data = await this._decodeData(response);
    return {
      status: response.status,
      ok: response.ok,
      data,
      rawData: data,
    };
  }

  async $get(path: string, params?: Params, options: RequestInit = {}) {
    const response = await this.$request(this.$url(path, params), {
      method: "GET",
      ...options,
    });

    return response;
  }

  $post<T>(path: string, data?: Partial<T>, options: RequestInit = {}) {
    return this.$request(this.$url(path), {
      method: "POST",
      body: JSON.stringify(data),
      ...options,
    });
  }

  $put<T>(path: string, data?: Partial<T>, options: RequestInit = {}) {
    return this.$request(this.$url(path), {
      method: "PUT",
      body: JSON.stringify(data),
      ...options,
    });
  }

  $patch<T>(path: string, data?: Partial<T>, options: RequestInit = {}) {
    return this.$request(this.$url(path), {
      method: "PATCH",
      body: JSON.stringify(data),
      ...options,
    });
  }

  $delete(path: string, options: RequestInit = {}) {
    return this.$request(this.$url(path), {
      method: "DELETE",
      ...options,
    });
  }
}

export default CoreAPI;
