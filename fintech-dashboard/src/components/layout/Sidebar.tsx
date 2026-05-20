import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, CreditCard, BarChart3, LineChart, Briefcase, UserCheck,
  DollarSign, Percent, Search, Award, CheckCircle2, Moon, Sun, Shield, FlaskConical,
} from 'lucide-react';
import clsx from 'clsx';
import { useTheme } from '../../context/ThemeContext';
import { PROJECT_META } from '../../data/projectData';

const NAV = [
  { to: '/', icon: LayoutDashboard, label: 'Overview' },
  { to: '/scorecard', icon: CreditCard, label: 'Scorecard' },
  { to: '/woe', icon: BarChart3, label: 'WOE & Binning' },
  { to: '/validation', icon: LineChart, label: 'ROC & Validation' },
  { to: '/portfolio', icon: Briefcase, label: 'Portfolio Risk' },
  { to: '/decisions', icon: UserCheck, label: 'Accept / Reject' },
  { to: '/expected-loss', icon: DollarSign, label: 'Expected Loss' },
  { to: '/pricing', icon: Percent, label: 'Risk Pricing' },
  { to: '/explorer', icon: Search, label: 'Client Explorer' },
  { to: '/test', icon: FlaskConical, label: 'Live Client Test' },
  { to: '/performance', icon: Award, label: 'Model Performance' },
  { to: '/final', icon: CheckCircle2, label: 'Final Decision' },
];

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
            <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mt-0.5">Credit Analytics</p>
          </div>
        </motion.div>
      </motion.div>
      <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
        {NAV.map(({ to, icon: Icon, label }, i) => (
          <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => clsx(
            'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
            isActive ? 'bg-teal-500/15 text-teal-500 border border-teal-500/25 shadow-sm' : 'text-[var(--text-secondary)] hover:bg-[var(--border)] hover:text-[var(--text-primary)]'
          )}>
            <motion.span initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
              <Icon size={18} />
            </motion.span>
            {label}
          </NavLink>
        ))}
      </nav>
      <motion.div className="p-4 border-t border-[var(--border)] space-y-3">
        <button type="button" onClick={toggle} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[var(--border)] text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-teal-500/30 transition-colors" aria-label="Toggle theme">
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          {theme === 'dark' ? 'Light mode' : 'Dark mode'}
        </button>
        <p className="text-[10px] text-center text-[var(--text-muted)] leading-relaxed">{PROJECT_META.institution}</p>
      </motion.div>
    </aside>
  );
}
