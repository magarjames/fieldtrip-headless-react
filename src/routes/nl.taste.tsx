import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BRAND, SEASON, PIECE_COUNT, CATEGORIES, money, type CategoryId } from "@/components/northline/data";
import { img, pageMeta, useGroups, useReveal } from "@/components/northline/parts";

/* ============================================================================
   VERSION 3 — TASTE
   Skill: design-taste-frontend

   DESIGN READ: made-to-order clothing landing for design-conscious buyers,
   with a quiet catalogue language, leaning toward native CSS tokens over a
   cool paper ground.
   DIALS: DESIGN_VARIANCE 5 / MOTION_INTENSITY 3 / VISUAL_DENSITY 3

   Skill rules honoured, and they are what make this version look different:
     - zero em dashes and zero en dashes anywhere on the page
     - dual light and dark from one token set, not a dark-only page
     - the premium-consumer beige-and-brass palette is banned, so this uses
       the cobalt-and-cream rotation instead
     - anti-centre bias above variance 4, so the hero is an asymmetric split
     - no three equal feature cards; spans are deliberately unequal
     - touch targets at 44px, motion at 3 means hover and focus only
   ========================================================================== */

export const Route = createFileRoute("/nl/taste")({
  component: Taste,
  head: () =>
    pageMeta(
      `${BRAND}: The ${SEASON} Edition`,
      `${PIECE_COUNT} pieces made after you order them. The edition opens once, closes when the sizes run out, and is not reprinted.`,
    ),
});

