import { useMemo, useState } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { InfoTip } from '../components/ui/InfoTip';
import { PORTFOLIO_CLIENTS } from '../data/projectData';
import { fmtCurrency, fmtPct } from '../utils/format';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { Search, FlaskConical } from 'lucide-react';

export function ExplorerPage() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(PORTFOLIO_CLIENTS[0]?.id ?? 6);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return PORTFOLIO_CLIENTS.filter(
      (c) =>
        String(c.id).includes(q) ||
        c.decision.toLowerCase().includes(q) ||
        c.riskBand.toLowerCase().includes(q)
    );
  }, [query]);

  const client = PORTFOLIO_CLIENTS.find((c) => c.id === selected) ?? PORTFOLIO_CLIENTS[0];

  return (
    <div>
      <PageHeader
        badge="Interactive Explorer"
        title="Client Scoring Explorer"
        subtitle="Explore individual portfolio applicants — scores, PD, decisions, expected loss, and minimum interest rates from MATLAB outputs."
        infoId="page.explorer"
      />
      <Link
        to="/test"
        className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-xl border border-teal-500/30 bg-teal-500/10 text-teal-500 text-sm font-medium hover:bg-teal-500/20 transition-colors"
      >
        <FlaskConical size={16} />
        Open live client test (presentation demo)
      </Link>
      <div className="grid lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-1">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-[var(--text-primary)]">Client list</p>
            <InfoTip id="page.explorer" />
          </div>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={16} />
            <input
              type="search"
              placeholder="Search clients..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] text-sm focus:outline-none focus:border-teal-500/50"
            />
          </div>
          <ul className="space-y-1 max-h-[420px] overflow-y-auto">
            {filtered.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => setSelected(c.id)}
                  className={clsx(
                    'w-full text-left px-3 py-2.5 rounded-xl text-sm transition-colors',
                    selected === c.id ? 'bg-teal-500/15 text-teal-500' : 'hover:bg-[var(--border)]'
                  )}
                >
                  <span className="font-mono font-semibold">Client {c.id}</span>
                  <span className="float-right">{c.score.toFixed(1)}</span>
                </button>
              </li>
            ))}
          </ul>
        </GlassCard>
        {client && (
          <GlassCard className="lg:col-span-2" delay={0.1}>
            <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
              <div>
                <h2 className="font-display text-3xl font-bold">Client #{client.id}</h2>
                <p className="text-[var(--text-secondary)] mt-1">
                  {client.residential} · {client.employment} · Age {client.age} · Income ${client.income?.toLocaleString()}
                </p>
              </div>
              <span
                className={clsx(
                  'px-4 py-2 rounded-full text-sm font-semibold',
                  client.decision === 'Accepted' ? 'bg-emerald-500/15 text-emerald-500' : 'bg-red-500/15 text-red-500'
                )}
              >
                {client.decision}
              </span>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                ['Credit Score', client.score.toFixed(2), '0–100 scale'],
                ['PD (Model)', fmtPct(client.pd), 'probdefault()'],
                ['Risk Band', client.riskBand, 'Segmentation'],
                ['Expected Loss', fmtCurrency(client.expectedLoss), 'PD × LGD × $100k'],
                ['Min Interest Rate', `${client.minRate.toFixed(2)}%`, 'PD × LGD'],
              ].map(([label, val, sub]) => (
                <div key={label} className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)]/40">
                  <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">{label}</p>
                  <p className="font-display text-2xl font-bold mt-2">{val}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">{sub}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        )}
      </div>
    </div>
  );
}

