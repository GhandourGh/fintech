import { PageHeader } from '../components/ui/PageHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { SectionHeading } from '../components/ui/SectionHeading';
import { SCORECARD_POINTS } from '../data/projectData';
import type { HelpId } from '../data/helpContent';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CHART, tooltipStyle } from '../components/charts/chartTheme';

const byPredictor = ['Age', 'Income', 'ResidentialStatus', 'EmploymentStatus'] as const;

const PREDICTOR_INFO: Record<(typeof byPredictor)[number], HelpId> = {
  Age: 'predictor.age',
  Income: 'predictor.income',
  ResidentialStatus: 'predictor.residential',
  EmploymentStatus: 'predictor.employment',
};

export function ScorecardPage() {
  return (
    <div>
      <PageHeader
        badge="Section 5 — Logistic Scorecard"
        title="Credit Scorecard Analytics"
        subtitle="Final scaled scorecard points (0–100 scale) from MATLAB displaypoints() and formatpoints(). Higher points indicate lower credit risk."
        infoId="page.scorecard"
      />
      <div className="grid lg:grid-cols-2 gap-6">
        {byPredictor.map((pred, idx) => {
          const rows = SCORECARD_POINTS.filter((r) => r.predictor === pred);
          return (
            <GlassCard key={pred} delay={idx * 0.08}>
              <SectionHeading title={pred} infoId={PREDICTOR_INFO[pred]} />
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={rows} layout="vertical" margin={{ left: 80 }}>
                  <XAxis type="number" tick={{ fill: CHART.text, fontSize: 10 }} />
                  <YAxis type="category" dataKey="bin" width={75} tick={{ fill: CHART.text, fontSize: 10 }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="points" radius={[0, 4, 4, 0]}>
                    {rows.map((r) => (
                      <Cell key={r.bin} fill={r.points >= 0 ? CHART.low : CHART.high} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <table className="w-full mt-4 text-xs">
                <thead>
                  <tr className="text-[var(--text-muted)] border-b border-[var(--border)]">
                    <th className="text-left py-2">Bin</th>
                    <th className="text-right py-2">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.bin} className="border-b border-[var(--border)]/50">
                      <td className="py-2 font-mono">{r.bin}</td>
                      <td className={`py-2 text-right font-mono ${r.points >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                        {r.points.toFixed(4)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
