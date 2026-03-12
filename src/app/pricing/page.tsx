"use client";

import { useState } from "react";
import { PixelTrail, Logo, Navbar, Footer, Divider, ArrowIcon, usePixelSize } from "@/components/shared";

/* ═══ TIERS ═══ */
const TIERS = [
  { name: "Free", price: "$0", period: "forever", description: "Get started with basic agent trust scoring", cta: "Start Free", pop: false,
    features: ["Up to 1,000 events/month", "Composite trust score", "CLI access", "Community support", "1 agent"],
    excluded: ["On-chain attestations", "Trust gate API", "Badge system", "Priority support"] },
  { name: "Premium SDK", price: "$49", period: "/month", description: "For production agents that need full scoring infrastructure", cta: "Get Premium", pop: true,
    features: ["Unlimited events", "Four-axis scoring", "On-chain EAS attestations", "Trust gate API", "Real-time score webhooks", "Up to 10 agents", "Email support"],
    excluded: ["Verification badge", "Custom scoring weights"] },
  { name: "Verification Badge", price: "$199", period: "one-time", description: "On-chain verified badge for established agents", cta: "Get Verified", pop: false,
    features: ["Everything in Premium", "Verified badge on-chain", "Badge API endpoint", "Profile on ProofLayer registry", "Priority support"],
    excluded: ["Custom scoring weights"] },
  { name: "Protocol API", price: "Usage", period: "based", description: "For protocols that need trust verification at scale", cta: "Contact Us", pop: false,
    features: ["Unlimited trust checks", "Batch score queries", "Custom scoring weights", "Custom trust thresholds", "Server-side attestations", "Dedicated support", "SLA guarantee"],
    excluded: [] },
];

function PricingCard({ tier }: { tier: typeof TIERS[0] }) {
  const dark = tier.pop;
  return (
    <div style={{ background: dark ? "#1a202c" : "rgba(255,255,255,0.7)", backdropFilter: dark ? "none" : "blur(8px)", border: dark ? "1px solid #2d3748" : "1px solid rgba(0,0,0,0.06)", borderRadius: 18, padding: "32px 28px", display: "flex", flexDirection: "column", position: "relative", transition: "all 0.3s ease" }}
      onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = dark ? "0 12px 48px rgba(0,0,0,0.25)" : "0 8px 32px rgba(0,0,0,0.07)"; }}
      onMouseOut={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
      {dark && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", padding: "4px 14px", borderRadius: 100, background: "#f4f5f7", fontSize: 11, fontWeight: 700, color: "#1a202c" }}>Most Popular</div>}
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 18, fontWeight: 660, color: dark ? "#f4f5f7" : "#1a202c", marginBottom: 6 }}>{tier.name}</h3>
        <p style={{ fontSize: 13.5, color: dark ? "rgba(255,255,255,0.5)" : "#718096", lineHeight: 1.5 }}>{tier.description}</p>
      </div>
      <div style={{ marginBottom: 24 }}>
        <span style={{ fontSize: 40, fontWeight: 780, color: dark ? "#f4f5f7" : "#1a202c", letterSpacing: "-0.03em" }}>{tier.price}</span>
        <span style={{ fontSize: 14, color: dark ? "rgba(255,255,255,0.4)" : "#a0aec0", fontWeight: 500, marginLeft: 4 }}>{tier.period}</span>
      </div>
      <button style={{ width: "100%", padding: "12px 20px", borderRadius: 10, border: dark ? "none" : "1.5px solid rgba(45,55,72,0.18)", cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 600, background: dark ? "#f4f5f7" : "transparent", color: dark ? "#1a202c" : "#2d3748", marginBottom: 28 }}>{tier.cta}</button>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        {tier.features.map((f) => <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 9, fontSize: 13.5, color: dark ? "rgba(255,255,255,0.75)" : "#4a5568" }}><span style={{ color: dark ? "#68d391" : "#48bb78", fontWeight: 700, marginTop: 1, flexShrink: 0 }}>✓</span><span>{f}</span></div>)}
        {tier.excluded.map((f) => <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 9, fontSize: 13.5, color: dark ? "rgba(255,255,255,0.25)" : "#cbd5e0" }}><span style={{ fontWeight: 700, marginTop: 1, flexShrink: 0 }}>—</span><span style={{ textDecoration: "line-through" }}>{f}</span></div>)}
      </div>
    </div>
  );
}

/* ═══ FAQ ═══ */
const FAQS = [
  { q: "What counts as an 'event'?", a: "Any behavioral metadata snapshot your agent sends — a transaction result, heartbeat, escrow completion, or API call outcome. The SDK batches these and flushes automatically." },
  { q: "Do I need to pay to use on-chain attestations?", a: "EAS attestations are included in the Premium SDK tier. You'll pay Base network gas fees for on-chain writes, but the SDK and API support is included." },
  { q: "Can I change plans later?", a: "Yes. Upgrade anytime for immediate access to new features. Downgrading takes effect at the next billing cycle." },
  { q: "What's the Verification Badge?", a: "A one-time purchase giving your agent verified status on-chain and in the ProofLayer registry. Protocols can filter for verified agents." },
  { q: "How does usage-based pricing work?", a: "Billed per trust check and score query after a monthly base. Volume discounts at 10K+ checks/month. Contact us for custom pricing." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", flexDirection: "column", gap: 2 }}>
      {FAQS.map((f, i) => (
        <div key={i} style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(8px)", border: "1px solid rgba(0,0,0,0.05)", borderRadius: 12, overflow: "hidden" }}>
          <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", padding: "18px 22px", border: "none", background: "transparent", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 600, color: "#1a202c", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {f.q}<span style={{ fontSize: 18, color: "#a0aec0", transform: open === i ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
          </button>
          {open === i && <div style={{ padding: "0 22px 18px", fontSize: 14, lineHeight: 1.7, color: "#718096", animation: "fadeUp 0.25s ease" }}>{f.a}</div>}
        </div>
      ))}
    </div>
  );
}

