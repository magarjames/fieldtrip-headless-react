import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import { BRAND, SEASON, PIECE_COUNT } from "@/components/northline/data";
import { pageMeta, useReveal } from "@/components/northline/parts";
import { Catalogue, SkipLink, WorldFooter, WorldHeader , LookStyle } from "@/components/world/chrome";
import { LOOKS } from "@/components/world/looks";
import { useMounted, useReducedMotion, useResizeKick } from "@/components/world/stage";
import { SCENES, media } from "@/components/world/media";

/* ============================================================================
   W10 — TIDE
   Libraries: @shadergradient/react + scroll-world's scrub, together

   The two techniques the other nine keep apart. A shadergradient sphere is
   the horizon, and the scroll-world scene sequence is scrubbed over it as a
   masked band, so the stills read as windows cut into a live field rather
   than as slides.

   W01 also uses shadergradient, and deliberately looks nothing like this: a
   waterPlane filling the frame versus a sphere sitting on the horizon behind
   a masked filmstrip.
   ========================================================================== */

export const Route = createFileRoute("/w/tide")({
  component: Tide,
  head: () =>
    pageMeta(
      `${BRAND} — Tide`,
      `A live gradient horizon with the making sequence scrubbed across it.`,
    ),
});

function Tide() {
  useReveal();
  const look = LOOKS.tide;
  const mounted = useMounted();
  const reduced = useReducedMotion();
  useResizeKick();
  const strip = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const read = () => {
      const el = strip.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        setP(total > 0 ? Math.min(Math.max(-r.top / total, 0), 1) : 0);
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
  }, []);

  return (
    <div className="w-tide min-h-dvh">
      <LookStyle look={look} />
      <SkipLink />

      {/* the horizon */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        {mounted && !reduced ? (
          <ShaderGradientCanvas style={{ width: "100%", height: "100%" }} pointerEvents="none" pixelDensity={1}>
            <ShaderGradient
              control="props"
              type="sphere"
              animate="on"
              uSpeed={0.1}
              uStrength={0.35}
              uDensity={0.9}
              uFrequency={0}
              uAmplitude={2.2}
              color1="#5b6b78"
              color2="#b4543a"
              color3="#0b0b0b"
              brightness={1.05}
              cDistance={2.9}
              cPolarAngle={70}
              cAzimuthAngle={180}
              positionX={0}
              positionY={0.6}
              positionZ={0}
              rotationX={0}
              rotationY={0}
              rotationZ={0}
              envPreset="dawn"
              grain="on"
              lightType="env"
            />
          </ShaderGradientCanvas>
        ) : (
          <div className="h-full w-full bg-[radial-gradient(60%_50%_at_50%_58%,#5b6b78_0%,#1a1a18_58%,#050505_100%)]" />
        )}
      </div>

      <div className="relative z-10">
        <WorldHeader look={look} label={`${SEASON} · Tide`} />

        <section className="flex min-h-[80vh] items-center px-5 sm:px-8">
          <div className="mx-auto w-full max-w-[var(--shell)] text-center">
            <h1 className="d mx-auto max-w-[13ch] text-[clamp(2.8rem,9.6vw,8.8rem)]">
              The long way round
            </h1>
            <p className="mx-auto mt-6 max-w-[46ch] text-[1.05rem] leading-[1.6]" style={{ color: "var(--dim)" }}>
              Slower than a warehouse, and cheaper for it. {PIECE_COUNT} pieces made
              only once they are yours.
            </p>
          </div>
        </section>

        {/* the scrubbed band: stills as windows cut into the live field */}
        <div ref={strip} style={{ height: `${SCENES.length * 90}vh` }} className="relative">
          <div className="sticky top-0 flex h-dvh items-center overflow-hidden">
            <div className="w-full">
              <div
                className="flex gap-6 px-[12vw] will-change-transform"
                style={{ transform: `translate3d(${-p * (SCENES.length - 1) * 62}vw,0,0)` }}
              >
                {SCENES.map((s, i) => (
                  <figure key={s.id} className="m-0 w-[56vw] shrink-0">
                    <div className="overflow-hidden" style={{ background: "var(--hair)" }}>
                      <img
                        src={media(s.key, 1400, 900)}
                        alt={s.label}
                        width={1400}
                        height={900}
                        loading={i > 1 ? "lazy" : undefined}
                        className="aspect-[3/2] w-full object-cover"
                        style={{ filter: "grayscale(0.3) contrast(1.05)" }}
                      />
                    </div>
                    <figcaption className="mt-4">
                      <p className="m-0 text-[0.66rem] uppercase tracking-[0.2em]" style={{ color: "var(--dim)" }}>
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <h2 className="d mt-2">{s.label}</h2>
                      <p className="mt-2 max-w-[44ch] text-[0.95rem] leading-[1.6]" style={{ color: "var(--dim)" }}>
                        {s.body}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: "var(--bg)" }}>
          <Catalogue look={look} heading="What the tide brings in" />
          <WorldFooter
            look={look}
            note="shadergradient sphere horizon + scroll-world stills scrubbed horizontally · the only version that runs both techniques at once"
          />
        </div>
      </div>
    </div>
  );
}
