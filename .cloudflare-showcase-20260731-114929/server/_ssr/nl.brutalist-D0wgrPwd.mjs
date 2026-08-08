import { m as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { a as PIECES, c as money, o as SEASON, t as BRAND } from "./data-CDB2DGpz.mjs";
import { i as useReveal, r as useGroups, t as img } from "./parts-EjDB_ZGf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/nl.brutalist-D0wgrPwd.js
var import_jsx_runtime = require_jsx_runtime();
var PAPER = "#F4F4F0";
var INK = "#050505";
var REV = "REV 2.6";
var UNIT = "UNIT / D-01";
function Rule() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "my-0 h-px w-full border-0 bg-[#050505]" });
}
function Cross({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"aria-hidden": true,
		className: `pointer-events-none absolute font-mono text-[0.7rem] leading-none text-[#E61919] ${className}`,
		children: "+"
	});
}
function Brutalist() {
	useReveal();
	const groups = useGroups();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh",
		style: {
			background: PAPER,
			color: INK,
			fontFamily: "Archivo, sans-serif"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				"aria-hidden": true,
				className: "pointer-events-none fixed inset-0 z-40 h-full w-full opacity-[0.055] mix-blend-multiply",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("filter", {
					id: "nl-b-grain",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feTurbulence", {
						type: "fractalNoise",
						baseFrequency: "0.9",
						numOctaves: "3",
						stitchTiles: "stitch"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					width: "100%",
					height: "100%",
					filter: "url(#nl-b-grain)"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: "#manifest",
				className: "absolute left-[-9999px] z-50 bg-[#050505] px-4 py-2 font-mono text-[0.75rem] uppercase tracking-[0.1em] text-white focus:left-4 focus:top-4",
				children: [">>>", " Skip to manifest"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rule, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-[1720px] grid-cols-2 items-center gap-x-6 px-4 py-3 font-mono text-[0.68rem] uppercase leading-[1.3] tracking-[0.1em] sm:grid-cols-4 sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("samp", { children: UNIT }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("samp", {
							className: "text-right sm:text-left",
							children: REV
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("samp", {
							className: "hidden sm:block",
							children: [SEASON, " MANIFEST"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("samp", {
							className: "hidden text-right sm:block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "inline-block bg-[#E61919] px-2 py-1 text-white",
								children: "OPEN"
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rule, {})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative overflow-hidden border-b-2 border-[#050505]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cross, { className: "left-4 top-4" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cross, { className: "right-4 top-4" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-[1720px] px-4 pb-10 pt-12 sm:px-6 sm:pb-16 sm:pt-20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "m-0 uppercase",
							style: {
								fontFamily: "\"Archivo Black\", Archivo, sans-serif",
								fontSize: "clamp(3.4rem, 13.4vw, 15rem)",
								lineHeight: .85,
								letterSpacing: "-0.055em"
							},
							children: [BRAND, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "align-super text-[0.28em] tracking-normal",
								children: "®"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 grid gap-y-6 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-x-10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "m-0 max-w-[58ch] font-mono text-[0.82rem] uppercase leading-[1.45] tracking-[0.06em]",
								children: [24, " units. Cut against confirmed orders only. No held stock, no forecast, no markdown cycle. The list below is the whole operation."]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "#manifest",
								className: "inline-flex min-h-11 items-center justify-center bg-[#E61919] px-6 font-mono text-[0.8rem] uppercase tracking-[0.12em] text-white",
								children: [">>>", " Read manifest"]
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				"aria-label": "Operating parameters",
				className: "bg-[#050505]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "mx-auto grid max-w-[1720px] grid-cols-2 gap-px sm:grid-cols-4",
					children: [
						["UNITS / EDITION", String(24)],
						["LEAD TIME / DAYS", "10—14"],
						["HELD STOCK", "0"],
						["MARKDOWN EVENTS", "0"]
					].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-[#F4F4F0] px-4 py-6 sm:px-6 sm:py-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "font-mono text-[0.62rem] uppercase leading-[1.3] tracking-[0.12em]",
							children: k
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "m-0 mt-3 uppercase",
							style: {
								fontFamily: "\"Archivo Black\", Archivo, sans-serif",
								fontSize: "clamp(2.2rem, 6vw, 4.4rem)",
								lineHeight: .88,
								letterSpacing: "-0.045em"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("data", {
								value: v,
								children: v
							})
						})]
					}, k))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "manifest",
				children: groups.map((g, gi) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					id: g.id,
					className: "relative overflow-hidden border-t-2 border-[#050505]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						className: "pointer-events-none absolute -left-[0.09em] top-[-0.12em] select-none uppercase text-[#050505]/[0.07]",
						style: {
							fontFamily: "\"Archivo Black\", Archivo, sans-serif",
							fontSize: "clamp(9rem, 30vw, 26rem)",
							lineHeight: .75,
							letterSpacing: "-0.06em"
						},
						children: String(gi + 1).padStart(2, "0")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto max-w-[1720px] px-4 py-14 sm:px-6 sm:py-24",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "m-0 font-mono text-[0.66rem] uppercase tracking-[0.14em]",
								children: [
									"[ SECTION ",
									String(gi + 1).padStart(2, "0"),
									" ] /// ",
									g.pieces.length,
									" UNITS"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-4 max-w-[16ch] uppercase",
								style: {
									fontFamily: "\"Archivo Black\", Archivo, sans-serif",
									fontSize: "clamp(2.1rem, 7vw, 5.6rem)",
									lineHeight: .88,
									letterSpacing: "-0.05em"
								},
								children: g.heading
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 max-w-[62ch] font-mono text-[0.8rem] uppercase leading-[1.5] tracking-[0.05em]",
								children: g.statement
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-12 grid gap-px bg-[#050505] sm:grid-cols-2 lg:grid-cols-3",
								children: g.pieces.map((p) => {
									const n = PIECES.findIndex((x) => x.id === p.id) + 1;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
										className: "rv bg-[#F4F4F0] opacity-0 transition-opacity duration-500 [&.in]:opacity-100",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative aspect-[4/5] overflow-hidden",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: img(p.img, 780, 975),
													alt: p.name,
													width: 780,
													height: 975,
													loading: "lazy",
													className: "h-full w-full object-cover [filter:grayscale(1)_contrast(1.35)_brightness(1.04)]"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"aria-hidden": true,
													className: "pointer-events-none absolute inset-0 mix-blend-multiply opacity-60",
													style: {
														backgroundImage: "radial-gradient(#050505 34%, transparent 35%), radial-gradient(#050505 34%, transparent 35%)",
														backgroundSize: "4px 4px",
														backgroundPosition: "0 0, 2px 2px"
													}
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("output", {
													className: "absolute left-0 top-0 bg-[#E61919] px-2 py-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-white",
													children: ["U-", String(n).padStart(2, "0")]
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "border-t-2 border-[#050505] p-4 sm:p-5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "m-0 text-[0.95rem] font-bold uppercase leading-[1.15] tracking-[-0.01em]",
													children: p.name
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
													className: "mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 font-mono text-[0.66rem] uppercase tracking-[0.08em]",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
															className: "opacity-60",
															children: "PRICE"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
															className: "m-0 text-right font-bold",
															children: money(p.price)
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
															className: "opacity-60",
															children: "LEAD"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
															className: "m-0 text-right",
															children: (p.detail.match(/\d+ to \d+ days/)?.[0] ?? "10 to 14 days").toUpperCase()
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
															className: "opacity-60",
															children: "SIZES"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
															className: "m-0 text-right",
															children: p.sizes.join(" / ")
														})
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-4 border-t border-[#050505]/25 pt-3 font-mono text-[0.68rem] uppercase leading-[1.45] tracking-[0.04em]",
													children: p.story
												})
											]
										})]
									}, p.id);
								})
							})
						]
					})]
				}, g.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "h-8 border-y-2 border-[#050505]",
				style: { backgroundImage: "repeating-linear-gradient(45deg, #E61919 0 14px, #F4F4F0 14px 28px)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t-2 border-[#050505]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-[1720px] px-4 py-12 sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "m-0 uppercase",
							style: {
								fontFamily: "\"Archivo Black\", Archivo, sans-serif",
								fontSize: "clamp(2.4rem, 9vw, 8rem)",
								lineHeight: .85,
								letterSpacing: "-0.055em"
							},
							children: [BRAND, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "align-super text-[0.28em] tracking-normal",
								children: "™"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 grid gap-px bg-[#050505] sm:grid-cols-3",
							children: [
								["ARCHETYPE", "SWISS INDUSTRIAL PRINT"],
								["SUBSTRATE", "F4F4F0 / 050505 / E61919"],
								["GEOMETRY", "0PX RADIUS THROUGHOUT"]
							].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-[#F4F4F0] px-4 py-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "m-0 font-mono text-[0.62rem] uppercase tracking-[0.12em] opacity-60",
									children: k
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "m-0 mt-1.5 font-mono text-[0.72rem] uppercase tracking-[0.08em]",
									children: v
								})]
							}, k))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-8 font-mono text-[0.62rem] uppercase tracking-[0.12em] opacity-60",
							children: [
								"© ",
								BRAND,
								"® ",
								UNIT,
								" ",
								REV,
								" \\\\\\ END OF MANIFEST"
							]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { Brutalist as component };
