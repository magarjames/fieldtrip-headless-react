import { m as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as money, i as JOURNAL, o as SEASON, t as BRAND } from "./data-CDB2DGpz.mjs";
import { i as useReveal, r as useGroups, t as img } from "./parts-EjDB_ZGf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/nl.minimal-D2kxt-bG.js
var import_jsx_runtime = require_jsx_runtime();
var FAQ = [
	["When does the edition close?", "It closes when the last size is spoken for, and it is not reprinted. Nothing carries over into the next season."],
	["How long does an order take?", "Ten to fourteen days from the moment you order. Every piece is cut after the order lands, not before."],
	["What happens if the fit is wrong?", "Return it within thirty days. Made to order does not mean final sale, and the return is paid for."],
	["Why is there no sale?", "Nothing is overproduced, so there is nothing to clear. The price you see in week one is the price in week twelve."]
];
function Minimal() {
	useReveal();
	const groups = useGroups();
	const featured = groups[0]?.pieces[0];
	const rest = groups.flatMap((g) => g.pieces).filter((p) => p.id !== featured?.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nlm min-h-dvh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        .nlm{
          --canvas:#FBFBFA; --surface:#FFFFFF; --shell:#F4F3F0;
          --ink:#2F3437; --muted:#6B6A66; --line:#EAEAEA;
          --pale-green:#EDF3EC; --deep-green:#346538;
          --ease:cubic-bezier(0.32,0.72,0,1);
          background:var(--canvas); color:var(--ink);
          font-family:Archivo,"Geist Sans","Switzer",sans-serif;
        }
        /* the global h1,h2,h3 rule sets Archivo Black; the editorial serif has
           to win it back with element specificity */
        .nlm h1,.nlm h2,.nlm h3{
          font-family:"Instrument Serif","Newsreader","Lyon Text",Georgia,serif;
          font-weight:400; letter-spacing:-0.025em; line-height:1.1;
        }
        .nlm p{ line-height:1.6 }
        .nlm :focus-visible{ outline:2px solid var(--ink); outline-offset:3px }

        /* high-end scroll interpolation: heavier than a plain fade, and the
           blur is what makes it read as mass rather than opacity */
        .nlm .rv{ opacity:0; transform:translateY(16px); filter:blur(6px);
          transition:opacity .8s var(--ease), transform .8s var(--ease), filter .8s var(--ease);
          transition-delay:calc(var(--index,0) * 80ms) }
        .nlm .rv.in{ opacity:1; transform:none; filter:none }

        /* ambient drift: fixed layer only, never on a scrolling container */
        @keyframes nlm-drift{
          0%{ transform:translate3d(-6%,-4%,0) scale(1) }
          50%{ transform:translate3d(6%,4%,0) scale(1.12) }
          100%{ transform:translate3d(-6%,-4%,0) scale(1) }
        }
        .nlm-amb{ animation:nlm-drift 26s ease-in-out infinite }

        .nlm details > summary{ list-style:none; cursor:pointer }
        .nlm details > summary::-webkit-details-marker{ display:none }
        .nlm details .plus::after{ content:"+" }
        .nlm details[open] .plus::after{ content:"−" }

        @media (prefers-reduced-motion:reduce){
          .nlm *{ animation:none !important; transition-duration:.01ms !important }
          .nlm .rv{ opacity:1; transform:none; filter:none }
        }
      ` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none fixed inset-0 z-0 overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "nlm-amb absolute left-1/2 top-[-18vh] h-[70vh] w-[70vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,#C9BFA8_0%,transparent_66%)] opacity-[0.16]" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				"aria-hidden": true,
				className: "pointer-events-none fixed inset-0 z-0 h-full w-full opacity-[0.035]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("filter", {
					id: "nlm-grain",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feTurbulence", {
						type: "fractalNoise",
						baseFrequency: "0.8",
						numOctaves: "4",
						stitchTiles: "stitch"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					width: "100%",
					height: "100%",
					filter: "url(#nlm-grain)"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main",
				className: "absolute left-[-9999px] z-50 rounded-[6px] bg-[#111111] px-4 py-2 text-white focus:left-4 focus:top-4",
				children: "Skip to content"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-30 px-4 pt-4 sm:px-6 sm:pt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-5xl items-center gap-4 rounded-[12px] border border-[var(--line)] bg-[var(--surface)]/85 px-4 py-2.5 backdrop-blur-xl sm:px-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[0.95rem] font-semibold tracking-[-0.02em]",
							children: BRAND
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "hidden font-mono text-[0.68rem] uppercase tracking-[0.08em] text-[var(--muted)] sm:inline",
							children: [SEASON, " Edition"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex-1" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "hidden items-center gap-2 font-mono text-[0.68rem] text-[var(--muted)] md:inline-flex",
							children: ["Jump to sizing", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
								className: "rounded-[4px] border border-[var(--line)] bg-[var(--shell)] px-1.5 py-0.5 font-mono text-[0.66rem] text-[var(--ink)]",
								children: "S"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "#pieces",
							className: "group inline-flex min-h-11 items-center gap-2.5 rounded-[6px] bg-[#111111] pl-4 pr-1.5 text-[0.82rem] font-medium text-white transition-colors duration-200 [transition-timing-function:var(--ease)] hover:bg-[#333333] active:scale-[0.98]",
							children: ["Shop the edition", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex h-8 w-8 items-center justify-center rounded-[4px] bg-white/10 transition-transform duration-300 [transition-timing-function:var(--ease)] group-hover:-translate-y-px group-hover:translate-x-1 group-hover:scale-105",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									width: "12",
									height: "12",
									viewBox: "0 0 12 12",
									fill: "none",
									"aria-hidden": true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8",
										stroke: "currentColor",
										strokeWidth: "1.1",
										strokeLinecap: "round"
									})
								})
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				id: "main",
				className: "relative z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mx-auto max-w-5xl px-4 py-24 sm:px-6 sm:py-32",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rv inline-block rounded-full bg-[var(--pale-green)] px-3 py-1 font-mono text-[0.66rem] uppercase tracking-[0.05em] text-[var(--deep-green)]",
								children: "Made to order"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "rv mt-6 max-w-[16ch] text-[clamp(2.8rem,7.4vw,5.4rem)]",
								style: { ["--index"]: 1 },
								children: "Twenty four pieces, and nothing waiting in a warehouse."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "rv mt-6 max-w-[58ch] text-[1.06rem] text-[var(--muted)]",
								style: { ["--index"]: 2 },
								children: [
									"The ",
									SEASON,
									" edition is ",
									24,
									" garments cut after you order them. It opens once, closes when the sizes run out, and is not reprinted."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rv mt-9 flex flex-wrap items-center gap-3",
								style: { ["--index"]: 3 },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "#pieces",
									className: "group inline-flex min-h-11 items-center gap-2.5 rounded-[6px] bg-[#111111] pl-5 pr-1.5 text-[0.88rem] font-medium text-white transition-colors duration-200 [transition-timing-function:var(--ease)] hover:bg-[#333333] active:scale-[0.98]",
									children: [
										"See all ",
										24,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex h-8 w-8 items-center justify-center rounded-[4px] bg-white/10 transition-transform duration-300 [transition-timing-function:var(--ease)] group-hover:-translate-y-px group-hover:translate-x-1 group-hover:scale-105",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
												width: "12",
												height: "12",
												viewBox: "0 0 12 12",
												fill: "none",
												"aria-hidden": true,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
													d: "M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8",
													stroke: "currentColor",
													strokeWidth: "1.1",
													strokeLinecap: "round"
												})
											})
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#faq",
									className: "inline-flex min-h-11 items-center rounded-[6px] border border-[var(--line)] bg-[var(--surface)] px-5 text-[0.88rem] font-medium transition-colors duration-200 hover:bg-[var(--shell)] active:scale-[0.98]",
									children: "How it works"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						id: "pieces",
						className: "mx-auto max-w-5xl px-4 pb-24 sm:px-6 sm:pb-32",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 gap-6 md:grid-cols-12",
							children: [featured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
								className: "rv rounded-[14px] border border-[var(--line)] bg-[var(--shell)] p-1.5 transition-shadow duration-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] md:col-span-7 md:row-span-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "overflow-hidden rounded-[8px] bg-[var(--surface)]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: img(featured.img, 1100, 760),
										alt: featured.name,
										width: 1100,
										height: 760,
										className: "aspect-[3/2] w-full object-cover opacity-95"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-6 sm:p-10",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "m-0 font-mono text-[0.66rem] uppercase tracking-[0.08em] text-[var(--muted)]",
												children: "Piece 01"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
												className: "mt-3 text-[clamp(1.7rem,3.4vw,2.6rem)]",
												children: featured.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-3 max-w-[46ch] text-[0.98rem] text-[var(--muted)]",
												children: featured.detail
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-5 font-mono text-[0.9rem]",
												children: money(featured.price)
											})
										]
									})]
								})
							}), JOURNAL.slice(0, 2).map((j, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
								className: "rv rounded-[14px] border border-[var(--line)] bg-[var(--shell)] p-1.5 transition-shadow duration-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] md:col-span-5",
								style: { ["--index"]: i + 1 },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "h-full rounded-[8px] bg-[var(--surface)] p-6 sm:p-8",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "m-0 font-mono text-[0.66rem] uppercase tracking-[0.08em] text-[var(--muted)]",
											children: j.kicker
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-3 text-[1.4rem]",
											children: j.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 text-[0.95rem] text-[var(--muted)]",
											children: j.body
										})
									]
								})
							}, j.id))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mx-auto max-w-5xl px-4 pb-24 sm:px-6 sm:pb-32",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "rv max-w-[18ch] text-[clamp(1.9rem,4.4vw,3.1rem)]",
							children: [
								"The rest of the ",
								SEASON.toLowerCase(),
								" edition"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-12 grid grid-cols-2 gap-6 lg:grid-cols-3",
							children: rest.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
								className: "rv group rounded-[14px] border border-[var(--line)] bg-[var(--shell)] p-1.5 transition-shadow duration-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
								style: { ["--index"]: i % 3 },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "overflow-hidden rounded-[8px] bg-[var(--surface)]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "overflow-hidden",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: img(p.img, 720, 900),
											alt: p.name,
											width: 720,
											height: 900,
											loading: "lazy",
											className: "aspect-[4/5] w-full object-cover opacity-95 transition-transform duration-700 [transition-timing-function:var(--ease)] group-hover:scale-[1.04]"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "m-0 text-[1.05rem]",
												children: p.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 text-[0.88rem] text-[var(--muted)]",
												children: p.story
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-4 font-mono text-[0.82rem]",
												children: money(p.price)
											})
										]
									})]
								})
							}, p.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "faq",
						className: "mx-auto max-w-4xl px-4 pb-24 sm:px-6 sm:pb-32",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "rv text-[clamp(1.9rem,4.4vw,3.1rem)]",
							children: "Before you order"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10",
							children: FAQ.map(([q, a], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
								className: "rv border-b border-[var(--line)]",
								style: { ["--index"]: i },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
									className: "flex min-h-11 items-center justify-between gap-6 py-5 text-[1.02rem] font-medium",
									children: [q, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"aria-hidden": true,
										className: "plus shrink-0 font-mono text-[1.1rem] leading-none text-[var(--muted)]"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "m-0 max-w-[62ch] pb-6 text-[0.95rem] text-[var(--muted)]",
									children: a
								})]
							}, q))
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "relative z-10 border-t border-[var(--line)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-5xl flex-wrap items-baseline gap-x-6 gap-y-3 px-4 py-12 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[0.95rem] font-semibold tracking-[-0.02em]",
						children: BRAND
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[0.68rem] uppercase tracking-[0.08em] text-[var(--muted)]",
						children: "minimalist substrate, high-end choreography"
					})]
				})
			})
		]
	});
}
//#endregion
export { Minimal as component };
