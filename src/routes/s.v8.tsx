import { createFileRoute } from "@tanstack/react-router";
import { ScanRunwayHero } from "@/components/street/ScanRunwayHero";
import { pageMeta } from "@/components/northline/parts";

export const Route = createFileRoute("/s/v8")({
  component: FieldtripNorthlineV8Page,
  head: () =>
    pageMeta(
      "Fieldtrip x Northline V8 | Dress for the long way home",
      "A playful Fieldtrip fitting room opening into Northline utility layers, materials, and motion.",
    ),
});

function FieldtripNorthlineV8Page() {
  return (
    <div id="fieldtrip-top">
      <ScanRunwayHero
        primaryHref="/lookbook"
        secondaryHref="/s/v8/shop"
        shopHref="/s/v8/shop"
        showPrimaryNavigation={false}
        onBagClick={() => window.dispatchEvent(new Event("open-northline-bag"))}
      />
    </div>
  );
}
