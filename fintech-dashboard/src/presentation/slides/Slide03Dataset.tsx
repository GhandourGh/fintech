import { motion } from 'framer-motion';
import { Database, Briefcase, Calendar, DollarSign, Home, BadgeCheck } from 'lucide-react';
import { SlideShell } from '../components/SlideShell';
import { DemoBadge } from '../components/DemoBadge';

const PREDICTORS = [
  { icon: Calendar, name: 'Age', kind: 'Numeric', desc: 'Customer age in years' },
  { icon: DollarSign, name: 'Income', kind: 'Numeric', desc: 'Annual income (USD)' },
  { icon: Home, name: 'Residential', kind: 'Categorical', desc: 'Renter / HomeOwner' },
  { icon: BadgeCheck, name: 'Employment', kind: 'Categorical', desc: 'Employed / Other' },
];

export function Slide03Dataset() {
  return (
    <SlideShell
      kicker="03 · Data"
      title="Dataset & Inputs"
      presenter="Mhamad Naser Dine"
    >
      <div className="flex flex-col h-full gap-5">
        <p className="text-base lg:text-xl text-[var(--text-secondary)] max-w-5xl leading-snug">
          Source: <span className="font-mono text-[var(--text-primary)]">DataProjScoreCard.xlsx</span> — two sheets, four predictors, one binary target.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="rounded-2xl bg-[var(--bg-glass)] backdrop-blur-md border border-teal-400/30 p-6 lg:p-7 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex w-11 h-11 lg:w-12 lg:h-12 rounded-xl items-center justify-center bg-teal-500/15 text-teal-400">
                <Database size={20} />
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-teal-400 mb-0.5">Sheet 1</p>
                <p className="font-display text-lg lg:text-xl font-semibold text-[var(--text-primary)]">
                  HistoricalData
                </p>
              </div>
            </div>
            <div className="flex items-baseline gap-3 mb-3">
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="font-display text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-br from-teal-300 to-teal-500 bg-clip-text text-transparent tabular-nums leading-none"
              >
                500
              </motion.span>
              <span className="text-sm lg:text-base text-[var(--text-secondary)]">past clients</span>
            </div>
            <p className="text-sm lg:text-base text-[var(--text-secondary)] mb-4 leading-snug">
              Known Default outcome — trains and validates the model.
            </p>
            <div className="mt-auto">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--text-muted)] mb-2">
                Default Distribution
              </p>
              <div className="flex h-2.5 lg:h-3 rounded-full overflow-hidden bg-[var(--border)]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '64%' }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="bg-emerald-400"
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '36%' }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="bg-red-400"
                />
              </div>
              <div className="flex justify-between text-xs lg:text-sm mt-2">
                <span className="text-emerald-400 font-semibold tabular-nums">320 good · 64%</span>
                <span className="text-red-400 font-semibold tabular-nums">180 bad · 36%</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="rounded-2xl bg-[var(--bg-glass)] backdrop-blur-md border border-amber-400/30 p-6 lg:p-7 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex w-11 h-11 lg:w-12 lg:h-12 rounded-xl items-center justify-center bg-amber-500/15 text-amber-400">
                <Briefcase size={20} />
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-amber-400 mb-0.5">Sheet 2</p>
                <p className="font-display text-lg lg:text-xl font-semibold text-[var(--text-primary)]">
                  ActualPortfolioData
                </p>
              </div>
            </div>
            <div className="flex items-baseline gap-3 mb-3">
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="font-display text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-br from-amber-300 to-amber-500 bg-clip-text text-transparent tabular-nums leading-none"
              >
                20
              </motion.span>
              <span className="text-sm lg:text-base text-[var(--text-secondary)]">new applicants</span>
            </div>
            <p className="text-sm lg:text-base text-[var(--text-secondary)] mb-4 leading-snug">
              Outcome unknown — receives the model's decision.
            </p>
            <div className="mt-auto rounded-xl bg-[var(--bg-secondary)]/60 border border-[var(--border)] px-4 py-3 flex items-center justify-between">
              <span className="text-xs lg:text-sm text-[var(--text-secondary)]">Loan request each</span>
              <span className="font-display text-xl lg:text-2xl font-bold text-amber-400 tabular-nums">
                $100,000
              </span>
            </div>
          </motion.div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] uppercase tracking-[0.3em] text-teal-400 font-medium">
              Four Predictors
            </p>
            <DemoBadge label="Client Explorer + Live Test" path="/explorer" delay={0.7} />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {PREDICTORS.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                  className="rounded-xl bg-[var(--bg-glass)] backdrop-blur-md border border-[var(--border)] p-3.5 lg:p-4 flex flex-col"
                >
                  <Icon size={18} className="text-teal-400 mb-2" />
                  <p className="font-display text-base lg:text-lg font-semibold text-[var(--text-primary)] mb-0.5">
                    {p.name}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-amber-400 mb-1.5">
                    {p.kind}
                  </p>
                  <p className="text-[11px] lg:text-xs text-[var(--text-secondary)] leading-snug">
                    {p.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}