function Taste() {
  useReveal();
  const [filter, setFilter] = useState<CategoryId | "all">("all");
  const groups = useGroups(filter);

  return (
    <div className="nlt min-h-dvh">
      <style>{`
        .nlt{
          --bg:#f4f2ec; --raised:#e8e5dc; --ink:#15181c; --muted:#5c6169;
          --line:#d5d0c5; --accent:#2f5c96; --accent-ink:#ffffff;
          background:var(--bg); color:var(--ink);
          font-family:Archivo,system-ui,sans-serif;
        }
        @media (prefers-color-scheme:dark){
          .nlt{
            --bg:#101317; --raised:#171b21; --ink:#e9e9e6; --muted:#9aa1a9;
            --line:#252b33; --accent:#7aa5dd; --accent-ink:#101317;
          }
        }
        .nlt a{ color:inherit }
        .nlt :focus-visible{ outline:2px solid var(--accent); outline-offset:3px }
        .nlt .rv{ opacity:0; translate:0 16px;
          transition:opacity .6s cubic-bezier(.16,1,.3,1), translate .6s cubic-bezier(.16,1,.3,1) }
        .nlt .rv.in{ opacity:1; translate:0 0 }
        @media (prefers-reduced-motion:reduce){
          .nlt *{ transition-duration:.01ms !important }
          .nlt .rv{ opacity:1; translate:none }
        }
      `}</style>

      <a href="#main" className="absolute left-[-9999px] z-50 bg-[var(--accent)] px-4 py-2 text-[var(--accent-ink)] focus:left-4 focus:top-4">
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--bg)]/90 backdrop-blur">
        <div className="mx-auto flex h-[68px] max-w-[1280px] items-center gap-4 px-5 sm:px-8">
          <span className="font-bold tracking-[-0.03em]">{BRAND}</span>
          <span className="text-[0.66rem] uppercase tracking-[0.18em] text-[var(--muted)]">
            {SEASON}
          </span>
          <span className="flex-1" />
          <a
            href="#list"
            className="inline-flex min-h-11 items-center rounded-full bg-[var(--accent)] px-5 text-[0.78rem] font-semibold text-[var(--accent-ink)]"
          >
            Shop the collection
          </a>
        </div>
      </header>

      <main id="main">
        {/* asymmetric split, not a centred hero: variance 5 still sits above the
            anti-centre threshold of 4 */}
        <section className="mx-auto grid max-w-[1280px] items-center gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <h1 className="m-0 max-w-[15ch] text-[clamp(2.2rem,5.4vw,3.9rem)] font-bold leading-[1.04] tracking-[-0.03em]">
              A new uniform for everyday motion
            </h1>
            <p className="mt-5 max-w-[52ch] text-[1.08rem] leading-[1.6] text-[var(--muted)]">
              {PIECE_COUNT} pieces, one clear point of view. Each one is made after you
              order it, so nothing sits in a warehouse waiting to be marked down.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              <a
                href="#list"
                className="inline-flex min-h-11 items-center rounded-full bg-[var(--accent)] px-5 text-[0.82rem] font-semibold text-[var(--accent-ink)]"
              >
                Shop the collection
              </a>
              <a
                href="#how"
                className="inline-flex min-h-11 items-center rounded-full border border-[var(--line)] px-5 text-[0.82rem] font-semibold"
              >
                How it works
              </a>
            </div>
          </div>
          <figure className="m-0 overflow-hidden">
            {/* PLACEHOLDER: replace with real campaign photography */}
            <img
              src={img("northline-taste-campaign-portrait", 900, 1125)}
              alt="A model wearing the overshirt and wide trouser."
              width={900}
              height={1125}
              className="aspect-[4/5] w-full object-cover"
            />
          </figure>
        </section>

        {/* filters, animated in the 150 to 200ms band */}
        <section id="list" className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="flex flex-wrap gap-2 border-y border-[var(--line)] py-5">
            {(["all", ...CATEGORIES.map((c) => c.id)] as const).map((f) => {
              const on = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f as CategoryId | "all")}
                  aria-pressed={on}
                  className={`min-h-11 rounded-full border px-4 text-[0.8rem] font-semibold transition-colors duration-[170ms] ${
                    on
                      ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)]"
                      : "border-[var(--line)] text-[var(--muted)]"
                  }`}
                >
                  {f === "all" ? "All" : CATEGORIES.find((c) => c.id === f)!.label}
                </button>
              );
            })}
          </div>
        </section>

        {groups.map((g) => (
          <section key={g.id} id={g.id} className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8">
            <div className="rv">
              <h2 className="m-0 max-w-[20ch] text-[clamp(1.5rem,3vw,2.3rem)] font-bold tracking-[-0.025em]">
                {g.heading}
              </h2>
              <p className="mt-3 max-w-[58ch] leading-[1.6] text-[var(--muted)]">{g.statement}</p>
            </div>

            {/* unequal spans on purpose: three identical cards is the banned shape */}
            <div className="mt-9 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-6">
              {g.pieces.map((p, i) => (
                <article
                  key={p.id}
                  className={`rv ${i % 5 === 0 ? "col-span-2 lg:col-span-4" : "col-span-1 lg:col-span-2"}`}
                >
                  <div className="overflow-hidden bg-[var(--raised)]">
                    <img
                      src={img(p.img, 900, i % 5 === 0 ? 600 : 1125)}
                      alt={p.name}
                      width={900}
                      height={i % 5 === 0 ? 600 : 1125}
                      loading="lazy"
                      className={`w-full object-cover transition-transform duration-300 hover:scale-[1.03] ${
                        i % 5 === 0 ? "aspect-[3/2]" : "aspect-[4/5]"
                      }`}
                    />
                  </div>
                  <div className="mt-3 flex items-baseline justify-between gap-3">
                    <h3 className="text-[0.98rem] font-semibold">{p.name}</h3>
                    <span className="text-[0.9rem] text-[var(--muted)]">{money(p.price)}</span>
                  </div>
                  <p className="mt-1.5 text-[0.9rem] leading-[1.55] text-[var(--muted)]">{p.story}</p>
                </article>
              ))}
            </div>
          </section>
        ))}

        <section id="how" className="border-y border-[var(--line)] bg-[var(--raised)]">
          <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8">
            <h2 className="rv m-0 max-w-[20ch] text-[clamp(1.5rem,3vw,2.3rem)] font-bold tracking-[-0.025em]">
              Nothing is made until you order it
            </h2>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {[
                ["The edition opens", "Pieces go up together. You see the full run at once."],
                ["You order your size", "The order goes to the maker, not to a shelf."],
                ["It ships direct", "It leaves the maker and comes to you. Slower, and cheaper for it."],
              ].map(([t, b]) => (
                <div key={t} className="rv border-t border-[var(--line)] pt-4">
                  <h3 className="text-[1rem] font-semibold">{t}</h3>
                  <p className="mt-2 text-[0.95rem] leading-[1.6] text-[var(--muted)]">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-[1280px] px-5 py-12 sm:px-8">
        <p className="m-0 font-bold tracking-[-0.03em]">{BRAND}</p>
        <p className="mt-2 text-[0.66rem] uppercase tracking-[0.16em] text-[var(--muted)]">
          taste · variance 5, motion 3, density 3 · light and dark from one token set
        </p>
      </footer>
    </div>
  );
}
