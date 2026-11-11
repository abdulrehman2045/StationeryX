import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const errorMessage = (error) => error.response?.data?.message || 'Something went wrong';
export const money = (value) => `Rs ${Number(value).toLocaleString()}`;

export default api;
