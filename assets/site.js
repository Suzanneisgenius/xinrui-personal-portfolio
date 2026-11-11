/* Xinrui Song — site script v4: router, detail renderer, typing, ghost nav, random-walk hero. No dependencies. */
(function () {
  'use strict';

  /* ---------- project order shown on the home page ---------- */
  const PROJECTS = [
    { id: 'olist-delivery-promises', year: '2026', type: 'Independent research', role: 'Research question, quantile derivation, pre-registered design, evaluation',
      question: 'How many days should an online shop promise for delivery, and does a better forecast let it promise fewer?',
      evidence: 'In historical replay on 12,045 Brazilian orders, promising the 90% quantile of delivery time instead of the mean raised on-time arrival from 65.5% to 91.4%, in exchange for more spare days on orders that arrive early.',
      roleShort: 'My project from question to write-up: the quantile derivation, the pre-registration, three candidate policies (a per-state quantile rule, linear quantile regression and gradient boosting) with conformal-style calibration, a logistic late-risk ranker, and the code with its 362 tests. AI tools helped refine parts of the code.',
      summary: 'Under a 9:1 late-to-early cost ratio, promising the 90% quantile of delivery time instead of the mean cut expected loss by 34% and raised on-time coverage from 65.5% to 91.4% on 12,045 orders. A pre-registered comparison then tests whether a lower-loss model promises fewer days.',
      tools: 'Python, pandas, scikit-learn, DuckDB' },
    { id: 'health-dashboard', year: '2025–26', type: 'Course project, reanalysed', role: 'Introduction, narrative and map in the original; specifications and review in the reanalysis',
      question: 'Who uses malaria bed nets, and can country-level data show whether they save children’s lives?',
      evidence: 'Across 63 countries, the adjusted estimate is a −0.43% mortality difference per 10-point rise in children’s net use, with a 95% interval from −7.1% to +6.7%. The interval includes zero, and I say so rather than round it to a finding.',
      roleShort: 'Three-person course project in 2025: I wrote the introduction and the narrative and built the world map. For the 2026 reanalysis I wrote the specifications and the review notes.',
      summary: 'Who uses insecticide-treated nets, what country-level mortality data can and cannot show, and whether net use improves prediction. 63 countries, 159 DHS surveys.',
      tools: 'Python, statsmodels, scikit-learn' },
    { id: 'spy-ief-research-atlas', year: '2024–26', type: 'Course study, extended', role: 'Co-author of the 2024 study; research questions and review for the extension',
      question: 'When stocks fall hardest, do government bonds still cushion the fall?',
      evidence: 'Over 2002–2026, the bond fund IEF rose on 236 of 304 of SPY’s worst 5% days; in 2022–23 it rose on 10 of 25. Historical returns, not a forecast.',
      roleShort: 'Co-authored the 2024 course study with Zun Cao: the analysis, the written findings and the original seven-tab Dash app. For the 2026 extension I set the research questions and reviewed the implementation, with AI coding assistance.',
      summary: 'When does stock–bond diversification weaken? 6,082 aligned SPY/IEF daily returns, rolling correlations with uncertainty, and a seven-page interactive atlas.',
      tools: 'Python, JavaScript, Plotly' },
    { id: 'bankroll-risk', year: '2025–26', type: 'Independent study', role: 'Numerical validation, uncertainty propagation, Python/web comparison',
      question: 'How far can you trust a risk number that comes out of a simulation?',
      evidence: 'Checking for ruin between checkpoints raised the estimated risk on all 40 seeds, by 0.355 points on average, to 7.12% against the exact 7.17%. The more complete method gives the higher number, and the higher number is the right one.',
      roleShort: 'Independent study with AI-assisted coding. I own the numerical validation, the uncertainty propagation and the comparison between the Python research engine and the web app.',
      summary: 'How far a headline ruin probability moves once barrier resolution, Monte Carlo error, parameter uncertainty and model misspecification are each stress-tested.',
      tools: 'Python, NumPy, SciPy, Node' },
    { id: 'quant-platform', year: '2026', type: 'Internship research', role: 'Factor definitions, backtest contract and validation checks; the NAV risk monitor end to end',
      question: 'Which trading signals earn their place, and when should an account take risk off?',
      evidence: '54 commodity futures, five sectors, eight factors tested under one backtest contract; the results and the data stay with the firm. The public demo runs the risk-monitor design on synthetic accounts only.',
      roleShort: 'Internship at Guangzhou Futures, summer 2026. On the factor platform I defined the factors, the backtest contract and the validation checks; the NAV risk monitor is my design end to end.',
      summary: 'Two systems from a summer at Guangzhou Futures: a factor research platform for 54 commodity futures with look-ahead ruled out by construction, and a net-value risk monitor I designed around one measure, the slope of the equity curve, that turns an account’s daily net value into graded de-risking alerts.',
      tools: 'Python, pandas, NumPy, JavaScript',
      note: 'Internship work. No firm data appears here; the firm’s code, account series and core algorithms stay private. The demo workbench is a separate build on synthetic accounts.' },
  ];

  const CONTRIBUTION = {
    'bankroll-risk': 'I tested how far the simulated risk estimates can be trusted. After an engine update, the same settings and seed gave a lower risk, 6.35% where it had been 7.85%. Two things had changed at once, the random numbers and how ruin is monitored, so I switched each on separately. New random numbers alone moved the estimate to 6.00%; the Brownian-bridge correction then raised it by 0.35 points to 6.35%. Over 40 seeds the correction raised risk on every seed, by 0.355 points on average, and brought the mean to 7.12% against the exact 7.17%. The drop was sampling, and the correction works. The rest of my work here follows the same method: I measured how 100-hand checkpoints miss boundary crossings, compared the estimates with an analytical finite-horizon first-passage benchmark, propagated uncertainty in the estimated win rate, ran Markov-chain absorption checks, and compared the Python research engine with the web implementation.',
    'olist-delivery-promises': 'I led the project: the research question, the derivation of the promise as a quantile, the pre-registration, the matched evaluation design and the write-up. A check script recomputes every reported number from the saved per-order results (362 tests). AI tools helped refine selected parts of the code; the authorship statement in the repository records the scope.',
    'quant-platform': 'Both systems were my own work during the internship. On the factor platform I defined the factors, the backtest contract and the validation checks. The net-value risk monitor is my design end to end: the slope-based growth-rate measure, the two-threshold rule, the scoring, the calibration of each rule against the drawdowns that followed its signals, and the offline tool itself. The code and the account data stay with the firm.',
  };

  /* Each project's entry points. `dashboard` is a page served by this site; `second` is a
     companion page; `offline` is a downloadable file; `app` is an external live app and is
     rendered only once it holds a real URL. */
  const LINKS = {
    'bankroll-risk': { dashboard: 'projects/poker-risk-lab/', dashboardLabel: 'Research overview', second: 'projects/poker-risk-lab/case-study/', secondLabel: 'Case study',
      app: 'https://poker-analytics-suite.onrender.com/', appLabel: 'Interactive lab', hint: 'Runs on Render\'s free plan; after a quiet spell the first visit takes about a minute to start.' },
    'olist-delivery-promises': { dashboard: 'https://suzanneisgenius.github.io/olist-delivery-promises/', dashboardLabel: 'Project site' },
    'quant-platform': { dashboard: 'https://suzanneisgenius.github.io/nav-risk-workbench/', dashboardLabel: 'Demo workbench' },
    'health-dashboard': { dashboard: 'malaria_dashboard_v3_8_4.html', dashboardLabel: 'Dashboard' },
    'spy-ief-research-atlas': { dashboard: 'projects/spy-ief/', dashboardLabel: 'Interactive atlas', offline: 'projects/spy-ief/offline.html', offlineLabel: 'Offline atlas' },
  };

  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pad2 = n => String(n).padStart(2, '0');

  /* ---------- theme ---------- */
  const toggle = $('#theme-toggle');
  function setTheme(t) {
    document.documentElement.dataset.theme = t;
    try { localStorage.setItem('xs-theme', t); } catch (e) {}
    if (toggle) toggle.textContent = t === 'dark' ? 'Light' : 'Dark';
  }
  if (toggle) toggle.addEventListener('click', e => { e.preventDefault(); setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'); });

  /* ---------- terminal tabs (reference 03) ----------
     Content lives in <template> elements. Clicking a tab types the plain text at 4 ms/char,
     then swaps in the HTML so links work. Switching tabs cancels the run in flight.
     Deep link: #t/about, #t/education, #t/contact. Static under reduced motion. */
  const term = $('#terminal');
  const tabs = $$('.tabs a[data-tab]');
  let token = 0, timer = null;

  function setTabsDisabled(on) {
    $$('.tabs a').forEach(a => { a.classList.toggle('disabled', on); if (on) a.setAttribute('aria-disabled', 'true'); else a.removeAttribute('aria-disabled'); });
  }
  function openTab(key, opts) {
    const tpl = document.getElementById('tab-' + key); if (!tpl || !term) return false;
    opts = opts || {};
    token++; const my = token;
    if (timer) { clearTimeout(timer); timer = null; }
    tabs.forEach(a => { if (a.dataset.tab === key) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
    const html = tpl.innerHTML.trim();
    term.hidden = false;
    if (reduced() || opts.instant) { term.innerHTML = html; setTabsDisabled(false); return true; }
    const tmp = document.createElement('div'); tmp.innerHTML = html;
    const text = tmp.textContent;
    term.textContent = '';
    const caret = document.createElement('span'); caret.className = 'caret'; caret.setAttribute('aria-hidden', 'true'); term.appendChild(caret);
    setTabsDisabled(true);
    let i = 0;
    const step = () => {
      if (my !== token) return;
      if (i < text.length) {
        caret.before(document.createTextNode(text[i++]));
        term.scrollTop = term.scrollHeight;
        timer = setTimeout(step, text[i - 1] === '\n' ? 24 : 4);
      } else {
        term.innerHTML = html;
        setTabsDisabled(false);
      }
    };
    timer = setTimeout(step, 0);
    return true;
  }
  tabs.forEach(a => a.addEventListener('click', e => { e.preventDefault(); if (a.classList.contains('disabled')) return; history.replaceState(null, '', '#t/' + a.dataset.tab); openTab(a.dataset.tab); }));
  $$('a[href^="#t/"]:not([data-tab])').forEach(a => a.addEventListener('click', e => {
    e.preventDefault(); const key = a.getAttribute('href').slice(3);
    if (vHome.hidden) { location.hash = '#t/' + key; return; }
    history.replaceState(null, '', '#t/' + key); window.scrollTo({ top: 0 }); openTab(key);
  }));

  /* hero typed line is gone; the terminal is the typing locus. */

  /* ---------- home list ---------- */
  function renderHome() {
    const list = $('#project-list'); if (!list) return;
    list.innerHTML = PROJECTS.map((p, i) => {
      const d = DETAILS[p.id];
      return `<a class="project-row" href="#/${p.id}">
        <span class="idx">${pad2(i + 1)}<small>${esc(p.year)}</small></span>
        <span>
          <h3 class="t2">${esc(d.title)}</h3>
          <p class="question">${esc(p.question || p.summary)}</p>
        </span>
        <div class="spec-row compact">
            <div class="spec-item"><span class="spec-l">Role</span><span class="spec-v">${esc(p.roleShort || p.role)}</span></div>
            ${p.evidence ? `<div class="spec-item evidence"><span class="spec-l">One result to remember</span><span class="spec-v">${esc(p.evidence)}</span></div>` : ''}
            ${p.note ? `<div class="spec-item"><span class="spec-l">Access</span><span class="spec-v">Private code and data</span></div>` : ''}
        </div>
      </a>`;
    }).join('');
  }

  /* ---------- detail ---------- */
  const stripNum = s => String(s).replace(/^\s*\d+\s*[·./-]\s*/, '');
  const sentence = s => stripNum(s).split(' ').map((w, i) => (i === 0 || /^[A-Z0-9&]+$/.test(w) || /\d/.test(w)) ? w : w.toLowerCase()).join(' ');

  /* spec sheet: facts + key numbers in one ruled strip; notes become footnotes */
  function specSheet(id, d, p) {
    const L = LINKS[id] || {};
    const items = [
      { l: 'Project', v: `${esc(p.type)}, ${esc(p.year)}` },
      { l: 'Tools', v: esc((d.chips || []).join(', ')) },
    ];
    const notes = [];
    if (L.dashboard) {
      const sep = ' <span class="sep">/</span> ';
      let v = `<a class="ext" href="${esc(L.dashboard)}" target="_blank" rel="noopener">${esc(L.dashboardLabel)}</a>`;
      if (L.second) v += sep + `<a class="ext" href="${esc(L.second)}" target="_blank" rel="noopener">${esc(L.secondLabel)}</a>`;
      if (L.offline) v += sep + `<a href="${esc(L.offline)}" download>${esc(L.offlineLabel)}</a>`;
      if (L.app && /^https?:\/\//.test(L.app)) {
        v += sep + `<a class="ext" href="${esc(L.app)}" target="_blank" rel="noopener">${esc(L.appLabel)}</a>`;
        if (L.hint) { notes.push(L.hint); v += `<sup>${notes.length}</sup>`; }
      }
      items.push({ l: 'Open', v });
    }
    const nums = (d.metrics && !d.actions) ? d.metrics.map(m => {
      let v = esc(m.value);
      if (m.note) { notes.push(m.note); v += `<sup>${notes.length}</sup>`; }
      return { l: esc(m.label), v, num: true };
    }) : [];
    const row = arr => `<div class="spec-row">${arr.map(i => `<div class="spec-item${i.num ? ' num' : ''}"><span class="spec-l">${i.l}</span><span class="spec-v">${i.v}</span></div>`).join('')}</div>`;
    return `<div class="spec">${row(items)}${nums.length ? row(nums) : ''}</div>
      ${notes.length ? `<ol class="spec-notes">${notes.map(n => `<li>${esc(n)}</li>`).join('')}</ol>` : ''}`;
  }

  function validation(d) {
    if (!d.validation) return '';
    return `<p class="meta" style="margin-top:20px">${esc(d.validation.caption)}</p>
      <table class="plain"><thead><tr><th>Method</th><th>Ruin probability</th></tr></thead><tbody>
      ${d.validation.rows.map(r => `<tr><td>${esc(r.m)}</td><td class="num">${esc(r.v)}${r.ci ? `<em>${esc(r.ci)}</em>` : ''}</td></tr>`).join('')}
      </tbody></table>`;
  }
  function strands(d) {
    if (!d.strands) return '';
    return `<div class="strands"><p class="meta">Four sources of error, isolated</p>
      ${d.strands.map(s => `<div class="strand"><span class="mono">${esc(stripNum(s.tag.replace(/^STRAND\s*/i, '')).toLowerCase())}</span><h3>${s.title}</h3><p>${s.body}</p></div>`).join('')}
    </div>`;
  }
  function figure(id, d) {
    const L = LINKS[id] || {};
    let shot = '';
    if (d.screenshot) {
      const href = L.app && /^https?:\/\//.test(L.app) ? L.app : L.dashboard;
      const label = href ? 'Open the ' + String(L.app && /^https?:\/\//.test(L.app) ? L.appLabel : L.dashboardLabel).toLowerCase() : '';
      const size = d.screenshotSize ? ` width="${d.screenshotSize[0]}" height="${d.screenshotSize[1]}"` : '';
      /* one retry with a cache-busting query: a 404 cached during a Pages redeploy otherwise sticks for ten minutes */
      const retry = `onerror="if(!this.dataset.r){this.dataset.r=1;this.src=this.src.split('?')[0]+'?r='+Date.now()}"`;
      const img = `<img src="${esc(d.screenshot)}" alt="${esc(d.screenshotAlt || '')}"${size} loading="lazy" ${retry}>`;
      const inner = href
        ? `<a class="figure-link" href="${esc(href)}" target="_blank" rel="noopener" aria-label="${esc(label)} (opens in a new tab)">${img}<span class="open-label ext">${esc(label)}</span></a>`
        : img;
      shot = `<figure class="figure">${inner}<figcaption>${esc(d.screenshotAlt || '')}</figcaption></figure>`;
    }
    if (id === 'spy-ief-research-atlas' && window.SPY_FIGURE) {
      return shot + `<div class="spy-figure">
        <p class="t2">When stocks fell hardest, did bonds still help?</p>
        <p class="meta" style="margin-top:8px">SPY and IEF return indices, 2002-08-01 = 100, log scale. Data through 2026-10-02.</p>
        ${window.SPY_FIGURE}</div>`;
    }
    return shot;
  }
  const chev = dir => dir === 'prev'
    ? '<svg viewBox="0 0 22 44" aria-hidden="true"><path d="M16 4 L5 22 L16 40"/></svg>'
    : '<svg viewBox="0 0 22 44" aria-hidden="true"><path d="M6 4 L17 22 L6 40"/></svg>';

  function renderDetail(id) {
    const d = DETAILS[id]; if (!d) return false;
    const idx = PROJECTS.findIndex(p => p.id === id);
    const p = PROJECTS[idx];
    const pi = (idx - 1 + PROJECTS.length) % PROJECTS.length, ni = (idx + 1) % PROJECTS.length;
    const prev = PROJECTS[pi], next = PROJECTS[ni];
    const contribution = d.contribution || CONTRIBUTION[id];
    const sections = (d.sections || []).filter(s => !/my contribution/i.test(s[0]));
    const heads = sections.map(s => { const text = sentence(s[0]); return { text, slug: text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') }; });

    $('#detail-root').innerHTML = `
      <article class="detail">
        <a class="side-arrow prev" href="#/${prev.id}" aria-label="Previous: ${esc(DETAILS[prev.id].title)}">${chev('prev')}<span>${pad2(pi + 1)}</span></a>
        <a class="side-arrow next" href="#/${next.id}" aria-label="Next: ${esc(DETAILS[next.id].title)}">${chev('next')}<span>${pad2(ni + 1)}</span></a>
        <div class="wrap">
          <header>
            <div class="crumbs"><span class="mono">${pad2(idx + 1)} / ${pad2(PROJECTS.length)}</span><a class="back" href="#projects">All projects</a></div>
            <h1 class="t1" tabindex="-1">${esc(d.title)}</h1>
            ${d.subtitle ? `<p class="subtitle">${esc(d.subtitle)}</p>` : ''}
          </header>
          <div class="read opening">
            <aside class="lead">
              <p class="t2 question">${esc(d.headline)}</p>
            </aside>
            <div class="text">
              ${p.roleShort ? `<div class="mypart"><span class="meta">My part</span><p>${esc(p.roleShort)}</p></div>` : ''}
              <p class="tagline">${d.tagline}</p>
              ${p.note ? `<p class="private">${esc(p.note)}</p>` : ''}
            </div>
          </div>
          <div class="exhibit">${figure(id, d)}</div>
          ${specSheet(id, d, p)}
          <div class="read">
            <aside class="lead toc-only">
              ${heads.length > 1 ? `<nav class="toc" aria-label="On this page"><span class="meta">On this page</span>${heads.map(h => `<a href="#/${id}/${h.slug}">${esc(h.text)}</a>`).join('')}</nav>` : ''}
            </aside>
            <div class="text">
              ${contribution ? `<div class="mypart"><span class="meta">My part, in detail</span><p>${contribution}</p></div>` : ''}
              <div class="body">
                ${sections.map((s, i) => {
                  const h = heads[i]; let extra = '';
                  if (/method/i.test(h.text)) extra = strands(d);
                  if (/^validation/i.test(h.text)) extra = validation(d);
                  return `<h2 class="t2" id="sec-${h.slug}">${esc(h.text)}</h2><p>${s[1]}</p>${extra}`;
                }).join('')}
                ${(!heads.some(h => /^validation/i.test(h.text)) ? validation(d) : '')}
                ${(!heads.some(h => /method/i.test(h.text)) ? strands(d) : '')}
              </div>
              <nav class="pager" aria-label="Other projects">
                <a href="#/${prev.id}"><span class="mono">${pad2(pi + 1)}</span>${esc(DETAILS[prev.id].title)}</a>
                <a class="next" href="#/${next.id}"><span class="mono">${pad2(ni + 1)}</span>${esc(DETAILS[next.id].title)}</a>
              </nav>
            </div>
          </div>
        </div>
      </article>`;
    document.title = d.title + ' — Xinrui Song';
    return true;
  }

  /* ---------- scroll-spy for ghost nav + pill ---------- */
  const ghost = $('#ghost');
  const spyTargets = ['top', 'projects', 'about'];
  function spy() {
    if (vHome.hidden) return;
    const y = window.scrollY + window.innerHeight * 0.35;
    let cur = 'top';
    for (const id of spyTargets) { const el = document.getElementById(id); if (el && el.offsetTop <= y) cur = id; }
    if (window.scrollY < 80) cur = 'top';
    $$('a', ghost).forEach(a => { if (a.dataset.for === cur) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
    $$('.pill a').forEach(a => { const on = a.getAttribute('href') === '#' + cur; if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
  }
  function spyDetail() {
    if (vDetail.hidden) return;
    const links = $$('.toc a'); if (!links.length) return;
    const y = window.scrollY + window.innerHeight * 0.35;
    let cur = null;
    $$('.body h2[id]').forEach(h => { if (h.offsetTop <= y) cur = h.id; });
    links.forEach(a => { if (cur && a.getAttribute('href').endsWith('/' + cur.slice(4))) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
  }
  let spyTick = false;
  window.addEventListener('scroll', () => { if (!spyTick) { spyTick = true; requestAnimationFrame(() => { spy(); spyDetail(); spyTick = false; }); } }, { passive: true });

  /* ---------- router ---------- */
  const vHome = $('#view-home'), vDetail = $('#view-detail');
  let lastHomeScroll = 0, openId = null, navigated = false; /* true after the first in-page navigation: a direct load keeps focus where the browser put it */
  function route() {
    const m = location.hash.match(/^#\/([a-z0-9-]+)(?:\/([a-z0-9-]+))?/);
    if (m && DETAILS[m[1]]) {
      const same = !vDetail.hidden && openId === m[1];
      if (!same) {
        if (!vHome.hidden) lastHomeScroll = window.scrollY;
        renderDetail(m[1]); openId = m[1];
        vHome.hidden = true; vDetail.hidden = false; ghost.hidden = true;
        document.body.classList.add('on-detail');
        $$('.pill a').forEach(a => a.removeAttribute('aria-current'));
        $('#nav-projects').setAttribute('aria-current', 'true');
      }
      const sec = m[2] && document.getElementById('sec-' + m[2]);
      /* a direct link to a section lands on it instantly, after the browser's own fragment scroll */
      if (sec) { const go = () => { sec.scrollIntoView({ block: 'start', behavior: same ? 'smooth' : 'instant' }); spyDetail(); }; if (same) go(); else setTimeout(go, 0); }
      else if (!same) window.scrollTo({ top: 0, behavior: 'auto' });
      /* the element that was activated is hidden now, so move keyboard focus to the page title */
      if (!same && navigated) { const h = $('#detail-root h1'); if (h) h.focus({ preventScroll: true }); }
      spyDetail();
    } else {
      const wasDetail = !vDetail.hidden;
      vDetail.hidden = true; vHome.hidden = false; ghost.hidden = false; openId = null;
      document.body.classList.remove('on-detail');
      document.title = 'Xinrui Song';
      const tm = location.hash.match(/^#t\/([a-z]+)/);
      if (tm) { window.scrollTo({ top: 0, behavior: 'auto' }); openTab(tm[1]); }
      if (wasDetail && !tm) {
        const target = location.hash === '#projects' ? $('#projects') : null;
        if (target) target.scrollIntoView({ block: 'start' }); else window.scrollTo({ top: lastHomeScroll, behavior: 'auto' });
        if (target) { const h = $('#projects-h'); h.tabIndex = -1; h.focus({ preventScroll: true }); } /* "All projects" lands keyboard focus on the list heading */
      }
      spy();
    }
  }
  window.addEventListener('hashchange', () => { navigated = true; route(); });

  /* ---------- boot ---------- */
  setTheme(document.documentElement.dataset.theme || 'light');
  renderHome();
  route();

  const tm = location.hash.match(/^#t\/([a-z]+)/);
  if (tm) openTab(tm[1], { instant: true });
  /* CV: the links carry `hidden` in the HTML and appear only when the file is actually there */
  (function revealCV() {
    const links = document.querySelectorAll('.cv-link');
    if (!links.length || !window.fetch) return;
    fetch('cv/Xinrui_Song_CV.pdf', { method: 'HEAD', cache: 'no-store' })
      .then(r => { if (r.ok) links.forEach(el => el.hidden = false); })
      .catch(() => {});
  })();
})();
