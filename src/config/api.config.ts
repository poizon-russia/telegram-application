export const SERVER_URL: string = `${process.env.NEXT_PUBLIC_SERVER_URL}`;

export const API_URL = {
  root: (url = ''): string => `${SERVER_URL}${url}`,

  auth: (url = ''): string => API_URL.root(`/auth${url}`),
  users: (url = ''): string => API_URL.root(`/users${url}`),
  admins: (url = ''): string => API_URL.root(`/admins/${url}`),

  items: (url = ''): string => API_URL.root(`/items/${url}`),
  feedItems: (limit: number, offset: number): string =>
    API_URL.items(`feed?limit=${limit}&offset=${offset}`),

  orders: (url = ''): string => API_URL.root(`/orders/${url}`),
  cards: (url = ''): string => API_URL.root(`/cards/${url}`),

  customers: (url = ''): string => API_URL.root(`/customers/${url}`),
  feedCustomers: (limit: number, offset: number): string =>
    API_URL.customers(`feed?limit=${limit}&offset=${offset}`),
  getCustomer: (id: string): string => API_URL.customers(`get/${id}`),
};
