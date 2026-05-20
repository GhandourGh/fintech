import { PageHeader } from '../components/ui/PageHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { SectionHeading } from '../components/ui/SectionHeading';
import { VALIDATION, HISTORICAL, PORTFOLIO_CLIENTS } from '../data/projectData';
import { PORTFOLIO_SUMMARY } from '../data/portfolioMetrics';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, Tooltip, Cell,
} from 'recharts';
import { CHART, CHART_MARGIN, tooltipStyle } from '../components/charts/chartTheme';

const decisionData = [
  { name: 'Accepted', count: PORTFOLIO_SUMMARY.accepted, color: CHART.low },
  { name: 'Rejected', count: PORTFOLIO_SUMMARY.rejected, color: CHART.high },
];

const riskBandData = (['Low Risk', 'Medium Risk', 'High Risk'] as const).map((band) => ({
  band,
  count: PORTFOLIO_CLIENTS.filter((c) => c.riskBand === band).length,
  color: band === 'Low Risk' ? CHART.low : band === 'Medium Risk' ? CHART.med : CHART.high,
}));

const radarData = [
  { metric: 'AUC', value: VALIDATION.auc * 100, fullMark: 100 },
  { metric: 'KS', value: VALIDATION.ksStatistic * 100, fullMark: 100 },
  { metric: 'Acc. Ratio', value: VALIDATION.accuracyRatio * 100, fullMark: 100 },
];

export function PerformancePage() {
  return (
    <div>
      <PageHeader
        badge="Model Summary"
        title="Model Performance Summary"
        subtitle="Consolidated validation metrics and portfolio outcomes from the MATLAB credit scorecard pipeline."
        infoId="page.performance"
      />
      <div className="grid lg:grid-cols-2 gap-6">
        <GlassCard>
          <SectionHeading title="Validation Radar" infoId="section.validationRadar" />
          <div className="w-full min-h-[300px]">
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="72%">
              <PolarGrid stroke={CHART.grid} />
              <PolarAngleAxis dataKey="metric" tick={{ fill: CHART.text, fontSize: 10 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: CHART.text, fontSize: 9 }} tickCount={5} />
              <Radar name="Validation %" dataKey="value" stroke={CHART.teal} fill={CHART.teal} fillOpacity={0.35} />
              <Legend wrapperStyle={{ paddingTop: 12 }} />
            </RadarChart>
          </ResponsiveContainer>
          </div>
        </GlassCard>
        <GlassCard delay={0.1}>
          <SectionHeading title="Project Outcomes" infoId="section.projectOutcomes" />
          <ul className="space-y-4 text-sm">
            {[
              ['Historical observations', HISTORICAL.count],
              ['Default rate (historical)', `${(HISTORICAL.defaultRate * 100).toFixed(1)}%`],
              ['AUC (HistoricalData)', VALIDATION.auc],
              ['Portfolio accepted', `${PORTFOLIO_SUMMARY.accepted} / ${PORTFOLIO_SUMMARY.totalClients}`],
              ['Acceptance rate', `${((PORTFOLIO_SUMMARY.accepted / PORTFOLIO_SUMMARY.totalClients) * 100).toFixed(0)}%`],
              ['Accepted avg PD', `${(PORTFOLIO_SUMMARY.acceptedAvgPd * 100).toFixed(2)}%`],
            ].map(([k, v]) => (
              <li key={k} className="flex justify-between border-b border-[var(--border)] pb-3">
                <span className="text-[var(--text-secondary)]">{k}</span>
                <span className="font-mono font-medium">{v}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-[var(--text-muted)] leading-relaxed">
            Validation on all 500 historical clients (fintech.pdf Table 13): AUC {VALIDATION.auc}, KS {VALIDATION.ksStatistic}, optimal cutoff {VALIDATION.ksOptimalScore}. Portfolio: {PORTFOLIO_SUMMARY.accepted} accepted, total EL ${PORTFOLIO_SUMMARY.acceptedExpectedLoss.toLocaleString('en-US', { minimumFractionDigits: 2 })}.
          </p>
        </GlassCard>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        <GlassCard delay={0.2}>
          <SectionHeading title="Portfolio Accept / Reject Breakdown" infoId="section.projectOutcomes" />
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={decisionData}>
              <XAxis dataKey="name" tick={{ fill: CHART.text, fontSize: 12 }} />
              <YAxis tick={{ fill: CHART.text, fontSize: 11 }} domain={[0, 20]} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [v, 'Clients']} />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {decisionData.map((d) => (
                  <Cell key={d.name} fill={d.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard delay={0.25}>
          <SectionHeading title="Risk Band Distribution (All 20 Clients)" infoId="section.projectOutcomes" />
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={riskBandData} margin={CHART_MARGIN.bottomLabel}>
              <XAxis dataKey="band" tick={{ fill: CHART.text, fontSize: 10 }} interval={0} />
              <YAxis tick={{ fill: CHART.text, fontSize: 11 }} domain={[0, 12]} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [v, 'Clients']} />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {riskBandData.map((d) => (
                  <Cell key={d.band} fill={d.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </div>
  );
}
