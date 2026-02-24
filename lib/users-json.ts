import { get, put } from '@vercel/blob';
import path from 'path';
import fs from 'fs';

const USERS_FILENAME = 'users.json';
const BLOB_PATHNAME = 'focus/users.json';

export type User = {
  id: number;
  ad: string;
  soyad: string;
  password_hash: string;
  selected_menzil: string | null;
  created_at: string;
};

function getLocalPath(): string {
  return path.join(process.cwd(), 'data', USERS_FILENAME);
}

async function readFromBlob(): Promise<User[]> {
  const res = await get(BLOB_PATHNAME, { access: 'private' });
  if (!res || res.statusCode !== 200 || !res.stream) return [];
  const text = await new Response(res.stream).text();
  if (!text.trim()) return [];
  try {
    const data = JSON.parse(text);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function writeToBlob(users: User[]): Promise<void> {
  await put(BLOB_PATHNAME, JSON.stringify(users, null, 2), {
    access: 'private',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

function readFromFile(): User[] {
  const filePath = getLocalPath();
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function writeToFile(users: User[]): void {
  const filePath = getLocalPath();
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');
}

const useBlob = typeof process.env.BLOB_READ_WRITE_TOKEN === 'string' && process.env.BLOB_READ_WRITE_TOKEN.length > 0;

export async function getUsers(): Promise<User[]> {
  if (useBlob) return readFromBlob();
  return readFromFile();
}

export async function saveUsers(users: User[]): Promise<void> {
  if (useBlob) return writeToBlob(users);
  writeToFile(users);
}

export async function insertUser(
  ad: string,
  soyad: string,
  password_hash: string,
  selected_menzil: string | null
): Promise<number> {
  const users = await getUsers();
  const nextId = users.length === 0 ? 1 : Math.max(...users.map((u) => u.id)) + 1;
  const created_at = new Date().toISOString();
  users.push({
    id: nextId,
    ad,
    soyad,
    password_hash,
    selected_menzil,
    created_at,
  });
  await saveUsers(users);
  return nextId;
}

export async function findUserByAdSoyad(
  ad: string,
  soyad: string
): Promise<{ id: number; ad: string; soyad: string; password_hash: string } | null> {
  const users = await getUsers();
  const u = users.find((x) => x.ad === ad && x.soyad === soyad);
  return u ? { id: u.id, ad: u.ad, soyad: u.soyad, password_hash: u.password_hash } : null;
}

export async function findUserById(
  id: number
): Promise<{ id: number; ad: string; soyad: string; selected_menzil: string | null; created_at: string } | null> {
  const users = await getUsers();
  const u = users.find((x) => x.id === id);
  return u
    ? { id: u.id, ad: u.ad, soyad: u.soyad, selected_menzil: u.selected_menzil, created_at: u.created_at }
    : null;
}
