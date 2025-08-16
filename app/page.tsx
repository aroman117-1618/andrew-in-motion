import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Impact from '../components/Impact';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <section id="about" className="pt-24 sm:pt-32">
        <About />
      </section>
      <section id="services" className="pt-24 sm:pt-32">
        <Services />
      </section>
      <section id="impact" className="pt-24 sm:pt-32">
        <Impact />
      </section>
      <section id="testimonials" className="pt-24 sm:pt-32">
        <Testimonials />
      </section>
      <section id="contact" className="pt-24 sm:pt-32 pb-32">
        <CTA />
      </section>
    </>
  );
}