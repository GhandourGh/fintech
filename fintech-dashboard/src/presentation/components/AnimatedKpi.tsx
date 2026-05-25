import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

type Props = {
  label: string;
  value: number;
  /** Final-value string when the count completes (overrides formatter). */
  display?: string;
  formatter?: (n: number) => string;
  prefix?: string;
  suffix?: string;
  sub?: string;
  accent?: 'teal' | 'gold' | 'red' | 'green';
  delay?: number;
};

const ACCENT_CLASSES = {
  teal: { bar: 'bg-teal-400', label: 'text-teal-400' },
  gold: { bar: 'bg-amber-400', label: 'text-amber-400' },
  red: { bar: 'bg-red-400', label: 'text-red-400' },
  green: { bar: 'bg-emerald-400', label: 'text-emerald-400' },
};

export function AnimatedKpi({
  label,
  value,
  display,
  formatter,
  prefix = '',
  suffix = '',
  sub,
  accent = 'teal',
  delay = 0,
}: Props) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) =>
    formatter ? formatter(latest) : Math.round(latest).toLocaleString('en-US'),
  );
  const [text, setText] = useState<string>(formatter ? formatter(0) : '0');

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 1.4,
      delay,
      ease: [0.22, 1, 0.36, 1],
    });
    const unsubscribe = rounded.on('change', (v) => setText(v));
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [value, delay, motionValue, rounded]);

  const classes = ACCENT_CLASSES[accent];
  const displayText = display ?? `${prefix}${text}${suffix}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative h-full rounded-xl bg-[var(--bg-glass)] backdrop-blur-md border border-[var(--border)] px-5 py-4 overflow-hidden"
    >
      <div className={clsx('absolute left-0 top-0 bottom-0 w-1', classes.bar)} />
      <p
        className={clsx(
          'text-[10px] lg:text-[11px] uppercase tracking-[0.25em] font-medium mb-2',
          classes.label,
        )}
      >
        {label}
      </p>
      <p className="font-display text-3xl lg:text-4xl xl:text-5xl font-bold text-[var(--text-primary)] tracking-tight tabular-nums leading-none mb-2">
        {displayText}
      </p>
      {sub && (
        <p className="text-xs lg:text-sm text-[var(--text-secondary)] mt-2 leading-snug">
          {sub}
        </p>
      )}
    </motion.div>
  );
}
