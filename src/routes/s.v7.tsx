import { createFileRoute } from "@tanstack/react-router";
import { FieldtripPage } from "@/components/street/FieldtripPage";
import { FoldBackdrop } from "@/components/street/FoldBackdrop";
import { NorthlinePage } from "@/components/northline/NorthlinePage";
import { pageMeta } from "@/components/northline/parts";

export const Route = createFileRoute("/s/v7")({
  component: FieldtripNorthlineV7Page,
  head: () =>
    pageMeta(
      "Vivre x Northline V7 | Dress for the long way home",
      "An independent V7 workspace copied from the Vivre and Northline merged storefront.",
    ),
});

function FieldtripNorthlineV7Page() {
  return (
    <>
      <div id="fieldtrip-v7-top">
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
        homeHref="#fieldtrip-v7-top"
        continuation
      />
    </>
  );
}
