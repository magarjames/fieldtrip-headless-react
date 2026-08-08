import { m as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { a as PIECES, i as FITS, r as DROP, s as money, t as BRAND } from "./data-pfKPmX5L.mjs";
import { n as shot, r as shotFor, t as ChibiHero } from "./Chibi-CT_1b5HX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/FigureShop-B1ekYK3N.js
var import_jsx_runtime = require_jsx_runtime();
function FigureShop({ version, vrmUrls, note }) {
	const byId = (id) => PIECES.find((p) => p.id === id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fs min-h-dvh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        .fs{
          --ink:#141317; --paper:#FBF7EF; --dim:#a49fad; --hair:rgba(251,247,239,0.18);
          --pop:#F5C518;
          background:var(--ink); color:var(--paper);
          font-family:Archivo,"Helvetica Neue",sans-serif;
        }
        .fs h1,.fs h2,.fs h3{ font-family:"Archivo Black",Archivo,sans-serif; margin:0;
          letter-spacing:-0.045em; line-height:0.9; text-transform:uppercase }
        .fs p{ margin:0; line-height:1.55 }
        .fs a{ color:inherit; text-decoration:none }
        .fs :focus-visible{ outline:3px solid var(--paper); outline-offset:2px }
        .fs .lbl{ font-family:"JetBrains Mono",monospace; font-size:0.66rem;
          text-transform:uppercase; letter-spacing:0.14em }
        .fs .shell{ max-width:1560px; margin-inline:auto; padding-inline:clamp(1rem,4vw,2.25rem) }
        /* the chips ChibiHero renders, restyled for the dark stage */
        .fs .chip{ display:inline-flex; align-items:center; min-height:44px; padding:0 1.05rem;
          border-radius:999px; border:2px solid var(--paper); font-weight:700; font-size:0.82rem;
          background:transparent; color:var(--paper); cursor:pointer;
          transition:background .18s, color .18s }
        .fs .chip[aria-pressed="true"],.fs .chip:hover{ background:var(--paper); color:var(--ink) }
        @media (prefers-reduced-motion:reduce){
          .fs *{ animation:none !important; transition-duration:.01ms !important }
        }
      ` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#stage",
				className: "chip absolute left-[-9999px] z-50 focus:left-4 focus:top-4",
				style: {
					background: "var(--paper)",
					color: "var(--ink)"
				},
				children: "Skip to the figures"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "shell flex items-center gap-4 py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[1.15rem] font-black tracking-[-0.05em]",
						children: BRAND
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "lbl hidden sm:inline",
						style: { color: "var(--dim)" },
						children: [
							DROP,
							" · The Figure Shop · ",
							version
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex-1" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/s",
						className: "chip",
						children: "v1 shop"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "shell pb-6 pt-10 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "lbl",
						style: { color: "var(--dim)" },
						children: [
							DROP,
							" · three figures · ",
							PIECES.length,
							" pieces"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mx-auto mt-4 max-w-[14ch] text-[clamp(2.6rem,8.5vw,7.5rem)]",
						children: "The drop, in hand"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-5 max-w-[52ch] text-[1.02rem]",
						style: { color: "var(--dim)" },
						children: "Every fit in the collection, cast as a collectible figure. Turn one toward the light, tap to change what it is wearing, then break the look down into pieces below."
					}),
					note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "lbl mx-auto mt-4 max-w-[70ch]",
						style: { color: "var(--dim)" },
						children: note
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "stage",
				className: "shell pb-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-2",
					style: { borderColor: "var(--hair)" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChibiHero, {
						fallbackSrc: shot("ft-hero", 900, 1200),
						vrmUrls,
						layout: "stage"
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "shell py-16 sm:py-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "max-w-[18ch] text-[clamp(1.9rem,5.4vw,4rem)]",
					children: "The full set"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-8 md:grid-cols-3",
					children: FITS.map((f, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "border-2 p-5",
						style: { borderColor: "var(--hair)" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "lbl",
								style: { color: "var(--dim)" },
								children: [
									"Figure ",
									String(idx + 1).padStart(2, "0"),
									" · ",
									f.place
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 text-[1.6rem]",
								children: f.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-[0.95rem]",
								style: { color: "var(--dim)" },
								children: f.note
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-4 flex list-none flex-wrap gap-1.5 p-0",
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
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: shotFor({
									img: f.img,
									name: f.name,
									hue: byId(f.pieces[0])?.hue
								}, 800, 500),
								alt: `${f.name}: ${f.note}`,
								width: 800,
								height: 500,
								loading: "lazy",
								className: "mt-5 aspect-[8/5] w-full border object-cover",
								style: { borderColor: "var(--hair)" }
							})
						]
					}, f.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "grid",
				className: "shell pb-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-baseline justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-[clamp(1.9rem,5.4vw,4rem)]",
						children: "The pieces"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "lbl",
						style: { color: "var(--dim)" },
						children: [PIECES.length, " shown"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 lg:grid-cols-4",
					children: PIECES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "#grid",
						className: "block",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-hidden border-2 p-2",
								style: { borderColor: "var(--hair)" },
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
					}) }, p.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t-2",
				style: { borderColor: "var(--hair)" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "shell py-14",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[clamp(3rem,17vw,14rem)] font-black uppercase leading-[0.8] tracking-[-0.06em]",
						children: BRAND
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "lbl mt-6 max-w-[70ch]",
						style: { color: "var(--dim)" },
						children: [
							"The Figure Shop · ",
							version,
							" · sculpted figures rendered live, one per fit. Original generated models; no real person or likeness depicted."
						]
					})]
				})
			})
		]
	});
}
//#endregion
export { FigureShop as t };
