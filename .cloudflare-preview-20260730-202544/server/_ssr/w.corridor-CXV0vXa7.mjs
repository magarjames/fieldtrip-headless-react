import { i as __toESM } from "../_runtime.mjs";
import { h as require_react, m as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { o as SEASON } from "./data-CDB2DGpz.mjs";
import { i as useReveal } from "./parts-EjDB_ZGf.mjs";
import { r as media, t as SCENES } from "./media-CXWtjMXk.mjs";
import { a as WorldFooter, i as SkipLink, n as LOOKS, o as WorldHeader, r as LookStyle, t as Catalogue } from "./looks-Dicv7kDh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/w.corridor-CXV0vXa7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Corridor() {
	useReveal();
	const look = LOOKS.corridor;
	const [active, setActive] = (0, import_react.useState)(0);
	const [local, setLocal] = (0, import_react.useState)(0);
	const wrap = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		let raf = 0;
		const read = () => {
			const el = wrap.current;
			if (el) {
				const r = el.getBoundingClientRect();
				const total = r.height - window.innerHeight;
				const scaled = (total > 0 ? Math.min(Math.max(-r.top / total, 0), .9999) : 0) * SCENES.length;
				setActive(Math.floor(scaled));
				setLocal(scaled % 1);
			}
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-corridor min-h-dvh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LookStyle, { look }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipLink, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorldHeader, {
				look,
				label: `${SEASON} · Corridor`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: wrap,
				style: { height: `${SCENES.length * 100}vh` },
				className: "relative",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sticky top-0 h-dvh overflow-hidden",
					children: [SCENES.map((s, i) => {
						const on = i === active;
						const scale = on ? 1 + local * .16 : 1;
						const inset = on ? `${(1 - local) * 4}%` : "6%";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
							className: "absolute inset-0 m-0 transition-opacity duration-500",
							style: { opacity: on ? 1 : 0 },
							"aria-hidden": !on,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: media(s.key, 1900, 1200),
								alt: "",
								width: 1900,
								height: 1200,
								className: "h-full w-full object-cover",
								style: {
									transform: `scale(${scale})`,
									clipPath: `inset(${inset} round 0)`,
									filter: "grayscale(0.35) contrast(1.06) brightness(0.72)",
									willChange: on ? "transform" : void 0
								}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-transparent to-[#050505]" })]
						}, s.id);
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-none absolute inset-0 flex items-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto w-full max-w-[var(--shell)] px-5 pb-16 sm:px-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "m-0 text-[0.66rem] uppercase tracking-[0.2em]",
									style: { color: "var(--dim)" },
									children: [
										"Scene ",
										active + 1,
										" of ",
										SCENES.length
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "d mt-3 max-w-[13ch] text-[clamp(2.4rem,8vw,6.4rem)]",
									children: SCENES[active]?.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 max-w-[46ch] text-[1.02rem] leading-[1.6]",
									style: { color: "var(--dim)" },
									children: SCENES[active]?.body
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-7 flex gap-1.5",
									style: { maxWidth: 260 },
									children: SCENES.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "h-[2px] flex-1",
										style: { background: "var(--hair)" },
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block h-full",
											style: {
												background: "var(--fg)",
												width: i < active ? "100%" : i === active ? `${local * 100}%` : "0%"
											}
										})
									}, s.id))
								})
							]
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "px-5 py-20 sm:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-[var(--shell)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "d max-w-[18ch] text-[clamp(1.9rem,5vw,3.6rem)]",
						children: [24, " pieces, and you just walked the whole building"]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Catalogue, {
				look,
				heading: "What comes off the rail"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorldFooter, {
				look,
				note: "scroll-world in stills mode · CSS dive from generated stills · clips drop into SCENES[].clip when the chain is funded"
			})
		]
	});
}
//#endregion
export { Corridor as component };
