import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { FoldBackdrop } from "@/components/street/FoldBackdrop";
import { NorthlineAtmosphere } from "@/components/northline/NorthlineAtmosphere";
import "@/components/brand/brand-v7.css";

export type SystemCategory = "all" | "design" | "bots" | "software" | "ai";

export interface BrandSystem {
  id: string;
  name: string;
  category: "design" | "bots" | "software" | "ai";
  categoryLabel: string;
  status: string;
  statusType: "live" | "prod" | "spec";
  image: string;
  headline: string;
  summary: string;
  specs: string[];
  architectureDetails: string[];
  metrics: { label: string; value: string }[];
  launchHref?: string;
}

const SYSTEMS_CATALOG: BrandSystem[] = [
  {
    id: "vivre-runway",
    name: "VIVRE DROP 001",
    category: "design",
    categoryLabel: "01.1 // FASHION IDENTITY & 3D",
    status: "v6 STABLE",
    statusType: "live",
    image: "/brand/vivre-model.jpg",
    headline: "High-Fashion 3D Scan Chamber & Editorial Store",
    summary:
      "A cinematic fashion identity pairing oversized streetwear tailoring, electric cobalt typography, and a synchronized 7-angle 3D scan runway chamber.",
    specs: ["React 19", "WebGL Scan Chamber", "Cobalt Identity", "Three.js"],
    architectureDetails: [
      "Eliminates flat catalog grids by placing the visitor inside a 360-degree garment inspection chamber.",
      "Synchronized frame scrubbing tied to cursor physics and touch swipe.",
      "Zero-latency garment tag inspector displaying fabric GSM, weave density, and drop batch numbers.",
    ],
    metrics: [
      { label: "Scan Angles", value: "7 Viewports" },
      { label: "Rendering FPS", value: "60 FPS Locked" },
      { label: "Asset Footprint", value: "Compressed WebP" },
    ],
    launchHref: "/s/v6",
  },
  {
    id: "northline-utility",
    name: "NORTHLINE UTILITY v6",
    category: "design",
    categoryLabel: "01.2 // TECHNICAL COMMERCE",
    status: "PRODUCTION COMMERCE",
    statusType: "prod",
    image: "/brand/northline-hero-underpass.jpg",
    headline: "Fluid WebGL Waterplane & Tactical Outerwear",
    summary:
      "Utility outerwear commerce anchored in concrete underpasses, blue hour train streaks, and real-time WebGL fluid wave dynamics.",
    specs: ["ShaderGradient", "Fluid Dynamics", "Cart Architecture", "Concrete UI"],
    architectureDetails: [
      "Living WebGL fluid shader plane running as an ambient physical world behind all product cards.",
      "Multi-drawer cart architecture with dynamic shipping calculations and size recommendation matrix.",
      "Tactile photography highlighting taped seams, ripstop fabrics, and matte hardware.",
    ],
    metrics: [
      { label: "Shader Engine", value: "@shadergradient/react" },
      { label: "Motion Mode", value: "GPU Accelerated" },
      { label: "Responsive Scope", value: "Mobile + Desktop" },
    ],
    launchHref: "/s/v6#collection",
  },
  {
    id: "fieldtrip-fitting",
    name: "FIELDTRIP FITTING ROOM",
    category: "design",
    categoryLabel: "01.3 // STREETWEAR STAGE",
    status: "INTERACTIVE STAGE",
    statusType: "live",
    image: "/brand/northline-materials.jpg",
    headline: "Mobile-Native 9:16 Reels & GLSL Crease Backdrop",
    summary:
      "A fits-first merchandising architecture presenting styled full-body looks over dynamic GLSL fabric crease shaders that deepen on scroll.",
    specs: ["9:16 Video Reels", "GLSL Crease Shader", "Rigged 3D Chibi", "Tactile Zoom"],
    architectureDetails: [
      "Merchandises complete curated outfits first, allowing the customer to reverse-engineer individual pieces.",
      "Real-time procedural crease shader running in custom GLSL with dynamic color palette crossfades.",
      "Synchronized 3D chibi figure walk-in sequence with interactive outfit chip selection.",
    ],
    metrics: [
      { label: "Shader Type", value: "Per-Fit GLSL Folds" },
      { label: "Aspect Ratio", value: "9:16 Reel Native" },
      { label: "Character Rig", value: "GLB / VRM Avatars" },
    ],
    launchHref: "/s/v5",
  },
  {
    id: "tradelocker-bot",
    name: "TRADELOCKER QUANT BOT",
    category: "bots",
    categoryLabel: "02.1 // QUANTITATIVE EXECUTION",
    status: "LIVE ALGO ENGINE",
    statusType: "live",
    image: "/brand/early-catcher.jpg",
    headline: "High-Frequency TradeLocker Execution & Risk Matrix",
    summary:
      "Algorithmic execution engine interfacing with TradeLocker REST & WebSocket APIs for sub-second position entry, trailing stops, and capital risk limits.",
    specs: ["TradeLocker API", "Sub-65ms Latency", "Trailing Stops", "Risk Breaker"],
    architectureDetails: [
      "Continuous WebSocket stream monitoring price action and liquidity distribution in real-time.",
      "Algorithmic position sizing calculating exact risk percentages prior to order dispatch.",
      "Dynamic drawdown breakers that automatically halt new trades upon hitting predefined daily thresholds.",
    ],
    metrics: [
      { label: "Avg Execution Latency", value: "< 65ms" },
      { label: "Max Daily Drawdown Guard", value: "1.50%" },
      { label: "Uptime Reliability", value: "99.98%" },
    ],
  },
  {
    id: "early-catcher",
    name: "EARLY CATCHER SOLANA",
    category: "bots",
    categoryLabel: "02.2 // MEMPOOL COMPLIANCE GATE",
    status: "7-POINT GATE",
    statusType: "spec",
    image: "/brand/early-catcher.jpg",
    headline: "7-Point Solana Token Sniffer & Rug Protection",
    summary:
      "Autonomous mempool sniffer running Raydium and PumpFun token migrations through a 7-point compliance matrix before alert dispatch.",
    specs: ["Solana RPC Cluster", "7-Point Gate", "LP Burn Verifier", "Honeypot Check"],
    architectureDetails: [
      "Instantly queries Solana token mint accounts to verify mint authority has been permanently revoked.",
      "Validates Raydium LP burn transactions (100% supply burned or locked in verifiable escrow contracts).",
      "Scans top 10 wallet distributions to guarantee insider wallets hold less than 18% of circulating supply.",
    ],
    metrics: [
      { label: "Vetting Criteria", value: "7/7 Strict Gate" },
      { label: "RPC Cluster Ping", value: "14ms Cluster Avg" },
      { label: "False Positive Rate", value: "< 0.4%" },
    ],
  },
  {
    id: "restaurant-ops",
    name: "RESTAURANT OPS APP",
    category: "software",
    categoryLabel: "03.1 // PRODUCTION ENTERPRISE",
    status: "ENTERPRISE PRODUCT",
    statusType: "prod",
    image: "/brand/ops-app.jpg",
    headline: "Real-Time Hospitality Floor Management & Auditing",
    summary:
      "Mission-critical floor plan and inventory management system designed for high-volume restaurants during chaotic dinner services.",
    specs: ["Live Floor Matrix", "Order Routing", "Nightly Stock Audit", "Variance Analytics"],
    architectureDetails: [
      "Interactive 2D table floor plan reflecting live occupancy, turn times, and order course status.",
      "Nightly ingredient stock counts comparing raw consumption against point-of-sale dish sales.",
      "Automated discrepancy alerts highlighting food wastage and inventory shrinkage.",
    ],
    metrics: [
      { label: "Table Turn Improvement", value: "+18% Speed" },
      { label: "Inventory Variance", value: "-4.2% Waste" },
      { label: "Daily Active Floors", value: "High-Volume Production" },
    ],
  },
  {
    id: "agentic-compiler",
    name: "AUTONOMOUS AI ENGINE",
    category: "ai",
    categoryLabel: "04.1 // AGENTIC ARCHITECTURE",
    status: "MULTI-AGENT LOOP",
    statusType: "live",
    image: "/brand/platform.jpg",
    headline: "Multi-Agent Code Orchestration & Synthetic Media",
    summary:
      "Autonomous agent hierarchies leveraging local tool execution, AST refactoring, and synthetic editorial media generation.",
    specs: ["Multi-Agent Loops", "AST Code Refactoring", "Synthetic Media", "Self-Testing"],
    architectureDetails: [
      "Task orchestration dividing complex software refactors into specialized subagent workflows.",
      "Integrated test harness running validation suites and verifying visual design fidelity automatically.",
      "Prompt-to-production deployment pipeline generating code, assets, and documentation concurrently.",
    ],
    metrics: [
      { label: "Refactor Velocity", value: "10x Baseline" },
      { label: "Test Assertion Rate", value: "100% Pass Required" },
      { label: "Agentic Tools", value: "AST + Shell + WebGL" },
    ],
  },
];

