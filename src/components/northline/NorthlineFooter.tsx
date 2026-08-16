import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { FooterShader } from "./FooterShader";

export function NorthlineFooter() {
  const [email, setEmail] = useState("");
  const [signupMessage, setSignupMessage] = useState("");

  const submitSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSignupMessage("Subscribed to Vivre notes.");
    setEmail("");
  };

  return (
    <footer className="nl-footer-ref nl-footer-editorial">
      <svg className="nl-material-video-mask-defs" aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <defs>
          <clipPath id="nl-footer-flow-clip" clipPathUnits="objectBoundingBox">
            <path
              className="nl-material-video-flow-path"
              d="M0 .068 C.07 .035 .12 .084 .19 .052 C.27 .022 .33 .088 .42 .049 C.51 .026 .58 .082 .67 .045 C.76 .02 .84 .075 .92 .041 C.96 .03 .98 .054 1 .05 L1 1 L0 1 Z"
            />
          </clipPath>
        </defs>
      </svg>
      <FooterShader />

      <div className="nl-footer-content nl-footer-editorial-content">

        {/* ── TOP: Navigation + Palette ─────────────────────── */}
        <div className="nl-footer-editorial-top">
          <nav className="nl-footer-editorial-nav">
            <Link to="/s/v8/shop">SHOP ALL</Link>
            <Link to="/about">ABOUT US</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/returns">SHIPPING & RETURNS</Link>
          </nav>
          <div className="nl-footer-palette">
            <div className="nl-footer-swatch" style={{ background: '#1646DB' }} title="Blue" />
            <div className="nl-footer-swatch" style={{ background: '#0CEEFF' }} title="Cyan" />
            <div className="nl-footer-swatch" style={{ background: '#F13B32' }} title="Red" />
            <div className="nl-footer-swatch" style={{ background: '#111111' }} title="Black" />
            <div className="nl-footer-swatch" style={{ background: '#F4F0E8' }} title="Paper" />
          </div>
        </div>

        {/* ── MAIN: Arched VIVRE + [v]. + Subscribe ─────────── */}
        <div className="nl-footer-editorial-main">
          {/* Arched VIVRE in center */}
          <div className="nl-footer-arc-wrapper">
            <svg viewBox="0 0 900 260" className="nl-footer-arc-svg">
              <path id="vivre-arc-ed" fill="none" d="M 30,230 Q 450,0 870,230" />
              <text style={{ fill: 'var(--cobalt)' }}>
                <textPath
                  href="#vivre-arc-ed"
                  startOffset="50%"
                  textAnchor="middle"
                  className="nl-footer-arc-text"
                >
                  VIVRE
                </textPath>
              </text>
            </svg>
            <p className="nl-footer-tagline">THE LIVING ARCHIVE</p>
            <p className="nl-footer-sub-tagline">DRESS LIKE YOU HAVE SOMEWHERE TO BE.</p>
          </div>
        </div>

        {/* ── BOTTOM: [v]. logo + Subscribe + Drop Tag ──────── */}
        <div className="nl-footer-editorial-bottom">

          <div className="nl-footer-logo-mark">
            <span className="nl-footer-bracket">[</span>v<span className="nl-footer-bracket">]</span><span className="nl-footer-dot">.</span>
          </div>

          <div className="nl-footer-subscribe-editorial">
            <p className="nl-footer-subscribe-label">SUBSCRIBE <span>(LATEST NEWS)</span></p>
            <form className="nl-footer-subscribe-form" onSubmit={submitSignup}>
              <input
                type="email"
                placeholder="EMAIL"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <button type="submit">SUBSCRIBE →</button>
            </form>
            {signupMessage && <p className="nl-footer-msg">{signupMessage}</p>}
          </div>

          <div className="nl-footer-drop-tag">
            DROP 001 — AFTER HOURS — Live Now
          </div>
        </div>

        {/* ── LEGAL BAR ────────────────────────────────────── */}
        <div className="nl-footer-legal-bar">
          <p>©2026 VIVRE-CLUB</p>
          <div className="nl-footer-legal-links">
            <Link to="/privacy">PRIVACY POLICY (DSGVO)</Link>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">IG</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
