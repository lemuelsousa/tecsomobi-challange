import { db } from "../database/db";
import { User } from "../models/User";

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

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
