import path from "path";
import fs from "fs/promises";
import { db } from "./db";

 async function loadSeed() {
  const schemaPath = path.join(__dirname, "schemas", "seed.sql");
  const schema = await fs.readFile(schemaPath, "utf8");
  db.exec(schema);
  db.close();
}

loadSeed().catch(console.error);