import { createFileRoute } from "@tanstack/react-router";
import { FigureShop } from "@/components/street/FigureShop";
import { BRAND, DROP, PIECES } from "@/components/street/data";
import { pageMeta } from "@/components/northline/parts";

/* v2: the figure shop, running the three generated GLB figures. */

export const Route = createFileRoute("/s/v2")({
  component: V2,
  head: () =>
    pageMeta(
      `${BRAND} — The Figure Shop`,
      `${DROP} cast as three collectible figures. ${PIECES.length} pieces, worn by the set.`,
    ),
});

function V2() {
  return <FigureShop version="v2" />;
}
