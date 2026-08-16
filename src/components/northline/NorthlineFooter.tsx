import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import "./vivre-footer.css";

export function NorthlineFooter() {
  const [email, setEmail] = useState("");
  const [signupMessage, setSignupMessage] = useState("");

  const submitSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setSignupMessage("CHECK EMAIL. REVIEW ENTRY.");
      return;
    }
    setSignupMessage("APPROVED. WELCOME TO THE LIVING ARCHIVE.");
    setEmail("");
  };

  return (
    <footer className="vivre-footer" aria-labelledby="footer-heading">
      <svg className="proof-grid" viewBox="0 0 1824 864" preserveAspectRatio="none" aria-hidden="true">
        <g fill="none" stroke="var(--grid-line)" strokeWidth="1" strokeDasharray="2 3">
          <path d="M36 0V864M662 0V864M712 0V864M934 0V864M1782 0V864"></path>
          <path d="M0 58H1824M0 299H1824M0 784H1824"></path>
        </g>
      </svg>

      <div className="footer-top">
        <h2 className="footer-heading" id="footer-heading">Dress like you have somewhere to be.</h2>

        <form className="archive-block" id="archive-form" onSubmit={submitSignup}>
          <label className="archive-label" htmlFor="archive-email">Join the living archive</label>
          <div className="archive-field">
            <input 
              id="archive-email" 
              name="email" 
              type="email" 
              autoComplete="email" 
              placeholder="Your email" 
              aria-describedby="archive-status" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="archive-arrow" type="submit" aria-label="Submit email to the Living Archive"></button>
          </div>
          <p className="archive-status" id="archive-status" aria-live="polite">
            {signupMessage}
          </p>
        </form>

        <button className="archive-cta" type="submit" form="archive-form">Enter the archive</button>
      </div>

      <nav className="footer-nav" aria-label="Footer">
        <ul>
          <li><Link to="/s/v8/shop">Shop</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/faq">FAQ</Link></li>
        </ul>
        <ul className="social-links">
          <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          <li><a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">TikTok</a></li>
        </ul>
      </nav>

      <div className="brand-stage" aria-label="VIVRE campaign mark">
        <div className="spray-band" aria-hidden="true"></div>

        <div className="brand-seal" aria-label="VIVRE monogram">
          <span className="bracket" aria-hidden="true">[</span>
          <span className="seal-v">v</span>
          <span className="bracket" aria-hidden="true">]</span>
          <span className="seal-dot" aria-hidden="true"></span>
        </div>

        <div className="approved-mark" aria-hidden="true">Approved<br/>to live</div>

        <div className="campaign-wordmark" aria-label="VIVRE">
          <span>V</span><span>I</span><span>V</span><span>R</span><span>E</span>
        </div>

        <div className="footer-legal">
          <span className="copyright">© VIVRE 2026</span>
          <ul>
            <li><Link to="/returns">Shipping & Returns</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className="garment-swatch" aria-hidden="true">
          <span className="swatch-wordmark">VIVRE</span>
        </div>
      </div>
    </footer>
  );
}
