import { useEffect, useRef, useState } from "react";
import { shot } from "./media";

/* ============================================================================
   FIELDTRIP — the video orbit hero.

   Two axes, kept deliberately independent:
     - WHICH OUTFIT: driven by tap, same chip row the procedural chibi already
       uses. Switching outfit must never reset the orbit position.
     - WHERE IN THE ORBIT: driven by scroll, on the convention the working
       orbit prompt was written to: frame 0 is front-facing, and time maps
       linearly onto camera angle.

   FRAME-PRESERVING SWAP. A naive src swap resets to frame 0 — tap mid-orbit
   and the figure snaps back to facing front. Instead: capture the current
   scrub position before switching, assign the new src, and the instant its
   metadata is ready, seek it there before anything is shown. The visible
   orbit angle never jumps on outfit change.

   ONE <video> ELEMENT, NOT N IN PARALLEL. Keeping every clip mounted and
   decoding at once is the higher-fidelity route (an instant crossfade instead
   of a seek), but it costs real decode budget on mobile Safari for a gain
   that mostly matters on a fast connection anyway. A single element that
   swaps `src` and re-seeks is the cheaper default; upgrade later if the seek
   is visibly slow on your hosting.

   GATED, NOT PARTIAL. This only activates once every fit has a matching
   clip. A hero that plays real video for two fits and silently reverts to
   the toy for a third would read as broken, not as a fallback — so the gate
   is all-or-nothing, same principle as the /s/world plates needing three
   real location shots before that direction ships.

   KEYFRAME INTERVAL. Scrubbing currentTime between keyframes forces the
   browser to decode forward from the last one, which stutters — the same
   "choppy" complaint the generation itself had, just moved to playback.
   Export with a keyframe on every frame (ffmpeg -g 1) for a clean scrub.
   ========================================================================== */

export const clipUrl = (fitId: string) => `/fieldtrip/orbit-${fitId}.mp4`;
export const posterKey = (fitId: string) => `orbit-poster-${fitId}`;

export type ClipProbe =
  | { state: "checking" }
  | { state: "ready"; present: ReadonlySet<string> };

/** HEAD-probe every candidate clip so the caller can decide before rendering a <video> */
export function useClipsAvailable(fitIds: readonly string[]): ClipProbe {
  const key = fitIds.join("|");
  const [probe, setProbe] = useState<ClipProbe>({ state: "checking" });

  useEffect(() => {
    let live = true;
    (async () => {
      const present = new Set<string>();
      await Promise.all(
        fitIds.map(async (id) => {
          try {
            const r = await fetch(clipUrl(id), { method: "HEAD" });
            // a dev server that rewrites unknown paths to index.html answers
            // 200 with HTML, so content-type has to be checked too
            const ct = r.headers.get("content-type") ?? "";
            if (r.ok && ct.startsWith("video/")) present.add(id);
          } catch {
            // unreachable — simply not added
          }
        }),
      );
      if (live) setProbe({ state: "ready", present });
    })();
    return () => {
      live = false;
    };
    // fitIds is derived fresh each render; key captures its identity
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return probe;
}

type Props = {
  fits: readonly { fitId: string; name: string }[];
  activeIndex: number;
  reduced: boolean;
  onPick: () => void;
};

export function OrbitVideo({ fits, activeIndex, reduced, onPick }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef(0);
  const fit = fits[activeIndex];

  // frame-preserving swap: capture position, load, seek, then it's visible
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const url = clipUrl(fit.fitId);
    if (v.currentSrc.endsWith(url)) return;

    const resume = () => {
      v.currentTime = Math.min(timeRef.current, v.duration || 0);
      v.removeEventListener("loadedmetadata", resume);
    };
    v.addEventListener("loadedmetadata", resume);
    v.src = url;
    v.load();
  }, [fit.fitId]);

  // scroll drives orbit position: frame 0 is front-facing, time is linear
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const read = () => {
      const el = wrapRef.current;
      const v = videoRef.current;
      if (el && v && v.readyState >= 2 && v.duration) {
        const r = el.getBoundingClientRect();
        const span = r.height + window.innerHeight;
        const p = span > 0 ? Math.min(Math.max((window.innerHeight - r.top) / span, 0), 1) : 0;
        timeRef.current = p * v.duration;
        v.currentTime = timeRef.current;
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
  }, [reduced]);

  return (
    <div ref={wrapRef} className="relative h-full w-full" onClick={onPick}>
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        poster={shot(posterKey(fit.fitId), 900, 1200, `${fit.name} — orbit`, "#2B2A32")}
        aria-label={`360 degree view of the ${fit.name} outfit`}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
