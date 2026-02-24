'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ScrollLetters } from './scroll-letters';
import { ContactForm } from './contact-form';

export function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      id="elaqe-form"
      className="relative px-6 py-24 md:py-32"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-2xl">
        <motion.h2
          id="contact-heading"
          className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <ScrollLetters text="Bizimlə əlaqə" />
        </motion.h2>
        <motion.p
          className="mt-3 text-white/70"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 }}
        >
          Sual və ya müraciətiniz üçün formu doldurun.
        </motion.p>
        <motion.div
          className="mt-10 rounded-2xl border border-white/10 bg-black/40 p-8 backdrop-blur-sm"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
        >
          <ContactForm tip="elaqe" />
        </motion.div>
      </div>
    </section>
  );
}
