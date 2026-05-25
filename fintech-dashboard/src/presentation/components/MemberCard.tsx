import { motion } from 'framer-motion';

type Props = {
  name: string;
  index: number;
  highlighted?: boolean;
};

const initials = (name: string) =>
  name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

export function MemberCard({ name, index, highlighted = false }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.3 + index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative group h-full min-h-0"
    >
      <div
        className={`relative h-full w-full rounded-lg px-3 py-1.5 flex items-center gap-2.5 backdrop-blur-md border transition-colors ${
          highlighted
            ? 'bg-teal-500/10 border-teal-400/40'
            : 'bg-[var(--bg-glass)] border-[var(--border)]'
        }`}
      >
        <div
          className={`shrink-0 w-8 h-8 rounded-md flex items-center justify-center font-display font-bold text-xs ${
            highlighted
              ? 'bg-teal-400 text-[var(--bg-primary)]'
              : 'bg-gradient-to-br from-teal-500/80 to-amber-500/70 text-white'
          }`}
        >
          {initials(name)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] leading-none mb-0.5">
            0{index + 1}
          </p>
          <p className="font-display text-base lg:text-lg xl:text-xl font-semibold text-[var(--text-primary)] truncate leading-tight">
            {name}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
