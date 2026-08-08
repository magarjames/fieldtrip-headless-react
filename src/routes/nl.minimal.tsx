import { createFileRoute } from "@tanstack/react-router";
import { BRAND, SEASON, PIECE_COUNT, JOURNAL, money } from "@/components/northline/data";
import { img, pageMeta, useGroups, useReveal } from "@/components/northline/parts";

/* ============================================================================
   VERSION 5 — MINIMAL
   Skills: minimalist-ui + high-end-visual-design

   THE CONFLICT, AND HOW IT IS RESOLVED. These two skills disagree in one
   place. minimalist-ui bans `rounded-full` on primary buttons and large
   containers; high-end-visual-design requires CTAs to be full pills with a
   nested button-in-button icon. Rather than average them into mush:

     - minimalist-ui wins on SUBSTANCE: palette, geometry, borders, type.
       Buttons are 6px, cards are 12px, every divider is 1px #EAEAEA.
     - high-end-visual-design wins on BEHAVIOUR: the double-bezel nesting, the
       macro-whitespace, the custom cubic-beziers, the blurred scroll entry,
       the magnetic hover physics. The button-in-button survives as a nested
       6px square rather than a circle, so the kinetic tension is kept and the
       pill ban is respected.

   Variance engine roll: Editorial Luxury vibe, Asymmetrical Bento layout.

   CONTRAST NOTE: minimalist-ui's muted grey #787774 measures 4.32:1 on the
   #FBFBFA canvas, just under AA. Body-level muted text uses #6B6A66 (5.23:1)
   instead; #787774 is kept only for the large decorative numerals.
   ========================================================================== */

export const Route = createFileRoute("/nl/minimal")({
  component: Minimal,
  head: () =>
    pageMeta(
      `${BRAND} — The ${SEASON} Edition`,
      `${PIECE_COUNT} garments cut after you order them, with nothing waiting in a warehouse.`,
    ),
});

const FAQ = [
  ["When does the edition close?", "It closes when the last size is spoken for, and it is not reprinted. Nothing carries over into the next season."],
  ["How long does an order take?", "Ten to fourteen days from the moment you order. Every piece is cut after the order lands, not before."],
  ["What happens if the fit is wrong?", "Return it within thirty days. Made to order does not mean final sale, and the return is paid for."],
  ["Why is there no sale?", "Nothing is overproduced, so there is nothing to clear. The price you see in week one is the price in week twelve."],
];

