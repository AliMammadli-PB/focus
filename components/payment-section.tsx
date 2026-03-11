'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ScrollLetters } from './scroll-letters';

const PAYMENTS = [
  {
    title: 'Nəğd ödəniş',
    desc: 'Mansardda yerləşən mənzilləri 60 aylıq faizsiz daxili kreditlə əldə etmək mümkündür',
  },
  {
    title: 'İpoteka',
    desc: 'Bank vasitəsilə 20 ilədək 20% ilkin ödəniş etməklə 9-12% illik faizlə ipotekanın rəsmiləşdirilməsi mümkündür',
  },
  {
    title: 'Hissə-hissə',
    desc: '50% ilkin ödəniş və qalan məbləğ daxili kreditlə 36 aylıq faizsiz bərabər hissəyə bölünür. Bu halda mənzilin ümumi məbləğinə 2% endirim tətbiq olunur',
  },
  {
    title: 'Şərtlər',
    desc: '60% ilkin ödəniş olunursa, 24 ay faizsiz ödəmə ilə 1 il sonra ödəməyə başlayırsınız',
  },
];

export function PaymentSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });

  return (
    <section
      ref={ref}
      id="odenis"
      className="relative px-6 py-24 md:py-32"
      aria-labelledby="payment-heading"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="payment-heading"
          className="font-heading mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
        >
          <ScrollLetters text="Qarabagh Horses Square" />
        </h2>
        <p className="mb-16 text-lg text-white">Ödəniş Seçimləri</p>

        <div className="grid gap-6 sm:grid-cols-2">
          {PAYMENTS.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm transition hover:bg-white/[0.08] md:p-8"
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
