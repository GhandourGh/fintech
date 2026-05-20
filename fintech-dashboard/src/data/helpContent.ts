export type HelpEntry = { title: string; body: string };

export const HELP = {
  'page.overview': {
    title: 'Executive overview',
    body: 'Summary aligned with fintech.pdf: 500 historical clients, validatemodel on full sample (AUC 0.6775), 20 portfolio applicants, 14 accepted, total EL $129,329.63.',
  },
  'page.scorecard': {
    title: 'Credit scorecard',
    body: 'Scaled points (Table 11) after formatpoints [0,100]. Higher points = lower risk. Unscaled points in Table 10 of the final report.',
  },
  'page.woe': {
    title: 'WOE & binning',
    body: 'autobinning + bininfo + plotbins per §4. Income IV=0.2355 (strong), Age IV=0.1879 (medium). Positive WOE = safer bin.',
  },
  'page.validation': {
    title: 'Model validation',
    body: 'validatemodel on all 500 HistoricalData rows (no train/test split per assignment). Table 13: AUC 0.6775, KS 0.2892, KS score 48.2032.',
  },
  'page.portfolio': {
    title: 'Portfolio risk',
    body: 'Table 15: score and PD_Model for 20 applicants from probdefault. Sorted by score; cutoff 48.2032 from KS statistic.',
  },
  'page.decisions': {
    title: 'Accept vs reject',
    body: 'Accept if Score ≥ 48.2032 (KS optimal cutoff). 14 accepted, 6 rejected per final report §10.',
  },
  'page.expectedLoss': {
    title: 'Expected loss',
    body: 'EL = PD × LGD × EAD with LGD=40%, EAD=$100,000. Total accepted EL = $129,329.63 (Table 16).',
  },
  'page.pricing': {
    title: 'Risk-based pricing',
    body: 'rmin = PD × LGD (Equation 1, final report). No base rate added. Average rmin on accepted book = 9.24%.',
  },
  'page.explorer': {
    title: 'Client explorer',
    body: 'Table 15 fields per client: Score, PD, Decision, Risk Band, EL ($), rmin (%), Annual Interest ($).',
  },
  'page.performance': {
    title: 'Model performance',
    body: 'Headline validation and portfolio outcomes from fintech.pdf Tables 1, 13, and 16.',
  },
  'page.final': {
    title: 'Final portfolio',
    body: '14 accepted clients, $1,400,000 exposure, $129,329.63 expected loss, 9.24% average minimum rate.',
  },
  'page.test': {
    title: 'Live client test',
    body: 'Portfolio clients 1–20 return exact Table 15 values. Custom profiles show autobinning-based point breakdown for illustration.',
  },

  'metric.historicalRecords': {
    title: 'Historical records (500)',
    body: 'HistoricalData sheet: 320 good, 180 bad (36% default). No missing values (Table 3).',
  },
  'metric.testAuc': {
    title: 'AUC (0.6775)',
    body: 'Area under ROC on HistoricalData (validatemodel). ~68% chance a random defaulter scores lower than a random non-defaulter.',
  },
  'metric.portfolioClients': {
    title: 'Portfolio clients (20)',
    body: 'ActualPortfolioData scored with production scorecard. 14 accepted, 6 rejected at KS cutoff 48.2032.',
  },
  'metric.acceptedExposure': {
    title: 'Accepted exposure',
    body: '14 × $100,000 = $1,400,000 (Table 16). Expected loss sum = $129,329.63.',
  },

  'section.defaultDistribution': {
    title: 'Default distribution',
    body: '320 good (64%) vs 180 bad (36%) — Figure 1 / HistoricalData.',
  },
  'section.keyParameters': {
    title: 'Key parameters',
    body: 'EAD $100k, recovery 60%, LGD 40%, KS cutoff 48.2032, pricing rmin = PD × LGD.',
  },
  'section.workflow': {
    title: 'MATLAB workflow',
    body: 'Ten steps from fintech.pdf: creditscorecard, autobinning, fitmodel, formatpoints, validatemodel, score, probdefault, EL, pricing.',
  },
  'section.incomeDefault': {
    title: 'Default rate by income',
    body: 'From Excel HistoricalData: <30k 56.72%, 30–40k 38.21%, 40–50k 29.70%, 50k+ 21.43%.',
  },

  'metric.auc': {
    title: 'AUC',
    body: '0.6775 on HistoricalData (Table 13).',
  },
  'metric.ks': {
    title: 'KS statistic',
    body: '0.2892 — maximum separation between good and bad cumulative distributions.',
  },
  'metric.threshold': {
    title: 'KS optimal score',
    body: '48.2032 — score at maximum KS; used as portfolio acceptance cutoff.',
  },
  'metric.accuracyRatio': {
    title: 'Accuracy Ratio',
    body: '0.3551 from validatemodel (Table 13).',
  },
  'section.roc': {
    title: 'ROC curve',
    body: 'HistoricalData ROC — AUC 0.6775 (Figure 6). Curve above diagonal = useful ranking power.',
  },
  'section.validationSummary': {
    title: 'Validation summary',
    body: 'Full-sample validation per assignment simplification (no out-of-bag clients).',
  },

  'predictor.age': {
    title: 'Age points',
    body: 'Autobinning bins: (−∞,38), [38,40), [40,46), [46,49), [49,∞) — Table 11.',
  },
  'predictor.income': {
    title: 'Income points',
    body: 'Seven income bins from autobinning — strongest predictor (IV 0.2355).',
  },
  'predictor.residential': {
    title: 'Residential status',
    body: 'HomeOwner +21.10 pts vs renter +6.71 pts (scaled).',
  },
  'predictor.employment': {
    title: 'Employment status',
    body: 'Employed +25.12 pts vs Other +1.80 pts (scaled).',
  },

  'section.woeChart': {
    title: 'WOE chart',
    body: 'WOE from bininfo tables §4. Zero line separates risk-decreasing vs risk-increasing bins.',
  },

  'section.scoreVsPd': {
    title: 'Score vs PD',
    body: 'Monotonic decreasing relationship (Figure 10). Threshold line at 48.2032.',
  },
  'section.riskBands': {
    title: 'Risk bands',
    body: 'Low ≥80 (5 accepted), Medium 50–80 (9 accepted), High <50 (6 rejected) — Figure 11.',
  },
  'section.decisionBreakdown': {
    title: 'Decision breakdown',
    body: '14 accepted, 6 rejected (Table 16).',
  },
  'section.scoresThreshold': {
    title: 'Scores vs threshold',
    body: 'Figure 8: bars above 48.20 accepted. IDs 4 & 5 score 100; ID 1 scores 0.',
  },
  'section.portfolioTable': {
    title: 'Portfolio results table',
    body: 'Matches portfolio_results.csv / Table 15 in fintech.pdf.',
  },

  'metric.totalEl': {
    title: 'Total expected loss',
    body: '$129,329.63 — sum of EL for 14 accepted clients (Table 16).',
  },
  'metric.avgPd': {
    title: 'Average PD (accepted)',
    body: '23.09% mean PD_Model on accepted book (Table 16).',
  },
  'metric.exposure': {
    title: 'Accepted exposure',
    body: '$1,400,000 (14 clients × $100,000).',
  },
  'section.elChart': {
    title: 'Expected loss per client',
    body: 'EL = PD × 0.4 × $100,000 per Table 15 accepted rows.',
  },
  'section.pricingChart': {
    title: 'Minimum interest rates',
    body: 'rmin from 5.11% (IDs 4–5) to 13.40% (ID 8) on accepted book — Table 17.',
  },

  'section.validationRadar': {
    title: 'Validation radar',
    body: 'AUC, KS statistic, and Accuracy Ratio from validatemodel.',
  },
  'section.projectOutcomes': {
    title: 'Project outcomes',
    body: 'Table 1 headline metrics from final report.',
  },
  'section.portfolioApproved': {
    title: 'Portfolio approved',
    body: '14 clients · $1.4M exposure · $129,329.63 EL · 9.24% avg rmin.',
  },
  'section.acceptedList': {
    title: 'Accepted clients',
    body: '14 clients with Score ≥ 48.2032 (Table 15 accepted rows).',
  },
  'section.rejectedList': {
    title: 'Rejected clients',
    body: '6 clients below KS cutoff (IDs 1, 3, 11, 14, 15, 20).',
  },

  'section.applicantProfile': {
    title: 'Applicant profile',
    body: 'Demographics from ActualPortfolioData (Excel). Official test uses Table 15 outputs.',
  },
  'section.pointBreakdown': {
    title: 'Point breakdown',
    body: 'Scaled points from Table 11 bins. Portfolio IDs use official score() output, not sum of bins alone.',
  },
  'section.testResult': {
    title: 'Test results',
    body: 'Score, PD, decision, EL, rmin vs KS cutoff 48.2032.',
  },

  'step.1': { title: 'Step 1 — Data loading', body: 'DataProjScoreCard.xlsx — HistoricalData & ActualPortfolioData.' },
  'step.2': { title: 'Step 2 — Scorecard setup', body: 'Train on all 500 historical clients (no OOB split).' },
  'step.3': { title: 'Step 3 — Autobinning & WOE', body: 'autobinning + bininfo + plotbins.' },
  'step.4': { title: 'Step 4 — Logistic model', body: 'fitmodel — all four predictors significant.' },
  'step.5': { title: 'Step 5 — Score scaling', body: 'formatpoints WorstAndBestScores [0, 100].' },
  'step.6': { title: 'Step 6 — ROC validation', body: 'validatemodel on HistoricalData.' },
  'step.7': { title: 'Step 7 — Portfolio scoring', body: 'score + probdefault on 20 applicants.' },
  'step.8': { title: 'Step 8 — Accept / reject', body: 'Score ≥ 48.2032 (KS cutoff).' },
  'step.9': { title: 'Step 9 — Expected loss', body: 'EL = PD × LGD × EAD.' },
  'step.10': { title: 'Step 10 — Pricing', body: 'rmin = PD × LGD.' },
} as const satisfies Record<string, HelpEntry>;

export type HelpId = keyof typeof HELP;
