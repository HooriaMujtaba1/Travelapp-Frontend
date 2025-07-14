// utils/axiosInstance.js
import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Update this if your base URL is different
  withCredentials: true,
});

// 🔐 Attach token to every request
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
