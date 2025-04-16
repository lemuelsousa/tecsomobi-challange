import { db } from "../database/db";
import { User } from "../models/User";

type CountResult = { count: number };

export class ServiceError extends Error {
  statusCode: number;

  constructor(statusCode: number = 400, message: string) {
    super(message);
    this.name = "ServiceError";
    this.statusCode = statusCode;
  }
}

export async function createUser(
  userData: Partial<Omit<User, "id" | "created_at" | "updated_at">>
): Promise<User> {
  try {
    const { name, email, password } = userData;

    const existing = email ? getUserByEmail(email) : null;
    if (existing) throw new ServiceError(400, "Email já em uso.");

    const stmt = db.prepare(
      `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`
    );
    const result = stmt.run(name, email, password);

    const user = db
      .prepare("SELECT * FROM users WHERE id = ?")
      .get(result.lastInsertRowid) as User;

    return user;
  } catch (err) {
    if (err instanceof ServiceError) throw err;
    throw new ServiceError(500, "Falha ao criar usuário.");
  }
}

export async function updateUser(
  id: number,
  userData: Partial<Omit<User, "id" | "created_at" | "updated_at">>
): Promise<void> {
  try {
    const user = getUserById(id);
    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    const { name, email, password } = userData;

    const stmt = db.prepare(
      `UPDATE users SET 
        name = COALESCE(?, name), 
        email = COALESCE(?, email), 
        password = COALESCE(?, password),
        updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?`
    );

    stmt.run(name, email, password, id);
  } catch (error) {
    if (error instanceof ServiceError) throw error;
    console.error("Erro inesperado ao atualizar usuário:", error);
    throw new ServiceError(500, "Erro interno ao atualizar usuário.");
  }
}

export async function getUserById(id: number): Promise<User | null> {
  try {
    const user = db
      .prepare("SELECT * FROM users WHERE id = ?")
      .get(id) as User | null;
    return user;
  } catch {
    throw new ServiceError(500, "Falha ao buscar usuário.");
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
    throw new ServiceError(500, "Falha ao listar usuários.");
  }
}

export async function deleteUser(id: number): Promise<void> {
  try {
    const existing = db.prepare("SELECT * FROM users WHERE id = ?").get(id);
    if (!existing) throw new ServiceError(404, "Usuário não encontrado.");

    db.prepare("DELETE FROM users WHERE id = ?").run(id);
  } catch (err) {
    if (err instanceof ServiceError) throw err;
    throw new ServiceError(500, "Falha ao deletar usuário.");
  }
}

function getUserByEmail(email: string): User {
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email) as User;
}
