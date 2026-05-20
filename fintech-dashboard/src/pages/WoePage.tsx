import { useState } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { SectionHeading } from '../components/ui/SectionHeading';
import { WOE_DATA, PREDICTOR_IV } from '../data/projectData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
  CartesianGrid,
} from 'recharts';
import { CHART, CHART_MARGIN, shortWoeBinLabel, tooltipStyle } from '../components/charts/chartTheme';
import clsx from 'clsx';

const keys = Object.keys(WOE_DATA) as (keyof typeof WOE_DATA)[];

type WoeRow = (typeof WOE_DATA)[keyof typeof WOE_DATA][number];

function ivFor(predictor: keyof typeof WOE_DATA) {
  return PREDICTOR_IV.find((p) => p.predictor === predictor);
}

function WoeTooltip({ active, payload }: { active?: boolean; payload?: { payload: WoeRow }[] }) {
  if (!active || !payload?.[0]) return null;
  const row = payload[0].payload;
  const defaultRate = row.count > 0 ? (row.bad / row.count) * 100 : 0;
  return (
    <div style={tooltipStyle} className="p-3 space-y-1 min-w-[160px]">
      <p className="font-semibold text-[var(--text-primary)]">{row.bin}</p>
      <p>
        <span className="text-[var(--text-muted)]">WOE: </span>
        <span className="font-mono">{row.woe.toFixed(4)}</span>
      </p>
      <p>
        <span className="text-[var(--text-muted)]">Observations: </span>
        <span className="font-mono">{row.count}</span>
        <span className="text-[var(--text-muted)]"> (good {row.good}, bad {row.bad})</span>
      </p>
      <p>
        <span className="text-[var(--text-muted)]">Default rate: </span>
        <span className="font-mono">{defaultRate.toFixed(1)}%</span>
      </p>
    </div>
  );
}

function strengthClass(strength: string) {
  if (strength === 'Strong') return 'bg-teal-500/20 text-teal-400 border-teal-500/40';
  if (strength === 'Medium') return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
  return 'bg-slate-500/20 text-slate-400 border-slate-500/40';
}

type PredictorCardProps = {
  predictor: keyof typeof WOE_DATA;
  onSelect?: () => void;
  selected?: boolean;
};

