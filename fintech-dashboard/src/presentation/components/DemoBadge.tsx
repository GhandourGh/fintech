import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

type Props = {
  label: string;
  path: string;
  delay?: number;
};

export function DemoBadge({ label, path, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      className="inline-flex"
    >
      <Link
        to={path}
        className="group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium font-mono tracking-tight text-teal-400 bg-teal-500/8 border border-teal-400/25 hover:bg-teal-500/15 hover:border-teal-400/50 transition-colors"
      >
        <span className="text-[9px] uppercase tracking-[0.15em] text-[var(--text-muted)] group-hover:text-teal-400 transition-colors">
          D ·
        </span>
        <span>{label}</span>
        <ArrowUpRight
          size={11}
          className="opacity-60 group-hover:opacity-100 transition-opacity"
        />
      </Link>
    </motion.div>
  );
}
