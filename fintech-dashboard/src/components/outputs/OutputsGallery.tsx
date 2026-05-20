import { useEffect, useState } from 'react';
import { ChartCard } from './ChartCard';
import {
  chartUrl,
  type GeneratedChart,
  type GeneratedManifest,
  MATLAB_BASE,
  EXCEL_BASE,
} from '../../data/generatedCharts';

type Props = {
  source: 'matlab' | 'excel';
  title: string;
  description: string;
  sourceLabel: string;
};

export function OutputsGallery({ source, title, description, sourceLabel }: Props) {
  const [charts, setCharts] = useState<GeneratedChart[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const base = source === 'matlab' ? MATLAB_BASE : EXCEL_BASE;

  useEffect(() => {
    let cancelled = false;
    fetch('/generated/manifest.json')
      .then((r) => {
        if (!r.ok) throw new Error('Manifest not found. Run: python3 scripts/generate_charts.py');
        return r.json() as Promise<GeneratedManifest>;
      })
      .then((m) => {
        if (!cancelled) {
          setCharts(source === 'matlab' ? m.matlab : m.excel);
          setLoading(false);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Failed to load charts');
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [source]);

  if (loading) {
    return (
      <div className="grid place-items-center py-24 text-[var(--text-muted)]">
        <p className="text-sm animate-pulse">Loading charts from {sourceLabel}…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-6 text-sm text-[var(--text-secondary)]">
        <p className="font-semibold text-[var(--text-primary)]">Charts not generated yet</p>
        <p className="mt-2">{error}</p>
        <pre className="mt-4 p-3 rounded-lg bg-[var(--bg-primary)] text-xs font-mono overflow-x-auto">
          cd Fintech-Project && python3 scripts/generate_charts.py
        </pre>
      </div>
    );
  }

  return (
    <div>
      <header className="mb-8">
        <p className="text-xs font-mono uppercase tracking-widest text-teal-500 mb-2">{sourceLabel}</p>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)]">{title}</h1>
        <p className="mt-2 text-[var(--text-secondary)] max-w-3xl leading-relaxed">{description}</p>
        <p className="mt-3 text-sm text-[var(--text-muted)]">{charts.length} charts — click Download PNG on any card.</p>
      </header>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {charts.map((chart, i) => (
          <ChartCard
            key={chart.id}
            chart={chart}
            imageUrl={chartUrl(base, chart.file)}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
