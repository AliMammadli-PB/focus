'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ScrollLetters } from './scroll-letters';

const REVIEWS = [
  {
    name: 'Elnur Məmmədov',
    gender: 'male' as const,
    quote:
      'Smart sistemlər və təhlükəsizlik səviyyəsi fikrimizi dəyişdi. Bu binada mənzil almaq qərarına gəldik.',
    block: '2 otaqlı, B blok',
  },
  {
    name: 'Aynur Həsənova',
    gender: 'female' as const,
    quote:
      'Ailə üçün təhlükəsiz və rahat mühit axtarırdıq. Bu rezidensda həm qiymət, həm də keyfiyyət uyğundur.',
    block: '3 otaqlı, A blok',
  },
  {
    name: 'Rəşad Quliyev',
    gender: 'male' as const,
    quote:
      'İşə yaxınlıq və infrastruktur mənim üçün vacib idi. Burada hər şey düşündüyüm kimi çıxdı.',
    block: '1 otaqlı, C blok',
  },
  {
    name: 'Sevinc Əliyeva',
    gender: 'female' as const,
    quote:
      'Dizayn və təchizat çox bəyəndim. Girişdə təhlükəsizlik və park yerləri əlavə üstünlükdür.',
    block: '4 otaqlı, B blok',
  },
  {
    name: 'Tural Cəfərov',
    gender: 'male' as const,
    quote:
      'Yeni bina, smart sistemlər və səssiz mühit — mənzil almaq üçün əsas səbəblərim oldu.',
    block: '2 otaqlı, A blok',
  },
  {
    name: 'Leyla Rzayeva',
    gender: 'female' as const,
    quote:
      'Uşaqlarla yaşayış üçün axtarırdıq. Bu binada uşaq meydançaları və təhlükəsizlik var.',
    block: '3 otaqlı, C blok',
  },
  {
    name: 'Kənan İsmayılov',
    gender: 'male' as const,
    quote:
      'Ofisə yaxın mənzil lazım idi. Qiymət-keyfiyyət nisbəti və ödəniş şərtləri məni razı saldı.',
    block: '1 otaqlı, B blok',
  },
  {
    name: 'Günay Məmmədova',
    gender: 'female' as const,
    quote:
      'İlk baxışda bəyəndim. Layihəni gəzəndə mənzillərin işıqlı və planlaşdırılmış olması fərq edilir.',
    block: '2 otaqlı, C blok',
  },
  {
    name: 'Orxan Əliyev',
    gender: 'male' as const,
    quote:
      'Təmir keyfiyyəti və materiallar yüksək səviyyədədir. Gələcək evim üçün bu layihəni seçdim.',
    block: '4 otaqlı, A blok',
  },
  {
    name: 'Nərmin Hüseynova',
    gender: 'female' as const,
    quote:
      'Ətraf mühit və yaşıl sahələr bizim ailə üçün vacib idi. Burada həm rahatlıq, həm də təbiət var.',
    block: '3 otaqlı, B blok',
  },
];

function getAvatarUrl(name: string, gender: 'male' | 'female'): string {
  const seed = encodeURIComponent(name.replace(/\s/g, ''));
  return `https://api.dicebear.com/7.x/avataaars/png?seed=${seed}&gender=${gender}&backgroundColor=4b5563,6b7280&size=88`;
}

const ROTATE_INTERVAL_MS = 4000;

export function Quote() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % REVIEWS.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(t);
  }, []);

  const review = REVIEWS[index];

  return (
    <section
      ref={ref}
      id="sitat"
      className="relative px-6 py-24 md:py-32"
      aria-labelledby="quote-heading"
    >
      <div className="mx-auto max-w-3xl">
        <motion.div
          className="rounded-2xl border border-white/10 bg-white/[0.05] py-12 pl-8 pr-8 backdrop-blur-sm md:py-14 md:pl-12 md:pr-12"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="min-h-[180px] md:min-h-[160px]"
            >
              <p className="font-heading text-xl font-medium leading-relaxed text-white md:text-2xl lg:text-[1.75rem] tracking-tight">
                &ldquo;
                <ScrollLetters key={`q-${review.name}`} text={review.quote} />
                &rdquo;
              </p>
              <footer className="mt-8 flex items-center gap-4">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-white/15 bg-white/5">
                  <img
                    src={getAvatarUrl(review.name, review.gender)}
                    alt=""
                    className="h-full w-full object-cover"
                    width={44}
                    height={44}
                  />
                </div>
                <div>
                  <cite className="font-heading not-italic font-semibold text-white">
                    <ScrollLetters key={`n-${review.name}`} text={review.name} />
                  </cite>
                  <p className="mt-0.5 text-sm text-white/55">
                    <ScrollLetters key={`b-${review.name}`} text={`rey bildirib · ${review.block}`} />
                  </p>
                </div>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
          <div className="mt-6 flex justify-center gap-2" aria-hidden>
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  i === index ? 'w-6 bg-amber-400/90' : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Rey ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
