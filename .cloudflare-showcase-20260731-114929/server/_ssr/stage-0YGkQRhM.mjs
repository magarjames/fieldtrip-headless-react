import { i as __toESM } from "../_runtime.mjs";
import { h as require_react, m as require_jsx_runtime, o as Canvas } from "../_libs/@react-three/drei+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stage-0YGkQRhM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Shared GL scaffolding for the /w versions.
*
* Every version mounts its own Canvas through <Stage>, which enforces the same
* three rules in one place: never render GL during SSR, never render GL when
* the visitor asked for reduced motion, and never hold a WebGL context on a
* page that has scrolled far past the canvas.
*/
/** SSR-safe reduced-motion read. False on the server and on first paint. */
function useReducedMotion() {
	const [reduced, setReduced] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		setReduced(mq.matches);
		const on = () => setReduced(mq.matches);
		mq.addEventListener("change", on);
		return () => mq.removeEventListener("change", on);
	}, []);
	return reduced;
}
/** true once mounted on the client */
function useMounted() {
	const [m, setM] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setM(true), []);
	return m;
}
/**
* Both react-three-fiber and shadergradient size their canvas from a
* ResizeObserver on the container. The spec says observing an element fires an
* initial callback; some embedded webviews never do, and the canvas is then
* stranded at its intrinsic 300x150 until something else triggers a resize.
*
* One dispatched resize on the frame after mount costs nothing in a compliant
* browser (the measurement is already correct and recomputing is idempotent)
* and rescues the canvas in one that is not.
*/
function useResizeKick() {
	(0, import_react.useEffect)(() => {
		const fire = () => window.dispatchEvent(new Event("resize"));
		const raf = requestAnimationFrame(fire);
		const t = setTimeout(fire, 250);
		return () => {
			cancelAnimationFrame(raf);
			clearTimeout(t);
		};
	}, []);
}
/**
* Scroll progress as a ref, written once per frame from a passive listener.
* A ref rather than state on purpose: useFrame reads it every frame and state
* would re-render the React tree sixty times a second for nothing.
*/
function useScrollRef() {
	const ref = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		let raf = 0;
		const read = () => {
			const max = document.documentElement.scrollHeight - window.innerHeight;
			ref.current = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
			raf = 0;
		};
		const onScroll = () => {
			if (!raf) raf = requestAnimationFrame(read);
		};
		read();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll, { passive: true });
		return () => {
			if (raf) cancelAnimationFrame(raf);
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, []);
	return ref;
}
function Stage({ children, fallback = null, camera = {
	position: [
		0,
		0,
		6
	],
	fov: 45
}, className = "", dpr = [1, 1.5], antialias = false, shadows = false }) {
	const mounted = useMounted();
	const reduced = useReducedMotion();
	useResizeKick();
	if (!mounted || reduced) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: fallback });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, {
		className,
		dpr,
		camera,
		shadows,
		gl: {
			antialias,
			alpha: true,
			powerPreference: antialias ? "high-performance" : "low-power"
		},
		resize: {
			scroll: false,
			debounce: {
				scroll: 0,
				resize: 0
			}
		},
		children
	});
}
//#endregion
export { useScrollRef as a, useResizeKick as i, useMounted as n, useReducedMotion as r, Stage as t };
