import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { findUserById } from '@/lib/db';
import { verifyToken, getCookieName } from '@/lib/auth';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(getCookieName())?.value;
    if (!token) {
      return NextResponse.json({ user: null });
    }
    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ user: null });
    }
    const row = await findUserById(payload.userId);
    if (!row) {
      return NextResponse.json({ user: null });
    }
    return NextResponse.json({
      user: {
        id: row.id,
        ad: row.ad,
        soyad: row.soyad,
        selected_menzil: row.selected_menzil,
        created_at: row.created_at,
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ user: null });
  }
}
