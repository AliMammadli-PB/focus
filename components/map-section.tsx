'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export function MapSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      id="xerite"
      className="relative px-6 py-24 md:py-32"
      aria-labelledby="map-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-10 text-center"
        >
          <h2
            id="map-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Harada yerləşir?
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            Qarabağ Atları Meydanı · Ağ Şəhər — City Park Mall yaxınlığında
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="overflow-hidden rounded-3xl border border-white/10 shadow-glow"
        >
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=49.883%2C40.382%2C49.898%2C40.392&layer=mapnik&marker=40.38755%2C49.8906"
            title="Qarabağ Atları Meydanı Ağ Şəhər xəritə"
            className="h-[360px] w-full border-0"
            loading="lazy"
          />
          <a
            href="https://mapcarta.com/W1064645037"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-medium text-violet-400 transition hover:text-violet-300"
          >
            Xəritədə aç · Mapcarta
          </a>
        </motion.div>
      </div>
    </section>
  );
}
