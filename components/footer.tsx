'use client';

import Link from 'next/link';
import { ScrollLetters } from './scroll-letters';
import { useDesignMode } from '@/context/design-mode';
import { DraggableSection } from '@/components/draggable-section';

const LINKS = [
  { href: '#menziller', label: 'Mənzillər' },
  { href: '#haqqimizda', label: 'Haqqımızda' },
  { href: '#sitat', label: 'Sitat' },
  { href: '#elaqe', label: 'Əlaqə' },
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
              <ScrollLetters text={get('footer.brand', 'Qarabağ Atları Meydanı')} />
            </p>
            <p data-design-key="footer.tagline" className="mt-1 text-sm text-white/55">
              <ScrollLetters text={get('footer.tagline', 'Ağ Şəhər · Smart mənzillər · 24/7 monitorinq')} />
            </p>
          </div>
        <nav aria-label="Footer menyu">
          <ul className="flex flex-wrap justify-center gap-6 md:gap-8">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/55 transition hover:text-white focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded px-2 py-1"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        </div>
      </DraggableSection>
      <div className="mx-auto mt-10 max-w-6xl border-t border-white/5 pt-6 text-center text-sm text-white/50">
        <p>
          © {new Date().getFullYear()} Qarabağ Atları Meydanı · Ağ Şəhər
        </p>
      </div>
    </footer>
  );
}
