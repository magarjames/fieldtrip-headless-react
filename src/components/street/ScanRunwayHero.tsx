import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import "./scan-runway-hero.css";

const FRAME_NAMES = ["a", "b", "c", "d", "e", "f", "g"] as const;
const ANGLES = ["000", "045", "090", "135", "180", "225", "360"];
const SCAN_ASSET_VERSION = "opaque-5";

const LOOKS = [
  { id: "f4", name: "Skyline zip", note: "Pale blue zip / washed wide cargo" },
  { id: "f1", name: "Mouth tee", note: "Graphic white tee / olive cargo" },
  { id: "f2", name: "Second skin", note: "Fitted white top / ink wide denim" },
  { id: "f3", name: "Archive layer", note: "Cream graphic knit / dark denim" },
  { id: "m1", name: "After hours", note: "Oversized black tee / faded denim" },
  { id: "m2", name: "Layered henley", note: "Grey knit / washed wide denim" },
  { id: "m3", name: "Suede shift", note: "Sand jacket / striped shirt" },
] as const;

const frameUrl = (lookId: string, frame: number) =>
  `/fieldtrip/scan-${lookId}/${FRAME_NAMES[frame]}.webp?v=${SCAN_ASSET_VERSION}`;

const wrapFrame = (frame: number) => (frame + FRAME_NAMES.length) % FRAME_NAMES.length;

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
}: {
  primaryHref: string;
  secondaryHref: string;
  shopHref: string;
}) {
  const [lookIndex, setLookIndex] = useState(0);
  const [frameIndex, setFrameIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const drag = useRef({ active: false, x: 0, frame: 0 });
  const look = LOOKS[lookIndex];

  useEffect(() => {
    const images = FRAME_NAMES.map((_, index) => {
      const image = new Image();
      image.decoding = "async";
      image.src = frameUrl(look.id, index);
      return image;
    });

    const preloadRemainingLooks = () => {
      LOOKS.forEach((candidate) => {
        if (candidate.id === look.id) return;
        const image = new Image();
        image.decoding = "async";
        image.src = frameUrl(candidate.id, 0);
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
  }, [look.id]);

  const changeFrame = (next: number) => {
    setLoaded(false);
    setFrameIndex(wrapFrame(next));
  };

  const selectLook = (index: number) => {
    setLoaded(false);
    setLookIndex(index);
    setFrameIndex(0);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    drag.current = { active: true, x: event.clientX, frame: frameIndex };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const travelled = event.clientX - drag.current.x;
    const stepped = Math.round(travelled / 54);
    const next = wrapFrame(drag.current.frame + stepped);
    if (next !== frameIndex) changeFrame(next);
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
      changeFrame(frameIndex - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      changeFrame(frameIndex + 1);
    }
  };

  const leftFrame = wrapFrame(frameIndex - 2);
  const rearFrame = wrapFrame(frameIndex + 3);
  const rightFrame = wrapFrame(frameIndex + 2);

  return (
    <section className="scan-runway" aria-labelledby="scan-runway-title">
      <div className="scan-runway__stage">
        <h1 id="scan-runway-title" className="scan-runway__sr-only">
          See every side, then go somewhere
        </h1>

        <nav className="scan-runway__nav" aria-label="Fieldtrip primary navigation">
          <a className="scan-runway__brand" href="#fieldtrip-top">
            FIELDTRIP <span>/ DROP 04</span>
          </a>
          <div className="scan-runway__nav-links">
            <a href={primaryHref}>SHOP</a>
            <a href="#scan-controls">FIT LAB</a>
            <a href="#journal">SOUND</a>
          </div>
          <a className="scan-runway__bag" href={shopHref}>
            BAG <span>0</span>
          </a>
        </nav>

        <div className="scan-runway__world" aria-hidden>
          <img
            className="scan-runway__environment"
            src="/fieldtrip/scan-chamber-v2.jpg"
            alt=""
            width={1920}
            height={1077}
            decoding="async"
            fetchPriority="high"
          />
          <div className="scan-runway__curtain-copy scan-runway__curtain-copy--left">
            <span>SEE EVERY SIDE</span>
          </div>
          <div className="scan-runway__curtain-copy scan-runway__curtain-copy--right">
            <span>THEN GO SOMEWHERE</span>
          </div>

          <img
            className="scan-runway__distant-look"
            src={frameUrl("m3", 0)}
            alt=""
            width={960}
            height={1720}
            decoding="async"
          />

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
          className={`scan-runway__model${loaded ? " is-loaded" : ""}`}
          role="group"
          aria-label={`Rotate ${look.name}. Current angle ${ANGLES[frameIndex]} degrees.`}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onKeyDown={onKeyDown}
        >
          <img
            key={`${look.id}-${frameIndex}`}
            src={frameUrl(look.id, frameIndex)}
            alt={`${look.name}, ${ANGLES[frameIndex]} degree view`}
            width={960}
            height={1720}
            draggable={false}
            decoding="async"
            fetchPriority="high"
            onLoad={() => setLoaded(true)}
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
          <strong>{look.name}</strong>
          <span>{look.note}</span>
        </div>

        <div className="scan-runway__scan-hint" aria-hidden>
          <span className="scan-runway__reticle" />
          DRAG TO SCAN
        </div>

        <div className="scan-runway__command-bar">
          <button type="button" onClick={() => changeFrame(frameIndex + 1)}>
            ROTATE
          </button>
          <span aria-hidden>↔</span>
          <a href={primaryHref}>ENTER</a>
        </div>

        <a className="scan-runway__runway-link" href={secondaryHref}>
          RUNWAY
        </a>
        <div className="scan-runway__handoff" aria-hidden />
      </div>
    </section>
  );
}
