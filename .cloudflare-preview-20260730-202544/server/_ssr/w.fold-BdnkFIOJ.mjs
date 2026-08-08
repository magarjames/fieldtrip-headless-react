import { i as __toESM } from "../_runtime.mjs";
import { Bt as TextureLoader, Kt as Vector3 } from "../_libs/@monogrid/gainmap-js+[...].mjs";
import { d as useLoader, h as require_react, m as require_jsx_runtime, u as useFrame } from "../_libs/@react-three/drei+[...].mjs";
import { o as SEASON } from "./data-CDB2DGpz.mjs";
import { i as useReveal } from "./parts-EjDB_ZGf.mjs";
import { a as useScrollRef, t as Stage } from "./stage-0YGkQRhM.mjs";
import { r as media } from "./media-CXWtjMXk.mjs";
import { a as WorldFooter, i as SkipLink, n as LOOKS, o as WorldHeader, r as LookStyle, t as Catalogue } from "./looks-Dicv7kDh.mjs";
import { i as GL_PALETTE, o as QUAD_VERT, r as FOLD_FRAG } from "./shaders-Dog-ckHs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/w.fold-BdnkFIOJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Creased() {
	const mat = (0, import_react.useRef)(null);
	const scroll = useScrollRef();
	const tex = useLoader(TextureLoader, media("hero", 1600, 900));
	const uniforms = (0, import_react.useMemo)(() => ({
		uTex: { value: tex },
		uTime: { value: 0 },
		uScroll: { value: 0 },
		uAccent: { value: new Vector3(...GL_PALETTE.rust) }
	}), [tex]);
	useFrame((_, d) => {
		if (!mat.current) return;
		const u = mat.current.uniforms;
		u.uTime.value += d;
		u.uScroll.value += (scroll.current - u.uScroll.value) * .07;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [14, 8] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("shaderMaterial", {
		ref: mat,
		vertexShader: QUAD_VERT,
		fragmentShader: FOLD_FRAG,
		uniforms
	})] });
}
function Fold() {
	useReveal();
	const look = LOOKS.fold;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-fold min-h-dvh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LookStyle, { look }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipLink, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorldHeader, {
				look,
				label: `${SEASON} · Fold`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "relative h-[86vh] overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stage, {
					camera: {
						position: [
							0,
							0,
							5.6
						],
						fov: 50
					},
					fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: media("hero", 1600, 900),
						alt: "The winter campaign",
						width: 1600,
						height: 900,
						className: "h-full w-full object-cover"
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
						fallback: null,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Creased, {})
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "px-5 py-20 sm:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-[var(--shell)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "d max-w-[16ch] text-[clamp(2.4rem,8vw,7rem)]",
						children: "Creases are the point"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-6 max-w-[56ch] text-[1.06rem] leading-[1.62]",
						style: { color: "var(--dim)" },
						children: [
							"Waxed cotton improves where it folds. The photograph above is being creased live, in a fragment program, at a strength set by how far down this page you are. ",
							24,
							" pieces, none of them cut in advance."
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Catalogue, {
				look,
				heading: "Made to crease"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorldFooter, {
				look,
				note: "custom GLSL fold · fbm uv displacement over a generated photograph · per-channel split at the crease · uScroll sets strength"
			})
		]
	});
}
//#endregion
export { Fold as component };
