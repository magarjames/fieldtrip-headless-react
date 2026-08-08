import { createFileRoute } from "@tanstack/react-router";
import { FigureShop } from "@/components/street/FigureShop";
import { FoldBackdrop } from "@/components/street/FoldBackdrop";
import { BRAND, DROP, PIECES } from "@/components/street/data";
import { pageMeta } from "@/components/northline/parts";

/* v4: the figure shop over the NORTHLINE fold shader — the crease program
   from /w/fold regraded in FIELDTRIP colours and run as the page backdrop.
   Figures are the same generated GLBs as v2; the VRM slots stay v3's job. */

export const Route = createFileRoute("/s/v4")({
  component: V4,
  head: () =>
    pageMeta(
      `${BRAND} — The Figure Shop (Fold)`,
      `${DROP} cast as three collectible figures over a live creased gradient. ${PIECES.length} pieces, worn by the set.`,
    ),
});

function V4() {
  return (
    <FigureShop
      version="v4 · fold"
      backdrop={<FoldBackdrop />}
      tone="light"
      note="Fold build — the /w/fold crease shader in the drop's light colours, running behind the stage. Scroll to deepen the folds."
    />
  );
}
