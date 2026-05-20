import { PageHeader } from '../components/ui/PageHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { SectionHeading } from '../components/ui/SectionHeading';
import { InfoTip } from '../components/ui/InfoTip';
import { PORTFOLIO_CLIENTS, PROJECT_META } from '../data/projectData';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ZAxis,
} from 'recharts';
import { CHART, tooltipStyle } from '../components/charts/chartTheme';

const scatter = PORTFOLIO_CLIENTS.map((c) => ({
  score: c.score,
  pd: c.pd * 100,
  id: c.id,
  decision: c.decision,
}));

export function PortfolioPage() {
  return (
    <div>
      <PageHeader
        badge="Section 7 — Portfolio Scoring"
        title="Portfolio Risk Analysis"
        subtitle="Final production scorecard applied to ActualPortfolioData. Each client receives score, PD_Model, risk band, and decision."
        infoId="page.portfolio"
      />
      <GlassCard>
        <SectionHeading title="Score vs Probability of Default" infoId="section.scoreVsPd" />
        <ResponsiveContainer width="100%" height={360}>
          <ScatterChart margin={{ bottom: 20 }}>
            <XAxis type="number" dataKey="score" name="Score" tick={{ fill: CHART.text, fontSize: 11 }} domain={[0, 100]} />
            <YAxis type="number" dataKey="pd" name="PD %" tick={{ fill: CHART.text, fontSize: 11 }} />
            <ZAxis range={[80, 400]} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ strokeDasharray: '3 3' }} />
            <ReferenceLine x={PROJECT_META.optimalThreshold} stroke={CHART.high} strokeDasharray="4 4" label={{ value: 'Threshold', fill: CHART.high, fontSize: 11 }} />
            <Scatter
              name="Accepted"
              data={scatter.filter((d) => d.decision === 'Accepted')}
              fill={CHART.low}
            />
            <Scatter
              name="Rejected"
              data={scatter.filter((d) => d.decision === 'Rejected')}
              fill={CHART.high}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </GlassCard>
      <div className="flex items-center gap-2 mt-6 mb-3">
        <h3 className="font-display font-semibold text-lg">Risk band segmentation</h3>
        <InfoTip id="section.riskBands" />
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {['Low Risk', 'Medium Risk', 'High Risk'].map((band) => {
          const count = PORTFOLIO_CLIENTS.filter((c) => c.riskBand === band).length;
          const color = band.includes('Low') ? CHART.low : band.includes('Medium') ? CHART.med : CHART.high;
          return (
            <GlassCard key={band} hover={false}>
              <p className="text-sm text-[var(--text-muted)]">{band}</p>
              <p className="font-display text-4xl font-bold mt-2" style={{ color }}>
                {count}
              </p>
              <p className="text-xs text-[var(--text-secondary)] mt-1">clients</p>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
