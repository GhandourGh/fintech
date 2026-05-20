/**
 * Official metrics from fintech.pdf (final report) — MATLAB outputs / Table 15–18.
 * Historical segments from DataProjScoreCard.xlsx.
 */

export const PROJECT_META = {
  title: 'AI in FinTech — Credit Scorecard System',
  institution: 'Université Saint-Joseph de Beyrouth (USJ)',
  year: '2025–2026',
  software: 'MATLAB Credit Scorecard Workflow',
  dataset: 'DataProjScoreCard.xlsx',
  loanAmount: 100_000,
  recoveryRate: 0.6,
  lgd: 0.4,
  /** KS score (optimal cutoff) — Table 13 / §10 */
  optimalThreshold: 48.2032,
};

/** validatemodel on full HistoricalData (no train/test split) — Table 13 */
export const VALIDATION = {
  accuracyRatio: 0.3551,
  auc: 0.6775,
  ksStatistic: 0.2892,
  ksOptimalScore: 48.2032,
};

export const SCORECARD_POINTS_UNSCALED = [
  { predictor: 'Age', bin: '[-∞, 38)', points: -0.214 },
  { predictor: 'Age', bin: '[38, 40)', points: -0.0814 },
  { predictor: 'Age', bin: '[40, 46)', points: 0.0777 },
  { predictor: 'Age', bin: '[46, 49)', points: 0.085 },
  { predictor: 'Age', bin: '[49, Inf)', points: 0.4763 },
  { predictor: 'ResidentialStatus', bin: 'renter', points: -0.0313 },
  { predictor: 'ResidentialStatus', bin: 'HomeOwner', points: 0.3711 },
  { predictor: 'EmploymentStatus', bin: 'Other', points: -0.1686 },
  { predictor: 'EmploymentStatus', bin: 'Employed', points: 0.4833 },
  { predictor: 'Income', bin: '[-∞, 28000)', points: -0.4615 },
  { predictor: 'Income', bin: '[28000, 32000)', points: -0.1528 },
  { predictor: 'Income', bin: '[32000, 35000)', points: -0.0659 },
  { predictor: 'Income', bin: '[35000, 41000)', points: 0.1957 },
  { predictor: 'Income', bin: '[41000, 44000)', points: 0.249 },
  { predictor: 'Income', bin: '[44000, 50000)', points: 0.4475 },
  { predictor: 'Income', bin: '[50000, Inf)', points: 0.5893 },
];

export const SCORECARD_POINTS = [
  { predictor: 'Age', bin: '[-∞, 38)', points: 0.17 },
  { predictor: 'Age', bin: '[38, 40)', points: 4.92 },
  { predictor: 'Age', bin: '[40, 46)', points: 10.61 },
  { predictor: 'Age', bin: '[46, 49)', points: 10.87 },
  { predictor: 'Age', bin: '[49, Inf)', points: 24.87 },
  { predictor: 'ResidentialStatus', bin: 'renter', points: 6.71 },
  { predictor: 'ResidentialStatus', bin: 'HomeOwner', points: 21.1 },
  { predictor: 'EmploymentStatus', bin: 'Other', points: 1.8 },
  { predictor: 'EmploymentStatus', bin: 'Employed', points: 25.12 },
  { predictor: 'Income', bin: '[-∞, 28000)', points: -8.68 },
  { predictor: 'Income', bin: '[28000, 32000)', points: 2.36 },
  { predictor: 'Income', bin: '[32000, 35000)', points: 5.47 },
  { predictor: 'Income', bin: '[35000, 41000)', points: 14.83 },
  { predictor: 'Income', bin: '[41000, 44000)', points: 16.74 },
  { predictor: 'Income', bin: '[44000, 50000)', points: 23.84 },
  { predictor: 'Income', bin: '[50000, Inf)', points: 28.91 },
];

