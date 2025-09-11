// app/page.tsx
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import AboutImpactCard from '@/components/AboutImpactCard';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <>
      <Hero />
      <Services />
      <Testimonials />
      <AboutImpactCard />
      <Contact />
      <Footer />
    </>
  );
}
