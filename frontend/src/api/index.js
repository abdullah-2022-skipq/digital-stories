import axios from "axios";
console.log("PATH IS THIS ONE", import.meta.env);
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
    });

    return response;
  } catch (error) {
    console.log("ERROR", error);
  }
};

export default api;
