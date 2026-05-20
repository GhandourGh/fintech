import { motion } from 'framer-motion';
import { PageHeader } from '../components/ui/PageHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { MetricCard } from '../components/ui/MetricCard';
import { SectionHeading } from '../components/ui/SectionHeading';
import { VALIDATION, ROC_CURVE, CONFUSION_MATRIX } from '../data/projectData';
import { Activity, Crosshair, Gauge } from 'lucide-react';
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
import { CHART, tooltipStyle } from '../components/charts/chartTheme';

const rocData = ROC_CURVE.map((p) => ({ fpr: p.fpr, tpr: p.tpr, random: p.fpr }));

export function ValidationPage() {
  const { tp, tn, fp, fn } = CONFUSION_MATRIX;
  const total = tp + tn + fp + fn;

  return (
    <div>
      <PageHeader
        badge="Section 6 — Model Validation"
        title="ROC Curve & Validation Metrics"
        subtitle="70/30 train-test split. ROC/AUC measures ranking ability; confusion matrix evaluates classification at optimal threshold."
        infoId="page.validation"
      />
      <motion.div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <MetricCard icon={Gauge} label="AUC" value={VALIDATION.auc.toFixed(4)} delay={0} infoId="metric.auc" />
        <MetricCard icon={Activity} label="Accuracy" value={VALIDATION.accuracy.toFixed(4)} delay={0.05} accent="gold" infoId="metric.accuracy" />
        <MetricCard icon={Crosshair} label="Precision" value={VALIDATION.precision.toFixed(4)} delay={0.1} infoId="metric.precision" />
        <MetricCard icon={Crosshair} label="Recall" value={VALIDATION.recall.toFixed(4)} delay={0.15} accent="gold" infoId="metric.recall" />
        <MetricCard icon={Activity} label="F1 Score" value={VALIDATION.f1Score.toFixed(4)} delay={0.2} infoId="metric.f1" />
      </motion.div>
      <div className="grid lg:grid-cols-2 gap-6">
        <GlassCard>
          <SectionHeading title="ROC Curve — Test Data" infoId="section.roc" />
          <ResponsiveContainer width="100%" height={340}>
            <LineChart data={rocData}>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART.grid} />
              <XAxis dataKey="fpr" tick={{ fill: CHART.text, fontSize: 11 }} label={{ value: 'False Positive Rate', position: 'bottom', fill: CHART.text, fontSize: 11 }} />
              <YAxis tick={{ fill: CHART.text, fontSize: 11 }} label={{ value: 'True Positive Rate', angle: -90, position: 'insideLeft', fill: CHART.text, fontSize: 11 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <Line type="monotone" dataKey="tpr" name={`Scorecard (AUC=${VALIDATION.auc})`} stroke={CHART.teal} strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="random" name="Random" stroke={CHART.text} strokeDasharray="6 4" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
        <GlassCard delay={0.1}>
          <SectionHeading title={`Confusion Matrix — Test Set (n=${total})`} infoId="section.confusion" />
          <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
            {[
              { label: 'True Positive', val: tp, cls: 'bg-emerald-500/15 border-emerald-500/30' },
              { label: 'False Positive', val: fp, cls: 'bg-amber-500/15 border-amber-500/30' },
              { label: 'False Negative', val: fn, cls: 'bg-amber-500/15 border-amber-500/30' },
              { label: 'True Negative', val: tn, cls: 'bg-emerald-500/15 border-emerald-500/30' },
            ].map((c) => (
              <div key={c.label} className={`p-6 rounded-2xl border text-center ${c.cls}`}>
                <p className="font-display text-3xl font-bold">{c.val}</p>
                <p className="text-xs text-[var(--text-muted)] mt-2">{c.label}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-[var(--text-secondary)] mt-6 text-center leading-relaxed">
            Train: {VALIDATION.trainSize} obs · Test: {VALIDATION.testSize} obs · Model shows limited but useful discriminatory power for academic portfolio ranking.
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
