import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_URL;

axios.defaults.baseURL = API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const cookieValue = document.cookie.match(
      "(^|;)\\s*" + "token" + "\\s*=\\s*([^;]+)"
    );
    const token = cookieValue ? cookieValue.pop() : "";

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
