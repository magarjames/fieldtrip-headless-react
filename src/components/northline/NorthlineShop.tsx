import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "@tanstack/react-router";
import { shopifyClient } from "@/lib/shopify";
import "./northline.css";
import { FoldBackdropV8 } from "@/components/street/FoldBackdropV8";
import { NorthlineFooter } from "@/components/northline/NorthlineFooter";

// Interface for our mapped local product state
interface Product {
  id: string;
  name: string;
  group: string;
  price: string;
  image: string;
  alt: string;
  description: string;
  colors: string[];
  sizes: string[];
  images?: string[];
  rawPrice?: number;
  shopifyVariantId?: string;
  variantTitle?: string;
}

export function NorthlineShop() {
  const [shopifyProducts, setShopifyProducts] = useState<any[]>([]);
  const [shopifyLoading, setShopifyLoading] = useState(true);
  
  const [bag, setBag] = useState<Product[]>([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("Default");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Filter & Sort State
  const [activeFilter, setActiveFilter] = useState("All"); // Category
  const [activeColors, setActiveColors] = useState<string[]>([]);
  const [activeSizes, setActiveSizes] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("featured"); // featured, newest, price-asc, price-desc
  const [visibleCount, setVisibleCount] = useState<number>(12);

  // Fetch real products from Shopify
  useEffect(() => {
    if (import.meta.env.VITE_SHOPIFY_DOMAIN && import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN) {
      shopifyClient.product.fetchAll().then((fetchedProducts) => {
        setShopifyProducts(fetchedProducts as any);
        setShopifyLoading(false);
      }).catch(err => {
        console.error("Shopify fetch error:", err);
        setShopifyLoading(false);
      });
    } else {
      setShopifyLoading(false); // mock loading finish if no env vars
    }
  }, []);

  // Map live Shopify products
  const liveProducts: Product[] = shopifyProducts.map(sp => ({
    id: sp.id.toString(),
    name: sp.title,
    group: (sp.productType || "New Arrivals").charAt(0).toUpperCase() + (sp.productType || "New Arrivals").slice(1),
    price: `GBP ${sp.variants?.[0]?.price?.amount || '0'}`,
    image: sp.images?.[0]?.src || "/northline-motion/v8/chibi-still-3.webp",
    alt: sp.title,
    description: sp.descriptionHtml || sp.description || sp.vendor || "A purposeful new addition to the line.",
    colors: sp.options?.find((o: any) => o.name.toLowerCase() === 'color' || o.name.toLowerCase() === 'colour')
      ?.values.map((v: any) => v.value) || ["Default"],
    sizes: sp.options?.find((o: any) => o.name.toLowerCase() === 'size')
      ?.values.map((v: any) => v.value) || ["S", "M", "L", "XL"],
    images: sp.images?.map((img: any) => img.src) || [],
    rawPrice: parseFloat(sp.variants?.[0]?.price?.amount || "0"),
    shopifyVariantId: sp.variants?.[0]?.id?.toString()
  }));

  // Build dynamic filter lists
  const dynamicCategories = ["All", ...Array.from(new Set(liveProducts.map(p => p.group).filter(Boolean)))];
  const dynamicColors = Array.from(new Set(liveProducts.flatMap(p => p.colors))).filter(c => c !== "Default");
  const dynamicSizes = Array.from(new Set(liveProducts.flatMap(p => p.sizes))).filter(Boolean);

  // Apply filters and sort
  const shownProducts = liveProducts.filter((p) => {
    if (activeFilter !== "All" && p.group !== activeFilter) return false;
    
    // Exact match for selected colors (if any are selected, product must have at least one of them)
    if (activeColors.length > 0) {
      const hasMatchingColor = p.colors.some(c => activeColors.includes(c));
      // If product only has "Default" color, we usually skip it if specific colors are filtered, 
      // but let's strictly check intersection.
      if (!hasMatchingColor) return false;
    }

    if (activeSizes.length > 0) {
      const hasMatchingSize = p.sizes.some(s => activeSizes.includes(s));
      if (!hasMatchingSize) return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortOrder === "price-asc") return (a.rawPrice || 0) - (b.rawPrice || 0);
    if (sortOrder === "price-desc") return (b.rawPrice || 0) - (a.rawPrice || 0);
    if (sortOrder === "newest") return b.id.localeCompare(a.id);
    return 0; // featured/default
  });

  const displayedProducts = shownProducts.slice(0, visibleCount);

  // Toggle Handlers
  const toggleColor = (color: string) => {
    setActiveColors(prev => prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]);
  };
  const toggleSize = (size: string) => {
    setActiveSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  };

  const openProduct = (product: Product) => {
    setActiveProduct(product);
    setSelectedColor(product.colors[0] || "Default");
    setSelectedSize(product.sizes[0] || "M");
  };

  const addToBag = (product: Product) => {
    setBag([...bag, product]);
    setBagOpen(true);
    setActiveProduct(null);
  };

  const removeFromBag = (indexToRemove: number) => {
    setBag(bag.filter((_, i) => i !== indexToRemove));
  };

  const checkout = async () => {
    if (bag.length === 0) return;
    setIsCheckingOut(true);
    try {
      const checkoutSession = await shopifyClient.checkout.create();
      const quantities: Record<string, number> = {};
      bag.forEach(item => {
        if (item.shopifyVariantId) {
          quantities[item.shopifyVariantId] = (quantities[item.shopifyVariantId] || 0) + 1;
        }
      });
      
      const lineItemsToAdd = Object.keys(quantities).map(variantId => ({
        variantId,
        quantity: quantities[variantId]
      }));

      if (lineItemsToAdd.length > 0) {
        await shopifyClient.checkout.addLineItems(checkoutSession.id, lineItemsToAdd);
        window.location.href = checkoutSession.webUrl;
      } else {
        alert("No valid products in bag to checkout.");
        setIsCheckingOut(false);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setIsCheckingOut(false);
    }
  };

  useEffect(() => {
    if (activeProduct || bagOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [activeProduct, bagOpen]);

  const sideableImagesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = sideableImagesRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [activeProduct]);

  useEffect(() => {
    const handleOpenBag = () => setBagOpen(true);
    window.addEventListener("open-northline-bag", handleOpenBag);
    return () => window.removeEventListener("open-northline-bag", handleOpenBag);
  }, []);

  return (
    <div className="ft" style={{ 
      minHeight: '100vh', 
      backgroundColor: 'transparent',
      color: 'var(--ink)',
      position: 'relative'
    }}>
      <style>{`
        .ft{
          --paper:#FBF7EF; --ink:#141317; --dim:#565462; --hair:rgba(20,19,23,0.16);
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
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <FoldBackdropV8 />
      </div>

      <header className="shell flex items-center gap-4 py-4" style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.45)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <a href="/s/v8" className="text-[1.15rem] font-black tracking-[-0.05em]" style={{ color: 'var(--ink)', textDecoration: 'none' }}>VIVRE</a>
        <span className="lbl hidden sm:inline" style={{ color: "var(--dim)" }}>
          Drop 001
        </span>
        <span className="flex-1" />
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
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          {bag.length > 0 && <span style={{ marginLeft: '0.4rem' }}>{bag.length}</span>}
        </button>
      </header>

      <main className="nl-shop-container" style={{ position: 'relative', zIndex: 10, minHeight: '100vh' }}>
        
        {/* Top Category Nav (Urban Contrive style) */}
        <nav className="nl-shop-categories-nav">
          {dynamicCategories.map(filter => (
            <button
              key={filter}
              type="button"
              className={`nl-shop-category-pill ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </nav>

        {/* Product Grid Area */}
        <section className="nl-shop-content" style={{ display: 'flex', flexDirection: 'column' }}>
          
          {/* Header & Sort Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
            <span style={{ color: '#999', fontSize: '0.9rem' }}>
              {shownProducts.length} {shownProducts.length === 1 ? 'Result' : 'Results'}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <label htmlFor="sortOrder" style={{ color: '#666', fontSize: '0.9rem' }}>Sort by</label>
              <select 
                id="sortOrder"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                style={{
                  background: 'transparent',
                  color: '#1a1a1a',
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {shopifyLoading ? (
            <p style={{ color: '#666' }}>Loading collection...</p>
          ) : displayedProducts.length === 0 ? (
            <p style={{ color: '#666' }}>No products match your filters.</p>
          ) : (
            <>
              <div className="nl-product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '3rem 2rem' }}>
                {displayedProducts.map((product, index) => (
                  <article 
                    className="nl-product" 
                    key={product.id} 
                    data-product-index={index}
                    style={{
                      background: 'rgba(255, 255, 255, 0.45)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: '1px solid rgba(0, 0, 0, 0.06)',
                      borderRadius: '16px',
                      padding: '1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.3s ease, background 0.3s ease',
                    }}
                  >
                    <button
                      className="nl-product-image"
                      type="button"
                      onClick={() => openProduct(product)}
                      aria-label={`View details for ${product.name}`}
                      style={{ background: 'transparent', aspectRatio: '4/5', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', overflow: 'hidden' }}
                    >
                      <img src={product.image} alt={product.alt} loading="lazy" style={{ objectFit: 'cover', width: '100%', height: '100%', transition: 'transform 0.5s ease' }} />
                    </button>
                    <div className="nl-product-copy" style={{ marginTop: '1.5rem', textAlign: 'center', flexGrow: 1 }}>
                      <h3 style={{ color: '#1a1a1a', fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 500 }}>{product.name}</h3>
                      <p style={{ color: 'rgba(0,0,0,0.55)' }}>{product.price}</p>
                    </div>
                    <div className="nl-product-actions" style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                      <button
                        className="nl-button"
                        type="button"
                        onClick={() => openProduct(product)}
                        style={{ 
                          padding: '0.75rem 1.5rem', 
                          border: '1px solid rgba(0,0,0,0.15)', 
                          background: 'rgba(0,0,0,0.04)', 
                          color: '#1a1a1a', 
                          borderRadius: '30px',
                          transition: 'background 0.2s ease',
                          width: '100%'
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              {/* Load More Button */}
              {visibleCount < shownProducts.length && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
                  <button
                    onClick={() => setVisibleCount(prev => prev + 12)}
                    style={{
                      background: 'transparent',
                      color: '#1a1a1a',
                      border: '1px solid rgba(0,0,0,0.15)',
                      padding: '0.75rem 3rem',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'background 0.2s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.04)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </section>

      </main>

      <NorthlineFooter />

      {/* Product Modal overlay */}
      {activeProduct && typeof document !== "undefined" && createPortal(
        <div className="nl-layer is-immersive">
          <div 
            className="nl-layer-backdrop-image"
            style={{ backgroundImage: `url(${activeProduct.image})` }}
          />
          <button
            className="nl-layer-backdrop"
            type="button"
            aria-label="Close product details"
            onClick={() => setActiveProduct(null)}
          />
          <section
            className="nl-product-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="northline-product-title"
          >
            <button
              className="nl-dialog-close"
              type="button"
              onClick={() => setActiveProduct(null)}
            >
              Close
            </button>
            <div className="nl-dialog-glass-content">
              <div className="nl-dialog-glass-left">
                <p className="nl-dialog-group">{activeProduct.group}</p>
                <h2 id="northline-product-title">{activeProduct.name}</h2>
                <div className="nl-dialog-divider"></div>
                <div className="nl-dialog-logistics">
                  <div className="nl-dialog-option-group">
                    <span className="nl-dialog-option-label">PRICE</span>
                    <span className="nl-dialog-option-value">{activeProduct.price}</span>
                  </div>
                  <fieldset className="nl-dialog-option-fieldset">
                    <legend className="nl-dialog-option-label">COLOR</legend>
                    <div className="nl-option-row">
                      {activeProduct.colors.map((color) => {
                        const isDefault = color.toLowerCase() === 'default';
                        return isDefault ? (
                          <button
                            key={color}
                            type="button"
                            className={selectedColor === color ? "is-selected" : ""}
                            onClick={() => setSelectedColor(color)}
                          >
                            {color}
                          </button>
                        ) : (
                          <button
                            key={color}
                            type="button"
                            className={`nl-color-swatch ${selectedColor === color ? "is-selected" : ""}`}
                            onClick={() => setSelectedColor(color)}
                            style={{ backgroundColor: color.toLowerCase().replace(/\s/g, '') }}
                            aria-label={color}
                            title={color}
                          />
                        );
                      })}
                    </div>
                  </fieldset>
                  <fieldset className="nl-dialog-option-fieldset">
                    <legend className="nl-dialog-option-label">SIZE</legend>
                    <div className="nl-option-row">
                      {activeProduct.sizes.map((size) => (
                        <button
                          key={size}
                          type="button"
                          className={selectedSize === size ? "is-selected" : ""}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                </div>
              </div>
              <div className="nl-dialog-glass-right">
                <div className="nl-dialog-sideable-images" ref={sideableImagesRef}>
                  {activeProduct.images?.map((img, i) => (
                    <img key={i} src={img} alt={`${activeProduct.alt} view ${i + 1}`} loading="lazy" />
                  ))}
                </div>
              </div>
              <div className="nl-dialog-glass-description">
                <h3 className="nl-dialog-group" style={{ marginBottom: '1rem', border: 'none' }}>Description</h3>
                <div 
                  className="nl-dialog-description-long"
                  dangerouslySetInnerHTML={{ __html: activeProduct.description }}
                />
              </div>
            </div>
            <div className="nl-dialog-glass-footer">
              <button
                className="nl-button nl-button-primary nl-dialog-glass-add"
                type="button"
                onClick={() => addToBag(activeProduct)}
              >
                Add to cart
              </button>
            </div>
          </section>
        </div>, document.body
      )}

      {/* Bag Modal overlay */}
      {bagOpen && typeof document !== "undefined" && createPortal(
        <div className="nl-layer">
          <button
            className="nl-layer-backdrop"
            type="button"
            aria-label="Close bag"
            onClick={() => setBagOpen(false)}
          />
          <aside
            className="nl-bag-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="bag-title"
          >
            <button
              className="nl-dialog-close"
              type="button"
              onClick={() => setBagOpen(false)}
            >
              Close
            </button>
            <h2 id="bag-title">Your bag</h2>
            {bag.length > 0 ? (
              <>
                <ul className="nl-bag-list">
                  {bag.map((item, index) => (
                    <li key={item.id + "-" + index}>
                      <img src={item.image} alt="" decoding="async" />
                      <div>
                        <h3>{item.name}</h3>
                        {item.variantTitle && <p className="text-sm font-medium mb-1">{item.variantTitle}</p>}
                        <p>{item.price}</p>
                      </div>
                      <button type="button" onClick={() => removeFromBag(index)}>
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="nl-bag-footer">
                  <button 
                    className="nl-button nl-button-primary nl-bag-checkout" 
                    type="button"
                    onClick={checkout}
                    disabled={isCheckingOut}
                    style={{ opacity: isCheckingOut ? 0.7 : 1 }}
                  >
                    {isCheckingOut ? "Loading checkout..." : "Checkout via Shopify"}
                  </button>
                </div>
              </>
            ) : (
              <p className="nl-empty-bag">Your bag is ready when you are.</p>
            )}
          </aside>
        </div>, document.body
      )}
    </div>
  );
}
