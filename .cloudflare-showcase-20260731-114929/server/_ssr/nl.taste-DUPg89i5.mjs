import { i as __toESM } from "../_runtime.mjs";
import { h as require_react, m as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as money, n as CATEGORIES, o as SEASON, t as BRAND } from "./data-CDB2DGpz.mjs";
import { i as useReveal, r as useGroups, t as img } from "./parts-EjDB_ZGf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/nl.taste-DUPg89i5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Taste() {
	useReveal();
	const [filter, setFilter] = (0, import_react.useState)("all");
	const groups = useGroups(filter);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nlt min-h-dvh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
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
      ` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main",
				className: "absolute left-[-9999px] z-50 bg-[var(--accent)] px-4 py-2 text-[var(--accent-ink)] focus:left-4 focus:top-4",
				children: "Skip to content"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--bg)]/90 backdrop-blur",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-[68px] max-w-[1280px] items-center gap-4 px-5 sm:px-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold tracking-[-0.03em]",
							children: BRAND
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[0.66rem] uppercase tracking-[0.18em] text-[var(--muted)]",
							children: SEASON
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex-1" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#list",
							className: "inline-flex min-h-11 items-center rounded-full bg-[var(--accent)] px-5 text-[0.78rem] font-semibold text-[var(--accent-ink)]",
							children: "Shop the collection"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				id: "main",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mx-auto grid max-w-[1280px] items-center gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-24",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "m-0 max-w-[15ch] text-[clamp(2.2rem,5.4vw,3.9rem)] font-bold leading-[1.04] tracking-[-0.03em]",
								children: "A new uniform for everyday motion"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-5 max-w-[52ch] text-[1.08rem] leading-[1.6] text-[var(--muted)]",
								children: [24, " pieces, one clear point of view. Each one is made after you order it, so nothing sits in a warehouse waiting to be marked down."]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-7 flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#list",
									className: "inline-flex min-h-11 items-center rounded-full bg-[var(--accent)] px-5 text-[0.82rem] font-semibold text-[var(--accent-ink)]",
									children: "Shop the collection"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#how",
									className: "inline-flex min-h-11 items-center rounded-full border border-[var(--line)] px-5 text-[0.82rem] font-semibold",
									children: "How it works"
								})]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figure", {
							className: "m-0 overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: img("northline-taste-campaign-portrait", 900, 1125),
								alt: "A model wearing the overshirt and wide trouser.",
								width: 900,
								height: 1125,
								className: "aspect-[4/5] w-full object-cover"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						id: "list",
						className: "mx-auto max-w-[1280px] px-5 sm:px-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2 border-y border-[var(--line)] py-5",
							children: ["all", ...CATEGORIES.map((c) => c.id)].map((f) => {
								const on = filter === f;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setFilter(f),
									"aria-pressed": on,
									className: `min-h-11 rounded-full border px-4 text-[0.8rem] font-semibold transition-colors duration-[170ms] ${on ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)]" : "border-[var(--line)] text-[var(--muted)]"}`,
									children: f === "all" ? "All" : CATEGORIES.find((c) => c.id === f).label
								}, f);
							})
						})
					}),
					groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: g.id,
						className: "mx-auto max-w-[1280px] px-5 py-16 sm:px-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rv",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "m-0 max-w-[20ch] text-[clamp(1.5rem,3vw,2.3rem)] font-bold tracking-[-0.025em]",
								children: g.heading
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 max-w-[58ch] leading-[1.6] text-[var(--muted)]",
								children: g.statement
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-9 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-6",
							children: g.pieces.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: `rv ${i % 5 === 0 ? "col-span-2 lg:col-span-4" : "col-span-1 lg:col-span-2"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "overflow-hidden bg-[var(--raised)]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: img(p.img, 900, i % 5 === 0 ? 600 : 1125),
											alt: p.name,
											width: 900,
											height: i % 5 === 0 ? 600 : 1125,
											loading: "lazy",
											className: `w-full object-cover transition-transform duration-300 hover:scale-[1.03] ${i % 5 === 0 ? "aspect-[3/2]" : "aspect-[4/5]"}`
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex items-baseline justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-[0.98rem] font-semibold",
											children: p.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[0.9rem] text-[var(--muted)]",
											children: money(p.price)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1.5 text-[0.9rem] leading-[1.55] text-[var(--muted)]",
										children: p.story
									})
								]
							}, p.id))
						})]
					}, g.id)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						id: "how",
						className: "border-y border-[var(--line)] bg-[var(--raised)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto max-w-[1280px] px-5 py-16 sm:px-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "rv m-0 max-w-[20ch] text-[clamp(1.5rem,3vw,2.3rem)] font-bold tracking-[-0.025em]",
								children: "Nothing is made until you order it"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-8 grid gap-8 md:grid-cols-3",
								children: [
									["The edition opens", "Pieces go up together. You see the full run at once."],
									["You order your size", "The order goes to the maker, not to a shelf."],
									["It ships direct", "It leaves the maker and comes to you. Slower, and cheaper for it."]
								].map(([t, b]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rv border-t border-[var(--line)] pt-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-[1rem] font-semibold",
										children: t
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-[0.95rem] leading-[1.6] text-[var(--muted)]",
										children: b
									})]
								}, t))
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "mx-auto max-w-[1280px] px-5 py-12 sm:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "m-0 font-bold tracking-[-0.03em]",
					children: BRAND
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-[0.66rem] uppercase tracking-[0.16em] text-[var(--muted)]",
					children: "taste · variance 5, motion 3, density 3 · light and dark from one token set"
				})]
			})
		]
	});
}
//#endregion
export { Taste as component };
