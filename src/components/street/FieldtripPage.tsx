import { useRef, useState } from "react";
import { BRAND, TAGLINE, DROP, PIECE_COUNT, PIECES, CATS, FITS, money, type CatId } from "./data";
import { shot, shotFor } from "./media";
import { ChibiHero } from "./Chibi";
import { HeroFigureSequence, HeroPin, useIntroClipsAvailable } from "./HeroWalkIn";
import { useReveal } from "@/components/northline/parts";
import { useReducedMotion } from "@/components/world/stage";

/* ============================================================================
   FIELDTRIP — the shop page (v1 layout), in two themes.

   Direction, from the actual product rather than from my earlier assumption:
   layered Gen Z streetwear, very wide bottoms, boxy graphic tops, thrift and
   sport crossover, travel-led. Loud, saturated, playful, video-native.

   The three things that make this page not the NORTHLINE page in new colours:

   1. IT MERCHANDISES FITS, NOT GARMENTS. This customer shops the styled look
      and works backwards to the pieces, which is what the source content is
      entirely made of. So the fits come first and the grid comes second.
   2. THE CROP IS 9:16. The imagery is shaped like the medium the clothes are
      actually sold in. Cards are reel-shaped, not catalogue-shaped.
   3. COLOUR IS PER PIECE. Each garment carries its own hue and lights up its
      own card on hover and focus, so the page is polychrome by construction
      instead of having one accent applied over the top.

   theme="bright" is v1 (/s). theme="dark" is v5 (/s/v5): the same layout on
   the figure shop's ink field — every rule below reads the --paper/--ink
   tokens, so the dark build is a token flip, not a second stylesheet.

   Accessibility is unchanged from the rest of the project: 44px targets,
   visible focus, alt text, declared dimensions, reduced-motion honoured, and
   the filter is a real toggle group rather than colour-coded chips.
   ========================================================================== */

