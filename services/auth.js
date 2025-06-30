// services/auth.js
import api from '../utils/axiosInstance';
import axios from 'axios';


export const login = async (credentials) => {
  // expects { email, password }
  const { data } = await api.post('token/', credentials);
  return data; // { access, refresh }
};

export const register = async (formData) => {
  const response = await axios.post('http://localhost:8000/api/auth/register/', formData);
  return response.data;
};


