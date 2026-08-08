import { i as __toESM } from "../_runtime.mjs";
import { Kt as Vector3 } from "../_libs/@monogrid/gainmap-js+[...].mjs";
import { h as require_react, m as require_jsx_runtime, u as useFrame } from "../_libs/@react-three/drei+[...].mjs";
import { o as SEASON } from "./data-CDB2DGpz.mjs";
import { i as useReveal } from "./parts-EjDB_ZGf.mjs";
import { a as useScrollRef, t as Stage } from "./stage-0YGkQRhM.mjs";
import { a as WorldFooter, i as SkipLink, n as LOOKS, o as WorldHeader, r as LookStyle, t as Catalogue } from "./looks-Dicv7kDh.mjs";
import { i as GL_PALETTE, n as CLOTH_VERT, t as CLOTH_FRAG } from "./shaders-Dog-ckHs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/w.cloth-CXewFY2I.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Sheet() {
	const mat = (0, import_react.useRef)(null);
	const scroll = useScrollRef();
	const uniforms = (0, import_react.useMemo)(() => ({
		uTime: { value: 0 },
		uScroll: { value: 0 },
		uWarp: { value: new Vector3(...GL_PALETTE.olive) },
		uWeft: { value: new Vector3(...GL_PALETTE.stone) },
		uAccent: { value: new Vector3(...GL_PALETTE.rust) }
	}), []);
	useFrame((_, d) => {
		if (!mat.current) return;
		const u = mat.current.uniforms;
		u.uTime.value += d;
		u.uScroll.value += (scroll.current - u.uScroll.value) * .06;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		rotation: [
			-.42,
			0,
			.16
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [
			13,
			9,
			96,
			96
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("shaderMaterial", {
			ref: mat,
			vertexShader: CLOTH_VERT,
			fragmentShader: CLOTH_FRAG,
			uniforms
		})]
	});
}
function Cloth() {
	useReveal();
	const look = LOOKS.cloth;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-cloth min-h-dvh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LookStyle, { look }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipLink, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorldHeader, {
				look,
				label: `${SEASON} · Cloth`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative min-h-[92vh] overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stage, {
						camera: {
							position: [
								0,
								0,
								7.4
							],
							fov: 42
						},
						fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-full bg-[radial-gradient(90%_70%_at_50%_40%,#6b6a4b_0%,#2a2a20_58%,#050505_100%)]" }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute inset-0 flex items-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-full px-5 pb-16 pt-40 sm:px-8",
						style: { background: "linear-gradient(to top, #050505 12%, transparent 100%)" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto max-w-[var(--shell)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "d max-w-[13ch] text-[clamp(2.8rem,10.5vw,9.5rem)]",
								children: "340gsm"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 max-w-[50ch] text-[1.05rem] leading-[1.6]",
								style: { color: "var(--dim)" },
								children: "Dry cotton canvas, woven and not printed. The surface above is drawn thread by thread in a fragment program, and it settles as you scroll."
							})]
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Catalogue, {
				look,
				heading: "Woven, cut, and nothing held"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorldFooter, {
				look,
				note: "custom GLSL cloth · 96x96 displaced plane · weave drawn in the fragment stage · uScroll drives amplitude and phase"
			})
		]
	});
}
//#endregion
export { Cloth as component };