export function FieldtripPage({
  theme = "bright",
  backdrop,
  figurePlacement = "inline",
  content = "full",
  primaryHref = "#fits",
  secondaryHref = "#grid",
  shopHref = "#grid",
}: {
  theme?: "bright" | "dark";
  /** fixed layer rendered behind the whole page (v5's fold gradient) */
  backdrop?: React.ReactNode;
  /** Keep the heading fixed while moving the complete figure group outward. */
  figurePlacement?: "inline" | "edge";
  /** Render just the opening screen when another storefront continues below it. */
  content?: "full" | "landing";
  primaryHref?: string;
  secondaryHref?: string;
  shopHref?: string;
}) {
  useReveal();
  const [cat, setCat] = useState<CatId | "all">("all");
  const shown = cat === "all" ? PIECES : PIECES.filter((p) => p.cat === cat);
  const byId = (id: string) => PIECES.find((p) => p.id === id);

  // the walk-in only pins the hero when both clips exist and motion is
  // wanted; either way the docked figure at the end is the same ChibiHero
  const heroWrapRef = useRef<HTMLDivElement>(null);
  const introReady = useIntroClipsAvailable();
  const reducedMotion = useReducedMotion();
  const pinIntro = introReady && !reducedMotion;

  return (
    <div
      className={`ft min-h-dvh${theme === "dark" ? " ft--dark" : ""}${backdrop ? " ft--clear" : ""}${content === "landing" ? " ft--landing" : ""}`}
    >
      <style>{`
        .ft{
          --paper:#FBF7EF; --ink:#141317; --dim:#565462; --hair:rgba(20,19,23,0.16);
          --pop:#F5C518; --pop-ink:#141317;
          background:var(--paper); color:var(--ink);
          font-family:Archivo,"Helvetica Neue",sans-serif;
        }
        /* v5: the figure shop's tokens on this layout — ink field, paper type */
        .ft.ft--dark{
          --paper:#141317; --ink:#FBF7EF; --dim:#a49fad; --hair:rgba(251,247,239,0.18);
        }
        /* with a backdrop the page lets it show through instead of flat paper.
           The backdrop sits at z-index 0 (never negative: the global body
           background would paint over it) and every sibling floats above it */
        .ft.ft--clear{ background:transparent }
        .ft .ft-backdrop{ position:fixed; inset:0; z-index:0; pointer-events:none }
        .ft.ft--clear > :not(.ft-backdrop){ position:relative; z-index:1 }
        .ft h1,.ft h2,.ft h3{ font-family:"Archivo Black",Archivo,sans-serif; margin:0;
          letter-spacing:-0.045em; line-height:0.9; text-transform:uppercase }
        .ft p{ margin:0; line-height:1.55 }
        .ft a{ color:inherit; text-decoration:none }
        .ft :focus-visible{ outline:3px solid var(--ink); outline-offset:2px }
        .ft .lbl{ font-family:"JetBrains Mono",monospace; font-size:0.66rem;
          text-transform:uppercase; letter-spacing:0.14em }
        .ft .shell{ max-width:1560px; margin-inline:auto; padding-inline:clamp(1rem,4vw,2.25rem) }
        .ft .btn{ display:inline-flex; align-items:center; min-height:44px; padding:0 1.4rem;
          border-radius:999px; background:var(--ink); color:var(--paper);
          font-weight:700; font-size:0.85rem; letter-spacing:-0.01em;
          transition:transform .2s cubic-bezier(.16,1,.3,1) }
        .ft .btn:active{ transform:scale(.97) }
        .ft .chip{ display:inline-flex; align-items:center; min-height:44px; padding:0 1.05rem;
          border-radius:999px; border:2px solid var(--ink); font-weight:700; font-size:0.82rem;
          background:transparent; transition:background .18s, color .18s }
        .ft .chip[aria-pressed="true"]{ background:var(--ink); color:var(--paper) }
        /* the per-piece hue only paints on intent, so the grid is calm at rest */
        .ft .card .plate{ transition:background .3s cubic-bezier(.16,1,.3,1) }
        .ft .card:hover .plate,.ft .card:focus-within .plate{ background:var(--hue) }
        .ft .card img{ transition:transform .5s cubic-bezier(.16,1,.3,1) }
        .ft .card:hover img,.ft .card:focus-within img{ transform:scale(1.04) rotate(-1deg) }
        .ft .rv{ opacity:0; transform:translateY(18px);
          transition:opacity .6s cubic-bezier(.16,1,.3,1), transform .6s cubic-bezier(.16,1,.3,1) }
        .ft .rv.in{ opacity:1; transform:none }
        .ft .ticker{ display:flex; gap:2.5rem; white-space:nowrap; animation:ft-roll 26s linear infinite }
        @keyframes ft-roll{ to{ transform:translateX(-50%) } }
        .ft .ft-figure{ min-width:0; width:100%; max-width:100% }
        .ft .ft-figure-edge p[aria-live="polite"]{ margin-top:1rem }
        .ft.ft--landing > .ft-hero{ z-index:3 }
        .ft.ft--landing .ft-hero-actions,
        .ft.ft--landing .ft-fit-controls,
        .ft.ft--landing .ft-hero-description,
        .ft.ft--landing .ft-fit-description{ position:relative; z-index:4 }
        .ft.ft--landing .ft-hero-actions .chip,
        .ft.ft--landing .ft-fit-controls .chip{
          background:transparent;
          -webkit-backdrop-filter:none; backdrop-filter:none
        }
        .ft.ft--landing .ft-hero-actions .btn,
        .ft.ft--landing .ft-fit-controls .chip[aria-pressed="true"]{
          background:color-mix(in srgb,var(--ink) 84%,transparent);
          color:var(--paper);
          -webkit-backdrop-filter:blur(10px); backdrop-filter:blur(10px)
        }
        @media (min-width:1024px){
          .ft .ft-figure-edge{ transform:translateX(clamp(1rem,calc(3.125vw - 16px),1.5rem)) }
          .ft.ft--landing .ft-figure{
            width:min(100%,calc((100dvh - 15rem) * .75));
            justify-self:end;
          }
        }
        @media (min-width:1024px) and (max-height:850px){
          .ft.ft--landing h1{ font-size:clamp(5rem,12vh,7rem) }
          .ft.ft--landing .ft-figure{ width:min(100%,calc((100dvh - 20rem) * .75)) }
        }
        @media (min-width:1600px){
          .ft .ft-figure-edge{ transform:translateX(clamp(1.5rem,calc(33.55vw - 512.8px),8rem)) }
        }
        @media (max-width:767px){
          .ft.ft--landing .ft-hero{
            min-height:calc(100svh - 4.75rem);
            grid-template-rows:auto auto auto auto;
            align-items:start;
            gap:1.15rem;
            padding-top:.75rem;
            padding-bottom:1.25rem
          }
          .ft.ft--landing .ft-hero > .min-w-0{ display:contents }
          .ft.ft--landing .ft-hero h1{ order:1 }
          .ft.ft--landing .ft-figure{ order:2 }
          .ft.ft--landing .ft-hero-description{ order:3 }
          .ft.ft--landing .ft-hero-actions{ order:4 }
          .ft.ft--landing .ft-hero h1{
            font-size:clamp(2.7rem,12.5vw,4.5rem);
            line-height:.88
          }
          .ft.ft--landing .ft-hero-description{
            max-width:38ch;
            margin-top:0;
            font-size:.94rem;
            line-height:1.45
          }
          .ft.ft--landing .ft-hero-actions{ margin-top:0 }
          .ft.ft--landing .ft-figure,
          .ft.ft--landing .ft-figure-edge{
            width:100%;
            transform:none
          }
          .ft.ft--landing .ft-chibi-stage{
            height:clamp(18rem,40svh,21rem);
            aspect-ratio:auto
          }
          .ft.ft--landing .ft-fit-controls{
            flex-wrap:nowrap;
            gap:.45rem;
            margin-inline:-1rem;
            padding-inline:1rem;
            overflow-x:auto;
            overscroll-behavior-inline:contain;
            scrollbar-width:none
          }
          .ft.ft--landing .ft-fit-controls::-webkit-scrollbar{ display:none }
          .ft.ft--landing .ft-fit-controls .chip{ flex:0 0 auto }
          .ft.ft--landing .ft-fit-description{
            margin-top:.6rem;
            min-height:2.8em;
            font-size:.6rem
          }
        }
        @media (prefers-reduced-motion:reduce){
          .ft *{ animation:none !important; transition-duration:.01ms !important }
          .ft .rv{ opacity:1; transform:none }
        }
      `}</style>

      {backdrop && (
        <div aria-hidden className="ft-backdrop">
          {backdrop}
        </div>
      )}

      <a href={primaryHref} className="btn absolute left-[-9999px] z-50 focus:left-4 focus:top-4">
        Skip to the collection
      </a>

      <header className="shell flex items-center gap-4 py-4">
        <span className="text-[1.15rem] font-black tracking-[-0.05em]">{BRAND}</span>
        <span className="lbl hidden sm:inline" style={{ color: "var(--dim)" }}>
          {DROP}
          {theme === "dark" ? " · After dark" : ""}
        </span>
        <span className="flex-1" />
        <a href={shopHref} className="btn">
          Shop {PIECE_COUNT}
        </a>
      </header>

      {/* ---- hero: the fit is the hero, not a flat lay --------------------- */}
      {/* minmax(0,…) on both tracks: an fr track will grow to its content's
          min-width, and "SOMEWHERE" at display size is wider than the track,
          which pushed the chibi panel clean off the right edge. The vw
          coefficient is sized so the longest word still fits the left track
          at every width from the lg breakpoint up. */}
      <HeroPin active={pinIntro} wrapRef={heroWrapRef}>
      <section className="ft-hero shell grid items-end gap-8 pb-10 pt-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="min-w-0">
          <h1 className="text-[clamp(2.9rem,7.5vw,10rem)]">{TAGLINE}</h1>
          <p
            className="ft-hero-description mt-6 max-w-[46ch] text-[1.05rem]"
            style={{ color: "var(--dim)" }}
          >
            {PIECE_COUNT} pieces built to be layered, not admired one at a time. Wide bottoms, boxy
            tops, and enough colour to ruin a capsule wardrobe.
          </p>
          <div className="ft-hero-actions mt-7 flex flex-wrap gap-2.5">
            <a href={primaryHref} className="btn">
              See the fits
            </a>
            <a href={secondaryHref} className="chip">
              Every piece
            </a>
          </div>
        </div>
        {/* the mascot wears the drop, and changing its fit is the same data the
            fits section is merchandised from */}
        <div className={`ft-figure${figurePlacement === "edge" ? " ft-figure-edge" : ""}`}>
          {pinIntro ? (
            <HeroFigureSequence wrapRef={heroWrapRef} fallbackSrc={shot("ft-hero", 900, 1200)} />
          ) : (
            <ChibiHero fallbackSrc={shot("ft-hero", 900, 1200)} />
          )}
        </div>
      </section>
      </HeroPin>

      {content === "full" && (
        <>
          {/* ---- ticker: cheap, loud, and correct for the register ------------- */}
          {/* ink type on the pop band in BOTH themes: on the dark build the page
          colour is paper, which would drown on yellow */}
          <div
            className="overflow-hidden border-y-2 py-2.5"
            style={{ borderColor: "var(--ink)", background: "var(--pop)", color: "var(--pop-ink)" }}
          >
            <div className="ticker lbl" aria-hidden>
              {Array.from({ length: 2 }).flatMap((_, r) =>
                [
                  "Free returns for 30 days",
                  "Ships worldwide",
                  `${DROP} out now`,
                  "Nothing restocked",
                  "Cut wide on purpose",
                ].map((t) => <span key={`${r}-${t}`}>{t} ✱</span>),
              )}
            </div>
          </div>

          {/* ---- fits: how this customer actually shops ------------------------ */}
          <section id="fits" className="shell py-16 sm:py-24">
            <h2 className="max-w-[16ch] text-[clamp(1.9rem,5.4vw,4rem)]">
              Three fits, eighteen pieces
            </h2>
            <div className="mt-10 grid gap-8 lg:grid-cols-3">
              {FITS.map((f, i) => (
                <article key={f.id} className="rv" style={{ ["--index" as string]: i }}>
                  <div
                    className="relative overflow-hidden border-2"
                    style={{ borderColor: "var(--ink)" }}
                  >
                    <img
                      src={shotFor(
                        { img: f.img, name: f.name, hue: byId(f.pieces[0])?.hue },
                        800,
                        1420,
                      )}
                      alt={`${f.name}: ${f.note}`}
                      width={800}
                      height={1420}
                      loading="lazy"
                      className="aspect-[9/16] w-full object-cover"
                    />
                    <span
                      className="lbl absolute left-0 top-0 px-2.5 py-1.5 font-bold"
                      style={{ background: "var(--ink)", color: "var(--paper)" }}
                    >
                      {f.place}
                    </span>
                  </div>
                  <h3 className="mt-4 text-[1.6rem]">{f.name}</h3>
                  <p className="mt-2 text-[0.95rem]" style={{ color: "var(--dim)" }}>
                    {f.note}
                  </p>
                  {/* the fit breaks down into buyable pieces, which is the point */}
                  <ul className="mt-3 flex list-none flex-wrap gap-1.5 p-0">
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
                </article>
              ))}
            </div>
          </section>

          {/* ---- the grid ------------------------------------------------------ */}
          <section id="grid" className="shell pb-24">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="text-[clamp(1.9rem,5.4vw,4rem)]">Everything</h2>
              <p className="lbl" style={{ color: "var(--dim)" }}>
                {shown.length} shown
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
              {(["all", ...CATS.map((c) => c.id)] as const).map((c) => (
                <button
                  key={c}
                  className="chip"
                  aria-pressed={cat === c}
                  onClick={() => setCat(c as CatId | "all")}
                >
                  {c === "all" ? "Everything" : CATS.find((x) => x.id === c)!.label}
                </button>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
              {shown.map((p) => (
                <article key={p.id} className="card rv" style={{ ["--hue" as string]: p.hue }}>
                  <a href="#grid" className="block">
                    <div
                      className="plate overflow-hidden border-2 p-2"
                      style={{ borderColor: "var(--ink)" }}
                    >
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
                      <span className="lbl" style={{ fontVariantNumeric: "tabular-nums" }}>
                        {money(p.price)}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[0.88rem]" style={{ color: "var(--dim)" }}>
                      {p.line}
                    </p>
                  </a>
                </article>
              ))}
            </div>
          </section>

          <footer className="border-t-2" style={{ borderColor: "var(--ink)" }}>
            <div className="shell py-14">
              <p className="text-[clamp(3rem,17vw,14rem)] font-black uppercase leading-[0.8] tracking-[-0.06em]">
                {BRAND}
              </p>
              <p className="lbl mt-6 max-w-[70ch]" style={{ color: "var(--dim)" }}>
                {theme === "dark" ? "After-dark build" : "Bright build"} · fits before garments ·
                9:16 crops · colour carried per piece. All imagery generated original. No
                third-party photography or likeness.
              </p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
