/**
 * Site Content Data
 * Centralized content for easy maintenance and localization
 */

export interface NavItem {
  href: string;
  label: string;
  megaMenu?: string;
}

export interface MegaMenuItem {
  label: string;
  href: string;
  description: string;
}

export interface MegaMenuColumn {
  heading: string;
  items: readonly MegaMenuItem[];
  defaultExpanded?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface MegaMenuData {
  title: string;
  columns: readonly MegaMenuColumn[];
  cta: { label: string; href: string };
  secondaryCta?: { label: string; href: string; variant: 'outline' | 'primary' | 'ghost' };
}

export interface AuthLink {
  label: string;
  href: string;
  variant: 'ghost' | 'primary' | 'outline';
  action?: 'signout';
}

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
    { href: '#', label: 'What We Do', megaMenu: 'what-we-do' },
    { href: '#', label: 'What We Think', megaMenu: 'what-we-think' },
    { href: '#about', label: 'Who We Are' },
    { href: '#', label: 'Career', megaMenu: 'career' },
    { href: '#contact', label: 'Contact Us' },
  ] as const satisfies readonly NavItem[],
  cta: { href: '#contact', label: 'Start a Project' },
} as const;

import { Briefcase, Lightbulb, Users, GraduationCap, Building2, Heart, MapPin, Clock } from 'lucide-react';

export const megaMenus = {
  'what-we-do': {
    title: 'What We Do',
    columns: [
      {
        heading: 'Digital Products',
        defaultExpanded: true,
        icon: Briefcase,
        items: [
          { label: 'Website Development', href: '#' },
          { label: 'Mobile Applications', href: '#' },
          { label: 'ERP Implementation', href: '#' },
          { label: 'Management Systems', href: '#' },
        ],
      },
      {
        heading: 'Brand & Strategy',
        icon: Lightbulb,
        items: [
          { label: 'Personal Branding', href: '#' },
          { label: 'Design Services', href: '#' },
          { label: 'Digital Consultancy', href: '#' },
          { label: 'Business Registration', href: '#' },
        ],
      },
      {
        heading: 'Growth & Intelligence',
        icon: Users,
        items: [
          { label: 'Digital Marketing', href: '#' },
          { label: 'Social Media Marketing', href: '#' },
          { label: 'AI Implementation', href: '#' },
          { label: 'Accounting & Auditing', href: '#' },
        ],
      },
    ],
    cta: { label: "See What You're Missing", href: '#services' },
  },
  'what-we-think': {
    title: 'What We Think',
    columns: [
      {
        heading: 'Insights',
        defaultExpanded: true,
        icon: Lightbulb,
        items: [
          { label: 'Digital Strategy', href: '#' },
          { label: 'Design Thinking', href: '#' },
          { label: 'Technology Trends', href: '#' },
          { label: 'Market Research', href: '#' },
        ],
      },
      {
        heading: 'Our Process',
        icon: GraduationCap,
        items: [
          { label: 'Discover', href: '#process' },
          { label: 'Brief', href: '#process' },
          { label: 'Propose', href: '#process' },
          { label: 'Build', href: '#process' },
          { label: 'Scale', href: '#process' },
        ],
      },
      {
        heading: 'Resources',
        icon: Building2,
        items: [
          { label: 'Case Studies', href: '#' },
          { label: 'White Papers', href: '#' },
          { label: 'Playbooks', href: '#' },
          { label: 'Newsletter', href: '#' },
        ],
      },
    ],
    cta: { label: "Don&apos;t Miss Our Latest Insights", href: '#' },
  },
  career: {
    title: 'Career',
    columns: [
      {
        heading: 'Find a Job',
        defaultExpanded: true,
        icon: Briefcase,
        items: [
          { label: 'Search Jobs', href: '#' },
          { label: 'Career Areas', href: '#' },
        ],
      },
      {
        heading: 'Life at Citadolph',
        icon: Heart,
        items: [
          { label: 'Working Here', href: '#' },
          { label: 'Benefits', href: '#' },
          { label: 'Work Environment', href: '#' },
        ],
      },
      {
        heading: 'How We Hire',
        icon: Users,
        items: [
          { label: 'Hiring Journey', href: '#' },
          { label: 'Pro Tips', href: '#' },
        ],
      },
    ],
    cta: { label: "Don&apos;t Miss Your Role", href: '#' },
    secondaryCta: { label: 'Join Talent Network', href: '#', variant: 'outline' },
  },
} as const;

