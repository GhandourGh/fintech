import { PageHeader } from '../components/ui/PageHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { MetricCard } from '../components/ui/MetricCard';
import { SectionHeading } from '../components/ui/SectionHeading';
import { PORTFOLIO_CLIENTS, PORTFOLIO_SUMMARY, PROJECT_META } from '../data/projectData';
import { fmtCurrency, fmtPct } from '../utils/format';
import { DollarSign, ShieldAlert, PieChart as PieIcon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CHART, tooltipStyle } from '../components/charts/chartTheme';

const accepted = PORTFOLIO_CLIENTS.filter((c) => c.decision === 'Accepted');
const elChart = accepted.map((c) => ({ id: `C${c.id}`, el: c.expectedLoss }));

export function ExpectedLossPage() {
  return (
    <div>
      <PageHeader
        badge="Section 9 — Expected Loss"
        title="Expected Loss Dashboard"
        subtitle={`EL = PD × LGD × Exposure. Recovery rate ${fmtPct(PROJECT_META.recoveryRate)} → LGD ${fmtPct(PROJECT_META.lgd)}. Loan amount ${fmtCurrency(PROJECT_META.loanAmount)} per client.`}
        infoId="page.expectedLoss"
      />
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <MetricCard icon={DollarSign} label="Accepted Total EL" value={fmtCurrency(PORTFOLIO_SUMMARY.acceptedExpectedLoss)} delay={0} infoId="metric.totalEl" />
        <MetricCard icon={ShieldAlert} label="Accepted Avg PD" value={fmtPct(PORTFOLIO_SUMMARY.acceptedAvgPd)} delay={0.05} accent="gold" infoId="metric.avgPd" />
        <MetricCard icon={PieIcon} label="Accepted Exposure" value={fmtCurrency(PORTFOLIO_SUMMARY.acceptedExposure)} delay={0.1} infoId="metric.exposure" />
      </div>
      <GlassCard>
        <SectionHeading title="Expected Loss per Accepted Client" infoId="section.elChart" subtitle="ExpectedLoss = PD_Model × LGD × LoanAmount" />
        <ResponsiveContainer width="100%" height={340}>
          <BarChart data={elChart}>
            <XAxis dataKey="id" tick={{ fill: CHART.text, fontSize: 10 }} />
            <YAxis tick={{ fill: CHART.text, fontSize: 10 }} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v) => [fmtCurrency(Number(v)), 'EL']} />
            <Bar dataKey="el" fill={CHART.teal} radius={[6, 6, 0, 0]}>
              {elChart.map((_, i) => (
                <Cell key={i} fill={CHART.gradient[i % 3]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </GlassCard>
    </div>
  );
}
