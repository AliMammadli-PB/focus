'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const ITEMS = [
  {
    quote: 'Smart sistemlər və təhlükəsizlik səviyyəsi fikrimizi dəyişdi. Bu binada mənzil almaq qərarına gəldik.',
    author: 'Sakin A',
    role: 'A blok',
  },
  {
    quote: 'Su və qaz sensorları, polisə avtomatik bildiriş — ailə üçün rahatlıq hissi verir.',
    author: 'Sakin B',
    role: 'B blok',
  },
  {
    quote: 'Ağ Şəhərdə ən ağıllı rezidenslərdən biri. FHN və bütün xəbərdarlıqlar vaxtında gəlir.',
    author: 'Sakin C',
    role: 'C blok',
  },
];

export function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });
  const [index, setIndex] = useState(0);

  return (
    <section
      ref={ref}
      className="relative px-6 py-24 md:py-32"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-4xl">
        <motion.h2
          id="testimonials-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16 text-center text-3xl font-bold tracking-tight sm:text-4xl"
        >
          <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Sakinlər nə deyir
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-12"
        >
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="text-lg leading-relaxed text-white/90 md:text-xl"
            >
              &ldquo;{ITEMS[index].quote}&rdquo;
            </motion.blockquote>
          </AnimatePresence>
          <div className="mt-6 flex items-center justify-between">
            <div>
              <cite className="not-italic font-semibold text-white">
                {ITEMS[index].author}
              </cite>
              <p className="text-sm text-white/50">{ITEMS[index].role}</p>
            </div>
            <div className="flex gap-2">
              {ITEMS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={cn(
                    'h-2 w-2 rounded-full transition',
                    i === index ? 'bg-violet-400 w-6' : 'bg-white/30 hover:bg-white/50'
                  )}
                  aria-label={`Şərh ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
