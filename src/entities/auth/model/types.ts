export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenResponse {
  ok: boolean;
  message: string;
  result: {
    token: string;
  };
}

export interface ApiResponse<T> {
  ok: boolean;
  result: T;
}
