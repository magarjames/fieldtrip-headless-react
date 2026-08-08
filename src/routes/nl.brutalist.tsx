import { createFileRoute } from "@tanstack/react-router";
import { BRAND, SEASON, PIECE_COUNT, PIECES, money } from "@/components/northline/data";
import { img, pageMeta, useGroups, useReveal } from "@/components/northline/parts";

/* ============================================================================
   VERSION 4 — BRUTALIST
   Skill: industrial-brutalist-ui

   ARCHETYPE: Swiss Industrial Print. The skill says pick one archetype and
   commit, never alternate. Versions 1 and 2 are already dark fields, so this
   one takes the light substrate: unbleached documentation paper, carbon ink,
   hazard red as the only accent.

   The signature is compartmentalisation, not a table. Every zone is a grid
   track with a razor hairline produced by `gap: 1px` over an ink parent, and
   each section is stamped with a viewport-bleeding numeral.

   CONTRAST NOTE: #E61919 on #F4F4F0 measures 4.22:1. That clears AA for large
   text and non-text, and fails it for body copy. So the red is confined to
   rules, fills, crosshairs and display type. Where red carries small text it
   is inverted: #FFFFFF on #E61919 measures 4.65:1 and passes.
   ========================================================================== */

export const Route = createFileRoute("/nl/brutalist")({
  component: Brutalist,
  head: () =>
    pageMeta(
      `${BRAND}® / UNIT D-01 / ${SEASON} MANIFEST`,
      `${PIECE_COUNT} units cut against confirmed orders. No held stock, no forecast, no markdown cycle.`,
    ),
});

const PAPER = "#F4F4F0";
const INK = "#050505";

/* structural metadata. Randomised strings are the skill's "active mechanical
   process" cue, but they are fixed here so SSR and the client agree. */
const REV = "REV 2.6";
const UNIT = "UNIT / D-01";

function Rule() {
  return <hr className="my-0 h-px w-full border-0 bg-[#050505]" />;
}

