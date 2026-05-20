/** Static metrics from MATLAB outputs & Final Report — presentation only, logic unchanged */

export const PROJECT_META = {
  title: 'AI in FinTech — Credit Scorecard System',
  author: 'Maroun Machaalany',
  institution: 'Université Saint-Joseph de Beyrouth (USJ)',
  year: '2025–2026',
  software: 'MATLAB Credit Scorecard Workflow',
  loanAmount: 100_000,
  recoveryRate: 0.6,
  lgd: 0.4,
  baseRate: 0.03,
  optimalThreshold: 50.46,
};

export const VALIDATION = {
  trainSize: 350,
  testSize: 150,
  holdout: 0.3,
  auc: 0.5636,
  accuracy: 0.6133,
  precision: 0.4615,
  recall: 0.4444,
  f1Score: 0.4528,
};

export const CONFUSION_MATRIX = {
  tp: 23,
  tn: 71,
  fp: 27,
  fn: 29,
};

export const ROC_CURVE = [
  { fpr: 0, tpr: 0 },
  { fpr: 0.08, tpr: 0.12 },
  { fpr: 0.16, tpr: 0.22 },
  { fpr: 0.24, tpr: 0.31 },
  { fpr: 0.32, tpr: 0.39 },
  { fpr: 0.4, tpr: 0.46 },
  { fpr: 0.48, tpr: 0.52 },
  { fpr: 0.56, tpr: 0.58 },
  { fpr: 0.64, tpr: 0.64 },
  { fpr: 0.72, tpr: 0.7 },
  { fpr: 0.8, tpr: 0.76 },
  { fpr: 0.88, tpr: 0.84 },
  { fpr: 1, tpr: 1 },
];

export const SCORECARD_POINTS = [
  { predictor: 'Age', bin: '[-Inf, 35)', points: -1.9243 },
  { predictor: 'Age', bin: '[35, 50)', points: 8.0827 },
  { predictor: 'Age', bin: '[50, 65)', points: 19.7435 },
  { predictor: 'Age', bin: '[65, Inf)', points: 34.6426 },
  { predictor: 'ResidentialStatus', bin: 'renter', points: 5.6376 },
  { predictor: 'ResidentialStatus', bin: 'HomeOwner', points: 18.3525 },
  { predictor: 'EmploymentStatus', bin: 'Other', points: 0.7842 },
  { predictor: 'EmploymentStatus', bin: 'Employed', points: 22.4635 },
  { predictor: 'Income', bin: '[-Inf, 30000)', points: -4.4974 },
  { predictor: 'Income', bin: '[30000, 40000)', points: 9.3976 },
  { predictor: 'Income', bin: '[40000, 50000)', points: 16.4469 },
  { predictor: 'Income', bin: '[50000, Inf)', points: 24.5414 },
];

export const WOE_DATA = {
  Age: [
    { bin: '< 35', woe: -0.82, count: 125 },
    { bin: '35–50', woe: 0.18, count: 157 },
    { bin: '50–65', woe: 0.91, count: 126 },
    { bin: '65+', woe: 1.38, count: 92 },
  ],
  Income: [
    { bin: '< $30k', woe: -1.12, count: 75 },
    { bin: '$30–40k', woe: 0.24, count: 140 },
    { bin: '$40–50k', woe: 0.74, count: 127 },
    { bin: '$50k+', woe: 1.28, count: 158 },
  ],
  ResidentialStatus: [
    { bin: 'renter', woe: -0.28, count: 269 },
    { bin: 'HomeOwner', woe: 0.94, count: 231 },
  ],
  EmploymentStatus: [
    { bin: 'Other', woe: -0.19, count: 241 },
    { bin: 'Employed', woe: 1.15, count: 259 },
  ],
};

export type PortfolioClient = {
  id: number;
  score: number;
  pd: number;
  decision: 'Accepted' | 'Rejected';
  riskBand: 'Low Risk' | 'Medium Risk' | 'High Risk';
  expectedLoss: number;
  minRate: number;
  age?: number;
  income?: number;
  residential?: string;
  employment?: string;
};

