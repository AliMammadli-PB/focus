'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ScrollLetters } from './scroll-letters';
import { ImagePlaceholder } from './image-placeholder';

export function LocationSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      id="yerlesme"
      className="relative px-6 py-24 md:py-32"
      aria-labelledby="location-heading"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="location-heading"
          className="font-heading mb-12 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
        >
          <ScrollLetters text="Yerləşmə" />
        </h2>
        <div className="grid gap-14 md:grid-cols-2 md:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-heading text-xl font-semibold text-white md:text-2xl">
              Bulvar kənarı mənzil
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-white">
              Dənizkənarı bulvardan bir neçə dəqiqəlik məsafə
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <ImagePlaceholder
              src="/photos/yerlesme-bulvar.png"
              alt="Yerləşmə — bulvar"
              width={1200}
              height={600}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
