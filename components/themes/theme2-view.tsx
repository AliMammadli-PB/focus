'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ImagePlaceholder } from '@/components/image-placeholder';

const PDF = {
  hero: {
    title: 'Qarabagh Horses Square',
    subtitle: 'Xoş Gəlmisiniz! Ağ Şəhərin mərkəzində bir memarlıq incisi.',
    desc: 'Qarabagh Horses Square, müasir dizayn və mədəni irsin ahəngdə olduğu bir memarlıq incisi. Təbii daş detallarının istifadəsi ilə geniş açıq məkanlar yaradır, göy üzünə açılan hissiyat ilə sakinlərə rahatlıq gətirir. Burada həyat, təbiətlə iç-içə, zərif və dəbdəbəli bir atmosferdə keçir.',
  },
  lifestyle: [
    { title: 'Premium', subtitle: 'Experience luxury living in a tranquil environment. Enjoy breathtaking views of the surrounding nature.' },
    { title: 'Panoramic', subtitle: 'Access to top-notch amenities for residents\' comfort.' },
    { title: 'Exclusive', subtitle: 'Qarabagh Horses Square Residence-də yaşamağın üstünlükləri.' },
  ],
  menziller: [
    { label: '2 Otaqlı', price: '438.141 ₼', area: '78.1–107.8 m²', desc: '5005 azn-dən başlayan qiymətlərlə', img: '/photos/menzil-2otaqli.png' },
    { label: '3-otaqlı', price: '532.032 ₼', area: '96.1–147.6 m²', desc: '4 950 azn-dən başlayan qiymətlərlə', img: '/photos/menzil-3otaqli.png' },
    { label: '4-otaqlı', price: '727.650 ₼', area: '132.3–147 m²', desc: '4 950 azn-dən başlayan qiymətlərlə', img: '/photos/menzil-4otaqli.png' },
  ],
  yerlesme: 'Bulvar kənarı mənzil. Dənizkənarı bulvardan bir neçə dəqiqəlik məsafə.',
  payments: [
    { title: 'Nəğd ödəniş', desc: 'Mansardda yerləşən mənzilləri 60 aylıq faizsiz daxili kreditlə əldə etmək mümkündür.' },
    { title: 'İpoteka', desc: 'Bank vasitəsilə 20 ilədək 20% ilkin ödəniş etməklə 9-12% illik faizlə ipotekanın rəsmiləşdirilməsi mümkündür.' },
    { title: 'Hissə-hissə', desc: '50% ilkin ödəniş və qalan məbləğ daxili kreditlə 36 aylıq faizsiz bərabər hissəyə bölünür. 2% endirim tətbiq olunur.' },
    { title: 'Şərtlər', desc: '60% ilkin ödəniş olunursa, 24 ay faizsiz ödəmə ilə 1 il sonra ödəməyə başlayırsınız.' },
  ],
  investment: [
    'Yüksək gəlir — Şəhərin mərkəzində əlçatan mövqedə yerləşən Residence yüksək gəlirlə kirayə üçün ideal seçimdir.',
    'Mərkəzi məkan — Ağ Şəhər gələcəyin aktiv həyat tərzinin ünvanı və yeni şəhər mərkəzidir.',
    'Keyfiyyət zəmanəti — Bütün materiallar və tikinti həlləri yüksək keyfiyyət və təhlükəsizlik standartlarına uyğundur.',
    'Rahat yaşayış — Rahat həyat, komfortlu evlər – Qarabagh Horses Square-də sizi gözləyir.',
    'Dəyər artımı — Dənizkənarı bulvara yaxın məsafədə mənzil yüksək likvidliyə malikdir.',
  ],
  contact: 'Qarabagh Horses Square Residences ilə əlaqə saxlayın. VEB SAYT · E-POÇT · TELEFON',
};

function useInViewOnce(amount = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount });
  return { ref, inView };
}

