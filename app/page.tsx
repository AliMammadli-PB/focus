import { Hero } from '@/components/hero';
import { MenzillerSection } from '@/components/menziller-section';
import { About } from '@/components/about';
import { Features } from '@/components/features';
import { Quote } from '@/components/quote';
import { FAQ } from '@/components/faq';
import { GallerySection } from '@/components/gallery-section';
import { MapSection } from '@/components/map-section';
import { CTA } from '@/components/cta';
import { MelumatAlSection } from '@/components/melumat-al-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <>
      <Hero />
      <MenzillerSection />
      <About />
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
