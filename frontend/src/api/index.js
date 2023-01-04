import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_PATH,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export const registerUser = async (data) => {
  try {
    const response = await api.post("/api/register", {
      name: data.name,
      username: data.username,
      password: data.password,
      email: data.email,
      avatarPath: data.avatar,
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get("/api/me");
    return response;
  } catch (error) {}
};

export const login = async (data) => {
  try {
    const response = await api.post("/api/login", {
      username: data.username,
      password: data.password,
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const logout = async () => await api.post("/api/logout");

// interceptor for auto token refresh
api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest.isRetry = true;

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_PATH}/api/refresh`,
          {
            withCredentials: true,
          }
        );

        return api.request(originalRequest);
      } catch (error) {
        //
      }
    }
  }
);

export default api;
