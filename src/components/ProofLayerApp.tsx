"use client";
import { useState, useEffect } from "react";
import ShaderBackground from "@/components/ui/ShaderBackground";

const T = {
  bg: "transparent", surface: "rgba(180,190,210,0.08)", surfaceHover: "rgba(180,190,210,0.13)",
  border: "rgba(180,195,220,0.15)", text: "#d8dce8", textMuted: "#8a90a8", textDim: "#555a70",
  accent: "#00E5FF", accentGlow: "rgba(0,229,255,0.12)", accentDim: "#00E5FF40",
  green: "#00C853", gold: "#FFD700", warn: "#FF6B35",
  fontDisplay: "'Outfit', sans-serif", fontBody: "'DM Sans', sans-serif", fontMono: "'JetBrains Mono', monospace",
};
const API_URL = "https://api.prooflayer.net";

function Nav({ page, setPage }: { page: string; setPage: (p: string) => void }) {
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 32px", background: "rgba(8,12,24,0.7)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${T.border}` }}>
      <div onClick={() => setPage("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
        <svg width="28" height="28" viewBox="0 0 28 28"><circle cx="14" cy="14" r="12" fill="none" stroke={T.accent} strokeWidth="1.5" opacity="0.6"/><circle cx="14" cy="14" r="6" fill="none" stroke={T.accent} strokeWidth="1.5"/><circle cx="14" cy="14" r="2" fill={T.accent}/></svg>
        <span style={{ fontFamily: T.fontDisplay, fontWeight: 700, fontSize: 18, color: "#fff" }}>ProofLayer</span>
      </div>
      <div style={{ display: "flex", gap: 4 }}>
        {[{id:"home",label:"Home"},{id:"sdk",label:"SDK & Score"},{id:"pricing",label:"Pricing"}].map(i=>(
          <button key={i.id} onClick={()=>setPage(i.id)} style={{ background: page===i.id?T.accentGlow:"transparent", border: page===i.id?`1px solid ${T.accentDim}`:"1px solid transparent", color: page===i.id?T.accent:T.textMuted, padding:"8px 18px", borderRadius:6, cursor:"pointer", fontFamily:T.fontBody, fontSize:13, fontWeight:500, transition:"all 0.2s" }}>{i.label}</button>
        ))}
      </div>
    </nav>
  );
}
function Btn({children,variant="primary",onClick,style:sx={}}:{children:React.ReactNode;variant?:string;onClick?:()=>void;style?:React.CSSProperties}){
  const s:Record<string,React.CSSProperties>={primary:{background:`linear-gradient(135deg,${T.accent},#00b8d4)`,color:"#000",fontWeight:700,boxShadow:`0 0 24px ${T.accentGlow}`},secondary:{background:"rgba(0,229,255,0.08)",color:T.accent,border:`1px solid ${T.accentDim}`,backdropFilter:"blur(8px)"},ghost:{background:T.surface,color:T.text,border:`1px solid ${T.border}`,backdropFilter:"blur(8px)"}};
  return <button onClick={onClick} style={{padding:"14px 32px",borderRadius:8,border:"none",cursor:"pointer",fontFamily:T.fontBody,fontSize:14,transition:"all 0.25s",...s[variant],...sx}}>{children}</button>;
}
function SectionLabel({children}:{children:React.ReactNode}){return <div style={{fontSize:11,color:T.accent,letterSpacing:4,textTransform:"uppercase" as const,fontFamily:T.fontMono,marginBottom:16,opacity:0.8}}>{children}</div>;}
function GlassCard({children,style:sx,...props}:React.HTMLAttributes<HTMLDivElement>&{style?:React.CSSProperties}){
  return <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:12,backdropFilter:"blur(12px)",...sx}} onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.background=T.surfaceHover;(e.currentTarget as HTMLDivElement).style.borderColor="rgba(200,210,230,0.25)";}} onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.background=T.surface;(e.currentTarget as HTMLDivElement).style.borderColor=T.border;}} {...props}>{children}</div>;
}
function ScoreBar({label,score,delay=0}:{label:string;score:number;delay?:number}){
  const[val,setVal]=useState(0);useEffect(()=>{const t=setTimeout(()=>{let f=0;const iv=setInterval(()=>{f++;setVal(Math.min(score,Math.round((f/30)*score)));if(f>=30)clearInterval(iv);},16);},delay);return()=>clearTimeout(t);},[score,delay]);
  const hue=(val/100)*120;
  return(<div style={{marginBottom:14}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4,fontFamily:T.fontMono,fontSize:12}}><span style={{color:T.textMuted,textTransform:"uppercase" as const,letterSpacing:2}}>{label}</span><span style={{color:`hsl(${hue},80%,65%)`,fontWeight:700}}>{val}</span></div><div style={{height:5,background:"rgba(255,255,255,0.06)",borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:`${val}%`,background:`linear-gradient(90deg,hsl(${hue},80%,40%),hsl(${hue},80%,60%))`,borderRadius:3,transition:"width 0.05s linear",boxShadow:`0 0 10px hsl(${hue},80%,50%,0.4)`}}/></div></div>);
}
function CompositeRing({score}:{score:number}){
  const[val,setVal]=useState(0);useEffect(()=>{let f=0;const iv=setInterval(()=>{f++;setVal(Math.min(score,Math.round((f/40)*score)));if(f>=40)clearInterval(iv);},16);return()=>clearInterval(iv);},[score]);
  const circ=2*Math.PI*52,offset=circ-(val/100)*circ;
  const tier=val>=90?"Platinum":val>=75?"Gold":val>=55?"Silver":val>=30?"Bronze":"Unverified";
  const tc:Record<string,string>={Platinum:T.accent,Gold:T.gold,Silver:"#C0C0C0",Bronze:"#CD7F32",Unverified:T.textDim};const color=tc[tier];
  return(<div style={{display:"flex",flexDirection:"column",alignItems:"center"}}><svg width="120" height="120" viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5"/><circle cx="60" cy="60" r="52" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} transform="rotate(-90 60 60)" style={{filter:`drop-shadow(0 0 8px ${color}50)`}}/><text x="60" y="56" textAnchor="middle" fill={color} fontSize="28" fontWeight="800" fontFamily={T.fontMono}>{val}</text><text x="60" y="72" textAnchor="middle" fill={T.textDim} fontSize="8" fontFamily={T.fontMono} letterSpacing="2">COMPOSITE</text></svg><div style={{marginTop:8,padding:"4px 14px",borderRadius:4,background:`${color}15`,border:`1px solid ${color}30`,color,fontFamily:T.fontMono,fontSize:10,fontWeight:700,letterSpacing:3}}>{tier.toUpperCase()}</div></div>);
}

function HomePage({setPage}:{setPage:(p:string)=>void}){
  const[visible,setVisible]=useState(false);useEffect(()=>{setTimeout(()=>setVisible(true),100);},[]);
  return(<div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"120px 24px 80px",position:"relative",zIndex:1}}>
    <div style={{textAlign:"center",maxWidth:720,opacity:visible?1:0,transform:visible?"translateY(0)":"translateY(30px)",transition:"all 0.8s cubic-bezier(0.16,1,0.3,1)"}}>
      <SectionLabel>Agent Trust Infrastructure</SectionLabel>
      <h1 style={{fontFamily:T.fontDisplay,fontSize:"clamp(40px,6vw,68px)",fontWeight:800,lineHeight:1.05,margin:"0 0 24px",color:"#fff",letterSpacing:-2}}>Secure Your Agent{"'"}s{" "}<span style={{background:`linear-gradient(135deg,${T.accent},#80DEEA)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Intent</span></h1>
      <p style={{fontFamily:T.fontBody,fontSize:18,lineHeight:1.7,color:T.textMuted,maxWidth:540,margin:"0 auto 48px"}}>ProofLayer is an opt-in SDK that tracks behavioral metadata to generate verifiable trust scores for AI agents. On-chain attestations. Multi-dimensional scoring. The credential system for the autonomous economy.</p>
      <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}><Btn onClick={()=>setPage("sdk")}>Get the SDK →</Btn><Btn variant="secondary" onClick={()=>setPage("sdk")}>Check Agent Score</Btn></div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:20,maxWidth:800,width:"100%",marginTop:96,opacity:visible?1:0,transform:visible?"translateY(0)":"translateY(40px)",transition:"all 1s cubic-bezier(0.16,1,0.3,1) 0.3s"}}>
      {[{icon:"◎",title:"Multi-Dimensional",desc:"Four scoring axes — Financial, Social, Reliability, Trust — weighted into a single composite."},{icon:"⬡",title:"On-Chain Verified",desc:"EAS attestations on Base. Scores are verifiable without hitting a centralized API."},{icon:"⟁",title:"Zero Friction",desc:"Wrap your agent calls with one line. Heartbeats, buffering, and flushing are automatic."}].map((c,i)=>(
        <GlassCard key={i} style={{padding:28,cursor:"default",transition:"all 0.3s"}}><div style={{fontSize:28,marginBottom:16,color:T.accent}}>{c.icon}</div><div style={{fontFamily:T.fontDisplay,fontSize:16,fontWeight:700,color:"#fff",marginBottom:8}}>{c.title}</div><div style={{fontFamily:T.fontBody,fontSize:13,lineHeight:1.6,color:T.textMuted}}>{c.desc}</div></GlassCard>
      ))}
    </div>
    <div style={{marginTop:96,textAlign:"center",opacity:visible?1:0,transition:"all 1s ease 0.6s"}}>
      <div style={{fontFamily:T.fontMono,fontSize:11,color:T.textDim,letterSpacing:3,marginBottom:24}}>BEHAVIORAL METADATA ONLY · NO PRIVATE KEYS · NO TX CONTENTS</div>
      <div style={{display:"flex",gap:48,justifyContent:"center",flexWrap:"wrap"}}>
        {[{n:"11",label:"Chains Supported"},{n:"4",label:"Trust Axes"},{n:"EAS",label:"On-Chain Attestations"}].map((s,i)=>(<div key={i} style={{textAlign:"center"}}><div style={{fontFamily:T.fontDisplay,fontSize:32,fontWeight:800,color:T.accent}}>{s.n}</div><div style={{fontFamily:T.fontBody,fontSize:12,color:T.textMuted,marginTop:4}}>{s.label}</div></div>))}
      </div>
    </div>
  </div>);
}

function SdkPage(){
  const[tab,setTab]=useState("install");const[wallet,setWallet]=useState("");const[scoreData,setScoreData]=useState<any>(null);const[searching,setSearching]=useState(false);const[error,setError]=useState("");
  const lookupScore=async()=>{const tr=wallet.trim();if(!/^0x[a-fA-F0-9]{40}$/.test(tr)){setError("Invalid Ethereum address");return;}setSearching(true);setError("");setScoreData(null);try{const r=await fetch(`${API_URL}/v1/report/${tr}`);const d=await r.json();if(d.success&&d.data){setScoreData(d.data);}else{setError("Agent not found — no ProofLayer history yet");}}catch{setError("Could not reach API");}finally{setSearching(false);}};
  const code:Record<string,string>={install:`npm install prooflayer-sdk`,quickstart:`import { ProofLayer } from "prooflayer-sdk";\n\nconst proof = new ProofLayer({\n  walletAddress: "0xYourAgentWallet",\n});\n\nawait proof.start();\n\nconst result = await proof.wrap(\n  () => agent.executeSwap(params)\n);\n\nproof.txSuccess({ chain: "base", amount: "1.5" });\nproof.escrow("completed", { counterparty: "0xBob" });\n\nproof.onScore((score) => {\n  console.log(\`Trust: \${score.composite}/100\`);\n});`,cli:`# Check any agent's trust score\nnpx prooflayer score 0xAgentWallet\n\n# Full report card\nnpx prooflayer report 0xAgentWallet\n\n# Trust gate check (min score: 70)\nnpx prooflayer check 0xAgentWallet 70`,protocol:`const check = await proof.checkTrust(\n  "0xAgentWallet",\n  70,\n  "escrow_10k"\n);\n\nif (!check.allowed) {\n  throw new Error(\n    \`Agent rejected: \${check.reason}\`\n  );\n}`};
  return(<div style={{minHeight:"100vh",padding:"100px 24px 80px",position:"relative",zIndex:1}}><div style={{maxWidth:900,margin:"0 auto"}}><SectionLabel>Developer Tools</SectionLabel><h2 style={{fontFamily:T.fontDisplay,fontSize:36,fontWeight:800,color:"#fff",margin:"0 0 48px",letterSpacing:-1}}>SDK & Agent Score</h2>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,alignItems:"start"}}>
      <div>
        <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:12,overflow:"hidden",backdropFilter:"blur(12px)"}}>
          <div style={{display:"flex",borderBottom:`1px solid ${T.border}`}}>{[{id:"install",label:"Install"},{id:"quickstart",label:"Quick Start"},{id:"cli",label:"CLI"},{id:"protocol",label:"Protocols"}].map(t=>(<button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,padding:"12px 8px",border:"none",background:tab===t.id?T.surfaceHover:"transparent",color:tab===t.id?T.accent:T.textMuted,fontFamily:T.fontMono,fontSize:11,cursor:"pointer",borderBottom:tab===t.id?`2px solid ${T.accent}`:"2px solid transparent",transition:"all 0.2s"}}>{t.label}</button>))}</div>
          <div style={{padding:24}}><pre style={{margin:0,fontFamily:T.fontMono,fontSize:12.5,lineHeight:1.7,color:T.text,whiteSpace:"pre-wrap",wordBreak:"break-word"}}>{code[tab]}</pre></div>
        </div>
        <GlassCard style={{marginTop:24,padding:28}}><div style={{fontFamily:T.fontDisplay,fontSize:15,fontWeight:700,color:"#fff",marginBottom:16}}>What It Tracks</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>{["Transaction success/failure","Escrow completion rates","Response times & uptime","Interaction diversity","API call patterns","Behavioral consistency"].map((item,i)=>(<div key={i} style={{fontFamily:T.fontBody,fontSize:12.5,color:T.textMuted,display:"flex",alignItems:"center",gap:8}}><span style={{color:T.accent,fontSize:8}}>●</span>{item}</div>))}</div><div style={{marginTop:16,fontFamily:T.fontMono,fontSize:10,color:T.textDim,letterSpacing:1}}>BEHAVIORAL METADATA ONLY — NO PRIVATE KEYS, NO TX CONTENTS</div></GlassCard>
      </div>
      <div>
        <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:12,overflow:"hidden",backdropFilter:"blur(12px)"}}>
          <div style={{padding:"16px 24px",borderBottom:`1px solid ${T.border}`,fontFamily:T.fontDisplay,fontSize:15,fontWeight:700,color:"#fff"}}>Check Agent Score</div>
          <div style={{padding:24}}>
            <div style={{display:"flex",background:"rgba(0,0,0,0.25)",border:`1px solid ${T.border}`,borderRadius:6,overflow:"hidden"}}><div style={{padding:"10px 12px",color:T.textDim,fontSize:14,fontFamily:T.fontMono}}>&gt;</div><input type="text" value={wallet} onChange={e=>setWallet(e.target.value)} onKeyDown={e=>e.key==="Enter"&&lookupScore()} placeholder="0x... wallet address" style={{flex:1,background:"transparent",border:"none",outline:"none",color:T.text,fontSize:13,fontFamily:T.fontMono,padding:"10px 0"}}/><button onClick={lookupScore} disabled={searching} style={{background:T.accentGlow,border:"none",borderLeft:`1px solid ${T.border}`,color:T.accent,padding:"10px 18px",cursor:"pointer",fontFamily:T.fontMono,fontSize:11,fontWeight:600,letterSpacing:2}}>{searching?"···":"LOOKUP"}</button></div>
            {error&&<div style={{color:"#ff6b6b",fontSize:12,marginTop:8,fontFamily:T.fontMono}}>{error}</div>}
            {scoreData&&scoreData.score&&(<div style={{marginTop:28}}><div style={{display:"flex",gap:24,alignItems:"flex-start"}}><CompositeRing score={scoreData.score.composite}/><div style={{flex:1}}><ScoreBar label="Financial" score={scoreData.score.financial} delay={0}/><ScoreBar label="Social" score={scoreData.score.social} delay={80}/><ScoreBar label="Reliability" score={scoreData.score.reliability} delay={160}/><ScoreBar label="Trust" score={scoreData.score.trust} delay={240}/></div></div><div style={{marginTop:20,display:"flex",gap:20,borderTop:`1px solid ${T.border}`,paddingTop:16}}>{[{label:"DATA POINTS",value:(scoreData.score.dataPoints||0).toLocaleString()},{label:"TIER",value:scoreData.tier||"Unverified"},{label:"VERIFIED",value:scoreData.verified?"✓ Yes":"✗ No"}].map((m,i)=>(<div key={i}><div style={{fontFamily:T.fontMono,fontSize:9,color:T.textDim,letterSpacing:2,marginBottom:4}}>{m.label}</div><div style={{fontFamily:T.fontMono,fontSize:13,color:m.label==="VERIFIED"&&scoreData.verified?T.green:T.textMuted}}>{m.value}</div></div>))}</div></div>)}
            {!scoreData&&!error&&(<div style={{marginTop:32,textAlign:"center",padding:"32px 0",color:T.textDim,fontFamily:T.fontBody,fontSize:13}}>Enter any agent wallet address to view their trust score</div>)}
          </div>
        </div>
        <GlassCard style={{marginTop:24,padding:28}}><div style={{fontFamily:T.fontDisplay,fontSize:15,fontWeight:700,color:"#fff",marginBottom:16}}>Scoring Axes</div>{[{axis:"Financial",weight:"30%",desc:"Payment success, escrow completion, volume patterns"},{axis:"Social",weight:"15%",desc:"Interaction diversity, peer attestations, network health"},{axis:"Reliability",weight:"30%",desc:"Uptime, response times, error rates, consistency"},{axis:"Trust",weight:"25%",desc:"Wallet age, behavioral drift, dispute history"}].map((a,i)=>(<div key={i} style={{display:"flex",gap:12,marginBottom:12,padding:"10px 12px",borderRadius:6,background:i%2===0?"transparent":"rgba(255,255,255,0.03)"}}><div style={{fontFamily:T.fontMono,fontSize:11,color:T.accent,minWidth:36,fontWeight:700}}>{a.weight}</div><div><div style={{fontFamily:T.fontDisplay,fontSize:13,fontWeight:600,color:"#ddd"}}>{a.axis}</div><div style={{fontFamily:T.fontBody,fontSize:11.5,color:T.textMuted,marginTop:2}}>{a.desc}</div></div></div>))}</GlassCard>
      </div>
    </div></div></div>);
}

