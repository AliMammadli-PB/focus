'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ImagePlaceholder } from '@/components/image-placeholder';

const PDF = {
  hero: { title: 'Qarabagh Horses Square', line: 'Ağ Şəhərin mərkəzində bir memarlıq incisi.' },
  about: 'Qarabagh Horses Square, müasir dizayn və mədəni irsin ahəngdə olduğu bir memarlıq incisi. Təbii daş, geniş açıq məkanlar — rahatlıq və dəbdəbə.',
  menziller: [
    { label: '2 Otaqlı', price: '438.141 ₼', img: '/photos/menzil-2otaqli.png' },
    { label: '3 Otaqlı', price: '532.032 ₼', img: '/photos/menzil-3otaqli.png' },
    { label: '4 Otaqlı', price: '727.650 ₼', img: '/photos/menzil-4otaqli.png' },
  ],
  contact: 'Qarabagh Horses Square Residences — VEB SAYT · E-POÇT · TELEFON',
};

function useInViewOnce(amount = 0.1) {
  const ref = useRef<HTMLElement>(null);
  return { ref, inView: useInView(ref, { once: true, amount }) };
}

/** Theme 6: Soft gradient, rounded, friendly. */
export function Theme6View() {
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const about = useInViewOnce();
  const menziller = useInViewOnce();

  return (
    <div className="min-h-screen text-violet-900">
      <section ref={heroRef} id="hero" className="flex min-h-[75vh] flex-col justify-center px-6 pt-24 pb-16">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h1
            id="hero-heading"
            className="text-4xl font-bold text-violet-800 md:text-5xl"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
          >
            {PDF.hero.title}
          </motion.h1>
          <motion.p className="mt-4 text-violet-600" initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}} transition={{ delay: 0.08 }}>{PDF.hero.line}</motion.p>
          <motion.div className="mt-10 flex justify-center gap-4" initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}} transition={{ delay: 0.15 }}>
            <Link href="#menziller" className="rounded-full bg-violet-600 px-8 py-3 font-medium text-white shadow-lg hover:bg-violet-700">Mənzil seçimləri</Link>
            <Link href="#elaqe-form" className="rounded-full border-2 border-violet-600 px-8 py-3 font-medium text-violet-700 hover:bg-violet-50">Əlaqə</Link>
          </motion.div>
        </div>
      </section>

      <section ref={about.ref} id="haqqimizda" className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <motion.h2 className="text-2xl font-bold text-violet-800" initial={{ opacity: 0 }} animate={about.inView ? { opacity: 1 } : {}}>Haqqımızda</motion.h2>
          <motion.p className="mt-4 rounded-2xl bg-white/80 p-6 leading-relaxed text-violet-700 shadow-sm" initial={{ opacity: 0 }} animate={about.inView ? { opacity: 1 } : {}} transition={{ delay: 0.05 }}>{PDF.about}</motion.p>
          <motion.div className="mt-8 overflow-hidden rounded-3xl shadow-xl" initial={{ opacity: 0 }} animate={about.inView ? { opacity: 1 } : {}} transition={{ delay: 0.1 }}>
            <ImagePlaceholder src="/photos/about-intro.png" alt="Haqqımızda" width={1200} height={800} className="rounded-3xl border-0" />
          </motion.div>
        </div>
      </section>

      <section ref={menziller.ref} id="menziller" className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <motion.h2 className="text-2xl font-bold text-violet-800" initial={{ opacity: 0 }} animate={menziller.inView ? { opacity: 1 } : {}}>Mənzil Seçimləri</motion.h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {PDF.menziller.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                animate={menziller.inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * i }}
                className="overflow-hidden rounded-3xl bg-white/80 p-4 shadow-lg"
              >
                <ImagePlaceholder src={item.img} alt={item.label} width={600} height={400} className="rounded-2xl border-0" />
                <p className="mt-4 font-semibold text-violet-800">{item.label}</p>
                <p className="text-violet-600">{item.price} dən</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="elaqe-form" className="px-6 py-16">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white/80 p-8 text-center shadow-lg">
          <h2 className="text-xl font-bold text-violet-800">{PDF.contact}</h2>
        </div>
      </section>

      <footer className="border-t border-violet-200/60 px-6 py-10 text-center text-sm text-violet-600">
        © {new Date().getFullYear()} Qarabagh Horses Square · Ağ Şəhər
      </footer>
    </div>
  );
}
