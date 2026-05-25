export const SPEAKER_NOTES: Record<number, string[]> = {
  1: [
    'Good morning. We present Portfolio Optimisation & Interest Rate Pricing using a credit scoring model.',
    'A bank needs to decide who to lend to and at what rate. Too lenient = defaults; too strict = lost business.',
    'Our project connects data → score → decision → expected loss → price into one workflow.',
    'Team of six. Each member presents one slide and one matching dashboard section.',
  ],
  2: [
    'The bank receives loan applications but does not know who will repay.',
    'Two business questions: (1) Accept or reject? (2) What minimum rate covers the credit risk?',
    'Our aim: a scorecard that ranks clients on a 0–100 scale and converts that ranking into actions.',
    'Decision threshold: 48.2032 — chosen by the Kolmogorov–Smirnov statistic, not by hand.',
    'Output for each client: Score, PD, Decision, Expected Loss, Minimum rate.',
  ],
  3: [
    'Data source: DataProjScoreCard.xlsx — two sheets, four predictors, one binary target.',
    'HistoricalData: 500 past clients with known Default — trains and validates the model.',
    'ActualPortfolioData: 20 new applicants, each requesting $100,000 — receives the decision.',
    'Predictors: Age, Income (numeric); Residential Status, Employment Status (categorical).',
    'No missing values. ID and the pre-existing PD column are excluded — the model learns relationships on its own.',
  ],
  4: [
    'Five steps: Binning → Weight of Evidence → Logistic Regression → 0–100 score → ROC validation.',
    'Information Value ranks predictor strength: Income strongest (0.2355), Residential Status weakest (0.0417).',
    'Logistic regression keeps all 4 predictors at the 5% significance level.',
    'Validation on HistoricalData: AUC 0.6775, KS 0.2892, optimal cutoff at score 48.20.',
    'Be honest: useful ranking power, not perfect — a real deployment would need out-of-sample testing.',
  ],
  5: [
    'Decision rule: Accept if Score ≥ 48.2032.',
    '14 accepted, 6 rejected. Total exposure $1.4M. Average PD of accepted: 23.09%.',
    'Risk bands: 5 Low (score >80), 9 Medium (50–80), 6 High (<50, all rejected).',
    'Client 8 example: accepted (score 55.8) but riskiest accepted (PD 33.5%) — priced at 13.40%.',
    'Accepted ≠ safe. The price reflects the residual risk.',
  ],
  6: [
    'EL = PD × LGD × EAD. With LGD = 40% and EAD = $100k: $129,329.63 total across 14 loans.',
    'Minimum break-even rate: r_min = PD × LGD. Average across accepted = 9.24%.',
    'Cheapest: 5.11% (clients 4, 5). Most expensive: 13.40% (client 8).',
    'Any uniform spread above 9.24% flows straight to the bank\'s expected margin.',
    'In conclusion: the workflow connects machine learning to a real lending and pricing decision. Thank you.',
  ],
};
