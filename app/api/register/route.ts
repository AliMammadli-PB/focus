import { NextRequest, NextResponse } from 'next/server';
import { insertUser } from '@/lib/db';
import { hashPassword, createToken, getCookieName, getMaxAge } from '@/lib/auth';

const LOG_PREFIX = '[register]';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch((parseError) => {
      console.error(LOG_PREFIX, 'JSON parse xətası:', parseError);
      throw parseError;
    });
    const { ad, soyad, parol, parol_tekrar, menzil } = body as {
      ad?: string;
      soyad?: string;
      parol?: string;
      parol_tekrar?: string;
      menzil?: string;
    };

    console.log(LOG_PREFIX, 'Sorğu gəldi:', { ad: ad?.trim() ? '(var)' : '(yox)', soyad: soyad?.trim() ? '(var)' : '(yox)', menzil: menzil ?? '(boş)' });

    if (!ad?.trim() || !soyad?.trim()) {
      console.warn(LOG_PREFIX, 'Validasiya: ad və ya soyad boş');
      return NextResponse.json(
        { error: 'Ad və soyad tələb olunur.' },
        { status: 400 }
      );
    }
    if (!parol || parol.length < 4) {
      console.warn(LOG_PREFIX, 'Validasiya: parol qısa');
      return NextResponse.json(
        { error: 'Parol ən azı 4 simvol olmalıdır.' },
        { status: 400 }
      );
    }
    if (parol !== parol_tekrar) {
      console.warn(LOG_PREFIX, 'Validasiya: parollar uyğun gəlmir');
      return NextResponse.json(
        { error: 'Parollar uyğun gəlmir.' },
        { status: 400 }
      );
    }

    console.log(LOG_PREFIX, 'Parol hash edilir…');
    const password_hash = await hashPassword(parol);
    const selected_menzil = typeof menzil === 'string' && menzil.trim() ? menzil.trim() : null;

    console.log(LOG_PREFIX, 'DB-ə yazılır…', { selected_menzil });
    const id = await insertUser(ad.trim(), soyad.trim(), password_hash, selected_menzil);
    console.log(LOG_PREFIX, 'İstifadəçi yaradıldı, id:', id);

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
    const err = e instanceof Error ? e : new Error(String(e));
    const message = err.message;
    const stack = err.stack;
    console.error(LOG_PREFIX, 'Xəta:', message);
    console.error(LOG_PREFIX, 'Stack:', stack);
    if ('code' in err) console.error(LOG_PREFIX, 'Kod:', (err as { code: string }).code);
    if ('cause' in err && err.cause) console.error(LOG_PREFIX, 'Səbəb:', err.cause);

    const isDev = process.env.NODE_ENV !== 'production';
    return NextResponse.json(
      {
        error: 'Qeydiyyat zamanı xəta baş verdi.',
        ...(isDev && { debug: message, hint: 'Server loglarına baxın (Vercel: Logs / Runtime Logs)' }),
      },
      { status: 500 }
    );
  }
}
