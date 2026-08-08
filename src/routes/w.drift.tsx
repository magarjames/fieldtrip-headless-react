import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import { BRAND, SEASON, PIECE_COUNT } from "@/components/northline/data";
import { pageMeta, useReveal } from "@/components/northline/parts";
import { Catalogue, SkipLink, WorldFooter, WorldHeader , LookStyle } from "@/components/world/chrome";
import { LOOKS } from "@/components/world/looks";
import { useMounted, useReducedMotion, useResizeKick } from "@/components/world/stage";

/* ============================================================================
   W01 — DRIFT
   Library: @shadergradient/react

   The gradient is the page's ground, not a decoration sitting behind it: the
   hero is transparent and the mesh reads through every layer above it. Scroll
   drives cDistance and uSpeed, so the field pulls back and calms as you move
   into the catalogue rather than looping obliviously.

   The palette is the NORTHLINE rust / olive / smoke triad rather than a stock
   preset, which is the whole reason this does not look like every other
   shadergradient hero.
   ========================================================================== */

export const Route = createFileRoute("/w/drift")({
  component: Drift,
  head: () =>
    pageMeta(
      `${BRAND} — Drift`,
      `${PIECE_COUNT} pieces under a live gradient field that answers to scroll.`,
    ),
});

function Drift() {
  useReveal();
  const look = LOOKS.drift;
  const mounted = useMounted();
  const reduced = useReducedMotion();
  useResizeKick();
  const [p, setP] = useState(0);

  // hero-local progress, cheap enough to hold in state because the gradient
  // props are React props rather than a per-frame uniform
  useEffect(() => {
    let raf = 0;
    const read = () => {
      const h = window.innerHeight || 1;
      setP(Math.min(window.scrollY / h, 1));
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="w-drift min-h-dvh">
      <LookStyle look={look} />
      <SkipLink />

      {/* the field. Fixed, behind everything, never inside a scroll container. */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        {mounted && !reduced ? (
          <ShaderGradientCanvas
            style={{ width: "100%", height: "100%" }}
            pointerEvents="none"
            pixelDensity={1}
          >
            <ShaderGradient
              control="props"
              type="waterPlane"
              animate="on"
              uSpeed={0.14 - p * 0.09}
              uStrength={2.4 - p * 1.1}
              uDensity={1.3}
              uFrequency={5.5}
              uAmplitude={0}
              color1="#b4543a"
              color2="#6b6a4b"
              color3="#5b6b78"
              brightness={0.9 - p * 0.28}
              cDistance={3.2 + p * 4.6}
              cPolarAngle={125}
              cAzimuthAngle={180}
              positionX={0}
              positionY={0}
              positionZ={0}
              rotationX={50}
              rotationY={0}
              rotationZ={-60}
              envPreset="city"
              grain="on"
              lightType="3d"
            />
          </ShaderGradientCanvas>
        ) : (
          /* the still the field resolves to under reduced motion */
          <div className="h-full w-full bg-[radial-gradient(120%_90%_at_20%_10%,#b4543a_0%,transparent_55%),radial-gradient(120%_90%_at_80%_60%,#5b6b78_0%,transparent_60%),#050505]" />
        )}
      </div>

      <div className="relative z-10">
        <WorldHeader look={look} label={`${SEASON} · Drift`} />

        <section className="flex min-h-[86vh] items-end px-5 pb-20 sm:px-8">
          <div className="mx-auto w-full max-w-[var(--shell)]">
            <h1 className="d max-w-[15ch] text-[clamp(2.8rem,10vw,9rem)]">
              Cloth in motion
            </h1>
            <p className="mt-7 max-w-[52ch] text-[1.05rem] leading-[1.6]" style={{ color: "var(--dim)" }}>
              {PIECE_COUNT} pieces, cut after you order them. The field behind this
              page is live, and it settles as you read.
            </p>
          </div>
        </section>

        {/* an opaque band so the catalogue stays legible over the live field */}
        <div style={{ background: "var(--bg)" }}>
          <Catalogue look={look} />
          <WorldFooter
            look={look}
            note="shadergradient waterPlane · scroll drives cDistance, uSpeed and brightness · reduced motion resolves to a still"
          />
        </div>
      </div>
    </div>
  );
}
