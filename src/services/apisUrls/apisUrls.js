import axios from 'axios';

export const baseURL = 'https://upskilling-egypt.com:3005/api';

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
  login: `/auth/login`,
  register: `/auth/register`,
  changePassword: `/auth/change-password`,
  forgotPassword: `auth/forgot-password`,
  resetPassword: `auth/reset-password`,
  logout: `auth/logout`,
};
