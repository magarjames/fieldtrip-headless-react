import { createFileRoute } from "@tanstack/react-router";
import { BRAND, SEASON, COLLECTION_WORD, PIECE_COUNT, JOURNAL, money } from "@/components/northline/data";
import { img, pageMeta, useGroups, useReveal } from "@/components/northline/parts";

/* ============================================================================
   VERSION 6 — HYER
   Source: the attached DESIGN.md, applied literally.

   /northline took DESIGN.md's architecture into a dark field because the
   storefront brief asked for one. This version does the opposite: it is the
   light aviation system exactly as written, on a clothing store. Pale sky
   hero, 131px flush-left wordmark, a right-side two-line headline stopped by
   a period, right-aligned content bands on white, one clay card, a midnight
   band, a terminal footer. 1000px pills, 0px panels, no shadows anywhere,
   80px section gaps, 1200px page, body never below 18px.

   Its typeface is Inter, which is DESIGN.md's own documented substitute for
   HelveticaNowDisplay. Version 5 bans Inter because its skills ban it. Here
   the reference document is the authority, so it stays.

   THREE DELIBERATE DEVIATIONS, ALL FOR CONTRAST:

   1. Cool Ash #8e8e95 measures 3.25:1 on white, which fails AA at the 18px
      body size DESIGN.md mandates. Body copy uses #6f6f77 (4.98:1). The
      original token is kept for large and decorative text.
   2. The clay card's title stays white (3.73:1, passing as large text at
      37px/700) but its description is set in Deep Ink (5.29:1) rather than
      the specified white, which would have measured 3.73:1 at 18px.
   3. The hero ghost pill takes a Deep Ink border and Deep Ink text. DESIGN.md
      scopes the white ghost pill to dark surfaces, and this hero is pale, so
      white on pale sky would have been unreadable. The white ghost pill
      appears where the document intends it, on the midnight band.

   The single-clay rule is honoured: exactly one #bc7155 element exists on the
   page, so the primary buttons are Deep Ink fills rather than clay.
   ========================================================================== */

export const Route = createFileRoute("/nl/hyer")({
  component: Hyer,
  head: () =>
    pageMeta(
      `${BRAND}® — ${COLLECTION_WORD} ${SEASON}.`,
      `Nothing is cut until the order lands. ${PIECE_COUNT} pieces, ten to fourteen days, one price all season.`,
    ),
});