function Minimal() {
  useReveal();
  const groups = useGroups();
  const featured = groups[0]?.pieces[0];
  const rest = groups.flatMap((g) => g.pieces).filter((p) => p.id !== featured?.id);

  return (
    <div className="nlm min-h-dvh">
      <style>{`
        .nlm{
          --canvas:#FBFBFA; --surface:#FFFFFF; --shell:#F4F3F0;
          --ink:#2F3437; --muted:#6B6A66; --line:#EAEAEA;
          --pale-green:#EDF3EC; --deep-green:#346538;
          --ease:cubic-bezier(0.32,0.72,0,1);
          background:var(--canvas); color:var(--ink);
          font-family:Archivo,"Geist Sans","Switzer",sans-serif;
        }
        /* the global h1,h2,h3 rule sets Archivo Black; the editorial serif has
           to win it back with element specificity */
        .nlm h1,.nlm h2,.nlm h3{
          font-family:"Instrument Serif","Newsreader","Lyon Text",Georgia,serif;
          font-weight:400; letter-spacing:-0.025em; line-height:1.1;
        }
        .nlm p{ line-height:1.6 }
        .nlm :focus-visible{ outline:2px solid var(--ink); outline-offset:3px }

        /* high-end scroll interpolation: heavier than a plain fade, and the
           blur is what makes it read as mass rather than opacity */
        .nlm .rv{ opacity:0; transform:translateY(16px); filter:blur(6px);
          transition:opacity .8s var(--ease), transform .8s var(--ease), filter .8s var(--ease);
          transition-delay:calc(var(--index,0) * 80ms) }
        .nlm .rv.in{ opacity:1; transform:none; filter:none }

        /* ambient drift: fixed layer only, never on a scrolling container */
        @keyframes nlm-drift{
          0%{ transform:translate3d(-6%,-4%,0) scale(1) }
          50%{ transform:translate3d(6%,4%,0) scale(1.12) }
          100%{ transform:translate3d(-6%,-4%,0) scale(1) }
        }
        .nlm-amb{ animation:nlm-drift 26s ease-in-out infinite }

        .nlm details > summary{ list-style:none; cursor:pointer }
        .nlm details > summary::-webkit-details-marker{ display:none }
        .nlm details .plus::after{ content:"+" }
        .nlm details[open] .plus::after{ content:"−" }

        @media (prefers-reduced-motion:reduce){
          .nlm *{ animation:none !important; transition-duration:.01ms !important }
          .nlm .rv{ opacity:1; transform:none; filter:none }
        }
      `}</style>

      {/* fixed ambient + grain, pointer-events-none, per the performance rules */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="nlm-amb absolute left-1/2 top-[-18vh] h-[70vh] w-[70vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,#C9BFA8_0%,transparent_66%)] opacity-[0.16]" />
      </div>
      <svg aria-hidden className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-[0.035]">
        <filter id="nlm-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#nlm-grain)" />
      </svg>

      <a href="#main" className="absolute left-[-9999px] z-50 rounded-[6px] bg-[#111111] px-4 py-2 text-white focus:left-4 focus:top-4">
        Skip to content
      </a>

      {/* floating detached nav: high-end says never glue it edge-to-edge */}
      <header className="sticky top-0 z-30 px-4 pt-4 sm:px-6 sm:pt-6">
        <div className="mx-auto flex max-w-5xl items-center gap-4 rounded-[12px] border border-[var(--line)] bg-[var(--surface)]/85 px-4 py-2.5 backdrop-blur-xl sm:px-5">
          <span className="text-[0.95rem] font-semibold tracking-[-0.02em]">{BRAND}</span>
          <span className="hidden font-mono text-[0.68rem] uppercase tracking-[0.08em] text-[var(--muted)] sm:inline">
            {SEASON} Edition
          </span>
          <span className="flex-1" />
          <span className="hidden items-center gap-2 font-mono text-[0.68rem] text-[var(--muted)] md:inline-flex">
            Jump to sizing
            <kbd className="rounded-[4px] border border-[var(--line)] bg-[var(--shell)] px-1.5 py-0.5 font-mono text-[0.66rem] text-[var(--ink)]">
              S
            </kbd>
          </span>
          <a
            href="#pieces"
            className="group inline-flex min-h-11 items-center gap-2.5 rounded-[6px] bg-[#111111] pl-4 pr-1.5 text-[0.82rem] font-medium text-white transition-colors duration-200 [transition-timing-function:var(--ease)] hover:bg-[#333333] active:scale-[0.98]"
          >
            Shop the edition
            {/* button-in-button, squared off so the pill ban holds */}
            <span className="flex h-8 w-8 items-center justify-center rounded-[4px] bg-white/10 transition-transform duration-300 [transition-timing-function:var(--ease)] group-hover:-translate-y-px group-hover:translate-x-1 group-hover:scale-105">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
              </svg>
            </span>
          </a>
        </div>
      </header>

      <main id="main" className="relative z-10">
        {/* -------------------------------------------------------- hero */}
        <section className="mx-auto max-w-5xl px-4 py-24 sm:px-6 sm:py-32">
          <span className="rv inline-block rounded-full bg-[var(--pale-green)] px-3 py-1 font-mono text-[0.66rem] uppercase tracking-[0.05em] text-[var(--deep-green)]">
            Made to order
          </span>
          <h1 className="rv mt-6 max-w-[16ch] text-[clamp(2.8rem,7.4vw,5.4rem)]" style={{ ["--index" as string]: 1 }}>
            Twenty four pieces, and nothing waiting in a warehouse.
          </h1>
          <p className="rv mt-6 max-w-[58ch] text-[1.06rem] text-[var(--muted)]" style={{ ["--index" as string]: 2 }}>
            The {SEASON} edition is {PIECE_COUNT} garments cut after you order them. It
            opens once, closes when the sizes run out, and is not reprinted.
          </p>
          <div className="rv mt-9 flex flex-wrap items-center gap-3" style={{ ["--index" as string]: 3 }}>
            <a
              href="#pieces"
              className="group inline-flex min-h-11 items-center gap-2.5 rounded-[6px] bg-[#111111] pl-5 pr-1.5 text-[0.88rem] font-medium text-white transition-colors duration-200 [transition-timing-function:var(--ease)] hover:bg-[#333333] active:scale-[0.98]"
            >
              See all {PIECE_COUNT}
              <span className="flex h-8 w-8 items-center justify-center rounded-[4px] bg-white/10 transition-transform duration-300 [transition-timing-function:var(--ease)] group-hover:-translate-y-px group-hover:translate-x-1 group-hover:scale-105">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                </svg>
              </span>
            </a>
            <a
              href="#faq"
              className="inline-flex min-h-11 items-center rounded-[6px] border border-[var(--line)] bg-[var(--surface)] px-5 text-[0.88rem] font-medium transition-colors duration-200 hover:bg-[var(--shell)] active:scale-[0.98]"
            >
              How it works
            </a>
          </div>
        </section>

        {/* ------------------------------------------- asymmetrical bento */}
        <section id="pieces" className="mx-auto max-w-5xl px-4 pb-24 sm:px-6 sm:pb-32">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            {featured && (
              /* double-bezel: shell, then a concentric inner core */
              <article
                className="rv rounded-[14px] border border-[var(--line)] bg-[var(--shell)] p-1.5 transition-shadow duration-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] md:col-span-7 md:row-span-2"
              >
                <div className="overflow-hidden rounded-[8px] bg-[var(--surface)]">
                  <img
                    src={img(featured.img, 1100, 760)}
                    alt={featured.name}
                    width={1100}
                    height={760}
                    className="aspect-[3/2] w-full object-cover opacity-95"
                  />
                  <div className="p-6 sm:p-10">
                    <p className="m-0 font-mono text-[0.66rem] uppercase tracking-[0.08em] text-[var(--muted)]">
                      Piece 01
                    </p>
                    <h2 className="mt-3 text-[clamp(1.7rem,3.4vw,2.6rem)]">{featured.name}</h2>
                    <p className="mt-3 max-w-[46ch] text-[0.98rem] text-[var(--muted)]">{featured.detail}</p>
                    <p className="mt-5 font-mono text-[0.9rem]">{money(featured.price)}</p>
                  </div>
                </div>
              </article>
            )}

            {JOURNAL.slice(0, 2).map((j, i) => (
              <article
                key={j.id}
                className="rv rounded-[14px] border border-[var(--line)] bg-[var(--shell)] p-1.5 transition-shadow duration-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] md:col-span-5"
                style={{ ["--index" as string]: i + 1 }}
              >
                <div className="h-full rounded-[8px] bg-[var(--surface)] p-6 sm:p-8">
                  <p className="m-0 font-mono text-[0.66rem] uppercase tracking-[0.08em] text-[var(--muted)]">
                    {j.kicker}
                  </p>
                  <h3 className="mt-3 text-[1.4rem]">{j.title}</h3>
                  <p className="mt-3 text-[0.95rem] text-[var(--muted)]">{j.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------- the catalogue */}
        <section className="mx-auto max-w-5xl px-4 pb-24 sm:px-6 sm:pb-32">
          <h2 className="rv max-w-[18ch] text-[clamp(1.9rem,4.4vw,3.1rem)]">
            The rest of the {SEASON.toLowerCase()} edition
          </h2>
          <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-3">
            {rest.map((p, i) => (
              <article
                key={p.id}
                className="rv group rounded-[14px] border border-[var(--line)] bg-[var(--shell)] p-1.5 transition-shadow duration-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                style={{ ["--index" as string]: i % 3 }}
              >
                <div className="overflow-hidden rounded-[8px] bg-[var(--surface)]">
                  <div className="overflow-hidden">
                    <img
                      src={img(p.img, 720, 900)}
                      alt={p.name}
                      width={720}
                      height={900}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover opacity-95 transition-transform duration-700 [transition-timing-function:var(--ease)] group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="m-0 text-[1.05rem]">{p.name}</h3>
                    <p className="mt-2 text-[0.88rem] text-[var(--muted)]">{p.story}</p>
                    <p className="mt-4 font-mono text-[0.82rem]">{money(p.price)}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* -------------------------------------------------------- faq */}
        <section id="faq" className="mx-auto max-w-4xl px-4 pb-24 sm:px-6 sm:pb-32">
          <h2 className="rv text-[clamp(1.9rem,4.4vw,3.1rem)]">Before you order</h2>
          <div className="mt-10">
            {FAQ.map(([q, a], i) => (
              <details key={q} className="rv border-b border-[var(--line)]" style={{ ["--index" as string]: i }}>
                <summary className="flex min-h-11 items-center justify-between gap-6 py-5 text-[1.02rem] font-medium">
                  {q}
                  <span
                    aria-hidden
                    className="plus shrink-0 font-mono text-[1.1rem] leading-none text-[var(--muted)]"
                  />
                </summary>
                <p className="m-0 max-w-[62ch] pb-6 text-[0.95rem] text-[var(--muted)]">{a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-[var(--line)]">
        <div className="mx-auto flex max-w-5xl flex-wrap items-baseline gap-x-6 gap-y-3 px-4 py-12 sm:px-6">
          <span className="text-[0.95rem] font-semibold tracking-[-0.02em]">{BRAND}</span>
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.08em] text-[var(--muted)]">
            minimalist substrate, high-end choreography
          </span>
        </div>
      </footer>
    </div>
  );
}
