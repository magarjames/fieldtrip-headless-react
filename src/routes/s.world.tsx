import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { BRAND, DROP, PIECES, FITS, money } from "@/components/street/data";
import { shotFor } from "@/components/street/media";
import { pageMeta, useReveal } from "@/components/northline/parts";

/* ============================================================================
   FIELDTRIP — THE LOCATION
   A scroll-driven world you can actually navigate.

   THE WORLD. Scroll does not move you down a catalogue, it moves you between
   places. Each place is a full-bleed plate; the garments are annotated onto it
   with leader lines and mono spec labels, the way a parts diagram annotates a
   machine. The places come from the `place` field already on every fit, so the
   world and the merchandising are the same data.

   NAVIGATION IS THE HARD PART, AND IT IS WHY MOST SCROLL WORLDS ARE BAD. They
   trap you: no way to jump, no sense of length, a dead back button, nothing
   deep-linkable. Six things fix that here, and none of them are decoration:

     1. A skip link, first in the tab order, straight to the shop. Nobody is
        ever forced through the experience to reach the product.
     2. A fixed place rail, always visible, every stop clickable. It is a menu,
        not a progress ornament.
     3. Real hash deep links. /s/world#nice opens on Nice, the back button
        walks the places, and a shared link lands where the sender was.
     4. A progress bar, so the length of the world is knowable up front.
     5. Arrow keys and Home/End, because a world this linear should be
        operable without a mouse or a scroll wheel.
     6. The whole catalogue in a plain grid underneath. The world is a way in,
        never the only way.

   Under prefers-reduced-motion the sticky stage still works but nothing
   transitions, and the annotations render open rather than on hover.
   ========================================================================== */

export const Route = createFileRoute("/s/world")({
  component: World,
  head: () =>
    pageMeta(
      `${BRAND} — The Location`,
      `A scroll-driven world: three places, and the pieces annotated onto each.`,
    ),
});

type Place = {
  id: string;
  city: string;
  coords: string;
  tint: string;
  fitId: string;
};

const PLACES: Place[] = [
  { id: "la", city: "Los Angeles", coords: "34.05°N 118.24°W", tint: "#D2542A", fitId: "f2" },
  { id: "nice", city: "Nice", coords: "43.70°N 7.26°E", tint: "#C2A46A", fitId: "f1" },
  { id: "hk", city: "Hong Kong", coords: "22.32°N 114.17°E", tint: "#3C7E9E", fitId: "f3" },
];

/** where each fit's pieces sit on its plate, as percentages */
const PINS: Record<string, { x: number; y: number }[]> = {
  f1: [{ x: 57, y: 30 }, { x: 60, y: 63 }, { x: 54, y: 21 }, { x: 63, y: 44 }],
  f2: [{ x: 38, y: 34 }, { x: 44, y: 62 }, { x: 36, y: 20 }],
  f3: [{ x: 45, y: 33 }, { x: 48, y: 58 }, { x: 43, y: 21 }],
};

