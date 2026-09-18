class ApiService {
  constructor() {
    const isLocal = ["localhost", "127.0.0.1"].includes(window.location.hostname);
    this.baseURL =
      process.env.API_BASE_URL ||
      (isLocal ? "http://localhost:8080" : "https://api.oekfb.eu");
  }

  async request(method, endpoint, body = null, headers = {}) {
    const normalizedEndpoint = endpoint.replace(/^\/+/, "");
    const url = `${this.baseURL}/${normalizedEndpoint}`;
    const authToken = this.getCookie("authToken");
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        ...headers,
      },
      credentials: "include",
    };

    // Homepage content is managed from the admin application and must not be
    // served from the browser's HTTP cache after an editor saves a change.
    if (method === "GET") {
      options.cache = "no-store";
    }

    if (body) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, options);
      const text = await response.text();

      if (response.ok) {
        try {
          return JSON.parse(text);
        } catch (e) {
          return text;
        }
      } else {
        let errorData = {};
        try {
          errorData = text ? JSON.parse(text) : {};
        } catch {
          errorData = {};
        }
        throw new Error(errorData.reason || errorData.message || `Request failed (${response.status})`);
      }
    } catch (error) {
      console.error(`Error with ${method} request to ${endpoint}:`, error);
      throw error;
    }
  }

  async get(endpoint, headers = {}) {
    return this.request("GET", endpoint, null, headers);
  }

  async post(endpoint, body, headers = {}) {
    return this.request("POST", endpoint, body, headers);
  }

  async patch(endpoint, body, headers = {}) {
    return this.request("PATCH", endpoint, body, headers);
  }

  async delete(endpoint, headers = {}) {
    return this.request("DELETE", endpoint, null, headers);
  }

  getCookie(name) {
    const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = document.cookie.match(new RegExp(`(?:^|; )${escapedName}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
  }
}

export default ApiService;
