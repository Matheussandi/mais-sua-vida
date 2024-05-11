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

export const apiPublic = axios.create({
  baseURL: 'http://localhost:3333',
})