/**
 * Ten looks, one per /w version.
 *
 * The GL technique was already different per version; the layout was not. This
 * file is what makes each page a different piece of design rather than the same
 * page with a different canvas behind it.
 *
 * Each look carries a direction contract in the impeccable sense (a thesis and
 * a first-viewport commitment), the taste dials it was tuned to, and the
 * concrete tokens the layout engine reads. Nothing here is decorative: every
 * field changes what renders.
 *
 * CONTRAST: every fg/bg and dim/bg pair below was checked to clear WCAG AA for
 * body text (4.5:1). The `dim` values are the ones that moved to get there.
 */

export type HeaderKind = "pill" | "rule" | "centred" | "rail" | "ghost" | "data" | "overlay" | "split";
export type GridKind =
  | "editorial"   // asymmetric, one wide plate per row of three
  | "magazine"    // columns with a drop cap and pull quote
  | "index"       // numbered rows, image on hover only
  | "spec"        // even grid with a spec block under each
  | "bleed"       // alternating full-bleed halves
  | "table"       // dense data table
  | "filmstrip"   // horizontal scroll rail
  | "scatter"     // masonry with vertical offsets
  | "sheet"       // tight contact sheet
  | "rail";       // wide horizontal bands

export type Look = {
  id: string;
  /** impeccable: the argument this page makes that the others do not */
  thesis: string;
  /** taste: variance / motion / density, 1 to 10 */
  dials: [number, number, number];
  /** ui-ux-pro-max style category this is built from */
  style: string;

  bg: string;
  fg: string;
  dim: string;
  hair: string;
  accent: string;
  accentInk: string;

  display: string;
  body: string;
  label: string;
  /** display weight and tracking, which is most of the personality */
  displayWeight: number;
  displayTracking: string;
  displayLeading: number;
  /** uppercase the display face */
  displayUpper: boolean;

  header: HeaderKind;
  grid: GridKind;
  /** page measure */
  shell: string;
  /** section rhythm */
  rhythm: string;
  radius: string;
};

const ARCHIVO = 'Archivo, "Helvetica Neue", sans-serif';
const BLACK = '"Archivo Black", Archivo, sans-serif';
const MONO = '"JetBrains Mono", ui-monospace, monospace';
const PLAYFAIR = '"Playfair Display", Georgia, serif';
const CORMORANT = 'Cormorant, "EB Garamond", Georgia, serif';
const MONTSERRAT = 'Montserrat, Archivo, sans-serif';
const SOURCE_SERIF = '"Source Serif 4", Georgia, serif';
const INTER = 'Inter, Archivo, sans-serif';

