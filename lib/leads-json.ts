import { get, put } from '@vercel/blob';
import path from 'path';
import fs from 'fs';

const BLOB_PATHNAME = 'focus/leads.json';
const LOCAL_PATH = path.join(process.cwd(), 'data', 'leads.json');

export type Lead = {
  id: number;
  ad: string;
  email: string;
  telefon: string;
  mesaj: string;
  tip: 'elaqe' | 'melumat';
  created_at: string;
};

const useBlob = typeof process.env.BLOB_READ_WRITE_TOKEN === 'string' && process.env.BLOB_READ_WRITE_TOKEN.length > 0;

async function readLeads(): Promise<Lead[]> {
  if (useBlob) {
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
  try {
    const raw = fs.readFileSync(LOCAL_PATH, 'utf-8');
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function writeLeads(leads: Lead[]): Promise<void> {
  if (useBlob) {
    await put(BLOB_PATHNAME, JSON.stringify(leads, null, 2), {
      access: 'private',
      contentType: 'application/json',
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return;
  }
  const dir = path.dirname(LOCAL_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(LOCAL_PATH, JSON.stringify(leads, null, 2), 'utf-8');
}

export async function addLead(lead: Omit<Lead, 'id' | 'created_at'>): Promise<number> {
  const leads = await readLeads();
  const nextId = leads.length === 0 ? 1 : Math.max(...leads.map((l) => l.id)) + 1;
  leads.push({
    ...lead,
    id: nextId,
    created_at: new Date().toISOString(),
  });
  await writeLeads(leads);
  return nextId;
}
