import { motion } from 'framer-motion';
import { AlertTriangle, Target, Layers } from 'lucide-react';
import { SlideShell } from '../components/SlideShell';
import { DemoBadge } from '../components/DemoBadge';

const CARDS = [
  {
    icon: AlertTriangle,
    title: 'The Problem',
    body: 'The bank cannot know with certainty which clients will default. Accept everyone → losses. Reject everyone → no business.',
    accent: 'red',
  },
  {
    icon: Target,
    title: 'The Aim',
    body: 'Build a scorecard that ranks applicants on a 0–100 scale and converts the ranking into an accept / reject decision.',
    accent: 'teal',
  },
  {
    icon: Layers,
    title: 'The Output',
    body: 'Per client: Score, probability of default, decision, expected loss and minimum break-even interest rate.',
    accent: 'gold',
  },
] as const;

const ACCENT = {
  red: { ring: 'border-red-400/40', icon: 'text-red-400 bg-red-500/10' },
  teal: { ring: 'border-teal-400/40', icon: 'text-teal-400 bg-teal-500/10' },
  gold: { ring: 'border-amber-400/40', icon: 'text-amber-400 bg-amber-500/10' },
};

export function Slide02Problem() {
  return (
    <SlideShell
      kicker="02 · Context"
      title="Business Problem & Project Aim"
      presenter="Ali Srour"
    >
      <div className="flex flex-col h-full">
        <p className="text-lg lg:text-2xl text-[var(--text-secondary)] max-w-5xl mb-7 lg:mb-9 leading-snug">
          The bank has to decide <span className="text-[var(--text-primary)] font-semibold">who gets a loan</span> and
          <span className="text-[var(--text-primary)] font-semibold"> at what rate</span> — we replace gut feel with a data-driven scorecard.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7 lg:mb-9 flex-1">
          {CARDS.map((card, i) => {
            const Icon = card.icon;
            const cls = ACCENT[card.accent];
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`rounded-2xl bg-[var(--bg-glass)] backdrop-blur-md border ${cls.ring} p-7 lg:p-8 flex flex-col`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`inline-flex w-12 h-12 lg:w-14 lg:h-14 rounded-xl items-center justify-center ${cls.icon}`}
                  >
                    <Icon size={24} />
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--text-muted)] font-medium">
                    0{i + 1}
                  </p>
                </div>
                <h3 className="font-display text-2xl lg:text-3xl xl:text-4xl font-bold text-[var(--text-primary)] mb-3 leading-tight">
                  {card.title}
                </h3>
                <p className="text-base lg:text-lg text-[var(--text-secondary)] leading-relaxed">
                  {card.body}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative rounded-xl bg-[var(--bg-glass)] backdrop-blur-md border border-teal-400/25 overflow-hidden"
        >
          <div
            aria-hidden
            className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-teal-400 to-amber-400"
          />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pl-6 pr-5 lg:pl-8 lg:pr-7 py-4 lg:py-5">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-medium mb-1.5">
                Decision Rule
              </p>
              <p className="font-display text-xl lg:text-2xl xl:text-3xl font-semibold text-[var(--text-primary)] leading-tight">
                Accept if{' '}
                <span className="bg-gradient-to-r from-teal-300 to-amber-300 bg-clip-text text-transparent tabular-nums">
                  Score ≥ 48.20
                </span>
              </p>
              <p className="text-xs lg:text-sm text-[var(--text-muted)] mt-1.5">
                Cutoff chosen by the Kolmogorov–Smirnov statistic.
              </p>
            </div>
            <div className="shrink-0">
              <DemoBadge label="Scorecard" path="/scorecard" delay={0.9} />
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  );
}
