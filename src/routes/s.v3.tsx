import { createFileRoute } from "@tanstack/react-router";
import { FigureShop } from "@/components/street/FigureShop";
import { BRAND, DROP, PIECES } from "@/components/street/data";
import { pageMeta } from "@/components/northline/parts";

/* v3: the figure shop pointed at per-fit VRM replicas built in VRoid Studio.
   Each replica takes over its fit the moment it lands in public/fieldtrip/v3/;
   until then the fit's generated GLB carries the slot. */

/** one replica per fit, in FITS order: euro, corner, rest */
const VRM_REPLICAS = [
  "/fieldtrip/v3/euro.vrm",
  "/fieldtrip/v3/corner.vrm",
  "/fieldtrip/v3/rest.vrm",
] as const;

export const Route = createFileRoute("/s/v3")({
  component: V3,
  head: () =>
    pageMeta(
      `${BRAND} — The Figure Shop (VRM)`,
      `${DROP} cast as three collectible figures. ${PIECES.length} pieces, worn by the set.`,
    ),
});

function V3() {
  return (
    <FigureShop
      version="v3 · vrm"
      vrmUrls={VRM_REPLICAS}
      note="Replica build — rigged VRM figures take over each slot as they are exported."
    />
  );
}
