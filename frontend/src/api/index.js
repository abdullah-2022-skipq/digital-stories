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

export const getAllStories = async () => await api.get("/api/stories");

export const getStoryById = async (id) => await api.get(`/api/stories/${id}`);

export const createStory = async (story) => {
  if (story.mediaType == "text") {
    try {
      const { mediaType, caption, font, fontColor, postedBy } = story;
      const response = await api.post("/api/stories", {
        mediaType,
        caption,
        font,
        fontColor,
        postedBy,
      });

      return response;
    } catch (error) {
      //
    }
  }
  if (story.mediaType == "image") {
    try {
      const { mediaType, caption, image, postedBy } = story;
      const response = await api.post("/api/stories", {
        mediaType,
        caption,
        image,
        postedBy,
      });

      return response;
    } catch (error) {
      //
    }
  }

  if (story.mediaType == "video") {
    console.log("im here");
    try {
      const { mediaType, caption, video, postedBy } = story;
      const response = await api.post("/api/stories", {
        mediaType,
        caption,
        video,
        postedBy,
      });

      return response;
    } catch (error) {
      //
    }
  }
};

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
