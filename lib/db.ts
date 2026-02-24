import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'focus.db');

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    const fs = require('fs');
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    db = new Database(dbPath);
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ad TEXT NOT NULL,
        soyad TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        selected_menzil TEXT,
        created_at TEXT DEFAULT (datetime('now'))
      );
    `);
  }
  return db;
}

export type User = {
  id: number;
  ad: string;
  soyad: string;
  password_hash: string;
  selected_menzil: string | null;
  created_at: string;
};
