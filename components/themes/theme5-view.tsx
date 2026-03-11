'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ImagePlaceholder } from '@/components/image-placeholder';

const PDF = {
  hero: { title: 'Qarabagh Horses Square', line: 'Ağ Şəhərin mərkəzində bir memarlıq incisi.' },
  about: 'Qarabagh Horses Square, müasir dizayn və mədəni irsin ahəngdə olduğu bir memarlıq incisi. Təbii daş detalları ilə geniş açıq məkanlar.',
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

/** Theme 5: Editorial, black & white, newspaper style. */
export function Theme5View() {
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const about = useInViewOnce();
  const menziller = useInViewOnce();

  return (
    <div className="min-h-screen bg-neutral-100 text-black">
      <section ref={heroRef} id="hero" className="border-b-4 border-black px-6 pt-28 pb-16">
        <div className="mx-auto max-w-4xl">
          <motion.p className="font-theme2 text-xs uppercase tracking-[0.3em]" initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}}>Xoş Gəlmisiniz</motion.p>
          <motion.h1
            id="hero-heading"
            className="mt-2 font-theme2 text-4xl font-medium md:text-5xl"
            initial={{ opacity: 0, y: 10 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
          >
            {PDF.hero.title}
          </motion.h1>
          <motion.p className="mt-4 text-lg text-neutral-600" initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}} transition={{ delay: 0.1 }}>{PDF.hero.line}</motion.p>
          <motion.div className="mt-8 flex gap-6" initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}} transition={{ delay: 0.15 }}>
            <Link href="#menziller" className="border-b-2 border-black pb-1 text-sm font-medium uppercase tracking-wider hover:opacity-80">Mənzillər</Link>
            <Link href="#elaqe-form" className="border-b-2 border-black pb-1 text-sm font-medium uppercase tracking-wider hover:opacity-80">Əlaqə</Link>
          </motion.div>
        </div>
      </section>

      <section ref={about.ref} id="haqqimizda" className="px-6 py-16">
        <div className="mx-auto max-w-4xl columns-1 md:columns-2 md:gap-12">
          <motion.h2 className="font-theme2 text-2xl font-medium" initial={{ opacity: 0 }} animate={about.inView ? { opacity: 1 } : {}}>Haqqımızda</motion.h2>
          <motion.p className="mt-4 leading-relaxed text-neutral-700" initial={{ opacity: 0 }} animate={about.inView ? { opacity: 1 } : {}} transition={{ delay: 0.05 }}>{PDF.about}</motion.p>
        </div>
        <motion.div className="mx-auto mt-10 max-w-4xl" initial={{ opacity: 0 }} animate={about.inView ? { opacity: 1 } : {}} transition={{ delay: 0.1 }}>
          <ImagePlaceholder src="/photos/about-intro.png" alt="Haqqımızda" width={1200} height={800} className="rounded-none border-2 border-black" />
        </motion.div>
      </section>

      <section ref={menziller.ref} id="menziller" className="border-t-2 border-black bg-white px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <motion.h2 className="font-theme2 text-2xl font-medium" initial={{ opacity: 0 }} animate={menziller.inView ? { opacity: 1 } : {}}>Mənzil Seçimləri</motion.h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {PDF.menziller.map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0 }} animate={menziller.inView ? { opacity: 1 } : {}} transition={{ delay: 0.08 * i }}>
                <ImagePlaceholder src={item.img} alt={item.label} width={600} height={400} className="rounded-none border-2 border-black" />
                <p className="mt-4 font-theme2 text-lg">{item.label}</p>
                <p className="mt-1 text-sm text-neutral-600">{item.price} dən</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="elaqe-form" className="border-t-2 border-black px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-theme2 text-xl">{PDF.contact}</h2>
        </div>
      </section>

      <footer className="border-t-2 border-black bg-black px-6 py-8 text-center text-sm text-white">
        © {new Date().getFullYear()} Qarabagh Horses Square
      </footer>
    </div>
  );
}
