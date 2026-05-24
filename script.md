# Presentation Script — AI in FinTech: Credit Scorecard System

**Tools:** MATLAB · Excel data · **RiskLens** dashboard  

> **Before presenting:** Open RiskLens (`cd fintech-dashboard` → `npm run dev`). Keep the report PDF as backup.  
> **Printable PDF:** [`docs/presentation-script.pdf`](docs/presentation-script.pdf) — run `python3 scripts/generate_script_pdf.py` to refresh.

---

## Slide map (follow the numbered sidebar)

| Step | Page | Say this |
|------|------|----------|
| **1** | Overview | Introduction & data |
| **2** | WOE & Binning | How we group clients by risk |
| **3** | Scorecard | Points that build the score |
| **4** | ROC & Validation | Is the scorecard reliable? |
| **5** | Portfolio Risk | Scores for 20 new applicants |
| **6** | Accept / Reject | Who gets a loan |
| **7** | Expected Loss | Money at risk in dollars |
| **8** | Risk Pricing | Minimum fair interest rate |
| **9** | Model Performance | Overall results |
| **10** | Final Decision | Final portfolio |
| **11** | Live Client Test | Quick live demo |
| **12** | MATLAB Charts | Extra charts *(optional)* |

---

## Speaker 1 — Introduction

**[Title slide — “AI in FinTech: Credit Scorecard & Portfolio Optimization”]**

Good morning / good afternoon. We present **Portfolio Optimisation and Pricing Interest Rate by Using a Scoring Model** — how a bank can use **AI in FinTech** to score loan applicants, decide who to lend to, and set a fair interest rate.

**[Switch to Slide 1 — Overview (`/`)]**

**RiskLens** is our dashboard. It shows the same results as our MATLAB work and written report — one place to see the full story.

**[Point at the four cards at the top.]**

In short:
- **500** past clients used to learn patterns  
- **20** new applicants we score today  
- **14 accepted**, **6 rejected**  
- About **$129,330** total expected loss on **$1.4 million** lent  

**[Point at the workflow strip — do not read every step.]**

The idea is simple: learn from past clients in Excel, build a **credit score from 0 to 100** in MATLAB, then use RiskLens to show **accept or reject**, **expected loss**, and **minimum interest rate**. Higher score means safer client.

**[Pause. Eye contact.]**

Next we explain **why banks need this** and **what data we used**.

---

### Handoff → Speaker 2

“Let’s look at the business problem and our data.”

---

## Speaker 2 — Problem & data

**[Stay on Slide 1 — Overview]**

When someone applies for a loan, the bank asks: **Will they pay back?**  
If the bank says yes to too many risky people, it loses money. If it says no to too many safe people, it loses customers. A **credit scorecard** ranks people from safer to riskier using facts we already know — age, income, home status, job status.

**[Scroll to Default Distribution — pie chart.]**

We have **500 past clients** in Excel (`HistoricalData`). Each row has age, income, housing, employment, and whether they **defaulted** (failed to pay) or not.

**[Point at the pie chart numbers.]**

- **320** paid as agreed (good)  
- **180** defaulted (bad)  
- About **36%** defaulted overall — enough risk to justify a scoring tool  

**[Point at default rate by income.]**

**Lower income** → **higher default rate**. Under **$30,000**, about **57%** defaulted. Above **$50,000**, about **21%**. So **income** matters a lot in our final model.

**[Point at default rate by age.]**

Younger clients default more often. Homeowners do better than renters. Employed clients do better than “Other” job status.

**[Scroll to Portfolio applicants.]**

We also have **20 new applicants** (`ActualPortfolioData`). Same fields, but we do not know yet if they will default — that is what we predict.

**[State assumptions clearly.]**

We use the same loan size for everyone:
- **Loan:** $100,000  
- **If default, bank recovers 60%** → **loss = 40%** of the loan (called **LGD**)

All dollar results use these rules.

**[Optional: Slide 12 — MATLAB charts, default pie]**

Same 320 vs 180 split, shown as a chart.

**[Pause.]**

