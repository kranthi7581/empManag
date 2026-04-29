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

export const getAttendances = async () => {
  try {
    const response = await API.get("/attendance");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const createAttendance = async (attendanceData) => {
  try {
    const response = await API.post("/attendance", attendanceData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateAttendance = async (attendanceId, attendanceData) => {
  try {
    const response = await API.put(
      `/attendance/${attendanceId}`,
      attendanceData,
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
