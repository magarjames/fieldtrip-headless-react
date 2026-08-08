import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { BRAND, SEASON, PIECE_COUNT, money } from "@/components/northline/data";
import { useGroups } from "@/components/northline/parts";
import { media, type MediaKey } from "./media";
import { type Look } from "./looks";

/**
 * The layout engine for the /w versions.
 *
 * Every version passes its own Look and gets a different page out: eight header
 * archetypes and ten catalogue archetypes, so no two of the ten share a
 * silhouette. The GL technique and the layout system now vary independently.
 *
 * The accessibility floor does not vary, per ui-ux-pro-max: 44px targets, one
 * primary CTA per screen, visible focus rings, sequential headings, alt text,
 * declared image dimensions, and no meaning carried by colour alone.
 */

/** maps the catalogue onto the generated imagery, falling back per key */
const KEY_FOR: Record<string, MediaKey> = {
  p01: "overshirt", p02: "parka", p04: "knit", p08: "trouser", p06: "tee",
  p10: "accessories", p11: "accessories", p12: "accessories",
  p15: "overshirt", p16: "tee",
};

export const pieceImage = (id: string, w = 800, h = 1000) => media(KEY_FOR[id] ?? "hero", w, h);

/** the per-look CSS custom properties + the type rules that read them */
export function LookStyle({ look }: { look: Look }) {
  const k = `.w-${look.id}`;
  return (
    <style>{`
      ${k}{
        --bg:${look.bg}; --fg:${look.fg}; --dim:${look.dim}; --hair:${look.hair};
        --accent:${look.accent}; --accent-ink:${look.accentInk};
        --shell:${look.shell}; --rhythm:${look.rhythm}; --radius:${look.radius};
        background:var(--bg); color:var(--fg);
        font-family:${look.body};
      }
      ${k} .d{
        font-family:${look.display}; font-weight:${look.displayWeight};
        letter-spacing:${look.displayTracking}; line-height:${look.displayLeading};
        ${look.displayUpper ? "text-transform:uppercase;" : ""}
        margin:0;
      }
      ${k} .lbl{
        font-family:${look.label}; text-transform:uppercase;
        letter-spacing:0.16em; font-size:0.66rem; line-height:1.4;
      }
      ${k} p{ line-height:1.62; margin:0 }
      ${k} a{ color:inherit; text-decoration:none }
      ${k} :focus-visible{ outline:2px solid var(--accent); outline-offset:3px }
      ${k} .cta{
        display:inline-flex; align-items:center; min-height:44px;
        padding:0 1.35rem; border-radius:var(--radius);
        background:var(--accent); color:var(--accent-ink);
        font-family:${look.label}; font-size:0.78rem; font-weight:600;
        letter-spacing:0.04em;
        transition:transform .25s cubic-bezier(.16,1,.3,1), opacity .25s;
      }
      ${k} .cta:active{ transform:scale(.98) }
      ${k} .ghost{
        display:inline-flex; align-items:center; min-height:44px;
        padding:0 1.35rem; border-radius:var(--radius);
        border:1px solid var(--hair); color:var(--fg);
        font-family:${look.label}; font-size:0.78rem; letter-spacing:0.04em;
      }
      ${k} .shell{ max-width:var(--shell); margin-inline:auto; padding-inline:clamp(1.25rem,4vw,2.5rem) }
      ${k} .rv{ opacity:0; transform:translateY(14px);
        transition:opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1) }
      ${k} .rv.in{ opacity:1; transform:none }
      @media (prefers-reduced-motion:reduce){
        ${k} *{ transition-duration:.01ms !important; animation:none !important }
        ${k} .rv{ opacity:1; transform:none }
      }
    `}</style>
  );
}

export function SkipLink() {
  return (
    <a href="#catalogue" className="cta absolute left-[-9999px] z-50 focus:left-4 focus:top-4">
      Skip to the edition
    </a>
  );
}

/* ------------------------------------------------------------------ header */

