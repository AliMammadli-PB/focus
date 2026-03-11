'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/context/language';

const NAV_LINKS = [
  { href: '#haqqimizda', key: 'nav_haqqimizda' },
  { href: '#menziller', key: 'nav_menziller' },
  { href: '#yerlesme', key: 'nav_yerlesme' },
  { href: '#odenis', key: 'nav_odenis' },
  { href: '#elaqe', key: 'nav_elaqe' },
];

export function HeaderTheme4() {
  const [open, setOpen] = useState(false);
  const { t, lang, setLang } = useLang();

  return (
    <header className="fixed left-0 right-0 top-0 z-[100] border-b-2 border-amber-500/80 bg-slate-900">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-lg font-bold uppercase tracking-wider text-amber-400" aria-label="Ana səhifə">
          QHS
        </Link>
        <nav className="hidden gap-8 md:flex" aria-label="Əsas menyu">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-200 hover:text-amber-400">
              {t(link.key)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as 'az' | 'en' | 'ru')}
            className="rounded border border-slate-600 bg-slate-800 px-2 py-1 text-xs text-slate-200"
            aria-label="Dil"
          >
            <option value="az">AZ</option>
            <option value="en">EN</option>
            <option value="ru">RU</option>
          </select>
          <button type="button" className="flex h-9 w-9 flex-col justify-center gap-1 md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Menyu">
            <span className="h-0.5 w-5 bg-amber-400" />
            <span className="h-0.5 w-5 bg-amber-400" />
            <span className="h-0.5 w-5 bg-amber-400" />
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-slate-700 bg-slate-900 px-4 py-4 md:hidden" aria-label="Mobil menyu">
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setOpen(false)} className="block py-2 text-slate-200 hover:text-amber-400">
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
