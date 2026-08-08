import { m as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { o as SEASON, t as BRAND } from "./data-CDB2DGpz.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/nl.index-BBqSsO-F.js
var import_jsx_runtime = require_jsx_runtime();
var VERSIONS = [
	{
		to: "/nl/flight",
		n: "01",
		name: "Flight",
		skills: "scroll-world + react-three-fiber",
		thesis: "A sticky stage runs four scenes of the making process while an R3F depth layer parallaxes behind them. The catalogue lands after the flight, not before it.",
		swatches: [
			"#050505",
			"#b4543a",
			"#6b6a4b",
			"#5b6b78"
		],
		ink: "#f5f3ee"
	},
	{
		to: "/nl/impeccable",
		n: "02",
		name: "Impeccable",
		skills: "impeccable",
		thesis: "The edition as a bill of materials. Sixteen rows of cloth, lead time and price carry the first screen, and the photographs come after the facts.",
		swatches: [
			"#1d2417",
			"#c2502e",
			"#f0eee4",
			"#151b11"
		],
		ink: "#f0eee4"
	},
	{
		to: "/nl/taste",
		n: "03",
		name: "Taste",
		skills: "design-taste-frontend",
		thesis: "Variance 5, motion 3, density 3. Cobalt and cream instead of the banned beige and brass, an asymmetric split hero, and light and dark from one token set.",
		swatches: [
			"#f4f2ec",
			"#2f5c96",
			"#15181c",
			"#d5d0c5"
		],
		ink: "#15181c"
	},
	{
		to: "/nl/brutalist",
		n: "04",
		name: "Brutalist",
		skills: "industrial-brutalist-ui",
		thesis: "Swiss Industrial Print, committed to without mixing. Hairlines drawn by a one-pixel grid gap, viewport-bleeding numerals, halftone plates, zero radius anywhere.",
		swatches: [
			"#F4F4F0",
			"#050505",
			"#E61919",
			"#F4F4F0"
		],
		ink: "#050505"
	},
	{
		to: "/nl/minimal",
		n: "05",
		name: "Minimal",
		skills: "minimalist-ui + high-end-visual-design",
		thesis: "Two skills that contradict each other on button shape. Minimalist wins the substance, high-end wins the behaviour: double-bezel cards, blurred scroll entry, magnetic hover.",
		swatches: [
			"#FBFBFA",
			"#2F3437",
			"#EDF3EC",
			"#EAEAEA"
		],
		ink: "#2F3437"
	},
	{
		to: "/nl/hyer",
		n: "06",
		name: "Hyer",
		skills: "DESIGN.md, applied literally",
		thesis: "The light aviation system exactly as written. Pale sky hero, flush-left wordmark at 131px, right-aligned white bands, one clay card, a terminal footer.",
		swatches: [
			"#ffffff",
			"#000d10",
			"#bc7155",
			"#0f0f1c"
		],
		ink: "#000d10"
	},
	{
		to: "/nl/gallery",
		n: "07",
		name: "Gallery",
		skills: "Structured reference, applied literally",
		thesis: "Renaissance gallery on putty paper. Putty rooms cut hard against ink rooms, a wordmark cropped by the viewport, circular vignettes and hexagonal indicators. Serif above 34px, grotesk below 26px, nothing in between.",
		swatches: [
			"#c4c3b6",
			"#000000",
			"#e7e5e4",
			"#595855"
		],
		ink: "#000000"
	}
];
function Index() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-dvh bg-[#0c0c0c] text-[#f2f0eb] [font-family:Archivo,sans-serif]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1280px] px-5 py-16 sm:px-8 sm:py-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "m-0 font-mono text-[0.68rem] uppercase tracking-[0.2em] opacity-55",
					children: [
						BRAND,
						" · The ",
						SEASON,
						" Edition · seven versions"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-5 max-w-[18ch] text-[clamp(2.2rem,6.4vw,4.6rem)] font-black leading-[0.92] tracking-[-0.04em]",
					children: "One catalogue, seven design systems"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-[68ch] text-[1.02rem] leading-[1.6] opacity-70",
					children: "Every version reads the same product data and the same shared hooks. Nothing else is shared: each one commits to a different skill combination and takes the consequences, including where two skills disagree."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-14 grid gap-5 md:grid-cols-2",
					children: VERSIONS.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: v.to,
						className: "group block border border-white/12 p-6 transition-colors duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:border-white/35 hover:bg-white/[0.03] sm:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline gap-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[0.72rem] tracking-[0.14em] opacity-50",
										children: v.n
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-[1.5rem] font-black tracking-[-0.03em]",
										children: v.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex-1" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"aria-hidden": true,
										className: "text-[1.1rem] transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1",
										children: "→"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] opacity-55",
								children: v.skills
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-5 flex h-11 border border-white/10",
								children: v.swatches.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex-1",
									style: { background: c }
								}, i))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 max-w-[52ch] text-[0.94rem] leading-[1.6] opacity-70",
								children: v.thesis
							})
						]
					}, v.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-16 border-t border-white/12 pt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "m-0 max-w-[68ch] text-[0.92rem] leading-[1.6] opacity-60",
						children: [
							"The original build lives at",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/northline",
								className: "underline underline-offset-4 hover:opacity-100",
								children: "/northline"
							}),
							": DESIGN.md's architecture carried into the dark palette the storefront brief asked for. Version 06 is the same document taken the other way."
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-mono text-[0.64rem] uppercase tracking-[0.14em] opacity-40",
						children: "All imagery is placeholder. Original brand copy and invented product names."
					})]
				})
			]
		})
	});
}
//#endregion
export { Index as component };
