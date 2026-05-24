# Presentation Script — AI in FinTech: Credit Scorecard System

**Format:** Live demo on the **RiskLens** dashboard (not a PowerPoint).  
**Total length:** ~25–30 minutes · **6 speakers** · ~4–5 min each.  
**Backed by:** `Final/fintech (1).pdf` (Tables 13 / 15 / 16) and `matlab/FinTech_Scorecard_Project.m`.

> **Before going live:**  
> `cd fintech-dashboard && npm run dev` → open the dashboard, log in if needed, sit on **Slide 1 — Overview (`/`)**.  
> Keep the report PDF open on a second device as backup.  
> Use the numbered sidebar (1–11) to navigate — every speaker advances by clicking the next step.

---

## Slide map (follow the numbered sidebar)

| Step | Page | Speaker |
|------|------|---------|
| **1** | Overview (`/`) | Speakers 1 & 2 |
| **2** | WOE & Binning (`/woe`) | Speaker 3 |
| **3** | Scorecard (`/scorecard`) | Speaker 3 |
| **4** | ROC & Validation (`/validation`) | Speaker 4 |
| **5** | Portfolio Risk (`/portfolio`) | Speaker 4 |
| **6** | Accept / Reject (`/decisions`) | Speaker 5 |
| **7** | Expected Loss (`/expected-loss`) | Speaker 5 |
| **8** | Risk Pricing (`/pricing`) | Speaker 5 |
| **9** | Model Performance (`/performance`) | Speaker 6 |
| **10** | Final Decision (`/final`) | Speaker 6 |
| **11** | Live Client Test (`/test`) | Speaker 6 |
| 12 | MATLAB Charts (`/outputs/matlab`) | Optional appendix |

---

# Speaker 1 — Introduction & dashboard tour

**Time:** ~4 minutes · **Page:** Slide 1 — **Overview (`/`)**

**[Stand near the screen. Dashboard already on Slide 1. Pause 2 seconds, eye contact, smile.]**

Good morning everyone. We're presenting our **AI in FinTech** project — a complete credit risk system that takes a real loan portfolio, scores each applicant, decides who to accept, calculates the expected loss in dollars, and sets a fair interest rate for every approved client.

Instead of slides, we'll show you the entire project **live on our dashboard**, called **RiskLens**. Everything you see here is built on top of our MATLAB model and our final report — same numbers, same logic, just made interactive so you can see the story unfold.

**[Point at the badge that says “Executive Dashboard” and read the title.]**

This first page is the **Overview** — it gives the headline numbers before we dig in.

**[Point at the four metric cards across the top, one by one.]**

Four key facts about the project:

- **500 historical records** — clients with known outcomes used to *learn* who tends to default.
- **AUC of 0.6775** — a standard measure of how well the model separates good clients from bad. We'll explain this in detail later.
- **20 portfolio clients** — these are new loan applications waiting for a decision: **14 accepted**, **6 rejected**.
- **$1.4 million in accepted exposure** with an **expected loss of $129,329.63** — that's the money at risk on the loans we'd actually book.

**[Pause for 2 seconds. Emphasize this result.]**

So at a glance: the dashboard answers a real bank question — *out of 20 people knocking on the door, who do we lend to, how much can we lose, and what should we charge?*

**[Scroll slightly down to the “Key Parameters” panel on the right.]**

On the right we list the **ground rules** used everywhere in the project. Every loan is **$100,000**, the recovery rate if the client defaults is **60%**, so the **Loss Given Default — LGD — is 40%**. Our cutoff score for accepting a loan is **48.2032**, scores go from **0 to 100**, and the minimum interest rate formula is **PD × LGD**. We'll come back to all of these.

**[Pause briefly. Look at the sidebar.]**

One thing worth pointing out: notice the **numbered sidebar** on the left — steps **1 through 11**. That's the order we'll walk through today. Each of my teammates will take you through one or more of those steps live.

