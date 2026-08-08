import { i as __toESM } from "../_runtime.mjs";
import { t as BRAND } from "./data-Nq6HozzO.mjs";
import { h as require_react, m as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { o as SEASON, r as COLLECTION_WORD, t as BRAND$1 } from "./data-CDB2DGpz.mjs";
import { n as pageMeta } from "./parts-EjDB_ZGf.mjs";
import { c as HeadContent, d as Outlet, f as lazyRouteComponent, g as useRouter, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as TAGLINE, r as DROP, t as BRAND$2 } from "./data-pfKPmX5L.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BdJbH5zd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-BKvep2BL.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	window.__lovableReportRuntimeError?.({
		message,
		stack: error instanceof Error ? error.stack : void 0,
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$24 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Count Club — Stock & waste people" },
			{
				name: "description",
				content: "Weekly stock, waste and labour reporting for independent restaurants. You count once a week. We hand back one page that says where the money went."
			},
			{
				property: "og:title",
				content: "Count Club — Stock & waste people"
			},
			{
				property: "og:description",
				content: "Weekly stock, waste and labour reporting for independent restaurants."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=Archivo+Black&family=EB+Garamond:ital,wght@0,400;1,400&family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Playfair+Display:ital,wght@0,400;0,500;0,700;0,900;1,400&family=Cormorant:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600;700&family=Source+Serif+4:ital,wght@0,300;0,400;0,600;1,300&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$24.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter$23 = () => import("./northline-world-Dpryh8Dn.mjs");
var Route$23 = createFileRoute("/northline-world")({
	component: lazyRouteComponent($$splitComponentImporter$23, "component"),
	head: () => ({ meta: [{ title: "Northline World | A field study in the long way home" }, {
		name: "description",
		content: "A scroll-driven Northline field study through threshold, material, transit, weather, and return."
	}] })
});
var $$splitComponentImporter$22 = () => import("./northline-Bd_s3yS6.mjs");
var Route$22 = createFileRoute("/northline")({
	component: lazyRouteComponent($$splitComponentImporter$22, "component"),
	head: () => ({ meta: [{ title: "Northline | Utility layers for the long way home" }, {
		name: "description",
		content: "An original concept storefront for Northline, a curated urban apparel collection."
	}] })
});
var $$splitComponentImporter$21 = () => import("./editions-CGMLgTnX.mjs");
var Route$21 = createFileRoute("/editions")({
	component: lazyRouteComponent($$splitComponentImporter$21, "component"),
	head: () => ({ meta: [{ title: `The First Edition · ${BRAND}` }, {
		name: "description",
		content: "A numbered clothing drop. Made to order, shipped direct, closed when it closes."
	}] })
});
var $$splitComponentImporter$20 = () => import("./routes-DdFOYGDv.mjs");
var Route$20 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$20, "component") });
var $$splitComponentImporter$19 = () => import("./w.index-HQZChzAI.mjs");
var Route$19 = createFileRoute("/w/")({
	component: lazyRouteComponent($$splitComponentImporter$19, "component"),
	head: () => pageMeta(`${BRAND$1}: ten GL versions`, `Ten rendering techniques over one catalogue, built on react-three-fiber, shadergradient and scroll-world.`)
});
var $$splitComponentImporter$18 = () => import("./s.index-CbMKdWVO.mjs");
var Route$18 = createFileRoute("/s/")({
	component: lazyRouteComponent($$splitComponentImporter$18, "component"),
	head: () => pageMeta(`${BRAND$2} — ${DROP}`, `${TAGLINE}. 18 pieces, styled as fits.`)
});
var $$splitComponentImporter$17 = () => import("./nl.index-BBqSsO-F.mjs");
var Route$17 = createFileRoute("/nl/")({
	component: lazyRouteComponent($$splitComponentImporter$17, "component"),
	head: () => pageMeta(`${BRAND$1}: seven versions of one storefront`, `Seven design systems built on one catalogue. Each version commits to a different skill combination for the ${SEASON.toLowerCase()} edition.`)
});
var $$splitComponentImporter$16 = () => import("./w.weave-BdO35tVC.mjs");
var Route$16 = createFileRoute("/w/weave")({
	component: lazyRouteComponent($$splitComponentImporter$16, "component"),
	head: () => pageMeta(`${BRAND$1} — Weave`, `Six hundred instanced threads under tension, driven by scroll.`)
});
var $$splitComponentImporter$15 = () => import("./w.vitrine-BKwmBUNl.mjs");
var Route$15 = createFileRoute("/w/vitrine")({
	component: lazyRouteComponent($$splitComponentImporter$15, "component"),
	head: () => pageMeta(`${BRAND$1} — Vitrine`, `The ${SEASON.toLowerCase()} edition hung as plates in real 3D space.`)
});
var $$splitComponentImporter$14 = () => import("./w.tide-Bg0jxrl7.mjs");
var Route$14 = createFileRoute("/w/tide")({
	component: lazyRouteComponent($$splitComponentImporter$14, "component"),
	head: () => pageMeta(`${BRAND$1} — Tide`, `A live gradient horizon with the making sequence scrubbed across it.`)
});
var $$splitComponentImporter$13 = () => import("./w.kiln-DhpHDMrX.mjs");
var Route$13 = createFileRoute("/w/kiln")({
	component: lazyRouteComponent($$splitComponentImporter$13, "component"),
	head: () => pageMeta(`${BRAND$1} — Kiln`, `A volumetric field lit by one source that scroll walks across.`)
});
var $$splitComponentImporter$12 = () => import("./w.fold-BdnkFIOJ.mjs");
var Route$12 = createFileRoute("/w/fold")({
	component: lazyRouteComponent($$splitComponentImporter$12, "component"),
	head: () => pageMeta(`${BRAND$1} — Fold`, `A campaign photograph creased in a fragment program as the page scrolls.`)
});
var $$splitComponentImporter$11 = () => import("./w.drift-D7WXzIam.mjs");
var Route$11 = createFileRoute("/w/drift")({
	component: lazyRouteComponent($$splitComponentImporter$11, "component"),
	head: () => pageMeta(`${BRAND$1} — Drift`, `24 pieces under a live gradient field that answers to scroll.`)
});
var $$splitComponentImporter$10 = () => import("./w.corridor-CXV0vXa7.mjs");
var Route$10 = createFileRoute("/w/corridor")({
	component: lazyRouteComponent($$splitComponentImporter$10, "component"),
	head: () => pageMeta(`${BRAND$1} — Corridor`, `A scroll-driven flight through the making of the ${SEASON.toLowerCase()} edition.`)
});
var $$splitComponentImporter$9 = () => import("./w.cloth-CXewFY2I.mjs");
var Route$9 = createFileRoute("/w/cloth")({
	component: lazyRouteComponent($$splitComponentImporter$9, "component"),
	head: () => pageMeta(`${BRAND$1} — Cloth`, `A GLSL canvas that behaves like heavy fabric, driven by scroll position.`)
});
var $$splitComponentImporter$8 = () => import("./w.bloom-9tagzyFj.mjs");
var Route$8 = createFileRoute("/w/bloom")({
	component: lazyRouteComponent($$splitComponentImporter$8, "component"),
	head: () => pageMeta(`${BRAND$1} — Bloom`, `A twelve thousand point cloud that dissolves as you scroll.`)
});
var $$splitComponentImporter$7 = () => import("./w.atlas-BeDgX8gH.mjs");
var Route$7 = createFileRoute("/w/atlas")({
	component: lazyRouteComponent($$splitComponentImporter$7, "component"),
	head: () => pageMeta(`${BRAND$1} — Atlas`, `The whole edition as one wall, flown across by scroll.`)
});
var $$splitComponentImporter$6 = () => import("./nl.taste-DUPg89i5.mjs");
var Route$6 = createFileRoute("/nl/taste")({
	component: lazyRouteComponent($$splitComponentImporter$6, "component"),
	head: () => pageMeta(`${BRAND$1}: The ${SEASON} Edition`, `24 pieces made after you order them. The edition opens once, closes when the sizes run out, and is not reprinted.`)
});
var $$splitComponentImporter$5 = () => import("./nl.minimal-D2kxt-bG.mjs");
var Route$5 = createFileRoute("/nl/minimal")({
	component: lazyRouteComponent($$splitComponentImporter$5, "component"),
	head: () => pageMeta(`${BRAND$1} — The ${SEASON} Edition`, `24 garments cut after you order them, with nothing waiting in a warehouse.`)
});
var $$splitComponentImporter$4 = () => import("./nl.impeccable-DseXZaST.mjs");
var Route$4 = createFileRoute("/nl/impeccable")({
	component: lazyRouteComponent($$splitComponentImporter$4, "component"),
	head: () => pageMeta(`${BRAND$1}: Bill of materials`, `The whole ${SEASON.toLowerCase()} edition as a specification. Cloth, lead time and price first, photographs after.`)
});
var $$splitComponentImporter$3 = () => import("./nl.hyer-BVv-aaJu.mjs");
var Route$3 = createFileRoute("/nl/hyer")({
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
	head: () => pageMeta(`${BRAND$1}® — ${COLLECTION_WORD} ${SEASON}.`, `Nothing is cut until the order lands. 24 pieces, ten to fourteen days, one price all season.`)
});
var $$splitComponentImporter$2 = () => import("./nl.gallery-BQuzil4Z.mjs");
var Route$2 = createFileRoute("/nl/gallery")({
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
	head: () => pageMeta(`${BRAND$1} — The ${SEASON} Edition`, `24 pieces cut after they are ordered, shown as an exhibition rather than a catalogue.`)
});
var $$splitComponentImporter$1 = () => import("./nl.flight-C1g59pQI.mjs");
var Route$1 = createFileRoute("/nl/flight")({
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	head: () => pageMeta(`${BRAND$1}: Flight`, "A scroll driven pass through the mill, the cutting floor, the bench and the rail, then the whole edition.")
});
var $$splitComponentImporter = () => import("./nl.brutalist-D0wgrPwd.mjs");
var Route = createFileRoute("/nl/brutalist")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: () => pageMeta(`${BRAND$1}® / UNIT D-01 / ${SEASON} MANIFEST`, `24 units cut against confirmed orders. No held stock, no forecast, no markdown cycle.`)
});
var NorthlineWorldRoute = Route$23.update({
	id: "/northline-world",
	path: "/northline-world",
	getParentRoute: () => Route$24
});
var NorthlineRoute = Route$22.update({
	id: "/northline",
	path: "/northline",
	getParentRoute: () => Route$24
});
var EditionsRoute = Route$21.update({
	id: "/editions",
	path: "/editions",
	getParentRoute: () => Route$24
});
var IndexRoute = Route$20.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$24
});
var WIndexRoute = Route$19.update({
	id: "/w/",
	path: "/w/",
	getParentRoute: () => Route$24
});
var SIndexRoute = Route$18.update({
	id: "/s/",
	path: "/s/",
	getParentRoute: () => Route$24
});
var NlIndexRoute = Route$17.update({
	id: "/nl/",
	path: "/nl/",
	getParentRoute: () => Route$24
});
var WWeaveRoute = Route$16.update({
	id: "/w/weave",
	path: "/w/weave",
	getParentRoute: () => Route$24
});
var WVitrineRoute = Route$15.update({
	id: "/w/vitrine",
	path: "/w/vitrine",
	getParentRoute: () => Route$24
});
var WTideRoute = Route$14.update({
	id: "/w/tide",
	path: "/w/tide",
	getParentRoute: () => Route$24
});
var WKilnRoute = Route$13.update({
	id: "/w/kiln",
	path: "/w/kiln",
	getParentRoute: () => Route$24
});
var WFoldRoute = Route$12.update({
	id: "/w/fold",
	path: "/w/fold",
	getParentRoute: () => Route$24
});
var WDriftRoute = Route$11.update({
	id: "/w/drift",
	path: "/w/drift",
	getParentRoute: () => Route$24
});
var WCorridorRoute = Route$10.update({
	id: "/w/corridor",
	path: "/w/corridor",
	getParentRoute: () => Route$24
});
var WClothRoute = Route$9.update({
	id: "/w/cloth",
	path: "/w/cloth",
	getParentRoute: () => Route$24
});
var WBloomRoute = Route$8.update({
	id: "/w/bloom",
	path: "/w/bloom",
	getParentRoute: () => Route$24
});
var WAtlasRoute = Route$7.update({
	id: "/w/atlas",
	path: "/w/atlas",
	getParentRoute: () => Route$24
});
var NlTasteRoute = Route$6.update({
	id: "/nl/taste",
	path: "/nl/taste",
	getParentRoute: () => Route$24
});
var NlMinimalRoute = Route$5.update({
	id: "/nl/minimal",
	path: "/nl/minimal",
	getParentRoute: () => Route$24
});
var NlImpeccableRoute = Route$4.update({
	id: "/nl/impeccable",
	path: "/nl/impeccable",
	getParentRoute: () => Route$24
});
var NlHyerRoute = Route$3.update({
	id: "/nl/hyer",
	path: "/nl/hyer",
	getParentRoute: () => Route$24
});
var NlGalleryRoute = Route$2.update({
	id: "/nl/gallery",
	path: "/nl/gallery",
	getParentRoute: () => Route$24
});
var NlFlightRoute = Route$1.update({
	id: "/nl/flight",
	path: "/nl/flight",
	getParentRoute: () => Route$24
});
var rootRouteChildren = {
	IndexRoute,
	EditionsRoute,
	NorthlineRoute,
	NorthlineWorldRoute,
	NlBrutalistRoute: Route.update({
		id: "/nl/brutalist",
		path: "/nl/brutalist",
		getParentRoute: () => Route$24
	}),
	NlFlightRoute,
	NlGalleryRoute,
	NlHyerRoute,
	NlImpeccableRoute,
	NlMinimalRoute,
	NlTasteRoute,
	WAtlasRoute,
	WBloomRoute,
	WClothRoute,
	WCorridorRoute,
	WDriftRoute,
	WFoldRoute,
	WKilnRoute,
	WTideRoute,
	WVitrineRoute,
	WWeaveRoute,
	NlIndexRoute,
	SIndexRoute,
	WIndexRoute
};
var routeTree = Route$24._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
