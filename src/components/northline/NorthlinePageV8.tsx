import {
  startTransition,
  type CSSProperties,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";

import "@/components/northline/northline.css";
import {
  NorthlineScrollEdge,
  type NorthlineEdgeMotion,
} from "@/components/northline/NorthlineScrollEdge";
import { useVivre } from "@/components/northline/VivreContext";
import { shopifyClient } from "@/lib/shopify";
import type { Product as ShopifyProduct } from "shopify-buy";
import { NorthlineScrollFilm } from "@/components/northline/NorthlineScrollFilm";
import { NorthlineFooter } from "@/components/northline/NorthlineFooter";
import { FoldBackdropV8 } from "@/components/street/FoldBackdropV8";
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
  sizes: string[];
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
  const { bag, bagOpen, setBagOpen, isCheckingOut, addToBag: contextAddToBag, removeFromBag, checkout } = useVivre();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [signupMessage, setSignupMessage] = useState("");
  const [shopifyProducts, setShopifyProducts] = useState<ShopifyProduct[]>([]);
  const [collectionDetails, setCollectionDetails] = useState<{title: string, description: string} | null>(null);

  const productGridRef = useRef<HTMLDivElement>(null);
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
    if (activeProduct || bagOpen || mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [activeProduct, bagOpen, mobileMenuOpen]);

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

  // Handle horizontal scrolling on product grid using vertical mouse wheel
  useEffect(() => {
    const grid = productGridRef.current;
    if (!grid) return;
    
    const onWheel = (e: WheelEvent) => {
      // Ignore if it's already a horizontal scroll event (e.g. from trackpad)
      if (e.deltaX !== 0 && Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (e.deltaY === 0) return;
      
      const isScrollableX = grid.scrollWidth > grid.clientWidth;
      if (!isScrollableX) return;
      
      const isAtLeftEdge = grid.scrollLeft === 0;
      // Use a small tolerance (1px) for right edge check
      const isAtRightEdge = Math.ceil(grid.scrollLeft + grid.clientWidth) >= grid.scrollWidth - 1;
      
      // If we are at the left edge and scrolling up, let the page scroll vertically
      if (isAtLeftEdge && e.deltaY < 0) return;
      // If we are at the right edge and scrolling down, let the page scroll vertically
      if (isAtRightEdge && e.deltaY > 0) return;
      
      e.preventDefault();
      grid.scrollLeft += e.deltaY;
    };
    
    grid.addEventListener("wheel", onWheel, { passive: false });
    return () => grid.removeEventListener("wheel", onWheel);
  }, []);

  // Fetch real products from Shopify collection DROP 001
  useEffect(() => {
    if (import.meta.env.VITE_SHOPIFY_DOMAIN && import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN) {
      shopifyClient.collection.fetchAllWithProducts().then((collections) => {
        const dropCollection = collections.find((c: any) => c.title.toLowerCase().includes("drop 001")) || collections[0];
        if (dropCollection) {
          setCollectionDetails({
            title: dropCollection.title,
            description: dropCollection.description || "",
          });
          if (dropCollection.products) {
            setShopifyProducts(dropCollection.products as any);
          }
        } else {
          shopifyClient.product.fetchAll().then((fetchedProducts) => {
            setShopifyProducts(fetchedProducts as any);
          });
        }
      }).catch(err => {
        console.error("Shopify fetch error:", err);
        shopifyClient.product.fetchAll().then((fetchedProducts) => {
          setShopifyProducts(fetchedProducts as any);
        });
      });
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
    description: sp.descriptionHtml || sp.description || sp.vendor || "A purposeful new addition to the line.",
    colors: (sp.options?.find((o: any) => o.name.toLowerCase() === 'color' || o.name.toLowerCase() === 'colour')
      ?.values as unknown as any[])?.map((v: any) => typeof v === 'object' && v !== null ? v.value : v) || ["Default"],
    sizes: (sp.options?.find((o: any) => o.name.toLowerCase() === 'size')
      ?.values as unknown as any[])?.map((v: any) => typeof v === 'object' && v !== null ? v.value : v) || ["One Size"],
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
      contextAddToBag({ ...product, shopifyVariantId: finalVariantId, variantTitle });
      setActiveProduct(null);
    });
  }

  function submitSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.includes("@")) {
      setSignupMessage("Enter a valid email address to join the list.");
      return;
    }

    setSignupMessage("Thanks. Vivre notes will go to " + email + ".");
    setEmail("");
  }

  return (
    <div
      className={`northline northline--v8${continuation ? " northline--continuation" : ""}${splitNavigation ? " northline--split-navigation" : ""}${risingEdge ? " northline--rising-edge" : ""}`}
      data-direction-contract="THESIS: an editorial utility store that treats clothing as an answer to city movement, not a status display. OWN-WORLD: a pale dawn sky, deep ink typography, white canvas, one clay ember feature block, and precise pill controls. STORY: discover a concise collection, inspect an item, and add it to a bag. FIRST VIEWPORT: a large Northline wordmark, a clean fashion silhouette, and a right-aligned statement. FORM: original luxury utility storefront with alternating light and dark bands. FINISH: documented, responsive, and reviewed."
    >
      <a className="nl-skip-link" href="#collection">
        Skip to collection
      </a>

      {!showHeader && (
        <button
          className="scan-runway__cart-button"
          style={{
            position: 'fixed',
            top: 'clamp(1rem, 4vw, 2.5rem)',
            right: 'clamp(1rem, 4vw, 2.5rem)',
            zIndex: 100,
          }}
          onClick={() => setBagOpen(true)}
          aria-label="Open shopping bag"
        >
          <ShoppingCart size={20} strokeWidth={1.8} />
          {bag.length > 0 && (
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              background: '#000',
              color: '#fff',
              borderRadius: '50%',
              minWidth: '18px',
              height: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              fontWeight: 700,
              padding: '0 4px'
            }}>
              {bag.length}
            </span>
          )}
        </button>
      )}

      {showHeader && (
        <header className="nl-header">
          <a className="nl-wordmark" href="#" aria-label="Vivre home">
            Vivre
          </a>
          <nav className="nl-header-nav" aria-label="Main">
            <Link to="/s/v8/shop">Shop All</Link>
            <a href="#">Lookbook</a>
            <a href="#materials">Capsule</a>
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
              aria-label="Mobile"
            >
              <Link to="/s/v8/shop" onClick={() => setMobileMenuOpen(false)}>
                Shop All
              </Link>
              <a href="#" onClick={() => setMobileMenuOpen(false)}>
                Lookbook
              </a>
              <a href="#materials" onClick={() => setMobileMenuOpen(false)}>
                Capsule
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
              alt="Model wearing Vivre-inspired black utility outerwear against a pale dawn sky."
              decoding="async"
            />
            <div className="nl-hero-scrim" />
            <p className="nl-hero-wordmark" aria-hidden="true">
              Vivre
            </p>
            <div className="nl-hero-content">
              <p className="nl-hero-place">Vivre goods for city weather</p>
              <h1>
                Built for the
                <span>long way home.</span>
              </h1>
              <p className="nl-hero-copy">
                Purposeful layers and carry goods for platforms, pavements, and everything after.
              </p>
              <div className="nl-hero-actions">
                <a className="nl-button nl-button-primary" href="#">
                  Shop the system
                </a>
                <a className="nl-button nl-button-quiet" href="#">
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
              <Link to="/s/v8/shop">Shop All</Link>
              <a href="#">Lookbook</a>
              <a href="#materials">Capsule</a>
            </nav>
          )}
          {!splitNavigation && (
            <nav className="nl-footer-nav" aria-label="Footer">
              <Link to="/s/v8/shop">Shop All</Link>
              <a href="#">Lookbook</a>
              <a href="#materials">Capsule</a>
            </nav>
          )}
          <div className="nl-collection-intro nl-reveal">
            <div>
              <h2>
                {collectionDetails?.title || "DROP 001"}
              </h2>
            </div>
            {collectionDetails?.description && <p>{collectionDetails.description}</p>}
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
          <div className="nl-product-grid" ref={productGridRef}>
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

      </main>

      <div style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#ffffff' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <FoldBackdropV8 />
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <NorthlineFooter />
        </div>
      </div>

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

      {bagOpen && typeof document !== "undefined" && createPortal(
        <div className="nl-layer">
          <button
            className="nl-layer-backdrop"
            type="button"
            aria-label="Close bag"
            onClick={() => setBagOpen(false)}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(24px) saturate(150%)',
              WebkitBackdropFilter: 'blur(24px) saturate(150%)',
              transform: 'translateZ(0)',
              willChange: 'transform, backdrop-filter',
            }}
          />
          <aside
            className="nl-bag-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="bag-title"
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
              borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
              marginBottom: '1.5rem'
            }}>
              <h2 id="bag-title" style={{ margin: 0, color: '#000000', fontSize: '3.5rem', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1 }}>Your bag</h2>
              <button
                className="nl-dialog-close"
                type="button"
                onClick={() => setBagOpen(false)}
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