export const LOOKS: Record<string, Look> = {
  /* 01 ------------------------------------------------------------------ */
  drift: {
    id: "drift",
    thesis:
      "The gradient is the product photography. Type is set enormous and thin over it, and the catalogue is deliberately small underneath so the field keeps the first screen to itself.",
    dials: [8, 6, 3],
    style: "Exaggerated Minimalism",
    bg: "#050505", fg: "#f5f3ee", dim: "#a9a49b", hair: "rgba(245,243,238,0.14)",
    accent: "#b4543a", accentInk: "#ffffff",
    display: BLACK, body: INTER, label: MONO,
    displayWeight: 400, displayTracking: "-0.055em", displayLeading: 0.84, displayUpper: false,
    header: "pill", grid: "editorial", shell: "1680px", rhythm: "clamp(5rem,11vw,9rem)", radius: "999px",
  },

  /* 02 ------------------------------------------------------------------ */
  cloth: {
    id: "cloth",
    thesis:
      "A cloth merchant's page, set like a printed swatch book. Serif body in real columns, a drop cap, and the shader treated as the plate at the top of the article.",
    dials: [5, 4, 6],
    style: "Editorial Grid / Magazine",
    bg: "#12120f", fg: "#efece3", dim: "#aaa599", hair: "rgba(239,236,227,0.16)",
    accent: "#c2764a", accentInk: "#12120f",
    display: PLAYFAIR, body: SOURCE_SERIF, label: MONO,
    displayWeight: 700, displayTracking: "-0.02em", displayLeading: 0.96, displayUpper: false,
    header: "rule", grid: "magazine", shell: "1240px", rhythm: "clamp(4.5rem,9vw,7.5rem)", radius: "0px",
  },

  /* 03 ------------------------------------------------------------------ */
  vitrine: {
    id: "vitrine",
    thesis:
      "An exhibition, not a shop. Centred wordmark, enormous letter-spacing, and the catalogue as a numbered index whose images only appear on hover, so the list reads as a checklist of works.",
    dials: [6, 5, 2],
    style: "Gallery / Exhibition",
    bg: "#0a0a0b", fg: "#ece9e4", dim: "#a5a19a", hair: "rgba(236,233,228,0.15)",
    accent: "#cfc7b8", accentInk: "#0a0a0b",
    display: CORMORANT, body: MONTSERRAT, label: MONTSERRAT,
    displayWeight: 300, displayTracking: "0.02em", displayLeading: 1.02, displayUpper: true,
    header: "centred", grid: "index", shell: "1400px", rhythm: "clamp(5rem,10vw,8rem)", radius: "0px",
  },

  /* 04 ------------------------------------------------------------------ */
  fold: {
    id: "fold",
    thesis:
      "A Swiss specification sheet on paper. A fixed left rail carries the navigation, the plate sits right, and every piece is a numbered entry with its cloth stated in mono.",
    dials: [5, 3, 7],
    style: "Swiss Print / Utilitarian",
    bg: "#f2f0ea", fg: "#141410", dim: "#54524a", hair: "rgba(20,20,16,0.16)",
    accent: "#b4543a", accentInk: "#ffffff",
    display: ARCHIVO, body: ARCHIVO, label: MONO,
    displayWeight: 700, displayTracking: "-0.035em", displayLeading: 0.94, displayUpper: false,
    header: "rail", grid: "spec", shell: "1560px", rhythm: "clamp(4rem,8vw,7rem)", radius: "0px",
  },

  /* 05 ------------------------------------------------------------------ */
  kiln: {
    id: "kiln",
    thesis:
      "Dark luxury with almost no chrome. A ghost header that disappears into the field, and the catalogue as alternating full-bleed halves so each piece gets a whole screen.",
    dials: [7, 5, 2],
    style: "Dark Editorial Luxury",
    bg: "#070605", fg: "#f2ece4", dim: "#a8a096", hair: "rgba(242,236,228,0.13)",
    accent: "#c25f38", accentInk: "#070605",
    display: PLAYFAIR, body: INTER, label: MONO,
    displayWeight: 400, displayTracking: "-0.015em", displayLeading: 1.0, displayUpper: false,
    header: "ghost", grid: "bleed", shell: "1520px", rhythm: "clamp(6rem,12vw,10rem)", radius: "0px",
  },

  /* 06 ------------------------------------------------------------------ */
  weave: {
    id: "weave",
    thesis:
      "A loom's control panel. Mono everywhere, a live data bar pinned under the header, and the catalogue as a dense sortable table rather than a picture grid.",
    dials: [6, 4, 9],
    style: "Technical Blueprint",
    bg: "#080a09", fg: "#e6e9e4", dim: "#98a094", hair: "rgba(230,233,228,0.16)",
    accent: "#b4543a", accentInk: "#ffffff",
    display: MONO, body: ARCHIVO, label: MONO,
    displayWeight: 500, displayTracking: "-0.02em", displayLeading: 1.04, displayUpper: true,
    header: "data", grid: "table", shell: "1720px", rhythm: "clamp(3.5rem,7vw,5.5rem)", radius: "0px",
  },

  /* 07 ------------------------------------------------------------------ */
  corridor: {
    id: "corridor",
    thesis:
      "Cinema. The header floats over the footage with no bar behind it, titles are set like end credits, and the catalogue is a filmstrip you push sideways.",
    dials: [7, 8, 4],
    style: "Cinematic Overlay",
    bg: "#040404", fg: "#f4f2ed", dim: "#a6a29a", hair: "rgba(244,242,237,0.13)",
    accent: "#e0e0dc", accentInk: "#040404",
    display: BLACK, body: INTER, label: MONO,
    displayWeight: 400, displayTracking: "-0.05em", displayLeading: 0.86, displayUpper: true,
    header: "overlay", grid: "filmstrip", shell: "1760px", rhythm: "clamp(4.5rem,9vw,7rem)", radius: "0px",
  },

  /* 08 ------------------------------------------------------------------ */
  bloom: {
    id: "bloom",
    thesis:
      "The softest page of the ten. A centred column, a light serif at large sizes, and a scattered masonry that never lines up, because the point is dispersal.",
    dials: [7, 6, 3],
    style: "Soft Editorial",
    bg: "#0d0d10", fg: "#eeeae4", dim: "#a7a29c", hair: "rgba(238,234,228,0.14)",
    accent: "#c9a48c", accentInk: "#0d0d10",
    display: CORMORANT, body: INTER, label: MONTSERRAT,
    displayWeight: 300, displayTracking: "-0.01em", displayLeading: 1.0, displayUpper: false,
    header: "centred", grid: "scatter", shell: "1360px", rhythm: "clamp(5rem,10vw,8.5rem)", radius: "0px",
  },

  /* 09 ------------------------------------------------------------------ */
  atlas: {
    id: "atlas",
    thesis:
      "A photographer's contact sheet. Tight gutters, every frame numbered in the margin, and a sticky index down the side that tracks which row you are in.",
    dials: [4, 3, 8],
    style: "Contact Sheet / Archive",
    bg: "#eceae4", fg: "#131311", dim: "#54524c", hair: "rgba(19,19,17,0.18)",
    accent: "#131311", accentInk: "#eceae4",
    display: ARCHIVO, body: ARCHIVO, label: MONO,
    displayWeight: 600, displayTracking: "-0.03em", displayLeading: 0.98, displayUpper: false,
    header: "rail", grid: "sheet", shell: "1640px", rhythm: "clamp(3.5rem,7vw,5.5rem)", radius: "0px",
  },

  /* 10 ------------------------------------------------------------------ */
  tide: {
    id: "tide",
    thesis:
      "A horizon line. The header splits to the two edges leaving the middle empty, everything is centred on one axis, and the catalogue lies down into wide bands.",
    dials: [6, 7, 3],
    style: "Wide Horizon",
    bg: "#060809", fg: "#eef0f1", dim: "#a0a6a9", hair: "rgba(238,240,241,0.14)",
    accent: "#7d97a6", accentInk: "#060809",
    display: PLAYFAIR, body: MONTSERRAT, label: MONTSERRAT,
    displayWeight: 400, displayTracking: "-0.02em", displayLeading: 0.98, displayUpper: false,
    header: "split", grid: "rail", shell: "1600px", rhythm: "clamp(5rem,10vw,8rem)", radius: "999px",
  },
};

export const lookOf = (id: string): Look => LOOKS[id] ?? LOOKS.drift;
