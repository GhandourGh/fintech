export const CHART = {
  grid: 'var(--border)',
  text: 'var(--text-muted)',
  teal: '#14b8a6',
  gold: '#f59e0b',
  low: '#10b981',
  med: '#f59e0b',
  high: '#ef4444',
  gradient: ['#14b8a6', '#0d9488', '#0f766e'],
};

export const tooltipStyle = {
  backgroundColor: 'var(--bg-secondary)',
  border: '1px solid var(--border)',
  borderRadius: '12px',
  fontSize: '12px',
  color: 'var(--text-primary)',
};

/** Standard Recharts margins — prevents axis/label/bar overlap */
export const CHART_MARGIN = {
  default: { top: 12, right: 16, bottom: 8, left: 8 },
  bottomLabel: { top: 12, right: 16, bottom: 36, left: 8 },
  leftAxis: { top: 12, right: 16, bottom: 8, left: 44 },
  leftAndBottom: { top: 12, right: 16, bottom: 40, left: 48 },
  angledX: { top: 16, right: 16, bottom: 72, left: 8 },
  woe: { top: 24, right: 16, bottom: 88, left: 52 },
  woeCompact: { top: 12, right: 12, bottom: 72, left: 48 },
  verticalBars: { top: 8, right: 24, bottom: 8, left: 108 },
  scatter: { top: 40, right: 24, bottom: 44, left: 52 },
  roc: { top: 16, right: 24, bottom: 48, left: 52 },
} as const;

const WOE_BIN_SHORT: Record<string, string> = {
  '[−∞, 38)': '<38',
  '[38, 40)': '38–40',
  '[40, 46)': '40–46',
  '[46, 49)': '46–49',
  '[49, +∞]': '49+',
  '[−∞, 28k)': '<28k',
  '$28–32k': '28–32k',
  '$32–35k': '32–35k',
  '$35–41k': '35–41k',
  '$41–44k': '41–44k',
  '$44–50k': '44–50k',
  '$50k+': '50k+',
  renter: 'Renter',
  HomeOwner: 'Owner',
  Other: 'Other',
  Employed: 'Employed',
};

export function shortWoeBinLabel(bin: string): string {
  return WOE_BIN_SHORT[bin] ?? bin;
}

export function shortScorecardBin(bin: string): string {
  return bin
    .replace('[-∞, 38)', '<38')
    .replace('[38, 40)', '38–40')
    .replace('[40, 46)', '40–46')
    .replace('[46, 49)', '46–49')
    .replace('[49, Inf)', '49+')
    .replace('[-∞, 28000)', '<28k')
    .replace('[28000, 32000)', '28–32k')
    .replace('[32000, 35000)', '32–35k')
    .replace('[35000, 41000)', '35–41k')
    .replace('[41000, 44000)', '41–44k')
    .replace('[44000, 50000)', '44–50k')
    .replace('[50000, Inf)', '50k+');
}
