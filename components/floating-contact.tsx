'use client';

import Link from 'next/link';
import { CONTACT_PHONE_TEL, whatsAppUrl } from '@/lib/contact';

export function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col gap-3" aria-label="Əlaqə düymələri">
      <a
        href={CONTACT_PHONE_TEL}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl text-black shadow-lg transition hover:bg-white/95 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        aria-label="Zəng edin"
      >
        📞
      </a>
      <a
        href={whatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-2xl shadow-lg transition hover:bg-[#20bd5a] focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        aria-label="WhatsApp"
      >
        💬
      </a>
    </div>
  );
}
