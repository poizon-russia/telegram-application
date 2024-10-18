export const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL as string;
export const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL as string;

export const PUBLIC_URL = {
  root: (url = ''): string => url,
  login: (): string => PUBLIC_URL.root('/signin'),
  order: (orderId: string = ''): string =>
    PRIVATE_URL.root(`/order/${orderId}`),
};

export const PRIVATE_URL = {
  root: (url = ''): string => url,

  rootProfile: (url = ''): string => `/profile${url}`,
  profileOrders: (): string => PRIVATE_URL.rootProfile('/orders'),
  profileSettings: (): string => PRIVATE_URL.rootProfile('/settings'),
};
