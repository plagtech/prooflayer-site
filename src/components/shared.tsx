"use client";

import React, {
  useState, useEffect, useCallback, useMemo, useRef, memo,
} from "react";

/* ═══════════════ PIXEL TRAIL ═══════════════ */

function useDimensions(ref: React.RefObject<HTMLElement | null>) {
  const [d, setD] = useState({ width: 0, height: 0 });
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const u = () => { if (ref.current) { const { width, height } = ref.current.getBoundingClientRect(); setD({ width, height }); } };
    const db = () => { clearTimeout(t); t = setTimeout(u, 200); };
    u(); window.addEventListener("resize", db);
    return () => { window.removeEventListener("resize", db); clearTimeout(t); };
  }, [ref]);
  return d;
}

const PixelDot = memo(function PixelDot({ id, size, fadeDuration, delay, className }: {
  id: string; size: number; fadeDuration: number; delay: number; className?: string;
}) {
  const el = useRef<HTMLDivElement | null>(null);
  const busy = useRef(false);
  const anim = useCallback(() => {
    const e = el.current; if (!e || busy.current) return; busy.current = true; e.style.opacity = "1";
    setTimeout(() => { if (e) { e.style.transition = `opacity ${fadeDuration}ms ease`; e.style.opacity = "0"; }
      setTimeout(() => { if (e) e.style.transition = ""; busy.current = false; }, fadeDuration); }, delay);
  }, [fadeDuration, delay]);
  const setRef = useCallback((n: HTMLDivElement | null) => { el.current = n; if (n) (n as any).__ap = anim; }, [anim]);
  return <div id={id} ref={setRef} className={className} style={{ width: size, height: size, opacity: 0, flexShrink: 0 }} />;
});

export function PixelTrail({ pixelSize = 56, fadeDuration = 500, delay = 900, pixelClassName = "pixel-dot" }) {
  const cRef = useRef<HTMLDivElement>(null);
  const dims = useDimensions(cRef);
  const uid = useRef(`pt-${Math.random().toString(36).slice(2, 7)}`);
  const onMove = useCallback((e: React.MouseEvent) => {
    if (!cRef.current) return; const r = cRef.current.getBoundingClientRect();
    const x = Math.floor((e.clientX - r.left) / pixelSize), y = Math.floor((e.clientY - r.top) / pixelSize);
    const el = document.getElementById(`${uid.current}-${x}-${y}`);
    if (el && (el as any).__ap) (el as any).__ap();
  }, [pixelSize]);
  const cols = useMemo(() => Math.ceil(dims.width / pixelSize), [dims.width, pixelSize]);
  const rows = useMemo(() => Math.ceil(dims.height / pixelSize), [dims.height, pixelSize]);
  return (
    <div ref={cRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "hidden" }} onMouseMove={onMove}>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} style={{ display: "flex" }}>{Array.from({ length: cols }).map((_, c) => (
          <PixelDot key={`${c}-${r}`} id={`${uid.current}-${c}-${r}`} size={pixelSize} fadeDuration={fadeDuration} delay={delay} className={pixelClassName} />
        ))}</div>
      ))}
    </div>
  );
}

/* ═══════════════ LOGO ═══════════════ */

export function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <path d="M15 68 L50 85 L85 68 L85 60 L50 77 L15 60 Z" fill="#c0c5ce" stroke="#2d3748" strokeWidth="4" strokeLinejoin="round" />
      <path d="M15 56 L50 73 L85 56 L85 48 L50 65 L15 48 Z" fill="#e8eaed" stroke="#2d3748" strokeWidth="4" strokeLinejoin="round" />
      <path d="M15 44 L50 61 L85 44 L85 36 L50 53 L15 36 Z" fill="#f5f5f5" stroke="#2d3748" strokeWidth="4" strokeLinejoin="round" />
      <path d="M15 36 L50 19 L85 36" fill="#f5f5f5" stroke="#2d3748" strokeWidth="4" strokeLinejoin="round" />
      <path d="M50 19 L50 53" stroke="#2d3748" strokeWidth="4" />
      <path d="M58 28 C58 16 74 16 74 28 L74 36" fill="none" stroke="#2d3748" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

/* ═══════════════ ICONS ═══════════════ */

export function GithubIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>; }
export function ArrowIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>; }

const I = ({ children }: { children: React.ReactNode }) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{children}</svg>;
export function BotIcon() { return <I><rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" /><path d="M12 7v4" /></I>; }
export function TrendingIcon() { return <I><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></I>; }
export function UsersIcon() { return <I><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></I>; }
export function LinkIcon() { return <I><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></I>; }

/* ═══════════════ GRADIENT TEXT ═══════════════ */

export function GradientText({ children }: { children: React.ReactNode }) {
  return <span style={{ background: "linear-gradient(270deg,#2d3748,#718096,#4a5568,#1a202c,#718096)", backgroundSize: "400% 400%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "gradShift 6s ease infinite" }}>{children}</span>;
}

/* ═══════════════ NAVBAR ═══════════════ */

export function Navbar({ active = "home" }: { active?: string }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 30); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  const pages = [{ key: "home", label: "Home", href: "/" }, { key: "sdk", label: "SDK & Score", href: "/sdk" }, { key: "pricing", label: "Pricing", href: "/pricing" }];
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 24px", background: scrolled ? "rgba(244,245,247,0.88)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none", borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "1px solid transparent", transition: "all 0.3s ease" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}><Logo size={28} /><span style={{ fontSize: 17, fontWeight: 700, color: "#1a202c", letterSpacing: "-0.02em" }}>ProofLayer</span></a>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {pages.map((p) => <a key={p.key} href={p.href} style={{ fontSize: 13.5, color: active === p.key ? "#1a202c" : "#718096", textDecoration: "none", fontWeight: active === p.key ? 650 : 500 }}>{p.label}</a>)}
          <a href="https://github.com/plagtech/prooflayer-sdk" target="_blank" rel="noopener noreferrer" style={{ color: "#718096", display: "flex" }}><GithubIcon /></a>
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════ FOOTER ═══════════════ */

export function Footer() {
  return (<>
    <Divider />
    <footer className="resp-footer" style={{ padding: "36px 24px", maxWidth: 1120, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Logo size={20} /><span style={{ fontSize: 12.5, color: "#a0aec0", fontWeight: 500 }}>ProofLayer · Agent Trust Infrastructure</span></div>
      <div style={{ display: "flex", gap: 18 }}>
        {[{ l: "GitHub", h: "https://github.com/plagtech/prooflayer-sdk" }, { l: "API", h: "https://github.com/plagtech/prooflayer-api" }, { l: "Docs", h: "/sdk" }].map((x) => <a key={x.l} href={x.h} style={{ fontSize: 12.5, color: "#a0aec0", textDecoration: "none" }}>{x.l}</a>)}
      </div>
    </footer>
    <div style={{ height: 28 }} />
  </>);
}

/* ═══════════════ DIVIDER ═══════════════ */

export function Divider() {
  return <div style={{ height: 1, background: "linear-gradient(90deg, transparent 5%, rgba(0,0,0,0.06) 50%, transparent 95%)", maxWidth: 1120, margin: "0 auto" }} />;
}

/* ═══════════════ PIXEL SIZE HOOK ═══════════════ */

export function usePixelSize(desktop = 56, mobile = 36) {
  const [px, setPx] = useState(desktop);
  useEffect(() => { const r = () => setPx(window.innerWidth < 768 ? mobile : desktop); r(); window.addEventListener("resize", r); return () => window.removeEventListener("resize", r); }, [desktop, mobile]);
  return px;
}
