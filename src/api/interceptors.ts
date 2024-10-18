import axios, { type CreateAxiosDefaults } from 'axios';

import { SERVER_URL } from '@/src/config/api.config';

import { errorCatch } from './error';
import { authService } from '../entities/auth/services/auth.service';
import {
  getAccessToken,
  removeFromStorage,
} from '../entities/auth/services/token.service';

const options: CreateAxiosDefaults = {
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

const axiosClassic = axios.create(options);
const axiosWithAuth = axios.create(options);

axiosWithAuth.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (config && config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  config.withCredentials = true;
  return config;
});

axiosWithAuth.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (
      (error.response.status === 401 ||
        errorCatch(error) === 'JWT expired. Login to your account.' ||
        errorCatch(error) === 'User not authorized') &&
      error.config &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        await authService.getNewTokens();
        return axiosWithAuth.request(originalRequest);
      } catch (error) {
        if (errorCatch(error) === 'JWT expired. Login to your account.')
          removeFromStorage();
      }
    }
    throw error;
  },
);

export { axiosClassic, axiosWithAuth };
