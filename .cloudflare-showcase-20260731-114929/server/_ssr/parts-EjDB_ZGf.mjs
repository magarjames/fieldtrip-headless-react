import { i as __toESM } from "../_runtime.mjs";
import { h as require_react } from "../_libs/@react-three/drei+[...].mjs";
import { a as PIECES, s as SECTIONS } from "./data-CDB2DGpz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/parts-EjDB_ZGf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
/** Shared behaviour for all six versions. The design systems differ; the
*  accessibility floor and the catalogue do not. */
var img = (seed, w, h) => `https://picsum.photos/seed/${seed}/${w}/${h}`;
/** __root.tsx carries the Count Club card as the site-wide default, and a
*  route that only overrides `title` still ships Count Club's description and
*  og:title. These pages are a different brand, so each one states its own. */
var pageMeta = (title, description) => ({ meta: [
	{ title },
	{
		name: "description",
		content: description
	},
	{
		property: "og:title",
		content: title
	},
	{
		property: "og:description",
		content: description
	}
] });
function useReveal(selector = ".rv") {
	(0, import_react.useEffect)(() => {
		const nodes = document.querySelectorAll(selector);
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			nodes.forEach((n) => n.classList.add("in"));
			return;
		}
		const io = new IntersectionObserver((es) => es.forEach((e) => {
			if (e.isIntersecting) {
				e.target.classList.add("in");
				io.unobserve(e.target);
			}
		}), { threshold: .14 });
		nodes.forEach((n) => io.observe(n));
		return () => io.disconnect();
	}, [selector]);
}
/** the catalogue grouped the way every version presents it */
function useGroups(filter = "all") {
	return (0, import_react.useMemo)(() => SECTIONS.map((s) => ({
		...s,
		pieces: PIECES.filter((p) => s.cats.includes(p.category) && (filter === "all" || p.category === filter))
	})).filter((s) => s.pieces.length), [filter]);
}
//#endregion
export { useReveal as i, pageMeta as n, useGroups as r, img as t };
