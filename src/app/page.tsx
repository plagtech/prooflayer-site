"use client";

import { useState, useEffect } from "react";
import { PixelTrail, Logo, Navbar, Footer, Divider, GradientText, ArrowIcon, BotIcon, TrendingIcon, UsersIcon, LinkIcon, usePixelSize } from "@/components/shared";

function C({ c, children }: { c: string; children: React.ReactNode }) {
  return <span style={{ color: c, whiteSpace: "pre" }}>{children}</span>;
}

function CodePreview() {
  return (
    <div style={{ background: "#1a202c", borderRadius: 16, padding: "20px 24px", fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, lineHeight: 1.9, overflow: "auto", boxShadow: "0 8px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.04)", maxWidth: 580, width: "100%" }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#fc8181" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#f6e05e" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#68d391" }} />
      </div>
      <code style={{ color: "#e2e8f0" }}>
        <C c="#c792ea">import</C> <C c="#82aaff">{`{ ProofLayer }`}</C> <C c="#c792ea">from</C> <C c="#c3e88d">{`'prooflayer-sdk'`}</C>{"\n\n"}
        <C c="#546e7a">{"// Initialize + start in two lines"}</C>{"\n"}
        <C c="#c792ea">const</C> <C c="#82aaff">pl</C>{" = "}<C c="#c792ea">new</C> <C c="#ffcb6b">ProofLayer</C><C c="#89ddff">{`({ wallet, apiKey })`}</C>{"\n"}
        <C c="#82aaff">pl</C><C c="#89ddff">.start()</C>{"\n\n"}
        <C c="#546e7a">{"// Every action builds trust"}</C>{"\n"}
        <C c="#c792ea">await</C> <C c="#82aaff">pl</C><C c="#89ddff">{`.wrap(`}</C><C c="#c3e88d">{`'swap'`}</C><C c="#89ddff">{`, { pair: `}</C><C c="#c3e88d">{`'ETH/USDC'`}</C><C c="#89ddff">{`, amount: `}</C><C c="#f78c6c">500</C><C c="#89ddff">{` })`}</C>
      </code>
    </div>
  );
}

/* ═══ USE CASE TABS ═══ */
const USE_CASES = [
  { id: "defi", icon: <TrendingIcon />, label: "DeFi Agents", badge: "Autonomous Finance", title: "Trust Scores for DeFi-Native Agents", description: "Agents executing swaps, yield farming, or liquidity provisioning build verifiable financial reputation. Protocols gate access based on composite trust — only proven agents manage real capital.", bars: [85,62,91,74,88], accent: "#2d3748", stat: "Financial Trust: 91" },
  { id: "trading", icon: <BotIcon />, label: "Trading Bots", badge: "High Frequency", title: "Prove Reliability at Scale", description: "Trading bots handling thousands of transactions signal reliability through ProofLayer's Reliability axis — tracking success rates, response times, and uptime.", bars: [94,88,96,91,97], accent: "#4a5568", stat: "Reliability: 96" },
  { id: "daos", icon: <UsersIcon />, label: "DAOs", badge: "Governance", title: "Agent Reputation for DAO Tooling", description: "DAO treasury agents, proposal executors, and payroll bots get accountability via on-chain attestations any member can verify.", bars: [72,85,68,90,78], accent: "#718096", stat: "Social Score: 85" },
  { id: "protocols", icon: <LinkIcon />, label: "Protocol Integrations", badge: "Infrastructure", title: "Trust Gates for Protocol Access", description: "Build trust-gated APIs and smart contract interactions. Set minimum composite score thresholds for sensitive operations. One API call to verify.", bars: [88,76,82,94,87], accent: "#1a202c", stat: "Composite: 87" },
];

function FeatureTabs() {
  const [active, setActive] = useState("defi");
  const c = USE_CASES.find((u) => u.id === active)!;
  return (
    <section style={{ padding: "80px 24px 88px", maxWidth: 1120, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ display: "inline-flex", padding: "5px 14px", borderRadius: 100, border: "1px solid rgba(0,0,0,0.08)", background: "#fff", fontSize: 12, fontWeight: 600, color: "#718096", marginBottom: 16 }}>Use Cases</div>
        <h2 style={{ fontSize: "clamp(26px,3.5vw,38px)", fontWeight: 720, letterSpacing: "-0.03em", color: "#1a202c", marginBottom: 10 }}>Built for the Autonomous Economy</h2>
        <p style={{ color: "#718096", fontSize: 15, maxWidth: 480, margin: "0 auto" }}>From single-agent bots to multi-agent swarms — ProofLayer adapts to every trust model.</p>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
        {USE_CASES.map((uc) => (
          <button key={uc.id} onClick={() => setActive(uc.id)} style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 20px", borderRadius: 12, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "inherit", background: active === uc.id ? "#1a202c" : "rgba(0,0,0,0.03)", color: active === uc.id ? "#f4f5f7" : "#718096", transition: "all 0.25s ease" }}>{uc.icon}{uc.label}</button>
        ))}
      </div>
      <div key={c.id} className="resp-1col" style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(12px)", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 20, padding: "48px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center", animation: "tabFade 0.35s ease" }}>
        <div>
          <div style={{ display: "inline-flex", padding: "4px 12px", borderRadius: 100, border: "1px solid rgba(0,0,0,0.08)", background: "#fff", fontSize: 12, fontWeight: 600, color: "#718096", marginBottom: 20 }}>{c.badge}</div>
          <h3 style={{ fontSize: "clamp(24px,3vw,34px)", fontWeight: 700, letterSpacing: "-0.025em", color: "#1a202c", lineHeight: 1.2, marginBottom: 16 }}>{c.title}</h3>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: "#718096", marginBottom: 28 }}>{c.description}</p>
          <a href="/sdk" className="btn-dark" style={{ display: "inline-flex" }}>Get Started <ArrowIcon /></a>
        </div>
        <div style={{ background: "#1a202c", borderRadius: 16, padding: "32px 28px", display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 120 }}>
            {c.bars.map((h, i) => <div key={i} style={{ flex: 1, borderRadius: 6, height: `${h}%`, background: i === 2 ? c.accent : "rgba(255,255,255,0.08)", transition: "height 0.5s ease" }} />)}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", borderRadius: 10, background: "rgba(255,255,255,0.06)" }}>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>{c.stat}</span>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#68d391", animation: "pulseSubtle 2s ease infinite" }} />
          </div>
          <div style={{ padding: "12px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
            <span style={{ color: "#68d391" }}>✓</span> Trust gate passed<br /><span style={{ color: "rgba(255,255,255,0.25)" }}>  threshold: 70 → score: {c.bars[2]}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ FEATURE CARD ═══ */
function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 16, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 12, transition: "all 0.3s ease", cursor: "default" }}
      onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.07)"; }}
      onMouseOut={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
      <div style={{ width: 44, height: 44, borderRadius: 10, background: "#f0f1f3", border: "1px solid rgba(0,0,0,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{icon}</div>
      <h3 style={{ fontSize: 17, fontWeight: 650, color: "#1a202c", margin: 0 }}>{title}</h3>
      <p style={{ fontSize: 14, lineHeight: 1.65, color: "#718096", margin: 0 }}>{description}</p>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 34, fontWeight: 750, color: "#1a202c", letterSpacing: "-0.03em", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 10.5, color: "#a0aec0", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 6 }}>{label}</div>
    </div>
  );
}

