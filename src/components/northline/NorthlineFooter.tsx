import React, { useState } from "react";
import heroDawn from "@/assets/northline/hero-dawn.png";

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
      <div className="nl-footer-ripped-edge">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          {/* Jagged path to simulate ripped paper */}
          <path d="M0,60 L0,30 L15,15 L30,35 L50,10 L70,25 L90,5 L110,35 L130,20 L150,40 L170,10 L190,30 L210,15 L230,25 L250,5 L270,30 L290,10 L310,40 L330,15 L350,25 L370,10 L390,35 L410,20 L430,45 L450,15 L470,30 L490,10 L510,35 L530,20 L550,45 L570,10 L590,30 L610,15 L630,40 L650,20 L670,50 L690,15 L710,30 L730,10 L750,40 L770,20 L790,45 L810,15 L830,30 L850,10 L870,40 L890,20 L910,45 L930,10 L950,30 L970,15 L990,40 L1010,20 L1030,45 L1050,15 L1070,30 L1090,10 L1110,40 L1130,20 L1150,45 L1170,10 L1190,35 L1210,20 L1230,40 L1250,15 L1270,30 L1290,10 L1310,35 L1330,20 L1350,40 L1370,15 L1390,30 L1410,10 L1430,25 L1440,30 L1440,60 Z" 
            fill="currentColor"
          />
        </svg>
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
