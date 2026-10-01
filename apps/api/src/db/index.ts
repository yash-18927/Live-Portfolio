import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.js';

let db: ReturnType<typeof drizzle<typeof schema>> | null = null;
let sql: ReturnType<typeof postgres> | null = null;

export function getDb(databaseUrl?: string) {
  if (db) return db;

  const url = databaseUrl ?? process.env.DATABASE_URL ?? 'postgresql://localhost:5432/waiting_room';
  sql = postgres(url);
  db = drizzle(sql, { schema });
  return db;
}

export async function closeDb() {
  if (sql) {
    await sql.end();
    sql = null;
    db = null;
  }
}

export { schema };
