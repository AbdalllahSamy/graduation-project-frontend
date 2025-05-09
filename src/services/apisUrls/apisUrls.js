import axios from 'axios';

export const baseURL = 'http://health-advisor.runasp.net/api';

export const axiosInstance = axios.create({
  baseURL:baseURL,
  headers: { Authorization: localStorage.getItem('token') },
});

export const AuthAxiosInstance = axios.create({
  baseURL,
  headers:{ 'Content-Type': 'application/json' }, 
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
  login: `/Auth/login`,
  register: `/Auth/register`,
};
