import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const postgresMock = vi.hoisted(() => vi.fn(() => "sql-client"));
const drizzleMock = vi.hoisted(() => vi.fn(() => ({ kind: "database" })));

vi.mock("postgres", () => ({ default: postgresMock }));
vi.mock("drizzle-orm/postgres-js", () => ({ drizzle: drizzleMock }));

async function loadGetDb() {
  const { getDb } = await import("@/server/db/client");
  return getDb;
}

describe("getDb", () => {
  beforeEach(() => {
    vi.resetModules();
    postgresMock.mockClear();
    drizzleMock.mockClear();
    vi.stubEnv("DB_USER", "portal");
    vi.stubEnv("DB_PASSWORD", "secret");
    vi.stubEnv("DB_URL", "db.example.com:6543");
    vi.stubEnv("DB_NAME", "postgres");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("connects with the four config values, TLS and no prepared statements", async () => {
    const getDb = await loadGetDb();

    expect(getDb()).toEqual({ kind: "database" });
    expect(postgresMock).toHaveBeenCalledWith({
      host: "db.example.com",
      port: 6543,
      username: "portal",
      password: "secret",
      database: "postgres",
      ssl: "require",
      prepare: false,
      max: 5,
    });
    expect(drizzleMock).toHaveBeenCalledWith("sql-client");
  });

  it("reuses the connection on later calls", async () => {
    const getDb = await loadGetDb();

    expect(getDb()).toBe(getDb());
    expect(postgresMock).toHaveBeenCalledTimes(1);
  });

  it("uses port 5432 when DB_URL has no port and turns TLS off on request", async () => {
    vi.stubEnv("DB_URL", "localhost");
    vi.stubEnv("DB_SSL", "disable");
    const getDb = await loadGetDb();

    getDb();

    expect(postgresMock).toHaveBeenCalledWith(
      expect.objectContaining({ host: "localhost", port: 5432, ssl: false }),
    );
  });

  it("fails with a clear message when a config value is missing", async () => {
    vi.stubEnv("DB_PASSWORD", "");
    const getDb = await loadGetDb();

    expect(() => getDb()).toThrow("Missing environment variable DB_PASSWORD");
  });
});
