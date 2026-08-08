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
	"/assets/Chibi-C6b84XRg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3fa05-lVmVWSCQGTQejtucta3HY0EeV+c\"",
		"mtime": "2026-07-31T10:48:51.697Z",
		"size": 260613,
		"path": "../public/assets/Chibi-C6b84XRg.js"
	},
	"/assets/chunk-KLJOXLT7-Dg06-RAp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"39f1d-/VZq7h4+NCci3n1a2ydPTTp5lA4\"",
		"mtime": "2026-07-31T10:48:51.704Z",
		"size": 237341,
		"path": "../public/assets/chunk-KLJOXLT7-Dg06-RAp.js"
	},
	"/assets/detail-blue-CKbiPOwp.jpg": {
		"type": "image/jpeg",
		"etag": "\"1fd9e-seQQSuoEapSf32OS2PJ7V/bmPVI\"",
		"mtime": "2026-07-31T10:48:52.087Z",
		"size": 130462,
		"path": "../public/assets/detail-blue-CKbiPOwp.jpg"
	},
	"/assets/FigureShop-BFoDm5Wh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"183d-IFgbULYGjy2yrJ55yjQDIy+ePuw\"",
		"mtime": "2026-07-31T10:48:51.700Z",
		"size": 6205,
		"path": "../public/assets/FigureShop-BFoDm5Wh.js"
	},
	"/assets/editions-DkuCB_gg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4b50-1CscX8TRhacQx1n4omzc/iIIyQs\"",
		"mtime": "2026-07-31T10:48:51.709Z",
		"size": 19280,
		"path": "../public/assets/editions-DkuCB_gg.js"
	},
	"/assets/flatlay-9d5QaqnP.jpg": {
		"type": "image/jpeg",
		"etag": "\"1c0f7-hztTY08Y33KqBvxTkb7O4SQ+als\"",
		"mtime": "2026-07-31T10:48:52.221Z",
		"size": 114935,
		"path": "../public/assets/flatlay-9d5QaqnP.jpg"
	},
	"/assets/index-D6gLkmOb.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"6ac8-Rs7yoj1ip9z5IWFA57EWdER/jh4\"",
		"mtime": "2026-07-31T10:48:52.227Z",
		"size": 27336,
		"path": "../public/assets/index-D6gLkmOb.css"
	},
	"/assets/jsx-runtime-DUAcabCT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"42a-6CWT3JsIzkgrrMo5qQ6L1UWEbvM\"",
		"mtime": "2026-07-31T10:48:51.731Z",
		"size": 1066,
		"path": "../public/assets/jsx-runtime-DUAcabCT.js"
	},
	"/assets/looks-CPW_gW3B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"58ba-+t5bybLvSk5Nj3f4lcdgmhINIDQ\"",
		"mtime": "2026-07-31T10:48:51.734Z",
		"size": 22714,
		"path": "../public/assets/looks-CPW_gW3B.js"
	},
	"/assets/index-Ccrte07v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b255-k9skHFnqboWhMTQ22wns7456zlw\"",
		"mtime": "2026-07-31T10:48:51.695Z",
		"size": 373333,
		"path": "../public/assets/index-Ccrte07v.js"
	},
	"/assets/hero-dawn-6TPsLdgK.png": {
		"type": "image/png",
		"etag": "\"14cd99-5BYErOTqDsbxYBAf9Xkji6IJgAs\"",
		"mtime": "2026-07-31T10:48:52.225Z",
		"size": 1363353,
		"path": "../public/assets/hero-dawn-6TPsLdgK.png"
	},
	"/assets/film-material-X9WVxpOr.png": {
		"type": "image/png",
		"etag": "\"19a996-i2uXtAXtbBV7hAcj5RMIXQcFZ9A\"",
		"mtime": "2026-07-31T10:48:52.192Z",
		"size": 1681814,
		"path": "../public/assets/film-material-X9WVxpOr.png"
	},
	"/assets/film-arrival-Dl2L1jEl.png": {
		"type": "image/png",
		"etag": "\"1d418a-Z0MjF4j1LVAZv1u82b8KLgaQo14\"",
		"mtime": "2026-07-31T10:48:52.143Z",
		"size": 1917322,
		"path": "../public/assets/film-arrival-Dl2L1jEl.png"
	},
	"/assets/mascot-cup-DHz203SX.png": {
		"type": "image/png",
		"etag": "\"4ba47-L5qxksI+lLb9iYDLxQ5+pHV9HRA\"",
		"mtime": "2026-07-31T10:48:52.252Z",
		"size": 309831,
		"path": "../public/assets/mascot-cup-DHz203SX.png"
	},
	"/assets/mascot-pencil-Dy5Vtk_v.png": {
		"type": "image/png",
		"etag": "\"71259-qFPFrExwp/jYvWfiIJDw75/zT4w\"",
		"mtime": "2026-07-31T10:48:52.264Z",
		"size": 463449,
		"path": "../public/assets/mascot-pencil-Dy5Vtk_v.png"
	},
	"/assets/mascot-wave-BeL1-syi.png": {
		"type": "image/png",
		"etag": "\"441df-L4IVL2uX0qW7qVeLNWlZpEBC1H8\"",
		"mtime": "2026-07-31T10:48:52.266Z",
		"size": 279007,
		"path": "../public/assets/mascot-wave-BeL1-syi.png"
	},
	"/assets/materials-CQ6v9x-F.jpg": {
		"type": "image/jpeg",
		"etag": "\"31fcb-HjQWUHgRwcSM8kuz00+DtLAyops\"",
		"mtime": "2026-07-31T10:48:52.267Z",
		"size": 204747,
		"path": "../public/assets/materials-CQ6v9x-F.jpg"
	},
	"/assets/media-CLVkxnAX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"364-Loo/iDQs0IL6w5MITAL03XRECJY\"",
		"mtime": "2026-07-31T10:48:51.739Z",
		"size": 868,
		"path": "../public/assets/media-CLVkxnAX.js"
	},
	"/assets/nl.brutalist-ClJfi6Tw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f8f-sH8dgN56zHsSW8yJCAS0E6ExU4A\"",
		"mtime": "2026-07-31T10:48:51.741Z",
		"size": 8079,
		"path": "../public/assets/nl.brutalist-ClJfi6Tw.js"
	},
	"/assets/nl.flight-3_Gtqfy9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1530-hQY8EMNytwOtuDAIIfFEkLWn13I\"",
		"mtime": "2026-07-31T10:48:51.743Z",
		"size": 5424,
		"path": "../public/assets/nl.flight-3_Gtqfy9.js"
	},
	"/assets/nl.gallery-mGzRzpGW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ee1-hCCKGdMIn89vS7tjJhG13vAae0U\"",
		"mtime": "2026-07-31T10:48:51.746Z",
		"size": 12001,
		"path": "../public/assets/nl.gallery-mGzRzpGW.js"
	},
	"/assets/nl.hyer-CKWyBFm7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2bca-NEWOg1oJT3NgEBcEyRu1h2rIvh4\"",
		"mtime": "2026-07-31T10:48:51.749Z",
		"size": 11210,
		"path": "../public/assets/nl.hyer-CKWyBFm7.js"
	},
	"/assets/nl.impeccable-fJn779De.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1391-6nhVu/nwJdTZapkH3OoJqrfbAzE\"",
		"mtime": "2026-07-31T10:48:51.751Z",
		"size": 5009,
		"path": "../public/assets/nl.impeccable-fJn779De.js"
	},
	"/assets/mascot-box-DIfz1l8J.png": {
		"type": "image/png",
		"etag": "\"8cdc8-GoJhFWE7AN6pAEh4dMBSdXbaBMU\"",
		"mtime": "2026-07-31T10:48:52.238Z",
		"size": 576968,
		"path": "../public/assets/mascot-box-DIfz1l8J.png"
	},
	"/assets/film-terminal-BAUEZyYr.png": {
		"type": "image/png",
		"etag": "\"205f53-pjAugwL9/jYB7NOAncCY8HG6Rsw\"",
		"mtime": "2026-07-31T10:48:52.211Z",
		"size": 2121555,
		"path": "../public/assets/film-terminal-BAUEZyYr.png"
	},
	"/fieldtrip/fit-euro.png": {
		"type": "image/png",
		"etag": "\"2d72ac-m+SVVLtnmuZ2DBwZSaYxtPXRUS8\"",
		"mtime": "2026-07-29T22:24:10.068Z",
		"size": 2978476,
		"path": "../public/fieldtrip/fit-euro.png"
	},
	"/assets/nl.index-B4REp4kl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13bb-3Sytd/XtR0Ch1b2t68ksWljQlFA\"",
		"mtime": "2026-07-31T10:48:51.753Z",
		"size": 5051,
		"path": "../public/assets/nl.index-B4REp4kl.js"
	},
	"/assets/mascot-BiHCRhrh.png": {
		"type": "image/png",
		"etag": "\"1c1644-DCr3BeQxAsbLUYwp1yZFfXDC9hE\"",
		"mtime": "2026-07-31T10:48:52.232Z",
		"size": 1840708,
		"path": "../public/assets/mascot-BiHCRhrh.png"
	},
	"/assets/nl.minimal-U-b1wVIA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2cd6-+MsGC/3eUe5FL1L5UUq7vziaN8k\"",
		"mtime": "2026-07-31T10:48:51.755Z",
		"size": 11478,
		"path": "../public/assets/nl.minimal-U-b1wVIA.js"
	},
	"/assets/nl.taste-TtCt0CrA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19b5-gSfaSOZ1Hz+3F7X8aiYrzQHYYXw\"",
		"mtime": "2026-07-31T10:48:51.764Z",
		"size": 6581,
		"path": "../public/assets/nl.taste-TtCt0CrA.js"
	},
	"/northline/hero-campaign.png": {
		"type": "image/png",
		"etag": "\"42de98-CZubi2+f4xUPg7EU9g3LWyjRV50\"",
		"mtime": "2026-07-29T20:29:58.853Z",
		"size": 4382360,
		"path": "../public/northline/hero-campaign.png"
	},
	"/assets/northline-world-BYXoHGc-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"188f-7RqNl5jFaPKJurGbmD+LqdaJTVg\"",
		"mtime": "2026-07-31T10:48:51.836Z",
		"size": 6287,
		"path": "../public/assets/northline-world-BYXoHGc-.js"
	},
	"/assets/northline-DCps4Tb-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37f7-DF6ZxzpqyWh4wmPj0JvD2EDYqzE\"",
		"mtime": "2026-07-31T10:48:51.776Z",
		"size": 14327,
		"path": "../public/assets/northline-DCps4Tb-.js"
	},
	"/assets/northline-world-D3UusYiG.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"2273-4aOrIJZstRRjbANUWB3/azEjBP0\"",
		"mtime": "2026-07-31T10:48:52.272Z",
		"size": 8819,
		"path": "../public/assets/northline-world-D3UusYiG.css"
	},
	"/assets/s.index-CuP1AEh6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f0c-joHr4tdwSr34KcJTslRy0k3Kriw\"",
		"mtime": "2026-07-31T10:48:51.933Z",
		"size": 7948,
		"path": "../public/assets/s.index-CuP1AEh6.js"
	},
	"/assets/s.v3-CtN5krWU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15e-Dvu28nO9K1+XuwrVh/9bsMM9apk\"",
		"mtime": "2026-07-31T10:48:51.963Z",
		"size": 350,
		"path": "../public/assets/s.v3-CtN5krWU.js"
	},
	"/assets/s.v2-DsCSvn9y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a6-2uA8EYFgCC9DO8JLw5NEmq/iH8I\"",
		"mtime": "2026-07-31T10:48:51.948Z",
		"size": 166,
		"path": "../public/assets/s.v2-DsCSvn9y.js"
	},
	"/assets/routes-HMo1I_Sj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"555c-EFkPf4mbLbetMHqRIDiMFeDjJ1A\"",
		"mtime": "2026-07-31T10:48:51.918Z",
		"size": 21852,
		"path": "../public/assets/routes-HMo1I_Sj.js"
	},
	"/assets/stage-BiSUwCnN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"629-6coYWghn/8CWftcLJT+yRtD4p+c\"",
		"mtime": "2026-07-31T10:48:51.981Z",
		"size": 1577,
		"path": "../public/assets/stage-BiSUwCnN.js"
	},
	"/assets/shaders-DrDHMxnI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1589-18fVp7XGqhg4cVbd50xtQp2rbTc\"",
		"mtime": "2026-07-31T10:48:51.978Z",
		"size": 5513,
		"path": "../public/assets/shaders-DrDHMxnI.js"
	},
	"/assets/styles-CTh3EHqe.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1b007-+JSH72xHhr6xgc3547Rgd7Xa+3E\"",
		"mtime": "2026-07-31T10:48:52.274Z",
		"size": 110599,
		"path": "../public/assets/styles-CTh3EHqe.css"
	},
	"/assets/w.atlas-CUnyvJCY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"904-JswpHb1vIOIDoX+rYRprunlcHbk\"",
		"mtime": "2026-07-31T10:48:51.982Z",
		"size": 2308,
		"path": "../public/assets/w.atlas-CUnyvJCY.js"
	},
	"/northline/overshirt.png": {
		"type": "image/png",
		"etag": "\"4b8974-vv797XTsDBg5PxG5VK9T4maFTp4\"",
		"mtime": "2026-07-29T20:32:17.217Z",
		"size": 4950388,
		"path": "../public/northline/overshirt.png"
	},
	"/fieldtrip/hero.png": {
		"type": "image/png",
		"etag": "\"4ac9b5-XTEpwS/sojyNhIDQOmg3KNkqCME\"",
		"mtime": "2026-07-29T22:08:48.156Z",
		"size": 4901301,
		"path": "../public/fieldtrip/hero.png"
	},
	"/assets/w.bloom-AMyXDCC3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dcb-1Yw1FeSsAEB4s4GDMdu8Eh91OtU\"",
		"mtime": "2026-07-31T10:48:52.001Z",
		"size": 3531,
		"path": "../public/assets/w.bloom-AMyXDCC3.js"
	},
	"/assets/react-three-fiber.esm-r2kZ_OC1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d7288-2KvIBztZipUaRWZetwXIFOmGmTw\"",
		"mtime": "2026-07-31T10:48:51.898Z",
		"size": 881288,
		"path": "../public/assets/react-three-fiber.esm-r2kZ_OC1.js"
	},
	"/northline/parka.png": {
		"type": "image/png",
		"etag": "\"4bb480-my/5E7aRqK5QdUJ5DkGaxLtOyzs\"",
		"mtime": "2026-07-29T20:32:19.136Z",
		"size": 4961408,
		"path": "../public/northline/parka.png"
	},
	"/assets/w.cloth-CpHDQrl4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8f6-XuzWhsPjdpDfgBcuJyPKx/VWLMI\"",
		"mtime": "2026-07-31T10:48:52.035Z",
		"size": 2294,
		"path": "../public/assets/w.cloth-CpHDQrl4.js"
	},
	"/assets/w.corridor-B0iSIrdx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c10-t5AkTRxKCUO1iOoj+jx8BTGca00\"",
		"mtime": "2026-07-31T10:48:52.036Z",
		"size": 3088,
		"path": "../public/assets/w.corridor-B0iSIrdx.js"
	},
	"/assets/w.drift-BGK3N7up.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"940-uPmwxayYhO/PwvwQuUxzCPFOZ4w\"",
		"mtime": "2026-07-31T10:48:52.038Z",
		"size": 2368,
		"path": "../public/assets/w.drift-BGK3N7up.js"
	},
	"/northline/knit.png": {
		"type": "image/png",
		"etag": "\"5ab5ef-HTewKecYhbnjrfqSwjkjhiIejBg\"",
		"mtime": "2026-07-29T21:50:15.376Z",
		"size": 5944815,
		"path": "../public/northline/knit.png"
	},
	"/assets/w.fold-mwk08kz-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"88b-bN73ThvxeA1D5PIs+Q10lt1m3Gw\"",
		"mtime": "2026-07-31T10:48:52.040Z",
		"size": 2187,
		"path": "../public/assets/w.fold-mwk08kz-.js"
	},
	"/assets/w.index-BRfs3skV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1469-YBQA66b5FooVcV3MfdgRoWdKzMo\"",
		"mtime": "2026-07-31T10:48:52.040Z",
		"size": 5225,
		"path": "../public/assets/w.index-BRfs3skV.js"
	},
	"/assets/w.kiln-BrhDKj4s.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae5-xwVl/sZ0isog0vQPOAGO+FzHvjo\"",
		"mtime": "2026-07-31T10:48:52.046Z",
		"size": 2789,
		"path": "../public/assets/w.kiln-BrhDKj4s.js"
	},
	"/assets/w.tide-D3sve1RW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e56-+VRKpc3qviXufIXq1CnO/Bcb88g\"",
		"mtime": "2026-07-31T10:48:52.051Z",
		"size": 3670,
		"path": "../public/assets/w.tide-D3sve1RW.js"
	},
	"/assets/w.vitrine-VHBXGJzH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"957-4fbaaHM4QLhjsHd27lIteK9wn1k\"",
		"mtime": "2026-07-31T10:48:52.057Z",
		"size": 2391,
		"path": "../public/assets/w.vitrine-VHBXGJzH.js"
	},
	"/assets/w.weave-CHTczSO4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9e1-YnlaxUvNIQwj1uHeTgrlo/yj+eY\"",
		"mtime": "2026-07-31T10:48:52.060Z",
		"size": 2529,
		"path": "../public/assets/w.weave-CHTczSO4.js"
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
	"/assets/world-return-B07MOQTY.png": {
		"type": "image/png",
		"etag": "\"257313-kPzfa7/p/M9AJq6VvZlZNTkXNP4\"",
		"mtime": "2026-07-31T10:48:52.287Z",
		"size": 2454291,
		"path": "../public/assets/world-return-B07MOQTY.png"
	},
	"/assets/world-weather-CPPdpX6E.png": {
		"type": "image/png",
		"etag": "\"26a8d6-hqawBg+BCrjWq/ahp6rfGLNU264\"",
		"mtime": "2026-07-31T10:48:52.305Z",
		"size": 2533590,
		"path": "../public/assets/world-weather-CPPdpX6E.png"
	},
	"/assets/world-forge--sz7H03F.png": {
		"type": "image/png",
		"etag": "\"2296ee-I8ulAtQjxjFmi1aJv8UhINl0ddU\"",
		"mtime": "2026-07-31T10:48:52.282Z",
		"size": 2266862,
		"path": "../public/assets/world-forge--sz7H03F.png"
	},
	"/assets/world-threshold-BJlHpRU0.png": {
		"type": "image/png",
		"etag": "\"22ee19-OGwPa5x7pnUTKytG15GjMHKZapw\"",
		"mtime": "2026-07-31T10:48:52.293Z",
		"size": 2289177,
		"path": "../public/assets/world-threshold-BJlHpRU0.png"
	},
	"/assets/world-transit-CGqateru.png": {
		"type": "image/png",
		"etag": "\"2351fe-ffdU+mAqTBDx4XvKx5ia6KSRvvQ\"",
		"mtime": "2026-07-31T10:48:52.299Z",
		"size": 2314750,
		"path": "../public/assets/world-transit-CGqateru.png"
	},
	"/northline-motion/film-arrival-motion.gif": {
		"type": "image/gif",
		"etag": "\"40cd0e-5ox61X0WCfMRBMN5fz7NkxXYIp8\"",
		"mtime": "2026-07-29T17:17:25.792Z",
		"size": 4246798,
		"path": "../public/northline-motion/film-arrival-motion.gif"
	},
	"/northline-motion/film-material-motion.gif": {
		"type": "image/gif",
		"etag": "\"60e138-7P28lGyohdcCo1q0a+AAghUCboo\"",
		"mtime": "2026-07-29T17:17:31.804Z",
		"size": 6349112,
		"path": "../public/northline-motion/film-material-motion.gif"
	},
	"/northline-motion/film-terminal-motion.gif": {
		"type": "image/gif",
		"etag": "\"846728-sO8tPpSc15fC0zZk7Vm7+8Fl9gU\"",
		"mtime": "2026-07-29T17:17:38.009Z",
		"size": 8677160,
		"path": "../public/northline-motion/film-terminal-motion.gif"
	},
	"/fieldtrip/mascot-corner.glb": {
		"type": "model/gltf-binary",
		"etag": "\"e9d7d8-WRID3YEjaViFm5jw45koqnABoD0\"",
		"mtime": "2026-07-30T09:35:41.342Z",
		"size": 15325144,
		"path": "../public/fieldtrip/mascot-corner.glb"
	},
	"/fieldtrip/mascot-euro.glb": {
		"type": "model/gltf-binary",
		"etag": "\"1124d94-WHlskCAhQ0rNF60eM7viNIdVoxE\"",
		"mtime": "2026-07-30T09:35:41.295Z",
		"size": 17976724,
		"path": "../public/fieldtrip/mascot-euro.glb"
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
