import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { ShoppingCart } from "lucide-react";
import { shopifyClient } from "@/lib/shopify";
import "./scan-runway-hero.css";

const FRAME_NAMES = ["a", "b", "c", "d", "e", "f", "g"] as const;
const ANGLES = ["000", "045", "090", "135", "180", "225", "360"];
const SCAN_ASSET_VERSION = "hair-edge-3";
const SEQUENCE_END = 1.0;

const LOOKS = [
  {
    id: "f4",
    name: "Skyline zip",
    note: "Pale blue zip hoodie with washed charcoal wide-leg denim.",
    pieces: [
      { name: "Skyline Zip Hoodie", hue: "#9fb9c9", keyword: "Hoodie" },
      { name: "Washed Charcoal Denim", hue: "#424246", keyword: "Denim" },
    ]
  },
  {
    id: "f1",
    name: "Mouth tee",
    note: "White mouth-print tee with relaxed olive cargo trousers.",
    pieces: [
      { name: "Mouth Tee", hue: "#f2f2f2", keyword: "Tee" },
      { name: "Olive Cargo Trousers", hue: "#575e46", keyword: "Cargo" },
    ]
  },
  {
    id: "f2",
    name: "Second skin",
    note: "Fitted white long sleeve with ink-washed wide denim.",
    pieces: [
      { name: "Fitted Long Sleeve", hue: "#f7f7f7", keyword: "Long Sleeve" },
      { name: "Longform Wide Leg Jeans – Deep Blue", hue: "#21283d", keyword: "Longform Wide" },
    ]
  },
  {
    id: "f3",
    name: "Archive layer",
    note: "Cream graphic knit paired with relaxed dark denim.",
    pieces: [
      { name: "Graphic Crew Sweatshirt", hue: "#ece3cc", keyword: "Graphic Crew Sweatshirt" },
      { name: "Relaxed Dark Denim", hue: "#263045", keyword: "Denim" },
    ]
  },
  {
    id: "m1",
    name: "After hours",
    note: "Oversized black graphic tee with faded wide-leg jeans.",
    pieces: [
      { name: "Oversized Graphic Tee", hue: "#1c1c1c", keyword: "Tee" },
      { name: "Razorcut Ripped Wide Leg Jeans – Dark Blue", hue: "#748fba", keyword: "Razorcut" },
    ]
  },
  {
    id: "m2",
    name: "Layered henley",
    note: "Grey ribbed henley layered over washed wide denim.",
    pieces: [
      { name: "Grey Ribbed Henley", hue: "#878a8f", keyword: "Henley" },
      { name: "Wide-Leg Denim Jeans", hue: "#6a82a6", keyword: "Wide-Leg Denim" },
    ]
  },
  {
    id: "m3",
    name: "Suede shift",
    note: "Sand suede jacket over a striped shirt and dark trousers.",
    pieces: [
      { name: "Sand Suede Jacket", hue: "#c9b699", keyword: "Jacket" },
      { name: "Ironwork 15oz Raw Denim Jeans – Black", hue: "#2b2b2b", keyword: "Ironwork" },
    ]
  },
] as const;

const frameUrl = (lookId: string, frame: number) =>
  `/fieldtrip/scan-${lookId}/${FRAME_NAMES[frame]}.webp?v=${SCAN_ASSET_VERSION}`;

const wrapFrame = (frame: number) => (frame + FRAME_NAMES.length) % FRAME_NAMES.length;
const clamp = (value: number, minimum = 0, maximum = 1) =>
  Math.min(maximum, Math.max(minimum, value));
const smoothstep = (value: number) => {
  const clamped = clamp(value);
  return clamped * clamped * (3 - 2 * clamped);
};

declare global {
  interface Window {
    requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
    cancelIdleCallback?: (handle: number) => void;
  }
}

