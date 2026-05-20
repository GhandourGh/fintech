#!/usr/bin/env python3
"""Validate dashboard numbers against DataProjScoreCard.xlsx and EL target."""

import json
import re
import sys
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
XLSX = ROOT / "data" / "DataProjScoreCard.xlsx"
PROJECT_DATA = ROOT / "fintech-dashboard" / "src" / "data" / "projectData.ts"

TARGET_EL = 129_329.63
LGD, EAD = 0.4, 100_000


def parse_portfolio_ts(path: Path):
    text = path.read_text()
    block = text.split("export const PORTFOLIO_CLIENTS")[1].split("];")[0]
    rows = []
    for m in re.finditer(
        r"id:\s*(\d+).*?score:\s*([\d.]+).*?pd:\s*([\d.]+).*?"
        r"decision:\s*'(Accepted|Rejected)'.*?expectedLoss:\s*([\d.]+).*?"
        r"minRate:\s*([\d.]+).*?age:\s*(\d+).*?income:\s*(\d+)",
        block,
        re.S,
    ):
        rows.append(
            {
                "id": int(m.group(1)),
                "score": float(m.group(2)),
                "pd": float(m.group(3)),
                "decision": m.group(4),
                "el": float(m.group(5)),
                "rate": float(m.group(6)),
                "age": int(m.group(7)),
                "income": int(m.group(8)),
            }
        )
    return rows


def main():
    errors = []
    hist = pd.read_excel(XLSX, "HistoricalData")
    port_x = pd.read_excel(XLSX, "ActualPortfolioData").dropna(subset=["ID"])
    port_x["ID"] = port_x["ID"].astype(int)

    if len(hist) != 500:
        errors.append(f"Historical count {len(hist)} != 500")
    if hist["Default"].mean() != 0.36:
        errors.append(f"Default rate {hist['Default'].mean()} != 0.36")

    rows = parse_portfolio_ts(PROJECT_DATA)
    accepted = [r for r in rows if r["decision"] == "Accepted"]

    el_sum = sum(r["el"] for r in accepted)
    if abs(el_sum - TARGET_EL) > 0.01:
        errors.append(f"Accepted EL sum {el_sum} != {TARGET_EL}")
    if len(accepted) != 14:
        errors.append(f"Accepted count {len(accepted)} != 14 (fintech.pdf)")

    avg_pd = sum(r["pd"] for r in accepted) / len(accepted) if accepted else 0
    avg_rate = sum(r["rate"] for r in accepted) / len(accepted) if accepted else 0
    if abs(avg_pd - 0.2309) > 0.002:
        errors.append(f"Avg accepted PD {avg_pd:.4f} != 0.2309")
    if abs(avg_rate - 9.24) > 0.05:
        errors.append(f"Avg accepted rate {avg_rate:.2f}% != 9.24%")

    for r in rows:
        calc_el = round(r["pd"] * LGD * EAD, 2)
        calc_rate = round(r["pd"] * LGD * 100, 2)
        if abs(calc_el - r["el"]) > 3:
            errors.append(f"Client {r['id']} EL {r['el']} != formula {calc_el}")
        if abs(calc_rate - r["rate"]) > 0.02:
            errors.append(f"Client {r['id']} rate {r['rate']} != formula {calc_rate}")
        if r["decision"] == "Accepted" and r["score"] < 48.2032:
            errors.append(f"Client {r['id']} accepted but score {r['score']} < 48.2032")
        if r["decision"] == "Rejected" and r["score"] >= 48.2032:
            errors.append(f"Client {r['id']} rejected but score {r['score']} >= 48.2032")

        ex = port_x[port_x["ID"] == r["id"]].iloc[0]
        if int(ex["Age"]) != r["age"] or int(ex["Income"]) != r["income"]:
            errors.append(f"Client {r['id']} demographics mismatch Excel")

    print(f"Accepted: {len(accepted)}, EL sum: {el_sum:,.2f}")
    print(f"Avg PD: {sum(r['pd'] for r in accepted)/len(accepted)*100:.2f}%")
    print(f"Avg rate: {sum(r['rate'] for r in accepted)/len(accepted):.2f}%")

    if errors:
        print("\nFAILED:")
        for e in errors:
            print(" -", e)
        sys.exit(1)
    print("\nAll checks passed.")
    return 0


if __name__ == "__main__":
    main()
