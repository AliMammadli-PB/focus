'use client';

import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { LifestyleSection } from '@/components/lifestyle-section';
import { MenzillerSection } from '@/components/menziller-section';
import { LocationSection } from '@/components/location-section';
import { PaymentSection } from '@/components/payment-section';
import { InvestmentSection } from '@/components/investment-section';
import { Features } from '@/components/features';
import { Quote } from '@/components/quote';
import { FAQ } from '@/components/faq';
import { GallerySection } from '@/components/gallery-section';
import { MapSection } from '@/components/map-section';
import { CTA } from '@/components/cta';
import { MelumatAlSection } from '@/components/melumat-al-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';

/** Theme 1: Cinematic dark, video background, current layout. */
export function Theme1View() {
  return (
    <>
      <Hero />
      <About />
      <LifestyleSection />
      <MenzillerSection />
      <LocationSection />
      <PaymentSection />
      <InvestmentSection />
      <Features />
      <Quote />
      <FAQ />
      <GallerySection />
      <MapSection />
      <CTA />
      <MelumatAlSection />
      <ContactSection />
      <Footer />
    </>
  );
}
