interface LatestOrder {
  id: string;
  status: string;
  size: string;
  price: number;
  created_at: string;
  updated_at: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface Tokens {
  token: string;
}

export interface Customer {
  isPassword: boolean;
  id: string;
  fullName: string;
  phone: string;
  ordersCount?: number;
  totalOrdersPrice?: number;
  latestOrder?: LatestOrder;
  created_at: string;
  updated_at: string;
}

interface AuthResult {
  token: string;
  customer: Customer;
}

export interface AuthResponse {
  ok: boolean;
  result: AuthResult;
}
