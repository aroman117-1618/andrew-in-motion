export type ServiceTag = 'gtm' | 'lifecycle' | 'revops' | 'ai-strategist';

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  service?: ServiceTag;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Analytical and impact-driven. Andrew's reporting and approach influences not just CSMs—leaders learn from him too.",
    name: 'Allie Guertin',
    title: 'Senior Manager, Customer Success',
    service: 'ai-strategist',
  },
  {
    quote: 'Technical acumen + genuine customer care. A culture builder who quickly becomes the go-to resource.',
    name: 'Jina Algarin',
    title: 'Director of Business Operations',
  },
  {
    quote: 'Built a high-trust, high-performing team and broke down information silos with scalable process and enablement.',
    name: 'Omkar Waghe',
    title: 'Customer Success Engineer',
  },
  {
    quote: 'Andrew brought clarity to complex change management—owning handoffs, dashboards, and process templates that raised the bar.',
    name: 'Rahat Rahman',
    title: 'Senior Strategy Manager',
  },
  {
    quote: 'A mentor who creates space to grow. His guidance built confidence and accelerated my development.',
    name: 'Rob Allen Jr',
    title: 'Principal CSM',
  },
  {
    quote: 'He bridges customer needs with operational rigor. The billing workflow improvements boosted productivity across teams.',
    name: 'Natalia Wyatt',
    title: 'Billing Ops Manager',
    service: 'revops',
  },
  {
    quote: 'Proactive and relentlessly improvement-minded. His work reduced unnecessary effort and empowered partner teams.',
    name: 'Junya Kato',
    title: 'Collections Manager',
  },
  {
    quote: 'Significantly improved Sales and CS alignment and collaboration… crucial for closing deals.',
    name: 'RaeAnne English',
    title: 'Sales Ops Manager',
    service: 'gtm',
  },
  {
    quote: 'Andrew combines strategic leadership with hands-on coaching - driving customer engagement, guiding CSMs through challenges, and building scalable enablement that elevates the team.',
    name: 'Lauren Squier',
    title: 'Director of CS',
    service: 'lifecycle',
  },
];

export function getTestimonialForService(service: ServiceTag): Testimonial {
  const match = TESTIMONIALS.find(t => t.service === service);
  if (!match) throw new Error(`No testimonial tagged for service: ${service}`);
  return match;
}