// Auth state types
export type AuthState = 'unauthenticated' | 'authenticated';

export const authLinks: Record<AuthState, readonly AuthLink[]> = {
  unauthenticated: [
    { label: 'Login', href: '/login', variant: 'ghost' },
    { label: 'Register', href: '/register', variant: 'primary' },
  ],
  authenticated: [
    { label: 'Dashboard', href: '/dashboard', variant: 'ghost' },
    { label: 'Sign Out', href: '/logout', variant: 'ghost', action: 'signout' },
  ],
};

export interface Service {
  id: string;
  title: string;
  description: string;
  category: 'digital-products' | 'brand-strategy' | 'growth-intelligence';
  clientCount: number;
  popular?: boolean;
  featured?: boolean;
  outcomes?: string[];
}

export const services = [
  {
    id: 'website-development',
    title: 'Website Development',
    description: 'Custom websites built with modern technologies, optimized for performance, accessibility, and conversion.',
    category: 'digital-products',
    clientCount: 42,
    popular: true,
    featured: true,
    outcomes: ['40% faster load times', '60% higher conversion', 'WCAG 2.1 AA compliant'],
  },
  {
    id: 'mobile-app-development',
    title: 'Mobile Application Development',
    description: 'Native and cross-platform mobile apps that deliver exceptional user experiences on iOS and Android.',
    category: 'digital-products',
    clientCount: 28,
    featured: true,
    outcomes: ['4.8★ app store rating', '90%+ retention day 30', 'Offline-first architecture'],
  },
  {
    id: 'erp-implementation',
    title: 'ERP Implementation',
    description: 'Enterprise resource planning systems tailored to streamline your operations and drive efficiency.',
    category: 'digital-products',
    clientCount: 15,
    featured: true,
    outcomes: ['35% process automation', 'Real-time analytics', 'Multi-currency support'],
  },
  {
    id: 'management-systems',
    title: 'Management Systems',
    description: 'Custom management systems that bring clarity, control, and scalability to your operations.',
    category: 'digital-products',
    clientCount: 19,
    outcomes: ['Centralized operations', 'Role-based access', 'Audit trails'],
  },
  {
    id: 'personal-branding',
    title: 'Personal Branding',
    description: 'Build a powerful personal brand that resonates with your audience and establishes authority in your field.',
    category: 'brand-strategy',
    clientCount: 35,
    featured: true,
    outcomes: ['3× speaking invitations', 'Media features', 'Thought leadership'],
  },
  {
    id: 'design-services',
    title: 'Design Services',
    description: 'Brand identity, UI/UX design, and visual systems crafted with Swiss precision and purpose.',
    category: 'brand-strategy',
    clientCount: 48,
    outcomes: ['Design system delivery', 'Component libraries', 'Brand guidelines'],
  },
  {
    id: 'digital-consultancy',
    title: 'Digital Consultancy',
    description: 'Strategic guidance to navigate digital transformation and maximize your technology investments.',
    category: 'brand-strategy',
    clientCount: 22,
    outcomes: ['Roadmap & ROI model', 'Vendor selection', 'Risk mitigation'],
  },
  {
    id: 'business-registration',
    title: 'Business Registration Services',
    description: 'End-to-end company formation and compliance services across African jurisdictions.',
    category: 'brand-strategy',
    clientCount: 60,
    outcomes: ['15+ countries covered', '7-day incorporation', 'Ongoing compliance'],
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Services',
    description: 'Data-driven marketing strategies that grow your audience and drive measurable results.',
    category: 'growth-intelligence',
    clientCount: 31,
    featured: true,
    outcomes: ['3× ROAS average', 'Attribution modeling', 'A/B test framework'],
  },
  {
    id: 'social-media-marketing',
    title: 'Social Media Marketing',
    description: 'Content strategy and community management that builds engagement and brand loyalty.',
    category: 'growth-intelligence',
    clientCount: 25,
    outcomes: ['200% engagement growth', 'Community building', 'Crisis management'],
  },
  {
    id: 'ai-implementation',
    title: 'AI Implementation Strategies',
    description: 'Practical AI integration that solves real business problems, not hype-driven experiments.',
    category: 'growth-intelligence',
    clientCount: 12,
    outcomes: ['ML model deployment', 'Process automation', 'Data strategy'],
  },
  {
    id: 'accounting-auditing',
    title: 'Accounting & Auditing',
    description: 'Professional financial services ensuring compliance, accuracy, and strategic insight.',
    category: 'growth-intelligence',
    clientCount: 18,
    outcomes: ['IFRS compliance', 'Tax optimization', 'Audit readiness'],
  },
] as const satisfies readonly Service[];