function World() {
  useReveal();
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState<string | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  /** scroll one place into view, and record it in history so back works */
  const goTo = useCallback((i: number, push = true) => {
    const el = wrap.current;
    if (!el) return;
    const clamped = Math.min(Math.max(i, 0), PLACES.length - 1);
    const top = el.offsetTop + clamped * window.innerHeight;
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
    if (push) history.pushState(null, "", `#${PLACES[clamped].id}`);
  }, [reduced]);

  // read scroll position into an active place and a progress fraction
  useEffect(() => {
    let raf = 0;
    const read = () => {
      const el = wrap.current;
      if (el) {
        const span = el.offsetHeight - window.innerHeight;
        const past = window.scrollY - el.offsetTop;
        const p = span > 0 ? Math.min(Math.max(past / span, 0), 1) : 0;
        setProgress(p);
        setActive(Math.min(Math.round(p * (PLACES.length - 1)), PLACES.length - 1));
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

  // deep links: land on the right place, and let the back button walk them
  useEffect(() => {
    const jump = () => {
      const id = location.hash.replace("#", "");
      const i = PLACES.findIndex((p) => p.id === id);
      if (i >= 0) goTo(i, false);
    };
    jump();
    window.addEventListener("hashchange", jump);
    return () => window.removeEventListener("hashchange", jump);
  }, [goTo]);

  // arrow keys, so the world is operable without a wheel
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); goTo(active + 1); }
      else if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); goTo(active - 1); }
      else if (e.key === "Home") { e.preventDefault(); goTo(0); }
      else if (e.key === "End") { e.preventDefault(); goTo(PLACES.length - 1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, goTo]);

  const byId = (id: string) => PIECES.find((p) => p.id === id);
  const fitOf = (p: Place) => FITS.find((f) => f.id === p.fitId);

  return (
    <div className="ftw min-h-dvh">
      <style>{`
        .ftw{
          --ink:#0E1013; --ink-2:#161A1F; --paper:#F4F1E9;
          --dim:rgba(244,241,233,0.62); --rule:rgba(244,241,233,0.28);
          --acid:#F5C518;
          --disp:"Archivo Black",Archivo,"Arial Narrow",sans-serif;
          --mono:"JetBrains Mono",ui-monospace,monospace;
          background:var(--ink); color:var(--paper);
          font-family:Archivo,"Helvetica Neue",sans-serif;
        }
        .ftw h1,.ftw h2,.ftw h3{ font-family:var(--disp); margin:0;
          text-transform:uppercase; letter-spacing:-0.04em; line-height:.9 }
        .ftw p{ margin:0; line-height:1.55 }
        .ftw a{ color:inherit; text-decoration:none }
        .ftw :focus-visible{ outline:2px solid var(--acid); outline-offset:3px }
        .ftw .mono{ font-family:var(--mono); font-size:11px; letter-spacing:.14em;
          text-transform:uppercase; color:var(--dim) }
        .ftw .shell{ max-width:1560px; margin-inline:auto;
          padding-inline:clamp(1rem,4vw,2.25rem) }

        .ftw .hot{ position:absolute; z-index:5; width:28px; height:28px;
          margin:-14px 0 0 -14px; border-radius:50%; border:1.5px solid var(--paper);
          background:transparent; padding:0; cursor:pointer;
          transition:transform .25s cubic-bezier(.16,1,.3,1), background .25s }
        .ftw .hot::after{ content:""; position:absolute; inset:10px; border-radius:50%;
          background:var(--paper); transition:background .25s }
        .ftw .hot[aria-expanded="true"],.ftw .hot:hover,.ftw .hot:focus-visible{
          transform:scale(1.15); background:var(--acid); border-color:var(--acid) }
        .ftw .hot[aria-expanded="true"]::after,.ftw .hot:hover::after{ background:var(--ink) }

        .ftw .tag{ position:absolute; z-index:6; pointer-events:none; white-space:nowrap;
          opacity:0; transition:opacity .3s }
        .ftw .tag.on{ opacity:1 }
        .ftw .tag .lead{ display:block; height:1px; background:var(--paper);
          transform-origin:left; transform:scaleX(0);
          transition:transform .4s cubic-bezier(.16,1,.3,1) }
        .ftw .tag.on .lead{ transform:scaleX(1) }
        .ftw .tag .txt{ display:block; margin-top:7px; font-family:var(--mono);
          font-size:11px; letter-spacing:.1em; text-transform:uppercase }
        .ftw .tag b{ color:var(--acid) }

        .ftw .rail{ position:fixed; z-index:30; left:clamp(1rem,3vw,1.75rem);
          top:50%; transform:translateY(-50%); display:flex; flex-direction:column;
          gap:.9rem }
        .ftw .rail button{ display:flex; align-items:center; gap:.6rem;
          background:none; border:0; padding:.35rem 0; cursor:pointer;
          font-family:var(--mono); font-size:11px; letter-spacing:.12em;
          text-transform:uppercase; color:var(--dim) }
        .ftw .rail button[aria-current="true"]{ color:var(--paper) }
        .ftw .rail .tick{ width:20px; height:2px; background:var(--rule);
          transition:width .3s, background .3s }
        .ftw .rail button[aria-current="true"] .tick{ width:38px; background:var(--acid) }

        .ftw .bar{ position:fixed; z-index:30; left:0; top:0; height:2px;
          background:var(--acid); transition:width .1s linear }

        .ftw .skip{ position:absolute; left:-9999px; z-index:60;
          background:var(--acid); color:#17140A; padding:.7rem 1.1rem;
          font-weight:700; border-radius:999px }
        .ftw .skip:focus{ left:1rem; top:1rem }

        @media (max-width:860px){
          .ftw .rail{ top:auto; bottom:0; left:0; right:0; transform:none;
            flex-direction:row; justify-content:center; gap:1.25rem;
            background:rgba(14,16,19,.88); backdrop-filter:blur(8px);
            padding:.7rem 1rem; border-top:1px solid var(--rule) }
          .ftw .rail .tick{ display:none }
          .ftw .hot,.ftw .tag{ display:none }
        }
        @media (prefers-reduced-motion:reduce){
          .ftw *{ transition-duration:.01ms !important; scroll-behavior:auto !important }
          .ftw .tag{ opacity:1 } .ftw .tag .lead{ transform:scaleX(1) }
        }
      `}</style>

      {/* 1. nobody is ever forced through the world to reach the product */}
      <a href="#shop" className="skip">Skip the world, go to the shop</a>

      {/* 4. the length of the world, knowable up front */}
      <div className="bar" style={{ width: `${progress * 100}%` }} aria-hidden />

      {/* 2. the rail is a menu, not an ornament */}
      <nav className="rail" aria-label="Places">
        {PLACES.map((p, i) => (
          <button
            key={p.id}
            onClick={() => goTo(i)}
            aria-current={i === active}
            aria-label={`Go to ${p.city}`}
          >
            <span className="tick" aria-hidden />
            {p.city}
          </button>
        ))}
      </nav>

      <header className="shell flex items-baseline gap-4 py-4">
        <a href="#shop" className="text-[1.05rem] font-black uppercase tracking-[-0.04em]">
          {BRAND}
        </a>
        <span className="mono">{DROP} · The Location</span>
      </header>

      {/* ------------------------------------------------------- the world */}
      <div ref={wrap} style={{ height: `${PLACES.length * 100}vh` }} className="relative">
        <div className="sticky top-0 h-dvh overflow-hidden">
          {PLACES.map((p, i) => {
            const on = i === active;
            const fit = fitOf(p);
            const pins = PINS[p.fitId] ?? [];
            return (
              <section
                key={p.id}
                id={p.id}
                aria-hidden={!on}
                className="absolute inset-0 transition-opacity duration-500"
                style={{ opacity: on ? 1 : 0, pointerEvents: on ? "auto" : "none" }}
              >
                {/* the plate. PLACEHOLDER: a tinted field stands in for the
                    location photograph this direction actually needs. */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      `radial-gradient(60% 55% at 28% 30%, rgba(255,255,255,.18), transparent 70%),` +
                      `linear-gradient(140deg, ${p.tint} 0%, #20242B 55%, #0E1013 100%)`,
                  }}
                />

                <span className="mono absolute right-4 top-4 z-10">
                  Plate {String(i + 1).padStart(2, "0")} · photography pending
                </span>

                {/* the annotations */}
                {fit?.pieces.map((pid, n) => {
                  const piece = byId(pid);
                  const pin = pins[n];
                  if (!piece || !pin) return null;
                  const key = `${p.id}-${pid}`;
                  const shown = reduced || open === key;
                  return (
                    <div key={pid}>
                      <button
                        className="hot"
                        style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                        aria-expanded={shown}
                        aria-label={`${piece.name}, ${money(piece.price)}`}
                        onMouseEnter={() => setOpen(key)}
                        onMouseLeave={() => setOpen(null)}
                        onFocus={() => setOpen(key)}
                        onBlur={() => setOpen(null)}
                        onClick={() => setOpen(shown ? null : key)}
                      />
                      <span
                        className={`tag ${shown ? "on" : ""}`}
                        style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                      >
                        <span className="lead" style={{ width: 140 + (n % 2) * 44 }} />
                        <span className="txt">
                          {piece.name} &nbsp;<b>{money(piece.price)}</b>
                        </span>
                      </span>
                    </div>
                  );
                })}

                {/* the place, and the wordmark laid across the plate */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-[clamp(1rem,4vw,2.25rem)]">
                  <h1
                    className="max-w-[14ch] text-[clamp(2.6rem,10vw,7.5rem)]"
                    style={{ mixBlendMode: "difference" }}
                  >
                    {fit?.name ?? p.city}
                  </h1>
                  <p className="mono mt-3">
                    <span style={{ color: "var(--acid)" }}>●</span> {p.city} · {p.coords}
                  </p>
                  <p className="mt-2 max-w-[46ch] text-[0.95rem]" style={{ color: "var(--dim)" }}>
                    {fit?.note}
                  </p>
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* the real sequence, so the numbers mean something */}
      <section style={{ background: "var(--acid)", color: "#17140A" }} className="py-10">
        <ol className="shell grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-3">
          {[["01", "You order"], ["02", "We cut"], ["03", "It ships"]].map(([n, w]) => (
            <li key={n} style={{ borderTop: "2px solid #17140A" }} className="pt-3">
              <span className="font-mono text-[11px] tracking-[0.16em]">{n}</span>
              <div className="mt-1 text-[clamp(1.4rem,3.4vw,2.2rem)] font-black uppercase leading-[0.94]">
                {w}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* 6. the world is a way in, never the only way */}
      <main id="shop" className="shell py-16">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="text-[clamp(1.8rem,5vw,3.4rem)]">Everything, plainly</h2>
          <p className="mono">{PIECES.length} pieces</p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-9 md:grid-cols-4 lg:grid-cols-6">
          {PIECES.map((p) => (
            <article key={p.id} className="rv">
              <img
                src={shotFor(p, 520, 650)}
                alt={p.name}
                width={520}
                height={650}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="mt-2.5 flex items-baseline justify-between gap-2">
                <h3 className="text-[0.9rem]">{p.name}</h3>
                <span className="mono" style={{ fontVariantNumeric: "tabular-nums" }}>
                  {money(p.price)}
                </span>
              </div>
            </article>
          ))}
        </div>
      </main>

      <footer className="shell border-t py-10" style={{ borderColor: "var(--rule)" }}>
        <p className="mono max-w-[74ch]">
          Plates are generated stand-ins. This direction depends on real on-location
          photography; annotated pins over a placeholder are worse than a plain grid.
          Original brand copy and invented product names. No real brand or person depicted.
        </p>
      </footer>
    </div>
  );
}
