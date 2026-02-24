'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const ITEMS = [
  {
    q: 'FHN nədir və necə işləyir?',
    a: 'FHN binada xəbərdarlıq sistemidir. Birbaşa binada warning olanda bütün sakinlərə göstərilir — vaxtında məlumat alırsınız.',
  },
  {
    q: 'Su və qaz sızması necə aşkarlanır?',
    a: 'Smart sensorlar su və qaz sızmasını anında aşkar edir. Azərbaycan dilində bildirişlər göndərilir, təhlükə anında reaksiya verilir.',
  },
  {
    q: 'Polisə bildiriş necə işləyir?',
    a: 'Giriş aşkarlandıqda sistem avtomatik polisə bildiriş göndərir. 24/7 təhlükəsizlik təmin olunur.',
  },
  {
    q: 'Harada yerləşir?',
    a: 'Qarabağ Atları Meydanı · Ağ Şəhər — City Park Mall yaxınlığında. Xəritə bölməsindən baxa bilərsiniz.',
  },
];

export function FAQ() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      ref={ref}
      id="faq"
      className="relative px-6 py-24 md:py-32"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-3xl">
        <motion.h2
          id="faq-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16 text-center text-3xl font-bold tracking-tight sm:text-4xl"
        >
          <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Tez-tez verilən suallar
          </span>
        </motion.h2>

        <div className="space-y-3">
          {ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06 }}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-4 text-left font-medium text-white transition hover:bg-white/5"
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
                id={`faq-question-${i}`}
              >
                {item.q}
                <motion.span
                  animate={{ rotate: open === i ? 180 : 0 }}
                  className="inline-block text-violet-400"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`faq-question-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="border-t border-white/10 px-6 py-4 text-white/70">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
