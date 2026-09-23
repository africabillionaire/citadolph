/**
 * Footer COPY Dictionary — i18n-ready content for Footer component
 * Following the same pattern as Nav component for consistency
 */

export type Locale = 'en' | 'fr';

export interface FooterCopy {
  newsletter: {
    eyebrow: string;
    headline: string;
    subtext: string;
    inputPlaceholder: string;
    buttonLabel: string;
    buttonLoading: string;
    successMessage: string;
    errorInvalidEmail: string;
    errorGeneric: string;
  };
  linkMatrix: {
    company: {
      label: string;
      links: Array<{ label: string; href: string }>;
    };
    services: {
      label: string;
    };
    contact: {
      label: string;
      location: string;
    };
    legal: {
      label: string;
      links: Array<{ label: string; href: string }>;
    };
  };
  social: {
    followLabel: string;
  };
  compliance: {
    badges: string[];
  };
  baseline: {
    copyright: string;
    operating: string;
    languageToggle: {
      en: string;
      fr: string;
    };
    backToTop: string;
  };
}

export const FOOTER_COPY: Record<Locale, FooterCopy> = {
  en: {
    newsletter: {
      eyebrow: 'Stay sharp',
      headline: 'Digital transformation insights, once a month.',
      subtext: 'No spam. No fluff. Just signal.',
      inputPlaceholder: 'Enter your email',
      buttonLabel: 'Subscribe',
      buttonLoading: 'Subscribing…',
      successMessage: 'You\'re on the list. Welcome.',
      errorInvalidEmail: 'Please enter a valid email address.',
      errorGeneric: 'Something went wrong. Please try again.',
    },
    linkMatrix: {
      company: {
        label: 'Company',
        links: [
          { label: 'Who We Are', href: '#about' },
          { label: 'Careers', href: '#careers' },
          { label: 'Our Process', href: '#process' },
          { label: 'Startup Programs', href: '#startups' },
        ],
      },
      services: {
        label: 'Services',
      },
      contact: {
        label: 'Contact',
        location: 'Delaware, USA · Operating in Africa',
      },
      legal: {
        label: 'Legal',
        links: [
          { label: 'Privacy Policy (GDPR)', href: '#privacy' },
          { label: 'Terms of Service', href: '#terms' },
          { label: 'Cookie Policy', href: '#cookies' },
          { label: 'ISO 27001 / SOC 2', href: '#compliance' },
        ],
      },
    },
    social: {
      followLabel: 'Follow',
    },
    compliance: {
      badges: [
        'ISO 27001 Ready',
        'SOC 2 Compliant',
        'GDPR Compliant',
        'European Privacy Act Compliant',
      ],
    },
    baseline: {
      copyright: '© {year} Citi Adolph LLC — Delaware, USA',
      operating: 'Operating in Africa',
      languageToggle: {
        en: 'EN',
        fr: 'FR',
      },
      backToTop: 'Back to top',
    },
  },
  fr: {
    newsletter: {
      eyebrow: 'Restez affûté',
      headline: 'Des insights sur la transformation digitale, une fois par mois.',
      subtext: 'Pas de spam. Pas de fluff. Juste du signal.',
      inputPlaceholder: 'Entrez votre email',
      buttonLabel: 'S\'abonner',
      buttonLoading: 'Inscription…',
      successMessage: 'Vous êtes inscrit. Bienvenue.',
      errorInvalidEmail: 'Veuillez entrer une adresse email valide.',
      errorGeneric: 'Une erreur est survenue. Veuillez réessayer.',
    },
    linkMatrix: {
      company: {
        label: 'Entreprise',
        links: [
          { label: 'Qui nous sommes', href: '#about' },
          { label: 'Carrières', href: '#careers' },
          { label: 'Notre processus', href: '#process' },
          { label: 'Programmes startup', href: '#startups' },
        ],
      },
      services: {
        label: 'Services',
      },
      contact: {
        label: 'Contact',
        location: 'Delaware, USA · Opérationnel en Afrique',
      },
      legal: {
        label: 'Légal',
        links: [
          { label: 'Politique de confidentialité (RGPD)', href: '#privacy' },
          { label: 'Conditions d\'utilisation', href: '#terms' },
          { label: 'Politique des cookies', href: '#cookies' },
          { label: 'ISO 27001 / SOC 2', href: '#compliance' },
        ],
      },
    },
    social: {
      followLabel: 'Suivre',
    },
    compliance: {
      badges: [
        'ISO 27001 Prêt',
        'SOC 2 Conforme',
        'RGPD Conforme',
        'Loi européenne sur la vie privée Conforme',
      ],
    },
    baseline: {
      copyright: '© {year} Citi Adolph LLC — Delaware, USA',
      operating: 'Opérationnel en Afrique',
      languageToggle: {
        en: 'EN',
        fr: 'FR',
      },
      backToTop: 'Retour en haut',
    },
  },
};

export function getFooterCopy(locale: Locale = 'en'): FooterCopy {
  return FOOTER_COPY[locale] || FOOTER_COPY.en;
}