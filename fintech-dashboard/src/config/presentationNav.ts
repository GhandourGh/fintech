import type { LucideIcon } from 'lucide-react';
import {
  LayoutDashboard,
  CreditCard,
  BarChart3,
  LineChart,
  Briefcase,
  UserCheck,
  DollarSign,
  Percent,
  Award,
  CheckCircle2,
  FlaskConical,
  Images,
  Search,
} from 'lucide-react';

export type PresentationNavItem = {
  /** Presentation order (matches script.md slides) */
  step: number;
  to: string;
  /** Short label for sidebar */
  label: string;
  /** Full slide title for script / presenter notes */
  slideTitle: string;
  icon: LucideIcon;
};

/** Main presentation path — follow steps 1–11 in order */
export const PRESENTATION_NAV: PresentationNavItem[] = [
  {
    step: 1,
    to: '/',
    label: 'Overview',
    slideTitle: 'Introduction & Problem / Data',
    icon: LayoutDashboard,
  },
  {
    step: 2,
    to: '/woe',
    label: 'WOE & Binning',
    slideTitle: 'WOE & Binning Analysis',
    icon: BarChart3,
  },
  {
    step: 3,
    to: '/scorecard',
    label: 'Scorecard',
    slideTitle: 'Credit Scorecard Points',
    icon: CreditCard,
  },
  {
    step: 4,
    to: '/validation',
    label: 'ROC & Validation',
    slideTitle: 'ROC Curve & Validation Metrics',
    icon: LineChart,
  },
  {
    step: 5,
    to: '/portfolio',
    label: 'Portfolio Risk',
    slideTitle: 'Portfolio Scoring — Score vs PD',
    icon: Briefcase,
  },
  {
    step: 6,
    to: '/decisions',
    label: 'Accept / Reject',
    slideTitle: 'Accept vs Reject Decisions',
    icon: UserCheck,
  },
  {
    step: 7,
    to: '/expected-loss',
    label: 'Expected Loss',
    slideTitle: 'Expected Loss Dashboard',
    icon: DollarSign,
  },
  {
    step: 8,
    to: '/pricing',
    label: 'Risk Pricing',
    slideTitle: 'Risk-Based Interest Rates',
    icon: Percent,
  },
  {
    step: 9,
    to: '/performance',
    label: 'Model Performance',
    slideTitle: 'Model Performance Summary',
    icon: Award,
  },
  {
    step: 10,
    to: '/final',
    label: 'Final Decision',
    slideTitle: 'Final Portfolio Decision',
    icon: CheckCircle2,
  },
  {
    step: 11,
    to: '/test',
    label: 'Live Client Test',
    slideTitle: 'Live Client Test (Demo)',
    icon: FlaskConical,
  },
];

/** Optional — not in main presentation order */
export const SUPPLEMENTARY_NAV: PresentationNavItem[] = [
  {
    step: 12,
    to: '/outputs/matlab',
    label: 'MATLAB & Excel Charts',
    slideTitle: 'MATLAB & Excel Source Charts',
    icon: Images,
  },
  {
    step: 0,
    to: '/explorer',
    label: 'Client Explorer',
    slideTitle: 'Client Explorer',
    icon: Search,
  },
];

export function formatNavLabel(item: PresentationNavItem, style: 'sidebar' | 'mobile') {
  if (style === 'mobile') {
    return `${item.step}. ${item.label}`;
  }
  return item.label;
}

export function slideRef(step: number): string {
  const item = PRESENTATION_NAV.find((n) => n.step === step);
  if (!item) {
    const sup = SUPPLEMENTARY_NAV.find((n) => n.step === step);
    return sup ? `Slide ${step} — ${sup.slideTitle}` : `Slide ${step}`;
  }
  return `Slide ${step} — ${item.slideTitle}`;
}
