/**
 * NORTHLINE — image manifest for the /w versions.
 *
 * Every picture on every version resolves through `media()`. Entries that have
 * been generated on Higgsfield point at a local file under public/northline;
 * entries still pending resolve to a placeholder of the right shape, so a page
 * is never broken by a missing asset and adding a real one is a one-line edit.
 *
 * Generated with Higgsfield soul_2 (fashion editorial), art-directed to one
 * brief: overcast north light, muted olive / stone / rust / near-black, matte
 * film grain, no logos and no text anywhere in frame. Original imagery for a
 * store that does not exist; no real brand, garment or person is depicted.
 */

export type MediaKey =
  | "hero"
  | "overshirt"
  | "parka"
  | "knit"
  | "trouser"
  | "tee"
  | "accessories"
  | "atelier"
  | "cutting"
  | "rail"
  | "weave";

/** null means not generated yet, and the placeholder takes over */
const LOCAL: Record<MediaKey, string | null> = {
  hero: "/northline/hero-campaign.png",
  overshirt: "/northline/overshirt.png",
  parka: "/northline/parka.png",
  knit: "/northline/knit.png",
  trouser: null,
  tee: null,
  accessories: null,
  atelier: null,
  cutting: null,
  rail: null,
  weave: null,
};

export const media = (k: MediaKey, w = 1200, h = 1500) =>
  LOCAL[k] ?? `https://picsum.photos/seed/northline-w-${k}/${w}/${h}`;

/** true when the key resolves to a real generated asset */
export const isReal = (k: MediaKey) => LOCAL[k] !== null;

/** the four scroll-world scenes, in flight order */
export const SCENES: { id: string; key: MediaKey; label: string; body: string }[] = [
  {
    id: "atelier",
    key: "atelier",
    label: "The atelier",
    body: "Cloth is chosen before anything is drawn. The edition starts at the bolt.",
  },
  {
    id: "cutting",
    key: "cutting",
    label: "The cutting floor",
    body: "Pattern pieces are cut to order, never to forecast. Nothing is cut twice.",
  },
  {
    id: "bench",
    key: "weave",
    label: "The bench",
    body: "One maker takes a garment from bundle to finish. It is slower and it shows.",
  },
  {
    id: "rail",
    key: "rail",
    label: "The rail",
    body: "Finished pieces hang for a day before they ship. That is the whole warehouse.",
  },
];
