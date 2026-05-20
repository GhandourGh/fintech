import { NavLink, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, FileSpreadsheet, Terminal, Shield } from 'lucide-react';
import clsx from 'clsx';
import { useTheme } from '../../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const TABS = [
  { to: '/outputs/matlab', icon: Terminal, label: 'MATLAB Script' },
  { to: '/outputs/excel', icon: FileSpreadsheet, label: 'Excel Data' },
];

export function OutputsLayout() {
  const { theme, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]" style={{ backgroundImage: 'var(--gradient-mesh)' }}>
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg-secondary)]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <NavLink
              to="/"
              className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-teal-500 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to RiskLens
            </NavLink>
            <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-[var(--border)]">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
                <Shield className="text-white" size={16} />
              </div>
              <div>
                <p className="font-display font-bold text-sm text-[var(--text-primary)]">Source Charts</p>
                <p className="text-[10px] text-[var(--text-muted)]">MATLAB & Excel outputs</p>
              </div>
            </div>
          </div>
          <nav className="flex items-center gap-1 p-1 rounded-xl bg-[var(--bg-primary)] border border-[var(--border)]">
            {TABS.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-teal-500/15 text-teal-500'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  )
                }
              >
                <Icon size={16} />
                {label}
              </NavLink>
            ))}
          </nav>
          <button
            type="button"
            onClick={toggle}
            className="p-2 rounded-lg border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-16"
      >
        <Outlet />
      </motion.main>
    </div>
  );
}
