/* ============================================================
   GLOBAL STOCKS DOSSIER — APP LOGIC
   Renders all sections from DOSSIER, wires interactions, map, calcs.
   ============================================================ */

(function () {
  "use strict";

  /* ===== Helpers ===== */
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const el = (tag, cls, html) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  };
  const fmtINR = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
  const fmtUSD = (n) => "$" + Math.round(n).toLocaleString("en-US");
  const fmtPct = (n) => (n * 100).toFixed(2) + "%";

  /* ===== Mobile menu ===== */
  $("#menuBtn")?.addEventListener("click", () => {
    $(".topnav")?.classList.toggle("open");
  });
  $$(".topnav a").forEach(a => a.addEventListener("click", () => {
    $(".topnav")?.classList.remove("open");
  }));

  /* ===== Scroll progress bar ===== */
  const progressBar = $("#progressBar");
  window.addEventListener("scroll", () => {
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    if (progressBar) progressBar.style.width = pct + "%";
  }, { passive: true });

  /* ===== Modal ===== */
  const modal = $("#modal");
  function openModal(html) {
    $("#modalContent").innerHTML = html;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  }
  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }
  modal.addEventListener("click", (e) => {
    if (e.target.dataset.close !== undefined) closeModal();
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  /* ===== Accordion delegation ===== */
  document.addEventListener("click", (e) => {
    const head = e.target.closest(".acc-head");
    if (head) {
      head.parentElement.classList.toggle("open");
    }
  });

  /* ===== Tab delegation ===== */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".tab-btn");
    if (!btn) return;
    const wrap = btn.closest(".tabs");
    const id = btn.dataset.tab;
    $$(".tab-btn", wrap).forEach(b => b.classList.toggle("active", b === btn));
    $$(".tab-panel", wrap).forEach(p => p.classList.toggle("active", p.dataset.tab === id));
  });

  /* ===== Render: ROUTES ===== */
  function renderRoutes() {
    const root = $("#routes-body");
    const { routes } = DOSSIER;
    let html = `<p class="lede" style="margin-bottom:24px">${routes.intro}</p>`;
    html += `<div class="grid grid-2">`;
    routes.cards.forEach(c => {
      html += `<div class="card">
        <span class="kicker">${c.kicker}</span>
        <h3 style="margin-top:8px">${c.title}</h3>
        <p>${c.body}</p>
        <div style="margin-top:12px">${c.pills.map(p => `<span class="pill ${p.c}" style="margin-right:6px">${p.t}</span>`).join("")}</div>
      </div>`;
    });
    html += `</div>`;
    html += `<h3 style="margin-top:36px">Side-by-side comparison — every dimension that matters</h3>`;
    html += `<div style="overflow-x:auto"><table class="compare"><thead><tr><th>Dimension</th><th>LRS Direct</th><th>GIFT City IFSC</th></tr></thead><tbody>`;
    routes.comparison.forEach(r => {
      html += `<tr><td>${r.row}</td><td>${r.lrs}</td><td>${r.gift}</td></tr>`;
    });
    html += `</tbody></table></div>`;
    root.innerHTML = html;
  }

  /* ===== Render: LRS ===== */
  function renderLRS() {
    const root = $("#lrs-body");
    const { lrs } = DOSSIER;
    let html = `<p class="lede">${lrs.what}</p>`;

    // Limits stat row
    html += `<div class="grid grid-2" style="margin-top:24px">`;
    lrs.limits.forEach(l => {
      html += `<div class="card"><span class="kicker">${l.label}</span><h3 style="color:var(--accent);margin:6px 0">${l.value}</h3><p>${l.sub}</p></div>`;
    });
    html += `</div>`;

    // Tabs: TCS / Process / Permitted / Prohibited / Edge cases
    html += `<div class="tabs" style="margin-top:36px">
      <div class="tab-bar">
        <button class="tab-btn active" data-tab="tcs">TCS Rules</button>
        <button class="tab-btn" data-tab="proc">7-Step Process</button>
        <button class="tab-btn" data-tab="perm">Permitted Uses</button>
        <button class="tab-btn" data-tab="proh">Prohibited Uses</button>
        <button class="tab-btn" data-tab="edge">Edge Cases</button>
      </div>`;

    // TCS panel
    html += `<div class="tab-panel active" data-tab="tcs">
      <div class="callout warn"><strong>Budget 2025 update:</strong> TCS threshold raised from ₹7L to ₹10L per FY w.e.f. 1-Apr-2025. Education-loan-funded remittances are fully exempt.</div>
      <p>${lrs.tcs.intro}</p>
      <div style="overflow-x:auto"><table class="compare"><thead><tr><th>Purpose</th><th>Up to ₹10L</th><th>Above ₹10L</th><th>Notes</th></tr></thead><tbody>`;
    lrs.tcs.rules.forEach(r => {
      html += `<tr><td>${r.purpose}</td><td>${r.upto10L}</td><td><strong>${r.above10L}</strong></td><td>${r.notes}</td></tr>`;
    });
    html += `</tbody></table></div>
      <div class="callout good"><strong>Crucially:</strong> ${lrs.tcs.creditable}</div>
      <h4 style="margin-top:24px;color:var(--accent)">TCS evolution — how we got here</h4>
      <div style="overflow-x:auto"><table class="compare"><thead><tr><th>Period</th><th>Rate</th><th>Note</th></tr></thead><tbody>${lrs.tcs.evolution.map(e => `<tr><td>${e.date}</td><td><strong>${e.rate}</strong></td><td>${e.note}</td></tr>`).join("")}</tbody></table></div>
      <h4 style="margin-top:24px;color:var(--accent)">RBI Purpose Codes (S-codes) for LRS</h4>
      <p style="font-size:13px">Your bank fills one on Form A2. Pick the wrong code and the remittance can be challenged.</p>
      <div style="overflow-x:auto"><table class="compare"><thead><tr><th>Code</th><th>Purpose</th></tr></thead><tbody>${lrs.tcs.purposeCodes.map(p => `<tr><td><code>${p.c}</code></td><td>${p.p}</td></tr>`).join("")}</tbody></table></div>
    </div>`;

    // Process panel
    html += `<div class="tab-panel" data-tab="proc"><div class="flow">`;
    lrs.process.forEach(s => {
      html += `<div class="flow-step"><span class="num">${s.n}</span><h4>${s.title}</h4><p>${s.body}</p></div>`;
    });
    html += `</div></div>`;

    // Permitted
    html += `<div class="tab-panel" data-tab="perm"><ul class="check">`;
    lrs.permitted.forEach(p => html += `<li>${p}</li>`);
    html += `</ul></div>`;

    // Prohibited
    html += `<div class="tab-panel" data-tab="proh"><ul style="list-style:none;padding:0;margin:0">`;
    lrs.prohibited.forEach(p => html += `<li style="padding:8px 0 8px 26px;position:relative;border-bottom:1px dashed var(--line);font-size:14px;color:var(--text-dim)"><span style="position:absolute;left:0;top:8px;color:var(--bad);font-weight:700">✗</span> ${p}</li>`);
    html += `</ul></div>`;

    // Edge cases
    html += `<div class="tab-panel" data-tab="edge"><div class="grid">`;
    lrs.edge.forEach(e => html += `<div class="callout">${e}</div>`);
    html += `</div></div>`;

    html += `</div>`; // close tabs
    root.innerHTML = html;
  }

  /* ===== Render: GIFT CITY ===== */
  function renderGIFT() {
    const root = $("#gift-body");
    const { gift } = DOSSIER;
    let html = `<p class="lede">${gift.what}</p>`;

    // Why GIFT
    html += `<h3 style="margin-top:28px">Why GIFT City exists — six pillars</h3><div class="grid grid-3">`;
    gift.whyGift.forEach(w => {
      html += `<div class="card"><h4 style="color:var(--accent)">${w.h}</h4><p>${w.b}</p></div>`;
    });
    html += `</div>`;

    // Two exchanges
    html += `<h3 style="margin-top:36px">The two IFSC exchanges</h3><div class="grid grid-2">`;
    gift.exchanges.forEach(ex => {
      html += `<div class="card">
        <span class="kicker">${ex.parent}</span>
        <h3 style="margin-top:6px">${ex.name}</h3>
        <dl class="kv">
          <dt>Mechanism</dt><dd>${ex.mechanism}</dd>
          <dt>Coverage</dt><dd>${ex.coverage}</dd>
          <dt>Ratio</dt><dd>${ex.ratio}</dd>
          <dt>Settlement</dt><dd>${ex.settlement}</dd>
          <dt>Order types</dt><dd>${ex.orderTypes}</dd>
          <dt>Trading hours</dt><dd>${ex.hours}</dd>
        </dl>
        <p style="margin-top:12px;font-size:13px">${ex.notes}</p>
      </div>`;
    });
    html += `</div>`;

    // Tax nuance — the misconception
    html += `<div class="callout warn" style="margin-top:36px"><h3 style="color:var(--warn);margin:0 0 8px">${gift.taxNuance.headline}</h3><p>${gift.taxNuance.body}</p></div>`;
    html += `<div style="overflow-x:auto"><table class="compare"><thead><tr><th>Investor / situation</th><th>Tax treatment</th><th>Reasoning</th></tr></thead><tbody>`;
    gift.taxNuance.cases.forEach(c => {
      html += `<tr><td>${c.who}</td><td>${c.what}</td><td>${c.why}</td></tr>`;
    });
    html += `</tbody></table></div>`;
    html += `<div class="callout good" style="margin-top:14px">${gift.taxNuance.bottom}</div>`;

    // Funding
    html += `<h3 style="margin-top:36px">Funding routes</h3><ul class="check">`;
    gift.funding.forEach(f => html += `<li>${f}</li>`);
    html += `</ul>`;

    // Edge cases
    html += `<h3 style="margin-top:36px">Edge cases &amp; nuances</h3><div class="grid">`;
    gift.edge.forEach(e => html += `<div class="callout">${e}</div>`);
    html += `</div>`;

    root.innerHTML = html;
  }

  /* ===== Render: ICICI Direct ===== */
  function renderICICI() {
    const root = $("#icici-body");
    const { icici } = DOSSIER;
    let html = `<p class="lede">${icici.intro}</p>`;

    // Two pathways as tabs
    html += `<div class="tabs" style="margin-top:24px"><div class="tab-bar">`;
    icici.pathways.forEach((p, i) => {
      html += `<button class="tab-btn ${i === 0 ? "active" : ""}" data-tab="p${i}">${p.title}</button>`;
    });
    html += `</div>`;

    icici.pathways.forEach((p, i) => {
      html += `<div class="tab-panel ${i === 0 ? "active" : ""}" data-tab="p${i}">
        <div class="card">
          <span class="kicker">${p.tag}</span>
          <h3>${p.title}</h3>
          <dl class="kv">
            <dt>Partner</dt><dd>${p.partner}</dd>
            <dt>Account structure</dt><dd>${p.structure}</dd>
            <dt>Markets covered</dt><dd>${p.markets.join(" · ")}</dd>
            <dt>Products</dt><dd>${p.products.join(" · ")}</dd>
            <dt>Investor protection</dt><dd>${p.protection}</dd>
            <dt>KYC &amp; onboarding</dt><dd>${p.kyc}</dd>
            <dt>Funding mechanics</dt><dd>${p.funding}</dd>
          </dl>

          <h4 style="margin-top:18px;color:var(--accent)">Pricing &amp; charges</h4>
          <table class="compare"><thead><tr><th>Charge</th><th>Amount</th></tr></thead><tbody>`;
      p.pricing.forEach(pr => html += `<tr><td>${pr.label}</td><td>${pr.value}</td></tr>`);
      html += `</tbody></table>

          <div class="grid grid-2" style="margin-top:18px">
            <div><h4 style="color:var(--good)">Pros</h4><ul class="check">${p.pros.map(x => `<li>${x}</li>`).join("")}</ul></div>
            <div><h4 style="color:var(--bad)">Cons</h4><ul style="list-style:none;padding:0">${p.cons.map(x => `<li style="padding:6px 0 6px 22px;position:relative;font-size:14px;color:var(--text-dim)"><span style="position:absolute;left:0;top:6px;color:var(--bad)">−</span> ${x}</li>`).join("")}</ul></div>
          </div>
        </div>
      </div>`;
    });

    html += `</div>`; // tabs

    // Quick comparison
    html += `<h3 style="margin-top:36px">Side-by-side: ICICI Direct's two rails</h3><div style="overflow-x:auto"><table class="compare"><thead><tr><th>Dimension</th><th>LRS / IBKR rail</th><th>GIFT City IFSC rail</th></tr></thead><tbody>`;
    icici.comparisonShort.forEach(r => html += `<tr><td>${r.row}</td><td>${r.a}</td><td>${r.b}</td></tr>`);
    html += `</tbody></table></div>`;

    html += `<div class="callout good" style="margin-top:18px"><strong>How to start:</strong> ${icici.contactPath}</div>`;

    // Cost waterfall
    html += `<h3 style="margin-top:36px">${icici.costWaterfall.headline}</h3>`;
    html += `<p style="font-size:14px;color:var(--text-mute)">${icici.costWaterfall.sub}</p>`;
    html += `<div style="overflow-x:auto"><table class="compare"><thead><tr><th>Step</th><th>Amount</th><th>Running</th><th>Note</th></tr></thead><tbody>`;
    icici.costWaterfall.rows.forEach(r => html += `<tr><td>${r.step}</td><td><strong>${r.amt}</strong></td><td>${r.cum}</td><td style="font-size:12px">${r.n}</td></tr>`);
    html += `</tbody></table></div>`;

    // Starting checklist
    html += `<h3 style="margin-top:36px">10-step starting checklist</h3>`;
    html += `<div class="card"><ol style="padding-left:24px;line-height:2">`;
    icici.startingChecklist.forEach(c => html += `<li style="color:var(--text)">${c.replace(/^\d+\.\s*/, '')}</li>`);
    html += `</ol></div>`;

    root.innerHTML = html;
  }

  window.__DOSSIER_INIT_PARTS__ = { renderRoutes, renderLRS, renderGIFT, renderICICI };
})();

