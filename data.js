/* ============================================================
   GLOBAL STOCKS DOSSIER — DATA LAYER
   All datapoints reflect FY 2025–26 framework (Budget 2025).
   Sources: RBI Master Direction on LRS · IFSCA · CBDT · IRS Pub 519.
   ============================================================ */

const DOSSIER = {};

/* ---------- 01. ROUTES — LRS vs GIFT CITY (compare table + summary cards) ---------- */
DOSSIER.routes = {
  intro: `Indian residents have exactly two RBI-sanctioned rails to <em>directly</em> own foreign-listed shares: the Liberalised Remittance Scheme (LRS) which routes your INR through a domestic AD-1 bank to an offshore broker, and the GIFT City IFSC route which uses an India-onshore exchange (NSE IFSC or India INX) sitting inside a deemed-foreign Special Economic Zone in Gandhinagar, Gujarat. Mutual funds, FoFs, ULIPs and ETF-of-ETFs are <strong>indirect</strong> and outside the scope of this dossier.`,
  cards: [
    {
      kicker: "Route 1",
      title: "LRS — Liberalised Remittance Scheme",
      body: "Send up to USD 2,50,000 per FY abroad to your overseas brokerage account. You become the registered owner of the foreign share, settled at a US/UK/SG depository. Mature, broad market access, but FEMA + TCS apply and US estate tax exposure is real.",
      pills: [{c:"info",t:"USD 250,000 / FY"},{c:"warn",t:"TCS 20% above ₹10L"},{c:"good",t:"60,000+ securities"}]
    },
    {
      kicker: "Route 2",
      title: "GIFT City IFSC",
      body: "Trade on NSE IFSC (Unsponsored Depository Receipts on ~50 US blue chips) or India INX Global Access (direct shares across 135+ exchanges in 31 countries). Onshore Indian regulator (IFSCA), USD-denominated, no STT/stamp duty, settlement in T+3.",
      pills: [{c:"good",t:"IFSCA-regulated"},{c:"good",t:"USD-settled"},{c:"info",t:"Still uses LRS for funding*"}]
    }
  ],
  comparison: [
    {row: "Regulator",                lrs: "RBI (FEMA) + SEBI",                                                  gift: "IFSCA (single unified regulator)"},
    {row: "Annual cap (resident)",     lrs: "USD 250,000 per individual per FY",                                  gift: "USD 250,000 (LRS funded for residents); NRIs no LRS cap"},
    {row: "TCS on funding",            lrs: "20% above ₹10L cumulative (FY25-26)",                                gift: "Same — funding via LRS still attracts TCS"},
    {row: "Tradable instruments",      lrs: "Direct shares, ETFs, options, bonds, ADRs — global",                 gift: "NSE IFSC: UDRs on ~50 US stocks · INX GA: direct shares 135+ exchanges"},
    {row: "Currency",                  lrs: "USD/GBP/EUR/SGD/HKD/JPY (broker-dependent)",                          gift: "USD only (GIFT IFSC base currency)"},
    {row: "Settlement",                lrs: "T+1 (US) at custodian abroad",                                       gift: "T+3 at IFSC depository"},
    {row: "Fractional shares",         lrs: "Yes (most brokers, incl. ICICI Direct/IBKR)",                        gift: "Yes — UDRs are designed as fractions (e.g., 1 Apple = 25 UDRs)"},
    {row: "Capital gains tax (resident)", lrs: "12.5% LTCG (>24m); slab STCG (≤24m). No indexation post 23-Jul-24", gift: "Same as LRS for direct-stock trades by residents"},
    {row: "STT / stamp duty",          lrs: "Foreign-exchange equivalents may apply at source",                   gift: "Zero — no STT, no GST on brokerage, no stamp duty"},
    {row: "Dividend WHT (US)",         lrs: "25% under India-US DTAA (with W-8BEN); 30% without",                 gift: "Same 25% — dividend withheld at source by US issuer"},
    {row: "US estate tax exposure",    lrs: "Yes, $60K filing threshold, up to 40%",                              gift: "Yes for direct US shares via INX GA · UDRs hold via IFSC depository, may mitigate (consult)"},
    {row: "Schedule FA disclosure",    lrs: "Mandatory — every foreign holding",                                   gift: "Mandatory — IFSC is treated as foreign jurisdiction for residents"},
    {row: "Section 10(4D) exemption",  lrs: "Not applicable",                                                      gift: "Available to specified non-residents in IFSC funds (not direct stocks for residents)"},
    {row: "Brokerage on US stocks",    lrs: "ICICI Direct via IBKR: ~$0.000119/qty + IBKR fees · others ≤ $1.50/trade", gift: "₹250–₹999/trade typical · USD 1.5–10 cents/share"},
    {row: "FX conversion charge",      lrs: "Bank spread 0.5%–1.5% on remittance",                                gift: "Spread on USD funding to GIFT account 0.4%–1.2%"},
    {row: "Account opening time",      lrs: "1–3 days (online KYC + W-8BEN)",                                     gift: "3–7 days (in-person/video KYC for IFSC banking unit)"},
    {row: "Profit repatriation",       lrs: "Direct to your INR account via broker → bank",                       gift: "Funds remain USD in IFSC account; convert to INR when needed"},
    {row: "Suitable for",              lrs: "Long-term equity wealth, ETFs, retail size",                         gift: "USD-denominated savings, NRIs, sophisticated structured products, AIFs"}
  ]
};

/* ---------- 02. LRS DEEP DIVE ---------- */
DOSSIER.lrs = {
  what: `The <strong>Liberalised Remittance Scheme</strong> was introduced by the RBI in February 2004 (initial cap USD 25,000) and is governed under Section 5 of FEMA, 1999 read with the RBI Master Direction on LRS (last consolidated 2025). It permits all <em>resident individuals</em> — including minors via a guardian's countersignature on Form A2 — to remit up to <strong>USD 250,000 per financial year</strong> for a permitted basket of capital and current account transactions, of which "investment in equity/debt instruments abroad" is one explicit head.`,
  limits: [
    {label: "Annual cap", value: "USD 2,50,000 per individual per FY (Apr–Mar)", sub: "Cumulative across all permitted purposes — investment, education, travel, gift, medical, maintenance of relatives."},
    {label: "Family clubbing", value: "Each family member has their own USD 250K limit", sub: "A family of four can collectively remit USD 1M/year. Minors must transact through guardian."},
    {label: "Lifetime limit", value: "None", sub: "The cap resets every April 1; unused balance does not carry forward."},
    {label: "Underlying purposes", value: "Investment, education, gifts, donations, medical, employment, emigration, travel, maintenance of relatives", sub: "Investment in equity/debt abroad is permitted; F&O on foreign exchanges is NOT permitted under LRS."}
  ],
  tcs: {
    intro: "TCS (Tax Collected at Source) under Section 206C(1G) of the Income-tax Act applies the moment your bank executes the remittance. It is a <em>tax in the air</em> — fully creditable against your final income tax liability and refundable if not utilised.",
    rules: [
      {purpose: "Investment in foreign securities (LRS)", upto10L: "Nil",  above10L: "20%",  notes: "Threshold raised from ₹7L to ₹10L w.e.f. 1-Apr-2025 (Budget 2025)."},
      {purpose: "Education — funded by loan from notified institution", upto10L: "Nil", above10L: "Nil", notes: "Section 80E loan; full TCS exemption."},
      {purpose: "Education — self-funded", upto10L: "Nil", above10L: "5%", notes: "Concessional rate for self-paid tuition/living."},
      {purpose: "Medical treatment abroad", upto10L: "Nil", above10L: "5%", notes: "Includes incidental travel/stay."},
      {purpose: "Overseas tour package", upto10L: "5%", above10L: "20%", notes: "TCS applies from rupee one for tour packages."},
      {purpose: "Gift / maintenance / donation", upto10L: "Nil", above10L: "20%", notes: "Same as investment."}
    ],
    creditable: "TCS deducted appears in your Form 26AS. Adjust against your tax liability while filing ITR; if your total tax payable is lower than total TCS, the excess is refunded.",
    evolution: [
      {date:"Pre-Oct 2020",   rate:"NIL",     note:"No TCS on LRS remittances at all."},
      {date:"Oct 2020–Sep 2023", rate:"5%",  note:"5% TCS introduced (Finance Act 2020) above ₹7L threshold for LRS."},
      {date:"Oct 2023–Mar 2025", rate:"20%", note:"Hiked to 20% above ₹7L for non-education/non-medical purposes (Budget 2023)."},
      {date:"Apr 2025 onwards", rate:"20%",  note:"Threshold raised from ₹7L to ₹10L (Budget 2025). Education-loan funded fully exempt."}
    ],
    purposeCodes: [
      {c:"S0023", p:"Investment in equity shares abroad"},
      {c:"S0024", p:"Investment in foreign debt securities"},
      {c:"S0306", p:"Travel abroad for tourism"},
      {c:"S0305", p:"Travel for medical treatment"},
      {c:"S0011", p:"Maintenance of close relatives abroad"},
      {c:"S0001", p:"Indian investment / banking abroad"},
      {c:"S1301", p:"Studies abroad — education"},
      {c:"S1302", p:"Maintenance of students abroad"},
      {c:"S1503", p:"Gift to non-residents"},
      {c:"S0026", p:"Acquisition of immovable property abroad"}
    ]
  },
  process: [
    {n:1, title:"Open AD-I bank account", body:"Any savings account at an Authorised Dealer Category-I bank (ICICI, HDFC, SBI, Axis, etc.) qualifies."},
    {n:2, title:"Get a PAN + KYC fresh", body:"PAN is mandatory for any LRS remittance; KYC must be re-verified for first overseas remittance."},
    {n:3, title:"Open offshore brokerage account", body:"E.g., ICICI Direct → Interactive Brokers (referral); INDmoney, Vested, Stockal, IND Global, Groww are alternatives."},
    {n:4, title:"Submit W-8BEN + Form A2", body:"W-8BEN to your offshore broker (claims India-US DTAA dividend rate of 25%). Form A2 + LRS declaration to your bank for each remittance."},
    {n:5, title:"Remit USD via SWIFT", body:"Bank converts INR→USD at telegraphic rate (TT). Funds reach broker in 1–3 working days. SWIFT charge ~ ₹500–₹1500."},
    {n:6, title:"Buy stocks", body:"Place orders via your broker's app — supports limit, market, stop, fractional. Settlement T+1 in US."},
    {n:7, title:"Track & report", body:"Maintain trade-by-trade records (date, qty, USD price, INR equivalent). Disclose all holdings in Schedule FA at year-end."}
  ],
  permitted: [
    "Investment in equity shares of foreign-listed companies",
    "Investment in foreign-listed ETFs and mutual funds",
    "Investment in foreign-currency denominated bonds and debentures",
    "Acquisition of immovable property abroad (subject to host country FEMA equivalents)",
    "Setting up wholly-owned subsidiaries / JVs (with separate ODI window for amounts above LRS)",
    "Opening foreign currency accounts abroad with banks",
    "Gifts / donations to recognised organisations"
  ],
  prohibited: [
    "Margin trading or leveraged products on foreign exchanges",
    "Trading in foreign exchange (Forex) abroad",
    "Purchase of lottery tickets, sweepstakes, banned/proscribed magazines",
    "Remittance to countries identified by FATF as 'non-cooperative'",
    "Remittance to entities identified as posing terrorism financing risks",
    "Trading in Futures &amp; Options on foreign exchanges (RBI clarification, 2014)",
    "Speculative crypto trading (post Mar 2022 grey-area; banks largely refuse)"
  ],
  edge: [
    "<strong>Same-FY recall:</strong> If you remit USD 200K in May, sell stocks in October, repatriate USD 100K back — your remaining FY headroom is USD 50K (the rule looks at <em>net outflow</em>, not gross).",
    "<strong>Joint accounts:</strong> Two co-holders of a joint resident savings account can pool LRS limits only if both sign Form A2 and the underlying investment is jointly held.",
    "<strong>Returning NRI:</strong> The day you become 'Resident' under FEMA, your global brokerage holdings continue but new remittances are governed by LRS.",
    "<strong>HUF, partnership firms, LLPs, companies:</strong> NOT eligible for LRS. Only resident individuals.",
    "<strong>Minor's PAN:</strong> Required if any LRS remittance is in the minor's name.",
    "<strong>USD vs INR equivalent:</strong> The 250K cap is in USD. If USD/INR moves from 83 to 90, your INR ceiling effectively rises ~8.4%."
  ]
};

