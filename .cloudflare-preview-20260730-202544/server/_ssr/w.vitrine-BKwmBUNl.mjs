import { i as __toESM } from "../_runtime.mjs";
import { Bt as TextureLoader } from "../_libs/@monogrid/gainmap-js+[...].mjs";
import { d as useLoader, h as require_react, m as require_jsx_runtime, u as useFrame } from "../_libs/@react-three/drei+[...].mjs";
import { a as PIECES, o as SEASON } from "./data-CDB2DGpz.mjs";
import { i as useReveal } from "./parts-EjDB_ZGf.mjs";
import { a as useScrollRef, t as Stage } from "./stage-0YGkQRhM.mjs";
import { a as WorldFooter, i as SkipLink, n as LOOKS, o as WorldHeader, r as LookStyle, s as pieceImage, t as Catalogue } from "./looks-Dicv7kDh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/w.vitrine-BKwmBUNl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PLATES = PIECES.slice(0, 7);
function Rig() {
	const grp = (0, import_react.useRef)(null);
	const scroll = useScrollRef();
	const textures = useLoader(TextureLoader, (0, import_react.useMemo)(() => PLATES.map((p) => pieceImage(p.id, 600, 750)), []));
	useFrame(() => {
		if (!grp.current) return;
		const t = scroll.current;
		grp.current.rotation.y = -.5 + t * 1.9;
		grp.current.position.z = 1.4 + t * 5.2;
		grp.current.position.y = t * .7;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		ref: grp,
		children: textures.map((tex, i) => {
			const a = i / PLATES.length * Math.PI * 1.35 - Math.PI * .68;
			const r = 6.2;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					Math.sin(a) * r,
					i % 2 ? .4 : -.4,
					Math.cos(a) * r * -1
				],
				rotation: [
					0,
					-a,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [2.5, 3.1] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					map: tex,
					toneMapped: false,
					side: 2
				})]
			}, i);
		})
	});
}
function Vitrine() {
	useReveal();
	const look = LOOKS.vitrine;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-vitrine min-h-dvh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LookStyle, { look }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipLink, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorldHeader, {
				look,
				label: `${SEASON} · Vitrine`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative h-[300vh]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sticky top-0 h-dvh overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stage, {
						camera: {
							position: [
								0,
								0,
								9
							],
							fov: 48
						},
						fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-full w-full place-items-center bg-[#0b0b0b]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: pieceImage("p01", 800, 1e3),
								alt: "The Ridge Overshirt",
								width: 800,
								height: 1e3,
								className: "h-[70%] w-auto object-cover"
							})
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
							fallback: null,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rig, {})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-none absolute inset-0 flex items-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-full bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent px-5 pb-14 pt-32 sm:px-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mx-auto max-w-[var(--shell)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "d max-w-[14ch] text-[clamp(2.4rem,8.4vw,7.4rem)]",
									children: "Walk the rail"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-5 max-w-[48ch] text-[1.02rem] leading-[1.6]",
									style: { color: "var(--dim)" },
									children: [24, " pieces hung in a shallow arc. Keep scrolling and the camera moves through them."]
								})]
							})
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Catalogue, {
				look,
				heading: "Everything on the rail"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorldFooter, {
				look,
				note: "react-three-fiber · TextureLoader through Suspense · scroll rotates the rig and pushes the camera through it"
			})
		]
	});
}
//#endregion
export { Vitrine as component };
