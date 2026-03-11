'use client';

import Link from 'next/link';
import { ScrollLetters } from './scroll-letters';
import { useDesignMode } from '@/context/design-mode';
import { DraggableSection } from '@/components/draggable-section';

const LINKS = [
  { href: '#menziller', label: 'Mənzillər' },
  { href: '#haqqimizda', label: 'Haqqımızda' },
  { href: '#sitat', label: 'Sitat' },
  { href: '#faq', label: 'FAQ' },
  { href: '#qalereya', label: 'Qalereya' },
  { href: '#xerite', label: 'Xəritə' },
  { href: '#elaqe', label: 'Əlaqə' },
  { href: '/login', label: 'Daxil ol' },
  { href: '/register', label: 'Qeydiyyat' },
  { href: '/hesabim', label: 'Hesabım' },
];

const SOCIAL = [
  { href: 'https://instagram.com', label: 'Instagram', icon: '📷' },
  { href: 'https://facebook.com', label: 'Facebook', icon: '👍' },
];

export function Footer() {
  const { get } = useDesignMode();
  const pos = get('footer.pos', '0,0').split(',').map(Number);
  const [fx, fy] = [isNaN(pos[0]) ? 0 : pos[0], isNaN(pos[1]) ? 0 : pos[1]];

  return (
    <footer
      className="relative border-t border-white/10 px-6 py-14 md:py-16"
      role="contentinfo"
    >
      <DraggableSection storageKey="footer.pos">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 md:flex-row" style={{ transform: `translate(${fx}px, ${fy}px)` }}>
          <div className="text-center md:text-left">
            <p data-design-key="footer.brand" className="font-heading text-base font-semibold text-white">
              <ScrollLetters text={get('footer.brand', 'Qarabagh Horses Square')} />
            </p>
            <p data-design-key="footer.tagline" className="mt-1 text-sm text-white">
              <ScrollLetters text={get('footer.tagline', 'Ağ Şəhər · Premium Rezidenslər')} />
            </p>
          </div>
        <nav aria-label="Footer menyu">
          <ul className="flex flex-wrap justify-center gap-6 md:gap-8">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white transition hover:text-white focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded px-2 py-1"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-6">
          {SOCIAL.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-white transition hover:text-white"
              aria-label={s.label}
            >
              {s.icon}
            </a>
          ))}
        </div>
        </div>
      </DraggableSection>
      <div className="mx-auto mt-10 max-w-6xl border-t border-white/5 pt-6 text-center text-sm text-white">
        <p>
          © {new Date().getFullYear()} Qarabagh Horses Square · Ağ Şəhər
        </p>
        <p className="mt-2">
          <a href="/broshur.pdf" target="_blank" rel="noopener noreferrer" className="text-amber-400/80 hover:text-amber-300">
            Broşür yüklə (PDF)
          </a>
        </p>
      </div>
    </footer>
  );
}
