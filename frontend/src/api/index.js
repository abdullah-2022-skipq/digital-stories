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

// interceptor for auto token refresh
api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status == 401 &&
      originalRequest &&
      !originalRequest.isRetry
    ) {
      originalRequest.isRetry = true;

      try {
        await axios.get(`${VITE_REACT_APP_API_PATH}/api/refresh`, {
          withCredentials: true,
        });
      } catch (error) {
        console.log("error in refresh: ", error);
      }
    }
  }
);

export default api;