export const serviceCategories = [
  {
    id: 'digital-products',
    label: 'Digital Products',
    icon: 'Briefcase',
    description: 'Build the digital infrastructure your business runs on',
  },
  {
    id: 'brand-strategy',
    label: 'Brand & Strategy',
    icon: 'Lightbulb',
    description: 'Define who you are and how the world sees you',
  },
  {
    id: 'growth-intelligence',
    label: 'Growth & Intelligence',
    icon: 'Users',
    description: 'Grow smarter with data, AI, and financial rigor',
  },
] as const;

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  visual: string;
  deliverables: string[];
  riskOfSkipping: string;
  duration: string;
}

export const processSteps = [
  {
    number: '01',
    title: 'Discover',
    description: 'We understand your problem for free. Deep dive into your business, challenges, and vision.',
    visual: 'Workflow Visualization',
    deliverables: ['Problem statement', 'Opportunity map', 'Success metrics'], 
    riskOfSkipping: 'Building the wrong solution — 42% of failed projects cite poor discovery',
    duration: '1–2 weeks',
  },
  {
    number: '02',
    title: 'Brief',
    description: 'Project brief crafted with clear scope, timeline, and success metrics for your validation.',
    visual: 'Deliverable Preview',
    deliverables: ['Project brief', 'Scope document', 'Timeline & milestones'],
    riskOfSkipping: 'Scope creep and budget overruns — average 60% cost increase without brief',
    duration: '1 week',
  },
  {
    number: '03',
    title: 'Propose',
    description: 'Detailed proposal with activities, costs, team composition, and value projection.',
    visual: 'Workflow Visualization',
    deliverables: ['Technical proposal', 'Cost breakdown', 'Team bios', 'ROI projection'],
    riskOfSkipping: 'Misaligned expectations — 35% of disputes stem from unclear proposals',
    duration: '3–5 days',
  },
  {
    number: '04',
    title: 'Build',
    description: 'Dedicated team assembled. Plan, design, implement, test, and maintain with real-time tracking.',
    visual: 'Deliverable Preview',
    deliverables: ['Weekly demos', 'QA reports', 'Documentation', 'Launch checklist'],
    riskOfSkipping: 'Technical debt and bugs — 3× more expensive to fix post-launch',
    duration: '8–16 weeks',
  },
  {
    number: '05',
    title: 'Scale',
    description: 'Ongoing maintenance, optimization, and new initiatives as your business grows.',
    visual: 'Workflow Visualization',
    deliverables: ['Performance reports', 'Feature roadmap', 'Security audits', 'Team training'],
    riskOfSkipping: 'Stagnation and security risk — 60% of breaches exploit unpatched systems',
    duration: 'Ongoing',
  },
] as const satisfies readonly ProcessStep[];

