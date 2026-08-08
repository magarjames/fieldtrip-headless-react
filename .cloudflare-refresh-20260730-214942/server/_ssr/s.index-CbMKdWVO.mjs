import { i as __toESM } from "../_runtime.mjs";
import { At as RepeatWrapping, Kt as Vector3, d as Box3, h as CanvasTexture, jt as SRGBColorSpace } from "../_libs/@monogrid/gainmap-js+[...].mjs";
import { a as Center, f as useThree, h as require_react, i as RoundedBox, m as require_jsx_runtime, n as ContactShadows, r as Environment, t as Lightformer, u as useFrame } from "../_libs/@react-three/drei+[...].mjs";
import { i as useReveal } from "./parts-EjDB_ZGf.mjs";
import { a as PIECES, i as FITS, n as CATS, o as TAGLINE, r as DROP, s as money, t as BRAND } from "./data-pfKPmX5L.mjs";
import { r as useReducedMotion, t as Stage } from "./stage-0YGkQRhM.mjs";
import { t as GLTFLoader } from "../_libs/three.mjs";
import { n as VRMUtils, t as VRMLoaderPlugin } from "../_libs/pixiv__three-vrm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/s.index-CbMKdWVO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* FIELDTRIP — image layer.
*
* No external image service. Real photography, when it exists, is a local file
* under public/fieldtrip. Anything not yet photographed resolves to a swatch
* generated from that garment's own colour, inline as an SVG data URI.
*
* Why not a placeholder service: random stock photography actively misleads on
* a page this art-directed. A visitor cannot tell a stand-in from a product
* shot, and neither can you when reviewing it. A flat colour card with the
* garment's name on it is unmistakably a gap, and it still reads as the brand
* because the colour is the real one from the catalogue.
*/
/** photographed and committed. Everything else falls through to a swatch. */
var LOCAL = {
	"ft-hero": "/fieldtrip/hero.png",
	"ft-fit-euro": "/fieldtrip/fit-euro.png"
};
/** WCAG relative luminance, so the label never lands unreadable on its own hue */
function luminance(hex) {
	const h = hex.replace("#", "");
	const n = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
	const [r, g, b] = [
		0,
		2,
		4
	].map((i) => {
		const v = parseInt(n.slice(i, i + 2), 16) / 255;
		return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4);
	});
	return .2126 * r + .7152 * g + .0722 * b;
}
var INK = "#141317";
var PAPER = "#FBF7EF";
/** the label colour that clears 4.5:1 against the swatch it sits on */
function inkOn(hue) {
	const l = luminance(hue);
	return (l + .05) / (luminance(INK) + .05) >= (luminance(PAPER) + .05) / (l + .05) ? INK : PAPER;
}
/**
* A swatch card: the garment's colour, its name, and a diagonal rule so it can
* never be mistaken for a photograph even at thumbnail size.
*/
function swatch(label, hue, w, h) {
	const fg = inkOn(hue);
	const size = Math.round(Math.min(w, h) * .075);
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="${w}" height="${h}" fill="${hue}"/><path d="M0 ${h} L${w} 0" stroke="${fg}" stroke-opacity="0.16" stroke-width="${Math.max(1, size * .12)}"/><text x="${Math.round(w * .07)}" y="${h - Math.round(h * .055)}" font-family="JetBrains Mono, ui-monospace, monospace" font-size="${size}" letter-spacing="${size * .1}" fill="${fg}" fill-opacity="0.82">${label.toUpperCase().replace(/&/g, "&amp;").replace(/</g, "&lt;")}</text></svg>`;
	return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
/** the one call every image on the page goes through */
function shotFor(item, w = 900, h = 1200) {
	return LOCAL[item.img] ?? swatch(item.name, item.hue ?? "#D8D2C6", w, h);
}
/** for the few images that are not a catalogue piece */
var shot = (key, w = 900, h = 1200, label = "Shot pending", hue = "#D8D2C6") => LOCAL[key] ?? swatch(label, hue, w, h);
var VRM_URL = "/fieldtrip/mascot.vrm";
/** HEAD-probe every candidate so the caller can decide before mounting a Canvas */
function useModelAvailable(urls) {
	const [probe, setProbe] = (0, import_react.useState)({ state: "checking" });
	(0, import_react.useEffect)(() => {
		let live = true;
		(async () => {
			const present = /* @__PURE__ */ new Set();
			await Promise.all(urls.map(async (url) => {
				try {
					const r = await fetch(url, { method: "HEAD" });
					const ct = r.headers.get("content-type") ?? "";
					if (r.ok && !ct.includes("text/html")) present.add(url);
				} catch {}
			}));
			if (live) setProbe({
				state: "ready",
				present
			});
		})();
		return () => {
			live = false;
		};
	}, []);
	return probe;
}
/** a loaded figure is scaled so its height matches the procedural chibi */
var FIGURE_HEIGHT = 2.35;
function VrmFigure({ url = VRM_URL, hide = [], still, onPick, onFail }) {
	const [model, setModel] = (0, import_react.useState)(null);
	const { pointer } = useThree();
	const glbRoot = (0, import_react.useRef)(null);
	const t = (0, import_react.useRef)(0);
	const hot = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		let live = true;
		const loader = new GLTFLoader();
		loader.register((parser) => new VRMLoaderPlugin(parser));
		loader.load(url, (gltf) => {
			if (!live) return;
			const vrm = gltf.userData.vrm;
			if (vrm) {
				VRMUtils.rotateVRM0(vrm);
				VRMUtils.removeUnnecessaryVertices(vrm.scene);
				VRMUtils.combineSkeletons(vrm.scene);
				vrm.scene.traverse((o) => {
					o.frustumCulled = false;
				});
				setModel({
					kind: "vrm",
					vrm
				});
				return;
			}
			const scene = gltf.scene;
			const size = new Box3().setFromObject(scene).getSize(new Vector3());
			if (size.y > 0) scene.scale.setScalar(FIGURE_HEIGHT / size.y);
			scene.traverse((o) => {
				o.frustumCulled = false;
			});
			setModel({
				kind: "glb",
				scene
			});
		}, void 0, () => live && onFail("could not parse the model file"));
		return () => {
			live = false;
		};
	}, [url, onFail]);
	(0, import_react.useEffect)(() => {
		if (!model) return;
		const root = model.kind === "vrm" ? model.vrm.scene : model.scene;
		const wanted = new Set(hide.map((h) => h.toLowerCase()));
		root.traverse((o) => {
			if (o.isMesh) o.visible = !wanted.has(o.name.toLowerCase());
		});
	}, [model, hide]);
	useFrame((_, d) => {
		if (!model) return;
		t.current += d;
		const tx = still ? 0 : pointer.x;
		const ty = still ? 0 : pointer.y;
		if (model.kind === "vrm") {
			const { vrm } = model;
			const h = vrm.humanoid?.getNormalizedBoneNode("head");
			const chest = vrm.humanoid?.getNormalizedBoneNode("chest");
			if (h) {
				h.rotation.y += (tx * .5 - h.rotation.y) * .08;
				h.rotation.x += (-ty * .28 - h.rotation.x) * .08;
			}
			if (chest) chest.rotation.y += (tx * .16 - chest.rotation.y) * .06;
			if (!still) {
				const bob = Math.sin(t.current * 1.5) * .012;
				vrm.scene.position.y = bob + (hot.current ? .03 : 0);
			}
			vrm.update(d);
			return;
		}
		const root = glbRoot.current;
		if (root) {
			root.rotation.y += (tx * .45 - root.rotation.y) * .06;
			root.rotation.x += (-ty * .1 - root.rotation.x) * .06;
			if (!still) {
				const bob = Math.sin(t.current * 1.5) * .03;
				root.position.y += (-.12 + bob + (hot.current ? .06 : 0) - root.position.y) * .1;
			}
		}
	});
	if (!model) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Center, {
		onPointerOver: (e) => {
			e.stopPropagation();
			hot.current = true;
			document.body.style.cursor = "pointer";
		},
		onPointerOut: () => {
			hot.current = false;
			document.body.style.cursor = "";
		},
		onClick: (e) => {
			e.stopPropagation();
			onPick();
		},
		children: model.kind === "vrm" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("primitive", { object: model.vrm.scene }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			ref: glbRoot,
			position: [
				0,
				-.12,
				0
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("primitive", { object: model.scene })
		})
	});
}
var cache = /* @__PURE__ */ new Map();
function shade(hex, amt) {
	const h = hex.replace("#", "");
	const n = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
	return `rgb(${[
		0,
		2,
		4
	].map((i) => {
		const v = parseInt(n.slice(i, i + 2), 16) + amt;
		return Math.max(0, Math.min(255, v));
	}).join(",")})`;
}
function surfaces(size) {
	const col = document.createElement("canvas");
	const bmp = document.createElement("canvas");
	col.width = col.height = bmp.width = bmp.height = size;
	return {
		c: col.getContext("2d"),
		b: bmp.getContext("2d"),
		col,
		bmp
	};
}
function drawJersey(c, b, s, hex) {
	c.fillStyle = hex;
	c.fillRect(0, 0, s, s);
	b.fillStyle = "#808080";
	b.fillRect(0, 0, s, s);
	const step = 7;
	for (let y = 0; y < s; y += step) for (let x = 0; x < s; x += step) {
		const up = (Math.floor(y / step) + Math.floor(x / step)) % 2 === 0;
		c.fillStyle = shade(hex, up ? 20 : -20);
		c.fillRect(x, y, step - 1, step - 1);
		b.fillStyle = up ? "#c0c0c0" : "#484848";
		b.fillRect(x, y, step - 1, step - 1);
	}
}
function drawDenim(c, b, s, hex) {
	c.fillStyle = hex;
	c.fillRect(0, 0, s, s);
	b.fillStyle = "#787878";
	b.fillRect(0, 0, s, s);
	c.lineWidth = 3.5;
	b.lineWidth = 3.5;
	for (let i = -s; i < s * 2; i += 13) {
		c.strokeStyle = shade(hex, 48);
		c.beginPath();
		c.moveTo(i, 0);
		c.lineTo(i + s, s);
		c.stroke();
		b.strokeStyle = "#d2d2d2";
		b.beginPath();
		b.moveTo(i, 0);
		b.lineTo(i + s, s);
		b.stroke();
	}
	for (let n = 0; n < s * 3; n++) {
		const x = Math.random() * s;
		const y = Math.random() * s;
		c.fillStyle = shade(hex, 70);
		c.globalAlpha = .4;
		c.fillRect(x, y, 1, 1);
		c.globalAlpha = 1;
	}
}
function drawCrochet(c, b, s, hex) {
	c.fillStyle = hex;
	c.fillRect(0, 0, s, s);
	b.fillStyle = "#b0b0b0";
	b.fillRect(0, 0, s, s);
	const cell = 26;
	for (let y = cell / 2; y < s; y += cell) for (let x = cell / 2; x < s; x += cell) {
		const off = Math.floor(y / cell) % 2 * (cell / 2);
		c.beginPath();
		c.arc(x + off, y, cell * .26, 0, Math.PI * 2);
		c.fillStyle = shade(hex, -64);
		c.fill();
		b.beginPath();
		b.arc(x + off, y, cell * .26, 0, Math.PI * 2);
		b.fillStyle = "#3a3a3a";
		b.fill();
		c.beginPath();
		c.arc(x + off, y, cell * .36, 0, Math.PI * 2);
		c.strokeStyle = shade(hex, 40);
		c.lineWidth = 4;
		c.stroke();
		b.beginPath();
		b.arc(x + off, y, cell * .36, 0, Math.PI * 2);
		b.strokeStyle = "#f0f0f0";
		b.lineWidth = 4;
		b.stroke();
	}
}
function drawRipstop(c, b, s, hex) {
	c.fillStyle = hex;
	c.fillRect(0, 0, s, s);
	b.fillStyle = "#8c8c8c";
	b.fillRect(0, 0, s, s);
	const grid = 30;
	c.lineWidth = 2.5;
	b.lineWidth = 2.5;
	for (let i = 0; i <= s; i += grid) {
		c.strokeStyle = shade(hex, 46);
		b.strokeStyle = "#c8c8c8";
		for (const ctx of [c, b]) {
			ctx.beginPath();
			ctx.moveTo(i, 0);
			ctx.lineTo(i, s);
			ctx.moveTo(0, i);
			ctx.lineTo(s, i);
			ctx.stroke();
		}
	}
}
function drawLinen(c, b, s, hex) {
	c.fillStyle = hex;
	c.fillRect(0, 0, s, s);
	b.fillStyle = "#8a8a8a";
	b.fillRect(0, 0, s, s);
	for (let n = 0; n < s * 6; n++) {
		const horiz = Math.random() > .5;
		const x = Math.random() * s;
		const y = Math.random() * s;
		const len = 5 + Math.random() * 16;
		const light = Math.random() > .5;
		c.fillStyle = shade(hex, light ? 34 : -30);
		b.fillStyle = light ? "#a8a8a8" : "#6e6e6e";
		for (const ctx of [c, b]) ctx.fillRect(x, y, horiz ? len : 2.2, horiz ? 2.2 : len);
	}
}
function drawMesh(c, b, s, hex) {
	c.fillStyle = hex;
	c.fillRect(0, 0, s, s);
	b.fillStyle = "#a0a0a0";
	b.fillRect(0, 0, s, s);
	const cell = 22;
	for (let y = 0; y < s; y += cell) for (let x = 0; x < s; x += cell) {
		const off = Math.floor(y / cell) % 2 * (cell / 2);
		c.fillStyle = shade(hex, -58);
		c.fillRect(x + off + 2, y + 2, cell - 5, cell - 5);
		b.fillStyle = "#4a4a4a";
		b.fillRect(x + off + 2, y + 2, cell - 5, cell - 5);
	}
}
var DRAW = {
	jersey: drawJersey,
	denim: drawDenim,
	crochet: drawCrochet,
	ripstop: drawRipstop,
	linen: drawLinen,
	mesh: drawMesh
};
/**
* Colour map plus matching bump map for one fabric in one colour.
* Returns null when there is no document, so an SSR pass is a no-op.
*/
function fabricTexture(fabric, hex, repeat = 4, size = 256) {
	if (typeof document === "undefined") return null;
	const key = `${fabric}|${hex}|${repeat}|${size}`;
	const hit = cache.get(key);
	if (hit) return hit;
	const { c, b, col, bmp } = surfaces(size);
	DRAW[fabric](c, b, size, hex);
	const map = new CanvasTexture(col);
	const bump = new CanvasTexture(bmp);
	for (const t of [map, bump]) {
		t.wrapS = t.wrapT = RepeatWrapping;
		t.repeat.set(repeat, repeat);
		t.needsUpdate = true;
	}
	map.colorSpace = SRGBColorSpace;
	bump.colorSpace = "";
	const pair = {
		map,
		bump
	};
	cache.set(key, pair);
	return pair;
}
/** free every cached upload. Called when the hero unmounts. */
function disposeFabrics() {
	cache.forEach(({ map, bump }) => {
		map.dispose();
		bump.dispose();
	});
	cache.clear();
}
var OUTFITS = [
	{
		fitId: "f1",
		name: "Euro Summer",
		skin: "#f0cfae",
		hair: "#c6cde0",
		top: "#F1EDE3",
		topAlt: "#EFE6D2",
		legs: "#F1EDE3",
		shoe: "#f2f0ea",
		cap: null,
		shades: false,
		chains: true,
		shorts: false,
		topFabric: "linen",
		altFabric: "crochet",
		legFabric: "linen",
		model: "/fieldtrip/mascot-euro.glb"
	},
	{
		fitId: "f2",
		name: "Corner Shop",
		skin: "#f0cfae",
		hair: "#c6cde0",
		top: "#F5C518",
		topAlt: "#F5C518",
		legs: "#8FB6D9",
		shoe: "#ffffff",
		cap: "#6B7A42",
		shades: false,
		chains: true,
		shorts: false,
		topFabric: "jersey",
		altFabric: "jersey",
		legFabric: "denim",
		model: "/fieldtrip/mascot-corner.glb"
	},
	{
		fitId: "f3",
		name: "Rest Day",
		skin: "#f0cfae",
		hair: "#c6cde0",
		top: "#3C6EA8",
		topAlt: "#2B5180",
		legs: "#E2673D",
		shoe: "#141317",
		cap: null,
		shades: true,
		chains: false,
		shorts: true,
		topFabric: "ripstop",
		altFabric: "ripstop",
		legFabric: "mesh",
		model: "/fieldtrip/mascot-rest.glb"
	}
];
function Figure({ outfit, onPick, still }) {
	const root = (0, import_react.useRef)(null);
	const head = (0, import_react.useRef)(null);
	const chest = (0, import_react.useRef)(null);
	const armL = (0, import_react.useRef)(null);
	const armR = (0, import_react.useRef)(null);
	const [hot, setHot] = (0, import_react.useState)(false);
	const { pointer } = useThree();
	const t = (0, import_react.useRef)(0);
	useFrame((_, d) => {
		t.current += d;
		const tx = still ? 0 : pointer.x;
		const ty = still ? 0 : pointer.y;
		if (head.current) {
			head.current.rotation.y += (tx * .55 - head.current.rotation.y) * .08;
			head.current.rotation.x += (-ty * .32 - head.current.rotation.x) * .08;
		}
		if (chest.current) chest.current.rotation.y += (tx * .2 - chest.current.rotation.y) * .06;
		if (root.current) {
			const lift = hot ? .12 : 0;
			const bob = still ? 0 : Math.sin(t.current * 1.5) * .035;
			root.current.position.y += (-.62 + bob + lift - root.current.position.y) * .12;
			const tilt = hot ? -.08 : 0;
			root.current.rotation.z += (tilt - root.current.rotation.z) * .1;
		}
		if (chest.current && !still) {
			const b = 1 + Math.sin(t.current * 2.1) * .018;
			chest.current.scale.y = b;
		}
		if (armL.current && armR.current && !still) {
			armL.current.rotation.x = Math.sin(t.current * 1.4) * .12;
			armR.current.rotation.x = Math.sin(t.current * 1.4 + 1.1) * .12;
		}
	});
	const cloth = (color, fabric, repeat = 4, rough = .78) => {
		const tex = fabricTexture(fabric, color, repeat);
		if (!tex) return mat(color, rough);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
			map: tex.map,
			bumpMap: tex.bump,
			bumpScale: fabric === "crochet" || fabric === "mesh" ? .14 : .055,
			roughness: rough,
			metalness: 0,
			clearcoat: fabric === "ripstop" ? .7 : .25,
			clearcoatRoughness: fabric === "ripstop" ? .2 : .5,
			sheen: fabric === "linen" || fabric === "jersey" ? .5 : .2,
			sheenRoughness: .75,
			sheenColor: "#ffffff"
		});
	};
	const mat = (color, rough = .62) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
		color,
		roughness: rough,
		metalness: 0,
		clearcoat: .55,
		clearcoatRoughness: .35,
		sheen: .3,
		sheenRoughness: .7,
		sheenColor: "#ffffff",
		side: 2
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref: root,
		position: [
			0,
			-.62,
			0
		],
		onPointerOver: (e) => {
			e.stopPropagation();
			setHot(true);
			document.body.style.cursor = "pointer";
		},
		onPointerOut: () => {
			setHot(false);
			document.body.style.cursor = "";
		},
		onClick: (e) => {
			e.stopPropagation();
			onPick();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				ref: head,
				position: [
					0,
					1.28,
					0
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						scale: [
							1,
							.94,
							.96
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
							.82,
							64,
							48
						] }), mat(outfit.skin, .62)]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						scale: [
							1.06,
							1.02,
							1.08
						],
						position: [
							0,
							.03,
							-.06
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
							.83,
							36,
							28,
							0,
							Math.PI * 2,
							0,
							Math.PI * .5
						] }), mat(outfit.hair, .5)]
					}),
					[
						[
							-.6,
							.36,
							.32,
							.55,
							-.35,
							.3,
							.62,
							.22
						],
						[
							-.4,
							.37,
							.48,
							.32,
							-.33,
							.32,
							.74,
							.24
						],
						[
							-.17,
							.38,
							.58,
							.13,
							-.3,
							.33,
							.66,
							.24
						],
						[
							.03,
							.38,
							.61,
							-.06,
							-.3,
							.33,
							.58,
							.24
						],
						[
							.24,
							.37,
							.57,
							-.17,
							-.3,
							.33,
							.68,
							.24
						],
						[
							.46,
							.36,
							.46,
							-.36,
							-.33,
							.32,
							.76,
							.24
						],
						[
							.64,
							.33,
							.3,
							-.58,
							-.35,
							.3,
							.6,
							.22
						]
					].map(([lx, ly, lz, rz, rx, sx, sy, sz], n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							lx,
							ly,
							lz
						],
						rotation: [
							Math.PI + rx,
							0,
							rz
						],
						scale: [
							sx,
							sy,
							sz
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
							.5,
							1,
							8,
							1,
							true
						] }), mat(outfit.hair, .55)]
					}, `fringe${n}`)),
					[
						[
							-.74,
							.05,
							.22,
							.2,
							.02,
							.34,
							1.45,
							.26
						],
						[
							-.7,
							.1,
							-.05,
							.12,
							0,
							.32,
							1.25,
							.26
						],
						[
							.74,
							.05,
							.22,
							-.2,
							.02,
							.34,
							1.45,
							.26
						],
						[
							.7,
							.1,
							-.05,
							-.12,
							0,
							.32,
							1.25,
							.26
						]
					].map(([lx, ly, lz, rz, rx, sx, sy, sz], n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							lx,
							ly,
							lz
						],
						rotation: [
							Math.PI + rx,
							0,
							rz
						],
						scale: [
							sx,
							sy,
							sz
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
							.5,
							1,
							8,
							1,
							true
						] }), mat(outfit.hair, .55)]
					}, `side${n}`)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						scale: [
							1.04,
							1.02,
							1.02
						],
						position: [
							0,
							-.02,
							-.14
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
							.83,
							36,
							28,
							0,
							Math.PI * 2,
							0,
							Math.PI * .72
						] }), mat(outfit.hair, .55)]
					}),
					[
						[
							-.55,
							.1,
							-.5,
							.3,
							.12,
							.36,
							1.3,
							.28
						],
						[
							-.28,
							.12,
							-.62,
							.14,
							.14,
							.38,
							1.4,
							.3
						],
						[
							0,
							.12,
							-.66,
							0,
							.15,
							.4,
							1.45,
							.3
						],
						[
							.28,
							.12,
							-.62,
							-.14,
							.14,
							.38,
							1.4,
							.3
						],
						[
							.55,
							.1,
							-.5,
							-.3,
							.12,
							.36,
							1.3,
							.28
						]
					].map(([lx, ly, lz, rz, rx, sx, sy, sz], n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							lx,
							ly,
							lz
						],
						rotation: [
							Math.PI + rx,
							0,
							rz
						],
						scale: [
							sx,
							sy,
							sz
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
							.5,
							1,
							8,
							1,
							true
						] }), mat(outfit.hair, .55)]
					}, `back${n}`)),
					[-.3, .3].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							x,
							0,
							.7
						],
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								scale: [
									1,
									1.32,
									.52
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
									.175,
									32,
									24
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
									color: "#fdfbf7",
									roughness: .22,
									clearcoat: 1,
									clearcoatRoughness: .04
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									-.012,
									.056
								],
								scale: [
									1,
									1.2,
									.4
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
									.128,
									32,
									24
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
									color: "#17584c",
									roughness: .12,
									clearcoat: 1,
									clearcoatRoughness: .04
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									-.012,
									.062
								],
								scale: [
									1,
									1.18,
									.4
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
									.112,
									32,
									24
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
									color: "#3aa795",
									roughness: .1,
									clearcoat: 1,
									clearcoatRoughness: .03
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									-.012,
									.104
								],
								scale: [
									1,
									1.25,
									.32
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
									.05,
									20,
									14
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
									color: "#0f2c26",
									roughness: .15,
									clearcoat: 1,
									clearcoatRoughness: .05
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									x > 0 ? .048 : -.048,
									.058,
									.108
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
									.042,
									16,
									12
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#ffffff" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									x > 0 ? -.032 : .032,
									-.052,
									.1
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
									.02,
									12,
									10
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
									color: "#ffffff",
									transparent: true,
									opacity: .65
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.118,
									.045
								],
								scale: [
									1.04,
									.26,
									.42
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
									.172,
									24,
									14
								] }), mat("#343a44", .5)]
							})
						]
					}, x)),
					[-.3, .3].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							x,
							.235,
							.74
						],
						rotation: [
							0,
							0,
							x > 0 ? -.14 : .14
						],
						scale: [
							.9,
							.2,
							.24
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
							.12,
							20,
							12
						] }), mat("#8a8f9c", .62)]
					}, `brow${x}`)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							-.31,
							.745
						],
						scale: [
							1,
							.6,
							.34
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
							.046,
							20,
							14
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
							color: "#a05a50",
							roughness: .3,
							clearcoat: .85,
							clearcoatRoughness: .1
						})]
					}),
					[-.45, .45].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							x,
							-.17,
							.7
						],
						rotation: [
							0,
							x > 0 ? -.42 : .42,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.11, 20] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
							color: "#e8846f",
							transparent: true,
							opacity: .45
						})]
					}, x)),
					outfit.shades && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							0,
							.02,
							.8
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoundedBox, {
							args: [
								.98,
								.21,
								.24
							],
							radius: .055,
							smoothness: 4,
							scale: [
								1,
								1,
								.45
							],
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
								color: "#141317",
								roughness: .08,
								metalness: .2,
								clearcoat: 1,
								clearcoatRoughness: .04
							})
						}), [-.47, .47].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								x,
								.02,
								-.19
							],
							rotation: [
								0,
								x > 0 ? .62 : -.62,
								0
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								.3,
								.07,
								.05
							] }), mat("#141317", .3)]
						}, x))]
					}),
					outfit.cap && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							0,
							.62,
							.02
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							scale: [
								1,
								.6,
								1
							],
							position: [
								0,
								-.04,
								0
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
								.845,
								44,
								24,
								0,
								Math.PI * 2,
								0,
								Math.PI * .5
							] }), mat(outfit.cap, .8)]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								0,
								-.07,
								.3
							],
							rotation: [
								-.1,
								0,
								0
							],
							scale: [
								1.02,
								.085,
								1.42
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
								.6,
								40,
								20,
								0,
								Math.PI * 2,
								0,
								Math.PI / 2
							] }), mat(outfit.cap, .72)]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				ref: chest,
				position: [
					0,
					.52,
					0
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoundedBox, {
						args: [
							1.06,
							.78,
							.62
						],
						radius: .14,
						smoothness: 5,
						castShadow: true,
						receiveShadow: true,
						children: cloth(outfit.top, outfit.topFabric, 1.6)
					}),
					outfit.topAlt !== outfit.top && [-.6, .6].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoundedBox, {
						args: [
							.15,
							.92,
							.56
						],
						radius: .06,
						smoothness: 4,
						position: [
							x,
							-.06,
							-.04
						],
						rotation: [
							0,
							0,
							x > 0 ? -.08 : .08
						],
						castShadow: true,
						children: cloth(outfit.topAlt, outfit.altFabric, 1.4)
					}, x)),
					outfit.chains && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.08,
							.34
						],
						rotation: [
							-.5,
							0,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
							.26,
							.028,
							10,
							40
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#d8d8de",
							roughness: .22,
							metalness: .85
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						ref: armL,
						position: [
							-.62,
							.2,
							.06
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								0,
								-.24,
								0
							],
							rotation: [
								0,
								0,
								.12
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
								.15,
								.34,
								10,
								32
							] }), cloth(outfit.top, outfit.topFabric, 1.2)]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								-.04,
								-.58,
								0
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
								.145,
								32,
								24
							] }), mat(outfit.skin, .62)]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						ref: armR,
						position: [
							.62,
							.2,
							.06
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								0,
								-.24,
								0
							],
							rotation: [
								0,
								0,
								-.12
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
								.15,
								.34,
								10,
								32
							] }), cloth(outfit.top, outfit.topFabric, 1.2)]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								.04,
								-.58,
								0
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
								.145,
								32,
								24
							] }), mat(outfit.skin, .62)]
						})]
					})
				]
			}),
			[-.24, .24].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					x,
					0,
					0
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							outfit.shorts ? -.02 : -.24,
							0
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: outfit.shorts ? [
							.24,
							.34,
							.42,
							40
						] : [
							.25,
							.44,
							.86,
							44
						] }), cloth(outfit.legs, outfit.legFabric, outfit.shorts ? 1 : .8)]
					}),
					outfit.shorts && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							-.42,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
							.12,
							.3,
							6,
							16
						] }), mat(outfit.skin, .62)]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoundedBox, {
						args: [
							.34,
							.19,
							.56
						],
						radius: .075,
						smoothness: 5,
						position: [
							x > 0 ? .02 : -.02,
							-.72,
							.09
						],
						castShadow: true,
						children: mat(outfit.shoe, .45)
					})
				]
			}, x)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					0,
					-.865,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					receiveShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.86,
						.94,
						.1,
						56
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
						color: "#1b1a1f",
						roughness: .32,
						metalness: .12,
						clearcoat: .9,
						clearcoatRoughness: .14
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.058,
						0
					],
					receiveShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.8,
						.86,
						.022,
						56
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
						color: "#2b2a32",
						roughness: .26,
						clearcoat: 1,
						clearcoatRoughness: .08
					})]
				})]
			})
		]
	});
}
/** every model file the hero can use: a rigged VRM wins outright, otherwise
each fit wears its own sculpted glb */
var MODEL_CANDIDATES = [VRM_URL, ...OUTFITS.map((o) => o.model)];
function ChibiHero({ fallbackSrc }) {
	const [i, setI] = (0, import_react.useState)(0);
	const reduced = useReducedMotion();
	const outfit = OUTFITS[i];
	const fit = (0, import_react.useMemo)(() => FITS.find((f) => f.id === outfit.fitId), [outfit.fitId]);
	const next = () => setI((v) => (v + 1) % OUTFITS.length);
	(0, import_react.useEffect)(() => () => disposeFabrics(), []);
	const modelProbe = useModelAvailable(MODEL_CANDIDATES);
	const [vrmBroken, setVrmBroken] = (0, import_react.useState)(false);
	const modelUrl = modelProbe.state === "ready" && !vrmBroken ? modelProbe.present.has("/fieldtrip/mascot.vrm") ? VRM_URL : modelProbe.present.has(outfit.model) ? outfit.model : void 0 : void 0;
	const onVrmFail = (0, import_react.useCallback)((reason) => {
		console.warn(`[FIELDTRIP] model unavailable, using the procedural chibi: ${reason}`);
		setVrmBroken(true);
	}, []);
	console.log("[dbg] probe", modelProbe.state, modelProbe.state === "ready" ? [...modelProbe.present].join(",") : "", "-> url:", modelUrl);
	(0, import_react.useEffect)(() => {
		if (modelProbe.state !== "ready") return;
		modelProbe.present.forEach((u) => {
			fetch(u).then((r) => r.arrayBuffer()).catch(() => {});
		});
	}, [modelProbe]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-[3/4] w-full overflow-hidden border-2",
			style: { borderColor: "var(--ink)" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stage, {
				camera: {
					position: [
						0,
						.21,
						6.4
					],
					fov: 38
				},
				dpr: [1, 2],
				antialias: true,
				shadows: true,
				fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: fallbackSrc,
					alt: "A full look from the drop: graphic tee under an open crochet shirt with wide jeans.",
					width: 900,
					height: 1200,
					className: "h-full w-full object-cover"
				}),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Environment, {
						resolution: 256,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightformer, {
								form: "rect",
								intensity: 2.4,
								position: [
									2.5,
									3,
									3
								],
								scale: [
									6,
									6,
									1
								],
								target: [
									0,
									0,
									0
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightformer, {
								form: "rect",
								intensity: .9,
								position: [
									-3.5,
									1,
									-1
								],
								scale: [
									5,
									5,
									1
								],
								color: "#a8c4e0",
								target: [
									0,
									0,
									0
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightformer, {
								form: "ring",
								intensity: .7,
								position: [
									0,
									-2,
									2
								],
								scale: 3,
								color: "#ffe9c9",
								target: [
									0,
									0,
									0
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: .4 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
						position: [
							2.6,
							4.4,
							3.2
						],
						intensity: 2.1,
						castShadow: true,
						"shadow-mapSize": [1024, 1024],
						"shadow-bias": -.0012,
						"shadow-normalBias": .02
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
						position: [
							-4,
							1,
							-2
						],
						intensity: .35,
						color: "#9fb8d6"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactShadows, {
						position: [
							0,
							-1.58,
							0
						],
						opacity: .28,
						scale: 4.4,
						blur: 2.6,
						far: 2.2,
						resolution: 512,
						color: "#141317"
					}),
					modelUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VrmFigure, {
						url: modelUrl,
						still: reduced,
						onPick: next,
						onFail: onVrmFail,
						hide: OUTFITS.filter((o) => o !== outfit).map((o) => o.name)
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
						outfit,
						onPick: next,
						still: reduced
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "lbl pointer-events-none absolute bottom-3 left-3 px-2 py-1",
				style: {
					background: "var(--ink)",
					color: "var(--paper)"
				},
				"aria-hidden": true,
				children: "Tap to change fit"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 flex flex-wrap items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "chip",
				onClick: next,
				children: "Change the fit"
			}), OUTFITS.map((o, n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "chip",
				"aria-pressed": n === i,
				onClick: () => setI(n),
				children: o.name
			}, o.fitId))]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "lbl mt-3",
			"aria-live": "polite",
			style: { color: "var(--dim)" },
			children: ["Wearing: ", fit ? `${fit.name} · ${fit.note}` : outfit.name]
		})
	] });
}
function Fieldtrip() {
	useReveal();
	const [cat, setCat] = (0, import_react.useState)("all");
	const shown = cat === "all" ? PIECES : PIECES.filter((p) => p.cat === cat);
	const byId = (id) => PIECES.find((p) => p.id === id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "ft min-h-dvh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        .ft{
          --paper:#FBF7EF; --ink:#141317; --dim:#565462; --hair:rgba(20,19,23,0.16);
          --pop:#F5C518; --pop-ink:#141317;
          background:var(--paper); color:var(--ink);
          font-family:Archivo,"Helvetica Neue",sans-serif;
        }
        .ft h1,.ft h2,.ft h3{ font-family:"Archivo Black",Archivo,sans-serif; margin:0;
          letter-spacing:-0.045em; line-height:0.9; text-transform:uppercase }
        .ft p{ margin:0; line-height:1.55 }
        .ft a{ color:inherit; text-decoration:none }
        .ft :focus-visible{ outline:3px solid var(--ink); outline-offset:2px }
        .ft .lbl{ font-family:"JetBrains Mono",monospace; font-size:0.66rem;
          text-transform:uppercase; letter-spacing:0.14em }
        .ft .shell{ max-width:1560px; margin-inline:auto; padding-inline:clamp(1rem,4vw,2.25rem) }
        .ft .btn{ display:inline-flex; align-items:center; min-height:44px; padding:0 1.4rem;
          border-radius:999px; background:var(--ink); color:var(--paper);
          font-weight:700; font-size:0.85rem; letter-spacing:-0.01em;
          transition:transform .2s cubic-bezier(.16,1,.3,1) }
        .ft .btn:active{ transform:scale(.97) }
        .ft .chip{ display:inline-flex; align-items:center; min-height:44px; padding:0 1.05rem;
          border-radius:999px; border:2px solid var(--ink); font-weight:700; font-size:0.82rem;
          background:transparent; transition:background .18s, color .18s }
        .ft .chip[aria-pressed="true"]{ background:var(--ink); color:var(--paper) }
        /* the per-piece hue only paints on intent, so the grid is calm at rest */
        .ft .card .plate{ transition:background .3s cubic-bezier(.16,1,.3,1) }
        .ft .card:hover .plate,.ft .card:focus-within .plate{ background:var(--hue) }
        .ft .card img{ transition:transform .5s cubic-bezier(.16,1,.3,1) }
        .ft .card:hover img,.ft .card:focus-within img{ transform:scale(1.04) rotate(-1deg) }
        .ft .rv{ opacity:0; transform:translateY(18px);
          transition:opacity .6s cubic-bezier(.16,1,.3,1), transform .6s cubic-bezier(.16,1,.3,1) }
        .ft .rv.in{ opacity:1; transform:none }
        .ft .ticker{ display:flex; gap:2.5rem; white-space:nowrap; animation:ft-roll 26s linear infinite }
        @keyframes ft-roll{ to{ transform:translateX(-50%) } }
        @media (prefers-reduced-motion:reduce){
          .ft *{ animation:none !important; transition-duration:.01ms !important }
          .ft .rv{ opacity:1; transform:none }
        }
      ` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#fits",
				className: "btn absolute left-[-9999px] z-50 focus:left-4 focus:top-4",
				children: "Skip to the fits"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "shell flex items-center gap-4 py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[1.15rem] font-black tracking-[-0.05em]",
						children: BRAND
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "lbl hidden sm:inline",
						style: { color: "var(--dim)" },
						children: DROP
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex-1" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "#grid",
						className: "btn",
						children: ["Shop ", 18]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "shell grid items-end gap-8 pb-10 pt-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-[clamp(2.9rem,7.5vw,10rem)]",
							children: TAGLINE
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-6 max-w-[46ch] text-[1.05rem]",
							style: { color: "var(--dim)" },
							children: [18, " pieces built to be layered, not admired one at a time. Wide bottoms, boxy tops, and enough colour to ruin a capsule wardrobe."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-7 flex flex-wrap gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#fits",
								className: "btn",
								children: "See the fits"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#grid",
								className: "chip",
								children: "Every piece"
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChibiHero, { fallbackSrc: shot("ft-hero", 900, 1200) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden border-y-2 py-2.5",
				style: {
					borderColor: "var(--ink)",
					background: "var(--pop)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "ticker lbl",
					"aria-hidden": true,
					children: Array.from({ length: 2 }).flatMap((_, r) => [
						"Free returns for 30 days",
						"Ships worldwide",
						`${DROP} out now`,
						"Nothing restocked",
						"Cut wide on purpose"
					].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [t, " ✱"] }, `${r}-${t}`)))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "fits",
				className: "shell py-16 sm:py-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "max-w-[16ch] text-[clamp(1.9rem,5.4vw,4rem)]",
					children: "Three fits, eighteen pieces"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-8 lg:grid-cols-3",
					children: FITS.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rv",
						style: { ["--index"]: i },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative overflow-hidden border-2",
								style: { borderColor: "var(--ink)" },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: shotFor({
										img: f.img,
										name: f.name,
										hue: byId(f.pieces[0])?.hue
									}, 800, 1420),
									alt: `${f.name}: ${f.note}`,
									width: 800,
									height: 1420,
									loading: "lazy",
									className: "aspect-[9/16] w-full object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "lbl absolute left-0 top-0 px-2.5 py-1.5 font-bold",
									style: {
										background: "var(--ink)",
										color: "var(--paper)"
									},
									children: f.place
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 text-[1.6rem]",
								children: f.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-[0.95rem]",
								style: { color: "var(--dim)" },
								children: f.note
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-3 flex list-none flex-wrap gap-1.5 p-0",
								children: f.pieces.map((pid) => {
									const p = byId(pid);
									if (!p) return null;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: "#grid",
										className: "lbl inline-flex min-h-11 items-center rounded-full border px-3",
										style: { borderColor: "var(--hair)" },
										children: [
											p.name,
											" · ",
											money(p.price)
										]
									}) }, pid);
								})
							})
						]
					}, f.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "grid",
				className: "shell pb-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-baseline justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-[clamp(1.9rem,5.4vw,4rem)]",
							children: "Everything"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "lbl",
							style: { color: "var(--dim)" },
							children: [shown.length, " shown"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 flex flex-wrap gap-2",
						role: "group",
						"aria-label": "Filter by category",
						children: ["all", ...CATS.map((c) => c.id)].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "chip",
							"aria-pressed": cat === c,
							onClick: () => setCat(c),
							children: c === "all" ? "Everything" : CATS.find((x) => x.id === c).label
						}, c))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 lg:grid-cols-4",
						children: shown.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
							className: "card rv",
							style: { ["--hue"]: p.hue },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "#grid",
								className: "block",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "plate overflow-hidden border-2 p-2",
										style: { borderColor: "var(--ink)" },
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: shotFor(p, 800, p.crop === "reel" ? 1420 : 800),
											alt: p.name,
											width: 800,
											height: p.crop === "reel" ? 1420 : 800,
											loading: "lazy",
											className: `w-full object-cover ${p.crop === "reel" ? "aspect-[9/16]" : "aspect-square"}`
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex items-baseline justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-[1rem]",
											children: p.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "lbl",
											style: { fontVariantNumeric: "tabular-nums" },
											children: money(p.price)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1.5 text-[0.88rem]",
										style: { color: "var(--dim)" },
										children: p.line
									})
								]
							})
						}, p.id))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t-2",
				style: { borderColor: "var(--ink)" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "shell py-14",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[clamp(3rem,17vw,14rem)] font-black uppercase leading-[0.8] tracking-[-0.06em]",
						children: BRAND
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "lbl mt-6 max-w-[70ch]",
						style: { color: "var(--dim)" },
						children: "Bright build · fits before garments · 9:16 crops · colour carried per piece. All imagery generated original. No third-party photography or likeness."
					})]
				})
			})
		]
	});
}
//#endregion
export { Fieldtrip as component };
