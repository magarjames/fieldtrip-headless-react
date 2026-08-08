import { m as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/northline-world-Dpryh8Dn.js
var import_jsx_runtime = require_jsx_runtime();
var scenes = [
	{
		id: "threshold",
		label: "Threshold",
		eyebrow: "01 / 05 - Dusk-to-dawn field study",
		title: "Begin where the city thins.",
		body: "A quieter edge of the city gives the first layer a reason to exist: wind, wet ground, and the stretch before the train arrives.",
		tags: ["Water-shedding shell", "Paced departure"],
		metric: "00.0 km / outer edge",
		image: "/assets/world-threshold-BJlHpRU0.png",
		alt: "A black-clad figure walking through a monumental concrete gateway toward a dawn city and rail line.",
		accent: "#c57958",
		cameraX: "-2%",
		cameraY: "-1%",
		cameraScale: 1.2
	},
	{
		id: "forge",
		label: "Forge",
		eyebrow: "02 / 05 - Material under pressure",
		title: "Let the material answer.",
		body: "Inside the forge, rain sits on the surface instead of in it. Every detail earns its place before it meets a moving day.",
		tags: ["Membrane test", "Quiet hardware"],
		metric: "00.8 km / internal lab",
		image: "/assets/world-forge--sz7H03F.png",
		alt: "A minimalist concrete garment laboratory with black weatherproof jackets, wet textile samples, and a figure walking toward a bright exit.",
		accent: "#a8895b",
		cameraX: "1.5%",
		cameraY: "1%",
		cameraScale: 1.17
	},
	{
		id: "transit",
		label: "Transit",
		eyebrow: "03 / 05 - The moving line",
		title: "Keep the route open.",
		body: "The pieces are designed for the points that normally interrupt momentum: the platform, the downpour, and the in-between minutes.",
		tags: ["Layered mobility", "Fast exit"],
		metric: "03.1 km / transit spine",
		image: "/assets/world-transit-CGqateru.png",
		alt: "A hooded figure walking beside rain-darkened city train tracks beneath a pale concrete shelter.",
		accent: "#86a7a4",
		cameraX: "2.5%",
		cameraY: "0%",
		cameraScale: 1.22
	},
	{
		id: "weather",
		label: "Weather",
		eyebrow: "04 / 05 - Field condition",
		title: "Make room for weather.",
		body: "A shell should become background noise. The world can change without changing what the next hour asks of you.",
		tags: ["Wind guard", "Dry reach"],
		metric: "06.7 km / weather deck",
		image: "/assets/world-weather-CPPdpX6E.png",
		alt: "A hooded figure crossing a rain-slick rooftop deck toward a warm doorway with a city beyond.",
		accent: "#9a8d6c",
		cameraX: "0%",
		cameraY: "-2%",
		cameraScale: 1.19
	},
	{
		id: "return",
		label: "Return",
		eyebrow: "05 / 05 - The room after",
		title: "Return with less to undo.",
		body: "Good utility leaves the day lighter. It dries, waits, and is ready for the route again without announcing itself.",
		tags: ["Air-dry finish", "Repeat tomorrow"],
		metric: "08.4 km / return room",
		image: "/assets/world-return-B07MOQTY.png",
		alt: "A warm concrete and timber return room with a black jacket hanging by a bench and a hooded figure at the balcony doorway.",
		accent: "#c57958",
		cameraX: "-1%",
		cameraY: "1%",
		cameraScale: 1.15
	}
];
function sceneStyle(scene) {
	return {
		"--nlw-accent": scene.accent,
		"--nlw-camera-x": scene.cameraX,
		"--nlw-camera-y": scene.cameraY,
		"--nlw-camera-scale": scene.cameraScale
	};
}
function NorthlineWorld() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "northline-world",
		"data-direction-contract": "THESIS: a five-stop utility apparel journey where the route itself proves the clothes. OWN-WORLD: wet concrete, pale dawn, deep ink shells, and one clay ember across an architectural miniature city. STORY: threshold, material forge, transit spine, weather deck, return room. FIRST VIEWPORT: a forward path through a monumental gateway. FORM: a native CSS scroll-scrubbed world preview staged for a future frame-locked video chain. FINISH: editorial, cinematic, quiet.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				className: "nlw-skip-link",
				href: "#threshold",
				children: "Skip to the world"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "nlw-header",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						className: "nlw-brand",
						href: "#top",
						"aria-label": "Northline World home",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Northline" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "World" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "nlw-nav",
						"aria-label": "World route",
						children: scenes.map((scene) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `#${scene.id}`,
							children: scene.label
						}, scene.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						className: "nlw-store-link",
						href: "/northline#collection",
						children: ["Storefront ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": "true",
							children: "↗"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				id: "top",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "nlw-prelude",
						"aria-hidden": "true",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Scroll world / Northline field notes" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Desktop draft" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "nlw-route-rail",
						"aria-label": "World route progress",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "nlw-route-line" }), scenes.map((scene, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `#${scene.id}`,
							title: `Go to ${scene.label}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: String(index + 1).padStart(2, "0") })
						}, scene.id))]
					}),
					scenes.map((scene, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						id: scene.id,
						className: `nlw-scene nlw-scene-${scene.id}`,
						style: sceneStyle(scene),
						"aria-labelledby": `${scene.id}-title`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "nlw-scene-frame",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figure", {
									className: "nlw-scene-media",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: scene.image,
										alt: scene.alt,
										fetchPriority: index === 0 ? "high" : "auto"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "nlw-scene-vignette",
									"aria-hidden": "true"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "nlw-coordinate nlw-coordinate-top",
									"aria-hidden": "true",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: scene.metric }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "nlw-coordinate nlw-coordinate-bottom",
									"aria-hidden": "true",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Camera / forward" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "nlw-copy",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "nlw-eyebrow",
											children: scene.eyebrow
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
											id: `${scene.id}-title`,
											children: scene.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "nlw-body",
											children: scene.body
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "nlw-tags",
											"aria-label": `${scene.label} features`,
											children: scene.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: tag }, tag))
										}),
										index === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "nlw-scroll-cue",
											children: ["Scroll to enter ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"aria-hidden": "true",
												children: "↓"
											})]
										}),
										index === scenes.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "nlw-final-actions",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: "/northline#collection",
												children: "Explore the collection"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: "/northline#materials",
												children: "Read the material notes"
											})]
										})
									]
								})
							]
						})
					}, scene.id))
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "nlw-footer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Northline World is a scroll-world preview." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Frame-locked video clips can replace these staged posters when the render chain is connected." })]
			})
		]
	});
}
var SplitComponent = NorthlineWorld;
//#endregion
export { SplitComponent as component };
