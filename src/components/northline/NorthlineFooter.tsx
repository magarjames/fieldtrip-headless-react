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
    <footer className="nl-footer-ref">
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
      
      {/* Centered Arched VIVRE Text (Outlined) */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 0,
        width: 'clamp(20rem, 80vw, 60rem)'
      }}>
        <svg viewBox="0 0 1000 300" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
          {/* Shallow arc path for the text to follow */}
          <path id="vivre-arc" fill="transparent" d="M 0,220 Q 500,20 1000,220" />
          <text>
            <textPath href="#vivre-arc" startOffset="50%" textAnchor="middle" style={{ 
              fontSize: '220px', 
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 800, 
              fill: 'transparent',
              stroke: 'var(--ink)',
              strokeWidth: '4px',
              letterSpacing: '0.02em'
            }}>
              VIVRE
            </textPath>
          </text>
        </svg>
      </div>

      <div className="nl-footer-content">
        <div className="nl-footer-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem' }}>
          <nav className="nl-footer-nav-left">
            <Link to="/s/v8/shop">SHOP ALL</Link>
            <Link to="/about">ABOUT US</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/returns">SHIPPING & RETURNS</Link>
          </nav>
          {/* Core Palette from Living Proof board */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ width: '24px', height: '24px', background: '#1646DB', border: '1px solid var(--ink)' }} title="#1646DB"></div>
            <div style={{ width: '24px', height: '24px', background: '#DCEEFF', border: '1px solid var(--ink)' }} title="#DCEEFF"></div>
            <div style={{ width: '24px', height: '24px', background: '#F13B32', border: '1px solid var(--ink)' }} title="#F13B32"></div>
            <div style={{ width: '24px', height: '24px', background: '#111111', border: '1px solid var(--ink)' }} title="#111111"></div>
            <div style={{ width: '24px', height: '24px', background: '#F4F0E8', border: '1px solid var(--ink)' }} title="#F4F0E8"></div>
          </div>
        </div>

        <div className="nl-footer-bottom-actions">
          {/* Secondary [v]. Symbol from Living Proof board */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
            <div style={{ fontSize: 'clamp(4rem, 12vw, 9rem)', fontWeight: 900, lineHeight: 0.8, letterSpacing: '-0.05em', color: 'var(--ink)' }}>
              [v].
            </div>
          </div>

          <div className="nl-footer-subscribe-wrapper">
            <h2>SUBSCRIBE <span>(LATEST NEWS)</span></h2>
            <form className="nl-footer-subscribe" onSubmit={submitSignup}>
              <div className="nl-footer-input-row">
                <input 
                  type="email" 
                  placeholder="EMAIL" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <button type="submit">SUBSCRIBE</button>
              </div>
              {signupMessage && <p className="nl-footer-msg">{signupMessage}</p>}
            </form>
          </div>
        </div>

        <div className="nl-footer-bottom-bar">
          <p>©2026_VIVRE</p>
          <div className="nl-footer-bottom-links">
            <Link to="/privacy">PRIVACY POLICY (DSGVO)</Link>
            <a href="#">IG</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
