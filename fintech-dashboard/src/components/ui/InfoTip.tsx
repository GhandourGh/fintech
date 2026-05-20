import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';
import clsx from 'clsx';
import { HELP, type HelpId } from '../../data/helpContent';

type Props = {
  id?: HelpId;
  title?: string;
  body?: string;
  className?: string;
  size?: 'sm' | 'md';
  placement?: 'auto' | 'bottom' | 'top';
};

const PANEL_W = 300;
const GAP = 8;
const CLOSE_DELAY = 280;

export function InfoTip({
  id,
  title,
  body,
  className,
  size = 'sm',
  placement = 'auto',
}: Props) {
  const entry = id ? HELP[id] : title && body ? { title, body } : null;
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const tooltipId = useId();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const cancelClose = useCallback(() => {
    clearTimeout(closeTimer.current);
  }, []);

  const openTip = useCallback(() => {
    cancelClose();
    setOpen(true);
  }, [cancelClose]);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY);
  }, [cancelClose]);

  const updatePosition = useCallback(() => {
    const btn = triggerRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const panelH = panelRef.current?.offsetHeight ?? 160;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const margin = 12;

    let top = rect.bottom + GAP;
    if (placement === 'top' || (placement === 'auto' && top + panelH > vh - margin)) {
      top = rect.top - panelH - GAP;
    }
    if (top < margin) top = margin;

    let left = rect.right - PANEL_W;
    if (left < margin) left = margin;
    if (left + PANEL_W > vw - margin) left = vw - PANEL_W - margin;

    setCoords({ top, left });
  }, [placement]);

  useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
    const raf = requestAnimationFrame(() => updatePosition());
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  if (!entry) return null;

  const iconSize = size === 'sm' ? 14 : 16;
  const btnSize = size === 'sm' ? 'w-5 h-5' : 'w-6 h-6';

  const panel = createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          id={tooltipId}
          role="tooltip"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.15 }}
          style={{ top: coords.top, left: coords.left, width: PANEL_W }}
          className="fixed z-[9999] p-4 rounded-xl border border-teal-500/30 bg-[var(--bg-secondary)] shadow-2xl shadow-black/25 ring-1 ring-black/5 pointer-events-auto"
          onMouseEnter={openTip}
          onMouseLeave={scheduleClose}
        >
          <p className="text-sm font-semibold text-[var(--text-primary)] leading-snug">{entry.title}</p>
          <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">{entry.body}</p>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );

  return (
    <>
      <div
        className={clsx('inline-flex shrink-0', className)}
        onMouseEnter={openTip}
        onMouseLeave={scheduleClose}
      >
        <button
          ref={triggerRef}
          type="button"
          aria-expanded={open}
          aria-describedby={open ? tooltipId : undefined}
          aria-label={`More info: ${entry.title}`}
          onFocus={openTip}
          onBlur={scheduleClose}
          onClick={(e) => e.preventDefault()}
          className={clsx(
            btnSize,
            'inline-flex items-center justify-center rounded-full border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50',
            open
              ? 'bg-teal-500/20 border-teal-500/50 text-teal-500'
              : 'border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:border-teal-500/40 hover:text-teal-500 hover:bg-teal-500/10'
          )}
        >
          <Info size={iconSize} strokeWidth={2.5} />
        </button>
      </div>
      {panel}
    </>
  );
}
