import {
  PORTFOLIO_CLIENTS,
  PROJECT_META,
  SCORECARD_POINTS,
  type PortfolioClient,
} from '../data/projectData';

export type ClientProfile = {
  age: number;
  income: number;
  residential: 'renter' | 'HomeOwner';
  employment: 'Employed' | 'Other';
};

export type PointBreakdown = {
  predictor: string;
  bin: string;
  points: number;
};

function pointsFor(predictor: string, bin: string) {
  return SCORECARD_POINTS.find((r) => r.predictor === predictor && r.bin === bin)?.points ?? 0;
}

export function ageBin(age: number): string {
  if (age < 35) return '[-Inf, 35)';
  if (age < 50) return '[35, 50)';
  if (age < 65) return '[50, 65)';
  return '[65, Inf)';
}

export function incomeBin(income: number): string {
  if (income < 30000) return '[-Inf, 30000)';
  if (income < 40000) return '[30000, 40000)';
  if (income < 50000) return '[40000, 50000)';
  return '[50000, Inf)';
}

/** Point breakdown from published scorecard table (same bins as MATLAB modifybins). */
export function breakdownProfile(profile: ClientProfile): PointBreakdown[] {
  const aBin = ageBin(profile.age);
  const iBin = incomeBin(profile.income);
  return [
    { predictor: 'Age', bin: aBin, points: pointsFor('Age', aBin) },
    { predictor: 'Income', bin: iBin, points: pointsFor('Income', iBin) },
    {
      predictor: 'ResidentialStatus',
      bin: profile.residential,
      points: pointsFor('ResidentialStatus', profile.residential),
    },
    {
      predictor: 'EmploymentStatus',
      bin: profile.employment,
      points: pointsFor('EmploymentStatus', profile.employment),
    },
  ];
}

export function sumPoints(breakdown: PointBreakdown[]) {
  return breakdown.reduce((s, r) => s + r.points, 0);
}

/** Official MATLAB portfolio row when client exists in ActualPortfolioData results. */
export function getOfficialResult(clientId: number): PortfolioClient | undefined {
  return PORTFOLIO_CLIENTS.find((c) => c.id === clientId);
}

export function profileFromClient(c: PortfolioClient): ClientProfile {
  return {
    age: c.age ?? 35,
    income: c.income ?? 40000,
    residential: (c.residential as ClientProfile['residential']) ?? 'renter',
    employment: (c.employment as ClientProfile['employment']) ?? 'Other',
  };
}

export function decisionFromScore(score: number) {
  return score >= PROJECT_META.optimalThreshold ? 'Accepted' : 'Rejected';
}

export function riskBandFromScore(score: number): PortfolioClient['riskBand'] {
  if (score >= 80) return 'Low Risk';
  if (score >= 50) return 'Medium Risk';
  return 'High Risk';
}

/** Demo-only PD estimate from score (linear fit on portfolio MATLAB outputs). */
export function estimatePdFromScore(score: number): number {
  const pts = PORTFOLIO_CLIENTS.map((c) => ({ s: c.score, p: c.pd }));
  const n = pts.length;
  const meanS = pts.reduce((a, x) => a + x.s, 0) / n;
  const meanP = pts.reduce((a, x) => a + x.p, 0) / n;
  let num = 0;
  let den = 0;
  for (const { s, p } of pts) {
    num += (s - meanS) * (p - meanP);
    den += (s - meanS) ** 2;
  }
  const slope = den ? num / den : 0;
  const intercept = meanP - slope * meanS;
  const pd = intercept + slope * score;
  return Math.min(0.99, Math.max(0.01, pd));
}

export function expectedLossFromPd(pd: number) {
  return pd * PROJECT_META.lgd * PROJECT_META.loanAmount;
}

export function minRateFromPd(pd: number) {
  return (PROJECT_META.baseRate + pd * PROJECT_META.lgd) * 100;
}
