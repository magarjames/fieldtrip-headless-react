/**
 * FIELDTRIP — image layer.
 *
 * No external image service. Real photography, when it exists, is a local file
 * under public/fieldtrip. Anything not yet photographed resolves to a swatch
 * generated from that garment's own colour, inline as an SVG data URI.
 *
 * Why not a placeholder service: random stock photography actively misleads on
 * a page this art-directed. A visitor cannot tell a stand-in from a product
 * shot, and neither can you when reviewing it. A flat colour card with the
 * garment's name on it is unmistakably a gap, and it still reads as the brand
 * because the colour is the real one from the catalogue.
 */

/** photographed and committed. Everything else falls through to a swatch. */
const LOCAL: Record<string, string> = {
  "ft-hero": "/fieldtrip/hero.png",
  "ft-fit-euro": "/fieldtrip/fit-euro.png",
};

export const hasShot = (key: string) => key in LOCAL;

/** WCAG relative luminance, so the label never lands unreadable on its own hue */
function luminance(hex: string) {
  const h = hex.replace("#", "");
  const n = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const [r, g, b] = [0, 2, 4].map((i) => {
    const v = parseInt(n.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

const INK = "#141317";
const PAPER = "#FBF7EF";

/** the label colour that clears 4.5:1 against the swatch it sits on */
export function inkOn(hue: string) {
  const l = luminance(hue);
  const onInk = (l + 0.05) / (luminance(INK) + 0.05);
  const onPaper = (luminance(PAPER) + 0.05) / (l + 0.05);
  return onInk >= onPaper ? INK : PAPER;
}

/**
 * A swatch card: the garment's colour, its name, and a diagonal rule so it can
 * never be mistaken for a photograph even at thumbnail size.
 */
export function swatch(label: string, hue: string, w: number, h: number) {
  const fg = inkOn(hue);
  const size = Math.round(Math.min(w, h) * 0.075);
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">` +
    `<rect width="${w}" height="${h}" fill="${hue}"/>` +
    `<path d="M0 ${h} L${w} 0" stroke="${fg}" stroke-opacity="0.16" stroke-width="${Math.max(1, size * 0.12)}"/>` +
    `<text x="${Math.round(w * 0.07)}" y="${h - Math.round(h * 0.055)}" ` +
    `font-family="JetBrains Mono, ui-monospace, monospace" font-size="${size}" ` +
    `letter-spacing="${size * 0.1}" fill="${fg}" fill-opacity="0.82">` +
    `${label.toUpperCase().replace(/&/g, "&amp;").replace(/</g, "&lt;")}` +
    `</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

type Shootable = { img: string; name: string; hue?: string };

/** the one call every image on the page goes through */
export function shotFor(item: Shootable, w = 900, h = 1200) {
  return LOCAL[item.img] ?? swatch(item.name, item.hue ?? "#D8D2C6", w, h);
}

/** for the few images that are not a catalogue piece */
export const shot = (key: string, w = 900, h = 1200, label = "Shot pending", hue = "#D8D2C6") =>
  LOCAL[key] ?? swatch(label, hue, w, h);

/** the accent rotation, pulled from the clothes rather than from a palette tool */
export const HUES = ["#F5C518", "#C4443A", "#3C6EA8", "#5C8A4A", "#7B4FA8", "#E2673D"];