**[Hover over Step 1 in the sidebar, then turn back to the audience.]**

Now my colleague will explain the **business problem we're solving** and the **data behind the model**.

> **Transition →** “To make sense of these numbers, let's start with the problem itself and the data we used.”

---

# Speaker 2 — Business problem, data, and methodology overview

**Time:** ~4–5 minutes · **Page:** stays on Slide 1 — **Overview (`/`)**

**[Take over the screen. Stay on Slide 1 — Overview. Look at the audience.]**

Thank you. Before talking about charts and metrics, let's answer the obvious question: **why does any of this matter?**

When a bank receives a loan application, it really only has two ways to be wrong. If it accepts too many risky clients, it loses money on **defaults**. If it rejects too many good clients, it loses **revenue and market share**. The whole point of a **credit scorecard** is to rank applicants from safer to riskier using simple facts the bank already knows — **age**, **income**, **whether they own or rent**, and **whether they're employed**. A good model is one that puts most defaulters at the bottom and most good payers at the top.

**[Scroll slightly down to the “Default Distribution — Historical Data” pie chart.]**

This is our **training dataset**: **500 historical clients** from the bank's records — read from the `HistoricalData` sheet of `DataProjScoreCard.xlsx`.

**[Point at the pie chart and the numbers next to it.]**

- **320 clients paid back normally** — coded as **0**, the green slice.
- **180 clients defaulted** — coded as **1**, the red slice.
- That's a portfolio default rate of **36%**.

**[Emphasize this result.]**

Thirty-six percent is **high** — much higher than what a real bank would tolerate without intervention. That's exactly why the bank needs a scorecard: a tool to push that number down by being more selective.

**[Scroll down so the four “Default Rate by…” charts are visible.]**

Now look at where the defaults are coming from. We split the 500 clients by **age**, **income**, **residential status**, and **employment** — and the story is very clear.

**[Point at “Default Rate by Income Band”.]**

Income is the strongest signal. Clients earning **under $30k** default about **57%** of the time. Clients earning **over $50k** default only **21%**. That's a huge gap.

**[Point at “Default Rate by Age Group”.]**

Age tells a similar story — under-35s default **50%** of the time, while clients over 65 only **17%**.

**[Point at the residential and employment charts.]**

**Renters** default more than **homeowners** — 40% vs 31%. **Unemployed or self-employed** ("Other") clients default at **44%** versus **28%** for fully employed clients.

**[Pause. Look at the audience.]**

These four patterns are exactly what the model is going to learn. We're not inventing a formula — we're letting the data show us **which combinations of characteristics correlate with repayment**.

**[Scroll down to the “MATLAB Workflow Pipeline” strip — do NOT read every step word-for-word.]**

Quickly, the pipeline behind everything you'll see today: we **load the data**, let MATLAB **group clients into risk buckets**, fit a **logistic regression**, **rescale the result into a 0–100 score**, **validate it** on the same historical data, and then **apply it to 20 new applicants** to make accept/reject decisions, calculate expected losses, and price the loans.

**[Mention this business insight clearly.]**

The important point: this is **AI in FinTech**, not a black-box machine-learning experiment. Every decision is traceable — we can always tell the bank exactly *why* a client got a particular score and exactly *why* a loan was rejected. That transparency is critical for credit risk, audit, and regulation.

**[Pause for 2 seconds.]**

So we have **500 labelled past clients** and **20 new applicants** to evaluate. Next, my colleague will explain how MATLAB turns these four features into a credit score.

> **Transition →** “Let's see how MATLAB groups the data and builds the actual scorecard.”

---

# Speaker 3 — Binning, WOE, Information Value & Scorecard construction

**Time:** ~4–5 minutes · **Pages:** Slide 2 — **WOE & Binning (`/woe`)** then Slide 3 — **Scorecard (`/scorecard`)**

**[Click step 2 in the sidebar — WOE & Binning. Wait for the page to load.]**