function Hyer() {
  useReveal();
  const groups = useGroups();
  const all = groups.flatMap((g) => g.pieces);
  const clay = all[0];

  return (
    <div className="nlh min-h-dvh">
      <style>{`
        .nlh{
          --deep-ink:#000d10; --pure-white:#ffffff; --cool-ash:#8e8e95;
          --ash-body:#6f6f77;          /* darkened for AA at 18px */
          --pebble:#d5d3d4; --midnight-hull:#0f0f1c; --charcoal-deck:#151623;
          --clay-ember:#bc7155;
          --page:1200px; --section-gap:80px; --card-pad:22px; --el-gap:16px;
          --fnt:'HelveticaNowDisplay','Neue Haas Grotesk Display',Inter,'Helvetica Neue',sans-serif;
          background:var(--pure-white); color:var(--deep-ink);
          font-family:var(--fnt);
          font-size:18px; line-height:1.61;   /* the 18/29 signature */
        }
        .nlh h1,.nlh h2,.nlh h3,.nlh h4{ font-family:var(--fnt); font-weight:700; margin:0 }
        .nlh p{ margin:0 }
        .nlh a{ color:inherit; text-decoration:none }
        .nlh :focus-visible{ outline:2px solid var(--deep-ink); outline-offset:3px }

        /* the type scale, clamped down from the reference ceilings */
        .nlh .t-hero{ font-size:clamp(3.6rem,15.6vw,187px); line-height:0.80; letter-spacing:-0.02em }
        .nlh .t-display-xl{ font-size:clamp(3rem,11vw,131px); line-height:1; letter-spacing:-0.02em }
        .nlh .t-display{ font-size:clamp(2.4rem,6.6vw,63px); line-height:1; letter-spacing:-0.02em }
        .nlh .t-heading-lg{ font-size:clamp(2.1rem,5.4vw,52px); line-height:1; letter-spacing:-0.01em }
        .nlh .t-heading{ font-size:clamp(1.8rem,4.2vw,37px); line-height:1; letter-spacing:-0.01em }
        .nlh .t-heading-sm{ font-size:clamp(1.5rem,3.2vw,30px); line-height:1 }
        .nlh .t-subheading{ font-size:23px; line-height:1.1; letter-spacing:-0.01em }
        .nlh .t-nav{ font-size:20px; line-height:1.2 }
        .nlh .t-body{ font-size:18px; line-height:1.61 }
        .nlh .t-caption{ font-size:17px; line-height:1.2 }

        /* pills, panels, icon buttons. No radius anywhere in between. */
        .nlh .pill{ border-radius:1000px }
        .nlh .panel{ border-radius:0 }
        .nlh .icon-btn{ border-radius:100% }

        /* the pale dawn sky: blue at the top, warm cream at the horizon */
        .nlh .sky{
          background:linear-gradient(180deg,#d9e6ef 0%,#e8eef2 42%,#f6f0e6 78%,#ffffff 100%);
        }

        .nlh .rv{ opacity:0; transform:translateY(20px);
          transition:opacity .7s cubic-bezier(0.16,1,0.3,1), transform .7s cubic-bezier(0.16,1,0.3,1) }
        .nlh .rv.in{ opacity:1; transform:none }
        @media (prefers-reduced-motion:reduce){
          .nlh *{ transition-duration:.01ms !important }
          .nlh .rv{ opacity:1; transform:none }
        }
      `}</style>

      <a href="#main" className="pill absolute left-[-9999px] z-50 bg-[var(--deep-ink)] px-[22px] py-[15px] text-white focus:left-4 focus:top-4">
        Skip to content
      </a>

      {/* ============================================================ hero */}
      <div className="sky">
        {/* transparent nav over the hero: three links and a circular toggle */}
        <header>
          <nav className="mx-auto flex max-w-[var(--page)] items-center gap-[var(--el-gap)] px-6 py-[21px]">
            <a href="#pieces" className="t-nav hidden sm:inline">The edition</a>
            <a href="#made" className="t-nav hidden sm:inline">How it is made</a>
            <a href="#support" className="t-nav hidden sm:inline">Support</a>
            <span className="flex-1" />
            <button
              type="button"
              aria-label="Open menu"
              className="icon-btn grid h-11 w-11 place-items-center bg-[var(--deep-ink)] text-white"
            >
              <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden>
                <path d="M0 1h16M0 6h16M0 11h16" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
          </nav>
        </header>

        {/* the only asymmetric composition on the page: wordmark flush-left at
            extreme scale, headline right, product floating lower-centre */}
        <section className="mx-auto max-w-[var(--page)] px-6 pb-[68px] pt-[34px]">
          <div className="grid items-end gap-[38px] lg:grid-cols-[1fr_auto]">
            <h1 className="t-display-xl">
              {BRAND}
              <span className="align-super text-[0.3em] leading-none">®</span>
            </h1>
            <p className="t-display max-w-[10ch] font-bold lg:text-right">
              {COLLECTION_WORD}
              <br />
              {SEASON}.
            </p>
          </div>

          <figure className="relative mx-auto mt-[52px] max-w-[860px]">
            {/* PLACEHOLDER. Product-crop logic per the reference: tight,
                isolated, no lifestyle context. The garment is the hero. */}
            <img
              src={img("northline-hyer-hero-product-crop", 1720, 1080)}
              alt="The Ridge Overshirt photographed alone against a pale ground."
              width={1720}
              height={1080}
              className="panel w-full object-cover mix-blend-multiply"
            />
            <a
              href="#pieces"
              className="pill absolute bottom-[-22px] right-0 inline-flex min-h-11 items-center border border-[var(--deep-ink)] bg-transparent px-[22px] py-[15px] text-[17px] font-bold text-[var(--deep-ink)] transition-colors duration-300 hover:bg-[var(--deep-ink)] hover:text-white"
            >
              See all {PIECE_COUNT}
            </a>
          </figure>
        </section>
      </div>

      <main id="main">
        {/* ============================ white band, right-aligned gravity */}
        <section id="made" className="mx-auto max-w-[var(--page)] px-6 py-[var(--section-gap)]">
          <div className="ml-auto max-w-[760px] text-right">
            <h2 className="rv t-heading-lg max-w-[16ch] ml-auto">
              Nothing is cut until the order lands.
            </h2>
            <p className="rv t-body ml-auto mt-[31px] max-w-[62ch] text-[var(--ash-body)]">
              The {SEASON.toLowerCase()} edition is {PIECE_COUNT} garments made after
              they are bought. It opens once, closes when the sizes are spoken for,
              and is not reprinted.
            </p>
          </div>

          {/* 2×2 feature grid, hairline above each title, 80px column gap */}
          <div className="mt-[68px] grid gap-x-[80px] gap-y-[52px] md:grid-cols-2">
            {[
              ["Made to order", "Your size is cut after you order it. Ten to fourteen days, every time, with no exceptions bought by paying more."],
              ["No held stock", "There is no warehouse behind this page. Nothing is overproduced, so nothing has to be cleared at the end of the season."],
              ["One price", "The price in week one is the price in week twelve. There is no sale because there is nothing left over to discount."],
              ["Returned freely", "Thirty days, return postage paid. Made to order does not mean you are stuck with a fit that is wrong."],
            ].map(([t, b]) => (
              <div key={t} className="rv border-t border-[var(--pebble)] pt-[21px]">
                <h3 className="t-subheading">{t}</h3>
                <p className="t-body mt-[16px] text-[var(--ash-body)]">{b}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ======================= the single clay card. One per page, ever. */}
        {clay && (
          <section className="mx-auto max-w-[var(--page)] px-6 pb-[var(--section-gap)]">
            <article className="panel rv bg-[var(--clay-ember)] px-6 py-[53px] sm:px-[59px]">
              <div className="grid items-center gap-[38px] lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <h2 className="t-heading text-white">{clay.name}</h2>
                  {/* deviation 2: Deep Ink body on clay for AA at 18px */}
                  <p className="t-body mt-[21px] max-w-[52ch] text-[var(--deep-ink)]">{clay.detail}</p>
                  <p className="t-caption mt-[31px] font-bold text-white">{money(clay.price)}</p>
                  <a
                    href="#pieces"
                    className="pill mt-[21px] inline-flex min-h-11 items-center bg-[var(--deep-ink)] px-[22px] py-[15px] text-[17px] font-bold text-white"
                  >
                    Add to the order
                  </a>
                </div>
                <img
                  src={img(clay.img, 900, 900)}
                  alt={clay.name}
                  width={900}
                  height={900}
                  loading="lazy"
                  className="panel aspect-square w-full object-cover"
                />
              </div>
            </article>
          </section>
        )}

        {/* ==================================================== the edition */}
        <section id="pieces" className="mx-auto max-w-[var(--page)] px-6 pb-[var(--section-gap)]">
          <div className="ml-auto max-w-[760px] text-right">
            <h2 className="rv t-heading ml-auto max-w-[18ch]">The {SEASON.toLowerCase()} edition.</h2>
          </div>
          <div className="mt-[52px] grid grid-cols-2 gap-x-[var(--el-gap)] gap-y-[52px] lg:grid-cols-4">
            {all.map((p) => (
              <article key={p.id} className="rv">
                <img
                  src={img(p.img, 760, 950)}
                  alt={p.name}
                  width={760}
                  height={950}
                  loading="lazy"
                  className="panel aspect-[4/5] w-full object-cover"
                />
                <div className="border-t border-[var(--pebble)] pt-[16px] mt-[21px]">
                  <h3 className="t-subheading">{p.name}</h3>
                  <p className="t-body mt-[11px] text-[var(--ash-body)]">{p.story}</p>
                  <p className="t-body mt-[16px] font-bold">{money(p.price)}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ====================================== dark band, right-aligned */}
        <section id="support" className="bg-[var(--midnight-hull)] text-white">
          <div className="mx-auto max-w-[var(--page)] px-6 py-[var(--section-gap)]">
            <div className="ml-auto lg:w-1/2">
              <h2 className="rv t-heading">Sizing, fit and everything after.</h2>
              <p className="rv t-body mt-[31px] text-white">
                Every piece ships with the measurements it was cut to, not a generic
                chart. If the fit is wrong we will tell you which size to try before
                you pay postage on a second one.
              </p>
              <div className="mt-[38px] flex flex-wrap gap-[var(--el-gap)]">
                {/* the white ghost pill, on the dark surface it was scoped to */}
                <a
                  href="#pieces"
                  className="pill inline-flex min-h-11 items-center border border-white bg-transparent px-[22px] py-[15px] text-[17px] font-bold text-white transition-colors duration-300 hover:bg-white hover:text-[var(--deep-ink)]"
                >
                  Size guide
                </a>
                <a
                  href="#pieces"
                  className="pill inline-flex min-h-11 items-center bg-white px-[22px] py-[15px] text-[17px] font-bold text-[var(--deep-ink)]"
                >
                  Ask a question
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =============================== charcoal deck, the journal band */}
        <section className="bg-[var(--charcoal-deck)] text-white">
          <div className="mx-auto max-w-[var(--page)] px-6 py-[var(--section-gap)]">
            <h2 className="rv t-heading-sm ml-auto max-w-[20ch] text-right">Field notes.</h2>
            <div className="mt-[52px] grid gap-x-[80px] gap-y-[38px] md:grid-cols-3">
              {JOURNAL.map((j) => (
                <article key={j.id} className="rv border-t border-white/25 pt-[21px]">
                  <p className="t-caption text-[var(--cool-ash)]">{j.kicker}</p>
                  <h3 className="t-subheading mt-[11px]">{j.title}</h3>
                  <p className="t-body mt-[16px] text-white">{j.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ================================================= footer terminal */}
      <footer className="bg-[var(--deep-ink)] text-white">
        <div className="mx-auto max-w-[var(--page)] px-6 py-[var(--section-gap)]">
          <p className="t-hero font-bold">
            {BRAND}
            <span className="align-super text-[0.3em] leading-none">®</span>
          </p>
          <div className="mt-[52px] grid gap-[38px] sm:grid-cols-3">
            {[
              ["Shop", ["The edition", "Sizing", "Gift notes"]],
              ["About", ["How it is made", "Field notes", "Returns"]],
              ["Contact", ["Support", "Stockists", "Press"]],
            ].map(([h, links]) => (
              <div key={h as string}>
                <h3 className="t-caption font-bold">{h as string}</h3>
                <ul className="mt-[16px] list-none space-y-[13px] p-0">
                  {(links as string[]).map((l) => (
                    <li key={l}>
                      <a href="#main" className="t-nav text-[var(--cool-ash)] transition-colors duration-200 hover:text-white">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="t-caption mt-[68px] text-[var(--cool-ash)]">
            © {BRAND}® {SEASON} edition. DESIGN.md applied literally.
          </p>
        </div>
      </footer>
    </div>
  );
}
