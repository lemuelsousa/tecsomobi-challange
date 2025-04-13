import Database from "better-sqlite3";
import fs from "fs/promises";
import path from "path";

import type { Database as BetterSqlite3Database } from "better-sqlite3";

export const db: BetterSqlite3Database = new Database("database.db", {
  verbose: console.log,
  fileMustExist: false,
});


export async function initializeDatabase() {
  const schemaPath = path.join(__dirname, "schemas", "users.sql");
  const schema = await fs.readFile(schemaPath, "utf8");
  db.exec(schema);
}
