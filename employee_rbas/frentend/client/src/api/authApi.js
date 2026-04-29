import axios from "axios";

const API = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const storeToken = (token) => {
  if (typeof window !== "undefined" && token) {
    localStorage.setItem("authToken", token);
  }
};

export const login = async (email, password) => {
  try {
    const response = await API.post("/auth/login", { email, password });
    storeToken(response.data.token);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const register = async (userData) => {
  try {
    const response = await API.post("/auth/register", userData);
    storeToken(response.data.token);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getProfile = async () => {
  try {
    const response = await API.get("/auth/me");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const changePassword = async (passwords) => {
  try {
    const response = await API.put("/auth/change-password", passwords);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
