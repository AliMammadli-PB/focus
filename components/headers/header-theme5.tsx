'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/context/language';

const NAV_LINKS = [
  { href: '#haqqimizda', key: 'nav_haqqimizda' },
  { href: '#yasam-terzi', key: 'nav_yasam_terzi' },
  { href: '#menziller', key: 'nav_menziller' },
  { href: '#odenis', key: 'nav_odenis' },
  { href: '#elaqe', key: 'nav_elaqe' },
];

export function HeaderTheme5() {
  const [open, setOpen] = useState(false);
  const { t, lang, setLang } = useLang();

  return (
    <header className="fixed left-0 right-0 top-0 z-[100] border-b border-black bg-white">
      <div className="mx-auto flex min-h-14 max-w-4xl items-center justify-between px-6">
        <Link href="/" className="font-theme2 text-base font-medium text-black" aria-label="Ana səhifə">
          Qarabagh Horses Square
        </Link>
        <nav className="hidden gap-8 md:flex" aria-label="Əsas menyu">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-xs uppercase tracking-widest text-black hover:underline">
              {t(link.key)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <span className="text-xs uppercase text-black">{lang}</span>
          <button type="button" className="md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Menyu">
            <span className="block h-px w-6 bg-black" />
            <span className="mt-1 block h-px w-6 bg-black" />
            <span className="mt-1 block h-px w-6 bg-black" />
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-black bg-white px-6 py-4 md:hidden" aria-label="Mobil menyu">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="block border-b border-black/10 py-3 text-sm uppercase tracking-wider text-black">
              {t(link.key)}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
