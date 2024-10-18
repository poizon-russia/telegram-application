import Cookies from 'js-cookie';

const ACCESS_TOKEN_KEY = 'accessToken';

export const setAccessToken = (token: string): void => {
  Cookies.set(ACCESS_TOKEN_KEY, token, {
    expires: 1 / 48,
    secure: true,
    sameSite: 'Strict',
  });
};

export const getAccessToken = (): string | undefined => {
  const token = Cookies.get(ACCESS_TOKEN_KEY);
  return token;
};

export const removeFromStorage = (): void => {
  Cookies.remove(ACCESS_TOKEN_KEY);
};

export const saveToStorage = (tokens: { accessToken: string }): void => {
  setAccessToken(tokens.accessToken);
};

export enum EnumTokens {
  ACCESS_TOKEN = 'accessToken',
}
