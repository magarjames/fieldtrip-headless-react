import { i as __toESM } from "../_runtime.mjs";
import { Dt as RGBAFormat, E as EventDispatcher, Gt as Vector2, Ht as Uniform, Kt as Vector3, Lt as Sphere, M as HalfFloatType, Mt as Scene, Nt as ShaderMaterial, O as Float32BufferAttribute, Ot as Raycaster, Qt as performance_default, S as DataUtils, Tt as Quaternion, Ut as UniformsUtils, Yt as WebGLRenderTarget, Z as LinearFilter, Zt as init_performance, _ as Clock, _t as Object3D, d as Box3, h as CanvasTexture, k as FloatType, m as Camera, ot as Matrix4, p as BufferGeometry, q as Line3, qt as Vector4, r as ShaderChunk, s as three_module_exports, st as Mesh, ut as MeshPhysicalMaterial, v as Color, vt as OrthographicCamera, x as DataTextureLoader } from "./@monogrid/gainmap-js+[...].mjs";
import { c as createPortal, d as useLoader, f as useThree, h as require_react, l as extend, m as require_jsx_runtime, o as Canvas, s as applyProps, u as useFrame } from "./@react-three/drei+[...].mjs";
//#region node_modules/@shadergradient/react/dist/chunk-27WNIDXB.mjs
var import_jsx_runtime = require_jsx_runtime();
var e$16 = 192;
function n$16({ type: r }) {
	return (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		r === "plane" && (0, import_jsx_runtime.jsx)("planeGeometry", { args: [
			10,
			10,
			1,
			e$16
		] }),
		r === "sphere" && (0, import_jsx_runtime.jsx)("icosahedronGeometry", { args: [1, e$16 / 3] }),
		r === "waterPlane" && (0, import_jsx_runtime.jsx)("planeGeometry", { args: [
			10,
			10,
			e$16,
			e$16
		] })
	] });
}
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-F3ULA5MU.mjs
function n$15(r) {
	let t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r);
	return t ? {
		r: parseInt(t[1], 16),
		g: parseInt(t[2], 16),
		b: parseInt(t[3], 16)
	} : null;
}
function e$15(r) {
	let t = r.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	return t ? {
		r: parseInt(t[1]),
		g: parseInt(t[2]),
		b: parseInt(t[3])
	} : null;
}
function s$7(r) {
	if (r.startsWith("#")) return n$15(r);
	if (r.startsWith("rgb")) return e$15(r);
	throw new Error("Invalid color format");
}
function a$7(r = 0) {
	return r / 255;
}
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-7RJG5BRD.mjs
var p$7 = Object.create;
var h$5 = Object.defineProperty, q$2 = Object.defineProperties, r$6 = Object.getOwnPropertyDescriptor, s$6 = Object.getOwnPropertyDescriptors, t$10 = Object.getOwnPropertyNames, g$4 = Object.getOwnPropertySymbols, u$2 = Object.getPrototypeOf, k$4 = Object.prototype.hasOwnProperty, m$3 = Object.prototype.propertyIsEnumerable;
var l$5 = (a, b, c) => b in a ? h$5(a, b, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: c
}) : a[b] = c, w$2 = (a, b) => {
	for (var c in b || (b = {})) k$4.call(b, c) && l$5(a, c, b[c]);
	if (g$4) for (var c of g$4(b)) m$3.call(b, c) && l$5(a, c, b[c]);
	return a;
}, x$3 = (a, b) => q$2(a, s$6(b));
var y$5 = (a, b) => {
	var c = {};
	for (var d in a) k$4.call(a, d) && b.indexOf(d) < 0 && (c[d] = a[d]);
	if (a != null && g$4) for (var d of g$4(a)) b.indexOf(d) < 0 && m$3.call(a, d) && (c[d] = a[d]);
	return c;
};
var z$1 = (a, b) => () => (b || a((b = { exports: {} }).exports, b), b.exports), A$3 = (a, b) => {
	for (var c in b) h$5(a, c, {
		get: b[c],
		enumerable: !0
	});
}, v$6 = (a, b, c, d) => {
	if (b && typeof b == "object" || typeof b == "function") for (let e of t$10(b)) !k$4.call(a, e) && e !== c && h$5(a, e, {
		get: () => b[e],
		enumerable: !(d = r$6(b, e)) || d.enumerable
	});
	return a;
};
var B$3 = (a, b, c) => (c = a != null ? p$7(u$2(a)) : {}, v$6(b || !a || !a.__esModule ? h$5(c, "default", {
	value: a,
	enumerable: !0
}) : c, a));
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-HXMZSSU4.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var A$2 = ({ animate: g, range: N, rangeStart: m, rangeEnd: E, loop: j, loopDuration: f, reflection: R, uniforms: D, vertexShader: H, fragmentShader: M, onInit: T, shader: b }) => {
	let p = (0, import_react.useRef)(new Clock()), e = (0, import_react.useMemo)(() => {
		let s = Object.entries(D), L = D.colors, t = s$7(L[0]), a = s$7(L[1]), u = s$7(L[2]), w = {
			uC1r: { value: a$7(t == null ? void 0 : t.r) },
			uC1g: { value: a$7(t == null ? void 0 : t.g) },
			uC1b: { value: a$7(t == null ? void 0 : t.b) },
			uC2r: { value: a$7(a == null ? void 0 : a.r) },
			uC2g: { value: a$7(a == null ? void 0 : a.g) },
			uC2b: { value: a$7(a == null ? void 0 : a.b) },
			uC3r: { value: a$7(u == null ? void 0 : u.r) },
			uC3g: { value: a$7(u == null ? void 0 : u.g) },
			uC3b: { value: a$7(u == null ? void 0 : u.b) }
		}, F = s.reduce((o, [y, O]) => {
			let P = UniformsUtils.clone({ [y]: { value: O } });
			return w$2(w$2({}, o), P);
		}, {}), i = {
			userData: F,
			metalness: b === "glass" ? 0 : .2,
			roughness: b === "glass" ? .1 : 1 - (typeof R == "number" ? R : .1),
			side: 2,
			onBeforeCompile: (o) => {
				o.uniforms = w$2(w$2(w$2({}, o.uniforms), F), w), o.vertexShader = H, o.fragmentShader = M;
			}
		};
		b === "glass" && (i.transparent = !0, i.opacity = .3, i.transmission = .9, i.thickness = .5, i.clearcoat = 1, i.clearcoatRoughness = 0, i.ior = 1.5, i.envMapIntensity = 1);
		let c = new MeshPhysicalMaterial(i);
		return s.forEach(([o]) => Object.defineProperty(c, o, {
			get: () => c.uniforms[o].value,
			set: (y) => c.uniforms[o].value = y
		})), T && T(c), c;
	}, [
		D,
		H,
		M,
		T,
		R,
		b
	]);
	return (0, import_react.useEffect)(() => () => {
		e.dispose();
	}, [e]), (0, import_react.useEffect)(() => {
		g === "on" ? p.current.start() : p.current.stop();
	}, [g]), useFrame(() => {
		if (g === "on" && e.userData.uTime) {
			let s = p.current.getElapsedTime();
			j === "on" && Number.isFinite(f) && f > 0 ? (s = s % f, e.userData.uLoop && (e.userData.uLoop.value = 1), e.userData.uLoopDuration && (e.userData.uLoopDuration.value = f)) : (e.userData.uLoop && (e.userData.uLoop.value = 0), N === "enabled" && Number.isFinite(m) && Number.isFinite(E) && E > m && (s = m + s, s >= E && (s = m, p.current.start()))), e.userData.uTime.value = s;
		}
	}), (0, import_jsx_runtime.jsx)("primitive", {
		attach: "material",
		object: e
	});
};
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-OZWEDB42.mjs
var o$6 = {};
A$3(o$6, {
	fragment: () => n$14,
	vertex: () => e$14
});
var n$14 = `
#define STANDARD
#ifdef PHYSICAL
#define REFLECTIVITY
#define CLEARCOAT
#define TRANSMISSION
#endif

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;

#ifdef TRANSMISSION
uniform float transmission;
#endif
#ifdef REFLECTIVITY
uniform float reflectivity;
#endif
#ifdef CLEARCOAT
uniform float clearcoat;
uniform float clearcoatRoughness;
#endif
#ifdef USE_SHEEN
uniform vec3 sheen;
#endif
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
#ifdef USE_TANGENT
varying vec3 vTangent;
varying vec3 vBitangent;
#endif
#endif
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <color_pars_fragment>
#include <common>
#include <dithering_pars_fragment>
#include <emissivemap_pars_fragment>
#include <lightmap_pars_fragment>
#include <map_pars_fragment>
#include <packing>
#include <uv2_pars_fragment>
#include <uv_pars_fragment>
// #include <transmissionmap_pars_fragment>
#include <bsdfs>
#include <bumpmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <clipping_planes_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <lights_physical_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <shadowmap_pars_fragment>
// include\uB97C \uD1B5\uD574 \uAC00\uC838\uC628 \uAC12\uC740 \uB300\uBD80\uBD84 \uD658\uACBD, \uBE5B \uB4F1\uC744 \uACC4\uC0B0\uD558\uAE30 \uC704\uD574\uC11C \uAE30\uBCF8 fragment
// shader\uC758 \uAC12\uB4E4\uC744 \uBC1B\uC544\uC654\uC2B5\uB2C8\uB2E4. \uC77C\uB2E8\uC740 \uBB34\uC2DC\uD558\uC154\uB3C4 \uB429\uB2C8\uB2E4.

varying vec3 vNormal;
varying float displacement;
varying vec3 vPos;
varying float vDistort;

uniform float uC1r;
uniform float uC1g;
uniform float uC1b;
uniform float uC2r;
uniform float uC2g;
uniform float uC2b;
uniform float uC3r;
uniform float uC3g;
uniform float uC3b;

varying vec3 color1;
varying vec3 color2;
varying vec3 color3;

// for npm package, need to add this manually
float linearToRelativeLuminance2( const in vec3 color ) {
    vec3 weights = vec3( 0.2126, 0.7152, 0.0722 );
    return dot( weights, color.rgb );
}

void main() {

  //-------- basic gradient ------------
  vec3 color1 = vec3(uC1r, uC1g, uC1b);
  vec3 color2 = vec3(uC2r, uC2g, uC2b);
  vec3 color3 = vec3(uC3r, uC3g, uC3b);
  float clearcoat = 1.0;
  float clearcoatRoughness = 0.5;

  #include <clipping_planes_fragment>

  vec4 diffuseColor = vec4(
      mix(mix(color1, color2, smoothstep(-3.0, 3.0, vPos.x)), color3, vPos.z),
      1);
  // diffuseColor\uB294 \uC624\uBE0C\uC81D\uD2B8\uC758 \uBCA0\uC774\uC2A4 \uC0C9\uC0C1 (\uD658\uACBD\uC774\uB098 \uBE5B\uC774 \uACE0\uB824\uB418\uC9C0 \uC54A\uC740 \uBCF8\uC5F0\uC758
  // \uC0C9)

  // mix(x, y, a): a\uB97C \uCD95\uC73C\uB85C \uD588\uC744 \uB54C \uAC00\uC7A5 \uB0AE\uC740 \uAC12\uC5D0\uC11C x\uAC12\uC758 \uC601\uD5A5\uB825\uC744 100%, \uAC00\uC7A5
  // \uB192\uC740 \uAC12\uC5D0\uC11C y\uAC12\uC758 \uC601\uD5A5\uB825\uC744 100%\uB85C \uB9CC\uB4E0\uB2E4. smoothstep(x, y, a): a\uCD95\uC744
  // \uAE30\uC900\uC73C\uB85C x\uB97C \uCD5C\uC18C\uAC12, y\uB97C \uCD5C\uB300\uAC12\uC73C\uB85C \uADF8 \uC0AC\uC774\uC758 \uAC12\uC744 \uCABC\uAC20\uB2E4. x\uC640 y \uC0AC\uC774\uB97C
  // 0-100 \uC0AC\uC774\uC758 \uADF8\uB77C\uB514\uC5B8\uD2B8\uCC98\uB7FC \uB2E8\uACC4\uBCC4\uB85C \uD45C\uD604\uD558\uACE0, x \uBBF8\uB9CC\uC758 \uAC12\uC740 0, y \uC774\uC0C1\uC758
  // \uAC12\uC740 100\uC73C\uB85C \uCC98\uB9AC

  // 1. smoothstep(-3.0, 3.0,vPos.x)\uB85C x\uCD95\uC758 \uADF8\uB77C\uB514\uC5B8\uD2B8\uAC00 \uD45C\uD604 \uB420 \uBC94\uC704\uB97C -3,
  // 3\uC73C\uB85C \uC815\uD55C\uB2E4.
  // 2. mix(color1, color3, smoothstep(-3.0, 3.0,vPos.x))\uB85C color1\uACFC color3\uC744
  // \uC704\uC758 \uBC94\uC704 \uC548\uC5D0\uC11C \uADF8\uB77C\uB514\uC5B8\uD2B8\uB85C \uD45C\uD604\uD55C\uB2E4.
  // \uC608\uB97C \uB4E4\uC5B4 color1\uC774 \uB178\uB791, color3\uC774 \uD30C\uB791\uC774\uB77C\uACE0 \uCE58\uBA74, x\uCD95 \uAE30\uC900 -3\uBD80\uD130 3\uAE4C\uC9C0
  // \uB178\uB791\uACFC \uD30C\uB791 \uC0AC\uC774\uC758 \uADF8\uB77C\uB514\uC5B8\uD2B8\uAC00 \uB098\uD0C0\uB098\uACE0, -3\uBCF4\uB2E4 \uC791\uC740 \uAC12\uC5D0\uC11C\uB294 \uACC4\uC18D \uB178\uB791,
  // 3\uBCF4\uB2E4 \uD070 \uAC12\uC5D0\uC11C\uB294 \uACC4\uC18D \uD30C\uB791\uC774 \uB098\uD0C0\uB09C\uB2E4.
  // 3. mix()\uB97C \uD55C \uBC88 \uB354 \uC0AC\uC6A9\uD574\uC11C \uC704\uC758 \uADF8\uB77C\uB514\uC5B8\uD2B8\uC640 color2\uB97C z\uCD95 \uAE30\uC900\uC73C\uB85C
  // \uBD84\uBC30\uD55C\uB2E4.

  //-------- materiality ------------
  ReflectedLight reflectedLight =
      ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));
  vec3 totalEmissiveRadiance = emissive;

  #ifdef TRANSMISSION
    float totalTransmission = transmission;
  #endif
  #include <logdepthbuf_fragment>
  #include <map_fragment>
  #include <color_fragment>
  #include <alphamap_fragment>
  #include <alphatest_fragment>
  #include <roughnessmap_fragment>
  #include <metalnessmap_fragment>
  #include <normal_fragment_begin>
  #include <normal_fragment_maps>
  #include <clearcoat_normal_fragment_begin>
  #include <clearcoat_normal_fragment_maps>
  #include <emissivemap_fragment>
  // #include <transmissionmap_fragment>
  #include <lights_physical_fragment>
  #include <lights_fragment_begin>
  #include <lights_fragment_maps>
  #include <lights_fragment_end>
  #include <aomap_fragment>
    vec3 outgoingLight =
        reflectedLight.directDiffuse + reflectedLight.indirectDiffuse +
        reflectedLight.directSpecular + reflectedLight.indirectSpecular;
    //\uC704\uC5D0\uC11C \uC815\uC758\uD55C diffuseColor\uC5D0 \uD658\uACBD\uC774\uB098 \uBC18\uC0AC\uAC12\uB4E4\uC744 \uBC18\uC601\uD55C \uAC12.
  #ifdef TRANSMISSION
    diffuseColor.a *=
        mix(saturate(1. - totalTransmission +
                    linearToRelativeLuminance2(reflectedLight.directSpecular +
                                              reflectedLight.indirectSpecular)),
            1.0, metalness);
  #endif


  #include <tonemapping_fragment>
  #include <encodings_fragment>
  #include <fog_fragment>
  #include <premultiplied_alpha_fragment>
  #include <dithering_fragment>


  gl_FragColor = vec4(outgoingLight, diffuseColor.a);
  // gl_FragColor\uAC00 fragment shader\uB97C \uD1B5\uD574 \uB098\uD0C0\uB098\uB294 \uCD5C\uC885\uAC12\uC73C\uB85C, diffuseColor\uC5D0\uC11C
  // \uC815\uC758\uD55C \uADF8\uB77C\uB514\uC5B8\uD2B8 \uC0C9\uC0C1 \uC704\uC5D0 \uBC18\uC0AC\uB098 \uBE5B\uC744 \uACC4\uC0B0\uD55C \uAC12\uC744 \uCD5C\uC885\uAC12\uC73C\uB85C \uC815\uC758.
  // gl_FragColor = vec4(mix(mix(color1, color3, smoothstep(-3.0, 3.0,vPos.x)),
  // color2, vNormal.z), 1.0); \uC704\uCC98\uB7FC \uCD5C\uC885\uAC12\uC744 \uADF8\uB77C\uB514\uC5B8\uD2B8 \uAC12 \uC790\uCCB4\uB97C \uB123\uC73C\uBA74 \uD658\uACBD
  // \uC601\uD5A5\uC5C6\uB294 \uADF8\uB77C\uB514\uC5B8\uD2B8\uB9CC \uD45C\uD604\uB428.
}
`;
var e$14 = `// #pragma glslify: cnoise3 = require(glsl-noise/classic/3d) 

// noise source from https://github.com/hughsk/glsl-noise/blob/master/periodic/3d.glsl

vec3 mod289(vec3 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x)
{
  return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec3 fade(vec3 t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float cnoise(vec3 P)
{
  vec3 Pi0 = floor(P); // Integer part for indexing
  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  vec3 Pf0 = fract(P); // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 * (1.0 / 7.0);
  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 * (1.0 / 7.0);
  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
  return 2.2 * n_xyz;
}

//-------- start here ------------

mat3 rotation3dY(float angle) {
  float s = sin(angle);
  float c = cos(angle);

  return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);
}

vec3 rotateY(vec3 v, float angle) { return rotation3dY(angle) * v; }

varying vec3 vNormal;
varying float displacement;
varying vec3 vPos;
varying float vDistort;

varying vec2 vUv;

uniform float uTime;
uniform float uSpeed;
uniform float uLoop;
uniform float uLoopDuration;

uniform float uLoadingTime;

uniform float uNoiseDensity;
uniform float uNoiseStrength;

#define STANDARD
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
#ifdef USE_TANGENT
varying vec3 vTangent;
varying vec3 vBitangent;
#endif
#endif
#include <clipping_planes_pars_vertex>
#include <color_pars_vertex>
#include <common>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <morphtarget_pars_vertex>
#include <shadowmap_pars_vertex>
#include <skinning_pars_vertex>
#include <uv2_pars_vertex>
#include <uv_pars_vertex>

void main() {

  #include <beginnormal_vertex>
  #include <color_vertex>
  #include <defaultnormal_vertex>
  #include <morphnormal_vertex>
  #include <skinbase_vertex>
  #include <skinnormal_vertex>
  #include <uv2_vertex>
  #include <uv_vertex>
  #ifndef FLAT_SHADED
    vNormal = normalize(transformedNormal);
  #ifdef USE_TANGENT
    vTangent = normalize(transformedTangent);
    vBitangent = normalize(cross(vNormal, vTangent) * tangent.w);
  #endif
  #endif
  #include <begin_vertex>

  #include <clipping_planes_vertex>
  #include <displacementmap_vertex>
  #include <logdepthbuf_vertex>
  #include <morphtarget_vertex>
  #include <project_vertex>
  #include <skinning_vertex>
    vViewPosition = -mvPosition.xyz;
  #include <fog_vertex>
  #include <shadowmap_vertex>
  #include <worldpos_vertex>

  //-------- start vertex ------------
  vUv = uv;

  float t = uTime * uSpeed;
  
  // For seamless loops, sample noise using 4D-like circular interpolation
  vec3 noisePos = 0.43 * position * uNoiseDensity;
  float distortion;
  
  if (uLoop > 0.5) {
    // Create truly dynamic seamless loop using 4D noise simulation
    // Loop progress only depends on time and duration, not speed
    float loopProgress = uTime / uLoopDuration;
    float angle = loopProgress * 6.28318530718; // 2*PI
    
    // Radius scales with speed to maintain consistent visual speed
    // Larger radius = more distance traveled = faster perceived motion
    float radius = 5.0 * uSpeed;
    
    // Sample 4 noise values at cardinal points around the circle
    vec3 offset0 = vec3(cos(angle) * radius, sin(angle) * radius, 0.0);
    vec3 offset1 = vec3(cos(angle + 1.57079632679) * radius, sin(angle + 1.57079632679) * radius, 0.0);
    vec3 offset2 = vec3(cos(angle + 3.14159265359) * radius, sin(angle + 3.14159265359) * radius, 0.0);
    vec3 offset3 = vec3(cos(angle + 4.71238898038) * radius, sin(angle + 4.71238898038) * radius, 0.0);
    
    // Get noise at all 4 points
    float n0 = cnoise(noisePos + offset0);
    float n1 = cnoise(noisePos + offset1);
    float n2 = cnoise(noisePos + offset2);
    float n3 = cnoise(noisePos + offset3);
    
    // Smooth interpolation weights using cosine
    float w0 = (cos(angle) + 1.0) * 0.5;
    float w1 = (cos(angle + 1.57079632679) + 1.0) * 0.5;
    float w2 = (cos(angle + 3.14159265359) + 1.0) * 0.5;
    float w3 = (cos(angle + 4.71238898038) + 1.0) * 0.5;
    
    // Normalize weights
    float totalWeight = w0 + w1 + w2 + w3;
    w0 /= totalWeight;
    w1 /= totalWeight;
    w2 /= totalWeight;
    w3 /= totalWeight;
    
    // Blend all samples with amplitude boost to match single-sample strength
    // Blending reduces amplitude by ~30%, so we compensate
    float blendedNoise = n0 * w0 + n1 * w1 + n2 * w2 + n3 * w3;
    distortion = 0.75 * blendedNoise * 1.5;
  } else {
    // Normal linear time progression
    distortion = 0.75 * cnoise(noisePos + t);
  }

  vec3 pos = position + normal * distortion * uNoiseStrength * uLoadingTime;
  vPos = pos;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}
`;
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-VE5U2NIR.mjs
var i$6 = {};
A$3(i$6, {
	fragment: () => n$13,
	vertex: () => e$13
});
var n$13 = `
#define STANDARD
#ifdef PHYSICAL
#define REFLECTIVITY
#define CLEARCOAT
#define TRANSMISSION
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef TRANSMISSION
uniform float transmission;
#endif
#ifdef REFLECTIVITY
uniform float reflectivity;
#endif
#ifdef CLEARCOAT
uniform float clearcoat;
uniform float clearcoatRoughness;
#endif
#ifdef USE_SHEEN
uniform vec3 sheen;
#endif
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
#ifdef USE_TANGENT
varying vec3 vTangent;
varying vec3 vBitangent;
#endif
#endif
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <color_pars_fragment>
#include <common>
#include <dithering_pars_fragment>
#include <emissivemap_pars_fragment>
#include <lightmap_pars_fragment>
#include <map_pars_fragment>
#include <packing>
#include <uv2_pars_fragment>
#include <uv_pars_fragment>
// #include <transmissionmap_pars_fragment>
#include <bsdfs>
#include <bumpmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <clipping_planes_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <lights_physical_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <shadowmap_pars_fragment>
// include\uB97C \uD1B5\uD574 \uAC00\uC838\uC628 \uAC12\uC740 \uB300\uBD80\uBD84 \uD658\uACBD, \uBE5B \uB4F1\uC744 \uACC4\uC0B0\uD558\uAE30 \uC704\uD574\uC11C \uAE30\uBCF8 fragment
// shader\uC758 \uAC12\uB4E4\uC744 \uBC1B\uC544\uC654\uC2B5\uB2C8\uB2E4. \uC77C\uB2E8\uC740 \uBB34\uC2DC\uD558\uC154\uB3C4 \uB429\uB2C8\uB2E4.
varying vec3 vNormal;
varying float displacement;
varying vec3 vPos;
varying float vDistort;
uniform float uC1r;
uniform float uC1g;
uniform float uC1b;
uniform float uC2r;
uniform float uC2g;
uniform float uC2b;
uniform float uC3r;
uniform float uC3g;
uniform float uC3b;
varying vec3 color1;
varying vec3 color2;
varying vec3 color3;
varying float distanceToCenter;


// for npm package, need to add this manually
// 'linearToRelativeLuminance' : function already has a body
float linearToRelativeLuminance2( const in vec3 color ) {
    vec3 weights = vec3( 0.2126, 0.7152, 0.0722 );
    return dot( weights, color.rgb );
}

void main() {
  //-------- basic gradient ------------
  vec3 color1 = vec3(uC1r, uC1g, uC1b);
  vec3 color2 = vec3(uC2r, uC2g, uC2b);
  vec3 color3 = vec3(uC3r, uC3g, uC3b);
  float clearcoat = 1.0;
  float clearcoatRoughness = 0.5;
#include <clipping_planes_fragment>

  float distanceToCenter = distance(vPos, vec3(0, 0, 0));
  // distanceToCenter\uB85C \uC911\uC2EC\uC810\uACFC\uC758 \uAC70\uB9AC\uB97C \uAD6C\uD568.

  vec4 diffuseColor =
      vec4(mix(color3, mix(color2, color1, smoothstep(-1.0, 1.0, vPos.y)),
               distanceToCenter),
           1);

  //-------- materiality ------------
  ReflectedLight reflectedLight =
      ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));
  vec3 totalEmissiveRadiance = emissive;
#ifdef TRANSMISSION
  float totalTransmission = transmission;
#endif
#include <logdepthbuf_fragment>
#include <map_fragment>
#include <color_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
#include <roughnessmap_fragment>
#include <metalnessmap_fragment>
#include <normal_fragment_begin>
#include <normal_fragment_maps>
#include <clearcoat_normal_fragment_begin>
#include <clearcoat_normal_fragment_maps>
#include <emissivemap_fragment>
// #include <transmissionmap_fragment>
#include <lights_physical_fragment>
#include <lights_fragment_begin>
#include <lights_fragment_maps>
#include <lights_fragment_end>
#include <aomap_fragment>
  vec3 outgoingLight =
      reflectedLight.directDiffuse + reflectedLight.indirectDiffuse +
      reflectedLight.directSpecular + reflectedLight.indirectSpecular;
//\uC704\uC5D0\uC11C \uC815\uC758\uD55C diffuseColor\uC5D0 \uD658\uACBD\uC774\uB098 \uBC18\uC0AC\uAC12\uB4E4\uC744 \uBC18\uC601\uD55C \uAC12.
#ifdef TRANSMISSION
  diffuseColor.a *=
      mix(saturate(1. - totalTransmission +
                   linearToRelativeLuminance2(reflectedLight.directSpecular +
                                             reflectedLight.indirectSpecular)),
          1.0, metalness);
#endif
  gl_FragColor = vec4(outgoingLight, diffuseColor.a);
  // gl_FragColor\uAC00 fragment shader\uB97C \uD1B5\uD574 \uB098\uD0C0\uB098\uB294 \uCD5C\uC885\uAC12\uC73C\uB85C, diffuseColor\uC5D0\uC11C
  // \uC815\uC758\uD55C \uADF8\uB77C\uB514\uC5B8\uD2B8 \uC0C9\uC0C1 \uC704\uC5D0 \uBC18\uC0AC\uB098 \uBE5B\uC744 \uACC4\uC0B0\uD55C \uAC12\uC744 \uCD5C\uC885\uAC12\uC73C\uB85C \uC815\uC758.
  // gl_FragColor = vec4(mix(mix(color1, color3, smoothstep(-3.0, 3.0,vPos.x)),
  // color2, vNormal.z), 1.0); \uC704\uCC98\uB7FC \uCD5C\uC885\uAC12\uC744 \uADF8\uB77C\uB514\uC5B8\uD2B8 \uAC12 \uC790\uCCB4\uB97C \uB123\uC73C\uBA74 \uD658\uACBD
  // \uC601\uD5A5\uC5C6\uB294 \uADF8\uB77C\uB514\uC5B8\uD2B8\uB9CC \uD45C\uD604\uB428.

#include <tonemapping_fragment>
#include <encodings_fragment>
#include <fog_fragment>
#include <premultiplied_alpha_fragment>
#include <dithering_fragment>
}
`;
var e$13 = `// #pragma glslify: pnoise = require(glsl-noise/periodic/3d)

vec3 mod289(vec3 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x)
{
  return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec3 fade(vec3 t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}

// Classic Perlin noise, periodic variant
float pnoise(vec3 P, vec3 rep)
{
  vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period
  vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  vec3 Pf0 = fract(P); // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 * (1.0 / 7.0);
  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 * (1.0 / 7.0);
  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
  return 2.2 * n_xyz;
}


//-------- start here ------------

varying vec3 vNormal;
uniform float uTime;
uniform float uSpeed;
uniform float uLoop;
uniform float uLoopDuration;
uniform float uNoiseDensity;
uniform float uNoiseStrength;
uniform float uFrequency;
uniform float uAmplitude;
varying vec3 vPos;
varying float vDistort;
varying vec2 vUv;
varying vec3 vViewPosition;

#define STANDARD
#ifndef FLAT_SHADED
  #ifdef USE_TANGENT
    varying vec3 vTangent;
    varying vec3 vBitangent;
  #endif
#endif

#include <clipping_planes_pars_vertex>
#include <color_pars_vertex>
#include <common>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <morphtarget_pars_vertex>
#include <shadowmap_pars_vertex>
#include <skinning_pars_vertex>
#include <uv2_pars_vertex>
#include <uv_pars_vertex>


// rotation
mat3 rotation3dY(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);
}

vec3 rotateY(vec3 v, float angle) { return rotation3dY(angle) * v; }

void main() {
  #include <beginnormal_vertex>
  #include <color_vertex>
  #include <defaultnormal_vertex>
  #include <morphnormal_vertex>
  #include <skinbase_vertex>
  #include <skinnormal_vertex>
  #include <uv2_vertex>
  #include <uv_vertex>
  #ifndef FLAT_SHADED
    vNormal = normalize(transformedNormal);
  #ifdef USE_TANGENT
    vTangent = normalize(transformedTangent);
    vBitangent = normalize(cross(vNormal, vTangent) * tangent.w);
  #endif
  #endif
  #include <begin_vertex>

  #include <clipping_planes_vertex>
  #include <displacementmap_vertex>
  #include <logdepthbuf_vertex>
  #include <morphtarget_vertex>
  #include <project_vertex>
  #include <skinning_vertex>
    vViewPosition = -mvPosition.xyz;
  #include <fog_vertex>
  #include <shadowmap_vertex>
  #include <worldpos_vertex>

  //-------- start vertex ------------
  float t = uTime * uSpeed;
  
  // For seamless loops, sample noise using 4D-like circular interpolation
  float distortion;
  float angle;
  
  if (uLoop > 0.5) {
    // Create truly dynamic seamless loop using 4D noise simulation
    float loopProgress = uTime / uLoopDuration;
    float loopAngle = loopProgress * 6.28318530718; // 2*PI
    
    // Radius scales with speed to maintain consistent visual speed
    float radius = 5.0 * uSpeed;
    
    // Sample 4 noise values at cardinal points
    vec3 offset0 = vec3(cos(loopAngle) * radius, sin(loopAngle) * radius, 0.0);
    vec3 offset1 = vec3(cos(loopAngle + 1.57079632679) * radius, sin(loopAngle + 1.57079632679) * radius, 0.0);
    vec3 offset2 = vec3(cos(loopAngle + 3.14159265359) * radius, sin(loopAngle + 3.14159265359) * radius, 0.0);
    vec3 offset3 = vec3(cos(loopAngle + 4.71238898038) * radius, sin(loopAngle + 4.71238898038) * radius, 0.0);
    
    // Get noise at all 4 points
    float n0 = pnoise((normal + offset0) * uNoiseDensity, vec3(10.0));
    float n1 = pnoise((normal + offset1) * uNoiseDensity, vec3(10.0));
    float n2 = pnoise((normal + offset2) * uNoiseDensity, vec3(10.0));
    float n3 = pnoise((normal + offset3) * uNoiseDensity, vec3(10.0));
    
    // Smooth interpolation weights
    float w0 = (cos(loopAngle) + 1.0) * 0.5;
    float w1 = (cos(loopAngle + 1.57079632679) + 1.0) * 0.5;
    float w2 = (cos(loopAngle + 3.14159265359) + 1.0) * 0.5;
    float w3 = (cos(loopAngle + 4.71238898038) + 1.0) * 0.5;
    
    float totalWeight = w0 + w1 + w2 + w3;
    w0 /= totalWeight;
    w1 /= totalWeight;
    w2 /= totalWeight;
    w3 /= totalWeight;
    
    // Blend samples with amplitude boost to match single-sample strength
    float blendedNoise = n0 * w0 + n1 * w1 + n2 * w2 + n3 * w3;
    distortion = blendedNoise * 1.5 * uNoiseStrength;
    
    // Apply loop to spiral effect with blended offset
    float angleOffset = offset0.x * w0 + offset1.x * w1 + offset2.x * w2 + offset3.x * w3;
    angle = sin(uv.y * uFrequency + angleOffset) * uAmplitude;
  } else {
    // Normal linear time progression
    distortion = pnoise((normal + t) * uNoiseDensity, vec3(10.0)) * uNoiseStrength;
    angle = sin(uv.y * uFrequency + t) * uAmplitude;
  }
  
  vec3 pos = position + (normal * distortion);
  pos = rotateY(pos, angle);

  vPos = pos;
  vDistort = distortion;
  vNormal = normal;
  vUv = uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}
`;
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-S63T3L7T.mjs
var o$5 = {};
A$3(o$5, {
	fragment: () => n$12,
	vertex: () => e$12
});
var n$12 = `
#define STANDARD
#ifdef PHYSICAL
#define REFLECTIVITY
#define CLEARCOAT
#define TRANSMISSION
#endif

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;

#ifdef TRANSMISSION
uniform float transmission;
#endif
#ifdef REFLECTIVITY
uniform float reflectivity;
#endif
#ifdef CLEARCOAT
uniform float clearcoat;
uniform float clearcoatRoughness;
#endif
#ifdef USE_SHEEN
uniform vec3 sheen;
#endif
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
#ifdef USE_TANGENT
varying vec3 vTangent;
varying vec3 vBitangent;
#endif
#endif
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <color_pars_fragment>
#include <common>
#include <dithering_pars_fragment>
#include <emissivemap_pars_fragment>
#include <lightmap_pars_fragment>
#include <map_pars_fragment>
#include <packing>
#include <uv2_pars_fragment>
#include <uv_pars_fragment>
// #include <transmissionmap_pars_fragment>
#include <bsdfs>
#include <bumpmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <clipping_planes_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <lights_physical_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <shadowmap_pars_fragment>
// include\uB97C \uD1B5\uD574 \uAC00\uC838\uC628 \uAC12\uC740 \uB300\uBD80\uBD84 \uD658\uACBD, \uBE5B \uB4F1\uC744 \uACC4\uC0B0\uD558\uAE30 \uC704\uD574\uC11C \uAE30\uBCF8 fragment
// shader\uC758 \uAC12\uB4E4\uC744 \uBC1B\uC544\uC654\uC2B5\uB2C8\uB2E4. \uC77C\uB2E8\uC740 \uBB34\uC2DC\uD558\uC154\uB3C4 \uB429\uB2C8\uB2E4.

varying vec3 vNormal;
varying float displacement;
varying vec3 vPos;
varying float vDistort;

uniform float uC1r;
uniform float uC1g;
uniform float uC1b;
uniform float uC2r;
uniform float uC2g;
uniform float uC2b;
uniform float uC3r;
uniform float uC3g;
uniform float uC3b;

varying vec3 color1;
varying vec3 color2;
varying vec3 color3;

// for npm package, need to add this manually
// 'linearToRelativeLuminance' : function already has a body
float linearToRelativeLuminance2( const in vec3 color ) {
    vec3 weights = vec3( 0.2126, 0.7152, 0.0722 );
    return dot( weights, color.rgb );
}

void main() {

  //-------- basic gradient ------------
  vec3 color1 = vec3(uC1r, uC1g, uC1b);
  vec3 color2 = vec3(uC2r, uC2g, uC2b);
  vec3 color3 = vec3(uC3r, uC3g, uC3b);
  float clearcoat = 1.0;
  float clearcoatRoughness = 0.5;

  #include <clipping_planes_fragment>

  vec4 diffuseColor = vec4(
      mix(mix(color1, color2, smoothstep(-3.0, 3.0, vPos.x)), color3, vPos.z),
      1);
  // diffuseColor\uB294 \uC624\uBE0C\uC81D\uD2B8\uC758 \uBCA0\uC774\uC2A4 \uC0C9\uC0C1 (\uD658\uACBD\uC774\uB098 \uBE5B\uC774 \uACE0\uB824\uB418\uC9C0 \uC54A\uC740 \uBCF8\uC5F0\uC758
  // \uC0C9)

  // mix(x, y, a): a\uB97C \uCD95\uC73C\uB85C \uD588\uC744 \uB54C \uAC00\uC7A5 \uB0AE\uC740 \uAC12\uC5D0\uC11C x\uAC12\uC758 \uC601\uD5A5\uB825\uC744 100%, \uAC00\uC7A5
  // \uB192\uC740 \uAC12\uC5D0\uC11C y\uAC12\uC758 \uC601\uD5A5\uB825\uC744 100%\uB85C \uB9CC\uB4E0\uB2E4. smoothstep(x, y, a): a\uCD95\uC744
  // \uAE30\uC900\uC73C\uB85C x\uB97C \uCD5C\uC18C\uAC12, y\uB97C \uCD5C\uB300\uAC12\uC73C\uB85C \uADF8 \uC0AC\uC774\uC758 \uAC12\uC744 \uCABC\uAC20\uB2E4. x\uC640 y \uC0AC\uC774\uB97C
  // 0-100 \uC0AC\uC774\uC758 \uADF8\uB77C\uB514\uC5B8\uD2B8\uCC98\uB7FC \uB2E8\uACC4\uBCC4\uB85C \uD45C\uD604\uD558\uACE0, x \uBBF8\uB9CC\uC758 \uAC12\uC740 0, y \uC774\uC0C1\uC758
  // \uAC12\uC740 100\uC73C\uB85C \uCC98\uB9AC

  // 1. smoothstep(-3.0, 3.0,vPos.x)\uB85C x\uCD95\uC758 \uADF8\uB77C\uB514\uC5B8\uD2B8\uAC00 \uD45C\uD604 \uB420 \uBC94\uC704\uB97C -3,
  // 3\uC73C\uB85C \uC815\uD55C\uB2E4.
  // 2. mix(color1, color3, smoothstep(-3.0, 3.0,vPos.x))\uB85C color1\uACFC color3\uC744
  // \uC704\uC758 \uBC94\uC704 \uC548\uC5D0\uC11C \uADF8\uB77C\uB514\uC5B8\uD2B8\uB85C \uD45C\uD604\uD55C\uB2E4.
  // \uC608\uB97C \uB4E4\uC5B4 color1\uC774 \uB178\uB791, color3\uC774 \uD30C\uB791\uC774\uB77C\uACE0 \uCE58\uBA74, x\uCD95 \uAE30\uC900 -3\uBD80\uD130 3\uAE4C\uC9C0
  // \uB178\uB791\uACFC \uD30C\uB791 \uC0AC\uC774\uC758 \uADF8\uB77C\uB514\uC5B8\uD2B8\uAC00 \uB098\uD0C0\uB098\uACE0, -3\uBCF4\uB2E4 \uC791\uC740 \uAC12\uC5D0\uC11C\uB294 \uACC4\uC18D \uB178\uB791,
  // 3\uBCF4\uB2E4 \uD070 \uAC12\uC5D0\uC11C\uB294 \uACC4\uC18D \uD30C\uB791\uC774 \uB098\uD0C0\uB09C\uB2E4.
  // 3. mix()\uB97C \uD55C \uBC88 \uB354 \uC0AC\uC6A9\uD574\uC11C \uC704\uC758 \uADF8\uB77C\uB514\uC5B8\uD2B8\uC640 color2\uB97C z\uCD95 \uAE30\uC900\uC73C\uB85C
  // \uBD84\uBC30\uD55C\uB2E4.

  //-------- materiality ------------
  ReflectedLight reflectedLight =
      ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));
  vec3 totalEmissiveRadiance = emissive;

  #ifdef TRANSMISSION
    float totalTransmission = transmission;
  #endif
  #include <logdepthbuf_fragment>
  #include <map_fragment>
  #include <color_fragment>
  #include <alphamap_fragment>
  #include <alphatest_fragment>
  #include <roughnessmap_fragment>
  #include <metalnessmap_fragment>
  #include <normal_fragment_begin>
  #include <normal_fragment_maps>
  #include <clearcoat_normal_fragment_begin>
  #include <clearcoat_normal_fragment_maps>
  #include <emissivemap_fragment>
  // #include <transmissionmap_fragment>
  #include <lights_physical_fragment>
  #include <lights_fragment_begin>
  #include <lights_fragment_maps>
  #include <lights_fragment_end>
  #include <aomap_fragment>
    vec3 outgoingLight =
        reflectedLight.directDiffuse + reflectedLight.indirectDiffuse +
        reflectedLight.directSpecular + reflectedLight.indirectSpecular;
    //\uC704\uC5D0\uC11C \uC815\uC758\uD55C diffuseColor\uC5D0 \uD658\uACBD\uC774\uB098 \uBC18\uC0AC\uAC12\uB4E4\uC744 \uBC18\uC601\uD55C \uAC12.
  #ifdef TRANSMISSION
    diffuseColor.a *=
        mix(saturate(1. - totalTransmission +
                    linearToRelativeLuminance2(reflectedLight.directSpecular +
                                              reflectedLight.indirectSpecular)),
            1.0, metalness);
  #endif


  #include <tonemapping_fragment>
  #include <encodings_fragment>
  #include <fog_fragment>
  #include <premultiplied_alpha_fragment>
  #include <dithering_fragment>


  gl_FragColor = vec4(outgoingLight, diffuseColor.a);
  // gl_FragColor\uAC00 fragment shader\uB97C \uD1B5\uD574 \uB098\uD0C0\uB098\uB294 \uCD5C\uC885\uAC12\uC73C\uB85C, diffuseColor\uC5D0\uC11C
  // \uC815\uC758\uD55C \uADF8\uB77C\uB514\uC5B8\uD2B8 \uC0C9\uC0C1 \uC704\uC5D0 \uBC18\uC0AC\uB098 \uBE5B\uC744 \uACC4\uC0B0\uD55C \uAC12\uC744 \uCD5C\uC885\uAC12\uC73C\uB85C \uC815\uC758.
  // gl_FragColor = vec4(mix(mix(color1, color3, smoothstep(-3.0, 3.0,vPos.x)),
  // color2, vNormal.z), 1.0); \uC704\uCC98\uB7FC \uCD5C\uC885\uAC12\uC744 \uADF8\uB77C\uB514\uC5B8\uD2B8 \uAC12 \uC790\uCCB4\uB97C \uB123\uC73C\uBA74 \uD658\uACBD
  // \uC601\uD5A5\uC5C6\uB294 \uADF8\uB77C\uB514\uC5B8\uD2B8\uB9CC \uD45C\uD604\uB428.
}
`;
var e$12 = `// #pragma glslify: cnoise3 = require(glsl-noise/classic/3d) 
vec3 mod289(vec3 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x)
{
  return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec3 fade(vec3 t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float cnoise(vec3 P)
{
  vec3 Pi0 = floor(P); // Integer part for indexing
  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  vec3 Pf0 = fract(P); // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 * (1.0 / 7.0);
  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 * (1.0 / 7.0);
  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
  return 2.2 * n_xyz;
}

//-------- start here ------------

mat3 rotation3dY(float angle) {
  float s = sin(angle);
  float c = cos(angle);

  return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);
}

vec3 rotateY(vec3 v, float angle) { return rotation3dY(angle) * v; }

varying vec3 vNormal;
varying float displacement;
varying vec3 vPos;
varying float vDistort;

uniform float uTime;
uniform float uSpeed;
uniform float uLoop;
uniform float uLoopDuration;
uniform float uNoiseDensity;
uniform float uNoiseStrength;

#define STANDARD
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
#ifdef USE_TANGENT
varying vec3 vTangent;
varying vec3 vBitangent;
#endif
#endif
#include <clipping_planes_pars_vertex>
#include <color_pars_vertex>
#include <common>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <morphtarget_pars_vertex>
#include <shadowmap_pars_vertex>
#include <skinning_pars_vertex>
#include <uv2_pars_vertex>
#include <uv_pars_vertex>

void main() {

  #include <beginnormal_vertex>
  #include <color_vertex>
  #include <defaultnormal_vertex>
  #include <morphnormal_vertex>
  #include <skinbase_vertex>
  #include <skinnormal_vertex>
  #include <uv2_vertex>
  #include <uv_vertex>
  #ifndef FLAT_SHADED
    vNormal = normalize(transformedNormal);
  #ifdef USE_TANGENT
    vTangent = normalize(transformedTangent);
    vBitangent = normalize(cross(vNormal, vTangent) * tangent.w);
  #endif
  #endif
  #include <begin_vertex>

  #include <clipping_planes_vertex>
  #include <displacementmap_vertex>
  #include <logdepthbuf_vertex>
  #include <morphtarget_vertex>
  #include <project_vertex>
  #include <skinning_vertex>
    vViewPosition = -mvPosition.xyz;
  #include <fog_vertex>
  #include <shadowmap_vertex>
  #include <worldpos_vertex>

  //-------- start vertex ------------
  float t = uTime * uSpeed;
  
  // For seamless loops, sample noise using 4D-like circular interpolation
  vec3 noisePos = 0.43 * position * uNoiseDensity;
  float distortion;
  
  if (uLoop > 0.5) {
    // Create truly dynamic seamless loop using 4D noise simulation
    float loopProgress = uTime / uLoopDuration;
    float angle = loopProgress * 6.28318530718; // 2*PI
    
    // Radius scales with speed to maintain consistent visual speed
    float radius = 5.0 * uSpeed;
    
    // Sample 4 noise values at cardinal points
    vec3 offset0 = vec3(cos(angle) * radius, sin(angle) * radius, 0.0);
    vec3 offset1 = vec3(cos(angle + 1.57079632679) * radius, sin(angle + 1.57079632679) * radius, 0.0);
    vec3 offset2 = vec3(cos(angle + 3.14159265359) * radius, sin(angle + 3.14159265359) * radius, 0.0);
    vec3 offset3 = vec3(cos(angle + 4.71238898038) * radius, sin(angle + 4.71238898038) * radius, 0.0);
    
    // Get noise at all 4 points
    float n0 = cnoise(noisePos + offset0);
    float n1 = cnoise(noisePos + offset1);
    float n2 = cnoise(noisePos + offset2);
    float n3 = cnoise(noisePos + offset3);
    
    // Smooth interpolation weights
    float w0 = (cos(angle) + 1.0) * 0.5;
    float w1 = (cos(angle + 1.57079632679) + 1.0) * 0.5;
    float w2 = (cos(angle + 3.14159265359) + 1.0) * 0.5;
    float w3 = (cos(angle + 4.71238898038) + 1.0) * 0.5;
    
    float totalWeight = w0 + w1 + w2 + w3;
    w0 /= totalWeight;
    w1 /= totalWeight;
    w2 /= totalWeight;
    w3 /= totalWeight;
    
    // Blend samples with amplitude boost to match single-sample strength
    float blendedNoise = n0 * w0 + n1 * w1 + n2 * w2 + n3 * w3;
    distortion = 0.75 * blendedNoise * 1.5;
  } else {
    // Normal linear time progression
    distortion = 0.75 * cnoise(noisePos + t);
  }

  vec3 pos = position + normal * distortion * uNoiseStrength;
  vPos = pos;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}
`;
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-5UBL6RAK.mjs
var p$6 = {};
A$3(p$6, {
	plane: () => o$6,
	sphere: () => i$6,
	waterPlane: () => o$5
});
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-GEYS2LRX.mjs
var i$5 = {};
A$3(i$5, {
	fragment: () => n$11,
	vertex: () => e$11
});
var n$11 = `// Glass Plane Fragment Shader - Transparency & Refraction

#define STANDARD
#ifdef PHYSICAL
#define REFLECTIVITY
#define CLEARCOAT
#define TRANSMISSION
#endif

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;

// transmission is already defined by Three.js when TRANSMISSION is enabled
#ifdef REFLECTIVITY
uniform float reflectivity;
#endif
#ifdef CLEARCOAT
uniform float clearcoat;
uniform float clearcoatRoughness;
#endif
#ifdef USE_SHEEN
uniform vec3 sheen;
#endif

varying vec3 vViewPosition;
#ifndef FLAT_SHADED
#ifdef USE_TANGENT
varying vec3 vTangent;
varying vec3 vBitangent;
#endif
#endif

#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <color_pars_fragment>
#include <common>
#include <dithering_pars_fragment>
#include <emissivemap_pars_fragment>
#include <lightmap_pars_fragment>
#include <map_pars_fragment>
#include <packing>
#include <uv2_pars_fragment>
#include <uv_pars_fragment>
#include <bsdfs>
#include <bumpmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <clipping_planes_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <lights_physical_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <shadowmap_pars_fragment>
#include <transmission_pars_fragment>

// Custom uniforms for glass effect
uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uTransparency;
uniform float uRefraction;
uniform float uChromaticAberration;
uniform float uFresnelPower;
uniform float uReflectivity;
// envMap and envMapIntensity are provided by Three.js

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vGlassWorldPos;
varying vec3 vReflect;
varying vec3 vRefract;

// Fresnel calculation
float fresnel(vec3 viewDirection, vec3 normal, float power) {
  return pow(1.0 - dot(viewDirection, normal), power);
}

// Chromatic aberration for refraction
vec3 chromaticRefraction(vec3 viewDirection, vec3 normal, float ior, float chromaticStrength) {
  vec3 refractedR = refract(viewDirection, normal, 1.0 / (ior - chromaticStrength));
  vec3 refractedG = refract(viewDirection, normal, 1.0 / ior);
  vec3 refractedB = refract(viewDirection, normal, 1.0 / (ior + chromaticStrength));
  
  #ifdef ENVMAP_TYPE_CUBE
  return vec3(
    textureCube(envMap, refractedR).r,
    textureCube(envMap, refractedG).g,
    textureCube(envMap, refractedB).b
  );
  #else
  return vec3(0.5);
  #endif
}

void main() {
  #include <clipping_planes_fragment>
  
  vec4 diffuseColor = vec4(diffuse, opacity);
  ReflectedLight reflectedLight = ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));
  vec3 totalEmissiveRadiance = emissive;
  
  #include <logdepthbuf_fragment>
  #include <map_fragment>
  #include <color_fragment>
  #include <alphamap_fragment>
  #include <alphatest_fragment>
  #include <specularmap_fragment>
  #include <roughnessmap_fragment>
  #include <metalnessmap_fragment>
  #include <normal_fragment_begin>
  #include <normal_fragment_maps>
  #include <clearcoat_normal_fragment_begin>
  #include <clearcoat_normal_fragment_maps>
  #include <emissivemap_fragment>
  
  // Glass-specific calculations
  vec3 viewDirection = normalize(vViewPosition);
  vec3 worldNormal = normalize(vNormal);
  
  // Calculate Fresnel effect
  float fresnelFactor = fresnel(viewDirection, worldNormal, uFresnelPower);
  
  // Base glass color gradient
  vec3 gradientColor = mix(uColor1, uColor2, vUv.y);
  gradientColor = mix(gradientColor, uColor3, fresnelFactor);
  
  // Reflection
  #ifdef ENVMAP_TYPE_CUBE
  vec3 reflectionColor = textureCube(envMap, vReflect).rgb * envMapIntensity;
  #else
  vec3 reflectionColor = vec3(0.5);
  #endif
  
  // Refraction with chromatic aberration
  vec3 refractionColor;
  #ifdef ENVMAP_TYPE_CUBE
  if (uChromaticAberration > 0.0) {
    refractionColor = chromaticRefraction(-viewDirection, worldNormal, uRefraction, uChromaticAberration);
  } else {
    refractionColor = textureCube(envMap, vRefract).rgb;
  }
  refractionColor *= envMapIntensity;
  #else
  refractionColor = vec3(0.3);
  #endif
  
  // Mix reflection and refraction based on Fresnel
  vec3 envColor = mix(refractionColor, reflectionColor, fresnelFactor * uReflectivity);
  
  // Combine with gradient color
  vec3 finalColor = mix(gradientColor, envColor, 0.7);
  
  // Apply transparency
  float finalAlpha = mix(uTransparency, 1.0, fresnelFactor * 0.5);
  
  // Set diffuse color for standard lighting
  diffuseColor.rgb = finalColor;
  diffuseColor.a = finalAlpha;
  
  // Skip transmission_fragment to avoid conflicts
  
  vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + 
                       reflectedLight.directSpecular + reflectedLight.indirectSpecular + 
                       totalEmissiveRadiance;
  
  // Add our glass color contribution
  outgoingLight += finalColor * 0.8;
  
  gl_FragColor = vec4(outgoingLight, diffuseColor.a);
  
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  #include <fog_fragment>
  #include <premultiplied_alpha_fragment>
  #include <dithering_fragment>
}
`;
var e$11 = `// Glass Plane Vertex Shader - Refraction & Transparency Effects

#define STANDARD
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
#ifdef USE_TANGENT
varying vec3 vTangent;
varying vec3 vBitangent;
#endif
#endif
#include <clipping_planes_pars_vertex>
#include <color_pars_vertex>
#include <common>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <morphtarget_pars_vertex>
#include <shadowmap_pars_vertex>
#include <skinning_pars_vertex>
#include <uv2_pars_vertex>
#include <uv_pars_vertex>

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vGlassWorldPos;
varying vec3 vReflect;
varying vec3 vRefract;

uniform float uTime;
uniform float uSpeed;
uniform float uWaveAmplitude;
uniform float uWaveFrequency;
uniform float uNoiseStrength;
uniform float uDistortion;

// Noise functions for glass distortion
vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
  return mod289(((x * 34.0) + 1.0) * x);
}

vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1),
    dot(p2, x2), dot(p3, x3)));
}

void main() {
  #include <uv_pars_vertex>
  #include <uv_vertex>
  #include <uv2_pars_vertex>
  #include <uv2_vertex>
  #include <color_pars_vertex>
  #include <color_vertex>
  #include <morphcolor_vertex>
  #include <beginnormal_vertex>
  #include <morphnormal_vertex>
  #include <skinbase_vertex>
  #include <skinnormal_vertex>
  #include <defaultnormal_vertex>
  #include <normal_vertex>
  
  #ifndef FLAT_SHADED
  vNormal = normalize(transformedNormal);
  #ifdef USE_TANGENT
  vTangent = normalize(transformedTangent);
  vBitangent = normalize(cross(vNormal, vTangent) * tangent.w);
  #endif
  #endif
  
  #include <begin_vertex>
  #include <morphtarget_vertex>
  #include <skinning_vertex>
  #include <displacementmap_vertex>
  
  // Pass UV coordinates
  vUv = uv;

  // Calculate time-based animation
  float time = uTime * uSpeed;
  
  // Create subtle wave distortion for glass effect
  float waveX = sin(position.x * uWaveFrequency + time) * uWaveAmplitude;
  float waveY = cos(position.y * uWaveFrequency + time) * uWaveAmplitude;
  float waveZ = sin(position.z * uWaveFrequency + time * 0.5) * uWaveAmplitude * 0.5;
  
  // Add noise for organic glass distortion
  vec3 noisePos = position + vec3(time * 0.1);
  float noise = snoise(noisePos * 0.5) * uNoiseStrength;
  
  // Apply distortion to transformed position
  transformed += vec3(waveX, waveY, waveZ) * uDistortion + normal * noise;
  
  #include <project_vertex>
  #include <logdepthbuf_vertex>
  #include <clipping_planes_vertex>
  
  vViewPosition = -mvPosition.xyz;
  vPosition = transformed;
  
  // Calculate world position for refraction
  vec4 worldPosition = modelMatrix * vec4(transformed, 1.0);
  vGlassWorldPos = worldPosition.xyz;
  
  // Calculate reflection and refraction vectors
  vec3 worldNormal = normalize(mat3(modelMatrix) * normal);
  vec3 viewVector = normalize(cameraPosition - worldPosition.xyz);
  
  // Reflection vector
  vReflect = reflect(-viewVector, worldNormal);
  
  // Refraction vector with index of refraction for glass (1.5)
  float ior = 1.5;
  vRefract = refract(-viewVector, worldNormal, 1.0 / ior);
  
  #include <fog_vertex>
  #include <shadowmap_vertex>
}
`;
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-LNX2N5NW.mjs
var i$4 = {};
A$3(i$4, {
	fragment: () => n$10,
	vertex: () => e$10
});
var n$10 = `// Glass Sphere Fragment Shader - Transparency & Refraction

#define STANDARD
#ifdef PHYSICAL
#define REFLECTIVITY
#define CLEARCOAT
#define TRANSMISSION
#endif

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;

// transmission is already defined by Three.js when TRANSMISSION is enabled
#ifdef REFLECTIVITY
uniform float reflectivity;
#endif
#ifdef CLEARCOAT
uniform float clearcoat;
uniform float clearcoatRoughness;
#endif
#ifdef USE_SHEEN
uniform vec3 sheen;
#endif

varying vec3 vViewPosition;
#ifndef FLAT_SHADED
#ifdef USE_TANGENT
varying vec3 vTangent;
varying vec3 vBitangent;
#endif
#endif

#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <color_pars_fragment>
#include <common>
#include <dithering_pars_fragment>
#include <emissivemap_pars_fragment>
#include <lightmap_pars_fragment>
#include <map_pars_fragment>
#include <packing>
#include <uv2_pars_fragment>
#include <uv_pars_fragment>
#include <bsdfs>
#include <bumpmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <clipping_planes_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <lights_physical_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <shadowmap_pars_fragment>
#include <transmission_pars_fragment>

// Custom uniforms for glass effect
uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uTransparency;
uniform float uRefraction;
uniform float uChromaticAberration;
uniform float uFresnelPower;
uniform float uReflectivity;
// envMap and envMapIntensity are provided by Three.js

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vGlassWorldPos;
varying vec3 vReflect;
varying vec3 vRefract;
varying float vDistortion;

// Fresnel calculation
float fresnel(vec3 viewDirection, vec3 normal, float power) {
  return pow(1.0 - abs(dot(viewDirection, normal)), power);
}

// Chromatic aberration for refraction
vec3 chromaticRefraction(vec3 viewDirection, vec3 normal, float ior, float chromaticStrength) {
  vec3 refractedR = refract(viewDirection, normal, 1.0 / (ior - chromaticStrength));
  vec3 refractedG = refract(viewDirection, normal, 1.0 / ior);
  vec3 refractedB = refract(viewDirection, normal, 1.0 / (ior + chromaticStrength));
  
  #ifdef ENVMAP_TYPE_CUBE
  return vec3(
    textureCube(envMap, refractedR).r,
    textureCube(envMap, refractedG).g,
    textureCube(envMap, refractedB).b
  );
  #else
  return vec3(0.5);
  #endif
}

// Caustics simulation for sphere
float caustics(vec3 position, float time) {
  float c1 = sin(position.x * 4.0 + time) * sin(position.y * 4.0 + time * 0.8);
  float c2 = sin(position.z * 3.0 - time * 1.2) * sin(position.x * 3.0 + time);
  return (c1 + c2) * 0.5 + 0.5;
}

void main() {
  #include <clipping_planes_fragment>
  
  vec4 diffuseColor = vec4(diffuse, opacity);
  ReflectedLight reflectedLight = ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));
  vec3 totalEmissiveRadiance = emissive;
  
  #include <logdepthbuf_fragment>
  #include <map_fragment>
  #include <color_fragment>
  #include <alphamap_fragment>
  #include <alphatest_fragment>
  #include <specularmap_fragment>
  #include <roughnessmap_fragment>
  #include <metalnessmap_fragment>
  #include <normal_fragment_begin>
  #include <normal_fragment_maps>
  #include <clearcoat_normal_fragment_begin>
  #include <clearcoat_normal_fragment_maps>
  #include <emissivemap_fragment>
  
  // Glass-specific calculations
  vec3 viewDirection = normalize(vViewPosition);
  vec3 worldNormal = normalize(vNormal);
  
  // Calculate Fresnel effect
  float fresnelFactor = fresnel(viewDirection, worldNormal, uFresnelPower);
  
  // For sphere, use spherical UV mapping for gradient
  float sphericalU = atan(vPosition.z, vPosition.x) / (2.0 * PI) + 0.5;
  float sphericalV = acos(vPosition.y / length(vPosition)) / PI;
  vec2 sphericalUV = vec2(sphericalU, sphericalV);
  
  // Create color gradient based on spherical coordinates
  vec3 gradientColor = mix(uColor1, uColor2, sphericalUV.y);
  gradientColor = mix(gradientColor, uColor3, pow(fresnelFactor, 1.5));
  
  // Add caustics effect for sphere
  float causticsValue = caustics(vGlassWorldPos, uTime);
  gradientColor += vec3(causticsValue * 0.1);
  
  // Reflection
  #ifdef ENVMAP_TYPE_CUBE
  vec3 reflectionColor = textureCube(envMap, vReflect).rgb * envMapIntensity;
  #else
  vec3 reflectionColor = vec3(0.5);
  #endif
  
  // Refraction with chromatic aberration (enhanced for sphere)
  vec3 refractionColor;
  #ifdef ENVMAP_TYPE_CUBE
  if (uChromaticAberration > 0.0) {
    float chromaticIntensity = uChromaticAberration * (1.0 + vDistortion * 0.5);
    refractionColor = chromaticRefraction(-viewDirection, worldNormal, uRefraction, chromaticIntensity);
  } else {
    refractionColor = textureCube(envMap, vRefract).rgb;
  }
  refractionColor *= envMapIntensity;
  #else
  refractionColor = vec3(0.3);
  #endif
  
  // Mix reflection and refraction based on Fresnel (stronger effect for sphere)
  vec3 envColor = mix(refractionColor, reflectionColor, fresnelFactor * uReflectivity);
  
  // Add inner glow effect for sphere
  float innerGlow = pow(1.0 - abs(dot(viewDirection, worldNormal)), 3.0);
  vec3 glowColor = mix(uColor2, uColor3, innerGlow) * innerGlow * 0.5;
  
  // Combine all effects
  vec3 finalColor = mix(gradientColor, envColor, 0.8) + glowColor;
  
  // Apply transparency with sphere thickness consideration
  float thickness = 1.0 - pow(abs(dot(viewDirection, worldNormal)), 0.5);
  float finalAlpha = mix(uTransparency * thickness, 1.0, fresnelFactor * 0.7);
  
  // Set diffuse color for standard lighting
  diffuseColor.rgb = finalColor;
  diffuseColor.a = finalAlpha;
  
  // Skip transmission_fragment to avoid conflicts
  
  vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + 
                       reflectedLight.directSpecular + reflectedLight.indirectSpecular + 
                       totalEmissiveRadiance;
  
  // Add our glass color contribution
  outgoingLight += finalColor * 0.9;
  
  gl_FragColor = vec4(outgoingLight, diffuseColor.a);
  
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  #include <fog_fragment>
  #include <premultiplied_alpha_fragment>
  #include <dithering_fragment>
}
`;
var e$10 = `// Glass Sphere Vertex Shader - Refraction & Transparency Effects

#define STANDARD
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
#ifdef USE_TANGENT
varying vec3 vTangent;
varying vec3 vBitangent;
#endif
#endif
#include <clipping_planes_pars_vertex>
#include <color_pars_vertex>
#include <common>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <morphtarget_pars_vertex>
#include <shadowmap_pars_vertex>
#include <skinning_pars_vertex>
#include <uv2_pars_vertex>
#include <uv_pars_vertex>

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vGlassWorldPos;
varying vec3 vReflect;
varying vec3 vRefract;
varying float vDistortion;

uniform float uTime;
uniform float uSpeed;
uniform float uWaveAmplitude;
uniform float uWaveFrequency;
uniform float uNoiseStrength;
uniform float uDistortion;

// Noise functions for glass distortion
vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
  return mod289(((x * 34.0) + 1.0) * x);
}

vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1),
    dot(p2, x2), dot(p3, x3)));
}

void main() {
  #include <uv_pars_vertex>
  #include <uv_vertex>
  #include <uv2_pars_vertex>
  #include <uv2_vertex>
  #include <color_pars_vertex>
  #include <color_vertex>
  #include <morphcolor_vertex>
  #include <beginnormal_vertex>
  #include <morphnormal_vertex>
  #include <skinbase_vertex>
  #include <skinnormal_vertex>
  #include <defaultnormal_vertex>
  #include <normal_vertex>
  
  #ifndef FLAT_SHADED
  vNormal = normalize(transformedNormal);
  #ifdef USE_TANGENT
  vTangent = normalize(transformedTangent);
  vBitangent = normalize(cross(vNormal, vTangent) * tangent.w);
  #endif
  #endif
  
  #include <begin_vertex>
  #include <morphtarget_vertex>
  #include <skinning_vertex>
  #include <displacementmap_vertex>
  
  // Pass UV coordinates
  vUv = uv;

  // Calculate time-based animation
  float time = uTime * uSpeed;
  
  // For sphere, use spherical coordinates for better distortion
  float theta = atan(position.z, position.x);
  float phi = acos(position.y / length(position));
  
  // Create waves based on spherical coordinates
  float waveTheta = sin(theta * uWaveFrequency * 2.0 + time) * uWaveAmplitude;
  float wavePhi = cos(phi * uWaveFrequency + time * 1.5) * uWaveAmplitude;
  
  // Add noise for organic glass distortion
  vec3 noisePos = position + vec3(time * 0.1);
  float noise = snoise(noisePos * 0.8) * uNoiseStrength;
  
  // Calculate distortion based on position on sphere
  float distortionAmount = (waveTheta + wavePhi) * uDistortion + noise;
  vDistortion = distortionAmount;
  
  // Apply distortion along normal for sphere
  transformed += normal * distortionAmount;
  
  #include <project_vertex>
  #include <logdepthbuf_vertex>
  #include <clipping_planes_vertex>
  
  vViewPosition = -mvPosition.xyz;
  vPosition = transformed;
  
  // Calculate world position for refraction
  vec4 worldPosition = modelMatrix * vec4(transformed, 1.0);
  vGlassWorldPos = worldPosition.xyz;
  
  // Calculate reflection and refraction vectors
  vec3 worldNormal = normalize(mat3(modelMatrix) * normal);
  vec3 viewVector = normalize(cameraPosition - worldPosition.xyz);
  
  // Reflection vector
  vReflect = reflect(-viewVector, worldNormal);
  
  // Refraction vector with index of refraction for glass (1.5)
  // For sphere, adjust IOR based on curvature
  float ior = 1.5 + sin(theta * 2.0 + time) * 0.1;
  vRefract = refract(-viewVector, worldNormal, 1.0 / ior);
  
  #include <fog_vertex>
  #include <shadowmap_vertex>
}
`;
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-4ZGMESHB.mjs
var o$4 = {};
A$3(o$4, {
	fragment: () => e$9,
	vertex: () => n$9
});
var e$9 = `// Glass WaterPlane Fragment Shader - Liquid Glass Effect

#define STANDARD
#ifdef PHYSICAL
#define REFLECTIVITY
#define CLEARCOAT
#define TRANSMISSION
#endif

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;

// transmission is already defined by Three.js when TRANSMISSION is enabled
#ifdef REFLECTIVITY
uniform float reflectivity;
#endif
#ifdef CLEARCOAT
uniform float clearcoat;
uniform float clearcoatRoughness;
#endif
#ifdef USE_SHEEN
uniform vec3 sheen;
#endif

varying vec3 vViewPosition;
#ifndef FLAT_SHADED
#ifdef USE_TANGENT
varying vec3 vTangent;
varying vec3 vBitangent;
#endif
#endif

#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <color_pars_fragment>
#include <common>
#include <dithering_pars_fragment>
#include <emissivemap_pars_fragment>
#include <lightmap_pars_fragment>
#include <map_pars_fragment>
#include <packing>
#include <uv2_pars_fragment>
#include <uv_pars_fragment>
#include <bsdfs>
#include <bumpmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <clipping_planes_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <lights_physical_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <shadowmap_pars_fragment>
#include <transmission_pars_fragment>

// Custom uniforms for liquid glass effect
uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uTransparency;
uniform float uRefraction;
uniform float uChromaticAberration;
uniform float uFresnelPower;
uniform float uReflectivity;
// envMap and envMapIntensity are provided by Three.js
uniform float uLiquidEffect;
uniform float uFoamIntensity;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vGlassWorldPos;
varying vec3 vReflect;
varying vec3 vRefract;
varying float vWaveHeight;
varying vec3 vWaveNormal;

// Fresnel calculation
float fresnel(vec3 viewDirection, vec3 normal, float power) {
  return pow(1.0 - abs(dot(viewDirection, normal)), power);
}

// Chromatic aberration for refraction
vec3 chromaticRefraction(vec3 viewDirection, vec3 normal, float ior, float chromaticStrength) {
  vec3 refractedR = refract(viewDirection, normal, 1.0 / (ior - chromaticStrength));
  vec3 refractedG = refract(viewDirection, normal, 1.0 / ior);
  vec3 refractedB = refract(viewDirection, normal, 1.0 / (ior + chromaticStrength));
  
  #ifdef ENVMAP_TYPE_CUBE
  vec3 result = vec3(
    textureCube(envMap, refractedR).r,
    textureCube(envMap, refractedG).g,
    textureCube(envMap, refractedB).b
  );
  
  // Add distortion based on wave height
  float distortion = vWaveHeight * 0.1;
  result = mix(result, textureCube(envMap, refractedG + vec3(distortion)).rgb, 0.3);
  #else
  vec3 result = vec3(0.5);
  #endif
  
  return result;
}

// Foam effect for water surface
float foam(vec2 uv, float waveHeight, float time) {
  float foamThreshold = 0.3;
  float foamAmount = smoothstep(foamThreshold - 0.1, foamThreshold + 0.1, abs(waveHeight));
  
  // Add foam texture pattern
  float foamPattern = sin(uv.x * 40.0 + time) * cos(uv.y * 30.0 - time * 0.5);
  foamPattern += sin(uv.x * 25.0 - time * 0.8) * sin(uv.y * 35.0 + time);
  foamPattern = clamp(foamPattern * 0.5 + 0.5, 0.0, 1.0);
  
  return foamAmount * foamPattern;
}

// Caustics for underwater effect
vec3 caustics(vec3 position, float time) {
  float c1 = sin(position.x * 6.0 + time * 1.5) * sin(position.z * 6.0 + time);
  float c2 = cos(position.x * 4.0 - time) * cos(position.z * 5.0 + time * 1.2);
  float c3 = sin((position.x + position.z) * 3.0 + time * 0.8);
  
  float causticPattern = (c1 + c2 + c3) / 3.0;
  causticPattern = pow(max(0.0, causticPattern), 2.0);
  
  return vec3(causticPattern) * vec3(0.3, 0.6, 1.0);
}

void main() {
  #include <clipping_planes_fragment>
  
  vec4 diffuseColor = vec4(diffuse, opacity);
  ReflectedLight reflectedLight = ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));
  vec3 totalEmissiveRadiance = emissive;
  
  #include <logdepthbuf_fragment>
  #include <map_fragment>
  #include <color_fragment>
  #include <alphamap_fragment>
  #include <alphatest_fragment>
  #include <specularmap_fragment>
  #include <roughnessmap_fragment>
  #include <metalnessmap_fragment>
  #include <normal_fragment_begin>
  #include <normal_fragment_maps>
  #include <clearcoat_normal_fragment_begin>
  #include <clearcoat_normal_fragment_maps>
  #include <emissivemap_fragment>
  
  // Use wave normal for more accurate water surface
  vec3 viewDirection = normalize(vViewPosition);
  vec3 worldNormal = normalize(vWaveNormal);
  
  // Calculate Fresnel effect
  float fresnelFactor = fresnel(viewDirection, worldNormal, uFresnelPower);
  
  // Water color gradient with depth effect
  float depth = 1.0 - abs(vWaveHeight) * 2.0;
  vec3 shallowColor = mix(uColor1, uColor2, vUv.y);
  vec3 deepColor = mix(uColor2, uColor3, depth);
  vec3 gradientColor = mix(shallowColor, deepColor, fresnelFactor);
  
  // Add foam effect
  float foamAmount = foam(vUv, vWaveHeight, uTime) * uFoamIntensity;
  vec3 foamColor = vec3(1.0, 1.0, 1.0);
  gradientColor = mix(gradientColor, foamColor, foamAmount);
  
  // Reflection
  #ifdef ENVMAP_TYPE_CUBE
  vec3 reflectionColor = textureCube(envMap, vReflect).rgb * envMapIntensity;
  
  // Add slight blur to reflection for water effect
  vec3 blurredReflection = reflectionColor;
  for (int i = 0; i < 4; i++) {
    vec3 offset = vec3(
      sin(float(i) * 2.0) * 0.01,
      0.0,
      cos(float(i) * 2.0) * 0.01
    );
    blurredReflection += textureCube(envMap, vReflect + offset).rgb * envMapIntensity;
  }
  blurredReflection /= 5.0;
  reflectionColor = mix(reflectionColor, blurredReflection, uLiquidEffect);
  #else
  vec3 reflectionColor = vec3(0.5);
  #endif
  
  // Refraction with chromatic aberration (stronger for water)
  vec3 refractionColor;
  #ifdef ENVMAP_TYPE_CUBE
  if (uChromaticAberration > 0.0) {
    float waterIOR = 1.33 + vWaveHeight * 0.1;
    refractionColor = chromaticRefraction(-viewDirection, worldNormal, waterIOR, uChromaticAberration * 1.5);
  } else {
    refractionColor = textureCube(envMap, vRefract).rgb;
  }
  refractionColor *= envMapIntensity;
  #else
  refractionColor = vec3(0.3);
  #endif
  
  // Add caustics to refraction
  vec3 causticsColor = caustics(vGlassWorldPos, uTime);
  refractionColor += causticsColor * 0.3 * uLiquidEffect;
  
  // Mix reflection and refraction based on Fresnel and wave
  float reflectionMix = fresnelFactor * uReflectivity * (1.0 + abs(vWaveHeight));
  vec3 envColor = mix(refractionColor, reflectionColor, clamp(reflectionMix, 0.0, 1.0));
  
  // Combine all effects
  vec3 finalColor = mix(gradientColor, envColor, 0.85);
  
  // Apply transparency with wave variation
  float waveAlpha = 1.0 - abs(vWaveHeight) * 0.3;
  float finalAlpha = mix(uTransparency * waveAlpha, 1.0, fresnelFactor * 0.6 + foamAmount * 0.4);
  
  // Set diffuse color for standard lighting
  diffuseColor.rgb = finalColor;
  diffuseColor.a = finalAlpha;
  
  // Skip transmission_fragment to avoid conflicts
  
  vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + 
                       reflectedLight.directSpecular + reflectedLight.indirectSpecular + 
                       totalEmissiveRadiance;
  
  // Add our liquid glass color contribution
  outgoingLight += finalColor * 0.95;
  
  gl_FragColor = vec4(outgoingLight, diffuseColor.a);
  
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  #include <fog_fragment>
  #include <premultiplied_alpha_fragment>
  #include <dithering_fragment>
}
`;
var n$9 = `// Glass WaterPlane Vertex Shader - Liquid Glass Effect

#define STANDARD
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
#ifdef USE_TANGENT
varying vec3 vTangent;
varying vec3 vBitangent;
#endif
#endif
#include <clipping_planes_pars_vertex>
#include <color_pars_vertex>
#include <common>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <morphtarget_pars_vertex>
#include <shadowmap_pars_vertex>
#include <skinning_pars_vertex>
#include <uv2_pars_vertex>
#include <uv_pars_vertex>

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vGlassWorldPos;
varying vec3 vReflect;
varying vec3 vRefract;
varying float vWaveHeight;
varying vec3 vWaveNormal;

uniform float uTime;
uniform float uSpeed;
uniform float uWaveAmplitude;
uniform float uWaveFrequency;
uniform float uNoiseStrength;
uniform float uDistortion;
uniform float uFlowSpeed;
uniform vec2 uFlowDirection;

// Noise functions for water-like glass distortion
vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
  return mod289(((x * 34.0) + 1.0) * x);
}

vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1),
    dot(p2, x2), dot(p3, x3)));
}

// Water wave function
vec3 waterWave(vec2 pos, float time) {
  // Flow effect
  vec2 flowPos = pos + uFlowDirection * time * uFlowSpeed;
  
  // Multiple wave layers for realistic water
  float wave1 = sin(flowPos.x * uWaveFrequency + time) * cos(flowPos.y * uWaveFrequency * 0.8 + time * 0.7);
  float wave2 = sin(flowPos.x * uWaveFrequency * 1.7 - time * 1.3) * sin(flowPos.y * uWaveFrequency * 1.3 + time);
  float wave3 = cos(flowPos.x * uWaveFrequency * 0.5 + time * 0.5) * sin(flowPos.y * uWaveFrequency * 0.6 - time * 0.8);
  
  // Combine waves
  float height = (wave1 * 0.5 + wave2 * 0.3 + wave3 * 0.2) * uWaveAmplitude;
  
  // Calculate wave normals
  float dx = cos(flowPos.x * uWaveFrequency + time) * uWaveFrequency * 0.5 * uWaveAmplitude;
  float dz = -sin(flowPos.y * uWaveFrequency * 0.8 + time * 0.7) * uWaveFrequency * 0.8 * 0.5 * uWaveAmplitude;
  
  return vec3(dx, height, dz);
}

void main() {
  #include <uv_pars_vertex>
  #include <uv_vertex>
  #include <uv2_pars_vertex>
  #include <uv2_vertex>
  #include <color_pars_vertex>
  #include <color_vertex>
  #include <morphcolor_vertex>
  #include <beginnormal_vertex>
  #include <morphnormal_vertex>
  #include <skinbase_vertex>
  #include <skinnormal_vertex>
  #include <defaultnormal_vertex>
  #include <normal_vertex>
  
  // Pass UV coordinates
  vUv = uv;

  // Calculate time-based animation
  float time = uTime * uSpeed;
  
  // Calculate water waves
  vec3 waveData = waterWave(position.xz, time);
  float waveHeight = waveData.y;
  vec2 waveGradient = waveData.xz;
  
  // Add noise for organic water movement
  vec3 noisePos = vec3(position.x, position.y, position.z) + vec3(time * 0.05);
  float noise = snoise(noisePos * 1.2) * uNoiseStrength * 0.5;
  
  // Store wave height for fragment shader
  vWaveHeight = waveHeight + noise;
  
  // Calculate perturbed normal for water surface
  vec3 waveNormal = normalize(vec3(-waveGradient.x, 1.0, -waveGradient.y));
  vWaveNormal = waveNormal;
  
  // Blend original normal with wave normal
  vec3 blendedNormal = normalize(mix(normal, waveNormal, 0.7));
  
  #ifndef FLAT_SHADED
  vNormal = normalize(mat3(modelViewMatrix) * blendedNormal);
  #ifdef USE_TANGENT
  vTangent = normalize(transformedTangent);
  vBitangent = normalize(cross(vNormal, vTangent) * tangent.w);
  #endif
  #endif
  
  #include <begin_vertex>
  #include <morphtarget_vertex>
  #include <skinning_vertex>
  #include <displacementmap_vertex>
  
  // Apply wave displacement and additional distortion
  transformed.y += waveHeight + noise;
  transformed += blendedNormal * uDistortion * noise;
  
  #include <project_vertex>
  #include <logdepthbuf_vertex>
  #include <clipping_planes_vertex>
  
  vViewPosition = -mvPosition.xyz;
  vPosition = transformed;
  
  // Calculate world position for refraction
  vec4 worldPosition = modelMatrix * vec4(transformed, 1.0);
  vGlassWorldPos = worldPosition.xyz;
  
  // Calculate reflection and refraction vectors with wave normal
  vec3 worldNormal = normalize(mat3(modelMatrix) * blendedNormal);
  vec3 viewVector = normalize(cameraPosition - worldPosition.xyz);
  
  // Reflection vector
  vReflect = reflect(-viewVector, worldNormal);
  
  // Refraction vector with varying IOR for water effect
  float ior = 1.33 + sin(time + position.x * 2.0) * 0.1; // Water IOR ~1.33
  vRefract = refract(-viewVector, worldNormal, 1.0 / ior);
  
  #include <fog_vertex>
  #include <shadowmap_vertex>
}
`;
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-SNM3FAAB.mjs
var p$5 = {};
A$3(p$5, {
	plane: () => i$5,
	sphere: () => i$4,
	waterPlane: () => o$4
});
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-QDM5QQJ2.mjs
var t$9 = {};
A$3(t$9, {
	fragment: () => n$8,
	vertex: () => e$8
});
var n$8 = `uniform float uC1r;
uniform float uC1g;
uniform float uC1b;
uniform float uC2r;
uniform float uC2g;
uniform float uC2b;
uniform float uC3r;
uniform float uC3g;
uniform float uC3b;


varying vec3 vNormal;
varying vec3 vPos;

void main() {
  vec3 color1 = vec3(uC1r, uC1g, uC1b);
  vec3 color2 = vec3(uC2r, uC2g, uC2b);
  vec3 color3 = vec3(uC3r, uC3g, uC3b);

  gl_FragColor = vec4(color1 * vPos.x + color2 * vPos.y + color3 * vPos.z, 1.);

}
`;
var e$8 = `// #pragma glslify: cnoise3 = require(glsl-noise/classic/3d) 

// noise source from https://github.com/hughsk/glsl-noise/blob/master/periodic/3d.glsl

vec3 mod289(vec3 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x)
{
  return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec3 fade(vec3 t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float cnoise(vec3 P)
{
  vec3 Pi0 = floor(P); // Integer part for indexing
  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  vec3 Pf0 = fract(P); // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 * (1.0 / 7.0);
  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 * (1.0 / 7.0);
  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
  return 2.2 * n_xyz;
}

//-------- start here ------------

mat3 rotation3dY(float angle) {
  float s = sin(angle);
  float c = cos(angle);

  return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);
}

vec3 rotateY(vec3 v, float angle) { return rotation3dY(angle) * v; }

varying vec3 vNormal;
varying float displacement;
varying vec3 vPos;
varying float vDistort;

varying vec2 vUv;

uniform float uTime;
uniform float uSpeed;

uniform float uLoadingTime;

uniform float uNoiseDensity;
uniform float uNoiseStrength;

#define STANDARD
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
#ifdef USE_TANGENT
varying vec3 vTangent;
varying vec3 vBitangent;
#endif
#endif
#include <clipping_planes_pars_vertex>
#include <color_pars_vertex>
#include <common>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <morphtarget_pars_vertex>
#include <shadowmap_pars_vertex>
#include <skinning_pars_vertex>
#include <uv2_pars_vertex>
#include <uv_pars_vertex>

void main() {

  #include <beginnormal_vertex>
  #include <color_vertex>
  #include <defaultnormal_vertex>
  #include <morphnormal_vertex>
  #include <skinbase_vertex>
  #include <skinnormal_vertex>
  #include <uv2_vertex>
  #include <uv_vertex>
  #ifndef FLAT_SHADED
    vNormal = normalize(transformedNormal);
  #ifdef USE_TANGENT
    vTangent = normalize(transformedTangent);
    vBitangent = normalize(cross(vNormal, vTangent) * tangent.w);
  #endif
  #endif
  #include <begin_vertex>

  #include <clipping_planes_vertex>
  #include <displacementmap_vertex>
  #include <logdepthbuf_vertex>
  #include <morphtarget_vertex>
  #include <project_vertex>
  #include <skinning_vertex>
    vViewPosition = -mvPosition.xyz;
  #include <fog_vertex>
  #include <shadowmap_vertex>
  #include <worldpos_vertex>

  //-------- start vertex ------------
  vUv = uv;

  // vNormal = normal;

  float t = uTime * uSpeed;
  // Create a sine wave from top to bottom of the sphere
  float distortion = 0.75 * cnoise(0.43 * position * uNoiseDensity + t);

  vec3 pos = position + normal * distortion * uNoiseStrength * uLoadingTime;
  vPos = pos;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}
`;
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-7UVO7YQS.mjs
var r$5 = {};
A$3(r$5, {
	fragment: () => n$7,
	vertex: () => e$7
});
var n$7 = `
#define STANDARD
#ifdef PHYSICAL
#define REFLECTIVITY
#define CLEARCOAT
#define TRANSMISSION
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef TRANSMISSION
uniform float transmission;
#endif
#ifdef REFLECTIVITY
uniform float reflectivity;
#endif
#ifdef CLEARCOAT
uniform float clearcoat;
uniform float clearcoatRoughness;
#endif
#ifdef USE_SHEEN
uniform vec3 sheen;
#endif
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
#ifdef USE_TANGENT
varying vec3 vTangent;
varying vec3 vBitangent;
#endif
#endif
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <color_pars_fragment>
#include <common>
#include <dithering_pars_fragment>
#include <emissivemap_pars_fragment>
#include <lightmap_pars_fragment>
#include <map_pars_fragment>
#include <packing>
#include <uv2_pars_fragment>
#include <uv_pars_fragment>
// #include <transmissionmap_pars_fragment>
#include <bsdfs>
#include <bumpmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <clipping_planes_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <lights_physical_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <shadowmap_pars_fragment>
// include\uB97C \uD1B5\uD574 \uAC00\uC838\uC628 \uAC12\uC740 \uB300\uBD80\uBD84 \uD658\uACBD, \uBE5B \uB4F1\uC744 \uACC4\uC0B0\uD558\uAE30 \uC704\uD574\uC11C \uAE30\uBCF8 fragment
// shader\uC758 \uAC12\uB4E4\uC744 \uBC1B\uC544\uC654\uC2B5\uB2C8\uB2E4. \uC77C\uB2E8\uC740 \uBB34\uC2DC\uD558\uC154\uB3C4 \uB429\uB2C8\uB2E4.
varying vec3 vNormal;
varying float displacement;
varying vec3 vPos;
varying float vDistort;
uniform float uC1r;
uniform float uC1g;
uniform float uC1b;
uniform float uC2r;
uniform float uC2g;
uniform float uC2b;
uniform float uC3r;
uniform float uC3g;
uniform float uC3b;
varying vec3 color1;
varying vec3 color2;
varying vec3 color3;
varying float distanceToCenter;
void main() {
  //-------- basic gradient ------------
  vec3 color1 = vec3(uC1r, uC1g, uC1b);
  vec3 color2 = vec3(uC2r, uC2g, uC2b);
  vec3 color3 = vec3(uC3r, uC3g, uC3b);
  float clearcoat = 1.0;
  float clearcoatRoughness = 0.5;
#include <clipping_planes_fragment>

  float distanceToCenter = distance(vPos, vec3(0, 0, 0));
  // distanceToCenter\uB85C \uC911\uC2EC\uC810\uACFC\uC758 \uAC70\uB9AC\uB97C \uAD6C\uD568.

  vec4 diffuseColor =
      vec4(mix(color3, mix(color2, color1, smoothstep(-1.0, 1.0, vPos.y)),
               distanceToCenter),
           1);

  //-------- materiality ------------
  ReflectedLight reflectedLight =
      ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));
  vec3 totalEmissiveRadiance = emissive;
#ifdef TRANSMISSION
  float totalTransmission = transmission;
#endif
#include <logdepthbuf_fragment>
#include <map_fragment>
#include <color_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
#include <roughnessmap_fragment>
#include <metalnessmap_fragment>
#include <normal_fragment_begin>
#include <normal_fragment_maps>
#include <clearcoat_normal_fragment_begin>
#include <clearcoat_normal_fragment_maps>
#include <emissivemap_fragment>
// #include <transmissionmap_fragment>
#include <lights_physical_fragment>
#include <lights_fragment_begin>
#include <lights_fragment_maps>
#include <lights_fragment_end>
#include <aomap_fragment>
  vec3 outgoingLight =
      reflectedLight.directDiffuse + reflectedLight.indirectDiffuse +
      reflectedLight.directSpecular + reflectedLight.indirectSpecular;
//\uC704\uC5D0\uC11C \uC815\uC758\uD55C diffuseColor\uC5D0 \uD658\uACBD\uC774\uB098 \uBC18\uC0AC\uAC12\uB4E4\uC744 \uBC18\uC601\uD55C \uAC12.
#ifdef TRANSMISSION
  diffuseColor.a *=
      mix(saturate(1. - totalTransmission +
                   linearToRelativeLuminance(reflectedLight.directSpecular +
                                             reflectedLight.indirectSpecular)),
          1.0, metalness);
#endif
  gl_FragColor = vec4(outgoingLight, diffuseColor.a);
  // gl_FragColor\uAC00 fragment shader\uB97C \uD1B5\uD574 \uB098\uD0C0\uB098\uB294 \uCD5C\uC885\uAC12\uC73C\uB85C, diffuseColor\uC5D0\uC11C
  // \uC815\uC758\uD55C \uADF8\uB77C\uB514\uC5B8\uD2B8 \uC0C9\uC0C1 \uC704\uC5D0 \uBC18\uC0AC\uB098 \uBE5B\uC744 \uACC4\uC0B0\uD55C \uAC12\uC744 \uCD5C\uC885\uAC12\uC73C\uB85C \uC815\uC758.
  // gl_FragColor = vec4(mix(mix(color1, color3, smoothstep(-3.0, 3.0,vPos.x)),
  // color2, vNormal.z), 1.0); \uC704\uCC98\uB7FC \uCD5C\uC885\uAC12\uC744 \uADF8\uB77C\uB514\uC5B8\uD2B8 \uAC12 \uC790\uCCB4\uB97C \uB123\uC73C\uBA74 \uD658\uACBD
  // \uC601\uD5A5\uC5C6\uB294 \uADF8\uB77C\uB514\uC5B8\uD2B8\uB9CC \uD45C\uD604\uB428.

#include <tonemapping_fragment>
#include <encodings_fragment>
#include <fog_fragment>
#include <premultiplied_alpha_fragment>
#include <dithering_fragment>
}
`;
var e$7 = `// #pragma glslify: pnoise = require(glsl-noise/periodic/3d)

vec3 mod289(vec3 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x)
{
  return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec3 fade(vec3 t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}

// Classic Perlin noise, periodic variant
float pnoise(vec3 P, vec3 rep)
{
  vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period
  vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  vec3 Pf0 = fract(P); // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 * (1.0 / 7.0);
  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 * (1.0 / 7.0);
  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
  return 2.2 * n_xyz;
}


//-------- start here ------------

varying vec3 vNormal;
uniform float uTime;
uniform float uSpeed;
uniform float uNoiseDensity;
uniform float uNoiseStrength;
uniform float uFrequency;
uniform float uAmplitude;
varying vec3 vPos;
varying float vDistort;
varying vec2 vUv;
varying vec3 vViewPosition;

#define STANDARD
#ifndef FLAT_SHADED
  #ifdef USE_TANGENT
    varying vec3 vTangent;
    varying vec3 vBitangent;
  #endif
#endif

#include <clipping_planes_pars_vertex>
#include <color_pars_vertex>
#include <common>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <morphtarget_pars_vertex>
#include <shadowmap_pars_vertex>
#include <skinning_pars_vertex>
#include <uv2_pars_vertex>
#include <uv_pars_vertex>


// rotation
mat3 rotation3dY(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);
}

vec3 rotateY(vec3 v, float angle) { return rotation3dY(angle) * v; }

void main() {
  #include <beginnormal_vertex>
  #include <color_vertex>
  #include <defaultnormal_vertex>
  #include <morphnormal_vertex>
  #include <skinbase_vertex>
  #include <skinnormal_vertex>
  #include <uv2_vertex>
  #include <uv_vertex>
  #ifndef FLAT_SHADED
    vNormal = normalize(transformedNormal);
  #ifdef USE_TANGENT
    vTangent = normalize(transformedTangent);
    vBitangent = normalize(cross(vNormal, vTangent) * tangent.w);
  #endif
  #endif
  #include <begin_vertex>

  #include <clipping_planes_vertex>
  #include <displacementmap_vertex>
  #include <logdepthbuf_vertex>
  #include <morphtarget_vertex>
  #include <project_vertex>
  #include <skinning_vertex>
    vViewPosition = -mvPosition.xyz;
  #include <fog_vertex>
  #include <shadowmap_vertex>
  #include <worldpos_vertex>

  //-------- start vertex ------------
  float t = uTime * uSpeed;
  float distortion =
      pnoise((normal + t) * uNoiseDensity, vec3(10.0)) * uNoiseStrength;
  vec3 pos = position + (normal * distortion);
  float angle = sin(uv.y * uFrequency + t) * uAmplitude;
  pos = rotateY(pos, angle);

  vPos = pos;
  vDistort = distortion;
  vNormal = normal;
  vUv = uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}
`;
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-KSOJKU6C.mjs
var t$8 = {};
A$3(t$8, {
	fragment: () => n$6,
	vertex: () => e$6
});
var n$6 = `uniform float uC1r;
uniform float uC1g;
uniform float uC1b;
uniform float uC2r;
uniform float uC2g;
uniform float uC2b;
uniform float uC3r;
uniform float uC3g;
uniform float uC3b;


varying vec3 vNormal;
varying vec3 vPos;

void main() {
  vec3 color1 = vec3(uC1r, uC1g, uC1b);
  vec3 color2 = vec3(uC2r, uC2g, uC2b);
  vec3 color3 = vec3(uC3r, uC3g, uC3b);

  gl_FragColor = vec4(color1 * vPos.x + color2 * vPos.y + color3 * vPos.z, 1.);

}
`;
var e$6 = `// #pragma glslify: cnoise3 = require(glsl-noise/classic/3d) 

// noise source from https://github.com/hughsk/glsl-noise/blob/master/periodic/3d.glsl

vec3 mod289(vec3 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x)
{
  return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec3 fade(vec3 t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float cnoise(vec3 P)
{
  vec3 Pi0 = floor(P); // Integer part for indexing
  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  vec3 Pf0 = fract(P); // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 * (1.0 / 7.0);
  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 * (1.0 / 7.0);
  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
  return 2.2 * n_xyz;
}

//-------- start here ------------

mat3 rotation3dY(float angle) {
  float s = sin(angle);
  float c = cos(angle);

  return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);
}

vec3 rotateY(vec3 v, float angle) { return rotation3dY(angle) * v; }

varying vec3 vNormal;
varying float displacement;
varying vec3 vPos;
varying float vDistort;

varying vec2 vUv;

uniform float uTime;
uniform float uSpeed;

uniform float uLoadingTime;

uniform float uNoiseDensity;
uniform float uNoiseStrength;

#define STANDARD
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
#ifdef USE_TANGENT
varying vec3 vTangent;
varying vec3 vBitangent;
#endif
#endif
#include <clipping_planes_pars_vertex>
#include <color_pars_vertex>
#include <common>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <morphtarget_pars_vertex>
#include <shadowmap_pars_vertex>
#include <skinning_pars_vertex>
#include <uv2_pars_vertex>
#include <uv_pars_vertex>

void main() {

  #include <beginnormal_vertex>
  #include <color_vertex>
  #include <defaultnormal_vertex>
  #include <morphnormal_vertex>
  #include <skinbase_vertex>
  #include <skinnormal_vertex>
  #include <uv2_vertex>
  #include <uv_vertex>
  #ifndef FLAT_SHADED
    vNormal = normalize(transformedNormal);
  #ifdef USE_TANGENT
    vTangent = normalize(transformedTangent);
    vBitangent = normalize(cross(vNormal, vTangent) * tangent.w);
  #endif
  #endif
  #include <begin_vertex>

  #include <clipping_planes_vertex>
  #include <displacementmap_vertex>
  #include <logdepthbuf_vertex>
  #include <morphtarget_vertex>
  #include <project_vertex>
  #include <skinning_vertex>
    vViewPosition = -mvPosition.xyz;
  #include <fog_vertex>
  #include <shadowmap_vertex>
  #include <worldpos_vertex>

  //-------- start vertex ------------
  vUv = uv;

  // vNormal = normal;

  float t = uTime * uSpeed;
  // Create a sine wave from top to bottom of the sphere
  float distortion = 0.75 * cnoise(0.43 * position * uNoiseDensity + t);

  vec3 pos = position + normal * distortion * uNoiseStrength * uLoadingTime;
  vPos = pos;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}
`;
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-65KZC4AC.mjs
var p$4 = {};
A$3(p$4, {
	plane: () => t$9,
	sphere: () => r$5,
	waterPlane: () => t$8
});
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-6I4MTSXI.mjs
var o$3 = {};
A$3(o$3, {
	fragment: () => n$5,
	vertex: () => e$5
});
var n$5 = `// Cosmic Plane Fragment Shader - Holographic Gradient

#define STANDARD
#ifdef PHYSICAL
#define REFLECTIVITY
#define CLEARCOAT
#define TRANSMISSION
#endif

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;

#ifdef TRANSMISSION
uniform float transmission;
#endif
#ifdef REFLECTIVITY
uniform float reflectivity;
#endif
#ifdef CLEARCOAT
uniform float clearcoat;
uniform float clearcoatRoughness;
#endif
#ifdef USE_SHEEN
uniform vec3 sheen;
#endif
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
#ifdef USE_TANGENT
varying vec3 vTangent;
varying vec3 vBitangent;
#endif
#endif
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <color_pars_fragment>
#include <common>
#include <dithering_pars_fragment>
#include <emissivemap_pars_fragment>
#include <lightmap_pars_fragment>
#include <map_pars_fragment>
#include <packing>
#include <uv2_pars_fragment>
#include <uv_pars_fragment>
#include <bsdfs>
#include <bumpmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <clipping_planes_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <lights_physical_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <shadowmap_pars_fragment>

varying vec3 vNormal;
varying float displacement;
varying vec3 vPos;
varying float vDistort;
varying vec2 vUv;
varying float vHolographicIntensity;
varying float vCosmicWave;

uniform float uTime;
uniform float uSpeed;

uniform float uC1r;
uniform float uC1g;
uniform float uC1b;
uniform float uC2r;
uniform float uC2g;
uniform float uC2b;
uniform float uC3r;
uniform float uC3g;
uniform float uC3b;

// Holographic helper functions
float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise2D(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    
    return mix(mix(hash(i + vec2(0.0, 0.0)), 
                   hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), 
                   hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

// for npm package, need to add this manually
float linearToRelativeLuminance2( const in vec3 color ) {
    vec3 weights = vec3( 0.2126, 0.7152, 0.0722 );
    return dot( weights, color.rgb );
}

void main() {

  //-------- Cosmic Holographic Gradient ------------
  vec3 color1 = vec3(uC1r, uC1g, uC1b);
  vec3 color2 = vec3(uC2r, uC2g, uC2b);
  vec3 color3 = vec3(uC3r, uC3g, uC3b);
  
  float clearcoat = 1.0;
  float clearcoatRoughness = 0.2; // More reflective for holographic effect

  #include <clipping_planes_fragment>

  float t = uTime * uSpeed;
  
  // Create holographic interference patterns
  float interference1 = sin(vPos.x * 20.0 + t * 3.0) * cos(vPos.y * 15.0 + t * 2.0);
  float interference2 = sin(vPos.x * 35.0 + t * 4.0) * sin(vPos.y * 30.0 + t * 3.5);
  float interference3 = cos(vPos.x * 50.0 + t * 5.0) * cos(vPos.y * 45.0 + t * 4.5);
  
  // Combine interference patterns
  float holographicPattern = (interference1 + interference2 * 0.5 + interference3 * 0.25) / 1.75;
  
  // Create cosmic shimmer effect
  float shimmer = noise2D(vPos.xy * 40.0 + t * 2.0) * 0.3;
  float cosmicGlow = noise2D(vPos.xy * 8.0 + t * 0.5) * 0.5;
  
  // Holographic color shifting
  vec3 holographicShift = vec3(
    sin(vPos.x * 10.0 + t * 2.0 + 0.0) * 0.1,
    sin(vPos.x * 10.0 + t * 2.0 + 2.094) * 0.1,  // 120 degrees
    sin(vPos.x * 10.0 + t * 2.0 + 4.188) * 0.1   // 240 degrees
  );
  
  // Enhanced gradient mixing with cosmic effects
  float gradientX = smoothstep(-4.0, 4.0, vPos.x + holographicPattern * 2.0);
  float gradientY = smoothstep(-4.0, 4.0, vPos.y + vCosmicWave * 1.5);
  float gradientZ = smoothstep(-2.0, 2.0, vPos.z + shimmer);
  
  // Multi-layer color mixing for depth
  vec3 baseGradient = mix(
    mix(color1, color2, gradientX), 
    color3, 
    gradientY * 0.7 + gradientZ * 0.3
  );
  
  // Apply holographic color shifts
  vec3 holographicColor = baseGradient + holographicShift;
  
  // Add cosmic glow and shimmer
  vec3 cosmicEnhancement = vec3(
    cosmicGlow * 0.2,
    shimmer * 0.15,
    (cosmicGlow + shimmer) * 0.1
  );
  
  // Holographic intensity modulation
  float intensityMod = 1.0 + vHolographicIntensity * 0.5 + abs(holographicPattern) * 0.3;
  
  // Final color with cosmic and holographic effects
  vec3 finalColor = (holographicColor + cosmicEnhancement) * intensityMod;
  
  // Add subtle iridescence
  float iridescence = sin(vPos.x * 25.0 + t * 3.0) * cos(vPos.y * 20.0 + t * 2.5) * 0.1;
  finalColor += vec3(iridescence * 0.2, iridescence * 0.3, iridescence * 0.4);

  vec4 diffuseColor = vec4(finalColor, 1.0);

  //-------- Enhanced Materiality for Holographic Effect ------------
  ReflectedLight reflectedLight = ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));
  vec3 totalEmissiveRadiance = emissive + finalColor * 0.1; // Add some emission for glow

  #ifdef TRANSMISSION
    float totalTransmission = transmission;
  #endif
  #include <logdepthbuf_fragment>
  #include <map_fragment>
  #include <color_fragment>
  #include <alphamap_fragment>
  #include <alphatest_fragment>
  #include <roughnessmap_fragment>
  #include <metalnessmap_fragment>
  #include <normal_fragment_begin>
  #include <normal_fragment_maps>
  #include <clearcoat_normal_fragment_begin>
  #include <clearcoat_normal_fragment_maps>
  #include <emissivemap_fragment>
  #include <lights_physical_fragment>
  #include <lights_fragment_begin>
  #include <lights_fragment_maps>
  #include <lights_fragment_end>
  #include <aomap_fragment>
  
  vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse +
                      reflectedLight.directSpecular + reflectedLight.indirectSpecular +
                      totalEmissiveRadiance;

  #ifdef TRANSMISSION
    diffuseColor.a *= mix(saturate(1. - totalTransmission +
                        linearToRelativeLuminance2(reflectedLight.directSpecular +
                                                  reflectedLight.indirectSpecular)),
                1.0, metalness);
  #endif

  #include <tonemapping_fragment>
  #include <encodings_fragment>
  #include <fog_fragment>
  #include <premultiplied_alpha_fragment>
  #include <dithering_fragment>

  gl_FragColor = vec4(outgoingLight, diffuseColor.a);
}
`;
var e$5 = `// Cosmic Plane Vertex Shader - Holographic Effect
// #pragma glslify: cnoise3 = require(glsl-noise/classic/3d) 

// noise source from https://github.com/hughsk/glsl-noise/blob/master/periodic/3d.glsl

vec3 mod289(vec3 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x)
{
  return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec3 fade(vec3 t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float cnoise(vec3 P)
{
  vec3 Pi0 = floor(P); // Integer part for indexing
  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  vec3 Pf0 = fract(P); // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 * (1.0 / 7.0);
  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 * (1.0 / 7.0);
  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
  return 2.2 * n_xyz;
}

//-------- Holographic Effect Functions ------------

mat3 rotation3dY(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);
}

mat3 rotation3dX(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat3(1.0, 0.0, 0.0, 0.0, c, s, 0.0, -s, c);
}

vec3 rotateY(vec3 v, float angle) { return rotation3dY(angle) * v; }
vec3 rotateX(vec3 v, float angle) { return rotation3dX(angle) * v; }

varying vec3 vNormal;
varying float displacement;
varying vec3 vPos;
varying float vDistort;
varying vec2 vUv;
varying float vHolographicIntensity;
varying float vCosmicWave;

uniform float uTime;
uniform float uSpeed;
uniform float uLoadingTime;
uniform float uNoiseDensity;
uniform float uNoiseStrength;

#define STANDARD
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
#ifdef USE_TANGENT
varying vec3 vTangent;
varying vec3 vBitangent;
#endif
#endif
#include <clipping_planes_pars_vertex>
#include <color_pars_vertex>
#include <common>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <morphtarget_pars_vertex>
#include <shadowmap_pars_vertex>
#include <skinning_pars_vertex>
#include <uv2_pars_vertex>
#include <uv_pars_vertex>

void main() {

  #include <beginnormal_vertex>
  #include <color_vertex>
  #include <defaultnormal_vertex>
  #include <morphnormal_vertex>
  #include <skinbase_vertex>
  #include <skinnormal_vertex>
  #include <uv2_vertex>
  #include <uv_vertex>
  #ifndef FLAT_SHADED
    vNormal = normalize(transformedNormal);
  #ifdef USE_TANGENT
    vTangent = normalize(transformedTangent);
    vBitangent = normalize(cross(vNormal, vTangent) * tangent.w);
  #endif
  #endif
  #include <begin_vertex>

  #include <clipping_planes_vertex>
  #include <displacementmap_vertex>
  #include <logdepthbuf_vertex>
  #include <morphtarget_vertex>
  #include <project_vertex>
  #include <skinning_vertex>
    vViewPosition = -mvPosition.xyz;
  #include <fog_vertex>
  #include <shadowmap_vertex>
  #include <worldpos_vertex>

  //-------- Cosmic Holographic Effect ------------
  vUv = uv;
  
  float t = uTime * uSpeed;
  
  // Create holographic interference patterns
  float holographicPattern = sin(position.x * 15.0 + t * 2.0) * 
                            sin(position.y * 12.0 + t * 1.5) * 0.1;
  
  // Cosmic wave distortion
  float cosmicWave = cnoise(position * uNoiseDensity * 0.5 + vec3(t * 0.3, t * 0.2, t * 0.4));
  vCosmicWave = cosmicWave;
  
  // Multi-layer noise for depth
  float noise1 = cnoise(position * uNoiseDensity * 2.0 + t * 0.8);
  float noise2 = cnoise(position * uNoiseDensity * 0.3 + t * 0.2) * 0.5;
  float noise3 = cnoise(position * uNoiseDensity * 4.0 + t * 1.2) * 0.25;
  
  float combinedNoise = noise1 + noise2 + noise3;
  
  // Holographic shimmer effect
  float shimmer = sin(position.x * 30.0 + t * 4.0) * 
                  cos(position.y * 25.0 + t * 3.0) * 0.05;
  
  // Calculate holographic intensity for fragment shader
  vHolographicIntensity = abs(holographicPattern) + abs(shimmer) * 2.0;
  
  // Apply displacement with holographic and cosmic effects
  float totalDisplacement = (combinedNoise + holographicPattern + shimmer) * uNoiseStrength * uLoadingTime;
  
  vec3 pos = position + normal * totalDisplacement;
  vPos = pos;
  
  // Add subtle rotation effect for cosmic feel
  pos = rotateY(pos, sin(t * 0.1) * 0.05);
  pos = rotateX(pos, cos(t * 0.07) * 0.03);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-B5JTL55V.mjs
var a$6 = {};
A$3(a$6, {
	fragment: () => n$4,
	vertex: () => e$4
});
var n$4 = `// Cosmic Sphere Fragment Shader - Nebula Particle Effect