/* ---------- 03. GIFT CITY DEEP DIVE ---------- */
DOSSIER.gift = {
  what: `<strong>GIFT City</strong> (Gujarat International Finance Tec-City) is a 886-acre Special Economic Zone in Gandhinagar designated as India's first International Financial Services Centre (IFSC). It is regulated by a single unified regulator — <strong>IFSCA (International Financial Services Centres Authority)</strong>, established under the IFSCA Act, 2019, which subsumes the powers of RBI, SEBI, IRDAI and PFRDA inside the IFSC. For tax and FEMA purposes, GIFT IFSC is treated as a <em>deemed-foreign jurisdiction</em>, even though it sits geographically in India.`,
  whyGift: [
    {h:"Deemed-foreign", b:"Transactions inside GIFT IFSC are treated as offshore. You are technically remitting outside India, but the regulatory umbrella is Indian."},
    {h:"Single regulator", b:"IFSCA — no RBI/SEBI overlap, faster approvals, English law arbitration available."},
    {h:"USD-base currency", b:"All transactions denominated in foreign currency (USD/EUR/GBP/JPY). Hedges INR depreciation naturally."},
    {h:"Tax incentives", b:"Section 10(4D), 10(4E), 80LA — significant exemptions for IFSC funds and units, particularly for non-residents."},
    {h:"No STT, no CTT, no stamp duty", b:"Brings IFSC trade costs in line with Singapore/Hong Kong."},
    {h:"Indian time-zone, Indian regulator", b:"Easier dispute resolution, KYC convenience, no language barrier."}
  ],
  exchanges: [
    {
      name: "NSE IFSC",
      parent: "National Stock Exchange",
      mechanism: "Unsponsored Depository Receipts (UDRs)",
      coverage: "~50 large-cap US stocks (Apple, Microsoft, Alphabet, Amazon, NVIDIA, Tesla, Meta, Netflix, Walmart, Visa, Coca-Cola, JP Morgan, etc.)",
      ratio: "Fractional — e.g., 1 Amazon share = 200 NSE IFSC Receipts; 1 Apple share = 25 receipts (illustrative — exact ratios vary per stock and may change)",
      settlement: "T+3 in USD",
      orderTypes: "Limit, market, stop-loss",
      hours: "Aligned with US market — 8:00 PM to 2:30 AM IST",
      notes: "Custodian holds underlying US shares; investor holds DR which is economic equivalent. Dividends pass through (net of US 25% WHT)."
    },
    {
      name: "India INX (BSE IFSC) Global Access",
      parent: "Bombay Stock Exchange",
      mechanism: "Direct shares — order routed to overseas exchange",
      coverage: "135+ exchanges across 31 countries (NYSE, NASDAQ, LSE, Tokyo, Frankfurt, SGX, HKEX, Euronext, etc.)",
      ratio: "1:1 (you own the actual share)",
      settlement: "T+2 / T+3 in trade currency",
      orderTypes: "Limit, market, stop, GTC, OCO",
      hours: "Per origin exchange",
      notes: "INX GA acts as introducing broker; clears through partner brokers in each jurisdiction. Wider product universe (bonds, ETFs, derivatives where permitted)."
    }
  ],
  taxNuance: {
    headline: "The most misunderstood part of GIFT City",
    body: `Marketing material often claims "GIFT City = no capital gains tax." That is <strong>partially true</strong> and only for specific cases:`,
    cases: [
      {who: "Non-resident investors in 'specified IFSC funds'", what: "Section 10(4D) — capital gains, dividends, interest exempt", why: "Designed to attract offshore capital onshore."},
      {who: "Non-resident on bond/derivative trades on IFSC exchange", what: "Section 10(4E) — exemption", why: "Liquidity boost for IFSC product market."},
      {who: "IFSC unit's own income (the broker entity)", what: "Section 80LA — 100% deduction for any 10 of 15 years", why: "Tax holiday for IFSC business."},
      {who: "Resident Indian directly trading US stocks via NSE IFSC / INX GA", what: "<strong>NO special tax exemption</strong> — you pay 12.5% LTCG / slab STCG just like LRS direct route.", why: "Resident's worldwide income is taxable; IFSC trade is treated as foreign-asset trade for residents."}
    ],
    bottom: `For the resident retail investor, the GIFT City advantage is <em>not</em> a magic tax holiday. It is: (a) regulatory clarity, (b) USD denomination without CFDs, (c) no STT/stamp duty (saves ~0.1% per trade), (d) some products (USD bonds, structured notes) more accessible than via LRS, and (e) potentially better operational risk profile (shares held with Indian-regulated depository).`
  },
  funding: [
    "<strong>Resident individual:</strong> Funds GIFT City IFSC account using LRS — same USD 250,000/FY cap applies.",
    "<strong>NRI / OCI / PIO:</strong> Can fund from existing offshore funds; no LRS limit; no TCS.",
    "<strong>Indian corporate:</strong> Through ODI route under FEMA Overseas Investment Rules 2022; not LRS.",
    "Funding currency: USD (most common), EUR, GBP, JPY accepted.",
    "Once USD reaches your IFSC account, no further conversion needed for trades."
  ],
  edge: [
    "<strong>NRIs returning to India:</strong> May find GIFT City the cleanest route to maintain global exposure — funds remain USD, no INR conversion needed.",
    "<strong>USA/Canada NRIs:</strong> Often blocked from regular Indian mutual funds (FATCA/PFIC issues). GIFT City IFSC funds typically permit US/Canada NRIs.",
    "<strong>USD bond access:</strong> India INX lists USD-denominated Indian and global corporate bonds — alternative to direct US bond purchase via LRS.",
    "<strong>Holding US shares via GIFT vs direct:</strong> If shares are held in IFSC depository (UDRs), the situs analysis for US estate tax becomes nuanced — consult a US estate tax attorney; do not assume estate tax is avoided.",
    "<strong>Listing:</strong> ~125 brokers registered at NSE IFSC (incl. ICICI Direct, HDFC, Kotak, Motilal Oswal, Anand Rathi). Choose a broker with both BSE/INX and NSE-IFSC access for full coverage."
  ]
};

/* ---------- 04. ICICI DIRECT — TWO PATHWAYS ---------- */
DOSSIER.icici = {
  intro: `ICICI Direct (the brand name of ICICI Securities Ltd) is one of the largest full-service brokers in India and offers <strong>two distinct rails</strong> to invest in global stocks: the LRS-based Global Investment platform via a referral tie-up with Interactive Brokers (IBKR), and the GIFT City IFSC route via ICICI Bank's IFSC Banking Unit (IBU) and ICICI Securities' IFSC offering.`,
  pathways: [
    {
      title: "ICICI Direct Global Investment (LRS Route)",
      tag: "Most popular for retail",
      partner: "Interactive Brokers LLC (US-regulated, Nasdaq: IBKR, $560bn+ client equity)",
      structure: "ICICI Securities is a <strong>referral partner</strong>; the trading account is opened with Interactive Brokers in your name.",
      markets: ["United States (NYSE, NASDAQ, AMEX)","United Kingdom (LSE)","Germany (XETRA)","Japan (TSE)","Singapore (SGX)","Hong Kong (HKEX)"],
      products: ["Stocks (60,000+ across 6 markets)","ETFs","ADRs","Mutual funds (limited)","Options (where permitted under FEMA)","Fractional shares — invest as low as USD 1"],
      pricing: [
        {label:"Brokerage", value:"USD 0.0035/share (tiered) — capped 1% of trade value"},
        {label:"SEC fee (US sells only)", value:"USD 0.0000278 × proceeds (FY26 rate)"},
        {label:"FINRA TAF (US sells)", value:"USD 0.000166/share, max USD 8.30/trade (FY26)"},
        {label:"FX conversion", value:"IBKR spot ≤ USD 2 minimum, ~0.20bps spread"},
        {label:"Inactivity fee", value:"Nil (waived for ICICI Direct referrals)"},
        {label:"Account opening", value:"Nil"},
        {label:"Withdrawal", value:"1 free / month, then USD 10"}
      ],
      protection: "SIPC insurance up to USD 500,000 per account (USD 250,000 cash sub-limit) — protects against broker failure, NOT market loss.",
      kyc: "Online — PAN, Aadhaar, address proof, bank proof, signature, photo. W-8BEN auto-prefilled. Average TAT: 24–72 hours.",
      funding: "INR remittance via ICICI Bank under LRS → USD credited to IBKR within 2–3 days. ICICI charges TT margin ~50 paise on USD/INR.",
      pros: ["Largest stock universe in any Indian-broker offering","Institutional-grade execution (smart routing)","Margin & options where permitted","Mature mobile + desktop platforms (TWS, IBKR Mobile, Client Portal)"],
      cons: ["IBKR's interface has a learning curve","Customer support not always India-time-zone","Currency conversion required for every funding","TCS bite at funding (20% above ₹10L cumulative)"]
    },
    {
      title: "ICICI Direct via GIFT City IFSC",
      tag: "USD-native, regulated by IFSCA",
      partner: "ICICI Bank IFSC Banking Unit (IBU) at GIFT City + ICICI Securities IFSC + NSE IFSC / India INX",
      structure: "Open a USD-denominated savings account with ICICI Bank's IBU (no min balance for residents/NRIs), and a trading account with an IFSC-registered broker. ICICI is registered on both NSE IFSC and India INX.",
      markets: ["NSE IFSC: ~50 top US stocks (UDRs)","India INX Global Access: 135+ exchanges in 31 countries"],
      products: ["Unsponsored Depository Receipts on US blue chips","Direct foreign shares (via INX GA)","USD-denominated corporate bonds","Sovereign green bonds (GoI listed at IFSC)","IFSC Mutual Funds & AIFs","Structured notes"],
      pricing: [
        {label:"Brokerage (NSE IFSC)", value:"USD 0.01–0.10/UDR or flat USD 1.5–10/trade"},
        {label:"Brokerage (INX GA)", value:"~0.25%–0.50% of trade value, depends on exchange"},
        {label:"STT / CTT / Stamp duty", value:"<strong>ZERO</strong> — full IFSC exemption"},
        {label:"GST", value:"Nil on IFSC unit-to-IFSC client services"},
        {label:"Custody", value:"Bundled or USD 5–25/quarter"},
        {label:"FX (INR → USD funding)", value:"~0.4%–1.2% spread + LRS TCS if applicable"},
        {label:"Account opening", value:"Nil; some brokers charge USD 25–50"}
      ],
      protection: "Funds with IFSC Banking Unit are technically offshore deposits; not covered by DICGC (₹5L deposit insurance). Investor protection via IFSCA's investor protection regulations.",
      kyc: "Video-KYC + passport + Indian address proof + PAN + photo. NRIs can use OVD set + foreign address proof. TAT: 3–7 days.",
      funding: "Resident — LRS-funded USD wire from ICICI savings → ICICI IBU. NRI — direct USD wire from offshore accounts; no LRS limit.",
      pros: ["No STT/stamp/GST — ~10–20bps cost edge over offshore","India-time settlement ops, English-speaking support","NRIs (incl. US/Canada) can access without FATCA-MF blocks","USD funds stay USD — no repatriation churn","Regulatory clarity (IFSCA single-window)"],
      cons: ["Smaller universe than IBKR (especially derivatives)","UDRs trade in fractions, sometimes thin liquidity outside top 20 names","Resident still uses LRS for funding (TCS still bites)","Direct stock estate-tax exposure not eliminated"]
    }
  ],
  comparisonShort: [
    {row: "Setup time",       a: "1–3 days", b: "3–7 days"},
    {row: "Stock universe",   a: "60,000+ (6 markets)", b: "~50 US UDRs (NSE-IFSC) + 135 exchanges (INX GA)"},
    {row: "Min ticket",       a: "USD 1 (fractional)", b: "USD 1 (UDR fractional)"},
    {row: "Account currency", a: "Multi (USD/GBP/EUR/...)", b: "USD primary"},
    {row: "Costs ex-tax",     a: "Mid (IBKR)", b: "Lowest (no STT)"},
    {row: "Tax compliance",   a: "Schedule FA + CG", b: "Schedule FA + CG"},
    {row: "Custodian risk",   a: "Apex Clearing/IBKR US", b: "IFSC depository (NSDL-IFSC / CDSL-IFSC)"}
  ],
  contactPath: "ICICI Direct → 'Global Markets' tab → 'Open Global Account' (LRS/IBKR) or 'GIFT IFSC' → app-led KYC.",
  costWaterfall: {
    headline: "Cost waterfall — what does ₹10 lakh actually buy you?",
    sub: "Illustrative end-to-end on a ₹10,00,000 first-time LRS remittance for US stock investment via ICICI Direct/IBKR (FY25-26).",
    rows: [
      {step:"You remit",                        amt:"₹10,00,000",  cum:"₹10,00,000", n:"Within ₹10L threshold — TCS Nil."},
      {step:"SWIFT transfer charge",             amt:"−₹1,500",     cum:"₹9,98,500",  n:"ICICI Bank typical."},
      {step:"FX spread (~50 paise vs market)",   amt:"−₹5,800",     cum:"₹9,92,700",  n:"~0.58% on USD/INR conversion."},
      {step:"USD credited to IBKR",              amt:"$11,544",      cum:"$11,544",    n:"At assumed 86 USD/INR."},
      {step:"Buy 100 shares (avg $115/share)",   amt:"−$11,500",     cum:"$44 cash",   n:"Tiered IBKR brokerage ~$0.35 incl."},
      {step:"At year-end, dividend received",    amt:"+$200 gross",  cum:"$244",       n:"Apple ~0.5% yield illustration."},
      {step:"US WHT (25% via W-8BEN)",            amt:"−$50",         cum:"$194",       n:"Net dividend: $150."},
      {step:"After 30 months, sell at $200/sh",   amt:"+$20,000",    cum:"$20,194",    n:"USD/INR now 90 → ₹17,99,460 sale."},
      {step:"Capital gain (LTCG)",                amt:"₹7,99,460",   cum:"—",           n:"vs original ₹9,90,000 INR cost."},
      {step:"India LTCG @ 12.5%",                 amt:"−₹99,933",    cum:"—",           n:"No indexation post-Budget 2024."},
      {step:"Net to you (in INR)",                amt:"≈ ₹16,99,527","cum":"—",          n:"~70% INR-return on 30-month hold."}
    ]
  },
  startingChecklist: [
    "1. Confirm you have a PAN, valid passport, residential address proof in India",
    "2. Decide rail: LRS-IBKR (broad) vs GIFT-IFSC (USD-native, NRI-friendly) — or both",
    "3. Open ICICI Direct account if you don't have one (online, 24h)",
    "4. Apply for 'Global Investment' product → IBKR onboarding kicks off",
    "5. Submit W-8BEN (broker app prefills) — claim 25% DTAA dividend rate",
    "6. Make first LRS remittance ≤ ₹10L for the FY (no TCS on first slug)",
    "7. Buy your first US stock or ETF — start with VOO/QQQ/AAPL for liquidity",
    "8. Set calendar reminder: file ITR-2 / ITR-3 before 31 July, including Schedule FA",
    "9. Track every trade in an Excel: date, qty, USD price, FX rate, INR cost",
    "10. Year 3: renew W-8BEN. Year 25 (or any time): consider UCITS-ETF route to mitigate US estate tax."
  ]
};