export const PORTFOLIO_CLIENTS: PortfolioClient[] = [
  { id: 6, score: 91.91, pd: 0.1178, decision: 'Accepted', riskBand: 'Low Risk', expectedLoss: 4711.63, minRate: 7.71, age: 77, income: 49000, residential: 'HomeOwner', employment: 'Employed' },
  { id: 1, score: 87.29, pd: 0.1332, decision: 'Accepted', riskBand: 'Low Risk', expectedLoss: 5328.89, minRate: 8.33, age: 30, income: 21000, residential: 'renter', employment: 'Other' },
  { id: 4, score: 85.1, pd: 0.1411, decision: 'Accepted', riskBand: 'Low Risk', expectedLoss: 5643.78, minRate: 8.64, age: 50, income: 54000, residential: 'HomeOwner', employment: 'Employed' },
  { id: 5, score: 85.1, pd: 0.1411, decision: 'Accepted', riskBand: 'Low Risk', expectedLoss: 5643.78, minRate: 8.64, age: 60, income: 54000, residential: 'HomeOwner', employment: 'Employed' },
  { id: 7, score: 72.39, pd: 0.1948, decision: 'Accepted', riskBand: 'Medium Risk', expectedLoss: 7793.43, minRate: 10.79, age: 63, income: 51300, residential: 'renter', employment: 'Employed' },
  { id: 9, score: 65.35, pd: 0.2307, decision: 'Accepted', riskBand: 'Medium Risk', expectedLoss: 9227.62, minRate: 12.23, age: 38, income: 41000, residential: 'HomeOwner', employment: 'Employed' },
  { id: 2, score: 63.43, pd: 0.2412, decision: 'Accepted', riskBand: 'Medium Risk', expectedLoss: 9647.69, minRate: 12.65, age: 22, income: 53000, residential: 'HomeOwner', employment: 'Employed' },
  { id: 12, score: 63.43, pd: 0.2412, decision: 'Accepted', riskBand: 'Medium Risk', expectedLoss: 9647.69, minRate: 12.65, age: 25, income: 53800, residential: 'HomeOwner', employment: 'Employed' },
  { id: 13, score: 63.43, pd: 0.2412, decision: 'Accepted', riskBand: 'Medium Risk', expectedLoss: 9647.69, minRate: 12.65, age: 32, income: 66500, residential: 'HomeOwner', employment: 'Employed' },
  { id: 17, score: 60.73, pd: 0.2566, decision: 'Accepted', riskBand: 'Medium Risk', expectedLoss: 10264.41, minRate: 13.26, age: 39, income: 68500, residential: 'renter', employment: 'Employed' },
  { id: 19, score: 51.76, pd: 0.312, decision: 'Accepted', riskBand: 'Medium Risk', expectedLoss: 12481.8, minRate: 15.48, age: 40, income: 66000, residential: 'HomeOwner', employment: 'Other' },
  { id: 10, score: 50.71, pd: 0.319, decision: 'Accepted', riskBand: 'Medium Risk', expectedLoss: 12759.2, minRate: 15.76, age: 57, income: 68700, residential: 'renter', employment: 'Other' },
  { id: 14, score: 50.46, pd: 0.3206, decision: 'Accepted', riskBand: 'Medium Risk', expectedLoss: 12824.07, minRate: 15.82, age: 66, income: 31200, residential: 'renter', employment: 'Other' },
  { id: 8, score: 42.62, pd: 0.3747, decision: 'Rejected', riskBand: 'High Risk', expectedLoss: 14986.84, minRate: 17.99, age: 29, income: 44000, residential: 'renter', employment: 'Employed' },
  { id: 16, score: 42.61, pd: 0.3748, decision: 'Rejected', riskBand: 'High Risk', expectedLoss: 14990.13, minRate: 17.99, age: 63, income: 45400, residential: 'renter', employment: 'Other' },
  { id: 3, score: 35.56, pd: 0.4263, decision: 'Rejected', riskBand: 'High Risk', expectedLoss: 17050.34, minRate: 20.05, age: 55, income: 30000, residential: 'renter', employment: 'Other' },
  { id: 11, score: 34.38, pd: 0.4351, decision: 'Rejected', riskBand: 'High Risk', expectedLoss: 17402.91, minRate: 20.4, age: 59, income: 23500, residential: 'HomeOwner', employment: 'Other' },
  { id: 20, score: 21.67, pd: 0.5315, decision: 'Rejected', riskBand: 'High Risk', expectedLoss: 21259.89, minRate: 24.26, age: 63, income: 22500, residential: 'renter', employment: 'Other' },
  { id: 15, score: 10.01, pd: 0.6181, decision: 'Rejected', riskBand: 'High Risk', expectedLoss: 24722.98, minRate: 27.72, age: 38, income: 23000, residential: 'renter', employment: 'Other' },
  { id: 18, score: 0, pd: 0.687, decision: 'Rejected', riskBand: 'High Risk', expectedLoss: 27480.86, minRate: 30.48, age: 68, income: 64700, residential: 'renter', employment: 'Employed' },
];

export const PORTFOLIO_SUMMARY = {
  totalClients: 20,
  accepted: 13,
  rejected: 7,
  acceptedExposure: 1_300_000,
  acceptedExpectedLoss: 115_621.68,
  acceptedAvgPd: 0.2223,
  acceptedAvgRate: 11.89,
  riskBands: { 'Low Risk': 4, 'Medium Risk': 9, 'High Risk': 7 },
};

export const HISTORICAL = {
  count: 500,
  defaultRate: 0.36,
  goodCount: 320,
  badCount: 180,
  defaultDistribution: { good: 320, bad: 180 },
  ageDefaultRate: { '<35': 0.48, '35-50': 0.382, '50-65': 0.2857, '65+': 0.1111 },
  residentialDefaultRate: { HomeOwner: 0.308, renter: 0.4022 },
  employmentDefaultRate: { Employed: 0.2829, Other: 0.4378 },
  incomeDefaultRate: { '<30k': 0.5467, '30-40k': 0.3857, '40-50k': 0.283, '50k+': 0.186 },
};

export const METHODOLOGY_STEPS = [
  { step: 1, title: 'Data Loading', desc: 'HistoricalData & ActualPortfolioData from Excel' },
  { step: 2, title: 'Train/Test Split', desc: '70/30 hold-out validation (350 / 150)' },
  { step: 3, title: 'Autobinning & WOE', desc: 'creditscorecard + plotbins + bininfo' },
  { step: 4, title: 'Manual Bin Refinement', desc: 'Age [35,50,65] · Income [30k,40k,50k]' },
  { step: 5, title: 'Logistic Regression', desc: 'fitmodel on WOE-transformed features' },
  { step: 6, title: 'Score Scaling', desc: 'formatpoints WorstAndBestScores [0, 100]' },
  { step: 7, title: 'Threshold Optimization', desc: 'Maximize TPR + TNR on training scores' },
  { step: 8, title: 'Portfolio Scoring', desc: 'score · probdefault · accept/reject' },
  { step: 9, title: 'Expected Loss', desc: 'EL = PD × LGD × Exposure (60% recovery)' },
  { step: 10, title: 'Risk-Based Pricing', desc: 'Min rate = base 3% + PD × LGD' },
];
