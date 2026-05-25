import type { ComponentType } from 'react';
import { Slide01Title } from './slides/Slide01Title';
import { Slide02Problem } from './slides/Slide02Problem';
import { Slide03Dataset } from './slides/Slide03Dataset';
import { Slide04Method } from './slides/Slide04Method';
import { Slide05Decision } from './slides/Slide05Decision';
import { Slide06Conclusion } from './slides/Slide06Conclusion';

export type SlideMeta = {
  id: number;
  kicker: string;
  title: string;
  presenter: string;
  dashboardTarget?: { label: string; path: string };
  component: ComponentType;
};

export const TEAM_MEMBERS = [
  'Marwa Zeineddine',
  'Ali Srour',
  'Mhamad Naser Dine',
  'Maroun Machaalany',
  'Lynn Khalil',
  'Ghandour Ghandour',
] as const;

export const SLIDES: SlideMeta[] = [
  {
    id: 1,
    kicker: '01 · Opening',
    title: 'Portfolio Optimisation & Interest Rate Pricing',
    presenter: 'Marwa Zeineddine',
    dashboardTarget: { label: 'Overview', path: '/' },
    component: Slide01Title,
  },
  {
    id: 2,
    kicker: '02 · Context',
    title: 'Business Problem & Project Aim',
    presenter: 'Ali Srour',
    dashboardTarget: { label: 'Scorecard', path: '/scorecard' },
    component: Slide02Problem,
  },
  {
    id: 3,
    kicker: '03 · Data',
    title: 'Dataset, Inputs & Live Demo',
    presenter: 'Mhamad Naser Dine',
    dashboardTarget: { label: 'Client Explorer + Live Test', path: '/explorer' },
    component: Slide03Dataset,
  },
  {
    id: 4,
    kicker: '04 · Method',
    title: 'Scorecard Workflow & Validation',
    presenter: 'Lyn Khalil',
    dashboardTarget: { label: 'WOE & Binning + ROC', path: '/woe' },
    component: Slide04Method,
  },
  {
    id: 5,
    kicker: '05 · Decision',
    title: 'Portfolio Accept / Reject',
    presenter: 'Maroun Mashaalany',
    dashboardTarget: { label: 'Portfolio Risk + Accept/Reject', path: '/portfolio' },
    component: Slide05Decision,
  },
  {
    id: 6,
    kicker: '06 · Conclusion',
    title: 'Expected Loss, Pricing & Wrap-up',
    presenter: 'Ghandour Ghandour',
    dashboardTarget: { label: 'Expected Loss + Risk Pricing', path: '/expected-loss' },
    component: Slide06Conclusion,
  },
];
