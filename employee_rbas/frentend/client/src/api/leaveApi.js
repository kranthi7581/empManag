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

export const getLeaves = async () => {
  try {
    const response = await API.get("/leaves");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const createLeave = async (leaveData) => {
  try {
    const response = await API.post("/leaves", leaveData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateLeave = async (leaveId, leaveData) => {
  try {
    const response = await API.put(`/leaves/${leaveId}`, leaveData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