#define STANDARD
#ifdef PHYSICAL
#define REFLECTIVITY
#define CLEARCOAT
#define TRANSMISSION
#endif

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;

#ifdef TRANSMISSION
uniform float transmission;
#endif
#ifdef REFLECTIVITY
uniform float reflectivity;
#endif
#ifdef CLEARCOAT
uniform float clearcoat;
uniform float clearcoatRoughness;
#endif
#ifdef USE_SHEEN
uniform vec3 sheen;
#endif
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
#ifdef USE_TANGENT
varying vec3 vTangent;
varying vec3 vBitangent;
#endif
#endif
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <color_pars_fragment>
#include <common>
#include <dithering_pars_fragment>
#include <emissivemap_pars_fragment>
#include <lightmap_pars_fragment>
#include <map_pars_fragment>
#include <packing>
#include <uv2_pars_fragment>
#include <uv_pars_fragment>
#include <bsdfs>
#include <bumpmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <clipping_planes_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <lights_physical_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <shadowmap_pars_fragment>

varying vec3 vNormal;
varying float displacement;
varying vec3 vPos;
varying float vDistort;
varying vec2 vUv;
varying float vNebulaIntensity;
varying float vParticleDensity;
varying vec3 vCosmicSwirl;

uniform float uTime;
uniform float uSpeed;