/* ---------- 05. UNITED STATES — DEEP DIVE ---------- */
DOSSIER.us = {
  why: `The United States is roughly <strong>~58–62% of global equity market capitalisation</strong> (FTSE/S&amp;P data), houses 7 of the world's 10 most valuable companies, has the deepest options/derivatives liquidity, the strictest disclosure regime (SEC 10-K, 10-Q, 8-K), and the most mature ETF ecosystem (4,000+ ETFs). For Indian residents, US is the single largest destination of LRS investment outflows.`,
  exchanges: [
    {n: "NYSE",   d:"Old guard. Apple, Berkshire, JPM, Visa. Auction-driven.", url:"https://nyse.com"},
    {n: "NASDAQ", d:"Tech-heavy. Microsoft, NVIDIA, Alphabet, Meta. Electronic.", url:"https://nasdaq.com"},
    {n: "AMEX (NYSE American)", d:"Smaller caps & ETFs.", url:"https://nyse.com/markets/nyse-american"},
    {n: "OTC / Pink Sheets", d:"Generally NOT recommended for retail; thin liquidity; ICICI/IBKR may restrict.", url:"https://www.otcmarkets.com"}
  ],
  hours: {
    regular: "9:30 AM – 4:00 PM ET. In IST: <strong>7:00 PM – 1:30 AM</strong> when US is on Daylight Time (Mar–Nov); <strong>8:00 PM – 2:30 AM</strong> when US is on Standard Time (Nov–Mar)",
    pre: "Pre-market 4:00 AM ET — that's 1:30 PM IST (DST) / 2:30 PM IST (EST). Limited liquidity; often disabled for retail.",
    post: "After-hours 4:00 – 8:00 PM ET = 1:30 AM – 5:30 AM IST (DST) / 2:30 AM – 6:30 AM IST (EST)",
    note: "ICICI Direct/IBKR allows pre/post for most stocks (some restrictions). NSE IFSC mirrors the regular US session in IST hours."
  },
  instruments: [
    {t: "Common stock", d:"Direct ownership; voting rights; dividend eligibility. Apple, MSFT, etc."},
    {t: "Preferred stock", d:"Fixed dividend, no voting. Used by JPM, Wells Fargo for capital."},
    {t: "ADRs (American Depository Receipts)", d:"Foreign companies trading in US — TSMC, Infosys, HDFC Bank, Toyota. Sponsored (Levels 1/2/3) and unsponsored variants."},
    {t: "ETFs", d:"VOO (S&amp;P 500), QQQ (Nasdaq 100), SCHD (Dividend), VTI (Total Mkt). 0.03%–0.95% expense ratios. <em>PFIC concern for US persons; not for Indian residents.</em>"},
    {t: "REITs", d:"Real Estate Investment Trusts. Higher dividend (often 4–7%), but dividends NOT qualified — withheld at full 30% by default unless 25% via DTAA."},
    {t: "Mutual funds (US-domiciled)", d:"Generally not directly accessible to non-US investors. Use ETFs instead."},
    {t: "Options", d:"Permitted under LRS only as a hedge; speculative writing not permitted. F&amp;O on foreign exchanges is RBI-prohibited speculation. Most retail brokers restrict for Indian residents."},
    {t: "Bonds (Treasury, Corporate, Muni)", d:"Available via IBKR. Treasury direct access via TreasuryDirect.gov requires SSN — not feasible from India."},
    {t: "Closed-end funds, BDCs, MLPs", d:"Possible but tax-complex (K-1 forms for MLPs)."}
  ],
  taxAtSource: {
    headline: "How the US taxes you (an Indian resident, 'Non-Resident Alien' in IRS terms)",
    items: [
      {h: "Capital gains", v: "ZERO US tax", n: "US does not tax capital gains of non-resident aliens on stock sales (IRC § 871). You only pay India's 12.5% LTCG / slab STCG."},
      {h: "Dividends — qualified", v: "25% withheld at source", n: "Under India-US DTAA Article 10, with valid W-8BEN. Default 30% if W-8BEN not on file."},
      {h: "Dividends — REITs", v: "30% withheld (typical)", n: "REIT distributions often classified as 'income from US real property' — NOT covered by 25% DTAA rate."},
      {h: "Interest income", v: "0% on most portfolio interest", n: "IRC § 871(h) 'portfolio interest' exemption for NRA holders of US bonds."},
      {h: "Estate tax", v: "$60,000 threshold, up to 40%", n: "<strong>The landmine.</strong> If you die holding > USD 60,000 of 'US-situs assets' (= US-listed stocks held directly), your estate must file Form 706-NA. India has NO estate tax treaty with the US."},
      {h: "Gift tax (you giving US assets)", v: "Stocks: no US gift tax for NRAs", n: "Tangible US property and US real estate are subject to gift tax for NRAs."}
    ]
  },
  estateTax: {
    headline: "The US Estate Tax — the single largest blind-spot in global investing for Indians",
    body: "If you die holding US-situs assets above USD 60,000, your <em>executor</em> must file IRS Form 706-NA within 9 months. The first USD 60,000 is exempt; the remainder is taxed in graduated rates topping out at 40% above USD 1 million. There is <strong>no India-US estate tax treaty</strong> (unlike UK, France, Germany, Japan which have them). This applies <em>per individual decedent</em>, not joint.",
    whatIs: ["US-listed stocks (Apple, Microsoft, ETFs domiciled in US)", "US real estate", "US-issued corporate bonds (case-by-case)", "Cash in US bank accounts > USD 60K"],
    whatIsNot: ["ADRs of non-US companies (debatable; conservative view: still situs)", "Irish/UCITS-domiciled ETFs (e.g., CSPX on LSE) — NOT US situs", "Bank deposits with foreign branches of US banks", "Life insurance on the decedent's life"],
    mitigations: [
      "<strong>Hold via Irish UCITS ETFs:</strong> CSPX/VUAA (S&amp;P 500), VWRA (FTSE All-World) on LSE — same exposure, NO US estate tax. Trade-off: 0.07–0.22% TER instead of 0.03%.",
      "<strong>Hold via GIFT City UDRs:</strong> The depositary structure may break direct US situs (consult; not settled).",
      "<strong>Joint ownership:</strong> Joint tenancy with right of survivorship can defer/reduce estate tax for couples; documentation must be precise.",
      "<strong>Cap your US-direct exposure to USD 60K:</strong> Below threshold, no filing required.",
      "<strong>Holding company:</strong> Setting up a non-US company (BVI/Mauritius) to hold US stocks; complex, expensive, brings ODI compliance.",
      "<strong>Term life insurance:</strong> Cheap covering instrument — USD 1M term cover for ~USD 500–1,500/yr depending on age."
    ],
    callout: "Action: If your direct US holdings are nearing USD 60,000, weigh switching new buys to UCITS ETFs (LSE) or to GIFT-City UDRs. Discuss with both an Indian CA and a US estate-tax attorney before structuring."
  },
  w8ben: {
    what: "Form W-8BEN — Certificate of Foreign Status of Beneficial Owner — tells the US broker (and ultimately the IRS) that you are a non-US person and entitled to DTAA treaty rates.",
    fields: ["Name (as in passport)","Country of citizenship (India)","Permanent residence address (India)","Mailing address","Indian PAN as Foreign TIN","Date of birth","Treaty article: Article 10 (dividends) of India-US DTAA","Reduced rate claimed: 25%","Signature, date"],
    validity: "3 years from date of signing OR until any change in circumstance (e.g., relocation). Brokers prompt for renewal automatically.",
    consequences: "Without W-8BEN: 30% mandatory backup withholding on dividends + potentially also gross sale proceeds (FATCA Chapter 4)."
  },
  formsTimeline: [
    {form:"W-8BEN", who:"You → broker", when:"At account opening; renew every 3 years", purpose:"Claim 25% DTAA rate"},
    {form:"1042-S", who:"Broker → you", when:"By March 15 each year", purpose:"Reports US-source income & withholding for prior calendar year"},
    {form:"Form A2 + LRS declaration", who:"You → bank", when:"Every remittance", purpose:"FEMA compliance"},
    {form:"Schedule FA (ITR)", who:"You → ITD", when:"By July 31 of AY", purpose:"Disclose foreign assets"},
    {form:"Schedule FSI (ITR)", who:"You → ITD", when:"With ITR", purpose:"Foreign source income"},
    {form:"Form 67", who:"You → ITD", when:"On/before ITR filing", purpose:"Claim DTAA foreign tax credit"},
    {form:"Form 26AS / AIS", who:"ITD → you", when:"Anytime", purpose:"Reconcile TCS, dividend remittances flagged via SFT"}
  ],
  topPicks: {
    bluechips: [
      {sym:"AAPL",  n:"Apple Inc.",        s:"NASDAQ", note:"Consumer ecosystem moat, services revenue scaling."},
      {sym:"MSFT",  n:"Microsoft Corp.",   s:"NASDAQ", note:"Cloud (Azure), Office, OpenAI partnership."},
      {sym:"GOOGL", n:"Alphabet (Google)", s:"NASDAQ", note:"Search, YouTube, Cloud, Waymo. Class A vs C share split."},
      {sym:"AMZN",  n:"Amazon.com",        s:"NASDAQ", note:"E-commerce + AWS — both global leaders."},
      {sym:"NVDA",  n:"NVIDIA Corp.",      s:"NASDAQ", note:"AI compute leader; high beta."},
      {sym:"META",  n:"Meta Platforms",    s:"NASDAQ", note:"Family of apps; reality labs is optionality."},
      {sym:"TSLA",  n:"Tesla Inc.",        s:"NASDAQ", note:"EV + energy + robotics narrative."},
      {sym:"BRK.B", n:"Berkshire Hathaway B", s:"NYSE", note:"Buffett conglomerate; no dividend."},
      {sym:"JPM",   n:"JPMorgan Chase",    s:"NYSE",   note:"Largest US bank; dividend ~2.4%."},
      {sym:"V",     n:"Visa Inc.",         s:"NYSE",   note:"Network monopoly; FX upside."}
    ],
    etfs: [
      {sym:"VOO",  n:"Vanguard S&amp;P 500",     s:"NYSE", note:"0.03% TER — cheapest index in the world."},
      {sym:"QQQ",  n:"Invesco Nasdaq 100",     s:"NASDAQ", note:"Tech-heavy; 0.20% TER."},
      {sym:"VTI",  n:"Vanguard Total US",      s:"NYSE", note:"3,500+ stocks; 0.03% TER."},
      {sym:"SCHD", n:"Schwab Dividend",        s:"NYSE", note:"3.5% yield, quality screen."},
      {sym:"VXUS", n:"Vanguard ex-US",         s:"NASDAQ", note:"Diversifier outside US."}
    ],
    ucitsEstateSafe: [
      {sym:"CSPX",  n:"iShares Core S&amp;P 500 (Acc)", s:"LSE", note:"Irish-domiciled. No US estate tax, accumulating."},
      {sym:"VUAA",  n:"Vanguard S&amp;P 500 (Acc)",     s:"LSE", note:"0.07% TER, USD-denom."},
      {sym:"VWRA",  n:"Vanguard FTSE All-World (Acc)", s:"LSE", note:"All-world diversifier; 0.22% TER."},
      {sym:"EQQQ",  n:"Invesco Nasdaq 100 (LSE)",     s:"LSE", note:"Estate-safe Nasdaq exposure."}
    ]
  }
};

