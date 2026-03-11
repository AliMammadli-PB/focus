'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ScrollLetters } from './scroll-letters';

const ITEMS = [
  {
    title: 'Yüksək gəlir',
    desc: 'Şəhərin mərkəzində əlçatan mövqedə yerləşən Residence yüksək gəlirlə kirayə verilən mənzil üçün ideal seçimdir.',
  },
  {
    title: 'Mərkəzi məkan',
    desc: 'Ağ Şəhər gələcəyin aktiv həyat tərzinin ünvanı və yeni şəhər mərkəzidir.',
  },
  {
    title: 'Keyfiyyət zəmanəti',
    desc: 'Layihədə istifadə olunan bütün materiallar və tikinti həlləri yüksək keyfiyyət, təhlükəsizlik və uzunömürlülük standartlarına tam uyğundur.',
  },
  {
    title: 'Rahat yaşayış',
    desc: 'Rahat həyat, komfortlu evlər – Qarabag Horses Square-də sizi gözləyir.',
  },
  {
    title: 'Dəyər artımı',
    desc: 'Dənizkənarı bulvara yaxın məsafədə yerləşən çox az sayda yaşayış komplekslərindən biri olan Knightsbridge Residence-də mənzil yüksək likvidliyə malikdir.',
  },
];

export function InvestmentSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      id="investisiya"
      className="relative px-6 py-24 md:py-32"
      aria-labelledby="investment-heading"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="investment-heading"
          className="font-heading mb-16 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
        >
          <ScrollLetters text="Daşınmaz əmlaka investisiya üstünlükləri" />
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.06 * i }}
              className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm transition hover:bg-white/[0.08] md:p-7"
            >
              <h3 className="font-heading text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white">{item.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
