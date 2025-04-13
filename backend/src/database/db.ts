import Database, { Database as DatabaseType } from "better-sqlite3";
import fs from "fs/promises";
import path from "path";

export const db: DatabaseType = new Database("database.db", {
  verbose: console.log,
  fileMustExist: false,
});


export async function initializeDatabase() {
  const schemaPath = path.join(__dirname, "schemas", "users.sql");
  const schema = await fs.readFile(schemaPath, "utf8");
  db.exec(schema);
}
