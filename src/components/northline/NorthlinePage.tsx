import { startTransition, useDeferredValue, useEffect, useRef, useState } from "react";
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
const systemHeadline = "One less decision before the door.";
const systemHeadlineWords = systemHeadline.split(" ");

export function NorthlinePage({
  showHeader = true,
  showHero = true,
  homeHref = "#top",
  continuation = false,
  splitNavigation = false,
  risingEdge = false,
  scrollSystemStory = false,
  materialsVideoSrc,
  materialsCopyVariant = "materials",
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
  /** Pin only the clay outfit section and reveal its copy while scrolling. */
  scrollSystemStory?: boolean;
  /** Optional full-bleed motion backdrop for the materials section. */
  materialsVideoSrc?: string;
  /** Switch the section story without changing the shared Northline routes. */
  materialsCopyVariant?: "materials" | "streetwear";
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
  const [materialsVideoBlocked, setMaterialsVideoBlocked] = useState(false);
  const continuationNavRef = useRef<HTMLElement>(null);
  const edgeMotionRef = useRef<NorthlineEdgeMotion>({ progress: 0 });
  const materialsRef = useRef<HTMLElement>(null);
  const materialsVideoRef = useRef<HTMLVideoElement>(null);
  const systemRef = useRef<HTMLElement>(null);
  const materialsEdgeMotionRef = useRef<NorthlineEdgeMotion>({ progress: 0 });
  const systemEdgeMotionRef = useRef<NorthlineEdgeMotion>({ progress: 0 });

  const shownProducts = products.filter(
    (product) => deferredFilter === "All" || product.group === deferredFilter,
  );

  const materialsStory =
    materialsCopyVariant === "streetwear"
      ? {
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
        }
      : {
          title: "Fabric does",
          titleAccent: "the talking.",
          intro:
            "The collection begins with texture, weight, and the small parts that stay useful after the first wear.",
          points: [
            {
              title: "Dense cotton",
              body: "Soft enough for a long day. Structured enough to keep its line.",
            },
            {
              title: "Ripstop nylon",
              body: "A lightweight answer for unpredictable weather and overpacked bags.",
            },
            {
              title: "Plain hardware",
              body: "Zips and closures that do their work without becoming the whole look.",
            },
          ],
        };

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
    if (!continuation || !splitNavigation) return;

    const nav = continuationNavRef.current;
    const collection = nav?.closest<HTMLElement>(".nl-collection");
    const intro = collection?.querySelector<HTMLElement>(".nl-collection-intro");
    const edge = collection?.querySelector<HTMLElement>(".nl-collection-edge");
    const links = nav ? Array.from(nav.querySelectorAll<HTMLAnchorElement>("a")) : [];
    if (!nav || !collection || !intro || !links.length) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;

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
      const linkWidths = links.map((link) => link.getBoundingClientRect().width);
      const horizontalGap = Math.min(38, Math.max(22, window.innerWidth * 0.022));
      const totalWidth =
        linkWidths.reduce((total, width) => total + width, 0) + horizontalGap * (links.length - 1);
      const initialLeft = Math.max(20, (window.innerWidth - totalWidth) / 2);
      const railLeft = Math.min(80, Math.max(20, window.innerWidth * 0.05));
      const entryTop = Math.min(54, Math.max(42, window.innerHeight * 0.052));
      const railTop = Math.min(176, Math.max(112, window.innerWidth * 0.11));
      const railBottom = railTop + links.length * 58;
      const introTransform = new DOMMatrixReadOnly(window.getComputedStyle(intro).transform);
      const introBaseLeft = intro.getBoundingClientRect().left - introTransform.m41;
      const introTargetLeft = Math.max(280, window.innerWidth * 0.25);
      const textTravel = Math.max(0, introBaseLeft - introTargetLeft);

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

    updateNavigation();
    window.addEventListener("scroll", scheduleNavigationUpdate, { passive: true });
    window.addEventListener("resize", scheduleNavigationUpdate);
    reducedMotion.addEventListener("change", scheduleNavigationUpdate);

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleNavigationUpdate);
      window.removeEventListener("resize", scheduleNavigationUpdate);
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

  useEffect(() => {
    if (!scrollSystemStory) return;

    const section = systemRef.current;
    if (!section) return;

    const words = Array.from(section.querySelectorAll<HTMLElement>(".nl-system-word"));
    const details = section.querySelector<HTMLElement>(".nl-system-details");
    const image = section.querySelector<HTMLElement>(".nl-system-image");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;

    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    const smoothstep = (start: number, end: number, value: number) => {
      const progress = clamp((value - start) / (end - start));
      return progress * progress * (3 - 2 * progress);
    };

    const resolveStory = () => {
      words.forEach((word) => {
        word.style.opacity = "1";
        word.style.transform = "none";
        word.style.filter = "none";
      });
      if (details) {
        details.style.opacity = "1";
        details.style.transform = "none";
      }
      if (image) {
        image.style.opacity = "1";
        image.style.transform = "none";
        image.style.clipPath = "inset(0% 0% 0% 0%)";
      }
    };

    const updateStory = () => {
      animationFrame = 0;
      if (reducedMotion.matches) {
        resolveStory();
        return;
      }

      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = clamp(-section.getBoundingClientRect().top / travel);
      const mobileStory = window.innerWidth <= 767;
      // Phones enter the sticky scene with a visible first beat instead of an
      // empty clay panel. The remaining words still scrub through the section.
      const storyProgress = mobileStory ? 0.17 + progress * 0.83 : progress;

      words.forEach((word, index) => {
        const reveal = smoothstep(
          0.025 + index * 0.068,
          0.15 + index * 0.068,
          storyProgress,
        );
        word.style.opacity = reveal.toFixed(3);
        word.style.transform = `translate3d(0, ${(0.82 * (1 - reveal)).toFixed(3)}em, 0)`;
        word.style.filter = `blur(${(8 * (1 - reveal)).toFixed(2)}px)`;
      });

      const detailReveal = smoothstep(0.5, 0.69, storyProgress);
      if (details) {
        details.style.opacity = detailReveal.toFixed(3);
        details.style.transform = `translate3d(0, ${(28 * (1 - detailReveal)).toFixed(2)}px, 0)`;
      }

      const imageReveal = smoothstep(0.08, 0.58, storyProgress);
      if (image) {
        image.style.opacity = (0.18 + imageReveal * 0.82).toFixed(3);
        image.style.transform = `translate3d(${(52 * (1 - imageReveal)).toFixed(2)}px, 0, 0) scale(${(1.07 - imageReveal * 0.07).toFixed(4)})`;
        image.style.clipPath = `inset(${(8 * (1 - imageReveal)).toFixed(2)}% 0% ${(8 * (1 - imageReveal)).toFixed(2)}% ${(18 * (1 - imageReveal)).toFixed(2)}%)`;
      }
    };

    const scheduleStoryUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateStory);
    };

    section.classList.add("is-scroll-story-ready");
    updateStory();
    window.addEventListener("scroll", scheduleStoryUpdate, { passive: true });
    window.addEventListener("resize", scheduleStoryUpdate);
    reducedMotion.addEventListener("change", scheduleStoryUpdate);

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleStoryUpdate);
      window.removeEventListener("resize", scheduleStoryUpdate);
      reducedMotion.removeEventListener("change", scheduleStoryUpdate);
      section.classList.remove("is-scroll-story-ready");
      words.forEach((word) => {
        word.style.removeProperty("opacity");
        word.style.removeProperty("transform");
        word.style.removeProperty("filter");
      });
      details?.style.removeProperty("opacity");
      details?.style.removeProperty("transform");
      image?.style.removeProperty("opacity");
      image?.style.removeProperty("transform");
      image?.style.removeProperty("clip-path");
    };
  }, [scrollSystemStory]);

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
                  <img src={product.image} alt={product.alt} loading="lazy" />
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
          <div className="nl-material-copy nl-reveal">
            <h2>
              {materialsStory.title}
              <span>{materialsStory.titleAccent}</span>
            </h2>
            <p>{materialsStory.intro}</p>
            <div className="nl-material-list">
              {materialsStory.points.map((point) => (
                <article key={point.title}>
                  <h3>{point.title}</h3>
                  <p>{point.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="system"
          ref={systemRef}
          className={`nl-system${scrollSystemStory ? " nl-system--scroll-story" : ""}`}
        >
          {risingEdge && (
            <NorthlineScrollEdge
              motion={systemEdgeMotionRef}
              colour="#bc7155"
              toneStrength={0}
              className="nl-section-edge nl-system-edge"
            />
          )}
          <div className="nl-system-frame">
            <div className="nl-system-copy nl-reveal">
              <h2 aria-label={systemHeadline}>
                <span className="nl-system-words" aria-hidden="true">
                  {systemHeadlineWords.map((word, index) => (
                    <span className="nl-system-word" key={`${word}-${index}`}>
                      {word}
                      {index < systemHeadlineWords.length - 1 ? "\u00a0" : ""}
                    </span>
                  ))}
                </span>
              </h2>
              <div className="nl-system-details">
                <p>
                  A shell, a cargo, a smaller bag. Designed to work together without needing a
                  uniform.
                </p>
                <button
                  className="nl-text-action"
                  type="button"
                  onClick={() => openProduct(products[0])}
                >
                  Build the starting set
                </button>
              </div>
            </div>
            <figure className="nl-system-image nl-reveal">
              <img
                src={flatlay}
                alt="Graphite outerwear, utility trousers, compact bag, and socks arranged as a complete outfit."
                loading="lazy"
              />
            </figure>
          </div>
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

        <section className="nl-signup">
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

      {activeProduct && (
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
            <img src={activeProduct.image} alt={activeProduct.alt} />
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
        </div>
      )}

      {bagOpen && (
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
            <button className="nl-dialog-close" type="button" onClick={() => setBagOpen(false)}>
              Close
            </button>
            <h2 id="bag-title">Your bag</h2>
            {bag.length > 0 ? (
              <>
                <ul className="nl-bag-list">
                  {bag.map((item, index) => (
                    <li key={item.id + "-" + index}>
                      <img src={item.image} alt="" />
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
        </div>
      )}
    </div>
  );
}