interface TelemetryStreamLine {
  id: string;
  time: string;
  tag: string;
  msg: string;
  status: "OK" | "PASS" | "EXEC";
}

const INITIAL_STREAM: TelemetryStreamLine[] = [
  {
    id: "1",
    time: "23:41:02",
    tag: "EarlyCatcher",
    msg: "Raydium LP burn validated [TX: #71b8...a4] — 100% locked",
    status: "PASS",
  },
  {
    id: "2",
    time: "23:41:22",
    tag: "TradeLocker",
    msg: "Trailing stop active: +5.8% margin buffer protected",
    status: "OK",
  },
  {
    id: "3",
    time: "23:41:45",
    tag: "EarlyCatcher",
    msg: "Top-10 holders check: 14.1% < 18% threshold — Mint revoked",
    status: "PASS",
  },
  {
    id: "4",
    time: "23:42:10",
    tag: "AgentNet",
    msg: "AST validation clean: 6 frameworks compiled with zero errors",
    status: "EXEC",
  },
];

const STREAM_QUEUE: Omit<TelemetryStreamLine, "id" | "time">[] = [
  {
    tag: "TradeLocker",
    msg: "Sub-second order dispatch: limit filled @ 142.18 USDT",
    status: "EXEC",
  },
  {
    tag: "EarlyCatcher",
    msg: "Honeypot simulation passed: 0% buy tax / 0% sell tax verified",
    status: "PASS",
  },
  {
    tag: "SolanaNode",
    msg: "RPC Cluster heartbeat: 14ms ping across 12 distributed nodes",
    status: "OK",
  },
  {
    tag: "RestaurantOps",
    msg: "Shift reconciliation complete: 84 covers, 0 stock discrepancies",
    status: "PASS",
  },
  {
    tag: "TradeLocker",
    msg: "Risk telemetry breaker: account drawdown locked at 0.42%",
    status: "OK",
  },
];

