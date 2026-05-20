#!/usr/bin/env python3
"""Generate chart PNGs from DataProjScoreCard.xlsx and MATLAB-aligned portfolio metrics."""

from __future__ import annotations

import json
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
XLSX = ROOT / "data" / "DataProjScoreCard.xlsx"
OUT_MATLAB = ROOT / "fintech-dashboard" / "public" / "generated" / "matlab"
OUT_EXCEL = ROOT / "fintech-dashboard" / "public" / "generated" / "excel"

OPTIMAL_SCORE = 48.2032
EAD = 100_000
LGD = 0.4
VALIDATION_AUC = 0.6775

ROC_CURVE = [
    (0, 0), (0.05, 0.18), (0.1, 0.32), (0.15, 0.42), (0.2, 0.5),
    (0.3, 0.6), (0.4, 0.68), (0.5, 0.74), (0.6, 0.8), (0.7, 0.86),
    (0.8, 0.92), (0.9, 0.97), (1, 1),
]

# fintech.pdf Table 15 — portfolio_results.csv
PORTFOLIO = [
    {"id": 4, "score": 100, "pd": 0.1279, "decision": "Accepted", "risk": "Low Risk", "el": 5114, "rate": 5.11},
    {"id": 5, "score": 100, "pd": 0.1279, "decision": "Accepted", "risk": "Low Risk", "el": 5114, "rate": 5.11},
    {"id": 6, "score": 94.9267, "pd": 0.1445, "decision": "Accepted", "risk": "Low Risk", "el": 5781, "rate": 5.78},
    {"id": 7, "score": 85.603, "pd": 0.1798, "decision": "Accepted", "risk": "Low Risk", "el": 7193, "rate": 7.19},
    {"id": 18, "score": 85.603, "pd": 0.1798, "decision": "Accepted", "risk": "Low Risk", "el": 7193, "rate": 7.19},
    {"id": 2, "score": 75.3057, "pd": 0.2262, "decision": "Accepted", "risk": "Medium Risk", "el": 9049, "rate": 9.05},
    {"id": 12, "score": 75.3057, "pd": 0.2262, "decision": "Accepted", "risk": "Medium Risk", "el": 9049, "rate": 9.05},
    {"id": 13, "score": 75.3057, "pd": 0.2262, "decision": "Accepted", "risk": "Medium Risk", "el": 9049, "rate": 9.05},
    {"id": 9, "score": 67.8739, "pd": 0.2646, "decision": "Accepted", "risk": "Medium Risk", "el": 10586, "rate": 10.59},
    {"id": 17, "score": 65.6499, "pd": 0.2769, "decision": "Accepted", "risk": "Medium Risk", "el": 11077, "rate": 11.08},
    {"id": 19, "score": 62.4199, "pd": 0.2954, "decision": "Accepted", "risk": "Medium Risk", "el": 11814, "rate": 11.81},
    {"id": 10, "score": 62.2836, "pd": 0.2962, "decision": "Accepted", "risk": "Medium Risk", "el": 11846, "rate": 11.85},
    {"id": 16, "score": 57.2103, "pd": 0.3265, "decision": "Accepted", "risk": "Medium Risk", "el": 13062, "rate": 13.06},
    {"id": 8, "score": 55.8354, "pd": 0.335, "decision": "Accepted", "risk": "Medium Risk", "el": 13402.63, "rate": 13.4},
    {"id": 11, "score": 39.0913, "pd": 0.4459, "decision": "Rejected", "risk": "High Risk", "el": 17835, "rate": 17.83},
    {"id": 3, "score": 35.7363, "pd": 0.4691, "decision": "Rejected", "risk": "High Risk", "el": 18765, "rate": 18.77},
    {"id": 14, "score": 35.7363, "pd": 0.4691, "decision": "Rejected", "risk": "High Risk", "el": 18765, "rate": 18.77},
    {"id": 20, "score": 24.6943, "pd": 0.5461, "decision": "Rejected", "risk": "High Risk", "el": 21845, "rate": 21.85},
    {"id": 15, "score": 4.7411, "pd": 0.6776, "decision": "Rejected", "risk": "High Risk", "el": 27104, "rate": 27.1},
    {"id": 1, "score": 0, "pd": 0.7059, "decision": "Rejected", "risk": "High Risk", "el": 28234, "rate": 28.23},
]