Next: **how we turn this data into a score**.

---

### Handoff → Speaker 3

“Here is how we built the scorecard.”

---

## Speaker 3 — Building the scorecard

**[Slide 1 — Overview: point briefly at the workflow strip.]**

We used MATLAB’s **Credit Scorecard Toolbox**. The main steps: load Excel → group clients into risk buckets → turn that into **points** → get a score from **0 to 100**.

**[Switch to Slide 2 — WOE & Binning (`/woe`)]**

**[Point at IV cards.]**

MATLAB splits age and income into groups automatically. For each group we measure **Weight of Evidence (WOE)** — basically, **is this group safer or riskier than average?**

| Factor | Strength |
|--------|----------|
| Income | Strong |
| Age | Medium |
| Employment | Medium |
| Housing | Weak |

**[Point at Income WOE chart.]**

Low income → bars below zero → **higher risk**. High income → above zero → **lower risk**.

**[Scroll to predictor tables.]**

Each table shows the group, how many clients, default %, and WOE — same idea as in our report.

**[Switch to Slide 3 — Scorecard (`/scorecard`)]**

**[Point at Income points chart.]**

MATLAB adds **points** for each factor. Safer groups get more points. Example for income: best group about **+29 points**, worst about **−9 points**. Employed clients get more points than “Other”. Homeowners get more than renters.

Every applicant’s points add up to a **final score from 0 to 100**.

**[Pause.]**

The big question: **does the score actually separate good from bad clients?** Speaker 4 answers that.

---

### Handoff → Speaker 4

“Next: checking the scorecard and scoring the 20 applicants.”

---

## Speaker 4 — Validation & portfolio scoring

**[Switch to Slide 4 — ROC & Validation (`/validation`)]**

**[Point at metric cards.]**

We checked the scorecard on the same **500 historical clients**:

| What it means | Value |
|---------------|-------|
| **AUC** — how well the score ranks risky vs safe | **0.6775** |
| **KS** — how far good and bad clients separate | **0.2892** |
| **Cutoff score** — accept at or above this | **48.20** |

**[Point at ROC curve.]**

The green curve is our model. The dashed line is random guessing. Our curve is **above** the line — the scorecard is **useful**, not perfect.

**[Simple rule:]**

> **Accept if score ≥ 48.20 · Reject if below**

The cutoff comes from the data, not from a guess.

**[Switch to Slide 5 — Portfolio Risk (`/portfolio`)]**

**[Point at scatter plot.]**

Each dot is one of the **20 new applicants**. Left to right = score. Up = chance of default (**PD**).

**[Point at red line at 48.20.]**

Right of the line → **accepted**. Left → **rejected**.

**[Green vs red dots.]**

Higher score → lower default chance. That is what we want.

**[Risk bands:]**

- **Low risk** (score ≥ 80): **5** clients  
- **Medium** (50–80): **9** clients  
- **High** (below 50): **6** rejected  

**[Pause.]**

Now we turn scores into **money and interest rates**.

---

### Handoff → Speaker 5

“Here are the main results in dollars.”

---

## Speaker 5 — Results

**[Switch to Slide 6 — Accept / Reject (`/decisions`)]**

**[Point at breakdown chart.]**

Rule: score **≥ 48.20**  
- **14 accepted**  
- **6 rejected**  
- **70%** of applications would get a loan  

**[Point at bar chart sorted by score.]**

Clients **4** and **5** score **100** (safest). Client **1** scores **0** (riskiest).

**[Client 8 — borderline.]**

Client **8** scores **55.84** — just above the line, so **accepted**, but still **medium risk** (below 80).

**[Table — clients 4, 5, 1.]**

Examples:
- Client **4**: score **100**, default chance **12.79%**, accepted, expected loss **$5,114**  
- Client **1**: score **0**, default chance **70.59%**, rejected  

**[Switch to Slide 7 — Expected Loss (`/expected-loss`)]**

**[Point at summary cards.]**

For **accepted clients only**:

