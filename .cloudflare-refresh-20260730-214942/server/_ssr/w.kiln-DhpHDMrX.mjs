import { i as __toESM } from "../_runtime.mjs";
import { Gt as Vector2, Kt as Vector3 } from "../_libs/@monogrid/gainmap-js+[...].mjs";
import { f as useThree, h as require_react, m as require_jsx_runtime, u as useFrame } from "../_libs/@react-three/drei+[...].mjs";
import { i as JOURNAL, o as SEASON } from "./data-CDB2DGpz.mjs";
import { i as useReveal } from "./parts-EjDB_ZGf.mjs";
import { a as useScrollRef, t as Stage } from "./stage-0YGkQRhM.mjs";
import { a as WorldFooter, i as SkipLink, n as LOOKS, o as WorldHeader, r as LookStyle, t as Catalogue } from "./looks-Dicv7kDh.mjs";
import { a as KILN_FRAG, i as GL_PALETTE, o as QUAD_VERT } from "./shaders-Dog-ckHs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/w.kiln-DhpHDMrX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Field() {
	const mat = (0, import_react.useRef)(null);
	const scroll = useScrollRef();
	const { size, viewport } = useThree();
	const uniforms = (0, import_react.useMemo)(() => ({
		uTime: { value: 0 },
		uScroll: { value: 0 },
		uRes: { value: new Vector2(1, 1) },
		uDeep: { value: new Vector3(...GL_PALETTE.void) },
		uEmber: { value: new Vector3(...GL_PALETTE.rust) }
	}), []);
	useFrame((_, d) => {
		if (!mat.current) return;
		const u = mat.current.uniforms;
		u.uTime.value += d;
		u.uScroll.value += (scroll.current - u.uScroll.value) * .05;
		u.uRes.value.set(size.width, size.height);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		scale: [
			viewport.width,
			viewport.height,
			1
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [1, 1] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("shaderMaterial", {
			ref: mat,
			vertexShader: QUAD_VERT,
			fragmentShader: KILN_FRAG,
			uniforms
		})]
	});
}
function Kiln() {
	useReveal();
	const look = LOOKS.kiln;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-kiln min-h-dvh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LookStyle, { look }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipLink, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none fixed inset-0 z-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stage, {
					camera: {
						position: [
							0,
							0,
							1
						],
						fov: 50
					},
					fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-full bg-[radial-gradient(70%_60%_at_30%_35%,#3a1c13_0%,#120b08_55%,#050505_100%)]" }),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorldHeader, {
						look,
						label: `${SEASON} · Kiln`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "flex min-h-[88vh] items-center px-5 sm:px-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto w-full max-w-[var(--shell)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "d max-w-[12ch] text-[clamp(3rem,11vw,10rem)]",
								children: "Slow heat"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-7 max-w-[50ch] text-[1.05rem] leading-[1.6]",
								style: { color: "var(--dim)" },
								children: "Nothing is rushed and nothing is held. Ten to fourteen days from the order to the door, every time."
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "px-5 py-24 sm:px-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto grid max-w-[var(--shell)] gap-10 md:grid-cols-3",
							children: JOURNAL.map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "rv border-t pt-5",
								style: { borderColor: "var(--hair)" },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "m-0 text-[0.66rem] uppercase tracking-[0.18em]",
										style: { color: "var(--dim)" },
										children: j.kicker
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "d mt-3",
										children: j.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-[0.95rem] leading-[1.6]",
										style: { color: "var(--dim)" },
										children: j.body
									})
								]
							}, j.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: { background: "var(--bg)" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Catalogue, {
							look,
							heading: "Fired slowly"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorldFooter, {
							look,
							note: "custom GLSL volumetric · four fbm slabs marched in 2D · one light swung across by uScroll · a single full-screen quad"
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { Kiln as component };
