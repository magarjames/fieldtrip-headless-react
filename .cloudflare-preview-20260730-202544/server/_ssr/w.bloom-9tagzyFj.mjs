import { i as __toESM } from "../_runtime.mjs";
import { Kt as Vector3, Vt as TorusKnotGeometry, f as BufferAttribute, p as BufferGeometry } from "../_libs/@monogrid/gainmap-js+[...].mjs";
import { h as require_react, m as require_jsx_runtime, u as useFrame } from "../_libs/@react-three/drei+[...].mjs";
import { o as SEASON } from "./data-CDB2DGpz.mjs";
import { i as useReveal } from "./parts-EjDB_ZGf.mjs";
import { a as useScrollRef, t as Stage } from "./stage-0YGkQRhM.mjs";
import { a as WorldFooter, i as SkipLink, n as LOOKS, o as WorldHeader, r as LookStyle, t as Catalogue } from "./looks-Dicv7kDh.mjs";
import { i as GL_PALETTE } from "./shaders-Dog-ckHs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/w.bloom-9tagzyFj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var COUNT = 12e3;
var VERT = `
  uniform float uTime;
  uniform float uScroll;
  attribute vec3 aDir;
  attribute float aSeed;
  varying float vSeed;
  varying float vFade;

  void main(){
    vSeed = aSeed;
    vec3 p = position + aDir * uScroll * (2.6 + aSeed * 5.0);
    p.y += sin(uTime * 0.6 + aSeed * 6.28) * 0.06;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vFade = clamp(1.0 - uScroll * 0.75, 0.0, 1.0);

    gl_PointSize = (7.0 + aSeed * 6.0) * (12.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;
var FRAG = `
  precision mediump float;
  uniform vec3 uInk;
  uniform vec3 uAccent;
  varying float vSeed;
  varying float vFade;

  void main(){
    // round the square point sprite, and soften its edge
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.16, d) * vFade;

    vec3 col = mix(uInk, uAccent, step(0.88, fract(vSeed * 5.77)));
    gl_FragColor = vec4(col, a * 0.72);
  }
`;
function Cloud() {
	const mat = (0, import_react.useRef)(null);
	const pts = (0, import_react.useRef)(null);
	const scroll = useScrollRef();
	const geometry = (0, import_react.useMemo)(() => {
		const src = new TorusKnotGeometry(2.2, .72, 220, 32);
		const pos = src.attributes.position;
		const nor = src.attributes.normal;
		const position = new Float32Array(COUNT * 3);
		const dir = new Float32Array(COUNT * 3);
		const seed = new Float32Array(COUNT);
		for (let i = 0; i < COUNT; i++) {
			const j = Math.floor(Math.random() * pos.count);
			position[i * 3] = pos.getX(j);
			position[i * 3 + 1] = pos.getY(j);
			position[i * 3 + 2] = pos.getZ(j);
			dir[i * 3] = nor.getX(j);
			dir[i * 3 + 1] = nor.getY(j);
			dir[i * 3 + 2] = nor.getZ(j);
			seed[i] = Math.random();
		}
		src.dispose();
		const g = new BufferGeometry();
		g.setAttribute("position", new BufferAttribute(position, 3));
		g.setAttribute("aDir", new BufferAttribute(dir, 3));
		g.setAttribute("aSeed", new BufferAttribute(seed, 1));
		return g;
	}, []);
	const uniforms = (0, import_react.useMemo)(() => ({
		uTime: { value: 0 },
		uScroll: { value: 0 },
		uInk: { value: new Vector3(...GL_PALETTE.stone) },
		uAccent: { value: new Vector3(...GL_PALETTE.rust) }
	}), []);
	useFrame((_, d) => {
		if (mat.current) {
			const u = mat.current.uniforms;
			u.uTime.value += d;
			u.uScroll.value += (scroll.current - u.uScroll.value) * .05;
		}
		if (pts.current) pts.current.rotation.y += d * .09;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("points", {
		ref: pts,
		geometry,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("shaderMaterial", {
			ref: mat,
			vertexShader: VERT,
			fragmentShader: FRAG,
			uniforms,
			transparent: true,
			depthWrite: false
		})
	});
}
function Bloom() {
	useReveal();
	const look = LOOKS.bloom;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-bloom min-h-dvh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LookStyle, { look }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipLink, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorldHeader, {
				look,
				label: `${SEASON} · Bloom`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative h-[92vh] overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stage, {
					camera: {
						position: [
							0,
							0,
							8.4
						],
						fov: 46
					},
					fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-full bg-[radial-gradient(50%_50%_at_50%_45%,#a8a196_0%,transparent_62%),#050505] opacity-70" }),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cloud, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute inset-0 flex items-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto w-full max-w-[var(--shell)] px-5 pb-16 sm:px-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "d max-w-[12ch] text-[clamp(2.8rem,9.5vw,8.6rem)]",
							children: "Nothing left over"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-6 max-w-[48ch] text-[1.04rem] leading-[1.6]",
							style: { color: "var(--dim)" },
							children: [
								"Overproduction is the waste. Scroll and the form comes apart;",
								" ",
								24,
								" pieces is all that is ever made."
							]
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Catalogue, {
				look,
				heading: "Made once"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorldFooter, {
				look,
				note: "react-three-fiber · 12,000 point cloud sampled off a torus knot · points escape along their own normals with uScroll"
			})
		]
	});
}
//#endregion
export { Bloom as component };
