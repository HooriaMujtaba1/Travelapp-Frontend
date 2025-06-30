import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('accessToken'); // ✅ from cookies

  const publicRoutes = ['/auth/register', '/token', '/token/refresh'];
  const isPublic = publicRoutes.some((route) => config.url.includes(route));

  if (!isPublic && token && token !== 'null') {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

export default api;
