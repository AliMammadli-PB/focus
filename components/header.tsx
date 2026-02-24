'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useLang } from '@/context/language';

const NAV_LINKS = [
  { href: '#haqqimizda', key: 'nav_haqqimizda' },
  { href: '#xususiyyetler', key: 'nav_xususiyyetler' },
  { href: '#menziller', key: 'nav_menziller' },
  { href: '#sitat', key: 'nav_sitat' },
  { href: '#faq', key: 'nav_faq' },
  { href: '#qalereya', key: 'nav_qalereya' },
  { href: '#xerite', key: 'nav_xerite' },
  { href: '#elaqe', key: 'nav_elaqe' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { scrollY } = useScroll();
  const borderOpacity = useTransform(scrollY, [0, 56], [0, 1]);
  const { theme, setTheme } = useTheme();
  const { t, lang, setLang } = useLang();

  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-[100] border-b border-transparent backdrop-blur-md"
    >
      <motion.div
        style={{ opacity: borderOpacity }}
        className="absolute inset-x-0 bottom-0 h-px bg-white/10"
      />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:h-18">
        <Link
          href="/"
          className="font-heading text-base font-semibold tracking-tight text-[var(--text)] outline-none transition focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent md:text-lg"
          aria-label="Ana səhifə"
        >
          Qarabağ Atları
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Əsas menyu">
          {NAV_LINKS.slice(0, 6).map((link) => (
            <NavLink key={link.href} href={link.href}>
              {t(link.key)}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangOpen((o) => !o)}
              className="rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-medium text-[var(--text)]"
              aria-label="Dil"
            >
              {lang.toUpperCase()}
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="absolute right-0 top-full z-50 mt-1 flex flex-col rounded-lg border border-white/10 bg-black/95 py-1 shadow-xl"
                >
                  {(['az', 'en', 'ru'] as const).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => { setLang(l); setLangOpen(false); }}
                      className={cn('px-4 py-2 text-left text-sm', lang === l ? 'bg-white/10 font-medium' : 'hover:bg-white/5')}
                    >
                      {l === 'az' ? 'AZ' : l === 'en' ? 'EN' : 'RU'}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-lg border border-white/20 bg-white/5 p-1.5 text-[var(--text)]"
            aria-label={theme === 'dark' ? 'İşıqlı rejim' : 'Qaranlıq rejim'}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Menyunu aç"
        >
          <span className={cn('h-0.5 w-5 rounded-full bg-[var(--text)] transition', open && 'translate-y-2 rotate-45')} />
          <span className={cn('h-0.5 w-5 rounded-full bg-[var(--text)] transition', open && 'opacity-0')} />
          <span className={cn('h-0.5 w-5 rounded-full bg-[var(--text)] transition', open && '-translate-y-2 -rotate-45')} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-white/10 backdrop-blur-xl md:hidden"
            aria-label="Mobil menyu"
          >
            <ul className="flex flex-col gap-0 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-[var(--text-muted)] transition hover:text-[var(--text)]"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      className="relative py-2 text-sm font-medium text-[var(--text-muted)] outline-none transition hover:text-[var(--text)] focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <motion.span
        className="absolute bottom-0 left-0 h-px bg-[var(--text)]"
        initial={false}
        animate={{ width: hovered ? '100%' : '0%' }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
    </Link>
  );
}
