'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

const MENZILLER = [
  { id: '101', block: 'A', rooms: 2 },
  { id: '102', block: 'A', rooms: 3 },
  { id: '201', block: 'B', rooms: 2 },
  { id: '202', block: 'B', rooms: 3 },
  { id: '301', block: 'C', rooms: 2 },
  { id: '302', block: 'C', rooms: 3 },
];

export function Menziller() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      ref={ref}
      id="menziller"
      className="relative px-6 py-24 md:py-32"
      aria-labelledby="menziller-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2
            id="menziller-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Mənzillər
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            Smart mənzillər və tam təhlükəsizlik. Mənzillərə klik edin.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MENZILLER.map((m, i) => (
            <motion.article
              key={m.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className={cn(
                'group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm',
                'transition hover:border-violet-500/30 hover:bg-white/[0.08] hover:shadow-glow'
              )}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/20 text-violet-400 transition group-hover:bg-violet-500/30">
                <HomeIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-white">Mənzil {m.id}</h3>
              <p className="mt-1 text-sm text-white/60">
                {m.block} blok · {m.rooms} otaq
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M2.25 12.75V21a.75.75 0 00.75.75h5.25a.75.75 0 00.75-.75v-4.5a.75.75 0 01.75-.75h2.25a.75.75 0 01.75.75v4.5a.75.75 0 00.75.75H21a.75.75 0 00.75-.75V12M14.25 3h3.75a.75.75 0 01.75.75v3.75a.75.75 0 01-.75.75h-3.75a.75.75 0 01-.75-.75V3.75a.75.75 0 01.75-.75z" />
    </svg>
  );
}
