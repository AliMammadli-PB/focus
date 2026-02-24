import { NextRequest, NextResponse } from 'next/server';
import { insertUser } from '@/lib/db';
import { hashPassword, createToken, getCookieName, getMaxAge } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ad, soyad, parol, parol_tekrar, menzil } = body as {
      ad?: string;
      soyad?: string;
      parol?: string;
      parol_tekrar?: string;
      menzil?: string;
    };

    if (!ad?.trim() || !soyad?.trim()) {
      return NextResponse.json(
        { error: 'Ad və soyad tələb olunur.' },
        { status: 400 }
      );
    }
    if (!parol || parol.length < 4) {
      return NextResponse.json(
        { error: 'Parol ən azı 4 simvol olmalıdır.' },
        { status: 400 }
      );
    }
    if (parol !== parol_tekrar) {
      return NextResponse.json(
        { error: 'Parollar uyğun gəlmir.' },
        { status: 400 }
      );
    }

    const password_hash = await hashPassword(parol);
    const selected_menzil = typeof menzil === 'string' && menzil.trim() ? menzil.trim() : null;

    const id = await insertUser(ad.trim(), soyad.trim(), password_hash, selected_menzil);

    const token = await createToken({ userId: id, ad: ad.trim(), soyad: soyad.trim() });
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
      { error: 'Qeydiyyat zamanı xəta baş verdi.' },
      { status: 500 }
    );
  }
}
