import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { BRAND, SEASON, PIECE_COUNT } from "@/components/northline/data";
import { pageMeta, useReveal } from "@/components/northline/parts";
import { Catalogue, SkipLink, WorldFooter, WorldHeader , LookStyle } from "@/components/world/chrome";
import { LOOKS } from "@/components/world/looks";
import { SCENES, media } from "@/components/world/media";

/* ============================================================================
   W07 — CORRIDOR
   Skill: scroll-world, running in the mode its own engine degrades to

   scroll-world's full pipeline scrubs pre-rendered camera clips. That chain
   needs Monid, and the workspace holds $1.00 against a ~$2.65 floor for the
   cheapest seam-capable model, so no clips exist yet. The skill's engine is
   built for exactly this: it keeps each still as a live poster until a clip
   paints its first frame, and its connectors accept nulls.

   So the dive is done in CSS here, from the stills: each scene scales and
   un-clips as it takes the frame, which is the same read as a camera pushing
   in, at zero render cost. Drop clips into SCENES[].clip and the scrub takes
   over with no other change to this file.

   The one thing this cannot fake is the seamless join between scenes, which
   is the part that genuinely needs frame-identical end pinning.
   ========================================================================== */

export const Route = createFileRoute("/w/corridor")({
  component: Corridor,
  head: () =>
    pageMeta(
      `${BRAND} — Corridor`,
      `A scroll-driven flight through the making of the ${SEASON.toLowerCase()} edition.`,
    ),
});

function Corridor() {
  useReveal();
  const look = LOOKS.corridor;
  const [active, setActive] = useState(0);
  const [local, setLocal] = useState(0);
  const wrap = useRef<HTMLDivElement>(null);

  // which scene holds the frame, and how far through it we are
  useEffect(() => {
    let raf = 0;
    const read = () => {
      const el = wrap.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        const p = total > 0 ? Math.min(Math.max(-r.top / total, 0), 0.9999) : 0;
        const scaled = p * SCENES.length;
        setActive(Math.floor(scaled));
        setLocal(scaled % 1);
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
    <div className="w-corridor min-h-dvh">
      <LookStyle look={look} />
      <SkipLink />
      <WorldHeader look={look} label={`${SEASON} · Corridor`} />

      <div ref={wrap} style={{ height: `${SCENES.length * 100}vh` }} className="relative">
        <div className="sticky top-0 h-dvh overflow-hidden">
          {SCENES.map((s, i) => {
            const on = i === active;
            // the dive: the held scene pushes in, the next one waits wide
            const scale = on ? 1 + local * 0.16 : 1;
            const inset = on ? `${(1 - local) * 4}%` : "6%";
            return (
              <figure
                key={s.id}
                className="absolute inset-0 m-0 transition-opacity duration-500"
                style={{ opacity: on ? 1 : 0 }}
                aria-hidden={!on}
              >
                <img
                  src={media(s.key, 1900, 1200)}
                  alt=""
                  width={1900}
                  height={1200}
                  className="h-full w-full object-cover"
                  style={{
                    transform: `scale(${scale})`,
                    clipPath: `inset(${inset} round 0)`,
                    filter: "grayscale(0.35) contrast(1.06) brightness(0.72)",
                    willChange: on ? "transform" : undefined,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-transparent to-[#050505]" />
              </figure>
            );
          })}

          <div className="pointer-events-none absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-[var(--shell)] px-5 pb-16 sm:px-8">
              <p className="m-0 text-[0.66rem] uppercase tracking-[0.2em]" style={{ color: "var(--dim)" }}>
                Scene {active + 1} of {SCENES.length}
              </p>
              <h1 className="d mt-3 max-w-[13ch] text-[clamp(2.4rem,8vw,6.4rem)]">
                {SCENES[active]?.label}
              </h1>
              <p className="mt-4 max-w-[46ch] text-[1.02rem] leading-[1.6]" style={{ color: "var(--dim)" }}>
                {SCENES[active]?.body}
              </p>

              {/* the scrub position, which a real clip chain would also drive */}
              <div className="mt-7 flex gap-1.5" style={{ maxWidth: 260 }}>
                {SCENES.map((s, i) => (
                  <span key={s.id} className="h-[2px] flex-1" style={{ background: "var(--hair)" }}>
                    <span
                      className="block h-full"
                      style={{
                        background: "var(--fg)",
                        width: i < active ? "100%" : i === active ? `${local * 100}%` : "0%",
                      }}
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-[var(--shell)]">
          <h2 className="d max-w-[18ch] text-[clamp(1.9rem,5vw,3.6rem)]">
            {PIECE_COUNT} pieces, and you just walked the whole building
          </h2>
        </div>
      </section>

      <Catalogue look={look} heading="What comes off the rail" />
      <WorldFooter
        look={look}
        note="scroll-world in stills mode · CSS dive from generated stills · clips drop into SCENES[].clip when the chain is funded"
      />
    </div>
  );
}
