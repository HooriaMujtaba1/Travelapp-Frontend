import api from '../utils/axiosInstance';
import axios from 'axios';

/**
 * Login user with credentials
 * @param {Object} credentials - expects { username, password }
 * @returns {Object} - access and refresh tokens
 */
export const login = async (credentials) => {
  const response = await api.post('/token/', credentials);
  return response.data; // { access, refresh }
};

/**
 * Register a new user
 * @param {Object} formData - user registration details
 * @returns {Object} - registered user data or confirmation
 */
export const register = async (formData) => {
  const response = await axios.post('http://localhost:8000/api/auth/register/', formData);
  return response.data;
};
