import { createFileRoute } from "@tanstack/react-router";
import { ScanRunwayHero } from "@/components/street/ScanRunwayHero";
import { NorthlinePage } from "@/components/northline/NorthlinePage";
import { pageMeta } from "@/components/northline/parts";

export const Route = createFileRoute("/s/v6")({
  component: FieldtripNorthlinePage,
  head: () => ({
    ...pageMeta(
      "Fieldtrip Drop 04 | Scan every angle",
      "Rotate seven streetwear looks inside the Fieldtrip scan chamber, then enter the Drop 04 collection.",
    ),
    links: [
      {
        rel: "preload",
        href: "/fieldtrip/scan-f4/a.jpg",
        as: "image",
        fetchPriority: "high",
      },
    ],
  }),
});

function FieldtripNorthlinePage() {
  return (
    <>
      <div id="fieldtrip-top">
        <ScanRunwayHero
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