We're now on **Slide 2 — WOE & Binning Analysis**. This is where the model starts to take shape.

**[Point at the page subtitle: “Autobinning on 500 historical clients”.]**

In MATLAB, we use the **Credit Scorecard Toolbox** and call a function called **autobinning**. Its job is to take each predictor — age, income, employment, housing — and **split clients into groups** in the smartest possible way: groups where the default rate inside each group is very different from the next group. Income, for example, isn't used as a raw number; it's used as **"is this client under $28k, between $28–32k, $32–35k, $35–41k,"** and so on.

**[Point at the four cards at the top of the page — IV summary.]**

Once the groups are formed, MATLAB computes a number called **Information Value — IV** — for each predictor. IV measures how much **separating power** a predictor carries. The higher the IV, the more useful that variable is for predicting default.

Reading from the cards:

- **Income — IV 0.2355 — Strong** — our most powerful predictor.
- **Age — IV 0.1879 — Medium**.
- **EmploymentStatus — IV 0.1143 — Medium**.
- **ResidentialStatus — IV 0.0417 — Weak**, but still useful when combined.

**[Pause for 2 seconds. Mention this business insight clearly.]**

The bank now knows, *before* the model is even fitted, which questions matter most on a loan application form. Income matters more than housing status. That's already a useful business finding.

**[Scroll to the main WOE chart — Income should be the default selected predictor.]**

The big chart in the middle shows **Weight of Evidence — WOE — for income**. Each bar is one bin. **Green bars above the zero line** mean that bin is **safer than the portfolio average**. **Red bars below zero** mean **riskier than average**.

**[Trace the bars from left to right.]**

You can see it almost perfectly. Clients earning **under $28k** sit deep in the red — WOE of about **−0.98**, the riskiest bin. Then risk decreases as income increases. By the time we reach **$50k+** the WOE is **+0.72** — clearly safer. That smooth shape — bad to good — is what the logistic regression will use.

**[Click the “Age” tab above the chart.]**

Same idea for **age**. Under 38 — red. Above 49 — strongly green, WOE around **+0.54**. Older clients in our data behave better.

**[Click “EmploymentStatus” and then “ResidentialStatus”.]**

For employment, **Employed** is green, **Other** is red — a clean split. For residential status, **HomeOwner** is green, **renter** is red, but smaller in magnitude — which matches its low IV.

**[Scroll down to the four predictor cards with bin tables.]**

Each predictor has a small table — bin, number of clients, percentage of defaults, and the WOE — exactly the values published in **Table 8 and 9 of our report**.

**[Pause. Look at the audience.]**

OK — so WOE turns categorical information into numbers the regression can use. Let's see what comes out the other end.

**[Click step 3 in the sidebar — Scorecard.]**

We're now on **Slide 3 — Credit Scorecard Points**.

**[Point at the four charts on the page — one per predictor.]**

After WOE, MATLAB fits a **logistic regression** on all four predictors using `fitmodel`, and then calls `formatpoints` to **rescale everything into a 0–100 score**. The four charts on this page show how many **points** each bin contributes.

**[Point at the Income chart.]**

Income, again, dominates: the **lowest** bin contributes **−8.68 points**, the **highest** contributes **+28.91 points**. That's a swing of almost **38 points** just from income alone.

**[Point at the EmploymentStatus chart.]**

Employment is also strong — **Employed** adds **+25.12 points**, **Other** only **+1.80**.

**[Point at the ResidentialStatus chart.]**

Housing adds **+21.10** for owners, **+6.71** for renters.

**[Point at the Age chart.]**

Age adds from **+0.17** for the youngest bin up to **+24.87** for the oldest.

**[Emphasize this result.]**

So a client's **final credit score** is just: their **age points + income points + housing points + employment points**, clamped to **0–100**. Higher score → lower risk. That's the whole scorecard, on one page, end to end.

**[Pause for 2 seconds.]**

