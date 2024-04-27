import axios from 'axios'
import { getSession } from 'next-auth/react';

export const api = axios.create({
  baseURL: 'http://localhost:3333',
})

api.interceptors.request.use(async config => {
  const session = await getSession()
  const token = session?.token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }


  return config;
});

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401 || error.response.status === 403) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const apiPublic = axios.create({
  baseURL: 'http://localhost:3333',
})