import React, { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { createPortal } from "react-dom";
import { Search } from "lucide-react";
import { useVivre } from "./VivreContext";
import { FoldBackdropV8 } from "@/components/street/FoldBackdropV8";
import { NorthlineFooter } from "@/components/northline/NorthlineFooter";
import { shopifyClient } from "@/lib/shopify";
import "./northline.css";

export function VivreLayout({ children }: { children: React.ReactNode }) {
  const {
    bag,
    bagCount,
    subtotalFormatted,
    bagOpen,
    setBagOpen,
    removeFromBag,
    updateQuantity,
    checkout,
    isCheckingOut,
    searchOpen,
    setSearchOpen,
  } = useVivre();

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);

  // Load all products for search
  useEffect(() => {
    if (searchOpen && allProducts.length === 0) {
      shopifyClient.product
        .fetchAll()
        .then((products) => {
          setAllProducts(products as any);
        })
        .catch((err) => {
          console.error("Failed to fetch search catalog:", err);
        });
    }
  }, [searchOpen, allProducts.length]);

  // Handle search logic
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    const results = allProducts.filter(
      (p) =>
        p.title?.toLowerCase().includes(q) ||
        p.productType?.toLowerCase().includes(q)
    );
    setSearchResults(results);
  }, [searchQuery, allProducts]);

  return (
    <div
      className="ft"
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        color: "var(--ink)",
        position: "relative",
      }}
    >
      <style>{`
        .ft{
          --paper:#FFFFFF; --ink:#141317; --dim:#565462; --hair:rgba(20,19,23,0.16);
          --pop:#F5C518; --pop-ink:#141317;
          font-family:Archivo,"Helvetica Neue",sans-serif;
        }
        .ft .lbl{ font-family:"JetBrains Mono",monospace; font-size:0.66rem;
          text-transform:uppercase; letter-spacing:0.14em }
        .ft .shell{ max-width:1560px; margin-inline:auto; padding-inline:clamp(1rem,4vw,2.25rem) }
        .ft .btn{ display:inline-flex; align-items:center; min-height:44px; padding:0 1.4rem;
          border-radius:999px; background:var(--ink); color:var(--paper);
          font-weight:700; font-size:0.85rem; letter-spacing:-0.01em;
          transition:transform .2s cubic-bezier(.16,1,.3,1) }
        .ft .btn:active{ transform:scale(.97) }
      `}</style>

      {/* Background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <FoldBackdropV8 />
      </div>

      {/* Header */}
      <header
        className="shell flex items-center gap-4 py-4"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(24px) saturate(150%)",
          WebkitBackdropFilter: "blur(24px) saturate(150%)",
          borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
        }}
      >
        <Link
          to="/"
          className="text-[1.15rem] font-black tracking-[-0.05em]"
          style={{ color: "var(--ink)", textDecoration: "none" }}
        >
          <img src="/logos/vivre-wordmark.svg" alt="Vivre" className="h-5" />
        </Link>
        <span className="lbl hidden sm:inline" style={{ color: "var(--dim)" }}>
          Drop 001
        </span>

        <span className="flex-1" />

        <button
          onClick={() => setSearchOpen(true)}
          className="p-2 hover:bg-black/5 rounded-full transition-colors mr-2"
          aria-label="Search products"
        >
          <Search size={20} />
        </button>

        <button
          type="button"
          onClick={() => setBagOpen(true)}
          className="btn"
          style={{
            background: "color-mix(in srgb, var(--ink) 10%, transparent)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid color-mix(in srgb, var(--ink) 20%, transparent)",
            color: "var(--ink)",
          }}
          aria-label={`Open shopping bag (${bagCount} ${bagCount === 1 ? "item" : "items"})`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {bagCount > 0 && <span style={{ marginLeft: "0.4rem" }}>{bagCount}</span>}
        </button>
      </header>

      {/* Main Content Area */}
      <main
        style={{
          position: "relative",
          zIndex: 10,
          minHeight: "100vh",
          paddingBottom: "100px",
        }}
      >
        {children}
      </main>

      {/* Footer */}
      <NorthlineFooter />

      {/* Slide-out Bag Modal */}
      {bagOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="nl-layer">
            <button
              className="nl-layer-backdrop"
              type="button"
              aria-label="Close bag"
              onClick={() => setBagOpen(false)}
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(24px) saturate(150%)",
                WebkitBackdropFilter: "blur(24px) saturate(150%)",
                transform: "translateZ(0)",
                willChange: "transform, backdrop-filter",
              }}
            />
            <aside
              className="nl-bag-drawer"
              role="dialog"
              aria-modal="true"
              aria-labelledby="bag-title"
              style={{
                paddingTop: "2.5rem",
                paddingLeft: "1.5rem",
                paddingRight: "1.5rem",
                background: "rgba(255, 255, 255, 0.88)",
                backdropFilter: "blur(28px) saturate(180%)",
                WebkitBackdropFilter: "blur(28px) saturate(180%)",
                color: "#000000",
                boxShadow:
                  "inset 0 1px 1px rgba(255,255,255,0.6), inset 0 0 0 1px rgba(0,0,0,0.08), -20px 0 60px rgba(0, 0, 0, 0.18)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  width: "100%",
                  paddingBottom: "1.25rem",
                  borderBottom: "1px solid rgba(0, 0, 0, 0.15)",
                  marginBottom: "1.25rem",
                }}
              >
                <div>
                  <h2
                    id="bag-title"
                    style={{
                      margin: 0,
                      color: "#000000",
                      fontSize: "2.75rem",
                      fontWeight: 800,
                      letterSpacing: "-0.05em",
                      lineHeight: 1,
                    }}
                  >
                    Your bag
                  </h2>
                  <p
                    style={{
                      margin: "0.4rem 0 0",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      color: "rgba(0, 0, 0, 0.55)",
                    }}
                  >
                    {bagCount} {bagCount === 1 ? "item" : "items"}
                  </p>
                </div>
                <button
                  className="nl-dialog-close"
                  type="button"
                  onClick={() => setBagOpen(false)}
                  style={{
                    position: "relative",
                    top: "auto",
                    right: "auto",
                    flexShrink: 0,
                    color: "#000000",
                    borderColor: "rgba(0,0,0,0.15)",
                    background: "rgba(255,255,255,0.9)",
                  }}
                >
                  Close
                </button>
              </div>
              {bag.length > 0 ? (
                <>
                  <ul className="nl-bag-list">
                    {bag.map((item, index) => {
                      const qty = item.quantity || 1;
                      return (
                        <li key={item.id + "-" + (item.variantTitle || "") + "-" + index}>
                          <img src={item.image} alt="" decoding="async" />
                          <div className="nl-bag-item-info">
                            <h3>{item.name}</h3>
                            {item.variantTitle && (
                              <p className="nl-bag-item-variant">{item.variantTitle}</p>
                            )}
                            <p className="nl-bag-item-price">{item.price}</p>
                            <div className="nl-bag-qty-row">
                              <div className="nl-bag-qty-controls" aria-label="Quantity controls">
                                <button
                                  type="button"
                                  className="nl-bag-qty-btn"
                                  onClick={() => updateQuantity(index, -1)}
                                  aria-label={`Decrease quantity of ${item.name}`}
                                >
                                  −
                                </button>
                                <span className="nl-bag-qty-val" aria-live="polite">
                                  {qty}
                                </span>
                                <button
                                  type="button"
                                  className="nl-bag-qty-btn"
                                  onClick={() => updateQuantity(index, 1)}
                                  aria-label={`Increase quantity of ${item.name}`}
                                >
                                  +
                                </button>
                              </div>
                              <button
                                type="button"
                                className="nl-bag-remove-btn"
                                onClick={() => removeFromBag(index)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="nl-bag-footer">
                    <div className="nl-bag-summary">
                      <div className="nl-bag-summary-row nl-bag-summary-row--subtotal">
                        <span>Subtotal</span>
                        <strong>{subtotalFormatted}</strong>
                      </div>
                      <div className="nl-bag-summary-row">
                        <span>Express delivery</span>
                        <span>Free</span>
                      </div>
                      <p className="nl-bag-delivery-note">
                        Dispatched within 24h · Estimated delivery 2–4 business days · Duties &amp;
                        taxes included
                      </p>
                    </div>
                    <button
                      className="nl-button nl-button-primary nl-bag-checkout"
                      type="button"
                      onClick={checkout}
                      disabled={isCheckingOut}
                      style={{ opacity: isCheckingOut ? 0.7 : 1 }}
                    >
                      {isCheckingOut
                        ? "Loading checkout..."
                        : `Checkout via Shopify — ${subtotalFormatted}`}
                    </button>
                  </div>
                </>
              ) : (
                <p className="nl-empty-bag">Your bag is ready when you are.</p>
              )}
            </aside>
          </div>,
          document.body
        )}

      {/* Split Search Layout: Right Drawer + Left Grid */}
      {searchOpen && typeof document !== "undefined" && createPortal(
        <div className="nl-layer">
          <div
            className="nl-layer-backdrop p-4 pt-[180px] md:pt-4 md:pb-0 md:p-[clamp(2rem,5vw,4rem)] md:pr-[max(460px,5vw)]"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(24px) saturate(150%)',
              WebkitBackdropFilter: 'blur(24px) saturate(150%)',
              transform: 'translateZ(0)',
              willChange: 'transform, backdrop-filter',
              cursor: 'pointer',
              display: 'block',
              overflowY: 'auto'
            }}
            onClick={() => setSearchOpen(false)}
          >
            <div className="w-full h-full max-w-7xl mx-auto" style={{ cursor: 'default' }} onClick={e => e.stopPropagation()}>
              {searchQuery && searchResults.length === 0 ? (
                <p className="text-black/70 text-xl font-medium mt-20">No products match your search.</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 auto-rows-max mt-10">
                  {searchResults.map((product) => {
                    const image = product.images?.[0]?.src || '';
                    const price = product.variants?.[0]?.price?.amount 
                      ? `${product.variants[0].price.currencyCode} ${product.variants[0].price.amount}`
                      : '';
                    
                    return (
                      <Link 
                        key={product.id}
                        to={`/products/${product.handle}`}
                        onClick={() => setSearchOpen(false)}
                        className="group flex flex-col h-full p-2 md:p-4 rounded-2xl transition-colors hover:bg-black/5 border border-transparent hover:border-black/10"
                      >
                        <div className="aspect-[4/5] bg-black/5 rounded-xl overflow-hidden mb-3 relative shrink-0">
                          {image && <img src={image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100 mix-blend-multiply" />}
                        </div>
                        <div 
                          className="mt-auto p-3 rounded-xl flex flex-col gap-1 transition-all duration-300 flex-grow"
                          style={{
                            background: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(24px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.3)'
                          }}
                        >
                          <h3 className="font-bold text-sm md:text-base leading-tight text-black tracking-tight line-clamp-2">{product.title}</h3>
                          <div className="flex items-end justify-between mt-auto pt-2 gap-2">
                            {product.vendor && <p className="text-black/60 text-[10px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap">{product.vendor}</p>}
                            <p className="text-black/90 text-xs md:text-sm font-medium whitespace-nowrap">{price}</p>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
          
          <aside
            className="nl-bag-drawer max-md:!h-auto max-md:!pt-6 max-md:!pb-4 max-md:self-start max-md:rounded-t-none max-md:rounded-b-3xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="search-title"
            style={{ 
              paddingTop: '3rem', 
              paddingLeft: '1.5rem', 
              paddingRight: '1.5rem',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              color: '#000000',
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.4), inset 0 0 0 1px rgba(255,255,255,0.15), -20px 0 60px rgba(0, 0, 0, 0.15)'
            }}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start', 
              width: '100%',
              paddingBottom: '1.5rem',
              borderBottom: '1px solid rgba(0, 0, 0, 0.2)'
            }}>
              <h2 id="search-title" style={{ margin: 0, color: '#000000', fontSize: '3.5rem', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1 }}>Search</h2>
              <button
                className="nl-dialog-close"
                type="button"
                onClick={() => setSearchOpen(false)}
                style={{ 
                  position: 'relative', 
                  top: 'auto', 
                  right: 'auto', 
                  flexShrink: 0,
                  color: '#000000',
                  borderColor: 'rgba(0,0,0,0.1)',
                  background: 'rgba(255,255,255,0.8)'
                }}
              >
                Close
              </button>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.5rem 0',
              marginTop: '1.5rem',
              borderBottom: '1px solid rgba(0,0,0,0.1)',
            }}>
              <Search size={20} color="rgba(0,0,0,0.4)" />
              <input 
                type="text"
                autoFocus
                placeholder="Search..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#000000',
                  fontSize: '1.25rem'
                }}
                className="placeholder:text-black/30"
              />
            </div>

            {searchQuery.length === 0 && (
              <div className="md:flex-1 py-2 md:py-6">
                <p className="nl-empty-bag !mt-0" style={{ color: 'rgba(0,0,0,0.5)', fontSize: '0.9rem' }}>Type above to search our catalog.</p>
              </div>
            )}
          </aside>
        </div>, document.body
      )}
    </div>
  );
}
