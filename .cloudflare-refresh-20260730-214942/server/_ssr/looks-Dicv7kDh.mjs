import { i as __toESM } from "../_runtime.mjs";
import { h as require_react, m as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as money, t as BRAND } from "./data-CDB2DGpz.mjs";
import { r as useGroups } from "./parts-EjDB_ZGf.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as media } from "./media-CXWtjMXk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/looks-Dicv7kDh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* The layout engine for the /w versions.
*
* Every version passes its own Look and gets a different page out: eight header
* archetypes and ten catalogue archetypes, so no two of the ten share a
* silhouette. The GL technique and the layout system now vary independently.
*
* The accessibility floor does not vary, per ui-ux-pro-max: 44px targets, one
* primary CTA per screen, visible focus rings, sequential headings, alt text,
* declared image dimensions, and no meaning carried by colour alone.
*/
/** maps the catalogue onto the generated imagery, falling back per key */
var KEY_FOR = {
	p01: "overshirt",
	p02: "parka",
	p04: "knit",
	p08: "trouser",
	p06: "tee",
	p10: "accessories",
	p11: "accessories",
	p12: "accessories",
	p15: "overshirt",
	p16: "tee"
};
var pieceImage = (id, w = 800, h = 1e3) => media(KEY_FOR[id] ?? "hero", w, h);
/** the per-look CSS custom properties + the type rules that read them */
function LookStyle({ look }) {
	const k = `.w-${look.id}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
      ${k}{
        --bg:${look.bg}; --fg:${look.fg}; --dim:${look.dim}; --hair:${look.hair};
        --accent:${look.accent}; --accent-ink:${look.accentInk};
        --shell:${look.shell}; --rhythm:${look.rhythm}; --radius:${look.radius};
        background:var(--bg); color:var(--fg);
        font-family:${look.body};
      }
      ${k} .d{
        font-family:${look.display}; font-weight:${look.displayWeight};
        letter-spacing:${look.displayTracking}; line-height:${look.displayLeading};
        ${look.displayUpper ? "text-transform:uppercase;" : ""}
        margin:0;
      }
      ${k} .lbl{
        font-family:${look.label}; text-transform:uppercase;
        letter-spacing:0.16em; font-size:0.66rem; line-height:1.4;
      }
      ${k} p{ line-height:1.62; margin:0 }
      ${k} a{ color:inherit; text-decoration:none }
      ${k} :focus-visible{ outline:2px solid var(--accent); outline-offset:3px }
      ${k} .cta{
        display:inline-flex; align-items:center; min-height:44px;
        padding:0 1.35rem; border-radius:var(--radius);
        background:var(--accent); color:var(--accent-ink);
        font-family:${look.label}; font-size:0.78rem; font-weight:600;
        letter-spacing:0.04em;
        transition:transform .25s cubic-bezier(.16,1,.3,1), opacity .25s;
      }
      ${k} .cta:active{ transform:scale(.98) }
      ${k} .ghost{
        display:inline-flex; align-items:center; min-height:44px;
        padding:0 1.35rem; border-radius:var(--radius);
        border:1px solid var(--hair); color:var(--fg);
        font-family:${look.label}; font-size:0.78rem; letter-spacing:0.04em;
      }
      ${k} .shell{ max-width:var(--shell); margin-inline:auto; padding-inline:clamp(1.25rem,4vw,2.5rem) }
      ${k} .rv{ opacity:0; transform:translateY(14px);
        transition:opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1) }
      ${k} .rv.in{ opacity:1; transform:none }
      @media (prefers-reduced-motion:reduce){
        ${k} *{ transition-duration:.01ms !important; animation:none !important }
        ${k} .rv{ opacity:1; transform:none }
      }
    ` });
}
function SkipLink() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href: "#catalogue",
		className: "cta absolute left-[-9999px] z-50 focus:left-4 focus:top-4",
		children: "Skip to the edition"
	});
}
function WorldHeader({ look, label }) {
	const h = look.header;
	const mark = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/w",
		className: "d text-[1.05rem]",
		style: { letterSpacing: "0.02em" },
		children: BRAND
	});
	const cta = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href: "#catalogue",
		className: "cta",
		children: "Shop the edition"
	});
	if (h === "centred") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "relative z-20 border-b",
		style: { borderColor: "var(--hair)" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell flex flex-col items-center gap-3 py-7 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/w",
					className: "d text-[clamp(1.4rem,3.4vw,2.2rem)]",
					style: { letterSpacing: "0.34em" },
					children: BRAND
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "lbl",
					style: { color: "var(--dim)" },
					children: label
				}),
				cta
			]
		})
	});
	if (h === "rail") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "relative z-20 border-b",
		style: { borderColor: "var(--hair)" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell grid items-center gap-4 py-4 sm:grid-cols-[auto_1fr_auto]",
			children: [
				mark,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "lbl hidden sm:block",
					style: { color: "var(--dim)" },
					children: label
				}),
				cta
			]
		})
	});
	if (h === "ghost") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "absolute inset-x-0 top-0 z-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell flex items-center gap-4 py-6",
			children: [
				mark,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex-1" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#catalogue",
					className: "lbl",
					style: { color: "var(--dim)" },
					children: "The edition"
				})
			]
		})
	});
	if (h === "data") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "relative z-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell flex items-center gap-4 border-b py-3",
			style: { borderColor: "var(--hair)" },
			children: [
				mark,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex-1" }),
				cta
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
			className: "shell grid grid-cols-2 gap-x-6 gap-y-2 border-b py-2.5 sm:grid-cols-4",
			style: { borderColor: "var(--hair)" },
			children: [
				["UNITS", String(24)],
				["LEAD", "10-14D"],
				["STOCK", "0"],
				["STATUS", "OPEN"]
			].map(([a, b]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "lbl",
					style: { color: "var(--dim)" },
					children: a
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "lbl m-0",
					style: { color: "var(--fg)" },
					children: b
				})]
			}, a))
		})]
	});
	if (h === "overlay") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "absolute inset-x-0 top-0 z-30",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell flex items-center gap-4 py-5",
			children: [
				mark,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex-1" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "lbl hidden sm:block",
					style: { color: "var(--dim)" },
					children: label
				})
			]
		})
	});
	if (h === "split") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "relative z-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between px-[clamp(1.25rem,4vw,2.5rem)] py-5",
			children: [mark, cta]
		})
	});
	if (h === "rule") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "relative z-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell flex flex-wrap items-baseline gap-x-5 gap-y-2 pb-3 pt-6",
			children: [
				mark,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "lbl",
					style: { color: "var(--dim)" },
					children: label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex-1" }),
				cta
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "shell",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
				height: 3,
				background: "var(--fg)"
			} })
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-30 pt-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "shell",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4 px-4 py-2.5 backdrop-blur-xl",
				style: {
					border: "1px solid var(--hair)",
					borderRadius: "var(--radius)",
					background: "color-mix(in srgb, var(--bg) 72%, transparent)"
				},
				children: [
					mark,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "lbl hidden sm:block",
						style: { color: "var(--dim)" },
						children: label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex-1" }),
					cta
				]
			})
		})
	});
}
function Price({ v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		style: { fontVariantNumeric: "tabular-nums" },
		children: money(v)
	});
}
function Catalogue({ look, heading }) {
	const all = useGroups().flatMap((g) => g.pieces);
	const g = look.grid;
	const Head = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-baseline justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "d text-[clamp(1.7rem,4.2vw,3.2rem)]",
			children: heading ?? `The ${"Winter".toLowerCase()} edition`
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "lbl",
			style: { color: "var(--dim)" },
			children: [24, " pieces · made to order"]
		})]
	});
	if (g === "index") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "catalogue",
		className: "shell",
		style: { paddingBlock: "var(--rhythm)" },
		children: [Head, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mt-10 list-none p-0",
			children: all.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "group relative border-b",
				style: { borderColor: "var(--hair)" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#catalogue",
					className: "grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 py-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "lbl",
							style: { color: "var(--dim)" },
							children: String(i + 1).padStart(2, "0")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "d block text-[clamp(1.1rem,2.4vw,1.7rem)]",
							children: p.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-[0.9rem]",
							style: { color: "var(--dim)" },
							children: p.story
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Price, { v: p.price })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: pieceImage(p.id, 360, 450),
					alt: "",
					width: 360,
					height: 450,
					loading: "lazy",
					"aria-hidden": true,
					className: "pointer-events-none absolute right-[14%] top-1/2 hidden w-[150px] -translate-y-1/2 object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 lg:block"
				})]
			}, p.id))
		})]
	});
	if (g === "table") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "catalogue",
		className: "shell",
		style: { paddingBlock: "var(--rhythm)" },
		children: [Head, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full border-collapse text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
					style: { borderBottom: "2px solid var(--fg)" },
					children: [
						"No.",
						"Piece",
						"Cloth",
						"Sizes",
						"Price"
					].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "lbl py-3 pr-5 font-normal",
						style: { color: "var(--dim)" },
						children: x
					}, x))
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: all.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					style: { borderBottom: "1px solid var(--hair)" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "lbl py-4 pr-5",
							style: { color: "var(--accent)" },
							children: String(i + 1).padStart(2, "0")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "py-4 pr-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "d text-[1rem]",
								children: p.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block max-w-[46ch] text-[0.86rem]",
								style: { color: "var(--dim)" },
								children: p.story
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "hidden py-4 pr-5 text-[0.86rem] md:table-cell",
							style: { color: "var(--dim)" },
							children: [p.detail.split(".")[0], "."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "lbl whitespace-nowrap py-4 pr-5",
							children: p.sizes.join(" ")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "whitespace-nowrap py-4 font-semibold",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Price, { v: p.price })
						})
					]
				}, p.id)) })]
			})
		})]
	});
	if (g === "magazine") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "catalogue",
		className: "shell",
		style: { paddingBlock: "var(--rhythm)" },
		children: [Head, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 [column-gap:2.5rem] lg:[column-count:2]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[1.02rem] [&::first-letter]:float-left [&::first-letter]:mr-2 [&::first-letter]:font-bold [&::first-letter]:leading-[0.78] [&::first-letter]:text-[3.6em]",
					children: [
						"The edition opens as one run of ",
						24,
						" garments and closes when the sizes are gone. Nothing is reprinted, nothing is discounted, and nothing is cut before it is bought."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
					className: "my-7 border-l-2 pl-5",
					style: { borderColor: "var(--accent)" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "d text-[clamp(1.2rem,2.4vw,1.7rem)]",
						children: "Holding stock means guessing, and guessing means discounting what you guessed wrong about."
					})
				}),
				all.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "mb-8 break-inside-avoid",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: pieceImage(p.id, 760, 950),
							alt: p.name,
							width: 760,
							height: 950,
							loading: "lazy",
							className: "aspect-[4/5] w-full object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "d mt-3 text-[1.15rem]",
							children: p.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-[0.92rem]",
							style: { color: "var(--dim)" },
							children: p.story
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "lbl mt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Price, { v: p.price })
						})
					]
				}, p.id))
			]
		})]
	});
	if (g === "bleed") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "catalogue",
		style: { paddingBlock: "var(--rhythm)" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "shell",
			children: Head
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-12",
			children: all.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: `rv grid items-center gap-8 py-8 lg:grid-cols-2 ${i % 2 ? "lg:[direction:rtl]" : ""}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: pieceImage(p.id, 1100, 800),
					alt: p.name,
					width: 1100,
					height: 800,
					loading: "lazy",
					className: "aspect-[11/8] w-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "shell lg:[direction:ltr]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "lbl",
							style: { color: "var(--dim)" },
							children: String(i + 1).padStart(2, "0")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "d mt-3 text-[clamp(1.6rem,3.6vw,2.8rem)]",
							children: p.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-[48ch] text-[1.02rem]",
							style: { color: "var(--dim)" },
							children: p.detail
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "d mt-5 text-[1.3rem]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Price, { v: p.price })
						})
					]
				})]
			}, p.id))
		})]
	});
	if (g === "filmstrip") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "catalogue",
		style: { paddingBlock: "var(--rhythm)" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "shell",
			children: Head
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[clamp(1.25rem,4vw,2.5rem)] pb-5",
			tabIndex: 0,
			"aria-label": "Scrollable list of pieces",
			children: all.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "w-[74vw] shrink-0 snap-start sm:w-[36vw] lg:w-[23vw]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: pieceImage(p.id, 700, 875),
						alt: p.name,
						width: 700,
						height: 875,
						loading: "lazy",
						className: "aspect-[4/5] w-full object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-baseline justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "d text-[1rem]",
							children: p.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "lbl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Price, { v: p.price })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "lbl mt-1",
						style: { color: "var(--dim)" },
						children: String(i + 1).padStart(2, "0")
					})
				]
			}, p.id))
		})]
	});
	if (g === "rail") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "catalogue",
		className: "shell",
		style: { paddingBlock: "var(--rhythm)" },
		children: [Head, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 flex flex-col gap-4",
			children: all.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rv grid items-center gap-5 border-t pt-4 sm:grid-cols-[10rem_1fr_auto]",
				style: { borderColor: "var(--hair)" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: pieceImage(p.id, 480, 300),
						alt: p.name,
						width: 480,
						height: 300,
						loading: "lazy",
						className: "aspect-[8/5] w-full object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "lbl",
							style: { color: "var(--dim)" },
							children: String(i + 1).padStart(2, "0")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "d mt-1 text-[clamp(1.2rem,2.6vw,1.9rem)]",
							children: p.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 max-w-[54ch] text-[0.94rem]",
							style: { color: "var(--dim)" },
							children: p.story
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "d text-[1.2rem]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Price, { v: p.price })
					})
				]
			}, p.id))
		})]
	});
	if (g === "sheet") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "catalogue",
		className: "shell",
		style: { paddingBlock: "var(--rhythm)" },
		children: [Head, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-5",
			children: all.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rv",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: pieceImage(p.id, 520, 650),
					alt: p.name,
					width: 520,
					height: 650,
					loading: "lazy",
					className: "aspect-[4/5] w-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline gap-2 pt-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "lbl",
							style: { color: "var(--dim)" },
							children: String(i + 1).padStart(2, "0")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "truncate text-[0.82rem] font-semibold",
							children: p.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "lbl ml-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Price, { v: p.price })
						})
					]
				})]
			}, p.id))
		})]
	});
	if (g === "scatter") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "catalogue",
		className: "shell",
		style: { paddingBlock: "var(--rhythm)" },
		children: [Head, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-12 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3",
			children: all.map((p, i) => {
				const drop = [
					"lg:mt-0",
					"lg:mt-20",
					"lg:mt-10"
				][i % 3];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: `rv ${drop}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: pieceImage(p.id, 700, i % 3 === 1 ? 1050 : 875),
							alt: p.name,
							width: 700,
							height: i % 3 === 1 ? 1050 : 875,
							loading: "lazy",
							className: `w-full object-cover ${i % 3 === 1 ? "aspect-[2/3]" : "aspect-[4/5]"}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "d mt-4 text-[1.25rem]",
							children: p.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-[0.92rem]",
							style: { color: "var(--dim)" },
							children: p.story
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "lbl mt-2.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Price, { v: p.price })
						})
					]
				}, p.id);
			})
		})]
	});
	if (g === "spec") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "catalogue",
		className: "shell",
		style: { paddingBlock: "var(--rhythm)" },
		children: [Head, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4",
			children: all.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rv",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: pieceImage(p.id, 700, 875),
						alt: p.name,
						width: 700,
						height: 875,
						loading: "lazy",
						className: "aspect-[4/5] w-full object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "d mt-3 text-[1rem]",
						children: p.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-2.5 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 border-t pt-2.5",
						style: { borderColor: "var(--hair)" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "lbl",
								style: { color: "var(--dim)" },
								children: "No"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "lbl m-0 text-right",
								children: String(i + 1).padStart(2, "0")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "lbl",
								style: { color: "var(--dim)" },
								children: "Sizes"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "lbl m-0 text-right",
								children: p.sizes.join(" ")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "lbl",
								style: { color: "var(--dim)" },
								children: "Price"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "lbl m-0 text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Price, { v: p.price })
							})
						]
					})
				]
			}, p.id))
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "catalogue",
		className: "shell",
		style: { paddingBlock: "var(--rhythm)" },
		children: [Head, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-12 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-6",
			children: all.map((p, i) => {
				const wide = i % 5 === 0;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: `rv ${wide ? "col-span-2 lg:col-span-4" : "col-span-1 lg:col-span-2"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: pieceImage(p.id, 900, wide ? 600 : 1125),
							alt: p.name,
							width: 900,
							height: wide ? 600 : 1125,
							loading: "lazy",
							className: `w-full object-cover ${wide ? "aspect-[3/2]" : "aspect-[4/5]"}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex items-baseline justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "d text-[1.05rem]",
								children: p.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[0.9rem]",
								style: { color: "var(--dim)" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Price, { v: p.price })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-[0.9rem]",
							style: { color: "var(--dim)" },
							children: p.story
						})
					]
				}, p.id);
			})
		})]
	});
}
function WorldFooter({ look, note }) {
	const [dials] = (0, import_react.useState)(look.dials.join(" / "));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t",
		style: {
			borderColor: "var(--hair)",
			paddingBlock: "clamp(3rem,6vw,5rem)"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "d text-[clamp(1.8rem,7vw,5rem)]",
					children: BRAND
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "lbl mt-6 max-w-[70ch]",
					style: { color: "var(--dim)" },
					children: note
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "lbl mt-2",
					style: { color: "var(--dim)" },
					children: [
						look.style,
						" · variance ",
						dials.split(" / ")[0],
						", motion ",
						dials.split(" / ")[1],
						", density ",
						dials.split(" / ")[2]
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "lbl mt-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/w",
						className: "underline underline-offset-4",
						children: "All ten versions"
					})
				})
			]
		})
	});
}
var ARCHIVO = "Archivo, \"Helvetica Neue\", sans-serif";
var BLACK = "\"Archivo Black\", Archivo, sans-serif";
var MONO = "\"JetBrains Mono\", ui-monospace, monospace";
var PLAYFAIR = "\"Playfair Display\", Georgia, serif";
var CORMORANT = "Cormorant, \"EB Garamond\", Georgia, serif";
var MONTSERRAT = "Montserrat, Archivo, sans-serif";
var SOURCE_SERIF = "\"Source Serif 4\", Georgia, serif";
var INTER = "Inter, Archivo, sans-serif";
var LOOKS = {
	drift: {
		id: "drift",
		thesis: "The gradient is the product photography. Type is set enormous and thin over it, and the catalogue is deliberately small underneath so the field keeps the first screen to itself.",
		dials: [
			8,
			6,
			3
		],
		style: "Exaggerated Minimalism",
		bg: "#050505",
		fg: "#f5f3ee",
		dim: "#a9a49b",
		hair: "rgba(245,243,238,0.14)",
		accent: "#b4543a",
		accentInk: "#ffffff",
		display: BLACK,
		body: INTER,
		label: MONO,
		displayWeight: 400,
		displayTracking: "-0.055em",
		displayLeading: .84,
		displayUpper: false,
		header: "pill",
		grid: "editorial",
		shell: "1680px",
		rhythm: "clamp(5rem,11vw,9rem)",
		radius: "999px"
	},
	cloth: {
		id: "cloth",
		thesis: "A cloth merchant's page, set like a printed swatch book. Serif body in real columns, a drop cap, and the shader treated as the plate at the top of the article.",
		dials: [
			5,
			4,
			6
		],
		style: "Editorial Grid / Magazine",
		bg: "#12120f",
		fg: "#efece3",
		dim: "#aaa599",
		hair: "rgba(239,236,227,0.16)",
		accent: "#c2764a",
		accentInk: "#12120f",
		display: PLAYFAIR,
		body: SOURCE_SERIF,
		label: MONO,
		displayWeight: 700,
		displayTracking: "-0.02em",
		displayLeading: .96,
		displayUpper: false,
		header: "rule",
		grid: "magazine",
		shell: "1240px",
		rhythm: "clamp(4.5rem,9vw,7.5rem)",
		radius: "0px"
	},
	vitrine: {
		id: "vitrine",
		thesis: "An exhibition, not a shop. Centred wordmark, enormous letter-spacing, and the catalogue as a numbered index whose images only appear on hover, so the list reads as a checklist of works.",
		dials: [
			6,
			5,
			2
		],
		style: "Gallery / Exhibition",
		bg: "#0a0a0b",
		fg: "#ece9e4",
		dim: "#a5a19a",
		hair: "rgba(236,233,228,0.15)",
		accent: "#cfc7b8",
		accentInk: "#0a0a0b",
		display: CORMORANT,
		body: MONTSERRAT,
		label: MONTSERRAT,
		displayWeight: 300,
		displayTracking: "0.02em",
		displayLeading: 1.02,
		displayUpper: true,
		header: "centred",
		grid: "index",
		shell: "1400px",
		rhythm: "clamp(5rem,10vw,8rem)",
		radius: "0px"
	},
	fold: {
		id: "fold",
		thesis: "A Swiss specification sheet on paper. A fixed left rail carries the navigation, the plate sits right, and every piece is a numbered entry with its cloth stated in mono.",
		dials: [
			5,
			3,
			7
		],
		style: "Swiss Print / Utilitarian",
		bg: "#f2f0ea",
		fg: "#141410",
		dim: "#54524a",
		hair: "rgba(20,20,16,0.16)",
		accent: "#b4543a",
		accentInk: "#ffffff",
		display: ARCHIVO,
		body: ARCHIVO,
		label: MONO,
		displayWeight: 700,
		displayTracking: "-0.035em",
		displayLeading: .94,
		displayUpper: false,
		header: "rail",
		grid: "spec",
		shell: "1560px",
		rhythm: "clamp(4rem,8vw,7rem)",
		radius: "0px"
	},
	kiln: {
		id: "kiln",
		thesis: "Dark luxury with almost no chrome. A ghost header that disappears into the field, and the catalogue as alternating full-bleed halves so each piece gets a whole screen.",
		dials: [
			7,
			5,
			2
		],
		style: "Dark Editorial Luxury",
		bg: "#070605",
		fg: "#f2ece4",
		dim: "#a8a096",
		hair: "rgba(242,236,228,0.13)",
		accent: "#c25f38",
		accentInk: "#070605",
		display: PLAYFAIR,
		body: INTER,
		label: MONO,
		displayWeight: 400,
		displayTracking: "-0.015em",
		displayLeading: 1,
		displayUpper: false,
		header: "ghost",
		grid: "bleed",
		shell: "1520px",
		rhythm: "clamp(6rem,12vw,10rem)",
		radius: "0px"
	},
	weave: {
		id: "weave",
		thesis: "A loom's control panel. Mono everywhere, a live data bar pinned under the header, and the catalogue as a dense sortable table rather than a picture grid.",
		dials: [
			6,
			4,
			9
		],
		style: "Technical Blueprint",
		bg: "#080a09",
		fg: "#e6e9e4",
		dim: "#98a094",
		hair: "rgba(230,233,228,0.16)",
		accent: "#b4543a",
		accentInk: "#ffffff",
		display: MONO,
		body: ARCHIVO,
		label: MONO,
		displayWeight: 500,
		displayTracking: "-0.02em",
		displayLeading: 1.04,
		displayUpper: true,
		header: "data",
		grid: "table",
		shell: "1720px",
		rhythm: "clamp(3.5rem,7vw,5.5rem)",
		radius: "0px"
	},
	corridor: {
		id: "corridor",
		thesis: "Cinema. The header floats over the footage with no bar behind it, titles are set like end credits, and the catalogue is a filmstrip you push sideways.",
		dials: [
			7,
			8,
			4
		],
		style: "Cinematic Overlay",
		bg: "#040404",
		fg: "#f4f2ed",
		dim: "#a6a29a",
		hair: "rgba(244,242,237,0.13)",
		accent: "#e0e0dc",
		accentInk: "#040404",
		display: BLACK,
		body: INTER,
		label: MONO,
		displayWeight: 400,
		displayTracking: "-0.05em",
		displayLeading: .86,
		displayUpper: true,
		header: "overlay",
		grid: "filmstrip",
		shell: "1760px",
		rhythm: "clamp(4.5rem,9vw,7rem)",
		radius: "0px"
	},
	bloom: {
		id: "bloom",
		thesis: "The softest page of the ten. A centred column, a light serif at large sizes, and a scattered masonry that never lines up, because the point is dispersal.",
		dials: [
			7,
			6,
			3
		],
		style: "Soft Editorial",
		bg: "#0d0d10",
		fg: "#eeeae4",
		dim: "#a7a29c",
		hair: "rgba(238,234,228,0.14)",
		accent: "#c9a48c",
		accentInk: "#0d0d10",
		display: CORMORANT,
		body: INTER,
		label: MONTSERRAT,
		displayWeight: 300,
		displayTracking: "-0.01em",
		displayLeading: 1,
		displayUpper: false,
		header: "centred",
		grid: "scatter",
		shell: "1360px",
		rhythm: "clamp(5rem,10vw,8.5rem)",
		radius: "0px"
	},
	atlas: {
		id: "atlas",
		thesis: "A photographer's contact sheet. Tight gutters, every frame numbered in the margin, and a sticky index down the side that tracks which row you are in.",
		dials: [
			4,
			3,
			8
		],
		style: "Contact Sheet / Archive",
		bg: "#eceae4",
		fg: "#131311",
		dim: "#54524c",
		hair: "rgba(19,19,17,0.18)",
		accent: "#131311",
		accentInk: "#eceae4",
		display: ARCHIVO,
		body: ARCHIVO,
		label: MONO,
		displayWeight: 600,
		displayTracking: "-0.03em",
		displayLeading: .98,
		displayUpper: false,
		header: "rail",
		grid: "sheet",
		shell: "1640px",
		rhythm: "clamp(3.5rem,7vw,5.5rem)",
		radius: "0px"
	},
	tide: {
		id: "tide",
		thesis: "A horizon line. The header splits to the two edges leaving the middle empty, everything is centred on one axis, and the catalogue lies down into wide bands.",
		dials: [
			6,
			7,
			3
		],
		style: "Wide Horizon",
		bg: "#060809",
		fg: "#eef0f1",
		dim: "#a0a6a9",
		hair: "rgba(238,240,241,0.14)",
		accent: "#7d97a6",
		accentInk: "#060809",
		display: PLAYFAIR,
		body: MONTSERRAT,
		label: MONTSERRAT,
		displayWeight: 400,
		displayTracking: "-0.02em",
		displayLeading: .98,
		displayUpper: false,
		header: "split",
		grid: "rail",
		shell: "1600px",
		rhythm: "clamp(5rem,10vw,8rem)",
		radius: "999px"
	}
};
//#endregion
export { WorldFooter as a, SkipLink as i, LOOKS as n, WorldHeader as o, LookStyle as r, pieceImage as s, Catalogue as t };
