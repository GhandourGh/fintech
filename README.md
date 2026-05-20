# FinTech Credit Scorecard Project

AI in FinTech — credit scorecard modeling, portfolio decisions, expected loss, and risk-based pricing. The interactive dashboard (**RiskLens**) reflects the official report in `docs/fintech.pdf`.

## Project layout

```
Fintech-Project/
├── docs/
│   └── fintech.pdf              # Final report (source of truth)
├── data/
│   └── DataProjScoreCard.xlsx   # HistoricalData + ActualPortfolioData
├── matlab/
│   └── FinTech_Scorecard_Project.m
├── scripts/
│   ├── generate_charts.py       # Regenerate dashboard chart PNGs
│   ├── export_report_csv.py     # Export Table 15 / validation CSVs
│   └── validate_dashboard.py    # Check numbers vs report + Excel
└── fintech-dashboard/           # React + Vite web app
```

## Run the dashboard

```bash
cd fintech-dashboard
npm install
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173/).

## Regenerate assets

From the **repository root**:

```bash
python3 scripts/generate_charts.py
python3 scripts/export_report_csv.py
python3 scripts/validate_dashboard.py
```

Charts appear under `fintech-dashboard/public/generated/`. CSVs under `fintech-dashboard/public/data/`.

## Run MATLAB

Open `matlab/FinTech_Scorecard_Project.m` in MATLAB. The script reads `data/DataProjScoreCard.xlsx` automatically.

## Deploy

Build: `cd fintech-dashboard && npm run build`

Deploy the `fintech-dashboard` folder on Vercel or Netlify with root directory `fintech-dashboard`, build command `npm run build`, publish directory `dist`.

## Key results (fintech.pdf)

| Metric | Value |
|--------|--------|
| AUC | 0.6775 |
| KS cutoff | 48.2032 |
| Accepted / rejected | 14 / 6 |
| Total EL (accepted) | $129,329.63 |
| Avg min rate (accepted) | 9.24% |
