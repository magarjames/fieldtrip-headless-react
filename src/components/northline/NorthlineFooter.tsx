import React, { useState } from "react";
import { Link } from "@tanstack/react-router";

export function NorthlineFooter() {
  const [email, setEmail] = useState("");
  const [signupMessage, setSignupMessage] = useState("");

  const submitSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSignupMessage("Transmission successful. Subscribed to terminal updates.");
    setEmail("");
  };

  return (
    <footer className="nl-footer-ticket-ref">
      <div className="nl-footer-ticket-container">
        <div className="nl-footer-ticket-grid">
          
          {/* Top Header Row */}
          <div className="nl-ticket-header-row">
            <div className="nl-ticket-title-block">
              <h2 className="nl-ticket-wordmark">VIVRE-CLUB //</h2>
              <h3 className="nl-ticket-sub-wordmark">E-COM_SYSTEM_v2.1</h3>
              <p className="nl-ticket-info-text">FONT: MONO_VTG // MAT: POLY/AL // COLOR: IRID-S</p>
            </div>
            <div className="nl-ticket-barcode-block">
              {/* Fake Barcode SVG */}
              <svg className="nl-ticket-barcode-svg" viewBox="0 0 200 80" preserveAspectRatio="none" aria-hidden="true">
                <rect x="0" y="0" width="4" height="80" />
                <rect x="8" y="0" width="2" height="80" />
                <rect x="14" y="0" width="8" height="80" />
                <rect x="26" y="0" width="2" height="80" />
                <rect x="32" y="0" width="6" height="80" />
                <rect x="42" y="0" width="2" height="80" />
                <rect x="48" y="0" width="10" height="80" />
                <rect x="62" y="0" width="4" height="80" />
                <rect x="70" y="0" width="2" height="80" />
                <rect x="76" y="0" width="8" height="80" />
                <rect x="88" y="0" width="6" height="80" />
                <rect x="98" y="0" width="2" height="80" />
                <rect x="104" y="0" width="10" height="80" />
                <rect x="118" y="0" width="4" height="80" />
                <rect x="126" y="0" width="2" height="80" />
                <rect x="132" y="0" width="8" height="80" />
                <rect x="144" y="0" width="6" height="80" />
                <rect x="154" y="0" width="2" height="80" />
                <rect x="160" y="0" width="10" height="80" />
                <rect x="174" y="0" width="4" height="80" />
                <rect x="182" y="0" width="2" height="80" />
                <rect x="188" y="0" width="8" height="80" />
                <rect x="198" y="0" width="2" height="80" />
              </svg>
              <div className="nl-ticket-barcode-text">184712093556-VCB</div>
            </div>
          </div>

          {/* Grid Columns */}
          <div className="nl-ticket-cell nl-ticket-col-4">
            <div className="nl-ticket-cell-header">COMPANY INFO // VC_CORP.DATA</div>
            <div className="nl-ticket-links">
              <Link to="/about">ABOUT US</Link>
              <a href="#">CONTACT [HQ_SYDNEY // 13:00-18:00 AEST]</a>
              <a href="#">CAREERS (VACANCIES: 04)</a>
              <a href="#">PRESS/MEDIA</a>
            </div>
          </div>

          <div className="nl-ticket-cell nl-ticket-col-4">
            <div className="nl-ticket-cell-header">NAVIGATION // SYST_MAP</div>
            <div className="nl-ticket-links">
              <Link to="/s/v8/shop">SHOP ALL</Link>
              <a href="#">NEW ARRIVALS</a>
              <a href="#">TECH-WEAR [COLLECTIONS]</a>
              <a href="#">ACCESSORIES</a>
            </div>
          </div>

          <div className="nl-ticket-cell nl-ticket-col-4">
            <div className="nl-ticket-cell-header">CUSTOMER SERVICES // ASSIST_LOG</div>
            <div className="nl-ticket-links">
              <Link to="/shipping">SHIPPING POLICIES [DOM/INTL]</Link>
              <Link to="/returns">RETURNS // REFUNDS [POLICY_V.4]</Link>
              <Link to="/faq">FAQ [SYSTEM_HELP]</Link>
              <a href="#">TRACK ORDER [INPUT_REQ]</a>
            </div>
          </div>

          {/* Newsletter / UPC Row */}
          <div className="nl-ticket-cell nl-ticket-col-12" style={{ borderBottom: '2px solid var(--ticket-border)' }}>
            <div className="nl-ticket-cell-header">UPC-A: DATA_STREAM_INPUT</div>
            <div style={{ maxWidth: '600px', width: '100%' }}>
              <form onSubmit={submitSignup} className="nl-ticket-input-group">
                <input
                  type="email"
                  placeholder="ENTER_EMAIL_ADDRESS..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit">TRANSMIT [ENTER]</button>
              </form>
              {signupMessage && <div className="nl-ticket-msg">{signupMessage}</div>}
            </div>
          </div>

          {/* Footer Bottom Row */}
          <div className="nl-ticket-footer-row">
            <div>
              SPECIFICATION_LOG:<br/>
              FOOTER_ID: VC_FW_F001 // VER: 4.1 // DATE: 2024-10-26<br/>
              (C) 2026 VIVRE-CLUB_GLOBAL // ALL RIGHTS RESERVED
            </div>
            <div style={{ textAlign: 'right' }}>
              ISO 9001:2015 CERTIFIED<br/>
              SECURITY_PROTOCOLS: SSL_ACTIVE
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
