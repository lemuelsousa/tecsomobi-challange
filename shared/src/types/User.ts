export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
}

export interface PaginatedUsers {
  users: User[];
  total: number;
  page: number;
  limit: number;
}
