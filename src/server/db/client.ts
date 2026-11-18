import "server-only";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

type Database = ReturnType<typeof drizzle>;

let database: Database | undefined;

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable ${name}`);
  }
  return value;
}

/** Returns the shared database connection, creating it on first use. */
export function getDb(): Database {
  if (database) {
    return database;
  }

  const [host, port = "5432"] = requireEnv("DB_URL").split(":");
  const client = postgres({
    host,
    port: Number(port),
    username: requireEnv("DB_USER"),
    password: requireEnv("DB_PASSWORD"),
    database: requireEnv("DB_NAME"),
    ssl: process.env.DB_SSL === "disable" ? false : "require",
    // Supabase's transaction-mode pooler does not support prepared statements.
    prepare: false,
    max: 5,
  });

  database = drizzle(client);
  return database;
}
