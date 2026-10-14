import { createFileRoute } from "@tanstack/react-router";
import { StudioWebsite } from "@/components/studio/StudioWebsite";
import { pageMeta } from "@/components/northline/parts";

export const Route = createFileRoute("/s/v7")({
  component: StudioWebsite,
  head: () =>
    pageMeta(
      "James Thapa · Studio | Creative Director & Systems Architect",
      "Studio website featuring tactile digital commerce, quantitative trading bots, production hospitality software, and autonomous AI systems over a live crease shader gradient.",
    ),
});
