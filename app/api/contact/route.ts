import { NextRequest, NextResponse } from 'next/server';
import { addLead } from '@/lib/leads-json';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ad, email, telefon, mesaj, tip } = body as {
      ad?: string;
      email?: string;
      telefon?: string;
      mesaj?: string;
      tip?: 'elaqe' | 'melumat';
    };
    if (!ad?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: 'Ad və e-poçt tələb olunur.' },
        { status: 400 }
      );
    }
    await addLead({
      ad: ad.trim(),
      email: email.trim(),
      telefon: (telefon && String(telefon).trim()) || '',
      mesaj: (mesaj && String(mesaj).trim()) || '',
      tip: tip === 'melumat' ? 'melumat' : 'elaqe',
    });
    return NextResponse.json({ success: true, message: 'Göndərildi. Tezliklə sizinlə əlaqə saxlayacağıq.' });
  } catch (e) {
    console.error('[contact]', e);
    return NextResponse.json(
      { error: 'Göndərilərkən xəta baş verdi.' },
      { status: 500 }
    );
  }
}
