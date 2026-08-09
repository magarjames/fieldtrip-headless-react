import { createFileRoute } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FieldtripPageV8 } from "@/components/street/FieldtripPageV8";
import { FoldBackdropV8 } from "@/components/street/FoldBackdropV8";
import { NorthlinePageV8 } from "@/components/northline/NorthlinePageV8";
import { pageMeta } from "@/components/northline/parts";

export const Route = createFileRoute("/s/v8")({
  ssr: false,
  component: FieldtripNorthlineV8Page,
  head: () =>
    pageMeta(
      "Fieldtrip x Northline V8 | Dress for the long way home",
      "A playful Fieldtrip fitting room opening into Northline utility layers, materials, and motion.",
    ),
});

function FieldtripNorthlineV8Page() {
  const openBag = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("open-northline-bag"));
    }
  };

  return (
    <>
      <PersistentV8Cart onOpen={openBag} />
      <div id="fieldtrip-top">
        <FieldtripPageV8
          backdrop={<FoldBackdropV8 />}
          figurePlacement="edge"
          content="landing"
          primaryHref="#collection"
          secondaryHref="#materials"
          shopHref="#collection"
          showShopAction={false}
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

function PersistentV8Cart({ onOpen }: { onOpen: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <button
      className="v8-global-cart"
      type="button"
      onClick={onOpen}
      aria-label="Open shopping bag"
      aria-haspopup="dialog"
    >
      <span className="v8-global-cart-label">Bag</span>
      <span className="v8-global-cart-icon" aria-hidden="true">
        <ShoppingCart size={19} strokeWidth={2.2} />
      </span>
    </button>,
    document.body,
  );
}
