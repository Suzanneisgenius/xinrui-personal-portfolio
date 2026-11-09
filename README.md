# Xinrui Song — application site, shell v8 (2026-10-30)

Static. No build step. Serve the folder root (GitHub Pages / Vercel / `python3 -m http.server`).

## Files
- `index.html` — shell: header, hero, project list, about, contact, detail root.
- `assets/site.css` — tokens and layout. Colors at the top of the file.
- `assets/site.js` — home list (`PROJECTS`), external links (`LINKS`), contribution text, detail renderer, hash router, typing.
- `assets/details.js` — project copy, carried over from r7 unchanged except: Multi-Factor sample metrics removed.
- `assets/spy-figure.js` — the real SPY/IEF chart (472 KB, loads deferred).
- `malaria_dashboard_v3_8_4.html`, `projects/spy-ief/` — unchanged from r7.

## Before publishing — fill or confirm
1. `[RENDER_URL]` in `assets/site.js` → done 2026-11-01: `LINKS['bankroll-risk'].app` holds `https://poker-analytics-suite.onrender.com/`.
2. GitHub profile URL (`github.com/Suzanneisgenius`) — confirm.
3. Project years in `PROJECTS` (2026 / 2024–26 / 2026 / 2025) — confirm.
4. Hero third line (the typed one) — edit wording in `index.html`, id `hero-typed`.
5. About: Guangzhou Futures sentence — confirm wording.
6. CV: add `cv/Xinrui_Song_CV.pdf` (public version, no phone/address) and a link in `.hero-links` and the terminal.
7. Poker screenshot: once available, add to `DETAILS['bankroll-risk'].screenshot`.

## Removed from r7 on purpose
Particles, scroll-reveal, stat tiles, evidence matrix, certificate wall, stack cards, decorative motifs (cards / candlesticks / map), BI and Weather projects (now one sentence in About), preview banner, placeholders.

## v8: the spec-sheet system (site-wide)
One ruled component, `.spec` / `.spec-row` / `.spec-item`, carries every block of facts:
- Project page: title → exhibit (real figure if any) → spec sheet (Project / Tools / Open, then key numbers; notes as footnotes) → research question (t2) → My part (body size) → summary → six sections.
- Home rows: title → one-line summary → compact spec row (Project / Tools / Access).
- About: spec sheet (Degree / Graduation / Minors / Certificate / Applying to) → two paragraphs → email line.
Accent colour now appears only on link hover and the terminal caret. No coloured borders, no tiles, no cards.

## v5 changes
- Hero now follows reference 03: portrait → name → two lines → one row of links. About / Education / Contact open a terminal under the links and type their content (4 ms/char, cancel on switch, links disabled while typing, deep links `#t/about`, `#t/education`, `#t/contact`). Projects scrolls down; GitHub / LinkedIn carry ↗.
- Random-walk canvas removed. Contact section removed (contact lives in the terminal; About keeps one email line).
- Portrait: drop `images/portrait.jpg` (square, ≥ 512 px) and it appears automatically, in colour. Without the file the hero simply has no image.
- Terminal content is in three `<template>` blocks in `index.html`; edit text there.

## v4 changes
- Type: IBM Plex Sans 300/400/500. Three sizes (`.t1` 56, `.t2` 28, body 17) plus mono meta 13. Hierarchy by size and grey, not weight (from reference 01).
- Header: brand pill / centred pill nav / dark "Email me" pill with theme toggle (from reference 02). Pill hidden under 760px.
- Ghost nav: fixed right-edge section list, light grey, current section in ink; desktop ≥1100px only (from reference 01).
- Project list: numbered rows 01–04 with year under the number.
- Project page: two-column header (metadata column: Type / Year / My role / Tools / Open; text column: question, summary, My part), fixed side arrows with neighbour numbers on desktop, bottom pager everywhere (from reference 01).
- Hero: live random-walk simulation on canvas (360 walks, absorbing barrier), labelled as a simulation. rAF, ~2.2 s ease-out, static under reduced motion, paused when the tab is hidden, repainted on resize and theme change (motion discipline from reference 02).
- Motion inventory, complete: hero canvas draw, two typing spots, hover colour on titles/links, pill hover background. Nothing else moves.

