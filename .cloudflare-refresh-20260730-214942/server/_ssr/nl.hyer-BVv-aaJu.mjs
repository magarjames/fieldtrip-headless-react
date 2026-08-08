import { m as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as money, i as JOURNAL, o as SEASON, r as COLLECTION_WORD, t as BRAND } from "./data-CDB2DGpz.mjs";
import { i as useReveal, r as useGroups, t as img } from "./parts-EjDB_ZGf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/nl.hyer-BVv-aaJu.js
var import_jsx_runtime = require_jsx_runtime();
function Hyer() {
	useReveal();
	const all = useGroups().flatMap((g) => g.pieces);
	const clay = all[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nlh min-h-dvh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        .nlh{
          --deep-ink:#000d10; --pure-white:#ffffff; --cool-ash:#8e8e95;
          --ash-body:#6f6f77;          /* darkened for AA at 18px */
          --pebble:#d5d3d4; --midnight-hull:#0f0f1c; --charcoal-deck:#151623;
          --clay-ember:#bc7155;
          --page:1200px; --section-gap:80px; --card-pad:22px; --el-gap:16px;
          --fnt:'HelveticaNowDisplay','Neue Haas Grotesk Display',Inter,'Helvetica Neue',sans-serif;
          background:var(--pure-white); color:var(--deep-ink);
          font-family:var(--fnt);
          font-size:18px; line-height:1.61;   /* the 18/29 signature */
        }
        .nlh h1,.nlh h2,.nlh h3,.nlh h4{ font-family:var(--fnt); font-weight:700; margin:0 }
        .nlh p{ margin:0 }
        .nlh a{ color:inherit; text-decoration:none }
        .nlh :focus-visible{ outline:2px solid var(--deep-ink); outline-offset:3px }

        /* the type scale, clamped down from the reference ceilings */
        .nlh .t-hero{ font-size:clamp(3.6rem,15.6vw,187px); line-height:0.80; letter-spacing:-0.02em }
        .nlh .t-display-xl{ font-size:clamp(3rem,11vw,131px); line-height:1; letter-spacing:-0.02em }
        .nlh .t-display{ font-size:clamp(2.4rem,6.6vw,63px); line-height:1; letter-spacing:-0.02em }
        .nlh .t-heading-lg{ font-size:clamp(2.1rem,5.4vw,52px); line-height:1; letter-spacing:-0.01em }
        .nlh .t-heading{ font-size:clamp(1.8rem,4.2vw,37px); line-height:1; letter-spacing:-0.01em }
        .nlh .t-heading-sm{ font-size:clamp(1.5rem,3.2vw,30px); line-height:1 }
        .nlh .t-subheading{ font-size:23px; line-height:1.1; letter-spacing:-0.01em }
        .nlh .t-nav{ font-size:20px; line-height:1.2 }
        .nlh .t-body{ font-size:18px; line-height:1.61 }
        .nlh .t-caption{ font-size:17px; line-height:1.2 }

        /* pills, panels, icon buttons. No radius anywhere in between. */
        .nlh .pill{ border-radius:1000px }
        .nlh .panel{ border-radius:0 }
        .nlh .icon-btn{ border-radius:100% }

        /* the pale dawn sky: blue at the top, warm cream at the horizon */
        .nlh .sky{
          background:linear-gradient(180deg,#d9e6ef 0%,#e8eef2 42%,#f6f0e6 78%,#ffffff 100%);
        }

        .nlh .rv{ opacity:0; transform:translateY(20px);
          transition:opacity .7s cubic-bezier(0.16,1,0.3,1), transform .7s cubic-bezier(0.16,1,0.3,1) }
        .nlh .rv.in{ opacity:1; transform:none }
        @media (prefers-reduced-motion:reduce){
          .nlh *{ transition-duration:.01ms !important }
          .nlh .rv{ opacity:1; transform:none }
        }
      ` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main",
				className: "pill absolute left-[-9999px] z-50 bg-[var(--deep-ink)] px-[22px] py-[15px] text-white focus:left-4 focus:top-4",
				children: "Skip to content"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sky",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "mx-auto flex max-w-[var(--page)] items-center gap-[var(--el-gap)] px-6 py-[21px]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#pieces",
							className: "t-nav hidden sm:inline",
							children: "The edition"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#made",
							className: "t-nav hidden sm:inline",
							children: "How it is made"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#support",
							className: "t-nav hidden sm:inline",
							children: "Support"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex-1" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Open menu",
							className: "icon-btn grid h-11 w-11 place-items-center bg-[var(--deep-ink)] text-white",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								width: "16",
								height: "12",
								viewBox: "0 0 16 12",
								"aria-hidden": true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M0 1h16M0 6h16M0 11h16",
									stroke: "currentColor",
									strokeWidth: "1.6"
								})
							})
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mx-auto max-w-[var(--page)] px-6 pb-[68px] pt-[34px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid items-end gap-[38px] lg:grid-cols-[1fr_auto]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "t-display-xl",
							children: [BRAND, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "align-super text-[0.3em] leading-none",
								children: "®"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "t-display max-w-[10ch] font-bold lg:text-right",
							children: [
								COLLECTION_WORD,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								SEASON,
								"."
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
						className: "relative mx-auto mt-[52px] max-w-[860px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: img("northline-hyer-hero-product-crop", 1720, 1080),
							alt: "The Ridge Overshirt photographed alone against a pale ground.",
							width: 1720,
							height: 1080,
							className: "panel w-full object-cover mix-blend-multiply"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "#pieces",
							className: "pill absolute bottom-[-22px] right-0 inline-flex min-h-11 items-center border border-[var(--deep-ink)] bg-transparent px-[22px] py-[15px] text-[17px] font-bold text-[var(--deep-ink)] transition-colors duration-300 hover:bg-[var(--deep-ink)] hover:text-white",
							children: ["See all ", 24]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				id: "main",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "made",
						className: "mx-auto max-w-[var(--page)] px-6 py-[var(--section-gap)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto max-w-[760px] text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "rv t-heading-lg max-w-[16ch] ml-auto",
								children: "Nothing is cut until the order lands."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "rv t-body ml-auto mt-[31px] max-w-[62ch] text-[var(--ash-body)]",
								children: [
									"The ",
									SEASON.toLowerCase(),
									" edition is ",
									24,
									" garments made after they are bought. It opens once, closes when the sizes are spoken for, and is not reprinted."
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-[68px] grid gap-x-[80px] gap-y-[52px] md:grid-cols-2",
							children: [
								["Made to order", "Your size is cut after you order it. Ten to fourteen days, every time, with no exceptions bought by paying more."],
								["No held stock", "There is no warehouse behind this page. Nothing is overproduced, so nothing has to be cleared at the end of the season."],
								["One price", "The price in week one is the price in week twelve. There is no sale because there is nothing left over to discount."],
								["Returned freely", "Thirty days, return postage paid. Made to order does not mean you are stuck with a fit that is wrong."]
							].map(([t, b]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rv border-t border-[var(--pebble)] pt-[21px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "t-subheading",
									children: t
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "t-body mt-[16px] text-[var(--ash-body)]",
									children: b
								})]
							}, t))
						})]
					}),
					clay && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "mx-auto max-w-[var(--page)] px-6 pb-[var(--section-gap)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
							className: "panel rv bg-[var(--clay-ember)] px-6 py-[53px] sm:px-[59px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid items-center gap-[38px] lg:grid-cols-[1.1fr_0.9fr]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "t-heading text-white",
										children: clay.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "t-body mt-[21px] max-w-[52ch] text-[var(--deep-ink)]",
										children: clay.detail
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "t-caption mt-[31px] font-bold text-white",
										children: money(clay.price)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#pieces",
										className: "pill mt-[21px] inline-flex min-h-11 items-center bg-[var(--deep-ink)] px-[22px] py-[15px] text-[17px] font-bold text-white",
										children: "Add to the order"
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: img(clay.img, 900, 900),
									alt: clay.name,
									width: 900,
									height: 900,
									loading: "lazy",
									className: "panel aspect-square w-full object-cover"
								})]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "pieces",
						className: "mx-auto max-w-[var(--page)] px-6 pb-[var(--section-gap)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "ml-auto max-w-[760px] text-right",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "rv t-heading ml-auto max-w-[18ch]",
								children: [
									"The ",
									SEASON.toLowerCase(),
									" edition."
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-[52px] grid grid-cols-2 gap-x-[var(--el-gap)] gap-y-[52px] lg:grid-cols-4",
							children: all.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "rv",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: img(p.img, 760, 950),
									alt: p.name,
									width: 760,
									height: 950,
									loading: "lazy",
									className: "panel aspect-[4/5] w-full object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t border-[var(--pebble)] pt-[16px] mt-[21px]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "t-subheading",
											children: p.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "t-body mt-[11px] text-[var(--ash-body)]",
											children: p.story
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "t-body mt-[16px] font-bold",
											children: money(p.price)
										})
									]
								})]
							}, p.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						id: "support",
						className: "bg-[var(--midnight-hull)] text-white",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto max-w-[var(--page)] px-6 py-[var(--section-gap)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ml-auto lg:w-1/2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "rv t-heading",
										children: "Sizing, fit and everything after."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "rv t-body mt-[31px] text-white",
										children: "Every piece ships with the measurements it was cut to, not a generic chart. If the fit is wrong we will tell you which size to try before you pay postage on a second one."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-[38px] flex flex-wrap gap-[var(--el-gap)]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "#pieces",
											className: "pill inline-flex min-h-11 items-center border border-white bg-transparent px-[22px] py-[15px] text-[17px] font-bold text-white transition-colors duration-300 hover:bg-white hover:text-[var(--deep-ink)]",
											children: "Size guide"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "#pieces",
											className: "pill inline-flex min-h-11 items-center bg-white px-[22px] py-[15px] text-[17px] font-bold text-[var(--deep-ink)]",
											children: "Ask a question"
										})]
									})
								]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "bg-[var(--charcoal-deck)] text-white",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto max-w-[var(--page)] px-6 py-[var(--section-gap)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "rv t-heading-sm ml-auto max-w-[20ch] text-right",
								children: "Field notes."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-[52px] grid gap-x-[80px] gap-y-[38px] md:grid-cols-3",
								children: JOURNAL.map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "rv border-t border-white/25 pt-[21px]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "t-caption text-[var(--cool-ash)]",
											children: j.kicker
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "t-subheading mt-[11px]",
											children: j.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "t-body mt-[16px] text-white",
											children: j.body
										})
									]
								}, j.id))
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "bg-[var(--deep-ink)] text-white",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-[var(--page)] px-6 py-[var(--section-gap)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "t-hero font-bold",
							children: [BRAND, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "align-super text-[0.3em] leading-none",
								children: "®"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-[52px] grid gap-[38px] sm:grid-cols-3",
							children: [
								["Shop", [
									"The edition",
									"Sizing",
									"Gift notes"
								]],
								["About", [
									"How it is made",
									"Field notes",
									"Returns"
								]],
								["Contact", [
									"Support",
									"Stockists",
									"Press"
								]]
							].map(([h, links]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "t-caption font-bold",
								children: h
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-[16px] list-none space-y-[13px] p-0",
								children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#main",
									className: "t-nav text-[var(--cool-ash)] transition-colors duration-200 hover:text-white",
									children: l
								}) }, l))
							})] }, h))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "t-caption mt-[68px] text-[var(--cool-ash)]",
							children: [
								"© ",
								BRAND,
								"® ",
								SEASON,
								" edition. DESIGN.md applied literally."
							]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { Hyer as component };
