import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { NorthlineAtmosphere } from "@/components/northline/NorthlineAtmosphere";
import { pageMeta } from "@/components/northline/parts";
import "@/components/brand/brand.css";

export const Route = createFileRoute("/brand")({
  component: PersonalBrandPage,
  head: () => ({
    ...pageMeta(
      "Personal Branding | Designer, Builder & Systems Engineer",
      "Portfolio & engineering index across Website Design, Trading Bots, Production Software, and Autonomous AI Systems.",
    ),
  }),
});

interface ThemePreset {
  id: string;
  name: string;
  color1: string;
  color2: string;
  color3: string;
  displayColor: string;
}

const THEMES: ThemePreset[] = [
  {
    id: "dusk",
    name: "Northline Dusk (v6)",
    color1: "#0b0f0f",
    color2: "#263768",
    color3: "#c7f453",
    displayColor: "#c7f453",
  },
  {
    id: "vivre",
    name: "Vivre Cobalt",
    color1: "#050814",
    color2: "#1d3fc4",
    color3: "#60a5fa",
    displayColor: "#1d3fc4",
  },
  {
    id: "clay",
    name: "Terracotta Clay",
    color1: "#120d0c",
    color2: "#bc7155",
    color3: "#f59e0b",
    displayColor: "#bc7155",
  },
  {
    id: "dawn",
    name: "Concrete Dawn",
    color1: "#0d1117",
    color2: "#475569",
    color3: "#f6f0e3",
    displayColor: "#d5d3d4",
  },
];

interface TelemetryLog {
  id: string;
  time: string;
  source: "TradeLocker" | "EarlyCatcher" | "AgentNet";
  text: string;
  status: "OK" | "PASS" | "EXEC";
}

const INITIAL_LOGS: TelemetryLog[] = [
  {
    id: "1",
    time: "23:28:10",
    source: "EarlyCatcher",
    text: "Raydium LP burn confirmed (100%) - Mint revoked",
    status: "PASS",
  },
  {
    id: "2",
    time: "23:28:44",
    source: "TradeLocker",
    text: "USDT/SOL trailing stop active (+6.4% target)",
    status: "OK",
  },
  {
    id: "3",
    time: "23:29:12",
    source: "EarlyCatcher",
    text: "Top-10 holder concentration: 13.8% < 20% threshold",
    status: "PASS",
  },
  {
    id: "4",
    time: "23:29:55",
    source: "AgentNet",
    text: "AST refactor pipeline completed 14 modules in 1.8s",
    status: "EXEC",
  },
];

const NEW_LOG_STREAM: Omit<TelemetryLog, "id" | "time">[] = [
  {
    source: "TradeLocker",
    text: "Sub-second order filled on execution node [NYC-01]",
    status: "EXEC",
  },
  {
    source: "EarlyCatcher",
    text: "Curve migrated to AMM. Honeypot check clean (0% tax)",
    status: "PASS",
  },
  {
    source: "EarlyCatcher",
    text: "Solana RPC cluster ping: 14ms across 12 endpoints",
    status: "OK",
  },
  {
    source: "AgentNet",
    text: "Autonomous test verification suite passing 88/88 assertions",
    status: "PASS",
  },
  {
    source: "TradeLocker",
    text: "Risk telemetry delta: max drawdown guard active at 1.5%",
    status: "OK",
  },
];

