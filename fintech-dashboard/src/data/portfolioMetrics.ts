import { PORTFOLIO_CLIENTS, type PortfolioClient } from './projectData';

/** Match PROJECT_META / fintech.pdf Table 16 */
const LGD = 0.4;
const EAD = 100_000;
export const REPORT_ACCEPTED_EL = 129_329.63;

/** EL = PD × LGD × EAD (FinTech_Scorecard_Project.m) */
export function expectedLossFromPd(pd: number) {
  return pd * LGD * EAD;
}

/** MinRatePct = 100 × PD × LGD */
export function minRateFromPd(pd: number) {
  return pd * LGD * 100;
}

export function getAcceptedClients() {
  return PORTFOLIO_CLIENTS.filter((c) => c.decision === 'Accepted');
}

export function getRejectedClients() {
  return PORTFOLIO_CLIENTS.filter((c) => c.decision === 'Rejected');
}

/** Totals derived from client rows so UI always matches the table. */
export function computePortfolioSummary() {
  const accepted = getAcceptedClients();
  const rejected = getRejectedClients();
  const acceptedExpectedLoss = accepted.reduce((s, c) => s + c.expectedLoss, 0);
  const acceptedAvgPd =
    accepted.length > 0 ? accepted.reduce((s, c) => s + c.pd, 0) / accepted.length : 0;
  const acceptedAvgRate =
    accepted.length > 0 ? accepted.reduce((s, c) => s + c.minRate, 0) / accepted.length : 0;

  const riskBands = { 'Low Risk': 0, 'Medium Risk': 0, 'High Risk': 0 };
  for (const c of PORTFOLIO_CLIENTS) {
    riskBands[c.riskBand] += 1;
  }

  return {
    totalClients: PORTFOLIO_CLIENTS.length,
    accepted: accepted.length,
    rejected: rejected.length,
    acceptedExposure: accepted.length * EAD,
    acceptedExpectedLoss,
    acceptedAvgPd,
    acceptedAvgRate,
    riskBands,
  };
}

export const PORTFOLIO_SUMMARY = computePortfolioSummary();

/** Dev-time check: every row satisfies FinTech formulas. */
export function validatePortfolioRows(clients: PortfolioClient[] = PORTFOLIO_CLIENTS) {
  const tol = 0.02;
  for (const c of clients) {
    const el = expectedLossFromPd(c.pd);
    const rate = minRateFromPd(c.pd);
    if (Math.abs(el - c.expectedLoss) > tol && Math.abs(el - c.expectedLoss - 0.01) > tol) {
      console.warn(`Client ${c.id}: EL ${c.expectedLoss} vs formula ${el.toFixed(2)}`);
    }
    if (Math.abs(rate - c.minRate) > tol) {
      console.warn(`Client ${c.id}: rate ${c.minRate} vs formula ${rate.toFixed(2)}`);
    }
  }
}

if (import.meta.env.DEV) {
  validatePortfolioRows();
}
