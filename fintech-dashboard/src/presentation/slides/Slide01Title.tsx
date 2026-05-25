import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { MemberCard } from '../components/MemberCard';
import { TEAM_MEMBERS } from '../slides.config';
import { PROJECT_META } from '../../data/projectData';

const HEADLINES = [
  { value: '14 / 20', label: 'Accepted', accent: 'text-emerald-400' },
  { value: '$1.4M', label: 'Exposure', accent: 'text-teal-400' },
  { value: '9.24%', label: 'Avg Rate', accent: 'text-amber-400' },
  { value: '0.6775', label: 'AUC', accent: 'text-cyan-400' },
];

const CORE_IDEA = [
  { name: 'Data', color: '#2dd4bf' },
  { name: 'Score', color: '#22d3ee' },
  { name: 'Risk', color: '#60a5fa' },
  { name: 'Decision', color: '#a78bfa' },
  { name: 'Pricing', color: '#fbbf24' },
];

function SectionLabel({ left, right }: { left: string; right?: string }) {
  return (
    <div className="flex items-center gap-3 flex-shrink-0">
      <p className="text-[10px] uppercase tracking-[0.3em] text-teal-400 font-medium">
        {left}
      </p>
      <div className="flex-1 h-px bg-[var(--border)]" />
      {right && (
        <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--text-muted)]">
          {right}
        </p>
      )}
    </div>
  );
}

export function Slide01Title() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 mesh-bg pointer-events-none"
        aria-hidden
      />
      <motion.div
        className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(45,212,191,0.18), transparent 70%)' }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />
      <motion.div
        className="absolute -bottom-40 -left-32 w-[460px] h-[460px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.10), transparent 70%)' }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />

      <div
        className="relative z-10 h-full w-full flex flex-col px-10 lg:px-16 pt-6 lg:pt-8 pb-6"
        style={{ gap: 'clamp(0.7rem, 1.4vh, 1.1rem)' }}
      >
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 flex-shrink-0"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" aria-hidden />
          <p className="text-[11px] lg:text-xs uppercase tracking-[0.35em] text-teal-400 font-medium">
            AI in FinTech  ·  Final Project
          </p>
          <div className="flex-1 h-px bg-[var(--border)]/60" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0"
        >
          <div className="flex items-end justify-between gap-6">
            <h1
              className="min-w-0 flex-1 font-display font-bold tracking-tight text-[var(--text-primary)] leading-[1.0]"
              style={{ fontSize: 'clamp(1.7rem, 4.8vw, 4.25rem)' }}
            >
              <span className="block">Portfolio Optimisation</span>
              <span className="block bg-gradient-to-r from-teal-300 via-teal-400 to-amber-400 bg-clip-text text-transparent">
                &amp; Interest Rate Pricing
              </span>
            </h1>
            <div className="hidden md:flex flex-col items-end shrink-0 pb-1 lg:pb-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--text-muted)] mb-1">
                Presenter
              </span>
              <span className="font-display text-sm lg:text-base font-semibold text-[var(--text-secondary)]">
                Marwa Zeineddine
              </span>
            </div>
          </div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '64px' }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="h-1 bg-amber-400 rounded-full mt-3"
          />
          <p
            className="mt-3 text-[var(--text-secondary)] max-w-[820px] leading-snug"
            style={{ fontSize: 'clamp(0.8rem, 1.15vw, 1.02rem)' }}
          >
            A scorecard-based credit decision system that ranks{' '}
            <span className="text-[var(--text-primary)] font-semibold">20 loan applicants</span>,
            estimates each probability of default, and prices the{' '}
            <span className="text-[var(--text-primary)] font-semibold">minimum break-even interest rate</span>.
          </p>
        </motion.div>

        <div className="flex-shrink-0">
          <SectionLabel left="Headline Results" />
          <div className="grid grid-cols-4 gap-2 mt-2">
            {HEADLINES.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.45 + i * 0.07 }}
                className="rounded-md bg-[var(--bg-glass)] backdrop-blur-md border border-[var(--border)] px-3 py-2"
              >
                <p
                  className={`font-display font-bold tracking-tight tabular-nums leading-none ${h.accent}`}
                  style={{ fontSize: 'clamp(1.05rem, 1.9vw, 1.55rem)' }}
                >
                  {h.value}
                </p>
                <p
                  className="text-[var(--text-muted)] uppercase tracking-[0.2em] font-medium mt-1 leading-none"
                  style={{ fontSize: 'clamp(0.58rem, 0.72vw, 0.72rem)' }}
                >
                  {h.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex-shrink-0">
          <SectionLabel left="Core Idea" right="data leads to pricing" />
          <div className="mt-2 flex items-center flex-wrap gap-x-1.5 gap-y-2">
            {CORE_IDEA.map((s, i) => (
              <div key={s.name} className="flex items-center gap-1.5">
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + i * 0.08 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-glass)] backdrop-blur-md border border-[var(--border)]"
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{
                      backgroundColor: s.color,
                      boxShadow: `0 0 10px ${s.color}90`,
                    }}
                  />
                  <span className="font-display text-xs lg:text-sm font-semibold text-[var(--text-primary)] tracking-wide">
                    {s.name}
                  </span>
                </motion.div>
                {i < CORE_IDEA.length - 1 && (
                  <ChevronRight
                    size={14}
                    className="text-[var(--text-muted)] shrink-0"
                    aria-hidden
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col flex-1 min-h-0">
          <SectionLabel left="Team" right="Six members" />
          <div
            className="mt-2 grid grid-cols-3 gap-2 lg:gap-2.5 flex-1 min-h-0"
            style={{ gridTemplateRows: 'repeat(2, minmax(0, 1fr))' }}
          >
            {TEAM_MEMBERS.map((name, i) => (
              <MemberCard key={name} name={name} index={i} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[var(--border)] flex-shrink-0"
        >
          <p className="text-[10px] font-mono text-[var(--text-muted)] tracking-wider">
            {PROJECT_META.institution}
          </p>
          <p className="text-[10px] font-mono text-[var(--text-muted)] tracking-wider">
            Academic Year {PROJECT_META.year}  ·  MATLAB Credit Scorecard
          </p>
        </motion.div>
      </div>
    </div>
  );
}
