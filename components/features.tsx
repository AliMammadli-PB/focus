'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ScrollLetters } from './scroll-letters';

const FEATURES = [
  { title: 'Binada xəbərdarlıq', description: 'FHN-də göstərilir — bütün sakinlər vaxtında məlumat alır.', icon: AlertIcon },
  { title: 'Su sızması sensoru', description: 'Azərbaycan dilində bildirişlər. Anında siqnal.', icon: DropletIcon },
  { title: 'Qaz sızması sensoru', description: 'Təhlükə anında reaksiya. Tam monitorinq.', icon: FlameIcon },
  { title: 'Polisə bildiriş', description: 'Giriş aşkarlandıqda avtomatik bildiriş — 24/7 təhlükəsizlik.', icon: BellIcon },
];

export function Features() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });

  return (
    <section
      ref={ref}
      id="xususiyyetler"
      className="relative px-6 py-24 md:py-32"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-16 max-w-xl md:mb-20">
          <h2
            id="features-heading"
            className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl"
          >
            <ScrollLetters text="Smart mənzillər və təhlükəsizlik" />
          </h2>
          <p className="mt-5 text-lg text-white/65">
            <ScrollLetters text="Birbaşa binada xəbərdarlıq, su və qaz sızması aşkarlanır." />
          </p>
        </header>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm transition hover:bg-white/[0.08] md:p-7"
            >
              <feature.icon className="mb-4 h-9 w-9 text-white/85" />
              <h3 className="font-heading mb-2 text-lg font-semibold text-white">
                <ScrollLetters text={feature.title} />
              </h3>
              <p className="text-sm leading-relaxed text-white/65">
                <ScrollLetters text={feature.description} />
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  );
}
function DropletIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0L12 2.69z" />
    </svg>
  );
}
function FlameIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 23c0-5-3-8-3-12 0-2 1.5-4 3-5 1.5 1 3 3 3 5 0 4-3 7-3 12z" />
    </svg>
  );
}
function BellIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
  );
}
