import axios from 'axios';

const TOKEN_KEY = 'shopkart_token';

const getStoredToken = () => localStorage.getItem(TOKEN_KEY);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    response.statusCode = response.data?.statusCode || response.status;

    const token = response.data?.token;
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    }

    return response;
  },
  (error) => {
    if (error.response) {
      error.statusCode = error.response.data?.statusCode || error.response.status;
      error.statusMessage = error.response.data?.message || error.message;
    }
    return Promise.reject(error);
  }
);

export const clearAuthToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export default api;
