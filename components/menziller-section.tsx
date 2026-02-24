'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ScrollLetters } from './scroll-letters';
import { useDesignMode } from '@/context/design-mode';
import { DraggableSection } from '@/components/draggable-section';

/** Server və client eyni format üçün — hydration uyğunluğu */
function formatPrice(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

const PRICES_DEFAULTS = [
  { rooms: 1, label: '1 otaqlı', price: 220_000, area: '42–48 m²', desc: 'Smart sistemlər, açıq məkan', key: 'menziller.price1' as const },
  { rooms: 2, label: '2 otaqlı', price: 380_000, area: '68–78 m²', desc: 'Geniş yaşayış, tam təchizat', key: 'menziller.price2' as const },
  { rooms: 3, label: '3 otaqlı', price: 520_000, area: '95–108 m²', desc: 'Ailə üçün ideal məkan', key: 'menziller.price3' as const },
  { rooms: 4, label: '4 otaqlı', price: 680_000, area: '125–140 m²', desc: 'Premium yaşayış', key: 'menziller.price4' as const },
];

export function MenzillerSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const { get } = useDesignMode();
  const pos = get('menziller.pos', '0,0').split(',').map(Number);
  const [mx, my] = [isNaN(pos[0]) ? 0 : pos[0], isNaN(pos[1]) ? 0 : pos[1]];

  return (
    <section
      ref={ref}
      id="menziller"
      className="relative px-6 py-24 md:py-32"
      aria-labelledby="menziller-heading"
    >
      <DraggableSection storageKey="menziller.pos">
        <div className="mx-auto max-w-6xl" style={{ transform: `translate(${mx}px, ${my}px)` }}>
          <header className="mb-16 max-w-2xl md:mb-20">
            <h2
              id="menziller-heading"
              data-design-key="menziller.heading"
              className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
            >
              <ScrollLetters text={get('menziller.heading', 'Mənzillər və qiymətlər')} />
            </h2>
            <p data-design-key="menziller.subtitle" className="mt-5 text-lg text-white/65">
              <ScrollLetters text={get('menziller.subtitle', 'Ağ Şəhər · Smart mənzillər · 24/7 təhlükəsizlik')} />
            </p>
          </header>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PRICES_DEFAULTS.map((item, i) => {
              const priceVal = parseInt(get(item.key, String(item.price)), 10);
              const price = Number.isNaN(priceVal) ? item.price : priceVal;
              const menzilSlug = encodeURIComponent(item.label);
              return (
                <motion.article
                  key={item.rooms}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={`/register?menzil=${menzilSlug}`}
                    className="block rounded-2xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur-sm transition hover:border-white/20 hover:bg-white/[0.09] md:p-8"
                  >
                    <span className="text-sm font-medium uppercase tracking-wider text-white/55">
                      {item.label}
                    </span>
                    <p className="mt-4 font-heading text-3xl font-bold text-white md:text-4xl">
                      {formatPrice(price)}{' '}
                      <span className="text-lg font-normal text-white/60">₼</span>
                    </p>
                    <p className="mt-1 text-sm text-white/55">{item.area}</p>
                    <p className="mt-4 text-sm leading-relaxed text-white/75">{item.desc}</p>
                    <p className="mt-4 text-xs font-medium uppercase tracking-wider text-amber-400/80">
                      Seç → Qeydiyyat
                    </p>
                  </Link>
                </motion.article>
              );
            })}
          </div>

          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            <a
              href="#elaqe"
              className="inline-block rounded-full border border-white/25 bg-white/10 px-10 py-3.5 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Əlaqə saxla
            </a>
          </motion.div>
        </div>
      </DraggableSection>
    </section>
  );
}