/* ---------- 06. WORLD MAP — COUNTRY DATA ---------- */
DOSSIER.countries = [
  {
    code:"US", name:"United States", lat:38.0, lng:-97.0, tier:"primary",
    exchanges:"NYSE, NASDAQ, AMEX",
    dividendWHT:"25% under DTAA (W-8BEN); 30% default",
    capGainsLocal:"0% for non-resident aliens (NRA)",
    estateTax:"<strong>YES — $60K threshold, 40% top.</strong> No India-US estate treaty.",
    dtaa:"Yes — comprehensive (Article 10 dividends 25%; Art 13 capital gains; Art 25 elimination of double tax)",
    accessLRS:"Yes — ICICI Direct/IBKR, Vested, INDmoney, Stockal, Groww",
    accessGIFT:"Yes — NSE IFSC UDRs (~50 stocks), India INX direct shares",
    notes:"Largest market. Estate tax is the main risk for direct holdings >$60K."
  },
  {
    code:"UK", name:"United Kingdom", lat:54.0, lng:-2.0, tier:"core",
    exchanges:"London Stock Exchange (LSE), AIM",
    dividendWHT:"0% on UK dividends (UK doesn't withhold on dividends to non-residents)",
    capGainsLocal:"0% for non-residents on shares (with carve-outs for UK property-rich companies)",
    estateTax:"<strong>YES — Inheritance Tax £325K nil-band, 40% above.</strong> But India-UK DTAA covers estate (proportional credit).",
    dtaa:"Yes — comprehensive India-UK DTAA",
    accessLRS:"Yes — IBKR (LSE), Saxo, Hargreaves Lansdown (some)",
    accessGIFT:"Yes — India INX Global Access routes to LSE",
    notes:"Excellent for Irish-UCITS ETFs (CSPX, VUAA) — estate-tax safe US exposure. Stamp Reserve Tax 0.5% on UK share buys."
  },
  {
    code:"IE", name:"Ireland (UCITS hub)", lat:53.4, lng:-8.0, tier:"core",
    exchanges:"Euronext Dublin",
    dividendWHT:"15% on Irish equities (rare for retail); UCITS funds: NIL withhold to investor by fund",
    capGainsLocal:"0% non-residents on Irish funds",
    estateTax:"Generally NO for foreign holders of Irish-domiciled UCITS",
    dtaa:"Yes — India-Ireland DTAA",
    accessLRS:"Yes — Most LSE-listed Irish UCITS available via IBKR/Saxo",
    accessGIFT:"Indirect — via INX GA's UK/EU partners",
    notes:"<strong>Critical for estate-tax-safe US exposure.</strong> Irish-domiciled UCITS ETFs sidestep the 30% US WHT reclaim issue (15% via US-IE treaty, then accumulated)."
  },
  {
    code:"DE", name:"Germany", lat:51.0, lng:10.0, tier:"core",
    exchanges:"XETRA, Frankfurt",
    dividendWHT:"26.375% (incl. solidarity surcharge); reclaim portion via DTAA possible",
    capGainsLocal:"0% for non-residents (no German cap-gains)",
    estateTax:"YES — Erbschaftsteuer applies to certain situs assets, treaty India-DE limited",
    dtaa:"Yes — Article 10 reduced dividend rate 10% (with conditions)",
    accessLRS:"Yes — IBKR XETRA, Saxo",
    accessGIFT:"Yes — INX GA",
    notes:"SAP, Siemens, Allianz, Deutsche Telekom. Reclaiming part of 26.375% WHT requires German tax form — operationally tedious."
  },
  {
    code:"JP", name:"Japan", lat:36.0, lng:138.0, tier:"core",
    exchanges:"Tokyo Stock Exchange (TSE), Osaka",
    dividendWHT:"15.315% (incl. reconstruction surtax) under India-Japan DTAA — default 20.42%",
    capGainsLocal:"0% for non-residents (with treaty)",
    estateTax:"YES — but India-JP DTAA limits & exempts some heirs",
    dtaa:"Yes — comprehensive",
    accessLRS:"Yes — IBKR Tokyo, ICICI Direct (TSE)",
    accessGIFT:"Yes — INX GA",
    notes:"Toyota, Sony, Keyence, SoftBank. Trades in JPY; settlement T+2."
  },
  {
    code:"SG", name:"Singapore", lat:1.35, lng:103.8, tier:"core",
    exchanges:"Singapore Exchange (SGX)",
    dividendWHT:"0% — Singapore does not withhold dividend tax",
    capGainsLocal:"0% — Singapore does not tax capital gains",
    estateTax:"None (abolished 2008)",
    dtaa:"Yes — India-Singapore DTAA (post-2017 protocol — capital gains taxable in India for shares acquired after 1-Apr-17)",
    accessLRS:"Yes — IBKR, ICICI Direct (SGX), Saxo",
    accessGIFT:"Yes — INX GA",
    notes:"Tax-friendly hub. DBS, OCBC, Singtel. Lot sizes are 100 shares typically."
  },
  {
    code:"HK", name:"Hong Kong", lat:22.3, lng:114.2, tier:"core",
    exchanges:"HKEX",
    dividendWHT:"0% — HK does not withhold dividends",
    capGainsLocal:"0% — HK no cap-gains tax",
    estateTax:"Abolished in 2006",
    dtaa:"Yes — India-HK DTAA (effective 2018)",
    accessLRS:"Yes — IBKR, ICICI Direct (HKEX)",
    accessGIFT:"Yes — INX GA",
    notes:"Gateway to China — Tencent, Alibaba HK-listed, AIA, HSBC. Stock Connect with Mainland."
  },
  {
    code:"CN", name:"China (Mainland)", lat:35.0, lng:104.0, tier:"limited",
    exchanges:"Shanghai (SSE), Shenzhen (SZSE)",
    dividendWHT:"10% under India-China DTAA",
    capGainsLocal:"10% (treaty rate) — though enforcement varies for QFII",
    estateTax:"Effectively none (no PRC estate tax)",
    dtaa:"Yes",
    accessLRS:"Limited — A-shares require QFII/Stock Connect (not retail-friendly). H-shares via HKEX easy.",
    accessGIFT:"Indirect via HK",
    notes:"For retail Indian investor: access primarily via HK-listed Chinese companies or US-listed ADRs (BABA, JD, PDD)."
  },
  {
    code:"CA", name:"Canada", lat:60.0, lng:-95.0, tier:"core",
    exchanges:"Toronto Stock Exchange (TSX), TSXV",
    dividendWHT:"15% under India-Canada DTAA",
    capGainsLocal:"0% non-resident (with most stock classes)",
    estateTax:"None as estate tax — but 'deemed disposition at death' triggers cap-gains (different concept)",
    dtaa:"Yes — comprehensive",
    accessLRS:"Yes — IBKR (TSX); some restriction on USD pairs",
    accessGIFT:"Yes — INX GA",
    notes:"Shopify, RBC, Enbridge, Suncor. CAD currency exposure."
  },
  {
    code:"AU", name:"Australia", lat:-25.0, lng:135.0, tier:"core",
    exchanges:"Australian Securities Exchange (ASX)",
    dividendWHT:"15% under India-Australia DTAA on unfranked; 0% on fully franked dividends",
    capGainsLocal:"Generally 0% for non-resident on listed shares (excl. 'taxable Australian property')",
    estateTax:"None (abolished 1979) — but capital gains 'deemed disposal' rules at death",
    dtaa:"Yes",
    accessLRS:"Yes — IBKR (ASX)",
    accessGIFT:"Yes — INX GA",
    notes:"BHP, CBA, CSL, Woolworths. Commodity-linked market."
  },
  {
    code:"FR", name:"France", lat:46.0, lng:2.0, tier:"core",
    exchanges:"Euronext Paris",
    dividendWHT:"10% under India-France DTAA (default 12.8% domestic)",
    capGainsLocal:"0% non-resident on listed shares",
    estateTax:"YES — France droits de succession, 5%–60% rates depending on relationship; India-France DTAA does NOT cover estate. <strong>Risk for direct French holdings.</strong>",
    dtaa:"Yes — for income tax",
    accessLRS:"Yes — IBKR (Euronext Paris)",
    accessGIFT:"Yes — INX GA",
    notes:"LVMH, L'Oréal, Total Energies, Sanofi."
  },
  {
    code:"NL", name:"Netherlands", lat:52.1, lng:5.3, tier:"core",
    exchanges:"Euronext Amsterdam",
    dividendWHT:"10% under India-Netherlands DTAA (15% default)",
    capGainsLocal:"0% non-resident on portfolio holdings",
    estateTax:"YES — succession tax, but India-NL DTAA does not cover. Limited inheritance net.",
    dtaa:"Yes — comprehensive",
    accessLRS:"Yes — IBKR",
    accessGIFT:"Yes — INX GA",
    notes:"ASML, Shell (now London/Amsterdam), Heineken, Adyen."
  },
  {
    code:"CH", name:"Switzerland", lat:46.8, lng:8.2, tier:"core",
    exchanges:"SIX Swiss Exchange",
    dividendWHT:"10% under India-CH DTAA (35% default — reclaim possible)",
    capGainsLocal:"0% non-resident",
    estateTax:"Cantonal — varies; mostly low for non-residents",
    dtaa:"Yes — comprehensive",
    accessLRS:"Yes — IBKR (SIX)",
    accessGIFT:"Yes — INX GA",
    notes:"Nestlé, Roche, Novartis, ABB, UBS. <em>Reclaiming the 25% over-withheld portion requires Swiss form 86 — cumbersome.</em>"
  },
  {
    code:"AE", name:"UAE (DIFC/ADGM/DFM)", lat:24.0, lng:54.0, tier:"core",
    exchanges:"DFM, ADX, NASDAQ Dubai",
    dividendWHT:"0% — UAE no withholding",
    capGainsLocal:"0% — no UAE cap-gains for individuals",
    estateTax:"None",
    dtaa:"Yes — India-UAE DTAA",
    accessLRS:"Limited — fewer brokers; IBKR has DFM/ADX",
    accessGIFT:"Yes — INX GA includes ADX/DFM",
    notes:"Emaar, Etisalat, FAB. Smaller market; primarily dividend-yield play. Note recent UAE corporate tax (9%) does NOT apply to individuals' securities."
  },
  {
    code:"BR", name:"Brazil", lat:-14.0, lng:-51.9, tier:"limited",
    exchanges:"B3 (São Paulo)",
    dividendWHT:"0% on dividends (Brazil exempts dividends domestically) — but JCP (interest on capital) 15%",
    capGainsLocal:"15%–22.5% for non-residents on listed shares",
    estateTax:"State-level ITCMD 4%–8%; potentially applies to non-residents",
    dtaa:"Yes — India-Brazil DTAA",
    accessLRS:"Limited — most retail brokers don't directly route. ADRs (Petrobras, Itau, Vale) on NYSE simpler.",
    accessGIFT:"Indirect",
    notes:"BRL-USD volatility is significant. Prefer ADRs."
  },
  {
    code:"KR", name:"South Korea", lat:37.5, lng:127.5, tier:"core",
    exchanges:"KRX (Korea Exchange)",
    dividendWHT:"15% under India-Korea DTAA (default 22%)",
    capGainsLocal:"Generally 0% for non-residents <25% holding (treaty)",
    estateTax:"YES — heavy (10%–50%); but limited reach to non-residents on listed shares",
    dtaa:"Yes",
    accessLRS:"Limited — IBKR has KRX (some restrictions); ADRs (Samsung GDR on LSE) easier.",
    accessGIFT:"Yes via INX GA",
    notes:"Samsung, SK Hynix, LG. Won is volatile."
  },
  {
    code:"TW", name:"Taiwan", lat:23.7, lng:121.0, tier:"limited",
    exchanges:"TWSE",
    dividendWHT:"21% domestic; India-TW DTAA reduces to 12.5%",
    capGainsLocal:"Generally 0% non-resident",
    estateTax:"YES — 10–20% — applies to TW situs assets",
    dtaa:"Yes — India-Taiwan DTAA",
    accessLRS:"Limited",
    accessGIFT:"Indirect",
    notes:"TSMC ADR on NYSE is the easier route. Direct TWSE access scarce."
  },
  {
    code:"IN-IFSC", name:"GIFT City IFSC (deemed-foreign)", lat:23.16, lng:72.68, tier:"primary",
    exchanges:"NSE IFSC, India INX",
    dividendWHT:"Pass-through from underlying jurisdiction (e.g., 25% US)",
    capGainsLocal:"Resident: same as LRS direct (12.5% LTCG). Non-resident: Sec 10(4D) exemptions for specified funds.",
    estateTax:"India has no estate tax; but underlying foreign-situs analysis applies",
    dtaa:"India is the home; treaties apply to underlying source country",
    accessLRS:"YES — Resident funds via LRS to IFSC banking unit; NRI no LRS",
    accessGIFT:"Native",
    notes:"India's deemed-foreign onshore — central node of this dossier."
  }
];

