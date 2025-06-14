import axios from 'axios';

// export const baseURL = 'https://health-advisor.llearn2earn.com/api';
export const baseURL = 'http://127.0.0.1:8002/api';

export const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: { Authorization: localStorage.getItem('token') },
});

export const AuthAxiosInstance = axios.create({
  baseURL: baseURL,
  headers: { 'Content-Type': 'application/json' },
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
  login: `/login`,
  register: `/register`,
};
