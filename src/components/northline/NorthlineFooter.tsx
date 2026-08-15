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
      
      <div className="nl-footer-content">
        <div className="nl-footer-top">
          <nav className="nl-footer-nav-left">
            <Link to="/s/v8/shop">SHOP ALL</Link>
            <Link to="/about">ABOUT US</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/returns">SHIPPING & RETURNS</Link>
          </nav>
        </div>

        <div className="nl-footer-bottom-actions">
          <div className="nl-footer-title-large" style={{ flex: 1 }}>
            <h2 style={{ fontSize: 'clamp(5rem, 15vw, 12rem)', margin: 0, lineHeight: 0.8, letterSpacing: '-0.05em', color: 'var(--ink)' }}>VIVRE</h2>
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