/* ═══ PAGE ═══ */
export default function PricingPage() {
  const px = usePixelSize();
  const COMP_ROWS = [
    ["Trust scoring", true, true, true, true], ["CLI access", true, true, true, true],
    ["Events/month", "1K", "∞", "∞", "∞"], ["Agent limit", "1", "10", "10", "∞"],
    ["On-chain attestations", false, true, true, true], ["Trust gate API", false, true, true, true],
    ["Score webhooks", false, true, true, true], ["Verification badge", false, false, true, true],
    ["Custom weights", false, false, false, true], ["Batch queries", false, false, false, true],
    ["SLA guarantee", false, false, false, true],
  ];
  return (
    <>
      <Navbar active="pricing" />

      {/* Hero */}
      <section style={{ position: "relative", padding: "120px 24px 60px", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}><PixelTrail pixelSize={px} /></div>
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", pointerEvents: "none", maxWidth: 640, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 14px", borderRadius: 100, background: "rgba(255,255,255,0.85)", border: "1px solid rgba(0,0,0,0.06)", marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#48bb78", animation: "pulseSubtle 2s ease infinite" }} /><span style={{ fontSize: 12.5, color: "#718096", fontWeight: 500 }}>Simple, Transparent Pricing</span>
          </div>
          <h1 style={{ fontSize: "clamp(34px,5vw,54px)", fontWeight: 750, letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 18 }}>Pricing</h1>
          <p style={{ fontSize: "clamp(15px,1.6vw,17px)", lineHeight: 1.7, color: "#718096", maxWidth: 460, margin: "0 auto" }}>Start free. Scale as your agents grow. No hidden fees.</p>
        </div>
      </section>

      {/* Cards */}
      <Divider />
      <section style={{ padding: "72px 24px", maxWidth: 1120, margin: "0 auto" }}>
        <div className="resp-2col-pricing" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, alignItems: "start" }}>
          {TIERS.map((t) => <PricingCard key={t.name} tier={t} />)}
        </div>
      </section>

      {/* Comparison */}
      <Divider />
      <section style={{ padding: "72px 24px", maxWidth: 900, margin: "0 auto" }}>
        <h2 style={{ fontSize: "clamp(24px,3vw,32px)", fontWeight: 700, letterSpacing: "-0.03em", textAlign: "center", marginBottom: 36 }}>Feature Comparison</h2>
        <div style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 16, overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, minWidth: 600 }}>
            <thead><tr style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <th style={{ padding: "16px 20px", textAlign: "left", fontWeight: 600, color: "#718096", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}>Feature</th>
              {["Free", "Premium", "Badge", "Protocol"].map((h) => <th key={h} style={{ padding: "16px 14px", textAlign: "center", fontWeight: 650, color: "#1a202c", fontSize: 13 }}>{h}</th>)}
            </tr></thead>
            <tbody>
              {COMP_ROWS.map(([feature, ...vals], i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
                  <td style={{ padding: "14px 20px", color: "#4a5568", fontWeight: 500 }}>{feature as string}</td>
                  {(vals as (boolean | string)[]).map((v, j) => (
                    <td key={j} style={{ padding: "14px", textAlign: "center", fontWeight: 600 }}>
                      {v === true ? <span style={{ color: "#48bb78" }}>✓</span> : v === false ? <span style={{ color: "#e2e8f0" }}>—</span> : <span style={{ color: "#2d3748", fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>{v}</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <Divider />
      <section style={{ padding: "72px 24px", maxWidth: 1120, margin: "0 auto" }}>
        <h2 style={{ fontSize: "clamp(24px,3vw,32px)", fontWeight: 700, letterSpacing: "-0.03em", textAlign: "center", marginBottom: 36 }}>Frequently Asked Questions</h2>
        <FAQ />
      </section>

      {/* CTA */}
      <Divider />
      <section style={{ padding: "72px 24px", textAlign: "center" }}>
        <Logo size={48} />
        <h2 style={{ fontSize: "clamp(26px,3.5vw,38px)", fontWeight: 750, letterSpacing: "-0.035em", marginTop: 20, marginBottom: 14 }}>Ready to Start?</h2>
        <p style={{ color: "#718096", fontSize: 15, maxWidth: 400, margin: "0 auto 28px" }}>Install the SDK and start building trust in under 5 minutes.</p>
        <a href="https://github.com/plagtech/prooflayer-sdk" className="btn-dark" style={{ display: "inline-flex" }}>Get the SDK <ArrowIcon /></a>
      </section>

      <Footer />
    </>
  );
}
