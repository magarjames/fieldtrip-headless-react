import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import mascot from "@/assets/mascot.png";
import mascotWave from "@/assets/mascot-wave.png";
import mascotPencil from "@/assets/mascot-pencil.png";
import mascotBox from "@/assets/mascot-box.png";
import mascotCup from "@/assets/mascot-cup.png";

export const Route = createFileRoute("/")({
  component: Index,
});

const modules = [
  { n: "01", name: "Stock variance", note: "Theoretical vs actual, line by line." },
  { n: "02", name: "Waste log", note: "Prep, spoilage, staff food, comps." },
  { n: "03", name: "Labour vs sales", note: "Hours costed against daypart revenue." },
  { n: "04", name: "GP by category", note: "Food, drink, sub-groups, dishes." },
  { n: "05", name: "Menu engineering", note: "Stars, plough-horses, dogs." },
  { n: "06", name: "Supplier watch", note: "Price creep and short deliveries." },
  { n: "07", name: "The one-pager", note: "Where the money went, every week." },
];

const steps = [
  { n: "I", title: "You count", body: "Once a week. On paper, on a phone, on a spreadsheet. We take it in whatever shape it arrives." },
  { n: "II", title: "We reconcile", body: "Purchases, sales mix, waste and rota hours all get pulled into one place and checked line by line." },
  { n: "III", title: "You read one page", body: "A printed-quality report every Tuesday. Variance, waste, labour, and the three things to fix this week." },
];

const rates = [
  { name: "Single site", price: "£420", unit: "per month", features: ["Weekly one-pager", "Stock + waste + labour", "Email support"] },
  { name: "Small group", price: "£340", unit: "per site / month", features: ["2–5 sites", "Group roll-up report", "Monthly review call"], featured: true },
  { name: "Bureau", price: "POA", unit: "6+ sites", features: ["Dedicated analyst", "Custom modules", "On-site quarterly"] },
];

