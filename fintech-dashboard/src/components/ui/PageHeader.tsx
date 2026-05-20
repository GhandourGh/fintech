import { motion } from 'framer-motion';
import { InfoTip } from './InfoTip';
import type { HelpId } from '../../data/helpContent';

type Props = {
  title: string;
  subtitle: string;
  badge?: string;
  infoId?: HelpId;
};

export function PageHeader({ title, subtitle, badge, infoId }: Props) {
  return (
    <motion.header
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      {badge && (
        <span className="inline-block text-xs font-mono uppercase tracking-widest text-teal-500 border border-teal-500/30 rounded-full px-3 py-1 mb-3">
          {badge}
        </span>
      )}
      <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3">
        <div className="flex-1 min-w-0">
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] tracking-tight break-words">
            {title}
          </h1>
          <p className="mt-2 text-[var(--text-secondary)] max-w-2xl text-sm sm:text-base leading-relaxed">{subtitle}</p>
        </div>
        {infoId && <InfoTip id={infoId} size="md" className="shrink-0 self-start sm:mt-2" />}
      </div>
    </motion.header>
  );
}
