'use client';

import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ScrollLetters } from './scroll-letters';

const FAQ_ITEMS = [
  {
    sual: 'Mənzillər harada yerləşir?',
    cavab: 'Qarabağ Atları Meydanı rezidensləri Ağ Şəhərdə yerləşir. Tam ünvan və xəritə üçün əlaqə bölməsinə baxın.',
  },
  {
    sual: 'Ödəniş necə edilir?',
    cavab: 'İlkin ödəniş və aylıq ödəniş planı haqqında məlumat üçün +994 55 440 10 30 nömrəsinə zəng edə və ya WhatsApp yaza bilərsiniz.',
  },
  {
    sual: 'Smart sistemlər nədir?',
    cavab: 'Binada xəbərdarlıq (FHN), su və qaz sızması sensorları, oğurluq zamanı polisə avtomatik bildiriş və 24/7 təhlükəsizlik sistemləri daxildir.',
  },
  {
    sual: 'Mənzilləri gəzmək mümkündürmü?',
    cavab: 'Bəli. Müraciət etdikdə nümayəndə ilə görüş və mənzillərin gəzintisi təşkil olunur.',
  },
];

function FaqItem({ sual, cavab, index }: { sual: string; cavab: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="border-b border-white/10 last:border-0"
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left text-white focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        aria-expanded={open}
      >
        <span className="font-heading font-semibold">{sual}</span>
        <span className="text-xl text-amber-400/90">{open ? '−' : '+'}</span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden"
      >
        <p className="pb-5 pr-8 text-white/70">{cavab}</p>
      </motion.div>
    </motion.div>
  );
}

export function FAQ() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

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
          className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <ScrollLetters text="Tez-tez verilən suallar" />
        </motion.h2>
        <motion.p
          className="mt-3 text-white/65"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.08 }}
        >
          Maraqlı suallarınızın cavabları.
        </motion.p>
        <motion.div
          className="mt-12 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm md:p-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.12 }}
        >
          {FAQ_ITEMS.map((item, i) => (
            <FaqItem key={i} sual={item.sual} cavab={item.cavab} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
