import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield } from 'lucide-react';
import clsx from 'clsx';
import { PRESENTATION_NAV, SUPPLEMENTARY_NAV } from '../../config/presentationNav';

export function MobileNav() {
  const [open, setOpen] = useState(false);

  const mainLinks = PRESENTATION_NAV.map((item) => [item.to, `${item.step}. ${item.label}`] as const);
  const extraLinks = SUPPLEMENTARY_NAV.map((item) => [
    item.to,
    item.step > 0 ? `${item.step}. ${item.label}` : item.label,
  ] as const);

  return (
    <header className="lg:hidden sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg-secondary)]/95 backdrop-blur-xl">
      <motion.div className="flex items-center justify-between px-4 py-3">
        <motion.div className="flex items-center gap-2">
          <Shield className="text-teal-500" size={22} />
          <span className="font-display font-bold">RiskLens</span>
        </motion.div>
        <button type="button" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-4 pb-4 flex flex-wrap gap-2 overflow-hidden"
          >
            {mainLinks.map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  clsx(
                    'text-xs px-3 py-1.5 rounded-full border',
                    isActive ? 'bg-teal-500/20 border-teal-500/40 text-teal-500' : 'border-[var(--border)]'
                  )
                }
              >
                {label}
              </NavLink>
            ))}
            {extraLinks.map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  clsx(
                    'text-xs px-3 py-1.5 rounded-full border border-dashed opacity-80',
                    isActive ? 'bg-teal-500/20 border-teal-500/40 text-teal-500' : 'border-[var(--border)]'
                  )
                }
              >
                {label}
              </NavLink>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
