import { motion } from 'framer-motion';
import clsx from 'clsx';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
};

export function GlassCard({ children, className, delay = 0, hover = true }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={hover ? { y: -2, transition: { duration: 0.2 } } : undefined}
      className={clsx('glass-card rounded-2xl p-5 md:p-6', className)}
    >
      {children}
    </motion.div>
  );
}
