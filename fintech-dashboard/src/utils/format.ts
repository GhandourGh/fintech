export const fmtCurrency = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

export const fmtPct = (n: number, digits = 2) => `${(n * 100).toFixed(digits)}%`;

export const fmtNum = (n: number, digits = 2) => n.toFixed(digits);
