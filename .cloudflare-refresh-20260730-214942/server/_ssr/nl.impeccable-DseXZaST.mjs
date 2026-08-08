import { m as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as money, o as SEASON, t as BRAND } from "./data-CDB2DGpz.mjs";
import { i as useReveal, r as useGroups, t as img } from "./parts-EjDB_ZGf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/nl.impeccable-DseXZaST.js
var import_jsx_runtime = require_jsx_runtime();
function Impeccable() {
	useReveal();
	const groups = useGroups();
	const all = groups.flatMap((g) => g.pieces);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-[#1d2417] text-[#f0eee4] [font-family:Archivo,sans-serif]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main",
				className: "absolute left-[-9999px] z-50 bg-[#f0eee4] px-4 py-2 text-[#1d2417] focus:left-4 focus:top-4",
				children: "Skip to content"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "border-b border-[#f0eee4]/15",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-[1680px] items-center gap-4 px-6 py-5 sm:px-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-black tracking-[-0.04em]",
							children: BRAND
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex-1" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[0.66rem] uppercase tracking-[0.2em] opacity-65",
							children: [
								"The ",
								SEASON,
								" Edition"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#list",
							className: "inline-flex min-h-11 items-center rounded-full border border-[#f0eee4] bg-[#f0eee4] px-5 text-[0.8rem] font-bold text-[#1d2417]",
							children: "Shop"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				id: "main",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mx-auto max-w-[1680px] px-6 pb-16 pt-20 sm:px-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "m-0 max-w-[13ch] text-[clamp(3rem,10.5vw,9rem)] font-black uppercase leading-[0.84] tracking-[-0.05em]",
								children: "Cloth first"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-8 max-w-[62ch] text-[1.06rem] leading-[1.6] opacity-80",
								children: [24, " pieces, each made after it is ordered. Below is the whole edition as a bill of materials: what it is made from, how long it takes, what it costs. The photographs are further down."]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#list",
								className: "mt-9 inline-flex min-h-11 items-center rounded-full bg-[#c2502e] px-6 text-[0.8rem] font-bold uppercase tracking-[0.14em] text-[#f0eee4]",
								children: "Read the list"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						id: "list",
						className: "mx-auto max-w-[1680px] px-6 pb-24 sm:px-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rv opacity-0 transition-opacity duration-700 [&.in]:opacity-100",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full border-collapse text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
									className: "border-b-2 border-[#f0eee4]",
									children: [
										"No.",
										"Piece",
										"Cloth",
										"Lead",
										"Price"
									].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-3 pr-4 text-[0.62rem] font-normal uppercase tracking-[0.2em] opacity-60",
										children: h
									}, h))
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: all.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-b border-[#f0eee4]/15 align-top",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-4 pr-4 font-mono text-[0.68rem] tracking-[0.12em] text-[#e08a63]",
											children: String(i + 1).padStart(2, "0")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "py-4 pr-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[1.02rem] font-bold tracking-[-0.02em]",
												children: p.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mt-1 block max-w-[52ch] text-[0.92rem] leading-[1.6] opacity-65",
												children: p.story
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "hidden py-4 pr-4 text-[0.86rem] opacity-70 md:table-cell",
											children: [p.detail.split(".")[0], "."]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "whitespace-nowrap py-4 pr-4 font-mono text-[0.72rem] opacity-70",
											children: p.detail.match(/\d+ to \d+ days/)?.[0] ?? "10 to 14 days"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "whitespace-nowrap py-4 text-right font-black tracking-[-0.03em]",
											children: money(p.price)
										})
									]
								}, p.id)) })]
							})
						})
					}),
					groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						id: g.id,
						className: "rv border-t border-[#f0eee4]/15 opacity-0 transition-opacity duration-700 [&.in]:opacity-100",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto max-w-[1680px] px-6 py-20 sm:px-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "m-0 max-w-[18ch] text-[clamp(1.9rem,4.4vw,3.4rem)] font-black uppercase leading-[0.9] tracking-[-0.04em]",
									children: g.heading
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 max-w-[62ch] leading-[1.6] opacity-75",
									children: g.statement
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3",
									children: g.pieces.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "aspect-[4/5] overflow-hidden bg-[#151b11]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: img(p.img, 760, 950),
											alt: p.name,
											width: 760,
											height: 950,
											loading: "lazy",
											className: "h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 flex items-baseline justify-between gap-4 border-t border-[#f0eee4]/20 pt-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-[1rem] font-bold tracking-[-0.02em]",
											children: p.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-[0.8rem] text-[#e08a63]",
											children: money(p.price)
										})]
									})] }, p.id))
								})
							]
						})
					}, g.id))
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-[#f0eee4]/15",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-[1680px] px-6 py-12 sm:px-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "m-0 text-[clamp(2rem,6vw,4.6rem)] font-black uppercase leading-[0.85] tracking-[-0.05em]",
						children: BRAND
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 font-mono text-[0.64rem] uppercase tracking-[0.18em] opacity-55",
						children: "impeccable · specification field · drenched colour strategy"
					})]
				})
			})
		]
	});
}
//#endregion
export { Impeccable as component };
