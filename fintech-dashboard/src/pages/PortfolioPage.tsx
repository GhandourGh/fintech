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
  Legend,
} from 'recharts';
import { CHART, CHART_MARGIN, tooltipStyle } from '../components/charts/chartTheme';

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
        <div className="w-full min-h-[380px]">
        <ResponsiveContainer width="100%" height={380}>
          <ScatterChart margin={CHART_MARGIN.scatter}>
            <XAxis
              type="number"
              dataKey="score"
              name="Score"
              tick={{ fill: CHART.text, fontSize: 11 }}
              domain={[0, 100]}
              label={{ value: 'Credit Score', position: 'insideBottom', offset: -6, fill: CHART.text, fontSize: 11 }}
            />
            <YAxis
              type="number"
              dataKey="pd"
              name="PD %"
              tick={{ fill: CHART.text, fontSize: 11 }}
              unit="%"
              width={44}
              label={{ value: 'PD (%)', angle: -90, position: 'insideLeft', fill: CHART.text, fontSize: 11, dx: 12 }}
            />
            <ZAxis range={[80, 400]} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ strokeDasharray: '3 3' }} formatter={(v, name) => [name === 'PD %' ? `${Number(v).toFixed(2)}%` : v, name]} />
            <Legend verticalAlign="top" height={28} wrapperStyle={{ paddingBottom: 4 }} />
            <ReferenceLine
              x={PROJECT_META.optimalThreshold}
              stroke={CHART.high}
              strokeDasharray="4 4"
              label={{ value: `KS ${PROJECT_META.optimalThreshold}`, position: 'insideTop', fill: CHART.high, fontSize: 10 }}
            />
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
        </div>
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
