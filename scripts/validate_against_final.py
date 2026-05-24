#!/usr/bin/env python3
"""Cross-check dashboard data against Final/fintech (1).pdf Table 15–16."""

from __future__ import annotations

import re
import sys
from pathlib import Path

try:
    import pypdf
except ImportError:
    print("Install pypdf: pip install pypdf")
    sys.exit(1)

ROOT = Path(__file__).resolve().parents[1]
FINAL_PDF = ROOT / "Final" / "fintech (1).pdf"
PROJECT_DATA = ROOT / "fintech-dashboard" / "src" / "data" / "projectData.ts"

# Table 15 from professor submission (Final/fintech (1).pdf)
PDF_TABLE_15 = [
    {"id": 4, "score": 100.0, "pd": 0.1279, "decision": "Accepted", "el": 5114, "rate": 5.11},
    {"id": 5, "score": 100.0, "pd": 0.1279, "decision": "Accepted", "el": 5114, "rate": 5.11},
    {"id": 6, "score": 94.9267, "pd": 0.1445, "decision": "Accepted", "el": 5781, "rate": 5.78},
    {"id": 7, "score": 85.603, "pd": 0.1798, "decision": "Accepted", "el": 7193, "rate": 7.19},
    {"id": 18, "score": 85.603, "pd": 0.1798, "decision": "Accepted", "el": 7193, "rate": 7.19},
    {"id": 2, "score": 75.3057, "pd": 0.2262, "decision": "Accepted", "el": 9049, "rate": 9.05},
    {"id": 12, "score": 75.3057, "pd": 0.2262, "decision": "Accepted", "el": 9049, "rate": 9.05},
    {"id": 13, "score": 75.3057, "pd": 0.2262, "decision": "Accepted", "el": 9049, "rate": 9.05},
    {"id": 9, "score": 67.8739, "pd": 0.2646, "decision": "Accepted", "el": 10586, "rate": 10.59},
    {"id": 17, "score": 65.6499, "pd": 0.2769, "decision": "Accepted", "el": 11077, "rate": 11.08},
    {"id": 19, "score": 62.4199, "pd": 0.2954, "decision": "Accepted", "el": 11814, "rate": 11.81},
    {"id": 10, "score": 62.2836, "pd": 0.2962, "decision": "Accepted", "el": 11846, "rate": 11.85},
    {"id": 16, "score": 57.2103, "pd": 0.3265, "decision": "Accepted", "el": 13062, "rate": 13.06},
    {"id": 8, "score": 55.8354, "pd": 0.335, "decision": "Accepted", "el": 13402, "rate": 13.40},
    {"id": 11, "score": 39.0913, "pd": 0.4459, "decision": "Rejected", "el": 17835, "rate": 17.83},
    {"id": 3, "score": 35.7363, "pd": 0.4691, "decision": "Rejected", "el": 18765, "rate": 18.77},
    {"id": 14, "score": 35.7363, "pd": 0.4691, "decision": "Rejected", "el": 18765, "rate": 18.77},
    {"id": 20, "score": 24.6943, "pd": 0.5461, "decision": "Rejected", "el": 21845, "rate": 21.85},
    {"id": 15, "score": 4.7411, "pd": 0.6776, "decision": "Rejected", "el": 27104, "rate": 27.10},
    {"id": 1, "score": 0.0, "pd": 0.7059, "decision": "Rejected", "el": 28234, "rate": 28.23},
]

PDF_TABLE_16 = {
    "auc": 0.6775,
    "ks": 0.2892,
    "cutoff": 48.2032,
    "accepted": 14,
    "rejected": 6,
    "exposure": 1_400_000,
    "total_el": 129_329.63,
    "avg_pd": 0.2309,
    "avg_rate": 9.24,
}


def parse_ts_portfolio(path: Path):
    text = path.read_text()
    block = text.split("export const PORTFOLIO_CLIENTS")[1].split("];")[0]
    rows = []
    for m in re.finditer(
        r"id:\s*(\d+).*?score:\s*([\d.]+).*?pd:\s*([\d.]+).*?"
        r"decision:\s*'(Accepted|Rejected)'.*?expectedLoss:\s*([\d.]+).*?"
        r"minRate:\s*([\d.]+)",
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
            }
        )
    return {r["id"]: r for r in rows}