The model is built. Now the question is: **does it actually work?** That's what my colleague will show next.

> **Transition →** “Let's validate the model on the historical data and find the right cutoff.”

---

# Speaker 4 — Validation (ROC, KS) + Portfolio scoring (PD)

**Time:** ~4–5 minutes · **Pages:** Slide 4 — **ROC & Validation (`/validation`)** then Slide 5 — **Portfolio Risk (`/portfolio`)**

**[Click step 4 in the sidebar — ROC & Validation.]**

We're now on **Slide 4 — ROC Curve & Validation Metrics**. This page answers the question my teammate just asked: **how good is the scorecard?**

**[Point at the four metric cards at the top.]**

We applied the function `validatemodel` to the **same 500 historical clients** — and the dashboard shows the four official numbers from **Table 13 of our report**:

- **AUC = 0.6775**
- **KS Statistic = 0.2892**
- **KS Optimal Score = 48.2032**
- **Accuracy Ratio = 0.3551**

Let me unpack these one at a time.

**[Point at the ROC curve chart on the left. Trace the teal curve with the cursor.]**

The **ROC curve** plots, at every possible cutoff score, how many bad clients we'd catch versus how many good clients we'd wrongly reject. The **teal line is our model**. The **dashed grey diagonal is what you'd get from random guessing**.

**[Pause. Emphasize this result.]**

Our curve sits **clearly above the diagonal** across every cutoff. That means at any acceptance threshold, our model catches more defaulters than chance — the model has **real predictive power**.

**[Point at the AUC card.]**

**AUC** — Area Under the Curve — is the area between the teal line and the bottom axis. An AUC of **0.6775** means: if you pick one defaulter and one non-defaulter at random from the historical data, **there's about a 68% chance our model gives the defaulter the lower score**. For a four-variable model on 500 records, that's a solid, defensible result.

**[Point at the KS card.]**

**KS — Kolmogorov–Smirnov** — measures the **biggest gap** between the score distribution of good clients and bad clients. Our KS is **0.2892**, and crucially, it happens at the score value **48.2032** — that's the **KS Optimal Score** card.

**[Point at the KS Optimal Score card.]**

This number — **48.2032** — is the **single most important decision in the entire project**. It is the **acceptance threshold**. We're not picking it from intuition; the data itself tells us this is the score where good and bad clients are most cleanly separated.

**[Read the rule slowly. Emphasize each word.]**

> **Accept if the credit score is ≥ 48.2032. Reject otherwise.**

**[Point at the “Validation Summary” panel on the right.]**

The panel on the right is just a clean restate of the same numbers, plus a note that we deliberately train and validate on the same 500 historical clients — that's the methodology required by our project brief.

**[Pause. Look at the audience.]**

Now we have a working scorecard and a clear rule. Let's apply it.

**[Click step 5 in the sidebar — Portfolio Risk.]**

We're now on **Slide 5 — Portfolio Scoring**. This is the moment we move from past data to the **20 real applicants** the bank wants us to evaluate — the `ActualPortfolioData` sheet.

**[Point at the scatter chart.]**

Each dot is one of the 20 applicants. The **x-axis is their credit score**, the **y-axis is their Probability of Default — PD** — calculated by `probdefault` in MATLAB.

**[Point at the red dashed vertical line at 48.2032.]**

This red dashed line is the **cutoff at 48.2032** — exactly the KS optimal score we just saw. Everything to the right gets a loan, everything to the left is rejected.

**[Point at the cloud of dots — green vs red.]**

**Green dots = Accepted**, **red dots = Rejected**. And notice the shape — the dots fall **from upper-left to lower-right**. **Higher score → lower PD**. That monotonic relationship is exactly what you want from a credit scorecard: a higher score consistently means a safer client.

**[Hover over a green dot near the top of the green cluster — Client 4 with score 100.]**

The two safest clients have a perfect **score of 100** and a PD of just **12.79%**.

