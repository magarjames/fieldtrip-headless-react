import { i as __toESM } from "../_runtime.mjs";
import { h as require_react, m as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { i as useReveal } from "./parts-EjDB_ZGf.mjs";
import { a as PIECES, i as FITS, n as CATS, o as TAGLINE, r as DROP, s as money, t as BRAND } from "./data-pfKPmX5L.mjs";
import { n as shot, r as shotFor, t as ChibiHero } from "./Chibi-CT_1b5HX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/s.index-C5tLKRST.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Fieldtrip() {
	useReveal();
	const [cat, setCat] = (0, import_react.useState)("all");
	const shown = cat === "all" ? PIECES : PIECES.filter((p) => p.cat === cat);
	const byId = (id) => PIECES.find((p) => p.id === id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "ft min-h-dvh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        .ft{
          --paper:#FBF7EF; --ink:#141317; --dim:#565462; --hair:rgba(20,19,23,0.16);
          --pop:#F5C518; --pop-ink:#141317;
          background:var(--paper); color:var(--ink);
          font-family:Archivo,"Helvetica Neue",sans-serif;
        }
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
        @media (prefers-reduced-motion:reduce){
          .ft *{ animation:none !important; transition-duration:.01ms !important }
          .ft .rv{ opacity:1; transform:none }
        }
      ` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#fits",
				className: "btn absolute left-[-9999px] z-50 focus:left-4 focus:top-4",
				children: "Skip to the fits"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "shell flex items-center gap-4 py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[1.15rem] font-black tracking-[-0.05em]",
						children: BRAND
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "lbl hidden sm:inline",
						style: { color: "var(--dim)" },
						children: DROP
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex-1" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "#grid",
						className: "btn",
						children: ["Shop ", 18]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "shell grid items-end gap-8 pb-10 pt-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-[clamp(2.9rem,7.5vw,10rem)]",
							children: TAGLINE
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-6 max-w-[46ch] text-[1.05rem]",
							style: { color: "var(--dim)" },
							children: [18, " pieces built to be layered, not admired one at a time. Wide bottoms, boxy tops, and enough colour to ruin a capsule wardrobe."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-7 flex flex-wrap gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#fits",
								className: "btn",
								children: "See the fits"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#grid",
								className: "chip",
								children: "Every piece"
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChibiHero, { fallbackSrc: shot("ft-hero", 900, 1200) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden border-y-2 py-2.5",
				style: {
					borderColor: "var(--ink)",
					background: "var(--pop)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "ticker lbl",
					"aria-hidden": true,
					children: Array.from({ length: 2 }).flatMap((_, r) => [
						"Free returns for 30 days",
						"Ships worldwide",
						`${DROP} out now`,
						"Nothing restocked",
						"Cut wide on purpose"
					].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [t, " ✱"] }, `${r}-${t}`)))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "fits",
				className: "shell py-16 sm:py-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "max-w-[16ch] text-[clamp(1.9rem,5.4vw,4rem)]",
					children: "Three fits, eighteen pieces"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-8 lg:grid-cols-3",
					children: FITS.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rv",
						style: { ["--index"]: i },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative overflow-hidden border-2",
								style: { borderColor: "var(--ink)" },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: shotFor({
										img: f.img,
										name: f.name,
										hue: byId(f.pieces[0])?.hue
									}, 800, 1420),
									alt: `${f.name}: ${f.note}`,
									width: 800,
									height: 1420,
									loading: "lazy",
									className: "aspect-[9/16] w-full object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "lbl absolute left-0 top-0 px-2.5 py-1.5 font-bold",
									style: {
										background: "var(--ink)",
										color: "var(--paper)"
									},
									children: f.place
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 text-[1.6rem]",
								children: f.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-[0.95rem]",
								style: { color: "var(--dim)" },
								children: f.note
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-3 flex list-none flex-wrap gap-1.5 p-0",
								children: f.pieces.map((pid) => {
									const p = byId(pid);
									if (!p) return null;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: "#grid",
										className: "lbl inline-flex min-h-11 items-center rounded-full border px-3",
										style: { borderColor: "var(--hair)" },
										children: [
											p.name,
											" · ",
											money(p.price)
										]
									}) }, pid);
								})
							})
						]
					}, f.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "grid",
				className: "shell pb-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-baseline justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-[clamp(1.9rem,5.4vw,4rem)]",
							children: "Everything"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "lbl",
							style: { color: "var(--dim)" },
							children: [shown.length, " shown"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 flex flex-wrap gap-2",
						role: "group",
						"aria-label": "Filter by category",
						children: ["all", ...CATS.map((c) => c.id)].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "chip",
							"aria-pressed": cat === c,
							onClick: () => setCat(c),
							children: c === "all" ? "Everything" : CATS.find((x) => x.id === c).label
						}, c))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 lg:grid-cols-4",
						children: shown.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
							className: "card rv",
							style: { ["--hue"]: p.hue },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "#grid",
								className: "block",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "plate overflow-hidden border-2 p-2",
										style: { borderColor: "var(--ink)" },
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: shotFor(p, 800, p.crop === "reel" ? 1420 : 800),
											alt: p.name,
											width: 800,
											height: p.crop === "reel" ? 1420 : 800,
											loading: "lazy",
											className: `w-full object-cover ${p.crop === "reel" ? "aspect-[9/16]" : "aspect-square"}`
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex items-baseline justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-[1rem]",
											children: p.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "lbl",
											style: { fontVariantNumeric: "tabular-nums" },
											children: money(p.price)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1.5 text-[0.88rem]",
										style: { color: "var(--dim)" },
										children: p.line
									})
								]
							})
						}, p.id))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t-2",
				style: { borderColor: "var(--ink)" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "shell py-14",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[clamp(3rem,17vw,14rem)] font-black uppercase leading-[0.8] tracking-[-0.06em]",
						children: BRAND
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "lbl mt-6 max-w-[70ch]",
						style: { color: "var(--dim)" },
						children: "Bright build · fits before garments · 9:16 crops · colour carried per piece. All imagery generated original. No third-party photography or likeness."
					})]
				})
			})
		]
	});
}
//#endregion
export { Fieldtrip as component };
