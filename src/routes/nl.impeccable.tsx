import { createFileRoute } from "@tanstack/react-router";
import { BRAND, SEASON, PIECE_COUNT, money } from "@/components/northline/data";
import { img, pageMeta, useGroups, useReveal } from "@/components/northline/parts";

/* ============================================================================
   VERSION 2 — IMPECCABLE
   Skill: impeccable

   THESIS: The edition as a bill of materials. Every piece is listed with its
   cloth and its lead time, because a made-to-order shop's real claim is the
   list, not the photograph. Refuses the fashion hero of one enormous image
   and a two-word headline.
   OWN-WORLD: Drenched olive field carrying the first screen, bone type, rust
   only on the money. Hairline rules, no radius except the action pill,
   monumental display against tiny mono labels with nothing in between.
   STORY: A buyer reads a specification, recognises the cloth, and opens one
   piece.
   FIRST VIEWPORT: Olive edge to edge. Monumental headline, then the bill of
   materials itself: sixteen rows of cloth, lead time and price, live.
   FORM: Specification field, committed at page scale.
   FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md

   Craft floor applied: no eyebrow above any heading (a ban, not a default),
   body measure held to 62ch, one authored motion moment, shadows carry offset
   and blur or are absent entirely.
   ========================================================================== */

export const Route = createFileRoute("/nl/impeccable")({
  component: Impeccable,
  head: () =>
    pageMeta(
      `${BRAND}: Bill of materials`,
      `The whole ${SEASON.toLowerCase()} edition as a specification. Cloth, lead time and price first, photographs after.`,
    ),
});

function Impeccable() {
  useReveal();
  const groups = useGroups();
  const all = groups.flatMap((g) => g.pieces);

  return (
    <div className="min-h-dvh bg-[#1d2417] text-[#f0eee4] [font-family:Archivo,sans-serif]">
      <a href="#main" className="absolute left-[-9999px] z-50 bg-[#f0eee4] px-4 py-2 text-[#1d2417] focus:left-4 focus:top-4">
        Skip to content
      </a>

      {/* the drenched field. The colour is the argument, not a backdrop. */}
      <header className="border-b border-[#f0eee4]/15">
        <div className="mx-auto flex max-w-[1680px] items-center gap-4 px-6 py-5 sm:px-10">
          <span className="font-black tracking-[-0.04em]">{BRAND}</span>
          <span className="flex-1" />
          <span className="text-[0.66rem] uppercase tracking-[0.2em] opacity-65">
            The {SEASON} Edition
          </span>
          <a
            href="#list"
            className="inline-flex min-h-11 items-center rounded-full border border-[#f0eee4] bg-[#f0eee4] px-5 text-[0.8rem] font-bold text-[#1d2417]"
          >
            Shop
          </a>
        </div>
      </header>

      <main id="main">
        <section className="mx-auto max-w-[1680px] px-6 pb-16 pt-20 sm:px-10">
          {/* monumental, then nothing until the tiny mono. No middle tier. */}
          <h1 className="m-0 max-w-[13ch] text-[clamp(3rem,10.5vw,9rem)] font-black uppercase leading-[0.84] tracking-[-0.05em]">
            Cloth first
          </h1>
          <p className="mt-8 max-w-[62ch] text-[1.06rem] leading-[1.6] opacity-80">
            {PIECE_COUNT} pieces, each made after it is ordered. Below is the whole
            edition as a bill of materials: what it is made from, how long it takes,
            what it costs. The photographs are further down.
          </p>
          <a
            href="#list"
            className="mt-9 inline-flex min-h-11 items-center rounded-full bg-[#c2502e] px-6 text-[0.8rem] font-bold uppercase tracking-[0.14em] text-[#f0eee4]"
          >
            Read the list
          </a>
        </section>

        {/* the signature: the list itself, at page scale */}
        <section id="list" className="mx-auto max-w-[1680px] px-6 pb-24 sm:px-10">
          <div className="rv opacity-0 transition-opacity duration-700 [&.in]:opacity-100">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-[#f0eee4]">
                  {["No.", "Piece", "Cloth", "Lead", "Price"].map((h) => (
                    <th
                      key={h}
                      className="py-3 pr-4 text-[0.62rem] font-normal uppercase tracking-[0.2em] opacity-60"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {all.map((p, i) => (
                  <tr key={p.id} className="border-b border-[#f0eee4]/15 align-top">
                    <td className="py-4 pr-4 font-mono text-[0.68rem] tracking-[0.12em] text-[#e08a63]">
                      {String(i + 1).padStart(2, "0")}
                    </td>
                    <td className="py-4 pr-4">
                      <span className="text-[1.02rem] font-bold tracking-[-0.02em]">{p.name}</span>
                      <span className="mt-1 block max-w-[52ch] text-[0.92rem] leading-[1.6] opacity-65">
                        {p.story}
                      </span>
                    </td>
                    <td className="hidden py-4 pr-4 text-[0.86rem] opacity-70 md:table-cell">
                      {p.detail.split(".")[0]}.
                    </td>
                    <td className="whitespace-nowrap py-4 pr-4 font-mono text-[0.72rem] opacity-70">
                      {p.detail.match(/\d+ to \d+ days/)?.[0] ?? "10 to 14 days"}
                    </td>
                    <td className="whitespace-nowrap py-4 text-right font-black tracking-[-0.03em]">
                      {money(p.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* the photographs, after the facts */}
        {groups.map((g) => (
          <section
            key={g.id}
            id={g.id}
            className="rv border-t border-[#f0eee4]/15 opacity-0 transition-opacity duration-700 [&.in]:opacity-100"
          >
            <div className="mx-auto max-w-[1680px] px-6 py-20 sm:px-10">
              <h2 className="m-0 max-w-[18ch] text-[clamp(1.9rem,4.4vw,3.4rem)] font-black uppercase leading-[0.9] tracking-[-0.04em]">
                {g.heading}
              </h2>
              <p className="mt-4 max-w-[62ch] leading-[1.6] opacity-75">{g.statement}</p>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {g.pieces.map((p) => (
                  <article key={p.id}>
                    <div className="aspect-[4/5] overflow-hidden bg-[#151b11]">
                      <img
                        src={img(p.img, 760, 950)}
                        alt={p.name}
                        width={760}
                        height={950}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                      />
                    </div>
                    <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-[#f0eee4]/20 pt-3">
                      <h3 className="text-[1rem] font-bold tracking-[-0.02em]">{p.name}</h3>
                      <span className="font-mono text-[0.8rem] text-[#e08a63]">{money(p.price)}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>

      <footer className="border-t border-[#f0eee4]/15">
        <div className="mx-auto max-w-[1680px] px-6 py-12 sm:px-10">
          <p className="m-0 text-[clamp(2rem,6vw,4.6rem)] font-black uppercase leading-[0.85] tracking-[-0.05em]">
            {BRAND}
          </p>
          <p className="mt-6 font-mono text-[0.64rem] uppercase tracking-[0.18em] opacity-55">
            impeccable · specification field · drenched colour strategy
          </p>
        </div>
      </footer>
    </div>
  );
}
