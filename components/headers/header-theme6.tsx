'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/context/language';

const NAV_LINKS = [
  { href: '#haqqimizda', key: 'nav_haqqimizda' },
  { href: '#menziller', key: 'nav_menziller' },
  { href: '#yerlesme', key: 'nav_yerlesme' },
  { href: '#elaqe', key: 'nav_elaqe' },
];

export function HeaderTheme6() {
  const [open, setOpen] = useState(false);
  const { t, lang, setLang } = useLang();

  return (
    <header className="fixed left-0 right-0 top-0 z-[100] bg-violet-600/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-base font-semibold text-white" aria-label="Ana səhifə">
          Qarabagh Horses Square
        </Link>
        <nav className="hidden gap-6 md:flex" aria-label="Əsas menyu">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-white/90 hover:text-white">
              {t(link.key)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white">{lang.toUpperCase()}</span>
          <button type="button" className="rounded-lg p-2 md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Menyu">
            <span className="block h-0.5 w-5 rounded bg-white" />
            <span className="mt-1 block h-0.5 w-5 rounded bg-white" />
            <span className="mt-1 block h-0.5 w-5 rounded bg-white" />
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-white/20 bg-violet-600 px-4 py-4 md:hidden" aria-label="Mobil menyu">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="block py-3 text-white">
              {t(link.key)}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