uniform float uC1r;
uniform float uC1g;
uniform float uC1b;
uniform float uC2r;
uniform float uC2g;
uniform float uC2b;
uniform float uC3r;
uniform float uC3g;
uniform float uC3b;

// Nebula helper functions
float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise2D(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    
    return mix(mix(hash(i + vec2(0.0, 0.0)), 
                   hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), 
                   hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

// Fractal Brownian Motion for complex nebula patterns
float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for(int i = 0; i < 5; i++) {
        value += amplitude * noise2D(p * frequency);
        amplitude *= 0.5;
        frequency *= 2.0;
    }
    return value;
}

// Star field generation
float stars(vec2 p, float density) {
    vec2 n = floor(p * density);
    vec2 f = fract(p * density);
    
    float d = 1.0;
    for(int i = -1; i <= 1; i++) {
        for(int j = -1; j <= 1; j++) {
            vec2 g = vec2(float(i), float(j));
            vec2 o = hash(n + g) * vec2(1.0);
            vec2 r = g + o - f;
            d = min(d, dot(r, r));
        }
    }
    
    return 1.0 - smoothstep(0.0, 0.02, sqrt(d));
}

// for npm package, need to add this manually
float linearToRelativeLuminance2( const in vec3 color ) {
    vec3 weights = vec3( 0.2126, 0.7152, 0.0722 );
    return dot( weights, color.rgb );
}

void main() {

  //-------- Cosmic Nebula Gradient ------------
  vec3 color1 = vec3(uC1r, uC1g, uC1b);
  vec3 color2 = vec3(uC2r, uC2g, uC2b);
  vec3 color3 = vec3(uC3r, uC3g, uC3b);
  
  float clearcoat = 1.0;
  float clearcoatRoughness = 0.1; // Very reflective for cosmic shine

  #include <clipping_planes_fragment>

  float t = uTime * uSpeed;
  
  // Calculate distance from center for radial effects
  float distanceFromCenter = length(vPos);
  float angle = atan(vPos.y, vPos.x);
  
  // Create complex nebula patterns using FBM
  vec2 nebulaCoords = vPos.xy * 3.0 + vCosmicSwirl.xy;
  float nebulaPattern1 = fbm(nebulaCoords + t * 0.1);
  float nebulaPattern2 = fbm(nebulaCoords * 2.0 + t * 0.15);
  float nebulaPattern3 = fbm(nebulaCoords * 4.0 + t * 0.2);
  
  // Combine nebula patterns
  float combinedNebula = (nebulaPattern1 + nebulaPattern2 * 0.5 + nebulaPattern3 * 0.25) / 1.75;
  
  // Create particle-like bright spots
  float particleField = stars(vPos.xy * 20.0 + t * 0.5, 50.0);
  float microParticles = stars(vPos.xy * 80.0 + t * 1.0, 200.0) * 0.5;
  
  // Create cosmic dust clouds
  float dustClouds = fbm(vPos.xy * 8.0 + t * 0.05) * 0.3;
  
  // Energy streams
  float energyStream1 = sin(vPos.x * 15.0 + t * 3.0 + angle * 2.0) * 0.1;
  float energyStream2 = cos(vPos.y * 20.0 + t * 2.5 + distanceFromCenter * 5.0) * 0.1;
  
  // Cosmic gradient mixing with nebula influence
  float gradientX = smoothstep(-3.0, 3.0, vPos.x + combinedNebula * 2.0 + vCosmicSwirl.x * 3.0);
  float gradientY = smoothstep(-3.0, 3.0, vPos.y + vNebulaIntensity * 1.5 + vCosmicSwirl.y * 2.0);
  float gradientZ = smoothstep(-2.0, 2.0, vPos.z + dustClouds * 2.0);
  
  // Multi-layer color mixing
  vec3 baseGradient = mix(
    mix(color1, color2, gradientX), 
    color3, 
    gradientY * 0.6 + gradientZ * 0.4
  );
  
  // Add nebula color variations
  vec3 nebulaColor = baseGradient;
  nebulaColor.r += combinedNebula * 0.3 + energyStream1;
  nebulaColor.g += vNebulaIntensity * 0.2 + energyStream2;
  nebulaColor.b += dustClouds * 0.4 + abs(vCosmicSwirl.z) * 0.5;
  
  // Add particle brightness
  vec3 particleGlow = vec3(
    particleField * 0.8 + microParticles * 0.4,
    particleField * 0.6 + microParticles * 0.3,
    particleField * 0.9 + microParticles * 0.5
  );
  
  // Create pulsing cosmic energy
  float cosmicPulse = sin(t * 1.5 + distanceFromCenter * 3.0) * 0.1 + 1.0;
  
  // Combine all effects
  vec3 finalColor = (nebulaColor + particleGlow * 2.0) * cosmicPulse;
  
  // Add cosmic rim lighting effect
  float rimLight = pow(1.0 - abs(dot(normalize(vNormal), normalize(vViewPosition))), 2.0);
  finalColor += rimLight * 0.3 * (color1 + color2 + color3) / 3.0;
  
  // Enhance particle density areas
  finalColor = mix(finalColor, finalColor * 1.5, vParticleDensity * 0.5);
  
  // Add subtle color temperature variation
  float temperature = sin(angle * 3.0 + t * 0.8) * 0.1;
  finalColor.r += temperature * 0.1;
  finalColor.b -= temperature * 0.1;

  vec4 diffuseColor = vec4(finalColor, 1.0);

  //-------- Enhanced Materiality for Cosmic Effect ------------
  ReflectedLight reflectedLight = ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));
  vec3 totalEmissiveRadiance = emissive + finalColor * 0.2; // Strong emission for nebula glow

  #ifdef TRANSMISSION
    float totalTransmission = transmission;
  #endif
  #include <logdepthbuf_fragment>
  #include <map_fragment>
  #include <color_fragment>
  #include <alphamap_fragment>
  #include <alphatest_fragment>
  #include <roughnessmap_fragment>
  #include <metalnessmap_fragment>
  #include <normal_fragment_begin>
  #include <normal_fragment_maps>
  #include <clearcoat_normal_fragment_begin>
  #include <clearcoat_normal_fragment_maps>
  #include <emissivemap_fragment>
  #include <lights_physical_fragment>
  #include <lights_fragment_begin>
  #include <lights_fragment_maps>
  #include <lights_fragment_end>
  #include <aomap_fragment>
  
  vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse +
                      reflectedLight.directSpecular + reflectedLight.indirectSpecular +
                      totalEmissiveRadiance;

  #ifdef TRANSMISSION
    diffuseColor.a *= mix(saturate(1. - totalTransmission +
                        linearToRelativeLuminance2(reflectedLight.directSpecular +
                                                  reflectedLight.indirectSpecular)),
                1.0, metalness);
  #endif

  #include <tonemapping_fragment>
  #include <encodings_fragment>
  #include <fog_fragment>
  #include <premultiplied_alpha_fragment>
  #include <dithering_fragment>

  gl_FragColor = vec4(outgoingLight, diffuseColor.a);
}
`;
var e$4 = `// Cosmic Sphere Vertex Shader - Nebula Effect
// #pragma glslify: cnoise3 = require(glsl-noise/classic/3d) 