/* ===== PART B: US deep dive + World Map + Tax + Risks ===== */
(function () {
  "use strict";
  const $ = (s, c) => (c || document).querySelector(s);

  function renderUS() {
    const root = $("#us-body");
    const { us } = DOSSIER;
    let html = `<p class="lede">${us.why}</p>`;

    // Exchanges + hours grid
    html += `<div class="grid grid-2" style="margin-top:24px">
      <div class="card"><h3>US Exchanges</h3><ul class="check">`;
    us.exchanges.forEach(ex => html += `<li><strong>${ex.n}:</strong> ${ex.d}</li>`);
    html += `</ul></div>
      <div class="card"><h3>Trading hours (IST)</h3>
        <p><strong>Regular:</strong> ${us.hours.regular}</p>
        <p><strong>Pre-market:</strong> ${us.hours.pre}</p>
        <p><strong>After-hours:</strong> ${us.hours.post}</p>
        <p style="font-size:13px;color:var(--text-mute)">${us.hours.note}</p>
      </div>
    </div>`;

    // Instruments
    html += `<h3 style="margin-top:36px">What you can buy in the US (and what's tricky)</h3>`;
    html += `<div class="grid grid-2">`;
    us.instruments.forEach(i => html += `<div class="card"><h4 style="color:var(--accent)">${i.t}</h4><p>${i.d}</p></div>`);
    html += `</div>`;

    // Tax at source — table
    html += `<h3 style="margin-top:36px">${us.taxAtSource.headline}</h3>`;
    html += `<div style="overflow-x:auto"><table class="compare"><thead><tr><th>Income type</th><th>US tax to you</th><th>Why</th></tr></thead><tbody>`;
    us.taxAtSource.items.forEach(i => html += `<tr><td>${i.h}</td><td><strong>${i.v}</strong></td><td>${i.n}</td></tr>`);
    html += `</tbody></table></div>`;

    // Estate tax — the landmine block
    html += `<div class="callout bad" style="margin-top:36px">
      <h3 style="color:var(--bad);margin:0 0 8px">${us.estateTax.headline}</h3>
      <p>${us.estateTax.body}</p>
    </div>`;
    html += `<div class="grid grid-2">
      <div class="card"><h4 style="color:var(--bad)">What IS US-situs (estate-tax exposed)</h4><ul class="check">${us.estateTax.whatIs.map(x => `<li>${x}</li>`).join("")}</ul></div>
      <div class="card"><h4 style="color:var(--good)">What is NOT US-situs</h4><ul class="check">${us.estateTax.whatIsNot.map(x => `<li>${x}</li>`).join("")}</ul></div>
    </div>`;
    html += `<h4 style="margin-top:18px;color:var(--accent)">Mitigation strategies</h4>`;
    html += `<div class="grid">`;
    us.estateTax.mitigations.forEach(m => html += `<div class="callout good">${m}</div>`);
    html += `</div>`;
    html += `<div class="callout warn">${us.estateTax.callout}</div>`;

    // W-8BEN
    html += `<h3 style="margin-top:36px">W-8BEN — the form that saves you 5%</h3>`;
    html += `<div class="card">
      <p>${us.w8ben.what}</p>
      <h4 style="color:var(--accent);margin-top:14px">Required fields</h4>
      <ul class="check">${us.w8ben.fields.map(f => `<li>${f}</li>`).join("")}</ul>
      <p><strong>Validity:</strong> ${us.w8ben.validity}</p>
      <p style="color:var(--bad)"><strong>Without it:</strong> ${us.w8ben.consequences}</p>
    </div>`;

    // Forms timeline
    html += `<h3 style="margin-top:36px">Forms &amp; calendar — what flows where</h3>`;
    html += `<div style="overflow-x:auto"><table class="compare"><thead><tr><th>Form</th><th>Direction</th><th>Timing</th><th>Purpose</th></tr></thead><tbody>`;
    us.formsTimeline.forEach(f => html += `<tr><td><strong>${f.form}</strong></td><td>${f.who}</td><td>${f.when}</td><td>${f.purpose}</td></tr>`);
    html += `</tbody></table></div>`;

    // Top picks
    html += `<h3 style="margin-top:36px">Curated stock &amp; ETF universe</h3>`;
    html += `<div class="tabs"><div class="tab-bar">
      <button class="tab-btn active" data-tab="bc">Blue chips</button>
      <button class="tab-btn" data-tab="us-etf">US-domiciled ETFs</button>
      <button class="tab-btn" data-tab="ucits">Estate-safe (UCITS)</button>
    </div>`;
    const renderPicks = (arr) => `<div class="grid grid-2">${arr.map(p => `<div class="card"><h4 style="color:var(--accent)">${p.sym} <span style="font-size:12px;color:var(--text-mute);font-weight:400">${p.s}</span></h4><p><strong>${p.n}</strong></p><p style="font-size:13px">${p.note}</p></div>`).join("")}</div>`;
    html += `<div class="tab-panel active" data-tab="bc">${renderPicks(us.topPicks.bluechips)}</div>`;
    html += `<div class="tab-panel" data-tab="us-etf">${renderPicks(us.topPicks.etfs)}</div>`;
    html += `<div class="tab-panel" data-tab="ucits">${renderPicks(us.topPicks.ucitsEstateSafe)}</div>`;
    html += `</div>`;

    root.innerHTML = html;
  }

  /* ===== Render: WORLD MAP ===== */
  function renderWorld() {
    const root = $("#world-body");
    root.innerHTML = `
      <div id="worldMap" aria-label="World map of investment-relevant jurisdictions"></div>
      <div style="margin-top:18px;display:flex;flex-wrap:wrap;gap:8px;font-size:13px;color:var(--text-mute)">
        <span class="pill bad">● Primary focus</span>
        <span class="pill warn">● Core market</span>
        <span class="pill info">● Limited access</span>
        <span style="color:var(--text-mute)">Click any pin → full regulatory profile.</span>
      </div>
      <div id="countryTable" style="margin-top:24px"></div>
    `;

    // Initialise Leaflet
    const map = L.map("worldMap", { worldCopyJump: true, scrollWheelZoom: false }).setView([22, 25], 2);
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      maxZoom: 18,
      subdomains: "abcd"
    }).addTo(map);

    // Pins
    const colorFor = t => t === "primary" ? "#ff6b78" : t === "core" ? "#ffb547" : "#6aa6ff";
    DOSSIER.countries.forEach(c => {
      const m = L.circleMarker([c.lat, c.lng], {
        radius: c.tier === "primary" ? 11 : c.tier === "core" ? 8 : 6,
        color: colorFor(c.tier),
        weight: 2,
        fillColor: colorFor(c.tier),
        fillOpacity: 0.7
      }).addTo(map);
      const popup = `
        <h4>${c.name}</h4>
        <div style="font-size:12px"><strong>Exchanges:</strong> ${c.exchanges}</div>
        <div style="font-size:12px"><strong>Dividend WHT:</strong> ${c.dividendWHT}</div>
        <div style="font-size:12px"><strong>Local CG (NRA):</strong> ${c.capGainsLocal}</div>
        <div style="font-size:12px"><strong>Estate Tax:</strong> ${c.estateTax}</div>
        <div style="font-size:12px"><strong>DTAA w/ India:</strong> ${c.dtaa}</div>
        <div style="font-size:12px"><strong>LRS access:</strong> ${c.accessLRS}</div>
        <div style="font-size:12px"><strong>GIFT access:</strong> ${c.accessGIFT}</div>
        <div style="font-size:12px;margin-top:6px;color:var(--accent)">${c.notes}</div>
      `;
      m.bindPopup(popup, { maxWidth: 360 });
    });

    // Country table
    const tbl = DOSSIER.countries.map(c => `
      <tr>
        <td><strong>${c.name}</strong><div style="font-size:11px;color:var(--text-mute)">${c.exchanges}</div></td>
        <td>${c.dividendWHT}</td>
        <td>${c.estateTax}</td>
        <td>${c.accessLRS}</td>
        <td>${c.accessGIFT}</td>
      </tr>
    `).join("");
    $("#countryTable").innerHTML = `
      <h3>Quick reference — all 18 jurisdictions</h3>
      <div style="overflow-x:auto"><table class="compare"><thead><tr>
        <th>Country</th><th>Dividend WHT</th><th>Estate tax</th><th>LRS</th><th>GIFT City</th>
      </tr></thead><tbody>${tbl}</tbody></table></div>
    `;
  }

  Object.assign(window.__DOSSIER_INIT_PARTS__ = window.__DOSSIER_INIT_PARTS__ || {}, { renderUS, renderWorld });
})();