**[Hover over the lowest red dot — Client 1.]**

The riskiest applicant has a **score of 0** and a PD of **70.59%**. That's a client where 7 out of 10 simulations end in default — clearly not someone we want on the books.

**[Scroll down to the “Risk band segmentation” cards.]**

We also segment all 20 applicants into **three risk bands** for monitoring:

- **Low Risk** (score ≥ 80): **5 clients**
- **Medium Risk** (50–80): **9 clients**
- **High Risk** (below 50): **6 clients** — all six are the rejected ones.

**[Pause for 2 seconds. Mention this business insight clearly.]**

Just by sorting by score, we've already created **risk tiers** — the bank can now treat low-risk clients differently from medium-risk ones in terms of monitoring, communication, and pricing.

**[Pause.]**

We have scores. We have decisions. Now it's time to translate those into **dollars and cents**.

> **Transition →** “Now let's turn these scores into actual business outcomes — who gets the loan, how much we could lose, and what we should charge them.”

---

# Speaker 5 — Decisions, Expected Loss, Risk-Based Pricing

**Time:** ~4–5 minutes · **Pages:** Slide 6 — **Decisions (`/decisions`)**, Slide 7 — **Expected Loss (`/expected-loss`)**, Slide 8 — **Pricing (`/pricing`)**

**[Click step 6 in the sidebar — Accept / Reject.]**

We're now on **Slide 6 — Accepted vs Rejected Clients**. This page operationalizes the cutoff we just saw.

**[Point at the “Decision Breakdown” bar chart on the left.]**

The headline: out of 20 applicants — applying the rule **score ≥ 48.2032** — we get **14 accepted** and **6 rejected**. That's a **70% acceptance rate**.

**[Point at the “Client Scores vs Threshold” bar chart on the right.]**

This chart shows every client sorted by score. **Green bars are accepted**, **red bars are rejected**, and the **red dashed line at 48.20 is the cutoff**.

**[Point to the rightmost green bars — clients 4 and 5.]**

On the safe end you've got clients **4 and 5** with the maximum **score of 100**.

**[Point at the borderline green bar — client 8 at ~55.84.]**

This green bar here, hovering just above the cutoff, is **Client 8 at score 55.84**. He's a borderline case — we accept him, but he's our most risky accepted client.

**[Point at the leftmost red bar.]**

And at the bottom, **Client 1 with a score of 0** — clearly out.

**[Scroll down to the “Portfolio results table”.]**

Now the **full table** — this matches **Table 15 of our report**, one row per client.

**[Point at the column headers.]**

For every client we see their **ID**, **score**, **PD**, **decision**, **risk band**, and **expected loss in dollars**.

**[Point at row for Client 4.]**

Client 4: score **100**, PD **12.79%**, **Accepted**, **Low Risk**, expected loss **$5,114** — that's the cheapest, safest client in the portfolio.

**[Point at row for Client 1.]**

Client 1: score **0**, PD **70.59%**, **Rejected**, **High Risk**, would have cost us **$28,234** in expected loss — exactly why we don't lend to him.

**[Point at row for Client 8.]**

And our borderline accepted client — Client 8: score **55.84**, PD **33.50%**, expected loss **$13,402**. He's accepted, but he's the most expensive client we say yes to.

**[Pause for 2 seconds. Mention this business insight clearly.]**

The point isn't just "yes or no" — the dashboard is already telling the bank **which** accepted clients are riskier and need extra attention.

**[Click step 7 in the sidebar — Expected Loss.]**

We're now on **Slide 7 — Expected Loss Dashboard**. This page rolls up the dollar impact.

**[Point at the page subtitle showing the formula.]**

The formula at the top: **Expected Loss = PD × LGD × Exposure**. Plain English: how likely they are to default, times how much we lose per dollar lent — **40%** — times the loan amount — **$100,000**.

**[Point at the three metric cards.]**

For the **14 accepted clients**:

