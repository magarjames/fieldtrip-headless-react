import { useEffect, useRef, useState, type RefObject } from "react";
import { ChibiHero } from "./Chibi";

/* ============================================================================
   FIELDTRIP — the walk-in intro (Clip A + Clip B), docking into the orbit.

   THE THIRD AXIS. OrbitVideo owns two: which outfit, and where in the orbit.
   This owns the one before both of those — where in the ARRIVAL. Scroll
   position now spans three beats: sit-to-stand, walk to the right, then the
   figure is docked in exactly the cell OrbitVideo already occupies and every
   tap/scroll interaction OrbitVideo provides takes over unchanged.

   WHY THE WHOLE HERO SECTION IS PINNED, NOT JUST THE FIGURE CELL. The hero
   grid uses `items-end`: each column keeps its own natural height and the
   row height is the max across both. Make only the figure cell tall and the
   row stretches to match it — the headline column, still its normal short
   height, gets end-aligned to the BOTTOM of that now-enormous row, which
   pushes it off-screen for the whole scroll range. Pinning the entire
   section together avoids that: headline and figure move through the scroll
   as one unit, exactly as `/s/world`'s corridor pins its whole viewport
   rather than one element inside it.

   NO TIME IS CARRIED ACROSS PHASES. Unlike OrbitVideo's outfit swap, there
   is nothing to preserve across the Clip A -> Clip B cut: scroll position
   within each phase's own sub-range is recomputed fresh every time, so
   scrolling back into an earlier phase just re-scrubs it correctly.

   GATED ON THE PAIR, REDUCED MOTION SKIPS THE PIN ENTIRELY. Same principle
   as OrbitVideo's full-set gate: a walk-in with only one of two clips would
   read as broken. Under reduced motion there is nothing to scroll through —
   the page renders exactly as it does today, docked figure immediately.
   ========================================================================== */

export const clipUrl = (name: "a" | "b") => `/fieldtrip/hero-${name}.mp4`;

/** HEAD-probe both clips; only a complete pair activates the walk-in */
export function useIntroClipsAvailable() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let live = true;
    const ok = (r: Response) => r.ok && (r.headers.get("content-type") ?? "").startsWith("video/");
    (async () => {
      try {
        const [a, b] = await Promise.all([
          fetch(clipUrl("a"), { method: "HEAD" }),
          fetch(clipUrl("b"), { method: "HEAD" }),
        ]);
        if (live) setReady(ok(a) && ok(b));
      } catch {
        if (live) setReady(false);
      }
    })();
    return () => {
      live = false;
    };
  }, []);
  return ready;
}

/* Where Clip A hands off to Clip B, as a fraction of the pinned scroll range.
   Tuned to a 6s Clip A / 5s Clip B pair with the last 15% of scroll held in
   reserve for the dock — not the whole range, so the figure settles before
   the interactive orbit takes over rather than arriving mid-motion. Retune
   if your clips run a different length: split = reserve * durationA /
   (durationA + durationB). */
const CUT_TO_B = 0.45;
const DOCK_AT = 0.85;

/**
 * Wraps the hero section in the tall sticky container only when the walk-in
 * is active, so `FieldtripPage` never has to write the section's markup
 * twice to get a conditional wrapper around it.
 */
export function HeroPin({
  active,
  wrapRef,
  children,
}: {
  active: boolean;
  wrapRef: RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
}) {
  if (!active) return <>{children}</>;
  return (
    <div ref={wrapRef} style={{ height: "260vh" }} className="relative">
      <div className="sticky top-0">{children}</div>
    </div>
  );
}

export function HeroFigureSequence({
  wrapRef,
  fallbackSrc,
}: {
  /** the outer pinned wrapper; progress is measured against its full height */
  wrapRef: RefObject<HTMLDivElement | null>;
  fallbackSrc: string;
}) {
  const [phase, setPhase] = useState<0 | 1 | 2>(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let raf = 0;
    const read = () => {
      const el = wrapRef.current;
      if (el) {
        const span = el.offsetHeight - window.innerHeight;
        const past = window.scrollY - el.offsetTop;
        const p = span > 0 ? Math.min(Math.max(past / span, 0), 1) : 0;

        const next: 0 | 1 | 2 = p < CUT_TO_B ? 0 : p < DOCK_AT ? 1 : 2;
        setPhase((cur) => (cur === next ? cur : next));

        const v = videoRef.current;
        if (v && v.readyState >= 2 && v.duration) {
          const [start, end] = next === 0 ? [0, CUT_TO_B] : [CUT_TO_B, DOCK_AT];
          const local = Math.min(Math.max((p - start) / (end - start), 0), 1);
          v.currentTime = local * v.duration;
        }
      }
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [wrapRef]);

  // docked: the walk-in is over, and everything past this point — tap to
  // change fit, scroll to orbit — is OrbitVideo's job, unchanged
  if (phase === 2) return <ChibiHero fallbackSrc={fallbackSrc} />;

  return (
    <video
      // remounts on the A -> B cut so the new source starts clean; the
      // read() effect resyncs currentTime on the next scroll tick regardless
      key={phase}
      ref={videoRef}
      muted
      playsInline
      preload="auto"
      src={clipUrl(phase === 0 ? "a" : "b")}
      aria-hidden
      className="h-full w-full object-cover"
    />
  );
}
