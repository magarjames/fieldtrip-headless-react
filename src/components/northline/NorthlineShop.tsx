import React, { useState, useEffect } from "react";
import { Link, useSearch } from "@tanstack/react-router";
import { shopifyClient } from "@/lib/shopify";
import "./northline.css";
import { VivreLayout } from "@/components/northline/VivreLayout";

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
  handle?: string;
}

export function NorthlineShop() {
  const search = useSearch({ strict: false }) as any;
  const [shopifyProducts, setShopifyProducts] = useState<any[]>([]);
  const [shopifyLoading, setShopifyLoading] = useState(true);
  
  // Filter & Sort State
  const [activeFilter, setActiveFilter] = useState("All"); // Category
  const [activeColors, setActiveColors] = useState<string[]>([]);
  const [activeSizes, setActiveSizes] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>(search?.sort || "featured"); // featured, newest, price-asc, price-desc
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState<number>(12);

  // Sync sortOrder with URL search params
  useEffect(() => {
    if (search?.sort) {
      setSortOrder(search.sort);
    }
  }, [search?.sort]);

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
    shopifyVariantId: sp.variants?.[0]?.id?.toString(),
    handle: sp.handle || sp.id.toString().split('/').pop()
  }));

  // Build dynamic filter lists
  const dynamicCategories = ["All", ...Array.from(new Set(liveProducts.map(p => p.group).filter(Boolean)))];

  // Apply filters and sort
  const shownProducts = liveProducts.filter((p) => {
    if (activeFilter !== "All" && p.group !== activeFilter) return false;
    
    if (activeColors.length > 0) {
      const hasMatchingColor = p.colors.some(c => activeColors.includes(c));
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

  return (
    <VivreLayout>
      <div className="nl-shop-container" style={{ position: 'relative', zIndex: 10, minHeight: '100vh' }}>
        
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative' }}>
              <label htmlFor="sortOrder" style={{ color: '#666', fontSize: '0.9rem' }}>Sort by</label>
              
              <div style={{ position: 'relative' }}>
                <button
                  type="button"
                  onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.6)',
                    backdropFilter: 'blur(32px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(32px) saturate(200%)',
                    transform: 'translateZ(0)',
                    willChange: 'transform, backdrop-filter',
                    color: '#0c0c0c',
                    border: '1px solid rgba(255, 255, 255, 0.6)',
                    borderRadius: '99px',
                    padding: '0.5rem 1.25rem',
                    outline: 'none',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    boxShadow: '-4px 4px 15px rgba(0, 0, 0, 0.1), inset 1px 1px 0 rgba(255, 255, 255, 0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  {sortOrder === 'featured' && 'Featured'}
                  {sortOrder === 'newest' && 'Newest'}
                  {sortOrder === 'price-asc' && 'Price: Low to High'}
                  {sortOrder === 'price-desc' && 'Price: High to Low'}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5, transform: sortDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}><path d="m6 9 6 6 6-6"/></svg>
                </button>
                
                {sortDropdownOpen && (
                  <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    minWidth: '220px',
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(32px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(32px) saturate(200%)',
                    transform: 'translateZ(0)',
                    willChange: 'transform, backdrop-filter',
                    border: '1px solid rgba(255, 255, 255, 0.6)',
                    borderRadius: '16px',
                    padding: '0.5rem',
                    boxShadow: '-10px 10px 40px rgba(0, 0, 0, 0.1), inset 1px 1px 0 rgba(255, 255, 255, 0.8)',
                    zIndex: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}>
                    {[
                      { value: 'featured', label: 'Featured' },
                      { value: 'newest', label: 'Newest' },
                      { value: 'price-asc', label: 'Price: Low to High' },
                      { value: 'price-desc', label: 'Price: High to Low' }
                    ].map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => { setSortOrder(opt.value); setSortDropdownOpen(false); }}
                        style={{
                          background: sortOrder === opt.value ? 'rgba(0, 0, 0, 0.05)' : 'transparent',
                          border: 'none',
                          color: sortOrder === opt.value ? '#0c0c0c' : 'rgba(0,0,0,0.6)',
                          padding: '0.6rem 1rem',
                          textAlign: 'left',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '0.9rem',
                          transition: 'background 0.2s, color 0.2s'
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0, 0, 0, 0.08)'; e.currentTarget.style.color = '#0c0c0c'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = sortOrder === opt.value ? 'rgba(0, 0, 0, 0.05)' : 'transparent'; e.currentTarget.style.color = sortOrder === opt.value ? '#0c0c0c' : 'rgba(0,0,0,0.6)'; }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
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
                    className="nl-product group" 
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
                    <Link
                      to={`/products/${product.handle}`}
                      className="nl-product-image block"
                      aria-label={`View details for ${product.name}`}
                      style={{ background: 'transparent', aspectRatio: '4/5', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', overflow: 'hidden' }}
                    >
                      <img src={product.image} alt={product.alt} loading="lazy" style={{ objectFit: 'cover', width: '100%', height: '100%', transition: 'transform 0.5s ease' }} className="group-hover:scale-105" />
                    </Link>
                    <div className="nl-product-copy" style={{ marginTop: '1.5rem', textAlign: 'center', flexGrow: 1 }}>
                      <h3 style={{ color: '#1a1a1a', fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 500 }}>{product.name}</h3>
                      <p style={{ color: 'rgba(0,0,0,0.55)' }}>{product.price}</p>
                    </div>
                    <div className="nl-product-actions" style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                      <Link
                        to={`/products/${product.handle}`}
                        className="nl-button"
                        style={{ 
                          padding: '0.75rem 1.5rem', 
                          border: '1px solid rgba(0,0,0,0.15)', 
                          background: 'rgba(0,0,0,0.04)', 
                          color: '#1a1a1a', 
                          borderRadius: '30px',
                          transition: 'background 0.2s ease',
                          width: '100%',
                          textAlign: 'center'
                        }}
                      >
                        View Details
                      </Link>
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
      </div>
    </VivreLayout>
  );
}
