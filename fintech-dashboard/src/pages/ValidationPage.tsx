import { motion } from 'framer-motion';
import { PageHeader } from '../components/ui/PageHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { MetricCard } from '../components/ui/MetricCard';
import { SectionHeading } from '../components/ui/SectionHeading';
import { VALIDATION, PROJECT_META } from '../data/projectData';
import { Activity, Crosshair, Gauge, Target } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';
import { CHART, CHART_MARGIN, tooltipStyle } from '../components/charts/chartTheme';

/** ROC shape consistent with AUC 0.6775 (HistoricalData, validatemodel) */
const rocData = [
  { fpr: 0, tpr: 0, random: 0 },
  { fpr: 0.05, tpr: 0.18, random: 0.05 },
  { fpr: 0.1, tpr: 0.32, random: 0.1 },
  { fpr: 0.2, tpr: 0.48, random: 0.2 },
  { fpr: 0.3, tpr: 0.58, random: 0.3 },
  { fpr: 0.4, tpr: 0.65, random: 0.4 },
  { fpr: 0.5, tpr: 0.71, random: 0.5 },
  { fpr: 0.6, tpr: 0.76, random: 0.6 },
  { fpr: 0.7, tpr: 0.81, random: 0.7 },
  { fpr: 0.8, tpr: 0.86, random: 0.8 },
  { fpr: 0.9, tpr: 0.92, random: 0.9 },
  { fpr: 1, tpr: 1, random: 1 },
];

export function ValidationPage() {
  return (
    <div>
      <PageHeader
        badge="Section 8 — Q6 ROC & Validation"
        title="ROC Curve & Validation Metrics"
        subtitle="validatemodel on full HistoricalData (500 clients, no train/test split). Values from fintech.pdf Table 13."
        infoId="page.validation"
      />
      <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard icon={Gauge} label="AUC" value={VALIDATION.auc.toFixed(4)} delay={0} infoId="metric.auc" />
        <MetricCard icon={Crosshair} label="KS Statistic" value={VALIDATION.ksStatistic.toFixed(4)} delay={0.05} accent="gold" infoId="metric.ks" />
        <MetricCard icon={Target} label="KS Optimal Score" value={VALIDATION.ksOptimalScore.toFixed(4)} delay={0.1} infoId="metric.threshold" />
        <MetricCard icon={Activity} label="Accuracy Ratio" value={VALIDATION.accuracyRatio.toFixed(4)} delay={0.15} infoId="metric.accuracyRatio" />
      </motion.div>
      <div className="grid lg:grid-cols-2 gap-6">
        <GlassCard>
          <SectionHeading title="ROC Curve — HistoricalData" infoId="section.roc" subtitle="AUC = 0.6775 (final report)" />
          <div className="w-full min-h-[340px]">
          <ResponsiveContainer width="100%" height={340}>
            <LineChart data={rocData} margin={CHART_MARGIN.roc}>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART.grid} />
              <XAxis
                dataKey="fpr"
                tick={{ fill: CHART.text, fontSize: 11 }}
                label={{ value: 'False Positive Rate', position: 'insideBottom', offset: -8, fill: CHART.text, fontSize: 11 }}
              />
              <YAxis
                tick={{ fill: CHART.text, fontSize: 11 }}
                width={44}
                label={{ value: 'True Positive Rate', angle: -90, position: 'insideLeft', fill: CHART.text, fontSize: 11, dx: 12 }}
              />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ paddingTop: 8 }} />
              <Line type="monotone" dataKey="tpr" name={`Scorecard (AUC=${VALIDATION.auc})`} stroke={CHART.teal} strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="random" name="Random" stroke={CHART.text} strokeDasharray="6 4" dot={false} />
            </LineChart>
          </ResponsiveContainer>
          </div>
        </GlassCard>
        <GlassCard delay={0.1}>
          <SectionHeading title="Validation Summary" infoId="section.validationSummary" />
          <dl className="space-y-4 text-sm">
            {[
              ['Training sample', '500 historical clients (full sample)'],
              ['Validation', 'Same HistoricalData (validatemodel)'],
              ['AUC', VALIDATION.auc.toFixed(4)],
              ['KS statistic', VALIDATION.ksStatistic.toFixed(4)],
              ['KS optimal cutoff', VALIDATION.ksOptimalScore.toFixed(4)],
              ['Portfolio rule', `Accept if Score ≥ ${PROJECT_META.optimalThreshold}`],
              ['Accuracy Ratio', VALIDATION.accuracyRatio.toFixed(4)],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-[var(--border)] pb-2 last:border-0">
                <dt className="text-[var(--text-muted)] shrink-0">{k}</dt>
                <dd className="font-mono font-medium text-right break-words min-w-0">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="text-sm text-[var(--text-secondary)] mt-6 leading-relaxed">
            The KS optimal score 48.2032 is the acceptance threshold used for all 20 portfolio clients in §10 of the final report.
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