interface V7Palette {
  id: string;
  name: string;
  color1: string;
  color2: string;
  color3: string;
  accent: string;
}

const V7_PALETTES: V7Palette[] = [
  { id: "dusk", name: "Northline Dusk (v6)", color1: "#080c10", color2: "#263768", color3: "#c7f453", accent: "#c7f453" },
  { id: "vivre", name: "Vivre Cobalt", color1: "#050814", color2: "#1d3fc4", color3: "#60a5fa", accent: "#1d3fc4" },
  { id: "clay", name: "Terracotta Clay", color1: "#120d0c", color2: "#bc7155", color3: "#f59e0b", accent: "#bc7155" },
  { id: "dawn", name: "Concrete Dawn", color1: "#0d1117", color2: "#475569", color3: "#f6f0e3", accent: "#d5d3d4" },
];

export function PersonalBrandV7() {
  const [activeCategory, setActiveCategory] = useState<SystemCategory>("all");
  const [shaderMode, setShaderMode] = useState<"fold-clay" | "fold-dark" | "fluid">("fold-clay");
  const [activePalette, setActivePalette] = useState<V7Palette>(V7_PALETTES[0]);
  const [selectedSystem, setSelectedSystem] = useState<BrandSystem | null>(null);
  const [stream, setStream] = useState<TelemetryStreamLine[]>(INITIAL_STREAM);
  const [blockHeight, setBlockHeight] = useState(289419350);

  // Live telemetry ticker
  useEffect(() => {
    let qIdx = 0;
    const timer = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(" ")[0];
      const nextItem = STREAM_QUEUE[qIdx % STREAM_QUEUE.length];

      setStream((prev) => [
        {
          id: `${Date.now()}`,
          time: timeStr,
          tag: nextItem.tag,
          msg: nextItem.msg,
          status: nextItem.status,
        },
        ...prev.slice(0, 4),
      ]);

      setBlockHeight((h) => h + Math.floor(Math.random() * 3) + 1);
      qIdx++;
    }, 3600);

    return () => clearInterval(timer);
  }, []);

  const filteredSystems = useMemo(() => {
    if (activeCategory === "all") return SYSTEMS_CATALOG;
    return SYSTEMS_CATALOG.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="v7-brand-root">
      {/* Living Atmospheric Backdrop: Fold Crease (Clay or Dark) or Fluid Waterplane */}
      <div className="v7-backdrop-layer">
        {shaderMode === "fold-clay" ? (
          <FoldBackdrop tone="clay" />
        ) : shaderMode === "fold-dark" ? (
          <FoldBackdrop tone="dark" />
        ) : (
          <NorthlineAtmosphere
            color1={activePalette.color1}
            color2={activePalette.color2}
            color3={activePalette.color3}
          />
        )}
      </div>
      <div className="v7-vignette" />
      <div className="v7-grain" />

      {/* Main Framework Layout */}
      <div className="v7-page-content">
        {/* Sticky Glass Navigation Bar */}
        <header className="v7-header">
          <div className="v7-header-left">
            <div className="v7-brand-logo">
              <span className="v7-status-pulse" />
              <span>ALEX MOREAU</span>
              <span className="v7-mono" style={{ opacity: 0.7 }}>
                / V7 FRAMEWORKS
              </span>
            </div>

            <div className="v7-header-telemetry">
              <span style={{ color: "var(--v7-lime)" }}>●</span>
              <span>RPC 14ms</span>
              <span style={{ opacity: 0.35 }}>|</span>
              <span>BLK #{blockHeight}</span>
            </div>
          </div>

          <div className="v7-header-right">
            {/* Shader Mode Switcher */}
            <div className="v7-mode-toggle" title="Switch Atmospheric Shader">
              <button
                className={`v7-mode-btn ${shaderMode === "fold-clay" ? "active" : ""}`}
                onClick={() => setShaderMode("fold-clay")}
              >
                FOLD CREASE (CLAY)
              </button>
              <button
                className={`v7-mode-btn ${shaderMode === "fold-dark" ? "active" : ""}`}
                onClick={() => setShaderMode("fold-dark")}
              >
                FOLD CREASE (INK)
              </button>
              <button
                className={`v7-mode-btn ${shaderMode === "fluid" ? "active" : ""}`}
                onClick={() => setShaderMode("fluid")}
              >
                FLUID 3D
              </button>
            </div>

            {/* Atmosphere Palette Swatches for Fluid Mode */}
            {shaderMode === "fluid" && (
              <div className="theme-swatches" title="Switch Atmospheric Palette" style={{ marginLeft: "-0.5rem" }}>
                {V7_PALETTES.map((pal) => (
                  <button
                    key={pal.id}
                    className={`theme-swatch ${activePalette.id === pal.id ? "active" : ""}`}
                    style={{ background: pal.accent }}
                    onClick={() => setActivePalette(pal)}
                    title={pal.name}
                    aria-label={pal.name}
                  />
                ))}
              </div>
            )}

            <nav className="v7-nav-links">
              <a href="#systems">Systems</a>
              <a href="#telemetry">Bots</a>
              <a href="#philosophy">Journal</a>
              <a href="#contact">Contact</a>
              <Link to="/s/v6" style={{ color: "var(--v7-lime)", fontWeight: 700 }}>
                VIVRE 3D Runway →
              </Link>
            </nav>
          </div>
        </header>

        {/* Studio Hero Section: Portrait + Layered 'STUDIO' Display Type + Bio-first */}
        <section className="v7-studio-hero">
          <div className="v7-studio-kicker">
            <span className="v7-mono">00 // ATELIER &amp; SYSTEMS ARCHITECTURE</span>
            <span style={{ opacity: 0.3 }}>/</span>
            <span className="v7-mono" style={{ color: "var(--v7-clay)" }}>
              STUDIO PORTRAIT · CONCRETE &amp; CLAY
            </span>
            <span style={{ opacity: 0.3 }}>/</span>
            <span className="v7-mono" style={{ color: "var(--v7-ash)" }}>
              BACKDROP: {shaderMode === "fold-clay" ? "GLSL CREASE (CLAY)" : shaderMode === "fold-dark" ? "GLSL CREASE (INK)" : activePalette.name.toUpperCase()}
            </span>
          </div>

          <div className="v7-studio-stage">
            {/* Left: Portrait Composition with Layered "STUDIO" Headline */}
            <div className="v7-portrait-composition">
              {/* Massive background layer headline in clay */}
              <div className="v7-layered-backdrop-text" aria-hidden="true">
                STUDIO
              </div>

              {/* Black & White Studio Portrait */}
              <div className="v7-portrait-frame">
                <img
                  src="/brand/studio-portrait.jpg"
                  alt="Alex Moreau in studio with design artifacts and systems architecture"
                  className="v7-portrait-img"
                  loading="eager"
                />
                <div className="v7-portrait-gradient-wash" />
                <div className="v7-portrait-tag">
                  <span className="v7-dot-clay" />
                  <span>ALEX MOREAU — FOUNDER / ARCHITECT</span>
                </div>
              </div>
            </div>

            {/* Right: Bio-First Editorial Column in Helvetica */}
            <div className="v7-studio-bio-col">
              <span className="v7-mono" style={{ color: "var(--v7-clay)" }}>
                THE CREATIVE PRACTICE · BIO
              </span>
              <h1 className="v7-studio-title">
                MAKING THINGS
                <br />
                THAT LAST.
              </h1>

              <div className="v7-bio-copy">
                <p className="v7-bio-lead">
                  Alex Moreau is a designer, quantitative builder, and systems architect creating tactile digital storefronts, sub-second trading bots, and autonomous engineering pipelines.
                </p>
                <p>
                  Over the past decade, my work has moved between the physical craft of high-fashion garments and the cold precision of high-frequency execution code. Whether designing 3D scan chambers for Vivre, engineering 7-point Solana mempool gates, or building real-time restaurant floor software, the core philosophy is singular: remove noise, respect the medium, and make things that endure.
                </p>
              </div>

              {/* 4 Mini Discipline Highlights in Hero */}
              <div className="v7-bio-pillars">
                <div className="v7-bio-pillar-item">
                  <span className="v7-pillar-num">01</span>
                  <div>
                    <strong>Web Design &amp; 3D Runway</strong>
                    <p>Vivre, Northline &amp; Fieldtrip tactile commerce</p>
                  </div>
                </div>
                <div className="v7-bio-pillar-item">
                  <span className="v7-pillar-num">02</span>
                  <div>
                    <strong>Quantitative Bots</strong>
                    <p>TradeLocker WS execution &amp; Early Catcher Solana gate</p>
                  </div>
                </div>
                <div className="v7-bio-pillar-item">
                  <span className="v7-pillar-num">03</span>
                  <div>
                    <strong>Production Software</strong>
                    <p>Real-time hospitality floor plan &amp; inventory matrix</p>
                  </div>
                </div>
                <div className="v7-bio-pillar-item">
                  <span className="v7-pillar-num">04</span>
                  <div>
                    <strong>Autonomous AI</strong>
                    <p>Multi-agent AST refactoring &amp; synthetic pipelines</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="v7-studio-actions">
                <a href="#systems" className="v7-btn-clay">
                  EXPLORE SYSTEMS (6) ↓
                </a>
                <a href="#telemetry" className="v7-btn-outline">
                  LIVE BOT TELEMETRY →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Remodeled Framework 01: The Systems Catalog */}
        <section id="systems" className="v7-section">
          <div className="v7-section-head">
            <div>
              <span className="v7-mono">01 // PRODUCTION FRAMEWORKS & CATALOG</span>
              <h2>Selected Systems</h2>
            </div>
            <p>
              Replacing generic storefront grids with production-grade interactive
              architectures. Click any system to inspect its technical specification.
            </p>
          </div>

          {/* Interactive Filter Bar */}
          <div className="v7-filter-bar">
            <button
              className={`v7-filter-tab ${activeCategory === "all" ? "active" : ""}`}
              onClick={() => setActiveCategory("all")}
            >
              <span>ALL DISCIPLINES</span>
              <span className="v7-tab-count">{SYSTEMS_CATALOG.length}</span>
            </button>
            <button
              className={`v7-filter-tab ${activeCategory === "design" ? "active" : ""}`}
              onClick={() => setActiveCategory("design")}
            >
              <span>01 WEB DESIGN & 3D</span>
              <span className="v7-tab-count">3</span>
            </button>
            <button
              className={`v7-filter-tab ${activeCategory === "bots" ? "active" : ""}`}
              onClick={() => setActiveCategory("bots")}
            >
              <span>02 TRADING BOTS</span>
              <span className="v7-tab-count">2</span>
            </button>
            <button
              className={`v7-filter-tab ${activeCategory === "software" ? "active" : ""}`}
              onClick={() => setActiveCategory("software")}
            >
              <span>03 PRODUCTION APPS</span>
              <span className="v7-tab-count">1</span>
            </button>
            <button
              className={`v7-filter-tab ${activeCategory === "ai" ? "active" : ""}`}
              onClick={() => setActiveCategory("ai")}
            >
              <span>04 AUTONOMOUS AI</span>
              <span className="v7-tab-count">1</span>
            </button>
          </div>

          {/* Systems Grid */}
          <div className="v7-systems-grid">
            {filteredSystems.map((sys) => (
              <article
                key={sys.id}
                className="v7-system-card"
                onClick={() => setSelectedSystem(sys)}
              >
                <div className="v7-card-media">
                  <img
                    src={sys.image}
                    alt={sys.name}
                    className="v7-card-img"
                    loading="lazy"
                  />
                  <span
                    className={`v7-card-status-badge ${
                      sys.statusType === "live"
                        ? "badge-live"
                        : sys.statusType === "prod"
                        ? "badge-prod"
                        : "badge-spec"
                    }`}
                  >
                    {sys.status}
                  </span>
                </div>

                <div className="v7-card-body">
                  <div className="v7-card-meta">
                    <span className="v7-mono">{sys.categoryLabel}</span>
                  </div>
                  <h3>{sys.name}</h3>
                  <p>{sys.summary}</p>

                  <div className="v7-card-specs">
                    {sys.specs.map((sp) => (
                      <span key={sp} className="v7-spec-pill">
                        {sp}
                      </span>
                    ))}
                  </div>

                  <div className="v7-inspect-btn">
                    <span>INSPECT ARCHITECTURE</span>
                    <span>→</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Remodeled Framework 02: Quantitative Bots & Telemetry Console */}
        <section id="telemetry" className="v7-section">
          <div className="v7-section-head">
            <div>
              <span className="v7-mono">02 // ALGORITHMIC OPERATIONS & TELEMETRY</span>
              <h2>Bots &amp; Execution</h2>
            </div>
            <p>
              Real-time monitoring of TradeLocker order dispatch and Solana mempool
              safety evaluation running inside sub-second loops.
            </p>
          </div>

          <div className="v7-console-container">
            <div className="v7-console-left">
              <span className="v7-mono" style={{ color: "var(--v7-lime)" }}>
                7-POINT SOLANA COMPLIANCE & RISK ENGINE
              </span>
              <h3>Early Catcher &amp; TradeLocker</h3>
              <p>
                A high-reliability dual bot pipeline. TradeLocker handles algorithmic
                position sizing and trailing stops via WebSocket feeds, while Early
                Catcher intercepts newly deployed Solana contracts and verifies 7
                strict criteria before dispatching execution alerts.
              </p>

              <div className="v7-gate-matrix">
                <div className="v7-gate-row">
                  <span className="v7-gate-name">
                    <span>01</span> MINT AUTHORITY REVOCATION
                  </span>
                  <span className="v7-gate-val">PERMANENTLY REVOKED [PASS]</span>
                </div>
                <div className="v7-gate-row">
                  <span className="v7-gate-name">
                    <span>02</span> LIQUIDITY POOL ESCROW / BURN
                  </span>
                  <span className="v7-gate-val">100% BURN VERIFIED [PASS]</span>
                </div>
                <div className="v7-gate-row">
                  <span className="v7-gate-name">
                    <span>03</span> TOP-10 WALLET CONCENTRATION
                  </span>
                  <span className="v7-gate-val">&lt; 18.0% CIRCULATING [PASS]</span>
                </div>
                <div className="v7-gate-row">
                  <span className="v7-gate-name">
                    <span>04</span> HONEYPOT TAX SIMULATION
                  </span>
                  <span className="v7-gate-val">0% BUY / 0% SELL [PASS]</span>
                </div>
                <div className="v7-gate-row">
                  <span className="v7-gate-name">
                    <span>05</span> METADATA IMMUTABILITY
                  </span>
                  <span className="v7-gate-val">IMMUTABLE ON-CHAIN [PASS]</span>
                </div>
                <div className="v7-gate-row">
                  <span className="v7-gate-name">
                    <span>06</span> MINIMUM INITIAL LIQUIDITY
                  </span>
                  <span className="v7-gate-val">&gt; 50 SOL POOL DEPTH [PASS]</span>
                </div>
                <div className="v7-gate-row">
                  <span className="v7-gate-name">
                    <span>07</span> INSIDER BUNDLING DETECTOR
                  </span>
                  <span className="v7-gate-val">CLEAN CLUSTER [PASS]</span>
                </div>
              </div>
            </div>

            {/* Live Streaming Terminal */}
            <div className="v7-terminal-window">
              <div className="v7-term-header">
                <span>EVENT STREAM // ACTIVE DISPATCH</span>
                <span style={{ color: "var(--v7-lime)" }}>LIVE CLUSTER</span>
              </div>

              <div className="v7-term-body">
                {stream.map((item) => (
                  <div key={item.id} className="v7-term-entry">
                    <span style={{ opacity: 0.45 }}>[{item.time}]</span>
                    <span style={{ color: "#fff", fontWeight: 700 }}>
                      {item.tag}:
                    </span>
                    <span style={{ flex: 1, opacity: 0.9 }}>{item.msg}</span>
                    <span
                      style={{
                        color:
                          item.status === "PASS"
                            ? "var(--v7-lime)"
                            : item.status === "EXEC"
                            ? "var(--v7-azure)"
                            : "var(--v7-cream)",
                        fontWeight: 700,
                      }}
                    >
                      [{item.status}]
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Remodeled Framework 03: The 4-Act Editorial System Story */}
        <section id="philosophy" className="v7-section">
          <div className="v7-section-head">
            <div>
              <span className="v7-mono">03 // ENGINEERING MANIFESTO</span>
              <h2>System Architecture</h2>
            </div>
            <p>
              Four foundational principles defining how digital commerce,
              quantitative code, and autonomous systems are built.
            </p>
          </div>

          <div className="v7-story-grid">
            <div className="v7-story-card">
              <span className="v7-story-num">ACT 01 // TACTILE DIGITAL</span>
              <h4>Weight Over Flatness</h4>
              <p>
                Digital storefronts should not feel like corporate spreadsheets.
                By embedding 3D scan chambers and procedural GLSL crease shaders,
                interfaces inherit the physical drape, texture, and gravity of
                real garments.
              </p>
            </div>

            <div className="v7-story-card">
              <span className="v7-story-num">ACT 02 // SUB-SECOND MECHANICS</span>
              <h4>Execution Over Guesswork</h4>
              <p>
                In algorithmic trading, latency is the only undeniable truth.
                Sub-65ms execution pipelines coupled with deterministic 7-point
                safety gates outperform human discretion and emotional bias every time.
              </p>
            </div>

            <div className="v7-story-card">
              <span className="v7-story-num">ACT 03 // BATTLE-TESTED</span>
              <h4>Tested in Chaos</h4>
              <p>
                Production hospitality software must survive the pressure of a
                packed Saturday night dinner service. Zero-latency table updates,
                instant order routing, and automated stock audits replace fragile paper.
              </p>
            </div>

            <div className="v7-story-card">
              <span className="v7-story-num">ACT 04 // AGENTIC WORKFLOWS</span>
              <h4>Autonomous Acceleration</h4>
              <p>
                AI is far more than an autocomplete prompt. It is an orchestrated
                crew of specialized autonomous agents executing AST refactoring,
                synthetic imagery generation, and continuous test verification.
              </p>
            </div>
          </div>
        </section>

        {/* Remodeled Framework 04: Contact & Availability Footer */}
        <footer id="contact" className="v7-footer">
          <div>
            <span className="v7-mono">CONNECT // AVAILABILITY Q4 2026</span>
            <div className="v7-footer-big">LET'S BUILD SYSTEMS THAT LAST.</div>
          </div>

          <div className="v7-footer-links">
            <a href="mailto:alex@northline-studio.com">EMAIL</a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              GITHUB
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              TWITTER / X
            </a>
            <Link to="/s/v6" style={{ color: "var(--v7-lime)" }}>
              VIVRE 3D RUNWAY →
            </Link>
          </div>
        </footer>
      </div>

      {/* Slide-out Architecture Inspection Drawer (Replaces Cart Drawer) */}
      {selectedSystem && (
        <div
          className="v7-drawer-overlay"
          onClick={() => setSelectedSystem(null)}
        >
          <div
            className="v7-spec-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="v7-drawer-close"
              onClick={() => setSelectedSystem(null)}
            >
              ✕ CLOSE INSPECTOR
            </button>

            <div className="v7-drawer-img-wrap">
              <img src={selectedSystem.image} alt={selectedSystem.name} />
            </div>

            <span className="v7-mono" style={{ color: "var(--v7-lime)" }}>
              {selectedSystem.categoryLabel}
            </span>
            <div className="v7-drawer-title">{selectedSystem.name}</div>
            <p style={{ color: "#f6f0e3cc", marginBottom: "2rem", lineHeight: 1.6 }}>
              {selectedSystem.headline}
            </p>

            <div style={{ marginBottom: "2rem" }}>
              <span className="v7-mono">TECHNICAL ARCHITECTURE</span>
              <ul
                style={{
                  marginTop: "0.8rem",
                  paddingLeft: "1.2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                  color: "#f6f0e3aa",
                  fontSize: "0.88rem",
                }}
              >
                {selectedSystem.architectureDetails.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>

            <div style={{ marginBottom: "2.5rem" }}>
              <span className="v7-mono">BENCHMARKS &amp; TELEMETRY</span>
              <div
                style={{
                  marginTop: "0.8rem",
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "0.8rem",
                }}
              >
                {selectedSystem.metrics.map((m) => (
                  <div
                    key={m.label}
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      padding: "0.8rem",
                      borderRadius: "10px",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--v7-display)",
                        fontSize: "1.3rem",
                        fontWeight: 900,
                        color: "var(--v7-cream)",
                      }}
                    >
                      {m.value}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--v7-mono)",
                        fontSize: "0.65rem",
                        color: "var(--v7-ash)",
                        marginTop: "0.2rem",
                      }}
                    >
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedSystem.launchHref && (
              <Link
                to={selectedSystem.launchHref}
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "1rem",
                  background: "var(--v7-lime)",
                  color: "var(--v7-ink)",
                  fontWeight: 800,
                  borderRadius: "12px",
                  textDecoration: "none",
                  fontFamily: "var(--v7-sans)",
                  letterSpacing: "0.02em",
                  marginTop: "auto",
                }}
              >
                LAUNCH LIVE SYSTEM EXPERIENCE →
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
