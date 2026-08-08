import { m as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { o as SEASON, t as BRAND } from "./data-CDB2DGpz.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as isReal } from "./media-CXWtjMXk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/w.index-HQZChzAI.js
var import_jsx_runtime = require_jsx_runtime();
var VERSIONS = [
	{
		to: "/w/drift",
		n: "01",
		name: "Drift",
		lib: "shadergradient",
		note: "A waterPlane field as the page's ground. Scroll drives cDistance, uSpeed and brightness so it settles as you read.",
		swatch: [
			"#050505",
			"#b4543a",
			"#6b6a4b",
			"#5b6b78"
		]
	},
	{
		to: "/w/cloth",
		n: "02",
		name: "Cloth",
		lib: "r3f + custom GLSL",
		note: "A 96x96 plane displaced like heavy canvas, with the weave drawn thread by thread in the fragment stage.",
		swatch: [
			"#2a2a20",
			"#6b6a4b",
			"#a8a196",
			"#b4543a"
		]
	},
	{
		to: "/w/vitrine",
		n: "03",
		name: "Vitrine",
		lib: "r3f TextureLoader",
		note: "Seven garment plates hung in a shallow arc. Scroll rotates the rig and pushes the camera through it.",
		swatch: [
			"#050505",
			"#a8a196",
			"#5b6b78",
			"#0b0b0b"
		]
	},
	{
		to: "/w/fold",
		n: "04",
		name: "Fold",
		lib: "r3f + GLSL over a photo",
		note: "The campaign photograph creased live: fbm uv displacement with the channels split across each fold.",
		swatch: [
			"#f2f0ea",
			"#14140f",
			"#b4543a",
			"#d5d0c5"
		]
	},
	{
		to: "/w/kiln",
		n: "05",
		name: "Kiln",
		lib: "r3f + custom GLSL",
		note: "Four fbm slabs marched in 2D to fake volume, lit by one source that scroll walks across the frame.",
		swatch: [
			"#050505",
			"#3a1c13",
			"#b4543a",
			"#120b08"
		]
	},
	{
		to: "/w/weave",
		n: "06",
		name: "Weave",
		lib: "r3f instancing",
		note: "Six hundred threads on a lattice, each on its own lissajous path, all in a single draw call.",
		swatch: [
			"#050505",
			"#a8a196",
			"#b4543a",
			"#1e1e1e"
		]
	},
	{
		to: "/w/corridor",
		n: "07",
		name: "Corridor",
		lib: "scroll-world",
		note: "The flight through the making of the edition. Stills mode until the clip chain is funded.",
		swatch: [
			"#050505",
			"#2a2a26",
			"#8b877e",
			"#0b0b0b"
		]
	},
	{
		to: "/w/bloom",
		n: "08",
		name: "Bloom",
		lib: "r3f point cloud",
		note: "Twelve thousand points sampled off a torus knot, escaping along their own normals as you scroll.",
		swatch: [
			"#050505",
			"#a8a196",
			"#b4543a",
			"#1a1a18"
		]
	},
	{
		to: "/w/atlas",
		n: "09",
		name: "Atlas",
		lib: "r3f TextureLoader",
		note: "The whole catalogue as one wall. The camera pans across and retreats at the same time.",
		swatch: [
			"#f2f0ea",
			"#14140f",
			"#8b877e",
			"#d5d0c5"
		]
	},
	{
		to: "/w/tide",
		n: "10",
		name: "Tide",
		lib: "shadergradient + scroll-world",
		note: "The only version running both: a gradient sphere horizon with the scene sequence scrubbed across it.",
		swatch: [
			"#050505",
			"#5b6b78",
			"#b4543a",
			"#1a1a18"
		]
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
						" Edition · ten GL versions"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-5 max-w-[20ch] text-[clamp(2.2rem,6.4vw,4.6rem)] font-black leading-[0.92] tracking-[-0.04em]",
					children: "One catalogue, ten rendering techniques"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-[70ch] text-[1.02rem] leading-[1.6] opacity-70",
					children: "Built on react-three-fiber, shadergradient and scroll-world, over Higgsfield imagery. Nine of the ten run live GL in the browser and cost nothing to render. Every one takes scroll as an input to the image itself rather than animating something on top of it, and every one falls back to a still under reduced motion."
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
								children: v.lib
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-5 flex h-11 border border-white/10",
								children: v.swatch.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex-1",
									style: { background: s }
								}, i))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 max-w-[52ch] text-[0.94rem] leading-[1.6] opacity-70",
								children: v.note
							})
						]
					}, v.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-16 border-t border-white/12 pt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "m-0 max-w-[70ch] text-[0.92rem] leading-[1.6] opacity-60",
						children: [
							"The seven design-system versions live at",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/nl",
								className: "underline underline-offset-4",
								children: "/nl"
							}),
							". Those differ by design language; these differ by how the pixels are made."
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 max-w-[70ch] font-mono text-[0.64rem] uppercase leading-[1.7] tracking-[0.12em] opacity-40",
						children: [
							"Imagery generated with Higgsfield soul_2 to one art direction.",
							isReal("knit") ? "" : " Keys still pending resolve to placeholders.",
							" ",
							"Original brand copy and invented product names. No real brand, garment or person is depicted."
						]
					})]
				})
			]
		})
	});
}
//#endregion
export { Index as component };
