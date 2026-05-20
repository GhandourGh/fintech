import { motion } from 'framer-motion';
import { PageHeader } from '../components/ui/PageHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { InfoTip } from '../components/ui/InfoTip';
import { PROJECT_META, PORTFOLIO_CLIENTS } from '../data/projectData';
import { PORTFOLIO_SUMMARY } from '../data/portfolioMetrics';
import { fmtCurrency, fmtPct } from '../utils/format';
import { CheckCircle2, XCircle } from 'lucide-react';

export function FinalPage() {
  const accepted = PORTFOLIO_CLIENTS.filter((c) => c.decision === 'Accepted');
  const rejected = PORTFOLIO_CLIENTS.filter((c) => c.decision === 'Rejected');

  return (
    <div>
      <PageHeader
        badge="Final Portfolio Decision"
        title="Optimal Portfolio Selection"
        subtitle="Production scorecard decision screen — accepted clients only enter the bank's optimized credit portfolio."
        infoId="page.final"
      />
      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative overflow-hidden rounded-3xl border border-teal-500/30 bg-gradient-to-br from-teal-500/10 via-transparent to-amber-500/5 p-8 md:p-12 mb-8"
      >
        <div className="absolute top-6 right-6 z-10">
          <InfoTip id="section.portfolioApproved" size="md" />
        </div>
        <p className="text-sm uppercase tracking-widest text-teal-500 font-medium">Portfolio Approved</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 text-[var(--text-primary)]">
          {PORTFOLIO_SUMMARY.accepted} Clients · {fmtCurrency(PORTFOLIO_SUMMARY.acceptedExposure)}
        </h2>
        <p className="text-[var(--text-secondary)] mt-4 max-w-xl">
          Threshold score ≥ {PROJECT_META.optimalThreshold}. Total expected loss {fmtCurrency(PORTFOLIO_SUMMARY.acceptedExpectedLoss)} at {fmtPct(PROJECT_META.recoveryRate)} recovery.
        </p>
        <div className="grid sm:grid-cols-3 gap-6 mt-8">
          {[
            ['Avg PD', fmtPct(PORTFOLIO_SUMMARY.acceptedAvgPd)],
            ['Avg Min Rate', `${PORTFOLIO_SUMMARY.acceptedAvgRate.toFixed(2)}%`],
            ['Rejected', String(PORTFOLIO_SUMMARY.rejected)],
          ].map(([l, v]) => (
            <div key={l}>
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">{l}</p>
              <p className="font-display text-2xl font-bold mt-1">{v}</p>
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <div className="flex items-center gap-2 mb-4 text-emerald-500">
            <CheckCircle2 size={20} />
            <h3 className="font-display font-semibold flex-1">Accepted ({accepted.length})</h3>
            <InfoTip id="section.acceptedList" />
          </div>
          <ul className="space-y-2 max-h-80 overflow-y-auto text-sm font-mono">
            {accepted.map((c) => (
              <li key={c.id} className="flex justify-between py-2 border-b border-[var(--border)]/50">
                <span>#{c.id}</span>
                <span>{c.score.toFixed(1)}</span>
                <span className="text-emerald-500">{fmtPct(c.pd)}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
        <GlassCard delay={0.1}>
          <div className="flex items-center gap-2 mb-4 text-red-500">
            <XCircle size={20} />
            <h3 className="font-display font-semibold flex-1">Rejected ({rejected.length})</h3>
            <InfoTip id="section.rejectedList" />
          </div>
          <ul className="space-y-2 max-h-80 overflow-y-auto text-sm font-mono">
            {rejected.map((c) => (
              <li key={c.id} className="flex justify-between py-2 border-b border-[var(--border)]/50">
                <span>#{c.id}</span>
                <span>{c.score.toFixed(1)}</span>
                <span className="text-red-500">{fmtPct(c.pd)}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </motion.div>
      <p className="text-center text-xs text-[var(--text-muted)] mt-10">
        {PROJECT_META.institution} · {PROJECT_META.year} · {PROJECT_META.software}
      </p>
    </div>
  );
}
