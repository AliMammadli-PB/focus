'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const PRICES = [
  { rooms: 1, label: '1 otaqlı', price: 220_000, area: '42–48 m²', desc: 'Smart sistemlər, açıq məkan' },
  { rooms: 2, label: '2 otaqlı', price: 380_000, area: '68–78 m²', desc: 'Geniş yaşayış, tam təchizat' },
  { rooms: 3, label: '3 otaqlı', price: 520_000, area: '95–108 m²', desc: 'Ailə üçün ideal məkan' },
  { rooms: 4, label: '4 otaqlı', price: 680_000, area: '125–140 m²', desc: 'Premium yaşayış' },
];

export function MenzillerContent() {
  return (
    <>
      <header className="border-b border-white/10 px-6 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link
            href="/"
            className="font-heading text-lg font-semibold text-white/90 transition hover:text-white"
          >
            ← Qarabağ Atları Meydanı
          </Link>
        </div>
      </header>

      <main className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Mənzillər və qiymətlər
            </h1>
            <p className="mt-6 text-lg text-white/70">
              Ağ Şəhər · Smart mənzillər · 24/7 təhlükəsizlik
            </p>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PRICES.map((item, i) => (
              <motion.article
                key={item.rooms}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition hover:border-white/20 hover:bg-white/[0.08]"
              >
                <span className="text-sm font-medium uppercase tracking-wider text-white/60">
                  {item.label}
                </span>
                <p className="mt-4 font-heading text-3xl font-bold text-white md:text-4xl">
                  {item.price.toLocaleString('az-AZ')} <span className="text-lg font-normal text-white/70">₼</span>
                </p>
                <p className="mt-2 text-sm text-white/60">{item.area}</p>
                <p className="mt-4 text-sm leading-relaxed text-white/80">{item.desc}</p>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-20 text-center"
          >
            <Link
              href="/#elaqe"
              className="inline-block rounded-full border border-white/25 bg-white/10 px-10 py-4 text-base font-semibold text-white transition hover:bg-white/15"
            >
              Əlaqə saxla
            </Link>
          </motion.div>
        </div>
      </main>
    </>
  );
}
