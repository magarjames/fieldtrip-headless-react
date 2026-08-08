import { createFileRoute } from "@tanstack/react-router";
import { NorthlinePage } from "@/components/northline/NorthlinePage";

export const Route = createFileRoute("/northline")({
  component: NorthlinePage,
  head: () => ({
    meta: [
      { title: "Northline | Utility layers for the long way home" },
      {
        name: "description",
        content:
          "An original concept storefront for Northline, a curated urban apparel collection.",
      },
    ],
  }),
});
