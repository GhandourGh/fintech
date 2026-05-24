# Presentation Script — AI in FinTech: Credit Scorecard System

**Total duration:** ~25–30 minutes (6 speakers × ~4–5 minutes each)  
**Tools:** MATLAB Credit Scorecard Toolbox · `DataProjScoreCard.xlsx` · **RiskLens** dashboard  

> **Before presenting:** Open the RiskLens dashboard (`cd fintech-dashboard` → `npm run dev` → http://localhost:5173/).  
> Keep the written report (`Final/fintech (1).pdf`) open as backup on a second device.  
> **Downloadable PDF:** [`docs/presentation-script.pdf`](docs/presentation-script.pdf) — regenerate with `python3 scripts/generate_script_pdf.py`.

---

## Timing overview

| Speaker | Section | Target time |
|---------|---------|-------------|
| 1 | Introduction | 4–5 min |
| 2 | Problem / Background | 4–5 min |
| 3 | Methodology (Part 1) | 4–5 min |
| 4 | Methodology (Part 2) + Validation | 4–5 min |
| 5 | Results / Analysis | 4–5 min |
| 6 | Discussion, Conclusion & Q&A handoff | 4–5 min |

---

## Slide map (RiskLens navbar order)

Use the **numbered sidebar** in the dashboard — steps **1–11** match this table. PowerPoint title slides are separate; live demo slides start at **1**.

| Step | Dashboard page | Slide name (say aloud) | Primary speaker |
|------|----------------|------------------------|-----------------|
| **1** | Overview (`/`) | **Introduction & Problem / Data** | Speakers 1, 2, 3 (workflow recap) |
| **2** | WOE & Binning (`/woe`) | **WOE & Binning Analysis** | Speaker 3 |
| **3** | Scorecard (`/scorecard`) | **Credit Scorecard Points** | Speaker 3 |
| **4** | ROC & Validation (`/validation`) | **ROC Curve & Validation Metrics** | Speaker 4 |
| **5** | Portfolio Risk (`/portfolio`) | **Portfolio Scoring — Score vs PD** | Speaker 4 |
| **6** | Accept / Reject (`/decisions`) | **Accept vs Reject Decisions** | Speaker 5 |
| **7** | Expected Loss (`/expected-loss`) | **Expected Loss Dashboard** | Speaker 5 |
| **8** | Risk Pricing (`/pricing`) | **Risk-Based Interest Rates** | Speaker 5 |
| **9** | Model Performance (`/performance`) | **Model Performance Summary** | Speaker 6 |
| **10** | Final Decision (`/final`) | **Final Portfolio Decision** | Speaker 6 |
| **11** | Live Client Test (`/test`) | **Live Client Test (Demo)** | Speaker 6 |
| **12** | MATLAB & Excel Charts (`/outputs/matlab`) | **MATLAB & Excel Source Charts** *(appendix)* | Speaker 2 / 5 *(optional)* |

> **Client Explorer** (`/explorer`) is not numbered — use only if asked in Q&A.

---

## Speaker 1 — Introduction  
**~4–5 minutes**

**[Slide: Title — “AI in FinTech: Credit Scorecard & Portfolio Optimization”]**

Good morning / good afternoon everyone. Today’s presentation is **Portfolio Optimisation and Pricing Interest Rate by Using a Scoring Model** — a complete credit risk workflow built in **MATLAB** and visualized in our **RiskLens** dashboard.

**[Pause for 2 seconds. Make eye contact with the audience.]**

The core idea is straightforward: a bank receives loan applications and must decide three things for each client — **should we lend**, **how much could we lose if they default**, and **what is the minimum interest rate** that covers that expected loss. We answer these questions using a **credit scorecard** — a statistical model that converts borrower profile data into a score from **0 to 100**, where a higher score means lower risk.

**[Switch to Slide 1 — Introduction & Problem / Data: RiskLens Overview (`/`)]**

**RiskLens** is the interactive front end of our project. Every figure and metric on screen is tied to the same MATLAB pipeline and final report — think of it as a live control room for the scorecard, not a separate set of numbers.

**[Point at the four metric cards at the top of the Overview page.]**

At a glance, our project works with **500 historical clients** for training and validation, achieves an **AUC of 0.6775**, and when applied to **20 portfolio applicants**, accepts **14 clients** with a total expected loss of **$129,329.63** on **$1.4 million** of exposure.

**[Point at the workflow pipeline section on the Overview page.]**

The workflow follows ten clear steps: load data from Excel, build the scorecard on all 500 historical records, run autobinning and Weight of Evidence analysis, fit a logistic regression model, scale scores to 0–100, validate with a ROC curve, score the portfolio, apply an accept/reject rule, compute expected loss, and finally calculate risk-based minimum interest rates.

**[Emphasize this result.]**

One design choice worth stating up front: we train on the **full 500 historical clients** — there is **no separate hold-out test sample** — and we validate model performance on that same **HistoricalData** set, as specified in the project requirements.

**[Point at the workflow cards again — trace left to right with your hand.]**

The presentation follows that same order: **background and data**, **methodology and validation**, **portfolio results in dollars**, and finally **interpretation and conclusions**. Each segment is about four to five minutes, and we will leave time for questions at the end.

**[Pause for 2 seconds.]**

Next, we move from this overview into the **business problem and the data** behind the model.

---

### Transition → Speaker 2

**[Brief handoff, optional:]**  
“Let’s look at why credit scoring matters and what data we used.”

---

## Speaker 2 — Problem / Background  
**~4–5 minutes**

**[Slide 1 — Introduction & Problem / Data *(continued)*]**

Building on that overview, this section covers the **problem background** and **exploratory data analysis**. Stay on **Slide 1 — Overview** in RiskLens.

When a bank receives a loan application, it faces a simple but costly question: **Will this client repay, or will they default?** If the bank accepts too many risky clients, it loses money. If it rejects too many safe clients, it loses business. A **credit scorecard** helps the bank rank applicants from safer to riskier using observable characteristics — age, income, housing status, and employment.

**[Slide 1 — Overview: scroll to Default Distribution]**

**[Point at the pie chart on the left — Good vs Bad.]**

Our historical dataset contains **500 clients** from the **HistoricalData** sheet in `DataProjScoreCard.xlsx`. Each record includes **Age**, **Income**, **ResidentialStatus**, **EmploymentStatus**, and a **Default** flag — where **0 means good** (no default) and **1 means bad** (default).

**[Point at the numbers beside the pie chart.]**

The historical default rate is **36%**: **320 good clients** and **180 bad clients**. That means more than one in three historical borrowers defaulted — a substantial level of credit risk that makes modeling worthwhile.

**[Point at the “Default rate by income band” bar chart.]**

When we explore the data, a clear pattern appears. **Lower income bands show higher default rates.** For example, clients earning under **$30,000** have a default rate of about **56.7%**, while those above **$50,000** have about **21.4%**. This tells us that **Income** will likely be one of the strongest predictors in our model — and our final results confirm that.

**[Point at the “Default rate by age group” bar chart.]**

Age shows a similar story: **younger applicants** tend to default more often than **older applicants**. Homeowners default less frequently than renters, and employed clients default less than those in the “Other” employment category.

**[Slide 1 — Overview: scroll to Portfolio applicants section]**

Beyond historical data, we also have **ActualPortfolioData**: **20 new applicants** the bank wants to evaluate. Each has the same demographic fields but **no default label** — because they are future clients. Our job is to score them, decide accept or reject, estimate expected loss, and set minimum pricing.

**[Emphasize this result.]**

Key assumptions used throughout the project:
- **Loan amount (EAD):** $100,000 per client  
- **Recovery rate:** 60% if default occurs  
- **Loss Given Default (LGD):** 40% (= 1 − recovery rate)

These assumptions flow through every dollar figure in our results.

**[Optional: Slide 12 — MATLAB & Excel Source Charts (`/outputs/matlab`) — historical default distribution]**

**[Point at the historical default distribution chart.]**

This chart in our MATLAB/Excel outputs section confirms the same 320 vs 180 split visually — good clients in green, bad clients in red.

**[Pause for 2 seconds.]**

That gives us a clear foundation: **500 labeled historical records** for learning patterns, and **20 new applicants** to score and price. The next section walks through **how the scorecard is built** in MATLAB.

---

### Transition → Speaker 3

**[Brief handoff:]**  
“With the data in place, here is how we built the model.”

---

## Speaker 3 — Methodology / Process (Part 1)  
**~4–5 minutes**

**[Slide 1 — Overview: 10-step workflow pipeline *(methodology intro)*]**

This part covers the **first half of the methodology**: data preparation, binning, Weight of Evidence, and scorecard construction.

All code is in **`FinTech_Scorecard_Project.m`**, using MATLAB’s **Credit Scorecard Toolbox**.

**[Slide 1 — Overview: scroll to the 10-step workflow pipeline]**

**[Point at Steps 1–5.]**

**Step 1 — Data loading:** We read `HistoricalData` and `ActualPortfolioData` from Excel. We convert categorical variables and remove empty rows from the portfolio sheet.

**Step 2 — Scorecard setup:** We create a `creditscorecard` object with **Default** as the response variable and **GoodLabel = 0**. Crucially, we train on **all 500 historical clients**, as required by the assignment slide — no out-of-bag split.

**Step 3 — Autobinning & WOE:** We call `autobinning()` to let MATLAB find **data-driven optimal cut points** for Age and Income, rather than choosing arbitrary bins by hand. For each predictor we run `bininfo()` and `plotbins()` — which the assignment explicitly requires.

**[Switch to Slide 2 — WOE & Binning Analysis (`/woe`)]**

**[Point at the Information Value summary cards at the top.]**

Weight of Evidence — **WOE** — measures how much each bin separates good payers from bad payers. **Positive WOE** means the bin is safer than average; **negative WOE** means it is riskier.

The **Information Value (IV)** ranks predictors:
- **Income: 0.2355 — Strong**
- **Age: 0.1879 — Medium**
- **EmploymentStatus: 0.1143 — Medium**
- **ResidentialStatus: 0.0417 — Weak**

**[Point at the main WOE chart — Income selected.]**

**[Point at the green and red bars above and below the zero line.]**

On this chart, income bins below **$28,000** have strongly **negative WOE** — high risk. Bins above **$50,000** have **positive WOE** — low risk. The zero reference line makes the interpretation easy: above zero is safer, below zero is riskier.

**[Scroll down to the four predictor cards with tables.]**

Each card shows the bin, number of observations, default percentage, and WOE value — matching the **bininfo** tables in our written report.

**[Switch to Slide 3 — Credit Scorecard Points (`/scorecard`)]**

**[Point at the Income bar chart.]**

**Step 4 — Logistic regression:** After WOE transformation, we call `fitmodel()`. All four predictors — Age, Income, ResidentialStatus, and EmploymentStatus — are statistically significant and retained in the model.

**Step 5 — Score scaling:** We use `formatpoints()` with **WorstAndBestScores [0, 100]** so every applicant receives a score between **0 and 100**. Higher score means **lower risk**.

**[Point at the scaled points table for Income.]**

For example, the highest income bin receives about **28.91 points**, while the lowest income bin receives **−8.68 points**. Employed clients receive **25.12 points** versus only **1.80** for “Other” employment. Homeowners receive **21.10 points** versus **6.71** for renters.

**[Pause for 2 seconds.]**

At this point the scorecard is fully defined — but the critical question remains: **does it actually rank risky clients correctly?** The next section answers that with **ROC validation** and the **KS-based cutoff**.

---

### Transition → Speaker 4

**[Brief handoff:]**  
“Next: validating the model and setting the acceptance threshold.”

---

## Speaker 4 — Methodology (Part 2) + Validation / Results Setup  
**~4–5 minutes**

**[Slide 4 — ROC Curve & Validation Metrics]**

This section covers **model validation**, how the **accept/reject cutoff** is chosen, and how the **20 portfolio applicants** are scored.

**[Switch to Slide 4 — ROC & Validation (`/validation`)]**

**[Point at the four metric cards.]**

After fitting the scorecard, we run `validatemodel()` on the **full HistoricalData** — all 500 clients — and plot the **ROC curve**. Here are our official validation statistics from **Table 13** of the report:

| Metric | Value |
|--------|-------|
| **AUC** | **0.6775** |
| **KS statistic** | **0.2892** |
| **KS optimal score (cutoff)** | **48.2032** |
| **Accuracy Ratio** | **0.3551** |

**[Point at the ROC curve chart on the left.]**

**[Trace the teal line with your cursor or laser pointer.]**

The ROC curve plots **True Positive Rate** against **False Positive Rate**. The teal line is our scorecard; the dashed diagonal is a random guess. Our curve sits **clearly above the diagonal**, which means the model has **real ranking power** — it is better than flipping a coin.

**[Emphasize this result.]**

An **AUC of 0.6775** means that if we randomly pick one defaulter and one non-defaulter from the historical data, there is about a **68% chance** the defaulter receives the **lower score**. For a four-predictor model on 500 observations, this is **acceptable academic performance**.

**[Point at the Validation Summary panel on the right.]**

The **Kolmogorov–Smirnov (KS) statistic** measures the maximum vertical distance between the cumulative distributions of good and bad clients. Our KS is **0.2892**, and the score at which this maximum occurs is **48.2032**.

**[Emphasize this result.]**

That KS score becomes our **official acceptance threshold**:

> **Accept if Score ≥ 48.2032 · Reject otherwise**

This is a standard industry approach: the cutoff is **data-driven**, not arbitrary.

**[Switch to Slide 5 — Portfolio Scoring — Score vs PD (`/portfolio`)]**

**[Point at the Score vs PD scatter plot.]**

We then apply `score()` and `probdefault()` to the **20 portfolio applicants**. This scatter plot shows each client as a dot: **Score on the x-axis**, **Predicted Probability of Default (PD) on the y-axis**.

**[Point at the red vertical dashed line at 48.2032.]**

The red vertical line is our **KS cutoff**. Clients to the **right** of the line are accepted; clients to the **left** are rejected.

**[Point at green vs red dots.]**

Green dots are accepted; red dots are rejected. Notice the relationship is **monotonic**: higher score → lower PD. That is exactly what we want from a sound credit scorecard.

**[Point at the three risk band cards below.]**

We also assign **risk bands** for monitoring:
- **Low Risk:** score ≥ 80 → **5 accepted clients**
- **Medium Risk:** score 50–80 → **9 accepted clients**
- **High Risk:** score < 50 → **6 rejected clients**

**[Pause for 2 seconds.]**

Scores, PDs, and a decision rule are now in place. The following section translates those into **dollar outcomes** — expected loss and minimum interest rates.

---

### Transition → Speaker 5

**[Brief handoff:]**  
“Let’s turn to the main numerical results.”

---

## Speaker 5 — Results / Analysis  
**~4–5 minutes**

**[Slides 6–8 — Portfolio Results (Tables 15 & 16)]**

This section presents the **key numerical results** — who was accepted, total exposure, expected loss, and risk-based minimum interest rates.

**[Switch to Slide 6 — Accept vs Reject Decisions (`/decisions`)]**

**[Point at the Decision Breakdown bar chart.]**

Applying the rule **Score ≥ 48.2032** to all 20 applicants:
- **14 clients Accepted**
- **6 clients Rejected**

That is a **70% acceptance rate** — the bank would book 14 loans out of 20 applications.

**[Point at the Client Scores vs Threshold bar chart.]**

This bar chart shows every client’s score sorted from highest to lowest. The red dashed line is the cutoff at **48.20**. You can see clients **4 and 5** at the top with a perfect score of **100**, and client **1** at the bottom with a score of **0**.

**[Point at a borderline accepted client — Client 8, score 55.84.]**

Client **8** is an interesting borderline case — accepted with a score of **55.84**, just above the threshold, but classified as **Medium Risk** because the score is below 80.

**[Scroll to the portfolio results table.]**

**[Point at rows for clients 4, 5, and 1.]**

The full table matches **Table 15** in our report. For example:
- Client **4**: Score **100**, PD **12.79%**, Accepted, Expected Loss **$5,114**
- Client **1**: Score **0**, PD **70.59%**, Rejected, Expected Loss **$28,234** *(not booked)*

**[Switch to Slide 7 — Expected Loss Dashboard (`/expected-loss`)]**

**[Point at the three summary metric cards.]**

For the **14 accepted clients only**, using **EL = PD × LGD × EAD**:

| Metric | Value |
|--------|-------|
| **Total Expected Loss** | **$129,329.63** |
| **Average PD (accepted)** | **23.09%** |
| **Accepted Exposure** | **$1,400,000** |

**[Point at the Expected Loss bar chart.]**

Each bar is one accepted client’s expected loss in dollars. Taller bars mean more capital at risk. Client **8** has the highest EL among accepted clients — about **$13,402** — because they have the highest PD among those still above the cutoff.

**[Emphasize this result.]**

The **$129,329.63** total is the dollar amount the bank should **provision or cover through pricing** on the accepted book, assuming a **60% recovery rate**.

**[Switch to Slide 8 — Risk-Based Interest Rates (`/pricing`)]**

**[Point at the minimum interest rate bar chart.]**

For pricing, we use the assignment formula:

> **rmin = PD × LGD** (no separate base rate)

**[Point at the gold dashed average line.]**

The **average minimum break-even rate** across the 14 accepted clients is **9.24%**. The safest accepted clients (IDs **4 and 5**) need only **5.11%** to break even on expected loss. The highest accepted rate is **13.40%** for client **8**.

**[Point at the two summary boxes below the chart.]**

The **lowest accepted rate is 5.11%**; the **highest rejected rate is 28.23%** (client **1**). Rejected clients would require prohibitively high rates — another reason rejection makes business sense.

**[Optional: Slide 12 — MATLAB & Excel Source Charts (`/outputs/matlab`) — expected_loss_per_client.png and min_rate_per_client.png]**

These MATLAB-generated figures in our appendix match what you see in the dashboard.

**[Pause for 2 seconds.]**

The quantitative story is complete. The final section discusses **what these results mean in practice**, acknowledges **limitations**, and closes with a summary.

---

### Transition → Speaker 6

**[Brief handoff:]**  
“To close: insights, limitations, and conclusion.”

---

## Speaker 6 — Discussion / Insights + Conclusion  
**~4–5 minutes**

**[Slides 9–11 — Discussion & Conclusion]**

To close, this section covers **business insights**, **limitations**, and the **final portfolio recommendation**.

**[Switch to Slide 9 — Model Performance Summary (`/performance`)]**

**[Point at the Validation Radar chart.]**

Looking back at model performance holistically: our scorecard achieves **AUC 0.6775**, **KS 0.2892**, and an **Accuracy Ratio of 0.3551**. These metrics tell us the model **ranks clients meaningfully**, even though it is not perfect — no real-world scorecard with only four variables ever is.

**[Point at the Project Outcomes list on the right.]**

**Discussion — What does this mean for the bank?**

1. **Profitable selection:** By rejecting the 6 highest-risk applicants, the bank avoids clients with PDs above **44%** and expected losses up to **$28,234** per $100,000 loan.

2. **Risk-based pricing:** Instead of charging everyone the same rate, the bank can price from **5.11%** for the safest accepted clients to **13.40%** for borderline cases — aligning price with risk.

3. **Capital planning:** The **$129,329.63** expected loss figure gives management a concrete number for **provisions and stress testing** on the $1.4 million book.

4. **Transparency:** Every decision traces back to observable characteristics and a documented cutoff — important for regulators and internal audit.

**[Switch to Slide 10 — Final Portfolio Decision (`/final`)]**

**[Point at the headline banner — 14 clients, $1.4M exposure.]**

Our **final recommended portfolio** is **14 clients**, **$1.4 million** in exposure, **$129,329.63** in expected loss, with an average minimum rate of **9.24%**.

**[Point at the accepted vs rejected client lists.]**

Five clients are **Low Risk** (score above 80). Nine are **Medium Risk** (between 50 and 80). All six rejected clients fall in the **High Risk** band (score below 50).

**[Switch to Slide 11 — Live Client Test (`/test`) — optional 30-second demo]**

**[Select Client 4 from the dropdown. Click “Run credit test.”]**

As a quick demo: if we test **Client 4** live in RiskLens, the dashboard returns the exact report values — Score **100**, PD **12.79%**, Accepted, EL **$5,114**, minimum rate **5.11%**. This confirms our dashboard and MATLAB pipeline are aligned.

**[Pause for 2 seconds.]**

**Limitations — intellectual honesty matters in FinTech:**

- We use only **four predictors**. Real banks typically use dozens — credit bureau scores, debt ratios, industry codes, and more.
- **AUC of 0.6775** is reasonable for a four-variable model but would need improvement before production deployment.
- We assume a **flat $100,000 loan** and a **fixed 60% recovery rate** for all clients — real portfolios are more granular.
- The model is trained on **historical data**; economic shocks can shift default patterns over time — **monitoring and recalibration** would be required.

**[Emphasize this result.]**

Despite these limits, the project demonstrates the **full end-to-end credit scorecard lifecycle**: from raw Excel data through WOE binning, logistic regression, validation, portfolio decision, expected loss, and risk-based pricing.

**[Return to title slide, or remain on Slide 10 — Final Portfolio Decision (`/final`)]**

**Conclusion**

To summarize in three sentences:
1. We built a **MATLAB credit scorecard** on **500 historical clients** with **autobinning**, achieving **AUC 0.6775**.
2. Applied to **20 applicants**, we **accepted 14** at a KS cutoff of **48.2032**, with **$129,329.63** total expected loss on **$1.4 million** exposure.
3. Minimum interest rates range from **5.11%** to **13.40%** on the accepted book, averaging **9.24%**.

**[Pause for 2 seconds. Speak slowly and clearly.]**

Thank you for your attention — we’re happy to take your **questions**.

**[Pause. Remain at the front for Q&A.]**

---

## Q&A preparation (all members)

Quick reference for likely questions:

| Question | Short answer |
|----------|--------------|
| Why no train/test split? | Assignment slide: train on all 500; validate on HistoricalData. |
| Why KS cutoff and not 50% PD? | KS maximizes separation between good/bad distributions on the score. |
| Why is Income the strongest predictor? | IV = 0.2355; lower income → higher historical default rate. |
| What is WOE? | Log ratio measuring bin’s good/bad separation; used in logistic regression. |
| Why is total EL $129,329.63 but some table ELs are rounded? | Table 15 shows rounded dollars; Table 16 total is MATLAB’s precise sum. |
| What is LGD? | 40% — the loss per dollar lent if default occurs (1 − 60% recovery). |
| Can we see the MATLAB code? | Yes — `FinTech_Scorecard_Project.m` in the repo and `Final/` submission. |

---

## Rehearsal checklist

- [ ] Dashboard running locally or deployed URL tested  
- [ ] Each speaker rehearsed with a timer (target: 4:00–5:00 per person)  
- [ ] Transitions practiced aloud  
- [ ] Backup: PDF report open on second device  
- [ ] Everyone can answer at least one Q&A item  
- [ ] Screen font size readable from the back of the room  

---

*Script aligned with `Final/fintech (1).pdf`, RiskLens navbar steps 1–12, and `fintech-dashboard/src/config/presentationNav.ts`. Last updated: May 2026.*
