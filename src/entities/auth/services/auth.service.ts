import { API_URL } from '@/src/config/api.config';
import { axiosClassic, axiosWithAuth } from '@/src/api/interceptors';

import type { RefreshTokenResponse, ApiResponse } from '../model/types';
import type { AuthResponse } from '../model/userTypes';
import { saveToStorage, removeFromStorage } from './token.service';

class AuthService {
  async sendTelegramCode(phone: string): Promise<ApiResponse<null>> {
    const response = await axiosClassic.post<ApiResponse<null>>(
      API_URL.auth('/send-code'),
      { phone },
    );
    return response.data;
  }

  async activateCode(data: {
    phone: string;
    code: string;
  }): Promise<AuthResponse> {
    const response = await axiosClassic.post<AuthResponse>(
      API_URL.auth('/activate'),
      data,
    );
    return response.data;
  }

  async login(data: {
    phone?: string;
    login?: string;
    password: string;
  }): Promise<AuthResponse> {
    const response = await axiosClassic.post<AuthResponse>(
      API_URL.auth('/login-test'),
      data,
    );
    return response.data;
  }

  async getNewTokens(): Promise<void> {
    try {
      const response = await axiosClassic.get<RefreshTokenResponse>(
        API_URL.auth('/refresh'),
        { withCredentials: true },
      );
      if (response.data.result.token) {
        console.log('The access token is saved in storage from the server');
        saveToStorage({ accessToken: response.data.result.token });
      }
    } catch (error) {
      removeFromStorage();
      throw error;
    }
  }

  async changePassword(
    newPassword: string,
    currentPassword?: string,
  ): Promise<ApiResponse<null>> {
    const data: { newPassword: string; currentPassword?: string } = {
      newPassword,
    };

    if (currentPassword) {
      data.currentPassword = currentPassword;
    }

    const response = await axiosWithAuth.patch<ApiResponse<null>>(
      API_URL.customers('password'),
      data,
    );
    return response.data;
  }

  async logout(): Promise<void> {
    try {
      await axiosWithAuth.delete(API_URL.auth('/logout'), {
        withCredentials: true,
      });
      console.log('Successfully logged out');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }
}

export const authService = new AuthService();
