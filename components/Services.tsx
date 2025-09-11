import FractionalGtmCard from './services/FractionalGtmCard';
import SystemsAutomationCard from './services/SystemsAutomationCard';

export default function Services() {
  return (
    <section id="services" className="section">
        <h2 className="section-title">Services</h2>
        <p className="section-sub font-medium leading-relaxed text-brand-emerald italic">
          Two ways to engage, endless ways to deliver. Simple hourly pricing + tailored scopes to fit your growth stage.
        </p>
        <div className="mt-8 flex flex-col gap-8">
          <FractionalGtmCard />
          <SystemsAutomationCard />
        </div>
    </section>
  );
}
