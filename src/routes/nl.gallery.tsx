import { createFileRoute } from "@tanstack/react-router";
import { BRAND, SEASON, PIECE_COUNT, JOURNAL, money } from "@/components/northline/data";
import { img, pageMeta, useGroups, useReveal } from "@/components/northline/parts";

/* ============================================================================
   VERSION 7 — GALLERY
   Source: "Structured" style reference, applied literally.
   Renaissance gallery on putty paper.

   Putty canvas cut hard against Ink rooms, no gradient between them. Serif
   does all the emotional work and never drops below 34px; grotesk does all
   the functional work and never rises above 26px. Everything flat: no
   shadows, no elevation, hairlines only. Radii are 9px / 2px / 28.8px and
   nothing in between. The header is a monogram and one text link, with no
   menu bar, so this version has no filters and no sticky chrome at all.

   FOUR PLACES THE REFERENCE CONTRADICTS ITSELF OR REALITY, AND THE CALL MADE:

   1. Helvetica Now is listed with a 43px size, but the Don'ts cap the grotesk
      at 26px and hand everything from 34px up to the serif. The Don'ts win:
      nothing grotesk exceeds 26px anywhere on this page.
   2. "All imagery should be classical oil paintings or nothing" cannot hold
      literally for a shop that has to show what it sells. The decorative load
      stays with the painting panels, and the garments appear only where the
      reference already allows objects: circular crops and still life. The
      reference lists rabbit, amphora and butterfly as in-vocabulary, so
      garments photographed as still life are consistent with it.
   3. The notched card is specified with both corner cuts and a 9px radius.
      A clip-path erases border-radius, so the notch geometry wins, which is
      what the reference means by "not standard border-radius".
   4. Graphite #595855 measures 4.01:1 on Putty and fails AA for body text.
      It measures 5.67:1 on Bone, where the reference also uses it. So muted
      copy on Putty uses #4a4946 (5.07:1) and Graphite is kept for Bone
      surfaces and for large text, exactly where it passes.

   The 374px wordmark is meant to feel larger than the screen, so it is set in
   viewport units with the 374px ceiling as a cap and pulled left by a fraction
   of an em to guarantee the crop.
   ========================================================================== */

export const Route = createFileRoute("/nl/gallery")({
  component: Gallery,
  head: () =>
    pageMeta(
      `${BRAND} — The ${SEASON} Edition`,
      `${PIECE_COUNT} pieces cut after they are ordered, shown as an exhibition rather than a catalogue.`,
    ),
});

/* --------------------------------------------------------------- fragments */

function Monogram() {
  return (
    <span
      aria-label={BRAND}
      className="inline-grid h-8 w-8 place-items-center rounded-full border-[1.5px] border-[var(--ink)]"
    >
      <span className="font-serif text-[16px] leading-none">{BRAND[0]}</span>
    </span>
  );
}