function Index() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Nav bar — pill buttons in the print-shop style */}
      <header>
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 pt-6">
          <div className="flex items-center gap-2 label-tech">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-coral" aria-hidden />
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-cobalt" aria-hidden />
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-yellow" aria-hidden />
            <span className="ml-2">Count Club · Weekly Edition № 001</span>
          </div>
          <nav aria-label="Primary">
            <ul className="flex flex-wrap items-center justify-end gap-2">
              {["Cost", "Modules", "Method", "Rates"].map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase()}`}
                    className="ink-rule inline-flex items-center justify-center rounded-full bg-paper px-4 py-2 label-tech transition-colors hover:bg-ink hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* HERO — huge wordmark + mascot sticker */}
      <section className="relative">
        <div className="mx-auto max-w-[1400px] px-5 pt-10 pb-6 md:pt-16 md:pb-8">
          <div className="relative">
            {/* Tiny corner labels */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 label-tech">
              <span>Ink 01 · Coral</span>
              <span>Ink 02 · Cobalt</span>
              <span>Ink 03 · Yellow</span>
              <span>Ink 04 · Leaf</span>
              <span>Ink 05 · Hot Pink</span>
            </div>

            <div className="relative">
              {/* Wordmark */}
              <h1
                className="font-display uppercase leading-[0.82] tracking-[-0.02em]"
                style={{ fontSize: "clamp(5rem, 22vw, 20rem)" }}
              >
                <span className="relative block">
                  {/* offset cobalt ghost for overprint effect */}
                  <span aria-hidden className="absolute left-[0.06em] top-[0.045em] text-cobalt/90 select-none">Count</span>
                  <span className="relative">Count</span>
                </span>
                <span className="relative block">
                  <span aria-hidden className="absolute left-[0.06em] top-[0.045em] text-coral/90 select-none">Club</span>
                  <span className="relative">Club</span>
                </span>
              </h1>

              {/* Mascot sticker overlapping upper-right */}
              <div className="pointer-events-none absolute -top-4 right-0 w-[38%] max-w-[520px] min-w-[180px] md:-top-6 md:right-2">
                <img
                  src={mascot}
                  alt="Count Club mascot: a friendly stock-count receipt walking with a calculator and a small crate of produce"
                  width={1024}
                  height={1024}
                  className="h-auto w-full select-none"
                  draggable={false}
                />
              </div>
            </div>

            {/* Strapline row */}
            <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
              <p className="font-display text-3xl uppercase leading-none md:text-5xl">
                <span className="mr-2 inline-block h-3 w-3 rounded-full bg-ink align-middle" aria-hidden />
                Stock <span className="text-coral">&</span> waste <span className="text-cobalt">people</span>
                <span className="ml-2 inline-block h-3 w-3 rounded-full bg-ink align-middle" aria-hidden />
              </p>
              <span className="label-tech">Est. Tuesday · Uncoated 90gsm</span>
            </div>
          </div>
        </div>

        {/* Coral marquee band, full bleed */}
        <div className="relative overflow-hidden border-y-[3px] border-ink bg-coral text-paper">
          <div className="cc-marquee-track flex w-max whitespace-nowrap py-3 font-display text-2xl uppercase tracking-wide md:text-3xl">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center gap-6 pr-6" aria-hidden={i === 1 ? true : undefined}>
                <span>Weekly stock</span><Spark />
                <span>Waste log</span><Spark />
                <span>Labour vs sales</span><Spark />
                <span>One page a week</span><Spark />
                <span>Independent kitchens</span><Spark />
                <span>Count once</span><Spark />
              </div>
            ))}
          </div>
        </div>

        {/* Intro + CTAs on paper */}
        <div className="mx-auto max-w-[1400px] px-5 py-14 md:py-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-2">
              <div className="label-tech">Count Sheet</div>
              <div className="mt-2 font-display text-6xl leading-none text-cobalt">01</div>
            </div>
            <div className="md:col-span-7">
              <p className="font-display text-3xl uppercase leading-[1.05] md:text-5xl">
                You count once a week. We do the variance, the waste and the labour against sales, then hand you back one page that says <span className="bg-yellow px-1">where the money went</span>.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#book"
                  className="ink-rule-thick inline-flex items-center bg-ink px-6 py-3 font-display uppercase text-paper transition-colors hover:bg-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
                >
                  Book a chat →
                </a>
                <a
                  href="#rates"
                  className="ink-rule-thick inline-flex items-center bg-paper px-6 py-3 font-display uppercase transition-colors hover:bg-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
                >
                  See the prices
                </a>
              </div>
            </div>
            <div className="md:col-span-3">
              <StampNote />
            </div>
          </div>
        </div>
      </section>

      {/* COST — full bleed cobalt band */}
      <section id="cost" className="relative overflow-hidden border-y-[3px] border-ink bg-cobalt text-paper">
        <BandLabels left="Week 29" right="Ink 02 · Cobalt" />
        <HalftoneCorner tone="light" position="tr" />
        <div className="mx-auto max-w-[1400px] px-5 py-16 md:py-24">
          <SectionHeader kicker="§ 01" title="Cost" caption="What it costs to not know." light />
          <div className="grid grid-cols-1 divide-y-[3px] divide-ink border-[3px] border-ink md:grid-cols-3 md:divide-x-[3px] md:divide-y-0">
            <StatCell n="4–8%" label="Typical unseen food variance per week." bg="bg-yellow" fg="text-ink" />
            <StatCell n="1 HR" label="Time you spend on the count. That's it." bg="bg-paper" fg="text-ink" />
            <StatCell n="1 PG" label="What lands in your inbox every Tuesday." bg="bg-hotpink" fg="text-ink" />
          </div>
          <div className="relative mt-8 grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end">
            <p className="max-w-2xl text-base leading-relaxed md:col-span-8 md:text-lg">
              Most independents lose more each month to drift than a bookkeeper costs a year. Count Club is the smallest possible fix: one weekly rhythm, one page, one honest number.
            </p>
            <div className="pointer-events-none relative md:col-span-4 md:justify-self-end">
              <img
                src={mascotPencil}
                alt=""
                aria-hidden
                width={1024}
                height={1024}
                loading="lazy"
                className="mx-auto h-auto w-[180px] select-none md:w-[220px]"
                draggable={false}
              />
              <span className="absolute -left-2 top-2 ink-rule bg-paper px-2 py-0.5 label-tech text-ink">Fig. A · Counter</span>
            </div>
          </div>
        </div>
      </section>

      {/* MODULES — hot pink band with pill-tab interaction */}
      <ModulesSection />


      {/* METHOD — yellow band with big steps */}
      <section id="method" className="relative overflow-hidden border-b-[3px] border-ink bg-yellow text-ink">
        <BandLabels left="Run 03" right="Ink 03 · Acid Yellow" />
        <HalftoneCorner tone="dark" position="bl" />
        <img
          src={mascotBox}
          alt=""
          aria-hidden
          width={1024}
          height={1024}
          loading="lazy"
          className="pointer-events-none absolute right-4 top-6 hidden h-auto w-[180px] -rotate-[8deg] select-none md:block md:w-[220px] lg:w-[260px]"
          draggable={false}
        />
        <div className="mx-auto max-w-[1400px] px-5 py-16 md:py-24">
          <SectionHeader kicker="§ 03" title="Method" caption="Three steps. Nothing to install." />
          <div className="grid grid-cols-1 border-[3px] border-ink md:grid-cols-3 md:divide-x-[3px] md:divide-ink">
            {steps.map((s, i) => (
              <div key={s.n} className={`relative aspect-square p-6 ${i < steps.length - 1 ? "border-b-[3px] border-ink md:border-b-0" : ""}`}>
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <span className="label-tech">Step {s.n}</span>
                    <ComicStar />
                  </div>
                  <span className="mt-2 font-display leading-[0.8] text-cobalt" style={{ fontSize: "clamp(4rem, 10vw, 8rem)" }}>{s.n}</span>
                  <h3 className="mt-4 font-display text-2xl uppercase leading-tight md:text-3xl">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed md:text-base">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RATES — leaf green band */}
      <section id="rates" className="relative overflow-hidden border-b-[3px] border-ink bg-leaf text-ink">
        <BandLabels left="Sheet A4" right="Ink 04 · Leaf" />
        <img
          src={mascotWave}
          alt=""
          aria-hidden
          width={1024}
          height={1024}
          loading="lazy"
          className="pointer-events-none absolute -bottom-4 right-2 hidden h-auto w-[160px] rotate-[4deg] select-none md:block md:w-[210px]"
          draggable={false}
        />
        <div className="mx-auto max-w-[1400px] px-5 py-16 md:py-24">
          <SectionHeader kicker="§ 04" title="Rates" caption="Monthly. Cancel any Tuesday." />
          <div className="grid grid-cols-1 border-[3px] border-ink md:grid-cols-3 md:divide-x-[3px] md:divide-ink">
            {rates.map((r, i) => (
              <div
                key={r.name}
                className={[
                  "relative aspect-square p-6",
                  i < rates.length - 1 ? "border-b-[3px] border-ink md:border-b-0" : "",
                  r.featured ? "bg-ink text-paper" : "bg-paper",
                ].join(" ")}
              >
                {r.featured && (
                  <span className="absolute -top-3 left-4 ink-rule bg-coral px-2 py-0.5 label-tech text-paper">Most kitchens</span>
                )}
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-2xl uppercase">{r.name}</h3>
                  <span className="label-tech opacity-80">Plan</span>
                </div>
                <div className="mt-6">
                  <span className="font-display leading-none" style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}>{r.price}</span>
                  <div className="mt-1 label-tech opacity-80">{r.unit}</div>
                </div>
                <ul className="mt-6 space-y-2 text-sm">
                  {r.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className={`mt-1 inline-block h-2 w-2 shrink-0 ${r.featured ? "bg-yellow" : "bg-coral"}`} aria-hidden />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#book"
                  className={[
                    "ink-rule mt-6 inline-flex items-center px-4 py-2 font-display uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt",
                    r.featured ? "bg-paper text-ink hover:bg-yellow" : "bg-ink text-paper hover:bg-coral",
                  ].join(" ")}
                >
                  Book a chat
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="book" className="bg-ink text-paper">
        <div className="mx-auto max-w-[1400px] px-5 py-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-8">
              <div className="label-tech text-paper/70">Colophon</div>
              <p
                className="mt-3 font-display uppercase leading-[0.85]"
                style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
              >
                <span className="block">Count</span>
                <span className="block text-coral">Club.</span>
              </p>
              <p className="mt-6 max-w-xl text-paper/85">
                Stock &amp; waste people for independent restaurants. One weekly count in, one printed-quality page back.
              </p>
            </div>
            <div className="md:col-span-4">
              <div className="ink-rule-thick border-paper bg-paper p-5 text-ink">
                <div className="label-tech">Contact</div>
                <div className="mt-3 font-display text-2xl uppercase">hello@countclub.co</div>
                <div className="mt-4 label-tech">Hours</div>
                <div className="mt-1">Mon–Fri · 09:00–17:00</div>
                <a
                  href="mailto:hello@countclub.co"
                  className="ink-rule mt-5 inline-flex items-center bg-ink px-4 py-2 font-display uppercase text-paper transition-colors hover:bg-coral"
                >
                  Book a chat →
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-2 border-t-[2px] border-paper/30 pt-4 label-tech text-paper/70">
            <span>© {new Date().getFullYear()} Count Club</span>
            <span>Set in Archivo Black &amp; Inter · Printed digitally on uncoated stock</span>
            <span>№ 001 · Weekly Edition</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ——— Small parts ——— */

function ModulesSection() {
  const [active, setActive] = useState(0);
  const m = modules[active];
  const tones = [
    { bg: "bg-yellow", dot: "bg-coral" },
    { bg: "bg-paper", dot: "bg-cobalt" },
    { bg: "bg-leaf", dot: "bg-ink" },
    { bg: "bg-coral", dot: "bg-ink" },
    { bg: "bg-cobalt", dot: "bg-yellow" },
    { bg: "bg-paper", dot: "bg-hotpink" },
    { bg: "bg-yellow", dot: "bg-cobalt" },
  ];
  const tone = tones[active];
  return (
    <section id="modules" className="relative overflow-hidden border-b-[3px] border-ink bg-hotpink text-ink">
      <BandLabels left="Plate 07" right="Ink 05 · Hot Pink" />
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:py-24">
        <SectionHeader kicker="§ 02" title="Seven modules" caption="Pick a pill. Or take the lot." />

        {/* Pill tabs */}
        <div role="tablist" aria-label="Modules" className="mb-10 flex flex-wrap items-center gap-3">
          {modules.map((mod, i) => {
            const isActive = i === active;
            return (
              <button
                key={mod.n}
                role="tab"
                aria-selected={isActive}
                aria-controls={`module-panel-${mod.n}`}
                id={`module-tab-${mod.n}`}
                onClick={() => setActive(i)}
                className={[
                  "ink-rule-thick inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-display uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt",
                  isActive
                    ? "bg-yellow text-ink"
                    : "bg-paper text-ink hover:bg-ink hover:text-paper",
                ].join(" ")}
              >
                <span className="label-tech opacity-80">{mod.n}</span>
                <span className="text-sm md:text-base">{mod.name}</span>
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div
          key={m.n}
          role="tabpanel"
          id={`module-panel-${m.n}`}
          aria-labelledby={`module-tab-${m.n}`}
          className={`ink-rule-thick relative grid grid-cols-1 md:grid-cols-12 ${tone.bg}`}
        >
          <div className="relative md:col-span-8 p-6 md:p-10 md:border-r-[3px] md:border-ink">
            <div className="flex items-center justify-between label-tech">
              <span>Module № {m.n}</span>
              <span className="inline-flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${tone.dot}`} aria-hidden />
                Now printing
              </span>
            </div>
            <h3
              className="mt-5 font-display uppercase leading-[0.85]"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
            >
              {m.name}
            </h3>
            <p className="mt-6 max-w-xl text-base leading-relaxed md:text-lg">{m.note}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#book"
                className="ink-rule inline-flex items-center bg-ink px-4 py-2 font-display uppercase text-paper transition-colors hover:bg-coral"
              >
                Add this module →
              </a>
              <button
                onClick={() => setActive((active + 1) % modules.length)}
                className="ink-rule inline-flex items-center bg-paper px-4 py-2 font-display uppercase transition-colors hover:bg-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
              >
                Next module
              </button>
            </div>
          </div>

          <div className="relative md:col-span-4 p-6 md:p-8 border-t-[3px] md:border-t-0 border-ink">
            <div className="flex items-center justify-between label-tech">
              <span>Plate {String(active + 1).padStart(2, "0")} / 07</span>
              <ComicStar />
            </div>
            <div
              className="relative mt-4 font-display leading-[0.8] text-ink/90"
              style={{ fontSize: "clamp(5rem, 14vw, 11rem)" }}
              aria-hidden
            >
              {m.n}
              <img
                src={mascotCup}
                alt=""
                aria-hidden
                width={1024}
                height={1024}
                loading="lazy"
                className="pointer-events-none absolute -right-2 -top-4 h-auto w-[110px] rotate-[6deg] select-none md:w-[150px]"
                draggable={false}
              />
            </div>
            <ul className="mt-4 space-y-1.5 font-mono text-xs">
              {modules.map((mm, i) => (
                <li
                  key={mm.n}
                  className={`flex items-center justify-between border-b border-dashed border-ink/40 py-1 ${i === active ? "font-bold" : "opacity-60"}`}
                >
                  <span>{mm.n} · {mm.name}</span>
                  <span>{i === active ? "◆" : "·"}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* corner sticker */}
          <div aria-hidden className="pointer-events-none absolute -top-3 -right-3 h-14 w-14 rounded-full bg-coral ink-rule-thick flex items-center justify-center font-display text-paper">
            {m.n}
          </div>
        </div>
      </div>
    </section>
  );
}



