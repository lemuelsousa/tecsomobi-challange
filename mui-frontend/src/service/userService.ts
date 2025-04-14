import { User } from "../types/User";

const API_URL = "http://localhost:3000/api/users";

export class ErrorResponse extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public details?: [] // Optional field for additional error details
  ) {
    super(message);
    this.name = "ErrorResponse";
  }
}

async function handleResponse(response: Response) {
  const json = await response.json();
  if (!response.ok) {
    // console.error(json);
    throw new ErrorResponse(
      response.status,
      json.error.message || "An error occurred",
      json
    );
  }
  return json;
}

export async function getUsers(): Promise<User[]> {
  const res = await fetch(API_URL);
  return await handleResponse(res);
}

export async function createUser(user: User): Promise<void> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  await handleResponse(res);
}

export async function updateUser(user: User): Promise<void> {
  const res = await fetch(`${API_URL}/${user.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  handleResponse(res);
}

export async function deleteUser(id: number): Promise<void> {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}
