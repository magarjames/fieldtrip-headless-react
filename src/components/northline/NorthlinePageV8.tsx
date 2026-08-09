import {
  startTransition,
  type CSSProperties,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import "@/components/northline/northline.css";
import {
  NorthlineScrollEdge,
  type NorthlineEdgeMotion,
} from "@/components/northline/NorthlineScrollEdge";
import { shopifyClient } from "@/lib/shopify";
import type { Product as ShopifyProduct } from "shopify-buy";
import { NorthlineScrollFilm } from "@/components/northline/NorthlineScrollFilm";
import detailBlue from "@/assets/northline/detail-blue.jpg";
import flatlay from "@/assets/northline/flatlay.jpg";
import heroDawn from "@/assets/northline/hero-dawn.png";
import materials from "@/assets/northline/materials.jpg";

type Product = {
  id: string;
  name: string;
  group: string;
  price: string;
  image: string;
  alt: string;
  description: string;
  colors: string[];
  shopifyVariantId?: string;
  variants?: any[];
  variantTitle?: string;
  images?: string[];
};

function PremiumTypewriterText({ text, startIndex }: { text: string; startIndex: number }) {
  let characterIndex = startIndex;

  return (
    <span className="nl-typewriter-text" aria-hidden="true">
      {text.split(/(\s+)/).map((part, partIndex) => {
        const characters = Array.from(part).map((character) => {
          const index = characterIndex;
          characterIndex += 1;

          return (
            <span
              className="nl-typewriter-char"
              key={`${partIndex}-${index}`}
              style={{ "--nl-char-index": index } as CSSProperties}
            >
              {character}
            </span>
          );
        });

        return part.trim() ? (
          <span className="nl-typewriter-word" key={`${part}-${partIndex}`}>
            {characters}
          </span>
        ) : (
          <span className="nl-typewriter-space" key={`space-${partIndex}`}>
            {characters}
          </span>
        );
      })}
    </span>
  );
}

export function NorthlinePageV8({
  showHeader = true,
  showHero = true,
  homeHref = "#top",
  continuation = false,
  splitNavigation = false,
  risingEdge = false,
}: {
  showHeader?: boolean;
  showHero?: boolean;
  homeHref?: string;
  /** Expose the shared gradient behind the collection and provide its local navigation. */
  continuation?: boolean;
  /** Scrub the local navigation from a centered row into the collection's side rail. */
  splitNavigation?: boolean;
  /** Lift a soft fabric-like edge over the previous scene as the collection arrives. */
  risingEdge?: boolean;
} = {}) {
  const materialsVideoSrc = "/northline/materials-motion.mp4";
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const deferredFilter = useDeferredValue(activeFilter);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [bag, setBag] = useState<Product[]>([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [signupMessage, setSignupMessage] = useState("");
  const [shopifyProducts, setShopifyProducts] = useState<ShopifyProduct[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const continuationNavRef = useRef<HTMLElement>(null);
  const edgeMotionRef = useRef<NorthlineEdgeMotion>({ progress: 0 });
  const materialsRef = useRef<HTMLElement>(null);
  const systemRef = useRef<HTMLElement>(null);
  const materialsEdgeMotionRef = useRef<NorthlineEdgeMotion>({ progress: 0 });
  const systemEdgeMotionRef = useRef<NorthlineEdgeMotion>({ progress: 0 });
  const materialsVideoRef = useRef<HTMLVideoElement>(null);
  const materialsCopyRef = useRef<HTMLDivElement>(null);
  const [materialsVideoBlocked, setMaterialsVideoBlocked] = useState(false);
  const [materialsTypewriterActive, setMaterialsTypewriterActive] = useState(false);

  const materialsStory = {
    title: "Streetwear for",
    titleAccent: "after dark.",
    intro:
      "Graphic layers, relaxed proportions, and finishing details that turn separate pieces into a complete look.",
    points: [
      {
        title: "Graphic layers",
        body: "Statement tees and outer layers that give the outfit its point of view.",
      },
      {
        title: "Relaxed silhouettes",
        body: "Loose lines and wide fits made for stacking without losing their shape.",
      },
      {
        title: "Finish the look",
        body: "Metal details and accessories that pull every layer in the same direction.",
      },
    ],
  };
  const materialsTextSegments = [
    materialsStory.title,
    materialsStory.titleAccent,
    materialsStory.intro,
    ...materialsStory.points.flatMap((point) => [point.title, point.body]),
  ];
  const materialsTextOffsets = materialsTextSegments.reduce<number[]>((offsets, segment, index) => {
    if (index === 0) {
      offsets.push(0);
      return offsets;
    }

    const previousSegment = materialsTextSegments[index - 1];
    offsets.push(offsets[index - 1] + Array.from(previousSegment).length + 7);
    return offsets;
  }, []);

  useEffect(() => {
    const video = materialsVideoRef.current;
    if (!video || !materialsVideoSrc) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isVisible = false;

    const syncPlayback = () => {
      if (reducedMotion.matches || document.hidden || !isVisible) {
        video.pause();
        if (reducedMotion.matches) setMaterialsVideoBlocked(false);
        return;
      }

      void video.play().catch(() => {
        setMaterialsVideoBlocked(true);
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        syncPlayback();
      },
      { threshold: 0.08 },
    );

    observer.observe(video);
    reducedMotion.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
    };
  }, [materialsVideoSrc]);

  useEffect(() => {
    const copy = materialsCopyRef.current;
    if (!copy) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      setMaterialsTypewriterActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setMaterialsTypewriterActive(true);
        observer.disconnect();
      },
      { threshold: 0.28 },
    );

    observer.observe(copy);
    return () => observer.disconnect();
  }, []);

  // Fetch real products from Shopify
  useEffect(() => {
    if (import.meta.env.VITE_SHOPIFY_DOMAIN && import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN) {
      shopifyClient.product.fetchAll().then((fetchedProducts) => {
        setShopifyProducts(fetchedProducts as any); // Cast to any to avoid strict type mismatch with local typings
      }).catch(err => console.error("Shopify fetch error:", err));
    }
  }, []);

  // Map live Shopify products
  const liveProducts: Product[] = shopifyProducts.map(sp => ({
    id: sp.id.toString(),
    name: sp.title,
    group: (sp.productType || "New Arrivals").charAt(0).toUpperCase() + (sp.productType || "New Arrivals").slice(1),
    price: `GBP ${sp.variants?.[0]?.price?.amount || '0'}`,
    image: sp.images?.[0]?.src || flatlay,
    alt: sp.title,
    description: sp.vendor || "A purposeful new addition to the line.",
    colors: sp.options?.find((o: any) => o.name.toLowerCase() === 'color' || o.name.toLowerCase() === 'colour')
      ?.values.map((v: any) => typeof v === 'object' && v !== null ? v.value : v) || ["Default"],
    sizes: sp.options?.find((o: any) => o.name.toLowerCase() === 'size')
      ?.values.map((v: any) => typeof v === 'object' && v !== null ? v.value : v) || ["One Size"],
    shopifyVariantId: (sp.variants?.[0] as any)?.id,
    variants: sp.variants,
    images: sp.images?.map((img: any) => img.src) || [sp.images?.[0]?.src || flatlay]
  }));

  const dynamicFilters = ["All", ...Array.from(new Set(liveProducts.map(p => p.group).filter(Boolean)))];

  const shownProducts = liveProducts.filter(
    (product) => deferredFilter === "All" || product.group === deferredFilter,
  );

  useEffect(() => {
    if (!activeProduct && !bagOpen && !mobileMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setActiveProduct(null);
      setBagOpen(false);
      setMobileMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeProduct, bagOpen, mobileMenuOpen]);

  useEffect(() => {
    const handleOpenBag = () => setBagOpen(true);
    window.addEventListener("open-northline-bag", handleOpenBag);
    return () => window.removeEventListener("open-northline-bag", handleOpenBag);
  }, []);

  useEffect(() => {
    if (!continuation || !splitNavigation) return;

    const nav = continuationNavRef.current;
    const collection = nav?.closest<HTMLElement>(".nl-collection");
    const intro = collection?.querySelector<HTMLElement>(".nl-collection-intro");
    const edge = collection?.querySelector<HTMLElement>(".nl-collection-edge");
    const links = nav ? Array.from(nav.querySelectorAll<HTMLAnchorElement>("a")) : [];
    if (!nav || !collection || !intro || !links.length) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;
    let cachedLinkWidths: number[] | null = null;

    const clearMotionStyles = () => {
      nav.classList.remove("is-scroll-motion-ready");
      nav.classList.remove("is-docked");
      nav.style.removeProperty("--nl-nav-progress");
      edge?.style.removeProperty("transform");
      edgeMotionRef.current.progress = 0;
      links.forEach((link) => link.style.removeProperty("transform"));
    };

    const updateNavigation = () => {
      animationFrame = 0;

      if (window.innerWidth <= 920 || reducedMotion.matches) {
        clearMotionStyles();
        return;
      }

      nav.classList.add("is-scroll-motion-ready");

      const collectionTop = collection.getBoundingClientRect().top;
      const collectionBottom = collection.getBoundingClientRect().bottom;
      const motionDistance = Math.min(window.innerHeight * 0.52, 420);
      const progress = Math.min(1, Math.max(0, (motionDistance - collectionTop) / motionDistance));
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const edgeDistance = Math.min(window.innerHeight * 0.58, 520);
      const edgeProgress = Math.min(
        1,
        Math.max(0, (window.innerHeight - collectionTop) / edgeDistance),
      );
      const easedEdgeProgress = 1 - Math.pow(1 - edgeProgress, 3);
      const edgeLift = Math.min(126, Math.max(82, window.innerWidth * 0.064));
      if (cachedLinkWidths === null) {
        cachedLinkWidths = links.map((link) => link.getBoundingClientRect().width);
      }
      const linkWidths = cachedLinkWidths;
      const horizontalGap = Math.min(38, Math.max(22, window.innerWidth * 0.022));
      const totalWidth =
        linkWidths.reduce((total, width) => total + width, 0) + horizontalGap * (links.length - 1);
      const initialLeft = Math.max(20, (window.innerWidth - totalWidth) / 2);
      const railLeft = Math.min(80, Math.max(20, window.innerWidth * 0.05));
      const entryTop = Math.min(54, Math.max(42, window.innerHeight * 0.052));
      const railTop = Math.min(176, Math.max(112, window.innerWidth * 0.11));
      const railBottom = railTop + links.length * 58;
      nav.classList.toggle("is-docked", collectionTop <= 0 && collectionBottom > railBottom);
      edgeMotionRef.current.progress = easedEdgeProgress;
      edge?.style.setProperty(
        "transform",
        `translate3d(0, ${(-edgeLift * easedEdgeProgress).toFixed(2)}px, 0)`,
      );

      let horizontalOffset = 0;
      links.forEach((link, index) => {
        const startX = initialLeft + horizontalOffset;
        const endY = railTop + index * 58;
        const x = startX + (railLeft - startX) * easedProgress;
        const y = entryTop + (endY - entryTop) * easedProgress;

        link.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
        horizontalOffset += linkWidths[index] + horizontalGap;
      });

      nav.style.setProperty("--nl-nav-progress", progress.toFixed(3));
    };

    const scheduleNavigationUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateNavigation);
    };

    const handleResize = () => {
      cachedLinkWidths = null;
      scheduleNavigationUpdate();
    };

    updateNavigation();
    window.addEventListener("scroll", scheduleNavigationUpdate, { passive: true });
    window.addEventListener("resize", handleResize);
    reducedMotion.addEventListener("change", scheduleNavigationUpdate);

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleNavigationUpdate);
      window.removeEventListener("resize", handleResize);
      reducedMotion.removeEventListener("change", scheduleNavigationUpdate);
      clearMotionStyles();
    };
  }, [continuation, risingEdge, splitNavigation]);

  useEffect(() => {
    if (!risingEdge) return;

    const edges = [
      { section: materialsRef.current, motion: materialsEdgeMotionRef },
      { section: systemRef.current, motion: systemEdgeMotionRef },
    ].filter((entry) => entry.section !== null);
    if (!edges.length) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;

    const updateEdges = () => {
      animationFrame = 0;
      const desktop = window.innerWidth > 920;
      const edgeDistance = Math.min(window.innerHeight * 0.58, 520);
      const edgeLift = Math.min(126, Math.max(82, window.innerWidth * 0.064));

      edges.forEach(({ section, motion }) => {
        if (!section) return;
        const edge = section.querySelector<HTMLElement>(".nl-section-edge");
        const videoFlow = section.querySelector<HTMLElement>(".nl-material-video");
        if (!edge && !videoFlow) return;

        if (!desktop) {
          motion.current.progress = 0;
          edge?.style.removeProperty("transform");
          videoFlow?.style.removeProperty("--nl-video-flow-offset");
          return;
        }

        if (reducedMotion.matches) {
          motion.current.progress = 1;
          if (edge) edge.style.transform = `translate3d(0, ${-edgeLift}px, 0)`;
          videoFlow?.style.setProperty("--nl-video-flow-offset", `${-edgeLift}px`);
          return;
        }

        const sectionTop = section.getBoundingClientRect().top;
        const progress = Math.min(1, Math.max(0, (window.innerHeight - sectionTop) / edgeDistance));
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const offset = (-edgeLift * easedProgress).toFixed(2);
        motion.current.progress = easedProgress;
        if (edge) edge.style.transform = `translate3d(0, ${offset}px, 0)`;
        videoFlow?.style.setProperty("--nl-video-flow-offset", `${offset}px`);
      });
    };

    const scheduleEdgeUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateEdges);
    };

    updateEdges();
    window.addEventListener("scroll", scheduleEdgeUpdate, { passive: true });
    window.addEventListener("resize", scheduleEdgeUpdate, { passive: true });
    reducedMotion.addEventListener("change", scheduleEdgeUpdate);

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleEdgeUpdate);
      window.removeEventListener("resize", scheduleEdgeUpdate);
      reducedMotion.removeEventListener("change", scheduleEdgeUpdate);
      edges.forEach(({ section, motion }) => {
        motion.current.progress = 0;
        section?.querySelector<HTMLElement>(".nl-section-edge")?.style.removeProperty("transform");
        section
          ?.querySelector<HTMLElement>(".nl-material-video")
          ?.style.removeProperty("--nl-video-flow-offset");
      });
    };
  }, [materialsVideoSrc, risingEdge]);

  function openProduct(product: Product) {
    setActiveProduct(product);
    setSelectedColor(product.colors[0]);
    setSelectedSize(product.sizes[0]);
  }

  function addToBag(product: Product) {
    let finalVariantId = product.shopifyVariantId;
    
    // Resolve the selected variant ID if we have variants and selections
    if (product.variants && (selectedSize || selectedColor)) {
      const matched = product.variants.find((v: any) => {
        return v.selectedOptions?.every((opt: any) => {
          const name = opt.name.toLowerCase();
          if (name === 'size' && selectedSize) return opt.value === selectedSize;
          if ((name === 'color' || name === 'colour') && selectedColor) return opt.value === selectedColor;
          return true; // Ignore options we don't track
        });
      });
      if (matched && matched.id) {
        finalVariantId = matched.id;
      }
    }

    let variantTitle = "";
    if (product.variants && finalVariantId) {
      const matched = product.variants.find((v: any) => v.id === finalVariantId);
      if (matched && matched.title && matched.title !== "Default Title") {
        variantTitle = matched.title;
      }
    }

    startTransition(() => {
      setBag((current) => [...current, { ...product, shopifyVariantId: finalVariantId, variantTitle }]);
      setBagOpen(true);
      setActiveProduct(null);
    });
  }

  function removeFromBag(index: number) {
    setBag((current) => current.filter((_, itemIndex) => itemIndex !== index));
  }

  function submitSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.includes("@")) {
      setSignupMessage("Enter a valid email address to join the list.");
      return;
    }

    setSignupMessage("Thanks. Northline notes will go to " + email + ".");
    setEmail("");
  }

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

  return (
    <div
      className={`northline northline--v8${continuation ? " northline--continuation" : ""}${splitNavigation ? " northline--split-navigation" : ""}${risingEdge ? " northline--rising-edge" : ""}`}
      data-direction-contract="THESIS: an editorial utility store that treats clothing as an answer to city movement, not a status display. OWN-WORLD: a pale dawn sky, deep ink typography, white canvas, one clay ember feature block, and precise pill controls. STORY: discover a concise collection, inspect an item, and add it to a bag. FIRST VIEWPORT: a large Northline wordmark, a clean fashion silhouette, and a right-aligned statement. FORM: original luxury utility storefront with alternating light and dark bands. FINISH: documented, responsive, and reviewed."
    >
      <a className="nl-skip-link" href="#collection">
        Skip to collection
      </a>

      {/* Persistent floating cart button — always visible */}
      <button
        className="nl-floating-bag"
        type="button"
        onClick={() => setBagOpen(true)}
        aria-label={`Open bag, ${bag.length} items`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
        {bag.length > 0 && <span className="nl-floating-bag-count">{bag.length}</span>}
      </button>

      {showHeader && (
        <header className="nl-header">
          <a className="nl-wordmark" href={homeHref} aria-label="Northline home">
            Northline
          </a>
          <nav className="nl-nav" aria-label="Primary navigation">
            <a href="#collection">Shop</a>
            <a href="#materials">Materials</a>
            <a href="#journal">Journal</a>
          </nav>
          <div className="nl-header-actions">
            <button
              className="nl-bag-button"
              type="button"
              onClick={() => setBagOpen(true)}
              aria-haspopup="dialog"
            >
              Bag <span>{bag.length}</span>
            </button>
            <button
              className="nl-menu-button"
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-expanded={mobileMenuOpen}
              aria-controls="northline-mobile-menu"
            >
              {mobileMenuOpen ? "Close" : "Menu"}
            </button>
          </div>
          {mobileMenuOpen && (
            <nav
              id="northline-mobile-menu"
              className="nl-mobile-menu"
              aria-label="Mobile navigation"
            >
              <a href="#collection" onClick={() => setMobileMenuOpen(false)}>
                Shop
              </a>
              <a href="#materials" onClick={() => setMobileMenuOpen(false)}>
                Materials
              </a>
              <a href="#journal" onClick={() => setMobileMenuOpen(false)}>
                Journal
              </a>
            </nav>
          )}
        </header>
      )}

      <main id="top">
        {showHero && (
          <section className="nl-hero">
            <img
              className="nl-hero-image"
              src={heroDawn}
              alt="Model wearing Northline-inspired black utility outerwear against a pale dawn sky."
              decoding="async"
            />
            <div className="nl-hero-scrim" />
            <p className="nl-hero-wordmark" aria-hidden="true">
              Northline
            </p>
            <div className="nl-hero-content">
              <p className="nl-hero-place">Northline goods for city weather</p>
              <h1>
                Built for the
                <span>long way home.</span>
              </h1>
              <p className="nl-hero-copy">
                Purposeful layers and carry goods for platforms, pavements, and everything after.
              </p>
              <div className="nl-hero-actions">
                <a className="nl-button nl-button-primary" href="#collection">
                  Shop the collection
                </a>
                <a className="nl-button nl-button-quiet" href="#materials">
                  See the material
                </a>
              </div>
            </div>
          </section>
        )}

        <section id="collection" className="nl-collection">
          {risingEdge && <NorthlineScrollEdge motion={edgeMotionRef} />}
          {continuation && (
            <nav
              ref={continuationNavRef}
              className="nl-continuation-nav"
              aria-label="Collection navigation"
            >
              <a href="#collection">Shop</a>
              <a href="#materials">Materials</a>
              <a href="#journal">Journal</a>
            </nav>
          )}
          <div className="nl-collection-intro nl-reveal">
            <div>
              <h2>
                Less to carry.
                <span>More to rely on.</span>
              </h2>
            </div>
            <p>Every piece earns its place by keeping one part of a busy day simpler.</p>
          </div>
          <div className="nl-filter-row" aria-label="Filter the collection">
            {dynamicFilters.map((filter) => (
              <button
                key={filter}
                className={activeFilter === filter ? "is-active" : ""}
                type="button"
                aria-pressed={activeFilter === filter}
                onClick={() => startTransition(() => setActiveFilter(filter))}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="nl-product-grid">
            {shownProducts.map((product, index) => (
              <article className="nl-product nl-reveal" key={product.id} data-product-index={index}>
                <button
                  type="button"
                  className="nl-product-image"
                  onClick={() => openProduct(product)}
                  aria-label={"Quick view " + product.name}
                >
                  <img src={product.image} alt={product.alt} loading="lazy" decoding="async" />
                </button>
                <div className="nl-product-copy">
                  <div>
                    <p>{product.group}</p>
                    <h3>{product.name}</h3>
                  </div>
                  <span>{product.price}</span>
                </div>
                <div className="nl-product-actions">
                  <button type="button" onClick={() => openProduct(product)}>
                    Quick view
                  </button>
                  <button type="button" onClick={() => addToBag(product)}>
                    Add to bag
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          ref={materialsRef}
          id="materials"
          className={`nl-materials${materialsVideoSrc ? " nl-materials--video" : ""}`}
        >
          {risingEdge && !materialsVideoSrc && (
            <NorthlineScrollEdge
              motion={materialsEdgeMotionRef}
              colour="#0f0f1c"
              toneStrength={0}
              className="nl-section-edge nl-materials-edge"
            />
          )}
          {materialsVideoSrc ? (
            <>
              <svg className="nl-material-video-mask-defs" aria-hidden="true">
                <defs>
                  <clipPath id="nl-material-video-flow-clip" clipPathUnits="objectBoundingBox">
                    <path
                      className="nl-material-video-flow-path"
                      d="M0 .068 C.07 .035 .12 .084 .19 .052 C.27 .022 .33 .088 .42 .049 C.51 .026 .58 .082 .67 .045 C.76 .02 .84 .075 .92 .041 C.96 .03 .98 .054 1 .05 L1 1 L0 1 Z"
                    />
                  </clipPath>
                </defs>
              </svg>
              <div className="nl-material-video" aria-hidden="true">
                <video
                  ref={materialsVideoRef}
                  src={materialsVideoSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  onPlaying={() => setMaterialsVideoBlocked(false)}
                />
              </div>
              {materialsVideoBlocked && (
                <button
                  type="button"
                  className="nl-material-video-play"
                  onClick={() => {
                    const video = materialsVideoRef.current;
                    if (!video) return;
                    video.muted = true;
                    void video.play().then(() => setMaterialsVideoBlocked(false));
                  }}
                >
                  Play motion
                </button>
              )}
            </>
          ) : (
            <figure className="nl-material-image nl-reveal">
              <img
                src={materials}
                alt="Close textile study of cotton, ripstop, lime lining, and zipper hardware."
                loading="lazy"
              />
            </figure>
          )}
          <div
            ref={materialsCopyRef}
            className={`nl-material-copy nl-reveal nl-typewriter-panel${materialsTypewriterActive ? " is-typing" : " is-pending"}`}
          >
            <h2 aria-label={`${materialsStory.title} ${materialsStory.titleAccent}`}>
              <PremiumTypewriterText
                text={materialsStory.title}
                startIndex={materialsTextOffsets[0]}
              />
              <span>
                <PremiumTypewriterText
                  text={materialsStory.titleAccent}
                  startIndex={materialsTextOffsets[1]}
                />
              </span>
            </h2>
            <p aria-label={materialsStory.intro}>
              <PremiumTypewriterText
                text={materialsStory.intro}
                startIndex={materialsTextOffsets[2]}
              />
            </p>
            <div className="nl-material-list">
              {materialsStory.points.map((point, pointIndex) => (
                <article key={point.title}>
                  <h3 aria-label={point.title}>
                    <PremiumTypewriterText
                      text={point.title}
                      startIndex={materialsTextOffsets[3 + pointIndex * 2]}
                    />
                  </h3>
                  <p aria-label={point.body}>
                    <PremiumTypewriterText
                      text={point.body}
                      startIndex={materialsTextOffsets[4 + pointIndex * 2]}
                    />
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section ref={systemRef} className="nl-system">
          {risingEdge && (
            <NorthlineScrollEdge
              motion={systemEdgeMotionRef}
              colour="#bc7155"
              toneStrength={0}
              className="nl-section-edge nl-system-edge"
            />
          )}
          <div className="nl-system-copy nl-reveal">
            <h2>One less decision before the door.</h2>
            <p>
              A shell, a cargo, a smaller bag. Designed to work together without needing a uniform.
            </p>
            <button
              className="nl-text-action"
              type="button"
              onClick={() => {
                if (liveProducts.length > 0) {
                  openProduct(liveProducts[0])
                }
              }}
            >
              Build the starting set
            </button>
          </div>
          <figure className="nl-system-image nl-reveal">
            <img
              src={flatlay}
              alt="Graphite outerwear, utility trousers, compact bag, and socks arranged as a complete outfit."
              loading="lazy"
              decoding="async"
            />
          </figure>
        </section>

        <NorthlineScrollFilm
          image="/northline-motion/film-arrival-frames-hq/frame-001.webp"
          frameSequence={{
            basePath: "/northline-motion/film-arrival-frames",
            highResBasePath: "/northline-motion/film-arrival-frames-hq",
            frameCount: 300,
          }}
          alt="Person in black technical outerwear walking across a pale concrete terrace at dawn."
          messages={[
            {
              title: "Leave with less friction.",
              copy: "A considered layer keeps the first five minutes outside from deciding the rest of your day.",
            },
            {
              title: "Let the material answer.",
              copy: "Weather-resistant structure, quiet hardware, and enough room to move through the day.",
            },
            {
              title: "Keep the last mile open.",
              copy: "When the platform empties, the useful parts are the ones that are still with you.",
            },
          ]}
        />

        <section id="journal" className="nl-signup">
          <div className="nl-signup-content nl-reveal">
            <h2>Keep the line open.</h2>
            <p>New releases, restocks, and useful notes. Nothing daily.</p>
            <form className="nl-signup-form" onSubmit={submitSignup}>
              <label htmlFor="northline-email">Email address</label>
              <div>
                <input
                  id="northline-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
                <button type="submit">Join</button>
              </div>
              <p className="nl-form-message" aria-live="polite">
                {signupMessage}
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="nl-footer">
        <div>
          <a className="nl-footer-wordmark" href={homeHref}>
            Northline
          </a>
          <p>Utility layers for the long way home.</p>
        </div>
        <div className="nl-footer-links">
          <a href="#collection">Shop</a>
          <a href="#materials">Materials</a>
          <a href="#journal">Journal</a>
        </div>
        <p className="nl-footer-note">
          Concept storefront. Connect real supplier copy, pricing, availability, and checkout before
          launch.
        </p>
      </footer>

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