| | |
|--|--|
| **Total expected loss** | **$129,329.63** |
| **Average default chance** | **23.09%** |
| **Total loans (exposure)** | **$1,400,000** |

**[Point at bar chart.]**

Each bar is how much the bank might lose on that client. Client **8** has the highest bar among accepted clients (~**$13,402**) because their default chance is highest among those still accepted.

**[Switch to Slide 8 — Risk Pricing (`/pricing`)]**

**[Point at rate chart.]**

Minimum fair rate formula:

> **Minimum rate = default chance × loss if default (40%)**

**[Point at average line.]**

- Average minimum rate (accepted): **9.24%**  
- Safest accepted (clients **4**, **5**): **5.11%**  
- Highest accepted (client **8**): **13.40%**  
- Highest rejected (client **1**): **28.23%** — too high to lend profitably  

**[Optional: Slide 12 — MATLAB charts for loss and rates]**

**[Pause.]**

Last: **what this means for the bank** and **wrap-up**.

---

### Handoff → Speaker 6

“To close: meaning, limits, and conclusion.”

---

## Speaker 6 — Discussion & conclusion

**[Switch to Slide 9 — Model Performance (`/performance`)]**

**[Point at radar or summary.]**

Overall: the scorecard **works well enough** to rank clients (AUC **0.6775**, KS **0.2892**). It is not perfect — real banks use many more data fields.

**What this means for the bank:**

1. **Better choices** — Rejecting 6 risky clients avoids very high default rates (up to **70%**) and large losses per loan.  
2. **Fair pricing** — Safer clients can get rates near **5%**; riskier accepted clients near **13%**, not one price for everyone.  
3. **Planning** — **$129,330** expected loss helps the bank set reserves on the **$1.4M** book.  
4. **Clear decisions** — Every accept/reject ties back to score and facts on file.

**[Switch to Slide 10 — Final Decision (`/final`)]**

**[Point at headline.]**

**Final portfolio:** **14 clients**, **$1.4M** exposure, **$129,329.63** expected loss, average minimum rate **9.24%**.

**[Accepted vs rejected lists.]**

5 low risk · 9 medium risk · 6 rejected (high risk)

**[Switch to Slide 11 — Live Client Test (`/test`) — optional]**

Pick **Client 4**, click **Run credit test**.  
Dashboard shows: score **100**, default chance **12.79%**, accepted, loss **$5,114**, rate **5.11%** — matches the report.

**Limitations (say honestly):**

- Only **four** factors — real banks use much more.  
- Scores are based on **past** data; the economy can change.  
- Same **$100k** loan and **60%** recovery for everyone — real life is more detailed.  

**Still, we show a full FinTech flow:** data → score → decision → loss → pricing, with **AI/tools** (MATLAB + dashboard), not a pure machine-learning black box.

**[Slide 10 or title slide]**

**Conclusion — three points:**

1. We built a **credit scorecard** on **500** past clients (MATLAB + Excel).  
2. For **20** new applicants: **14 accepted**, cutoff **48.20**, **$129,330** expected loss on **$1.4M**.  
3. Minimum rates on accepted loans from **5.11%** to **13.40%**, average **9.24%**.

Thank you. We welcome **questions**.

---

## Q&A — short answers

| Question | Answer |
|----------|--------|
| What is WOE? | A number that shows if a group is safer or riskier than average. |
| Why score 48.20? | It is the best split between good and bad clients on historical data (KS). |
| Why is income strongest? | Low income had the highest default rates in the data. |
| What is LGD? | **40%** — the part of the loan the bank loses if the client defaults. |
| Why is total loss $129,329.63? | Sum of expected loss for all **14** accepted clients. |
| Where is the code? | `matlab/FinTech_Scorecard_Project.m` and the `Final/` folder. |

---

## Before you present

- [ ] RiskLens open and working  
- [ ] Report PDF open as backup  
- [ ] Each speaker knows their slides (1–11)  
- [ ] Screen text large enough to read from the back  

---

*Aligned with `Final/fintech (1).pdf` and RiskLens navbar steps 1–12.*
