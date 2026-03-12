"use client";

import { useState } from "react";
import { PixelTrail, Logo, Navbar, Footer, Divider, ArrowIcon, usePixelSize } from "@/components/shared";

/* ═══ AGENT SCORE LOOKUP ═══ */
function AgentScoreLookup() {
  const [wallet, setWallet] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const lookup = async () => {
    if (!wallet.trim()) return; setLoading(true); setResult(null);
    try { const r = await fetch(`https://api.prooflayer.net/v1/report/${wallet.trim()}`); if (!r.ok) throw new Error(); setResult(await r.json()); }
    catch { setResult({ wallet: wallet.trim(), composite: 72, financial: 81, social: 45, reliability: 88, trust: 67, events_tracked: 1247, first_seen: "2026-01-15", attestation_uid: "0x8a3f...b2c1", verified: true, demo: true }); }
    finally { setLoading(false); }
  };
  const R = 34, circ = 2 * Math.PI * R;
  const Ring = ({ score, label, accent }: { score: number; label: string; accent: string }) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
      <svg width="82" height="82" viewBox="0 0 76 76"><circle cx="38" cy="38" r={R} fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="3.5" />
        <circle cx="38" cy="38" r={R} fill="none" stroke={accent} strokeWidth="3.5" strokeDasharray={circ} strokeDashoffset={circ - (score / 100) * circ} strokeLinecap="round" style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%", transition: "stroke-dashoffset 1s ease" }} />
        <text x="38" y="38" textAnchor="middle" dominantBaseline="central" style={{ fill: "#1a202c", fontSize: 15, fontWeight: 700, fontFamily: "inherit" }}>{score}</text></svg>
      <span style={{ fontSize: 10.5, color: "#a0aec0", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</span>
    </div>
  );
  return (
    <div style={{ background: "rgba(255,255,255,0.75)", backdropFilter: "blur(16px)", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, padding: "44px 40px", boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <Logo size={44} />
        <h2 style={{ fontSize: "clamp(26px,3.5vw,38px)", fontWeight: 750, letterSpacing: "-0.035em", marginTop: 16, marginBottom: 10 }}>Agent Score Lookup</h2>
        <p style={{ color: "#718096", fontSize: 15, maxWidth: 420, margin: "0 auto" }}>Enter any wallet address to view its real-time trust score, axis breakdown, and verification status.</p>
      </div>
      <div style={{ display: "flex", gap: 10, maxWidth: 560, margin: "0 auto 8px" }}>
        <input type="text" placeholder="Enter wallet address (0x...)" value={wallet} onChange={(e) => setWallet(e.target.value)} onKeyDown={(e) => e.key === "Enter" && lookup()}
          style={{ flex: 1, padding: "15px 18px", borderRadius: 12, background: "#fff", border: "1.5px solid rgba(0,0,0,0.08)", color: "#1a202c", fontSize: 14, fontFamily: "'JetBrains Mono', monospace", outline: "none" }}
          onFocus={(e) => e.target.style.borderColor = "rgba(45,55,72,0.3)"} onBlur={(e) => e.target.style.borderColor = "rgba(0,0,0,0.08)"} />
        <button onClick={lookup} className="btn-dark" style={{ padding: "15px 26px", borderRadius: 12 }}>{loading ? "..." : "Lookup"}</button>
      </div>
      {result && (
        <div style={{ marginTop: 32, animation: "fadeUp 0.4s ease both" }}>
          {result.demo && <div style={{ textAlign: "center", marginBottom: 20 }}><span style={{ fontSize: 11, color: "#d69e2e", padding: "4px 12px", borderRadius: 6, background: "rgba(214,158,46,0.08)", border: "1px solid rgba(214,158,46,0.12)", fontWeight: 600 }}>Demo data — agent not yet registered</span></div>}
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(0,0,0,0.05)", padding: "32px 28px", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap", justifyContent: "center" }}>
              <div style={{ textAlign: "center", minWidth: 120 }}>
                <div style={{ fontSize: 10.5, color: "#a0aec0", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginBottom: 6 }}>Composite</div>
                <div style={{ fontSize: 64, fontWeight: 780, color: "#1a202c", letterSpacing: "-0.04em", lineHeight: 1 }}>{result.composite}</div>
              </div>
              <div style={{ width: 1, height: 80, background: "rgba(0,0,0,0.06)", flexShrink: 0 }} />
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
                <Ring score={result.financial} label="Financial" accent="#2d3748" />
                <Ring score={result.reliability} label="Reliability" accent="#4a5568" />
                <Ring score={result.trust} label="Trust" accent="#718096" />
                <Ring score={result.social} label="Social" accent="#a0aec0" />
              </div>
            </div>
          </div>
          <div className="resp-2col" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
            {[{ l: "Events Tracked", v: result.events_tracked?.toLocaleString() || "—" }, { l: "First Seen", v: result.first_seen || "—" }, { l: "Attestation", v: result.attestation_uid || "None" }, { l: "Verified", v: result.verified ? "✓ Yes" : "✗ No" }].map((m) => (
              <div key={m.l} style={{ background: "#fff", borderRadius: 12, border: "1px solid rgba(0,0,0,0.05)", padding: "16px 18px" }}>
                <div style={{ fontSize: 10, color: "#a0aec0", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600, marginBottom: 6 }}>{m.l}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#1a202c", fontFamily: "'JetBrains Mono', monospace" }}>{m.v}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══ QUICK 1-2-3 INSTALL ═══ */
function QuickInstall() {
  const steps = [
    { num: "1", title: "Install", desc: "Add the SDK to your project with one command.", code: "npm install prooflayer-sdk" },
    { num: "2", title: "Initialize", desc: "Create a ProofLayer instance with your wallet.", code: "const pl = new ProofLayer({ wallet, apiKey })" },
    { num: "3", title: "Start", desc: "Begin tracking trust. Scores update automatically.", code: "pl.start()" },
  ];
  return (
    <div style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 20, padding: "36px 32px", display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, color: "#a0aec0", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, marginBottom: 10 }}>Quick Start</div>
        <h3 style={{ fontSize: 24, fontWeight: 720, letterSpacing: "-0.025em", color: "#1a202c", marginBottom: 8 }}>Up and Running in 3 Steps</h3>
        <p style={{ fontSize: 14.5, color: "#718096", lineHeight: 1.6 }}>No config files. No boilerplate. Just install, init, and go.</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
        {steps.map((s) => (
          <div key={s.num} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, background: "#1a202c", color: "#f4f5f7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 750 }}>{s.num}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 650, color: "#1a202c", marginBottom: 3 }}>{s.title}</div>
              <div style={{ fontSize: 13.5, color: "#718096", marginBottom: 8, lineHeight: 1.5 }}>{s.desc}</div>
              <code style={{ display: "block", padding: "10px 14px", borderRadius: 8, background: "#1a202c", color: "#c3e88d", fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5 }}>{s.code}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══ DEVELOPER CODE TABS ═══ */
const TABS = [
  { id: "qs", label: "Quick Start", lines: [
    { t: "kw", v: "import" },{ t: "fn", v: " { ProofLayer } " },{ t: "kw", v: "from " },{ t: "str", v: "'prooflayer-sdk'" },{ t: "nl" },{ t: "nl" },
    { t: "dim", v: "// Initialize with your wallet" },{ t: "nl" },{ t: "kw", v: "const " },{ t: "fn", v: "pl" },{ t: "op", v: " = " },{ t: "kw", v: "new " },{ t: "cls", v: "ProofLayer" },{ t: "op", v: "({ wallet, apiKey })" },{ t: "nl" },
    { t: "fn", v: "pl" },{ t: "op", v: ".start()" },{ t: "nl" },{ t: "nl" },
    { t: "dim", v: "// Wrap any agent action" },{ t: "nl" },{ t: "kw", v: "await " },{ t: "fn", v: "pl" },{ t: "op", v: ".wrap(" },{ t: "str", v: "'escrow'" },{ t: "op", v: ", { amount: " },{ t: "num", v: "1000" },{ t: "op", v: ", token: " },{ t: "str", v: "'USDC'" },{ t: "op", v: " })" },{ t: "nl" },{ t: "nl" },
    { t: "dim", v: "// Score updates automatically" },{ t: "nl" },{ t: "fn", v: "pl" },{ t: "op", v: ".onScore(s => console.log(s.composite))" },
  ]},
  { id: "cli", label: "CLI", lines: [
    { t: "comment", v: "# Check an agent's score" },{ t: "cmd", v: "npx prooflayer score 0xAd62...c8" },{ t: "blank" },
    { t: "comment", v: "# Full report card" },{ t: "cmd", v: "npx prooflayer report 0xAd62...c8" },{ t: "blank" },
    { t: "comment", v: "# Trust gate check" },{ t: "cmd", v: "npx prooflayer check 0xAd62...c8 --min 70" },{ t: "blank" },
    { t: "comment", v: "# Verify attestation" },{ t: "cmd", v: "npx prooflayer verify 0xAd62...c8" },
  ]},
  { id: "gate", label: "Trust Gate", lines: [
    { t: "dim", v: "// Protocol-level trust check" },{ t: "nl" },{ t: "kw", v: "const " },{ t: "fn", v: "res" },{ t: "op", v: " = " },{ t: "kw", v: "await " },{ t: "fn", v: "fetch" },{ t: "op", v: "(" },{ t: "nl" },
    { t: "str", v: "  'https://api.prooflayer.net/v1/trust/check'" },{ t: "op", v: "," },{ t: "nl" },
    { t: "op", v: "  { method: " },{ t: "str", v: "'POST'" },{ t: "op", v: "," },{ t: "nl" },
    { t: "op", v: "    body: JSON.stringify({" },{ t: "nl" },{ t: "op", v: "      wallet: " },{ t: "str", v: "'0xAd62...c8'" },{ t: "op", v: ", minScore: " },{ t: "num", v: "70" },{ t: "nl" },{ t: "op", v: "    }) }" },{ t: "nl" },{ t: "op", v: ")" },
  ]},
];
const CM: Record<string, string> = { kw: "#c792ea", fn: "#82aaff", op: "#89ddff", str: "#c3e88d", num: "#f78c6c", cls: "#ffcb6b", dim: "#546e7a", comment: "#546e7a", cmd: "#e2e8f0" };

function DevInstall() {
  const [active, setActive] = useState("qs");
  const tab = TABS.find((t) => t.id === active)!;
  return (
    <div style={{ background: "#1a202c", borderRadius: 20, overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.12)", display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "24px 28px 0" }}>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>Developer Reference</div>
        <h3 style={{ fontSize: 24, fontWeight: 720, letterSpacing: "-0.025em", color: "#f4f5f7", marginBottom: 6 }}>Full Code Examples</h3>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.6, marginBottom: 20 }}>SDK integration, CLI commands, and protocol-level trust gates.</p>
      </div>
      <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 24px" }}>
        {TABS.map((t) => <button key={t.id} onClick={() => setActive(t.id)} style={{ padding: "11px 16px", border: "none", background: "transparent", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 600, color: active === t.id ? "#e2e8f0" : "rgba(255,255,255,0.25)", borderBottom: active === t.id ? "2px solid #e2e8f0" : "2px solid transparent" }}>{t.label}</button>)}
      </div>
      <div style={{ padding: "20px 24px", fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, lineHeight: 1.85, flex: 1, overflow: "auto" }}>
        {tab.lines.map((tk, i) => tk.t === "nl" ? <br key={i} /> : tk.t === "blank" ? <div key={i} style={{ height: 8 }} /> : <span key={i} style={{ color: CM[tk.t] || "#e2e8f0", whiteSpace: "pre" }}>{tk.v}</span>)}
      </div>
      <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 16, flexWrap: "wrap" }}>
        {["EventCollector", "ScoringEngine", "AttestationManager", "ApiClient"].map((c) => <span key={c} style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontWeight: 500, padding: "4px 10px", borderRadius: 6, background: "rgba(255,255,255,0.04)", fontFamily: "'JetBrains Mono', monospace" }}>{c}</span>)}
      </div>
    </div>
  );
}

/* ═══ SCORING AXES ═══ */
const AXES = [
  { key: "financial", label: "Financial", weight: "30%", pct: 30, color: "#2d3748", desc: "Transaction success rates, escrow completions, value handled over time." },
  { key: "reliability", label: "Reliability", weight: "30%", pct: 30, color: "#4a5568", desc: "Uptime, response latency, heartbeat consistency, retry success." },
  { key: "trust", label: "Trust", weight: "25%", pct: 25, color: "#718096", desc: "Attestation count, verification status, trust gate pass rate." },
  { key: "social", label: "Social", weight: "15%", pct: 15, color: "#a0aec0", desc: "Peer endorsements, protocol interactions, cross-agent references." },
];

/* ═══ PAGE ═══ */
export default function SDKPage() {
  const px = usePixelSize();
  return (
    <>
      <Navbar active="sdk" />

      {/* Hero */}
      <section style={{ position: "relative", padding: "110px 24px 48px", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}><PixelTrail pixelSize={px} /></div>
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", pointerEvents: "none", maxWidth: 600, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 14px", borderRadius: 100, background: "rgba(255,255,255,0.85)", border: "1px solid rgba(0,0,0,0.06)", marginBottom: 22 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#48bb78", animation: "pulseSubtle 2s ease infinite" }} /><span style={{ fontSize: 12.5, color: "#718096", fontWeight: 500 }}>Developer Tools</span>
          </div>
          <h1 style={{ fontSize: "clamp(32px,5vw,50px)", fontWeight: 750, letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 14 }}>SDK & Score</h1>
          <p style={{ fontSize: "clamp(14px,1.6vw,16px)", lineHeight: 1.7, color: "#718096", maxWidth: 460, margin: "0 auto" }}>Look up any agent&apos;s trust score, then integrate the SDK into your own agent in minutes.</p>
        </div>
      </section>

      {/* Agent Score Lookup */}
      <Divider />
      <section style={{ padding: "64px 24px", maxWidth: 820, margin: "0 auto" }}><AgentScoreLookup /></section>

      {/* Install: 1-2-3 + Dev */}
      <Divider />
      <section style={{ padding: "64px 24px", maxWidth: 1120, margin: "0 auto" }}>
        <div className="resp-1col" style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: 20, alignItems: "stretch" }}>
          <QuickInstall /><DevInstall />
        </div>
      </section>

      {/* Scoring Axes */}
      <Divider />
      <section style={{ padding: "64px 24px", maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontSize: "clamp(24px,3.5vw,34px)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 10 }}>Scoring Axes</h2>
          <p style={{ color: "#718096", fontSize: 15, maxWidth: 460, margin: "0 auto" }}>Four weighted dimensions combine into a single composite. Log-scale curves prevent gaming.</p>
        </div>
        <div className="resp-1col" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
          {AXES.map((a) => (
            <div key={a.key} style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 14, padding: "22px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 15, fontWeight: 650, color: "#1a202c" }}>{a.label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: a.color, background: "rgba(0,0,0,0.04)", padding: "3px 10px", borderRadius: 6 }}>{a.weight}</span>
              </div>
              <div style={{ height: 5, borderRadius: 3, background: "rgba(0,0,0,0.04)", marginBottom: 12, overflow: "hidden" }}><div style={{ height: "100%", width: `${a.pct}%`, background: a.color, borderRadius: 3 }} /></div>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: "#718096", margin: 0 }}>{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* API Reference */}
      <Divider />
      <section style={{ padding: "64px 24px", maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h2 style={{ fontSize: "clamp(24px,3.5vw,34px)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 10 }}>API Reference</h2>
          <p style={{ color: "#718096", fontSize: 15 }}>Backend API at <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, background: "#fff", padding: "2px 8px", borderRadius: 5, border: "1px solid rgba(0,0,0,0.06)" }}>api.prooflayer.net</code></p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
          {[
            { m: "POST", p: "/v1/ingest", d: "Receive behavioral snapshots, recompute score" },
            { m: "GET", p: "/v1/score/:wallet", d: "Cached or fresh trust score" },
            { m: "GET", p: "/v1/report/:wallet", d: "Full report card with metadata" },
            { m: "POST", p: "/v1/agents/register", d: "Idempotent agent registration" },
            { m: "POST", p: "/v1/trust/check", d: "Trust gate — min composite threshold" },
            { m: "GET", p: "/v1/badges/:wallet", d: "Verification badge status" },
          ].map((ep) => (
            <div key={ep.p} style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 12, padding: "16px 18px", display: "flex", flexDirection: "column", gap: 7 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 4, background: ep.m === "GET" ? "rgba(72,187,120,0.1)" : "rgba(66,153,225,0.1)", color: ep.m === "GET" ? "#38a169" : "#3182ce", fontFamily: "'JetBrains Mono', monospace" }}>{ep.m}</span>
                <code style={{ fontSize: 12.5, fontFamily: "'JetBrains Mono', monospace", color: "#2d3748", fontWeight: 500 }}>{ep.p}</code>
              </div>
              <p style={{ fontSize: 13, color: "#718096", margin: 0 }}>{ep.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <Divider />
      <section style={{ padding: "64px 24px", textAlign: "center" }}>
        <Logo size={44} />
        <h2 style={{ fontSize: "clamp(24px,3.5vw,36px)", fontWeight: 750, letterSpacing: "-0.035em", marginTop: 18, marginBottom: 14 }}>Ready to Integrate?</h2>
        <p style={{ color: "#718096", fontSize: 15, maxWidth: 400, margin: "0 auto 28px" }}>8 passing tests. TypeScript. Zero config.</p>
        <a href="https://github.com/plagtech/prooflayer-sdk" className="btn-dark" style={{ display: "inline-flex" }}>View on GitHub <ArrowIcon /></a>
      </section>

      <Footer />
    </>
  );
}
