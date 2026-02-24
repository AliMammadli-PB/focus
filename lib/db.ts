import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

function getSql() {
  if (!connectionString) {
    throw new Error('DATABASE_URL və ya POSTGRES_URL təyin edilməyib. Vercel-də Storage → Postgres əlavə edin.');
  }
  return neon(connectionString);
}

let tableCreated = false;

async function ensureTable() {
  if (tableCreated) return;
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      ad TEXT NOT NULL,
      soyad TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      selected_menzil TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;
  tableCreated = true;
}

export async function initDb() {
  await ensureTable();
}

export async function insertUser(
  ad: string,
  soyad: string,
  password_hash: string,
  selected_menzil: string | null
): Promise<number> {
  const sql = getSql();
  await ensureTable();
  const rows = await sql`
    INSERT INTO users (ad, soyad, password_hash, selected_menzil)
    VALUES (${ad}, ${soyad}, ${password_hash}, ${selected_menzil})
    RETURNING id
  `;
  const row = rows[0] as { id: number };
  return row.id;
}

export async function findUserByAdSoyad(
  ad: string,
  soyad: string
): Promise<{ id: number; ad: string; soyad: string; password_hash: string } | null> {
  const sql = getSql();
  await ensureTable();
  const rows = await sql`
    SELECT id, ad, soyad, password_hash FROM users WHERE ad = ${ad} AND soyad = ${soyad} LIMIT 1
  `;
  const row = rows[0] as { id: number; ad: string; soyad: string; password_hash: string } | undefined;
  return row ?? null;
}

export async function findUserById(
  id: number
): Promise<{ id: number; ad: string; soyad: string; selected_menzil: string | null; created_at: string } | null> {
  const sql = getSql();
  await ensureTable();
  const rows = await sql`
    SELECT id, ad, soyad, selected_menzil, created_at FROM users WHERE id = ${id} LIMIT 1
  `;
  const row = rows[0] as {
    id: number;
    ad: string;
    soyad: string;
    selected_menzil: string | null;
    created_at: string;
  } | undefined;
  return row ?? null;
}

export type User = {
  id: number;
  ad: string;
  soyad: string;
  password_hash: string;
  selected_menzil: string | null;
  created_at: string;
};
