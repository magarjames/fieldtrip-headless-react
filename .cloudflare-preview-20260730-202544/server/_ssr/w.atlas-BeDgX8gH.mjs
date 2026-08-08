import { i as __toESM } from "../_runtime.mjs";
import { Bt as TextureLoader } from "../_libs/@monogrid/gainmap-js+[...].mjs";
import { d as useLoader, h as require_react, m as require_jsx_runtime, u as useFrame } from "../_libs/@react-three/drei+[...].mjs";
import { a as PIECES, o as SEASON } from "./data-CDB2DGpz.mjs";
import { i as useReveal } from "./parts-EjDB_ZGf.mjs";
import { a as useScrollRef, t as Stage } from "./stage-0YGkQRhM.mjs";
import { a as WorldFooter, i as SkipLink, n as LOOKS, o as WorldHeader, r as LookStyle, s as pieceImage, t as Catalogue } from "./looks-Dicv7kDh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/w.atlas-BeDgX8gH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var COLS = 4;
function Wall() {
	const grp = (0, import_react.useRef)(null);
	const scroll = useScrollRef();
	const textures = useLoader(TextureLoader, (0, import_react.useMemo)(() => PIECES.map((p) => pieceImage(p.id, 520, 650)), []));
	useFrame(({ camera }) => {
		const t = scroll.current;
		camera.position.x = -3.4 + t * 7;
		camera.position.y = 1.2 - t * 2.6;
		camera.position.z = 5.2 + t * 9;
		camera.lookAt(camera.position.x * .55, camera.position.y * .55, 0);
		if (grp.current) grp.current.rotation.y = Math.sin(t * 3.14) * .05;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		ref: grp,
		children: textures.map((tex, i) => {
			const col = i % COLS;
			const row = Math.floor(i / COLS);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					(col - (COLS - 1) / 2) * 2.5,
					-(row - 1.5) * 3.1,
					col % 2 ? -.3 : .3
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [2.2, 2.75] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					map: tex,
					toneMapped: false
				})]
			}, i);
		})
	});
}
function Atlas() {
	useReveal();
	const look = LOOKS.atlas;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-atlas min-h-dvh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LookStyle, { look }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipLink, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorldHeader, {
				look,
				label: `${SEASON} · Atlas`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative h-[320vh]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sticky top-0 h-dvh overflow-hidden",
					style: { background: "var(--bg)" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stage, {
						camera: {
							position: [
								-3.4,
								1.2,
								5.2
							],
							fov: 50
						},
						fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-full w-full grid-cols-4 gap-1 p-1",
							children: PIECES.slice(0, 8).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: pieceImage(p.id, 520, 650),
								alt: p.name,
								width: 520,
								height: 650,
								className: "h-full w-full object-cover"
							}, p.id))
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
							fallback: null,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wall, {})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-none absolute inset-x-0 top-0 px-5 pt-10 sm:px-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto max-w-[var(--shell)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "d max-w-[14ch] text-[clamp(2.2rem,7vw,6rem)]",
								children: "The whole wall"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 max-w-[44ch] text-[1rem] leading-[1.6]",
								style: { color: "var(--dim)" },
								children: "Every piece in the edition, at once. Scroll pulls the camera back until the last one is in frame."
							})]
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Catalogue, {
				look,
				heading: "Read it as a list instead"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorldFooter, {
				look,
				note: "react-three-fiber · a flat wall of the full catalogue · camera pans on X and retreats on Z together"
			})
		]
	});
}
//#endregion
export { Atlas as component };