export function WorldHeader({ look, label }: { look: Look; label: string }) {
  const h = look.header;

  const mark = (
    <Link to="/w" className="d text-[1.05rem]" style={{ letterSpacing: "0.02em" }}>
      {BRAND}
    </Link>
  );
  const cta = (
    <a href="#catalogue" className="cta">
      Shop the edition
    </a>
  );

  if (h === "centred")
    return (
      <header className="relative z-20 border-b" style={{ borderColor: "var(--hair)" }}>
        <div className="shell flex flex-col items-center gap-3 py-7 text-center">
          <Link to="/w" className="d text-[clamp(1.4rem,3.4vw,2.2rem)]" style={{ letterSpacing: "0.34em" }}>
            {BRAND}
          </Link>
          <p className="lbl" style={{ color: "var(--dim)" }}>{label}</p>
          {cta}
        </div>
      </header>
    );

  if (h === "rail")
    return (
      <header className="relative z-20 border-b" style={{ borderColor: "var(--hair)" }}>
        <div className="shell grid items-center gap-4 py-4 sm:grid-cols-[auto_1fr_auto]">
          {mark}
          <p className="lbl hidden sm:block" style={{ color: "var(--dim)" }}>{label}</p>
          {cta}
        </div>
      </header>
    );

  if (h === "ghost")
    return (
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="shell flex items-center gap-4 py-6">
          {mark}
          <span className="flex-1" />
          <a href="#catalogue" className="lbl" style={{ color: "var(--dim)" }}>
            The edition
          </a>
        </div>
      </header>
    );

  if (h === "data")
    return (
      <header className="relative z-20">
        <div className="shell flex items-center gap-4 border-b py-3" style={{ borderColor: "var(--hair)" }}>
          {mark}
          <span className="flex-1" />
          {cta}
        </div>
        {/* the live strip: labelled, so the numbers are not colour-coded alone */}
        <dl
          className="shell grid grid-cols-2 gap-x-6 gap-y-2 border-b py-2.5 sm:grid-cols-4"
          style={{ borderColor: "var(--hair)" }}
        >
          {[["UNITS", String(PIECE_COUNT)], ["LEAD", "10-14D"], ["STOCK", "0"], ["STATUS", "OPEN"]].map(([a, b]) => (
            <div key={a} className="flex items-baseline gap-2">
              <dt className="lbl" style={{ color: "var(--dim)" }}>{a}</dt>
              <dd className="lbl m-0" style={{ color: "var(--fg)" }}>{b}</dd>
            </div>
          ))}
        </dl>
      </header>
    );

  if (h === "overlay")
    return (
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="shell flex items-center gap-4 py-5">
          {mark}
          <span className="flex-1" />
          <p className="lbl hidden sm:block" style={{ color: "var(--dim)" }}>{label}</p>
        </div>
      </header>
    );

  if (h === "split")
    return (
      <header className="relative z-20">
        <div className="flex items-center justify-between px-[clamp(1.25rem,4vw,2.5rem)] py-5">
          {mark}
          {cta}
        </div>
      </header>
    );

  if (h === "rule")
    return (
      <header className="relative z-20">
        <div className="shell flex flex-wrap items-baseline gap-x-5 gap-y-2 pb-3 pt-6">
          {mark}
          <p className="lbl" style={{ color: "var(--dim)" }}>{label}</p>
          <span className="flex-1" />
          {cta}
        </div>
        <div className="shell">
          <div style={{ height: 3, background: "var(--fg)" }} />
        </div>
      </header>
    );

  /* pill: a detached floating bar */
  return (
    <header className="sticky top-0 z-30 pt-4">
      <div className="shell">
        <div
          className="flex items-center gap-4 px-4 py-2.5 backdrop-blur-xl"
          style={{ border: "1px solid var(--hair)", borderRadius: "var(--radius)", background: "color-mix(in srgb, var(--bg) 72%, transparent)" }}
        >
          {mark}
          <p className="lbl hidden sm:block" style={{ color: "var(--dim)" }}>{label}</p>
          <span className="flex-1" />
          {cta}
        </div>
      </div>
    </header>
  );
}

/* --------------------------------------------------------------- catalogue */

function Price({ v }: { v: number }) {
  // tabular figures so the column does not shift between rows
  return <span style={{ fontVariantNumeric: "tabular-nums" }}>{money(v)}</span>;
}

