import * as THREE from "three";

/**
 * FIELDTRIP — procedural fabric textures.
 *
 * Drawn to a canvas at runtime rather than loaded as image files. Three reasons
 * that is the right call here and not just the convenient one:
 *
 *   1. No external asset, so no licence and nothing to 404. This page has no
 *      other network dependency and this does not add one.
 *   2. The base colour stays in the catalogue. Each generator takes the
 *      garment's own hue from data.ts and weaves on top of it, so changing a
 *      product colour changes its cloth automatically. A bitmap would have to
 *      be re-exported per colourway.
 *   3. Every fabric gets a matching bump map from the same pass, so the weave
 *      catches the key light instead of being a flat decal.
 *
 * Textures are cached by fabric+colour+size. WebGL textures are not free, and
 * three outfits sharing a jersey should share one upload.
 */

export type Fabric = "jersey" | "denim" | "crochet" | "ripstop" | "linen" | "mesh";

type Pair = { map: THREE.Texture; bump: THREE.Texture };

const cache = new Map<string, Pair>();

/* -------------------------------------------------------------- helpers --- */

function shade(hex: string, amt: number) {
  const h = hex.replace("#", "");
  const n = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const rgb = [0, 2, 4].map((i) => {
    const v = parseInt(n.slice(i, i + 2), 16) + amt;
    return Math.max(0, Math.min(255, v));
  });
  return `rgb(${rgb.join(",")})`;
}

function surfaces(size: number) {
  const col = document.createElement("canvas");
  const bmp = document.createElement("canvas");
  col.width = col.height = bmp.width = bmp.height = size;
  return {
    c: col.getContext("2d")!,
    b: bmp.getContext("2d")!,
    col,
    bmp,
  };
}

/* --------------------------------------------------------------- weaves --- */

function drawJersey(c: CanvasRenderingContext2D, b: CanvasRenderingContext2D, s: number, hex: string) {
  // fine knit: dense short vertical loops, very low contrast
  c.fillStyle = hex;
  c.fillRect(0, 0, s, s);
  b.fillStyle = "#808080";
  b.fillRect(0, 0, s, s);
  const step = 7;
  for (let y = 0; y < s; y += step) {
    for (let x = 0; x < s; x += step) {
      const up = (Math.floor(y / step) + Math.floor(x / step)) % 2 === 0;
      c.fillStyle = shade(hex, up ? 20 : -20);
      c.fillRect(x, y, step - 1, step - 1);
      b.fillStyle = up ? "#c0c0c0" : "#484848";
      b.fillRect(x, y, step - 1, step - 1);
    }
  }
}

function drawDenim(c: CanvasRenderingContext2D, b: CanvasRenderingContext2D, s: number, hex: string) {
  // twill: the diagonal wale is the whole reason denim reads as denim
  c.fillStyle = hex;
  c.fillRect(0, 0, s, s);
  b.fillStyle = "#787878";
  b.fillRect(0, 0, s, s);
  c.lineWidth = 3.5;
  b.lineWidth = 3.5;
  for (let i = -s; i < s * 2; i += 13) {
    c.strokeStyle = shade(hex, 48);
    c.beginPath();
    c.moveTo(i, 0);
    c.lineTo(i + s, s);
    c.stroke();
    b.strokeStyle = "#d2d2d2";
    b.beginPath();
    b.moveTo(i, 0);
    b.lineTo(i + s, s);
    b.stroke();
  }
  // the white flecks of undyed weft
  for (let n = 0; n < s * 3; n++) {
    const x = Math.random() * s;
    const y = Math.random() * s;
    c.fillStyle = shade(hex, 70);
    c.globalAlpha = 0.4;
    c.fillRect(x, y, 1, 1);
    c.globalAlpha = 1;
  }
}

function drawCrochet(c: CanvasRenderingContext2D, b: CanvasRenderingContext2D, s: number, hex: string) {
  // open knit: a lattice of holes, which is what the Crochet Overshirt is
  c.fillStyle = hex;
  c.fillRect(0, 0, s, s);
  b.fillStyle = "#b0b0b0";
  b.fillRect(0, 0, s, s);
  const cell = 26;
  for (let y = cell / 2; y < s; y += cell) {
    for (let x = cell / 2; x < s; x += cell) {
      const off = (Math.floor(y / cell) % 2) * (cell / 2);
      c.beginPath();
      c.arc(x + off, y, cell * 0.26, 0, Math.PI * 2);
      c.fillStyle = shade(hex, -64);
      c.fill();
      b.beginPath();
      b.arc(x + off, y, cell * 0.26, 0, Math.PI * 2);
      b.fillStyle = "#3a3a3a";
      b.fill();
      // the raised loop around each hole
      c.beginPath();
      c.arc(x + off, y, cell * 0.36, 0, Math.PI * 2);
      c.strokeStyle = shade(hex, 40);
      c.lineWidth = 4;
      c.stroke();
      b.beginPath();
      b.arc(x + off, y, cell * 0.36, 0, Math.PI * 2);
      b.strokeStyle = "#f0f0f0";
      b.lineWidth = 4;
      b.stroke();
    }
  }
}

