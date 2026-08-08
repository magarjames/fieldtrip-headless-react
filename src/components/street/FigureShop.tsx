import { ChibiHero } from "./Chibi";
import { BRAND, DROP, PIECES, FITS, money } from "./data";
import { shot, shotFor } from "./media";

/* ============================================================================
   FIELDTRIP — THE FIGURE SHOP (the v2/v3 page)

   v1 merchandises fits and the mascot models them. The figure shop inverts
   that: the three sculpted figures ARE the page, displayed like collectibles
   on a dark stage, and each one happens to be wearing a fit you can break
   down below it.

   v2 shows the generated GLB figures. v3 is the same page pointed at per-fit
   VRM replicas (built in VRoid Studio) which take over as they land in
   public/fieldtrip/v3/ — until then the GLBs carry it, so the page is never
   broken by a missing asset.
   ========================================================================== */

export function FigureShop({
  version,
  vrmUrls,
  note,
  backdrop,
  tone = "dark",
}: {
  version: string;
  vrmUrls?: readonly string[];
  note?: string;
  /** fixed layer rendered behind the whole page (v4's fold gradient) */
  backdrop?: React.ReactNode;
  /** "light" flips the chrome to dark type for a light backdrop */
  tone?: "dark" | "light";
}) {
  const byId = (id: string) => PIECES.find((p) => p.id === id);

  return (
    <div
      className={`fs min-h-dvh${backdrop ? " fs--clear" : ""}${tone === "light" ? " fs--light" : ""}`}
    >
      <style>{`
        .fs{
          --ink:#141317; --paper:#FBF7EF; --dim:#a49fad; --hair:rgba(251,247,239,0.18);
          --pop:#F5C518;
          background:var(--ink); color:var(--paper);
          font-family:Archivo,"Helvetica Neue",sans-serif;
        }
        /* with a backdrop the page lets it show through instead of flat ink.
           The backdrop sits at z-index 0 (never negative: the global body
           background would paint over it) and every sibling floats above it */
        .fs.fs--clear{ background:transparent }
        .fs .fs-backdrop{ position:fixed; inset:0; z-index:0; pointer-events:none }
        .fs.fs--clear > :not(.fs-backdrop){ position:relative; z-index:1 }
        .fs h1,.fs h2,.fs h3{ font-family:"Archivo Black",Archivo,sans-serif; margin:0;
          letter-spacing:-0.045em; line-height:0.9; text-transform:uppercase }
        .fs p{ margin:0; line-height:1.55 }
        .fs a{ color:inherit; text-decoration:none }
        .fs :focus-visible{ outline:3px solid var(--paper); outline-offset:2px }
        .fs .lbl{ font-family:"JetBrains Mono",monospace; font-size:0.66rem;
          text-transform:uppercase; letter-spacing:0.14em }
        .fs .shell{ max-width:1560px; margin-inline:auto; padding-inline:clamp(1rem,4vw,2.25rem) }
        /* the chips ChibiHero renders, restyled for the dark stage */
        .fs .chip{ display:inline-flex; align-items:center; min-height:44px; padding:0 1.05rem;
          border-radius:999px; border:2px solid var(--paper); font-weight:700; font-size:0.82rem;
          background:transparent; color:var(--paper); cursor:pointer;
          transition:background .18s, color .18s }
        .fs .chip[aria-pressed="true"],.fs .chip:hover{ background:var(--paper); color:var(--ink) }
        /* light tone: dark type over a light backdrop (v4's fold gradient) */
        .fs.fs--light{ color:var(--ink); --dim:#6f675a; --hair:rgba(20,19,23,0.24) }
        .fs.fs--light :focus-visible{ outline-color:var(--ink) }
        .fs.fs--light .chip{ border-color:var(--ink); color:var(--ink) }
        .fs.fs--light .chip[aria-pressed="true"],.fs.fs--light .chip:hover{
          background:var(--ink); color:var(--paper) }
        @media (prefers-reduced-motion:reduce){
          .fs *{ animation:none !important; transition-duration:.01ms !important }
        }
      `}</style>

      {backdrop && (
        <div aria-hidden className="fs-backdrop">
          {backdrop}
        </div>
      )}

      <a
        href="#stage"
        className="chip absolute left-[-9999px] z-50 focus:left-4 focus:top-4"
        style={{ background: "var(--paper)", color: "var(--ink)" }}
      >
        Skip to the figures
      </a>

      <header className="shell flex items-center gap-4 py-4">
        <span className="text-[1.15rem] font-black tracking-[-0.05em]">{BRAND}</span>
        <span className="lbl hidden sm:inline" style={{ color: "var(--dim)" }}>
          {DROP} · The Figure Shop · {version}
        </span>
        <span className="flex-1" />
        <a href="/s" className="chip">v1 shop</a>
      </header>

      {/* ---- hero: the display case is the headline ------------------------ */}
      <section className="shell pb-6 pt-10 text-center">
        <p className="lbl" style={{ color: "var(--dim)" }}>
          {DROP} · three figures · {PIECES.length} pieces
        </p>
        <h1 className="mx-auto mt-4 max-w-[14ch] text-[clamp(2.6rem,8.5vw,7.5rem)]">
          The drop, in hand
        </h1>
        <p className="mx-auto mt-5 max-w-[52ch] text-[1.02rem]" style={{ color: "var(--dim)" }}>
          Every fit in the collection, cast as a collectible figure. Turn one
          toward the light, tap to change what it is wearing, then break the
          look down into pieces below.
        </p>
        {note && (
          <p className="lbl mx-auto mt-4 max-w-[70ch]" style={{ color: "var(--dim)" }}>
            {note}
          </p>
        )}
      </section>

      {/* ---- the stage: one figure at a time, full bleed ------------------- */}
      <section id="stage" className="shell pb-10">
        <div className="border-2" style={{ borderColor: "var(--hair)" }}>
          <ChibiHero
            fallbackSrc={shot("ft-hero", 900, 1200)}
            vrmUrls={vrmUrls}
            layout="stage"
          />
        </div>
      </section>

      {/* ---- the three figures as a set ------------------------------------ */}
      <section className="shell py-16 sm:py-24">
        <h2 className="max-w-[18ch] text-[clamp(1.9rem,5.4vw,4rem)]">The full set</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {FITS.map((f, idx) => (
            <article key={f.id} className="border-2 p-5" style={{ borderColor: "var(--hair)" }}>
              <p className="lbl" style={{ color: "var(--dim)" }}>
                Figure {String(idx + 1).padStart(2, "0")} · {f.place}
              </p>
              <h3 className="mt-2 text-[1.6rem]">{f.name}</h3>
              <p className="mt-2 text-[0.95rem]" style={{ color: "var(--dim)" }}>{f.note}</p>
              <ul className="mt-4 flex list-none flex-wrap gap-1.5 p-0">
                {f.pieces.map((pid) => {
                  const p = byId(pid);
                  if (!p) return null;
                  return (
                    <li key={pid}>
                      <a
                        href="#grid"
                        className="lbl inline-flex min-h-11 items-center rounded-full border px-3"
                        style={{ borderColor: "var(--hair)" }}
                      >
                        {p.name} · {money(p.price)}
                      </a>
                    </li>
                  );
                })}
              </ul>
              <img
                src={shotFor({ img: f.img, name: f.name, hue: byId(f.pieces[0])?.hue }, 800, 500)}
                alt={`${f.name}: ${f.note}`}
                width={800}
                height={500}
                loading="lazy"
                className="mt-5 aspect-[8/5] w-full border object-cover"
                style={{ borderColor: "var(--hair)" }}
              />
            </article>
          ))}
        </div>
      </section>

      {/* ---- the pieces the figures are wearing ---------------------------- */}
      <section id="grid" className="shell pb-24">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="text-[clamp(1.9rem,5.4vw,4rem)]">The pieces</h2>
          <p className="lbl" style={{ color: "var(--dim)" }}>{PIECES.length} shown</p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {PIECES.map((p) => (
            <article key={p.id}>
              <a href="#grid" className="block">
                <div className="overflow-hidden border-2 p-2" style={{ borderColor: "var(--hair)" }}>
                  <img
                    src={shotFor(p, 800, p.crop === "reel" ? 1420 : 800)}
                    alt={p.name}
                    width={800}
                    height={p.crop === "reel" ? 1420 : 800}
                    loading="lazy"
                    className={`w-full object-cover ${p.crop === "reel" ? "aspect-[9/16]" : "aspect-square"}`}
                  />
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-3">
                  <h3 className="text-[1rem]">{p.name}</h3>
                  <span className="lbl" style={{ fontVariantNumeric: "tabular-nums" }}>{money(p.price)}</span>
                </div>
                <p className="mt-1.5 text-[0.88rem]" style={{ color: "var(--dim)" }}>{p.line}</p>
              </a>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t-2" style={{ borderColor: "var(--hair)" }}>
        <div className="shell py-14">
          <p className="text-[clamp(3rem,17vw,14rem)] font-black uppercase leading-[0.8] tracking-[-0.06em]">
            {BRAND}
          </p>
          <p className="lbl mt-6 max-w-[70ch]" style={{ color: "var(--dim)" }}>
            The Figure Shop · {version} · sculpted figures rendered live, one per
            fit. Original generated models; no real person or likeness depicted.
          </p>
        </div>
      </footer>
    </div>
  );
}