function SectionHeader({ kicker, title, caption, light }: { kicker: string; title: string; caption: string; light?: boolean }) {
  return (
    <div className="mb-8 flex flex-col gap-3 md:mb-12 md:flex-row md:items-end md:justify-between">
      <div>
        <div className={`label-tech ${light ? "text-paper/80" : ""}`}>{kicker}</div>
        <h2
          className="mt-2 font-display uppercase leading-[0.85] tracking-tight"
          style={{ fontSize: "clamp(2.75rem, 9vw, 7rem)" }}
        >
          {title}
        </h2>
      </div>
      <div className={`max-w-sm label-tech md:text-right ${light ? "text-paper/80" : ""}`}>{caption}</div>
    </div>
  );
}

function StatCell({ n, label, bg, fg }: { n: string; label: string; bg: string; fg: string }) {
  return (
    <div className={`relative aspect-square ${bg} ${fg} p-6`}>
      <div className="flex h-full flex-col justify-between">
        <div className="flex items-center justify-between label-tech">
          <span>Fig.</span>
          <ComicStar />
        </div>
        <div>
          <div className="font-display leading-none" style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}>{n}</div>
          <p className="mt-3 max-w-[24ch] text-sm leading-snug md:text-base">{label}</p>
        </div>
      </div>
    </div>
  );
}