function drawRipstop(c: CanvasRenderingContext2D, b: CanvasRenderingContext2D, s: number, hex: string) {
  // technical nylon: a sparse reinforcing grid over a smooth ground
  c.fillStyle = hex;
  c.fillRect(0, 0, s, s);
  b.fillStyle = "#8c8c8c";
  b.fillRect(0, 0, s, s);
  const grid = 30;
  c.lineWidth = 2.5;
  b.lineWidth = 2.5;
  for (let i = 0; i <= s; i += grid) {
    c.strokeStyle = shade(hex, 46);
    b.strokeStyle = "#c8c8c8";
    for (const ctx of [c, b]) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, s);
      ctx.moveTo(0, i);
      ctx.lineTo(s, i);
      ctx.stroke();
    }
  }
}

function drawLinen(c: CanvasRenderingContext2D, b: CanvasRenderingContext2D, s: number, hex: string) {
  // irregular slubs in both directions, no repeating cell
  c.fillStyle = hex;
  c.fillRect(0, 0, s, s);
  b.fillStyle = "#8a8a8a";
  b.fillRect(0, 0, s, s);
  for (let n = 0; n < s * 6; n++) {
    const horiz = Math.random() > 0.5;
    const x = Math.random() * s;
    const y = Math.random() * s;
    const len = 5 + Math.random() * 16;
    const light = Math.random() > 0.5;
    c.fillStyle = shade(hex, light ? 34 : -30);
    b.fillStyle = light ? "#a8a8a8" : "#6e6e6e";
    for (const ctx of [c, b]) {
      ctx.fillRect(x, y, horiz ? len : 2.2, horiz ? 2.2 : len);
    }
  }
}

function drawMesh(c: CanvasRenderingContext2D, b: CanvasRenderingContext2D, s: number, hex: string) {
  // football mesh: large open hexagonal-ish holes
  c.fillStyle = hex;
  c.fillRect(0, 0, s, s);
  b.fillStyle = "#a0a0a0";
  b.fillRect(0, 0, s, s);
  const cell = 22;
  for (let y = 0; y < s; y += cell) {
    for (let x = 0; x < s; x += cell) {
      const off = (Math.floor(y / cell) % 2) * (cell / 2);
      c.fillStyle = shade(hex, -58);
      c.fillRect(x + off + 2, y + 2, cell - 5, cell - 5);
      b.fillStyle = "#4a4a4a";
      b.fillRect(x + off + 2, y + 2, cell - 5, cell - 5);
    }
  }
}

const DRAW: Record<Fabric, typeof drawJersey> = {
  jersey: drawJersey,
  denim: drawDenim,
  crochet: drawCrochet,
  ripstop: drawRipstop,
  linen: drawLinen,
  mesh: drawMesh,
};

/* ---------------------------------------------------------------- public --- */

/**
 * Colour map plus matching bump map for one fabric in one colour.
 * Returns null when there is no document, so an SSR pass is a no-op.
 */
export function fabricTexture(
  fabric: Fabric,
  hex: string,
  repeat = 4,
  size = 256,
): Pair | null {
  if (typeof document === "undefined") return null;

  const key = `${fabric}|${hex}|${repeat}|${size}`;
  const hit = cache.get(key);
  if (hit) return hit;

  const { c, b, col, bmp } = surfaces(size);
  DRAW[fabric](c, b, size, hex);

  const map = new THREE.CanvasTexture(col);
  const bump = new THREE.CanvasTexture(bmp);
  for (const t of [map, bump]) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(repeat, repeat);
    t.needsUpdate = true;
  }
  // the colour map is sRGB; the bump map is height data and must stay linear,
  // or three will gamma-correct it and the relief comes out wrong
  map.colorSpace = THREE.SRGBColorSpace;
  bump.colorSpace = THREE.NoColorSpace;

  const pair = { map, bump };
  cache.set(key, pair);
  return pair;
}

/** free every cached upload. Called when the hero unmounts. */
export function disposeFabrics() {
  cache.forEach(({ map, bump }) => {
    map.dispose();
    bump.dispose();
  });
  cache.clear();
}