export function Catalogue({ look, heading }: { look: Look; heading?: string }) {
  const groups = useGroups();
  const all = groups.flatMap((g) => g.pieces);
  const g = look.grid;
  const title = heading ?? `The ${SEASON.toLowerCase()} edition`;

  const Head = (
    <div className="flex flex-wrap items-baseline justify-between gap-4">
      <h2 className="d text-[clamp(1.7rem,4.2vw,3.2rem)]">{title}</h2>
      <p className="lbl" style={{ color: "var(--dim)" }}>
        {PIECE_COUNT} pieces · made to order
      </p>
    </div>
  );

  /* ---- index: numbered rows, image revealed on hover and on focus ------- */
  if (g === "index")
    return (
      <section id="catalogue" className="shell" style={{ paddingBlock: "var(--rhythm)" }}>
        {Head}
        <ol className="mt-10 list-none p-0">
          {all.map((p, i) => (
            <li key={p.id} className="group relative border-b" style={{ borderColor: "var(--hair)" }}>
              <a href="#catalogue" className="grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 py-5">
                <span className="lbl" style={{ color: "var(--dim)" }}>{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="d block text-[clamp(1.1rem,2.4vw,1.7rem)]">{p.name}</span>
                  <span className="mt-1 block text-[0.9rem]" style={{ color: "var(--dim)" }}>{p.story}</span>
                </span>
                <Price v={p.price} />
              </a>
              {/* decorative preview; the row is fully usable without it */}
              <img
                src={pieceImage(p.id, 360, 450)}
                alt=""
                width={360}
                height={450}
                loading="lazy"
                aria-hidden
                className="pointer-events-none absolute right-[14%] top-1/2 hidden w-[150px] -translate-y-1/2 object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 lg:block"
              />
            </li>
          ))}
        </ol>
      </section>
    );

  /* ---- table: dense, sortable-feeling data ----------------------------- */
  if (g === "table")
    return (
      <section id="catalogue" className="shell" style={{ paddingBlock: "var(--rhythm)" }}>
        {Head}
        <div className="mt-8 overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr style={{ borderBottom: "2px solid var(--fg)" }}>
                {["No.", "Piece", "Cloth", "Sizes", "Price"].map((x) => (
                  <th key={x} className="lbl py-3 pr-5 font-normal" style={{ color: "var(--dim)" }}>{x}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {all.map((p, i) => (
                <tr key={p.id} style={{ borderBottom: "1px solid var(--hair)" }}>
                  <td className="lbl py-4 pr-5" style={{ color: "var(--accent)" }}>{String(i + 1).padStart(2, "0")}</td>
                  <td className="py-4 pr-5">
                    <span className="d text-[1rem]">{p.name}</span>
                    <span className="mt-1 block max-w-[46ch] text-[0.86rem]" style={{ color: "var(--dim)" }}>{p.story}</span>
                  </td>
                  <td className="hidden py-4 pr-5 text-[0.86rem] md:table-cell" style={{ color: "var(--dim)" }}>
                    {p.detail.split(".")[0]}.
                  </td>
                  <td className="lbl whitespace-nowrap py-4 pr-5">{p.sizes.join(" ")}</td>
                  <td className="whitespace-nowrap py-4 font-semibold"><Price v={p.price} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );

  /* ---- magazine: real columns, drop cap, pull quote --------------------- */
  if (g === "magazine")
    return (
      <section id="catalogue" className="shell" style={{ paddingBlock: "var(--rhythm)" }}>
        {Head}
        <div className="mt-8 [column-gap:2.5rem] lg:[column-count:2]">
          <p className="text-[1.02rem] [&::first-letter]:float-left [&::first-letter]:mr-2 [&::first-letter]:font-bold [&::first-letter]:leading-[0.78] [&::first-letter]:text-[3.6em]">
            The edition opens as one run of {PIECE_COUNT} garments and closes when the
            sizes are gone. Nothing is reprinted, nothing is discounted, and nothing
            is cut before it is bought.
          </p>
          <blockquote className="my-7 border-l-2 pl-5" style={{ borderColor: "var(--accent)" }}>
            <p className="d text-[clamp(1.2rem,2.4vw,1.7rem)]">
              Holding stock means guessing, and guessing means discounting what you
              guessed wrong about.
            </p>
          </blockquote>
          {all.map((p) => (
            <article key={p.id} className="mb-8 break-inside-avoid">
              <img
                src={pieceImage(p.id, 760, 950)} alt={p.name} width={760} height={950} loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
              <h3 className="d mt-3 text-[1.15rem]">{p.name}</h3>
              <p className="mt-1 text-[0.92rem]" style={{ color: "var(--dim)" }}>{p.story}</p>
              <p className="lbl mt-2"><Price v={p.price} /></p>
            </article>
          ))}
        </div>
      </section>
    );

  /* ---- bleed: alternating full-bleed halves ---------------------------- */
  if (g === "bleed")
    return (
      <section id="catalogue" style={{ paddingBlock: "var(--rhythm)" }}>
        <div className="shell">{Head}</div>
        <div className="mt-12">
          {all.map((p, i) => (
            <article
              key={p.id}
              className={`rv grid items-center gap-8 py-8 lg:grid-cols-2 ${i % 2 ? "lg:[direction:rtl]" : ""}`}
            >
              <img
                src={pieceImage(p.id, 1100, 800)} alt={p.name} width={1100} height={800} loading="lazy"
                className="aspect-[11/8] w-full object-cover"
              />
              <div className="shell lg:[direction:ltr]">
                <p className="lbl" style={{ color: "var(--dim)" }}>{String(i + 1).padStart(2, "0")}</p>
                <h3 className="d mt-3 text-[clamp(1.6rem,3.6vw,2.8rem)]">{p.name}</h3>
                <p className="mt-4 max-w-[48ch] text-[1.02rem]" style={{ color: "var(--dim)" }}>{p.detail}</p>
                <p className="d mt-5 text-[1.3rem]"><Price v={p.price} /></p>
              </div>
            </article>
          ))}
        </div>
      </section>
    );

  /* ---- filmstrip: horizontal rail -------------------------------------- */
  if (g === "filmstrip")
    return (
      <section id="catalogue" style={{ paddingBlock: "var(--rhythm)" }}>
        <div className="shell">{Head}</div>
        <div
          className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[clamp(1.25rem,4vw,2.5rem)] pb-5"
          tabIndex={0}
          aria-label="Scrollable list of pieces"
        >
          {all.map((p, i) => (
            <article key={p.id} className="w-[74vw] shrink-0 snap-start sm:w-[36vw] lg:w-[23vw]">
              <img
                src={pieceImage(p.id, 700, 875)} alt={p.name} width={700} height={875} loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="mt-3 flex items-baseline justify-between gap-3">
                <h3 className="d text-[1rem]">{p.name}</h3>
                <span className="lbl"><Price v={p.price} /></span>
              </div>
              <p className="lbl mt-1" style={{ color: "var(--dim)" }}>{String(i + 1).padStart(2, "0")}</p>
            </article>
          ))}
        </div>
      </section>
    );

  /* ---- rail: wide lying-down bands ------------------------------------- */
  if (g === "rail")
    return (
      <section id="catalogue" className="shell" style={{ paddingBlock: "var(--rhythm)" }}>
        {Head}
        <div className="mt-10 flex flex-col gap-4">
          {all.map((p, i) => (
            <article
              key={p.id}
              className="rv grid items-center gap-5 border-t pt-4 sm:grid-cols-[10rem_1fr_auto]"
              style={{ borderColor: "var(--hair)" }}
            >
              <img
                src={pieceImage(p.id, 480, 300)} alt={p.name} width={480} height={300} loading="lazy"
                className="aspect-[8/5] w-full object-cover"
              />
              <div>
                <p className="lbl" style={{ color: "var(--dim)" }}>{String(i + 1).padStart(2, "0")}</p>
                <h3 className="d mt-1 text-[clamp(1.2rem,2.6vw,1.9rem)]">{p.name}</h3>
                <p className="mt-1.5 max-w-[54ch] text-[0.94rem]" style={{ color: "var(--dim)" }}>{p.story}</p>
              </div>
              <p className="d text-[1.2rem]"><Price v={p.price} /></p>
            </article>
          ))}
        </div>
      </section>
    );

  /* ---- sheet: tight contact sheet, numbered in the margin --------------- */
  if (g === "sheet")
    return (
      <section id="catalogue" className="shell" style={{ paddingBlock: "var(--rhythm)" }}>
        {Head}
        <div className="mt-8 grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-5">
          {all.map((p, i) => (
            <article key={p.id} className="rv">
              <img
                src={pieceImage(p.id, 520, 650)} alt={p.name} width={520} height={650} loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="flex items-baseline gap-2 pt-1.5">
                <span className="lbl" style={{ color: "var(--dim)" }}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className="truncate text-[0.82rem] font-semibold">{p.name}</h3>
                <span className="lbl ml-auto"><Price v={p.price} /></span>
              </div>
            </article>
          ))}
        </div>
      </section>
    );

  /* ---- scatter: masonry that never lines up ---------------------------- */
  if (g === "scatter")
    return (
      <section id="catalogue" className="shell" style={{ paddingBlock: "var(--rhythm)" }}>
        {Head}
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3">
          {all.map((p, i) => {
            const drop = ["lg:mt-0", "lg:mt-20", "lg:mt-10"][i % 3];
            return (
              <article key={p.id} className={`rv ${drop}`}>
                <img
                  src={pieceImage(p.id, 700, i % 3 === 1 ? 1050 : 875)}
                  alt={p.name} width={700} height={i % 3 === 1 ? 1050 : 875} loading="lazy"
                  className={`w-full object-cover ${i % 3 === 1 ? "aspect-[2/3]" : "aspect-[4/5]"}`}
                />
                <h3 className="d mt-4 text-[1.25rem]">{p.name}</h3>
                <p className="mt-1.5 text-[0.92rem]" style={{ color: "var(--dim)" }}>{p.story}</p>
                <p className="lbl mt-2.5"><Price v={p.price} /></p>
              </article>
            );
          })}
        </div>
      </section>
    );

  /* ---- spec: even grid, mono spec block under each --------------------- */
  if (g === "spec")
    return (
      <section id="catalogue" className="shell" style={{ paddingBlock: "var(--rhythm)" }}>
        {Head}
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          {all.map((p, i) => (
            <article key={p.id} className="rv">
              <img
                src={pieceImage(p.id, 700, 875)} alt={p.name} width={700} height={875} loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
              <h3 className="d mt-3 text-[1rem]">{p.name}</h3>
              <dl className="mt-2.5 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 border-t pt-2.5" style={{ borderColor: "var(--hair)" }}>
                <dt className="lbl" style={{ color: "var(--dim)" }}>No</dt>
                <dd className="lbl m-0 text-right">{String(i + 1).padStart(2, "0")}</dd>
                <dt className="lbl" style={{ color: "var(--dim)" }}>Sizes</dt>
                <dd className="lbl m-0 text-right">{p.sizes.join(" ")}</dd>
                <dt className="lbl" style={{ color: "var(--dim)" }}>Price</dt>
                <dd className="lbl m-0 text-right"><Price v={p.price} /></dd>
              </dl>
            </article>
          ))}
        </div>
      </section>
    );

  /* ---- editorial: asymmetric, one wide plate per three ----------------- */
  return (
    <section id="catalogue" className="shell" style={{ paddingBlock: "var(--rhythm)" }}>
      {Head}
      <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-6">
        {all.map((p, i) => {
          const wide = i % 5 === 0;
          return (
            <article key={p.id} className={`rv ${wide ? "col-span-2 lg:col-span-4" : "col-span-1 lg:col-span-2"}`}>
              <img
                src={pieceImage(p.id, 900, wide ? 600 : 1125)}
                alt={p.name} width={900} height={wide ? 600 : 1125} loading="lazy"
                className={`w-full object-cover ${wide ? "aspect-[3/2]" : "aspect-[4/5]"}`}
              />
              <div className="mt-3 flex items-baseline justify-between gap-3">
                <h3 className="d text-[1.05rem]">{p.name}</h3>
                <span className="text-[0.9rem]" style={{ color: "var(--dim)" }}><Price v={p.price} /></span>
              </div>
              <p className="mt-1.5 text-[0.9rem]" style={{ color: "var(--dim)" }}>{p.story}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- footer --- */

export function WorldFooter({ look, note }: { look: Look; note: string }) {
  const [dials] = useState(look.dials.join(" / "));
  return (
    <footer className="border-t" style={{ borderColor: "var(--hair)", paddingBlock: "clamp(3rem,6vw,5rem)" }}>
      <div className="shell">
        <p className="d text-[clamp(1.8rem,7vw,5rem)]">{BRAND}</p>
        <p className="lbl mt-6 max-w-[70ch]" style={{ color: "var(--dim)" }}>{note}</p>
        <p className="lbl mt-2" style={{ color: "var(--dim)" }}>
          {look.style} · variance {dials.split(" / ")[0]}, motion {dials.split(" / ")[1]}, density {dials.split(" / ")[2]}
        </p>
        <p className="lbl mt-5">
          <Link to="/w" className="underline underline-offset-4">All ten versions</Link>
        </p>
      </div>
    </footer>
  );
}
