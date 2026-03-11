'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ImagePlaceholder } from '@/components/image-placeholder';

const PDF = {
  hero: { title: 'Qarabagh Horses Square', line: 'Ağ Şəhərin mərkəzində bir memarlıq incisi.' },
  about: 'Qarabagh Horses Square, müasir dizayn və mədəni irsin ahəngdə olduğu bir memarlıq incisi. Təbii daş detalları ilə geniş açıq məkanlar. Burada həyat, təbiətlə iç-içə, zərif və dəbdəbəli bir atmosferdə keçir.',
  menziller: [
    { label: '2 Otaqlı', price: '438.141 ₼', area: '78.1–107.8 m²', img: '/photos/menzil-2otaqli.png' },
    { label: '3 Otaqlı', price: '532.032 ₼', area: '96.1–147.6 m²', img: '/photos/menzil-3otaqli.png' },
    { label: '4 Otaqlı', price: '727.650 ₼', area: '132.3–147 m²', img: '/photos/menzil-4otaqli.png' },
  ],
  yerlesme: 'Bulvar kənarı mənzil. Dənizkənarı bulvardan bir neçə dəqiqəlik məsafə.',
  contact: 'Qarabagh Horses Square Residences — VEB SAYT · E-POÇT · TELEFON',
};

function useInViewOnce(amount = 0.1) {
  const ref = useRef<HTMLElement>(null);
  return { ref, inView: useInView(ref, { once: true, amount }) };
}

/** Theme 4: Corporate, navy + gold, bold. */
export function Theme4View() {
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const about = useInViewOnce();
  const menziller = useInViewOnce();
  const location = useInViewOnce();

  return (
    <div className="min-h-screen text-slate-100">
      <section ref={heroRef} id="hero" className="flex min-h-[80vh] flex-col justify-center px-6 pt-24 pb-20">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h1
            id="hero-heading"
            className="text-4xl font-bold uppercase tracking-wider text-amber-400 md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
          >
            {PDF.hero.title}
          </motion.h1>
          <motion.p className="mt-4 text-slate-300" initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}} transition={{ delay: 0.1 }}>
            {PDF.hero.line}
          </motion.p>
          <motion.div className="mt-10 flex justify-center gap-4" initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>
            <Link href="#menziller" className="rounded bg-amber-500 px-6 py-3 font-semibold text-slate-900 hover:bg-amber-400">
              Mənzillər
            </Link>
            <Link href="#elaqe-form" className="rounded border border-amber-500/80 px-6 py-3 text-amber-400 hover:bg-amber-500/20">
              Əlaqə
            </Link>
          </motion.div>
        </div>
      </section>

      <section ref={about.ref} id="haqqimizda" className="border-t border-slate-700 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <motion.h2 className="text-2xl font-bold text-amber-400" initial={{ opacity: 0 }} animate={about.inView ? { opacity: 1 } : {}}>Haqqımızda</motion.h2>
          <motion.p className="mt-4 leading-relaxed text-slate-300" initial={{ opacity: 0 }} animate={about.inView ? { opacity: 1 } : {}} transition={{ delay: 0.06 }}>{PDF.about}</motion.p>
          <motion.div className="mt-8" initial={{ opacity: 0 }} animate={about.inView ? { opacity: 1 } : {}} transition={{ delay: 0.1 }}>
            <ImagePlaceholder src="/photos/about-intro.png" alt="Haqqımızda" width={1200} height={800} className="rounded-lg border border-slate-600" />
          </motion.div>
        </div>
      </section>

      <section ref={menziller.ref} id="menziller" className="border-t border-slate-700 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <motion.h2 className="text-2xl font-bold text-amber-400" initial={{ opacity: 0 }} animate={menziller.inView ? { opacity: 1 } : {}}>Mənzil Seçimləri</motion.h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {PDF.menziller.map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, y: 12 }} animate={menziller.inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.08 * i }} className="rounded-lg border border-slate-600 bg-slate-800/50 p-4">
                <ImagePlaceholder src={item.img} alt={item.label} width={600} height={400} className="rounded border-0" />
                <p className="mt-3 font-semibold text-amber-400">{item.label}</p>
                <p className="text-slate-200">{item.price} dən · {item.area}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section ref={location.ref} id="yerlesme" className="border-t border-slate-700 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <motion.h2 className="text-2xl font-bold text-amber-400" initial={{ opacity: 0 }} animate={location.inView ? { opacity: 1 } : {}}>Yerləşmə</motion.h2>
          <motion.p className="mt-4 text-slate-300" initial={{ opacity: 0 }} animate={location.inView ? { opacity: 1 } : {}}>{PDF.yerlesme}</motion.p>
          <motion.div className="mt-6" initial={{ opacity: 0 }} animate={location.inView ? { opacity: 1 } : {}} transition={{ delay: 0.08 }}>
            <ImagePlaceholder src="/photos/yerlesme-bulvar.png" alt="Yerləşmə" width={1200} height={600} className="rounded-lg border border-slate-600" />
          </motion.div>
        </div>
      </section>

      <section id="elaqe-form" className="border-t border-slate-700 px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-xl font-bold text-amber-400">{PDF.contact}</h2>
        </div>
      </section>

      <footer className="border-t border-slate-700 px-6 py-8 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} Qarabagh Horses Square · Ağ Şəhər
      </footer>
    </div>
  );
}