/* ═══ PAGE ═══ */
export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const px = usePixelSize();
  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  return (
    <>
      <Navbar active="home" />

      {/* HERO */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "110px 24px 60px", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}><PixelTrail pixelSize={px} /></div>
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", pointerEvents: "none", maxWidth: 780, opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(18px)", transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 14px", borderRadius: 100, background: "rgba(255,255,255,0.85)", border: "1px solid rgba(0,0,0,0.06)", marginBottom: 28, pointerEvents: "auto", animation: "fadeUp 0.5s ease 0.15s both" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#48bb78", animation: "pulseSubtle 2s ease infinite" }} /><span style={{ fontSize: 12.5, color: "#718096", fontWeight: 500 }}>Agent Trust Infrastructure</span>
          </div>
          <h1 style={{ fontSize: "clamp(44px,7vw,82px)", fontWeight: 780, lineHeight: 1.02, letterSpacing: "-0.045em", marginBottom: 24, animation: "fadeUp 0.6s ease 0.3s both" }}>Secure Your<br /><GradientText>{"Agent's Intent"}</GradientText></h1>
          <p style={{ fontSize: "clamp(15px,1.8vw,18px)", lineHeight: 1.7, color: "#718096", maxWidth: 540, margin: "0 auto 36px", animation: "fadeUp 0.6s ease 0.45s both" }}>An opt-in SDK that generates verifiable trust scores for AI agents. On-chain attestations. Multi-dimensional scoring. The credential system for the autonomous economy.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", pointerEvents: "auto", animation: "fadeUp 0.6s ease 0.6s both" }}>
            <a href="https://github.com/plagtech/prooflayer-sdk" className="btn-dark">Get the SDK <ArrowIcon /></a>
            <a href="/sdk" className="btn-ghost">Check Agent Score</a>
          </div>
          <div style={{ marginTop: 32, fontSize: 10, color: "#a0aec0", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, animation: "fadeUp 0.5s ease 0.75s both" }}>Behavioral Metadata Only · No Private Keys · No TX Contents</div>
        </div>
        <div style={{ position: "relative", zIndex: 10, marginTop: 48, animation: "fadeUp 0.6s ease 0.9s both", pointerEvents: "auto" }}><CodePreview /></div>
      </section>

      {/* STATS */}
      <Divider />
      <section style={{ padding: "44px 24px", display: "flex", justifyContent: "center", gap: 56, flexWrap: "wrap", maxWidth: 1120, margin: "0 auto" }}>
        <Stat value="11" label="Chains Supported" /><Stat value="4" label="Trust Axes" /><Stat value="EAS" label="On-Chain Attestations" /><Stat value="<1ms" label="SDK Overhead" />
      </section>
      <Divider />

      {/* USE CASE TABS */}
      <FeatureTabs />

      {/* FEATURE CARDS */}
      <Divider />
      <section style={{ padding: "80px 24px", maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: "clamp(26px,3.5vw,36px)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 10 }}>How It Works</h2>
          <p style={{ color: "#718096", fontSize: 15, maxWidth: 460, margin: "0 auto" }}>Everything an agent needs to prove trust — without exposing what it does.</p>
        </div>
        <div className="resp-1col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          <FeatureCard icon="◎" title="Multi-Dimensional Scoring" description="Four weighted axes — Financial (30%), Reliability (30%), Trust (25%), Social (15%) — with log-scale curves to prevent gaming." />
          <FeatureCard icon="⬡" title="On-Chain Attestations" description="EAS attestations on Base. Scores verifiable on-chain without relying on a centralized API." />
          <FeatureCard icon="⟁" title="Zero-Friction SDK" description="Wrap agent calls with one line. Heartbeats, buffering, and auto-flushing happen in the background." />
          <FeatureCard icon="◉" title="Event Tracking" description="EventCollector buffers tx metadata — success/fail, escrow, response times — and flushes with retries." />
          <FeatureCard icon="⊡" title="Trust Gates" description="Set minimum composite thresholds. One API call to verify an agent before granting access." />
          <FeatureCard icon="◇" title="Privacy by Design" description="Only behavioral metadata — never private keys, transaction contents, or wallet balances." />
        </div>
      </section>

      {/* CTA */}
      <Divider />
      <section style={{ padding: "80px 24px", textAlign: "center" }}>
        <Logo size={52} />
        <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 750, letterSpacing: "-0.04em", marginTop: 20, marginBottom: 16, lineHeight: 1.12 }}>Build Trust Into<br /><GradientText>Every Agent Action</GradientText></h2>
        <p style={{ color: "#718096", fontSize: 15, maxWidth: 440, margin: "0 auto 32px" }}>Free tier available — start building verifiable agent reputation today.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="https://github.com/plagtech/prooflayer-sdk" className="btn-dark">Get Started Free <ArrowIcon /></a>
          <a href="https://github.com/plagtech/prooflayer-api" className="btn-ghost">View API Docs</a>
        </div>
      </section>

      <Footer />
    </>
  );
}
