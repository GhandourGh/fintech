import {
  PORTFOLIO_CLIENTS,
  PROJECT_META,
  SCORECARD_POINTS,
  type PortfolioClient,
} from '../data/projectData';
import { expectedLossFromPd, minRateFromPd } from '../data/portfolioMetrics';

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

/** Autobinning cut points from fintech.pdf Table 11 */
export function ageBin(age: number): string {
  if (age < 38) return '[-∞, 38)';
  if (age < 40) return '[38, 40)';
  if (age < 46) return '[40, 46)';
  if (age < 49) return '[46, 49)';
  return '[49, Inf)';
}

export function incomeBin(income: number): string {
  if (income < 28000) return '[-∞, 28000)';
  if (income < 32000) return '[28000, 32000)';
  if (income < 35000) return '[32000, 35000)';
  if (income < 41000) return '[35000, 41000)';
  if (income < 44000) return '[41000, 44000)';
  if (income < 50000) return '[44000, 50000)';
  return '[50000, Inf)';
}

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

/** Official portfolio row from fintech.pdf Table 15 */
export function getOfficialResult(clientId: number): PortfolioClient | undefined {
  return PORTFOLIO_CLIENTS.find((c) => c.id === clientId);
}

export function profileFromClient(c: PortfolioClient): ClientProfile {
  return {
    age: c.age,
    income: c.income,
    residential: c.residential as ClientProfile['residential'],
    employment: c.employment as ClientProfile['employment'],
  };
}

export function decisionFromScore(score: number) {
  return score >= PROJECT_META.optimalThreshold ? 'Accepted' : 'Rejected';
}

/** Illustrative PD for custom profiles only (portfolio uses Table 15 PD_Model). */
export function estimatePdFromScore(score: number): number {
  const s = Math.max(0, Math.min(100, score));
  return Math.max(0.05, Math.min(0.95, 0.7059 - 0.00578 * s));
}

/** Risk bands per report §10.4: Low ≥80, Medium 50–80, High otherwise */
export function riskBandFromScore(score: number): PortfolioClient['riskBand'] {
  if (score >= 80) return 'Low Risk';
  if (score >= 50) return 'Medium Risk';
  return 'High Risk';
}

export { expectedLossFromPd, minRateFromPd };
