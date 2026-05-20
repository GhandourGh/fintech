import { PageHeader } from '../components/ui/PageHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { SectionHeading } from '../components/ui/SectionHeading';
import { PORTFOLIO_CLIENTS, PROJECT_META } from '../data/projectData';
import { PORTFOLIO_SUMMARY } from '../data/portfolioMetrics';
import { fmtCurrency, fmtPct } from '../utils/format';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { CHART, tooltipStyle } from '../components/charts/chartTheme';
import clsx from 'clsx';

export function DecisionsPage() {
  const decisionData = [
    { name: 'Accepted', count: PORTFOLIO_SUMMARY.accepted, color: CHART.low },
    { name: 'Rejected', count: PORTFOLIO_SUMMARY.rejected, color: CHART.high },
  ];

  const scoreData = [...PORTFOLIO_CLIENTS].sort((a, b) => b.score - a.score).map((c) => ({
    id: `C${c.id}`,
    score: c.score,
    fill: c.decision === 'Accepted' ? CHART.low : CHART.high,
  }));

  return (
    <div>
      <PageHeader
        badge="Section 8 — Portfolio Selection"
        title="Accepted vs Rejected Clients"
        subtitle={`Accept if Score ≥ ${PROJECT_META.optimalThreshold}. ${PORTFOLIO_SUMMARY.accepted} accepted, ${PORTFOLIO_SUMMARY.rejected} rejected from 20 portfolio applicants.`}
        infoId="page.decisions"
      />
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <GlassCard>
          <SectionHeading title="Decision Breakdown" infoId="section.decisionBreakdown" />
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={decisionData}>
              <XAxis dataKey="name" tick={{ fill: CHART.text }} />
              <YAxis tick={{ fill: CHART.text }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {decisionData.map((d) => (
                  <Cell key={d.name} fill={d.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
        <GlassCard delay={0.1}>
          <SectionHeading title="Client Scores vs Threshold" infoId="section.scoresThreshold" />
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={scoreData} margin={{ bottom: 40 }}>
              <XAxis dataKey="id" tick={{ fill: CHART.text, fontSize: 9 }} angle={-45} textAnchor="end" height={50} />
              <YAxis domain={[0, 100]} tick={{ fill: CHART.text }} />
              <Tooltip contentStyle={tooltipStyle} />
              <ReferenceLine y={PROJECT_META.optimalThreshold} stroke={CHART.high} strokeDasharray="4 4" />
              <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                {scoreData.map((d) => (
                  <Cell key={d.id} fill={d.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
      <GlassCard>
        <SectionHeading title="Portfolio results table" infoId="section.portfolioTable" className="mb-2" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[var(--text-muted)] border-b border-[var(--border)]">
                <th className="py-3 pr-4">ID</th>
                <th className="py-3 pr-4">Score</th>
                <th className="py-3 pr-4">PD</th>
                <th className="py-3 pr-4">Decision</th>
                <th className="py-3 pr-4">Risk Band</th>
                <th className="py-3">Expected Loss</th>
              </tr>
            </thead>
            <tbody>
              {PORTFOLIO_CLIENTS.map((c) => (
                <tr key={c.id} className="border-b border-[var(--border)]/40 hover:bg-teal-500/5 transition-colors">
                  <td className="py-3 font-mono">{c.id}</td>
                  <td className="py-3 font-mono font-semibold">{c.score.toFixed(2)}</td>
                  <td className="py-3">{fmtPct(c.pd)}</td>
                  <td className="py-3">
                    <span
                      className={clsx(
                        'px-2.5 py-1 rounded-full text-xs font-medium',
                        c.decision === 'Accepted' ? 'bg-emerald-500/15 text-emerald-500' : 'bg-red-500/15 text-red-500'
                      )}
                    >
                      {c.decision}
                    </span>
                  </td>
                  <td className="py-3 text-[var(--text-secondary)]">{c.riskBand}</td>
                  <td className="py-3 font-mono">{fmtCurrency(c.expectedLoss)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