- **Total Expected Loss: $129,329.63**
- **Average PD: 23.09%**
- **Accepted Exposure: $1,400,000**

**[Emphasize this result.]**

This **$129,329.63** is the centerpiece of our results — it matches **Table 16 of the report**. It's the dollar amount the bank should be ready to absorb on this $1.4 million book, assuming a 60% recovery rate.

**[Point at the “Expected Loss per Accepted Client” bar chart.]**

The bar chart underneath shows the **per-client expected loss**. Taller bars mean **more capital at risk on that single client**.

**[Point at the tallest bar — Client 8 at ~$13,400.]**

The tallest bar is — unsurprisingly — **Client 8, around $13,400**. He's accepted because his score clears 48.20, but he's individually our largest loss exposure.

**[Point at the shortest bars on the left — clients 4 and 5 at ~$5,100.]**

The shortest bars are clients 4 and 5 at about **$5,100** each.

**[Pause. Mention this business insight clearly.]**

The same loan size produces a very different expected loss depending on the borrower. That's what justifies the next step — **charging different interest rates to different clients**.

**[Click step 8 in the sidebar — Risk Pricing.]**

We're now on **Slide 8 — Risk-Based Interest Rate Pricing**.

**[Point at the formula in the subtitle.]**

The formula: **Minimum interest rate = PD × LGD**. In simple terms, the rate has to at least cover the expected loss on that specific loan — otherwise the bank is lending at a guaranteed loss.

**[Point at the bar chart — clients sorted by rate.]**

Every bar is one client's minimum break-even rate, sorted from lowest to highest. **Green = accepted**, **red = rejected**.

**[Point at the gold dashed “Avg” line.]**

The gold dashed line is the **average minimum rate across the 14 accepted clients — 9.24%**.

**[Point at the leftmost green bars.]**

The safest clients — clients **4 and 5** — only need **5.11%** to break even. That's the cheapest credit the bank can responsibly offer.

**[Point at the rightmost green bar.]**

Our borderline client — **Client 8 — needs 13.40%**. Still acceptable, but priced much higher to reflect the risk.

**[Point at the two summary boxes below.]**

The two boxes below the chart sum it up:

- **Lowest accepted client rate: 5.11%**
- **Highest rejected client rate: 28.23%** — that's Client 1, the score-zero applicant. To break even on him, we'd need to charge **28%** interest. No bank would lend at that rate to a consumer — it's unrealistic and unethical. That's exactly why he's rejected.

**[Pause for 2 seconds. Mention this business insight clearly.]**

Risk-based pricing means: instead of charging everyone the same rate, the bank quotes a rate that **matches the risk of that specific person**. Safer clients pay less, riskier accepted clients pay more, and clearly-too-risky clients are not lent to at all.

**[Pause.]**

That's the full picture in dollars. My colleague will now bring everything together, show the final portfolio, and run a live test on the model.

> **Transition →** “Let's see the consolidated results, the final approved portfolio, and a live demo of the scorecard in action.”

---

# Speaker 6 — Model performance, final portfolio, live demo & conclusion

**Time:** ~4–5 minutes · **Pages:** Slide 9 — **Performance (`/performance`)**, Slide 10 — **Final (`/final`)**, Slide 11 — **Test (`/test`)**

**[Click step 9 in the sidebar — Model Performance.]**

We're now on **Slide 9 — Model Performance Summary**. This page is a one-screen recap of the whole project.

**[Point at the “Validation Radar” chart on the left.]**

The radar chart on the left visualizes our three validation metrics — **AUC**, **KS**, and **Accuracy Ratio** — all converted to percentages. The shape extends well beyond the centre, which means the model has consistent, balanced predictive power, not a single lucky number.

**[Point at the “Project Outcomes” list on the right.]**

The list on the right is the **executive summary**. Reading top to bottom:

- **500** historical observations
- **36%** historical default rate
- **AUC of 0.6775** on historical data
- **14 out of 20** portfolio clients accepted
- **70%** acceptance rate
- **23.09%** average PD on the accepted book