/* ---------- 07. INDIAN TAXATION & COMPLIANCE ---------- */
DOSSIER.tax = {
  intro: `For an Indian <em>Resident & Ordinarily Resident</em> (ROR), worldwide income and worldwide assets are taxable / disclosable. The Income-tax Act 1961, Black Money (Undisclosed Foreign Income & Assets) Act 2015, and FEMA all apply. Below is the structural map.`,
  capitalGains: {
    headline: "Capital gains on foreign-listed shares (post Budget 2024, eff. 23-Jul-2024)",
    rules: [
      {h:"Holding period for LTCG", v:">24 months",        n:"Counted from purchase date to sale date."},
      {h:"LTCG rate",                v:"12.5% flat",       n:"<strong>No indexation</strong> after 23-Jul-2024."},
      {h:"STCG rate",                v:"Slab rate",        n:"Added to your total income; up to 30% (+ surcharge + cess)."},
      {h:"Section 112A",             v:"NOT applicable",    n:"112A (10% LTCG with ₹1L exemption) applies only to STT-paid Indian shares, not foreign."},
      {h:"Currency",                 v:"INR equivalent",    n:"Convert USD purchase to INR using SBI TT buy rate on date of purchase; sale at TT buy rate on sale date."},
      {h:"Forex gain/loss",          v:"Embedded in CG",    n:"Don't double count — the INR gain captures both stock-price and FX moves."},
      {h:"Set-off / carry-forward",  v:"As per CG rules",   n:"LTCL can offset LTCG; STCL can offset both STCG and LTCG; carry forward 8 years."}
    ],
    transition: "If purchased before 23-Jul-2024 but sold after: LTCG at 12.5% (no indexation) — taxpayer may NOT opt for old 20%-with-indexation regime for foreign shares (that option exists for land/buildings only)."
  },
  dividends: {
    headline: "Foreign dividends",
    rules: [
      {h:"Tax in India",          v:"Slab rate (added to total income)", n:"No special rate for foreign dividends post-DDT abolition in FY21."},
      {h:"US dividend received",  v:"$75 net of $25 WHT (per $100 declared)", n:"Declare full $100 as INR equivalent; claim $25 as foreign tax credit."},
      {h:"Foreign Tax Credit",    v:"Lower of (a) tax payable in India on that income (b) tax actually paid abroad", n:"Form 67 must be filed BEFORE ITR; failure to file Form 67 within due date = FTC denial."},
      {h:"Conversion to INR",     v:"SBI TT buy rate on date of receipt", n:"Income recognised on receipt or accrual, whichever earlier."}
    ]
  },
  scheduleFA: {
    headline: "Schedule FA — the disclosure that matters",
    who: "Mandatory for every Resident & Ordinarily Resident (ROR) holding ANY foreign asset at any time during the calendar year (Jan–Dec, NOT Apr–Mar).",
    forms: ["ITR-2 — for individuals with foreign assets/income (no biz)", "ITR-3 — for individuals with biz/profession + foreign assets", "ITR-1 / ITR-4 do NOT have Schedule FA — using these = misreporting"],
    items: [
      "A1 — Foreign depository accounts (brokerage cash)",
      "A2 — Foreign custodial accounts (your stock holdings)",
      "A3 — Foreign equity & debt interest",
      "A4 — Foreign cash value insurance / annuity contracts",
      "B — Financial interest in any entity outside India",
      "C — Immovable property abroad",
      "D — Other capital assets",
      "E — Trustee/beneficiary of foreign trust",
      "F — Other income from any source outside India",
      "G — Signing authority on foreign accounts (even without ownership)"
    ],
    fields: ["Country","Name & address of bank/entity","Account opening date","Peak balance during the year","Closing balance","Gross interest/dividend/sale","Tax paid abroad"],
    period: "Calendar year — NOT financial year. So for AY 2025-26 ITR (FY 2024-25), you report holdings during 1-Jan-2024 to 31-Dec-2024.",
    valuation: "Closing balance at year-end + peak balance during the year, both in INR using SBI TT buy rate on respective dates."
  },
  blackMoney: {
    headline: "Black Money Act 2015 — the nuclear option",
    body: "If you fail to disclose a foreign asset (or under-disclose) in Schedule FA, the asset can be retrospectively taxed at <strong>30% + 90% penalty = 120% effective tax</strong>, plus prosecution (rigorous imprisonment 3–10 years).",
    penalties: [
      {h:"Non-disclosure (annual)", v:"₹10,00,000 per year per asset", n:"Effective from year of default."},
      {h:"Tax + penalty on undisclosed asset", v:"30% tax + 90% penalty", n:"Black Money Act § 41-43."},
      {h:"Prosecution", v:"Rigorous imprisonment 3–10 years", n:"Wilful evasion."},
      {h:"Threshold relief (eff. 1-Oct-2024)", v:"₹20 lakh exemption", n:"Excludes immovable property; if total non-disclosed asset (excl. property) < ₹20L in aggregate, the ₹10L penalty under § 42/43 does not apply (taxes/prosecution may still apply if income hidden)."}
    ],
    bestPractice: "Keep contemporaneous records: trade contract notes, dividend statements, broker year-end (1042-S equivalent), bank statements, FX rate sources. CA-led ITR review for any year you held foreign assets."
  },
  forms: [
    {n:"Form 67", what:"Statement of foreign tax credit claim", when:"Before/with ITR (extended due date covers it post-2022 amendment)", purpose:"Mandatory to claim foreign tax (e.g., $25 US WHT) credit"},
    {n:"Form 26AS", what:"Tax deducted/collected statement", when:"Year-round", purpose:"Verify TCS on LRS appears here; reconcile"},
    {n:"AIS / TIS", what:"Annual Information Statement", when:"Year-round", purpose:"Outward remittances (LRS) reported by banks via SFT — visible to ITD"},
    {n:"FLA Return (RBI)", what:"Foreign Liabilities & Assets", when:"By July 15 of next FY", purpose:"Required if you hold equity/units of foreign companies — typical retail investor often skips; technically applicable to entities mostly"},
    {n:"Form 15CA/15CB", what:"Declaration on remittance", when:"At remittance", purpose:"Generally NOT applicable to LRS for permitted purposes; bank handles via Form A2"},
    {n:"Schedule FSI", what:"Foreign source income detail", when:"In ITR", purpose:"Country-wise income & tax credit"},
    {n:"Schedule TR", what:"Tax relief summary", when:"In ITR", purpose:"Roll-up of FTC across countries"}
  ],
  fy_calendar: [
    {month:"April",      task:"FY begins. New LRS USD 250K cap kicks in. Plan remittances."},
    {month:"July 15",    task:"FLA Return (if applicable)."},
    {month:"July 31",    task:"ITR due date (individuals not subject to audit). Schedule FA mandatory."},
    {month:"Sept–Dec",   task:"Belated/revised return window; pay self-assessment tax incl. CG."},
    {month:"Dec 31",     task:"Calendar year ends — Schedule FA window closes."},
    {month:"March 31",   task:"FY ends. TCS reconciliation for the year (Form 26AS)."}
  ]
};

/* ---------- 08. RISKS & EDGE CASES ---------- */
DOSSIER.risks = [
  {
    cat:"Currency Risk",
    severity:"high",
    body:"Your INR returns = stock return × FX move. USD/INR has depreciated ~3% CAGR over 20 years; tailwind for global investors. But periods of INR appreciation (e.g., 2007, 2017) eroded gains. If USD/INR falls from 90 to 80, a flat US portfolio loses 11% in INR terms.",
    mitigation:"Geographic diversification, multi-currency portfolio, tactical hedging via forwards (institutional only), or accept the long-term INR-depreciation thesis."
  },
  {
    cat:"US Estate Tax Exposure",
    severity:"critical",
    body:"NRA threshold $60K; rate up to 40%; no India-US estate treaty. A USD 500K Apple holding with a sudden death event = roughly USD 176K estate tax bill. Surviving family must file Form 706-NA within 9 months. <strong>The single most underdiscussed risk in Indian global investing.</strong>",
    mitigation:"Switch new buys to Irish-domiciled UCITS ETFs (CSPX/VUAA), use GIFT-City UDR structure for incremental exposure, cap direct US holdings at $60K, hold via foreign holdco (complex, expensive), or buy term life insurance for the estate-tax amount."
  },
  {
    cat:"Compliance Risk — Schedule FA",
    severity:"critical",
    body:"₹10 lakh penalty per year per asset for non-disclosure under Black Money Act. Even a forgotten dormant brokerage account triggers it. Threshold relief only applies if aggregate non-disclosed assets < ₹20L AND only against the ₹10L penalty (not against tax/prosecution).",
    mitigation:"Always file ITR-2 or ITR-3 if ROR; itemise every foreign asset; reconcile with broker year-end statement; engage a CA familiar with Schedule FA."
  },
  {
    cat:"FEMA / LRS Breach",
    severity:"high",
    body:"Exceeding USD 250K (across multiple banks) is an FEMA contravention — penalty up to 3× sum involved. Using LRS funds for prohibited purposes (margin, F&O, FX trading) attracts compounding under FEMA § 13.",
    mitigation:"Track cumulative LRS across all banks; never use LRS funds for derivatives/margin; declare in advance to bank for any large remittance."
  },
  {
    cat:"Custodial / Broker Failure",
    severity:"medium",
    body:"While SIPC ($500K) and FSCS (£85K UK) protect against broker insolvency, theft, fraud — they do NOT protect against market loss or 'broker holding excess of insurance limits'. ICICI Direct → IBKR has IBKR's strong balance sheet ($14bn+ excess regulatory capital).",
    mitigation:"Diversify brokers above protection limits; verify broker's regulatory standing; opt for cash sweep into bank deposits (FDIC-insured) where available."
  },
  {
    cat:"Geopolitical / Sanctions",
    severity:"medium",
    body:"OFAC sanctions, executive orders restricting Indian access (rare for retail; cf. Russia 2022 froze investor accounts), or Indian counter-sanctions making certain markets off-limits. Cyprus, Russia, certain banks have been impacted historically.",
    mitigation:"Avoid concentration in any single jurisdiction; favour Tier-1 markets (US, UK, EU, JP, AU); monitor RBI master directions for jurisdiction restrictions."
  },
  {
    cat:"Regulatory Drift (India)",
    severity:"medium",
    body:"TCS rates have changed 3 times since 2020 (5%→20%→threshold up). LTCG regime changed in 2024. RBI's LRS purpose codes have tightened. Future risk: RBI restricting LRS for equity, raising TCS further, or limiting GIFT funding routes.",
    mitigation:"Don't optimise for short-term tax positioning; build process robust to rate changes; engage CA every Budget."
  },
  {
    cat:"Dividend Reclaim Friction",
    severity:"low",
    body:"In Switzerland (35% default WHT vs 10% treaty), Germany (26.375% vs 10%), parts of EU — reclaiming over-withheld dividend tax requires forms in foreign language, sometimes notarised, takes 6–24 months. Operationally, many retail investors leave reclaim on the table.",
    mitigation:"Prefer markets with treaty WHT applied at source (US 25% via W-8BEN, UK 0%, SG 0%, HK 0%); use 'relief at source' brokers; hire reclaim service for >USD 1K p.a. dividend."
  },
  {
    cat:"Liquidity & Bid-Ask",
    severity:"medium",
    body:"Outside top-100 stocks in any market, bid-ask spreads can be 50–200bps. In NSE IFSC UDRs outside top names, daily volumes may be very low. Exit liquidity in tail names = real cost.",
    mitigation:"Stick to large/mid-cap names; check 30-day average volume before initiating; use limit orders not market."
  },
  {
    cat:"PFIC / FATCA Trap (returning NRIs from US)",
    severity:"medium",
    body:"If you become a US tax resident (green card / substantial presence), Indian mutual funds suddenly become PFICs taxed punitively. Direct stocks remain fine. Schedule FA disclosure becomes US Form 8938.",
    mitigation:"Pre-emigration planning with cross-border CA; sell Indian MFs before US tax residency; switch to direct stocks or ETFs."
  },
  {
    cat:"FX Spread on Funding",
    severity:"low",
    body:"INR→USD telegraphic transfer at ICICI/HDFC carries ~50–100 paise spread + flat ₹500–1500 SWIFT charge. On a ₹10L remittance, ~₹500–1000 visible cost; on ₹1L, friction is more material (~1.5%).",
    mitigation:"Batch remittances quarterly rather than monthly; negotiate spread for >₹25L tickets; compare with INDmoney/Stockal partner banks."
  },
  {
    cat:"Tax-Reporting Mismatch",
    severity:"medium",
    body:"Broker reports on calendar year (Jan–Dec, US 1042-S); India tax year is Apr–Mar. Reconciling cap gains, dividends, FX rates across this mismatch is the #1 compliance error.",
    mitigation:"Maintain trade-by-trade Excel tracker (date, qty, INR cost, INR sale, FX rate); use software (Quicko, ClearTax foreign module); CA review."
  }
];

