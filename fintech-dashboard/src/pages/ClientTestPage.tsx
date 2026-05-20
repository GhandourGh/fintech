import { useMemo, useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw } from 'lucide-react';
import clsx from 'clsx';
import { PageHeader } from '../components/ui/PageHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { SectionHeading } from '../components/ui/SectionHeading';
import { InfoTip } from '../components/ui/InfoTip';
import { PORTFOLIO_CLIENTS, PROJECT_META } from '../data/projectData';
import { fmtCurrency, fmtPct } from '../utils/format';
import {
  breakdownProfile,
  decisionFromScore,
  estimatePdFromScore,
  expectedLossFromPd,
  getOfficialResult,
  minRateFromPd,
  profileFromClient,
  riskBandFromScore,
  sumPoints,
  type ClientProfile,
} from '../utils/scoreClient';

const PRESETS = [...PORTFOLIO_CLIENTS].sort((a, b) => a.id - b.id);
const defaultProfile: ClientProfile = profileFromClient(PRESETS[0]);

type TestResult = {
  score: number;
  pd: number;
  decision: 'Accepted' | 'Rejected';
  riskBand: string;
  expectedLoss: number;
  minRate: number;
  official: boolean;
  clientId?: number;
};

export function ClientTestPage() {
  const [clientId, setClientId] = useState<number | 'custom'>(PRESETS[0].id);
  const [profile, setProfile] = useState<ClientProfile>(defaultProfile);
  const [result, setResult] = useState<TestResult | null>(null);
  const [running, setRunning] = useState(false);

  const breakdown = useMemo(() => breakdownProfile(profile), [profile]);
  const pointsSum = useMemo(() => sumPoints(breakdown), [breakdown]);

  const loadClient = (id: number) => {
    const c = getOfficialResult(id);
    if (!c) return;
    setClientId(id);
    setProfile(profileFromClient(c));
    setResult(null);
  };

  const runTest = () => {
    setRunning(true);
    setResult(null);
    window.setTimeout(() => {
      const official = clientId !== 'custom' ? getOfficialResult(clientId) : undefined;
      if (official) {
        setResult({
          score: official.score,
          pd: official.pd,
          decision: official.decision,
          riskBand: official.riskBand,
          expectedLoss: official.expectedLoss,
          minRate: official.minRate,
          official: true,
          clientId: official.id,
        });
      } else {
        const pd = estimatePdFromScore(pointsSum);
        setResult({
          score: pointsSum,
          pd,
          decision: decisionFromScore(pointsSum),
          riskBand: riskBandFromScore(pointsSum),
          expectedLoss: expectedLossFromPd(pd),
          minRate: minRateFromPd(pd),
          official: false,
        });
      }
      setRunning(false);
    }, 900);
  };

  const reset = () => {
    setResult(null);
    loadClient(PRESETS[0].id);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PageHeader
        badge="Live demo"
        title="Client Score Test"
        subtitle="Portfolio clients 1–20 return exact fintech.pdf Table 15 values. Custom profiles show illustrative scoring only."
        infoId="page.test"
      />

      <div className="grid lg:grid-cols-5 gap-6">
        <GlassCard className="lg:col-span-2">
          <SectionHeading title="Applicant profile" infoId="section.applicantProfile" className="[&_h3]:flex [&_h3]:items-center [&_h3]:gap-2" />

          <label className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-2">
            Quick select (MATLAB portfolio)
          </label>
          <select
            value={clientId === 'custom' ? '' : clientId}
            onChange={(e) => {
              const v = e.target.value;
              if (!v) {
                setClientId('custom');
                return;
              }
              loadClient(Number(v));
            }}
            className="w-full mb-5 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] text-sm focus:outline-none focus:border-teal-500/50"
          >
            <option value="">— Custom applicant —</option>
            {PRESETS.map((c) => (
              <option key={c.id} value={c.id}>
                Client #{c.id} — Score {c.score.toFixed(1)} ({c.decision})
              </option>
            ))}
          </select>

          <div className="space-y-4">
            <Field
              label="Age"
              value={profile.age}
              min={18}
              max={90}
              onChange={(v) => {
                setClientId('custom');
                setProfile((p) => ({ ...p, age: v }));
              }}
            />
            <Field
              label="Annual income ($)"
              value={profile.income}
              min={5000}
              max={200000}
              step={500}
              onChange={(v) => {
                setClientId('custom');
                setProfile((p) => ({ ...p, income: v }));
              }}
            />
            <OptionGroup label="Residential status">
              {(['renter', 'HomeOwner'] as const).map((r) => (
                <Toggle
                  key={r}
                  active={profile.residential === r}
                  onClick={() => {
                    setClientId('custom');
                    setProfile((p) => ({ ...p, residential: r }));
                  }}
                >
                  {r === 'HomeOwner' ? 'Home owner' : 'Renter'}
                </Toggle>
              ))}
            </OptionGroup>
            <OptionGroup label="Employment">
              {(['Employed', 'Other'] as const).map((e) => (
                <Toggle
                  key={e}
                  active={profile.employment === e}
                  onClick={() => {
                    setClientId('custom');
                    setProfile((p) => ({ ...p, employment: e }));
                  }}
                >
                  {e}
                </Toggle>
              ))}
            </OptionGroup>
          </div>

          <motion.div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button
              type="button"
              onClick={runTest}
              disabled={running}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-teal-500 text-white font-semibold text-sm hover:bg-teal-600 disabled:opacity-60 transition-all shadow-lg shadow-teal-500/30"
            >
              <Play size={18} className={running ? 'animate-pulse' : ''} />
              {running ? 'Scoring…' : 'Run credit test'}
            </button>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border border-[var(--border)] text-sm text-[var(--text-secondary)] hover:border-teal-500/30"
            >
              <RotateCcw size={16} />
              Reset
            </button>
          </motion.div>

          {clientId !== 'custom' && (
            <p className="mt-4 text-xs text-amber-500/90 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2">
              Client #{clientId} selected — test returns official MATLAB portfolio results.
            </p>
          )}
        </GlassCard>

        <GlassCard className="lg:col-span-3" delay={0.08}>
          <SectionHeading title="Scorecard point breakdown" infoId="section.pointBreakdown" />

          <table className="w-full text-sm mb-6">
            <thead>
              <tr className="text-[var(--text-muted)] border-b border-[var(--border)]">
                <th className="text-left py-2">Predictor</th>
                <th className="text-left py-2">Bin</th>
                <th className="text-right py-2">Points</th>
              </tr>
            </thead>
            <tbody>
              {breakdown.map((row) => (
                <tr key={row.predictor} className="border-b border-[var(--border)]/40">
                  <td className="py-2.5 font-medium">{row.predictor}</td>
                  <td className="py-2.5 font-mono text-xs text-[var(--text-secondary)]">{row.bin}</td>
                  <td
                    className={clsx(
                      'py-2.5 text-right font-mono',
                      row.points >= 0 ? 'text-emerald-500' : 'text-red-500'
                    )}
                  >
                    {row.points.toFixed(4)}
                  </td>
                </tr>
              ))}
              <tr className="font-semibold">
                <td colSpan={2} className="py-3">Sum of points</td>
                <td className="py-3 text-right font-mono text-teal-500">{pointsSum.toFixed(4)}</td>
              </tr>
            </tbody>
          </table>

          <AnimatePresence mode="wait">
            {running && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-16 gap-4"
              >
                <motion.div
                  className="w-16 h-16 rounded-full border-2 border-teal-500/30 border-t-teal-500"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                />
                <p className="text-sm text-[var(--text-muted)]">Applying scorecard model…</p>
              </motion.div>
            )}
            {!running && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <InfoTip id="section.testResult" className="ml-auto" />
                  <span className="text-xs font-mono uppercase tracking-widest text-teal-500 border border-teal-500/30 px-3 py-1 rounded-full">
                    {result.official ? `MATLAB · Client #${result.clientId}` : 'Custom · demo estimate'}
                  </span>
                  <span
                    className={clsx(
                      'px-4 py-1.5 rounded-full text-sm font-bold',
                      result.decision === 'Accepted'
                        ? 'bg-emerald-500/15 text-emerald-500'
                        : 'bg-red-500/15 text-red-500'
                    )}
                  >
                    {result.decision}
                  </span>
                </div>

                <ScoreGauge score={result.score} threshold={PROJECT_META.optimalThreshold} />

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    ['Credit score', result.score.toFixed(2)],
                    ['PD (model)', fmtPct(result.pd)],
                    ['Expected loss', fmtCurrency(result.expectedLoss)],
                    ['Min rate', `${result.minRate.toFixed(2)}%`],
                  ].map(([label, val]) => (
                    <div
                      key={label}
                      className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)]/50"
                    >
                      <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">{label}</p>
                      <p className="font-display text-xl font-bold mt-1">{val}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-[var(--text-secondary)]">
                  Risk band: <strong>{result.riskBand}</strong> · Threshold:{' '}
                  <strong>{PROJECT_META.optimalThreshold}</strong>
                  {result.score >= PROJECT_META.optimalThreshold ? ' (pass)' : ' (fail)'}
                </p>
              </motion.div>
            )}
            {!running && !result && (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-[var(--text-muted)] py-12 text-sm"
              >
                Select a client and click <strong className="text-teal-500">Run credit test</strong>.
              </motion.p>
            )}
          </AnimatePresence>
        </GlassCard>
      </div>
    </motion.div>
  );
}

