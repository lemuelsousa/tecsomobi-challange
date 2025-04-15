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

const API_URL = "http://localhost:3000/api/users";

export const getUsers = async (
  page = 1,
  limit = 10
): Promise<PaginatedUsers> => {
  const response = await fetch(`${API_URL}/?page=${page}&limit=${limit}`);

  if (!response.ok) {
    throw new Error("Erro ao buscar usuários.");
  }

  return response.json();
};

export const createUser = async (user: User): Promise<void> => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error.message);
    }
  } catch (err) {
    console.error(err);
  }
};