/* ---------- 09. CALCULATORS — config & defaults ---------- */
DOSSIER.calc = {
  lrs: {
    title: "LRS Budget Tracker",
    sub: "How much headroom do I have left this FY?"
  },
  tcs: {
    title: "TCS Estimator (FY25-26)",
    sub: "What TCS will my bank collect on this remittance?"
  },
  cg: {
    title: "Capital Gains Tax (Foreign Stocks)",
    sub: "Long-term vs Short-term, post Budget 2024 regime."
  },
  div: {
    title: "Dividend WHT & DTAA Credit",
    sub: "Net cash to your hand after US 25% withhold + India top-up."
  },
  estate: {
    title: "US Estate Tax Exposure",
    sub: "Liability if you died holding $X of US-situs assets."
  }
};

/* ---------- 10. FAQ — categories ---------- */
DOSSIER.faqCats = [
  {id:"all",     label:"All"},
  {id:"basics",  label:"Basics"},
  {id:"lrs",     label:"LRS"},
  {id:"gift",    label:"GIFT City"},
  {id:"icici",   label:"ICICI Direct"},
  {id:"us",      label:"US Market"},
  {id:"tax",     label:"Taxation"},
  {id:"compl",   label:"Compliance"},
  {id:"risk",    label:"Risk"},
  {id:"nri",     label:"NRI / Special"}
];

