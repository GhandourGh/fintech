import { motion } from 'framer-motion';
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { SlideShell } from '../components/SlideShell';
import { DemoBadge } from '../components/DemoBadge';
import { AnimatedKpi } from '../components/AnimatedKpi';
import { VALIDATION } from '../../data/projectData';
import { CHART, tooltipStyle } from '../../components/charts/chartTheme';

const STEPS = ['Binning', 'WOE', 'Logistic', 'Score 0–100', 'ROC'];

const IV_DATA = [
  { name: 'Income', value: 0.2355, label: 'Strong' },
  { name: 'Age', value: 0.1879, label: 'Medium' },
  { name: 'Employment', value: 0.1143, label: 'Medium' },
  { name: 'Residential', value: 0.0417, label: 'Weak' },
];

const IV_COLORS = ['#2dd4bf', '#22d3ee', '#fbbf24', '#fb923c'];

export function Slide04Method() {
  return (
    <SlideShell
      kicker="04 · Method"
      title="Scorecard Workflow & Validation"
      presenter="Lyn Khalil"
    >
      <div className="flex flex-col h-full gap-4">
        <p className="text-sm lg:text-base text-[var(--text-secondary)] max-w-4xl">
          Five-step MATLAB pipeline turns raw client data into an interpretable 0–100 score.
        </p>

        <div className="flex flex-wrap gap-2">
          {STEPS.map((s, i) => (
            <motion.div
              key={s}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
              className="relative flex items-center gap-2"
            >
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--bg-glass)] backdrop-blur-md border border-[var(--border)]">
                <span className="inline-flex w-6 h-6 rounded-md bg-teal-500/15 text-teal-400 items-center justify-center font-display text-xs font-bold">
                  {i + 1}
                </span>
                <span className="font-display text-sm lg:text-base font-semibold text-[var(--text-primary)]">
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <span className="text-teal-400/60 font-mono text-sm">→</span>
              )}
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 flex-1 min-h-0">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="lg:col-span-3 rounded-xl bg-[var(--bg-glass)] backdrop-blur-md border border-[var(--border)] p-5 lg:p-6 flex flex-col"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-[11px] uppercase tracking-[0.3em] text-teal-400 font-medium">
                Predictor Strength · Information Value
              </p>
              <span className="text-[10px] text-[var(--text-muted)]">live · recharts</span>
            </div>
            <div className="flex-1 min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={IV_DATA}
                  layout="vertical"
                  margin={{ top: 8, right: 56, bottom: 8, left: 8 }}
                >
                  <XAxis
                    type="number"
                    domain={[0, 0.28]}
                    tick={{ fill: CHART.text, fontSize: 12 }}
                    axisLine={{ stroke: CHART.grid }}
                    tickLine={{ stroke: CHART.grid }}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    tick={{ fill: 'var(--text-primary)', fontSize: 13, fontWeight: 600 }}
                    width={100}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(v) => [typeof v === 'number' ? v.toFixed(4) : String(v), 'IV']}
                    cursor={{ fill: 'rgba(45,212,191,0.06)' }}
                  />
                  <Bar
                    dataKey="value"
                    radius={[0, 8, 8, 0]}
                    isAnimationActive
                    animationDuration={1200}
                    animationBegin={700}
                    label={{
                      position: 'right',
                      formatter: (v) => (typeof v === 'number' ? v.toFixed(4) : String(v)),
                      fill: 'var(--text-primary)',
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {IV_DATA.map((entry, i) => (
                      <Cell key={entry.name} fill={IV_COLORS[i]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <div className="lg:col-span-2 flex flex-col gap-3">
            <AnimatedKpi
              label="Area Under ROC"
              value={VALIDATION.auc}
              formatter={(n) => n.toFixed(4)}
              sub="Better than random (0.5)"
              accent="teal"
              delay={0.6}
            />
            <AnimatedKpi
              label="Kolmogorov–Smirnov"
              value={VALIDATION.ksStatistic}
              formatter={(n) => n.toFixed(4)}
              sub="Max separation good vs bad"
              accent="gold"
              delay={0.75}
            />
            <AnimatedKpi
              label="Optimal Cutoff"
              value={VALIDATION.ksOptimalScore}
              formatter={(n) => n.toFixed(2)}
              sub="Score threshold for acceptance"
              accent="green"
              delay={0.9}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <DemoBadge label="Demo: WOE & Binning + ROC" path="/woe" delay={1.05} />
        </div>
      </div>
    </SlideShell>
  );
}