/* ===== PART C: TAX + RISKS ===== */
(function () {
  "use strict";
  const $ = (s, c) => (c || document).querySelector(s);

  function renderTax() {
    const root = $("#tax-body");
    const { tax } = DOSSIER;
    let html = `<p class="lede">${tax.intro}</p>`;

    // Capital gains
    html += `<h3 style="margin-top:24px">${tax.capitalGains.headline}</h3>`;
    html += `<div style="overflow-x:auto"><table class="compare"><thead><tr><th>Aspect</th><th>Treatment</th><th>Note</th></tr></thead><tbody>`;
    tax.capitalGains.rules.forEach(r => html += `<tr><td>${r.h}</td><td><strong>${r.v}</strong></td><td>${r.n}</td></tr>`);
    html += `</tbody></table></div>`;
    html += `<div class="callout warn"><strong>Transition:</strong> ${tax.capitalGains.transition}</div>`;

    // Dividends
    html += `<h3 style="margin-top:32px">${tax.dividends.headline}</h3>`;
    html += `<div style="overflow-x:auto"><table class="compare"><tbody>`;
    tax.dividends.rules.forEach(r => html += `<tr><td>${r.h}</td><td><strong>${r.v}</strong></td><td>${r.n}</td></tr>`);
    html += `</tbody></table></div>`;

    // Schedule FA
    html += `<h3 style="margin-top:32px">${tax.scheduleFA.headline}</h3>`;
    html += `<div class="card">
      <p><strong>Who must file:</strong> ${tax.scheduleFA.who}</p>
      <p><strong>Forms:</strong></p><ul class="check">${tax.scheduleFA.forms.map(f => `<li>${f}</li>`).join("")}</ul>
      <p><strong>What to disclose (Schedule FA fields A1–G):</strong></p><ul style="columns:2;column-gap:24px;list-style:none;padding:0">${tax.scheduleFA.items.map(i => `<li style="padding:4px 0;font-size:13px">• ${i}</li>`).join("")}</ul>
      <p><strong>Per-asset fields:</strong> ${tax.scheduleFA.fields.join(" · ")}</p>
      <div class="callout warn"><strong>Critical quirk:</strong> ${tax.scheduleFA.period}</div>
      <p><strong>Valuation rule:</strong> ${tax.scheduleFA.valuation}</p>
    </div>`;

    // Black Money Act
    html += `<div class="callout bad" style="margin-top:24px">
      <h3 style="color:var(--bad);margin:0 0 8px">${tax.blackMoney.headline}</h3>
      <p>${tax.blackMoney.body}</p>
    </div>`;
    html += `<div style="overflow-x:auto"><table class="compare"><thead><tr><th>Penalty type</th><th>Quantum</th><th>Note</th></tr></thead><tbody>`;
    tax.blackMoney.penalties.forEach(p => html += `<tr><td>${p.h}</td><td><strong>${p.v}</strong></td><td>${p.n}</td></tr>`);
    html += `</tbody></table></div>`;
    html += `<div class="callout good"><strong>Best practice:</strong> ${tax.blackMoney.bestPractice}</div>`;

    // Forms
    html += `<h3 style="margin-top:32px">All the forms in one place</h3>`;
    html += `<div style="overflow-x:auto"><table class="compare"><thead><tr><th>Form</th><th>What it is</th><th>When</th><th>Purpose</th></tr></thead><tbody>`;
    tax.forms.forEach(f => html += `<tr><td><strong>${f.n}</strong></td><td>${f.what}</td><td>${f.when}</td><td>${f.purpose}</td></tr>`);
    html += `</tbody></table></div>`;

    // FY calendar
    html += `<h3 style="margin-top:32px">Compliance calendar</h3>`;
    html += `<div class="grid grid-3">`;
    tax.fy_calendar.forEach(c => html += `<div class="card"><h4 style="color:var(--accent)">${c.month}</h4><p style="font-size:13px">${c.task}</p></div>`);
    html += `</div>`;

    root.innerHTML = html;
  }

  function renderRisks() {
    const root = $("#risks-body");
    const { risks } = DOSSIER;
    let html = `<div class="grid grid-2">`;
    const sevColor = s => s === "critical" ? "bad" : s === "high" ? "bad" : s === "medium" ? "warn" : "info";
    risks.forEach(r => {
      html += `<div class="card">
        <span class="pill ${sevColor(r.severity)}">${r.severity.toUpperCase()}</span>
        <h3 style="margin-top:8px">${r.cat}</h3>
        <p>${r.body}</p>
        <p style="margin-top:10px;font-size:13px;color:var(--text)"><strong style="color:var(--good)">Mitigation:</strong> ${r.mitigation}</p>
      </div>`;
    });
    html += `</div>`;
    root.innerHTML = html;
  }

  Object.assign(window.__DOSSIER_INIT_PARTS__ = window.__DOSSIER_INIT_PARTS__ || {}, { renderTax, renderRisks });
})();

