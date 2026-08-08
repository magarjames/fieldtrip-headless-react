import { m as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { t as FigureShop } from "./FigureShop-B1ekYK3N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/s.v3-CJKJVQMB.js
var import_jsx_runtime = require_jsx_runtime();
/** one replica per fit, in FITS order: euro, corner, rest */
var VRM_REPLICAS = [
	"/fieldtrip/v3/euro.vrm",
	"/fieldtrip/v3/corner.vrm",
	"/fieldtrip/v3/rest.vrm"
];
function V3() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FigureShop, {
		version: "v3 · vrm",
		vrmUrls: VRM_REPLICAS,
		note: "Replica build — rigged VRM figures take over each slot as they are exported."
	});
}
//#endregion
export { V3 as component };
