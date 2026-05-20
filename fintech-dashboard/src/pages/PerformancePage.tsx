import { PageHeader } from '../components/ui/PageHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { SectionHeading } from '../components/ui/SectionHeading';
import { VALIDATION, HISTORICAL, PORTFOLIO_SUMMARY } from '../data/projectData';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts';
import { CHART } from '../components/charts/chartTheme';

const radarData = [
  { metric: 'AUC', value: VALIDATION.auc * 100, fullMark: 100 },
  { metric: 'Accuracy', value: VALIDATION.accuracy * 100, fullMark: 100 },
  { metric: 'Precision', value: VALIDATION.precision * 100, fullMark: 100 },
  { metric: 'Recall', value: VALIDATION.recall * 100, fullMark: 100 },
  { metric: 'F1', value: VALIDATION.f1Score * 100, fullMark: 100 },
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
          <ResponsiveContainer width="100%" height={320}>
            <RadarChart data={radarData}>
              <PolarGrid stroke={CHART.grid} />
              <PolarAngleAxis dataKey="metric" tick={{ fill: CHART.text, fontSize: 11 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: CHART.text, fontSize: 9 }} />
              <Radar name="Test metrics %" dataKey="value" stroke={CHART.teal} fill={CHART.teal} fillOpacity={0.35} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </GlassCard>
        <GlassCard delay={0.1}>
          <SectionHeading title="Project Outcomes" infoId="section.projectOutcomes" />
          <ul className="space-y-4 text-sm">
            {[
              ['Historical observations', HISTORICAL.count],
              ['Default rate (historical)', `${(HISTORICAL.defaultRate * 100).toFixed(1)}%`],
              ['Test AUC', VALIDATION.auc],
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
            The model is presented for academic demonstration of the full scorecard methodology. AUC of 0.5636 indicates room for improvement with additional variables and validation.
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
