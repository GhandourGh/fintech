# RiskLens — Credit Scorecard Dashboard

Presentation dashboard for the **AI in FinTech** credit scorecard project (MATLAB backend unchanged).

## Run locally

```bash
cd fintech-dashboard
npm install
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

## Stack

- React + TypeScript + Vite
- Tailwind CSS v4
- Recharts
- Framer Motion
- React Router

## Data source

Metrics and portfolio results are taken from the project report and MATLAB outputs (`DataProjScoreCard.xlsx`, validation AUC 0.5636, threshold 50.46, 13 accepted / 7 rejected, etc.). No scoring logic is reimplemented in this UI.

## Pages

Overview · Scorecard · WOE & Binning · ROC Validation · Portfolio Risk · Accept/Reject · Expected Loss · Risk Pricing · Client Explorer · Model Performance · Final Decision