export function ScanRunwayHero({
  primaryHref,
  secondaryHref,
  shopHref,
  showPrimaryNavigation = true,
  onBagClick,
}: {
  primaryHref: string;
  secondaryHref: string;
  shopHref: string;
  showPrimaryNavigation?: boolean;
  onBagClick?: () => void;
}) {
  const [lookIndex, setLookIndex] = useState(0);
  const [frameIndex, setFrameIndex] = useState(0);
  const [shopifyProducts, setShopifyProducts] = useState<any[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const lookIndexRef = useRef(0);
  const frameIndexRef = useRef(0);
  const scrollFrameRef = useRef(0);
  const manualFrameOffsetRef = useRef(0);
  const scrollMetricsRef = useRef({ top: 0, distance: 1 });
  const reduceMotionRef = useRef(false);
  const drag = useRef({ active: false, x: 0, frame: 0 });
  const look = LOOKS[lookIndex];
  const nextLook = LOOKS[Math.min(lookIndex + 1, LOOKS.length - 1)];

  useEffect(() => {
    const immediateLooks = new Set([look.id, nextLook.id]);
    const images = [...immediateLooks].flatMap((lookId) =>
      FRAME_NAMES.map((_, index) => {
        const image = new Image();
        image.decoding = "async";
        image.src = frameUrl(lookId, index);
        return image;
      }),
    );

    const preloadRemainingLooks = () => {
      LOOKS.forEach((candidate) => {
        if (candidate.id === look.id) return;
        new Set([0, FRAME_NAMES.length - 1]).forEach((index) => {
          const image = new Image();
          image.decoding = "async";
          image.src = frameUrl(candidate.id, index);
        });
      });
    };

    const idle = window.requestIdleCallback?.(preloadRemainingLooks, { timeout: 1800 });
    const fallback = idle === undefined ? window.setTimeout(preloadRemainingLooks, 900) : undefined;

    return () => {
      images.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
      if (idle !== undefined) window.cancelIdleCallback?.(idle);
      if (fallback !== undefined) window.clearTimeout(fallback);
    };
  }, [look.id, nextLook.id]);

  useEffect(() => {
    if (import.meta.env.VITE_SHOPIFY_DOMAIN && import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN) {
      shopifyClient.product.fetchAll().then((fetchedProducts) => {
        setShopifyProducts(fetchedProducts as any);
      }).catch(err => {
        console.error("Shopify fetch error:", err);
      });
    }
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    reduceMotionRef.current = reduceMotion;
    let sectionTop = 0;
    let scrollDistance = 1;
    let targetProgress = 0;
    let renderedProgress = 0;
    let animationFrame = 0;
    let lastScrollY = window.scrollY;

    const renderProgress = (progress: number) => {
      const sequenceProgress = clamp(progress / SEQUENCE_END);
      const rawLookProgress = sequenceProgress * LOOKS.length;
      const activeLookIndex = Math.min(Math.floor(rawLookProgress), LOOKS.length - 1);
      const lookProgress = clamp(rawLookProgress - activeLookIndex);
      const swapProgress =
        activeLookIndex < LOOKS.length - 1 ? smoothstep((lookProgress - 0.92) / 0.08) : 0;
      const travel = smoothstep(progress);
      const approach = smoothstep(progress / 0.08);
      const depart = SEQUENCE_END >= 1 ? 0 : smoothstep((progress - SEQUENCE_END) / (1 - SEQUENCE_END));
      const handoff = smoothstep((progress - 0.94) / 0.06);
      const copyExit = smoothstep((progress - 0.025) / 0.13);
      const echoSpread = smoothstep(progress / 0.18);
      const worldScale = 1.004 + travel * 0.105;
      const modelScale = 0.98 + approach * 0.095 - depart * 0.455;
      const swapBlur = Math.sin(swapProgress * Math.PI) * 2.4;
      const echoSwapVisibility = 1 - swapProgress * 0.84;
      const uiTone = 242;
      const commandTone = 247;
      const commandInkTone = 20;

      section.style.setProperty("--scan-progress", progress.toFixed(4));
      section.style.setProperty("--scan-world-scale", worldScale.toFixed(4));
      section.style.setProperty("--scan-world-y", `${(-travel * 2.4).toFixed(3)}%`);
      section.style.setProperty("--scan-world-contrast", (1.035 + travel * 0.025).toFixed(4));
      section.style.setProperty("--scan-world-saturation", (0.72 - travel * 0.08).toFixed(4));
      section.style.setProperty("--scan-world-brightness", (0.94 + travel * 0.1).toFixed(4));
      section.style.setProperty("--scan-model-scale", modelScale.toFixed(4));
      section.style.setProperty("--scan-model-y", `${(-depart * 6.5).toFixed(3)}vh`);
      section.style.setProperty("--scan-primary-opacity", (1 - swapProgress).toFixed(4));
      section.style.setProperty("--scan-incoming-opacity", swapProgress.toFixed(4));
      section.style.setProperty("--scan-swap-blur", `${swapBlur.toFixed(3)}px`);
      section.style.setProperty(
        "--scan-echo-left-opacity",
        (0.31 * (1 - depart) * echoSwapVisibility).toFixed(4),
      );
      section.style.setProperty(
        "--scan-echo-rear-opacity",
        (0.46 * (1 - depart) * echoSwapVisibility).toFixed(4),
      );
      section.style.setProperty(
        "--scan-echo-right-opacity",
        (0.31 * (1 - depart) * echoSwapVisibility).toFixed(4),
      );
      section.style.setProperty("--scan-echo-spread", `${(echoSpread * 11).toFixed(3)}vw`);
      section.style.setProperty("--scan-echo-inner-spread", `${(echoSpread * 3.85).toFixed(3)}vw`);
      section.style.setProperty("--scan-echo-blur", `${(depart * 8).toFixed(3)}px`);
      section.style.setProperty("--scan-copy-visibility", (1 - copyExit).toFixed(4));
      section.style.setProperty("--scan-copy-left-x", `${(-copyExit * 25).toFixed(3)}vw`);
      section.style.setProperty("--scan-copy-right-x", `${(copyExit * 25).toFixed(3)}vw`);
      section.style.setProperty(
        "--scan-light-x",
        `${(50 + Math.sin(travel * Math.PI) * 4).toFixed(3)}%`,
      );
      section.style.setProperty("--scan-light-y", `${(58 - approach * 9).toFixed(3)}%`);
      section.style.setProperty("--scan-light-opacity", (0.018 + approach * 0.072).toFixed(4));
      section.style.setProperty("--scan-vignette-opacity", (0.2 - approach * 0.07).toFixed(4));
      section.style.setProperty("--scan-handoff-y", `${((1 - handoff) * 102).toFixed(3)}%`);
      section.style.setProperty("--scan-ui-color", `rgb(${uiTone} ${uiTone} ${uiTone})`);
      section.style.setProperty("--scan-ui-muted", `rgb(${uiTone} ${uiTone} ${uiTone} / 0.58)`);
      section.style.setProperty("--scan-ui-shadow", "0.64");
      section.style.setProperty(
        "--scan-command-bg",
        `rgb(${commandTone} ${commandTone} ${commandTone} / 0.9)`,
      );
      section.style.setProperty(
        "--scan-command-ink",
        `rgb(${commandInkTone} ${commandInkTone} ${commandInkTone})`,
      );

      const phase = progress < 0.08 ? "chamber" : progress < SEQUENCE_END ? "scan" : "runway";
      if (section.dataset.phase !== phase) section.dataset.phase = phase;
      section.dataset.look = String(activeLookIndex + 1);

      if (activeLookIndex !== lookIndexRef.current) {
        lookIndexRef.current = activeLookIndex;
        manualFrameOffsetRef.current = 0;
        setLookIndex(activeLookIndex);
      }

      const scrollFrame = Math.round(lookProgress * (FRAME_NAMES.length - 1));
      scrollFrameRef.current = scrollFrame;
      if (!drag.current.active) {
        const nextFrame = wrapFrame(scrollFrame + manualFrameOffsetRef.current);
        if (nextFrame !== frameIndexRef.current) {
          frameIndexRef.current = nextFrame;
          setFrameIndex(nextFrame);
        }
      }
    };

    const animate = () => {
      animationFrame = 0;
      const delta = targetProgress - renderedProgress;
      if (Math.abs(delta) < 0.0005) {
        renderedProgress = targetProgress;
      } else {
        renderedProgress += delta * 0.16;
      }
      renderProgress(renderedProgress);
      if (renderedProgress !== targetProgress)
        animationFrame = window.requestAnimationFrame(animate);
    };

    const requestRender = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(animate);
    };

    const readScroll = () => {
      if (Math.abs(window.scrollY - lastScrollY) > 1) manualFrameOffsetRef.current = 0;
      lastScrollY = window.scrollY;
      targetProgress = clamp((window.scrollY - sectionTop) / scrollDistance);
      requestRender();
    };

    const measure = () => {
      sectionTop = window.scrollY + section.getBoundingClientRect().top;
      scrollDistance = Math.max(1, section.offsetHeight - window.innerHeight);
      scrollMetricsRef.current = { top: sectionTop, distance: scrollDistance };
      targetProgress = reduceMotion ? 0 : clamp((window.scrollY - sectionTop) / scrollDistance);
      renderedProgress = targetProgress;
      renderProgress(renderedProgress);
    };

    measure();
    if (!reduceMotion) window.addEventListener("scroll", readScroll, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      if (!reduceMotion) window.removeEventListener("scroll", readScroll);
      window.removeEventListener("resize", measure);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  const changeFrame = (next: number) => {
    const wrapped = wrapFrame(next);
    manualFrameOffsetRef.current = wrapped - scrollFrameRef.current;
    frameIndexRef.current = wrapped;
    setFrameIndex(wrapped);
  };

  const selectLook = (index: number) => {
    lookIndexRef.current = index;
    manualFrameOffsetRef.current = 0;
    frameIndexRef.current = 0;
    setFrameIndex(0);
    setLookIndex(index);

    if (!reduceMotionRef.current) {
      const { top, distance } = scrollMetricsRef.current;
      const chapterProgress = ((index + 0.035) / LOOKS.length) * SEQUENCE_END;
      window.scrollTo({ top: top + distance * chapterProgress, behavior: "auto" });
    }
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    drag.current = { active: true, x: event.clientX, frame: frameIndexRef.current };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const travelled = event.clientX - drag.current.x;
    const stepped = Math.round(travelled / 54);
    const next = wrapFrame(drag.current.frame + stepped);
    if (next !== frameIndexRef.current) changeFrame(next);
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    drag.current.active = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      changeFrame(frameIndexRef.current - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      changeFrame(frameIndexRef.current + 1);
    }
  };

  const leftFrame = wrapFrame(frameIndex - 2);
  const rearFrame = wrapFrame(frameIndex + 3);
  const rightFrame = wrapFrame(frameIndex + 2);

  return (
    <section
      ref={sectionRef}
      className="scan-runway"
      data-phase="chamber"
      aria-labelledby="scan-runway-title"
      style={{ "--scan-progress": 0 } as CSSProperties}
    >
      <div className="scan-runway__stage">
        <h1 id="scan-runway-title" className="scan-runway__sr-only">
          See every side, then go somewhere
        </h1>

        <nav
          className={`scan-runway__nav${
            showPrimaryNavigation ? "" : " scan-runway__nav--minimal"
          }`}
          aria-label="Vivre primary navigation"
        >
          <a className="scan-runway__brand" href="#fieldtrip-top">
            VIVRE <span>/ DROP 001</span>
          </a>
          {showPrimaryNavigation ? (
            <div className="scan-runway__nav-links">
              <a href={primaryHref}>SHOP</a>
              <a href="#scan-controls">FIT LAB</a>
              <a href="#journal">SOUND</a>
            </div>
          ) : null}
          {onBagClick ? (
            <button
              type="button"
              className="scan-runway__cart-button"
              onClick={onBagClick}
              aria-label="Open shopping bag"
              aria-haspopup="dialog"
            >
              <ShoppingCart aria-hidden="true" size={20} strokeWidth={1.8} />
            </button>
          ) : (
            <a className="scan-runway__bag" href={shopHref}>
              BAG <span>0</span>
            </a>
          )}
        </nav>

        <div className="scan-runway__world" aria-hidden>
          <img
            className="scan-runway__environment scan-runway__environment--poster"
            src="/fieldtrip/scan-chamber-v2.jpg"
            alt=""
            width={1920}
            height={1077}
            decoding="async"
            fetchPriority="high"
          />
          <video
            className="scan-runway__environment scan-runway__environment--motion"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/fieldtrip/scan-chamber-v2.jpg"
            disablePictureInPicture
            tabIndex={-1}
          >
            <source src="/fieldtrip/scan-chamber-motion.mp4" type="video/mp4" />
          </video>
          <svg
            className="scan-runway__curtain-copy"
            viewBox="0 0 1920 1077"
            preserveAspectRatio="xMidYMin meet"
            focusable="false"
          >
            <defs>
              <path
                id="scan-curtain-path"
                d="M 145 180 C 470 180, 690 255, 960 265 C 1230 255, 1450 180, 1775 180"
              />
            </defs>
            <text
              className="scan-runway__curtain-line scan-runway__curtain-line--wrap"
              textLength="1570"
              lengthAdjust="spacing"
              textAnchor="middle"
            >
              <textPath href="#scan-curtain-path" startOffset="50%">
                DRESS LIKE YOU HAVE SOMEWHERE TO BE
              </textPath>
            </text>
          </svg>

          <img
            className="scan-runway__echo scan-runway__echo--left"
            src={frameUrl(look.id, leftFrame)}
            alt=""
            width={960}
            height={1720}
            decoding="async"
          />
          <img
            className="scan-runway__echo scan-runway__echo--rear"
            src={frameUrl(look.id, rearFrame)}
            alt=""
            width={960}
            height={1720}
            decoding="async"
          />
          <img
            className="scan-runway__echo scan-runway__echo--right"
            src={frameUrl(look.id, rightFrame)}
            alt=""
            width={960}
            height={1720}
            decoding="async"
          />

          <div className="scan-runway__floor-ring">
            {ANGLES.slice(0, 4).map((angle, index) => (
              <span key={angle} style={{ ["--tick" as string]: index }}>
                {angle}
              </span>
            ))}
          </div>
        </div>

        <div
          id="scan-controls"
          className="scan-runway__model"
          role="group"
          aria-label={`Rotate ${look.name}. Current angle ${ANGLES[frameIndex]} degrees. Drag horizontally or use the arrow keys.`}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onKeyDown={onKeyDown}
        >
          <img
            className="scan-runway__model-frame scan-runway__model-frame--primary"
            key={`${look.id}-${frameIndex}`}
            src={frameUrl(look.id, frameIndex)}
            alt={`${look.name}, ${ANGLES[frameIndex]} degree view`}
            width={960}
            height={1720}
            draggable={false}
            decoding="async"
            fetchPriority="high"
          />
          <img
            className="scan-runway__model-frame scan-runway__model-frame--incoming"
            key={`${nextLook.id}-incoming`}
            src={frameUrl(nextLook.id, 0)}
            alt=""
            width={960}
            height={1720}
            draggable={false}
            decoding="async"
          />
        </div>

        <aside className="scan-runway__look-rail" aria-label="Choose a look">
          {LOOKS.map((candidate, index) => (
            <button
              key={candidate.id}
              type="button"
              className={index === lookIndex ? "is-active" : ""}
              aria-label={`Look ${index + 1}: ${candidate.name}`}
              aria-pressed={index === lookIndex}
              onClick={() => selectLook(index)}
            >
              {String(index + 1).padStart(2, "0")}
            </button>
          ))}
        </aside>

        <div className="scan-runway__meta" aria-live="polite">
          <div key={look.id} className="scan-runway__meta-inner">
            <small>
              LOOK {String(lookIndex + 1).padStart(2, "0")} /{" "}
              {String(LOOKS.length).padStart(2, "0")}
            </small>

            <div className="scan-runway__wardrobe">
              {look.pieces?.map((piece, i) => {
                let displayName = piece.name;
                if (shopifyProducts.length > 0) {
                  // Try to find a Shopify product that matches the keyword
                  const matched = shopifyProducts.find(sp => 
                    sp.title.toLowerCase().includes(piece.keyword.toLowerCase())
                  );
                  if (matched) {
                    displayName = matched.title;
                  }
                }
                
                return (
                  <div key={i} className="scan-runway__wardrobe-item">
                    <div className="scan-runway__wardrobe-swatch" style={{ backgroundColor: piece.hue }} />
                    <span>{displayName}</span>
                  </div>
                );
              })}
            </div>

            <strong>{look.name}</strong>
            <span>{look.note}</span>
          </div>
        </div>

        <div className="scan-runway__scan-hint" aria-hidden>
          <span className="scan-runway__reticle" />
          <span className="scan-runway__interaction-copy">
            <strong>SCROLL TO ROTATE</strong>
            <small>360 / NEXT LOOK</small>
          </span>
        </div>

        <div className="scan-runway__journey" aria-hidden>
          <span>LOOK {String(lookIndex + 1).padStart(2, "0")}</span>
          <i>
            <b />
          </i>
          <span>{String(LOOKS.length).padStart(2, "0")} LOOKS</span>
        </div>

        <div className="scan-runway__command-bar">
          <button type="button" onClick={() => changeFrame(frameIndexRef.current + 1)}>
            ROTATE
          </button>
          <span aria-hidden>↔</span>
          <a href={primaryHref}>ENTER</a>
        </div>

        <a className="scan-runway__runway-link" href={secondaryHref}>
          RUNWAY
        </a>
      </div>
    </section>
  );
}
