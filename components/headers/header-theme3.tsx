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

export function HeaderTheme3() {
  const [open, setOpen] = useState(false);
  const { t, lang, setLang } = useLang();

  return (
    <header className="fixed left-0 right-0 top-0 z-[100] theme-3-header">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link
          href="/"
          className="font-theme3 text-sm font-medium uppercase tracking-[0.2em] text-white"
          aria-label="Ana səhifə"
        >
          QHS
        </Link>

        <nav className="hidden items-center gap-10 md:flex" aria-label="Əsas menyu">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium uppercase tracking-[0.15em] text-white/80 transition hover:text-white"
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as 'az' | 'en' | 'ru')}
              className="border-0 bg-transparent text-xs uppercase tracking-wider text-white/70 focus:outline-none focus:ring-0"
              aria-label="Dil"
            >
              <option value="az">AZ</option>
              <option value="en">EN</option>
              <option value="ru">RU</option>
            </select>
          </div>
          <button
            type="button"
            className="flex h-9 w-9 flex-col items-center justify-center gap-1 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="Menyu"
          >
            <span className="h-px w-4 bg-white" />
            <span className="h-px w-4 bg-white" />
            <span className="h-px w-4 bg-white" />
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="absolute left-0 right-0 top-14 border-t border-white/10 bg-black/95 py-6 md:hidden"
          aria-label="Mobil menyu"
        >
          <ul className="flex flex-col gap-0 px-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-white/5 py-4 text-xs uppercase tracking-wider text-white/80"
                >
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
