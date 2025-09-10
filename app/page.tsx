// app/page.tsx
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import SolutionsResultsLite from '@/components/SolutionsResultsLite';
import Testimonials from '@/components/Testimonials';
import AboutImpactCard from '@/components/AboutImpactCard';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <>
      {/* 1) Hero */}
      <Hero />

      {/* 2) Services / How we help */}
      <Services />

      {/* 3) Results (Solutions & Results) */}
      <SolutionsResultsLite />

      {/* 4) Testimonials */}
      <Testimonials />

      {/* 5) About & Track Record (flip card as-is) */}
      <AboutImpactCard />

      {/* 6) Contact */}
      <Contact />

      {/* 7) Footer */}
      <Footer />
    </>
  );
}
