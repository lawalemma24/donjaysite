import axios from "axios";

// Fallback URL if env variable is missing or not working
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://donjay-backend.vercel.app";

const messagesApi = axios.create({
  baseURL: `${BASE_URL}/api/messages`,
});

messagesApi.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default messagesApi;
