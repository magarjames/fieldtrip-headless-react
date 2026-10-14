import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { FoldBackdrop } from "@/components/street/FoldBackdrop";
import "@/components/studio/studio.css";

export type StudioCategory = "all" | "design" | "bots" | "software" | "ai";

export interface StudioProject {
  id: string;
  name: string;
  category: "design" | "bots" | "software" | "ai";
  categoryLabel: string;
  status: string;
  image: string;
  headline: string;
  summary: string;
  specs: string[];
  architectureDetails: string[];
  metrics: { label: string; value: string }[];
  launchHref?: string;
}

const STUDIO_PROJECTS: StudioProject[] = [
  {
    id: "vivre-runway",
    name: "VIVRE DROP 001",
    category: "design",
    categoryLabel: "01.1 // FASHION IDENTITY & 3D",
    status: "v6 STABLE",
    image: "/brand/vivre-model.jpg",
    headline: "High-Fashion 3D Scan Chamber & Editorial Storefront",
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
    time: "00:08:12",
    tag: "EarlyCatcher",
    msg: "Raydium LP burn validated [TX: #71b8...a4] — 100% locked",
    status: "PASS",
  },
  {
    id: "2",
    time: "00:08:34",
    tag: "TradeLocker",
    msg: "Trailing stop active: +5.8% margin buffer protected",
    status: "OK",
  },
  {
    id: "3",
    time: "00:08:52",
    tag: "EarlyCatcher",
    msg: "Top-10 holders check: 14.1% < 18% threshold — Mint revoked",
    status: "PASS",
  },
  {
    id: "4",
    time: "00:09:14",
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

export interface BrandConcept {
  id: string;
  number: string;
  name: string;
  vibe: string;
  image: string;
  headline: string;
  tags: string[];
  active?: boolean;
  liveRoute?: string;
}

export const BRAND_CONCEPTS: BrandConcept[] = [
  {
    id: "studio-atelier",
    number: "01 // CURRENT LIVE BUILD",
    name: "Studio Atelier · Concrete & Clay",
    vibe: "Warm editorial studio, real-time procedural fold crease shader gradient, B&W studio portrait with layered clay display headline, bio-first narrative, and live Solana bot telemetry.",
    image: "/brand/james-thapa-portrait.jpg",
    headline: "Making things that last.",
    tags: ["Living Light Shader", "Studio Portrait", "Layered Display", "Helvetica", "Live Telemetry"],
    active: true,
    liveRoute: "/studio",
  },
  {
    id: "split-flap-departures",
    number: "02 // TRANSIT EDITORIAL",
    name: "The Departures Board",
    vibe: "Cinematic dusk railway platform, mechanical cream-on-ink split-flap departure board categorizing creative projects as high-speed departures across tracks.",
    image: "/concepts/pb7_departures.jpg",
    headline: "Every project is a way home.",
    tags: ["Split-Flap Board", "Twilight Platform", "Monospace", "Transit Metaphor", "01/05 Index"],
  },
  {
    id: "cream-archival-index",
    number: "03 // SWISS EDITORIAL",
    name: "Cream Archival Contents Page",
    vibe: "Warm cream paper #F6F0E3, colossal condensed black wordmark across the top edge, numbered archival index, with floating tactile material zoom crops on hover.",
    image: "/concepts/pb2_cream_index.jpg",
    headline: "JAMES THAPA — Index 2026",
    tags: ["Warm Paper #F6F0E3", "Massive Typography", "Floating Hover Crop", "Archival Specs"],
    liveRoute: "/brand",
  },
  {
    id: "dusk-underpass",
    number: "04 // CINEMATIC TECHNICAL",
    name: "Dusk Underpass & Train Streaks",
    vibe: "Full-bleed blue hour cinematic photography of technical outerwear against brutalist concrete walls, with white bold lower-left Helvetica typography.",
    image: "/concepts/pb1_dusk_underpass.jpg",
    headline: "Making things that last.",
    tags: ["Full-Bleed 16:9", "Blue Hour", "Concrete Underpass", "Quiet Luxury", "Kinfolk Editorial"],
  },
  {
    id: "tactile-materials",
    number: "05 // MATERIAL CLOSEUPS",
    name: "Tactile Material Lab & Hardware",
    vibe: "Dark obsidian ink #000D10 split layout: macro photography of ripstop fabric, denim, and matte zipper hardware, paired with structured discipline columns.",
    image: "/concepts/pb4_material_closeups.jpg",
    headline: "Fabric does the talking. So does the work.",
    tags: ["Tactile Ripstop", "Split Matrix", "Hardware Macro", "Dark Obsidian", "Brand / Product / Direction"],
  },
  {
    id: "film-sequence",
    number: "06 // CINEMATIC FILM SEQUENCE",
    name: "Letterboxed 3-Frame Film Strip",
    vibe: "Midnight navy page structured as a 21:9 letterboxed motion film sequence: train platform at night, sketchbook ideation, finished garment on rack.",
    image: "/concepts/pb5_film_strip.jpg",
    headline: "One less decision before the door.",
    tags: ["21:9 Letterbox", "Midnight Navy #0F0F1C", "Numbered Frames", "Narrative Sequence", "Clay Dot Status"],
  },
  {
    id: "virtual-os",
    number: "07 // VIRTUAL DESKTOP & CLI",
    name: "Spatial OS & Blueprint Console",
    vibe: "Interactive retro-futuristic virtual desktop OS with floating draggable windows, live bash terminal console ($ cat about.txt), and retro audio cassette player.",
    image: "/concepts/6_virtual_os.jpg",
    headline: "Systems architecture & developer playground.",
    tags: ["Virtual Desktop", "Live Bash CLI", "Cassette Player", "Glass App Dock", "Draggable Windows"],
  },
  {
    id: "vivre-runway-3d",
    number: "08 // 3D RUNWAY CHAMBER",
    name: "VIVRE 3D Scan Chamber & Fluid WebGL",
    vibe: "Electric cobalt typography, 360-degree interactive 3D model rotation chamber with 7 synchronized viewports, and living GPU fluid wave waterplane.",
    image: "/brand/vivre-model.jpg",
    headline: "Tactile 3D Scan Chamber & WebGL Fluids",
    tags: ["Cobalt Identity", "3D Scan Chamber", "WebGL Fluid Plane", "Synchronized Angle Scrubber"],
    liveRoute: "/s/v6",
  },
];

export function StudioWebsite() {
  const [activeCategory, setActiveCategory] = useState<StudioCategory>("all");
  const [selectedProject, setSelectedProject] = useState<StudioProject | null>(null);
  const [showConceptsModal, setShowConceptsModal] = useState(false);
  const [stream, setStream] = useState<TelemetryStreamLine[]>(INITIAL_STREAM);
  const [blockHeight, setBlockHeight] = useState(289419510);

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

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return STUDIO_PROJECTS;
    return STUDIO_PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="studio-root">
      {/* Living Light Crease Shader Backdrop in Warm Studio Clay & Paper */}
      <div className="studio-backdrop-layer">
        <FoldBackdrop tone="studio-light" />
      </div>
      <div className="studio-vignette" />
      <div className="studio-grain" />

      {/* Main Studio Website Content */}
      <div className="studio-content">
        {/* Sticky Glass Studio Header */}
        <header className="studio-header">
          <div className="studio-header-left">
            <div className="studio-brand-logo">
              <span className="studio-dot-clay" />
              <span>JAMES THAPA</span>
              <span className="studio-mono" style={{ opacity: 0.7 }}>
                / STUDIO 2026
              </span>
            </div>

            <div className="studio-telemetry-badge">
              <span style={{ color: "var(--st-clay)", fontWeight: 700 }}>●</span>
              <span>RPC 14ms</span>
              <span style={{ opacity: 0.35 }}>|</span>
              <span>SOLANA #{blockHeight}</span>
            </div>
          </div>

          <div className="studio-header-right">
            <button
              type="button"
              className="studio-concepts-pill"
              onClick={() => setShowConceptsModal(true)}
            >
              <span>EXPLORE 8 CONCEPTS</span>
              <span style={{ opacity: 0.8 }}>↗</span>
            </button>
            <nav className="studio-nav-links">
              <a href="#studio">Studio</a>
              <a href="#works">Selected Works</a>
              <a href="#telemetry">Bots &amp; Algo</a>
              <a href="#manifesto">Manifesto</a>
              <a href="#contact">Contact</a>
              <Link to="/s/v6" style={{ color: "var(--st-clay)", fontWeight: 700 }}>
                VIVRE 3D Runway →
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero Section: Studio Composition with Layered STUDIO Display Type + Bio-First */}
        <section id="studio" className="studio-hero">
          <div className="studio-kicker">
            <span className="studio-mono">00 // ATELIER &amp; SYSTEMS ARCHITECTURE</span>
            <span style={{ opacity: 0.3 }}>/</span>
            <button
              type="button"
              onClick={() => setShowConceptsModal(true)}
              style={{
                background: "rgba(188, 113, 85, 0.12)",
                border: "1px solid var(--st-clay)",
                borderRadius: "999px",
                padding: "0.2rem 0.65rem",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
              }}
            >
              <span className="studio-dot-clay" style={{ width: 6, height: 6 }} />
              <span className="studio-mono" style={{ color: "var(--st-clay)", fontWeight: 700 }}>
                SHOW ALL 8 CONCEPTS ↗
              </span>
            </button>
            <span style={{ opacity: 0.3 }}>/</span>
            <span className="studio-mono">LONDON &amp; DISTRIBUTED</span>
          </div>

          <div className="studio-stage">
            {/* Left: Portrait Composition with Layered "STUDIO" Headline */}
            <div className="studio-portrait-composition">
              {/* Massive background layer headline in clay */}
              <div className="studio-layered-headline" aria-hidden="true">
                STUDIO
              </div>

              {/* Black & White Studio Portrait */}
              <div className="studio-portrait-frame">
                <img
                  src="/brand/james-thapa-portrait.jpg"
                  alt="James Thapa in studio with design artifacts and systems architecture"
                  className="studio-portrait-img"
                  loading="eager"
                />
                <div className="studio-portrait-tag">
                  <span className="studio-dot-clay" />
                  <span>JAMES THAPA — FOUNDER / ARCHITECT</span>
                </div>
              </div>
            </div>

            {/* Right: Bio-First Editorial Column in Helvetica */}
            <div className="studio-bio-col">
              <span className="studio-mono" style={{ color: "var(--st-clay)" }}>
                THE CREATIVE PRACTICE · BIO
              </span>
              <h1 className="studio-title">
                MAKING THINGS
                <br />
                THAT LAST.
              </h1>

              <div className="studio-bio-copy">
                <p className="studio-bio-lead">
                  James Thapa is a designer, quantitative builder, and systems architect creating tactile digital storefronts, sub-second trading bots, and autonomous engineering pipelines.
                </p>
                <p>
                  Over the past decade, my work has moved between the physical craft of high-fashion garments and the cold precision of high-frequency execution code. Whether designing 3D scan chambers for Vivre, engineering 7-point Solana mempool gates, or building real-time restaurant floor software, the core philosophy is singular: remove noise, respect the medium, and make things that endure.
                </p>
              </div>

              {/* 4 Mini Discipline Highlights */}
              <div className="studio-bio-pillars">
                <div className="studio-bio-pillar-item">
                  <span className="studio-pillar-num">01</span>
                  <div>
                    <strong>Web Design &amp; 3D Runway</strong>
                    <p>Vivre, Northline &amp; Fieldtrip tactile commerce</p>
                  </div>
                </div>
                <div className="studio-bio-pillar-item">
                  <span className="studio-pillar-num">02</span>
                  <div>
                    <strong>Quantitative Bots</strong>
                    <p>TradeLocker WS execution &amp; Early Catcher Solana gate</p>
                  </div>
                </div>
                <div className="studio-bio-pillar-item">
                  <span className="studio-pillar-num">03</span>
                  <div>
                    <strong>Production Software</strong>
                    <p>Real-time hospitality floor plan &amp; inventory matrix</p>
                  </div>
                </div>
                <div className="studio-bio-pillar-item">
                  <span className="studio-pillar-num">04</span>
                  <div>
                    <strong>Autonomous AI</strong>
                    <p>Multi-agent AST refactoring &amp; synthetic pipelines</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="studio-actions">
                <a href="#works" className="studio-btn-clay">
                  EXPLORE SELECTED WORKS (6) ↓
                </a>
                <a href="#telemetry" className="studio-btn-outline">
                  LIVE BOT TELEMETRY →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section 01: Selected Works & Interactive Systems Catalog */}
        <section id="works" className="studio-section">
          <div className="studio-section-head">
            <div>
              <span className="studio-mono">01 // PRODUCTION ARCHITECTURES</span>
              <h2>Selected Works</h2>
            </div>
            <p>
              A curated catalog of tactile digital storefronts, quantitative execution
              engines, and operational software. Click any project to inspect its architectural spec.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="studio-filter-bar">
            <button
              className={`studio-filter-tab ${activeCategory === "all" ? "active" : ""}`}
              onClick={() => setActiveCategory("all")}
            >
              <span>ALL DISCIPLINES</span>
              <span className="studio-tab-count">{STUDIO_PROJECTS.length}</span>
            </button>
            <button
              className={`studio-filter-tab ${activeCategory === "design" ? "active" : ""}`}
              onClick={() => setActiveCategory("design")}
            >
              <span>01 WEB DESIGN & 3D</span>
              <span className="studio-tab-count">3</span>
            </button>
            <button
              className={`studio-filter-tab ${activeCategory === "bots" ? "active" : ""}`}
              onClick={() => setActiveCategory("bots")}
            >
              <span>02 TRADING BOTS</span>
              <span className="studio-tab-count">2</span>
            </button>
            <button
              className={`studio-filter-tab ${activeCategory === "software" ? "active" : ""}`}
              onClick={() => setActiveCategory("software")}
            >
              <span>03 PRODUCTION APPS</span>
              <span className="studio-tab-count">1</span>
            </button>
            <button
              className={`studio-filter-tab ${activeCategory === "ai" ? "active" : ""}`}
              onClick={() => setActiveCategory("ai")}
            >
              <span>04 AUTONOMOUS AI</span>
              <span className="studio-tab-count">1</span>
            </button>
          </div>

          {/* Systems Grid in Light Editorial Cards */}
          <div className="studio-systems-grid">
            {filteredProjects.map((p) => (
              <article
                key={p.id}
                className="studio-system-card"
                onClick={() => setSelectedProject(p)}
              >
                <div className="studio-card-media">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="studio-card-img"
                    loading="lazy"
                  />
                  <span className="studio-card-badge">{p.status}</span>
                </div>

                <div className="studio-card-body">
                  <div className="studio-card-meta">
                    <span className="studio-mono">{p.categoryLabel}</span>
                  </div>
                  <h3>{p.name}</h3>
                  <p>{p.summary}</p>

                  <div className="studio-card-specs">
                    {p.specs.map((sp) => (
                      <span key={sp} className="studio-spec-pill">
                        {sp}
                      </span>
                    ))}
                  </div>

                  <div className="studio-inspect-btn">
                    <span>INSPECT ARCHITECTURE SPEC</span>
                    <span>→</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Section 02: Quantitative Bots & Algorithmic Telemetry Hub */}
        <section id="telemetry" className="studio-section">
          <div className="studio-section-head">
            <div>
              <span className="studio-mono">02 // ALGORITHMIC OPERATIONS</span>
              <h2>Bots &amp; Execution</h2>
            </div>
            <p>
              Real-time monitoring of TradeLocker order execution and Early Catcher
              Solana mempool safety evaluation in sub-second loops.
            </p>
          </div>

          <div className="studio-console-wrap">
            <div className="studio-console-left">
              <span className="studio-mono" style={{ color: "var(--st-clay)" }}>
                7-POINT SOLANA COMPLIANCE & RISK ENGINE
              </span>
              <h3>Early Catcher &amp; TradeLocker</h3>
              <p>
                A high-reliability dual bot pipeline. TradeLocker handles algorithmic
                position sizing and trailing stops via WebSocket feeds, while Early
                Catcher intercepts newly deployed Solana contracts and verifies 7
                strict criteria before dispatching execution alerts.
              </p>

              <div className="studio-gate-matrix">
                <div className="studio-gate-row">
                  <span className="studio-gate-name">
                    <span>01</span> MINT AUTHORITY REVOCATION
                  </span>
                  <span className="studio-gate-val">PERMANENTLY REVOKED [PASS]</span>
                </div>
                <div className="studio-gate-row">
                  <span className="studio-gate-name">
                    <span>02</span> LIQUIDITY POOL ESCROW / BURN
                  </span>
                  <span className="studio-gate-val">100% BURN VERIFIED [PASS]</span>
                </div>
                <div className="studio-gate-row">
                  <span className="studio-gate-name">
                    <span>03</span> TOP-10 WALLET CONCENTRATION
                  </span>
                  <span className="studio-gate-val">&lt; 18.0% CIRCULATING [PASS]</span>
                </div>
                <div className="studio-gate-row">
                  <span className="studio-gate-name">
                    <span>04</span> HONEYPOT TAX SIMULATION
                  </span>
                  <span className="studio-gate-val">0% BUY / 0% SELL [PASS]</span>
                </div>
                <div className="studio-gate-row">
                  <span className="studio-gate-name">
                    <span>05</span> METADATA IMMUTABILITY
                  </span>
                  <span className="studio-gate-val">IMMUTABLE ON-CHAIN [PASS]</span>
                </div>
                <div className="studio-gate-row">
                  <span className="studio-gate-name">
                    <span>06</span> MINIMUM INITIAL LIQUIDITY
                  </span>
                  <span className="studio-gate-val">&gt; 50 SOL POOL DEPTH [PASS]</span>
                </div>
                <div className="studio-gate-row">
                  <span className="studio-gate-name">
                    <span>07</span> INSIDER BUNDLING DETECTOR
                  </span>
                  <span className="studio-gate-val">CLEAN CLUSTER [PASS]</span>
                </div>
              </div>
            </div>

            {/* Live Streaming Terminal */}
            <div className="studio-terminal-window">
              <div className="studio-term-header">
                <span>EVENT STREAM // ACTIVE DISPATCH</span>
                <span style={{ color: "var(--st-clay)", fontWeight: 700 }}>
                  LIVE CLUSTER
                </span>
              </div>

              <div className="studio-term-body">
                {stream.map((item) => (
                  <div key={item.id} className="studio-term-entry">
                    <span style={{ opacity: 0.45 }}>[{item.time}]</span>
                    <span style={{ color: "#fff", fontWeight: 700 }}>
                      {item.tag}:
                    </span>
                    <span style={{ flex: 1, opacity: 0.9 }}>{item.msg}</span>
                    <span
                      style={{
                        color:
                          item.status === "PASS"
                            ? "#86efac"
                            : item.status === "EXEC"
                            ? "#93c5fd"
                            : "#f6f0e3",
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

        {/* Section 03: The 4-Act Engineering Manifesto */}
        <section id="manifesto" className="studio-section">
          <div className="studio-section-head">
            <div>
              <span className="studio-mono">03 // ENGINEERING PHILOSOPHY</span>
              <h2>Studio Manifesto</h2>
            </div>
            <p>
              Four foundational principles defining how digital commerce,
              quantitative code, and autonomous systems are built.
            </p>
          </div>

          <div className="studio-story-grid">
            <div className="studio-story-card">
              <span className="studio-story-num">ACT 01 // TACTILE DIGITAL</span>
              <h4>Weight Over Flatness</h4>
              <p>
                Digital storefronts should not feel like corporate spreadsheets.
                By embedding 3D scan chambers and procedural GLSL crease shaders,
                interfaces inherit the physical drape, texture, and gravity of
                real garments.
              </p>
            </div>

            <div className="studio-story-card">
              <span className="studio-story-num">ACT 02 // SUB-SECOND MECHANICS</span>
              <h4>Execution Over Guesswork</h4>
              <p>
                In algorithmic trading, latency is the only undeniable truth.
                Sub-65ms execution pipelines coupled with deterministic 7-point
                safety gates outperform human discretion and emotional bias every time.
              </p>
            </div>

            <div className="studio-story-card">
              <span className="studio-story-num">ACT 03 // BATTLE-TESTED</span>
              <h4>Tested in Chaos</h4>
              <p>
                Production hospitality software must survive the pressure of a
                packed Saturday night dinner service. Zero-latency table updates,
                instant order routing, and automated stock audits replace fragile paper.
              </p>
            </div>

            <div className="studio-story-card">
              <span className="studio-story-num">ACT 04 // AGENTIC WORKFLOWS</span>
              <h4>Autonomous Acceleration</h4>
              <p>
                AI is far more than an autocomplete prompt. It is an orchestrated
                crew of specialized autonomous agents executing AST refactoring,
                synthetic imagery generation, and continuous test verification.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: Colophon & Contact Footer */}
        <footer id="contact" className="studio-footer">
          <div>
            <span className="studio-mono">CONNECT // AVAILABILITY 2026</span>
            <div className="studio-footer-big">LET'S BUILD SOMETHING THAT LASTS.</div>
          </div>

          <div className="studio-footer-links">
            <a href="mailto:james@northline-studio.com">EMAIL</a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              GITHUB
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              TWITTER / X
            </a>
            <Link to="/s/v6" style={{ color: "var(--st-clay)", fontWeight: 700 }}>
              VIVRE 3D RUNWAY →
            </Link>
          </div>
        </footer>
      </div>

      {/* Slide-out Architecture Inspection Drawer */}
      {selectedProject && (
        <div
          className="studio-drawer-overlay"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="studio-spec-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="studio-drawer-close"
              onClick={() => setSelectedProject(null)}
            >
              ✕ CLOSE INSPECTOR
            </button>

            <div className="studio-drawer-img-wrap">
              <img src={selectedProject.image} alt={selectedProject.name} />
            </div>

            <span className="studio-mono" style={{ color: "var(--st-clay)" }}>
              {selectedProject.categoryLabel}
            </span>
            <div className="studio-drawer-title">{selectedProject.name}</div>
            <p style={{ color: "var(--st-ink-soft)", marginBottom: "2rem", lineHeight: 1.6 }}>
              {selectedProject.headline}
            </p>

            <div style={{ marginBottom: "2rem" }}>
              <span className="studio-mono">TECHNICAL ARCHITECTURE</span>
              <ul
                style={{
                  marginTop: "0.8rem",
                  paddingLeft: "1.2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                  color: "var(--st-ink-soft)",
                  fontSize: "0.9rem",
                }}
              >
                {selectedProject.architectureDetails.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>

            <div style={{ marginBottom: "2.5rem" }}>
              <span className="studio-mono">BENCHMARKS &amp; TELEMETRY</span>
              <div
                style={{
                  marginTop: "0.8rem",
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "0.8rem",
                }}
              >
                {selectedProject.metrics.map((m) => (
                  <div
                    key={m.label}
                    style={{
                      background: "rgba(13, 17, 23, 0.04)",
                      padding: "0.8rem",
                      borderRadius: "10px",
                      border: "1px solid rgba(13, 17, 23, 0.08)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--st-display)",
                        fontSize: "1.3rem",
                        fontWeight: 900,
                        color: "var(--st-ink)",
                      }}
                    >
                      {m.value}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--st-mono)",
                        fontSize: "0.65rem",
                        color: "var(--st-concrete)",
                        marginTop: "0.2rem",
                      }}
                    >
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedProject.launchHref && (
              <Link
                to={selectedProject.launchHref}
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "1rem",
                  background: "var(--st-clay)",
                  color: "#fff",
                  fontWeight: 800,
                  borderRadius: "12px",
                  textDecoration: "none",
                  fontFamily: "var(--st-sans)",
                  letterSpacing: "0.02em",
                  marginTop: "auto",
                }}
              >
                LAUNCH LIVE EXPERIENCE →
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Interactive 8 Concepts Comparison Modal */}
      {showConceptsModal && (
        <div
          className="studio-concepts-overlay"
          onClick={() => setShowConceptsModal(false)}
        >
          <div
            className="studio-concepts-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="studio-concepts-head">
              <div>
                <span className="studio-mono" style={{ color: "var(--st-clay)" }}>
                  BRAND &amp; DESIGN SYSTEM DIRECTORY
                </span>
                <div className="studio-concepts-title">
                  8 Different Design Concepts
                </div>
                <p style={{ color: "var(--st-ink-soft)", marginTop: "0.5rem", maxWidth: "60ch", fontSize: "0.95rem" }}>
                  Explore the 8 architectural directions developed for James Thapa. From quiet-luxury editorial layouts and twilight train station boards to interactive 3D scan chambers and living fold crease shaders.
                </p>
              </div>

              <button
                type="button"
                className="studio-drawer-close"
                onClick={() => setShowConceptsModal(false)}
                style={{ margin: 0 }}
              >
                ✕ CLOSE CONCEPTS
              </button>
            </div>

            <div className="studio-concepts-grid">
              {BRAND_CONCEPTS.map((concept) => (
                <div key={concept.id} className="studio-concept-item">
                  <div className="studio-concept-media">
                    <img src={concept.image} alt={concept.name} />
                    <span className="studio-concept-badge">{concept.number}</span>
                    {concept.active && (
                      <span className="studio-concept-active-pill">
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />
                        CURRENT VIEW
                      </span>
                    )}
                  </div>

                  <div className="studio-concept-info">
                    <span className="studio-mono" style={{ color: "var(--st-clay)", fontWeight: 700 }}>
                      {concept.headline}
                    </span>
                    <div className="studio-concept-name">{concept.name}</div>
                    <div className="studio-concept-vibe">{concept.vibe}</div>

                    <div className="studio-concept-tags">
                      {concept.tags.map((tag) => (
                        <span key={tag} className="studio-concept-tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="studio-concept-actions">
                      {concept.liveRoute ? (
                        <Link
                          to={concept.liveRoute}
                          className="studio-concept-btn primary"
                          onClick={() => setShowConceptsModal(false)}
                        >
                          OPEN LIVE VERSION →
                        </Link>
                      ) : (
                        <div
                          className="studio-concept-btn outline"
                          style={{ cursor: "default", opacity: 0.8 }}
                        >
                          READY TO IMPLEMENT
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
