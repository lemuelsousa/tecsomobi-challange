import { db } from "../database/db";
import { User } from "../models/User";

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

interface UpdateUserDTO {
  id: number;
  name?: string;
  email?: string;
  password?: string;
}

// Define the expected result type
type UserCountResult = { count: number };

export function createUser(data: CreateUserDTO): User {
  const existing = db
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(data.email);
  if (existing) throw new Error("Email already registered.");

  const stmt = db.prepare(
    `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`
  );
  const result = stmt.run(data.name, data.email, data.password);

  const user = db
    .prepare("SELECT * FROM users WHERE id = ?")
    .get(result.lastInsertRowid) as User;

  return user;
}

export function updateUser(data: UpdateUserDTO): User {
  const existing = db.prepare("SELECT * FROM users WHERE id = ?").get(data.id);
  if (!existing) throw new Error("User not found.");

  const stmt = db.prepare(
    `UPDATE users SET 
      name = COALESCE(?, name), 
      email = COALESCE(?, email), 
      password = COALESCE(?, password) 
    WHERE id = ?`
  );
  stmt.run(data.name, data.email, data.password, data.id);

  const updatedUser = db
    .prepare("SELECT * FROM users WHERE id = ?")
    .get(data.id) as User;
  return updatedUser;
}

export function getUserById(id: number): User | null {
  const user = db
    .prepare("SELECT * FROM users WHERE id = ?")
    .get(id) as User | null;
  return user;
}

export function listUsers(
  page: number,
  limit: number
): { users: User[]; total: number } {
  const offset = (page - 1) * limit;

  const users = db
    .prepare("SELECT * FROM users LIMIT ? OFFSET ?")
    .all(limit, offset) as User[];
  const total = (
    db.prepare("SELECT COUNT(*) as count FROM users").get() as UserCountResult
  ).count;

  return { users, total };
}

export function deleteUser(id: number): void {
  const existing = db.prepare("SELECT * FROM users WHERE id = ?").get(id);
  if (!existing) throw new Error("User not found.");

  db.prepare("DELETE FROM users WHERE id = ?").run(id);
}
