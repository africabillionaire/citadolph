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
          { label: 'Website Development', href: '#', description: 'Custom websites optimized for performance & conversion' },
          { label: 'Mobile Applications', href: '#', description: 'Native & cross-platform apps for iOS & Android' },
          { label: 'ERP Implementation', href: '#', description: 'Enterprise systems tailored to your operations' },
          { label: 'Management Systems', href: '#', description: 'Custom systems for clarity & scalability' },
        ],
      },
      {
        heading: 'Brand & Strategy',
        icon: Lightbulb,
        items: [
          { label: 'Personal Branding', href: '#', description: 'Build authority & resonance with your audience' },
          { label: 'Design Services', href: '#', description: 'Brand identity, UI/UX, visual systems' },
          { label: 'Digital Consultancy', href: '#', description: 'Strategic guidance for digital transformation' },
          { label: 'Business Registration', href: '#', description: 'Company formation across African jurisdictions' },
        ],
      },
      {
        heading: 'Growth & Intelligence',
        icon: Users,
        items: [
          { label: 'Digital Marketing', href: '#', description: 'Data-driven strategies for measurable results' },
          { label: 'Social Media Marketing', href: '#', description: 'Content strategy & community management' },
          { label: 'AI Implementation', href: '#', description: 'Practical AI integration for real business problems' },
          { label: 'Accounting & Auditing', href: '#', description: 'Professional financial services & compliance' },
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
          { label: 'Digital Strategy', href: '#', description: 'Frameworks for transformation & growth' },
          { label: 'Design Thinking', href: '#', description: 'Swiss precision meets African innovation' },
          { label: 'Technology Trends', href: '#', description: 'AI, Web3, & emerging tech analysis' },
          { label: 'Market Research', href: '#', description: 'African digital landscape reports' },
        ],
      },
      {
        heading: 'Our Process',
        icon: GraduationCap,
        items: [
          { label: 'Discover', href: '#process', description: 'Free deep-dive into your business challenges' },
          { label: 'Brief', href: '#process', description: 'Validated scope, timeline & success metrics' },
          { label: 'Propose', href: '#process', description: 'Detailed activities, costs & team composition' },
          { label: 'Build', href: '#process', description: 'Plan, design, implement, test & maintain' },
          { label: 'Scale', href: '#process', description: 'Ongoing optimization & new initiatives' },
        ],
      },
      {
        heading: 'Resources',
        icon: Building2,
        items: [
          { label: 'Case Studies', href: '#', description: 'Real transformations, measurable outcomes' },
          { label: 'White Papers', href: '#', description: 'In-depth research & methodologies' },
          { label: 'Playbooks', href: '#', description: 'Actionable guides for digital leaders' },
          { label: 'Newsletter', href: '#', description: 'Monthly insights delivered to your inbox' },
        ],
      },
    ],
    cta: { label: "Don't Miss Our Latest Insights", href: '#' },
  },
  career: {
    title: 'Career at Citadolph',
    columns: [
      {
        heading: 'Open Roles',
        defaultExpanded: true,
        icon: Briefcase,
        items: [
          { label: 'Senior Full-Stack Engineer', href: '#', description: 'React, Node.js, TypeScript — Remote (Africa)' },
          { label: 'Product Designer', href: '#', description: 'UI/UX, Design Systems — Lagos / Remote' },
          { label: 'Digital Strategist', href: '#', description: 'Consulting, Growth — Nairobi / Remote' },
          { label: 'DevOps Engineer', href: '#', description: 'AWS, Kubernetes, CI/CD — Remote (Africa)' },
          { label: 'Project Manager', href: '#', description: 'Agile, Client-facing — Accra / Remote' },
          { label: 'Marketing Specialist', href: '#', description: 'Content, SEO, Growth — Remote (Africa)' },
        ],
      },
      {
        heading: 'Why Join Us',
        icon: Heart,
        items: [
          { label: 'Swiss Design Culture', href: '#', description: 'Precision, clarity, purpose-driven craft' },
          { label: 'African Impact', href: '#', description: "Build infrastructure for the continent's future" },
          { label: 'Specialist Network', href: '#', description: 'Work with top agencies & independent experts' },
          { label: 'Growth Pathway', href: '#', description: 'Contractor → Specialist → Partner track' },
          { label: 'Flexible Remote', href: '#', description: 'Work from anywhere across Africa' },
          { label: 'Competitive Package', href: '#', description: 'Equity, learning budget, wellness stipend' },
        ],
      },
      {
        heading: 'Life at Citadolph',
        icon: Users,
        items: [
          { label: 'Our Values', href: '#', description: 'Craft, Integrity, Impact, Curiosity' },
          { label: 'Team Rituals', href: '#', description: 'Design crits, tech talks, hack weeks' },
          { label: 'Learning & Development', href: '#', description: 'Conferences, courses, mentorship' },
          { label: 'Diversity & Inclusion', href: '#', description: "Representing Africa's full spectrum" },
          { label: 'Office Spaces', href: '#', description: 'Lagos, Nairobi, Accra, Cape Town hubs' },
          { label: 'Alumni Stories', href: '#', description: 'Where our people go next' },
        ],
      },
    ],
    cta: { label: "Don't Miss Your Role", href: '#' },
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
