import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { SlideShell } from '../components/SlideShell';
import { AnimatedKpi } from '../components/AnimatedKpi';
import { DemoBadge } from '../components/DemoBadge';
import { PORTFOLIO_SUMMARY } from '../../data/portfolioMetrics';
import { fmtCurrency } from '../../utils/format';

const TAKEAWAYS = [
  'Score → PD → Decision → Expected Loss → Risk-based Price',
  'Transparent, interpretable, regulator-friendly scorecard',
  'A spread above 9.24% flows directly to the bank\'s expected margin',
];

export function Slide06Conclusion() {
  return (
    <SlideShell
      kicker="06 · Conclusion"
      title="Expected Loss, Pricing & Wrap-up"
      presenter="Ghandour Ghandour"
    >
      <div className="flex flex-col h-full gap-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-xl bg-[var(--bg-glass)] backdrop-blur-md border border-teal-400/30 px-5 lg:px-6 py-4"
        >
          <p className="text-[11px] uppercase tracking-[0.3em] text-amber-400 font-medium mb-2">
            Expected Loss & Minimum Break-even Rate
          </p>
          <div className="flex flex-col lg:flex-row lg:items-baseline lg:justify-between gap-2">
            <p className="font-display text-xl lg:text-2xl xl:text-3xl font-bold text-[var(--text-primary)] leading-tight">
              <span className="font-mono text-teal-400">EL</span> = PD × LGD × EAD
              <span className="text-[var(--text-muted)] mx-2 lg:mx-4">·</span>
              <span className="font-mono text-amber-400">r<sub>min</sub></span> = PD × LGD
            </p>
            <p className="text-xs lg:text-sm text-[var(--text-secondary)] font-mono">
              LGD = 40% · EAD = $100,000
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedKpi
            label="Total Expected Loss"
            value={PORTFOLIO_SUMMARY.acceptedExpectedLoss}
            display={fmtCurrency(PORTFOLIO_SUMMARY.acceptedExpectedLoss)}
            formatter={(n) =>
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
              }).format(n)
            }
            sub="across 14 accepted loans"
            accent="red"
            delay={0.2}
          />
          <AnimatedKpi
            label="Average Break-even Rate"
            value={PORTFOLIO_SUMMARY.acceptedAvgRate}
            formatter={(n) => `${n.toFixed(2)}%`}
            sub="credit-risk floor"
            accent="teal"
            delay={0.3}
          />
          <AnimatedKpi
            label="Safest Rate"
            value={5.11}
            formatter={(n) => `${n.toFixed(2)}%`}
            sub="clients 4 & 5 · PD 12.79%"
            accent="green"
            delay={0.4}
          />
          <AnimatedKpi
            label="Riskiest Accepted"
            value={13.4}
            formatter={(n) => `${n.toFixed(2)}%`}
            sub="client 8 · PD 33.50%"
            accent="gold"
            delay={0.5}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="lg:col-span-2 rounded-xl bg-[var(--bg-glass)] backdrop-blur-md border border-[var(--border)] p-5 lg:p-6 flex flex-col"
          >
            <p className="text-[11px] uppercase tracking-[0.3em] text-teal-400 font-medium mb-3">
              Key Takeaways
            </p>
            <ul className="space-y-3 flex-1">
              {TAKEAWAYS.map((t, i) => (
                <motion.li
                  key={t}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.75 + i * 0.12 }}
                  className="flex items-start gap-3"
                >
                  <span className="shrink-0 w-6 h-6 lg:w-7 lg:h-7 rounded-full bg-teal-500/15 text-teal-400 inline-flex items-center justify-center mt-0.5">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span className="text-sm lg:text-base text-[var(--text-primary)] leading-snug">
                    {t}
                  </span>
                </motion.li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-[var(--border)]">
              <DemoBadge label="Demo: Expected Loss + Risk Pricing" path="/expected-loss" delay={1.2} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="relative rounded-xl overflow-hidden flex flex-col justify-between p-5 lg:p-6"
            style={{
              background:
                'linear-gradient(140deg, rgba(45,212,191,0.25), rgba(251,191,36,0.15) 50%, rgba(10,18,32,0.85))',
              border: '1px solid rgba(45,212,191,0.3)',
            }}
          >
            <motion.div
              className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl"
              style={{ background: 'rgba(251,191,36,0.2)' }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden
            />
            <div className="relative z-10">
              <Sparkles size={18} className="text-amber-400 mb-2" />
              <p className="text-[11px] uppercase tracking-[0.3em] text-amber-400 font-medium mb-1.5">
                Thank you
              </p>
              <p className="font-display text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight">
                Questions
                <br />
                & discussion
              </p>
            </div>
            <div className="relative z-10 pt-4">
              <div className="w-10 h-1 bg-amber-400 rounded-full mb-2" />
              <p className="text-[11px] text-white/70 font-mono">
                AI in FinTech · Project 1 · 2025 / 2026
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </SlideShell>
  );
}
