import { PageHeader } from '../components/ui/PageHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { SectionHeading } from '../components/ui/SectionHeading';
import { PORTFOLIO_CLIENTS, PORTFOLIO_SUMMARY, PROJECT_META } from '../data/projectData';
import { fmtPct } from '../utils/format';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
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
        subtitle={`Minimum rate = base ${fmtPct(PROJECT_META.baseRate)} + PD × LGD. Accepted portfolio average: ${PORTFOLIO_SUMMARY.acceptedAvgRate}%`}
        infoId="page.pricing"
      />
      <GlassCard>
        <SectionHeading
          title="Minimum Interest Rate per Client"
          infoId="section.pricingChart"
          subtitle="MinimumInterestRatePercent = 100 × (baseRate + PD_Model × LGD)"
        />
        <ResponsiveContainer width="100%" height={380}>
          <BarChart data={rateData}>
            <XAxis dataKey="id" tick={{ fill: CHART.text, fontSize: 10 }} angle={-30} textAnchor="end" height={50} />
            <YAxis tick={{ fill: CHART.text, fontSize: 10 }} domain={[0, 35]} unit="%" />
            <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${Number(v).toFixed(2)}%`, 'Min rate']} />
            <ReferenceLine y={PORTFOLIO_SUMMARY.acceptedAvgRate} stroke={CHART.gold} strokeDasharray="4 4" label={{ value: 'Avg accepted', fill: CHART.gold, fontSize: 10 }} />
            <Bar
              dataKey="rate"
              fill={CHART.teal}
              radius={[6, 6, 0, 0]}
            />
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
