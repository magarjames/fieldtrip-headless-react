import { createFileRoute } from "@tanstack/react-router";
import { NorthlineWorld } from "@/components/northline-world/NorthlineWorld";

export const Route = createFileRoute("/northline-world")({
  component: NorthlineWorld,
  head: () => ({
    meta: [
      { title: "Northline World | A field study in the long way home" },
      {
        name: "description",
        content:
          "A scroll-driven Northline field study through threshold, material, transit, weather, and return.",
      },
    ],
  }),
});