## Typing effect
Two places: hero third line (on load) and the contact terminal (when it scrolls into view). Content lives in HTML; the script types the plain text then restores the HTML. Plays once per session (`sessionStorage`), skipped under `prefers-reduced-motion`.

## v8.1 (2026-10-31) — pre-publish fixes
- `details.js`: removed the r7 `eyebrow`, `prev`, `next` fields (the renderer never read them; `prev`/`next` pointed at removed projects) and the SPY `actions` flag, so the SPY spec sheet now shows its three key numbers. Poker footnotes and the Malaria coverage label no longer use middle-dot strings. Numbers and caveats unchanged.
- Favicon (`images/favicon-32.png`, `images/apple-touch-icon.png`) and a text-only OG image (`images/og.png`, 1200×630), both drawn with the site tokens. `og:image` is a relative path until the site has a domain; set it to the absolute URL before publishing.
- Still missing from this package: `malaria_dashboard_v3_8_4.html` and `projects/spy-ief/` (copy from the r7 handoff), the Render URL, the CV, the Poker screenshot.
- `site.css`: `.col.wide` is now capped at the viewport minus `--left`; the 920px figure column overflowed horizontally on project pages between about 960px and 1120px.

## v8.2 (2026-11-01) — every project page opens its dashboard
- Copied in from the r7 material: `malaria_dashboard_v3_8_4.html` (1.8 MB) and `projects/spy-ief/` (9.9 MB, with `offline.html`).
- Poker: the full Node app is not deployed yet (no Render service answers at `poker-analytics-suite.onrender.com` or `poker-risk-lab.onrender.com`). Until it is, the page links to the repo's own static publication artifact, copied unchanged from `poker-risk-lab/outputs/github-pages/` (built 2026-11-01 from commit 3fcb028) into `projects/poker-risk-lab/`: a redirect entry, `dashboard/index.html` (saved results, Chart.js inlined) and `case-study/index.html` + `validation.html`. The artifact is the repo's allowlist for public hosting; nothing else from that repo is on this site.
- `site.js` `LINKS`: `second` adds a companion page; `app` is an external live app that renders only once it holds a real `http(s)` URL, with the Render wake-up footnote attached to it. Fill `LINKS['bankroll-risk'].app` after deploying.
- Multi-Factor stays text-only by design (private internship work).
- Portrait replaced (new 800×800 crop).

- 2026-11-01, later: the Node app is live at `https://poker-analytics-suite.onrender.com/` (health check answers with commit 3fcb028). `LINKS['bankroll-risk'].app` now holds that URL, so the Poker page shows "Research overview / Case study / Interactive lab ↗" with the Render wake-up footnote. `projects/poker-risk-lab/case-study/index.html` resynced from the repo build whose footer lists the live URL; the rest of the artifact is unchanged. HANDOFF.md rewritten for v8.2.