DOSSIER.faq = [
  {c:"basics", q:"What does 'direct' investment in foreign stocks mean?",
   a:"You become the registered owner of the foreign share — your name (or your nominee structure) appears on the depository books. Contrast with indirect routes like Indian fund-of-funds or international ETFs listed on NSE, where you own units of an Indian fund that owns the foreign asset."},
  {c:"basics", q:"Are there only two ways to invest directly?",
   a:"Yes — for an Indian resident retail investor: (1) the LRS route (your INR → bank → foreign broker), and (2) the GIFT City IFSC route (your INR via LRS → IFSC banking unit → IFSC broker → IFSC exchange UDR/global access)."},
  {c:"basics", q:"What is the minimum amount I need to start?",
   a:"With fractional shares (ICICI Direct/IBKR, Vested, INDmoney), as low as USD 1. Practically, factor in SWIFT charges (~₹500–1500), so first remittance of USD 500–1000 is sensible."},
  {c:"basics", q:"Can I buy fractional shares of Berkshire Hathaway A (BRK.A)?",
   a:"Yes — most retail brokers (IBKR, Vested) support fractional shares. A whole BRK.A is ~$700K; you can buy $100 worth and own a tiny fraction."},
  {c:"lrs",    q:"What is the LRS limit and is it per individual or per family?",
   a:"USD 250,000 per individual per financial year (Apr–Mar). A family of four = USD 1M of capacity. Minors have their own limit (used through guardian)."},
  {c:"lrs",    q:"Can I split LRS remittances across multiple banks?",
   a:"You can, but the cumulative aggregate across all banks must stay within USD 250K. Banks share LRS data to a central RBI database — over-remittance gets flagged."},
  {c:"lrs",    q:"Does TCS reduce my actual investable amount?",
   a:"No — TCS is collected as <em>extra</em> over your remittance and credited to your tax account. If you remit ₹15L for investment, bank deducts 20% of (₹15L − ₹10L) = ₹1L as TCS. You pay ₹16L total; ₹15L goes abroad. The ₹1L is creditable in ITR."},
  {c:"lrs",    q:"When does TCS at 20% kick in?",
   a:"On the portion of your cumulative LRS remittances that exceeds ₹10 lakh in a financial year (effective 1-Apr-2025). The first ₹10L is TCS-free for investment; everything above is at 20% (5% for self-funded education, 0% for loan-funded education)."},
  {c:"lrs",    q:"Can I use LRS for cryptocurrency?",
   a:"Effectively no. RBI has not permitted LRS for crypto purchase abroad. Banks routinely refuse Form A2 for crypto purposes. Stick to listed equities, ETFs, bonds, mutual funds."},
  {c:"lrs",    q:"Can I trade options or futures abroad with LRS funds?",
   a:"No. RBI clarified in 2014 that derivative trading on overseas exchanges by individuals is NOT a permitted LRS purpose. Some brokers may technically allow you to enable options — but you would be in breach of FEMA. Hedging existing exposure has narrow exceptions."},
  {c:"lrs",    q:"What happens if I sell my US stocks — can I bring money back, and does it affect the LRS limit?",
   a:"Yes, you can repatriate anytime through the same banking channel. The repatriated amount does NOT 'restore' your LRS limit — the cap is on outflows during the FY, not net flows. So if you've used up USD 250K, you can't re-remit even if you've brought USD 100K back."},
  {c:"lrs",    q:"Do unused LRS limits carry forward to next year?",
   a:"No. The cap resets every April 1. Any unused USD 250K is forfeited."},
  {c:"lrs",    q:"Can my Indian company invest abroad using LRS?",
   a:"No — LRS is only for resident individuals. Companies, LLPs, partnership firms use the Overseas Direct Investment (ODI) window under FEMA Overseas Investment Rules 2022 (different cap, different process)."},
  {c:"lrs",    q:"I am a senior citizen / housewife / student. Can I use LRS?",
   a:"Yes — any resident individual with a PAN can use LRS, regardless of income source. Source of funds, however, must be legal and traceable (banks may ask)."},
  {c:"gift",   q:"Is GIFT City actually offshore?",
   a:"Geographically inside Gujarat, but for FEMA + tax purposes it is a 'deemed-foreign jurisdiction' — IFSCA-regulated, USD-denominated, and outside SEBI's regular ambit. Think of it as 'Singapore inside India'."},
  {c:"gift",   q:"Do I still need LRS to fund my GIFT City account?",
   a:"If you're a <strong>Resident Indian</strong>: yes — LRS USD 250K cap and TCS apply when you fund USD into your IFSC banking unit account. If you're an <strong>NRI/OCI</strong>: no LRS — fund directly from existing offshore accounts."},
  {c:"gift",   q:"Is GIFT City completely tax-free?",
   a:"No. The 'tax-free' marketing applies to (a) IFSC entities themselves (Section 80LA), (b) specified non-resident investors in IFSC-registered funds (Section 10(4D)), and (c) bond/derivative trades by non-residents (Section 10(4E)). For a Resident directly trading US UDRs on NSE IFSC, capital gains tax is the same as direct LRS — 12.5% LTCG / slab STCG."},
  {c:"gift",   q:"What's the difference between NSE IFSC and India INX?",
   a:"NSE IFSC offers <em>Unsponsored Depository Receipts</em> on ~50 US large-cap stocks (you own a fractional DR backed by underlying US share). India INX Global Access offers <em>direct shares</em> across 135+ exchanges in 31 countries via partner brokers. NSE-IFSC is simpler/cheaper for top US stocks; INX-GA is broader but has more friction."},
  {c:"gift",   q:"Why would I pick GIFT City over LRS direct?",
   a:"Reasons: (1) USD-denominated all the way — no FX conversion churn each remit; (2) zero STT/stamp duty/GST; (3) NRIs can access without FATCA/PFIC blocks; (4) Indian-time zone customer support; (5) USD bond access is materially better; (6) potentially mitigated US estate tax exposure for UDR-held shares (consult)."},
  {c:"icici",  q:"Is ICICI Direct's Global Investment account opened with ICICI or with Interactive Brokers?",
   a:"With Interactive Brokers (IBKR) in your name. ICICI Securities is a referral partner — it markets and onboards, but the actual brokerage account, custody, and SIPC protection sit with IBKR."},
  {c:"icici",  q:"What is SIPC and what does it cover?",
   a:"Securities Investor Protection Corporation — a non-profit, member-funded body that protects securities customers of US brokers from broker insolvency / theft, up to USD 500,000 per account (with USD 250K cash sub-limit). It does NOT protect against market loss."},
  {c:"icici",  q:"What does ICICI Direct charge for US stock trades?",
   a:"Through the IBKR rail: ~USD 0.0035/share (tiered, capped at 1% of trade value) plus US regulatory fees (SEC/FINRA on sells). For a 10-share buy at USD 200, brokerage ≈ USD 0.04. Plus FX (~50 paise on USD/INR) and bank SWIFT charge per remittance."},
  {c:"icici",  q:"Can I open both — LRS Global account + ICICI GIFT City account?",
   a:"Yes. Many sophisticated clients run both: LRS-IBKR for breadth (60K+ stocks, options, bonds) and GIFT-IFSC for cost-sensitive USD-denominated trades. Both feed into the same Schedule FA disclosure."},
  {c:"icici",  q:"Does ICICI Direct give me a dedicated Relationship Manager for global investing?",
   a:"For HNI/Wealth tier clients (typically ₹50L+ AUM), yes. For retail self-service tier, support is via app chat, email, and toll-free; documentation is comprehensive on the ICICI Direct portal."},
  {c:"us",     q:"How is dividend tax computed on my Apple shares?",
   a:"Apple declares $1 dividend. US withholds 25% under DTAA (with W-8BEN) — you receive $0.75 in your IBKR account. In your Indian ITR, you declare full $1 (in INR at TT rate of receipt date) as 'Income from Other Sources', taxed at slab rate. You then claim the $0.25 (INR equivalent) as Foreign Tax Credit under Section 90 / Form 67. Net effect: you pay either Indian slab tax minus US 25% (if slab > 25%) or zero additional Indian tax (if slab ≤ 25%)."},
  {c:"us",     q:"Do I pay US capital gains tax when I sell Apple?",
   a:"No. Non-resident aliens (NRAs) — including Indian residents — are NOT subject to US capital gains tax on stock sales (IRC § 871(a)). You only pay India's 12.5% LTCG (>24m hold) or slab STCG. This is the upside of being a foreign investor in US."},
  {c:"us",     q:"What is the US estate tax and does it really apply to me?",
   a:"YES, if you hold US-situs assets (US-listed shares directly) above USD 60,000 at death. Your estate must file Form 706-NA within 9 months. Tax up to 40% on the excess. India and the US do NOT have an estate tax treaty, so no offsetting credit. This is the largest single risk in direct US investing."},
  {c:"us",     q:"How can I avoid US estate tax exposure?",
   a:"Options: (1) Hold via Irish-domiciled UCITS ETFs (CSPX, VUAA, VWRA on LSE) — same exposure, NOT US situs; (2) Cap direct US holdings at $60K; (3) Hold via GIFT City UDRs (potentially mitigates — consult specialist); (4) Use a non-US holding company (BVI/Mauritius — expensive and triggers ODI rules); (5) Term life insurance to cover the estate-tax bill."},
  {c:"us",     q:"What's a W-8BEN and how often do I file it?",
   a:"Form W-8BEN tells the US broker (and IRS) that you're a non-US person entitled to DTAA benefits. Without it: 30% withholding on dividends. With it: 25% (US-India treaty rate). Valid 3 years; auto-prompted by your broker for renewal."},
  {c:"tax",    q:"What is the LTCG rate on foreign stocks?",
   a:"12.5% flat (no indexation), if held >24 months. Effective from 23-Jul-2024 (Budget 2024). Earlier the rate was 20% with indexation."},
  {c:"tax",    q:"What is STCG on foreign stocks?",
   a:"Added to your total income and taxed at slab rates (up to 30% + surcharge + cess). Holding period ≤24 months."},
  {c:"tax",    q:"Can I claim Section 80C / 80D deductions against foreign stock gains?",
   a:"80C/80D reduce your <em>total income</em>, which then reduces your slab-rate STCG. They do NOT reduce LTCG (charged at flat 12.5% on the gain itself, no chapter VI-A deductions)."},
  {c:"tax",    q:"How is the INR cost of my foreign stock determined?",
   a:"USD purchase price × SBI TT buy rate on date of purchase (or as per Rule 115 of Income-tax Rules). Sale proceeds USD × TT buy rate on date of sale. The INR difference = capital gain. FX move is implicit."},
  {c:"tax",    q:"Do I need to pay advance tax on foreign capital gains?",
   a:"Yes — if your total tax liability (incl. CG) > ₹10,000 in the FY, advance tax is due in 4 installments (15% Jun, 45% Sep, 75% Dec, 100% Mar). Unrealised gains are NOT taxed; only on sale."},
  {c:"tax",    q:"What is Form 67 and when must I file it?",
   a:"Form 67 is the statement to claim Foreign Tax Credit (e.g., the 25% US dividend WHT). Must be filed on or before the ITR due date (post-2022 amendment includes belated/revised). Late filing = FTC denial."},
  {c:"compl",  q:"What is Schedule FA and do I have to file it?",
   a:"Schedule FA in ITR-2/ITR-3 is the foreign assets disclosure. Mandatory for every Resident & Ordinarily Resident (ROR) holding any foreign asset at any time during the calendar year preceding the AY. Failure = ₹10L penalty per year per asset under Black Money Act."},
  {c:"compl",  q:"My foreign brokerage balance was only ₹50,000 last year. Do I still need Schedule FA?",
   a:"Yes — disclosure is required regardless of value. The ₹20L threshold (eff. 1-Oct-2024) only mitigates the ₹10L <em>penalty</em>, not the disclosure obligation itself."},
  {c:"compl",  q:"What's the calendar year vs financial year quirk in Schedule FA?",
   a:"Schedule FA captures holdings during the <em>calendar year</em> ending immediately before the AY (i.e., for ITR of AY 25-26 / FY 24-25, you report Jan-Dec 2024). The rest of your ITR is FY-based. Easy to miss."},
  {c:"compl",  q:"Do I need to file FLA Return with RBI?",
   a:"FLA (Foreign Liabilities & Assets) is primarily for Indian companies/LLPs with FDI/ODI. Retail individuals holding listed foreign equities under LRS are generally outside FLA scope — but the rules have grey edges; consult a CA if you hold equity-linked structures abroad."},
  {c:"risk",   q:"What if my broker (IBKR/ICICI Direct) goes bankrupt?",
   a:"SIPC ($500K limit per account; cash sub-limit $250K) protects against broker insolvency. IBKR has $14bn+ excess regulatory capital. Your shares are held in a segregated client account — not part of broker's balance sheet. Risk is small but non-zero."},
  {c:"risk",   q:"Could the RBI suddenly stop LRS for equity?",
   a:"Theoretically possible (RBI has tightened LRS for crypto, derivatives, real estate). Practically, equity has been a permitted purpose since 2004 and is unlikely to be banned outright. More likely: TCS rate / threshold tweaks, FAQ-level restrictions, or jurisdiction-level negative lists."},
  {c:"risk",   q:"What if USD/INR appreciates (rupee strengthens)?",
   a:"Your INR returns shrink. A 10% INR strengthening on a flat US portfolio = 9.1% INR loss. Historically rare for sustained periods (last sustained appreciation: 2007 and 2017 episodes). Long-term thesis is INR depreciation."},
  {c:"nri",    q:"I am an NRI in the US. Can I open a GIFT City account?",
   a:"Yes — and it's especially attractive for US/Canada NRIs who are blocked from regular Indian mutual funds (FATCA/PFIC). GIFT IFSC funds are typically open. Open a Global Savings Account with ICICI/HDFC/SBI IBU, then a trading account with an IFSC-registered broker."},
  {c:"nri",    q:"I am returning to India after 10 years abroad. What happens to my US 401(k) and brokerage?",
   a:"Once you become Indian Resident under FEMA, you can continue to hold existing foreign assets (RFC account / direct holdings). New remittances will then be subject to LRS. Disclose all in Schedule FA. 401(k) tax treatment is complex — withdrawals taxed in both US (10% early-withdrawal penalty if <59½) and India (with FTC); pension Article 19/20 of DTAA applies."},
  {c:"nri",    q:"Can I gift US stocks to my parents in India?",
   a:"NRA-to-resident gift of US stock is permissible. US has no gift tax on intangible property gifted by NRA. India: gift from a 'relative' (parents incl.) is exempt under Section 56(2)(x). But the recipient inherits your cost basis — and US estate tax exposure transfers if the gift is made within 3 years of death."},
  {c:"nri",    q:"Are NRIs subject to TCS on remittances?",
   a:"TCS under Section 206C(1G) applies to outward remittances under LRS by Indian residents. NRIs aren't using LRS for outward (they receive funds, not remit out). Inward remittances to India are not TCS-charged."},
  {c:"basics", q:"Is investing in foreign stocks better than Indian stocks?",
   a:"Not 'better' — different. India offers high growth, FX-domestic match, but is concentrated. US/global offers sector breadth (no direct AI/semis/biotech leaders in India), stable currency, and diversification. Most advisors suggest 15–35% global allocation for HNIs. Past performance: NIFTY 50 ~13% INR CAGR (15Y); S&P 500 ~14% USD = ~17% INR CAGR (with INR depreciation tailwind)."},
  {c:"basics", q:"Do I get voting rights on foreign shares I own via LRS?",
   a:"On direct shares (LRS via IBKR): yes — proxy materials sent through your broker. On NSE-IFSC UDRs: technically the underlying custodian votes, you don't get direct voting; for retail size this rarely matters. ADRs typically pass voting through the depositary bank."},
  {c:"basics", q:"How are stock splits, dividends, mergers, spinoffs handled?",
   a:"Automatically by your broker — IBKR adjusts your holdings, books the new shares (e.g., spinoff Visa class B → V), credits dividends. For NSE-IFSC UDRs, the ratio adjusts (a 4-for-1 split makes your UDRs 4× more, each at 1/4 price). Tax events: dividends taxable; stock splits not taxable; mergers/spinoffs may trigger CG depending on consideration type."},
  {c:"tax",    q:"How is cost basis tracked when I buy the same stock multiple times?",
   a:"India uses FIFO (First-In-First-Out) by default for tax purposes — first lot bought is first lot deemed sold. Brokers may show 'average cost' on screen, but for ITR you must track lot-by-lot. Maintain Excel: each buy lot with date, qty, USD price, FX rate, INR cost; on sale, deplete oldest lots first."},
  {c:"tax",    q:"Are RSUs / ESPPs from my US employer taxable when granted or when sold?",
   a:"On vesting (RSU) or purchase (ESPP), the FMV is taxed as 'salary' — TDS by employer. Then when you SELL, the gain over FMV-at-vest is capital gains. Two distinct events. The salary leg is reported in Form 16; the cap gain in your ITR + Schedule FA. RSUs from foreign employer of Indian resident → still salary in India."},
  {c:"tax",    q:"What about ADR depositary fees? Are they deductible?",
   a:"Yes — ADR fees (typically $0.01–$0.05 per share annually for sponsored ADRs) reduce dividend income or sale proceeds for tax purposes. Track via your 1042-S / broker statement. Custody / inactivity fees similarly are deductible expenses against capital gains under Section 48."},
  {c:"tax",    q:"Does India have a 'wash sale' rule like the US?",
   a:"No. India has no wash-sale rule for foreign or domestic stocks. You can sell a loss-making position on March 30, book the loss for tax purposes, and re-buy on April 1 — perfectly legal and effective for tax-loss harvesting. Useful end-of-FY tactic."},
  {c:"tax",    q:"Is dividend reinvestment (DRIP) treated as a fresh purchase?",
   a:"Yes — every DRIP-induced reinvestment is (a) a taxable dividend at the gross amount, (b) a fresh purchase at the reinvest price/date for cost-basis purposes. Track as a new lot."},
  {c:"compl",  q:"What are LRS 'purpose codes' (S0001, S0023, etc.)?",
   a:"RBI's purpose code taxonomy categorises every outward remittance: <code>S0023</code> = investment in equity shares, <code>S0001</code> = travel, <code>S0011</code> = maintenance of close relatives, <code>S0024</code> = investment in debt securities, etc. Your bank picks the code on Form A2; pick the wrong one and the remittance can be challenged."},
  {c:"compl",  q:"Does opening an IBKR account also require any special Indian disclosure?",
   a:"Account itself: no separate filing. But the moment you fund it, the bank reports the LRS remittance via SFT. The account, all holdings, and all transactions during the calendar year must appear in Schedule FA when you file your ITR."},
  {c:"compl",  q:"What if I only invested ₹50K and forgot to disclose in Schedule FA?",
   a:"Strict reading: ₹10L Black Money Act penalty applies regardless of value. The Oct-2024 amendment provides relief from the ₹10L penalty if aggregate non-disclosed (excl. immovable) is < ₹20L. <strong>Disclosure is still required;</strong> threshold is for the penalty leg, not the disclosure. File a revised return immediately if missed."},
  {c:"nri",    q:"I am moving back to India. What do I do with my US 401(k), IRA, brokerage?",
   a:"Pre-move: settle US tax position, sell PFIC-treatable holdings before becoming Indian resident-and-ordinary-resident (RoR) — but NOT before US tax-residency cessation if green card carries exit tax exposure. Post-move: maintain US holdings under FEMA's 'Returning Indian' provisions (RFC, RFC-D accounts permitted). 401(k) withdrawals taxable in both jurisdictions with FTC offset; pension articles (19/20) of India-US DTAA help."},
  {c:"nri",    q:"Can I gift inherited US shares from my late father (US resident) to my Indian sibling?",
   a:"Two events: (1) <em>Inheritance from US person</em> — receive at stepped-up basis (USD FMV at date of death). NOT taxable in India under Section 56(2)(x) — gifts/inheritance from 'relative' exempt. US estate tax may apply to the decedent's estate (different question — relevant if decedent was non-citizen with US-situs assets > $60K). (2) Onward gift to Indian sibling — exempt under Section 56(2)(x) again. But cost basis transfers (sibling sells later → CG on stepped-up basis)."},
  {c:"risk",   q:"Can I hedge my USD exposure?",
   a:"Retail: limited tools. RBI permits forex forwards/options for genuine underlying exposure but operational thresholds are high. INR-USD futures on NSE/BSE are speculative tools (slab tax, ₹2cr+ tickets typical for institutional). For most retail, geographic diversification + multi-currency exposure is the practical hedge; explicit hedging is for >$1M portfolios."},
  {c:"risk",   q:"What if there's an Indo-US sanctions event affecting my IBKR account?",
   a:"Historical precedent (Russia 2022): Western brokers froze Russian-resident accounts overnight; access restored only via local intermediary. India is a treaty/strategic partner of US — extreme sanction is improbable but not zero. Mitigate by: (a) running parallel rails (LRS + GIFT); (b) keeping low cash balance abroad (deploy or repatriate); (c) using Tier-1 brokers with clear bankruptcy waterfalls."},
  {c:"basics", q:"How do I open a joint account on IBKR via ICICI Direct?",
   a:"IBKR offers Joint Tenants accounts (rights of survivorship). Both holders KYC; LRS contributions tracked per holder (each gets USD 250K cap). Useful for spousal estate planning, but US estate tax landmine still applies — joint tenancy halves US-situs at first death only if 'qualified joint interests' rules met (consult)."},
  {c:"basics", q:"How does the tax software / CA know my foreign cost basis and gains?",
   a:"They don't — you have to provide it. Brokers issue annual statements (IBKR 'Activity Statement' / NSE-IFSC contract notes) but in USD. CA needs your Excel/computation: lot-by-lot purchase INR cost (USD × TT buy rate of buy date), sale INR (USD × TT buy rate of sale date), holding period, dividend INR & US tax withheld. Tools: Quicko, ClearTax foreign module."}
];

