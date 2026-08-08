import { i as __toESM } from "../_runtime.mjs";
import { h as require_react, m as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { o as SEASON } from "./data-CDB2DGpz.mjs";
import { i as useReveal } from "./parts-EjDB_ZGf.mjs";
import { i as useResizeKick, n as useMounted, r as useReducedMotion } from "./stage-0YGkQRhM.mjs";
import { a as WorldFooter, i as SkipLink, n as LOOKS, o as WorldHeader, r as LookStyle, t as Catalogue } from "./looks-Dicv7kDh.mjs";
import { n as V, t as Sr } from "../_libs/shadergradient__react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/w.drift-D7WXzIam.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Drift() {
	useReveal();
	const look = LOOKS.drift;
	const mounted = useMounted();
	const reduced = useReducedMotion();
	useResizeKick();
	const [p, setP] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		let raf = 0;
		const read = () => {
			const h = window.innerHeight || 1;
			setP(Math.min(window.scrollY / h, 1));
			raf = 0;
		};
		const onScroll = () => {
			if (!raf) raf = requestAnimationFrame(read);
		};
		read();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			if (raf) cancelAnimationFrame(raf);
			window.removeEventListener("scroll", onScroll);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-drift min-h-dvh",
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
						type: "waterPlane",
						animate: "on",
						uSpeed: .14 - p * .09,
						uStrength: 2.4 - p * 1.1,
						uDensity: 1.3,
						uFrequency: 5.5,
						uAmplitude: 0,
						color1: "#b4543a",
						color2: "#6b6a4b",
						color3: "#5b6b78",
						brightness: .9 - p * .28,
						cDistance: 3.2 + p * 4.6,
						cPolarAngle: 125,
						cAzimuthAngle: 180,
						positionX: 0,
						positionY: 0,
						positionZ: 0,
						rotationX: 50,
						rotationY: 0,
						rotationZ: -60,
						envPreset: "city",
						grain: "on",
						lightType: "3d"
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-full bg-[radial-gradient(120%_90%_at_20%_10%,#b4543a_0%,transparent_55%),radial-gradient(120%_90%_at_80%_60%,#5b6b78_0%,transparent_60%),#050505]" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorldHeader, {
						look,
						label: `${SEASON} · Drift`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "flex min-h-[86vh] items-end px-5 pb-20 sm:px-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto w-full max-w-[var(--shell)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "d max-w-[15ch] text-[clamp(2.8rem,10vw,9rem)]",
								children: "Cloth in motion"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-7 max-w-[52ch] text-[1.05rem] leading-[1.6]",
								style: { color: "var(--dim)" },
								children: [24, " pieces, cut after you order them. The field behind this page is live, and it settles as you read."]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: { background: "var(--bg)" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Catalogue, { look }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorldFooter, {
							look,
							note: "shadergradient waterPlane · scroll drives cDistance, uSpeed and brightness · reduced motion resolves to a still"
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { Drift as component };