WOE = {
    "Age": [("< 35", -0.82, 125), ("35–50", 0.18, 157), ("50–65", 0.91, 126), ("65+", 1.38, 92)],
    "Income": [("< $30k", -1.12, 75), ("$30–40k", 0.24, 140), ("$40–50k", 0.74, 127), ("$50k+", 1.28, 158)],
    "ResidentialStatus": [("renter", -0.28, 269), ("HomeOwner", 0.94, 231)],
    "EmploymentStatus": [("Other", -0.19, 241), ("Employed", 1.15, 259)],
}

plt.style.use("seaborn-v0_8-whitegrid")
COLORS = {"good": "#14b8a6", "bad": "#ef4444", "accent": "#0d9488", "muted": "#64748b"}


def save(fig, folder: Path, name: str, title: str) -> dict:
    folder.mkdir(parents=True, exist_ok=True)
    path = folder / f"{name}.png"
    fig.savefig(path, dpi=160, bbox_inches="tight", facecolor="white")
    plt.close(fig)
    return {"id": name, "file": f"{name}.png", "title": title}


def bar_default(hist: pd.DataFrame, folder: Path, name: str, title: str) -> dict:
    counts = hist["Default"].value_counts().sort_index()
    labels = ["Good (0)", "Bad (1)"]
    fig, ax = plt.subplots(figsize=(7, 4.5))
    bars = ax.bar(labels, [counts.get(0, 0), counts.get(1, 0)], color=[COLORS["good"], COLORS["bad"]], edgecolor="white")
    ax.set_title(title, fontsize=13, fontweight="bold")
    ax.set_ylabel("Number of clients")
    ax.grid(axis="y", alpha=0.3)
    for b in bars:
        ax.text(b.get_x() + b.get_width() / 2, b.get_height() + 4, str(int(b.get_height())), ha="center", fontsize=10)
    return save(fig, folder, name, title)


def woe_chart(predictor: str, folder: Path) -> dict:
    rows = WOE[predictor]
    labels = [r[0] for r in rows]
    woe = [r[1] for r in rows]
    counts = [r[2] for r in rows]
    x = np.arange(len(labels))
    fig, ax1 = plt.subplots(figsize=(8, 4.8))
    ax2 = ax1.twinx()
    ax1.bar(x - 0.18, counts, width=0.36, label="Count", color="#94a3b8", alpha=0.85)
    ax2.bar(x + 0.18, woe, width=0.36, label="WOE", color=COLORS["accent"])
    ax1.set_xticks(x)
    ax1.set_xticklabels(labels, rotation=15 if len(labels) > 3 else 0, ha="right")
    ax1.set_ylabel("Count")
    ax2.set_ylabel("Weight of Evidence")
    ax1.set_title(f"plotbins — {predictor} (Count + WOE)", fontsize=13, fontweight="bold")
    fig.legend(loc="upper right")
    return save(fig, folder, f"woe_{predictor.lower()}", f"WOE & bins — {predictor}")


