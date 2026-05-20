import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Database,
  Target,
  TrendingUp,
  Users,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { MetricCard } from '../components/ui/MetricCard';
import { GlassCard } from '../components/ui/GlassCard';
import { SectionHeading } from '../components/ui/SectionHeading';
import { InfoTip } from '../components/ui/InfoTip';
import type { HelpId } from '../data/helpContent';
import {
  PROJECT_META,
  HISTORICAL,
  VALIDATION,
  METHODOLOGY_STEPS,
} from '../data/projectData';
import { PORTFOLIO_SUMMARY } from '../data/portfolioMetrics';
import { fmtCurrency, fmtPct } from '../utils/format';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { CHART, tooltipStyle } from '../components/charts/chartTheme';

const defaultPie = [
  { name: 'Good', value: HISTORICAL.goodCount, color: CHART.low },
  { name: 'Bad', value: HISTORICAL.badCount, color: CHART.high },
];

export function OverviewPage() {
  return (
    <div>
      <PageHeader
        badge="Executive Dashboard"
        title="Credit Risk Scorecard Platform"
        subtitle={`${PROJECT_META.title} — MATLAB-based scorecard modeling, default prediction, expected loss, and risk-based pricing for portfolio optimization.`}
        infoId="page.overview"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <MetricCard delay={0} icon={Database} label="Historical Records" value="500" sub="Training & validation dataset" accent="teal" infoId="metric.historicalRecords" />
        <MetricCard delay={0.05} icon={Target} label="AUC" value={VALIDATION.auc.toFixed(4)} sub="validatemodel · HistoricalData (n=500)" accent="gold" infoId="metric.testAuc" />
        <MetricCard delay={0.1} icon={Users} label="Portfolio Clients" value="20" sub={`${PORTFOLIO_SUMMARY.accepted} accepted · ${PORTFOLIO_SUMMARY.rejected} rejected`} accent="teal" infoId="metric.portfolioClients" />
        <MetricCard delay={0.15} icon={TrendingUp} label="Accepted Exposure" value={fmtCurrency(PORTFOLIO_SUMMARY.acceptedExposure)} sub={`EL: ${fmtCurrency(PORTFOLIO_SUMMARY.acceptedExpectedLoss)}`} accent="gold" infoId="metric.acceptedExposure" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid lg:grid-cols-3 gap-6 mb-8"
      >
        <GlassCard className="lg:col-span-2">
          <SectionHeading title="Default Distribution — Historical Data" infoId="section.defaultDistribution" />
          <div className="min-h-64 flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            <ResponsiveContainer width="100%" height={200} className="sm:!w-1/2 sm:!h-full sm:min-h-[256px]">
              <PieChart>
                <Pie data={defaultPie} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                  {defaultPie.map((e) => (
                    <Cell key={e.name} fill={e.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-4 w-full sm:w-auto text-center sm:text-left">
              <motion.div whileHover={{ x: 4 }}>
                <p className="text-3xl font-display font-bold text-[var(--text-primary)]">{fmtPct(HISTORICAL.defaultRate)}</p>
                <p className="text-sm text-[var(--text-secondary)]">Portfolio default rate</p>
              </motion.div>
              <motion.div className="flex gap-6">
                <div>
                  <p className="font-mono text-xl text-emerald-500">{HISTORICAL.goodCount}</p>
                  <p className="text-xs text-[var(--text-muted)]">Good (0)</p>
                </div>
                <div>
                  <p className="font-mono text-xl text-red-500">{HISTORICAL.badCount}</p>
                  <p className="text-xs text-[var(--text-muted)]">Bad (1)</p>
                </div>
              </motion.div>
            </div>
          </div>
        </GlassCard>

        <GlassCard delay={0.1}>
          <SectionHeading title="Key Parameters" infoId="section.keyParameters" />
          <dl className="space-y-3 text-sm">
            {[
              ['Loan amount', fmtCurrency(PROJECT_META.loanAmount)],
              ['Recovery rate', fmtPct(PROJECT_META.recoveryRate)],
              ['LGD', fmtPct(PROJECT_META.lgd)],
              ['KS optimal cutoff', PROJECT_META.optimalThreshold.toFixed(4)],
              ['Pricing formula', 'rmin = PD × LGD'],
              ['Score range', '0 – 100'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-[var(--border)] pb-2 last:border-0">
                <dt className="text-[var(--text-muted)]">{k}</dt>
                <dd className="font-mono font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </GlassCard>
      </motion.div>

      <GlassCard delay={0.15} className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <Layers className="text-teal-500" size={20} />
          <h3 className="font-display font-semibold text-lg flex-1">MATLAB Workflow Pipeline</h3>
          <InfoTip id="section.workflow" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {METHODOLOGY_STEPS.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 + i * 0.04 }}
              className="relative p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)]/50 hover:border-teal-500/40 transition-colors"
            >
              <div className="flex items-center justify-between gap-1">
                <span className="font-mono text-xs text-teal-500">STEP {s.step}</span>
                <InfoTip id={`step.${s.step}` as HelpId} size="sm" />
              </div>
              <p className="font-semibold text-sm mt-1 text-[var(--text-primary)]">{s.title}</p>
              <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      <div className="grid sm:grid-cols-2 gap-6 mb-6">
        <GlassCard delay={0.2}>
          <SectionHeading title="Default Rate by Income Band" infoId="section.incomeDefault" />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={Object.entries(HISTORICAL.incomeDefaultRate).map(([band, rate]) => ({
                band,
                rate: rate * 100,
              }))}
            >
              <XAxis dataKey="band" tick={{ fill: CHART.text, fontSize: 11 }} />
              <YAxis tick={{ fill: CHART.text, fontSize: 11 }} unit="%" domain={[0, 65]} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${Number(v).toFixed(1)}%`, 'Default rate']} />
              <Bar dataKey="rate" fill={CHART.teal} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard delay={0.25}>
          <SectionHeading title="Default Rate by Age Group" infoId="section.incomeDefault" />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={Object.entries(HISTORICAL.ageDefaultRate).map(([band, rate]) => ({
                band,
                rate: rate * 100,
              }))}
            >
              <XAxis dataKey="band" tick={{ fill: CHART.text, fontSize: 11 }} />
              <YAxis tick={{ fill: CHART.text, fontSize: 11 }} unit="%" domain={[0, 65]} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${Number(v).toFixed(1)}%`, 'Default rate']} />
              <Bar dataKey="rate" fill={CHART.gold} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard delay={0.3}>
          <SectionHeading title="Default Rate by Residential Status" infoId="section.incomeDefault" />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={Object.entries(HISTORICAL.residentialDefaultRate).map(([band, rate]) => ({
                band,
                rate: rate * 100,
              }))}
            >
              <XAxis dataKey="band" tick={{ fill: CHART.text, fontSize: 11 }} />
              <YAxis tick={{ fill: CHART.text, fontSize: 11 }} unit="%" domain={[0, 55]} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${Number(v).toFixed(1)}%`, 'Default rate']} />
              <Bar dataKey="rate" fill={CHART.low} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard delay={0.35}>
          <SectionHeading title="Default Rate by Employment Status" infoId="section.incomeDefault" />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={Object.entries(HISTORICAL.employmentDefaultRate).map(([band, rate]) => ({
                band,
                rate: rate * 100,
              }))}
            >
              <XAxis dataKey="band" tick={{ fill: CHART.text, fontSize: 11 }} />
              <YAxis tick={{ fill: CHART.text, fontSize: 11 }} unit="%" domain={[0, 55]} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${Number(v).toFixed(1)}%`, 'Default rate']} />
              <Bar dataKey="rate" fill={CHART.high} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      <motion.div
        className="mt-8 flex flex-wrap gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {[
          ['/test', 'Live Client Test'],
          ['/scorecard', 'View Scorecard'],
          ['/validation', 'ROC Validation'],
          ['/final', 'Final Portfolio'],
        ].map(([to, label]) => (
          <Link
            key={to}
            to={to}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 text-white font-medium text-sm hover:bg-teal-600 transition-colors shadow-lg shadow-teal-500/25"
          >
            {label}
            <ArrowRight size={16} />
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
