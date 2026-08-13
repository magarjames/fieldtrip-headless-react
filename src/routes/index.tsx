import { createFileRoute } from "@tanstack/react-router";
import { ScanRunwayHero } from "@/components/street/ScanRunwayHero";
import { NorthlinePageV8 } from "@/components/northline/NorthlinePageV8";
import { pageMeta } from "@/components/northline/parts";

export const Route = createFileRoute("/")({
  component: VivreNorthlineV8Page,
  head: () =>
    pageMeta(
      "Vivre x Northline V8 | Dress for the long way home",
      "A playful Vivre fitting room opening into Northline utility layers, materials, and motion.",
    ),
});

function VivreNorthlineV8Page() {
  return (
    <>
      <div id="fieldtrip-top">
        <ScanRunwayHero
          primaryHref="#collection"
          secondaryHref="#materials"
          shopHref="#collection"
          showPrimaryNavigation={false}
          onBagClick={() => window.dispatchEvent(new Event("open-northline-bag"))}
        />
      </div>
      <NorthlinePageV8
        showHeader={false}
        showHero={false}
        homeHref="#fieldtrip-top"
        continuation
        splitNavigation
        risingEdge
      />
    </>
  );
}
