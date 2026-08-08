import { i as __toESM } from "../_runtime.mjs";
import { h as require_react, m as require_jsx_runtime, o as Canvas, u as useFrame } from "../_libs/@react-three/drei+[...].mjs";
import { c as money, o as SEASON, t as BRAND } from "./data-CDB2DGpz.mjs";
import { i as useReveal, r as useGroups, t as img } from "./parts-EjDB_ZGf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/nl.flight-C1g59pQI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SCENES = [
	{
		id: "mill",
		label: "The mill",
		still: "northline-flight-mill-loom-interior",
		clip: null,
		body: "Cloth is chosen before anything is drawn. The edition starts at the loom."
	},
	{
		id: "cutting",
		label: "The cutting floor",
		still: "northline-flight-cutting-floor",
		clip: null,
		body: "Pattern pieces are cut to order, not to forecast. Nothing is cut twice."
	},
	{
		id: "bench",
		label: "The bench",
		still: "northline-flight-sewing-bench",
		clip: null,
		body: "One maker takes a garment from bundle to finish. It is slower and it shows."
	},
	{
		id: "rail",
		label: "The rail",
		still: "northline-flight-finished-rail",
		clip: null,
		body: "Finished pieces hang for a day before they ship. That is the whole warehouse."
	}
];
function Depth() {
	const grp = (0, import_react.useRef)(null);
	const scroll = (0, import_react.useRef)(0);
	useFrame((_, d) => {
		const h = window.innerHeight || 1;
		const raw = Math.min(window.scrollY / (h * SCENES.length), 1);
		scroll.current += (raw - scroll.current) * .06;
		if (grp.current) {
			grp.current.position.z = scroll.current * 14;
			grp.current.rotation.y = scroll.current * .5;
			grp.current.children.forEach((c, i) => {
				c.rotation.z += d * .02 * (i % 2 ? 1 : -1);
			});
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		ref: grp,
		children: Array.from({ length: 9 }, (_, i) => i).map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				(i % 3 - 1) * 5.5,
				Math.floor(i / 3) * -3.4 + 3.4,
				-i * 2.2
			],
			rotation: [
				0,
				0,
				i * .3 % 1
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [3.2, 4.4] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				color: i % 3 === 0 ? "#b4543a" : i % 3 === 1 ? "#6b6a4b" : "#5b6b78",
				transparent: true,
				opacity: .13,
				side: 2
			})]
		}, i))
	});
}
function Flight() {
	useReveal();
	const groups = useGroups();
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const [still, setStill] = (0, import_react.useState)(false);
	const [active, setActive] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		setMounted(true);
		setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
	}, []);
	(0, import_react.useEffect)(() => {
		const io = new IntersectionObserver((es) => es.forEach((e) => {
			if (e.isIntersecting) setActive(Number(e.target.dataset.i));
		}), { threshold: .5 });
		document.querySelectorAll("[data-scene]").forEach((n) => io.observe(n));
		return () => io.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-[#050505] text-[#f5f3ee] [font-family:Archivo,sans-serif]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main",
				className: "absolute left-[-9999px] z-50 bg-[#f5f3ee] px-4 py-2 text-[#050505] focus:left-4 focus:top-4",
				children: "Skip to content"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sticky top-0 h-dvh overflow-hidden",
					children: [
						mounted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, {
							className: "!absolute inset-0",
							dpr: [1, 1.5],
							gl: {
								antialias: false,
								alpha: true,
								powerPreference: "low-power"
							},
							camera: {
								position: [
									0,
									0,
									9
								],
								fov: 46
							},
							style: {
								position: "absolute",
								inset: 0
							},
							children: !still && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Depth, {})
						}),
						SCENES.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
							className: "absolute inset-0 m-0 transition-opacity duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
							style: { opacity: active === i ? 1 : 0 },
							"aria-hidden": active !== i,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: img(s.still, 1900, 1200),
								alt: "",
								width: 1900,
								height: 1200,
								className: "h-full w-full object-cover opacity-45 [filter:grayscale(0.4)_contrast(1.08)]"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-[#050505]/30 to-[#050505]" })]
						}, s.id)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pointer-events-none absolute inset-0 flex items-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mx-auto w-full max-w-[1680px] px-6 pb-20 sm:px-10",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "m-0 text-[0.68rem] uppercase tracking-[0.22em] opacity-60",
										children: [
											BRAND,
											" · The ",
											SEASON,
											" Edition · Scene ",
											active + 1,
											" of ",
											SCENES.length
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-3 max-w-[14ch] text-[clamp(2.4rem,7vw,5.4rem)] font-black leading-[0.9] tracking-[-0.04em]",
										children: SCENES[active].label
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 max-w-[46ch] text-[1.05rem] leading-relaxed opacity-80",
										children: SCENES[active].body
									})
								]
							})
						})
					]
				}), SCENES.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					"data-scene": true,
					"data-i": i,
					className: "h-dvh",
					"aria-label": s.label
				}, s.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				id: "main",
				className: "mx-auto max-w-[1680px] px-6 py-24 sm:px-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "m-0 text-[0.68rem] uppercase tracking-[0.22em] opacity-60",
						children: [24, " pieces"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 max-w-[16ch] text-[clamp(2.4rem,6vw,5rem)] font-black leading-[0.9] tracking-[-0.04em]",
						children: "Everything you just flew through"
					}),
					groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: g.id,
						className: "rv mt-20 opacity-0 transition-opacity duration-700 [&.in]:opacity-100",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-[clamp(1.5rem,3vw,2.4rem)] font-black tracking-[-0.03em]",
								children: g.heading
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 max-w-[56ch] opacity-65",
								children: g.statement
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-8 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4",
								children: g.pieces.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "aspect-[4/5] overflow-hidden bg-[#0b0b0b]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: img(p.img, 700, 875),
										alt: p.name,
										width: 700,
										height: 875,
										loading: "lazy",
										className: "h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex items-baseline justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-[0.98rem] font-bold",
										children: p.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[0.9rem] opacity-70",
										children: money(p.price)
									})]
								})] }, p.id))
							})
						]
					}, g.id))
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-white/10 px-6 py-12 sm:px-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "m-0 text-[0.68rem] uppercase tracking-[0.2em] opacity-50",
					children: "scroll-world engine, stills mode · react-three-fiber depth layer"
				})
			})
		]
	});
}
//#endregion
export { Flight as component };
