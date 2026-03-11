'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ScrollLetters } from './scroll-letters';
import { useDesignMode } from '@/context/design-mode';
import { DraggableSection } from '@/components/draggable-section';
import { ImagePlaceholder } from '@/components/image-placeholder';

/** Server və client eyni format üçün — hydration uyğunluğu */
function formatPrice(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

const PRICES_DEFAULTS = [
  { rooms: 2, label: '2 Otaqlı', slug: '2-otaqli', price: 438_141, area: '78.1–107.8 m²', desc: '5005 azn-dən başlayan qiymətlərlə', key: 'menziller.price2' as const, img: '/photos/menzil-2otaqli.png', imgW: 600, imgH: 400 },
  { rooms: 3, label: '3-otaqlı', slug: '3-otaqli', price: 532_032, area: '96.1–147.6 m²', desc: '4 950 azn-dən başlayan qiymətlərlə', key: 'menziller.price3' as const, img: '/photos/menzil-3otaqli.png', imgW: 600, imgH: 400 },
  { rooms: 4, label: '4-otaqlı', slug: '4-otaqli', price: 727_650, area: '132.3–147 m²', desc: '4 950 azn-dən başlayan qiymətlərlə', key: 'menziller.price4' as const, img: '/photos/menzil-4otaqli.png', imgW: 600, imgH: 400 },
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
              <ScrollLetters text={get('menziller.heading', 'Mənzil Seçimləri')} />
            </h2>
            <p data-design-key="menziller.subtitle" className="mt-5 text-lg text-white">
              <ScrollLetters text={get('menziller.subtitle', 'Qarabagh Horses Square Residence-də yaşamağın üstünlükləri')} />
            </p>
          </header>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRICES_DEFAULTS.map((item, i) => {
              const priceVal = parseInt(get(item.key, String(item.price)), 10);
              const price = Number.isNaN(priceVal) ? item.price : priceVal;
              return (
                <motion.article
                  key={item.rooms}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={`/menziller/${item.slug}`}
                    className="block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-sm transition hover:border-white/20 hover:bg-white/[0.09]"
                  >
                    <ImagePlaceholder
                      src={item.img}
                      alt={item.label}
                      width={item.imgW}
                      height={item.imgH}
                      className="rounded-t-2xl border-0 rounded-b-none"
                    />
                    <div className="p-7 md:p-8">
                      <span className="text-sm font-medium uppercase tracking-wider text-white">
                        {item.label}
                      </span>
                      <p className="mt-4 font-heading text-3xl font-bold text-white md:text-4xl">
                        {formatPrice(price)}{' '}
                        <span className="text-lg font-normal text-white">₼</span>
                        <span className="ml-1 text-sm font-normal text-white">dən</span>
                      </p>
                      <p className="mt-1 text-xs text-white">*Təklif olunan sahə {item.area}</p>
                      <p className="mt-4 text-sm leading-relaxed text-white">{item.desc}</p>
                      <p className="mt-4 text-xs font-medium uppercase tracking-wider text-amber-400/80">
                        Ətraflı bax →
                      </p>
                    </div>
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