function Cross({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute font-mono text-[0.7rem] leading-none text-[#E61919] ${className}`}
    >
      +
    </span>
  );
}

function Brutalist() {
  useReveal();
  const groups = useGroups();

  return (
    <div
      className="min-h-dvh"
      style={{ background: PAPER, color: INK, fontFamily: "Archivo, sans-serif" }}
    >
      {/* mechanical noise: fixed, pointer-events-none, never on a scroller */}
      <svg aria-hidden className="pointer-events-none fixed inset-0 z-40 h-full w-full opacity-[0.055] mix-blend-multiply">
        <filter id="nl-b-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#nl-b-grain)" />
      </svg>

      <a
        href="#manifest"
        className="absolute left-[-9999px] z-50 bg-[#050505] px-4 py-2 font-mono text-[0.75rem] uppercase tracking-[0.1em] text-white focus:left-4 focus:top-4"
      >
        {">>>"} Skip to manifest
      </a>

      {/* ---------------------------------------------------------- masthead */}
      <header>
        <Rule />
        <div className="mx-auto grid max-w-[1720px] grid-cols-2 items-center gap-x-6 px-4 py-3 font-mono text-[0.68rem] uppercase leading-[1.3] tracking-[0.1em] sm:grid-cols-4 sm:px-6">
          <samp>{UNIT}</samp>
          <samp className="text-right sm:text-left">{REV}</samp>
          <samp className="hidden sm:block">{SEASON} MANIFEST</samp>
          <samp className="hidden text-right sm:block">
            <span className="inline-block bg-[#E61919] px-2 py-1 text-white">OPEN</span>
          </samp>
        </div>
        <Rule />
      </header>

      {/* ------------------------------------------------------------- macro */}
      <section className="relative overflow-hidden border-b-2 border-[#050505]">
        <Cross className="left-4 top-4" />
        <Cross className="right-4 top-4" />
        <div className="mx-auto max-w-[1720px] px-4 pb-10 pt-12 sm:px-6 sm:pb-16 sm:pt-20">
          <h1
            className="m-0 uppercase"
            style={{
              fontFamily: '"Archivo Black", Archivo, sans-serif',
              fontSize: "clamp(3.4rem, 13.4vw, 15rem)",
              lineHeight: 0.85,
              letterSpacing: "-0.055em",
            }}
          >
            {BRAND}
            <span className="align-super text-[0.28em] tracking-normal">®</span>
          </h1>

          {/* bimodal density: the macro block, then a tight cluster, nothing between */}
          <div className="mt-8 grid gap-y-6 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-x-10">
            <p className="m-0 max-w-[58ch] font-mono text-[0.82rem] uppercase leading-[1.45] tracking-[0.06em]">
              {PIECE_COUNT} units. Cut against confirmed orders only. No held stock,
              no forecast, no markdown cycle. The list below is the whole operation.
            </p>
            <a
              href="#manifest"
              className="inline-flex min-h-11 items-center justify-center bg-[#E61919] px-6 font-mono text-[0.8rem] uppercase tracking-[0.12em] text-white"
            >
              {">>>"} Read manifest
            </a>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- telemetry strip */}
      <section aria-label="Operating parameters" className="bg-[#050505]">
        <dl className="mx-auto grid max-w-[1720px] grid-cols-2 gap-px sm:grid-cols-4">
          {[
            ["UNITS / EDITION", String(PIECE_COUNT)],
            ["LEAD TIME / DAYS", "10—14"],
            ["HELD STOCK", "0"],
            ["MARKDOWN EVENTS", "0"],
          ].map(([k, v]) => (
            <div key={k} className="bg-[#F4F4F0] px-4 py-6 sm:px-6 sm:py-8">
              <dt className="font-mono text-[0.62rem] uppercase leading-[1.3] tracking-[0.12em]">{k}</dt>
              <dd
                className="m-0 mt-3 uppercase"
                style={{
                  fontFamily: '"Archivo Black", Archivo, sans-serif',
                  fontSize: "clamp(2.2rem, 6vw, 4.4rem)",
                  lineHeight: 0.88,
                  letterSpacing: "-0.045em",
                }}
              >
                <data value={v}>{v}</data>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ---------------------------------------------------------- manifest */}
      <main id="manifest">
        {groups.map((g, gi) => (
          <section key={g.id} id={g.id} className="relative overflow-hidden border-t-2 border-[#050505]">
            {/* viewport-bleeding numeral */}
            <span
              aria-hidden
              className="pointer-events-none absolute -left-[0.09em] top-[-0.12em] select-none uppercase text-[#050505]/[0.07]"
              style={{
                fontFamily: '"Archivo Black", Archivo, sans-serif',
                fontSize: "clamp(9rem, 30vw, 26rem)",
                lineHeight: 0.75,
                letterSpacing: "-0.06em",
              }}
            >
              {String(gi + 1).padStart(2, "0")}
            </span>

            <div className="relative mx-auto max-w-[1720px] px-4 py-14 sm:px-6 sm:py-24">
              <p className="m-0 font-mono text-[0.66rem] uppercase tracking-[0.14em]">
                [ SECTION {String(gi + 1).padStart(2, "0")} ] /// {g.pieces.length} UNITS
              </p>
              <h2
                className="mt-4 max-w-[16ch] uppercase"
                style={{
                  fontFamily: '"Archivo Black", Archivo, sans-serif',
                  fontSize: "clamp(2.1rem, 7vw, 5.6rem)",
                  lineHeight: 0.88,
                  letterSpacing: "-0.05em",
                }}
              >
                {g.heading}
              </h2>
              <p className="mt-5 max-w-[62ch] font-mono text-[0.8rem] uppercase leading-[1.5] tracking-[0.05em]">
                {g.statement}
              </p>

              {/* grid determinism: gap-px over an ink parent draws the hairlines */}
              <div className="mt-12 grid gap-px bg-[#050505] sm:grid-cols-2 lg:grid-cols-3">
                {g.pieces.map((p) => {
                  const n = PIECES.findIndex((x) => x.id === p.id) + 1;
                  return (
                    <article key={p.id} className="rv bg-[#F4F4F0] opacity-0 transition-opacity duration-500 [&.in]:opacity-100">
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <img
                          src={img(p.img, 780, 975)}
                          alt={p.name}
                          width={780}
                          height={975}
                          loading="lazy"
                          className="h-full w-full object-cover [filter:grayscale(1)_contrast(1.35)_brightness(1.04)]"
                        />
                        {/* halftone: SVG dot matrix multiplied over the plate */}
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-60"
                          style={{
                            backgroundImage:
                              "radial-gradient(#050505 34%, transparent 35%), radial-gradient(#050505 34%, transparent 35%)",
                            backgroundSize: "4px 4px",
                            backgroundPosition: "0 0, 2px 2px",
                          }}
                        />
                        <output className="absolute left-0 top-0 bg-[#E61919] px-2 py-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-white">
                          U-{String(n).padStart(2, "0")}
                        </output>
                      </div>

                      <div className="border-t-2 border-[#050505] p-4 sm:p-5">
                        <h3 className="m-0 text-[0.95rem] font-bold uppercase leading-[1.15] tracking-[-0.01em]">
                          {p.name}
                        </h3>
                        <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 font-mono text-[0.66rem] uppercase tracking-[0.08em]">
                          <dt className="opacity-60">PRICE</dt>
                          <dd className="m-0 text-right font-bold">{money(p.price)}</dd>
                          <dt className="opacity-60">LEAD</dt>
                          <dd className="m-0 text-right">
                            {(p.detail.match(/\d+ to \d+ days/)?.[0] ?? "10 to 14 days").toUpperCase()}
                          </dd>
                          <dt className="opacity-60">SIZES</dt>
                          <dd className="m-0 text-right">{p.sizes.join(" / ")}</dd>
                        </dl>
                        <p className="mt-4 border-t border-[#050505]/25 pt-3 font-mono text-[0.68rem] uppercase leading-[1.45] tracking-[0.04em]">
                          {p.story}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        ))}
      </main>

      {/* ------------------------------------------------------------ stripe */}
      <div
        aria-hidden
        className="h-8 border-y-2 border-[#050505]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #E61919 0 14px, #F4F4F0 14px 28px)",
        }}
      />

      <footer className="border-t-2 border-[#050505]">
        <div className="mx-auto max-w-[1720px] px-4 py-12 sm:px-6">
          <p
            className="m-0 uppercase"
            style={{
              fontFamily: '"Archivo Black", Archivo, sans-serif',
              fontSize: "clamp(2.4rem, 9vw, 8rem)",
              lineHeight: 0.85,
              letterSpacing: "-0.055em",
            }}
          >
            {BRAND}
            <span className="align-super text-[0.28em] tracking-normal">™</span>
          </p>
          <div className="mt-8 grid gap-px bg-[#050505] sm:grid-cols-3">
            {[
              ["ARCHETYPE", "SWISS INDUSTRIAL PRINT"],
              ["SUBSTRATE", "F4F4F0 / 050505 / E61919"],
              ["GEOMETRY", "0PX RADIUS THROUGHOUT"],
            ].map(([k, v]) => (
              <div key={k} className="bg-[#F4F4F0] px-4 py-5">
                <p className="m-0 font-mono text-[0.62rem] uppercase tracking-[0.12em] opacity-60">{k}</p>
                <p className="m-0 mt-1.5 font-mono text-[0.72rem] uppercase tracking-[0.08em]">{v}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 font-mono text-[0.62rem] uppercase tracking-[0.12em] opacity-60">
            © {BRAND}® {UNIT} {REV} \\\ END OF MANIFEST
          </p>
        </div>
      </footer>
    </div>
  );
}
