'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

export function ImageText() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 0.4], [24, -16]);
  const scale = useTransform(scrollYProgress, [0, 0.35], [0.97, 1]);

  return (
    <section ref={ref} className="relative px-6 py-28 md:py-36" aria-labelledby="preview-heading">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-20 md:grid-cols-2 md:items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2
              id="preview-heading"
              className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl"
            >
              Gösteriş videosu
            </h2>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-text-muted">
              Qarabağ Atları Meydanı · Ağ Şəhər. Smart mənzillər və tam təhlükəsizlik ilə
              yaşayış — bu binada mənzil almaq fərq budur.
            </p>
          </motion.div>
          <motion.div
            style={{ y, scale }}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-glass backdrop-blur-card"
          >
            <div className="aspect-video w-full">
              <video
                className="h-full w-full object-cover"
                src="/videos/qarabag%20atlar%20meydani.mp4"
                playsInline
                muted
                loop
                autoPlay
                preload="metadata"
                aria-label="Qarabağ Atları Meydanı gösteriş videosu"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
