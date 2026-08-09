import { createFileRoute } from "@tanstack/react-router";
import { FieldtripPage } from "@/components/street/FieldtripPage";
import { NorthlinePage } from "@/components/northline/NorthlinePage";
import { pageMeta } from "@/components/northline/parts";

export const Route = createFileRoute("/s/v6")({
  ssr: false,
  component: FieldtripNorthlinePage,
  head: () =>
    pageMeta(
      "Fieldtrip x Northline | Dress for the long way home",
      "A playful Fieldtrip fitting room opening into Northline utility layers, materials, and motion.",
    ),
});

function FieldtripNorthlinePage() {
  return (
    <>
      <div id="fieldtrip-top">
        <FieldtripPage
          figurePlacement="edge"
          heroVariant="destinations"
          content="landing"
          primaryHref="#collection"
          secondaryHref="#materials"
          shopHref="#collection"
        />
      </div>
      <NorthlinePage
        showHeader={false}
        showHero={false}
        homeHref="#fieldtrip-top"
        continuation
        splitNavigation
        risingEdge
        scrollSystemStory
        materialsVideoSrc="/northline/materials-motion.mp4"
        materialsCopyVariant="streetwear"
      />
    </>
  );
}
