'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useLang } from '@/context/language';

const NAV_LINKS = [
  { href: '#haqqimizda', key: 'nav_haqqimizda' },
  { href: '#yasam-terzi', key: 'nav_yasam_terzi' },
  { href: '#menziller', key: 'nav_menziller' },
  { href: '#yerlesme', key: 'nav_yerlesme' },
  { href: '#odenis', key: 'nav_odenis' },
  { href: '#investisiya', key: 'nav_investisiya' },
  { href: '#elaqe', key: 'nav_elaqe' },
];

export function HeaderTheme2() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { t, lang, setLang } = useLang();

  return (
    <header className="fixed left-0 right-0 top-0 z-[100] border-b border-stone-200/80 bg-white/90 backdrop-blur-md theme-2-header">
      <div className="mx-auto grid h-20 max-w-5xl grid-cols-3 items-center gap-4 px-4 md:px-6">
        <nav className="hidden min-w-0 items-center justify-start gap-4 md:flex md:gap-6" aria-label="Əsas menyu">
          {NAV_LINKS.slice(0, 5).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="shrink-0 text-sm font-medium text-stone-600 transition hover:text-stone-900"
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className="min-w-0 justify-self-center truncate font-theme2 text-center text-lg font-semibold tracking-wide text-stone-900 md:text-xl"
          aria-label="Ana səhifə"
        >
          Qarabagh Horses Square
        </Link>

        <div className="flex min-w-0 items-center justify-end gap-2 md:gap-4">
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangOpen((o) => !o)}
              className="rounded-md border border-stone-300 bg-stone-50 px-3 py-1.5 text-xs font-medium text-stone-700"
              aria-label="Dil"
            >
              {lang.toUpperCase()}
            </button>
            <AnimatePresence>
              {langOpen && (
                <div className="absolute right-0 top-full z-50 mt-1 flex flex-col rounded-lg border border-stone-200 bg-white py-1 shadow-lg">
                  {(['az', 'en', 'ru'] as const).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => { setLang(l); setLangOpen(false); }}
                      className={cn('px-4 py-2 text-left text-sm', lang === l ? 'bg-stone-100 font-medium' : 'hover:bg-stone-50')}
                    >
                      {l === 'az' ? 'AZ' : l === 'en' ? 'EN' : 'RU'}
                    </button>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="Menyu"
          >
            <span className={cn('h-0.5 w-5 rounded-full bg-stone-700 transition', open && 'translate-y-2 rotate-45')} />
            <span className={cn('h-0.5 w-5 rounded-full bg-stone-700 transition', open && 'opacity-0')} />
            <span className={cn('h-0.5 w-5 rounded-full bg-stone-700 transition', open && '-translate-y-2 -rotate-45')} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <nav
            id="mobile-nav-theme2"
            className="border-t border-stone-200 bg-white/98 px-6 py-4 md:hidden"
            aria-label="Mobil menyu"
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-4 py-3 text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </AnimatePresence>
    </header>
  );
}
