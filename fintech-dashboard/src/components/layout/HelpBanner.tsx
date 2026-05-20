import { Info } from 'lucide-react';

export function HelpBanner() {
  return (
    <div className="mb-6 flex items-center gap-2 px-4 py-2.5 rounded-xl border border-teal-500/20 bg-teal-500/5 text-sm text-[var(--text-secondary)]">
      <Info size={16} className="text-teal-500 shrink-0" />
      <span>
        <strong className="text-[var(--text-primary)]">Presentation tip:</strong> Hover over any{' '}
        <span className="inline-flex w-5 h-5 align-middle items-center justify-center rounded-full border border-teal-500/40 text-teal-500 text-xs font-bold mx-0.5">
          i
        </span>{' '}
        icon to see what you are looking at on each chart, metric, and section.
      </span>
    </div>
  );
}
