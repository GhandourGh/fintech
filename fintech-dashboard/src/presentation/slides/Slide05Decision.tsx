import { motion } from 'framer-motion';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { SlideShell } from '../components/SlideShell';
import { AnimatedKpi } from '../components/AnimatedKpi';
import { DemoBadge } from '../components/DemoBadge';
import { PORTFOLIO_SUMMARY } from '../../data/portfolioMetrics';
import { fmtCurrency } from '../../utils/format';
import { tooltipStyle } from '../../components/charts/chartTheme';

const RISK_BANDS = [
  { name: 'Low Risk', count: 5, desc: 'Score > 80', color: '#10b981' },
  { name: 'Medium Risk', count: 9, desc: '50 ≤ Score ≤ 80', color: '#f59e0b' },
  { name: 'High Risk', count: 6, desc: 'Score < 50 · all rejected', color: '#ef4444' },
];

const PIE_DATA = [
  { name: 'Accepted', value: PORTFOLIO_SUMMARY.accepted, color: '#10b981' },
  { name: 'Rejected', value: PORTFOLIO_SUMMARY.rejected, color: '#ef4444' },
];

export function Slide05Decision() {
  return (
    <SlideShell
      kicker="05 · Decision"
      title="Portfolio Accept / Reject"
      presenter="Maroun Mashaalany"
    >
      <div className="flex flex-col h-full gap-4">
        <p className="text-sm lg:text-base text-[var(--text-secondary)] max-w-4xl">
          Rule applied: <span className="font-mono text-[var(--text-primary)]">Accept if Score ≥ 48.2032</span> — systematic, evidence-based, defensible.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedKpi
            label="Accepted"
            value={PORTFOLIO_SUMMARY.accepted}
            sub="out of 20 applicants"
            accent="green"
            delay={0.15}
          />
          <AnimatedKpi
            label="Rejected"
            value={PORTFOLIO_SUMMARY.rejected}
            sub="highest-risk profiles"
            accent="red"
            delay={0.25}
          />
          <AnimatedKpi
            label="Exposure"
            value={PORTFOLIO_SUMMARY.acceptedExposure / 1_000_000}
            formatter={(n) => `$${n.toFixed(1)}M`}
            display={fmtCurrency(PORTFOLIO_SUMMARY.acceptedExposure)}
            sub="total accepted EAD"
            accent="teal"
            delay={0.35}
          />
          <AnimatedKpi
            label="Average PD"
            value={PORTFOLIO_SUMMARY.acceptedAvgPd * 100}
            formatter={(n) => `${n.toFixed(2)}%`}
            sub="of accepted portfolio"
            accent="gold"
            delay={0.45}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 flex-1 min-h-0">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="lg:col-span-2 rounded-xl bg-[var(--bg-glass)] backdrop-blur-md border border-[var(--border)] p-5 flex flex-col items-center justify-center min-h-[200px]"
          >
            <p className="text-[11px] uppercase tracking-[0.3em] text-teal-400 font-medium mb-2 self-start">
              Decision Split
            </p>
            <div className="w-full flex-1 min-h-[170px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={PIE_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius="58%"
                    outerRadius="85%"
                    paddingAngle={3}
                    dataKey="value"
                    isAnimationActive
                    animationDuration={1200}
                    animationBegin={700}
                  >
                    {PIE_DATA.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="font-display text-4xl lg:text-5xl font-bold text-[var(--text-primary)] tabular-nums leading-none">
                  70<span className="text-teal-400">%</span>
                </p>
                <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-[0.2em] mt-1">
                  acceptance rate
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="lg:col-span-3 rounded-xl bg-[var(--bg-glass)] backdrop-blur-md border border-[var(--border)] p-5 lg:p-6 flex flex-col"
          >
            <p className="text-[11px] uppercase tracking-[0.3em] text-teal-400 font-medium mb-3">
              Risk Band Distribution
            </p>
            <div className="flex flex-col gap-3 flex-1 justify-around">
              {RISK_BANDS.map((band, i) => (
                <motion.div
                  key={band.name}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.85 + i * 0.12 }}
                >
                  <div className="flex items-baseline justify-between mb-1">
                    <div className="flex items-baseline gap-2.5">
                      <span
                        className="font-display text-xl lg:text-2xl font-bold tabular-nums"
                        style={{ color: band.color }}
                      >
                        {band.count}
                      </span>
                      <span className="font-display text-sm lg:text-base font-semibold text-[var(--text-primary)]">
                        {band.name}
                      </span>
                    </div>
                    <span className="text-[11px] lg:text-xs text-[var(--text-muted)] font-mono">
                      {band.desc}
                    </span>
                  </div>
                  <div className="h-2.5 lg:h-3 rounded-full overflow-hidden bg-[var(--border)]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(band.count / 20) * 100}%` }}
                      transition={{ duration: 1, delay: 1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${band.color}, ${band.color}aa)`,
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="flex justify-end">
          <DemoBadge label="Demo: Portfolio Risk + Accept/Reject" path="/portfolio" delay={1.4} />
        </div>
      </div>
    </SlideShell>
  );
}
