import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Moon, Sun, Shield } from 'lucide-react';
import clsx from 'clsx';
import { useTheme } from '../../context/ThemeContext';
import { PROJECT_META } from '../../data/projectData';
import { PRESENTATION_NAV, SUPPLEMENTARY_NAV } from '../../config/presentationNav';

function NavItem({
  step,
  to,
  label,
  icon: Icon,
  index,
}: {
  step: number | string;
  to: string;
  label: string;
  icon: typeof Shield;
  index: number;
}) {
  return (
    <NavLink
      key={to}
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        clsx(
          'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
          isActive
            ? 'bg-teal-500/15 text-teal-500 border border-teal-500/25 shadow-sm'
            : 'text-[var(--text-secondary)] hover:bg-[var(--border)] hover:text-[var(--text-primary)]'
        )
      }
    >
      <motion.span
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.03 }}
        className="flex items-center gap-3 min-w-0 flex-1"
      >
        <span
          className={clsx(
            'shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold font-mono',
            'bg-[var(--bg-primary)] border border-[var(--border)] text-teal-500'
          )}
          aria-hidden
        >
          {step}
        </span>
        <Icon size={18} className="shrink-0" />
        <span className="truncate">{label}</span>
      </motion.span>
    </NavLink>
  );
}

export function Sidebar() {
  const { theme, toggle } = useTheme();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 hidden lg:flex flex-col border-r border-[var(--border)] bg-[var(--bg-secondary)]/90 backdrop-blur-xl">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 border-b border-[var(--border)]">
        <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.02 }}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-lg shadow-teal-500/25">
            <Shield className="text-white" size={22} />
          </div>
          <div>
            <p className="font-display font-bold text-lg leading-none text-[var(--text-primary)]">RiskLens</p>
            <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mt-0.5">Presentation order 1–11</p>
          </div>
        </motion.div>
      </motion.div>
      <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
        <p className="px-3 pt-1 pb-2 text-[10px] uppercase tracking-widest text-[var(--text-muted)]">Follow in order</p>
        {PRESENTATION_NAV.map((item, i) => (
          <NavItem key={item.to} step={item.step} to={item.to} label={item.label} icon={item.icon} index={i} />
        ))}
        <p className="px-3 pt-4 pb-2 text-[10px] uppercase tracking-widest text-[var(--text-muted)]">Reference</p>
        {SUPPLEMENTARY_NAV.map((item, i) => (
          <NavItem
            key={item.to}
            step={item.step === 0 ? '·' : item.step}
            to={item.to}
            label={item.label}
            icon={item.icon}
            index={PRESENTATION_NAV.length + i}
          />
        ))}
      </nav>
      <motion.div className="p-4 border-t border-[var(--border)] space-y-3">
        <button
          type="button"
          onClick={toggle}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[var(--border)] text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-teal-500/30 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          {theme === 'dark' ? 'Light mode' : 'Dark mode'}
        </button>
        <p className="text-[10px] text-center text-[var(--text-muted)] leading-relaxed">{PROJECT_META.institution}</p>
      </motion.div>
    </aside>
  );
}