/** Theme 2: Light, serif, centered header, bento-style sections, stone/amber. */
export function Theme2View() {
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const about = useInViewOnce();
  const lifestyle = useInViewOnce();
  const menziller = useInViewOnce();
  const location = useInViewOnce();
  const payment = useInViewOnce();
  const investment = useInViewOnce();

  return (
    <div className="theme-2-content text-stone-800">
      <section ref={heroRef} id="hero" className="relative min-h-[85vh] pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.p
            className="font-theme2 text-sm uppercase tracking-[0.3em] text-amber-700"
            initial={{ opacity: 0, y: 10 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            {PDF.hero.subtitle}
          </motion.p>
          <motion.h1
            id="hero-heading"
            className="mt-4 font-theme2 text-4xl font-semibold tracking-wide text-stone-900 md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {PDF.hero.title}
          </motion.h1>
          <motion.p
            className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-stone-600"
            initial={{ opacity: 0, y: 12 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {PDF.hero.desc}
          </motion.p>
          <motion.div
            className="mt-12 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.35 }}
          >
            <Link href="#menziller" className="rounded-full bg-stone-900 px-8 py-3.5 text-sm font-medium text-white hover:bg-stone-800">
              Mənzil seçimləri
            </Link>
            <Link href="#elaqe-form" className="rounded-full border border-stone-300 bg-white px-8 py-3.5 text-sm font-medium text-stone-700 hover:bg-stone-50">
              Əlaqə
            </Link>
          </motion.div>
        </div>
      </section>

      <section ref={about.ref} id="haqqimizda" className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            className="font-theme2 text-3xl font-semibold text-stone-900 md:text-4xl"
            initial={{ opacity: 0, y: 12 }}
            animate={about.inView ? { opacity: 1, y: 0 } : {}}
          >
            Qarabagh Horses Square
          </motion.h2>
          <div className="mt-12 grid gap-12 md:grid-cols-2 md:items-start">
            <motion.p
              className="text-lg leading-relaxed text-stone-600"
              initial={{ opacity: 0, x: -12 }}
              animate={about.inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.08 }}
            >
              {PDF.hero.desc}
            </motion.p>
            <motion.div initial={{ opacity: 0, x: 12 }} animate={about.inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.12 }}>
              <ImagePlaceholder src="/photos/about-intro.png" alt="Haqqımızda" width={1200} height={800} className="rounded-2xl border border-stone-200 shadow-lg" />
            </motion.div>
          </div>
        </div>
      </section>

      <section ref={lifestyle.ref} id="yasam-terzi" className="bg-stone-100/80 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.h2 className="font-theme2 text-3xl font-semibold text-stone-900 md:text-4xl" initial={{ opacity: 0 }} animate={lifestyle.inView ? { opacity: 1 } : {}}>
            Yaşam Tərzi
          </motion.h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {PDF.lifestyle.map((card, i) => (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={lifestyle.inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.08 * i }}
                className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
              >
                <ImagePlaceholder
                  src={card.title === 'Premium' ? '/photos/lifestyle-premium.png' : card.title === 'Panoramic' ? '/photos/lifestyle-panoramic.png' : '/photos/lifestyle-exclusive.png'}
                  alt={card.title}
                  width={800}
                  height={600}
                  className="rounded-t-2xl border-0"
                />
                <div className="p-6">
                  <h3 className="font-theme2 text-xl font-semibold text-stone-900">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{card.subtitle}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section ref={menziller.ref} id="menziller" className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.h2 className="font-theme2 text-3xl font-semibold text-stone-900 md:text-4xl" initial={{ opacity: 0 }} animate={menziller.inView ? { opacity: 1 } : {}}>
            Mənzil Seçimləri
          </motion.h2>
          <motion.p className="mt-3 text-stone-600" initial={{ opacity: 0 }} animate={menziller.inView ? { opacity: 1 } : {}} transition={{ delay: 0.05 }}>
            Qarabagh Horses Square Residence-də yaşamağın üstünlükləri
          </motion.p>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {PDF.menziller.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={menziller.inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * i }}
              >
                <Link href="#menziller" className="block overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:shadow-md">
                  <ImagePlaceholder src={item.img} alt={item.label} width={600} height={400} className="rounded-t-2xl border-0" />
                  <div className="p-6">
                    <span className="text-sm font-medium uppercase tracking-wider text-amber-700">{item.label}</span>
                    <p className="mt-3 font-theme2 text-2xl font-semibold text-stone-900">{item.price} dən</p>
                    <p className="mt-1 text-sm text-stone-500">*Təklif olunan sahə {item.area}</p>
                    <p className="mt-3 text-sm text-stone-600">{item.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section ref={location.ref} id="yerlesme" className="bg-amber-50/60 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.h2 className="font-theme2 text-3xl font-semibold text-stone-900 md:text-4xl" initial={{ opacity: 0 }} animate={location.inView ? { opacity: 1 } : {}}>
            Yerləşmə
          </motion.h2>
          <div className="mt-10 grid gap-10 md:grid-cols-2 md:items-center">
            <motion.p className="text-lg leading-relaxed text-stone-600" initial={{ opacity: 0 }} animate={location.inView ? { opacity: 1 } : {}} transition={{ delay: 0.08 }}>
              {PDF.yerlesme}
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={location.inView ? { opacity: 1 } : {}} transition={{ delay: 0.12 }}>
              <ImagePlaceholder src="/photos/yerlesme-bulvar.png" alt="Yerləşmə" width={1200} height={600} className="rounded-2xl border border-stone-200 shadow" />
            </motion.div>
          </div>
        </div>
      </section>

      <section ref={payment.ref} id="odenis" className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.h2 className="font-theme2 text-3xl font-semibold text-stone-900 md:text-4xl" initial={{ opacity: 0 }} animate={payment.inView ? { opacity: 1 } : {}}>
            Qarabagh Horses Square — Ödəniş Seçimləri
          </motion.h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {PDF.payments.map((item, i) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                animate={payment.inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.06 * i }}
                className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm"
              >
                <h3 className="font-theme2 text-lg font-semibold text-stone-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{item.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section ref={investment.ref} id="investisiya" className="bg-stone-900 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <motion.h2 className="font-serif text-3xl font-semibold text-white md:text-4xl" initial={{ opacity: 0 }} animate={investment.inView ? { opacity: 1 } : {}}>
            Daşınmaz əmlaka investisiya üstünlükləri
          </motion.h2>
          <ul className="mt-10 space-y-6">
            {PDF.investment.map((text, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={investment.inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.06 * i }}
                className="text-stone-300"
              >
                {text}
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section id="elaqe-form" className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-2xl font-semibold text-stone-900 sm:text-3xl">{PDF.contact}</h2>
          <p className="mt-4 text-stone-600">VEB SAYT · E-POÇT · TELEFON</p>
        </div>
      </section>

      <footer className="border-t border-stone-200 bg-stone-50 px-6 py-12 text-center">
        <p className="font-theme2 font-semibold text-stone-900">Qarabagh Horses Square</p>
        <p className="mt-1 text-sm text-stone-500">Ağ Şəhər · Premium Rezidenslər</p>
        <p className="mt-6 text-xs text-stone-400">© {new Date().getFullYear()} Qarabagh Horses Square</p>
      </footer>
    </div>
  );
}
