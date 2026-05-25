import { motion } from 'framer-motion';
import clsx from 'clsx';
import type { ReactNode } from 'react';

type Props = {
  kicker?: string;
  title: string;
  presenter?: string;
  children: ReactNode;
  className?: string;
};

export function SlideShell({ title, presenter, children, className }: Props) {
  return (
    <div className="h-full w-full flex flex-col px-10 lg:px-16 pt-6 lg:pt-8 pb-8">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-end justify-between gap-6 mb-5 lg:mb-7"
      >
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-3xl lg:text-5xl xl:text-6xl font-bold text-[var(--text-primary)] tracking-tight leading-[1.05] break-words">
            {title}
          </h1>
        </div>
        {presenter && (
          <div className="hidden md:flex flex-col items-end shrink-0">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--text-muted)] mb-1">
              Presenter
            </span>
            <span className="font-display text-sm lg:text-base font-semibold text-[var(--text-secondary)]">
              {presenter}
            </span>
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '64px' }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="h-1 bg-amber-400 rounded-full mb-6 lg:mb-8"
      />

      <div className={clsx('flex-1 min-h-0', className)}>{children}</div>
    </div>
  );
}