export const WOE_DATA = {
  Age: [
    { bin: '[−∞, 38)', woe: -0.5754, count: 100, good: 50, bad: 50 },
    { bin: '[38, 40)', woe: -0.3618, count: 47, good: 26, bad: 21 },
    { bin: '[40, 46)', woe: -0.1054, count: 104, good: 64, bad: 40 },
    { bin: '[46, 49)', woe: -0.0935, count: 55, good: 34, bad: 21 },
    { bin: '[49, +∞]', woe: 0.537, count: 194, good: 146, bad: 48 },
  ],
  Income: [
    { bin: '[−∞, 28k)', woe: -0.9808, count: 50, good: 20, bad: 30 },
    { bin: '$28–32k', woe: -0.4801, count: 42, good: 22, bad: 20 },
    { bin: '$32–35k', woe: -0.339, count: 68, good: 38, bad: 30 },
    { bin: '$35–41k', woe: 0.0853, count: 138, good: 91, bad: 47 },
    { bin: '$41–44k', woe: 0.1719, count: 56, good: 38, bad: 18 },
    { bin: '$44–50k', woe: 0.4938, count: 90, good: 67, bad: 23 },
    { bin: '$50k+', woe: 0.7239, count: 56, good: 44, bad: 12 },
  ],
  ResidentialStatus: [
    { bin: 'renter', woe: -0.1789, count: 276, good: 165, bad: 111 },
    { bin: 'HomeOwner', woe: 0.234, count: 224, good: 155, bad: 69 },
  ],
  EmploymentStatus: [
    { bin: 'Other', woe: -0.3251, count: 249, good: 140, bad: 109 },
    { bin: 'Employed', woe: 0.3549, count: 251, good: 180, bad: 71 },
  ],
};

export const PREDICTOR_IV = [
  { predictor: 'Income', iv: 0.2355, strength: 'Strong' },
  { predictor: 'Age', iv: 0.1879, strength: 'Medium' },
  { predictor: 'EmploymentStatus', iv: 0.1143, strength: 'Medium' },
  { predictor: 'ResidentialStatus', iv: 0.0417, strength: 'Weak' },
];

export type PortfolioClient = {
  id: number;
  score: number;
  pd: number;
  decision: 'Accepted' | 'Rejected';
  riskBand: 'Low Risk' | 'Medium Risk' | 'High Risk';
  expectedLoss: number;
  minRate: number;
  annualInterest: number;
  age: number;
  income: number;
  residential: string;
  employment: string;
};

/** Table 15 — portfolio_results.csv (fintech.pdf) */
export const PORTFOLIO_CLIENTS: PortfolioClient[] = [
  { id: 4, score: 100, pd: 0.1279, decision: 'Accepted', riskBand: 'Low Risk', expectedLoss: 5114, minRate: 5.11, annualInterest: 5114, age: 50, income: 54000, residential: 'HomeOwner', employment: 'Employed' },
  { id: 5, score: 100, pd: 0.1279, decision: 'Accepted', riskBand: 'Low Risk', expectedLoss: 5114, minRate: 5.11, annualInterest: 5114, age: 60, income: 54000, residential: 'HomeOwner', employment: 'Employed' },
  { id: 6, score: 94.9267, pd: 0.1445, decision: 'Accepted', riskBand: 'Low Risk', expectedLoss: 5781, minRate: 5.78, annualInterest: 5781, age: 77, income: 49000, residential: 'HomeOwner', employment: 'Employed' },
  { id: 7, score: 85.603, pd: 0.1798, decision: 'Accepted', riskBand: 'Low Risk', expectedLoss: 7193, minRate: 7.19, annualInterest: 7193, age: 63, income: 51300, residential: 'renter', employment: 'Employed' },
  { id: 18, score: 85.603, pd: 0.1798, decision: 'Accepted', riskBand: 'Low Risk', expectedLoss: 7193, minRate: 7.19, annualInterest: 7193, age: 68, income: 64700, residential: 'renter', employment: 'Employed' },
  { id: 2, score: 75.3057, pd: 0.2262, decision: 'Accepted', riskBand: 'Medium Risk', expectedLoss: 9049, minRate: 9.05, annualInterest: 9049, age: 22, income: 53000, residential: 'HomeOwner', employment: 'Employed' },
  { id: 12, score: 75.3057, pd: 0.2262, decision: 'Accepted', riskBand: 'Medium Risk', expectedLoss: 9049, minRate: 9.05, annualInterest: 9049, age: 25, income: 53800, residential: 'HomeOwner', employment: 'Employed' },
  { id: 13, score: 75.3057, pd: 0.2262, decision: 'Accepted', riskBand: 'Medium Risk', expectedLoss: 9049, minRate: 9.05, annualInterest: 9049, age: 32, income: 66500, residential: 'HomeOwner', employment: 'Employed' },
  { id: 9, score: 67.8739, pd: 0.2646, decision: 'Accepted', riskBand: 'Medium Risk', expectedLoss: 10586, minRate: 10.59, annualInterest: 10586, age: 38, income: 41000, residential: 'HomeOwner', employment: 'Employed' },
  { id: 17, score: 65.6499, pd: 0.2769, decision: 'Accepted', riskBand: 'Medium Risk', expectedLoss: 11077, minRate: 11.08, annualInterest: 11077, age: 39, income: 68500, residential: 'renter', employment: 'Employed' },
  { id: 19, score: 62.4199, pd: 0.2954, decision: 'Accepted', riskBand: 'Medium Risk', expectedLoss: 11814, minRate: 11.81, annualInterest: 11814, age: 40, income: 66000, residential: 'HomeOwner', employment: 'Other' },
  { id: 10, score: 62.2836, pd: 0.2962, decision: 'Accepted', riskBand: 'Medium Risk', expectedLoss: 11846, minRate: 11.85, annualInterest: 11846, age: 57, income: 68700, residential: 'renter', employment: 'Other' },
  { id: 16, score: 57.2103, pd: 0.3265, decision: 'Accepted', riskBand: 'Medium Risk', expectedLoss: 13062, minRate: 13.06, annualInterest: 13062, age: 63, income: 45400, residential: 'renter', employment: 'Other' },
  { id: 8, score: 55.8354, pd: 0.335, decision: 'Accepted', riskBand: 'Medium Risk', expectedLoss: 13402.63, minRate: 13.4, annualInterest: 13402, age: 29, income: 44000, residential: 'renter', employment: 'Employed' },
  { id: 11, score: 39.0913, pd: 0.4459, decision: 'Rejected', riskBand: 'High Risk', expectedLoss: 17835, minRate: 17.83, annualInterest: 17835, age: 59, income: 23500, residential: 'HomeOwner', employment: 'Other' },
  { id: 3, score: 35.7363, pd: 0.4691, decision: 'Rejected', riskBand: 'High Risk', expectedLoss: 18765, minRate: 18.77, annualInterest: 18765, age: 55, income: 30000, residential: 'renter', employment: 'Other' },
  { id: 14, score: 35.7363, pd: 0.4691, decision: 'Rejected', riskBand: 'High Risk', expectedLoss: 18765, minRate: 18.77, annualInterest: 18765, age: 66, income: 31200, residential: 'renter', employment: 'Other' },
  { id: 20, score: 24.6943, pd: 0.5461, decision: 'Rejected', riskBand: 'High Risk', expectedLoss: 21845, minRate: 21.85, annualInterest: 21845, age: 63, income: 22500, residential: 'renter', employment: 'Other' },
  { id: 15, score: 4.7411, pd: 0.6776, decision: 'Rejected', riskBand: 'High Risk', expectedLoss: 27104, minRate: 27.1, annualInterest: 27104, age: 38, income: 23000, residential: 'renter', employment: 'Other' },
  { id: 1, score: 0, pd: 0.7059, decision: 'Rejected', riskBand: 'High Risk', expectedLoss: 28234, minRate: 28.23, annualInterest: 28234, age: 30, income: 21000, residential: 'renter', employment: 'Other' },
];

