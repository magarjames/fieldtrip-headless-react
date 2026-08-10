import { createFileRoute } from "@tanstack/react-router";
import { NorthlineLookbook } from "@/components/northline/NorthlineLookbook";
import { pageMeta } from "@/components/northline/parts";

export const Route = createFileRoute("/s_/v8_/lookbook")({
  component: NorthlineLookbookPage,
  head: () =>
    pageMeta(
      "Lookbook | Fieldtrip",
      "Explore the latest looks and full outfits from the Fieldtrip collection.",
    ),
});

function NorthlineLookbookPage() {
  return <NorthlineLookbook />;
}
