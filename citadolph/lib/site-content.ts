/**
 * Site Content Data
 * Centralized content for easy maintenance and localization
 */

export const siteConfig = {
  name: 'Citadolph',
  tagline: 'Digital Transformation Agency for Africa',
  description: 'Your premier digital partner. We build websites, apps, ERPs, branding, and AI solutions — backed by a network of specialist agencies across Africa.',
  url: 'https://citadolph.com',
  ogImage: '/images/logo_full_black.svg',

  company: {
    name: 'Citi Adolph',
    registeredIn: 'Delaware',
    operatingIn: 'Africa',
    phone: 'US Number Available',
    address: 'Delaware, USA',
    emails: {
      general: 'hello@citadolph.com',
      legal: 'legal@citadolph.com',
      hr: 'hr@citadolph.com',
      finance: 'finance@citadolph.com',
      partnerships: 'partner@citadolph.com',
      marketing: 'marketing@citadolph.com',
      noreply: 'noreply@citadolph.com',
    },
    social: {
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com',
      x: 'https://x.com',
      instagram: 'https://instagram.com',
    },
  },

  compliance: [
    'ISO 27001 Ready',
    'SOC 2 Compliant',
    'GDPR Compliant',
    'European Privacy Act Compliant',
  ],
} as const;

export const navigation = {
  main: [
    { href: '#services', label: 'Services' },
    { href: '#process', label: 'Process' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ],
  cta: { href: '#contact', label: 'Start a Project' },
} as const;

export const services = [
  {
    id: 'personal-branding',
    title: 'Personal Branding',
    description: 'Build a powerful personal brand that resonates with your audience and establishes authority in your field.',
  },
  {
    id: 'website-development',
    title: 'Website Development',
    description: 'Custom websites built with modern technologies, optimized for performance, accessibility, and conversion.',
  },
  {
    id: 'mobile-app-development',
    title: 'Mobile Application Development',
    description: 'Native and cross-platform mobile apps that deliver exceptional user experiences on iOS and Android.',
  },
  {
    id: 'erp-implementation',
    title: 'ERP Implementation',
    description: 'Enterprise resource planning systems tailored to streamline your operations and drive efficiency.',
  },
  {
    id: 'digital-consultancy',
    title: 'Digital Consultancy',
    description: 'Strategic guidance to navigate digital transformation and maximize your technology investments.',
  },
  {
    id: 'business-registration',
    title: 'Business Registration Services',
    description: 'End-to-end company formation and compliance services across African jurisdictions.',
  },
  {
    id: 'design-services',
    title: 'Design Services',
    description: 'Brand identity, UI/UX design, and visual systems crafted with Swiss precision and purpose.',
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Services',
    description: 'Data-driven marketing strategies that grow your audience and drive measurable results.',
  },
  {
    id: 'social-media-marketing',
    title: 'Social Media Marketing',
    description: 'Content strategy and community management that builds engagement and brand loyalty.',
  },
  {
    id: 'management-systems',
    title: 'Management Systems',
    description: 'Custom management systems that bring clarity, control, and scalability to your operations.',
  },
  {
    id: 'ai-implementation',
    title: 'AI Implementation Strategies',
    description: 'Practical AI integration that solves real business problems, not hype-driven experiments.',
  },
  {
    id: 'accounting-auditing',
    title: 'Accounting & Auditing',
    description: 'Professional financial services ensuring compliance, accuracy, and strategic insight.',
  },
] as const;

export const processSteps = [
  {
    number: '01',
    title: 'Discover',
    description: 'We understand your problem for free. Deep dive into your business, challenges, and vision.',
    visual: 'Workflow Visualization',
  },
  {
    number: '02',
    title: 'Brief',
    description: 'Project brief crafted with clear scope, timeline, and success metrics for your validation.',
    visual: 'Deliverable Preview',
  },
  {
    number: '03',
    title: 'Propose',
    description: 'Detailed proposal with activities, costs, team composition, and value projection.',
    visual: 'Workflow Visualization',
  },
  {
    number: '04',
    title: 'Build',
    description: 'Dedicated team assembled. Plan, design, implement, test, and maintain with real-time tracking.',
    visual: 'Deliverable Preview',
  },
  {
    number: '05',
    title: 'Scale',
    description: 'Ongoing maintenance, optimization, and new initiatives as your business grows.',
    visual: 'Workflow Visualization',
  },
] as const;

export const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '30+', label: 'Specialist Partners' },
  { value: '12', label: 'Service Domains' },
  { value: '15+', label: 'African Countries' },
] as const;

export const networkFeatures = [
  'Dedicated digital concierge — your single point of contact',
  'Specialist agencies for each domain (design, dev, marketing, finance)',
  'Independent contractors vetted through project delivery',
  'HRIS & payroll management for all partners',
  'Financial dashboard tracking all project economics',
  'Pathway from contractor to full-time for top performers',
] as const;

export const clientTypes = [
  'Government Agencies',
  'Startups',
  'Established Businesses',
  'Personal Brands',
  'Visionaries',
] as const;

export const contactInfo = [
  { label: 'Email', value: 'hello@citadolph.com', href: 'mailto:hello@citadolph.com' },
  { label: 'Legal', value: 'legal@citadolph.com', href: 'mailto:legal@citadolph.com' },
  { label: 'HR', value: 'hr@citadolph.com', href: 'mailto:hr@citadolph.com' },
  { label: 'Finance', value: 'finance@citadolph.com', href: 'mailto:finance@citadolph.com' },
  { label: 'Partnerships', value: 'partner@citadolph.com', href: 'mailto:partner@citadolph.com' },
  { label: 'Marketing', value: 'marketing@citadolph.com', href: 'mailto:marketing@citadolph.com' },
  { label: 'Phone', value: 'US Number Available', href: 'tel:+1xxxxxxxxxx' },
  { label: 'Location', value: 'Delaware, USA / Operating in Africa', href: null },
] as const;

export const footerLinks = {
  quick: [
    { href: '#services', label: 'Services' },
    { href: '#process', label: 'Our Process' },
    { href: '#about', label: 'About Us' },
    { href: '#contact', label: 'Contact' },
  ],
  legal: [
    { href: '#', label: 'Privacy Policy (GDPR)' },
    { href: '#', label: 'Terms of Service' },
    { href: '#', label: 'Cookie Policy' },
    { href: '#', label: 'ISO 27001 / SOC 2' },
  ],
} as const;