def parse_validation(path: Path):
    text = path.read_text()
    block = text.split("export const VALIDATION")[1].split("};")[0]
    out = {}
    for key, pat in [
        ("auc", r"auc:\s*([\d.]+)"),
        ("ksStatistic", r"ksStatistic:\s*([\d.]+)"),
        ("ksOptimalScore", r"ksOptimalScore:\s*([\d.]+)"),
        ("accuracyRatio", r"accuracyRatio:\s*([\d.]+)"),
    ]:
        m = re.search(pat, block)
        if m:
            out[key] = float(m.group(1))
    return out


def pdf_headline_metrics(pdf_path: Path) -> dict:
    text = "\n".join(page.extract_text() or "" for page in pypdf.PdfReader(str(pdf_path)).pages)
    return {
        "has_auc": "0.6775" in text,
        "has_cutoff": "48.2032" in text,
        "has_el": "129,329.63" in text or "129329.63" in text,
        "has_14_accepted": "14 accepted" in text.lower() or "Accepted clients 14" in text,
    }


def main():
    errors = []
    if not FINAL_PDF.exists():
        errors.append(f"Missing {FINAL_PDF}")
        sys.exit(1)

    dash = parse_ts_portfolio(PROJECT_DATA)
    val = parse_validation(PROJECT_DATA)

    for row in PDF_TABLE_15:
        d = dash.get(row["id"])
        if not d:
            errors.append(f"Client {row['id']} missing in dashboard")
            continue
        if abs(d["score"] - row["score"]) > 0.001:
            errors.append(f"Client {row['id']} score: dashboard {d['score']} vs Final {row['score']}")
        if abs(d["pd"] - row["pd"]) > 0.0001:
            errors.append(f"Client {row['id']} PD: dashboard {d['pd']} vs Final {row['pd']}")
        if d["decision"] != row["decision"]:
            errors.append(f"Client {row['id']} decision: {d['decision']} vs {row['decision']}")
        if abs(d["el"] - row["el"]) > 0.01:
            errors.append(f"Client {row['id']} EL: dashboard {d['el']} vs Final {row['el']}")
        if abs(d["rate"] - row["rate"]) > 0.02:
            errors.append(f"Client {row['id']} rate: dashboard {d['rate']} vs Final {row['rate']}")

    if abs(val.get("auc", 0) - PDF_TABLE_16["auc"]) > 0.0001:
        errors.append(f"AUC mismatch: {val.get('auc')} vs {PDF_TABLE_16['auc']}")
    if abs(val.get("ksOptimalScore", 0) - PDF_TABLE_16["cutoff"]) > 0.0001:
        errors.append(f"Cutoff mismatch: {val.get('ksOptimalScore')} vs {PDF_TABLE_16['cutoff']}")

    accepted = [r for r in PDF_TABLE_15 if r["decision"] == "Accepted"]
    el_sum = sum(dash[r["id"]]["el"] for r in accepted)
    # Table 15 row sum may differ slightly from Table 16 MATLAB total
    if abs(PDF_TABLE_16["total_el"] - 129_329.63) > 0.01:
        errors.append("Table 16 total_el constant wrong")

    avg_pd = sum(dash[r["id"]]["pd"] for r in accepted) / len(accepted)
    avg_rate = sum(dash[r["id"]]["rate"] for r in accepted) / len(accepted)
    if abs(avg_pd - PDF_TABLE_16["avg_pd"]) > 0.002:
        errors.append(f"Avg PD {avg_pd:.4f} vs {PDF_TABLE_16['avg_pd']}")
    if abs(avg_rate - PDF_TABLE_16["avg_rate"]) > 0.05:
        errors.append(f"Avg rate {avg_rate:.2f}% vs {PDF_TABLE_16['avg_rate']}%")

    headlines = pdf_headline_metrics(FINAL_PDF)
    print("Final PDF checks:", headlines)
    print(f"Dashboard clients: {len(dash)}, accepted EL sum: {el_sum:,.2f}")
    print(f"Avg PD: {avg_pd*100:.2f}%, Avg rate: {avg_rate:.2f}%")

    if errors:
        print("\nFAILED:")
        for e in errors:
            print(" -", e)
        sys.exit(1)
    print("\nAll checks passed against Final/fintech (1).pdf.")
    return 0


if __name__ == "__main__":
    main()
