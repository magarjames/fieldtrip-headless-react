globalThis.__nitro_main__ = import.meta.url;
import { a as FastResponse, n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a1-V6vVu1Wd+GWrw+chNlSlrbW+i2Q\"",
		"mtime": "2026-07-28T12:22:51.031Z",
		"size": 161,
		"path": "../public/robots.txt"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-07-28T12:31:46.615Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/assets/detail-blue-CKbiPOwp.jpg": {
		"type": "image/jpeg",
		"etag": "\"1fd9e-seQQSuoEapSf32OS2PJ7V/bmPVI\"",
		"mtime": "2026-07-30T20:49:20.245Z",
		"size": 130462,
		"path": "../public/assets/detail-blue-CKbiPOwp.jpg"
	},
	"/assets/editions-BKKsXSQv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4b50-3DD7CuUazq2lXME3vlHWtIRJ1sQ\"",
		"mtime": "2026-07-30T20:49:20.152Z",
		"size": 19280,
		"path": "../public/assets/editions-BKKsXSQv.js"
	},
	"/assets/chunk-KLJOXLT7-CyZDAYro.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"39f1d-Ezrv4s6tJUO3w/6nJYkoGnFWYJo\"",
		"mtime": "2026-07-30T20:49:20.150Z",
		"size": 237341,
		"path": "../public/assets/chunk-KLJOXLT7-CyZDAYro.js"
	},
	"/assets/flatlay-9d5QaqnP.jpg": {
		"type": "image/jpeg",
		"etag": "\"1c0f7-hztTY08Y33KqBvxTkb7O4SQ+als\"",
		"mtime": "2026-07-30T20:49:20.271Z",
		"size": 114935,
		"path": "../public/assets/flatlay-9d5QaqnP.jpg"
	},
	"/assets/index-D6gLkmOb.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"6ac8-Rs7yoj1ip9z5IWFA57EWdER/jh4\"",
		"mtime": "2026-07-30T20:49:20.278Z",
		"size": 27336,
		"path": "../public/assets/index-D6gLkmOb.css"
	},
	"/assets/index-Cggakw9N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5af6f-P70qSj1aCMTlv9NWDYtaFPxzqo0\"",
		"mtime": "2026-07-30T20:49:20.148Z",
		"size": 372591,
		"path": "../public/assets/index-Cggakw9N.js"
	},
	"/assets/looks-BHKllm_V.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"58ba-x0QLCyBfqY/3DohzqsCkuCwWuHE\"",
		"mtime": "2026-07-30T20:49:20.154Z",
		"size": 22714,
		"path": "../public/assets/looks-BHKllm_V.js"
	},
	"/assets/mascot-cup-DHz203SX.png": {
		"type": "image/png",
		"etag": "\"4ba47-L5qxksI+lLb9iYDLxQ5+pHV9HRA\"",
		"mtime": "2026-07-30T20:49:20.297Z",
		"size": 309831,
		"path": "../public/assets/mascot-cup-DHz203SX.png"
	},
	"/assets/jsx-runtime-DUAcabCT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"42a-6CWT3JsIzkgrrMo5qQ6L1UWEbvM\"",
		"mtime": "2026-07-30T20:49:20.153Z",
		"size": 1066,
		"path": "../public/assets/jsx-runtime-DUAcabCT.js"
	},
	"/assets/mascot-pencil-Dy5Vtk_v.png": {
		"type": "image/png",
		"etag": "\"71259-qFPFrExwp/jYvWfiIJDw75/zT4w\"",
		"mtime": "2026-07-30T20:49:20.299Z",
		"size": 463449,
		"path": "../public/assets/mascot-pencil-Dy5Vtk_v.png"
	},
	"/assets/mascot-wave-BeL1-syi.png": {
		"type": "image/png",
		"etag": "\"441df-L4IVL2uX0qW7qVeLNWlZpEBC1H8\"",
		"mtime": "2026-07-30T20:49:20.304Z",
		"size": 279007,
		"path": "../public/assets/mascot-wave-BeL1-syi.png"
	},
	"/assets/materials-CQ6v9x-F.jpg": {
		"type": "image/jpeg",
		"etag": "\"31fcb-HjQWUHgRwcSM8kuz00+DtLAyops\"",
		"mtime": "2026-07-30T20:49:20.306Z",
		"size": 204747,
		"path": "../public/assets/materials-CQ6v9x-F.jpg"
	},
	"/assets/mascot-box-DIfz1l8J.png": {
		"type": "image/png",
		"etag": "\"8cdc8-GoJhFWE7AN6pAEh4dMBSdXbaBMU\"",
		"mtime": "2026-07-30T20:49:20.291Z",
		"size": 576968,
		"path": "../public/assets/mascot-box-DIfz1l8J.png"
	},
	"/assets/hero-dawn-6TPsLdgK.png": {
		"type": "image/png",
		"etag": "\"14cd99-5BYErOTqDsbxYBAf9Xkji6IJgAs\"",
		"mtime": "2026-07-30T20:49:20.273Z",
		"size": 1363353,
		"path": "../public/assets/hero-dawn-6TPsLdgK.png"
	},
	"/assets/film-material-X9WVxpOr.png": {
		"type": "image/png",
		"etag": "\"19a996-i2uXtAXtbBV7hAcj5RMIXQcFZ9A\"",
		"mtime": "2026-07-30T20:49:20.263Z",
		"size": 1681814,
		"path": "../public/assets/film-material-X9WVxpOr.png"
	},
	"/assets/film-arrival-Dl2L1jEl.png": {
		"type": "image/png",
		"etag": "\"1d418a-Z0MjF4j1LVAZv1u82b8KLgaQo14\"",
		"mtime": "2026-07-30T20:49:20.259Z",
		"size": 1917322,
		"path": "../public/assets/film-arrival-Dl2L1jEl.png"
	},
	"/assets/mascot-BiHCRhrh.png": {
		"type": "image/png",
		"etag": "\"1c1644-DCr3BeQxAsbLUYwp1yZFfXDC9hE\"",
		"mtime": "2026-07-30T20:49:20.288Z",
		"size": 1840708,
		"path": "../public/assets/mascot-BiHCRhrh.png"
	},
	"/assets/nl.brutalist-CK2kW5H3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f8f-ZGkDAPq7ZRGr1Xsh8nq0s5RBdgc\"",
		"mtime": "2026-07-30T20:49:20.157Z",
		"size": 8079,
		"path": "../public/assets/nl.brutalist-CK2kW5H3.js"
	},
	"/assets/nl.flight-CugTwViX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1530-3xxDBAdpUzotqaAEKsltj2lXf1A\"",
		"mtime": "2026-07-30T20:49:20.159Z",
		"size": 5424,
		"path": "../public/assets/nl.flight-CugTwViX.js"
	},
	"/assets/nl.hyer-BOK-jj0W.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2bca-L7eY3w/IgUxYjeCYYORXkh9CU0g\"",
		"mtime": "2026-07-30T20:49:20.163Z",
		"size": 11210,
		"path": "../public/assets/nl.hyer-BOK-jj0W.js"
	},
	"/assets/nl.gallery-Dmpz3PeW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ee1-gi8MfqElE9FNM4ZcMwIRnNzxGJw\"",
		"mtime": "2026-07-30T20:49:20.161Z",
		"size": 12001,
		"path": "../public/assets/nl.gallery-Dmpz3PeW.js"
	},
	"/assets/media-CLVkxnAX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"364-Loo/iDQs0IL6w5MITAL03XRECJY\"",
		"mtime": "2026-07-30T20:49:20.156Z",
		"size": 868,
		"path": "../public/assets/media-CLVkxnAX.js"
	},
	"/assets/nl.impeccable-CvmrqJJs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1391-4fxWf6P22/2L/F9aOiMg15Rdwk8\"",
		"mtime": "2026-07-30T20:49:20.164Z",
		"size": 5009,
		"path": "../public/assets/nl.impeccable-CvmrqJJs.js"
	},
	"/assets/nl.index-BP4E9e8X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13bb-lYi1RQAWYY4d9dNKKrpVpI2fEuE\"",
		"mtime": "2026-07-30T20:49:20.166Z",
		"size": 5051,
		"path": "../public/assets/nl.index-BP4E9e8X.js"
	},
	"/assets/nl.minimal-CX2lschy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2cd6-N2NjIzGgoWwqy8lUpV0DEhYZlFU\"",
		"mtime": "2026-07-30T20:49:20.167Z",
		"size": 11478,
		"path": "../public/assets/nl.minimal-CX2lschy.js"
	},
	"/assets/nl.taste-Dz_AYmr-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19b5-p0GyKeUdSm+wewUgc3AZNziBMgE\"",
		"mtime": "2026-07-30T20:49:20.168Z",
		"size": 6581,
		"path": "../public/assets/nl.taste-Dz_AYmr-.js"
	},
	"/assets/northline-DIOofIjD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37f7-vkpXBJEp7Tup/XKOiEf8DBNDYv4\"",
		"mtime": "2026-07-30T20:49:20.169Z",
		"size": 14327,
		"path": "../public/assets/northline-DIOofIjD.js"
	},
	"/assets/film-terminal-BAUEZyYr.png": {
		"type": "image/png",
		"etag": "\"205f53-pjAugwL9/jYB7NOAncCY8HG6Rsw\"",
		"mtime": "2026-07-30T20:49:20.267Z",
		"size": 2121555,
		"path": "../public/assets/film-terminal-BAUEZyYr.png"
	},
	"/assets/northline-world-BYXoHGc-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"188f-7RqNl5jFaPKJurGbmD+LqdaJTVg\"",
		"mtime": "2026-07-30T20:49:20.175Z",
		"size": 6287,
		"path": "../public/assets/northline-world-BYXoHGc-.js"
	},
	"/assets/northline-world-D3UusYiG.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"2273-4aOrIJZstRRjbANUWB3/azEjBP0\"",
		"mtime": "2026-07-30T20:49:20.308Z",
		"size": 8819,
		"path": "../public/assets/northline-world-D3UusYiG.css"
	},
	"/assets/routes-BBRixUvv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"555c-psa1gGnWxC/LtmUC4cXnoeYnqxU\"",
		"mtime": "2026-07-30T20:49:20.191Z",
		"size": 21852,
		"path": "../public/assets/routes-BBRixUvv.js"
	},
	"/fieldtrip/fit-euro.png": {
		"type": "image/png",
		"etag": "\"2d72ac-m+SVVLtnmuZ2DBwZSaYxtPXRUS8\"",
		"mtime": "2026-07-29T22:24:10.068Z",
		"size": 2978476,
		"path": "../public/fieldtrip/fit-euro.png"
	},
	"/assets/s.index-BYdTAFdB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"41782-wCLrKXRnnzDiRmyolsAre4DwVUk\"",
		"mtime": "2026-07-30T20:49:20.196Z",
		"size": 268162,
		"path": "../public/assets/s.index-BYdTAFdB.js"
	},
	"/assets/react-three-fiber.esm-DVYqMTBt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d7288-yJlVufB5i/TPnknacL2peM3FqMw\"",
		"mtime": "2026-07-30T20:49:20.189Z",
		"size": 881288,
		"path": "../public/assets/react-three-fiber.esm-DVYqMTBt.js"
	},
	"/assets/shaders-DrDHMxnI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1589-18fVp7XGqhg4cVbd50xtQp2rbTc\"",
		"mtime": "2026-07-30T20:49:20.203Z",
		"size": 5513,
		"path": "../public/assets/shaders-DrDHMxnI.js"
	},
	"/assets/stage-C86yqgp4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"629-Iw1x/XQnGCZfp805VuxDKY0J6iA\"",
		"mtime": "2026-07-30T20:49:20.205Z",
		"size": 1577,
		"path": "../public/assets/stage-C86yqgp4.js"
	},
	"/assets/styles-BKvep2BL.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1af85-1RYh2+z6PDFLjJUOD8nPQ8Oi8g4\"",
		"mtime": "2026-07-30T20:49:20.313Z",
		"size": 110469,
		"path": "../public/assets/styles-BKvep2BL.css"
	},
	"/assets/w.atlas-CER_ZGvP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"904-arADqHIUGjWQ8rx+Czd4+1RZxDo\"",
		"mtime": "2026-07-30T20:49:20.216Z",
		"size": 2308,
		"path": "../public/assets/w.atlas-CER_ZGvP.js"
	},
	"/assets/w.bloom-9M10-JPl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dcb-yxV5vrBnCLWpbnTQYm2AhrF2S/I\"",
		"mtime": "2026-07-30T20:49:20.217Z",
		"size": 3531,
		"path": "../public/assets/w.bloom-9M10-JPl.js"
	},
	"/assets/w.cloth-CscU6XaA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8f6-J6KjqizHu3wbsDV41Hiuk8gNwQI\"",
		"mtime": "2026-07-30T20:49:20.221Z",
		"size": 2294,
		"path": "../public/assets/w.cloth-CscU6XaA.js"
	},
	"/assets/w.corridor-BOOWHsqU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c10-/ag1QZdNYmkBqNJHgbR57v+2jfU\"",
		"mtime": "2026-07-30T20:49:20.222Z",
		"size": 3088,
		"path": "../public/assets/w.corridor-BOOWHsqU.js"
	},
	"/assets/w.drift-6sPMSyno.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"940-OyhePVyST5RfqaloCk9C/PUIyDs\"",
		"mtime": "2026-07-30T20:49:20.228Z",
		"size": 2368,
		"path": "../public/assets/w.drift-6sPMSyno.js"
	},
	"/assets/w.fold-CLjn64Pt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"88b-p7dy1aM3aYcSVKu9cwcjqxzhQ40\"",
		"mtime": "2026-07-30T20:49:20.231Z",
		"size": 2187,
		"path": "../public/assets/w.fold-CLjn64Pt.js"
	},
	"/assets/w.index-Cas6MDNC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1469-RqFzBTcUuO9fGUSFZQ0IYwMNSig\"",
		"mtime": "2026-07-30T20:49:20.233Z",
		"size": 5225,
		"path": "../public/assets/w.index-Cas6MDNC.js"
	},
	"/assets/w.kiln-B0xd1bKW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae5-KBZsCoDn06rGgDZi7zu789+HO1c\"",
		"mtime": "2026-07-30T20:49:20.234Z",
		"size": 2789,
		"path": "../public/assets/w.kiln-B0xd1bKW.js"
	},
	"/assets/w.tide-CA3C5jxC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e56-JJoCY8YJSPNUCjz1RiNbipDe2og\"",
		"mtime": "2026-07-30T20:49:20.240Z",
		"size": 3670,
		"path": "../public/assets/w.tide-CA3C5jxC.js"
	},
	"/assets/w.vitrine-C7AdXL6v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"957-H72DBi/8lI44gonQ34oLFFgzNtg\"",
		"mtime": "2026-07-30T20:49:20.242Z",
		"size": 2391,
		"path": "../public/assets/w.vitrine-C7AdXL6v.js"
	},
	"/assets/w.weave-DRZPOpq9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9e1-rQWj2O8cJ4YaxTzl2W2iTncT4C8\"",
		"mtime": "2026-07-30T20:49:20.243Z",
		"size": 2529,
		"path": "../public/assets/w.weave-DRZPOpq9.js"
	},
	"/fieldtrip/hero.png": {
		"type": "image/png",
		"etag": "\"4ac9b5-XTEpwS/sojyNhIDQOmg3KNkqCME\"",
		"mtime": "2026-07-29T22:08:48.156Z",
		"size": 4901301,
		"path": "../public/fieldtrip/hero.png"
	},
	"/northline-motion/film-arrival-sprite.webp": {
		"type": "image/webp",
		"etag": "\"2ae7a-RAXX/pJ9bKCsYYWW6/FHgO202Lg\"",
		"mtime": "2026-07-29T17:17:21.460Z",
		"size": 175738,
		"path": "../public/northline-motion/film-arrival-sprite.webp"
	},
	"/northline-motion/film-material-sprite.webp": {
		"type": "image/webp",
		"etag": "\"34ff0-qnuhyWewpBEWlUs9NCgxHsejmnw\"",
		"mtime": "2026-07-29T17:17:29.465Z",
		"size": 217072,
		"path": "../public/northline-motion/film-material-sprite.webp"
	},
	"/northline-motion/film-terminal-sprite.webp": {
		"type": "image/webp",
		"etag": "\"529de-7qLVxgFNmijaEpPxchtGtMiEMuw\"",
		"mtime": "2026-07-29T17:17:35.980Z",
		"size": 338398,
		"path": "../public/northline-motion/film-terminal-sprite.webp"
	},
	"/assets/world-forge--sz7H03F.png": {
		"type": "image/png",
		"etag": "\"2296ee-I8ulAtQjxjFmi1aJv8UhINl0ddU\"",
		"mtime": "2026-07-30T20:49:20.316Z",
		"size": 2266862,
		"path": "../public/assets/world-forge--sz7H03F.png"
	},
	"/assets/world-threshold-BJlHpRU0.png": {
		"type": "image/png",
		"etag": "\"22ee19-OGwPa5x7pnUTKytG15GjMHKZapw\"",
		"mtime": "2026-07-30T20:49:20.324Z",
		"size": 2289177,
		"path": "../public/assets/world-threshold-BJlHpRU0.png"
	},
	"/assets/world-return-B07MOQTY.png": {
		"type": "image/png",
		"etag": "\"257313-kPzfa7/p/M9AJq6VvZlZNTkXNP4\"",
		"mtime": "2026-07-30T20:49:20.320Z",
		"size": 2454291,
		"path": "../public/assets/world-return-B07MOQTY.png"
	},
	"/assets/world-transit-CGqateru.png": {
		"type": "image/png",
		"etag": "\"2351fe-ffdU+mAqTBDx4XvKx5ia6KSRvvQ\"",
		"mtime": "2026-07-30T20:49:20.328Z",
		"size": 2314750,
		"path": "../public/assets/world-transit-CGqateru.png"
	},
	"/assets/world-weather-CPPdpX6E.png": {
		"type": "image/png",
		"etag": "\"26a8d6-hqawBg+BCrjWq/ahp6rfGLNU264\"",
		"mtime": "2026-07-30T20:49:20.335Z",
		"size": 2533590,
		"path": "../public/assets/world-weather-CPPdpX6E.png"
	},
	"/northline-motion/film-arrival-motion.gif": {
		"type": "image/gif",
		"etag": "\"40cd0e-5ox61X0WCfMRBMN5fz7NkxXYIp8\"",
		"mtime": "2026-07-29T17:17:25.792Z",
		"size": 4246798,
		"path": "../public/northline-motion/film-arrival-motion.gif"
	},
	"/northline/hero-campaign.png": {
		"type": "image/png",
		"etag": "\"42de98-CZubi2+f4xUPg7EU9g3LWyjRV50\"",
		"mtime": "2026-07-29T20:29:58.853Z",
		"size": 4382360,
		"path": "../public/northline/hero-campaign.png"
	},
	"/northline/overshirt.png": {
		"type": "image/png",
		"etag": "\"4b8974-vv797XTsDBg5PxG5VK9T4maFTp4\"",
		"mtime": "2026-07-29T20:32:17.217Z",
		"size": 4950388,
		"path": "../public/northline/overshirt.png"
	},
	"/northline/parka.png": {
		"type": "image/png",
		"etag": "\"4bb480-my/5E7aRqK5QdUJ5DkGaxLtOyzs\"",
		"mtime": "2026-07-29T20:32:19.136Z",
		"size": 4961408,
		"path": "../public/northline/parka.png"
	},
	"/northline-motion/film-material-motion.gif": {
		"type": "image/gif",
		"etag": "\"60e138-7P28lGyohdcCo1q0a+AAghUCboo\"",
		"mtime": "2026-07-29T17:17:31.804Z",
		"size": 6349112,
		"path": "../public/northline-motion/film-material-motion.gif"
	},
	"/northline/knit.png": {
		"type": "image/png",
		"etag": "\"5ab5ef-HTewKecYhbnjrfqSwjkjhiIejBg\"",
		"mtime": "2026-07-29T21:50:15.376Z",
		"size": 5944815,
		"path": "../public/northline/knit.png"
	},
	"/northline-motion/film-terminal-motion.gif": {
		"type": "image/gif",
		"etag": "\"846728-sO8tPpSc15fC0zZk7Vm7+8Fl9gU\"",
		"mtime": "2026-07-29T17:17:38.009Z",
		"size": 8677160,
		"path": "../public/northline-motion/film-terminal-motion.gif"
	},
	"/fieldtrip/mascot-euro.glb": {
		"type": "model/gltf-binary",
		"etag": "\"1124d94-WHlskCAhQ0rNF60eM7viNIdVoxE\"",
		"mtime": "2026-07-30T09:35:41.295Z",
		"size": 17976724,
		"path": "../public/fieldtrip/mascot-euro.glb"
	},
	"/fieldtrip/mascot-corner.glb": {
		"type": "model/gltf-binary",
		"etag": "\"e9d7d8-WRID3YEjaViFm5jw45koqnABoD0\"",
		"mtime": "2026-07-30T09:35:41.342Z",
		"size": 15325144,
		"path": "../public/fieldtrip/mascot-corner.glb"
	},
	"/fieldtrip/mascot-rest.glb": {
		"type": "model/gltf-binary",
		"etag": "\"13b7aac-jFFbxtSRuKmRy9Y44x1Sh9yCcOI\"",
		"mtime": "2026-07-30T09:35:41.408Z",
		"size": 20675244,
		"path": "../public/fieldtrip/mascot-rest.glb"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_GPBtrI = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_GPBtrI
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