## v8.3 (2026-11-02) — SPY/IEF atlas labels-2026-10-08
- `projects/spy-ief/` replaced by the accepted delivery `portfolio_delivery/public/projects/spy-ief/` (presentation revision labels-2026-10-08; `index.html` 0.88 MB, `offline.html` 8.2 MB, `assets/` unchanged; the delivery's `verify_delivery.py` passed 285 hashes before copying). The online page loads Plotly from `cdn.plot.ly/plotly-4.1.1.min.js`; the offline file embeds it.
- `details.js` SPY entry rewritten from the delivery's `project-card.json` and `PROJECT_COPY_EN.md`: tagline is the one-sentence conclusion (77.6% / 40.0% / 48.6%), sections are Methods, My part, Results, Scope and limitations. The opening "My part" block is replaced by the section for this project only (`contribution` removed, no `CONTRIBUTION` entry). Home summary for SPY/IEF is the card's `summary`. Links stay relative. Same change applied to the quant copy the same day.
- Not deployed anywhere yet.
- 2026-11-03: this folder is the data-science version of the site. The v8.3 copy rewrite (SPY home summary and the SPY entry in `details.js`) was reverted to the v8.2 wording, which reads as statistics and data work and uses the same figures (236/304, 10/25, 17/35, data through 2026-10-02). The labels-2026-10-08 atlas files stay. The quant version keeps its own copy.
- 2026-11-03: About, first paragraph: one sentence added on the China Everbright Securities (2025) and Guangdong Bozhong (2024–25) data internships, figures from the owner's resume (3M observations checked; 1M records reconciled, matching accuracy 95.6% → 98.4%).
- 2026-11-03: "Before UT I interned at Guangzhou Futures" (About paragraph and the About terminal tab) corrected to "In summer 2026"; the internship ran May–August 2026, per the resume.

## v8.4 (2026-11-06) — centred, full-width layout, matching the quant site
Layout only; copy, numbers and the design system (Plex, three sizes, no cards, no shadows) unchanged. Ported from the quant site's commits eda4739, 9ea8096, 976e8a8, 667f3f2 and 8ed7f29.
- `.wrap` (1248px, centred, side padding `clamp(20px, 8vw, 112px)`) replaces the left-offset `.col` / `.col.wide` for Projects, About, the footer and the detail pages; `.detail .wrap` is 1280px with `clamp(20px, 6vw, 86px)`. `--left` and `--wide` removed; `--col` stays for the terminal. Hero untouched.
- Detail page: exhibit and spec strip run the full wrap; from 1024px the reading block is two columns, `.lead` (question, conclusion, private note, sticky "On this page" contents with the current section highlighted) and `.text` ("My part" first, then the sections at a 39em measure, then the pager). Section headings carry `id="sec-<slug>"`; `#/<project>/<slug>` scrolls to a section (smooth when the page is already open, instant on a direct load; `scroll-margin-top: 96px`). `body.on-detail` while a detail page is open.
- Home: from 1024px a project row is `64px | title and summary | 260px`, with Project / Tools / Access in the third column (`.spec-row.compact` is now a direct child of the row). About is `h2` + `.grid`: a sticky facts list (`.facts`, every entry taken from the About spec sheet or the paragraphs, nothing new) beside the paragraphs; the first paragraph is `.lede`, 28px between paragraphs. The About spec sheet's five rows moved into the facts list unchanged.
- Keyboard: after an in-page navigation the project title (or, for "All projects", the Projects heading) takes focus; a direct load leaves focus alone, so no focus ring appears on arrival. Disabled hero tabs ignore Enter. Project years read at `--muted`.
- Checked at 1920, 1440, 1100, 1024, 900 and 375 wide, light and dark: no horizontal scroll, one column and no contents list below 1024px, ghost nav and side arrows clear of the content.
- 2026-11-06, later: every project page with a dashboard now opens with a screenshot of it that links to the live thing (the Render app for Poker, the hosted atlas or dashboard otherwise), with an "Open the …" label; `figure()` and the `.figure-link` rules ported from the quant site. Screenshots `images/spy-ief-atlas.jpg` (atlas overview) and `images/poker-risk-lab-app.jpg` (Risk Lab in the live app) copied from the quant site, where they were captured on 2026-11-03 from the same atlas delivery and the same Render service; alt texts carried over with them. The SPY data figure now follows its screenshot. Multi-Factor still has no exhibit.
- 2026-11-06: Poker screenshot alt text no longer quotes the figures shown in the capture; it describes the view only.
- 2026-11-06: Poker page copy. The one-sentence conclusion under the research question now states the three sources of error for the base scenario (simulation noise about ±1.13 points of the exact 7.17%, win rate 0.1%–83.3% plausible after 50,000 hands, return model 6.4%–20.3%; only the first shrinks with more computing). "My part" opens with the engine-update check (7.85% → 6.35% at the same seed, traced to new random numbers; the bridge correction raised risk on all 40 seeds, mean 7.12% against 7.17%). Every figure is quoted from the repo's case study and validation page as published in `projects/poker-risk-lab/`. Sections, strands and the spec sheet unchanged.
- 2026-11-07: `projects/poker-risk-lab/` checked against a fresh `npm run build && npm run build:pages` of the poker repo at c4bfec0 (2026-11-05, local HEAD, two commits ahead of GitHub): all four pages byte-identical, nothing to replace.

## v8.5 (2026-11-07) — Olist and the NAV workbench join the data-science version
- New project `olist-delivery-promises` (Promised Delivery Dates on Olist), first in the home order: public Olist orders, quantile promise versus mean, pre-registered matched comparison, late-risk ranking. Opens the project site `suzanneisgenius.github.io/olist-delivery-promises/` from the screenshot and the spec sheet. Copy, metrics, sections, "My part" and the screenshot `images/olist-delivery-diagnostics.jpg` carried over unchanged from the quant site (its `details.js` comment lists the repo files each number comes from).
- `quant-platform` page rewritten to the quant site's version, "Futures Factor Platform and NAV Risk Monitor": the factor platform plus the net-value risk monitor, with the demo workbench `suzanneisgenius.github.io/nav-risk-workbench/` (synthetic accounts, no firm data) linked from the screenshot `images/nav-risk-workbench.jpg` and the spec sheet. The private-material note stays on the home row and the page.
- Home order is now Olist, Malaria, SPY/IEF, Poker, Multi-Factor (five projects; crumbs and pager follow the array).
- 2026-11-07: hero line 2 is now "Data science for decisions, uncertainty included; applying for fall 2027". About lede and the terminal About tab open with the Olist result (quantile promise; the lower-loss model did not promise fewer days) before the older interests sentence; internship sentences unchanged. Facts list gains a "Public code" row linking the three public repositories.
- 2026-11-07: hero line 2 is now "Data science for decisions, uncertainty included; applying for fall 2027". About lede and the terminal About tab open with the Olist result (quantile promise; the lower-loss model did not promise fewer days) before the older interests sentence; internship sentences unchanged. Facts list gains a "Public code" row linking the three public repositories.

## v8.6 (2026-11-07) — written for a non-specialist reader
- Each project in `PROJECTS` carries three new fields: `question` (a plain-language question, shown under the title on the home page instead of the summary), `evidence` (one result to remember, with its scope stated: historical replay, interval includes zero, historical returns not a forecast, the more complete method gives the higher number, results stay with the firm) and `roleShort` (two sentences on responsibility and co-authors). `summary` stays in the data but is no longer rendered.
- Home row right column is now Role / One result to remember / Access; the tools list moved off the home page (it stays on the detail spec sheet). The right-column values are set in the sans face at 14px so they read as text; the result line is in ink, the role in grey. Project years now 13px like the index; Malaria and Bankroll show their original and extension years (2025–26).
- Detail page order: title → question, My part (short) and the one-sentence conclusion → exhibit → spec sheet → contents + "My part, in detail" + sections → pager. The contents list sits alone in the lead column and is hidden below 1024px.
- First-use explanations added in parentheses: quantile and pre-registered (Olist), ruin probability and Monte Carlo convergence (Poker), IC/ICIR (Futures), "intervals included zero" (SPY). Numbers unchanged.
- 2026-11-07: About rewritten as a full-width six-paragraph introduction, following the quant site's About (identity, experience, interests, the projects with Olist first, away from a screen, goal, email). Paragraphs run the full wrap. The facts column is gone; its rows (plus Public code) sit under the text as a three-row spec sheet. Facts carried over from the quant About (PokerStars Main Event May 2026, tied 27th of 20,210; DECA top 1%) and the resume.
- 2026-11-07: project pages are single-column again, at the full detail wrap, as the owner found the side column hard to read. The "On this page" contents is now one ruled line of links above the text (current section in ink, hidden under 760px) instead of a sticky sidebar; section routes and the scroll highlight are unchanged. The opening block (question, My part, conclusion) stacks in one column; the question keeps a 30em measure.

## v8.7 (2026-11-07) — project copy rewritten in the author's voice
- Every project page's tagline, sections, strands, validation caption and "My part" (plus `roleShort` and `evidence` on the home page) rewritten to state findings directly: first person and active voice where the work was hers ("I derived", "I calibrated", "I timestamp"), hedges removed where the claim is supported, every number and every caveat kept. Checked by comparing the multiset of numeric tokens before and after; the only additions are figures already elsewhere on the same page.
- AI-writing tells removed: em dashes in prose and table labels, "not X but Y" contrasts, one-line closers ("That discipline is the transferable result", "the credibility core"), passive "was evaluated / were kept" where the actor is known.
- Verified in the browser: Poker page renders the new copy, no console errors.