function BandLabels({ left, right }: { left: string; right: string }) {
  return (
    <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 pt-4 label-tech opacity-90">
      <span>◆ {left}</span>
      <span>{right} ◆</span>
    </div>
  );
}

function HalftoneCorner({ tone, position }: { tone: "dark" | "light"; position: "tr" | "bl" }) {
  const pos = position === "tr" ? "right-0 top-0" : "left-0 bottom-0";
  const cls = tone === "dark" ? "halftone-dark" : "halftone-light";
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute ${pos} h-56 w-56 ${cls} opacity-70`}
      style={{
        maskImage: position === "tr"
          ? "radial-gradient(circle at top right, black 40%, transparent 70%)"
          : "radial-gradient(circle at bottom left, black 40%, transparent 70%)",
        WebkitMaskImage: position === "tr"
          ? "radial-gradient(circle at top right, black 40%, transparent 70%)"
          : "radial-gradient(circle at bottom left, black 40%, transparent 70%)",
      }}
    />
  );
}

function Spark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden className="shrink-0">
      <path d="M12 1 L14 10 L23 12 L14 14 L12 23 L10 14 L1 12 L10 10 Z" fill="currentColor" />
    </svg>
  );
}

function ComicStar() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 2 L14 8 L20 8 L15 12 L17 18 L12 14.5 L7 18 L9 12 L4 8 L10 8 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StampNote() {
  return (
    <div className="relative ink-rule-thick bg-paper p-4">
      <div className="flex items-center justify-between label-tech">
        <span>Count Sheet</span>
        <span>Wk 29</span>
      </div>
      <div className="mt-3 space-y-1.5 font-mono text-xs">
        <Row a="Variance" b="−£214" />
        <Row a="Waste" b="£86" />
        <Row a="Labour %" b="31.4" />
        <Row a="Food GP" b="68.2%" />
      </div>
      <div className="mt-3 flex items-center justify-between border-t-2 border-ink pt-2 label-tech">
        <span>Signed</span>
        <span className="font-display text-lg lowercase italic text-coral">count club</span>
      </div>
      <div aria-hidden className="pointer-events-none absolute -right-3 -top-3 h-10 w-10 rounded-full bg-coral ink-rule flex items-center justify-center label-tech text-paper">
        №1
      </div>
    </div>
  );
}

function Row({ a, b }: { a: string; b: string }) {
  return (
    <div className="flex items-center justify-between border-b border-dashed border-ink/50 py-1">
      <span>{a}</span>
      <span className="font-bold">{b}</span>
    </div>
  );
}

