import { i as __toESM } from "../_runtime.mjs";
import { I as InstancedBufferAttribute, Kt as Vector3, L as InstancedBufferGeometry, bt as PlaneGeometry } from "../_libs/@monogrid/gainmap-js+[...].mjs";
import { h as require_react, m as require_jsx_runtime, u as useFrame } from "../_libs/@react-three/drei+[...].mjs";
import { o as SEASON } from "./data-CDB2DGpz.mjs";
import { i as useReveal } from "./parts-EjDB_ZGf.mjs";
import { a as useScrollRef, t as Stage } from "./stage-0YGkQRhM.mjs";
import { a as WorldFooter, i as SkipLink, n as LOOKS, o as WorldHeader, r as LookStyle, t as Catalogue } from "./looks-Dicv7kDh.mjs";
import { c as WEAVE_VERT, i as GL_PALETTE, s as WEAVE_FRAG } from "./shaders-Dog-ckHs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/w.weave-BdO35tVC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var COUNT = 600;
function Threads() {
	const mat = (0, import_react.useRef)(null);
	const scroll = useScrollRef();
	const geometry = (0, import_react.useMemo)(() => {
		const base = new PlaneGeometry(.035, 1.5);
		const g = new InstancedBufferGeometry();
		g.index = base.index;
		g.attributes.position = base.attributes.position;
		g.attributes.uv = base.attributes.uv;
		const offset = new Float32Array(COUNT * 3);
		const seed = new Float32Array(COUNT);
		const cols = 40;
		for (let i = 0; i < COUNT; i++) {
			const x = i % cols - cols / 2;
			const y = Math.floor(i / cols) - COUNT / cols / 2;
			offset[i * 3] = x * .42;
			offset[i * 3 + 1] = y * .72;
			offset[i * 3 + 2] = -Math.abs(x) * .18;
			seed[i] = Math.random();
		}
		g.setAttribute("iOffset", new InstancedBufferAttribute(offset, 3));
		g.setAttribute("iSeed", new InstancedBufferAttribute(seed, 1));
		g.instanceCount = COUNT;
		base.dispose();
		return g;
	}, []);
	const uniforms = (0, import_react.useMemo)(() => ({
		uTime: { value: 0 },
		uScroll: { value: 0 },
		uThread: { value: new Vector3(...GL_PALETTE.stone) },
		uAccent: { value: new Vector3(...GL_PALETTE.rust) }
	}), []);
	useFrame((_, d) => {
		if (!mat.current) return;
		const u = mat.current.uniforms;
		u.uTime.value += d;
		u.uScroll.value += (scroll.current - u.uScroll.value) * .05;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
		geometry,
		rotation: [
			0,
			0,
			.08
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("shaderMaterial", {
			ref: mat,
			vertexShader: WEAVE_VERT,
			fragmentShader: WEAVE_FRAG,
			uniforms,
			transparent: true,
			depthWrite: false,
			blending: 2
		})
	});
}
function Weave() {
	useReveal();
	const look = LOOKS.weave;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-weave min-h-dvh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LookStyle, { look }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipLink, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorldHeader, {
				look,
				label: `${SEASON} · Weave`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative h-[92vh] overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stage, {
					camera: {
						position: [
							0,
							0,
							13
						],
						fov: 45
					},
					fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full w-full",
						style: {
							background: "repeating-linear-gradient(90deg,#a8a196 0 1px,transparent 1px 14px),#050505",
							opacity: .5
						}
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Threads, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute inset-0 flex items-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto w-full max-w-[var(--shell)] px-5 sm:px-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "d max-w-[11ch] text-[clamp(2.8rem,10vw,9rem)]",
							children: "Under tension"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-6 max-w-[46ch] text-[1.04rem] leading-[1.6]",
							style: { color: "var(--dim)" },
							children: [24, " pieces from one loom. Six hundred threads above, all moved by the GPU in a single draw call."]
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Catalogue, {
				look,
				heading: "Off the loom"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorldFooter, {
				look,
				note: "react-three-fiber · InstancedBufferGeometry, 600 instances, one draw call · lissajous offset in the vertex stage"
			})
		]
	});
}
//#endregion
export { Weave as component };