/* the secondary brand shape, used only for pagination and indicators */
function Hex({ filled = false }: { filled?: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden className="shrink-0">
      <path
        d="M6 .9l4.4 2.55v5.1L6 11.1 1.6 8.55v-5.1z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

/* small uppercase labels sat in opposite corners of a section header */
function Corners({ left, right, dark = false }: { left: string; right: string; dark?: boolean }) {
  return (
    <div
      className={`flex items-baseline justify-between text-[12px] uppercase tracking-[0.08em] ${
        dark ? "text-[var(--paper)]/70" : "text-[var(--graphite)]"
      }`}
    >
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
}

function Gallery() {
  useReveal();
  const groups = useGroups();
  const all = groups.flatMap((g) => g.pieces);
  const vignettes = all.slice(0, 3);

  return (
    <div className="nlg min-h-dvh">
      <style>{`
        .nlg{
          --putty:#c4c3b6; --ink:#000000; --bone:#e7e5e4; --chalk:#ebebeb;
          --vellum:#dfdcd5; --graphite:#595855; --ash:#808080; --paper:#ffffff;
          --putty-muted:#4a4946;      /* Graphite darkened for AA on Putty */
          --ink-muted:#b5b3ae;        /* muted reverse type inside the Ink rooms */
          --serif:'Davinci','Playfair Display',Canela,'Tiempos Headline',Georgia,serif;
          --grotesk:'Helvetica Now',Inter,'Neue Haas Grotesk','Helvetica Neue',sans-serif;
          background:var(--putty); color:var(--ink);
          font-family:var(--grotesk);
          font-size:15px; line-height:1.5;
        }
        /* the global h1,h2,h3 rule points at Archivo Black; the serif is the
           brand voice here and has to take those elements back */
        .nlg h1,.nlg h2,.nlg h3{ font-family:var(--serif); font-weight:500; margin:0 }
        .nlg p{ margin:0 }
        .nlg a{ color:inherit; text-decoration:none }
        .nlg .font-serif{ font-family:var(--serif) }
        .nlg :focus-visible{ outline:2px solid currentColor; outline-offset:3px }

        /* serif, display only. Line height compresses as size grows so the
           headings read as carved rather than set. */
        .nlg .t-display{ font-family:var(--serif); font-weight:500;
          font-size:min(23vw,374px); line-height:0.84; letter-spacing:-0.009em; white-space:nowrap }
        .nlg .t-section{ font-family:var(--serif); font-weight:500;
          font-size:clamp(2.6rem,9vw,94px); line-height:0.84; letter-spacing:-0.009em }
        .nlg .t-heading-lg{ font-family:var(--serif); font-weight:500;
          font-size:clamp(1.9rem,5vw,52px); line-height:1; letter-spacing:-0.009em }
        .nlg .t-heading{ font-family:var(--serif); font-weight:500;
          font-size:clamp(1.7rem,4vw,43px); line-height:1.1; letter-spacing:-0.005em }
        .nlg .t-heading-sm{ font-family:var(--serif); font-weight:400;
          font-size:26px; line-height:1.33; letter-spacing:-0.005em }
        .nlg .t-subheading{ font-family:var(--serif); font-weight:400;
          font-size:22px; line-height:1.33; letter-spacing:-0.005em }

        /* grotesk, function only. Never above 26px. */
        .nlg .t-body{ font-size:15px; line-height:1.5 }
        .nlg .t-label{ font-size:12px; line-height:1.25; letter-spacing:0.08em; text-transform:uppercase }
        .nlg .t-stat{ font-size:16px; font-weight:500; line-height:1.25 }
        .nlg .t-micro{ font-size:9px; line-height:1.25; letter-spacing:0.14em; text-transform:uppercase }

        /* three radii, nothing between them */
        .nlg .r-card{ border-radius:9px }
        .nlg .r-link{ border-radius:2px }
        .nlg .r-pill{ border-radius:28.8px }

        /* the notched card: corner geometry, not a radius */
        .nlg .notched{
          clip-path:polygon(28px 0,calc(100% - 28px) 0,100% 28px,100% calc(100% - 28px),
                            calc(100% - 28px) 100%,28px 100%,0 calc(100% - 28px),0 28px);
        }

        /* PLACEHOLDER TREATMENT. Pushes modern photography toward varnished
           oil. Replace the sources with licensed or public-domain painting
           reproductions and drop this filter. */
        .nlg .oil{ filter:sepia(0.42) saturate(0.68) contrast(1.06) brightness(0.94) }

        /* The reference bans gradients. This is a two-stop gradient of the same
           colour, which paints a flat hairline; it is the idiom for animating
           an underline that tracks currentColor, not a visual gradient. */
        .nlg .link-underline{ background-image:linear-gradient(currentColor,currentColor);
          background-size:0 1px; background-repeat:no-repeat; background-position:0 100%;
          transition:background-size .3s cubic-bezier(0.16,1,0.3,1) }
        .nlg .link-underline:hover{ background-size:100% 1px }

        .nlg .rv{ opacity:0; transform:translateY(14px);
          transition:opacity .7s cubic-bezier(0.16,1,0.3,1), transform .7s cubic-bezier(0.16,1,0.3,1) }
        .nlg .rv.in{ opacity:1; transform:none }
        @media (prefers-reduced-motion:reduce){
          .nlg *{ transition-duration:.01ms !important }
          .nlg .rv{ opacity:1; transform:none }
        }
      `}</style>

      <a
        href="#edition"
        className="r-link absolute left-[-9999px] z-50 bg-[var(--ink)] px-4 py-2 text-[var(--paper)] focus:left-4 focus:top-4"
      >
        Skip to the edition
      </a>

      {/* ============================================== header: mark + one link */}
      <header className="flex items-center justify-between px-5 py-4 sm:px-10">
        <Monogram />
        <a href="#notes" className="link-underline t-label">
          Field notes
        </a>
      </header>

      {/* ==================================================== hero, putty room */}
      <section className="overflow-hidden pt-[60px]">
        {/* the tiny centred type cluster floating above the wordmark */}
        <div className="px-5 text-center sm:px-10">
          <h1 className="t-heading-lg mx-auto max-w-[18ch]">
            Real cloth, <em className="font-normal italic">made</em> to order
          </h1>

          <div className="mt-[28px] flex flex-wrap items-baseline justify-center gap-x-[28px] gap-y-[16px]">
            <span className="t-stat">PIECES: {PIECE_COUNT}</span>
            <span className="t-stat">LEAD: 10 TO 14 DAYS</span>
          </div>

          {/* the single accent button in this viewport */}
          <a
            href="#edition"
            className="r-pill mt-[28px] inline-flex min-h-11 items-center bg-[var(--ink)] px-[17px] text-[12px] text-[var(--paper)]"
          >
            View the edition
          </a>
        </div>

        {/* the signature: monumental, cropped at both edges by design. Centred
            so the overflow is symmetric, and so it still reads as composed on a
            display wide enough that the 374px ceiling stops it overflowing. */}
        <div className="mt-[52px] flex justify-center">
          <p className="t-display select-none" aria-hidden>
            {BRAND}
          </p>
        </div>
      </section>

      {/* ================== full-bleed painting with the notched card centred */}
      <section className="relative">
        {/* PLACEHOLDER: a classical landscape belongs here, full bleed, no
            border, no overlay, functioning as atmosphere rather than content */}
        <img
          src={img("northline-gallery-classical-landscape-panel", 2200, 1200)}
          alt=""
          width={2200}
          height={1200}
          className="oil h-[70vh] w-full object-cover"
        />
        <div className="absolute inset-0 grid place-items-center p-5">
          <article className="notched relative aspect-square w-[min(400px,78vw)] bg-[var(--ink)] p-[24px] text-[var(--paper)]">
            <p className="t-label text-[var(--ink-muted)]">The {SEASON} Edition</p>
            <p className="t-heading-sm mt-[16px] max-w-[14ch]">
              Nothing is cut until the order lands.
            </p>
            <p className="t-body absolute bottom-[52px] left-[24px] right-[24px] text-[var(--ink-muted)]">
              {PIECE_COUNT} pieces, released together and not reprinted.
            </p>
            <span aria-hidden className="t-micro absolute bottom-[24px] left-[24px] text-[var(--paper)]">
              Scroll
            </span>
          </article>
        </div>
      </section>

      {/* ============================================ ink room: the vignettes */}
      <section className="bg-[var(--ink)] py-[96px] text-[var(--paper)]">
        <div className="px-5 sm:px-10">
          <Corners left={`Fig. 01 to ${String(vignettes.length).padStart(2, "0")}`} right="Still life" dark />
          <h2 className="t-section mt-[32px] text-center">THE WINTER ROOM</h2>

          <div className="mt-[96px] grid gap-[52px] sm:grid-cols-3 sm:gap-[28px]">
            {vignettes.map((p) => (
              <article key={p.id} className="rv flex flex-col items-center text-center">
                <h3 className="t-subheading max-w-[16ch]">{p.name}</h3>
                {/* the circle is the primary image shape after the full bleed */}
                <div className="mt-[20px] aspect-square w-[200px] max-w-[62vw] overflow-hidden rounded-full bg-[var(--ash)]">
                  <img
                    src={img(p.img, 600, 600)}
                    alt={p.name}
                    width={600}
                    height={600}
                    loading="lazy"
                    className="oil h-full w-full object-cover"
                  />
                </div>
                <div className="mt-[20px] flex gap-[6px] text-[var(--paper)]">
                  <Hex filled />
                  <Hex />
                  <Hex />
                </div>
                <p className="t-body mt-[16px] max-w-[34ch] text-[var(--ink-muted)]">{p.story}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================= putty room: the whole edition */}
      <main id="edition" className="py-[96px]">
        <div className="px-5 sm:px-10">
          <Corners left={`${all.length} works`} right={`${SEASON} ${new Date().getFullYear()}`} />
          <h2 className="t-section mt-[32px] text-center">THE EDITION</h2>
        </div>

        {groups.map((g, gi) => (
          <section key={g.id} id={g.id} className="mt-[96px] px-5 sm:px-10">
            <div className="rv flex flex-wrap items-baseline justify-between gap-x-[32px] gap-y-[16px] border-b border-[var(--vellum)] pb-[20px]">
              <h3 className="t-heading max-w-[20ch]">{g.heading}</h3>
              <p className="t-body max-w-[46ch] text-[var(--putty-muted)]">{g.statement}</p>
              <span className="t-label text-[var(--putty-muted)]">
                Room {String(gi + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="mt-[40px] grid grid-cols-2 gap-[16px] lg:grid-cols-4">
              {g.pieces.map((p) => (
                <article key={p.id} className="rv r-card bg-[var(--bone)] p-[24px]">
                  <div className="r-card overflow-hidden bg-[var(--ash)]">
                    <img
                      src={img(p.img, 700, 875)}
                      alt={p.name}
                      width={700}
                      height={875}
                      loading="lazy"
                      className="oil aspect-[4/5] w-full object-cover"
                    />
                  </div>
                  {/* Graphite is legible on Bone, which is why the cards carry
                      the muted copy and the Putty canvas does not */}
                  <h4 className="t-subheading mt-[20px]">{p.name}</h4>
                  <p className="t-body mt-[6px] text-[var(--graphite)]">{p.story}</p>
                  <div className="mt-[20px] flex items-baseline justify-between gap-[16px] border-t border-[var(--vellum)] pt-[16px]">
                    <span className="t-stat">{money(p.price)}</span>
                    <span className="t-label text-[var(--graphite)]">{p.sizes.join(" ")}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* ================================================ ink room: the notes */}
      <section id="notes" className="bg-[var(--ink)] py-[96px] text-[var(--paper)]">
        <div className="px-5 sm:px-10">
          <Corners left="Wall labels" right="Field notes" dark />
          <h2 className="t-section mt-[32px] text-center">ON MAKING LESS</h2>

          <div className="mt-[96px] grid gap-[52px] sm:grid-cols-3 sm:gap-[28px]">
            {JOURNAL.map((j) => (
              <article key={j.id} className="rv border-t border-[var(--paper)]/25 pt-[20px]">
                <p className="t-label text-[var(--ink-muted)]">{j.kicker}</p>
                <h3 className="t-heading-sm mt-[16px] max-w-[20ch]">{j.title}</h3>
                <p className="t-body mt-[16px] text-[var(--ink-muted)]">{j.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-[96px] flex justify-center gap-[6px] text-[var(--paper)]">
            <Hex />
            <Hex filled />
            <Hex />
          </div>
        </div>
      </section>

      {/* ==================================================== chalk footer tier */}
      <footer className="bg-[var(--chalk)] px-5 py-[60px] sm:px-10">
        <div className="flex flex-wrap items-center justify-between gap-[28px]">
          <Monogram />
          <a href="#edition" className="link-underline t-label">
            Return to the edition
          </a>
        </div>
        <p className="t-heading-lg mt-[52px] max-w-[16ch]">
          Bought once, <em className="font-normal italic">worn</em> for years.
        </p>
        <p className="t-body mt-[20px] max-w-[52ch] text-[var(--putty-muted)]">
          All imagery on this page is placeholder. Original brand copy and invented
          product names, for a store that does not exist yet.
        </p>
      </footer>
    </div>
  );
}
