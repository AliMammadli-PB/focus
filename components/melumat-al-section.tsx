'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ContactForm } from './contact-form';

export function MelumatAlSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      id="melumat-al"
      className="relative px-6 py-16 md:py-20"
      aria-labelledby="melumat-heading"
    >
      <div className="mx-auto max-w-xl">
        <motion.h2
          id="melumat-heading"
          className="font-heading text-xl font-bold text-white sm:text-2xl"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
        >
          Mənzillər haqqında məlumat alın
        </motion.h2>
        <motion.p
          className="mt-2 text-white/70"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.08 }}
        >
          E-poçt və ya telefonunuzu qeyd edin, sizinlə əlaqə saxlayacağıq.
        </motion.p>
        <motion.div
          className="mt-8 rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm"
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.12 }}
        >
          <ContactForm tip="melumat" />
        </motion.div>
      </div>
    </section>
  );
}