**[Mention this business insight clearly.]**

In other words — we moved from a historical default rate of **36%** down to an expected default rate of **23%** on the accepted book. That's the **value-add of using a credit scorecard**.

**[Scroll down briefly — the accept/reject and risk band charts here are recap charts. Skim them.]**

The two charts at the bottom — accepted vs rejected and risk band distribution — are just a visual recap of what we saw earlier. We'll go straight to the final view.

**[Click step 10 in the sidebar — Final Decision.]**

This is **Slide 10 — Final Portfolio Decision**.

**[Point at the gradient banner at the top — “14 Clients · $1.4M”.]**

The big banner is the **final approved portfolio**:

- **14 clients approved**
- **$1.4 million in exposure**
- **$129,329.63 total expected loss**
- **Average PD 23.09%**, **average minimum interest rate 9.24%**
- **6 clients rejected**

**[Point at the two columns below — Accepted on the left, Rejected on the right.]**

The two columns underneath show every client by ID, with their score and PD. On the left, **14 accepted clients**, all sorted by score. On the right, **6 rejected clients** — all with scores below 48.

**[Pause for 2 seconds. Look at the audience.]**

This is the deliverable. If we were presenting this to a credit committee, this page is what they'd sign off on. Now let's prove the scorecard actually works **live**.

**[Click step 11 in the sidebar — Live Client Test.]**

This is **Slide 11 — Live Client Test**. Here you can pick **any one of the 20 applicants**, run the scorecard, and see the exact result the bank would get in production.

**[Open the dropdown at the top — "Quick select (MATLAB portfolio)" — and pick "Client #4 — Score 100 (Accepted)".]**

Let's start with our safest applicant — **Client 4**. As soon as we select him, the applicant profile fills in on the left: **age 50, income $54,000, homeowner, employed**.

**[Point at the “Scorecard point breakdown” table on the right.]**

You can see his **point breakdown live** — Age **+24.87**, Income **+23.84**, Housing **+21.10**, Employment **+25.12**. They add up to **94.94**, capped at **100**.

**[Click the teal “Run credit test” button. Wait for the animation.]**

Now we click **Run credit test** — the dashboard simulates the MATLAB pipeline. Score gauge animates…

**[Once result appears, point at the gauge and the four cards.]**

…and the result: **Score 100**, **PD 12.79%**, **Accepted**, **Low Risk**, **Expected Loss $5,114**, **Minimum Rate 5.11%**. **Exactly** the numbers from Table 15 of our report.

**[Open the dropdown again, pick "Client #1 — Score 0.0 (Rejected)". Click Run credit test.]**

For comparison, let's try **Client 1** — the worst applicant. Score **0**, PD **70.59%**, **Rejected**, **High Risk**, expected loss **$28,234**, rate **28.23%**. Same scorecard, opposite outcome — that's the model doing exactly what it's supposed to do.

