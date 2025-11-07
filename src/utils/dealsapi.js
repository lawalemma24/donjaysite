import axios from "axios";

const dealsApi = axios.create({
  baseURL: "https://donjay-server.vercel.app/api/deals",
});

dealsApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default dealsApi;
