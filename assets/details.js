const DETAILS = {
  'spy-ief-research-atlas': {
    "screenshot": "images/spy-ief-atlas.jpg",
    "screenshotSize": [1280, 800],
    "screenshotAlt": "The interactive atlas, overview page: full-sample SPY and IEF daily-return correlation −0.29 beside the latest period’s +0.07, with the analysis-range control above",
    "title": "SPY / IEF Research Atlas",
    "subtitle": "When does stock–bond diversification weaken?",
    "headline": "How stable is the diversification relationship between U.S. equities and Treasury bonds?",
    "tagline": "Bonds cushioned most of the worst stock days for two decades, then stopped. IEF rose on 236 of 304 of SPY’s worst 5% days across the full sample, on 10 of 25 in 2022–23 and on 17 of 35 in 2024–26. The recent correlation estimates are positive, with 95% intervals that include zero, so I report a weaker cushion, not a reversed one.",
    "chips": [
        "Python",
        "JavaScript",
        "Plotly",
        "Time Series",
        "Statistical Inference",
        "Reproducibility"
    ],
    "metrics": [
        {
            "label": "Aligned daily returns",
            "value": "6,082"
        },
        {
            "label": "Data through",
            "value": "2026-10-02"
        },
        {
            "label": "Interactive pages",
            "value": "7"
        }
    ],
    "sections": [
        [
            "01 · Methods",
            "The extension compares 6,082 aligned SPY/IEF daily returns from August 2002 through October 2026 with rolling correlations, period-level uncertainty, stress-day comparisons and walk-forward volatility evaluation. The seven-page atlas lets a reader pick exact date ranges, upload price files, replay historical allocations and test forecasts against persistence. A macro view pairs FRED’s 10-year breakeven inflation rate with quarterly stock–bond correlation and reports HAC intervals and a trend sensitivity check."
        ],
        [
            "02 · My contribution",
            "I co-authored the 2024 course study with Zun Cao: the analysis, the written findings and the original seven-tab Dash app. For the 2026 extension I set the research questions and reviewed the implementation, with AI coding assistance."
        ],
        [
            "03 · Further findings",
            "<span class=\"result-line\">Full-sample daily correlation was −0.29 (95% moving-block interval −0.35 to −0.23). IEF rose on 236/304 of the worst 5% SPY days overall, compared with 17/35 during January 2024–October 2026.</span><span class=\"result-line\">Across 95 eligible quarters, the association between mean 10-year breakeven inflation and stock–bond correlation was 0.31 per percentage point (approximate 95% HAC interval 0.11–0.50), or 0.32 (0.09–0.55) with a linear trend; excluding 2022+ quarters reduced it to 0.17 (−0.03–0.37, 76 quarters). The exclusion interval includes zero: the full-sample association depends on the 2022+ quarters and is no rule across eras.</span><span class=\"result-line\">SPY HAR-type volatility MAE was 11.2% below persistence across 250 retrospective origins. In January 2022–December 2023, its MAE was 27.7% higher across only 24 origins; the paired ΔMAE interval (−0.017 to +0.116 daily-volatility percentage points) includes zero.</span>"
        ],
        [
            "04 · Scope and limitations",
            "The series is a joined return index, not dollar prices. The analysis is descriptive and the forecast evaluation retrospective, so it establishes no causal explanation and no forecasting edge. Data through <strong>2026-10-02</strong>. This project is separate from my Guangzhou Futures research."
        ]
    ],
    "context": "The atlas tests how much a full-sample average obscures changes across periods.",
    "contribution": "I co-authored the 2024 course study with Zun Cao: the analysis, the written findings and the original seven-tab Dash app. For the 2026 extension I set the research questions and reviewed the implementation, with AI coding assistance."

,
    dashboard: 'projects/spy-ief/',
    offline: 'projects/spy-ief/offline.html',
  },

  'olist-delivery-promises': {
    title: 'Promised Delivery Dates on Olist',
    subtitle: 'When is a matched comparison still unequal?',
    headline: 'How many days should a shop promise, and does a better forecast promise fewer?',
    tagline: 'A promised delivery date trades late arrivals against spare days. I derived the loss-minimising whole-day promise as a quantile of delivery time (the number of days within which a set share of orders arrives), the same object as a value-at-risk threshold, calibrated it so the promised coverage holds, and tested under a pre-registered design (the comparison written down before any scoring) whether a model with lower forecast loss promises fewer days at the same reliability. On public Olist orders from Brazil it does not, and the study shows why.',
    chips: ['Python', 'pandas', 'scikit-learn', 'DuckDB', 'Quantile regression', 'Conformal calibration', 'pytest'],
    screenshot: 'images/olist-delivery-diagnostics.jpg',
    screenshotSize: [1280, 800],
    screenshotAlt: 'The project site, overview page: four questions, from which orders to check first to the mathematics of the promise. Its first line shows the monthly-refit view for April to June 2018, where the top 10% of each week\u2019s picks caught 34.2% of late orders, 3.4 times a random pick. The 30.5% and 2.9 times on this page come from the earlier single time split.',
    dashboard: 'https://suzanneisgenius.github.io/olist-delivery-promises/',
    metrics: [
      { label: 'Expected loss, quantile promise vs mean', value: '34% lower', note: 'Whole-day promise at a 90% target, equivalent to a 9:1 late-to-early cost ratio; 12,045 validation orders.' },
      { label: 'On-time coverage, mean vs quantile', value: '65.5% → 91.4%', note: 'Share of orders arriving by the promised day, same 12,045 orders.' },
      { label: 'Late orders caught by the top 10% of risk picks', value: '30.5%', note: '2.9× a random pick with the same weekly budget; ROC AUC 0.761. Single time split, labels used only once delivered. The project site\u2019s monthly-refit view (April to June 2018) reports 34.2% and 3.4× for the same rule.' },
      { label: 'Promised delivery window vs Olist’s own estimate', value: '12% shorter', note: '24.4 → 21.4 days, 3.0 days fewer under the per-state quantile rule, at coverage within the registered tolerance. Purchases April to July 2018.' },
    ],
    sections: [
      [
        '01 · Question',
        'Two decisions sit behind a delivery promise: which orders to check first, and how many days to promise. The second is the main study. Under an asymmetric linear loss the best whole-day promise is a quantile of delivery time, so a 90% target is the same decision as pricing a late day at nine times a spare day. I ask whether a model with lower forecast loss turns that advantage into fewer promised days at the same coverage.'
      ],
      [
        '02 · Data',
        'Public Olist e-commerce orders, Brazil, 2017 to 2018, restricted to delivered single-seller orders. Three disjoint periods: 12,045 validation orders for the quantile-versus-mean comparison, 17,056 orders from October to December 2017 for calibration, and 19,950 orders from April to July 2018 for the pre-registered evaluation, scored once. Labels are used only once an order is delivered, so nothing at purchase time sees the future. I had looked at the evaluation orders earlier in the project, so I call this pre-registered exploratory work rather than a blind test.'
      ],
      [
        '03 · Methods',
        'Three policies set a whole-day promise at a 90% target: a per-state quantile rule, a linear quantile regression and shallow gradient boosting. I calibrated each with a split-conformal-style shift on the calibration orders, froze it, and scored it once on the evaluation orders. For integer outcomes I prove that Y ≤ U holds exactly when Y ≤ ⌊U⌋, so rounding a continuous bound down loses no coverage. I matched the regression-versus-rule comparison on the same orders and built an additive decomposition that splits any day gap into prediction, calibration and rounding. A separate logistic model ranks orders by late risk at purchase time, evaluated on a time split with no future labels.'
      ],
      [
        '04 · Results',
        '<span class="result-line"><strong>Quantile versus mean.</strong> On 12,045 validation orders the 90% quantile promise cut expected loss by <strong>34%</strong> against promising the mean and raised on-time coverage from <strong>65.5% to 91.4%</strong>.</span><span class="result-line"><strong>Rounding.</strong> Rounding the calibrated bound down instead of up shortened every continuous-model promise by one day with no loss of coverage, and widened gradient boosting’s lead over the state rule from 0.32 to 1.32 days, past the one-day bar. This is post hoc and sits beside the registered result, not in place of it.</span><span class="result-line"><strong>Matched comparison.</strong> Matching the regression-versus-rule comparison moved the gap by 4.11 days and reversed the earlier verdict. Gradient boosting had <strong>6.5% lower</strong> pre-calibration pinball loss than the linear model yet promised 1.22 more days: +0.90 from prediction, +0.31 from calibration, and about zero from rounding. The two frozen policies reached 97.1% and 96.2% coverage, so they were never at the same reliability.</span><span class="result-line"><strong>Late-risk ranking.</strong> The top 10% of each week’s orders by risk held <strong>30.5%</strong> of late deliveries, <strong>2.9×</strong> a random pick with the same budget (ROC AUC 0.761).</span><span class="result-line"><strong>Against Olist’s own date.</strong> The per-state quantile rule promised 3.0 days, or <strong>12%</strong>, less than Olist’s estimate, at coverage within the registered tolerance.</span><span class="case-note">Every reported number is recomputed from the saved per-order files by a check script; the freeze record and config hashes are in the repository.</span>'
      ],
      [
        '05 · What the analysis cannot show',
        'Every calibrated policy over-covered the evaluation period, 96% to 97% for a 90% target. Changing delivery times, the cohort filter on Olist’s estimated date and order mix could each explain it; this study does not separate them. There is one evaluation period, so I have not tested whether rounding down or recalibration holds up in a new one, and the results cover delivered single-seller orders only. The risk ranking says which orders to look at first; measuring prevented delays would take an intervention study.'
      ],
      [
        '06 · Reflection',
        'Lower loss did not buy a shorter promise. The gap came from how the calibration shift carried from one period to the next, and no loss metric on the training period could have shown it. Three habits came out of this: compare policies at matched reliability, register the comparison before scoring, and write the rounding rule down as a proof.'
      ]
    ],
  },
  /* Olist: numbers from the repository's saved E1 results (outputs/e1/posthoc/posthoc_v.json,
     outputs/e1/score_verification.csv, docs/STAGE7_DATE_POLICY.md, docs/manager_handoff.md,
     docs/E1_DECISIONS.md). Loss 23.76 -> 15.61 is the 34% cut; coverage 0.655 -> 0.914 on the same
     12,045 orders; pinball 1.417 vs 1.324 unshifted is the 6.5% gap; AP 0.123 vs a 0.043 late rate
     is the 2.9x; state rule 21.4 vs Olist 24.4 days is the 12%. Improvements under 6% are left out. */
  'quant-platform': {
    title: 'Futures Factor Platform and NAV Risk Monitor',
    subtitle: 'Two systems from a summer on an asset-management desk',
    headline: 'Which signals add anything, and when should an account take risk off?',
    tagline: 'As a quantitative research intern at Guangzhou Futures I built two systems for the asset-management desk. The first tests fundamental factors on commodity futures without letting the future leak into the backtest. The second, my design end to end, reads an account’s daily net value and turns the slope of that curve into graded de-risking alerts. Both run on whatever history the desk feeds them.',
    chips: ['Python', 'pandas', 'NumPy', 'JavaScript', 'Factor evaluation', 'Backtesting', 'Risk monitoring'],
    screenshot: 'images/nav-risk-workbench.jpg',
    screenshotSize: [1280, 800],
    screenshotAlt: 'The demo workbench, account monitor: a synthetic account’s risk level for the latest date, its net value chart with a signal strip beneath it, and a performance summary card with the cumulative return highlighted, volatility and exposure, and the daily return range',
    metrics: [
      { label: 'Commodity futures covered', value: '54', note: 'Five sectors; eight fundamental factors tested on the platform.' },
      { label: 'Slope horizons', value: '3 / 5 / 10 days', note: 'Least-squares slope of net value over the trailing points, scaled to percent per day.' },
      { label: 'De-risking thresholds', value: '0.20 / 0.35 %/day', note: 'Growth-rate gap, 10-day slope minus 3-day slope: observe above 0.20, act above 0.35.' },
      { label: 'Scored rules', value: '5', note: 'Each weighted and calibrated by the drawdown that followed its own signals; rules that did not verify are kept at low weight and labelled.' },
    ],
    sections: [
      [
        '01 · Question',
        'The desk asked two things. Of the fundamental factors it already watched, which add anything beyond the signals in use, and how would we know a backtest result means something? And once an account is making money, when should it take risk off: how much is enough, and what does slowing look like before it turns into a drawdown? I answered the first with a factor research platform and the second with a net-value risk monitor built around one measure, the slope of the account’s equity curve.'
      ],
      [
        '02 · Factor platform',
        'The platform covers 54 commodity futures in five sectors. I timestamp data availability, signal formation and execution separately, so a factor can only use what was known when the trade would have been placed; look-ahead bias is ruled out by construction, with no need to inspect for it. I evaluated eight fundamental factors with IC and ICIR (how well a factor ranks next-period returns, and how steady that ranking is), quintile backtests and single-factor attribution under one fixed backtest contract: the same rebalancing rule, trading rule and cost assumptions for every factor, so the results are comparable. The platform also automated the desk’s daily data checks.'
      ],
      [
        '03 · NAV risk monitor',
        'The monitor is my design. For each day it fits a least-squares line to the last 3, 5 and 10 net-value points and reads the slope as a growth rate in percent per day. The core measure is the gap between the 10-day and the 3-day slope: how much slower the account is growing now than over the past two weeks. Two thresholds turn that gap into a decision. Above 0.20 percent per day the account is on watch and the desk is told to think about locking in gains; above 0.35, or above 0.20 with the 3-day slope already negative, the monitor calls for a reduction. Four further rules add to a score: margin pressure rising while net value stalls, a loss taken at high margin usage, a new high whose 3-day slope has already dropped below the 5- and 10-day slopes, and volatility entering the account’s own top decile on a down day. The score maps to four levels, and only the top level says reduce. I calibrated every rule the same way, by the worst drawdown in the days after its signals against the all-days baseline. Two rules did not separate from the baseline; I kept them at low weight and labelled them unverified on the page itself.'
      ],
      [
        '04 · System design',
        '<span class="result-line"><strong>One file, no server.</strong> The monitor is a single offline HTML page with the rules, the charts and the data inside it, so the desk can open it anywhere and hand it on.</span><span class="result-line"><strong>Any history.</strong> It takes a spreadsheet of daily net value or equity for any number of accounts and any length of history, recomputes slopes, drawdowns, volatility and alerts on the real date order without filling gaps, and can save itself as a new version with the updated data and rules embedded.</span><span class="result-line"><strong>Tunable, with a record.</strong> Thresholds and weights are editable on the page, an auto-calibration sets them from the account’s own post-signal drawdowns, and a pure-slope tool checks any pasted net-value column in seconds.</span><span class="result-line"><strong>Watch before act.</strong> Observation and reduction are separate levels, and the monitor never prescribes a position size; it tells the desk when to look.</span><span class="result-line"><strong>Open demo.</strong> The workbench linked above is a rebuild from my own understanding of the design, with the firm’s data and core rule set removed: three synthetic accounts, every view and control intact, an upload entry for your own CSV or Excel files, several accounts side by side with an optional combined series, and a snapshot that saves the loaded workspace as a single HTML file.</span>'
      ],
      [
        '05 · What stays private',
        'Nothing on this page comes from the firm’s data. I calibrated the platform on the desk’s own history and the monitor on live account histories my supervisor supplied; the code, those series and every figure derived from them stay with the firm. I describe the methods in outline and leave out the core algorithms: the exact factor definitions, the signal-combination logic and the full rule set behind the alerts. What this page shows is the design and the reasoning, and the demo workbench runs that design on generated accounts only. The public projects on this site apply the same discipline to public data: timestamping what was known when, calibrating a rule against what followed its signals, measuring the error around an estimate, and keeping the watch level apart from the act level. The monitor is a backtest and alerting tool, not a trading recommendation; its thresholds reflect the accounts it was calibrated on and should be re-set as the desk’s history grows.'
      ],
      [
        '06 · What I took from the summer',
        'Two lessons, one from each system. On the platform, an equal-weight vote of all eight factors trailed the best single factor in every sector. I worked out why, through cross-factor correlations, alternative weights and orthogonalization, and now ask what a factor measures, what it assumes and what it adds before I trust its backtest. On the monitor, the useful signal was the change in the slope of net value, never its level: an account that is still rising can already be slowing, and that is the moment to look. Building a tool other people would act on also taught me to label what was verified and what was not, and to keep the watch level separate from the act level, so an alert is a reason to think rather than an instruction.'
      ]
    ],
  },

  'health-dashboard': {
    title: 'Malaria Prevention & Child Mortality',
    headline: 'Who uses bed nets, and what do country-level data show?',
    tagline: 'Who uses insecticide-treated nets, what country-level mortality data can and cannot say about them, and whether net use improves prediction. The answers: the poorest households more often than the richest in 28 of 45 countries; an adjusted estimate whose interval runs from −7.1% to +6.7%; and no clear gain in held-out prediction.',
    contribution: "In the original three-person course project I wrote the introduction and the narrative and built the world map. For the reanalysis I wrote the specifications and the review notes.",
    chips: ['Python', 'statsmodels', 'scikit-learn', 'Cross-validation', 'Interactive maps'],
    screenshot: 'images/malaria-overview-v3_8_4.jpg',
    screenshotSize: [1280, 803],
    screenshotAlt: 'Our v3.8.4 dashboard overview with seven sections and an interactive ITN-use map',
    dashboard: 'malaria_dashboard_v3_8_4.html',
    metrics: [
      { label: 'Countries with poorest > richest ITN use', value: '28/45', note: 'Children’s ITN use in each country’s latest survey.' },
      { label: 'Adjusted country-level estimate', value: '−0.43%', note: 'Per 10-percentage-point higher children’s ITN use. Relative mortality difference; 95% CI −7.1% to +6.7%.' },
      { label: 'Across 13 comparisons', value: 'No clear prediction improvement', statement: true, note: 'Under the conditional resampling check; this does not establish no effect.' },
      { label: 'DHS surveys', value: '159', note: 'Surveys with wealth-group estimates.' },
    ],
    sections: [
      [
            "01 · Question",
            "The reanalysis asks three separate questions: who uses nets (coverage), whether country-level net use goes with lower under-five mortality once other factors are adjusted for (association), and whether net use helps predict mortality in countries held out from training (prediction)."
      ],
      [
            "02 · Data",
            "Frozen snapshots from the World Bank, the DHS Program and the Malaria Atlas Project: a 63-country cross-section, a 40-country African annual panel (2000–2023), and 159 DHS surveys with wealth-group estimates. Children’s ITN use in the cross-section is kept apart from estimated whole-population use in the panel. A source audit matched 57 of 63 national ITN-use values to the official snapshot and standardised the other six to it."
      ],
      [
            "03 · Methods",
            "Adjusted regression compares countries; fixed-effects models (which compare each country with itself over time) track changes within countries. Ridge and random forests are scored on held-out countries, with missing-value handling and tuning confined to the training folds. Later-year checks and simple baselines give further comparisons."
      ],
      [
            "04 · System Design",
            "<strong>Source snapshots → cleaned tables → model results → an interactive dashboard.</strong> A reproducible Python pipeline feeds one offline HTML file, with maps, wealth-group comparisons, validation designs, methods and limitations."
      ],
      [
            "05 · Results",
            "<span class=\"result-line\"><strong>Coverage.</strong> Children’s ITN use was higher in the poorest than the richest wealth group in <strong>28 of 45 countries</strong>, using each country’s latest available survey.</span><span class=\"result-line\"><strong>Association.</strong> Across 63 countries, the adjusted country-level estimate was a <strong>−0.43% relative mortality difference per 10-percentage-point higher children’s ITN use</strong> (95% CI −7.1% to +6.7%). The interval includes zero: these data do not settle the direction of the association.</span><span class=\"result-line\"><strong>Prediction.</strong> Adding ITN reduced point-estimate error in <strong>4 of 13 comparisons</strong>, but none showed a clear improvement under the conditional resampling check.</span><span class=\"result-line\"><strong>Precision.</strong> Holding the design and estimated standard error fixed, the approximate 80%-power threshold was <strong>9.2% lower or 10.1% higher</strong> mortality per 10-point increase in ITN use. This check does not rule out smaller associations.</span><span class=\"case-note\">Prediction ranges use saved held-out errors and exclude refitting, tuning and measurement uncertainty. The model comparisons share countries.</span>"
      ],
      [
            "06 · Reflection",
            "I keep coverage, association and prediction apart, because they answer different questions. Country-level, all-cause mortality data cannot establish individual protection or a causal effect, and an interval that includes zero is no proof of no association. Individual protection needs individual-level data and a study designed for it."
      ]
],
  },
  'bankroll-risk': {
    "screenshot": "images/poker-risk-lab-app.jpg",
    "screenshotSize": [1280, 800],
    "screenshotAlt": "Risk Lab in the live app: the risk of hitting zero for one scenario, with its Monte Carlo interval, beside a chart of simulated bankroll paths",
    title: 'Bankroll Risk Lab',
    subtitle: 'Poker bankroll as a case study in absorbing-boundary risk',
    headline: 'How reliable is a risk estimate when the model, the data, and the numerics are all imperfect?',
    tagline: 'One risk number, three sources of error, and I measure each. For the base scenario a single 2,000-path simulation lands within about ±1.13 points of the exact 7.17%; not knowing the win rate after 50,000 hands leaves anything from 0.1% to 83.3% plausible; and five ways results might arrive give 6.4% to 20.3%. Only the first shrinks with more computing.',
    chips: ['Python', 'NumPy', 'SciPy', 'Monte Carlo', 'Bayesian inference', 'Numerical validation'],
    metrics: [
      { label: 'Base-model risk', value: '7.2%', note: 'Fixed assumptions; separate from the uncertainty case.' },
      { label: 'Base-model 95% CI', value: '[6.6%, 7.7%]', note: 'Interval for the 7.2% simulation estimate.' },
      { label: 'Separate uncertainty case', value: '37.4%', note: 'Posterior-averaged risk; the plug-in risk in this same case is 27.3%.' },
      { label: 'Paths Simulated', value: '2.0M' },
    ],
    strands: [
      { tag: 'STRAND 01 · NUMERICS', title: 'Barrier resolution & the Brownian-bridge correction',
        body: 'A discrete step size lets a path cross the ruin boundary and recover between observations, so the simulation understates risk. At step = 500 hands the estimate understates ruin by 8.2%; a Brownian-bridge crossing correction cuts the discretization error to under 1%.' },
      { tag: 'STRAND 02 · MC ERROR', title: 'Monte Carlo convergence & coverage',
        body: 'Estimator error falls with a log-log slope of −0.55 ± 0.03, the O(N^-1/2) rate Monte Carlo should give. I check the bootstrap confidence intervals for nominal coverage instead of assuming it.' },
      { tag: 'STRAND 03 · UNCERTAINTY', title: 'Bayesian propagation of parameter uncertainty',
        body: 'In a separate synthetic-history case, 50,000 hands give an estimated win rate of 1.86 bb/100 and volatility of 89.0 bb/100. With a 2,000 bb bankroll, a 100,000-hand horizon and ruin at zero, plug-in risk is 27.3%; posterior-averaged risk is 37.4% (×1.37). This comparison includes prior shrinkage: risk at the posterior-mean win rate is 30.2%, before averaging over win-rate uncertainty. Volatility stays fixed. These figures are separate from the 7.2% base model.' },
      { tag: 'STRAND 04 · ROBUSTNESS', title: 'Model-misspecification stress tests',
        body: 'I break the i.i.d.-Normal assumption on purpose. Serial correlation (AR(1)) inflates ruin by 1.44×; a regime-switching volatility model by 1.20×. The headline number is reported with how far it moves under each violation.' },
    ],
    validation: {
      caption: 'Four independent estimates of ruin probability. Their agreement is the evidence that the engine is correct.',
      rows: [
        { m: 'Monte Carlo, 2.0M paths (95% CI)', v: '0.072', ci: '[0.066, 0.077]' },
        { m: 'Brownian bridge, finite horizon', v: '0.072', ci: '' },
        { m: 'Brownian motion, infinite horizon', v: '0.108', ci: '' },
        { m: 'Markov chain, absorption probability', v: '0.068', ci: '' },
      ],
    },
    sections: [
      ['01 · Research Question', 'A ruin probability (the chance that a bankroll hits zero) is only as trustworthy as the weakest link behind it. I use one concrete absorbing-boundary problem, a poker bankroll, as a testbed for a general question: how much does a headline risk estimate change once the numerical scheme, the finite sample, the parameter uncertainty and the model form are each stress-tested?'],
      ['02 · Data & Model', 'No real player records are used. The base-model benchmark uses a 3 bb/100 win rate, 90 bb/100 volatility, a 30-buy-in bankroll and a 100,000-hand horizon. A separate uncertainty case estimates the win rate from 50,000 synthetic hands, then models a 2,000 bb bankroll over the next 100,000 hands. Both use an absorbing boundary at zero. The uncertainty case uses a Normal prior with mean 0 and standard deviation 10 bb/100, an autocorrelation-adjusted estimation error and 20,000 posterior draws; estimated volatility is held fixed.'],
      ['03 · Methodology', 'Four strands, each isolating one source of error: barrier-resolution bias and its Brownian-bridge correction; Monte Carlo convergence (how the simulation’s error shrinks as more random paths are run) and interval coverage; Bayesian propagation of parameter uncertainty; and misspecification stress tests. I cross-check the results against a Brownian first-passage solution and a Markov-chain absorption model.'],
      ['04 · Validation', 'Monte Carlo, the finite-horizon Brownian bridge and the Markov chain agree at about 0.07. The infinite-horizon Brownian approximation sits higher at 0.108, exactly as its assumptions predict. Three independent methods agreeing, and the one disagreement explained, is what makes the engine credible.'],
      ['05 · Findings', 'Base-model benchmark: 7.2% ruin risk (95% CI 6.6%–7.7%) under fixed assumptions. Separate synthetic-history case: 27.3% plug-in risk against 37.4% posterior-averaged risk (×1.37), with both prior shrinkage and win-rate uncertainty included; its 95% posterior interval for conditional risk runs from 0.9% to 97.3%. These are two different scenarios; the number did not rise from 7.2% to 37.4%. Separate stress tests show up to 1.44× higher risk under serial correlation.'],
      ['06 · Reflection', 'A defensible estimate needs the numerics, the sampling error, the estimation uncertainty and the model form audited together. Auditing them one at a time hides how they interact. That audit is what I carry to the next problem.'],
    ],
  },
};
