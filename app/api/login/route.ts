import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { verifyPassword, createToken, getCookieName, getMaxAge } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ad, soyad, parol } = body as { ad?: string; soyad?: string; parol?: string };

    if (!ad?.trim() || !soyad?.trim() || !parol) {
      return NextResponse.json(
        { error: 'Ad, soyad və parol tələb olunur.' },
        { status: 400 }
      );
    }

    const db = getDb();
    const row = db.prepare(
      'SELECT id, ad, soyad, password_hash FROM users WHERE ad = ? AND soyad = ? LIMIT 1'
    ).get(ad.trim(), soyad.trim()) as { id: number; ad: string; soyad: string; password_hash: string } | undefined;

    if (!row || !(await verifyPassword(parol, row.password_hash))) {
      return NextResponse.json(
        { error: 'Ad, soyad və ya parol səhvdir.' },
        { status: 401 }
      );
    }

    const token = await createToken({ userId: row.id, ad: row.ad, soyad: row.soyad });
    const res = NextResponse.json({ success: true, redirect: '/hesabim' });
    res.cookies.set(getCookieName(), token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: getMaxAge(),
      path: '/',
    });
    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Daxil ola bilmədiniz.' },
      { status: 500 }
    );
  }
}
