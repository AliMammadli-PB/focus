'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ScrollLetters } from './scroll-letters';

// Şəkillər public/photos-dan və ya placeholder — öz şəkillərinizi əlavə edin
const GALLERY_IMAGES = [
  { src: '/photos/adobe-1otaqli.png', alt: '1 otaqlı plan' },
  { src: '/photos/adobe-2otaqli.png', alt: '2 otaqlı plan' },
  { src: '/photos/adobe-3otaqli.png', alt: '3 otaqlı plan' },
  { src: '/photos/adobe-1otaqli.png', alt: 'Rezidens görünüş' },
  { src: '/photos/adobe-2otaqli.png', alt: 'Smart mənzil' },
  { src: '/photos/adobe-3otaqli.png', alt: 'Yaşayış məkanı' },
];

export function GallerySection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      id="qalereya"
      className="relative px-6 py-24 md:py-32"
      aria-labelledby="gallery-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          id="gallery-heading"
          className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <ScrollLetters text="Qalereya" />
        </motion.h2>
        <motion.p
          className="mt-3 text-white/70"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.08 }}
        >
          Mənzil planları və layihə görünüşləri.
        </motion.p>
        <motion.div
          className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.12 }}
        >
          {GALLERY_IMAGES.map((img, i) => (
            <motion.button
              key={i}
              type="button"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.05 * i }}
              onClick={() => setSelected(i)}
              className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-white/5 transition hover:border-white/20"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
            </motion.button>
          ))}
        </motion.div>
        {selected !== null && (
          <div
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 p-4"
            onClick={() => setSelected(null)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Escape' && setSelected(null)}
            aria-label="Bağla"
          >
            <div className="relative max-h-[90vh] max-w-4xl" onClick={(e) => e.stopPropagation()}>
              <Image
                src={GALLERY_IMAGES[selected].src}
                alt={GALLERY_IMAGES[selected].alt}
                width={800}
                height={600}
                className="max-h-[90vh] w-auto object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
