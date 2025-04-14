import { db } from "../database/db";
import { CreateUserDTO, UpdateUserDTO } from "../dto/User";
import { User } from "../models/User";

type CountResult = { count: number };

export class ServiceError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = "ServiceError";
  }
}

export async function createUser(data: CreateUserDTO): Promise<User> {
  try {
    const existing = db
      .prepare("SELECT * FROM users WHERE email = ?")
      .get(data.email);
    if (existing) throw new ServiceError(400, "Email already registered.");

    const stmt = db.prepare(
      `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`
    );
    const result = stmt.run(data.name, data.email, data.password);

    const user = db
      .prepare("SELECT * FROM users WHERE id = ?")
      .get(result.lastInsertRowid) as User;

    return user;
  } catch (err) {
    if (err instanceof ServiceError) throw err;
    throw new ServiceError(500, "Failed to create user.");
  }
}

export async function updateUser(data: UpdateUserDTO): Promise<User> {
  try {
    var existing = db
      .prepare("SELECT * FROM users WHERE id = ?")
      .get(data.id);
    if (!existing) throw new ServiceError(404, "User not found.");

    existing = db
      .prepare("SELECT * FROM users WHERE email = ?")
      .get(data.email);
    if (existing) throw new ServiceError(400, "Email already registered.");

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
  } catch (err) {
    if (err instanceof ServiceError) throw err;
    throw new ServiceError(500, err.message);
  }
}

export async function getUserById(id: number): Promise<User | null> {
  try {
    const user = db
      .prepare("SELECT * FROM users WHERE id = ?")
      .get(id) as User | null;
    return user;
  } catch {
    throw new ServiceError(500, "Failed to retrieve user.");
  }
}

export async function listUsers(
  page: number,
  limit: number
): Promise<{ users: User[]; total: number }> {
  try {
    const offset = (page - 1) * limit;

    const users = db
      .prepare("SELECT * FROM users LIMIT ? OFFSET ?")
      .all(limit, offset) as User[];
    const total = (
      db.prepare("SELECT COUNT(*) as count FROM users").get() as CountResult
    ).count;

    return { users, total };
  } catch {
    throw new ServiceError(500, "Failed to list users.");
  }
}

export async function deleteUser(id: number): Promise<void> {
  try {
    const existing = db.prepare("SELECT * FROM users WHERE id = ?").get(id);
    if (!existing) throw new ServiceError(404, "User not found.");

    db.prepare("DELETE FROM users WHERE id = ?").run(id);
  } catch (err) {
    if (err instanceof ServiceError) throw err;
    throw new ServiceError(500, "Failed to delete user.");
  }
}