function PersonalBrandPage() {
  const [activeTheme, setActiveTheme] = useState<ThemePreset>(THEMES[0]);
  const [logs, setLogs] = useState<TelemetryLog[]>(INITIAL_LOGS);
  const [blockHeight, setBlockHeight] = useState(289419102);

  // Simulated live event stream for trading bot telemetry
  useEffect(() => {
    let streamIdx = 0;
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(" ")[0];
      const template = NEW_LOG_STREAM[streamIdx % NEW_LOG_STREAM.length];

      setLogs((prev) => [
        {
          id: `${Date.now()}`,
          time: timeStr,
          source: template.source,
          text: template.text,
          status: template.status,
        },
        ...prev.slice(0, 4),
      ]);

      setBlockHeight((h) => h + Math.floor(Math.random() * 3) + 1);
      streamIdx++;
    }, 3800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="brand-page">
      {/* Real living WebGL ShaderGradient waterPlane from v6 */}
      <NorthlineAtmosphere
        color1={activeTheme.color1}
        color2={activeTheme.color2}
        color3={activeTheme.color3}
      />
      <div className="brand-vignette" />
      <div className="brand-grain" />

      {/* Main content container */}
      <div className="brand-content">
        {/* Top Floating Navigation */}
        <header className="brand-nav">
          <div className="brand-logo">
            <span className="brand-dot" />
            <span>JAMES THAPA</span>
            <span className="brand-mono" style={{ marginLeft: "0.5rem" }}>
              / INDEX 2026
            </span>
          </div>

          <div className="brand-top-right">
            <div className="telemetry-tag">
              <span style={{ color: "var(--b-lime)" }}>●</span>
              <span>RPC 14ms</span>
              <span style={{ opacity: 0.4 }}>|</span>
              <span>BLK #{blockHeight}</span>
            </div>

            {/* Atmosphere Theme Switcher */}
            <div className="theme-swatches" title="Switch Shader Gradient Theme">
              {THEMES.map((theme) => (
                <button
                  key={theme.id}
                  className={`theme-swatch ${activeTheme.id === theme.id ? "active" : ""}`}
                  style={{ background: theme.displayColor }}
                  onClick={() => setActiveTheme(theme)}
                  title={theme.name}
                  aria-label={theme.name}
                />
              ))}
            </div>

            <nav className="brand-links">
              <a href="#design">Design</a>
              <a href="#bots">Bots</a>
              <a href="#projects">Software</a>
              <a href="#ai">AI</a>
              <Link to="/s/v6" style={{ color: "var(--b-lime)", fontWeight: 600 }}>
                Live v6 Store →
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="brand-hero">
          <div className="hero-kicker">
            <span className="brand-mono">00 // PERSONAL IDENTITY & SYSTEMS</span>
            <span style={{ opacity: 0.3 }}>/</span>
            <span className="brand-mono" style={{ color: activeTheme.displayColor }}>
              ATMOSPHERE: {activeTheme.name.toUpperCase()}
            </span>
          </div>

          <h1 className="hero-main-title">
            DESIGNER.
            <br />
            ALGO MAKER.
            <br />
            SYSTEMS ARCHITECT.
          </h1>

          <div className="hero-sub-grid">
            <div className="hero-manifesto">
              Building at the intersection of high-fashion digital storefronts,
              sub-second quantitative execution bots, production hospitality software,
              and multi-agent autonomous engineering pipelines.
            </div>

            <div className="hero-nav-pills">
              <a href="#design" className="nav-pill-btn">
                01 / Web Design (3)
              </a>
              <a href="#bots" className="nav-pill-btn">
                02 / Trading Bots & Scanners
              </a>
              <a href="#projects" className="nav-pill-btn">
                03 / Production Software
              </a>
              <a href="#ai" className="nav-pill-btn">
                04 / Autonomous AI
              </a>
            </div>
          </div>
        </section>

        {/* Pillar 01: Website Design */}
        <section id="design" className="brand-section">
          <div className="section-head">
            <div>
              <span className="brand-mono">01 // VISUAL COMMERCE & DESIGN SYSTEMS</span>
              <h2>Website Design</h2>
            </div>
            <p>
              Editorial typography, tactile physical garment photography, and
              interactive 3D runway chambers engineered with React & WebGL.
            </p>
          </div>

          <div className="design-grid">
            {/* Card 1: Vivre */}
            <article className="design-card">
              <div className="design-card-img-wrap">
                <img
                  src="/brand/vivre-model.jpg"
                  alt="Vivre Drop 001"
                  className="design-card-img"
                  loading="lazy"
                />
              </div>
              <div className="design-card-body">
                <span className="brand-mono" style={{ color: "var(--b-vivre)" }}>
                  01.1 // FASHION IDENTITY
                </span>
                <h3>VIVRE DROP 001</h3>
                <p>
                  High-fashion digital identity featuring oversized tailoring,
                  cobalt blue typography, and a synchronized 3D multi-angle scan chamber.
                </p>
                <div className="design-tags">
                  <span className="design-tag">Editorial UI</span>
                  <span className="design-tag">3D Scan Chamber</span>
                  <span className="design-tag">Cobalt Blue</span>
                </div>
              </div>
            </article>

            {/* Card 2: Northline */}
            <article className="design-card">
              <div className="design-card-img-wrap">
                <img
                  src="/brand/northline-hero-underpass.jpg"
                  alt="Northline Utility Storefront"
                  className="design-card-img"
                  loading="lazy"
                />
              </div>
              <div className="design-card-body">
                <span className="brand-mono" style={{ color: "var(--b-lime)" }}>
                  01.2 // TECHNICAL UTILITY
                </span>
                <h3>NORTHLINE v6</h3>
                <p>
                  Utility outerwear storefront anchored in concrete underpasses,
                  blue hour train streaks, and real-time WebGL fluid wave dynamics.
                </p>
                <div className="design-tags">
                  <span className="design-tag">WebGL Shaders</span>
                  <span className="design-tag">Cart Architecture</span>
                  <span className="design-tag">Micro-Interactions</span>
                </div>
              </div>
            </article>

            {/* Card 3: Fieldtrip */}
            <article className="design-card">
              <div className="design-card-img-wrap">
                <img
                  src="/brand/northline-materials.jpg"
                  alt="Fieldtrip Fitting Room"
                  className="design-card-img"
                  loading="lazy"
                />
              </div>
              <div className="design-card-body">
                <span className="brand-mono" style={{ color: "var(--b-clay)" }}>
                  01.3 // STREETWEAR RUNWAY
                </span>
                <h3>FIELDTRIP FITTING ROOM</h3>
                <p>
                  Interactive streetwear fitting room with real-time frame scrubber,
                  layered outfit swapping, and tactile fabric close-up inspections.
                </p>
                <div className="design-tags">
                  <span className="design-tag">Frame Scrubbing</span>
                  <span className="design-tag">Tactile Zoom</span>
                  <span className="design-tag">Motion Design</span>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Pillar 02: Personal Bots (Trading & Execution) */}
        <section id="bots" className="brand-section">
          <div className="section-head">
            <div>
              <span className="brand-mono">02 // ALGORITHMIC EXECUTION & SCANNING</span>
              <h2>Personal Bots (Trading)</h2>
            </div>
            <p>
              Custom TradeLocker execution bots and autonomous Solana token sniffers
              filtering safety criteria in sub-second event loops.
            </p>
          </div>

          <div className="bots-console-wrap">
            <div className="console-left">
              <span className="brand-mono" style={{ color: "var(--b-lime)" }}>
                LIVE RUNTIME & RISK ENGINE
              </span>
              <h3>TradeLocker & Early Catcher</h3>
              <p>
                A dual-system trading infrastructure: high-speed TradeLocker API
                integration with automated position sizing and trailing stops, coupled
                with a 7-point Solana token scanner monitoring mempool contracts for
                rug pulls, liquidity locks, and insider bundling.
              </p>

              <div className="bot-specs-table">
                <div className="bot-spec-row">
                  <span>EXECUTION INTERFACE</span>
                  <span>TRADELOCKER REST & WS</span>
                </div>
                <div className="bot-spec-row">
                  <span>CHAIN COVERAGE</span>
                  <span>SOLANA RPC CLUSTER</span>
                </div>
                <div className="bot-spec-row">
                  <span>VETTING CRITERIA</span>
                  <span>7-POINT COMPLIANCE GATE</span>
                </div>
                <div className="bot-spec-row">
                  <span>EXECUTION LATENCY</span>
                  <span>&lt; 65ms AVG</span>
                </div>
                <div className="bot-spec-row">
                  <span>RISK GUARDS</span>
                  <span>AUTOMATIC DRAWDOWN BREAKER</span>
                </div>
              </div>
            </div>

            {/* Live Streaming Terminal */}
            <div className="console-terminal">
              <div className="terminal-bar">
                <span>TELEMETRY STREAM // ACTIVE</span>
                <span>SUB-MS DISPATCH</span>
              </div>

              <div className="terminal-stream">
                {logs.map((log) => (
                  <div key={log.id} className="term-line">
                    <span style={{ opacity: 0.45 }}>[{log.time}]</span>
                    <span style={{ color: "#fff", fontWeight: 600 }}>{log.source}:</span>
                    <span style={{ flex: 1, opacity: 0.9 }}>{log.text}</span>
                    <span className="term-pass">[{log.status}]</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pillar 03 & 04: Current Projects & AI Systems */}
        <section id="projects" className="brand-section">
          <div className="section-head">
            <div>
              <span className="brand-mono">03 &amp; 04 // SOFTWARE & AUTONOMY</span>
              <h2>Production Systems</h2>
            </div>
            <p>
              Full-stack operational software in the wild, alongside autonomous
              agentic workflows powering automated engineering.
            </p>
          </div>

          <div className="systems-duo-grid">
            {/* Box 1: Restaurant Operations System */}
            <div className="system-box">
              <div>
                <span className="brand-mono" style={{ color: "var(--b-clay)" }}>
                  PILLAR 03 // PRODUCTION SOFTWARE
                </span>
                <h3>Restaurant Operations App</h3>
                <p>
                  A real-time hospitality operating system powering floor plans,
                  live table turnovers, prep-list tracking, and automated nightly stock
                  reconciliation with discrepancy analytics.
                </p>
              </div>

              <div className="system-media-preview">
                <img
                  src="/brand/ops-app.jpg"
                  alt="Restaurant Operations App Interface"
                  loading="lazy"
                />
              </div>

              <div className="design-tags" style={{ marginTop: "1.5rem" }}>
                <span className="design-tag">Real-Time Floor Plan</span>
                <span className="design-tag">Live Order Routing</span>
                <span className="design-tag">Inventory Audits</span>
              </div>
            </div>

            {/* Box 2: Uses of AI */}
            <div id="ai" className="system-box">
              <div>
                <span className="brand-mono" style={{ color: "var(--b-lime)" }}>
                  PILLAR 04 // AUTONOMOUS AI WORKFLOWS
                </span>
                <h3>Autonomous Agentic Engineering</h3>
                <p>
                  Multi-agent code orchestration, automated AST refactoring,
                  and prompt-to-production deployment pipelines. Leveraging local tools,
                  memory checkpoints, and generative synthetic editorial media.
                </p>
              </div>

              <div className="system-media-preview">
                <img
                  src="/brand/platform.jpg"
                  alt="Autonomous Engineering Architecture"
                  loading="lazy"
                />
              </div>

              <div className="design-tags" style={{ marginTop: "1.5rem" }}>
                <span className="design-tag">Multi-Agent Loops</span>
                <span className="design-tag">AST Refactoring</span>
                <span className="design-tag">Synthetic Media</span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="brand-footer">
          <div>
            <span className="brand-mono">CONNECT // AVAILABILITY 2026</span>
            <div className="footer-big">LET'S BUILD SOMETHING THAT LASTS.</div>
          </div>

          <div className="footer-links">
            <a href="mailto:james@northline-studio.com">EMAIL</a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              GITHUB
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              TWITTER / X
            </a>
            <Link to="/s/v6">NORTHLINE v6 STORE →</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
