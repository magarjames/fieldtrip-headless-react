import React, { useRef, useState } from "react";
import heroDawn from "@/assets/northline/hero-dawn.png";
import { NorthlineScrollEdge, type NorthlineEdgeMotion } from "@/components/northline/NorthlineScrollEdge";

export function NorthlineFooter() {
  const [email, setEmail] = useState("");
  const [signupMessage, setSignupMessage] = useState("");

  const submitSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSignupMessage("Subscribed to Vivre notes.");
    setEmail("");
  };

  const motionRef = useRef<NorthlineEdgeMotion>({ progress: 1 });

  return (
    <footer className="nl-footer-ref">
      <div className="nl-footer-ripped-edge">
        <NorthlineScrollEdge 
          motion={motionRef} 
          colour="#99958c" 
          toneStrength={0.2} 
          className="nl-footer-scroll-edge" 
        />
      </div>
      
      <div className="nl-footer-content">
        <div className="nl-footer-top">
          <nav className="nl-footer-nav-left">
            <a href="/s/v8/shop">SHOP ALL</a>
            <a href="#">CATEGORIES</a>
            <a href="#">WHO WE ARE</a>
            <a href="#">CAMPAIGN</a>
            <a href="#">CONTACT</a>
            <a href="#">COLLECTIONS</a>
            <a href="#">SALE</a>
            <a href="#">5-HT</a>
          </nav>
          
          <nav className="nl-footer-nav-right">
            <a href="#">RETURN</a>
            <a href="#">IMPRESSUM</a>
            <a href="#">SHIPPING AND PAYMENT</a>
            <a href="#">FAQ</a>
          </nav>
        </div>

        <div className="nl-footer-center">
          <div className="nl-footer-center-image" style={{ backgroundImage: `url(${heroDawn})` }} />
          <h1 className="nl-footer-center-text">VIVRE</h1>
        </div>

        <div className="nl-footer-bottom-actions">
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
            <a href="#">PRIVACY POLICY (DSGVO)</a>
            <a href="#">CREDITS</a>
            <a href="#">IG</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
