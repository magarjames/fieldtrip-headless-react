import { createFileRoute } from "@tanstack/react-router";
import { ScanRunwayHero } from "@/components/street/ScanRunwayHero";
import { NorthlinePageV8 } from "@/components/northline/NorthlinePageV8";
import { pageMeta } from "@/components/northline/parts";

export const Route = createFileRoute("/s/v8")({
  component: FieldtripNorthlineV8Page,
  head: () =>
    pageMeta(
      "Vivre x Northline V8 | Dress for the long way home",
      "A playful Vivre fitting room opening into Northline utility layers, materials, and motion.",
    ),
});

function FieldtripNorthlineV8Page() {
  return (
    <>
      <div id="fieldtrip-top">
        <ScanRunwayHero
          primaryHref="#collection"
          secondaryHref="/s/v8/shop"
          shopHref="/s/v8/shop"
          showPrimaryNavigation={false}
          hideBag={true}
        />
      </div>
      <NorthlinePageV8
        showHeader={false}
        showHero={false}
        homeHref="#fieldtrip-top"
        continuation
        splitNavigation
        risingEdge={false}
      />
    </>
  );
}