/* ===== PART D: CALCULATORS ===== */
(function () {
  "use strict";
  const $ = (s, c) => (c || document).querySelector(s);
  const fmtINR = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
  const fmtUSD = (n) => "$" + Math.round(n).toLocaleString("en-US");

  function renderCalc() {
    const root = $("#calc-body");
    root.innerHTML = `
      <div class="grid grid-2">
        ${calcLRSHTML()}
        ${calcTCSHTML()}
        ${calcCGHTML()}
        ${calcDivHTML()}
      </div>
      ${calcEstateHTML()}
    `;
    bindCalcs();
  }

  /* --- 1. LRS Budget Tracker --- */
  function calcLRSHTML() {
    return `
    <div class="calc-card">
      <h3>LRS Budget Tracker</h3>
      <p style="font-size:13px;color:var(--text-mute)">How much LRS headroom do I have left this FY?</p>
      <div class="calc-row"><label>Cumulative remitted so far this FY (USD)</label><input type="number" id="lrs_used" value="50000" min="0"/></div>
      <div class="calc-row"><label>Planned new remittance (USD)</label><input type="number" id="lrs_plan" value="100000" min="0"/></div>
      <div class="calc-row"><label>USD/INR rate (today)</label><input type="number" id="lrs_fx" value="86" step="0.1"/></div>
      <div class="calc-out" id="lrs_out"></div>
    </div>`;
  }

  /* --- 2. TCS Estimator --- */
  function calcTCSHTML() {
    return `
    <div class="calc-card">
      <h3>TCS Estimator (FY 25-26)</h3>
      <p style="font-size:13px;color:var(--text-mute)">What TCS will the bank collect on this remittance?</p>
      <div class="calc-row"><label>Already-remitted in FY (₹)</label><input type="number" id="tcs_prior" value="500000"/></div>
      <div class="calc-row"><label>Current remittance (₹)</label><input type="number" id="tcs_curr" value="800000"/></div>
      <div class="calc-row"><label>Purpose</label>
        <select id="tcs_purp">
          <option value="invest">Investment (foreign securities)</option>
          <option value="eduSelf">Education — self-funded</option>
          <option value="eduLoan">Education — loan-funded</option>
          <option value="medical">Medical treatment</option>
          <option value="tour">Overseas tour package</option>
          <option value="gift">Gift / maintenance / donation</option>
        </select>
      </div>
      <div class="calc-out" id="tcs_out"></div>
    </div>`;
  }

  /* --- 3. Capital Gains --- */
  function calcCGHTML() {
    return `
    <div class="calc-card">
      <h3>Capital Gains Tax (Foreign Stocks)</h3>
      <p style="font-size:13px;color:var(--text-mute)">Post-Budget 2024 regime — 12.5% LTCG / slab STCG.</p>
      <div class="calc-row"><label>Buy: USD price × quantity</label>
        <div style="display:flex;gap:6px"><input type="number" id="cg_bp" value="150" placeholder="USD price"/><input type="number" id="cg_q" value="100" placeholder="qty"/></div>
      </div>
      <div class="calc-row"><label>Buy date USD/INR</label><input type="number" id="cg_bf" value="83"/></div>
      <div class="calc-row"><label>Sell USD price (per share)</label><input type="number" id="cg_sp" value="220"/></div>
      <div class="calc-row"><label>Sell date USD/INR</label><input type="number" id="cg_sf" value="88"/></div>
      <div class="calc-row"><label>Holding period (months)</label><input type="number" id="cg_hold" value="30"/></div>
      <div class="calc-row"><label>Your slab rate (for STCG only) — %</label><input type="number" id="cg_slab" value="30"/></div>
      <div class="calc-out" id="cg_out"></div>
    </div>`;
  }

  /* --- 4. Dividend WHT + DTAA --- */
  function calcDivHTML() {
    return `
    <div class="calc-card">
      <h3>Dividend WHT &amp; DTAA Credit</h3>
      <p style="font-size:13px;color:var(--text-mute)">Net cash to your hand after US 25% WHT + India top-up.</p>
      <div class="calc-row"><label>Gross US dividend (USD)</label><input type="number" id="div_gross" value="1000"/></div>
      <div class="calc-row"><label>USD/INR (date of receipt)</label><input type="number" id="div_fx" value="86"/></div>
      <div class="calc-row"><label>Your Indian slab rate %</label><input type="number" id="div_slab" value="30"/></div>
      <div class="calc-row"><label>W-8BEN on file?</label>
        <select id="div_w8"><option value="yes">Yes — 25% withheld</option><option value="no">No — 30% withheld</option></select>
      </div>
      <div class="calc-out" id="div_out"></div>
    </div>`;
  }

  /* --- 5. Estate Tax Exposure (full-width) --- */
  function calcEstateHTML() {
    return `
    <div class="calc-card" style="margin-top:18px">
      <h3>US Estate Tax Exposure</h3>
      <p style="font-size:13px;color:var(--text-mute)">If you died today holding the below in US-situs assets, what's the estate-tax bill?</p>
      <div class="calc-grid">
        <div>
          <div class="calc-row"><label>Direct US-situs assets at death (USD)</label><input type="number" id="est_value" value="500000"/></div>
          <div class="calc-row"><label>Marital deduction available?</label>
            <select id="est_mar"><option value="0">No (or not US-citizen spouse)</option><option value="1">Yes (US-citizen spouse — full marital deduction)</option></select>
          </div>
        </div>
        <div class="calc-out" id="est_out"></div>
      </div>
    </div>`;
  }

  function bindCalcs() {
    /* LRS */
    function recalcLRS() {
      const used = +$("#lrs_used").value || 0;
      const plan = +$("#lrs_plan").value || 0;
      const fx   = +$("#lrs_fx").value || 86;
      const cap = 250000;
      const remaining = Math.max(0, cap - used - plan);
      const breach = (used + plan) > cap;
      const planINR = plan * fx;
      $("#lrs_out").innerHTML = `
        <div class="line"><span>Annual cap</span><span>${fmtUSD(cap)}</span></div>
        <div class="line"><span>Already used</span><span>${fmtUSD(used)}</span></div>
        <div class="line"><span>Planned remittance</span><span>${fmtUSD(plan)} ≈ ${fmtINR(planINR)}</span></div>
        <div class="line"><span>Remaining after this</span><span class="big">${breach ? '<span style="color:var(--bad)">BREACH</span>' : fmtUSD(remaining)}</span></div>
      `;
    }
    ["lrs_used","lrs_plan","lrs_fx"].forEach(id => $("#"+id).addEventListener("input", recalcLRS));
    recalcLRS();

    /* TCS */
    function recalcTCS() {
      const prior = +$("#tcs_prior").value || 0;
      const curr  = +$("#tcs_curr").value || 0;
      const p = $("#tcs_purp").value;
      const threshold = 1000000; // ₹10L
      const beforeThr = Math.max(0, threshold - prior);
      const taxablePortion = Math.max(0, curr - beforeThr);
      let rate = 0;
      if (p === "invest" || p === "gift") rate = 0.20;
      else if (p === "eduSelf" || p === "medical") rate = 0.05;
      else if (p === "eduLoan") rate = 0;
      else if (p === "tour") {
        // 5% upto threshold for tour, 20% above (different baseline)
        const withinThr = Math.min(curr, beforeThr);
        const above = Math.max(0, curr - beforeThr);
        const tcs = withinThr * 0.05 + above * 0.20;
        $("#tcs_out").innerHTML = `
          <div class="line"><span>Within ₹10L threshold @ 5%</span><span>${fmtINR(withinThr * 0.05)}</span></div>
          <div class="line"><span>Above ₹10L @ 20%</span><span>${fmtINR(above * 0.20)}</span></div>
          <div class="line"><span>Total TCS</span><span class="big">${fmtINR(tcs)}</span></div>
          <div class="line"><span>Total outflow (incl. TCS)</span><span>${fmtINR(curr + tcs)}</span></div>
          <div class="line"><span>Note</span><span style="font-size:12px">Tour packages: 5% applies from rupee one.</span></div>`;
        return;
      }
      const tcs = taxablePortion * rate;
      $("#tcs_out").innerHTML = `
        <div class="line"><span>Cumulative this FY</span><span>${fmtINR(prior + curr)}</span></div>
        <div class="line"><span>Threshold available</span><span>${fmtINR(beforeThr)}</span></div>
        <div class="line"><span>Subject to TCS</span><span>${fmtINR(taxablePortion)}</span></div>
        <div class="line"><span>TCS rate applied</span><span>${(rate*100).toFixed(0)}%</span></div>
        <div class="line"><span>TCS to be collected</span><span class="big">${fmtINR(tcs)}</span></div>
        <div class="line"><span>Total bank debit</span><span>${fmtINR(curr + tcs)}</span></div>
        <div class="line"><span>Reclaim</span><span style="font-size:12px;color:var(--good)">Adjustable in ITR</span></div>`;
    }
    ["tcs_prior","tcs_curr","tcs_purp"].forEach(id => $("#"+id).addEventListener("input", recalcTCS));
    $("#tcs_purp").addEventListener("change", recalcTCS);
    recalcTCS();

    /* Capital Gains */
    function recalcCG() {
      const bp = +$("#cg_bp").value, q = +$("#cg_q").value;
      const bf = +$("#cg_bf").value, sp = +$("#cg_sp").value;
      const sf = +$("#cg_sf").value, hold = +$("#cg_hold").value;
      const slab = +$("#cg_slab").value || 30;
      const buyINR = bp * q * bf;
      const sellINR = sp * q * sf;
      const gainINR = sellINR - buyINR;
      const isLT = hold > 24;
      const rate = isLT ? 12.5 : slab;
      const tax = (gainINR * rate) / 100;
      $("#cg_out").innerHTML = `
        <div class="line"><span>Buy cost (INR)</span><span>${fmtINR(buyINR)}</span></div>
        <div class="line"><span>Sale proceeds (INR)</span><span>${fmtINR(sellINR)}</span></div>
        <div class="line"><span>Capital gain</span><span class="big" style="color:${gainINR >= 0 ? 'var(--good)' : 'var(--bad)'}">${fmtINR(gainINR)}</span></div>
        <div class="line"><span>Type</span><span>${isLT ? 'LTCG (>24 m)' : 'STCG (≤24 m)'}</span></div>
        <div class="line"><span>Rate applied</span><span>${rate}%${isLT ? ' (no indexation)' : ' slab'}</span></div>
        <div class="line"><span>Tax payable</span><span class="big">${fmtINR(Math.max(0, tax))}</span></div>
        <div class="line"><span>Net of tax</span><span>${fmtINR(gainINR - Math.max(0, tax))}</span></div>`;
    }
    ["cg_bp","cg_q","cg_bf","cg_sp","cg_sf","cg_hold","cg_slab"].forEach(id => $("#"+id).addEventListener("input", recalcCG));
    recalcCG();

    /* Dividend */
    function recalcDiv() {
      const gross = +$("#div_gross").value;
      const fx = +$("#div_fx").value;
      const slab = (+$("#div_slab").value) / 100;
      const w8 = $("#div_w8").value === "yes";
      const wht = w8 ? 0.25 : 0.30;
      const usWith = gross * wht;
      const netUS = gross - usWith;
      const grossINR = gross * fx;
      const indianTax = grossINR * slab;
      const ftc = Math.min(usWith * fx, indianTax);
      const indiaTopUp = Math.max(0, indianTax - ftc);
      const finalCash = netUS * fx - indiaTopUp;
      $("#div_out").innerHTML = `
        <div class="line"><span>Gross dividend</span><span>${fmtUSD(gross)}</span></div>
        <div class="line"><span>US WHT (${(wht*100)}%)</span><span style="color:var(--bad)">−${fmtUSD(usWith)}</span></div>
        <div class="line"><span>Net to broker</span><span>${fmtUSD(netUS)} ≈ ${fmtINR(netUS*fx)}</span></div>
        <div class="line"><span>Declarable in ITR</span><span>${fmtINR(grossINR)}</span></div>
        <div class="line"><span>India tax @ slab</span><span>${fmtINR(indianTax)}</span></div>
        <div class="line"><span>Foreign Tax Credit</span><span style="color:var(--good)">−${fmtINR(ftc)}</span></div>
        <div class="line"><span>India top-up tax</span><span>${fmtINR(indiaTopUp)}</span></div>
        <div class="line"><span>Final cash in pocket</span><span class="big">${fmtINR(finalCash)}</span></div>`;
    }
    ["div_gross","div_fx","div_slab","div_w8"].forEach(id => $("#"+id).addEventListener("input", recalcDiv));
    $("#div_w8").addEventListener("change", recalcDiv);
    recalcDiv();

    /* Estate */
    function recalcEstate() {
      const v = +$("#est_value").value;
      const exempt = 60000;
      const taxable = Math.max(0, v - exempt);
      const taxBands = [
        [10000, 0.18], [10000, 0.20], [20000, 0.22], [40000, 0.24], [60000, 0.26],
        [80000, 0.28], [250000, 0.30], [500000, 0.32], [750000, 0.34], [Infinity, 0.40]
      ];
      let tax = 0, remaining = taxable;
      for (const [bsize, rate] of taxBands) {
        const slice = Math.min(remaining, bsize);
        tax += slice * rate;
        remaining -= slice;
        if (remaining <= 0) break;
      }
      const marital = $("#est_mar").value === "1";
      if (marital) tax = 0;
      $("#est_out").innerHTML = `
        <div class="line"><span>US-situs estate value</span><span>${fmtUSD(v)}</span></div>
        <div class="line"><span>NRA exemption</span><span>${fmtUSD(exempt)}</span></div>
        <div class="line"><span>Taxable estate</span><span>${fmtUSD(taxable)}</span></div>
        <div class="line"><span>Estimated estate tax</span><span class="big" style="color:var(--bad)">${fmtUSD(tax)}</span></div>
        <div class="line"><span>Effective rate</span><span>${v > 0 ? ((tax/v)*100).toFixed(1) + "%" : "0%"}</span></div>
        <div class="line" style="font-size:12px"><span>${marital ? "Marital deduction applied (assumes US-citizen spouse). India-US scenarios rarely satisfy this." : "Use UCITS-ETF / GIFT UDR / cap below $60K to mitigate."}</span></div>`;
    }
    ["est_value","est_mar"].forEach(id => $("#"+id).addEventListener("input", recalcEstate));
    $("#est_mar").addEventListener("change", recalcEstate);
    recalcEstate();
  }

  Object.assign(window.__DOSSIER_INIT_PARTS__ = window.__DOSSIER_INIT_PARTS__ || {}, { renderCalc });
})();

