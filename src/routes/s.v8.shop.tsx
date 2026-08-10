import { createFileRoute } from "@tanstack/react-router";
import { NorthlineShop } from "@/components/northline/NorthlineShop";
import { pageMeta } from "@/components/northline/parts";

export const Route = createFileRoute("/s/v8/shop")({
  component: NorthlineShopPage,
  head: () =>
    pageMeta(
      "Shop | Northline",
      "Explore the full collection of Northline utility layers, materials, and accessories.",
    ),
});

function NorthlineShopPage() {
  return <NorthlineShop />;
}
