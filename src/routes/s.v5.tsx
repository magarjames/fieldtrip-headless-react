import { createFileRoute } from "@tanstack/react-router";
import { FieldtripPage } from "@/components/street/FieldtripPage";
import { FoldBackdrop } from "@/components/street/FoldBackdrop";
import { BRAND, TAGLINE, DROP, PIECE_COUNT } from "@/components/street/data";
import { pageMeta } from "@/components/northline/parts";

/* v5: the v1 shop layout over the fold crease shader — a 1:1 copy of v4's
   gradient, same per-fit palettes and crossfade. The field is pale, so the
   page runs the bright tokens (ink type) rather than v5's old after-dark
   flip. */

export const Route = createFileRoute("/s/v5")({
  component: () => (
    <FieldtripPage
      backdrop={<FoldBackdrop />}
      figurePlacement="edge"
    />
  ),
  head: () =>
    pageMeta(
      `${BRAND} — ${DROP} After Dark`,
      `${TAGLINE}. ${PIECE_COUNT} pieces, styled as fits, on the ink field.`,
    ),
});
