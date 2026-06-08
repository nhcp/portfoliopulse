import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);
export const getMe = () => api.get('/auth/me');

export const getTrades = () => api.get('/trades');
export const createTrade = (data) => api.post('/trades', data);
export const deleteTrade = (id) => api.delete(`/trades/${id}`);
export const getStats = () => api.get('/trades/stats');

export default api;
