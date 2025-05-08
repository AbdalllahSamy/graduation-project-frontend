import axios from 'axios';

export const baseURL = 'http://graduation-api.runasp.net/api';

export const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: localStorage.getItem('token') },
});

export const AuthAxiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login';
  } else {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const Auth = {
  login: `/Account/login`,
  register: `/Account/register`,
};
