import { i as __toESM } from "../_runtime.mjs";
import { Gt as Vector2, v as Color } from "../_libs/@monogrid/gainmap-js+[...].mjs";
import { i as PLAIN, n as EDITIONS, r as NOTES, t as BRAND } from "./data-Nq6HozzO.mjs";
import { f as useThree, h as require_react, m as require_jsx_runtime, o as Canvas, u as useFrame } from "../_libs/@react-three/drei+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/editions-CGMLgTnX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* A cloth field, written directly against react-three-fiber.
*
* ShaderGradient gave the page a gradient mesh, which is a preset. This is the
* opposite: a plane with a custom vertex shader that moves like fabric, which
* is the one thing a clothing shop can put on screen that a template cannot.
*
* How it works
*   vertex    three travelling sine bands at different frequencies, plus a
*             pointer-driven bulge, displace z. Cheap enough to run on a
*             phone; no noise texture, no physics solver.
*   fragment  colour mixes across the displaced height, so the folds read as
*             light catching a weave rather than as a gradient.
*
* Everything it needs to survive production
*   - SSR safe: the caller only mounts it after hydration.
*   - Colours are read from the CSS custom properties, so it tracks the
*     palette and the light/dark flip instead of hard-coding hex.
*   - Pauses entirely when scrolled out of view.
*   - Freezes on the first frame under prefers-reduced-motion; the drape is
*     still there, it just stops moving.
*/
var vertex = `
  uniform float uTime;
  uniform vec2  uPointer;
  uniform float uAmp;
  uniform float uScroll;
  varying float vH;
  varying vec2  vUv;

  void main() {
    vUv = uv;
    vec3 p = position;

    // three bands, deliberately non-harmonic so the cloth never visibly loops
    float w1 = sin(p.x * 1.6 + uTime * 0.55) * 0.42;
    float w2 = sin(p.y * 2.1 - uTime * 0.37) * 0.28;
    float w3 = sin((p.x + p.y) * 0.9 + uTime * 0.23) * 0.34;

    // the pointer pushes a soft bulge through the sheet
    float d = distance(vec2(p.x, p.y), uPointer * 2.2);
    float lift = exp(-d * d * 0.35) * 0.75;

    // hold the top edge so it hangs rather than floats
    float hang = smoothstep(1.0, -1.0, p.y);

    // scrolling settles the cloth: the folds flatten and the sheet tilts away,
    // so the hero reads as still fabric by the time the first section lands
    float settle = 1.0 - uScroll * 0.72;
    float h = (w1 + w2 + w3) * hang * uAmp * settle + lift * (1.0 - uScroll);
    p.y += uScroll * 0.9;
    p.z -= uScroll * 0.6;
    p.z += h;

    vH = h;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;
var fragment = `
  precision mediump float;
  uniform vec3  uDeep;
  uniform vec3  uMid;
  uniform vec3  uLit;
  varying float vH;
  varying vec2  vUv;

  void main() {
    // height drives the shade, so folds catch light like a weave
    float t = clamp(vH * 0.9 + 0.5, 0.0, 1.0);
    vec3 c = mix(uDeep, uMid, smoothstep(0.0, 0.6, t));
    c = mix(c, uLit, smoothstep(0.55, 1.0, t));

    // fade the bottom edge into the page rather than cutting it off
    c = mix(c, uDeep, smoothstep(0.35, 0.0, vUv.y));
    gl_FragColor = vec4(c, 1.0);
  }