export interface Stat {
  value: string;
  label: string;
  context: string;
}

export const stats = [
  { value: '50+', label: 'Projects Delivered', context: 'Across 15 African countries since 2019' },
  { value: '30+', label: 'Specialist Partners', context: 'Vetted agencies & contractors with 94% retention' },
  { value: '12', label: 'Service Domains', context: 'End-to-end digital transformation coverage' },
  { value: '15+', label: 'African Countries', context: 'Local presence with global standards' },
] as const satisfies readonly Stat[];

export interface NetworkFeature {
  text: string;
  proof: string;
}

export const networkFeatures = [
  { text: 'Dedicated digital concierge — your single point of contact', proof: '97% client satisfaction score' },
  { text: 'Specialist agencies for each domain (design, dev, marketing, finance)', proof: '30+ agencies across 3 categories' },
  { text: 'Independent contractors vetted through project delivery', proof: 'Only 12% acceptance rate' },
  { text: 'HRIS & payroll management for all partners', proof: 'Zero compliance incidents in 3 years' },
  { text: 'Financial dashboard tracking all project economics', proof: 'Real-time ROI visibility' },
  { text: 'Pathway from contractor to full-time for top performers', proof: '8 specialists promoted in 2023' },
] as const satisfies readonly NetworkFeature[];

export interface ClientType {
  label: string;
  count: number;
  example?: string;
}

export const clientTypes = [
  { label: 'Government Agencies', count: 8, example: 'Ministry of Digital Economy' },
  { label: 'Startups', count: 24, example: 'FinTech Series A' },
  { label: 'Established Businesses', count: 18, example: 'Pan-African Logistics' },
  { label: 'Personal Brands', count: 12, example: 'Tech Thought Leaders' },
  { label: 'Visionaries', count: 6, example: 'AfCFTA Champions' },
] as const satisfies readonly ClientType[];

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

// UX Psychology enhancements
export const heroSocialProof = {
  businessesJoined: '50+',
  timeframe: 'this quarter',
  region: 'African businesses',
};

export const ctaScarcity = {
  slotsLeft: 3,
  timeframe: 'this month',
  type: 'discovery slots',
};

export const ctaAnchor = {
  premiumPrice: '$50K',
  premiumLabel: 'Enterprise transformation',
  freeOffer: 'Free discovery session',
};

export const contactReciprocity = {
  offer: 'Free 30-min digital audit',
  value: '$2,500 value',
  includes: ['Tech stack review', 'Quick wins identification', 'Roadmap sketch'],
};

export const contactSocialProof = {
  stat: 'Last 5 clients saved 40% on dev costs',
  timeframe: 'through our discovery process',
};

export const specialistScarcity = {
  slotsOpen: 10,
  timeframe: 'this quarter',
  role: 'specialist slots',
};

export const caseStudies = [
  {
    client: 'Pan-African Logistics Co.',
    sector: 'Logistics',
    challenge: 'Fragmented systems across 8 countries',
    solution: 'Unified ERP + mobile driver app',
    outcome: '60% faster dispatch, 35% cost reduction',
    logo: '/images/case-logistics.svg',
  },
  {
    client: 'FinTech Startup',
    sector: 'Financial Services',
    challenge: 'Needed compliant app in 12 weeks',
    solution: 'React Native app + ISO 27001 infrastructure',
    outcome: 'Launched on time, passed regulatory audit',
    logo: '/images/case-fintech.svg',
  },
  {
    client: 'Government Ministry',
    sector: 'Public Sector',
    challenge: 'Digital citizen services portal',
    solution: 'Multi-lingual platform + offline sync',
    outcome: '2M+ citizens served, 99.9% uptime',
    logo: '/images/case-gov.svg',
  },
] as const;
