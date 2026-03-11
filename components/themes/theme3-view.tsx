'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ImagePlaceholder } from '@/components/image-placeholder';

const PDF = {
  hero: {
    title: 'Qarabagh Horses Square',
    line: 'Ağ Şəhərin mərkəzində bir memarlıq incisi.',
  },
  about: 'Qarabagh Horses Square, müasir dizayn və mədəni irsin ahəngdə olduğu bir memarlıq incisi. Təbii daş detallarının istifadəsi ilə geniş açıq məkanlar yaradır. Burada həyat, təbiətlə iç-içə, zərif və dəbdəbəli bir atmosferdə keçir.',
  lifestyle: ['Premium — luxury living, breathtaking views.', 'Panoramic — top-notch amenities.', 'Exclusive — Residence üstünlükləri.'],
  menziller: [
    { label: '2 Otaqlı', price: '438.141 ₼', area: '78.1–107.8 m²' },
    { label: '3 Otaqlı', price: '532.032 ₼', area: '96.1–147.6 m²' },
    { label: '4 Otaqlı', price: '727.650 ₼', area: '132.3–147 m²' },
  ],
  yerlesme: 'Bulvar kənarı mənzil. Dənizkənarı bulvardan bir neçə dəqiqəlik məsafə.',
  payments: ['Nəğd — 60 aylıq faizsiz daxili kredit.', 'İpoteka — 20 ilədək, 20% ilkin, 9-12% faiz.', 'Hissə-hissə — 50% ilkin, 36 ay faizsiz, 2% endirim.', 'Şərtlər — 60% ilkin, 24 ay faizsiz, 1 il sonra ödəmə.'],
  investment: 'Yüksək gəlir · Mərkəzi məkan · Keyfiyyət zəmanəti · Rahat yaşayış · Dəyər artımı',
  contact: 'Qarabagh Horses Square Residences — VEB SAYT · E-POÇT · TELEFON',
};

function useInViewOnce(amount = 0.08) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount });
  return { ref, inView };
}

