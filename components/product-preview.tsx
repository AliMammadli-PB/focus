'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

export function ProductPreview() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 0.5], [40, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 1]);

  return (
    <section
      ref={ref}
      id="haqqimizda"
      className="relative px-6 py-24 md:py-32"
      aria-labelledby="product-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2
            id="product-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Gösteriş videosu
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            Qarabağ Atları Meydanı · Ağ Şəhər
          </p>
        </motion.div>

        <motion.div
          style={{ y, opacity }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-base-card/50 shadow-glow backdrop-blur-xl"
        >
          <div className="aspect-video w-full bg-black/40">
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
          <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/5" />
        </motion.div>
      </div>
    </section>
  );
}
