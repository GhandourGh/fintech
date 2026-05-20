#!/usr/bin/env python3
"""Export fintech.pdf-aligned CSVs for dashboard download links."""

from __future__ import annotations

import re
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
PROJECT_DATA = ROOT / "fintech-dashboard" / "src" / "data" / "projectData.ts"
OUT = ROOT / "fintech-dashboard" / "public" / "data"


def parse_portfolio(path: Path):
    text = path.read_text()
    block = text.split("export const PORTFOLIO_CLIENTS")[1].split("];")[0]
    rows = []
    for m in re.finditer(
        r"id:\s*(\d+).*?score:\s*([\d.]+).*?pd:\s*([\d.]+).*?"
        r"decision:\s*'(Accepted|Rejected)'.*?riskBand:\s*'([^']+)'.*?"
        r"expectedLoss:\s*([\d.]+).*?minRate:\s*([\d.]+).*?annualInterest:\s*([\d.]+)",
        block,
        re.S,
    ):
        rows.append(
            {
                "ClientID": int(m.group(1)),
                "Score": float(m.group(2)),
                "PD_Model": float(m.group(3)),
                "Decision": m.group(4),
                "RiskBand": m.group(5),
                "ExpectedLoss": float(m.group(6)),
                "MinRatePct": float(m.group(7)),
                "AnnualInterest": float(m.group(8)),
            }
        )
    return pd.DataFrame(rows).sort_values("Score", ascending=False)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    port = parse_portfolio(PROJECT_DATA)
    port.to_csv(OUT / "portfolio_results.csv", index=False)

    validation = pd.DataFrame(
        [
            {"Metric": "AUC", "Value": 0.6775},
            {"Metric": "KSStatistic", "Value": 0.2892},
            {"Metric": "KSOptimalScore", "Value": 48.2032},
            {"Metric": "AccuracyRatio", "Value": 0.3551},
        ]
    )
    validation.to_csv(OUT / "validation_stats.csv", index=False)

    accepted = port[port["Decision"] == "Accepted"]
    summary = pd.DataFrame(
        [
            {"Metric": "AcceptedClients", "Value": len(accepted)},
            {"Metric": "RejectedClients", "Value": len(port) - len(accepted)},
            {"Metric": "AcceptedExposure", "Value": len(accepted) * 100_000},
            {"Metric": "TotalExpectedLoss", "Value": accepted["ExpectedLoss"].sum()},
            {"Metric": "AvgPD_Accepted", "Value": accepted["PD_Model"].mean()},
            {"Metric": "AvgMinRate_Accepted", "Value": accepted["MinRatePct"].mean()},
        ]
    )
    summary.to_csv(OUT / "portfolio_summary.csv", index=False)
    print(f"Wrote CSVs to {OUT}")


if __name__ == "__main__":
    main()
