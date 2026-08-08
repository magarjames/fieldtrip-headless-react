import { createFileRoute } from "@tanstack/react-router";
import { FieldtripPage } from "@/components/street/FieldtripPage";
import { BRAND, TAGLINE, DROP, PIECE_COUNT } from "@/components/street/data";
import { pageMeta } from "@/components/northline/parts";

/* v1: the bright build. The page itself lives in FieldtripPage so v5 can run
   the same layout on the figure shop's dark tokens. */

export const Route = createFileRoute("/s/")({
  component: () => <FieldtripPage />,
  head: () =>
    pageMeta(`${BRAND} — ${DROP}`, `${TAGLINE}. ${PIECE_COUNT} pieces, styled as fits.`),
});
