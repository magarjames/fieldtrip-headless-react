import { i as __toESM } from "../_runtime.mjs";
import { h as require_react, m as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DdFOYGDv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var mascot_default = "/assets/mascot-BiHCRhrh.png";
var mascot_wave_default = "/assets/mascot-wave-BeL1-syi.png";
var mascot_pencil_default = "/assets/mascot-pencil-Dy5Vtk_v.png";
var mascot_box_default = "/assets/mascot-box-DIfz1l8J.png";
var mascot_cup_default = "/assets/mascot-cup-DHz203SX.png";
var modules = [
	{
		n: "01",
		name: "Stock variance",
		note: "Theoretical vs actual, line by line."
	},
	{
		n: "02",
		name: "Waste log",
		note: "Prep, spoilage, staff food, comps."
	},
	{
		n: "03",
		name: "Labour vs sales",
		note: "Hours costed against daypart revenue."
	},
	{
		n: "04",
		name: "GP by category",
		note: "Food, drink, sub-groups, dishes."
	},
	{
		n: "05",
		name: "Menu engineering",
		note: "Stars, plough-horses, dogs."
	},
	{
		n: "06",
		name: "Supplier watch",
		note: "Price creep and short deliveries."
	},
	{
		n: "07",
		name: "The one-pager",
		note: "Where the money went, every week."
	}
];
var steps = [
	{
		n: "I",
		title: "You count",
		body: "Once a week. On paper, on a phone, on a spreadsheet. We take it in whatever shape it arrives."
	},
	{
		n: "II",
		title: "We reconcile",
		body: "Purchases, sales mix, waste and rota hours all get pulled into one place and checked line by line."
	},
	{
		n: "III",
		title: "You read one page",
		body: "A printed-quality report every Tuesday. Variance, waste, labour, and the three things to fix this week."
	}
];
var rates = [
	{
		name: "Single site",
		price: "£420",
		unit: "per month",
		features: [
			"Weekly one-pager",
			"Stock + waste + labour",
			"Email support"
		]
	},
	{
		name: "Small group",
		price: "£340",
		unit: "per site / month",
		features: [
			"2–5 sites",
			"Group roll-up report",
			"Monthly review call"
		],
		featured: true
	},
	{
		name: "Bureau",
		price: "POA",
		unit: "6+ sites",
		features: [
			"Dedicated analyst",
			"Custom modules",
			"On-site quarterly"
		]
	}
];
function Index() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-paper text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 pt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 label-tech",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-block h-2.5 w-2.5 rounded-full bg-coral",
							"aria-hidden": true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-block h-2.5 w-2.5 rounded-full bg-cobalt",
							"aria-hidden": true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-block h-2.5 w-2.5 rounded-full bg-yellow",
							"aria-hidden": true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-2",
							children: "Count Club · Weekly Edition № 001"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					"aria-label": "Primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-wrap items-center justify-end gap-2",
						children: [
							"Cost",
							"Modules",
							"Method",
							"Rates"
						].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `#${l.toLowerCase()}`,
							className: "ink-rule inline-flex items-center justify-center rounded-full bg-paper px-4 py-2 label-tech transition-colors hover:bg-ink hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt",
							children: l
						}) }, l))
					})
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto max-w-[1400px] px-5 pt-10 pb-6 md:pt-16 md:pb-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-4 flex flex-wrap items-center justify-between gap-2 label-tech",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ink 01 · Coral" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ink 02 · Cobalt" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ink 03 · Yellow" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ink 04 · Leaf" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ink 05 · Hot Pink" })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
										className: "font-display uppercase leading-[0.82] tracking-[-0.02em]",
										style: { fontSize: "clamp(5rem, 22vw, 20rem)" },
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "relative block",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"aria-hidden": true,
												className: "absolute left-[0.06em] top-[0.045em] text-cobalt/90 select-none",
												children: "Count"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "relative",
												children: "Count"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "relative block",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"aria-hidden": true,
												className: "absolute left-[0.06em] top-[0.045em] text-coral/90 select-none",
												children: "Club"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "relative",
												children: "Club"
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "pointer-events-none absolute -top-4 right-0 w-[38%] max-w-[520px] min-w-[180px] md:-top-6 md:right-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: mascot_default,
											alt: "Count Club mascot: a friendly stock-count receipt walking with a calculator and a small crate of produce",
											width: 1024,
											height: 1024,
											className: "h-auto w-full select-none",
											draggable: false
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 flex flex-wrap items-end justify-between gap-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-display text-3xl uppercase leading-none md:text-5xl",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mr-2 inline-block h-3 w-3 rounded-full bg-ink align-middle",
												"aria-hidden": true
											}),
											"Stock ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-coral",
												children: "&"
											}),
											" waste ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-cobalt",
												children: "people"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "ml-2 inline-block h-3 w-3 rounded-full bg-ink align-middle",
												"aria-hidden": true
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "label-tech",
										children: "Est. Tuesday · Uncoated 90gsm"
									})]
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative overflow-hidden border-y-[3px] border-ink bg-coral text-paper",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "cc-marquee-track flex w-max whitespace-nowrap py-3 font-display text-2xl uppercase tracking-wide md:text-3xl",
							children: Array.from({ length: 2 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-6 pr-6",
								"aria-hidden": i === 1 ? true : void 0,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Weekly stock" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spark, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Waste log" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spark, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Labour vs sales" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spark, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "One page a week" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spark, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Independent kitchens" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spark, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Count once" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spark, {})
								]
							}, i))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto max-w-[1400px] px-5 py-14 md:py-20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 gap-10 md:grid-cols-12",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "md:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "label-tech",
										children: "Count Sheet"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2 font-display text-6xl leading-none text-cobalt",
										children: "01"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "md:col-span-7",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-display text-3xl uppercase leading-[1.05] md:text-5xl",
										children: [
											"You count once a week. We do the variance, the waste and the labour against sales, then hand you back one page that says ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "bg-yellow px-1",
												children: "where the money went"
											}),
											"."
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-8 flex flex-wrap gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "#book",
											className: "ink-rule-thick inline-flex items-center bg-ink px-6 py-3 font-display uppercase text-paper transition-colors hover:bg-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt",
											children: "Book a chat →"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "#rates",
											className: "ink-rule-thick inline-flex items-center bg-paper px-6 py-3 font-display uppercase transition-colors hover:bg-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt",
											children: "See the prices"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "md:col-span-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StampNote, {})
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "cost",
				className: "relative overflow-hidden border-y-[3px] border-ink bg-cobalt text-paper",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BandLabels, {
						left: "Week 29",
						right: "Ink 02 · Cobalt"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HalftoneCorner, {
						tone: "light",
						position: "tr"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-[1400px] px-5 py-16 md:py-24",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
								kicker: "§ 01",
								title: "Cost",
								caption: "What it costs to not know.",
								light: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 divide-y-[3px] divide-ink border-[3px] border-ink md:grid-cols-3 md:divide-x-[3px] md:divide-y-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCell, {
										n: "4–8%",
										label: "Typical unseen food variance per week.",
										bg: "bg-yellow",
										fg: "text-ink"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCell, {
										n: "1 HR",
										label: "Time you spend on the count. That's it.",
										bg: "bg-paper",
										fg: "text-ink"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCell, {
										n: "1 PG",
										label: "What lands in your inbox every Tuesday.",
										bg: "bg-hotpink",
										fg: "text-ink"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative mt-8 grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "max-w-2xl text-base leading-relaxed md:col-span-8 md:text-lg",
									children: "Most independents lose more each month to drift than a bookkeeper costs a year. Count Club is the smallest possible fix: one weekly rhythm, one page, one honest number."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pointer-events-none relative md:col-span-4 md:justify-self-end",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: mascot_pencil_default,
										alt: "",
										"aria-hidden": true,
										width: 1024,
										height: 1024,
										loading: "lazy",
										className: "mx-auto h-auto w-[180px] select-none md:w-[220px]",
										draggable: false
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -left-2 top-2 ink-rule bg-paper px-2 py-0.5 label-tech text-ink",
										children: "Fig. A · Counter"
									})]
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModulesSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "method",
				className: "relative overflow-hidden border-b-[3px] border-ink bg-yellow text-ink",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BandLabels, {
						left: "Run 03",
						right: "Ink 03 · Acid Yellow"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HalftoneCorner, {
						tone: "dark",
						position: "bl"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: mascot_box_default,
						alt: "",
						"aria-hidden": true,
						width: 1024,
						height: 1024,
						loading: "lazy",
						className: "pointer-events-none absolute right-4 top-6 hidden h-auto w-[180px] -rotate-[8deg] select-none md:block md:w-[220px] lg:w-[260px]",
						draggable: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-[1400px] px-5 py-16 md:py-24",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
							kicker: "§ 03",
							title: "Method",
							caption: "Three steps. Nothing to install."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 border-[3px] border-ink md:grid-cols-3 md:divide-x-[3px] md:divide-ink",
							children: steps.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `relative aspect-square p-6 ${i < steps.length - 1 ? "border-b-[3px] border-ink md:border-b-0" : ""}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex h-full flex-col",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "label-tech",
												children: ["Step ", s.n]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComicStar, {})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-2 font-display leading-[0.8] text-cobalt",
											style: { fontSize: "clamp(4rem, 10vw, 8rem)" },
											children: s.n
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-4 font-display text-2xl uppercase leading-tight md:text-3xl",
											children: s.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 text-sm leading-relaxed md:text-base",
											children: s.body
										})
									]
								})
							}, s.n))
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "rates",
				className: "relative overflow-hidden border-b-[3px] border-ink bg-leaf text-ink",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BandLabels, {
						left: "Sheet A4",
						right: "Ink 04 · Leaf"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: mascot_wave_default,
						alt: "",
						"aria-hidden": true,
						width: 1024,
						height: 1024,
						loading: "lazy",
						className: "pointer-events-none absolute -bottom-4 right-2 hidden h-auto w-[160px] rotate-[4deg] select-none md:block md:w-[210px]",
						draggable: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-[1400px] px-5 py-16 md:py-24",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
							kicker: "§ 04",
							title: "Rates",
							caption: "Monthly. Cancel any Tuesday."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 border-[3px] border-ink md:grid-cols-3 md:divide-x-[3px] md:divide-ink",
							children: rates.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: [
									"relative aspect-square p-6",
									i < rates.length - 1 ? "border-b-[3px] border-ink md:border-b-0" : "",
									r.featured ? "bg-ink text-paper" : "bg-paper"
								].join(" "),
								children: [
									r.featured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -top-3 left-4 ink-rule bg-coral px-2 py-0.5 label-tech text-paper",
										children: "Most kitchens"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-baseline justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-display text-2xl uppercase",
											children: r.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "label-tech opacity-80",
											children: "Plan"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-display leading-none",
											style: { fontSize: "clamp(3rem, 7vw, 5.5rem)" },
											children: r.price
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-1 label-tech opacity-80",
											children: r.unit
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-6 space-y-2 text-sm",
										children: r.features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex items-start gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `mt-1 inline-block h-2 w-2 shrink-0 ${r.featured ? "bg-yellow" : "bg-coral"}`,
												"aria-hidden": true
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: f })]
										}, f))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#book",
										className: ["ink-rule mt-6 inline-flex items-center px-4 py-2 font-display uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt", r.featured ? "bg-paper text-ink hover:bg-yellow" : "bg-ink text-paper hover:bg-coral"].join(" "),
										children: "Book a chat"
									})
								]
							}, r.name))
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				id: "book",
				className: "bg-ink text-paper",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-[1400px] px-5 py-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 gap-10 md:grid-cols-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "md:col-span-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "label-tech text-paper/70",
									children: "Colophon"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 font-display uppercase leading-[0.85]",
									style: { fontSize: "clamp(3rem, 10vw, 8rem)" },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block",
										children: "Count"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-coral",
										children: "Club."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-6 max-w-xl text-paper/85",
									children: "Stock & waste people for independent restaurants. One weekly count in, one printed-quality page back."
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "md:col-span-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ink-rule-thick border-paper bg-paper p-5 text-ink",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "label-tech",
										children: "Contact"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3 font-display text-2xl uppercase",
										children: "hello@countclub.co"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-4 label-tech",
										children: "Hours"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1",
										children: "Mon–Fri · 09:00–17:00"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "mailto:hello@countclub.co",
										className: "ink-rule mt-5 inline-flex items-center bg-ink px-4 py-2 font-display uppercase text-paper transition-colors hover:bg-coral",
										children: "Book a chat →"
									})
								]
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-12 flex flex-wrap items-center justify-between gap-2 border-t-[2px] border-paper/30 pt-4 label-tech text-paper/70",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"© ",
								(/* @__PURE__ */ new Date()).getFullYear(),
								" Count Club"
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Set in Archivo Black & Inter · Printed digitally on uncoated stock" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "№ 001 · Weekly Edition" })
						]
					})]
				})
			})
		]
	});
}
function ModulesSection() {
	const [active, setActive] = (0, import_react.useState)(0);
	const m = modules[active];
	const tone = [
		{
			bg: "bg-yellow",
			dot: "bg-coral"
		},
		{
			bg: "bg-paper",
			dot: "bg-cobalt"
		},
		{
			bg: "bg-leaf",
			dot: "bg-ink"
		},
		{
			bg: "bg-coral",
			dot: "bg-ink"
		},
		{
			bg: "bg-cobalt",
			dot: "bg-yellow"
		},
		{
			bg: "bg-paper",
			dot: "bg-hotpink"
		},
		{
			bg: "bg-yellow",
			dot: "bg-cobalt"
		}
	][active];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "modules",
		className: "relative overflow-hidden border-b-[3px] border-ink bg-hotpink text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BandLabels, {
			left: "Plate 07",
			right: "Ink 05 · Hot Pink"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1400px] px-5 py-16 md:py-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					kicker: "§ 02",
					title: "Seven modules",
					caption: "Pick a pill. Or take the lot."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					role: "tablist",
					"aria-label": "Modules",
					className: "mb-10 flex flex-wrap items-center gap-3",
					children: modules.map((mod, i) => {
						const isActive = i === active;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							role: "tab",
							"aria-selected": isActive,
							"aria-controls": `module-panel-${mod.n}`,
							id: `module-tab-${mod.n}`,
							onClick: () => setActive(i),
							className: ["ink-rule-thick inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-display uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt", isActive ? "bg-yellow text-ink" : "bg-paper text-ink hover:bg-ink hover:text-paper"].join(" "),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "label-tech opacity-80",
								children: mod.n
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm md:text-base",
								children: mod.name
							})]
						}, mod.n);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					role: "tabpanel",
					id: `module-panel-${m.n}`,
					"aria-labelledby": `module-tab-${m.n}`,
					className: `ink-rule-thick relative grid grid-cols-1 md:grid-cols-12 ${tone.bg}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative md:col-span-8 p-6 md:p-10 md:border-r-[3px] md:border-ink",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between label-tech",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Module № ", m.n] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `h-2.5 w-2.5 rounded-full ${tone.dot}`,
											"aria-hidden": true
										}), "Now printing"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-5 font-display uppercase leading-[0.85]",
									style: { fontSize: "clamp(2.5rem, 7vw, 5.5rem)" },
									children: m.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-6 max-w-xl text-base leading-relaxed md:text-lg",
									children: m.note
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-8 flex flex-wrap gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#book",
										className: "ink-rule inline-flex items-center bg-ink px-4 py-2 font-display uppercase text-paper transition-colors hover:bg-coral",
										children: "Add this module →"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setActive((active + 1) % modules.length),
										className: "ink-rule inline-flex items-center bg-paper px-4 py-2 font-display uppercase transition-colors hover:bg-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt",
										children: "Next module"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative md:col-span-4 p-6 md:p-8 border-t-[3px] md:border-t-0 border-ink",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between label-tech",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"Plate ",
										String(active + 1).padStart(2, "0"),
										" / 07"
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComicStar, {})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative mt-4 font-display leading-[0.8] text-ink/90",
									style: { fontSize: "clamp(5rem, 14vw, 11rem)" },
									"aria-hidden": true,
									children: [m.n, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: mascot_cup_default,
										alt: "",
										"aria-hidden": true,
										width: 1024,
										height: 1024,
										loading: "lazy",
										className: "pointer-events-none absolute -right-2 -top-4 h-auto w-[110px] rotate-[6deg] select-none md:w-[150px]",
										draggable: false
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-4 space-y-1.5 font-mono text-xs",
									children: modules.map((mm, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: `flex items-center justify-between border-b border-dashed border-ink/40 py-1 ${i === active ? "font-bold" : "opacity-60"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											mm.n,
											" · ",
											mm.name
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: i === active ? "◆" : "·" })]
									}, mm.n))
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"aria-hidden": true,
							className: "pointer-events-none absolute -top-3 -right-3 h-14 w-14 rounded-full bg-coral ink-rule-thick flex items-center justify-center font-display text-paper",
							children: m.n
						})
					]
				}, m.n)
			]
		})]
	});
}
function SectionHeader({ kicker, title, caption, light }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-8 flex flex-col gap-3 md:mb-12 md:flex-row md:items-end md:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `label-tech ${light ? "text-paper/80" : ""}`,
			children: kicker
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-2 font-display uppercase leading-[0.85] tracking-tight",
			style: { fontSize: "clamp(2.75rem, 9vw, 7rem)" },
			children: title
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `max-w-sm label-tech md:text-right ${light ? "text-paper/80" : ""}`,
			children: caption
		})]
	});
}
function StatCell({ n, label, bg, fg }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `relative aspect-square ${bg} ${fg} p-6`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-full flex-col justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between label-tech",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Fig." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComicStar, {})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-display leading-none",
				style: { fontSize: "clamp(3rem, 8vw, 6rem)" },
				children: n
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-[24ch] text-sm leading-snug md:text-base",
				children: label
			})] })]
		})
	});
}
function BandLabels({ left, right }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-[1400px] items-center justify-between px-5 pt-4 label-tech opacity-90",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["◆ ", left] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [right, " ◆"] })]
	});
}
function HalftoneCorner({ tone, position }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-hidden": true,
		className: `pointer-events-none absolute ${position === "tr" ? "right-0 top-0" : "left-0 bottom-0"} h-56 w-56 ${tone === "dark" ? "halftone-dark" : "halftone-light"} opacity-70`,
		style: {
			maskImage: position === "tr" ? "radial-gradient(circle at top right, black 40%, transparent 70%)" : "radial-gradient(circle at bottom left, black 40%, transparent 70%)",
			WebkitMaskImage: position === "tr" ? "radial-gradient(circle at top right, black 40%, transparent 70%)" : "radial-gradient(circle at bottom left, black 40%, transparent 70%)"
		}
	});
}
function Spark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: "22",
		height: "22",
		viewBox: "0 0 24 24",
		"aria-hidden": true,
		className: "shrink-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M12 1 L14 10 L23 12 L14 14 L12 23 L10 14 L1 12 L10 10 Z",
			fill: "currentColor"
		})
	});
}
function ComicStar() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: "24",
		height: "24",
		viewBox: "0 0 24 24",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M12 2 L14 8 L20 8 L15 12 L17 18 L12 14.5 L7 18 L9 12 L4 8 L10 8 Z",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinejoin: "round"
		})
	});
}
function StampNote() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative ink-rule-thick bg-paper p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between label-tech",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Count Sheet" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Wk 29" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 space-y-1.5 font-mono text-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						a: "Variance",
						b: "−£214"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						a: "Waste",
						b: "£86"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						a: "Labour %",
						b: "31.4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						a: "Food GP",
						b: "68.2%"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-center justify-between border-t-2 border-ink pt-2 label-tech",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Signed" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-lg lowercase italic text-coral",
					children: "count club"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute -right-3 -top-3 h-10 w-10 rounded-full bg-coral ink-rule flex items-center justify-center label-tech text-paper",
				children: "№1"
			})
		]
	});
}
function Row({ a, b }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between border-b border-dashed border-ink/50 py-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: a }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-bold",
			children: b
		})]
	});
}
//#endregion
export { Index as component };