/* ---------- 11. GLOSSARY ---------- */
DOSSIER.glossary = [
  {t:"AD-1 Bank",         d:"Authorised Dealer Category-I bank — full banking licence to handle FX, including LRS remittances."},
  {t:"ADR",               d:"American Depositary Receipt — a US-listed certificate representing shares of a non-US company (e.g., Infosys ADR on NYSE)."},
  {t:"AIF",               d:"Alternative Investment Fund — IFSCA-registered Cat I/II/III funds; NRIs/UHNIs route long-only and hedge strategies via IFSC AIFs."},
  {t:"AIS",               d:"Annual Information Statement — the wide-angle taxpayer ledger maintained by the Income-tax Department (incl. SFT data on LRS)."},
  {t:"AY",                d:"Assessment Year — the year in which income of the immediately preceding FY is assessed (FY 2024-25 = AY 2025-26)."},
  {t:"Black Money Act",   d:"Black Money (Undisclosed Foreign Income & Assets) and Imposition of Tax Act, 2015 — penalises non-disclosure of foreign assets."},
  {t:"CBDT",              d:"Central Board of Direct Taxes — apex body of Income-tax administration in India."},
  {t:"DDP",               d:"Designated Depository Participant — KYC-linked depository under SEBI."},
  {t:"DTAA",              d:"Double Taxation Avoidance Agreement — bilateral treaty preventing the same income being taxed twice. India has DTAAs with 90+ countries."},
  {t:"FATCA",             d:"Foreign Account Tax Compliance Act (US, 2010) — requires foreign financial institutions to report US persons' accounts to the IRS."},
  {t:"FEMA",              d:"Foreign Exchange Management Act, 1999 — replaced FERA; governs all cross-border money flows from/to India."},
  {t:"FLA Return",        d:"Foreign Liabilities & Assets — RBI return for entities/individuals holding overseas equity. Annual filing due July 15."},
  {t:"Form 26AS",         d:"Annual tax credit statement — TDS, TCS, advance tax payments are reflected here."},
  {t:"Form 67",           d:"Statement to claim Foreign Tax Credit under DTAA. Mandatory before claiming credit in ITR."},
  {t:"Form 706-NA",       d:"US estate tax return for non-resident aliens — filed by executor within 9 months of death if US-situs assets > $60K."},
  {t:"Form A2",           d:"FEMA declaration form filed at AD-1 bank for any outward remittance under LRS."},
  {t:"FTC",               d:"Foreign Tax Credit — credit in India for taxes already paid abroad on the same income."},
  {t:"FY",                d:"Financial Year (India) — April 1 to March 31."},
  {t:"GIFT City",         d:"Gujarat International Finance Tec-City — India's first IFSC, regulated by IFSCA."},
  {t:"HUF",               d:"Hindu Undivided Family — separate tax entity in India. Note: HUFs are NOT eligible for LRS."},
  {t:"IBU",               d:"IFSC Banking Unit — a branch of a bank operating under IFSCA in GIFT City, allowed to take USD deposits."},
  {t:"IFSC",              d:"International Financial Services Centre — special zone for cross-border financial services."},
  {t:"IFSCA",             d:"International Financial Services Centres Authority — unified regulator for GIFT City IFSC."},
  {t:"India INX",         d:"India International Exchange — BSE-promoted IFSC stock exchange in GIFT City. Operates 'Global Access' route."},
  {t:"INR TT Buy Rate",   d:"Telegraphic Transfer buying rate — used for converting foreign income to INR for tax (Rule 115)."},
  {t:"IRC § 871",         d:"Section of US Internal Revenue Code — sets out taxation of non-resident aliens. § 871(a) exempts NRA capital gains; § 871(h) exempts portfolio interest."},
  {t:"ITR",               d:"Income Tax Return. ITR-2 / ITR-3 must be used by anyone disclosing foreign assets."},
  {t:"LRS",               d:"Liberalised Remittance Scheme — RBI scheme letting individuals remit USD 250K/FY abroad."},
  {t:"LTCG",              d:"Long-Term Capital Gain. For foreign stocks (post 23-Jul-24): 12.5% flat, no indexation, holding > 24 months."},
  {t:"NSE IFSC",          d:"NSE International Exchange — IFSC subsidiary of NSE; offers UDRs on US stocks."},
  {t:"NRA",               d:"Non-Resident Alien — IRS designation for non-US persons (your status as an Indian resident in US tax)."},
  {t:"NRE / NRO / FCNR",  d:"Indian bank accounts for non-residents — Non-Resident External, Non-Resident Ordinary, Foreign Currency Non-Resident."},
  {t:"ODI",               d:"Overseas Direct Investment — FEMA window for entities (companies/LLPs) to invest abroad. Distinct from LRS."},
  {t:"OFAC",              d:"Office of Foreign Assets Control — US Treasury body administering economic sanctions."},
  {t:"PFIC",              d:"Passive Foreign Investment Company — punitive US tax regime on foreign mutual funds. Affects US tax residents (incl. green card NRIs), not Indian residents."},
  {t:"QFII",              d:"Qualified Foreign Institutional Investor — China's licensed-investor regime for A-share access."},
  {t:"REIT",              d:"Real Estate Investment Trust. US REIT dividends often withheld at 30% (no DTAA benefit)."},
  {t:"ROR",               d:"Resident & Ordinarily Resident — full Indian tax residency. Triggers worldwide income taxation and Schedule FA."},
  {t:"Rule 115",          d:"Income-tax Rule prescribing FX conversion methodology — TT buy rate of SBI on date of accrual/receipt."},
  {t:"Schedule FA",       d:"Foreign Assets schedule in ITR-2/3. Discloses every overseas asset held during calendar year."},
  {t:"Schedule FSI",      d:"Foreign Source Income schedule — country-wise income & corresponding tax credit."},
  {t:"SEC / FINRA",       d:"US Securities and Exchange Commission / Financial Industry Regulatory Authority. Set the US regulatory fees on stock sales."},
  {t:"Section 10(4D)",    d:"Income-tax exemption — capital gains/dividends/interest of specified non-resident from specified IFSC funds."},
  {t:"Section 10(4E)",    d:"Exemption on bond/derivative income earned by non-residents from IFSC."},
  {t:"Section 80LA",      d:"100% income deduction for IFSC unit for any 10 consecutive years out of 15."},
  {t:"Section 206C(1G)",  d:"TCS on LRS remittances — 20% above ₹10L for investment (FY25-26)."},
  {t:"SFT",               d:"Statement of Financial Transactions — high-value transactions reported by banks/brokers to ITD; LRS remittance > ₹7L is reported."},
  {t:"SIPC",              d:"Securities Investor Protection Corporation — US$500K (cash $250K) coverage against US broker insolvency."},
  {t:"STCG",              d:"Short-Term Capital Gain. For foreign stocks: slab rate, holding ≤24 months."},
  {t:"STT",               d:"Securities Transaction Tax — applies to Indian-listed equity. NOT applicable in IFSC trades."},
  {t:"TCS",               d:"Tax Collected at Source. On LRS: 20% above ₹10L cumulative (investment purpose)."},
  {t:"TT Buy Rate",       d:"Telegraphic Transfer Buying rate — bank's buy rate for USD; used for India tax conversion."},
  {t:"UCITS",             d:"Undertakings for Collective Investment in Transferable Securities — EU regulated fund standard. Irish-domiciled UCITS ETFs are popular for non-US estate-tax-safe US exposure."},
  {t:"UDR",               d:"Unsponsored Depository Receipt — at NSE IFSC, a fractional receipt backed by underlying US share."},
  {t:"W-8BEN",            d:"IRS form claiming foreign person status & DTAA reduced WHT (25% for Indian residents on US dividends). Valid 3 years."},
  {t:"WHT",               d:"Withholding Tax — tax deducted at source by the paying jurisdiction (e.g., US 25% on dividends to Indian residents)."}
];

/* ---------- 12. SOURCES & "HOW TO USE" ---------- */
DOSSIER.howTo = [
  {id:"quick", icon:"5m", h: "The 5-minute primer", b: "You want the gist before a meeting. Routes overview + ICICI Direct + FAQ filter for your scenario.", time:"5 min", focus:["routes","icici","faq"]},
  {id:"beginner", icon:"B", h: "The first-time investor", b: "Never invested abroad. Walk me through the basics, the limits, and a sample US trade.", time:"30 min", focus:["routes","lrs","us","calc"]},
  {id:"full", icon:"All", h: "The complete read", b: "I want every detail before I act. Two routes, every tax, every risk, every form.", time:"2 hours", focus:["routes","lrs","gift","icici","us","world","tax","risks","calc","faq","glossary"]},
  {id:"annual", icon:"ITR", h: "Annual ITR review", b: "Already invested. Show me Schedule FA, Form 67, the 12.5% LTCG regime, and the calendar.", time:"15 min", focus:["tax","calc","faq"]},
  {id:"nri", icon:"NRI", h: "NRI / Returning Indian", b: "I am abroad or coming back. GIFT City is often the cleanest route for me.", time:"20 min", focus:["gift","tax","faq"]},
  {id:"hni", icon:"HNI", h: "HNI / Portfolio > USD 250K", b: "Concentration in US stocks. Show me the estate-tax landmine and how to defuse it.", time:"25 min", focus:["us","risks","calc","gift"]}
];

DOSSIER.sources = [
  {label:"RBI Master Direction on LRS",          url:"https://rbi.org.in", n:"Liberalised Remittance Scheme — current limit USD 250,000/individual/FY"},
  {label:"RBI FEMA Master Direction on Remittance Facilities for Individuals", url:"https://rbi.org.in", n:"FEMA framework, AD-1 procedures"},
  {label:"Income-tax Act 1961 § 206C(1G)",       url:"https://incometaxindia.gov.in", n:"TCS on LRS — current 20% above ₹10L (eff. Apr 2025)"},
  {label:"Finance Act 2024 / Budget 2024 memorandum", url:"https://incometaxindia.gov.in", n:"LTCG regime change to 12.5% (no indexation), eff. 23-Jul-2024"},
  {label:"Finance Act 2025 / Budget 2025",       url:"https://incometaxindia.gov.in", n:"TCS threshold raised from ₹7L to ₹10L (eff. Apr 2025)"},
  {label:"Black Money (Undisclosed Foreign Income & Assets) Act, 2015", url:"https://incometaxindia.gov.in", n:"₹10L penalty per year for non-disclosure; threshold relief Oct-2024"},
  {label:"India-US DTAA (1989, in force)",        url:"https://incometaxindia.gov.in", n:"Article 10: 25% dividend WHT; Article 25: FTC mechanics"},
  {label:"IRS Form 706-NA Instructions",           url:"https://www.irs.gov", n:"US Estate Tax for non-resident aliens — $60K threshold"},
  {label:"IRS Publication 519 — Tax Guide for Aliens", url:"https://www.irs.gov", n:"NRA US tax treatment, capital gains 0%, dividend WHT"},
  {label:"IFSCA Capital Market Intermediaries Regulations 2021", url:"https://ifsca.gov.in", n:"GIFT City IFSC broker/exchange framework"},
  {label:"IFSCA Banking Regulations 2020",         url:"https://ifsca.gov.in", n:"IFSC Banking Unit (IBU) framework"},
  {label:"NSE IFSC trading framework",             url:"https://www.nseifsc.com", n:"UDR mechanics, ratios, settlement T+3"},
  {label:"India INX (BSE IFSC) Global Access",      url:"https://www.indiainxga.com", n:"Direct access to 135+ exchanges across 31 countries"},
  {label:"ICICI Direct Global Investment Services", url:"https://www.icicidirect.com/global-investment-services", n:"LRS-IBKR rail; pricing, KYC"},
  {label:"Section 10(4D) of Income-tax Act",        url:"https://incometaxindia.gov.in", n:"Tax exemption for specified non-resident in IFSC funds"},
  {label:"Section 80LA of Income-tax Act",          url:"https://incometaxindia.gov.in", n:"100% deduction for IFSC unit, 10/15 years"}
];

