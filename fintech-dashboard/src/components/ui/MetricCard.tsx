import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import clsx from 'clsx';
import { GlassCard } from './GlassCard';
import { InfoTip } from './InfoTip';
import type { HelpId } from '../../data/helpContent';

type Props = {
  label: string;
  value: string;
  sub?: string;
  icon: LucideIcon;
  delay?: number;
  accent?: 'teal' | 'gold' | 'risk';
  infoId?: HelpId;
};

export function MetricCard({ label, value, sub, icon: Icon, delay = 0, accent = 'teal', infoId }: Props) {
  const accentClass = {
    teal: 'text-teal-500 bg-teal-500/10 border-teal-500/20',
    gold: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    risk: 'text-red-500 bg-red-500/10 border-red-500/20',
  }[accent];

  return (
    <GlassCard delay={delay} className="relative group !overflow-visible">
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none" aria-hidden>
        <motion.div
          className="absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'var(--accent-glow)', filter: 'blur(24px)' }}
        />
      </div>

      {infoId && (
        <div className="absolute top-3 right-3 z-20">
          <InfoTip id={infoId} placement="bottom" />
        </div>
      )}

      <motion.div
        className={clsx('inline-flex p-2.5 rounded-xl border mb-4 relative z-0', accentClass)}
        whileHover={{ scale: 1.05 }}
      >
        <Icon size={20} />
      </motion.div>
      <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-medium mb-1 pr-8 leading-snug">
        {label}
      </p>
      <p className="font-display text-2xl md:text-3xl font-bold text-[var(--text-primary)] tracking-tight">{value}</p>
      {sub && <p className="text-sm text-[var(--text-secondary)] mt-1.5">{sub}</p>}
    </GlassCard>
  );
}