`;
function readVar(el, name, fallback) {
	return getComputedStyle(el).getPropertyValue(name).trim() || fallback;
}
function Cloth({ still, colors }) {
	const mat = (0, import_react.useRef)(null);
	const { size } = useThree();
	const uniforms = (0, import_react.useMemo)(() => ({
		uTime: { value: 0 },
		uPointer: { value: new Vector2(0, 0) },
		uAmp: { value: 1 },
		uScroll: { value: 0 },
		uDeep: { value: new Color(colors[0]) },
		uMid: { value: new Color(colors[1]) },
		uLit: { value: new Color(colors[2]) }
	}), []);
	(0, import_react.useEffect)(() => {
		uniforms.uDeep.value.set(colors[0]);
		uniforms.uMid.value.set(colors[1]);
		uniforms.uLit.value.set(colors[2]);
	}, [colors, uniforms]);
	const target = (0, import_react.useRef)(new Vector2(0, 0));
	(0, import_react.useEffect)(() => {
		const onMove = (e) => {
			target.current.set(e.clientX / window.innerWidth * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
		};
		window.addEventListener("pointermove", onMove, { passive: true });
		return () => window.removeEventListener("pointermove", onMove);
	}, []);
	useFrame((_, delta) => {
		if (!mat.current) return;
		if (!still) uniforms.uTime.value += delta;
		uniforms.uPointer.value.lerp(target.current, still ? 1 : .045);
		const h = window.innerHeight || 1;
		const raw = Math.min(Math.max(window.scrollY / h, 0), 1);
		const cur = uniforms.uScroll.value;
		uniforms.uScroll.value = still ? raw : cur + (raw - cur) * .08;
	});
	const seg = size.width < 700 ? 48 : 96;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		rotation: [
			-.32,
			0,
			.06
		],
		position: [
			0,
			-.3,
			0
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [
			9,
			5.4,
			seg,
			Math.round(seg * .6)
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("shaderMaterial", {
			ref: mat,
			vertexShader: vertex,
			fragmentShader: fragment,
			uniforms
		})]
	});
}
function ClothField({ className = "" }) {
	const host = (0, import_react.useRef)(null);
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const [still, setStill] = (0, import_react.useState)(false);
	const [visible, setVisible] = (0, import_react.useState)(true);
	const [colors, setColors] = (0, import_react.useState)([
		"#0f1310",
		"#22303a",
		"#7aa5dd"
	]);
	(0, import_react.useEffect)(() => {
		setMounted(true);
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		setStill(mq.matches);
		const onMq = (e) => setStill(e.matches);
		mq.addEventListener("change", onMq);
		const read = () => {
			const el = host.current;
			if (!el) return;
			setColors([
				readVar(el, "--ed-ground", "#0f1310"),
				readVar(el, "--ed-tint-3", "#22303a"),
				readVar(el, "--ed-accent", "#7aa5dd")
			]);
		};
		read();
		const scheme = window.matchMedia("(prefers-color-scheme: dark)");
		scheme.addEventListener("change", read);
		let io;
		if (host.current) {
			io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "120px" });
			io.observe(host.current);
		}
		return () => {
			mq.removeEventListener("change", onMq);
			scheme.removeEventListener("change", read);
			io?.disconnect();
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: host,
		className: `absolute inset-0 ${className}`,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[var(--ed-ground)]" }),
			mounted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, {
				className: "!absolute inset-0",
				dpr: [1, 1.6],
				frameloop: visible ? "always" : "never",
				gl: {
					antialias: false,
					powerPreference: "low-power",
					alpha: false
				},
				camera: {
					position: [
						0,
						0,
						4.2
					],
					fov: 42
				},
				style: {
					position: "absolute",
					inset: 0
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cloth, {
					still,
					colors
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-[var(--ed-ground)]/45 via-transparent to-[var(--ed-ground)]" })
		]
	});
}
function useActiveSection(ids) {
	const [active, setActive] = (0, import_react.useState)(ids[0] ?? "");
	(0, import_react.useEffect)(() => {
		if (!ids.length) return;
		const io = new IntersectionObserver((entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) setActive(e.target.id);
			});
		}, { rootMargin: "-25% 0px -65% 0px" });
		ids.forEach((id) => {
			const el = document.getElementById(id);
			if (el) io.observe(el);
		});
		return () => io.disconnect();
	}, [ids.join("|")]);
	return active;
}
function useReveal() {
	(0, import_react.useEffect)(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			document.querySelectorAll(".rv, .ed-lift").forEach((n) => n.classList.add("in"));
			return;
		}
		const io = new IntersectionObserver((entries) => entries.forEach((e) => {
			if (e.isIntersecting) {
				e.target.classList.add("in");
				io.unobserve(e.target);
			}
		}), { threshold: .12 });
		document.querySelectorAll(".rv, .ed-lift").forEach((n) => io.observe(n));
		return () => io.disconnect();
	});
}
function EditionPicker({ editions, current, onPick }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const wrap = (0, import_react.useRef)(null);
	const btn = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const onDoc = (e) => {
			if (wrap.current && !wrap.current.contains(e.target)) setOpen(false);
		};
		document.addEventListener("click", onDoc);
		return () => document.removeEventListener("click", onDoc);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		ref: wrap,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			ref: btn,
			onClick: () => setOpen((o) => !o),
			onKeyDown: (e) => {
				if (e.key === "ArrowDown") {
					e.preventDefault();
					setOpen(true);
				}
				if (e.key === "Escape") setOpen(false);
			},
			"aria-expanded": open,
			"aria-haspopup": "listbox",
			className: "inline-flex min-h-11 items-center gap-2 border border-[var(--ed-hair-strong)] bg-[var(--ed-wash)] px-3 py-2 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-[var(--ed-ink)] transition-colors hover:border-[var(--ed-accent)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden sm:inline opacity-60",
					children: "Edition"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
					className: "font-semibold",
					children: current.label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `inline-block h-1.5 w-1.5 border-b border-r border-current transition-transform ${open ? "-rotate-135 translate-y-px" : "rotate-45 -translate-y-px"}` })
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			role: "listbox",
			"aria-label": "Choose an edition",
			className: "absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-[280px] border border-[var(--ed-hair)] bg-[var(--ed-panel)] p-1 shadow-[0_18px_44px_-20px_rgba(0,0,0,0.8)]",
			onKeyDown: (e) => {
				const opts = Array.from(e.currentTarget.querySelectorAll("button"));
				const i = opts.indexOf(document.activeElement);
				if (e.key === "Escape") {
					e.preventDefault();
					setOpen(false);
					btn.current?.focus();
				}
				if (e.key === "ArrowDown") {
					e.preventDefault();
					opts[(i + 1) % opts.length]?.focus();
				}
				if (e.key === "ArrowUp") {
					e.preventDefault();
					opts[(i - 1 + opts.length) % opts.length]?.focus();
				}
			},
			children: editions.map((ed) => {
				const on = ed.id === current.id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					role: "option",
					"aria-selected": on,
					onClick: () => {
						onPick(ed.id);
						setOpen(false);
						btn.current?.focus();
					},
					className: `flex min-h-11 w-full items-center justify-between gap-4 px-3 py-2 text-left text-sm transition-colors hover:bg-[var(--ed-wash)] ${on ? "text-[var(--ed-accent)]" : "text-[var(--ed-ink)]"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: ed.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
						className: "font-mono text-[0.6rem] uppercase tracking-[0.14em] opacity-60",
						children: [
							ed.name,
							" · ",
							ed.status
						]
					})]
				}) }, ed.id);
			})
		})]
	});
}
function Sub({ s }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const pid = `p-${s.id}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-b border-[var(--ed-hair)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
			className: "m-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				"aria-expanded": open,
				"aria-controls": pid,
				onClick: () => setOpen((o) => !o),
				className: "flex min-h-14 w-full items-center gap-4 py-4 text-left transition-colors hover:text-[var(--ed-accent)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex-1 text-base font-semibold tracking-tight",
						children: s.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden font-mono text-[0.62rem] uppercase tracking-[0.14em] opacity-50 sm:inline",
						children: s.note
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "relative h-3.5 w-3.5 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-x-0 top-1.5 h-0.5 bg-current" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute inset-y-0 left-1.5 w-0.5 bg-current transition-transform ${open ? "scale-y-0" : ""}` })]
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			id: pid,
			hidden: !open,
			className: "grid gap-6 pb-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-[60ch] text-sm leading-relaxed text-[var(--ed-muted)]",
				children: s.body
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 font-mono text-[0.68rem]",
				children: Object.entries(s.spec).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "contents",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "uppercase tracking-[0.12em] text-[var(--ed-muted)]",
						children: k
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "m-0 text-[var(--ed-ink)]",
						children: v
					})]
				}, k))
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figure", {
				className: "m-0 overflow-hidden border border-[var(--ed-hair)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: `https://picsum.photos/seed/${s.img}/720/540`,
					alt: `${s.title}, photographed flat.`,
					width: 720,
					height: 540,
					loading: "lazy",
					className: "ed-media aspect-[4/3] w-full object-cover"
				})
			})]
		})]
	});
}
function EditionsPage() {
	const [edId, setEdId] = (0, import_react.useState)(EDITIONS[0].id);
	const ed = (0, import_react.useMemo)(() => EDITIONS.find((e) => e.id === edId) ?? EDITIONS[0], [edId]);
	const [q, setQ] = (0, import_react.useState)("");
	const titleRef = (0, import_react.useRef)(null);
	const readyRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const set = () => {
			if (!titleRef.current || !readyRef.current) return;
			titleRef.current.style.setProperty("--ready-w", `${readyRef.current.getBoundingClientRect().width}px`);
		};
		set();
		const ro = new ResizeObserver(set);
		if (readyRef.current) ro.observe(readyRef.current);
		document.fonts?.ready.then(set);
		return () => ro.disconnect();
	}, []);
	const cats = (0, import_react.useMemo)(() => {
		const needle = q.trim().toLowerCase();
		if (!needle) return ed.cats;
		return ed.cats.map((c) => ({
			...c,
			subs: c.subs.filter((s) => (s.title + " " + s.note + " " + s.body).toLowerCase().includes(needle))
		})).filter((c) => c.subs.length);
	}, [ed, q]);
	const active = useActiveSection((0, import_react.useMemo)(() => cats.map((c) => c.id), [cats]));
	useReveal();
	const shown = cats.reduce((n, c) => n + c.subs.length, 0);
	const total = ed.cats.reduce((n, c) => n + c.subs.length, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "ed min-h-dvh [scroll-padding-top:5rem]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main",
				className: "absolute left-[-9999px] z-[99] bg-[var(--ed-accent)] px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-[var(--ed-ground)] focus:left-4 focus:top-4",
				children: "Skip to content"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-40 flex h-[72px] items-center gap-3 border-b border-[var(--ed-hair)] bg-[var(--ed-ground)]/85 px-4 backdrop-blur-md sm:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#main",
						className: "shrink-0 font-semibold tracking-tight",
						children: BRAND
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex-1" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditionPicker, {
						editions: EDITIONS,
						current: ed,
						onPick: setEdId
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#drop",
						className: "inline-flex min-h-11 items-center border border-[var(--ed-accent)] bg-[var(--ed-accent)] px-4 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-[var(--ed-ground)] transition-[filter] hover:brightness-110",
						children: "Get the drop"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				id: "main",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "relative overflow-hidden border-b border-[var(--ed-hair)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClothField, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 mx-auto max-w-[var(--shell)] px-4 pb-16 pt-20 sm:px-8 sm:pb-24 sm:pt-28",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-5 font-mono text-[0.64rem] uppercase tracking-[0.2em] text-[var(--ed-muted)]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: ed.label }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [total, " pieces"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Made to order" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: ed.status })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-5 max-w-[16ch] text-[clamp(2.2rem,1rem+5.4vw,5rem)] font-bold leading-[1.04] tracking-[-0.03em]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "#drop",
									ref: titleRef,
									className: "title-link",
									"aria-label": "Made to order, not ready made",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										ref: readyRef,
										className: "title__word title__word--ready",
										children: "READY"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "title__word title__word--made",
										children: "MADE"
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 max-w-[46ch] text-lg leading-relaxed text-[var(--ed-ink)]",
								children: ed.standfirst
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#drop",
									className: "inline-flex min-h-11 items-center border border-[var(--ed-accent)] bg-[var(--ed-accent)] px-5 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-[var(--ed-ground)] transition-[filter] hover:brightness-110",
									children: "Get the drop"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `#${ed.cats[0].id}`,
									className: "inline-flex min-h-11 items-center border border-[var(--ed-hair-strong)] px-5 font-mono text-[0.66rem] uppercase tracking-[0.16em] transition-colors hover:bg-white hover:text-[var(--ed-ground)]",
									children: "See the run"
								})]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-[var(--shell)] items-start lg:grid-cols-[230px_minmax(0,1fr)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						"aria-label": "Categories",
						className: "top-[72px] px-4 pt-8 sm:px-8 lg:sticky lg:max-h-[calc(100dvh-72px)] lg:overflow-y-auto lg:pb-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-3 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[var(--ed-muted)]",
							children: "In this edition"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "ed-stagger in m-0 flex list-none gap-1 overflow-x-auto p-0 lg:grid lg:overflow-visible",
							children: cats.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "shrink-0",
								style: { ["--index"]: i },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: `#${c.id}`,
									className: `flex min-h-10 items-center gap-2 whitespace-nowrap px-2 py-1 text-sm no-underline transition-colors lg:border-l-2 ${active === c.id ? "border-[var(--ed-accent)] bg-[var(--ed-wash)] text-[var(--ed-ink)] lg:border-l-[var(--ed-accent)]" : "border-transparent text-[var(--ed-muted)] hover:bg-[var(--ed-wash)] hover:text-[var(--ed-ink)]"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
										className: "not-italic font-mono text-[0.6rem] opacity-60",
										children: String(i + 1).padStart(2, "0")
									}), c.name]
								})
							}, c.id))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ed-stage min-w-0 px-4 pb-20 pt-8 sm:px-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-8 flex flex-wrap items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "q",
										className: "w-full font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[var(--ed-muted)]",
										children: "Find a piece"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "q",
										type: "search",
										value: q,
										onChange: (e) => setQ(e.target.value),
										placeholder: "cotton, trouser, wool",
										autoComplete: "off",
										className: "min-h-11 flex-1 border border-[var(--ed-hair)] bg-[var(--ed-wash)] px-4 font-mono text-sm text-[var(--ed-ink)] outline-none placeholder:text-[var(--ed-muted)] focus:border-[var(--ed-accent)]"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										role: "status",
										"aria-live": "polite",
										className: "font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--ed-muted)]",
										children: q ? `${shown} of ${total}` : `${total} pieces`
									})
								]
							}),
							cats.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								id: c.id,
								tabIndex: -1,
								className: "rv ed-lift border-t border-[var(--ed-hair)] py-10 first:border-t-0 first:pt-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-5 flex flex-wrap items-baseline gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "text-[clamp(1.5rem,1.1rem+1.6vw,2.2rem)] font-bold tracking-tight",
											children: c.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[var(--ed-muted)]",
											children: c.count
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `-mx-4 mb-7 border-y border-[var(--ed-hair)] bg-gradient-to-br px-4 py-6 sm:-mx-8 sm:px-8 ${c.tint}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "m-0 max-w-[60ch] text-[var(--ed-muted)]",
											children: c.blurb
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "border-t border-[var(--ed-hair)]",
										children: c.subs.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sub, { s }, s.id))
									})
								]
							}, c.id)),
							cats.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "py-16 text-center text-[var(--ed-muted)]",
								children: [
									"Nothing in this edition matches “",
									q,
									"”."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "rv border-t border-[var(--ed-hair)] pt-10",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-[clamp(1.4rem,1.1rem+1.4vw,2rem)] font-bold tracking-tight",
										children: "How to wear the run"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 max-w-[60ch] text-[var(--ed-muted)]",
										children: "Drag, or use the arrow keys."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										tabIndex: 0,
										"aria-label": "Styling notes, scrollable",
										onKeyDown: (e) => {
											if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
											e.preventDefault();
											e.currentTarget.scrollBy({
												left: e.key === "ArrowRight" ? 270 : -270,
												behavior: "smooth"
											});
										},
										className: "ed-reel -mx-4 mt-5 flex snap-x gap-3 overflow-x-auto px-4 pb-5 [scrollbar-width:none] sm:-mx-8 sm:px-8 [&::-webkit-scrollbar]:hidden",
										children: NOTES.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
											className: "flex w-[clamp(210px,60vw,260px)] shrink-0 flex-col gap-2 border border-[var(--ed-hair)] bg-[var(--ed-wash)] p-4 transition-[transform,border-color] hover:-translate-y-1 hover:border-[var(--ed-accent)]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[var(--ed-accent)]",
													children: n.tag
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "text-base font-semibold tracking-tight",
													children: n.title
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "m-0 text-sm leading-relaxed text-[var(--ed-muted)]",
													children: n.body
												})
											]
										}, n.title))
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "rv mt-10 border border-[var(--ed-hair)] p-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "m-0 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[var(--ed-muted)]",
										children: "Before you order"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-4 grid list-none gap-2.5 p-0 text-sm text-[var(--ed-muted)]",
										children: PLAIN.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "relative pl-5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-0 top-2 h-1.5 w-1.5 bg-[var(--ed-accent)]" }), line]
										}, line))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-5 text-sm text-[var(--ed-muted)]",
										children: "If you want it tomorrow, buy it somewhere else. Better said here than in an email afterwards."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								id: "drop",
								className: "rv mt-10 border-t border-[var(--ed-hair)] pt-10",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-[clamp(1.4rem,1.1rem+1.4vw,2rem)] font-bold tracking-tight",
										children: "Get told when it opens"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 max-w-[56ch] text-[var(--ed-muted)]",
										children: "One message when the edition opens, one when it is closing. Nothing else."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
										className: "mt-6 flex max-w-[520px] flex-wrap gap-2",
										onSubmit: (e) => e.preventDefault(),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												htmlFor: "email",
												className: "w-full font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[var(--ed-muted)]",
												children: "Email address"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												id: "email",
												name: "email",
												type: "email",
												autoComplete: "email",
												placeholder: "you@example.com",
												required: true,
												className: "min-h-11 flex-1 border border-[var(--ed-hair)] bg-[var(--ed-wash)] px-4 font-mono text-sm text-[var(--ed-ink)] outline-none placeholder:text-[var(--ed-muted)] focus:border-[var(--ed-accent)]"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "submit",
												className: "inline-flex min-h-11 items-center border border-[var(--ed-accent)] bg-[var(--ed-accent)] px-5 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-[var(--ed-ground)] transition-[filter] hover:brightness-110",
												children: "Join the list"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 text-sm text-[var(--ed-muted)]",
										children: "Not wired up yet. Point the form at your provider before this goes live."
									})
								]
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-[var(--ed-hair)] px-4 py-10 sm:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-[var(--shell)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
						className: "block tracking-tight",
						children: BRAND
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--ed-muted)]",
						children: "Made to order · shipped direct · no restock"
					})]
				})
			})
		]
	});
}
//#endregion
export { EditionsPage as component };
