import { m as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as money, i as JOURNAL, o as SEASON, t as BRAND } from "./data-CDB2DGpz.mjs";
import { i as useReveal, r as useGroups, t as img } from "./parts-EjDB_ZGf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/nl.gallery-BQuzil4Z.js
var import_jsx_runtime = require_jsx_runtime();
function Monogram() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"aria-label": BRAND,
		className: "inline-grid h-8 w-8 place-items-center rounded-full border-[1.5px] border-[var(--ink)]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-serif text-[16px] leading-none",
			children: BRAND[0]
		})
	});
}
function Hex({ filled = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 12 12",
		"aria-hidden": true,
		className: "shrink-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M6 .9l4.4 2.55v5.1L6 11.1 1.6 8.55v-5.1z",
			fill: filled ? "currentColor" : "none",
			stroke: "currentColor",
			strokeWidth: "1"
		})
	});
}
function Corners({ left, right, dark = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex items-baseline justify-between text-[12px] uppercase tracking-[0.08em] ${dark ? "text-[var(--paper)]/70" : "text-[var(--graphite)]"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: left }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: right })]
	});
}
function Gallery() {
	useReveal();
	const groups = useGroups();
	const all = groups.flatMap((g) => g.pieces);
	const vignettes = all.slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nlg min-h-dvh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
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
      ` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#edition",
				className: "r-link absolute left-[-9999px] z-50 bg-[var(--ink)] px-4 py-2 text-[var(--paper)] focus:left-4 focus:top-4",
				children: "Skip to the edition"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between px-5 py-4 sm:px-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monogram, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#notes",
					className: "link-underline t-label",
					children: "Field notes"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "overflow-hidden pt-[60px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-5 text-center sm:px-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "t-heading-lg mx-auto max-w-[18ch]",
							children: [
								"Real cloth, ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
									className: "font-normal italic",
									children: "made"
								}),
								" to order"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-[28px] flex flex-wrap items-baseline justify-center gap-x-[28px] gap-y-[16px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "t-stat",
								children: ["PIECES: ", 24]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "t-stat",
								children: "LEAD: 10 TO 14 DAYS"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#edition",
							className: "r-pill mt-[28px] inline-flex min-h-11 items-center bg-[var(--ink)] px-[17px] text-[12px] text-[var(--paper)]",
							children: "View the edition"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-[52px] flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "t-display select-none",
						"aria-hidden": true,
						children: BRAND
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: img("northline-gallery-classical-landscape-panel", 2200, 1200),
					alt: "",
					width: 2200,
					height: 1200,
					className: "oil h-[70vh] w-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 grid place-items-center p-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "notched relative aspect-square w-[min(400px,78vw)] bg-[var(--ink)] p-[24px] text-[var(--paper)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "t-label text-[var(--ink-muted)]",
								children: [
									"The ",
									SEASON,
									" Edition"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "t-heading-sm mt-[16px] max-w-[14ch]",
								children: "Nothing is cut until the order lands."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "t-body absolute bottom-[52px] left-[24px] right-[24px] text-[var(--ink-muted)]",
								children: [24, " pieces, released together and not reprinted."]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								className: "t-micro absolute bottom-[24px] left-[24px] text-[var(--paper)]",
								children: "Scroll"
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-[var(--ink)] py-[96px] text-[var(--paper)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-5 sm:px-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Corners, {
							left: `Fig. 01 to ${String(vignettes.length).padStart(2, "0")}`,
							right: "Still life",
							dark: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "t-section mt-[32px] text-center",
							children: "THE WINTER ROOM"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-[96px] grid gap-[52px] sm:grid-cols-3 sm:gap-[28px]",
							children: vignettes.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "rv flex flex-col items-center text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "t-subheading max-w-[16ch]",
										children: p.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-[20px] aspect-square w-[200px] max-w-[62vw] overflow-hidden rounded-full bg-[var(--ash)]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: img(p.img, 600, 600),
											alt: p.name,
											width: 600,
											height: 600,
											loading: "lazy",
											className: "oil h-full w-full object-cover"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-[20px] flex gap-[6px] text-[var(--paper)]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hex, { filled: true }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hex, {}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hex, {})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "t-body mt-[16px] max-w-[34ch] text-[var(--ink-muted)]",
										children: p.story
									})
								]
							}, p.id))
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				id: "edition",
				className: "py-[96px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-5 sm:px-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Corners, {
						left: `${all.length} works`,
						right: `${SEASON} ${(/* @__PURE__ */ new Date()).getFullYear()}`
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "t-section mt-[32px] text-center",
						children: "THE EDITION"
					})]
				}), groups.map((g, gi) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					id: g.id,
					className: "mt-[96px] px-5 sm:px-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rv flex flex-wrap items-baseline justify-between gap-x-[32px] gap-y-[16px] border-b border-[var(--vellum)] pb-[20px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "t-heading max-w-[20ch]",
								children: g.heading
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "t-body max-w-[46ch] text-[var(--putty-muted)]",
								children: g.statement
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "t-label text-[var(--putty-muted)]",
								children: ["Room ", String(gi + 1).padStart(2, "0")]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-[40px] grid grid-cols-2 gap-[16px] lg:grid-cols-4",
						children: g.pieces.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "rv r-card bg-[var(--bone)] p-[24px]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "r-card overflow-hidden bg-[var(--ash)]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: img(p.img, 700, 875),
										alt: p.name,
										width: 700,
										height: 875,
										loading: "lazy",
										className: "oil aspect-[4/5] w-full object-cover"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "t-subheading mt-[20px]",
									children: p.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "t-body mt-[6px] text-[var(--graphite)]",
									children: p.story
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-[20px] flex items-baseline justify-between gap-[16px] border-t border-[var(--vellum)] pt-[16px]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "t-stat",
										children: money(p.price)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "t-label text-[var(--graphite)]",
										children: p.sizes.join(" ")
									})]
								})
							]
						}, p.id))
					})]
				}, g.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "notes",
				className: "bg-[var(--ink)] py-[96px] text-[var(--paper)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-5 sm:px-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Corners, {
							left: "Wall labels",
							right: "Field notes",
							dark: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "t-section mt-[32px] text-center",
							children: "ON MAKING LESS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-[96px] grid gap-[52px] sm:grid-cols-3 sm:gap-[28px]",
							children: JOURNAL.map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "rv border-t border-[var(--paper)]/25 pt-[20px]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "t-label text-[var(--ink-muted)]",
										children: j.kicker
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "t-heading-sm mt-[16px] max-w-[20ch]",
										children: j.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "t-body mt-[16px] text-[var(--ink-muted)]",
										children: j.body
									})
								]
							}, j.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-[96px] flex justify-center gap-[6px] text-[var(--paper)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hex, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hex, { filled: true }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hex, {})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "bg-[var(--chalk)] px-5 py-[60px] sm:px-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-[28px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monogram, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#edition",
							className: "link-underline t-label",
							children: "Return to the edition"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "t-heading-lg mt-[52px] max-w-[16ch]",
						children: [
							"Bought once, ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: "font-normal italic",
								children: "worn"
							}),
							" for years."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "t-body mt-[20px] max-w-[52ch] text-[var(--putty-muted)]",
						children: "All imagery on this page is placeholder. Original brand copy and invented product names, for a store that does not exist yet."
					})
				]
			})
		]
	});
}
//#endregion
export { Gallery as component };
