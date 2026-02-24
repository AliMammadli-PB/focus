'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ScrollLetters } from './scroll-letters';

// Ağ Şəhər təxmini — Google Maps-də "Qarabağ Atları Meydanı Ağ Şəhər" axtarılır
export function MapSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      id="xerite"
      className="relative px-6 py-24 md:py-32"
      aria-labelledby="map-heading"
    >
      <div className="mx-auto max-w-5xl">
        <motion.h2
          id="map-heading"
          className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <ScrollLetters text="Ünvan və xəritə" />
        </motion.h2>
        <motion.p
          className="mt-3 text-white/70"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.08 }}
        >
          Qarabağ Atları Meydanı · Ağ Şəhər
        </motion.p>
        <motion.div
          className="mt-10 overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194348.847!2d47.0!3d40.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDI0JzAwLjAiTiA0N8KwMDAnMDAuMCJF!5e0!3m2!1sen!2saz!4v1"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Qarabağ Atları Meydanı xəritə"
            className="min-h-[300px] w-full"
          />
        </motion.div>
        <motion.p
          className="mt-4 text-center text-sm text-white/55"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.25 }}
        >
          <a
            href="https://www.google.com/maps/search/Qaraba%C4%9F+Atlar%C4%B1+Meydan%C4%B1+A%C4%9F+%C5%9E%C9%99h%C9%99r"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400/90 underline hover:text-amber-300"
          >
            Google Maps-də aç
          </a>
        </motion.p>
      </div>
    </section>
  );
}
