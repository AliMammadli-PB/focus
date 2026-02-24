'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { MagneticButton } from './magnetic-button';

const PLANS = [
  {
    name: '2 otaqlı',
    description: 'A və B blokda mövcud mənzillər',
    price: 'Müsahibə üçün',
    features: ['Smart sistemlər', '24/7 təhlükəsizlik', 'Su/qaz sensorları'],
    cta: 'Əlaqə',
    highlighted: false,
  },
  {
    name: '3 otaqlı',
    description: 'Bütün bloklarda seçim',
    price: 'Müsahibə üçün',
    features: ['Hər şey daxildir', 'FHN bildirişlər', 'Polisə avtomatik bildiriş'],
    cta: 'Əlaqə',
    highlighted: true,
  },
];

export function Pricing() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      id="qiymet"
      className="relative px-6 py-24 md:py-32"
      aria-labelledby="pricing-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16 text-center"
        >
          <h2
            id="pricing-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Qiymət
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            Mənzil növünə görə qiymətlər. Ətraflı müsahibə üçün əlaqə saxlayın.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {PLANS.map((plan, i) => (
            <motion.article
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative overflow-hidden rounded-3xl border p-8 backdrop-blur-xl md:p-10 ${
                plan.highlighted
                  ? 'border-violet-500/40 bg-violet-500/10 shadow-glow'
                  : 'border-white/10 bg-white/5'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />
              )}
              <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
              <p className="mt-1 text-white/60">{plan.description}</p>
              <p className="mt-4 text-2xl font-bold text-white">{plan.price}</p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-white/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <MagneticButton>
                  <Link
                    href="#elaqe"
                    className={`inline-flex rounded-2xl px-6 py-3 text-sm font-semibold transition focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-base ${
                      plan.highlighted
                        ? 'bg-white text-base hover:bg-white/90'
                        : 'border border-white/20 bg-white/5 text-white hover:bg-white/10'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </MagneticButton>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