/* ===== PART E: FAQ + GLOSSARY + INIT ===== */
(function () {
  "use strict";
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  function renderFAQ() {
    const root = $("#faq-body");
    const cats = DOSSIER.faqCats;
    const faqs = DOSSIER.faq;
    let html = `<input type="text" class="faq-search" id="faqSearch" placeholder="Search 80+ questions — type any keyword (e.g., 'TCS', 'estate', 'NRI')"/>`;
    html += `<div class="faq-cats">`;
    cats.forEach((c, i) => html += `<button class="faq-cat ${i === 0 ? "active" : ""}" data-cat="${c.id}">${c.label}</button>`);
    html += `</div>`;
    html += `<div id="faqList">`;
    faqs.forEach((f, i) => {
      html += `<div class="acc" data-cat="${f.c}" data-q="${f.q.toLowerCase()}" data-a="${f.a.toLowerCase().replace(/"/g, '')}">
        <div class="acc-head"><span>${f.q}</span><span class="chev">▶</span></div>
        <div class="acc-body"><p>${f.a}</p></div>
      </div>`;
    });
    html += `</div>`;
    root.innerHTML = html;

    // Filter logic
    const filter = () => {
      const q = $("#faqSearch").value.trim().toLowerCase();
      const activeCat = $(".faq-cat.active")?.dataset.cat || "all";
      $$("#faqList .acc").forEach(a => {
        const inCat = activeCat === "all" || a.dataset.cat === activeCat;
        const inQuery = !q || a.dataset.q.includes(q) || a.dataset.a.includes(q);
        a.style.display = (inCat && inQuery) ? "" : "none";
      });
    };
    $("#faqSearch").addEventListener("input", filter);
    $$(".faq-cat").forEach(b => b.addEventListener("click", () => {
      $$(".faq-cat").forEach(x => x.classList.remove("active"));
      b.classList.add("active");
      filter();
    }));
  }

  function renderGlossary() {
    const root = $("#glossary-body");
    const items = DOSSIER.glossary;
    let html = `<input type="text" class="faq-search" id="glossarySearch" placeholder="Search terms — e.g., 'W-8BEN', 'DTAA', 'UCITS'"/>`;
    html += `<div class="glossary-grid" id="glossaryGrid">`;
    items.forEach(g => {
      html += `<div class="gloss" data-term="${g.t.toLowerCase()}" data-def="${g.d.toLowerCase().replace(/"/g, '')}">
        <b>${g.t}</b><span>${g.d}</span>
      </div>`;
    });
    html += `</div>`;
    root.innerHTML = html;

    $("#glossarySearch").addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      $$("#glossaryGrid .gloss").forEach(x => {
        x.style.display = (!q || x.dataset.term.includes(q) || x.dataset.def.includes(q)) ? "" : "none";
      });
    });
  }

  function renderHowTo() {
    const root = $("#howto-body");
    if (!root) return;
    let html = `<div class="grid grid-3">`;
    DOSSIER.howTo.forEach((h, i) => {
      html += `<div class="card"><span class="kicker">Path ${String.fromCharCode(65 + i)}</span><h3 style="margin-top:6px">${h.h}</h3><p>${h.b}</p></div>`;
    });
    html += `</div>`;
    root.innerHTML = html;
  }

  function renderSources() {
    const root = $("#sources-body");
    if (!root) return;
    let html = `<div class="grid grid-2">`;
    DOSSIER.sources.forEach(s => {
      html += `<div class="card"><h4 style="color:var(--accent)">${s.label}</h4><p style="font-size:13px">${s.n}</p></div>`;
    });
    html += `</div>`;
    html += `<div class="callout" style="margin-top:24px;font-size:13px"><strong>Last updated:</strong> Apr 2026 · Reflects FY 2025–26 regulatory framework. Numbers, treaties and circulars are amended frequently — verify against original sources before acting.</div>`;
    root.innerHTML = html;
  }

  /* ===== Master init ===== */
  function init() {
    const parts = window.__DOSSIER_INIT_PARTS__ || {};
    renderHowTo();
    parts.renderRoutes && parts.renderRoutes();
    parts.renderLRS && parts.renderLRS();
    parts.renderGIFT && parts.renderGIFT();
    parts.renderICICI && parts.renderICICI();
    parts.renderUS && parts.renderUS();
    parts.renderWorld && parts.renderWorld();
    parts.renderTax && parts.renderTax();
    parts.renderRisks && parts.renderRisks();
    parts.renderCalc && parts.renderCalc();
    renderFAQ();
    renderGlossary();
    renderSources();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

