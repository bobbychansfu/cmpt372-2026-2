export interface User {
  id?: number;
  name: string;
  age: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