function Field({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (v: number) => void;
}) {
  return (
    <motion.div>
      <label className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-2">{label}</label>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] text-sm font-mono focus:outline-none focus:border-teal-500/50"
      />
    </motion.div>
  );
}

function OptionGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <motion.div>
      <span className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-2">{label}</span>
      <motion.div className="flex gap-2">{children}</motion.div>
    </motion.div>
  );
}

function Toggle({
  children,
  active,
  onClick,
}: {
  children: ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors',
        active
          ? 'bg-teal-500/15 border-teal-500/40 text-teal-500'
          : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-teal-500/20'
      )}
    >
      {children}
    </button>
  );
}

function ScoreGauge({ score, threshold }: { score: number; threshold: number }) {
  const pct = Math.min(100, Math.max(0, score));

  return (
    <motion.div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)]/30">
      <motion.div className="flex justify-between text-xs text-[var(--text-muted)] mb-2">
        <span>0</span>
        <span className="text-amber-500">Threshold {threshold}</span>
        <span>100</span>
      </motion.div>
      <motion.div className="relative h-4 rounded-full bg-[var(--border)] overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
          style={{ left: `${threshold}%` }}
          title="Optimal threshold"
        />
      </motion.div>
      <p className="text-center mt-4 font-display text-5xl font-bold tracking-tight">{score.toFixed(2)}</p>
      <p className="text-center text-sm text-[var(--text-muted)]">Credit score (0–100)</p>
    </motion.div>
  );
}
