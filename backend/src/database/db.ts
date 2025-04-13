import fs from "fs/promises";
import path from "path";
import Database from "better-sqlite3";
import { fileURLToPath } from "url";

export const db = new Database("db.sqlite");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function initializeDatabase() {
  const schemaPath = path.join(__dirname, "schemas", "users.sql");
  const schema = await fs.readFile(schemaPath, "utf8");
  db.exec(schema);
}
