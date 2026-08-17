import React, { useState, useEffect, useRef, useMemo } from "react";
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
  fits?: string[];
  images?: string[];
  rawPrice?: number;
  shopifyVariantId?: string;
  variantTitle?: string;
}

export function NorthlineLookbook() {
  const [shopifyProducts, setShopifyProducts] = useState<any[]>([]);
  const [shopifyLoading, setShopifyLoading] = useState(true);
  
  const [bag, setBag] = useState<Product[]>([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("Default");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedFit, setSelectedFit] = useState<string>("");
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
      setShopifyLoading(false);
    }
  }, []);

  // Map live Shopify products
  const liveProducts: Product[] = shopifyProducts.map(sp => ({
    id: sp.id.toString(),
    name: sp.title,
    group: (sp.productType || "New Arrivals").charAt(0).toUpperCase() + (sp.productType || "New Arrivals").slice(1),
    price: `GBP £${parseFloat(sp.variants?.[0]?.price?.amount || '0').toFixed(2)}`,
    image: sp.images?.[0]?.src || "/northline-motion/v8/chibi-still-3.webp",
    alt: sp.title,
    description: sp.vendor || "A purposeful new addition to the line.",
    colors: sp.options?.find((o: any) => o.name.toLowerCase() === 'color' || o.name.toLowerCase() === 'colour')
      ?.values.map((v: any) => v.value) || ["Default"],
    sizes: sp.options?.find((o: any) => o.name.toLowerCase() === 'size')
      ?.values.map((v: any) => v.value) || ["S", "M", "L", "XL"],
    fits: sp.options?.find((o: any) => o.name.toLowerCase() === 'fit')
      ?.values.map((v: any) => v.value) || [],
    images: sp.images?.map((img: any) => img.src) || [],
    rawPrice: parseFloat(sp.variants?.[0]?.price?.amount || "0"),
    shopifyVariantId: sp.variants?.[0]?.id?.toString()
  }));

  // Define looks (using fallback images, and mapping products automatically)
  const looks = [
    {
      id: "look-01",
      title: "LOOK 01 / DUSK",
      image: "https://images.unsplash.com/photo-1550614000-4b95d4ed4e32?auto=format&fit=crop&q=80&w=2000",
      productIndices: [0, 1] // Indices from liveProducts
    },
    {
      id: "look-02",
      title: "LOOK 02 / TRANSIT",
      image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=2000",
      productIndices: [2, 3]
    },
    {
      id: "look-03",
      title: "LOOK 03 / TERMINAL",
      image: "https://images.unsplash.com/photo-1520975954732-57dd22299614?auto=format&fit=crop&q=80&w=2000",
      productIndices: [4, 5]
    }
  ];

  const openProduct = (product: Product) => {
    setActiveProduct(product);
    setSelectedColor(product.colors[0] || "Default");
    setSelectedSize(product.sizes[0] || "M");
    setSelectedFit(product.fits?.[0] || "");
  };

  const addToBag = (product: Product) => {
    // Look up correct variant ID based on selected size/color/fit
    let shopifyVariantId = product.shopifyVariantId;
    const sp = shopifyProducts.find(s => s.id.toString() === product.id);
    if (sp && sp.variants) {
      const matched = sp.variants.find((v: any) => {
        return v.selectedOptions?.every((opt: any) => {
          const name = opt.name.toLowerCase();
          if (name === 'size' && selectedSize) return opt.value === selectedSize;
          if ((name === 'color' || name === 'colour') && selectedColor) return opt.value === selectedColor;
          if (name === 'fit' && selectedFit) return opt.value === selectedFit;
          return true;
        });
      });
      if (matched) shopifyVariantId = matched.id.toString();
    }

    setBag([...bag, { ...product, shopifyVariantId }]);
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

  const { descriptionContent, sizeGuideContent } = useMemo(() => {
      if (!activeProduct) return { descriptionContent: "", sizeGuideContent: null };
      
      const html = activeProduct.description || "";
      if (typeof window === 'undefined') return { descriptionContent: html, sizeGuideContent: null };
  
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        let foundSizeGuide = false;
        let extractedSizeGuide = "";
        
        const children = Array.from(doc.body.children);
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          if (!foundSizeGuide && child.textContent?.toLowerCase().includes("size guide")) {
            foundSizeGuide = true;
          }
          if (foundSizeGuide) {
            extractedSizeGuide += child.outerHTML;
            child.remove();
          }
        }
        if (foundSizeGuide) {
           return { descriptionContent: doc.body.innerHTML, sizeGuideContent: extractedSizeGuide };
        }
      } catch (e) {
        console.error("Error parsing description HTML", e);
      }
      return { descriptionContent: html, sizeGuideContent: null };
    }, [activeProduct]);

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

  return (
    <div className="ft nl-lookbook-container">
      {/* Header */}
      <header className="shell flex items-center gap-4 py-4 nl-lookbook-header">
        <a href="/s/v8" className="text-[1.15rem] font-black tracking-[-0.05em]" style={{ color: 'var(--ink)', textDecoration: 'none' }}>VIVRE</a>
        <span className="lbl hidden sm:inline" style={{ color: "var(--dim)" }}>
          Drop 001
        </span>
        <div className="flex-1" />
        <a href="/s/v8/shop" className="lbl hidden sm:inline mr-4" style={{ color: "var(--dim)", textDecoration: 'none' }}>
          Shop All
        </a>
        <button className="btn is-pill" onClick={() => setBagOpen(true)}>
          <div className="lbl">Bag</div>
          <div className="lbl" style={{ color: "var(--dim)" }}>
            {bag.length}
          </div>
        </button>
      </header>

      {/* Snap Scroller */}
      <main className="nl-lookbook-scroller">
        {looks.map((look) => {
          // Get products that actually exist in the live list for this look
          const lookProducts = look.productIndices
            .map(index => liveProducts[index])
            .filter(Boolean);

          return (
            <section key={look.id} className="nl-look">
              <div className="nl-look-image" style={{ backgroundImage: `url(${look.image})` }}></div>
              
              <div className="nl-look-overlay">
                <div className="nl-look-details">
                  <h2 className="nl-look-title">{look.title}</h2>
                  <div className="nl-look-products">
                    {lookProducts.map(product => (
                      <button 
                        key={product.id} 
                        className="nl-look-product-card"
                        onClick={() => openProduct(product)}
                      >
                        <img src={product.image} alt={product.alt} className="nl-look-product-img" />
                        <div className="nl-look-product-info">
                          <span className="nl-look-product-group">{product.group}</span>
                          <span className="nl-look-product-name">{product.name}</span>
                          <span className="nl-look-product-price">{product.price}</span>
                        </div>
                        <div className="nl-look-product-action">
                          +
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </main>

      {/* Bag overlay (same as Shop) */}
      {bagOpen && typeof document !== "undefined" && createPortal(
        <div className="nl-layer">
          <button
            className="nl-layer-backdrop"
            type="button"
            aria-label="Close bag"
            onClick={() => setBagOpen(false)}
          />
          <section
            className="nl-bag-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="northline-bag-title"
          >
            <div className="nl-bag-header">
              <h2 id="northline-bag-title">Bag ({bag.length})</h2>
              <button
                className="nl-dialog-close"
                type="button"
                onClick={() => setBagOpen(false)}
              >
                Close
              </button>
            </div>
            
            <div className="nl-bag-items">
              {bag.length === 0 ? (
                <div className="nl-bag-empty">Your bag is empty</div>
              ) : (
                bag.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="nl-bag-item">
                    <img src={item.image} alt={item.name} />
                    <div className="nl-bag-item-details">
                      <h3>{item.name}</h3>
                      <p>{item.price}</p>
                    </div>
                    <button 
                      className="nl-bag-item-remove"
                      onClick={() => removeFromBag(index)}
                      aria-label="Remove item"
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="nl-bag-footer">
              <div className="nl-bag-total">
                <span>Total</span>
                <span>
                  GBP {bag.reduce((total, item) => total + (item.rawPrice || 0), 0).toFixed(2)}
                </span>
              </div>
              <button 
                className="nl-button nl-button-primary"
                onClick={checkout}
                disabled={bag.length === 0 || isCheckingOut}
              >
                {isCheckingOut ? "Processing..." : "Checkout"}
              </button>
            </div>
          </section>
        </div>, document.body
      )}

      {/* Product Modal overlay (Immersive layout) */}
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
                  <div className="nl-dialog-description" dangerouslySetInnerHTML={{ __html: descriptionContent }} />
                  {sizeGuideContent && (
                    <>
                      <h4 className="nl-dialog-group" style={{ marginBottom: '0.5rem', marginTop: '1rem', border: 'none', fontSize: '0.75rem' }}>Size Guide</h4>
                      <div className="nl-dialog-description size-guide-content" dangerouslySetInnerHTML={{ __html: sizeGuideContent }} />
                    </>
                  )}
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
                  {activeProduct.fits && activeProduct.fits.length > 0 && activeProduct.fits[0] !== 'Default Title' && (
                    <fieldset className="nl-dialog-option-fieldset">
                      <legend className="nl-dialog-option-label">FIT</legend>
                      <div className="nl-option-row">
                        {activeProduct.fits.map((fit) => (
                          <button
                            key={fit}
                            type="button"
                            className={selectedFit === fit ? "is-selected" : ""}
                            onClick={() => setSelectedFit(fit)}
                          >
                            {fit}
                          </button>
                        ))}
                      </div>
                    </fieldset>
                  )}
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
    </div>
  );
}
