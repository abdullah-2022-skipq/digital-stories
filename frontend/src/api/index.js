import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_PATH,
  withCredentials: true,
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
});

export const registerUser = async (data) => {
  try {
    const response = await api.post('/api/register', {
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
  let response;
  try {
    response = await api.get('/api/me');
  } catch (error) {
    return error;
  }
  return response;
};

export const login = async (data) => {
  let response;
  try {
    response = await api.post('/api/login', {
      username: data.username,
      password: data.password,
    });
  } catch (error) {
    return error;
  }
  return response;
};

// https://stackoverflow.com/a/44806250

export const logout = async () => api.post('/api/logout');

export const getAllStories = async () => api.get('/api/stories');

export const getTrendingStories = async () => api.get('/api/stories/trending');

export const getStoryById = async (id) => api.get(`/api/stories/${id}`);

export const createStory = async (story) => {
  let response;

  if (story.mediaType === 'text') {
    try {
      const { mediaType, caption, font, fontColor, postedBy } = story;
      response = await api.post('/api/stories', {
        mediaType,
        caption,
        font,
        fontColor,
        postedBy,
      });
    } catch (error) {
      return error;
    }
    return response;
  }

  if (story.mediaType === 'image') {
    try {
      const { mediaType, caption, image, postedBy } = story;
      response = await api.post('/api/stories', {
        mediaType,
        caption,
        image,
        postedBy,
      });
    } catch (error) {
      return error;
    }
    return response;
  }

  try {
    const { mediaType, caption, video, postedBy } = story;
    response = await api.post('/api/stories', {
      mediaType,
      caption,
      video,
      postedBy,
    });
  } catch (error) {
    return error;
  }
  return response;
};

export const createComment = async (data) => {
  let response;
  try {
    const { text, user, story } = data;
    response = await api.post('/api/comment', { text, user, story });
  } catch (error) {
    return error;
  }
  return response;
};

export const upVoteStory = async (data) => {
  let response;
  try {
    const { user, post } = data;
    response = await api.post('/api/upvote', { user, post });
  } catch (error) {
    return error;
  }
  return response;
};

export const downVoteStory = async (data) => {
  let response;
  try {
    const { user, post } = data;
    response = await api.post('/api/downvote', { user, post });
  } catch (error) {
    return error;
  }
  return response;
};

export const getCommentsByPostId = async (id) => {
  let response;
  try {
    response = await api.get(`/api/comments/${id}`);
  } catch (error) {
    return error;
  }
  return response;
};

export const deletePostById = async (id) => api.delete(`/api/stories/${id}`);
// interceptor for auto token refresh
api.interceptors.response.use(
  (config) => config,
  // eslint-disable-next-line consistent-return
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest.isRetry = true;

      try {
        await axios.get(`${process.env.REACT_APP_API_PATH}/api/refresh`, {
          withCredentials: true,
        });

        return api.request(originalRequest);
      } catch (err) {
        return err;
      }
    }
  }
);

export default api;