**[Optional — say only if time allows: change Client 1's income to $80,000 and re-run.]**

We can even play **"what if?"**: if we manually change Client 1's income from $21,000 to $80,000 and re-run, the score jumps and the decision flips — showing how sensitive credit risk is to income, which matches the IV we saw on Slide 2.

**[Pause for 2 seconds. Mention this business insight clearly.]**

In production, this is the exact tool a credit officer would use — type the applicant's profile, click one button, get a defensible decision in under a second.

---

## Conclusion

**[Step back from the screen. Speak slowly. Eye contact with the audience.]**

To wrap up — in this project we built a **complete AI-in-FinTech credit risk system**:

1. We **learned from 500 past clients** using MATLAB's Credit Scorecard Toolbox.
2. We **built a scorecard** from four simple predictors — age, income, housing, employment — and validated it with **AUC 0.6775** and **KS 0.2892**.
3. We **applied it to 20 new applicants**, accepting **14** and rejecting **6** using the data-driven cutoff of **48.2032**.
4. We **quantified the risk in dollars** — **$129,329.63** of expected loss on **$1.4 million** of exposure.
5. We **priced every loan individually** — from **5.11%** for our safest clients to **13.40%** for the riskiest accepted ones.
6. And finally, we built **RiskLens** — this dashboard — so that every decision is **traceable, explainable, and live**.

**[Brief pause.]**

The project shows that the value of AI in finance isn't replacing the credit officer — it's giving them a transparent, consistent, and defensible tool. Every accept, every reject, every interest rate on this dashboard ties back to **the same four facts on a loan application**.

**[Smile. Final eye contact.]**

Thank you very much for your attention — we'd be happy to take your questions.

---

## Q&A — short answers (any member can pick up)

| Question | Suggested answer |
|----------|------------------|
| **Why train and validate on the same 500 clients?** | Project brief specifies this approach. With only 500 records, splitting train/test reduces sample size below what's reliable. |
| **Is AUC 0.6775 “good”?** | For a 4-variable scorecard, yes — defensible academically. A production bank model uses 30–50 variables and aims for AUC > 0.75. |
| **Where does 48.2032 come from?** | It's the score that maximizes the KS statistic — i.e. the **biggest separation** between good and bad clients on the historical data. |
| **What's the difference between WOE and Points?** | WOE is a raw log-ratio per bin. Points are the **scaled, rounded version** of WOE × the regression coefficient, fitted to a 0–100 range. |
| **Why is Client 8 accepted with a 13.40% rate?** | His score (55.84) is above 48.20, so the model accepts him. The high rate just reflects that he's our riskiest accepted client. |
| **What happens if the economy changes?** | This is the main limitation — the model is trained on past data. In production, the bank would **monitor PD vs realized defaults** quarterly and recalibrate as needed. |
| **Could this be improved with more data?** | Absolutely. Adding credit-bureau scores, debt-to-income ratios, transaction history, and employment tenure would lift AUC significantly. |
| **Where is the code?** | `matlab/FinTech_Scorecard_Project.m` and the `Final/` folder in the GitHub repository. |

---

## Speaker quick-reference (cheat card)

| # | Speaker | Pages | Key numbers to mention |
|---|---------|-------|------------------------|
| 1 | Intro & dashboard tour | Slide 1 | 500, 20, AUC 0.6775, 14 accepted, $1.4M, $129,329 |
| 2 | Problem, data, methodology | Slide 1 | 36%, 320/180, 57% / 21%, $100k loan, LGD 40% |
| 3 | WOE & Scorecard | Slides 2–3 | IV: 0.2355 / 0.1879 / 0.1143 / 0.0417, points −8.68 to +28.91 |
| 4 | Validation & Portfolio | Slides 4–5 | AUC 0.6775, KS 0.2892, cutoff 48.2032, 5 / 9 / 6 risk bands |
| 5 | Decisions, EL, Pricing | Slides 6–8 | 14/6, $129,329.63, $1.4M, avg PD 23.09%, rates 5.11%–28.23% |
| 6 | Performance, Final, Live demo | Slides 9–11 | 70% acceptance, Client 4 → 100/12.79%/$5,114, Client 1 → 0/70.59%/$28,234 |

---

## Rehearsal checklist

- [ ] Dashboard running and loaded on Slide 1 before audience walks in
- [ ] Every speaker has clicked through their own slides once
- [ ] Client Test page tested with both Client 4 and Client 1
- [ ] Sidebar visible on the projection (not zoomed out)
- [ ] Backup report PDF open on a second device
- [ ] Internet not required — `npm run dev` runs locally

---

*Script aligned with `Final/fintech (1).pdf` (Tables 13 / 15 / 16), `matlab/FinTech_Scorecard_Project.m`, and the RiskLens dashboard (`fintech-dashboard/src/config/presentationNav.ts`, steps 1–11).*
