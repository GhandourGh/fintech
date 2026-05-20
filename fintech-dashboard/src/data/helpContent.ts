export type HelpEntry = { title: string; body: string };

export const HELP = {
  // Pages
  'page.overview': {
    title: 'Executive overview',
    body: 'High-level summary of the credit scorecard project: historical training data, model validation, and the final portfolio decision. All numbers come from your MATLAB workflow and written report.',
  },
  'page.scorecard': {
    title: 'Credit scorecard',
    body: 'Shows how each borrower characteristic (Age, Income, housing, employment) translates into score points after binning and logistic regression. Higher total points mean lower risk on the 0–100 scale.',
  },
  'page.woe': {
    title: 'WOE & binning',
    body: 'Weight of Evidence (WOE) measures how strongly each variable bin separates good payers from defaulters. Positive WOE = safer bin; negative WOE = riskier bin. Bins match MATLAB cut points.',
  },
  'page.validation': {
    title: 'Model validation',
    body: 'The model was evaluated on 30% hold-out test data (150 observations) never seen during training. ROC/AUC tests ranking ability; the confusion matrix tests accept/reject accuracy at the optimal threshold.',
  },
  'page.portfolio': {
    title: 'Portfolio risk',
    body: 'Results of scoring all 20 applicants in ActualPortfolioData with the production scorecard trained on full historical data. Each point is one client’s score and model-based probability of default (PD).',
  },
  'page.decisions': {
    title: 'Accept vs reject',
    body: 'Credit decision rule from MATLAB: Accept if Score ≥ 50.46, otherwise Reject. This threshold was chosen on training data to balance true positive and true negative rates.',
  },
  'page.expectedLoss': {
    title: 'Expected loss',
    body: 'For accepted clients only: estimated average loss if they default, using EL = PD × LGD × loan amount. Recovery rate is 60%, so LGD = 40%. Each client has a $100,000 exposure in the project.',
  },
  'page.pricing': {
    title: 'Risk-based pricing',
    body: 'Minimum interest rate each client must pay to cover expected credit loss plus a 3% base funding cost. Formula: rate = 3% + (PD × LGD), shown as a percentage.',
  },
  'page.explorer': {
    title: 'Client explorer',
    body: 'Browse any of the 20 portfolio clients and inspect their official MATLAB outputs: score, PD, risk band, expected loss, and minimum rate.',
  },
  'page.performance': {
    title: 'Model performance',
    body: 'Consolidated view of validation metrics and final portfolio outcomes. Useful for summarizing whether the scorecard is fit for ranking and policy decisions in this academic project.',
  },
  'page.final': {
    title: 'Final portfolio',
    body: 'The bank’s selected book: only accepted clients. Shows total exposure, portfolio expected loss, and the split between approved and declined applications.',
  },
  'page.test': {
    title: 'Live client test',
    body: 'Presentation tool: pick a portfolio client or enter a profile, then run a simulated credit test. Portfolio clients return exact MATLAB results; custom profiles show point breakdown for demo only.',
  },

  // Overview metrics
  'metric.historicalRecords': {
    title: 'Historical records (500)',
    body: 'Rows in the HistoricalData sheet used to train and validate the scorecard. Each record has Age, Income, ResidentialStatus, EmploymentStatus, and Default (0 = good, 1 = bad).',
  },
  'metric.testAuc': {
    title: 'Test AUC (0.5636)',
    body: 'Area Under the ROC Curve on unseen test data. 0.5 = random guessing; 1.0 = perfect ranking. Your model is slightly better than random—acceptable for demonstrating the full methodology.',
  },
  'metric.portfolioClients': {
    title: 'Portfolio clients (20)',
    body: 'Applicants in ActualPortfolioData scored by the final production model. 13 were accepted and 7 rejected using the optimal score cutoff.',
  },
  'metric.acceptedExposure': {
    title: 'Accepted exposure',
    body: 'Total loan amount for accepted clients: 13 × $100,000 = $1,300,000. Expected loss below is the sum of EL across those accepted clients only.',
  },

  // Overview sections
  'section.defaultDistribution': {
    title: 'Default distribution',
    body: 'Pie chart of good (no default) vs bad (default) customers in historical data. 36% default rate means 180 bad and 320 good observations—typical for a risk modeling exercise.',
  },
  'section.keyParameters': {
    title: 'Key parameters',
    body: 'Assumptions used in portfolio scoring: $100k loan per client, 60% recovery if default (40% LGD), 3% base rate for pricing, and score threshold 50.46 for accept/reject.',
  },
  'section.workflow': {
    title: 'MATLAB workflow',
    body: 'Ten-step pipeline from Excel import through WOE binning, logistic scorecard, validation, portfolio scoring, expected loss, and risk-based interest rates—matching your submitted code.',
  },
  'section.incomeDefault': {
    title: 'Default rate by income',
    body: 'Exploratory chart: lower income bands show higher historical default rates, which is why Income receives strong positive scorecard points for higher earners.',
  },

  // Validation
  'metric.auc': {
    title: 'AUC',
    body: 'Area under ROC curve on test set. Measures how well the scorecard ranks risky clients above safe ones, regardless of the exact cutoff.',
  },
  'metric.accuracy': {
    title: 'Accuracy',
    body: 'Share of test clients correctly classified as default or non-default at the optimal threshold. Here ~61%—decent but not production-grade without more variables.',
  },
  'metric.precision': {
    title: 'Precision',
    body: 'Of all clients predicted to default, what fraction actually defaulted in the test set. Answers: “When we flag risk, how often are we right?”',
  },
  'metric.recall': {
    title: 'Recall',
    body: 'Of all actual defaulters in the test set, what fraction the model caught. Answers: “How many bad clients do we miss?”',
  },
  'metric.f1': {
    title: 'F1 score',
    body: 'Harmonic mean of precision and recall—single number balancing false alarms vs missed defaulters.',
  },
  'section.roc': {
    title: 'ROC curve',
    body: 'Plots True Positive Rate vs False Positive Rate at all score cutoffs. The teal line is your scorecard; the dashed line is random. Higher curve = better discrimination.',
  },
  'section.confusion': {
    title: 'Confusion matrix',
    body: 'Counts of correct and incorrect predictions on 150 test observations: TP/FP/TN/FN after applying the optimized threshold from training data.',
  },

  // Scorecard predictors
  'predictor.age': {
    title: 'Age points',
    body: 'Bins: under 35, 35–50, 50–65, 65+. Older applicants receive more points (lower risk), matching banking practice and your manual cut points [35, 50, 65].',
  },
  'predictor.income': {
    title: 'Income points',
    body: 'Bins: <$30k, $30–40k, $40–50k, $50k+. Higher income adds more points—reflecting greater repayment capacity.',
  },
  'predictor.residential': {
    title: 'Residential status',
    body: 'Homeowners score higher than renters in the final scorecard, indicating lower estimated default risk in your historical sample.',
  },
  'predictor.employment': {
    title: 'Employment status',
    body: 'Employed clients receive much higher points than “Other”, a strong stability signal in the model.',
  },

  // WOE
  'section.woeChart': {
    title: 'WOE chart',
    body: 'Bar height = Weight of Evidence for each bin of the selected variable. The zero line separates risk-increasing (below) from risk-decreasing (above) bins.',
  },

  // Portfolio & decisions
  'section.scoreVsPd': {
    title: 'Score vs PD',
    body: 'Each dot is one portfolio client. Higher score should mean lower PD. Red vertical line = accept threshold (50.46). Green dots = accepted; red = rejected.',
  },
  'section.riskBands': {
    title: 'Risk bands',
    body: 'Low Risk (score ≥ 80), Medium Risk (50–80), High Risk (< 50). Segmentation for monitoring and pricing, applied after scoring.',
  },
  'section.decisionBreakdown': {
    title: 'Decision breakdown',
    body: 'Count of accepted vs rejected applications out of 20 portfolio clients using the MATLAB decision rule.',
  },
  'section.scoresThreshold': {
    title: 'Scores vs threshold',
    body: 'Bar chart of each client’s credit score. Bars above the red line pass; below fail. Useful to show borderline cases (e.g. client 14 at 50.46).',
  },
  'section.portfolioTable': {
    title: 'Portfolio results table',
    body: 'Full scoring output per client: ID, Score, PD, Decision, Risk band, and Expected loss—aligned with portfolio_scoring_results from MATLAB.',
  },

  // EL & pricing
  'metric.totalEl': {
    title: 'Total expected loss',
    body: 'Sum of EL for accepted clients only: $115,621.68. This is the portfolio credit cost the bank must cover via reserves or pricing.',
  },
  'metric.avgPd': {
    title: 'Average PD (accepted)',
    body: 'Mean model probability of default across the 13 accepted clients: 22.23%. Lower than the full portfolio because high-PD clients were rejected.',
  },
  'metric.exposure': {
    title: 'Accepted exposure',
    body: 'Total dollars lent to approved clients at $100,000 each.',
  },
  'section.elChart': {
    title: 'Expected loss per client',
    body: 'Bar chart of EL = PD × 0.4 × $100,000 for each accepted borrower. Taller bars = more capital at risk.',
  },
  'section.pricingChart': {
    title: 'Minimum interest rates',
    body: 'Risk-based floor rate per client. Safer clients (low PD) get rates near 7–8%; risky rejected clients would need 20–30%+ to compensate expected loss.',
  },

  // Performance & final
  'section.validationRadar': {
    title: 'Validation radar',
    body: 'Compares AUC, accuracy, precision, recall, and F1 on the same 0–100 scale for a quick visual of model strengths and weaknesses.',
  },
  'section.projectOutcomes': {
    title: 'Project outcomes',
    body: 'Key facts for your presentation slide: data size, default rate, test AUC, acceptance rate, and accepted portfolio average PD.',
  },
  'section.portfolioApproved': {
    title: 'Portfolio approved',
    body: 'Headline result: 13 clients, $1.3M exposure, $115,621.68 expected loss, with average PD and pricing on the accepted book only.',
  },
  'section.acceptedList': {
    title: 'Accepted clients',
    body: 'Clients whose score met or exceeded 50.46. These are the loans the bank would book in the optimal portfolio selection.',
  },
  'section.rejectedList': {
    title: 'Rejected clients',
    body: 'Applications declined because the credit score was below the threshold or PD was too high for policy.',
  },

  // Client test
  'section.applicantProfile': {
    title: 'Applicant profile',
    body: 'Enter or load borrower characteristics. Choosing a client from the dropdown loads their Excel attributes and ensures the test uses official MATLAB scores.',
  },
  'section.pointBreakdown': {
    title: 'Point breakdown',
    body: 'Shows which scorecard bin each variable falls into and its points from final_scorecard_points. Sum of points is shown; full 0–100 score uses MATLAB formatpoints scaling.',
  },
  'section.testResult': {
    title: 'Test results',
    body: 'After Run credit test: animated score gauge vs threshold, accept/reject badge, PD, expected loss, and minimum interest rate—the same outputs your script prints for each client.',
  },

  'step.1': { title: 'Step 1 — Data loading', body: 'Read HistoricalData and ActualPortfolioData from DataProjScoreCard.xlsx.' },
  'step.2': { title: 'Step 2 — Train/test split', body: '70% train (350 obs) and 30% test (150 obs) for unbiased validation.' },
  'step.3': { title: 'Step 3 — Autobinning & WOE', body: 'MATLAB creditscorecard autobinning plus plotbins() and bininfo tables.' },
  'step.4': { title: 'Step 4 — Manual bins', body: 'Refine Age and Income cut points to interpretable banking bands.' },
  'step.5': { title: 'Step 5 — Logistic model', body: 'fitmodel() on WOE-transformed features.' },
  'step.6': { title: 'Step 6 — Score scaling', body: 'formatpoints() maps raw points to 0–100 client scores.' },
  'step.7': { title: 'Step 7 — Threshold', body: 'Find cutoff on training scores maximizing TPR + TNR.' },
  'step.8': { title: 'Step 8 — Portfolio scoring', body: 'score() and probdefault() on all 20 actual applicants.' },
  'step.9': { title: 'Step 9 — Expected loss', body: 'EL = PD × LGD × exposure per client.' },
  'step.10': { title: 'Step 10 — Pricing', body: 'Minimum rate = base rate + PD × LGD.' },
} as const satisfies Record<string, HelpEntry>;

export type HelpId = keyof typeof HELP;
