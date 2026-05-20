import { useState } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { SectionHeading } from '../components/ui/SectionHeading';
import { WOE_DATA } from '../data/projectData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import { CHART, tooltipStyle } from '../components/charts/chartTheme';
import clsx from 'clsx';

const keys = Object.keys(WOE_DATA) as (keyof typeof WOE_DATA)[];

export function WoePage() {
  const [active, setActive] = useState<keyof typeof WOE_DATA>('Age');
  const data = WOE_DATA[active];

  return (
    <div>
      <PageHeader
        badge="Section 4 — Binning & WOE"
        title="WOE & Binning Visualizations"
        subtitle="Weight of Evidence analysis from MATLAB plotbins() and custom WOE charts. Positive WOE indicates safer behavior; negative WOE indicates higher risk."
        infoId="page.woe"
      />
      <div className="flex flex-wrap gap-2 mb-6">
        {keys.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setActive(k)}
            className={clsx(
              'px-4 py-2 rounded-xl text-sm font-medium border transition-all',
              active === k
                ? 'bg-teal-500/20 border-teal-500/50 text-teal-500'
                : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-teal-500/30'
            )}
          >
            {k}
          </button>
        ))}
      </div>
      <GlassCard>
        <SectionHeading
          title={`WOE — ${active}`}
          infoId="section.woeChart"
          subtitle="Manual cut points: Age [35, 50, 65] · Income [30k, 40k, 50k]"
        />
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data}>
            <XAxis dataKey="bin" tick={{ fill: CHART.text, fontSize: 11 }} />
            <YAxis tick={{ fill: CHART.text, fontSize: 11 }} />
            <Tooltip contentStyle={tooltipStyle} />
            <ReferenceLine y={0} stroke={CHART.text} strokeDasharray="4 4" />
            <Bar dataKey="woe" radius={[8, 8, 0, 0]}>
              {data.map((d) => (
                <Cell key={d.bin} fill={d.woe >= 0 ? CHART.low : CHART.high} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </GlassCard>
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        {keys.map((k, i) => (
          <GlassCard key={k} delay={i * 0.05} hover={false}>
            <h4 className="font-semibold text-sm mb-3">{k}</h4>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={WOE_DATA[k]}>
                <XAxis dataKey="bin" hide />
                <YAxis hide />
                <Bar dataKey="woe" fill={CHART.teal} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
