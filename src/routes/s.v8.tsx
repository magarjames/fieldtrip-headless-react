import { createFileRoute } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { FieldtripPageV8 } from "@/components/street/FieldtripPageV8";
import { FoldBackdropV8 } from "@/components/street/FoldBackdropV8";
import { NorthlinePageV8 } from "@/components/northline/NorthlinePageV8";
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
    <>
      <div id="fieldtrip-top">
        <FieldtripPageV8
          backdrop={<FoldBackdropV8 />}
          figurePlacement="edge"
          content="landing"
          primaryHref="#collection"
          secondaryHref="/s/v8/shop"
          shopHref="#collection"
          shopText={<ShoppingCart size={20} />}
          onShopClick={() => {
            if (typeof window !== "undefined") {
              window.dispatchEvent(new Event("open-northline-bag"));
            }
          }}
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