def generate_matlab(hist: pd.DataFrame) -> list:
    charts = []
    f = OUT_MATLAB
    charts.append(bar_default(hist, f, "default_distribution", "Default Distribution in HistoricalData"))

    for pred in WOE:
        charts.append(woe_chart(pred, f))

    fpr, tpr = zip(*ROC_CURVE)
    fig, ax = plt.subplots(figsize=(6.5, 6))
    ax.plot(fpr, tpr, color=COLORS["accent"], lw=2.5, label=f"ROC (AUC ≈ {VALIDATION_AUC})")
    ax.plot([0, 1], [0, 1], "--", color=COLORS["muted"], label="Random")
    ax.set_xlabel("False positive rate")
    ax.set_ylabel("True positive rate")
    ax.set_title("ROC Curve — HistoricalData validation", fontsize=13, fontweight="bold")
    ax.legend(loc="lower right")
    ax.set_aspect("equal")
    charts.append(save(fig, f, "roc_curve", "ROC Curve (validatemodel)"))

    pf = pd.DataFrame(PORTFOLIO).sort_values("score", ascending=False)
    ids = pf["id"].astype(int)

    def portfolio_bar(y, ylabel, title, fname, color=COLORS["accent"], hline=None):
        fig, ax = plt.subplots(figsize=(10, 4.8))
        ax.bar(ids, y, color=color, edgecolor="white")
        if hline is not None:
            ax.axhline(hline, color=COLORS["bad"], ls="--", lw=2, label=f"Optimal KS cutoff ({hline})")
            ax.legend()
        ax.set_xlabel("Client ID")
        ax.set_ylabel(ylabel)
        ax.set_title(title, fontsize=13, fontweight="bold")
        ax.grid(axis="y", alpha=0.3)
        return save(fig, f, fname, title)

    charts.append(portfolio_bar(pf["score"], "Score (0–100)", "Client Scores vs Optimal KS Cutoff", "scores_vs_cutoff", hline=OPTIMAL_SCORE))
    charts.append(portfolio_bar(pf["pd"], "PD", "Predicted Probability of Default per Client", "pd_per_client", color="#6366f1"))
    charts.append(portfolio_bar(pf["el"], "Expected Loss ($)", "Expected Loss per Client ($)", "expected_loss_per_client", color="#f59e0b"))
    charts.append(portfolio_bar(pf["rate"], "Interest Rate (%)", "Minimum Break-even Interest Rate per Client (%)", "min_rate_per_client", color="#8b5cf6"))

    fig, ax = plt.subplots(figsize=(7, 5))
    colors = [COLORS["good"] if d == "Accepted" else COLORS["bad"] for d in pf["decision"]]
    ax.scatter(pf["score"], pf["pd"], s=90, c=colors, edgecolors="white", linewidths=0.8)
    ax.set_xlabel("Score")
    ax.set_ylabel("PD")
    ax.set_title("Score vs Probability of Default", fontsize=13, fontweight="bold")
    ax.grid(alpha=0.3)
    charts.append(save(fig, f, "score_vs_pd", "Score vs PD"))

    for col, fname, title in [
        ("decision", "accept_reject", "Accepted vs Rejected Clients"),
        ("risk", "risk_bands", "Portfolio Risk Segmentation"),
    ]:
        vc = pf[col].value_counts()
        fig, ax = plt.subplots(figsize=(6.5, 4.5))
        palette = [COLORS["good"], COLORS["bad"], COLORS["accent"], "#f59e0b", "#6366f1"][: len(vc)]
        ax.bar(vc.index.astype(str), vc.values, color=palette, edgecolor="white")
        ax.set_ylabel("Number of clients")
        ax.set_title(title, fontsize=13, fontweight="bold")
        ax.grid(axis="y", alpha=0.3)
        charts.append(save(fig, f, fname, title))

    return charts


def rate_by_group(hist: pd.DataFrame, col: str, bins=None, labels=None) -> pd.Series:
    if bins is not None:
        hist = hist.copy()
        hist["_bin"] = pd.cut(hist[col], bins=bins, labels=labels, right=False)
        return hist.groupby("_bin", observed=True)["Default"].mean()
    return hist.groupby(col, observed=True)["Default"].mean()


