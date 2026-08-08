import { createFileRoute } from "@tanstack/react-router";
import { FieldtripPage } from "@/components/street/FieldtripPage";
import { FoldBackdrop } from "@/components/street/FoldBackdrop";
import { NorthlinePage } from "@/components/northline/NorthlinePage";
import { pageMeta } from "@/components/northline/parts";

export const Route = createFileRoute("/s/v6")({
  component: FieldtripNorthlinePage,
  head: () => ({
    ...pageMeta(
      "Fieldtrip x Northline | Dress for the long way home",
      "A playful Fieldtrip fitting room opening into Northline utility layers, materials, and motion.",
    ),
    links: [
      {
        rel: "preload",
        href: "/fieldtrip/mascot-euro.glb",
        as: "fetch",
        type: "model/gltf-binary",
        fetchPriority: "high",
      },
    ],
  }),
});

function FieldtripNorthlinePage() {
  return (
    <>
      <div id="fieldtrip-top">
        <FieldtripPage
          backdrop={<FoldBackdrop />}
          figurePlacement="edge"
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
