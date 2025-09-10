import Hero from '@/components/Hero';
import AboutImpactCard from '@/components/AboutImpactCard';
import SolutionsResults from '@/components/SolutionsResults';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <>
      <Hero />
      <AboutImpactCard />
      <SolutionsResults />
      <Testimonials />
      <Services />
      <Contact />
      <Footer />
    </>
  );
}
