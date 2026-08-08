import { i as __toESM } from "../_runtime.mjs";
import { h as require_react, m as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { o as SEASON } from "./data-CDB2DGpz.mjs";
import { i as useReveal } from "./parts-EjDB_ZGf.mjs";
import { i as useResizeKick, n as useMounted, r as useReducedMotion } from "./stage-0YGkQRhM.mjs";
import { r as media, t as SCENES } from "./media-CXWtjMXk.mjs";
import { a as WorldFooter, i as SkipLink, n as LOOKS, o as WorldHeader, r as LookStyle, t as Catalogue } from "./looks-Dicv7kDh.mjs";
import { n as V, t as Sr } from "../_libs/shadergradient__react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/w.tide-Bg0jxrl7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Tide() {
	useReveal();
	const look = LOOKS.tide;
	const mounted = useMounted();
	const reduced = useReducedMotion();
	useResizeKick();
	const strip = (0, import_react.useRef)(null);
	const [p, setP] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		let raf = 0;
		const read = () => {
			const el = strip.current;
			if (el) {
				const r = el.getBoundingClientRect();
				const total = r.height - window.innerHeight;
				setP(total > 0 ? Math.min(Math.max(-r.top / total, 0), 1) : 0);
			}
			raf = 0;
		};
		const onScroll = () => {
			if (!raf) raf = requestAnimationFrame(read);
		};
		read();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll, { passive: true });
		return () => {
			if (raf) cancelAnimationFrame(raf);
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-tide min-h-dvh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LookStyle, { look }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipLink, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none fixed inset-0 z-0",
				children: mounted && !reduced ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(V, {
					style: {
						width: "100%",
						height: "100%"
					},
					pointerEvents: "none",
					pixelDensity: 1,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sr, {
						control: "props",
						type: "sphere",
						animate: "on",
						uSpeed: .1,
						uStrength: .35,
						uDensity: .9,
						uFrequency: 0,
						uAmplitude: 2.2,
						color1: "#5b6b78",
						color2: "#b4543a",
						color3: "#0b0b0b",
						brightness: 1.05,
						cDistance: 2.9,
						cPolarAngle: 70,
						cAzimuthAngle: 180,
						positionX: 0,
						positionY: .6,
						positionZ: 0,
						rotationX: 0,
						rotationY: 0,
						rotationZ: 0,
						envPreset: "dawn",
						grain: "on",
						lightType: "env"
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-full bg-[radial-gradient(60%_50%_at_50%_58%,#5b6b78_0%,#1a1a18_58%,#050505_100%)]" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorldHeader, {
						look,
						label: `${SEASON} · Tide`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "flex min-h-[80vh] items-center px-5 sm:px-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto w-full max-w-[var(--shell)] text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "d mx-auto max-w-[13ch] text-[clamp(2.8rem,9.6vw,8.8rem)]",
								children: "The long way round"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mx-auto mt-6 max-w-[46ch] text-[1.05rem] leading-[1.6]",
								style: { color: "var(--dim)" },
								children: [
									"Slower than a warehouse, and cheaper for it. ",
									24,
									" pieces made only once they are yours."
								]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						ref: strip,
						style: { height: `${SCENES.length * 90}vh` },
						className: "relative",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "sticky top-0 flex h-dvh items-center overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-6 px-[12vw] will-change-transform",
									style: { transform: `translate3d(${-p * (SCENES.length - 1) * 62}vw,0,0)` },
									children: SCENES.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
										className: "m-0 w-[56vw] shrink-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "overflow-hidden",
											style: { background: "var(--hair)" },
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: media(s.key, 1400, 900),
												alt: s.label,
												width: 1400,
												height: 900,
												loading: i > 1 ? "lazy" : void 0,
												className: "aspect-[3/2] w-full object-cover",
												style: { filter: "grayscale(0.3) contrast(1.05)" }
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
											className: "mt-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "m-0 text-[0.66rem] uppercase tracking-[0.2em]",
													style: { color: "var(--dim)" },
													children: String(i + 1).padStart(2, "0")
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
													className: "d mt-2",
													children: s.label
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-2 max-w-[44ch] text-[0.95rem] leading-[1.6]",
													style: { color: "var(--dim)" },
													children: s.body
												})
											]
										})]
									}, s.id))
								})
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: { background: "var(--bg)" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Catalogue, {
							look,
							heading: "What the tide brings in"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorldFooter, {
							look,
							note: "shadergradient sphere horizon + scroll-world stills scrubbed horizontally · the only version that runs both techniques at once"
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { Tide as component };
