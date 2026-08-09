import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";

/**
 * Shared GL scaffolding for the /w versions.
 *
 * Every version mounts its own Canvas through <Stage>, which enforces the same
 * three rules in one place: never render GL during SSR, never render GL when
 * the visitor asked for reduced motion, and never hold a WebGL context on a
 * page that has scrolled far past the canvas.
 */

/** SSR-safe reduced-motion read. False on the server and on first paint. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/** true once mounted on the client */
export function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}

/**
 * Both react-three-fiber and shadergradient size their canvas from a
 * ResizeObserver on the container. The spec says observing an element fires an
 * initial callback; some embedded webviews never do, and the canvas is then
 * stranded at its intrinsic 300x150 until something else triggers a resize.
 *
 * One dispatched resize on the frame after mount costs nothing in a compliant
 * browser (the measurement is already correct and recomputing is idempotent)
 * and rescues the canvas in one that is not.
 */
export function useResizeKick() {
  useEffect(() => {
    const fire = () => window.dispatchEvent(new Event("resize"));
    // twice: the first frame can land before the canvas library has attached
    // its own window listener, so a short follow-up covers that race
    const raf = requestAnimationFrame(fire);
    const t = setTimeout(fire, 250);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, []);
}

/**
 * Scroll progress as a ref, written once per frame from a passive listener.
 * A ref rather than state on purpose: useFrame reads it every frame and state
 * would re-render the React tree sixty times a second for nothing.
 */
export function useScrollRef() {
  const ref = useRef(0);
  useEffect(() => {
    let raf = 0;
    const read = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      ref.current = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
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
  }, []);
  return ref;
}

/** progress of one element through the viewport, 0 entering to 1 leaving */
export function useElementProgress(el: React.RefObject<HTMLElement | null>) {
  const ref = useRef(0);
  useEffect(() => {
    let raf = 0;
    const read = () => {
      const node = el.current;
      if (node) {
        const r = node.getBoundingClientRect();
        const span = r.height + window.innerHeight;
        ref.current = span > 0 ? Math.min(Math.max((window.innerHeight - r.top) / span, 0), 1) : 0;
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
  }, [el]);
  return ref;
}

type StageProps = {
  children: React.ReactNode;
  /** Release the WebGL context while a stage is far outside the viewport. */
  active?: boolean;
  /** rendered instead of the canvas under reduced motion or before mount */
  fallback?: React.ReactNode;
  camera?: { position?: [number, number, number]; fov?: number };
  className?: string;
  /** cap the device pixel ratio; GL here is decorative, not a product render */
  dpr?: [number, number];
  /**
   * The nine background effects are noise fields where a jagged edge is
   * invisible, so they default to antialias off. A character has smooth curved
   * silhouettes against a flat page and needs it on.
   */
  antialias?: boolean;
  /** enable the shadow map. Off by default: only the character uses it. */
  shadows?: boolean;
};

export function Stage({
  children,
  active = true,
  fallback = null,
  camera = { position: [0, 0, 6], fov: 45 },
  className = "",
  dpr = [1, 1.5],
  antialias = false,
  shadows = false,
}: StageProps) {
  const mounted = useMounted();
  const reduced = useReducedMotion();
  useResizeKick();

  if (!active) return null;
  if (!mounted || reduced) return <>{fallback}</>;

  /* Do not position the Canvas from here. R3F measures its own container, and
     overriding it to `position: absolute` makes react-use-measure read zero on
     the first layout pass: the canvas then sits at its intrinsic 300x150 until
     something happens to fire a resize. Callers wrap Stage in a sized element
     and R3F's default container fills it. */
  return (
    <Canvas
      className={className}
      dpr={dpr}
      camera={camera}
      shadows={shadows}
      gl={{
        antialias,
        alpha: true,
        powerPreference: antialias ? "high-performance" : "low-power",
      }}
      resize={{ scroll: false, debounce: { scroll: 0, resize: 0 } }}
    >
      {children}
    </Canvas>
  );
}