function PricingPage({setPage}:{setPage:(p:string)=>void}){
  const[hov,setHov]=useState<string|null>(null);
  const tiers=[{id:"free",name:"Free",price:"$0",period:"forever",desc:"Start building trust history. Everything you need to get scored.",accent:T.textMuted,features:["Core SDK — event collection & buffering","Four-axis trust scoring","Public report card & score lookup","CLI tool (npx prooflayer score)","Auto-logged score after each flush","Heartbeat uptime tracking","On-chain attestation reads","Community support"],cta:"Get Started",ctaAction:()=>setPage("sdk")},{id:"premium",name:"Premium SDK",price:"$49",period:"/month",desc:"Deep analytics, behavioral benchmarking, and early warning alerts.",accent:T.accent,popular:true,features:["Everything in Free, plus:","Developer dashboard & analytics","Behavioral benchmarking vs. similar agents","Drift alerts — score change notifications","Historical score tracking & trends","Custom scoring weight overrides","Priority event ingestion","Email support"],cta:"Coming Soon"},{id:"verified",name:"Verification Badge",price:"$199",period:"one-time",desc:'Mint an on-chain verified attestation. The SSL certificate for agents.',accent:T.gold,features:['On-chain "Verified" EAS attestation',"Visible badge on report card","Protocol access — required by marketplaces","Annual re-verification included","Badge revocation protection","Dedicated support"],cta:"Coming Soon"}];
  return(<div style={{minHeight:"100vh",padding:"100px 24px 80px",position:"relative",zIndex:1}}><div style={{maxWidth:1000,margin:"0 auto"}}>
    <div style={{textAlign:"center",marginBottom:64}}><SectionLabel>Pricing</SectionLabel><h2 style={{fontFamily:T.fontDisplay,fontSize:36,fontWeight:800,color:"#fff",margin:"0 0 16px",letterSpacing:-1}}>Build Trust. Unlock Access.</h2><p style={{fontFamily:T.fontBody,fontSize:16,color:T.textMuted,maxWidth:500,margin:"0 auto"}}>The free tier drives adoption. Premium tiers unlock deeper insights and verified credentials.</p></div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
      {tiers.map(tier=>(<div key={tier.id} onMouseEnter={()=>setHov(tier.id)} onMouseLeave={()=>setHov(null)} style={{background:T.surface,backdropFilter:"blur(12px)",border:`1px solid ${hov===tier.id?tier.accent+"50":tier.popular?tier.accent+"25":T.border}`,borderRadius:16,padding:32,position:"relative",transition:"all 0.3s",transform:hov===tier.id?"translateY(-4px)":"none",boxShadow:hov===tier.id?"0 12px 40px rgba(0,0,0,0.3)":"none"}}>
        {tier.popular&&<div style={{position:"absolute",top:-12,left:"50%",transform:"translateX(-50%)",padding:"5px 16px",borderRadius:20,background:`linear-gradient(135deg,${T.accent},#00b8d4)`,color:"#000",fontFamily:T.fontMono,fontSize:10,fontWeight:700,letterSpacing:2}}>MOST POPULAR</div>}
        <div style={{fontFamily:T.fontDisplay,fontSize:20,fontWeight:700,color:tier.accent===T.textMuted?"#fff":tier.accent,marginBottom:8}}>{tier.name}</div>
        <div style={{display:"flex",alignItems:"baseline",gap:4,marginBottom:8}}><span style={{fontFamily:T.fontDisplay,fontSize:42,fontWeight:800,color:"#fff"}}>{tier.price}</span><span style={{fontFamily:T.fontBody,fontSize:14,color:T.textMuted}}>{tier.period}</span></div>
        <p style={{fontFamily:T.fontBody,fontSize:13,color:T.textMuted,lineHeight:1.5,marginBottom:28,minHeight:40}}>{tier.desc}</p>
        <div style={{marginBottom:28}}>{tier.features.map((f,i)=>(<div key={i} style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:10}}><span style={{color:f.startsWith("Everything")?T.accent:T.green,fontSize:12,marginTop:2,flexShrink:0}}>{f.startsWith("Everything")?"↑":"✓"}</span><span style={{fontFamily:T.fontBody,fontSize:13,color:T.text,lineHeight:1.4,fontStyle:f.startsWith("Everything")?"italic":"normal"}}>{f}</span></div>))}</div>
        <Btn variant={tier.popular?"primary":"ghost"} onClick={tier.ctaAction} style={{width:"100%",textAlign:"center"}}>{tier.cta}</Btn>
      </div>))}
    </div>
    <div style={{marginTop:48,background:T.surface,backdropFilter:"blur(12px)",border:`1px solid ${T.border}`,borderRadius:16,padding:"40px 48px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:24}}>
      <div><div style={{fontFamily:T.fontDisplay,fontSize:22,fontWeight:800,color:"#fff",marginBottom:8}}>Protocol API Access</div><p style={{fontFamily:T.fontBody,fontSize:14,color:T.textMuted,margin:0,maxWidth:500,lineHeight:1.6}}>{'"'}Is this agent trustworthy enough for a $10K escrow?{'"'} — that query has value. Usage-based pricing for platforms querying trust at scale.</p></div>
      <div style={{textAlign:"right"}}><div style={{fontFamily:T.fontDisplay,fontSize:28,fontWeight:800,color:T.warn}}>Usage-Based</div><div style={{fontFamily:T.fontMono,fontSize:11,color:T.textMuted,marginTop:4,letterSpacing:1}}>STARTING AT $0.001/QUERY</div></div>
    </div>
    <div style={{marginTop:32,textAlign:"center",padding:32,border:`1px dashed ${T.border}`,borderRadius:12,backdropFilter:"blur(8px)"}}><div style={{fontFamily:T.fontMono,fontSize:10,color:T.textDim,letterSpacing:3,marginBottom:12}}>FUTURE ROADMAP</div><div style={{fontFamily:T.fontBody,fontSize:14,color:T.textMuted,maxWidth:500,margin:"0 auto",lineHeight:1.6}}>Staking mechanism for peer attestations — agents stake tokens to vouch for other agents, lose tokens if the vouched agent turns malicious.</div></div>
  </div></div>);
}

export default function ProofLayerApp(){
  const[page,setPage]=useState("home");
  return(<div style={{minHeight:"100vh",background:"#060610"}}><style jsx global>{`*{box-sizing:border-box;margin:0;padding:0}body{background:#060610}input::placeholder{color:#555a70}`}</style><ShaderBackground/><Nav page={page} setPage={setPage}/>{page==="home"&&<HomePage setPage={setPage}/>}{page==="sdk"&&<SdkPage/>}{page==="pricing"&&<PricingPage setPage={setPage}/>}</div>);
}
