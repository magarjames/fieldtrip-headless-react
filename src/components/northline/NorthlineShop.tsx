import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { shopifyClient } from "@/lib/shopify";
import "./northline.css";

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
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [isCheckingOut, setIsCheckingOut] = useState(false);

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
    description: sp.vendor || "A purposeful new addition to the line.",
    colors: sp.options?.find((o: any) => o.name.toLowerCase() === 'color' || o.name.toLowerCase() === 'colour')
      ?.values.map((v: any) => v.value) || ["Default"],
    sizes: sp.options?.find((o: any) => o.name.toLowerCase() === 'size')
      ?.values.map((v: any) => v.value) || ["S", "M", "L", "XL"],
    images: sp.images?.map((img: any) => img.src) || [],
    rawPrice: parseFloat(sp.variants?.[0]?.price?.amount || "0"),
    shopifyVariantId: sp.variants?.[0]?.id?.toString()
  }));

  // Build a list of categories based on the product group (productType)
  const dynamicFilters = ["All", ...Array.from(new Set(liveProducts.map(p => p.group).filter(Boolean)))];

  const shownProducts = liveProducts.filter(
    (p) => activeFilter === "All" || p.group === activeFilter
  );

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
      // Count duplicate items to send correct quantities
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

  // Listen for custom events to open the bag (e.g. from the V8 hero)
  useEffect(() => {
    const handleOpenBag = () => setBagOpen(true);
    window.addEventListener("open-northline-bag", handleOpenBag);
    return () => window.removeEventListener("open-northline-bag", handleOpenBag);
  }, []);

  return (
    <div className="nl-scope" style={{ minHeight: '100vh', backgroundColor: '#000' }}>
      <header className="nl-header" style={{ position: "sticky", top: 0, zIndex: 50, background: "#0a0a0a", borderBottom: '1px solid #222' }}>
        <a className="nl-wordmark" href="/s/v8" aria-label="Back to Northline home">
          Northline
        </a>
        <div className="nl-header-actions">
          <button 
            className="nl-bag-button" 
            type="button" 
            onClick={() => setBagOpen(true)}
            aria-label={`Open bag, ${bag.length} items`}
          >
            Bag ({bag.length})
          </button>
        </div>
      </header>

      <main className="nl-shop-container" style={{ display: 'flex', minHeight: '100vh', padding: '4rem 5vw', gap: '4rem' }}>
        
        {/* Sticky Sidebar for Categories */}
        <aside className="nl-shop-sidebar" style={{ width: '250px', position: 'sticky', top: '120px', height: 'fit-content' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Categories</h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {dynamicFilters.map(filter => (
              <li key={filter}>
                <button
                  type="button"
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: activeFilter === filter ? '#fff' : '#666',
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    transition: 'color 0.2s ease',
                    textAlign: 'left'
                  }}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Product Grid */}
        <section className="nl-shop-content" style={{ flex: 1 }}>
          {shopifyLoading ? (
            <p style={{ color: '#666' }}>Loading collection...</p>
          ) : shownProducts.length === 0 ? (
            <p style={{ color: '#666' }}>No products found in this category.</p>
          ) : (
            <div className="nl-product-grid" style={{ padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '3rem 2rem' }}>
              {shownProducts.map((product, index) => (
                <article className="nl-product" key={product.id} data-product-index={index}>
                  <button
                    className="nl-product-image"
                    type="button"
                    onClick={() => openProduct(product)}
                    aria-label={`View details for ${product.name}`}
                    style={{ background: 'transparent', aspectRatio: '4/5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <img src={product.image} alt={product.alt} loading="lazy" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                  </button>
                  <div className="nl-product-copy" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                    <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{product.name}</h3>
                    <p style={{ color: '#999' }}>{product.price}</p>
                  </div>
                  <div className="nl-product-actions" style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
                    <button
                      className="nl-button"
                      type="button"
                      onClick={() => openProduct(product)}
                      style={{ padding: '0.5rem 1.5rem', border: '1px solid #333', background: 'transparent', color: '#fff', borderRadius: '2px' }}
                    >
                      View Details
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

      </main>

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
                  <p className="nl-dialog-description">{activeProduct.description}</p>
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
                <div className="nl-dialog-sideable-images">
                  {activeProduct.images?.map((img, i) => (
                    <img key={i} src={img} alt={`${activeProduct.alt} view ${i + 1}`} loading="lazy" />
                  ))}
                </div>
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
