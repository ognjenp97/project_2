import axios from "axios";

const API_URL = "http://localhost:8800/api";

axios.defaults.baseURL = API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(async (cfg) => {
  const cookieValue = document.cookie.match(
    "(^|;)\\s*" + "token" + "\\s*=\\s*([^;]+)"
  );
  if (!cookieValue) return cfg;
  const token = cookieValue.pop();
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
});

export default axiosInstance;