export const HISTORICAL = {
  count: 500,
  defaultRate: 0.36,
  goodCount: 320,
  badCount: 180,
  defaultDistribution: { good: 320, bad: 180 },
  ageDefaultRate: { '<35': 0.5, '35-50': 0.3916, '50-65': 0.2781, '65+': 0.1667 },
  residentialDefaultRate: { HomeOwner: 0.308, renter: 0.4022 },
  employmentDefaultRate: { Employed: 0.2829, Other: 0.4378 },
  incomeDefaultRate: { '<30k': 0.5672, '30-40k': 0.3821, '40-50k': 0.297, '50k+': 0.2143 },
};

export const METHODOLOGY_STEPS = [
  { step: 1, title: 'Data Loading', desc: 'HistoricalData (500) & ActualPortfolioData (20) from Excel' },
  { step: 2, title: 'Scorecard Setup', desc: 'creditscorecard — train on all 500 historical clients (no out-of-bag split)' },
  { step: 3, title: 'Autobinning & WOE', desc: 'autobinning + bininfo + plotbins per predictor' },
  { step: 4, title: 'Logistic Regression', desc: 'fitmodel on WOE — all four predictors retained' },
  { step: 5, title: 'Score Scaling', desc: 'formatpoints WorstAndBestScores [0, 100]' },
  { step: 6, title: 'ROC Validation', desc: 'validatemodel on HistoricalData — AUC 0.6775, KS 0.2892' },
  { step: 7, title: 'Portfolio Scoring', desc: 'score + probdefault on 20 applicants' },
  { step: 8, title: 'Accept / Reject', desc: 'Accept if Score ≥ 48.2032 (KS optimal cutoff)' },
  { step: 9, title: 'Expected Loss', desc: 'EL = PD × LGD × EAD — recovery 60%, LGD 40%' },
  { step: 10, title: 'Risk Pricing', desc: 'rmin = PD × LGD (no base rate per final report)' },
];