function WoePredictorCard({ predictor, onSelect, selected }: PredictorCardProps) {
  const data = WOE_DATA[predictor];
  const iv = ivFor(predictor);
  const margin = CHART_MARGIN.woeCompact;

  const chart = (
    <GlassCard hover={!!onSelect} className={clsx(selected && 'ring-1 ring-teal-500/50')}>
      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
        <div className="min-w-0">
          <h4 className="font-semibold text-sm text-[var(--text-primary)] break-words">{predictor}</h4>
          {iv && (
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              IV: <span className="font-mono text-[var(--text-primary)]">{iv.iv.toFixed(4)}</span>
            </p>
          )}
        </div>
        {iv && (
          <span className={clsx('text-xs px-2 py-0.5 rounded-full border font-medium shrink-0', strengthClass(iv.strength))}>
            {iv.strength}
          </span>
        )}
      </div>

      <div className="w-full min-h-[200px]">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} margin={margin}>
            <CartesianGrid strokeDasharray="3 3" stroke={CHART.grid} vertical={false} />
            <XAxis
              dataKey="bin"
              tickFormatter={shortWoeBinLabel}
              tick={{ fill: CHART.text, fontSize: 9 }}
              interval={0}
              angle={predictor === 'Income' ? -40 : -25}
              textAnchor="end"
              height={56}
            />
            <YAxis tick={{ fill: CHART.text, fontSize: 9 }} width={40} tickCount={5} />
            <Tooltip content={<WoeTooltip />} />
            <ReferenceLine y={0} stroke={CHART.text} strokeDasharray="4 4" />
            <Bar dataKey="woe" radius={[4, 4, 0, 0]} maxBarSize={32}>
              {data.map((d) => (
                <Cell key={d.bin} fill={d.woe >= 0 ? CHART.low : CHART.high} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 overflow-x-auto -mx-1 px-1">
        <table className="w-full text-xs min-w-[280px]">
          <thead>
            <tr className="text-[var(--text-muted)] border-b border-[var(--border)]">
              <th className="text-left py-2 pr-2 font-medium">Bin</th>
              <th className="text-right py-2 px-1 font-medium">N</th>
              <th className="text-right py-2 px-1 font-medium">Bad%</th>
              <th className="text-right py-2 pl-1 font-medium">WOE</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              const dr = row.count > 0 ? (row.bad / row.count) * 100 : 0;
              return (
                <tr key={row.bin} className="border-b border-[var(--border)]/50 last:border-0">
                  <td className="py-1.5 pr-2 text-[var(--text-secondary)] max-w-[120px] truncate" title={row.bin}>
                    {shortWoeBinLabel(row.bin)}
                  </td>
                  <td className="text-right py-1.5 px-1 font-mono">{row.count}</td>
                  <td className="text-right py-1.5 px-1 font-mono">{dr.toFixed(1)}%</td>
                  <td
                    className={clsx(
                      'text-right py-1.5 pl-1 font-mono font-medium',
                      row.woe >= 0 ? 'text-emerald-400' : 'text-red-400'
                    )}
                  >
                    {row.woe.toFixed(3)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );

  if (!onSelect) return chart;
  return (
    <button type="button" onClick={onSelect} className="w-full text-left rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50">
      {chart}
    </button>
  );
}

export function WoePage() {
  const [active, setActive] = useState<keyof typeof WOE_DATA>('Income');

  return (
    <div>
      <PageHeader
        badge="Section 4 — Binning & WOE"
        title="WOE & Binning Visualizations"
        subtitle="Autobinning on 500 historical clients (fintech.pdf §4). Positive WOE = lower risk bin; negative WOE = higher default risk. IV ranks predictor strength."
        infoId="page.woe"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {PREDICTOR_IV.map((p) => (
          <div
            key={p.predictor}
            className="px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)]/60 min-w-0"
          >
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-wide truncate" title={p.predictor}>
              {p.predictor}
            </p>
            <p className="font-mono text-lg font-semibold mt-1">{p.iv.toFixed(4)}</p>
            <p
              className={clsx(
                'text-xs mt-1 font-medium',
                p.strength === 'Strong' && 'text-teal-400',
                p.strength === 'Medium' && 'text-amber-400',
                p.strength === 'Weak' && 'text-slate-400'
              )}
            >
              {p.strength}
            </p>
          </div>
        ))}
      </div>

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

      <GlassCard className="mb-6">
        <SectionHeading
          title={`WOE — ${active}`}
          infoId="section.woeChart"
          subtitle="MATLAB autobinning cut points (fintech.pdf Table 8–9). Hover bars for full bin labels and counts."
        />
        <div className="flex flex-wrap gap-4 mb-4 text-xs text-[var(--text-muted)]">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-emerald-500 shrink-0" /> WOE ≥ 0 (safer)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-red-500 shrink-0" /> WOE &lt; 0 (riskier)
          </span>
        </div>
        <div className="w-full min-h-[360px]">
          <ResponsiveContainer width="100%" height={360}>
            <BarChart data={WOE_DATA[active]} margin={CHART_MARGIN.woe}>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART.grid} vertical={false} />
              <XAxis
                dataKey="bin"
                tickFormatter={shortWoeBinLabel}
                tick={{ fill: CHART.text, fontSize: 11 }}
                interval={0}
                angle={active === 'Income' ? -35 : -20}
                textAnchor="end"
                height={72}
              />
              <YAxis tick={{ fill: CHART.text, fontSize: 11 }} width={44} />
              <Tooltip content={<WoeTooltip />} />
              <ReferenceLine y={0} stroke={CHART.text} strokeDasharray="4 4" />
              <Bar dataKey="woe" radius={[8, 8, 0, 0]} maxBarSize={56}>
                {WOE_DATA[active].map((d) => (
                  <Cell key={d.bin} fill={d.woe >= 0 ? CHART.low : CHART.high} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-[var(--text-muted)] mt-2 text-center">
          Axis uses short labels — hover a bar for the full bin range.
        </p>
      </GlassCard>

      <SectionHeading
        title="All predictors — bin statistics"
        subtitle="Click a card to focus the chart above. Tables show counts and WOE per bin."
      />
      <div className="grid md:grid-cols-2 gap-4">
        {keys.map((k) => (
          <WoePredictorCard key={k} predictor={k} selected={active === k} onSelect={() => setActive(k)} />
        ))}
      </div>
    </div>
  );
}
