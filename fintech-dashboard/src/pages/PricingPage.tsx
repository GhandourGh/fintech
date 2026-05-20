import { PageHeader } from '../components/ui/PageHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { SectionHeading } from '../components/ui/SectionHeading';
import { PORTFOLIO_CLIENTS } from '../data/projectData';
import { PORTFOLIO_SUMMARY } from '../data/portfolioMetrics';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import { CHART, tooltipStyle } from '../components/charts/chartTheme';

const rateData = [...PORTFOLIO_CLIENTS]
  .sort((a, b) => a.minRate - b.minRate)
  .map((c) => ({
    id: `C${c.id}`,
    rate: c.minRate,
    decision: c.decision,
  }));

export function PricingPage() {
  return (
    <div>
      <PageHeader
        badge="Section 10 — Risk-Based Pricing"
        title="Risk-Based Interest Rate Pricing"
        subtitle={`Minimum rate = PD × LGD (MATLAB FinTech_Scorecard_Project.m). Accepted portfolio average: ${PORTFOLIO_SUMMARY.acceptedAvgRate.toFixed(2)}%`}
        infoId="page.pricing"
      />
      <GlassCard>
        <SectionHeading
          title="Minimum Interest Rate per Client"
          infoId="section.pricingChart"
          subtitle="MinRatePct = 100 × PD_Model × LGD"
        />
        <div className="flex items-center gap-4 mb-4 text-xs">
          <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-sm" style={{ background: CHART.low }} /> Accepted</span>
          <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-sm" style={{ background: CHART.high }} /> Rejected</span>
        </div>
        <ResponsiveContainer width="100%" height={380}>
          <BarChart data={rateData}>
            <XAxis dataKey="id" tick={{ fill: CHART.text, fontSize: 10 }} angle={-30} textAnchor="end" height={50} />
            <YAxis tick={{ fill: CHART.text, fontSize: 10 }} domain={[0, 35]} unit="%" />
            <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${Number(v).toFixed(2)}%`, 'Min rate']} />
          <ReferenceLine y={PORTFOLIO_SUMMARY.acceptedAvgRate} stroke={CHART.gold} strokeDasharray="4 4" label={{ value: 'Avg accepted', fill: CHART.gold, fontSize: 10 }} />
            <Bar dataKey="rate" radius={[6, 6, 0, 0]} name="Min rate (%)">
              {rateData.map((d) => (
                <Cell key={d.id} fill={d.decision === 'Accepted' ? CHART.low : CHART.high} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-6 grid sm:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
            <p className="text-[var(--text-muted)]">Lowest accepted client rate</p>
            <p className="font-display text-2xl font-bold text-emerald-500 mt-1">7.71%</p>
          </div>
          <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5">
            <p className="text-[var(--text-muted)]">Highest rejected client rate</p>
            <p className="font-display text-2xl font-bold text-red-500 mt-1">30.48%</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