def generate_excel(hist: pd.DataFrame, port: pd.DataFrame) -> list:
    charts = []
    f = OUT_EXCEL
    charts.append(bar_default(hist, f, "historical_default_distribution", "HistoricalData — Default distribution"))

    for col, title, fname in [
        ("Age", "Age distribution (HistoricalData)", "age_distribution"),
        ("Income", "Income distribution (HistoricalData)", "income_distribution"),
    ]:
        fig, ax = plt.subplots(figsize=(8, 4.5))
        ax.hist(hist[col].dropna(), bins=25, color=COLORS["accent"], edgecolor="white", alpha=0.9)
        ax.set_title(title, fontsize=13, fontweight="bold")
        ax.set_xlabel(col)
        ax.set_ylabel("Frequency")
        charts.append(save(fig, f, fname, title))

    age_rates = rate_by_group(hist, "Age", [0, 35, 50, 65, 200], ["<35", "35-50", "50-65", "65+"])
    fig, ax = plt.subplots(figsize=(7, 4.5))
    ax.bar(age_rates.index.astype(str), age_rates.values * 100, color=COLORS["bad"], edgecolor="white")
    ax.set_title("Default rate by age band", fontsize=13, fontweight="bold")
    ax.set_ylabel("Default rate (%)")
    ax.grid(axis="y", alpha=0.3)
    charts.append(save(fig, f, "default_rate_by_age", "Default rate by age band"))

    for col, fname, title in [
        ("ResidentialStatus", "default_rate_residential", "Default rate by residential status"),
        ("EmploymentStatus", "default_rate_employment", "Default rate by employment status"),
    ]:
        sr = rate_by_group(hist, col)
        fig, ax = plt.subplots(figsize=(6.5, 4.5))
        ax.bar(sr.index.astype(str), sr.values * 100, color="#6366f1", edgecolor="white")
        ax.set_title(title, fontsize=13, fontweight="bold")
        ax.set_ylabel("Default rate (%)")
        ax.grid(axis="y", alpha=0.3)
        charts.append(save(fig, f, fname, title))

    inc_rates = rate_by_group(hist, "Income", [0, 30000, 40000, 50000, 1e9], ["<30k", "30-40k", "40-50k", "50k+"])
    fig, ax = plt.subplots(figsize=(7, 4.5))
    ax.bar(inc_rates.index.astype(str), inc_rates.values * 100, color="#f59e0b", edgecolor="white")
    ax.set_title("Default rate by income band", fontsize=13, fontweight="bold")
    ax.set_ylabel("Default rate (%)")
    ax.grid(axis="y", alpha=0.3)
    charts.append(save(fig, f, "default_rate_by_income", "Default rate by income band"))

    port = port.dropna(subset=["ID"]).copy()
    port["ID"] = port["ID"].astype(int)

    fig, ax = plt.subplots(figsize=(10, 4.5))
    ax.bar(port["ID"], port["PD"], color="#6366f1", edgecolor="white")
    ax.set_title("ActualPortfolioData — Teacher PD per client", fontsize=13, fontweight="bold")
    ax.set_xlabel("Client ID")
    ax.set_ylabel("PD")
    ax.grid(axis="y", alpha=0.3)
    charts.append(save(fig, f, "portfolio_pd_excel", "Portfolio PD (Excel sheet)"))

    fig, ax = plt.subplots(figsize=(10, 4.5))
    ax.bar(port["ID"], port["EL"], color="#f59e0b", edgecolor="white")
    ax.set_title("ActualPortfolioData — Expected Loss (EL) per client", fontsize=13, fontweight="bold")
    ax.set_xlabel("Client ID")
    ax.set_ylabel("EL ($)")
    ax.grid(axis="y", alpha=0.3)
    charts.append(save(fig, f, "portfolio_el_excel", "Portfolio EL (Excel sheet)"))

    fig, ax = plt.subplots(figsize=(7, 5))
    sc = ax.scatter(hist["Age"], hist["Default"], alpha=0.35, c=hist["Default"].map({0: COLORS["good"], 1: COLORS["bad"]}), s=28)
    ax.set_xlabel("Age")
    ax.set_ylabel("Default (0/1)")
    ax.set_title("Age vs Default (HistoricalData)", fontsize=13, fontweight="bold")
    ax.set_yticks([0, 1])
    charts.append(save(fig, f, "age_vs_default_scatter", "Age vs Default scatter"))

    return charts


def main():
    hist = pd.read_excel(XLSX, sheet_name="HistoricalData")
    port = pd.read_excel(XLSX, sheet_name="ActualPortfolioData")
    port = port.dropna(subset=["ID"], how="any")

    matlab_charts = generate_matlab(hist)
    excel_charts = generate_excel(hist, port)

    manifest = {
        "generatedAt": pd.Timestamp.now().isoformat(),
        "sourceFiles": {
            "matlab": "FinTech_Scorecard_Project.m",
            "excel": "DataProjScoreCard.xlsx",
        },
        "matlab": matlab_charts,
        "excel": excel_charts,
    }

    for folder in (OUT_MATLAB, OUT_EXCEL):
        folder.mkdir(parents=True, exist_ok=True)

    manifest_path = ROOT / "fintech-dashboard" / "public" / "generated" / "manifest.json"
    manifest_path.parent.mkdir(parents=True, exist_ok=True)
    manifest_path.write_text(json.dumps(manifest, indent=2), encoding="utf-8")

    print(f"MATLAB-style charts: {len(matlab_charts)} -> {OUT_MATLAB}")
    print(f"Excel charts: {len(excel_charts)} -> {OUT_EXCEL}")
    print(f"Manifest: {manifest_path}")


if __name__ == "__main__":
    main()
