export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserDTO {
  id: number;
  name?: string;
  email?: string;
  password?: string;
}