/** Theme 3: Minimal, mono, dark, full-width hero, single column / asymmetric. */
export function Theme3View() {
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const about = useInViewOnce();
  const lifestyle = useInViewOnce();
  const menziller = useInViewOnce();
  const location = useInViewOnce();
  const payment = useInViewOnce();

  return (
    <div className="theme-3-content">
      <section ref={heroRef} id="hero" className="relative flex min-h-[90vh] flex-col justify-end px-6 pb-24 pt-32 md:px-12 md:pb-32">
        <div className="mx-auto w-full max-w-4xl">
          <motion.p
            className="font-theme3 text-[10px] uppercase tracking-[0.4em] text-white/50"
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
          >
            Ağ Şəhər
          </motion.p>
          <motion.h1
            id="hero-heading"
            className="mt-2 font-theme3 text-4xl font-medium tracking-tight text-white md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            {PDF.hero.title}
          </motion.h1>
          <motion.p
            className="mt-4 font-theme3 text-sm uppercase tracking-widest text-white/70"
            initial={{ opacity: 0, y: 12 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.16 }}
          >
            {PDF.hero.line}
          </motion.p>
          <motion.div className="mt-14 flex gap-6" initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}>
            <Link href="#menziller" className="font-theme3 text-xs uppercase tracking-wider text-white underline underline-offset-4 hover:text-white/80">
              Mənzillər
            </Link>
            <Link href="#elaqe-form" className="font-theme3 text-xs uppercase tracking-wider text-white/70 hover:text-white">
              Əlaqə
            </Link>
          </motion.div>
        </div>
      </section>

      <section ref={about.ref} id="haqqimizda" className="border-t border-white/10 px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-3xl">
          <motion.h2 className="font-theme3 text-xs uppercase tracking-[0.3em] text-white/50" initial={{ opacity: 0 }} animate={about.inView ? { opacity: 1 } : {}}>
            Haqqımızda
          </motion.h2>
          <motion.p
            className="mt-6 text-lg leading-relaxed text-white/90"
            initial={{ opacity: 0, y: 8 }}
            animate={about.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.06 }}
          >
            {PDF.about}
          </motion.p>
          <motion.div className="mt-12" initial={{ opacity: 0 }} animate={about.inView ? { opacity: 1 } : {}} transition={{ delay: 0.12 }}>
            <ImagePlaceholder src="/photos/about-intro.png" alt="Haqqımızda" width={1200} height={800} className="rounded-lg border border-white/10" />
          </motion.div>
        </div>
      </section>

      <section ref={lifestyle.ref} id="yasam-terzi" className="border-t border-white/10 px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-5xl">
          <motion.h2 className="font-theme3 text-xs uppercase tracking-[0.3em] text-white/50" initial={{ opacity: 0 }} animate={lifestyle.inView ? { opacity: 1 } : {}}>
            Yaşam Tərzi
          </motion.h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {PDF.lifestyle.map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={lifestyle.inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.08 * i }}
                className="border-l-2 border-white/20 pl-6"
              >
                <p className="font-theme3 text-sm text-white/90">{text}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <motion.div initial={{ opacity: 0 }} animate={lifestyle.inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>
              <ImagePlaceholder src="/photos/lifestyle-premium.png" alt="Premium" width={800} height={600} className="rounded-lg border border-white/10" />
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={lifestyle.inView ? { opacity: 1 } : {}} transition={{ delay: 0.25 }}>
              <ImagePlaceholder src="/photos/lifestyle-panoramic.png" alt="Panoramic" width={800} height={600} className="rounded-lg border border-white/10" />
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={lifestyle.inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}>
              <ImagePlaceholder src="/photos/lifestyle-exclusive.png" alt="Exclusive" width={800} height={600} className="rounded-lg border border-white/10" />
            </motion.div>
          </div>
        </div>
      </section>

      <section ref={menziller.ref} id="menziller" className="border-t border-white/10 px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-5xl">
          <motion.h2 className="font-theme3 text-xs uppercase tracking-[0.3em] text-white/50" initial={{ opacity: 0 }} animate={menziller.inView ? { opacity: 1 } : {}}>
            Mənzil Seçimləri
          </motion.h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {PDF.menziller.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                animate={menziller.inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * i }}
              >
                <ImagePlaceholder src={item.label === '2 Otaqlı' ? '/photos/menzil-2otaqli.png' : item.label === '3 Otaqlı' ? '/photos/menzil-3otaqli.png' : '/photos/menzil-4otaqli.png'} alt={item.label} width={600} height={400} className="rounded-lg border border-white/10" />
                <p className="mt-4 font-theme3 text-xs uppercase tracking-wider text-white/60">{item.label}</p>
                <p className="mt-1 font-theme3 text-xl text-white">{item.price} dən</p>
                <p className="mt-0.5 font-theme3 text-xs text-white/50">{item.area}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section ref={location.ref} id="yerlesme" className="border-t border-white/10 px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-4xl">
          <motion.h2 className="font-theme3 text-xs uppercase tracking-[0.3em] text-white/50" initial={{ opacity: 0 }} animate={location.inView ? { opacity: 1 } : {}}>
            Yerləşmə
          </motion.h2>
          <motion.p className="mt-6 text-white/90" initial={{ opacity: 0 }} animate={location.inView ? { opacity: 1 } : {}} transition={{ delay: 0.06 }}>
            {PDF.yerlesme}
          </motion.p>
          <motion.div className="mt-8" initial={{ opacity: 0 }} animate={location.inView ? { opacity: 1 } : {}} transition={{ delay: 0.1 }}>
            <ImagePlaceholder src="/photos/yerlesme-bulvar.png" alt="Yerləşmə" width={1200} height={600} className="rounded-lg border border-white/10" />
          </motion.div>
        </div>
      </section>

      <section ref={payment.ref} id="odenis" className="border-t border-white/10 px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-2xl">
          <motion.h2 className="font-theme3 text-xs uppercase tracking-[0.3em] text-white/50" initial={{ opacity: 0 }} animate={payment.inView ? { opacity: 1 } : {}}>
            Ödəniş Seçimləri
          </motion.h2>
          <ul className="mt-8 space-y-4">
            {PDF.payments.map((text, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={payment.inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.05 * i }}
                className="font-theme3 text-sm text-white/80"
              >
                {text}
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section id="investisiya" className="border-t border-white/10 px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-theme3 text-xs uppercase tracking-[0.3em] text-white/50">Investisiya üstünlükləri</h2>
          <p className="mt-6 font-theme3 text-sm leading-relaxed text-white/80">{PDF.investment}</p>
        </div>
      </section>

      <section id="elaqe-form" className="border-t border-white/10 px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-theme3 text-sm uppercase tracking-widest text-white/90">{PDF.contact}</h2>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto max-w-4xl flex flex-col items-center gap-2">
          <p className="font-theme3 text-xs uppercase tracking-[0.2em] text-white/60">Qarabagh Horses Square</p>
          <p className="font-theme3 text-[10px] uppercase tracking-widest text-white/40">Ağ Şəhər · Premium Rezidenslər</p>
          <p className="mt-4 font-theme3 text-[10px] text-white/30">© {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
