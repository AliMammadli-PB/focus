'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '#haqqimizda', label: 'Haqqımızda' },
  { href: '#xususiyyetler', label: 'Xüsusiyyətlər' },
  { href: '#sitat', label: 'Sitat' },
  { href: '#elaqe', label: 'Əlaqə' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const borderOpacity = useTransform(scrollY, [0, 56], [0, 1]);

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
          className="font-heading text-base font-semibold tracking-tight text-text-primary outline-none transition focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent md:text-lg"
          aria-label="Ana səhifə"
        >
          Qarabağ Atları
        </Link>

        <nav className="hidden items-center gap-10 md:flex" aria-label="Əsas menyu">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Menyunu aç"
        >
          <span className={cn('h-0.5 w-5 rounded-full bg-white transition', open && 'translate-y-2 rotate-45')} />
          <span className={cn('h-0.5 w-5 rounded-full bg-white transition', open && 'opacity-0')} />
          <span className={cn('h-0.5 w-5 rounded-full bg-white transition', open && '-translate-y-2 -rotate-45')} />
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
                    className="block rounded-xl px-4 py-3 text-text-muted transition hover:text-text-primary"
                  >
                    {link.label}
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
      className="relative py-2 text-sm font-medium text-text-muted outline-none transition hover:text-text-primary focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <motion.span
        className="absolute bottom-0 left-0 h-px bg-white"
        initial={false}
        animate={{ width: hovered ? '100%' : '0%' }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
    </Link>
  );
}