// noise source from https://github.com/hughsk/glsl-noise/blob/master/periodic/3d.glsl

vec3 mod289(vec3 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x)
{
  return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec3 fade(vec3 t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float cnoise(vec3 P)
{
  vec3 Pi0 = floor(P); // Integer part for indexing
  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  vec3 Pf0 = fract(P); // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 * (1.0 / 7.0);
  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 * (1.0 / 7.0);
  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
  return 2.2 * n_xyz;
}

//-------- Nebula Effect Functions ------------

mat3 rotation3dY(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);
}

mat3 rotation3dX(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat3(1.0, 0.0, 0.0, 0.0, c, s, 0.0, -s, c);
}

mat3 rotation3dZ(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat3(c, s, 0.0, -s, c, 0.0, 0.0, 0.0, 1.0);
}

vec3 rotateY(vec3 v, float angle) { return rotation3dY(angle) * v; }
vec3 rotateX(vec3 v, float angle) { return rotation3dX(angle) * v; }
vec3 rotateZ(vec3 v, float angle) { return rotation3dZ(angle) * v; }

varying vec3 vNormal;
varying float displacement;
varying vec3 vPos;
varying float vDistort;
varying vec2 vUv;
varying float vNebulaIntensity;
varying float vParticleDensity;
varying vec3 vCosmicSwirl;

uniform float uTime;
uniform float uSpeed;
uniform float uLoadingTime;
uniform float uNoiseDensity;
uniform float uNoiseStrength;

#define STANDARD
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
#ifdef USE_TANGENT
varying vec3 vTangent;
varying vec3 vBitangent;
#endif
#endif
#include <clipping_planes_pars_vertex>
#include <color_pars_vertex>
#include <common>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <morphtarget_pars_vertex>
#include <shadowmap_pars_vertex>
#include <skinning_pars_vertex>
#include <uv2_pars_vertex>
#include <uv_pars_vertex>

void main() {

  #include <beginnormal_vertex>
  #include <color_vertex>
  #include <defaultnormal_vertex>
  #include <morphnormal_vertex>
  #include <skinbase_vertex>
  #include <skinnormal_vertex>
  #include <uv2_vertex>
  #include <uv_vertex>
  #ifndef FLAT_SHADED
    vNormal = normalize(transformedNormal);
  #ifdef USE_TANGENT
    vTangent = normalize(transformedTangent);
    vBitangent = normalize(cross(vNormal, vTangent) * tangent.w);
  #endif
  #endif
  #include <begin_vertex>

  #include <clipping_planes_vertex>
  #include <displacementmap_vertex>
  #include <logdepthbuf_vertex>
  #include <morphtarget_vertex>
  #include <project_vertex>
  #include <skinning_vertex>
    vViewPosition = -mvPosition.xyz;
  #include <fog_vertex>
  #include <shadowmap_vertex>
  #include <worldpos_vertex>

  //-------- Cosmic Nebula Effect ------------
  vUv = uv;
  
  float t = uTime * uSpeed;
  
  // Create swirling nebula patterns
  vec3 swirlCenter = vec3(0.0, 0.0, 0.0);
  vec3 toCenter = position - swirlCenter;
  float distanceFromCenter = length(toCenter);
  
  // Create spiral motion
  float angle = atan(toCenter.y, toCenter.x);
  float spiralAngle = angle + distanceFromCenter * 2.0 + t * 0.5;
  
  // Multi-octave noise for nebula density
  float nebula1 = cnoise(position * uNoiseDensity * 0.8 + vec3(t * 0.2, t * 0.3, t * 0.1));
  float nebula2 = cnoise(position * uNoiseDensity * 1.5 + vec3(t * 0.4, t * 0.2, t * 0.5)) * 0.7;
  float nebula3 = cnoise(position * uNoiseDensity * 3.0 + vec3(t * 0.8, t * 0.6, t * 0.9)) * 0.4;
  float nebula4 = cnoise(position * uNoiseDensity * 6.0 + vec3(t * 1.2, t * 1.0, t * 1.4)) * 0.2;
  
  // Combine nebula layers for complexity
  float nebulaPattern = nebula1 + nebula2 + nebula3 + nebula4;
  vNebulaIntensity = abs(nebulaPattern);
  
  // Create particle-like density variations
  float particleDensity = cnoise(position * uNoiseDensity * 8.0 + vec3(t * 2.0, t * 1.5, t * 2.5));
  vParticleDensity = smoothstep(-0.3, 0.8, particleDensity);
  
  // Create cosmic swirl effect
  vec3 swirl = vec3(
    sin(spiralAngle + t * 0.3) * distanceFromCenter * 0.1,
    cos(spiralAngle + t * 0.2) * distanceFromCenter * 0.1,
    sin(distanceFromCenter * 3.0 + t * 0.4) * 0.05
  );
  vCosmicSwirl = swirl;
  
  // Create pulsing effect for cosmic energy
  float pulse = sin(t * 2.0 + distanceFromCenter * 5.0) * 0.1 + 1.0;
  
  // Apply complex displacement
  float totalDisplacement = nebulaPattern * uNoiseStrength * uLoadingTime * pulse;
  
  // Add swirl displacement
  vec3 pos = position + normal * totalDisplacement + swirl * 0.3;
  vPos = pos;
  
  // Add cosmic rotation for dynamic feel
  pos = rotateY(pos, sin(t * 0.1 + distanceFromCenter) * 0.1);
  pos = rotateX(pos, cos(t * 0.08 + angle) * 0.08);
  pos = rotateZ(pos, sin(t * 0.05 + spiralAngle) * 0.05);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-N4CAJBCU.mjs
var a$5 = {};
A$3(a$5, {
	fragment: () => n$3,
	vertex: () => e$3
});
var n$3 = `// Cosmic WaterPlane Fragment Shader - Aurora Wave Effect

#define STANDARD
#ifdef PHYSICAL
#define REFLECTIVITY
#define CLEARCOAT
#define TRANSMISSION
#endif

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;

#ifdef TRANSMISSION
uniform float transmission;
#endif
#ifdef REFLECTIVITY
uniform float reflectivity;
#endif
#ifdef CLEARCOAT
uniform float clearcoat;
uniform float clearcoatRoughness;
#endif
#ifdef USE_SHEEN
uniform vec3 sheen;
#endif
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
#ifdef USE_TANGENT
varying vec3 vTangent;
varying vec3 vBitangent;
#endif
#endif
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <color_pars_fragment>
#include <common>
#include <dithering_pars_fragment>
#include <emissivemap_pars_fragment>
#include <lightmap_pars_fragment>
#include <map_pars_fragment>
#include <packing>
#include <uv2_pars_fragment>
#include <uv_pars_fragment>
#include <bsdfs>
#include <bumpmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <clipping_planes_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <lights_physical_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <shadowmap_pars_fragment>

varying vec3 vNormal;
varying float displacement;
varying vec3 vPos;
varying float vDistort;
varying vec2 vUv;
varying float vAuroraIntensity;
varying float vWaveHeight;
varying vec3 vFlowDirection;

uniform float uTime;
uniform float uSpeed;

uniform float uC1r;
uniform float uC1g;
uniform float uC1b;
uniform float uC2r;
uniform float uC2g;
uniform float uC2b;
uniform float uC3r;
uniform float uC3g;
uniform float uC3b;

// Aurora helper functions
float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise2D(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    
    return mix(mix(hash(i + vec2(0.0, 0.0)), 
                   hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), 
                   hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

// Fractal Brownian Motion for aurora patterns
float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for(int i = 0; i < 4; i++) {
        value += amplitude * noise2D(p * frequency);
        amplitude *= 0.5;
        frequency *= 2.0;
    }
    return value;
}

// Aurora curtain effect
float aurora(vec2 p, float time) {
    vec2 q = vec2(fbm(p + vec2(0.0, time * 0.1)),
                  fbm(p + vec2(5.2, time * 0.15)));
    
    vec2 r = vec2(fbm(p + 4.0 * q + vec2(1.7, time * 0.2)),
                  fbm(p + 4.0 * q + vec2(8.3, time * 0.18)));
    
    return fbm(p + 4.0 * r);
}

// Water caustics effect
float caustics(vec2 p, float time) {
    vec2 uv = p * 4.0;
    vec2 p0 = uv + vec2(time * 0.3, time * 0.2);
    vec2 p1 = uv + vec2(time * -0.4, time * 0.3);
    
    float c1 = sin(length(p0) * 8.0 - time * 2.0) * 0.5 + 0.5;
    float c2 = sin(length(p1) * 6.0 - time * 1.5) * 0.5 + 0.5;
    
    return (c1 + c2) * 0.5;
}

// for npm package, need to add this manually
float linearToRelativeLuminance2( const in vec3 color ) {
    vec3 weights = vec3( 0.2126, 0.7152, 0.0722 );
    return dot( weights, color.rgb );
}

void main() {

  //-------- Cosmic Aurora Water Gradient ------------
  vec3 color1 = vec3(uC1r, uC1g, uC1b);
  vec3 color2 = vec3(uC2r, uC2g, uC2b);
  vec3 color3 = vec3(uC3r, uC3g, uC3b);
  
  float clearcoat = 1.0;
  float clearcoatRoughness = 0.05; // Very smooth for water-like reflection

  #include <clipping_planes_fragment>

  float t = uTime * uSpeed;
  
  // Create aurora patterns
  vec2 auroraCoords = vPos.xy * 2.0 + vFlowDirection.xy * t * 0.5;
  float auroraPattern1 = aurora(auroraCoords, t);
  float auroraPattern2 = aurora(auroraCoords * 1.5 + vec2(3.0, 1.0), t * 1.2);
  float auroraPattern3 = aurora(auroraCoords * 0.7 + vec2(-2.0, 4.0), t * 0.8);
  
  // Combine aurora layers
  float combinedAurora = (auroraPattern1 + auroraPattern2 * 0.7 + auroraPattern3 * 0.5) / 2.2;
  
  // Create water caustics
  float causticsPattern = caustics(vPos.xy, t);
  
  // Create flowing light streams
  float lightStream1 = sin(vPos.x * 8.0 + t * 2.0 + combinedAurora * 3.0) * 0.2;
  float lightStream2 = cos(vPos.y * 6.0 + t * 1.5 + vWaveHeight * 4.0) * 0.15;
  float lightStream3 = sin((vPos.x + vPos.y) * 10.0 + t * 2.5) * 0.1;
  
  // Create cosmic energy waves
  float distanceFromCenter = length(vPos.xy);
  float energyWave = sin(distanceFromCenter * 5.0 - t * 3.0) * 
                     exp(-distanceFromCenter * 0.05) * 0.3;
  
  // Aurora color shifting effect
  vec3 auroraShift = vec3(
    sin(combinedAurora * 6.28 + t * 1.0) * 0.2,
    sin(combinedAurora * 6.28 + t * 1.0 + 2.094) * 0.2,  // 120 degrees
    sin(combinedAurora * 6.28 + t * 1.0 + 4.188) * 0.2   // 240 degrees
  );
  
  // Enhanced gradient mixing with aurora and water effects
  float gradientX = smoothstep(-4.0, 4.0, vPos.x + combinedAurora * 3.0 + vFlowDirection.x * 2.0);
  float gradientY = smoothstep(-4.0, 4.0, vPos.y + vWaveHeight * 2.0 + lightStream1 * 3.0);
  float gradientZ = smoothstep(-3.0, 3.0, vPos.z + causticsPattern * 2.0);
  
  // Multi-layer color mixing
  vec3 baseGradient = mix(
    mix(color1, color2, gradientX), 
    color3, 
    gradientY * 0.7 + gradientZ * 0.3
  );
  
  // Apply aurora color shifts
  vec3 auroraColor = baseGradient + auroraShift;
  
  // Add water caustics coloring
  vec3 causticsColor = vec3(
    causticsPattern * 0.3,
    causticsPattern * 0.4,
    causticsPattern * 0.5
  );
  
  // Add light streams
  vec3 lightStreams = vec3(
    abs(lightStream1) * 0.4,
    abs(lightStream2) * 0.3,
    abs(lightStream3) * 0.5
  );
  
  // Aurora intensity modulation
  float auroraIntensityMod = 1.0 + vAuroraIntensity * 0.8 + abs(combinedAurora) * 0.6;
  
  // Combine all effects
  vec3 finalColor = (auroraColor + causticsColor + lightStreams + vec3(energyWave * 0.2)) * auroraIntensityMod;
  
  // Add water-like shimmer
  float shimmer = sin(vPos.x * 20.0 + t * 4.0) * 
                  cos(vPos.y * 18.0 + t * 3.5) * 
                  vWaveHeight * 0.1;
  finalColor += vec3(shimmer * 0.3, shimmer * 0.4, shimmer * 0.6);
  
  // Add aurora dancing effect
  float auroraMovement = sin(vPos.x * 3.0 + t * 1.2 + combinedAurora * 2.0) * 
                         cos(vPos.y * 2.5 + t * 0.9) * 0.15;
  finalColor.g += abs(auroraMovement) * 0.4;
  finalColor.b += abs(auroraMovement) * 0.2;
  
  // Add cosmic depth variation
  float depthVariation = noise2D(vPos.xy * 5.0 + t * 0.3) * 0.1;
  finalColor *= (1.0 + depthVariation);

  vec4 diffuseColor = vec4(finalColor, 1.0);

  //-------- Enhanced Materiality for Water Aurora Effect ------------
  ReflectedLight reflectedLight = ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));
  vec3 totalEmissiveRadiance = emissive + finalColor * 0.15; // Moderate emission for aurora glow

  #ifdef TRANSMISSION
    float totalTransmission = transmission;
  #endif
  #include <logdepthbuf_fragment>
  #include <map_fragment>
  #include <color_fragment>
  #include <alphamap_fragment>
  #include <alphatest_fragment>
  #include <roughnessmap_fragment>
  #include <metalnessmap_fragment>
  #include <normal_fragment_begin>
  #include <normal_fragment_maps>
  #include <clearcoat_normal_fragment_begin>
  #include <clearcoat_normal_fragment_maps>
  #include <emissivemap_fragment>
  #include <lights_physical_fragment>
  #include <lights_fragment_begin>
  #include <lights_fragment_maps>
  #include <lights_fragment_end>
  #include <aomap_fragment>
  
  vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse +
                      reflectedLight.directSpecular + reflectedLight.indirectSpecular +
                      totalEmissiveRadiance;

  #ifdef TRANSMISSION
    diffuseColor.a *= mix(saturate(1. - totalTransmission +
                        linearToRelativeLuminance2(reflectedLight.directSpecular +
                                                  reflectedLight.indirectSpecular)),
                1.0, metalness);
  #endif

  #include <tonemapping_fragment>
  #include <encodings_fragment>
  #include <fog_fragment>
  #include <premultiplied_alpha_fragment>
  #include <dithering_fragment>

  gl_FragColor = vec4(outgoingLight, diffuseColor.a);
}
`;
var e$3 = `// Cosmic WaterPlane Vertex Shader - Aurora Wave Effect
// #pragma glslify: cnoise3 = require(glsl-noise/classic/3d) 

// noise source from https://github.com/hughsk/glsl-noise/blob/master/periodic/3d.glsl

vec3 mod289(vec3 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x)
{
  return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec3 fade(vec3 t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float cnoise(vec3 P)
{
  vec3 Pi0 = floor(P); // Integer part for indexing
  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  vec3 Pf0 = fract(P); // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 * (1.0 / 7.0);
  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 * (1.0 / 7.0);
  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
  return 2.2 * n_xyz;
}

//-------- Aurora Wave Effect Functions ------------

mat3 rotation3dY(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);
}

vec3 rotateY(vec3 v, float angle) { return rotation3dY(angle) * v; }

varying vec3 vNormal;
varying float displacement;
varying vec3 vPos;
varying float vDistort;
varying vec2 vUv;
varying float vAuroraIntensity;
varying float vWaveHeight;
varying vec3 vFlowDirection;

uniform float uTime;
uniform float uSpeed;
uniform float uLoadingTime;
uniform float uNoiseDensity;
uniform float uNoiseStrength;

#define STANDARD
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
#ifdef USE_TANGENT
varying vec3 vTangent;
varying vec3 vBitangent;
#endif
#endif
#include <clipping_planes_pars_vertex>
#include <color_pars_vertex>
#include <common>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <morphtarget_pars_vertex>
#include <shadowmap_pars_vertex>
#include <skinning_pars_vertex>
#include <uv2_pars_vertex>
#include <uv_pars_vertex>

void main() {

  #include <beginnormal_vertex>
  #include <color_vertex>
  #include <defaultnormal_vertex>
  #include <morphnormal_vertex>
  #include <skinbase_vertex>
  #include <skinnormal_vertex>
  #include <uv2_vertex>
  #include <uv_vertex>
  #ifndef FLAT_SHADED
    vNormal = normalize(transformedNormal);
  #ifdef USE_TANGENT
    vTangent = normalize(transformedTangent);
    vBitangent = normalize(cross(vNormal, vTangent) * tangent.w);
  #endif
  #endif
  #include <begin_vertex>

  #include <clipping_planes_vertex>
  #include <displacementmap_vertex>
  #include <logdepthbuf_vertex>
  #include <morphtarget_vertex>
  #include <project_vertex>
  #include <skinning_vertex>
    vViewPosition = -mvPosition.xyz;
  #include <fog_vertex>
  #include <shadowmap_vertex>
  #include <worldpos_vertex>

  //-------- Cosmic Aurora Wave Effect ------------
  vUv = uv;
  
  float t = uTime * uSpeed;
  
  // Create flowing aurora patterns
  float auroraFlow1 = sin(position.x * 5.0 + t * 1.5) * cos(position.y * 3.0 + t * 1.0);
  float auroraFlow2 = sin(position.x * 8.0 + t * 2.0) * sin(position.y * 6.0 + t * 1.8);
  float auroraFlow3 = cos(position.x * 12.0 + t * 2.5) * cos(position.y * 9.0 + t * 2.2);
  
  // Combine aurora flows
  float auroraPattern = (auroraFlow1 + auroraFlow2 * 0.7 + auroraFlow3 * 0.4) / 2.1;
  vAuroraIntensity = abs(auroraPattern);
  
  // Create multi-layered waves
  float wave1 = cnoise(vec3(position.xy * uNoiseDensity * 0.5, t * 0.3));
  float wave2 = cnoise(vec3(position.xy * uNoiseDensity * 1.2, t * 0.5)) * 0.6;
  float wave3 = cnoise(vec3(position.xy * uNoiseDensity * 2.5, t * 0.8)) * 0.3;
  float wave4 = cnoise(vec3(position.xy * uNoiseDensity * 5.0, t * 1.2)) * 0.15;
  
  // Combine waves for complex water surface
  float combinedWaves = wave1 + wave2 + wave3 + wave4;
  vWaveHeight = combinedWaves;
  
  // Create flowing current patterns
  vec2 flowDirection = vec2(
    sin(position.x * 2.0 + t * 0.8) + cos(position.y * 1.5 + t * 0.6),
    cos(position.x * 1.8 + t * 0.7) + sin(position.y * 2.2 + t * 0.9)
  );
  vFlowDirection = vec3(normalize(flowDirection), 0.0);
  
  // Aurora-influenced wave distortion
  float auroraWave = sin(position.x * 15.0 + t * 3.0 + auroraPattern * 5.0) * 
                     cos(position.y * 12.0 + t * 2.5 + auroraPattern * 4.0) * 0.2;
  
  // Create cosmic energy ripples
  float distanceFromCenter = length(position.xy);
  float cosmicRipple = sin(distanceFromCenter * 8.0 - t * 4.0) * 
                       exp(-distanceFromCenter * 0.1) * 0.3;
  
  // Pulsing effect for cosmic energy
  float cosmicPulse = sin(t * 1.5 + distanceFromCenter * 2.0) * 0.1 + 1.0;
  
  // Apply complex displacement
  float totalDisplacement = (combinedWaves + auroraWave + cosmicRipple) * 
                           uNoiseStrength * uLoadingTime * cosmicPulse;
  
  vec3 pos = position + normal * totalDisplacement;
  vPos = pos;
  
  // Add subtle rotation for cosmic flow
  pos = rotateY(pos, sin(t * 0.05 + distanceFromCenter * 0.1) * 0.02);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-CLJIQSIC.mjs
var p$3 = {};
A$3(p$3, {
	plane: () => o$3,
	sphere: () => a$6,
	waterPlane: () => a$5
});
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-RHJWCM3L.mjs
var t$7 = {};
A$3(t$7, {
	cosmic: () => p$3,
	defaults: () => p$6,
	glass: () => p$5,
	positionMix: () => p$4
});
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-HKGRTUU2.mjs
var r$4 = {
	performance: !1,
	render: !0
}, o$2 = {
	enable: (e) => {
		r$4[e] = !0;
	},
	disable: (e) => {
		r$4[e] = !1;
	},
	enableAll: () => {
		Object.keys(r$4).forEach((e) => {
			r$4[e] = !0;
		});
	},
	disableAll: () => {
		Object.keys(r$4).forEach((e) => {
			r$4[e] = !1;
		});
	},
	performance: (...e) => {
		r$4.performance && console.log("[Performance]", ...e);
	},
	render: (...e) => {
		r$4.render && console.log("[Render]", ...e);
	}
};
typeof window != "undefined" && (window.debug = o$2);
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-H5PDSFZE.mjs
function R$2(e) {
	return e / 180 * Math.PI;
}
function y$4(e) {
	return e.map((r) => R$2(r));
}
function I$4(e) {
	return e.replace("http://localhost:3001/customize", "").replace("https://shadergradient.co/customize", "").replace("https://www.shadergradient.co/customize", "");
}
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-6MZB7NYQ.mjs
function J$2({ animate: d, range: h, rangeStart: y, rangeEnd: v, loop: t, loopDuration: n, positionX: T, positionY: F, positionZ: I, rotationX: M, rotationY: S, rotationZ: b, type: i, color1: a, color2: s, color3: m, reflection: C, uTime: D, uSpeed: L, uDensity: R, uStrength: w, uFrequency: x, uAmplitude: A, shader: o }) {
	let { vertex: q, fragment: E } = t$7[o][i], N = {
		colors: [
			a,
			s,
			m
		],
		uTime: D,
		uSpeed: L,
		uLoadingTime: 1,
		uNoiseDensity: R,
		uNoiseStrength: w,
		uFrequency: x,
		uAmplitude: A,
		uIntensity: .5,
		uLoop: t === "on" ? 1 : 0,
		uLoopDuration: n || 5
	}, U = o === "glass" ? {
		uColor1: s$7(a),
		uColor2: s$7(s),
		uColor3: s$7(m),
		uTransparency: .1,
		uRefraction: 1.5,
		uChromaticAberration: .1,
		uFresnelPower: 2,
		uReflectivity: .9,
		uWaveAmplitude: .02,
		uWaveFrequency: 5,
		uDistortion: .1,
		uFlowSpeed: .1,
		uFlowDirection: {
			x: 1,
			y: .5
		},
		uLiquidEffect: .5,
		uFoamIntensity: .3,
		envMapIntensity: 1
	} : {}, W = w$2(w$2({}, N), U);
	return (0, import_jsx_runtime.jsxs)("mesh", {
		name: "shadergradient-mesh",
		position: [
			T,
			F,
			I
		],
		rotation: y$4([
			M,
			S,
			b
		]),
		children: [(0, import_jsx_runtime.jsx)(n$16, { type: i }), (0, import_jsx_runtime.jsx)(A$2, {
			animate: d,
			range: h,
			rangeStart: y,
			rangeEnd: v,
			loop: t,
			loopDuration: n,
			reflection: C,
			shader: o,
			uniforms: W,
			vertexShader: q,
			fragmentShader: E,
			onInit: (G) => {
				o$2.performance("material (onInit)", G);
			}
		})]
	});
}
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-YRKK26G7.mjs
var r$3 = class {
	constructor() {
		this.enabled = !0, this.needsSwap = !0, this.clear = !1, this.renderToScreen = !1;
	}
	setSize() {}
	render() {
		console.error("THREE.Pass: .render() must be implemented in derived pass.");
	}
}, h$3 = new OrthographicCamera(-1, 1, 1, -1, 0, 1), t$6 = new BufferGeometry();
t$6.setAttribute("position", new Float32BufferAttribute([
	-1,
	3,
	0,
	-1,
	-1,
	0,
	3,
	-1,
	0
], 3));
t$6.setAttribute("uv", new Float32BufferAttribute([
	0,
	2,
	0,
	0,
	2,
	0
], 2));
var s$5 = class {
	constructor(e) {
		this._mesh = new Mesh(t$6, e);
	}
	dispose() {
		this._mesh.geometry.dispose();
	}
	render(e) {
		e.render(this._mesh, h$3);
	}
	get material() {
		return this._mesh.material;
	}
	set material(e) {
		this._mesh.material = e;
	}
};
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-QYDWPRFC.mjs
var s$4 = class extends r$3 {
	constructor(l, i, t, a, e) {
		super(), this.scene = l, this.camera = i, this.overrideMaterial = t, this.clearColor = a, this.clearAlpha = e !== void 0 ? e : 0, this.clear = !0, this.clearDepth = !1, this.needsSwap = !1, this._oldClearColor = new Color();
	}
	render(l, i, t) {
		let a = l.autoClear;
		l.autoClear = !1;
		let e, o;
		this.overrideMaterial !== void 0 && (o = this.scene.overrideMaterial, this.scene.overrideMaterial = this.overrideMaterial), this.clearColor && (l.getClearColor(this._oldClearColor), e = l.getClearAlpha(), l.setClearColor(this.clearColor, this.clearAlpha)), this.clearDepth && l.clearDepth(), l.setRenderTarget(this.renderToScreen ? null : t), this.clear && l.clear(l.autoClearColor, l.autoClearDepth, l.autoClearStencil), l.render(this.scene, this.camera), this.clearColor && l.setClearColor(this._oldClearColor, e), this.overrideMaterial !== void 0 && (this.scene.overrideMaterial = o), l.autoClear = a;
	}
};
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-66B4V7BU.mjs
var f$3 = class extends r$3 {
	constructor(t, i) {
		super(), this.textureID = i !== void 0 ? i : "tDiffuse", t instanceof ShaderMaterial ? (this.uniforms = t.uniforms, this.material = t) : t && (this.uniforms = UniformsUtils.clone(t.uniforms), this.material = new ShaderMaterial({
			defines: Object.assign({}, t.defines),
			uniforms: this.uniforms,
			vertexShader: t.vertexShader,
			fragmentShader: t.fragmentShader
		})), this.fsQuad = new s$5(this.material);
	}
	render(t, i, n) {
		this.uniforms[this.textureID] && (this.uniforms[this.textureID].value = n.texture), this.fsQuad.material = this.material, this.renderToScreen ? (t.setRenderTarget(null), this.fsQuad.render(t)) : (t.setRenderTarget(i), this.clear && t.clear(t.autoClearColor, t.autoClearDepth, t.autoClearStencil), this.fsQuad.render(t));
	}
};
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-LHZKBITZ.mjs
var e$2 = {
	uniforms: {
		tDiffuse: { value: null },
		opacity: { value: 1 }
	},
	vertexShader: `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,
	fragmentShader: `

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;

		}`
};
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-AYXY7L4E.mjs
var a$4 = class extends r$3 {
	constructor(s, f) {
		super(), this.scene = s, this.camera = f, this.clear = !0, this.needsSwap = !1, this.inverse = !1;
	}
	render(s, f, n) {
		let t = s.getContext(), e = s.state;
		e.buffers.color.setMask(!1), e.buffers.depth.setMask(!1), e.buffers.color.setLocked(!0), e.buffers.depth.setLocked(!0);
		let c, l;
		this.inverse ? (c = 0, l = 1) : (c = 1, l = 0), e.buffers.stencil.setTest(!0), e.buffers.stencil.setOp(t.REPLACE, t.REPLACE, t.REPLACE), e.buffers.stencil.setFunc(t.ALWAYS, c, 4294967295), e.buffers.stencil.setClear(l), e.buffers.stencil.setLocked(!0), s.setRenderTarget(n), this.clear && s.clear(), s.render(this.scene, this.camera), s.setRenderTarget(f), this.clear && s.clear(), s.render(this.scene, this.camera), e.buffers.color.setLocked(!1), e.buffers.depth.setLocked(!1), e.buffers.stencil.setLocked(!1), e.buffers.stencil.setFunc(t.EQUAL, 1, 4294967295), e.buffers.stencil.setOp(t.KEEP, t.KEEP, t.KEEP), e.buffers.stencil.setLocked(!0);
	}
}, i$3 = class extends r$3 {
	constructor() {
		super(), this.needsSwap = !1;
	}
	render(s) {
		s.state.buffers.stencil.setLocked(!1), s.state.buffers.stencil.setTest(!1);
	}
}, g$3 = class {
	constructor(e, t) {
		if (this.renderer = e, t === void 0) {
			let i = {
				minFilter: LinearFilter,
				magFilter: LinearFilter,
				format: RGBAFormat
			}, s = e.getSize(new Vector2());
			this._pixelRatio = e.getPixelRatio(), this._width = s.width, this._height = s.height, t = new WebGLRenderTarget(this._width * this._pixelRatio, this._height * this._pixelRatio, i), t.texture.name = "EffectComposer.rt1";
		} else this._pixelRatio = 1, this._width = t.width, this._height = t.height;
		this.renderTarget1 = t, this.renderTarget2 = t.clone(), this.renderTarget2.texture.name = "EffectComposer.rt2", this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2, this.renderToScreen = !0, this.passes = [], e$2 === void 0 && console.error("THREE.EffectComposer relies on CopyShader"), f$3 === void 0 && console.error("THREE.EffectComposer relies on ShaderPass"), this.copyPass = new f$3(e$2), this.clock = new Clock();
	}
	swapBuffers() {
		let e = this.readBuffer;
		this.readBuffer = this.writeBuffer, this.writeBuffer = e;
	}
	addPass(e) {
		this.passes.push(e), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
	}
	insertPass(e, t) {
		this.passes.splice(t, 0, e), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
	}
	removePass(e) {
		let t = this.passes.indexOf(e);
		t !== -1 && this.passes.splice(t, 1);
	}
	isLastEnabledPass(e) {
		for (let t = e + 1; t < this.passes.length; t++) if (this.passes[t].enabled) return !1;
		return !0;
	}
	render(e) {
		e === void 0 && (e = this.clock.getDelta());
		let t = this.renderer.getRenderTarget(), i = !1;
		for (let s = 0, h = this.passes.length; s < h; s++) {
			let r = this.passes[s];
			if (r.enabled !== !1) {
				if (r.renderToScreen = this.renderToScreen && this.isLastEnabledPass(s), r.render(this.renderer, this.writeBuffer, this.readBuffer, e, i), r.needsSwap) {
					if (i) {
						let l = this.renderer.getContext(), c = this.renderer.state.buffers.stencil;
						c.setFunc(l.NOTEQUAL, 1, 4294967295), this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, e), c.setFunc(l.EQUAL, 1, 4294967295);
					}
					this.swapBuffers();
				}
				a$4 !== void 0 && (r instanceof a$4 ? i = !0 : r instanceof i$3 && (i = !1));
			}
		}
		this.renderer.setRenderTarget(t);
	}
	reset(e) {
		if (e === void 0) {
			let t = this.renderer.getSize(new Vector2());
			this._pixelRatio = this.renderer.getPixelRatio(), this._width = t.width, this._height = t.height, e = this.renderTarget1.clone(), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
		}
		this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.renderTarget1 = e, this.renderTarget2 = e.clone(), this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2;
	}
	setSize(e, t) {
		this._width = e, this._height = t;
		let i = this._width * this._pixelRatio, s = this._height * this._pixelRatio;
		this.renderTarget1.setSize(i, s), this.renderTarget2.setSize(i, s);
		for (let h = 0; h < this.passes.length; h++) this.passes[h].setSize(i, s);
	}
	setPixelRatio(e) {
		this._pixelRatio = e, this.setSize(this._width, this._height);
	}
};
new OrthographicCamera(-1, 1, 1, -1, 0, 1);
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-WASVT75G.mjs
var f$2 = new BufferGeometry();
f$2.setAttribute("position", new Float32BufferAttribute([
	-1,
	3,
	0,
	-1,
	-1,
	0,
	3,
	-1,
	0
], 3));
f$2.setAttribute("uv", new Float32BufferAttribute([
	0,
	2,
	0,
	0,
	2,
	0
], 2));
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-VJZMGGI7.mjs
var e$1 = {
	uniforms: {
		tDiffuse: { value: null },
		shape: { value: 1 },
		radius: { value: 2 },
		rotateR: { value: Math.PI / 12 * 1 },
		rotateG: { value: Math.PI / 12 * 2 },
		rotateB: { value: Math.PI / 12 * 3 },
		scatter: { value: 1 },
		width: { value: 20 },
		height: { value: 20 },
		blending: { value: 1 },
		blendingMode: { value: 1 },
		greyscale: { value: !1 },
		disable: { value: !1 }
	},
	vertexShader: `

		varying vec2 vUV;
		varying vec3 vPosition;

		void main() {

			vUV = uv;
			vPosition = position;

			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

		}`,
	fragmentShader: `

		#define SQRT2_MINUS_ONE 0.41421356
		#define SQRT2_HALF_MINUS_ONE 0.20710678
		#define PI2 6.28318531
		#define SHAPE_DOT 1
		#define SHAPE_ELLIPSE 2
		#define SHAPE_LINE 3
		#define SHAPE_SQUARE 4
		#define BLENDING_LINEAR 1
		#define BLENDING_MULTIPLY 2
		#define BLENDING_ADD 3
		#define BLENDING_LIGHTER 4
		#define BLENDING_DARKER 5
		uniform sampler2D tDiffuse;
		uniform float radius;
		uniform float rotateR;
		uniform float rotateG;
		uniform float rotateB;
		uniform float scatter;
		uniform float width;
		uniform float height;
		uniform int shape;
		uniform bool disable;
		uniform float blending;
		uniform int blendingMode;
		varying vec2 vUV;
		varying vec3 vPosition;
		uniform bool greyscale;
		const int samples = 8;

		float blend( float a, float b, float t ) {

		// linear blend
			return a * ( 1.0 - t ) + b * t;

		}

		float hypot( float x, float y ) {

		// vector magnitude
			return sqrt( x * x + y * y );

		}

		float rand( vec2 seed ){

		// get pseudo-random number
			return fract( sin( dot( seed.xy, vec2( 12.9898, 78.233 ) ) ) * 43758.5453 );

		}

		float distanceToDotRadius( float channel, vec2 coord, vec2 normal, vec2 p, float angle, float rad_max ) {

		// apply shape-specific transforms
			float dist = hypot( coord.x - p.x, coord.y - p.y );
			float rad = channel;

			if ( shape == SHAPE_DOT ) {

				rad = pow( abs( rad ), 1.125 ) * rad_max;

			} else if ( shape == SHAPE_ELLIPSE ) {

				rad = pow( abs( rad ), 1.125 ) * rad_max;

				if ( dist != 0.0 ) {
					float dot_p = abs( ( p.x - coord.x ) / dist * normal.x + ( p.y - coord.y ) / dist * normal.y );
					dist = ( dist * ( 1.0 - SQRT2_HALF_MINUS_ONE ) ) + dot_p * dist * SQRT2_MINUS_ONE;
				}

			} else if ( shape == SHAPE_LINE ) {

				rad = pow( abs( rad ), 1.5) * rad_max;
				float dot_p = ( p.x - coord.x ) * normal.x + ( p.y - coord.y ) * normal.y;
				dist = hypot( normal.x * dot_p, normal.y * dot_p );

			} else if ( shape == SHAPE_SQUARE ) {

				float theta = atan( p.y - coord.y, p.x - coord.x ) - angle;
				float sin_t = abs( sin( theta ) );
				float cos_t = abs( cos( theta ) );
				rad = pow( abs( rad ), 1.4 );
				rad = rad_max * ( rad + ( ( sin_t > cos_t ) ? rad - sin_t * rad : rad - cos_t * rad ) );

			}

			return rad - dist;

		}

		struct Cell {

		// grid sample positions
			vec2 normal;
			vec2 p1;
			vec2 p2;
			vec2 p3;
			vec2 p4;
			float samp2;
			float samp1;
			float samp3;
			float samp4;

		};

		vec4 getSample( vec2 point ) {

		// multi-sampled point
			vec4 tex = texture2D( tDiffuse, vec2( point.x / width, point.y / height ) );
			float base = rand( vec2( floor( point.x ), floor( point.y ) ) ) * PI2;
			float step = PI2 / float( samples );
			// float dist = radius * 0.66;
			float dist = radius * 0.0;

			for ( int i = 0; i < samples; ++i ) {

				float r = base + step * float( i );
				vec2 coord = point + vec2( cos( r ) * dist, sin( r ) * dist );
				tex += texture2D( tDiffuse, vec2( coord.x / width, coord.y / height ) );

			}

			tex /= float( samples ) + 1.0;
			return tex;

		}

		float getDotColour( Cell c, vec2 p, int channel, float angle, float aa ) {

		// get colour for given point
			float dist_c_1, dist_c_2, dist_c_3, dist_c_4, res;

			if ( channel == 0 ) {

				c.samp1 = getSample( c.p1 ).r;
				c.samp2 = getSample( c.p2 ).r;
				c.samp3 = getSample( c.p3 ).r;
				c.samp4 = getSample( c.p4 ).r;

			} else if (channel == 1) {

				c.samp1 = getSample( c.p1 ).g;
				c.samp2 = getSample( c.p2 ).g;
				c.samp3 = getSample( c.p3 ).g;
				c.samp4 = getSample( c.p4 ).g;

			} else {

				c.samp1 = getSample( c.p1 ).b;
				c.samp3 = getSample( c.p3 ).b;
				c.samp2 = getSample( c.p2 ).b;
				c.samp4 = getSample( c.p4 ).b;

			}

			dist_c_1 = distanceToDotRadius( c.samp1, c.p1, c.normal, p, angle, radius );
			dist_c_2 = distanceToDotRadius( c.samp2, c.p2, c.normal, p, angle, radius );
			dist_c_3 = distanceToDotRadius( c.samp3, c.p3, c.normal, p, angle, radius );
			dist_c_4 = distanceToDotRadius( c.samp4, c.p4, c.normal, p, angle, radius );
			res = ( dist_c_1 > 0.0 ) ? clamp( dist_c_1 / aa, 0.0, 1.0 ) : 0.0;
			// res = 0.0;
			res += ( dist_c_2 > 0.0 ) ? clamp( dist_c_2 / aa, 0.0, 1.0 ) : 0.0;
			res += ( dist_c_3 > 0.0 ) ? clamp( dist_c_3 / aa, 0.0, 1.0 ) : 0.0;
			res += ( dist_c_4 > 0.0 ) ? clamp( dist_c_4 / aa, 0.0, 1.0 ) : 0.0;
			res = clamp( res, 0.0, 1.0 );

			return res;
			// return 2

		}

		Cell getReferenceCell( vec2 p, vec2 origin, float grid_angle, float step ) {

		// get containing cell
			Cell c;

		// calc grid
			vec2 n = vec2( cos( grid_angle ), sin( grid_angle ) );
			float threshold = step * 0.5;
			float dot_normal = n.x * ( p.x - origin.x ) + n.y * ( p.y - origin.y );
			float dot_line = -n.y * ( p.x - origin.x ) + n.x * ( p.y - origin.y );
			vec2 offset = vec2( n.x * dot_normal, n.y * dot_normal );
			float offset_normal = mod( hypot( offset.x, offset.y ), step );
			float normal_dir = ( dot_normal < 0.0 ) ? 1.0 : -1.0;
			float normal_scale = ( ( offset_normal < threshold ) ? -offset_normal : step - offset_normal ) * normal_dir;
			float offset_line = mod( hypot( ( p.x - offset.x ) - origin.x, ( p.y - offset.y ) - origin.y ), step );
			float line_dir = ( dot_line < 0.0 ) ? 1.0 : -1.0;
			float line_scale = ( ( offset_line < threshold ) ? -offset_line : step - offset_line ) * line_dir;

		// get closest corner
			c.normal = n;
			c.p1.x = p.x - n.x * normal_scale + n.y * line_scale;
			c.p1.y = p.y - n.y * normal_scale - n.x * line_scale;

		// scatter
			if ( scatter != 0.0 ) {

				float off_mag = scatter * threshold * 0.5;
				float off_angle = rand( vec2( floor( c.p1.x ), floor( c.p1.y ) ) ) * PI2;
				c.p1.x += cos( off_angle ) * off_mag;
				c.p1.y += sin( off_angle ) * off_mag;

			}

		// find corners
			float normal_step = normal_dir * ( ( offset_normal < threshold ) ? step : -step );
			float line_step = line_dir * ( ( offset_line < threshold ) ? step : -step );
			c.p2.x = c.p1.x - n.x * normal_step;
			c.p2.y = c.p1.y - n.y * normal_step;
			c.p3.x = c.p1.x + n.y * line_step;
			c.p3.y = c.p1.y - n.x * line_step;
			c.p4.x = c.p1.x - n.x * normal_step + n.y * line_step;
			c.p4.y = c.p1.y - n.y * normal_step - n.x * line_step;

			return c;

		}

		float blendColour( float a, float b, float t ) {

		// blend colours
			if ( blendingMode == BLENDING_LINEAR ) {
				return blend( a, b, 1.0 - t );
			} else if ( blendingMode == BLENDING_ADD ) {
				return blend( a, min( 1.0, a + b ), t );
			} else if ( blendingMode == BLENDING_MULTIPLY ) {
				return blend( a, max( 0.0, a * b ), t );
			} else if ( blendingMode == BLENDING_LIGHTER ) {
				return blend( a, max( a, b ), t );
			} else if ( blendingMode == BLENDING_DARKER ) {
				return blend( a, min( a, b ), t );
			} else {
				return blend( a, b, 1.0 - t );
			}

		}

		void main() {

			if ( ! disable ) {

		// setup
				vec2 p = vec2( vUV.x * width, vUV.y * height ) - vec2(vPosition.x, vPosition.y) * 3.0; // - position values to remove black borders.
				vec2 origin = vec2( 0, 0 );
				float aa = ( radius < 2.5 ) ? radius * 0.5 : 1.25;
				// float aa = 0.0;

		// get channel samples
				Cell cell_r = getReferenceCell( p, origin, rotateR, radius );
				Cell cell_g = getReferenceCell( p, origin, rotateG, radius );
				Cell cell_b = getReferenceCell( p, origin, rotateB, radius );
				float r = getDotColour( cell_r, p, 0, rotateR, aa );
				float g = getDotColour( cell_g, p, 1, rotateG, aa );
				float b = getDotColour( cell_b, p, 2, rotateB, aa );

		// blend with original
				vec4 colour = texture2D( tDiffuse, vUV );
				
				// add masking before blendColour
				if (colour.r == 0.0) {
					r = 0.0;
				} else {
					r = blendColour( r, colour.r, blending );
				}

				if (colour.g == 0.0) {
					g = 0.0;
				} else {
					g = blendColour( g, colour.g, blending );
				}

				if (colour.b == 0.0) {
					b = 0.0;
				} else {
					b = blendColour( b, colour.b, blending );
				}
				
				
				

				if ( greyscale ) {
					r = g = b = (r + b + g) / 3.0;
				}

				// add alpha channel to each r, g, b colors
				vec4 vR;
				vec4 vG;
				vec4 vB;
	
				// apply transparent to outside of mesh
				if (r == 0.0 && colour.r == 0.0) {
					vR = vec4( 0, 0, 0, 0 );
				} else {
					vR = vec4( r, 0, 0, 1 );
				}
	
				if (g == 0.0 && colour.g == 0.0) {
					vG = vec4( 0, 0, 0, 0 );
				} else {
					vG = vec4( 0, g, 0, 1 );
				}
	
				if (b == 0.0 && colour.b == 0.0) {
					vB = vec4( 0, 0, 0, 0 );
				} else {
					vB = vec4( 0, 0, b, 1 );
				}

				// gl_FragColor = vec4( r, g, b, 1.0 );
				gl_FragColor = vR + vG + vB;

			} else {

				gl_FragColor = texture2D( tDiffuse, vUV );

			}

		}`
};
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-RE2GTNAW.mjs
var r$2 = class {
	constructor() {
		this.enabled = !0, this.needsSwap = !0, this.clear = !1, this.renderToScreen = !1;
	}
	setSize() {}
	render() {
		console.error("THREE.Pass: .render() must be implemented in derived pass.");
	}
}, h$2 = new OrthographicCamera(-1, 1, 1, -1, 0, 1), t$5 = new BufferGeometry();
t$5.setAttribute("position", new Float32BufferAttribute([
	-1,
	3,
	0,
	-1,
	-1,
	0,
	3,
	-1,
	0
], 3));
t$5.setAttribute("uv", new Float32BufferAttribute([
	0,
	2,
	0,
	0,
	2,
	0
], 2));
var s$3 = class {
	constructor(e) {
		this._mesh = new Mesh(t$5, e);
	}
	dispose() {
		this._mesh.geometry.dispose();
	}
	render(e) {
		e.render(this._mesh, h$2);
	}
	get material() {
		return this._mesh.material;
	}
	set material(e) {
		this._mesh.material = e;
	}
};
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-E7V5LYA3.mjs
var E$2 = {
	SKIP: 0,
	ADD: 1,
	ALPHA: 2,
	AVERAGE: 3,
	COLOR_BURN: 4,
	COLOR_DODGE: 5,
	DARKEN: 6,
	DIFFERENCE: 7,
	EXCLUSION: 8,
	LIGHTEN: 9,
	MULTIPLY: 10,
	DIVIDE: 11,
	NEGATION: 12,
	NORMAL: 13,
	OVERLAY: 14,
	REFLECT: 15,
	SCREEN: 16,
	SOFT_LIGHT: 17,
	SUBTRACT: 18
};
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-TJDK6R5K.mjs
var z = new Map([
	[E$2.SKIP, null],
	[E$2.ADD, `vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

	return min(x + y, 1.0) * opacity + x * (1.0 - opacity);

}
`],
	[E$2.ALPHA, `vec3 blend(const in vec3 x, const in vec3 y, const in float opacity) {

	return y * opacity + x * (1.0 - opacity);

}

vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

	float a = min(y.a, opacity);

	return vec4(blend(x.rgb, y.rgb, a), max(x.a, a));

}
`],
	[E$2.AVERAGE, `vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

	return (x + y) * 0.5 * opacity + x * (1.0 - opacity);

}
`],
	[E$2.COLOR_BURN, `float blend(const in float x, const in float y) {

	return (y == 0.0) ? y : max(1.0 - (1.0 - x) / y, 0.0);

}

vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

	vec4 z = vec4(
		blend(x.r, y.r),
		blend(x.g, y.g),
		blend(x.b, y.b),
		blend(x.a, y.a)
	);

	return z * opacity + x * (1.0 - opacity);

}
`],
	[E$2.COLOR_DODGE, `float blend(const in float x, const in float y) {

	return (y == 1.0) ? y : min(x / (1.0 - y), 1.0);

}

vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

	vec4 z = vec4(
		blend(x.r, y.r),
		blend(x.g, y.g),
		blend(x.b, y.b),
		blend(x.a, y.a)
	);

	return z * opacity + x * (1.0 - opacity);

}
`],
	[E$2.DARKEN, `vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

	return min(x, y) * opacity + x * (1.0 - opacity);

}
`],
	[E$2.DIFFERENCE, `vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

	return abs(x - y) * opacity + x * (1.0 - opacity);

}
`],
	[E$2.EXCLUSION, `vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

	return (x + y - 2.0 * x * y) * opacity + x * (1.0 - opacity);

}
`],
	[E$2.LIGHTEN, `vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

	return max(x, y) * opacity + x * (1.0 - opacity);

}
`],
	[E$2.MULTIPLY, `vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

	return x * y * opacity + x * (1.0 - opacity);

}
`],
	[E$2.DIVIDE, `float blend(const in float x, const in float y) {

	return (y > 0.0) ? min(x / y, 1.0) : 1.0;

}

vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

	vec4 z = vec4(
		blend(x.r, y.r),
		blend(x.g, y.g),
		blend(x.b, y.b),
		blend(x.a, y.a)
	);

	return z * opacity + x * (1.0 - opacity);

}
`],
	[E$2.NEGATION, `vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

	return (1.0 - abs(1.0 - x - y)) * opacity + x * (1.0 - opacity);

}
`],
	[E$2.NORMAL, `vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

	return y * opacity + x * (1.0 - opacity);

}
`],
	[E$2.OVERLAY, `float blend(const in float x, const in float y) {

	return (x < 0.5) ? (2.0 * x * y) : (1.0 - 2.0 * (1.0 - x) * (1.0 - y));

}

vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

	vec4 z = vec4(
		blend(x.r, y.r),
		blend(x.g, y.g),
		blend(x.b, y.b),
		blend(x.a, y.a)
	);

	return z * opacity + x * (1.0 - opacity);

}
`],
	[E$2.REFLECT, `float blend(const in float x, const in float y) {

	return (y == 1.0) ? y : min(x * x / (1.0 - y), 1.0);

}

vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

	vec4 z = vec4(
		blend(x.r, y.r),
		blend(x.g, y.g),
		blend(x.b, y.b),
		blend(x.a, y.a)
	);

	return z * opacity + x * (1.0 - opacity);

}
`],
	[E$2.SCREEN, `vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

	return (1.0 - (1.0 - x) * (1.0 - y)) * opacity + x * (1.0 - opacity);

}
`],
	[E$2.SOFT_LIGHT, `float blend(const in float x, const in float y) {

	return (y < 0.5) ?
		(2.0 * x * y + x * x * (1.0 - 2.0 * y)) :
		(sqrt(x) * (2.0 * y - 1.0) + 2.0 * x * (1.0 - y));

}

vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

	vec4 z = vec4(
		blend(x.r, y.r),
		blend(x.g, y.g),
		blend(x.b, y.b),
		blend(x.a, y.a)
	);

	return z * opacity + x * (1.0 - opacity);

}
`],
	[E$2.SUBTRACT, `vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

	return max(x + y - 1.0, 0.0) * opacity + x * (1.0 - opacity);

}
`]
]), g$2 = class extends EventDispatcher {
	constructor(t, B = 1) {
		super(), this.blendFunction = t, this.opacity = new Uniform(B);
	}
	getBlendFunction() {
		return this.blendFunction;
	}
	setBlendFunction(t) {
		this.blendFunction = t, this.dispatchEvent({ type: "change" });
	}
	getShaderCode() {
		return z.get(this.blendFunction);
	}
};
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-DG5TTWXJ.mjs
var h$1 = !0, d$2 = class extends r$2 {
	constructor(e, r, i) {
		super(), e$1 === void 0 && console.error("THREE.HalftonePass requires HalftoneShader"), this.uniforms = UniformsUtils.clone(e$1.uniforms), this.material = new ShaderMaterial({
			uniforms: this.uniforms,
			fragmentShader: e$1.fragmentShader,
			vertexShader: e$1.vertexShader
		}), h$1 && (this.uniforms.width.value = e, this.uniforms.height.value = r), this.uniforms.disable.value = i.disable, this.fsQuad = new s$3(this.material), this.blendMode = new g$2(E$2.SCREEN), this.extensions = null;
	}
	render(e, r, i) {
		this.material.uniforms.tDiffuse.value = i.texture, this.renderToScreen ? (e.setRenderTarget(null), this.fsQuad.render(e)) : (e.setRenderTarget(r), this.clear && e.clear(), this.fsQuad.render(e));
	}
	setSize(e, r) {
		h$1 && (this.uniforms.width.value = e, this.uniforms.height.value = r);
	}
	initialize(e, r, i) {}
	addEventListener() {}
	getAttributes() {
		return this.attributes;
	}
	getFragmentShader() {
		return e$1.fragmentShader;
	}
	getVertexShader() {
		return e$1.vertexShader;
	}
	update(e, r, i) {}
};
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-SOFAB2VP.mjs
function k$2({ disable: u = !1 }) {
	let { gl: c, scene: m, camera: d, size: t } = useThree(), n = (0, import_react.useRef)(null), o = (0, import_react.useRef)(null), p = (0, import_react.useMemo)(() => ({
		shape: 1,
		radius: 2,
		rotateR: Math.PI / 12,
		rotateB: Math.PI / 12 * 2,
		rotateG: Math.PI / 12 * 3,
		scatter: 1,
		blending: 1,
		blendingMode: 1,
		greyscale: !1
	}), []);
	return (0, import_react.useEffect)(() => {
		let e = new g$3(c), r = new s$4(m, d), s = new d$2(t.width, t.height, x$3(w$2({}, p), { disable: u }));
		return e.addPass(r), e.addPass(s), n.current = e, o.current = s, () => {
			var h, P, a, g, f, w, i, C;
			(h = r.dispose) == null || h.call(r), (P = s.fsQuad) != null && P.dispose && s.fsQuad.dispose(), (g = (a = s.material) == null ? void 0 : a.dispose) == null || g.call(a), (w = (f = e.renderTarget1) == null ? void 0 : f.dispose) == null || w.call(f), (C = (i = e.renderTarget2) == null ? void 0 : i.dispose) == null || C.call(i), n.current = null, o.current = null;
		};
	}, [
		d,
		c,
		p,
		m
	]), (0, import_react.useEffect)(() => {
		var r;
		let e = n.current;
		e && (e.setSize(t.width, t.height), (r = o.current) == null || r.setSize(t.width, t.height));
	}, [t.height, t.width]), (0, import_react.useEffect)(() => {
		var e, r;
		(r = (e = o.current) == null ? void 0 : e.uniforms) != null && r.disable && (o.current.uniforms.disable.value = u);
	}, [u]), useFrame((e, r) => {
		let s = n.current;
		s && (c.autoClear = !0, s.render(r));
	}, 1), (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {});
}
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-CPUZJ7YV.mjs
init_performance();
var r$1 = (e, o, t) => ({
	dpr: e,
	camera: { fov: o },
	linear: !0,
	flat: !0,
	gl: {
		preserveDrawingBuffer: t == null ? void 0 : t.preserveDrawingBuffer,
		powerPreference: t == null ? void 0 : t.powerPreference
	}
}), p$2 = {
	zoom: 1,
	distance: 14
}, c = {
	zoom: 5,
	distance: 14
};
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-YIJC6OD2.mjs
function v$4({ type: u, cAzimuthAngle: z, cPolarAngle: y, cDistance: h, cameraZoom: R, zoomOut: S, enableTransition: f = !0 }) {
	let e = (0, import_react.useRef)();
	return useFrame((m, F) => e.current.update(F)), (0, import_react.useEffect)(() => {
		e.current?.rotateTo(R$2(z), R$2(y), f);
	}, [
		e,
		z,
		y,
		f
	]), (0, import_react.useEffect)(() => {
		let m = e.current;
		S ? u === "sphere" ? (m?.dollyTo(c.distance, f), m?.zoomTo(c.zoom, f)) : (m?.dollyTo(p$2.distance, f), m?.zoomTo(p$2.zoom, f)) : u === "sphere" ? (m?.zoomTo(R, f), m?.dollyTo(14, f)) : (m?.dollyTo(h, f), m?.zoomTo(1, f));
	}, [
		e,
		S,
		u,
		R,
		h,
		f
	]), e;
}
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-6DNZ3I5B.mjs
var P$2 = {
	LEFT: 1,
	RIGHT: 2,
	MIDDLE: 4
}, i$1 = Object.freeze({
	NONE: 0,
	ROTATE: 1,
	TRUCK: 2,
	OFFSET: 4,
	DOLLY: 8,
	ZOOM: 16,
	TOUCH_ROTATE: 32,
	TOUCH_TRUCK: 64,
	TOUCH_OFFSET: 128,
	TOUCH_DOLLY: 256,
	TOUCH_ZOOM: 512,
	TOUCH_DOLLY_TRUCK: 1024,
	TOUCH_DOLLY_OFFSET: 2048,
	TOUCH_DOLLY_ROTATE: 4096,
	TOUCH_ZOOM_TRUCK: 8192,
	TOUCH_ZOOM_OFFSET: 16384,
	TOUCH_ZOOM_ROTATE: 32768
}), N$3 = {
	NONE: 0,
	IN: 1,
	OUT: -1
};
function k$1(u) {
	return u.isPerspectiveCamera;
}
function H$2(u) {
	return u.isOrthographicCamera;
}
var Z$2 = Math.PI * 2, pt$1 = Math.PI / 2, Ct = 1e-5, K$1 = Math.PI / 180;
function M$2(u, t, e) {
	return Math.max(t, Math.min(e, u));
}
function D$1(u, t = Ct) {
	return Math.abs(u) < t;
}
function x$1(u, t, e = Ct) {
	return D$1(u - t, e);
}
function ut(u, t) {
	return Math.round(u / t) * t;
}
function X(u) {
	return isFinite(u) ? u : u < 0 ? -Number.MAX_VALUE : Number.MAX_VALUE;
}
function Q(u) {
	return Math.abs(u) < Number.MAX_VALUE ? u : u * Infinity;
}
function J$1(u, t, e, s, n = Infinity, r) {
	s = Math.max(1e-4, s);
	let a = 2 / s, l = a * r, m = 1 / (1 + l + .48 * l * l + .235 * l * l * l), h = u - t, v = t, g = n * s;
	h = M$2(h, -g, g), t = u - h;
	let C = (e.value + a * h) * r;
	e.value = (e.value - a * C) * m;
	let f = t + (h + C) * m;
	return v - u > 0 == f > v && (f = v, e.value = (f - v) / r), f;
}
function ft(u, t, e, s, n = Infinity, r, a) {
	s = Math.max(1e-4, s);
	let l = 2 / s, m = l * r, h = 1 / (1 + m + .48 * m * m + .235 * m * m * m), v = t.x, g = t.y, C = t.z, f = u.x - v, L = u.y - g, T = u.z - C, A = v, o = g, c = C, d = n * s, _ = d * d, E = f * f + L * L + T * T;
	if (E > _) {
		let st = Math.sqrt(E);
		f = f / st * d, L = L / st * d, T = T / st * d;
	}
	v = u.x - f, g = u.y - L, C = u.z - T;
	let O = (e.x + l * f) * r, S = (e.y + l * L) * r, z = (e.z + l * T) * r;
	e.x = (e.x - l * O) * h, e.y = (e.y - l * S) * h, e.z = (e.z - l * z) * h, a.x = v + (f + O) * h, a.y = g + (L + S) * h, a.z = C + (T + z) * h;
	let j = A - u.x, W = o - u.y, vt = c - u.z, xt = a.x - A, Dt = a.y - o, Lt = a.z - c;
	return j * xt + W * Dt + vt * Lt > 0 && (a.x = A, a.y = o, a.z = c, e.x = (a.x - A) / r, e.y = (a.y - o) / r, e.z = (a.z - c) / r), a;
}
function ot(u, t) {
	t.set(0, 0), u.forEach((e) => {
		t.x += e.clientX, t.y += e.clientY;
	}), t.x /= u.length, t.y /= u.length;
}
function rt(u, t) {
	return H$2(u) ? (console.warn(`${t} is not supported in OrthographicCamera`), !0) : !1;
}
var _t = class {
	constructor() {
		this._listeners = {};
	}
	addEventListener(t, e) {
		let s = this._listeners;
		s[t] === void 0 && (s[t] = []), s[t].indexOf(e) === -1 && s[t].push(e);
	}
	hasEventListener(t, e) {
		let s = this._listeners;
		return s[t] !== void 0 && s[t].indexOf(e) !== -1;
	}
	removeEventListener(t, e) {
		let n = this._listeners[t];
		if (n !== void 0) {
			let r = n.indexOf(e);
			r !== -1 && n.splice(r, 1);
		}
	}
	removeAllEventListeners(t) {
		if (!t) {
			this._listeners = {};
			return;
		}
		Array.isArray(this._listeners[t]) && (this._listeners[t].length = 0);
	}
	dispatchEvent(t) {
		let s = this._listeners[t.type];
		if (s !== void 0) {
			t.target = this;
			let n = s.slice(0);
			for (let r = 0, a = n.length; r < a; r++) n[r].call(this, t);
		}
	}
}, nt, At = "2.9.0", $$2 = 1 / 8, St = /Mac/.test((nt = globalThis == null ? void 0 : globalThis.navigator) === null || nt === void 0 ? void 0 : nt.platform), p$1, gt, tt, at, F$1, y$3, U$1, V$3, q$1, I$3, b$3, Y$1, Ot, yt, R$1, G$1, B$2, Tt, ht, Et, lt$1, ct, et, w$1 = class u extends _t {
	static install(t) {
		p$1 = t.THREE, gt = Object.freeze(new p$1.Vector3(0, 0, 0)), tt = Object.freeze(new p$1.Vector3(0, 1, 0)), at = Object.freeze(new p$1.Vector3(0, 0, 1)), F$1 = new p$1.Vector2(), y$3 = new p$1.Vector3(), U$1 = new p$1.Vector3(), V$3 = new p$1.Vector3(), q$1 = new p$1.Vector3(), I$3 = new p$1.Vector3(), b$3 = new p$1.Vector3(), Y$1 = new p$1.Vector3(), Ot = new p$1.Vector3(), yt = new p$1.Vector3(), R$1 = new p$1.Spherical(), G$1 = new p$1.Spherical(), B$2 = new p$1.Box3(), Tt = new p$1.Box3(), ht = new p$1.Sphere(), Et = new p$1.Quaternion(), lt$1 = new p$1.Quaternion(), ct = new p$1.Matrix4(), et = new p$1.Raycaster();
	}
	static get ACTION() {
		return i$1;
	}
	constructor(t, e) {
		super(), this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -Infinity, this.maxAzimuthAngle = Infinity, this.minDistance = Number.EPSILON, this.maxDistance = Infinity, this.infinityDolly = !1, this.minZoom = .01, this.maxZoom = Infinity, this.smoothTime = .25, this.draggingSmoothTime = .125, this.maxSpeed = Infinity, this.azimuthRotateSpeed = 1, this.polarRotateSpeed = 1, this.dollySpeed = 1, this.dollyDragInverted = !1, this.truckSpeed = 2, this.dollyToCursor = !1, this.dragToOffset = !1, this.verticalDragToForward = !1, this.boundaryFriction = 0, this.restThreshold = .01, this.colliderMeshes = [], this.cancel = () => {}, this._enabled = !0, this._state = i$1.NONE, this._viewport = null, this._changedDolly = 0, this._changedZoom = 0, this._hasRested = !0, this._boundaryEnclosesCamera = !1, this._needsUpdate = !0, this._updatedLastTime = !1, this._elementRect = new DOMRect(), this._isDragging = !1, this._dragNeedsUpdate = !0, this._activePointers = [], this._lockedPointer = null, this._interactiveArea = new DOMRect(0, 0, 1, 1), this._isUserControllingRotate = !1, this._isUserControllingDolly = !1, this._isUserControllingTruck = !1, this._isUserControllingOffset = !1, this._isUserControllingZoom = !1, this._lastDollyDirection = N$3.NONE, this._thetaVelocity = { value: 0 }, this._phiVelocity = { value: 0 }, this._radiusVelocity = { value: 0 }, this._targetVelocity = new p$1.Vector3(), this._focalOffsetVelocity = new p$1.Vector3(), this._zoomVelocity = { value: 0 }, this._truckInternal = (o, c, d) => {
			let _, E;
			if (k$1(this._camera)) {
				let O = y$3.copy(this._camera.position).sub(this._target), S = this._camera.getEffectiveFOV() * K$1, z = O.length() * Math.tan(S * .5);
				_ = this.truckSpeed * o * z / this._elementRect.height, E = this.truckSpeed * c * z / this._elementRect.height;
			} else if (H$2(this._camera)) {
				let O = this._camera;
				_ = o * (O.right - O.left) / O.zoom / this._elementRect.width, E = c * (O.top - O.bottom) / O.zoom / this._elementRect.height;
			} else return;
			this.verticalDragToForward ? (d ? this.setFocalOffset(this._focalOffsetEnd.x + _, this._focalOffsetEnd.y, this._focalOffsetEnd.z, !0) : this.truck(_, 0, !0), this.forward(-E, !0)) : d ? this.setFocalOffset(this._focalOffsetEnd.x + _, this._focalOffsetEnd.y + E, this._focalOffsetEnd.z, !0) : this.truck(_, E, !0);
		}, this._rotateInternal = (o, c) => {
			let d = Z$2 * this.azimuthRotateSpeed * o / this._elementRect.height, _ = Z$2 * this.polarRotateSpeed * c / this._elementRect.height;
			this.rotate(d, _, !0);
		}, this._dollyInternal = (o, c, d) => {
			let _ = Math.pow(.95, -o * this.dollySpeed), E = this._sphericalEnd.radius, O = this._sphericalEnd.radius * _, S = M$2(O, this.minDistance, this.maxDistance), z = S - O;
			this.infinityDolly && this.dollyToCursor ? this._dollyToNoClamp(O, !0) : this.infinityDolly && !this.dollyToCursor ? (this.dollyInFixed(z, !0), this._dollyToNoClamp(S, !0)) : this._dollyToNoClamp(S, !0), this.dollyToCursor && (this._changedDolly += (this.infinityDolly ? O : S) - E, this._dollyControlCoord.set(c, d)), this._lastDollyDirection = Math.sign(-o);
		}, this._zoomInternal = (o, c, d) => {
			let _ = Math.pow(.95, o * this.dollySpeed), E = this._zoom, O = this._zoom * _;
			this.zoomTo(O, !0), this.dollyToCursor && (this._changedZoom += O - E, this._dollyControlCoord.set(c, d));
		}, typeof p$1 == "undefined" && console.error("camera-controls: `THREE` is undefined. You must first run `CameraControls.install( { THREE: THREE } )`. Check the docs for further information."), this._camera = t, this._yAxisUpSpace = new p$1.Quaternion().setFromUnitVectors(this._camera.up, tt), this._yAxisUpSpaceInverse = this._yAxisUpSpace.clone().invert(), this._state = i$1.NONE, this._target = new p$1.Vector3(), this._targetEnd = this._target.clone(), this._focalOffset = new p$1.Vector3(), this._focalOffsetEnd = this._focalOffset.clone(), this._spherical = new p$1.Spherical().setFromVector3(y$3.copy(this._camera.position).applyQuaternion(this._yAxisUpSpace)), this._sphericalEnd = this._spherical.clone(), this._lastDistance = this._spherical.radius, this._zoom = this._camera.zoom, this._zoomEnd = this._zoom, this._lastZoom = this._zoom, this._nearPlaneCorners = [
			new p$1.Vector3(),
			new p$1.Vector3(),
			new p$1.Vector3(),
			new p$1.Vector3()
		], this._updateNearPlaneCorners(), this._boundary = new p$1.Box3(new p$1.Vector3(-Infinity, -Infinity, -Infinity), new p$1.Vector3(Infinity, Infinity, Infinity)), this._cameraUp0 = this._camera.up.clone(), this._target0 = this._target.clone(), this._position0 = this._camera.position.clone(), this._zoom0 = this._zoom, this._focalOffset0 = this._focalOffset.clone(), this._dollyControlCoord = new p$1.Vector2(), this.mouseButtons = {
			left: i$1.ROTATE,
			middle: i$1.DOLLY,
			right: i$1.TRUCK,
			wheel: k$1(this._camera) ? i$1.DOLLY : H$2(this._camera) ? i$1.ZOOM : i$1.NONE
		}, this.touches = {
			one: i$1.TOUCH_ROTATE,
			two: k$1(this._camera) ? i$1.TOUCH_DOLLY_TRUCK : H$2(this._camera) ? i$1.TOUCH_ZOOM_TRUCK : i$1.NONE,
			three: i$1.TOUCH_TRUCK
		};
		let s = new p$1.Vector2(), n = new p$1.Vector2(), r = new p$1.Vector2(), a = (o) => {
			if (!this._enabled || !this._domElement) return;
			if (this._interactiveArea.left !== 0 || this._interactiveArea.top !== 0 || this._interactiveArea.width !== 1 || this._interactiveArea.height !== 1) {
				let _ = this._domElement.getBoundingClientRect(), E = o.clientX / _.width, O = o.clientY / _.height;
				if (E < this._interactiveArea.left || E > this._interactiveArea.right || O < this._interactiveArea.top || O > this._interactiveArea.bottom) return;
			}
			let c = o.pointerType !== "mouse" ? null : (o.buttons & P$2.LEFT) === P$2.LEFT ? P$2.LEFT : (o.buttons & P$2.MIDDLE) === P$2.MIDDLE ? P$2.MIDDLE : (o.buttons & P$2.RIGHT) === P$2.RIGHT ? P$2.RIGHT : null;
			if (c !== null) {
				let _ = this._findPointerByMouseButton(c);
				_ && this._disposePointer(_);
			}
			if ((o.buttons & P$2.LEFT) === P$2.LEFT && this._lockedPointer) return;
			let d = {
				pointerId: o.pointerId,
				clientX: o.clientX,
				clientY: o.clientY,
				deltaX: 0,
				deltaY: 0,
				mouseButton: c
			};
			this._activePointers.push(d), this._domElement.ownerDocument.removeEventListener("pointermove", l, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", m), this._domElement.ownerDocument.addEventListener("pointermove", l, { passive: !1 }), this._domElement.ownerDocument.addEventListener("pointerup", m), this._isDragging = !0, C(o);
		}, l = (o) => {
			o.cancelable && o.preventDefault();
			let c = o.pointerId, d = this._lockedPointer || this._findPointerById(c);
			if (d) {
				if (d.clientX = o.clientX, d.clientY = o.clientY, d.deltaX = o.movementX, d.deltaY = o.movementY, this._state = 0, o.pointerType === "touch") switch (this._activePointers.length) {
					case 1:
						this._state = this.touches.one;
						break;
					case 2:
						this._state = this.touches.two;
						break;
					case 3:
						this._state = this.touches.three;
						break;
				}
				else (!this._isDragging && this._lockedPointer || this._isDragging && (o.buttons & P$2.LEFT) === P$2.LEFT) && (this._state = this._state | this.mouseButtons.left), this._isDragging && (o.buttons & P$2.MIDDLE) === P$2.MIDDLE && (this._state = this._state | this.mouseButtons.middle), this._isDragging && (o.buttons & P$2.RIGHT) === P$2.RIGHT && (this._state = this._state | this.mouseButtons.right);
				f();
			}
		}, m = (o) => {
			let c = this._findPointerById(o.pointerId);
			if (!(c && c === this._lockedPointer)) {
				if (c && this._disposePointer(c), o.pointerType === "touch") switch (this._activePointers.length) {
					case 0:
						this._state = i$1.NONE;
						break;
					case 1:
						this._state = this.touches.one;
						break;
					case 2:
						this._state = this.touches.two;
						break;
					case 3:
						this._state = this.touches.three;
						break;
				}
				else this._state = i$1.NONE;
				L();
			}
		}, h = -1, v = (o) => {
			if (!this._domElement || !this._enabled || this.mouseButtons.wheel === i$1.NONE) return;
			if (this._interactiveArea.left !== 0 || this._interactiveArea.top !== 0 || this._interactiveArea.width !== 1 || this._interactiveArea.height !== 1) {
				let O = this._domElement.getBoundingClientRect(), S = o.clientX / O.width, z = o.clientY / O.height;
				if (S < this._interactiveArea.left || S > this._interactiveArea.right || z < this._interactiveArea.top || z > this._interactiveArea.bottom) return;
			}
			if (o.preventDefault(), this.dollyToCursor || this.mouseButtons.wheel === i$1.ROTATE || this.mouseButtons.wheel === i$1.TRUCK) {
				let O = performance_default.now();
				h - O < 1e3 && this._getClientRect(this._elementRect), h = O;
			}
			let c = St ? -1 : -3, d = o.deltaMode === 1 ? o.deltaY / c : o.deltaY / (c * 10), _ = this.dollyToCursor ? (o.clientX - this._elementRect.x) / this._elementRect.width * 2 - 1 : 0, E = this.dollyToCursor ? (o.clientY - this._elementRect.y) / this._elementRect.height * -2 + 1 : 0;
			switch (this.mouseButtons.wheel) {
				case i$1.ROTATE:
					this._rotateInternal(o.deltaX, o.deltaY), this._isUserControllingRotate = !0;
					break;
				case i$1.TRUCK:
					this._truckInternal(o.deltaX, o.deltaY, !1), this._isUserControllingTruck = !0;
					break;
				case i$1.OFFSET:
					this._truckInternal(o.deltaX, o.deltaY, !0), this._isUserControllingOffset = !0;
					break;
				case i$1.DOLLY:
					this._dollyInternal(-d, _, E), this._isUserControllingDolly = !0;
					break;
				case i$1.ZOOM:
					this._zoomInternal(-d, _, E), this._isUserControllingZoom = !0;
					break;
			}
			this.dispatchEvent({ type: "control" });
		}, g = (o) => {
			if (!(!this._domElement || !this._enabled)) {
				if (this.mouseButtons.right === u.ACTION.NONE) {
					let c = o instanceof PointerEvent ? o.pointerId : 0, d = this._findPointerById(c);
					d && this._disposePointer(d), this._domElement.ownerDocument.removeEventListener("pointermove", l, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", m);
					return;
				}
				o.preventDefault();
			}
		}, C = (o) => {
			if (!this._enabled) return;
			if (ot(this._activePointers, F$1), this._getClientRect(this._elementRect), s.copy(F$1), n.copy(F$1), this._activePointers.length >= 2) {
				let d = F$1.x - this._activePointers[1].clientX, _ = F$1.y - this._activePointers[1].clientY, E = Math.sqrt(d * d + _ * _);
				r.set(0, E);
				let O = (this._activePointers[0].clientX + this._activePointers[1].clientX) * .5, S = (this._activePointers[0].clientY + this._activePointers[1].clientY) * .5;
				n.set(O, S);
			}
			if (this._state = 0, !o) this._lockedPointer && (this._state = this._state | this.mouseButtons.left);
			else if ("pointerType" in o && o.pointerType === "touch") switch (this._activePointers.length) {
				case 1:
					this._state = this.touches.one;
					break;
				case 2:
					this._state = this.touches.two;
					break;
				case 3:
					this._state = this.touches.three;
					break;
			}
			else !this._lockedPointer && (o.buttons & P$2.LEFT) === P$2.LEFT && (this._state = this._state | this.mouseButtons.left), (o.buttons & P$2.MIDDLE) === P$2.MIDDLE && (this._state = this._state | this.mouseButtons.middle), (o.buttons & P$2.RIGHT) === P$2.RIGHT && (this._state = this._state | this.mouseButtons.right);
			((this._state & i$1.ROTATE) === i$1.ROTATE || (this._state & i$1.TOUCH_ROTATE) === i$1.TOUCH_ROTATE || (this._state & i$1.TOUCH_DOLLY_ROTATE) === i$1.TOUCH_DOLLY_ROTATE || (this._state & i$1.TOUCH_ZOOM_ROTATE) === i$1.TOUCH_ZOOM_ROTATE) && (this._sphericalEnd.theta = this._spherical.theta, this._sphericalEnd.phi = this._spherical.phi, this._thetaVelocity.value = 0, this._phiVelocity.value = 0), ((this._state & i$1.TRUCK) === i$1.TRUCK || (this._state & i$1.TOUCH_TRUCK) === i$1.TOUCH_TRUCK || (this._state & i$1.TOUCH_DOLLY_TRUCK) === i$1.TOUCH_DOLLY_TRUCK || (this._state & i$1.TOUCH_ZOOM_TRUCK) === i$1.TOUCH_ZOOM_TRUCK) && (this._targetEnd.copy(this._target), this._targetVelocity.set(0, 0, 0)), ((this._state & i$1.DOLLY) === i$1.DOLLY || (this._state & i$1.TOUCH_DOLLY) === i$1.TOUCH_DOLLY || (this._state & i$1.TOUCH_DOLLY_TRUCK) === i$1.TOUCH_DOLLY_TRUCK || (this._state & i$1.TOUCH_DOLLY_OFFSET) === i$1.TOUCH_DOLLY_OFFSET || (this._state & i$1.TOUCH_DOLLY_ROTATE) === i$1.TOUCH_DOLLY_ROTATE) && (this._sphericalEnd.radius = this._spherical.radius, this._radiusVelocity.value = 0), ((this._state & i$1.ZOOM) === i$1.ZOOM || (this._state & i$1.TOUCH_ZOOM) === i$1.TOUCH_ZOOM || (this._state & i$1.TOUCH_ZOOM_TRUCK) === i$1.TOUCH_ZOOM_TRUCK || (this._state & i$1.TOUCH_ZOOM_OFFSET) === i$1.TOUCH_ZOOM_OFFSET || (this._state & i$1.TOUCH_ZOOM_ROTATE) === i$1.TOUCH_ZOOM_ROTATE) && (this._zoomEnd = this._zoom, this._zoomVelocity.value = 0), ((this._state & i$1.OFFSET) === i$1.OFFSET || (this._state & i$1.TOUCH_OFFSET) === i$1.TOUCH_OFFSET || (this._state & i$1.TOUCH_DOLLY_OFFSET) === i$1.TOUCH_DOLLY_OFFSET || (this._state & i$1.TOUCH_ZOOM_OFFSET) === i$1.TOUCH_ZOOM_OFFSET) && (this._focalOffsetEnd.copy(this._focalOffset), this._focalOffsetVelocity.set(0, 0, 0)), this.dispatchEvent({ type: "controlstart" });
		}, f = () => {
			if (!this._enabled || !this._dragNeedsUpdate) return;
			this._dragNeedsUpdate = !1, ot(this._activePointers, F$1);
			let c = this._domElement && this._domElement.ownerDocument.pointerLockElement === this._domElement ? this._lockedPointer || this._activePointers[0] : null, d = c ? -c.deltaX : n.x - F$1.x, _ = c ? -c.deltaY : n.y - F$1.y;
			if (n.copy(F$1), ((this._state & i$1.ROTATE) === i$1.ROTATE || (this._state & i$1.TOUCH_ROTATE) === i$1.TOUCH_ROTATE || (this._state & i$1.TOUCH_DOLLY_ROTATE) === i$1.TOUCH_DOLLY_ROTATE || (this._state & i$1.TOUCH_ZOOM_ROTATE) === i$1.TOUCH_ZOOM_ROTATE) && (this._rotateInternal(d, _), this._isUserControllingRotate = !0), (this._state & i$1.DOLLY) === i$1.DOLLY || (this._state & i$1.ZOOM) === i$1.ZOOM) {
				let E = this.dollyToCursor ? (s.x - this._elementRect.x) / this._elementRect.width * 2 - 1 : 0, O = this.dollyToCursor ? (s.y - this._elementRect.y) / this._elementRect.height * -2 + 1 : 0, S = this.dollyDragInverted ? -1 : 1;
				(this._state & i$1.DOLLY) === i$1.DOLLY ? (this._dollyInternal(S * _ * $$2, E, O), this._isUserControllingDolly = !0) : (this._zoomInternal(S * _ * $$2, E, O), this._isUserControllingZoom = !0);
			}
			if ((this._state & i$1.TOUCH_DOLLY) === i$1.TOUCH_DOLLY || (this._state & i$1.TOUCH_ZOOM) === i$1.TOUCH_ZOOM || (this._state & i$1.TOUCH_DOLLY_TRUCK) === i$1.TOUCH_DOLLY_TRUCK || (this._state & i$1.TOUCH_ZOOM_TRUCK) === i$1.TOUCH_ZOOM_TRUCK || (this._state & i$1.TOUCH_DOLLY_OFFSET) === i$1.TOUCH_DOLLY_OFFSET || (this._state & i$1.TOUCH_ZOOM_OFFSET) === i$1.TOUCH_ZOOM_OFFSET || (this._state & i$1.TOUCH_DOLLY_ROTATE) === i$1.TOUCH_DOLLY_ROTATE || (this._state & i$1.TOUCH_ZOOM_ROTATE) === i$1.TOUCH_ZOOM_ROTATE) {
				let E = F$1.x - this._activePointers[1].clientX, O = F$1.y - this._activePointers[1].clientY, S = Math.sqrt(E * E + O * O), z = r.y - S;
				r.set(0, S);
				let j = this.dollyToCursor ? (n.x - this._elementRect.x) / this._elementRect.width * 2 - 1 : 0, W = this.dollyToCursor ? (n.y - this._elementRect.y) / this._elementRect.height * -2 + 1 : 0;
				(this._state & i$1.TOUCH_DOLLY) === i$1.TOUCH_DOLLY || (this._state & i$1.TOUCH_DOLLY_ROTATE) === i$1.TOUCH_DOLLY_ROTATE || (this._state & i$1.TOUCH_DOLLY_TRUCK) === i$1.TOUCH_DOLLY_TRUCK || (this._state & i$1.TOUCH_DOLLY_OFFSET) === i$1.TOUCH_DOLLY_OFFSET ? (this._dollyInternal(z * $$2, j, W), this._isUserControllingDolly = !0) : (this._zoomInternal(z * $$2, j, W), this._isUserControllingZoom = !0);
			}
			((this._state & i$1.TRUCK) === i$1.TRUCK || (this._state & i$1.TOUCH_TRUCK) === i$1.TOUCH_TRUCK || (this._state & i$1.TOUCH_DOLLY_TRUCK) === i$1.TOUCH_DOLLY_TRUCK || (this._state & i$1.TOUCH_ZOOM_TRUCK) === i$1.TOUCH_ZOOM_TRUCK) && (this._truckInternal(d, _, !1), this._isUserControllingTruck = !0), ((this._state & i$1.OFFSET) === i$1.OFFSET || (this._state & i$1.TOUCH_OFFSET) === i$1.TOUCH_OFFSET || (this._state & i$1.TOUCH_DOLLY_OFFSET) === i$1.TOUCH_DOLLY_OFFSET || (this._state & i$1.TOUCH_ZOOM_OFFSET) === i$1.TOUCH_ZOOM_OFFSET) && (this._truckInternal(d, _, !0), this._isUserControllingOffset = !0), this.dispatchEvent({ type: "control" });
		}, L = () => {
			ot(this._activePointers, F$1), n.copy(F$1), this._dragNeedsUpdate = !1, (this._activePointers.length === 0 || this._activePointers.length === 1 && this._activePointers[0] === this._lockedPointer) && (this._isDragging = !1), this._activePointers.length === 0 && this._domElement && (this._domElement.ownerDocument.removeEventListener("pointermove", l, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", m), this.dispatchEvent({ type: "controlend" }));
		};
		this.lockPointer = () => {
			!this._enabled || !this._domElement || (this.cancel(), this._lockedPointer = {
				pointerId: -1,
				clientX: 0,
				clientY: 0,
				deltaX: 0,
				deltaY: 0,
				mouseButton: null
			}, this._activePointers.push(this._lockedPointer), this._domElement.ownerDocument.removeEventListener("pointermove", l, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", m), this._domElement.requestPointerLock(), this._domElement.ownerDocument.addEventListener("pointerlockchange", T), this._domElement.ownerDocument.addEventListener("pointerlockerror", A), this._domElement.ownerDocument.addEventListener("pointermove", l, { passive: !1 }), this._domElement.ownerDocument.addEventListener("pointerup", m), C());
		}, this.unlockPointer = () => {
			var o, c, d;
			this._lockedPointer !== null && (this._disposePointer(this._lockedPointer), this._lockedPointer = null), (o = this._domElement) === null || o === void 0 || o.ownerDocument.exitPointerLock(), (c = this._domElement) === null || c === void 0 || c.ownerDocument.removeEventListener("pointerlockchange", T), (d = this._domElement) === null || d === void 0 || d.ownerDocument.removeEventListener("pointerlockerror", A), this.cancel();
		};
		let T = () => {
			this._domElement && this._domElement.ownerDocument.pointerLockElement === this._domElement || this.unlockPointer();
		}, A = () => {
			this.unlockPointer();
		};
		this._addAllEventListeners = (o) => {
			this._domElement = o, this._domElement.style.touchAction = "none", this._domElement.style.userSelect = "none", this._domElement.style.webkitUserSelect = "none", this._domElement.addEventListener("pointerdown", a), this._domElement.addEventListener("pointercancel", m), this._domElement.addEventListener("wheel", v, { passive: !1 }), this._domElement.addEventListener("contextmenu", g);
		}, this._removeAllEventListeners = () => {
			this._domElement && (this._domElement.style.touchAction = "", this._domElement.style.userSelect = "", this._domElement.style.webkitUserSelect = "", this._domElement.removeEventListener("pointerdown", a), this._domElement.removeEventListener("pointercancel", m), this._domElement.removeEventListener("wheel", v, { passive: !1 }), this._domElement.removeEventListener("contextmenu", g), this._domElement.ownerDocument.removeEventListener("pointermove", l, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", m), this._domElement.ownerDocument.removeEventListener("pointerlockchange", T), this._domElement.ownerDocument.removeEventListener("pointerlockerror", A));
		}, this.cancel = () => {
			this._state !== i$1.NONE && (this._state = i$1.NONE, this._activePointers.length = 0, L());
		}, e && this.connect(e), this.update(0);
	}
	get camera() {
		return this._camera;
	}
	set camera(t) {
		this._camera = t, this.updateCameraUp(), this._camera.updateProjectionMatrix(), this._updateNearPlaneCorners(), this._needsUpdate = !0;
	}
	get enabled() {
		return this._enabled;
	}
	set enabled(t) {
		this._enabled = t, this._domElement && (t ? (this._domElement.style.touchAction = "none", this._domElement.style.userSelect = "none", this._domElement.style.webkitUserSelect = "none") : (this.cancel(), this._domElement.style.touchAction = "", this._domElement.style.userSelect = "", this._domElement.style.webkitUserSelect = ""));
	}
	get active() {
		return !this._hasRested;
	}
	get currentAction() {
		return this._state;
	}
	get distance() {
		return this._spherical.radius;
	}
	set distance(t) {
		this._spherical.radius === t && this._sphericalEnd.radius === t || (this._spherical.radius = t, this._sphericalEnd.radius = t, this._needsUpdate = !0);
	}
	get azimuthAngle() {
		return this._spherical.theta;
	}
	set azimuthAngle(t) {
		this._spherical.theta === t && this._sphericalEnd.theta === t || (this._spherical.theta = t, this._sphericalEnd.theta = t, this._needsUpdate = !0);
	}
	get polarAngle() {
		return this._spherical.phi;
	}
	set polarAngle(t) {
		this._spherical.phi === t && this._sphericalEnd.phi === t || (this._spherical.phi = t, this._sphericalEnd.phi = t, this._needsUpdate = !0);
	}
	get boundaryEnclosesCamera() {
		return this._boundaryEnclosesCamera;
	}
	set boundaryEnclosesCamera(t) {
		this._boundaryEnclosesCamera = t, this._needsUpdate = !0;
	}
	set interactiveArea(t) {
		this._interactiveArea.width = M$2(t.width, 0, 1), this._interactiveArea.height = M$2(t.height, 0, 1), this._interactiveArea.x = M$2(t.x, 0, 1 - this._interactiveArea.width), this._interactiveArea.y = M$2(t.y, 0, 1 - this._interactiveArea.height);
	}
	addEventListener(t, e) {
		super.addEventListener(t, e);
	}
	removeEventListener(t, e) {
		super.removeEventListener(t, e);
	}
	rotate(t, e, s = !1) {
		return this.rotateTo(this._sphericalEnd.theta + t, this._sphericalEnd.phi + e, s);
	}
	rotateAzimuthTo(t, e = !1) {
		return this.rotateTo(t, this._sphericalEnd.phi, e);
	}
	rotatePolarTo(t, e = !1) {
		return this.rotateTo(this._sphericalEnd.theta, t, e);
	}
	rotateTo(t, e, s = !1) {
		this._isUserControllingRotate = !1;
		let n = M$2(t, this.minAzimuthAngle, this.maxAzimuthAngle), r = M$2(e, this.minPolarAngle, this.maxPolarAngle);
		this._sphericalEnd.theta = n, this._sphericalEnd.phi = r, this._sphericalEnd.makeSafe(), this._needsUpdate = !0, s || (this._spherical.theta = this._sphericalEnd.theta, this._spherical.phi = this._sphericalEnd.phi);
		let a = !s || x$1(this._spherical.theta, this._sphericalEnd.theta, this.restThreshold) && x$1(this._spherical.phi, this._sphericalEnd.phi, this.restThreshold);
		return this._createOnRestPromise(a);
	}
	dolly(t, e = !1) {
		return this.dollyTo(this._sphericalEnd.radius - t, e);
	}
	dollyTo(t, e = !1) {
		return this._isUserControllingDolly = !1, this._lastDollyDirection = N$3.NONE, this._changedDolly = 0, this._dollyToNoClamp(M$2(t, this.minDistance, this.maxDistance), e);
	}
	_dollyToNoClamp(t, e = !1) {
		let s = this._sphericalEnd.radius;
		if (this.colliderMeshes.length >= 1) {
			let a = this._collisionTest(), l = x$1(a, this._spherical.radius);
			if (!(s > t) && l) return Promise.resolve();
			this._sphericalEnd.radius = Math.min(t, a);
		} else this._sphericalEnd.radius = t;
		this._needsUpdate = !0, e || (this._spherical.radius = this._sphericalEnd.radius);
		let r = !e || x$1(this._spherical.radius, this._sphericalEnd.radius, this.restThreshold);
		return this._createOnRestPromise(r);
	}
	dollyInFixed(t, e = !1) {
		this._targetEnd.add(this._getCameraDirection(q$1).multiplyScalar(t)), e || this._target.copy(this._targetEnd);
		let s = !e || x$1(this._target.x, this._targetEnd.x, this.restThreshold) && x$1(this._target.y, this._targetEnd.y, this.restThreshold) && x$1(this._target.z, this._targetEnd.z, this.restThreshold);
		return this._createOnRestPromise(s);
	}
	zoom(t, e = !1) {
		return this.zoomTo(this._zoomEnd + t, e);
	}
	zoomTo(t, e = !1) {
		this._isUserControllingZoom = !1, this._zoomEnd = M$2(t, this.minZoom, this.maxZoom), this._needsUpdate = !0, e || (this._zoom = this._zoomEnd);
		let s = !e || x$1(this._zoom, this._zoomEnd, this.restThreshold);
		return this._changedZoom = 0, this._createOnRestPromise(s);
	}
	pan(t, e, s = !1) {
		return console.warn("`pan` has been renamed to `truck`"), this.truck(t, e, s);
	}
	truck(t, e, s = !1) {
		this._camera.updateMatrix(), I$3.setFromMatrixColumn(this._camera.matrix, 0), b$3.setFromMatrixColumn(this._camera.matrix, 1), I$3.multiplyScalar(t), b$3.multiplyScalar(-e);
		let n = y$3.copy(I$3).add(b$3), r = U$1.copy(this._targetEnd).add(n);
		return this.moveTo(r.x, r.y, r.z, s);
	}
	forward(t, e = !1) {
		y$3.setFromMatrixColumn(this._camera.matrix, 0), y$3.crossVectors(this._camera.up, y$3), y$3.multiplyScalar(t);
		let s = U$1.copy(this._targetEnd).add(y$3);
		return this.moveTo(s.x, s.y, s.z, e);
	}
	elevate(t, e = !1) {
		return y$3.copy(this._camera.up).multiplyScalar(t), this.moveTo(this._targetEnd.x + y$3.x, this._targetEnd.y + y$3.y, this._targetEnd.z + y$3.z, e);
	}
	moveTo(t, e, s, n = !1) {
		this._isUserControllingTruck = !1;
		let r = y$3.set(t, e, s).sub(this._targetEnd);
		this._encloseToBoundary(this._targetEnd, r, this.boundaryFriction), this._needsUpdate = !0, n || this._target.copy(this._targetEnd);
		let a = !n || x$1(this._target.x, this._targetEnd.x, this.restThreshold) && x$1(this._target.y, this._targetEnd.y, this.restThreshold) && x$1(this._target.z, this._targetEnd.z, this.restThreshold);
		return this._createOnRestPromise(a);
	}
	lookInDirectionOf(t, e, s, n = !1) {
		let l = y$3.set(t, e, s).sub(this._targetEnd).normalize().multiplyScalar(-this._sphericalEnd.radius).add(this._targetEnd);
		return this.setPosition(l.x, l.y, l.z, n);
	}
	fitToBox(t, e, { cover: s = !1, paddingLeft: n = 0, paddingRight: r = 0, paddingBottom: a = 0, paddingTop: l = 0 } = {}) {
		let m = [], h = t.isBox3 ? B$2.copy(t) : B$2.setFromObject(t);
		h.isEmpty() && (console.warn("camera-controls: fitTo() cannot be used with an empty box. Aborting"), Promise.resolve());
		let v = ut(this._sphericalEnd.theta, pt$1), g = ut(this._sphericalEnd.phi, pt$1);
		m.push(this.rotateTo(v, g, e));
		let C = y$3.setFromSpherical(this._sphericalEnd).normalize(), f = Et.setFromUnitVectors(C, at), L = x$1(Math.abs(C.y), 1);
		L && f.multiply(lt$1.setFromAxisAngle(tt, v)), f.multiply(this._yAxisUpSpaceInverse);
		let T = Tt.makeEmpty();
		U$1.copy(h.min).applyQuaternion(f), T.expandByPoint(U$1), U$1.copy(h.min).setX(h.max.x).applyQuaternion(f), T.expandByPoint(U$1), U$1.copy(h.min).setY(h.max.y).applyQuaternion(f), T.expandByPoint(U$1), U$1.copy(h.max).setZ(h.min.z).applyQuaternion(f), T.expandByPoint(U$1), U$1.copy(h.min).setZ(h.max.z).applyQuaternion(f), T.expandByPoint(U$1), U$1.copy(h.max).setY(h.min.y).applyQuaternion(f), T.expandByPoint(U$1), U$1.copy(h.max).setX(h.min.x).applyQuaternion(f), T.expandByPoint(U$1), U$1.copy(h.max).applyQuaternion(f), T.expandByPoint(U$1), T.min.x -= n, T.min.y -= a, T.max.x += r, T.max.y += l, f.setFromUnitVectors(at, C), L && f.premultiply(lt$1.invert()), f.premultiply(this._yAxisUpSpace);
		let A = T.getSize(y$3), o = T.getCenter(U$1).applyQuaternion(f);
		if (k$1(this._camera)) {
			let c = this.getDistanceToFitBox(A.x, A.y, A.z, s);
			m.push(this.moveTo(o.x, o.y, o.z, e)), m.push(this.dollyTo(c, e)), m.push(this.setFocalOffset(0, 0, 0, e));
		} else if (H$2(this._camera)) {
			let c = this._camera, d = c.right - c.left, _ = c.top - c.bottom, E = s ? Math.max(d / A.x, _ / A.y) : Math.min(d / A.x, _ / A.y);
			m.push(this.moveTo(o.x, o.y, o.z, e)), m.push(this.zoomTo(E, e)), m.push(this.setFocalOffset(0, 0, 0, e));
		}
		return Promise.all(m);
	}
	fitToSphere(t, e) {
		let s = [], r = "isObject3D" in t ? u.createBoundingSphere(t, ht) : ht.copy(t);
		if (s.push(this.moveTo(r.center.x, r.center.y, r.center.z, e)), k$1(this._camera)) {
			let a = this.getDistanceToFitSphere(r.radius);
			s.push(this.dollyTo(a, e));
		} else if (H$2(this._camera)) {
			let a = this._camera.right - this._camera.left, l = this._camera.top - this._camera.bottom, m = 2 * r.radius, h = Math.min(a / m, l / m);
			s.push(this.zoomTo(h, e));
		}
		return s.push(this.setFocalOffset(0, 0, 0, e)), Promise.all(s);
	}
	setLookAt(t, e, s, n, r, a, l = !1) {
		this._isUserControllingRotate = !1, this._isUserControllingDolly = !1, this._isUserControllingTruck = !1, this._lastDollyDirection = N$3.NONE, this._changedDolly = 0;
		let m = U$1.set(n, r, a), h = y$3.set(t, e, s);
		this._targetEnd.copy(m), this._sphericalEnd.setFromVector3(h.sub(m).applyQuaternion(this._yAxisUpSpace)), this.normalizeRotations(), this._needsUpdate = !0, l || (this._target.copy(this._targetEnd), this._spherical.copy(this._sphericalEnd));
		let v = !l || x$1(this._target.x, this._targetEnd.x, this.restThreshold) && x$1(this._target.y, this._targetEnd.y, this.restThreshold) && x$1(this._target.z, this._targetEnd.z, this.restThreshold) && x$1(this._spherical.theta, this._sphericalEnd.theta, this.restThreshold) && x$1(this._spherical.phi, this._sphericalEnd.phi, this.restThreshold) && x$1(this._spherical.radius, this._sphericalEnd.radius, this.restThreshold);
		return this._createOnRestPromise(v);
	}
	lerpLookAt(t, e, s, n, r, a, l, m, h, v, g, C, f, L = !1) {
		this._isUserControllingRotate = !1, this._isUserControllingDolly = !1, this._isUserControllingTruck = !1, this._lastDollyDirection = N$3.NONE, this._changedDolly = 0;
		let T = y$3.set(n, r, a), A = U$1.set(t, e, s);
		R$1.setFromVector3(A.sub(T).applyQuaternion(this._yAxisUpSpace));
		let o = V$3.set(v, g, C), c = U$1.set(l, m, h);
		G$1.setFromVector3(c.sub(o).applyQuaternion(this._yAxisUpSpace)), this._targetEnd.copy(T.lerp(o, f));
		let d = G$1.theta - R$1.theta, _ = G$1.phi - R$1.phi, E = G$1.radius - R$1.radius;
		this._sphericalEnd.set(R$1.radius + E * f, R$1.phi + _ * f, R$1.theta + d * f), this.normalizeRotations(), this._needsUpdate = !0, L || (this._target.copy(this._targetEnd), this._spherical.copy(this._sphericalEnd));
		let O = !L || x$1(this._target.x, this._targetEnd.x, this.restThreshold) && x$1(this._target.y, this._targetEnd.y, this.restThreshold) && x$1(this._target.z, this._targetEnd.z, this.restThreshold) && x$1(this._spherical.theta, this._sphericalEnd.theta, this.restThreshold) && x$1(this._spherical.phi, this._sphericalEnd.phi, this.restThreshold) && x$1(this._spherical.radius, this._sphericalEnd.radius, this.restThreshold);
		return this._createOnRestPromise(O);
	}
	setPosition(t, e, s, n = !1) {
		return this.setLookAt(t, e, s, this._targetEnd.x, this._targetEnd.y, this._targetEnd.z, n);
	}
	setTarget(t, e, s, n = !1) {
		let r = this.getPosition(y$3), a = this.setLookAt(r.x, r.y, r.z, t, e, s, n);
		return this._sphericalEnd.phi = M$2(this._sphericalEnd.phi, this.minPolarAngle, this.maxPolarAngle), a;
	}
	setFocalOffset(t, e, s, n = !1) {
		this._isUserControllingOffset = !1, this._focalOffsetEnd.set(t, e, s), this._needsUpdate = !0, n || this._focalOffset.copy(this._focalOffsetEnd);
		let r = !n || x$1(this._focalOffset.x, this._focalOffsetEnd.x, this.restThreshold) && x$1(this._focalOffset.y, this._focalOffsetEnd.y, this.restThreshold) && x$1(this._focalOffset.z, this._focalOffsetEnd.z, this.restThreshold);
		return this._createOnRestPromise(r);
	}
	setOrbitPoint(t, e, s) {
		this._camera.updateMatrixWorld(), I$3.setFromMatrixColumn(this._camera.matrixWorldInverse, 0), b$3.setFromMatrixColumn(this._camera.matrixWorldInverse, 1), Y$1.setFromMatrixColumn(this._camera.matrixWorldInverse, 2);
		let n = y$3.set(t, e, s), r = n.distanceTo(this._camera.position), a = n.sub(this._camera.position);
		I$3.multiplyScalar(a.x), b$3.multiplyScalar(a.y), Y$1.multiplyScalar(a.z), y$3.copy(I$3).add(b$3).add(Y$1), y$3.z = y$3.z + r, this.dollyTo(r, !1), this.setFocalOffset(-y$3.x, y$3.y, -y$3.z, !1), this.moveTo(t, e, s, !1);
	}
	setBoundary(t) {
		if (!t) {
			this._boundary.min.set(-Infinity, -Infinity, -Infinity), this._boundary.max.set(Infinity, Infinity, Infinity), this._needsUpdate = !0;
			return;
		}
		this._boundary.copy(t), this._boundary.clampPoint(this._targetEnd, this._targetEnd), this._needsUpdate = !0;
	}
	setViewport(t, e, s, n) {
		if (t === null) {
			this._viewport = null;
			return;
		}
		this._viewport = this._viewport || new p$1.Vector4(), typeof t == "number" ? this._viewport.set(t, e, s, n) : this._viewport.copy(t);
	}
	getDistanceToFitBox(t, e, s, n = !1) {
		if (rt(this._camera, "getDistanceToFitBox")) return this._spherical.radius;
		let r = t / e, a = this._camera.getEffectiveFOV() * K$1, l = this._camera.aspect;
		return ((n ? r > l : r < l) ? e : t / l) * .5 / Math.tan(a * .5) + s * .5;
	}
	getDistanceToFitSphere(t) {
		if (rt(this._camera, "getDistanceToFitSphere")) return this._spherical.radius;
		let e = this._camera.getEffectiveFOV() * K$1, s = Math.atan(Math.tan(e * .5) * this._camera.aspect) * 2, n = 1 < this._camera.aspect ? e : s;
		return t / Math.sin(n * .5);
	}
	getTarget(t, e = !0) {
		return (t && t.isVector3 ? t : new p$1.Vector3()).copy(e ? this._targetEnd : this._target);
	}
	getPosition(t, e = !0) {
		return (t && t.isVector3 ? t : new p$1.Vector3()).setFromSpherical(e ? this._sphericalEnd : this._spherical).applyQuaternion(this._yAxisUpSpaceInverse).add(e ? this._targetEnd : this._target);
	}
	getSpherical(t, e = !0) {
		return (t || new p$1.Spherical()).copy(e ? this._sphericalEnd : this._spherical);
	}
	getFocalOffset(t, e = !0) {
		return (t && t.isVector3 ? t : new p$1.Vector3()).copy(e ? this._focalOffsetEnd : this._focalOffset);
	}
	normalizeRotations() {
		this._sphericalEnd.theta = this._sphericalEnd.theta % Z$2, this._sphericalEnd.theta < 0 && (this._sphericalEnd.theta += Z$2), this._spherical.theta += Z$2 * Math.round((this._sphericalEnd.theta - this._spherical.theta) / Z$2);
	}
	stop() {
		this._focalOffset.copy(this._focalOffsetEnd), this._target.copy(this._targetEnd), this._spherical.copy(this._sphericalEnd), this._zoom = this._zoomEnd;
	}
	reset(t = !1) {
		if (!x$1(this._camera.up.x, this._cameraUp0.x) || !x$1(this._camera.up.y, this._cameraUp0.y) || !x$1(this._camera.up.z, this._cameraUp0.z)) {
			this._camera.up.copy(this._cameraUp0);
			let s = this.getPosition(y$3);
			this.updateCameraUp(), this.setPosition(s.x, s.y, s.z);
		}
		let e = [
			this.setLookAt(this._position0.x, this._position0.y, this._position0.z, this._target0.x, this._target0.y, this._target0.z, t),
			this.setFocalOffset(this._focalOffset0.x, this._focalOffset0.y, this._focalOffset0.z, t),
			this.zoomTo(this._zoom0, t)
		];
		return Promise.all(e);
	}
	saveState() {
		this._cameraUp0.copy(this._camera.up), this.getTarget(this._target0), this.getPosition(this._position0), this._zoom0 = this._zoom, this._focalOffset0.copy(this._focalOffset);
	}
	updateCameraUp() {
		this._yAxisUpSpace.setFromUnitVectors(this._camera.up, tt), this._yAxisUpSpaceInverse.copy(this._yAxisUpSpace).invert();
	}
	applyCameraUp() {
		let t = y$3.subVectors(this._target, this._camera.position).normalize(), e = U$1.crossVectors(t, this._camera.up);
		this._camera.up.crossVectors(e, t).normalize(), this._camera.updateMatrixWorld();
		let s = this.getPosition(y$3);
		this.updateCameraUp(), this.setPosition(s.x, s.y, s.z);
	}
	update(t) {
		let e = this._sphericalEnd.theta - this._spherical.theta, s = this._sphericalEnd.phi - this._spherical.phi, n = this._sphericalEnd.radius - this._spherical.radius, r = Ot.subVectors(this._targetEnd, this._target), a = yt.subVectors(this._focalOffsetEnd, this._focalOffset), l = this._zoomEnd - this._zoom;
		if (D$1(e)) this._thetaVelocity.value = 0, this._spherical.theta = this._sphericalEnd.theta;
		else {
			let g = this._isUserControllingRotate ? this.draggingSmoothTime : this.smoothTime;
			this._spherical.theta = J$1(this._spherical.theta, this._sphericalEnd.theta, this._thetaVelocity, g, Infinity, t), this._needsUpdate = !0;
		}
		if (D$1(s)) this._phiVelocity.value = 0, this._spherical.phi = this._sphericalEnd.phi;
		else {
			let g = this._isUserControllingRotate ? this.draggingSmoothTime : this.smoothTime;
			this._spherical.phi = J$1(this._spherical.phi, this._sphericalEnd.phi, this._phiVelocity, g, Infinity, t), this._needsUpdate = !0;
		}
		if (D$1(n)) this._radiusVelocity.value = 0, this._spherical.radius = this._sphericalEnd.radius;
		else {
			let g = this._isUserControllingDolly ? this.draggingSmoothTime : this.smoothTime;
			this._spherical.radius = J$1(this._spherical.radius, this._sphericalEnd.radius, this._radiusVelocity, g, this.maxSpeed, t), this._needsUpdate = !0;
		}
		if (D$1(r.x) && D$1(r.y) && D$1(r.z)) this._targetVelocity.set(0, 0, 0), this._target.copy(this._targetEnd);
		else {
			let g = this._isUserControllingTruck ? this.draggingSmoothTime : this.smoothTime;
			ft(this._target, this._targetEnd, this._targetVelocity, g, this.maxSpeed, t, this._target), this._needsUpdate = !0;
		}
		if (D$1(a.x) && D$1(a.y) && D$1(a.z)) this._focalOffsetVelocity.set(0, 0, 0), this._focalOffset.copy(this._focalOffsetEnd);
		else {
			let g = this._isUserControllingOffset ? this.draggingSmoothTime : this.smoothTime;
			ft(this._focalOffset, this._focalOffsetEnd, this._focalOffsetVelocity, g, this.maxSpeed, t, this._focalOffset), this._needsUpdate = !0;
		}
		if (D$1(l)) this._zoomVelocity.value = 0, this._zoom = this._zoomEnd;
		else {
			let g = this._isUserControllingZoom ? this.draggingSmoothTime : this.smoothTime;
			this._zoom = J$1(this._zoom, this._zoomEnd, this._zoomVelocity, g, Infinity, t);
		}
		if (this.dollyToCursor) {
			if (k$1(this._camera) && this._changedDolly !== 0) {
				let g = this._spherical.radius - this._lastDistance, C = this._camera, f = this._getCameraDirection(q$1), L = y$3.copy(f).cross(C.up).normalize();
				L.lengthSq() === 0 && (L.x = 1);
				let T = U$1.crossVectors(L, f), A = this._sphericalEnd.radius * Math.tan(C.getEffectiveFOV() * K$1 * .5), c = (this._sphericalEnd.radius - g - this._sphericalEnd.radius) / this._sphericalEnd.radius, d = V$3.copy(this._targetEnd).add(L.multiplyScalar(this._dollyControlCoord.x * A * C.aspect)).add(T.multiplyScalar(this._dollyControlCoord.y * A)), _ = y$3.copy(this._targetEnd).lerp(d, c), E = this._lastDollyDirection === N$3.IN && this._spherical.radius <= this.minDistance, O = this._lastDollyDirection === N$3.OUT && this.maxDistance <= this._spherical.radius;
				if (this.infinityDolly && (E || O)) {
					this._sphericalEnd.radius -= g, this._spherical.radius -= g;
					let z = U$1.copy(f).multiplyScalar(-g);
					_.add(z);
				}
				this._boundary.clampPoint(_, _);
				let S = U$1.subVectors(_, this._targetEnd);
				this._targetEnd.copy(_), this._target.add(S), this._changedDolly -= g, D$1(this._changedDolly) && (this._changedDolly = 0);
			} else if (H$2(this._camera) && this._changedZoom !== 0) {
				let g = this._zoom - this._lastZoom, C = this._camera, f = y$3.set(this._dollyControlCoord.x, this._dollyControlCoord.y, (C.near + C.far) / (C.near - C.far)).unproject(C), L = U$1.set(0, 0, -1).applyQuaternion(C.quaternion), T = V$3.copy(f).add(L.multiplyScalar(-f.dot(C.up))), o = -(this._zoom - g - this._zoom) / this._zoom, c = this._getCameraDirection(q$1), d = this._targetEnd.dot(c), _ = y$3.copy(this._targetEnd).lerp(T, o), E = _.dot(c), O = c.multiplyScalar(E - d);
				_.sub(O), this._boundary.clampPoint(_, _);
				let S = U$1.subVectors(_, this._targetEnd);
				this._targetEnd.copy(_), this._target.add(S), this._changedZoom -= g, D$1(this._changedZoom) && (this._changedZoom = 0);
			}
		}
		this._camera.zoom !== this._zoom && (this._camera.zoom = this._zoom, this._camera.updateProjectionMatrix(), this._updateNearPlaneCorners(), this._needsUpdate = !0), this._dragNeedsUpdate = !0;
		let m = this._collisionTest();
		this._spherical.radius = Math.min(this._spherical.radius, m), this._spherical.makeSafe(), this._camera.position.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse).add(this._target), this._camera.lookAt(this._target), (!D$1(this._focalOffset.x) || !D$1(this._focalOffset.y) || !D$1(this._focalOffset.z)) && (this._camera.updateMatrixWorld(), I$3.setFromMatrixColumn(this._camera.matrix, 0), b$3.setFromMatrixColumn(this._camera.matrix, 1), Y$1.setFromMatrixColumn(this._camera.matrix, 2), I$3.multiplyScalar(this._focalOffset.x), b$3.multiplyScalar(-this._focalOffset.y), Y$1.multiplyScalar(this._focalOffset.z), y$3.copy(I$3).add(b$3).add(Y$1), this._camera.position.add(y$3)), this._boundaryEnclosesCamera && this._encloseToBoundary(this._camera.position.copy(this._target), y$3.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse), 1);
		let v = this._needsUpdate;
		return v && !this._updatedLastTime ? (this._hasRested = !1, this.dispatchEvent({ type: "wake" }), this.dispatchEvent({ type: "update" })) : v ? (this.dispatchEvent({ type: "update" }), D$1(e, this.restThreshold) && D$1(s, this.restThreshold) && D$1(n, this.restThreshold) && D$1(r.x, this.restThreshold) && D$1(r.y, this.restThreshold) && D$1(r.z, this.restThreshold) && D$1(a.x, this.restThreshold) && D$1(a.y, this.restThreshold) && D$1(a.z, this.restThreshold) && D$1(l, this.restThreshold) && !this._hasRested && (this._hasRested = !0, this.dispatchEvent({ type: "rest" }))) : !v && this._updatedLastTime && this.dispatchEvent({ type: "sleep" }), this._lastDistance = this._spherical.radius, this._lastZoom = this._zoom, this._updatedLastTime = v, this._needsUpdate = !1, v;
	}
	toJSON() {
		return JSON.stringify({
			enabled: this._enabled,
			minDistance: this.minDistance,
			maxDistance: X(this.maxDistance),
			minZoom: this.minZoom,
			maxZoom: X(this.maxZoom),
			minPolarAngle: this.minPolarAngle,
			maxPolarAngle: X(this.maxPolarAngle),
			minAzimuthAngle: X(this.minAzimuthAngle),
			maxAzimuthAngle: X(this.maxAzimuthAngle),
			smoothTime: this.smoothTime,
			draggingSmoothTime: this.draggingSmoothTime,
			dollySpeed: this.dollySpeed,
			truckSpeed: this.truckSpeed,
			dollyToCursor: this.dollyToCursor,
			verticalDragToForward: this.verticalDragToForward,
			target: this._targetEnd.toArray(),
			position: y$3.setFromSpherical(this._sphericalEnd).add(this._targetEnd).toArray(),
			zoom: this._zoomEnd,
			focalOffset: this._focalOffsetEnd.toArray(),
			target0: this._target0.toArray(),
			position0: this._position0.toArray(),
			zoom0: this._zoom0,
			focalOffset0: this._focalOffset0.toArray()
		});
	}
	fromJSON(t, e = !1) {
		let s = JSON.parse(t);
		this.enabled = s.enabled, this.minDistance = s.minDistance, this.maxDistance = Q(s.maxDistance), this.minZoom = s.minZoom, this.maxZoom = Q(s.maxZoom), this.minPolarAngle = s.minPolarAngle, this.maxPolarAngle = Q(s.maxPolarAngle), this.minAzimuthAngle = Q(s.minAzimuthAngle), this.maxAzimuthAngle = Q(s.maxAzimuthAngle), this.smoothTime = s.smoothTime, this.draggingSmoothTime = s.draggingSmoothTime, this.dollySpeed = s.dollySpeed, this.truckSpeed = s.truckSpeed, this.dollyToCursor = s.dollyToCursor, this.verticalDragToForward = s.verticalDragToForward, this._target0.fromArray(s.target0), this._position0.fromArray(s.position0), this._zoom0 = s.zoom0, this._focalOffset0.fromArray(s.focalOffset0), this.moveTo(s.target[0], s.target[1], s.target[2], e), R$1.setFromVector3(y$3.fromArray(s.position).sub(this._targetEnd).applyQuaternion(this._yAxisUpSpace)), this.rotateTo(R$1.theta, R$1.phi, e), this.dollyTo(R$1.radius, e), this.zoomTo(s.zoom, e), this.setFocalOffset(s.focalOffset[0], s.focalOffset[1], s.focalOffset[2], e), this._needsUpdate = !0;
	}
	connect(t) {
		if (this._domElement) {
			console.warn("camera-controls is already connected.");
			return;
		}
		t.setAttribute("data-camera-controls-version", At), this._addAllEventListeners(t), this._getClientRect(this._elementRect);
	}
	disconnect() {
		this.cancel(), this._removeAllEventListeners(), this._domElement && (this._domElement.removeAttribute("data-camera-controls-version"), this._domElement = void 0);
	}
	dispose() {
		this.removeAllEventListeners(), this.disconnect();
	}
	_getTargetDirection(t) {
		return t.setFromSpherical(this._spherical).divideScalar(this._spherical.radius).applyQuaternion(this._yAxisUpSpaceInverse);
	}
	_getCameraDirection(t) {
		return this._getTargetDirection(t).negate();
	}
	_findPointerById(t) {
		return this._activePointers.find((e) => e.pointerId === t);
	}
	_findPointerByMouseButton(t) {
		return this._activePointers.find((e) => e.mouseButton === t);
	}
	_disposePointer(t) {
		this._activePointers.splice(this._activePointers.indexOf(t), 1);
	}
	_encloseToBoundary(t, e, s) {
		let n = e.lengthSq();
		if (n === 0) return t;
		let r = U$1.copy(e).add(t), l = this._boundary.clampPoint(r, V$3).sub(r), m = l.lengthSq();
		if (m === 0) return t.add(e);
		if (m === n) return t;
		if (s === 0) return t.add(e).add(l);
		{
			let h = 1 + s * m / e.dot(l);
			return t.add(U$1.copy(e).multiplyScalar(h)).add(l.multiplyScalar(1 - s));
		}
	}
	_updateNearPlaneCorners() {
		if (k$1(this._camera)) {
			let t = this._camera, e = t.near, s = t.getEffectiveFOV() * K$1, n = Math.tan(s * .5) * e, r = n * t.aspect;
			this._nearPlaneCorners[0].set(-r, -n, 0), this._nearPlaneCorners[1].set(r, -n, 0), this._nearPlaneCorners[2].set(r, n, 0), this._nearPlaneCorners[3].set(-r, n, 0);
		} else if (H$2(this._camera)) {
			let t = this._camera, e = 1 / t.zoom, s = t.left * e, n = t.right * e, r = t.top * e, a = t.bottom * e;
			this._nearPlaneCorners[0].set(s, r, 0), this._nearPlaneCorners[1].set(n, r, 0), this._nearPlaneCorners[2].set(n, a, 0), this._nearPlaneCorners[3].set(s, a, 0);
		}
	}
	_collisionTest() {
		let t = Infinity;
		if (!(this.colliderMeshes.length >= 1) || rt(this._camera, "_collisionTest")) return t;
		let s = this._getTargetDirection(q$1);
		ct.lookAt(gt, s, this._camera.up);
		for (let n = 0; n < 4; n++) {
			let r = U$1.copy(this._nearPlaneCorners[n]);
			r.applyMatrix4(ct);
			let a = V$3.addVectors(this._target, r);
			et.set(a, s), et.far = this._spherical.radius + 1;
			let l = et.intersectObjects(this.colliderMeshes);
			l.length !== 0 && l[0].distance < t && (t = l[0].distance);
		}
		return t;
	}
	_getClientRect(t) {
		if (!this._domElement) return;
		let e = this._domElement.getBoundingClientRect();
		return t.x = e.left, t.y = e.top, this._viewport ? (t.x += this._viewport.x, t.y += e.height - this._viewport.w - this._viewport.y, t.width = this._viewport.z, t.height = this._viewport.w) : (t.width = e.width, t.height = e.height), t;
	}
	_createOnRestPromise(t) {
		return t ? Promise.resolve() : (this._hasRested = !1, this.dispatchEvent({ type: "transitionstart" }), new Promise((e) => {
			let s = () => {
				this.removeEventListener("rest", s), e();
			};
			this.addEventListener("rest", s);
		}));
	}
	_addAllEventListeners(t) {}
	_removeAllEventListeners() {}
	get dampingFactor() {
		return console.warn(".dampingFactor has been deprecated. use smoothTime (in seconds) instead."), 0;
	}
	set dampingFactor(t) {
		console.warn(".dampingFactor has been deprecated. use smoothTime (in seconds) instead.");
	}
	get draggingDampingFactor() {
		return console.warn(".draggingDampingFactor has been deprecated. use draggingSmoothTime (in seconds) instead."), 0;
	}
	set draggingDampingFactor(t) {
		console.warn(".draggingDampingFactor has been deprecated. use draggingSmoothTime (in seconds) instead.");
	}
	static createBoundingSphere(t, e = new p$1.Sphere()) {
		let s = e, n = s.center;
		B$2.makeEmpty(), t.traverseVisible((a) => {
			a.isMesh && B$2.expandByObject(a);
		}), B$2.getCenter(n);
		let r = 0;
		return t.traverseVisible((a) => {
			if (!a.isMesh) return;
			let l = a, m = l.geometry.clone();
			m.applyMatrix4(l.matrixWorld);
			let v = m.attributes.position;
			for (let g = 0, C = v.count; g < C; g++) y$3.fromBufferAttribute(v, g), r = Math.max(r, n.distanceToSquared(y$3));
		}), s.radius = Math.sqrt(r), s;
	}
};
function Yt(e) {
	var s = e, { smoothTime: u = .05 } = s, t = y$5(s, ["smoothTime"]);
	w$1.install({ THREE: three_module_exports }), extend({ CameraControls: w$1 });
	let n = useThree((h) => h.camera), r = useThree((h) => h.gl), a = v$4(t), [l, m] = (0, import_react.useState)(!1);
	return (0, import_react.useEffect)(() => {
		let h = a.current;
		if (!h) return;
		let { type: v, onCameraUpdate: g } = t || {};
		if (!g) return;
		let C = (o) => Math.round(o * 180 / Math.PI), f = () => ({
			cAzimuthAngle: C(h.azimuthAngle),
			cPolarAngle: C(h.polarAngle)
		}), L = () => {
			var c;
			let o = {};
			if (v === "sphere") {
				let d = h == null ? void 0 : h.zoom;
				if (Number.isFinite(d)) o.cameraZoom = Number(d.toFixed(2));
				else {
					let _ = (c = h == null ? void 0 : h.camera) == null ? void 0 : c.zoom;
					Number.isFinite(_) && (o.cameraZoom = Number(_.toFixed(2)));
				}
			} else Number.isFinite(h.distance) && (o.cDistance = Number(h.distance.toFixed(2)));
			return o;
		}, T = () => {
			m(!0);
		}, A = () => {
			m(!1), g(w$2(w$2({}, f()), L()));
		};
		return h.addEventListener("controlstart", T), h.addEventListener("rest", A), () => {
			h.removeEventListener("controlstart", T), h.removeEventListener("rest", A);
		};
	}, [a, t]), (0, import_jsx_runtime.jsx)("cameraControls", {
		ref: a,
		args: [n, r.domElement],
		smoothTime: l ? 0 : u,
		zoomSpeed: 10,
		dollySpeed: 5,
		maxDistance: 1e3,
		restThreshold: .01,
		mouseButtons: {
			left: w$1.ACTION.ROTATE,
			middle: t.type === "sphere" ? w$1.ACTION.ZOOM : w$1.ACTION.DOLLY,
			right: w$1.ACTION.NONE,
			wheel: t.type === "sphere" ? w$1.ACTION.ZOOM : w$1.ACTION.DOLLY
		},
		touches: {
			one: w$1.ACTION.ROTATE,
			two: w$1.ACTION.NONE,
			three: w$1.ACTION.NONE
		}
	});
}
/*! Bundled license information:

camera-controls/dist/camera-controls.module.js:
(*!
* camera-controls
* https://github.com/yomotsu/camera-controls
* (c) 2017 @yomotsu
* Released under the MIT License.
*)
*/
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-MNG3BBZ4.mjs
function l$1(t) {
	return (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: (0, import_jsx_runtime.jsx)(Yt, w$2({}, t)) });
}
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-DTOHMYM5.mjs
var ie = class extends DataTextureLoader {
	constructor(e) {
		super(e), this.type = HalfFloatType;
	}
	parse(e) {
		let a = function(n, m) {
			switch (n) {
				case 1: throw new Error("THREE.RGBELoader: Read Error: " + (m || ""));
				case 2: throw new Error("THREE.RGBELoader: Write Error: " + (m || ""));
				case 3: throw new Error("THREE.RGBELoader: Bad File Format: " + (m || ""));
				default:
				case 4: throw new Error("THREE.RGBELoader: Memory Error: " + (m || ""));
			}
		}, b = `
`, L = function(n, m, l) {
			m = m || 1024;
			let u = n.pos, c = -1, s = 0, h = "", p = String.fromCharCode.apply(null, new Uint16Array(n.subarray(u, u + 128)));
			for (; 0 > (c = p.indexOf(b)) && s < m && u < n.byteLength;) h += p, s += p.length, u += 128, p += String.fromCharCode.apply(null, new Uint16Array(n.subarray(u, u + 128)));
			return -1 < c ? (l !== !1 && (n.pos += s + c + 1), h + p.slice(0, c)) : !1;
		}, C = function(n) {
			let m = /^#\?(\S+)/, l = /^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/, d = /^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/, u = /^\s*FORMAT=(\S+)\s*$/, c = /^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/, s = {
				valid: 0,
				string: "",
				comments: "",
				programtype: "RGBE",
				format: "",
				gamma: 1,
				exposure: 1,
				width: 0,
				height: 0
			}, h, p;
			for ((n.pos >= n.byteLength || !(h = L(n))) && a(1, "no header found"), (p = h.match(m)) || a(3, "bad initial token"), s.valid |= 1, s.programtype = p[1], s.string += h + `
`; h = L(n), h !== !1;) {
				if (s.string += h + `
`, h.charAt(0) === "#") {
					s.comments += h + `
`;
					continue;
				}
				if ((p = h.match(l)) && (s.gamma = parseFloat(p[1])), (p = h.match(d)) && (s.exposure = parseFloat(p[1])), (p = h.match(u)) && (s.valid |= 2, s.format = p[1]), (p = h.match(c)) && (s.valid |= 4, s.height = parseInt(p[1], 10), s.width = parseInt(p[2], 10)), s.valid & 2 && s.valid & 4) break;
			}
			return s.valid & 2 || a(3, "missing format specifier"), s.valid & 4 || a(3, "missing image size specifier"), s;
		}, ee = function(n, m, l) {
			let d = m;
			if (d < 8 || d > 32767 || n[0] !== 2 || n[1] !== 2 || n[2] & 128) return new Uint8Array(n);
			d !== (n[2] << 8 | n[3]) && a(3, "wrong scanline width");
			let u = new Uint8Array(4 * m * l);
			u.length || a(4, "unable to allocate buffer space");
			let c = 0, s = 0, h = 4 * d, p = new Uint8Array(4), z = new Uint8Array(h), pe = l;
			for (; pe > 0 && s < n.byteLength;) {
				s + 4 > n.byteLength && a(1), p[0] = n[s++], p[1] = n[s++], p[2] = n[s++], p[3] = n[s++], (p[0] != 2 || p[1] != 2 || (p[2] << 8 | p[3]) != d) && a(3, "bad rgbe scanline format");
				let V = 0, R;
				for (; V < h && s < n.byteLength;) {
					R = n[s++];
					let T = R > 128;
					if (T && (R -= 128), (R === 0 || V + R > h) && a(3, "bad scanline data"), T) {
						let D = n[s++];
						for (let de = 0; de < R; de++) z[V++] = D;
					} else z.set(n.subarray(s, s + R), V), V += R, s += R;
				}
				let Ee = d;
				for (let T = 0; T < Ee; T++) {
					let D = 0;
					u[c] = z[T + D], D += d, u[c + 1] = z[T + D], D += d, u[c + 2] = z[T + D], D += d, u[c + 3] = z[T + D], c += 4;
				}
				pe--;
			}
			return u;
		}, le = function(n, m, l, d) {
			let u = n[m + 3], c = Math.pow(2, u - 128) / 255;
			l[d + 0] = n[m + 0] * c, l[d + 1] = n[m + 1] * c, l[d + 2] = n[m + 2] * c, l[d + 3] = 1;
		}, k = function(n, m, l, d) {
			let u = n[m + 3], c = Math.pow(2, u - 128) / 255;
			l[d + 0] = DataUtils.toHalfFloat(Math.min(n[m + 0] * c, 65504)), l[d + 1] = DataUtils.toHalfFloat(Math.min(n[m + 1] * c, 65504)), l[d + 2] = DataUtils.toHalfFloat(Math.min(n[m + 2] * c, 65504)), l[d + 3] = DataUtils.toHalfFloat(1);
		}, U = new Uint8Array(e);
		U.pos = 0;
		let G = C(U), j = G.width, B = G.height, _ = ee(U.subarray(U.pos), j, B), te, re, F;
		switch (this.type) {
			case FloatType:
				F = _.length / 4;
				let n = new Float32Array(F * 4);
				for (let l = 0; l < F; l++) le(_, l * 4, n, l * 4);
				te = n, re = FloatType;
				break;
			case HalfFloatType:
				F = _.length / 4;
				let m = new Uint16Array(F * 4);
				for (let l = 0; l < F; l++) k(_, l * 4, m, l * 4);
				te = m, re = HalfFloatType;
				break;
			default: throw new Error("THREE.RGBELoader: Unsupported type: " + this.type);
		}
		return {
			width: j,
			height: B,
			data: te,
			header: G.string,
			gamma: G.gamma,
			exposure: G.exposure,
			type: re
		};
	}
	setDataType(e) {
		return this.type = e, this;
	}
	load(e, t, i, r) {
		function o(a, f) {
			switch (a.type) {
				case FloatType:
				case HalfFloatType:
					"colorSpace" in a ? a.colorSpace = "srgb-linear" : a.encoding = 3e3, a.minFilter = LinearFilter, a.magFilter = LinearFilter, a.generateMipmaps = !1, a.flipY = !0;
					break;
			}
			t && t(a, f);
		}
		return super.load(e, o, i, r);
	}
};
new Box3();
new Vector3();
parseInt("185".replace(/\D+/g, ""));
new Vector4();
new Vector3();
new Vector3();
new Vector4();
new Vector4();
new Vector4();
new Vector3();
new Matrix4();
new Line3();
new Vector3();
new Box3();
new Sphere();
new Vector4();
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-CRHASVN5.mjs
function s$1(t, { path: r }) {
	return useLoader(ie, t, (u) => u.setPath(r));
}
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-6MX7M6OR.mjs
function v$2(e = !0, t = .1, r = "0px") {
	let [i, u] = (0, import_react.useState)(!e), n = (0, import_react.useRef)(null);
	return (0, import_react.useEffect)(() => {
		if (!e) return;
		let s = new IntersectionObserver(([c]) => {
			u(c.isIntersecting);
		}, {
			threshold: t,
			rootMargin: r
		});
		return n.current && s.observe(n.current), () => s.disconnect();
	}, [
		e,
		t,
		r
	]), {
		isInView: i,
		containerRef: n
	};
}
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-O3EDKAOT.mjs
var v$1 = (0, import_react.createContext)({}), N$2 = () => (0, import_react.useContext)(v$1);
function V$2({ children: C, style: u = {}, pixelDensity: n = 1, fov: a = 45, pointerEvents: c, className: f, envBasePath: o, lazyLoad: s = !0, threshold: p = .1, rootMargin: m = "0px", preserveDrawingBuffer: x, powerPreference: S }) {
	let { isInView: g, containerRef: l } = v$2(s, p, m), E = (0, import_react.useMemo)(() => ({ envBasePath: o }), [o]);
	return b$2(), (0, import_jsx_runtime.jsx)("div", {
		ref: l,
		style: w$2({
			width: "100%",
			height: "100%"
		}, u),
		children: (!s || g) && (0, import_jsx_runtime.jsx)(v$1.Provider, {
			value: E,
			children: (0, import_jsx_runtime.jsx)(Canvas, x$3(w$2({
				id: "gradientCanvas",
				style: { pointerEvents: c },
				resize: { offsetSize: !0 },
				className: f
			}, r$1(n, a, {
				preserveDrawingBuffer: x,
				powerPreference: S
			})), { children: C }), n + a)
		})
	});
}
function b$2() {
	(0, import_react.useEffect)(() => {
		ShaderChunk.uv2_pars_vertex = "", ShaderChunk.uv2_vertex = "", ShaderChunk.uv2_pars_fragment = "", ShaderChunk.encodings_fragment = "";
	}, []);
}
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-V6TQH2YK.mjs
var y$1 = (e) => e.current && e.current.isScene, v = (e) => y$1(e) ? e.current : e;
function B$1({ background: e = !1, envPreset: i }) {
	let { envBasePath: u } = N$2(), r = u || "https://ruucm.github.io/shadergradient/ui@0.0.0/assets/hdr/", n = {
		city: s$1("city.hdr", { path: r }),
		dawn: s$1("dawn.hdr", { path: r }),
		lobby: s$1("lobby.hdr", { path: r })
	}[i], a = useThree((t) => t.scene);
	import_react.useLayoutEffect(() => {
		if (n) {
			let t = v(a);
			t.background;
			let b = t.environment;
			return e !== "only" && (t.environment = n), e && (t.background = n), () => {
				e !== "only" && (t.environment = b), e && (t.background = "black");
			};
		}
	}, [
		a,
		n,
		e
	]);
	let p = n;
	return p.mapping = 303, null;
}
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-R5BBYD62.mjs
function p({ lightType: t, brightness: e, envPreset: o }) {
	return (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [t === "3d" && (0, import_jsx_runtime.jsx)("ambientLight", { intensity: (e || 1) * Math.PI }), t === "env" && (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: (0, import_jsx_runtime.jsx)(a$2, {}),
		children: (0, import_jsx_runtime.jsx)(B$1, {
			envPreset: o,
			background: !1,
			loadingCallback: () => {}
		})
	})] });
}
function a$2() {
	return (0, import_jsx_runtime.jsx)("ambientLight", { intensity: .4 });
}
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-OM36AWEE.mjs
function b$1(r, e) {
	let n = useThree((t) => t.pointer), [c] = import_react.useState(() => {
		let t = new Raycaster();
		return e && applyProps(t, e, {}), function(p, s) {
			t.setFromCamera(n, r instanceof Camera ? r : r.current);
			let a = this.constructor.prototype.raycast.bind(this);
			a && a(t, s);
		};
	});
	return c;
}
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-VL2CUAE4.mjs
function d(n, m, T) {
	let { gl: c, size: p, viewport: u } = useThree(), o = typeof n == "number" ? n : p.width * u.dpr, a = typeof m == "number" ? m : p.height * u.dpr, g = (typeof n == "number" ? T : n) || {}, { samples: r } = g, f = y$5(g, ["samples"]), s = import_react.useMemo(() => {
		let i;
		return i = new WebGLRenderTarget(o, a, w$2({
			minFilter: LinearFilter,
			magFilter: LinearFilter,
			encoding: c.outputEncoding,
			type: HalfFloatType
		}, f)), i.samples = r, i;
	}, []);
	return import_react.useLayoutEffect(() => {
		s.setSize(o, a), r && (s.samples = r);
	}, [
		r,
		s,
		o,
		a
	]), import_react.useEffect(() => () => s.dispose(), []), s;
}
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-GXQ2EBSK.mjs
function t$3(e, n) {
	if (typeof e == "function") return e(n);
	e && (e.current = n);
}
function u(e) {
	return (n) => {
		for (let f of e) t$3(f, n);
	};
}
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-ST3I7JZX.mjs
var F = (a) => typeof a == "function", N$1 = import_react.forwardRef((v, H) => {
	var R = v, { envMap: a, resolution: x = 256, frames: s = Infinity, children: n, makeDefault: l } = R, c = y$5(R, [
		"envMap",
		"resolution",
		"frames",
		"children",
		"makeDefault"
	]);
	let u$3 = useThree(({ set: e }) => e), O = useThree(({ camera: e }) => e), o = useThree(({ size: e }) => e), t = import_react.useRef(null), i = import_react.useRef(null), p = d(x);
	import_react.useLayoutEffect(() => {
		c.manual || t.current.updateProjectionMatrix();
	}, [o, c]), import_react.useLayoutEffect(() => {
		t.current.updateProjectionMatrix();
	}), import_react.useLayoutEffect(() => {
		if (l) {
			let e = O;
			return u$3(() => ({ camera: t.current })), () => u$3(() => ({ camera: e }));
		}
	}, [
		t,
		l,
		u$3
	]);
	let g = 0, h = null, m = F(n);
	return useFrame((e) => {
		m && (s === Infinity || g < s) && (i.current.visible = !1, e.gl.setRenderTarget(p), h = e.scene.background, a && (e.scene.background = a), e.gl.render(e.scene, t.current), e.scene.background = h, e.gl.setRenderTarget(null), i.current.visible = !0, g++);
	}), (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(0, import_jsx_runtime.jsx)("orthographicCamera", x$3(w$2({
		left: o.width / -2,
		right: o.width / 2,
		top: o.height / 2,
		bottom: o.height / -2,
		ref: u([t, H])
	}, c), { children: !m && n })), (0, import_jsx_runtime.jsx)("group", {
		ref: i,
		children: m && n(p.texture)
	})] });
});
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-HHLYZM5K.mjs
var I = import_react.createContext({}), pt = () => import_react.useContext(I), N = 2 * Math.PI, O = new Object3D(), q = new Matrix4(), [a$1, b] = [new Quaternion(), new Quaternion()], S = new Vector3(), T = new Vector3(), Z = (n) => "minPolarAngle" in n, lt = ({ alignment: n = "bottom-right", margin: M = [80, 80], renderPriority: W = 0, autoClear: Q = !0, onUpdate: h, onTarget: s, children: A }) => {
	let i = useThree(({ size: e }) => e), r = useThree(({ camera: e }) => e), o = useThree(({ controls: e }) => e), f = useThree(({ gl: e }) => e), u = useThree(({ scene: e }) => e), d = useThree(({ invalidate: e }) => e), p = import_react.useRef(), C = import_react.useRef(), l = import_react.useRef(null), [R] = import_react.useState(() => new Scene()), y = import_react.useRef(!1), g = import_react.useRef(0), x = import_react.useRef(new Vector3(0, 0, 0)), w = import_react.useRef(new Vector3(0, 0, 0));
	import_react.useEffect(() => {
		w.current.copy(r.up);
	}, [r]);
	let P = import_react.useCallback((e) => {
		y.current = !0, (o || s) && (x.current = (o == null ? void 0 : o.target) || (s == null ? void 0 : s())), g.current = r.position.distanceTo(S), a$1.copy(r.quaternion), T.copy(e).multiplyScalar(g.current).add(S), O.lookAt(T), b.copy(O.quaternion), d();
	}, [
		o,
		r,
		s,
		d
	]);
	import_react.useEffect(() => (u.background && (p.current = u.background, u.background = null, R.background = p.current), () => {
		p.current && (u.background = p.current);
	}), []), useFrame((e, U) => {
		var G;
		if (l.current && C.current) {
			if (y.current) if (a$1.angleTo(b) < .01) y.current = !1, Z(o) && r.up.copy(w.current);
			else {
				let Y = U * N;
				a$1.rotateTowards(b, Y), r.position.set(0, 0, 1).applyQuaternion(a$1).multiplyScalar(g.current).add(x.current), r.up.set(0, 1, 0).applyQuaternion(a$1).normalize(), r.quaternion.copy(a$1), h ? h() : o && o.update(), d();
			}
			q.copy(r.matrix).invert(), (G = C.current) == null || G.quaternion.setFromRotationMatrix(q), Q && (f.autoClear = !1), f.clearDepth(), f.render(R, l.current);
		}
	}, W);
	let D = b$1(l), F = import_react.useMemo(() => ({
		tweenCamera: P,
		raycast: D
	}), [P]), [z, v] = M, X = n.endsWith("-center") ? 0 : n.endsWith("-left") ? -i.width / 2 + z : i.width / 2 - z, J = n.startsWith("center-") ? 0 : n.startsWith("top-") ? i.height / 2 - v : -i.height / 2 + v;
	return createPortal((0, import_jsx_runtime.jsxs)(I.Provider, {
		value: F,
		children: [(0, import_jsx_runtime.jsx)(N$1, {
			ref: l,
			position: [
				0,
				0,
				200
			]
		}), (0, import_jsx_runtime.jsx)("group", {
			ref: C,
			position: [
				X,
				J,
				0
			],
			children: A
		})]
	}), R);
};
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-MNIYBOZ2.mjs
function A({ scale: c = [
	.8,
	.05,
	.05
], color: s, rotation: r }) {
	return (0, import_jsx_runtime.jsx)("group", {
		rotation: r,
		children: (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				.4,
				0,
				0
			],
			children: [(0, import_jsx_runtime.jsx)("boxGeometry", { args: c }), (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				color: s,
				toneMapped: !1
			})]
		})
	});
}
function l(S) {
	var h = S, { onClick: c, font: s, disabled: r, arcStyle: g, label: i, labelColor: d, axisHeadScale: p = 1 } = h, u = y$5(h, [
		"onClick",
		"font",
		"disabled",
		"arcStyle",
		"label",
		"labelColor",
		"axisHeadScale"
	]);
	let f = useThree((o) => o.gl), M = import_react.useMemo(() => {
		let o = document.createElement("canvas");
		o.width = 64, o.height = 64;
		let e = o.getContext("2d");
		return e.beginPath(), e.arc(32, 32, 16, 0, 2 * Math.PI), e.closePath(), e.fillStyle = g, e.fill(), i && (e.font = s, e.textAlign = "center", e.fillStyle = d, e.fillText(i, 32, 41)), new CanvasTexture(o);
	}, [
		g,
		i,
		d,
		s
	]), [P, a] = import_react.useState(!1);
	return (0, import_jsx_runtime.jsx)("sprite", x$3(w$2({
		scale: (i ? 1 : .75) * (P ? 1.2 : 1) * p,
		onPointerOver: r ? void 0 : (o) => {
			o.stopPropagation(), a(!0);
		},
		onPointerOut: r ? void 0 : c || ((o) => {
			o.stopPropagation(), a(!1);
		})
	}, u), { children: (0, import_jsx_runtime.jsx)("spriteMaterial", {
		map: M,
		"map-encoding": f.outputEncoding,
		"map-anisotropy": f.capabilities.getMaxAnisotropy() || 1,
		alphaTest: .3,
		opacity: i ? 1 : .75,
		toneMapped: !1
	}) }));
}
var V = (M) => {
	var P = M, { hideNegativeAxes: c, hideAxisHeads: s, disabled: r, font: g = "18px Inter var, Arial, sans-serif", axisColors: i = [
		"#ff2060",
		"#20df80",
		"#2080ff"
	], axisHeadScale: d = 1, axisScale: p, labels: u = [
		"X",
		"Y",
		"Z"
	], labelColor: S = "#000", onClick: h } = P, f = y$5(P, [
		"hideNegativeAxes",
		"hideAxisHeads",
		"disabled",
		"font",
		"axisColors",
		"axisHeadScale",
		"axisScale",
		"labels",
		"labelColor",
		"onClick"
	]);
	let [a, m, v] = i, { tweenCamera: T, raycast: o } = pt(), e = {
		font: g,
		disabled: r,
		labelColor: S,
		raycast: o,
		onClick: h,
		axisHeadScale: d,
		onPointerDown: r ? void 0 : (C) => {
			T(C.object.position), C.stopPropagation();
		}
	};
	return (0, import_jsx_runtime.jsxs)("group", x$3(w$2({ scale: 40 }, f), { children: [
		(0, import_jsx_runtime.jsx)(A, {
			color: a,
			rotation: [
				0,
				0,
				0
			],
			scale: p
		}),
		(0, import_jsx_runtime.jsx)(A, {
			color: m,
			rotation: [
				0,
				0,
				Math.PI / 2
			],
			scale: p
		}),
		(0, import_jsx_runtime.jsx)(A, {
			color: v,
			rotation: [
				0,
				-Math.PI / 2,
				0
			],
			scale: p
		}),
		!s && (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			(0, import_jsx_runtime.jsx)(l, w$2({
				arcStyle: a,
				position: [
					1,
					0,
					0
				],
				label: u[0]
			}, e)),
			(0, import_jsx_runtime.jsx)(l, w$2({
				arcStyle: m,
				position: [
					0,
					1,
					0
				],
				label: u[1]
			}, e)),
			(0, import_jsx_runtime.jsx)(l, w$2({
				arcStyle: v,
				position: [
					0,
					0,
					1
				],
				label: u[2]
			}, e)),
			!c && (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				(0, import_jsx_runtime.jsx)(l, w$2({
					arcStyle: a,
					position: [
						-1,
						0,
						0
					]
				}, e)),
				(0, import_jsx_runtime.jsx)(l, w$2({
					arcStyle: m,
					position: [
						0,
						-1,
						0
					]
				}, e)),
				(0, import_jsx_runtime.jsx)(l, w$2({
					arcStyle: v,
					position: [
						0,
						0,
						-1
					]
				}, e))
			] })
		] }),
		(0, import_jsx_runtime.jsx)("ambientLight", { intensity: .5 }),
		(0, import_jsx_runtime.jsx)("pointLight", {
			position: [
				10,
				10,
				10
			],
			intensity: .5
		})
	] }));
};
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-4UW34ZH3.mjs
function a({ margin: o = [65, 110] }) {
	return (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: (0, import_jsx_runtime.jsx)(lt, {
		alignment: "bottom-right",
		margin: o,
		renderPriority: 2,
		children: (0, import_jsx_runtime.jsx)(V, {
			axisColors: [
				"#FF430A",
				"#FF430A",
				"#FF430A"
			],
			labelColor: "white",
			hideNegativeAxes: !0,
			axisHeadScale: .8
		})
	}) });
}
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-PMGWUTR2.mjs
var e = {
	halo: {
		title: "Halo",
		color: "white",
		props: {
			type: "plane",
			uAmplitude: 1,
			uDensity: 1.3,
			uSpeed: .4,
			uStrength: 4,
			uTime: 0,
			uFrequency: 5.5,
			range: "disabled",
			rangeStart: 0,
			rangeEnd: 40,
			frameRate: 10,
			destination: "onCanvas",
			format: "gif",
			axesHelper: "off",
			brightness: 1.2,
			cAzimuthAngle: 180,
			cDistance: 3.6,
			cPolarAngle: 90,
			cameraZoom: 1,
			color1: "#ff5005",
			color2: "#dbba95",
			color3: "#d0bce1",
			embedMode: "off",
			envPreset: "city",
			gizmoHelper: "hide",
			grain: "on",
			lightType: "3d",
			pixelDensity: 1,
			fov: 45,
			positionX: -1.4,
			positionY: 0,
			positionZ: 0,
			reflection: .1,
			rotationX: 0,
			rotationY: 10,
			rotationZ: 50,
			shader: "defaults",
			animate: "on",
			wireframe: !1
		}
	},
	pensive: {
		title: "Pensive",
		color: "white",
		props: {
			range: "disabled",
			rangeStart: 0,
			rangeEnd: 40,
			frameRate: 10,
			destination: "onCanvas",
			format: "gif",
			animate: "on",
			axesHelper: "off",
			brightness: 1.5,
			cAzimuthAngle: 250,
			cDistance: 1.5,
			cPolarAngle: 140,
			cameraZoom: 12.5,
			color1: "#809bd6",
			color2: "#910aff",
			color3: "#af38ff",
			embedMode: "off",
			envPreset: "city",
			gizmoHelper: "hide",
			grain: "on",
			lightType: "3d",
			pixelDensity: 1,
			fov: 45,
			positionX: 0,
			positionY: 0,
			positionZ: 0,
			reflection: .5,
			rotationX: 0,
			rotationY: 0,
			rotationZ: 140,
			shader: "defaults",
			type: "sphere",
			uAmplitude: 7,
			uDensity: .8,
			uFrequency: 5.5,
			uSpeed: .3,
			uStrength: .4,
			uTime: 0,
			wireframe: !1
		}
	},
	mint: {
		title: "Mint",
		color: "white",
		props: {
			range: "disabled",
			rangeStart: 0,
			rangeEnd: 40,
			frameRate: 10,
			destination: "onCanvas",
			format: "gif",
			animate: "on",
			axesHelper: "off",
			brightness: 1.2,
			cAzimuthAngle: 170,
			cDistance: 4.4,
			cPolarAngle: 70,
			cameraZoom: 1,
			color1: "#94ffd1",
			color2: "#6bf5ff",
			color3: "#ffffff",
			embedMode: "off",
			envPreset: "city",
			gizmoHelper: "hide",
			grain: "off",
			lightType: "3d",
			pixelDensity: 1,
			fov: 45,
			positionX: 0,
			positionY: .9,
			positionZ: -.3,
			reflection: .1,
			rotationX: 45,
			rotationY: 0,
			rotationZ: 0,
			shader: "defaults",
			type: "waterPlane",
			uAmplitude: 0,
			uDensity: 1.2,
			uFrequency: 0,
			uSpeed: .2,
			uStrength: 3.4,
			uTime: 0,
			wireframe: !1
		}
	},
	interstella: {
		title: "Interstella",
		color: "white",
		props: {
			range: "disabled",
			rangeStart: 0,
			rangeEnd: 40,
			frameRate: 10,
			destination: "onCanvas",
			format: "gif",
			animate: "on",
			axesHelper: "off",
			brightness: .8,
			cAzimuthAngle: 270,
			cDistance: .5,
			cPolarAngle: 180,
			cameraZoom: 15.1,
			color1: "#73bfc4",
			color2: "#ff810a",
			color3: "#8da0ce",
			embedMode: "off",
			envPreset: "city",
			gizmoHelper: "hide",
			grain: "on",
			lightType: "env",
			pixelDensity: 1,
			fov: 45,
			positionX: -.1,
			positionY: 0,
			positionZ: 0,
			reflection: .4,
			rotationX: 0,
			rotationY: 130,
			rotationZ: 70,
			shader: "defaults",
			type: "sphere",
			uAmplitude: 3.2,
			uDensity: .8,
			uFrequency: 5.5,
			uSpeed: .3,
			uStrength: .3,
			uTime: 0,
			wireframe: !1
		}
	},
	nightyNight: {
		title: "Nighty night",
		color: "white",
		props: {
			range: "disabled",
			rangeStart: 0,
			rangeEnd: 40,
			frameRate: 10,
			destination: "onCanvas",
			format: "gif",
			animate: "on",
			axesHelper: "off",
			brightness: 1,
			cAzimuthAngle: 180,
			cDistance: 2.8,
			cPolarAngle: 80,
			cameraZoom: 9.1,
			color1: "#606080",
			color2: "#8d7dca",
			color3: "#212121",
			embedMode: "off",
			envPreset: "city",
			gizmoHelper: "hide",
			grain: "on",
			lightType: "3d",
			pixelDensity: 1,
			fov: 45,
			positionX: 0,
			positionY: 0,
			positionZ: 0,
			reflection: .1,
			rotationX: 50,
			rotationY: 0,
			rotationZ: -60,
			shader: "defaults",
			type: "waterPlane",
			uAmplitude: 0,
			uDensity: 1.5,
			uFrequency: 0,
			uSpeed: .3,
			uStrength: 1.5,
			uTime: 8,
			wireframe: !1
		}
	},
	violaOrientalis: {
		title: "Viola",
		color: "white",
		props: {
			range: "disabled",
			rangeStart: 0,
			rangeEnd: 40,
			frameRate: 10,
			destination: "onCanvas",
			format: "gif",
			animate: "on",
			axesHelper: "on",
			brightness: 1.1,
			cAzimuthAngle: 0,
			cDistance: 7.1,
			cPolarAngle: 140,
			cameraZoom: 17.3,
			color1: "#ffffff",
			color2: "#ffbb00",
			color3: "#0700ff",
			embedMode: "off",
			envPreset: "city",
			grain: "off",
			lightType: "3d",
			pixelDensity: 1,
			fov: 45,
			positionX: 0,
			positionY: 0,
			positionZ: 0,
			reflection: .1,
			rotationX: 0,
			rotationY: 0,
			rotationZ: 0,
			shader: "defaults",
			type: "sphere",
			uAmplitude: 1.4,
			uDensity: 1.1,
			uSpeed: .1,
			uStrength: 1,
			uTime: 0,
			uFrequency: 5.5,
			wireframe: !1
		}
	},
	universe: {
		title: "Universe",
		color: "white",
		props: {
			range: "disabled",
			rangeStart: 0,
			rangeEnd: 40,
			frameRate: 10,
			destination: "onCanvas",
			format: "gif",
			animate: "on",
			axesHelper: "on",
			brightness: 1.1,
			cAzimuthAngle: 180,
			cDistance: 3.9,
			cPolarAngle: 115,
			cameraZoom: 1,
			color1: "#5606ff",
			color2: "#fe8989",
			color3: "#000000",
			embedMode: "off",
			envPreset: "city",
			grain: "off",
			lightType: "3d",
			pixelDensity: 1,
			fov: 45,
			positionX: -.5,
			positionY: .1,
			positionZ: 0,
			reflection: .1,
			rotationX: 0,
			rotationY: 0,
			rotationZ: 235,
			shader: "defaults",
			type: "waterPlane",
			uAmplitude: 0,
			uDensity: 1.1,
			uSpeed: .1,
			uStrength: 2.4,
			uTime: .2,
			uFrequency: 5.5,
			wireframe: !1
		}
	},
	sunset: {
		title: "Sunset",
		color: "white",
		props: {
			range: "disabled",
			rangeStart: 0,
			rangeEnd: 40,
			frameRate: 10,
			destination: "onCanvas",
			format: "gif",
			animate: "on",
			axesHelper: "on",
			bgColor1: "#000000",
			bgColor2: "#000000",
			brightness: 1.5,
			cAzimuthAngle: 60,
			cDistance: 7.1,
			cPolarAngle: 90,
			cameraZoom: 15.3,
			color1: "#ff7a33",
			color2: "#33a0ff",
			color3: "#ffc53d",
			embedMode: "off",
			envPreset: "dawn",
			grain: "off",
			lightType: "3d",
			pixelDensity: 1,
			fov: 45,
			positionX: 0,
			positionY: -.15,
			positionZ: 0,
			reflection: .1,
			rotationX: 0,
			rotationY: 0,
			rotationZ: 0,
			shader: "defaults",
			type: "sphere",
			uAmplitude: 1.4,
			uDensity: 1.1,
			uSpeed: .1,
			uStrength: .4,
			uTime: 0,
			uFrequency: 5.5,
			wireframe: !1
		}
	},
	mandarin: {
		title: "Mandarin",
		color: "white",
		props: {
			range: "disabled",
			rangeStart: 0,
			rangeEnd: 40,
			frameRate: 10,
			destination: "onCanvas",
			format: "gif",
			animate: "on",
			axesHelper: "on",
			bgColor1: "#000000",
			bgColor2: "#000000",
			brightness: 1.2,
			cAzimuthAngle: 180,
			cDistance: 2.4,
			cPolarAngle: 95,
			cameraZoom: 1,
			color1: "#ff6a1a",
			color2: "#c73c00",
			color3: "#FD4912",
			embedMode: "off",
			envPreset: "city",
			grain: "off",
			lightType: "3d",
			pixelDensity: 1,
			fov: 45,
			positionX: 0,
			positionY: -2.1,
			positionZ: 0,
			reflection: .1,
			rotationX: 0,
			rotationY: 0,
			rotationZ: 225,
			shader: "defaults",
			type: "waterPlane",
			uAmplitude: 0,
			uDensity: 1.8,
			uSpeed: .2,
			uStrength: 3,
			uTime: .2,
			uFrequency: 5.5,
			wireframe: !1
		}
	},
	cottonCandy: {
		title: "Cotton Candy",
		color: "white",
		props: {
			range: "disabled",
			rangeStart: 0,
			rangeEnd: 40,
			frameRate: 10,
			destination: "onCanvas",
			format: "gif",
			animate: "on",
			axesHelper: "off",
			brightness: 1.2,
			cAzimuthAngle: 180,
			cDistance: 2.9,
			cPolarAngle: 120,
			cameraZoom: 1,
			color1: "#ebedff",
			color2: "#f3f2f8",
			color3: "#dbf8ff",
			embedMode: "off",
			envPreset: "city",
			grain: "off",
			lightType: "3d",
			pixelDensity: 1,
			fov: 45,
			positionX: 0,
			positionY: 1.8,
			positionZ: 0,
			reflection: .1,
			rotationX: 0,
			rotationY: 0,
			rotationZ: -90,
			shader: "defaults",
			type: "waterPlane",
			uAmplitude: 0,
			uDensity: 1,
			uSpeed: .3,
			uStrength: 3,
			uTime: .2,
			uFrequency: 5.5,
			wireframe: !1
		}
	}
};
Object.values(e);
//#endregion
//#region node_modules/@shadergradient/react/dist/chunk-KLJOXLT7.mjs
var U = z$1((dr, w) => {
	"use strict";
	w.exports = (r) => encodeURIComponent(r).replace(/[!'()*]/g, (e) => `%${e.charCodeAt(0).toString(16).toUpperCase()}`);
});
var D = z$1((or, T) => {
	"use strict";
	var q = "%[a-f0-9]{2}", $ = new RegExp("(" + q + ")|([^%]+?)", "gi"), I = new RegExp("(" + q + ")+", "gi");
	function h(r, e) {
		try {
			return [decodeURIComponent(r.join(""))];
		} catch (a) {}
		if (r.length === 1) return r;
		e = e || 1;
		var t = r.slice(0, e), n = r.slice(e);
		return Array.prototype.concat.call([], h(t), h(n));
	}
	function Z(r) {
		try {
			return decodeURIComponent(r);
		} catch (n) {
			for (var e = r.match($) || [], t = 1; t < e.length; t++) r = h(e, t).join(""), e = r.match($) || [];
			return r;
		}
	}
	function k(r) {
		for (var e = {
			"%FE%FF": "��",
			"%FF%FE": "��"
		}, t = I.exec(r); t;) {
			try {
				e[t[0]] = decodeURIComponent(t[0]);
			} catch (i) {
				var n = Z(t[0]);
				n !== t[0] && (e[t[0]] = n);
			}
			t = I.exec(r);
		}
		e["%C2"] = "�";
		for (var a = Object.keys(e), s = 0; s < a.length; s++) {
			var f = a[s];
			r = r.replace(new RegExp(f, "g"), e[f]);
		}
		return r;
	}
	T.exports = function(r) {
		if (typeof r != "string") throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof r + "`");
		try {
			return r = r.replace(/\+/g, " "), decodeURIComponent(r);
		} catch (e) {
			return k(r);
		}
	};
});
var B = z$1((mr, R) => {
	"use strict";
	R.exports = (r, e) => {
		if (!(typeof r == "string" && typeof e == "string")) throw new TypeError("Expected the arguments to be of type `string`");
		if (e === "") return [r];
		let t = r.indexOf(e);
		return t === -1 ? [r] : [r.slice(0, t), r.slice(t + e.length)];
	};
});
var M = z$1((ur, L) => {
	"use strict";
	L.exports = function(r, e) {
		for (var t = {}, n = Object.keys(r), a = Array.isArray(e), s = 0; s < n.length; s++) {
			var f = n[s], i = r[f];
			(a ? e.indexOf(f) !== -1 : e(f, i, r)) && (t[f] = i);
		}
		return t;
	};
});
var K = B$3(z$1((d) => {
	"use strict";
	var v = U(), rr = D(), V = B(), er = M(), tr = (r) => r == null, y = Symbol("encodeFragmentIdentifier");
	function nr(r) {
		switch (r.arrayFormat) {
			case "index": return (e) => (t, n) => {
				let a = t.length;
				return n === void 0 || r.skipNull && n === null || r.skipEmptyString && n === "" ? t : n === null ? [...t, [
					c(e, r),
					"[",
					a,
					"]"
				].join("")] : [...t, [
					c(e, r),
					"[",
					c(a, r),
					"]=",
					c(n, r)
				].join("")];
			};
			case "bracket": return (e) => (t, n) => n === void 0 || r.skipNull && n === null || r.skipEmptyString && n === "" ? t : n === null ? [...t, [c(e, r), "[]"].join("")] : [...t, [
				c(e, r),
				"[]=",
				c(n, r)
			].join("")];
			case "colon-list-separator": return (e) => (t, n) => n === void 0 || r.skipNull && n === null || r.skipEmptyString && n === "" ? t : n === null ? [...t, [c(e, r), ":list="].join("")] : [...t, [
				c(e, r),
				":list=",
				c(n, r)
			].join("")];
			case "comma":
			case "separator":
			case "bracket-separator": {
				let e = r.arrayFormat === "bracket-separator" ? "[]=" : "=";
				return (t) => (n, a) => a === void 0 || r.skipNull && a === null || r.skipEmptyString && a === "" ? n : (a = a === null ? "" : a, n.length === 0 ? [[
					c(t, r),
					e,
					c(a, r)
				].join("")] : [[n, c(a, r)].join(r.arrayFormatSeparator)]);
			}
			default: return (e) => (t, n) => n === void 0 || r.skipNull && n === null || r.skipEmptyString && n === "" ? t : n === null ? [...t, c(e, r)] : [...t, [
				c(e, r),
				"=",
				c(n, r)
			].join("")];
		}
	}
	function ar(r) {
		let e;
		switch (r.arrayFormat) {
			case "index": return (t, n, a) => {
				if (e = /\[(\d*)\]$/.exec(t), t = t.replace(/\[\d*\]$/, ""), !e) {
					a[t] = n;
					return;
				}
				a[t] === void 0 && (a[t] = {}), a[t][e[1]] = n;
			};
			case "bracket": return (t, n, a) => {
				if (e = /(\[\])$/.exec(t), t = t.replace(/\[\]$/, ""), !e) {
					a[t] = n;
					return;
				}
				if (a[t] === void 0) {
					a[t] = [n];
					return;
				}
				a[t] = [].concat(a[t], n);
			};
			case "colon-list-separator": return (t, n, a) => {
				if (e = /(:list)$/.exec(t), t = t.replace(/:list$/, ""), !e) {
					a[t] = n;
					return;
				}
				if (a[t] === void 0) {
					a[t] = [n];
					return;
				}
				a[t] = [].concat(a[t], n);
			};
			case "comma":
			case "separator": return (t, n, a) => {
				let s = typeof n == "string" && n.includes(r.arrayFormatSeparator), f = typeof n == "string" && !s && o(n, r).includes(r.arrayFormatSeparator);
				n = f ? o(n, r) : n;
				a[t] = s || f ? n.split(r.arrayFormatSeparator).map((l) => o(l, r)) : n === null ? n : o(n, r);
			};
			case "bracket-separator": return (t, n, a) => {
				let s = /(\[\])$/.test(t);
				if (t = t.replace(/\[\]$/, ""), !s) {
					a[t] = n && o(n, r);
					return;
				}
				let f = n === null ? [] : n.split(r.arrayFormatSeparator).map((i) => o(i, r));
				if (a[t] === void 0) {
					a[t] = f;
					return;
				}
				a[t] = [].concat(a[t], f);
			};
			default: return (t, n, a) => {
				if (a[t] === void 0) {
					a[t] = n;
					return;
				}
				a[t] = [].concat(a[t], n);
			};
		}
	}
	function G(r) {
		if (typeof r != "string" || r.length !== 1) throw new TypeError("arrayFormatSeparator must be single character string");
	}
	function c(r, e) {
		return e.encode ? e.strict ? v(r) : encodeURIComponent(r) : r;
	}
	function o(r, e) {
		return e.decode ? rr(r) : r;
	}
	function H(r) {
		return Array.isArray(r) ? r.sort() : typeof r == "object" ? H(Object.keys(r)).sort((e, t) => Number(e) - Number(t)).map((e) => r[e]) : r;
	}
	function Q(r) {
		let e = r.indexOf("#");
		return e !== -1 && (r = r.slice(0, e)), r;
	}
	function fr(r) {
		let e = "", t = r.indexOf("#");
		return t !== -1 && (e = r.slice(t)), e;
	}
	function _(r) {
		r = Q(r);
		let e = r.indexOf("?");
		return e === -1 ? "" : r.slice(e + 1);
	}
	function P(r, e) {
		return e.parseNumbers && !Number.isNaN(Number(r)) && typeof r == "string" && r.trim() !== "" ? r = Number(r) : e.parseBooleans && r !== null && (r.toLowerCase() === "true" || r.toLowerCase() === "false") && (r = r.toLowerCase() === "true"), r;
	}
	function z(r, e) {
		e = Object.assign({
			decode: !0,
			sort: !0,
			arrayFormat: "none",
			arrayFormatSeparator: ",",
			parseNumbers: !1,
			parseBooleans: !1
		}, e), G(e.arrayFormatSeparator);
		let t = ar(e), n = Object.create(null);
		if (typeof r != "string" || (r = r.trim().replace(/^[?#&]/, ""), !r)) return n;
		for (let a of r.split("&")) {
			if (a === "") continue;
			let [s, f] = V(e.decode ? a.replace(/\+/g, " ") : a, "=");
			f = f === void 0 ? null : [
				"comma",
				"separator",
				"bracket-separator"
			].includes(e.arrayFormat) ? f : o(f, e), t(o(s, e), f, n);
		}
		for (let a of Object.keys(n)) {
			let s = n[a];
			if (typeof s == "object" && s !== null) for (let f of Object.keys(s)) s[f] = P(s[f], e);
			else n[a] = P(s, e);
		}
		return e.sort === !1 ? n : (e.sort === !0 ? Object.keys(n).sort() : Object.keys(n).sort(e.sort)).reduce((a, s) => {
			let f = n[s];
			return f && typeof f == "object" && !Array.isArray(f) ? a[s] = H(f) : a[s] = f, a;
		}, Object.create(null));
	}
	d.extract = _;
	d.parse = z;
	d.stringify = (r, e) => {
		if (!r) return "";
		e = Object.assign({
			encode: !0,
			strict: !0,
			arrayFormat: "none",
			arrayFormatSeparator: ","
		}, e), G(e.arrayFormatSeparator);
		let t = (f) => e.skipNull && tr(r[f]) || e.skipEmptyString && r[f] === "", n = nr(e), a = {};
		for (let f of Object.keys(r)) t(f) || (a[f] = r[f]);
		let s = Object.keys(a);
		return e.sort !== !1 && s.sort(e.sort), s.map((f) => {
			let i = r[f];
			return i === void 0 ? "" : i === null ? c(f, e) : Array.isArray(i) ? i.length === 0 && e.arrayFormat === "bracket-separator" ? c(f, e) + "[]" : i.reduce(n(f), []).join("&") : c(f, e) + "=" + c(i, e);
		}).filter((f) => f.length > 0).join("&");
	};
	d.parseUrl = (r, e) => {
		e = Object.assign({ decode: !0 }, e);
		let [t, n] = V(r, "#");
		return Object.assign({
			url: t.split("?")[0] || "",
			query: z(_(r), e)
		}, e && e.parseFragmentIdentifier && n ? { fragmentIdentifier: o(n, e) } : {});
	};
	d.stringifyUrl = (r, e) => {
		e = Object.assign({
			encode: !0,
			strict: !0,
			[y]: !0
		}, e);
		let t = Q(r.url).split("?")[0] || "", n = d.extract(r.url), a = d.parse(n, { sort: !1 }), s = Object.assign(a, r.query), f = d.stringify(s, e);
		f && (f = `?${f}`);
		let i = fr(r.url);
		return r.fragmentIdentifier && (i = `#${e[y] ? c(r.fragmentIdentifier, e) : r.fragmentIdentifier}`), `${t}${f}${i}`;
	};
	d.pick = (r, e, t) => {
		t = Object.assign({
			parseFragmentIdentifier: !0,
			[y]: !1
		}, t);
		let { url: n, query: a, fragmentIdentifier: s } = d.parseUrl(r, t);
		return d.stringifyUrl({
			url: n,
			query: er(a, e),
			fragmentIdentifier: s
		}, t);
	};
	d.exclude = (r, e, t) => {
		let n = Array.isArray(e) ? (a) => !e.includes(a) : (a, s) => !e(a, s);
		return d.pick(r, n, t);
	};
})());
function Sr(r) {
	let p$8 = w$2(w$2({}, e.halo.props), r), { control: e$17, urlString: t, onCameraUpdate: n } = p$8, s = y$5(p$8, [
		"control",
		"urlString",
		"onCameraUpdate"
	]);
	e$17 === "query" && (s = K.parse(I$4(t), {
		parseNumbers: !0,
		parseBooleans: !0,
		arrayFormat: "index"
	}));
	let b = s, { lightType: f, envPreset: i, brightness: l, grain: W, toggleAxis: X } = b;
	y$5(b, [
		"lightType",
		"envPreset",
		"brightness",
		"grain",
		"toggleAxis"
	]);
	return (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		(0, import_jsx_runtime.jsx)(J$2, w$2({}, s)),
		(0, import_jsx_runtime.jsx)(p, {
			lightType: f,
			brightness: l,
			envPreset: i
		}),
		W !== "off" && (0, import_jsx_runtime.jsx)(k$2, {}),
		X && (0, import_jsx_runtime.jsx)(a, {}),
		(0, import_jsx_runtime.jsx)(l$1, x$3(w$2({}, s), { onCameraUpdate: n }))
	] });
}
//#endregion
export { V$2 as n, Sr as t };
