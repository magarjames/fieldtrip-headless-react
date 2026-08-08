import { startTransition, useDeferredValue, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import "@/components/northline/northline.css";
import {
  NorthlineScrollEdge,
  type NorthlineEdgeMotion,
} from "@/components/northline/NorthlineScrollEdge";
import { NorthlineScrollFilm } from "@/components/northline/NorthlineScrollFilm";
import detailBlue from "@/assets/northline/detail-blue.jpg";
import flatlay from "@/assets/northline/flatlay.jpg";
import heroDawn from "@/assets/northline/hero-dawn.png";
import materials from "@/assets/northline/materials.jpg";

type Product = {
  id: string;
  name: string;
  group: "Outer layers" | "Bottoms" | "Carry goods";
  price: string;
  image: string;
  alt: string;
  description: string;
  colors: string[];
  sizes: string[];
};

const products: Product[] = [
  {
    id: "transit-shell",
    name: "Transit shell",
    group: "Outer layers",
    price: "GBP 148",
    image: heroDawn,
    alt: "Model wearing a black technical shell and charcoal cargo trousers against a pale dawn sky.",
    description:
      "A softly structured weather layer with a cropped line and room for the layers you already own.",
    colors: ["Graphite", "Deep navy"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "arc-cargo",
    name: "Arc cargo",
    group: "Bottoms",
    price: "GBP 96",
    image: flatlay,
    alt: "Black utility trousers shown in an overhead studio flat lay.",
    description:
      "Relaxed utility trousers with a clean drape, a calmer pocket layout, and an adjustable finish.",
    colors: ["Black", "Charcoal"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "line-crossbody",
    name: "Line crossbody",
    group: "Carry goods",
    price: "GBP 74",
    image: detailBlue,
    alt: "Close detail of a dark technical jacket sleeve with an acid-lime drawcord.",
    description:
      "A compact crossbody for the things that are annoying to hold and too useful to leave behind.",
    colors: ["Lime", "Black"],
    sizes: ["One size"],
  },
  {
    id: "shift-crew",
    name: "Shift crew",
    group: "Outer layers",
    price: "GBP 62",
    image: materials,
    alt: "Black cotton, ripstop fabric, and lime lining arranged with a metal zipper.",
    description:
      "A dense everyday layer built around a simple fit, visible texture, and an easy collar.",
    colors: ["Washed black", "Stone"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
];

const filters = ["All", "Outer layers", "Bottoms", "Carry goods"] as const;

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
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");
  const deferredFilter = useDeferredValue(activeFilter);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [bag, setBag] = useState<Product[]>([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [signupMessage, setSignupMessage] = useState("");
  const continuationNavRef = useRef<HTMLElement>(null);
  const edgeMotionRef = useRef<NorthlineEdgeMotion>({ progress: 0 });
  const materialsRef = useRef<HTMLElement>(null);
  const systemRef = useRef<HTMLElement>(null);
  const materialsEdgeMotionRef = useRef<NorthlineEdgeMotion>({ progress: 0 });
  const systemEdgeMotionRef = useRef<NorthlineEdgeMotion>({ progress: 0 });

  const shownProducts = products.filter(
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
    let cachedIntroBaseLeft: number | null = null;
    let cachedLinkWidths: number[] | null = null;

    const clearMotionStyles = () => {
      nav.classList.remove("is-scroll-motion-ready");
      nav.classList.remove("is-docked");
      nav.style.removeProperty("--nl-nav-progress");
      intro.style.removeProperty("transform");
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
      
      if (cachedIntroBaseLeft === null) {
        const introTransform = new DOMMatrixReadOnly(window.getComputedStyle(intro).transform);
        cachedIntroBaseLeft = intro.getBoundingClientRect().left - introTransform.m41;
      }
      const introTargetLeft = Math.max(280, window.innerWidth * 0.25);
      const textTravel = Math.max(0, cachedIntroBaseLeft - introTargetLeft);

      nav.classList.toggle("is-docked", collectionTop <= 0 && collectionBottom > railBottom);
      edgeMotionRef.current.progress = easedEdgeProgress;
      edge?.style.setProperty(
        "transform",
        `translate3d(0, ${(-edgeLift * easedEdgeProgress).toFixed(2)}px, 0)`,
      );
      intro.style.transform = `translate3d(${(-textTravel * easedProgress).toFixed(2)}px, 0, 0)`;

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
      cachedIntroBaseLeft = null;
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
        if (!edge) return;

        if (!desktop) {
          motion.current.progress = 0;
          edge.style.removeProperty("transform");
          return;
        }

        if (reducedMotion.matches) {
          motion.current.progress = 1;
          edge.style.transform = `translate3d(0, ${-edgeLift}px, 0)`;
          return;
        }

        const sectionTop = section.getBoundingClientRect().top;
        const progress = Math.min(1, Math.max(0, (window.innerHeight - sectionTop) / edgeDistance));
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        motion.current.progress = easedProgress;
        edge.style.transform = `translate3d(0, ${(-edgeLift * easedProgress).toFixed(2)}px, 0)`;
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
      });
    };
  }, [risingEdge]);

  function openProduct(product: Product) {
    setActiveProduct(product);
    setSelectedColor(product.colors[0]);
    setSelectedSize(product.sizes[0]);
  }

  function addToBag(product: Product) {
    startTransition(() => {
      setBag((current) => [...current, product]);
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

  return (
    <div
      className={`northline${continuation ? " northline--continuation" : ""}${splitNavigation ? " northline--split-navigation" : ""}${risingEdge ? " northline--rising-edge" : ""}`}
      data-direction-contract="THESIS: an editorial utility store that treats clothing as an answer to city movement, not a status display. OWN-WORLD: a pale dawn sky, deep ink typography, white canvas, one clay ember feature block, and precise pill controls. STORY: discover a concise collection, inspect an item, and add it to a bag. FIRST VIEWPORT: a large Northline wordmark, a clean fashion silhouette, and a right-aligned statement. FORM: original luxury utility storefront with alternating light and dark bands. FINISH: documented, responsive, and reviewed."
    >
      <a className="nl-skip-link" href="#collection">
        Skip to collection
      </a>

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
            {filters.map((filter) => (
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

        <section ref={materialsRef} id="materials" className="nl-materials">
          {risingEdge && (
            <NorthlineScrollEdge
              motion={materialsEdgeMotionRef}
              colour="#0f0f1c"
              toneStrength={0}
              className="nl-section-edge nl-materials-edge"
            />
          )}
          <figure className="nl-material-image nl-reveal">
            <img
              src={materials}
              alt="Close textile study of cotton, ripstop, lime lining, and zipper hardware."
              loading="lazy"
              decoding="async"
            />
          </figure>
          <div className="nl-material-copy nl-reveal">
            <h2>
              Fabric does
              <span>the talking.</span>
            </h2>
            <p>
              The collection begins with texture, weight, and the small parts that stay useful after
              the first wear.
            </p>
            <div className="nl-material-list">
              <article>
                <h3>Dense cotton</h3>
                <p>Soft enough for a long day. Structured enough to keep its line.</p>
              </article>
              <article>
                <h3>Ripstop nylon</h3>
                <p>A lightweight answer for unpredictable weather and overpacked bags.</p>
              </article>
              <article>
                <h3>Plain hardware</h3>
                <p>Zips and closures that do their work without becoming the whole look.</p>
              </article>
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
              onClick={() => openProduct(products[0])}
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
        <div className="nl-layer">
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
            <img src={activeProduct.image} alt={activeProduct.alt} decoding="async" />
            <div className="nl-dialog-copy">
              <p>{activeProduct.group}</p>
              <h2 id="northline-product-title">{activeProduct.name}</h2>
              <span>{activeProduct.price}</span>
              <p className="nl-dialog-description">{activeProduct.description}</p>
              <fieldset>
                <legend>Color</legend>
                <div className="nl-option-row">
                  {activeProduct.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={selectedColor === color ? "is-selected" : ""}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend>Size</legend>
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
              <button
                className="nl-button nl-button-primary nl-dialog-add"
                type="button"
                onClick={() => addToBag(activeProduct)}
              >
                Add {activeProduct.name} to bag
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
            style={{
              background: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(24px) saturate(150%)",
              WebkitBackdropFilter: "blur(24px) saturate(150%)",
              borderLeft: "1px solid rgba(255, 255, 255, 0.4)",
              borderTopLeftRadius: "24px",
              borderBottomLeftRadius: "24px",
              boxShadow: "-10px 0 40px rgba(0, 0, 0, 0.3)",
              color: "var(--nl-white)"
            }}
          >
            <button
              className="nl-dialog-close"
              type="button"
              onClick={() => setBagOpen(false)}
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                borderColor: "rgba(255, 255, 255, 0.4)",
                color: "var(--nl-white)"
              }}
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
                        <p>{item.price}</p>
                      </div>
                      <button type="button" onClick={() => removeFromBag(index)}>
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
                <button className="nl-button nl-button-primary nl-bag-checkout" type="button">
                  Checkout is a demo
                </button>
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
