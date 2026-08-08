//#region node_modules/.nitro/vite/services/ssr/assets/media-CXWtjMXk.js
/** null means not generated yet, and the placeholder takes over */
var LOCAL = {
	hero: "/northline/hero-campaign.png",
	overshirt: "/northline/overshirt.png",
	parka: "/northline/parka.png",
	knit: "/northline/knit.png",
	trouser: null,
	tee: null,
	accessories: null,
	atelier: null,
	cutting: null,
	rail: null,
	weave: null
};
var media = (k, w = 1200, h = 1500) => LOCAL[k] ?? `https://picsum.photos/seed/northline-w-${k}/${w}/${h}`;
/** true when the key resolves to a real generated asset */
var isReal = (k) => LOCAL[k] !== null;
/** the four scroll-world scenes, in flight order */
var SCENES = [
	{
		id: "atelier",
		key: "atelier",
		label: "The atelier",
		body: "Cloth is chosen before anything is drawn. The edition starts at the bolt."
	},
	{
		id: "cutting",
		key: "cutting",
		label: "The cutting floor",
		body: "Pattern pieces are cut to order, never to forecast. Nothing is cut twice."
	},
	{
		id: "bench",
		key: "weave",
		label: "The bench",
		body: "One maker takes a garment from bundle to finish. It is slower and it shows."
	},
	{
		id: "rail",
		key: "rail",
		label: "The rail",
		body: "Finished pieces hang for a day before they ship. That is the whole warehouse."
	}
];
//#endregion
export { isReal as n, media as r, SCENES as t };
