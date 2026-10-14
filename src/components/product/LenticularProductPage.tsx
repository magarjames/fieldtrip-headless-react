import React, { useEffect, useRef, useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Play, Pause } from "lucide-react";
import { useVivre } from "@/components/northline/VivreContext";
import "@/components/product/lenticular.css";

// 7 Real Model Scan Looks matching Runway Hero in exact order
export interface HeroLookPiece {
  name: string;
  keyword: string;
  hue: string;
  handle: string;
}

export interface ModelScanLook {
  id: string;
  lookNumber: string;
  name: string;
  heroName: string;
  gender: "m" | "f";
  outfit: string;
  defaultCategory: string;
  specGSM: string;
  specHardware: string;
  specSilhouette: string;
  specOrigin: string;
  printTitle: string;
  printDesc: string;
  printImage: string;
  pieces: HeroLookPiece[];
}

export const MODEL_SCAN_LOOKS: ModelScanLook[] = [
  {
    id: "f4",
    lookNumber: "01",
    name: "Look 01 · Skyline Zip",
    heroName: "Skyline zip",
    gender: "f",
    outfit: "Pale blue double-zip hoodie with washed charcoal wide-leg denim",
    defaultCategory: "Hoodies & Fleece",
    specGSM: "480 GSM 100% Organic Heavy French Loopback Terry",
    specHardware: "Two-Way Matte Nickel Raccagni Double Zip with Extended Pull Tapes",
    specSilhouette: "Relaxed Cocoon Dropped Shoulder with Darted Dual-Layer Hood",
    specOrigin: "Knitted in Wakayama, Japan. Tailored in Small Batches in Portugal",
    printTitle: "Wakayama Loopback Terry Weave & Raccagni Zipper Track",
    printDesc: "High-density 480 GSM French terry with brushed inner pile, paired with custom nickel-plated teeth.",
    printImage: "/brand/northline-detail-blue.jpg",
    pieces: [
      { name: "Skyline Zip Hoodie", keyword: "Hoodie", hue: "#9fb9c9", handle: "skyline-zip-hoodie" },
      { name: "Washed Charcoal Denim", keyword: "Denim", hue: "#424246", handle: "washed-charcoal-denim" },
    ],
  },
  {
    id: "f1",
    lookNumber: "02",
    name: "Look 02 · Mouth Tee",
    heroName: "Mouth tee",
    gender: "f",
    outfit: "White silkscreen printed tee with relaxed olive utility cargo trousers",
    defaultCategory: "Graphic & Bottoms",
    specGSM: "280 GSM Ring-Spun Compact Cotton with Discharge Water-Based Print",
    specHardware: "Heavy Cotton Herringbone Pocket Bags & Mil-Spec Anodized Snaps",
    specSilhouette: "Relaxed Dropped Fit with Articulated Knee Pleats & Cinch Hems",
    specOrigin: "Constructed in Osaka, Japan",
    printTitle: "Original Silkscreen Mouth Graphic Discharge Print",
    printDesc: "Hand-pulled water-based silkscreen that bleaches into the cotton yarn, ensuring zero hand-feel stiffness.",
    printImage: "/brand/vivre-tag.jpg",
    pieces: [
      { name: "Mouth Tee", keyword: "Tee", hue: "#f2f2f2", handle: "mouth-tee" },
      { name: "Olive Cargo Trousers", keyword: "Cargo", hue: "#575e46", handle: "olive-cargo-trousers" },
    ],
  },
  {
    id: "f2",
    lookNumber: "03",
    name: "Look 03 · Second Skin",
    heroName: "Second skin",
    gender: "f",
    outfit: "Fitted shoreline boat-neck top with deep ink washed wide denim",
    defaultCategory: "Tops & Tunics",
    specGSM: "240 GSM Modal-Cotton Blend with 4-Way Tactile Elasticity",
    specHardware: "Clean Bonded Hem Construction with Laser-Cut Edge Finishes",
    specSilhouette: "Fitted Ergonomic Boat-Neck with High Lateral Armholes",
    specOrigin: "Knitted and Crafted in Northern Portugal",
    printTitle: "Shoreline 240 GSM Modal-Cotton Micro-Rib Texture",
    printDesc: "Silky tactile modal ribbing that hugs contours without compression, breathable and shape-retaining.",
    printImage: "/brand/northline-materials.jpg",
    pieces: [
      { name: "Shoreline Boat Neck Top – Women’s White", keyword: "Shoreline", hue: "#f7f7f7", handle: "shoreline-boat-neck-top" },
      { name: "Longform Wide Leg Jeans – Deep Blue", keyword: "Longform Wide", hue: "#21283d", handle: "longform-wide-leg-jeans" },
    ],
  },
  {
    id: "f3",
    lookNumber: "04",
    name: "Look 04 · Archive Layer",
    heroName: "Archive layer",
    gender: "f",
    outfit: "Cream graphic crew sweater paired with relaxed dark indigo denim",
    defaultCategory: "Sweaters & Knits",
    specGSM: "520 GSM 7-Gauge Pure Shetland Wool Intarsia Knit",
    specHardware: "Tubular Ribbed Cuffs, Collar & Hem with Double Linked Seams",
    specSilhouette: "Classic Boxy Slouch with Soft Dropped Sleeves",
    specOrigin: "Spun & Loomed on the Scottish Borders",
    printTitle: "Archive 7-Gauge Shetland Wool Intarsia Graphic Motif",
    printDesc: "Multi-yarn intarsia structure with contrasting heather tones and tight tension needle loops.",
    printImage: "/brand/northline-fabric-landscape.jpg",
    pieces: [
      { name: "Graphic Crew Sweatshirt", keyword: "Graphic Crew Sweatshirt", hue: "#ece3cc", handle: "graphic-crew-sweatshirt" },
      { name: "Longform Wide Leg Jeans – Deep Blue", keyword: "Longform Wide", hue: "#263045", handle: "longform-wide-leg-jeans" },
    ],
  },
  {
    id: "m1",
    lookNumber: "05",
    name: "Look 05 · After Hours",
    heroName: "After hours",
    gender: "m",
    outfit: "Oversized washed black boxy tee with razorcut ripped wide-leg denim",
    defaultCategory: "Tees & Tops",
    specGSM: "300 GSM Combed Carded Jersey with Pre-Shrunk Enzyme Wash",
    specHardware: "Bound 1.25\" Ribbed Collar with Blind-Stitched Cuffs",
    specSilhouette: "Oversized Square Boxy Cut with Forward Shoulder Seams",
    specOrigin: "Milled in South Carolina, Garment Dyed in Los Angeles",
    printTitle: "After Hours Typographic Silkscreen & 300 GSM Enzyme Wash",
    printDesc: "Heavy vintage mineral wash giving broken-in softness with sharp high-density typographic chest screen.",
    printImage: "/brand/vivre-black.jpg",
    pieces: [
      { name: "Black Boxy Tee", keyword: "Black Boxy Tee", hue: "#1c1c1c", handle: "black-boxy-tee" },
      { name: "Razorcut Ripped Wide Leg Jeans – Dark Blue", keyword: "Razorcut", hue: "#748fba", handle: "razorcut-ripped-wide-leg-jeans" },
    ],
  },
  {
    id: "m2",
    lookNumber: "06",
    name: "Look 06 · Layered Henley",
    heroName: "Layered henley",
    gender: "m",
    outfit: "Grey ribbed thermal henley layered over overset navy wide denim",
    defaultCategory: "Thermal & Knits",
    specGSM: "360 GSM 100% Merino-Cotton Double Face Rib Knit",
    specHardware: "Natural Turned Corozo Nut Matte Buttons & Reinforced Placket",
    specSilhouette: "Relaxed Straight Silhouette with Extended Rib Cuffs",
    specOrigin: "Spun in Biella, Italy. Finished in Leicestershire",
    printTitle: "Double-Face Merino Waffle-Rib & Turned Corozo Button",
    printDesc: "Two-ply thermal matrix designed to trap warm air with matte polished natural corozo fastenings.",
    printImage: "/brand/northline-flatlay.jpg",
    pieces: [
      { name: "Grey Ribbed Henley", keyword: "Henley", hue: "#878a8f", handle: "grey-ribbed-henley" },
      { name: "Overset Wide Leg Jeans – Navy", keyword: "Overset", hue: "#6a82a6", handle: "overset-wide-leg-jeans" },
    ],
  },
  {
    id: "m3",
    lookNumber: "07",
    name: "Look 07 · Suede Shift",
    heroName: "Suede shift",
    gender: "m",
    outfit: "Sand suede jacket over striped poplin and 15oz raw selvedge trousers",
    defaultCategory: "Outerwear & Jackets",
    specGSM: "Heavyweight 420 GSM Sanded Calf Suede with Cotton Twill Lining",
    specHardware: "Custom Matte Gunmetal Riveted Snaps & YKK #8 Metal Zipper",
    specSilhouette: "Structured Boxy Crop with Articulated Bi-Swing Back",
    specOrigin: "Tanned in Tuscany, Tailored in Small Batches in London",
    printTitle: "Tuscan Sanded Calf Suede Nappe & Gunmetal Rivet",
    printDesc: "Velvety hand-buffed calf suede with natural nap variance, reinforced with matte oxidized hardware.",
    printImage: "/brand/northline-materials.jpg",
    pieces: [
      { name: "Sand Suede Jacket", keyword: "Jacket", hue: "#c9b699", handle: "sand-suede-jacket" },
      { name: "Ironwork 15oz Raw Denim Jeans – Black", keyword: "Ironwork", hue: "#2b2b2b", handle: "ironwork-15oz-raw-denim-jeans" },
    ],
  },
];

export function getLookForProduct(product: any, productId?: string): ModelScanLook {
  // 1. Direct lookId match
  if (product?.lookId) {
    const found = MODEL_SCAN_LOOKS.find((l) => l.id === product.lookId);
    if (found) return found;
  }

  const pId = (productId || "").toLowerCase();
  const title = (product?.title || "").toLowerCase();
  const handle = (product?.handle || "").toLowerCase();
  const s = `${pId} ${title} ${handle}`;

  // 2. Look 01 (f4) — Skyline zip & Washed charcoal denim
  if (s.includes("skyline") || s.includes("f4") || s.includes("charcoal")) {
    return MODEL_SCAN_LOOKS[0]; // f4
  }

  // 3. Look 02 (f1) — Mouth tee & Olive cargo
  if (s.includes("mouth") || s.includes("f1") || s.includes("olive") || s.includes("cargo")) {
    return MODEL_SCAN_LOOKS[1]; // f1
  }

  // 4. Look 03 (f2) — Shoreline boat neck top & Longform wide jeans
  if (s.includes("shoreline") || s.includes("boat") || s.includes("second-skin") || s.includes("f2")) {
    return MODEL_SCAN_LOOKS[2]; // f2
  }

  // 5. Look 04 (f3) — Graphic crew sweatshirt & Archive layer
  if (s.includes("graphic-crew") || s.includes("archive") || s.includes("f3") || s.includes("crew-sweatshirt")) {
    return MODEL_SCAN_LOOKS[3]; // f3
  }

  // 6. Look 05 (m1) — Black boxy tee & Razorcut ripped wide jeans
  if (s.includes("razorcut") || s.includes("after-hours") || s.includes("m1") || (s.includes("boxy") && s.includes("tee")) || s.includes("black-boxy")) {
    return MODEL_SCAN_LOOKS[4]; // m1
  }

  // 7. Look 06 (m2) — Grey ribbed henley & Overset wide jeans
  if (s.includes("henley") || s.includes("m2") || s.includes("overset")) {
    return MODEL_SCAN_LOOKS[5]; // m2
  }

  // 8. Look 07 (m3) — Sand suede jacket & Ironwork 15oz denim
  if (s.includes("suede") || s.includes("m3") || s.includes("ironwork") || s.includes("15oz")) {
    return MODEL_SCAN_LOOKS[6]; // m3
  }

  // Category fallback heuristics
  if (s.includes("hoodie") || s.includes("fleece")) return MODEL_SCAN_LOOKS[0]; // f4
  if (s.includes("knit") || s.includes("sweater")) return MODEL_SCAN_LOOKS[3]; // f3
  if (s.includes("tee") || s.includes("shirt")) return MODEL_SCAN_LOOKS[4]; // m1
  if (s.includes("jacket") || s.includes("coat") || s.includes("outerwear")) return MODEL_SCAN_LOOKS[6]; // m3
  if (s.includes("denim") || s.includes("jeans") || s.includes("pant") || s.includes("trouser")) return MODEL_SCAN_LOOKS[0]; // f4

  // Deterministic fallback based on id length
  const idx = Math.abs((productId || "p").split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)) % MODEL_SCAN_LOOKS.length;
  return MODEL_SCAN_LOOKS[idx];
}

// 4 Lenticular Angles mapping: Front (a), Three-quarter (b), Profile (c), Back (e)
export const LENTICULAR_ANGLES = [
  { frame: "a", name: "Front", label: "Front 000°" },
  { frame: "b", name: "Three-quarter", label: "Three-quarter 045°" },
  { frame: "c", name: "Profile", label: "Profile 090°" },
  { frame: "e", name: "Back", label: "Back 180°" },
];

export interface LenticularProductProps {
  product: any;
  productId?: string;
}

export function LenticularProductPage({ product, productId }: LenticularProductProps) {
  const { addToBag, bag, setBagOpen } = useVivre();

  // Accurately determine Runway Hero look model based on product
  const initialLook = useMemo(() => getLookForProduct(product, productId), [product, productId]);
  const [activeLook, setActiveLook] = useState<ModelScanLook>(initialLook);
  const [activeAngleIdx, setActiveAngleIdx] = useState(0);

  // Synchronize active look whenever product or route param updates
  useEffect(() => {
    setActiveLook(getLookForProduct(product, productId));
  }, [product, productId]);

  // Find companion piece in this Runway Hero look
  const companionPiece = useMemo(() => {
    const currentTitle = (product?.title || "").toLowerCase();
    const currentHandle = (product?.handle || productId || "").toLowerCase();
    return activeLook.pieces?.find(
      (p) => !currentTitle.includes(p.name.toLowerCase()) && !currentHandle.includes(p.handle.toLowerCase())
    );
  }, [activeLook, product, productId]);

  // E-commerce state
  const colors = (product as any)?.options?.find((o: any) => o.name.toLowerCase() === 'color' || o.name.toLowerCase() === 'colour')?.values.map((v: any) => v.value) || ["Default"];
  const sizes = (product as any)?.options?.find((o: any) => o.name.toLowerCase() === 'size')?.values.map((v: any) => v.value) || ["S", "M", "L", "XL"];
  const fits = (product as any)?.options?.find((o: any) => o.name.toLowerCase() === 'fit')?.values.map((v: any) => v.value) || [];

  const [selectedColor, setSelectedColor] = useState<string>(colors[0] || "Default");
  const [selectedSize, setSelectedSize] = useState<string>(sizes[0] || "M");
  const [selectedFit, setSelectedFit] = useState<string>(fits[0] || "Boxy");
  const [addedNotice, setAddedNotice] = useState(false);

  // Price formatting
  const priceFormatted = useMemo(() => {
    const raw = product?.variants?.[0]?.price?.amount;
    if (raw) return `GBP £${parseFloat(raw).toFixed(2)}`;
    return "GBP £185.00";
  }, [product]);

  // Clean description HTML
  const cleanDescription = useMemo(() => {
    const raw = product?.descriptionHtml || product?.description || "";
    if (!raw) {
      return "Engineered utility garment tailored with an oversized streetwear drape, taped waterproof seams, and four-way articulation.";
    }
    // Remove size guide if embedded
    return raw.replace(/<[^>]*size guide[^>]*>[\s\S]*$/i, "").trim() || raw;
  }, [product]);

  // Canvas & Scrubber refs
  const lensCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const scrubTrackRef = useRef<HTMLDivElement | null>(null);
  const scrubThumbRef = useRef<HTMLDivElement | null>(null);

  const [autoOrbit, setAutoOrbit] = useState(true);

  // Interactive motion physics state
  const motionRef = useRef({
    view: 0.1,
    target: 0.1,
    my: 0.5,
    auto: true,
    dead: false,
    reduce: false,
    raf2: 0,
  });

  // Calculate 4 image URLs for current look
  const imageUrls = useMemo(() => {
    return LENTICULAR_ANGLES.map((angle) => `/fieldtrip/scan-${activeLook.id}/${angle.frame}.jpg`);
  }, [activeLook.id]);

  // Lenticular Card WebGL Shader & 3D Tilt Physics
  useEffect(() => {
    const c = lensCanvasRef.current;
    const card = cardRef.current;
    const hero = heroRef.current;
    if (!c || !card || !hero) return;

    const gl = c.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return;

    function sh(type: number, src: string) {
      const o = gl!.createShader(type)!;
      gl!.shaderSource(o, src);
      gl!.compileShader(o);
      return o;
    }

    const pr = gl.createProgram()!;
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, "attribute vec2 p;varying vec2 vu;void main(){vu=p*.5+.5;gl_Position=vec4(p,0.,1.);}"));
    gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, [
      "precision highp float;",
      "varying vec2 vu;",
      "uniform sampler2D T0;",
      "uniform sampler2D T1;",
      "uniform sampler2D T2;",
      "uniform sampler2D T3;",
      "uniform vec4 A;",
      "uniform vec2 r;",
      "uniform float v;",
      "vec2 cover(vec2 uv, float ia) {",
      "  float pa = r.x / r.y;",
      "  vec2 s = ia > pa ? vec2(pa / ia, 1.0) : vec2(1.0, ia / pa);",
      "  return (uv - 0.5) * s + 0.5;",
      "}",
      "vec3 img(float k, vec2 uv) {",
      "  if (k < 0.5) return texture2D(T0, cover(uv, A.x)).rgb;",
      "  if (k < 1.5) return texture2D(T1, cover(uv, A.y)).rgb;",
      "  if (k < 2.5) return texture2D(T2, cover(uv, A.z)).rgb;",
      "  return texture2D(T3, cover(uv, A.w)).rgb;",
      "}",
      "void main() {",
      "  float vv = clamp(v, 0.0, 0.999) * 3.0;",
      "  float k = floor(vv);",
      "  float fr = fract(vv);",
      "  vec3 a = img(k, vu);",
      "  vec3 b = img(min(k + 1.0, 3.0), vu);",
      "  vec3 col = mix(a, b, smoothstep(0.15, 0.85, fr));",
      "  gl_FragColor = vec4(col, 1.0);",
      "}"
    ].join("\n")));

    gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
    gl.useProgram(pr);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

    const l = gl.getAttribLocation(pr, "p");
    gl.enableVertexAttribArray(l);
    gl.vertexAttribPointer(l, 2, gl.FLOAT, false, 0, 0);

    const U: Record<string, WebGLUniformLocation | null> = {};
    ["T0", "T1", "T2", "T3", "A", "r", "v"].forEach((k) => {
      U[k] = gl.getUniformLocation(pr, k);
    });

    // Texture bindings for the 4 angles
    const T = imageUrls.map((srcUrl) => {
      const o = { t: gl.createTexture(), a: 0.75 };
      gl.bindTexture(gl.TEXTURE_2D, o.t);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([200, 202, 206, 255]));
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

      const im = new Image();
      im.onload = () => {
        try {
          gl.bindTexture(gl.TEXTURE_2D, o.t);
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, im);
          o.a = im.naturalWidth / im.naturalHeight;
        } catch (e) {
          console.warn("Lenticular texture error", e);
        }
      };
      im.src = srcUrl;
      return o;
    });

    const t0 = performance.now();
    let lastIdx = -1;

    function renderLens() {
      if (motionRef.current.dead || !c || !gl || !hero) return;
      const d = Math.min(2, window.devicePixelRatio || 1);
      const w = Math.round(c.clientWidth * d);
      const h = Math.round(c.clientHeight * d);
      const bb = hero.getBoundingClientRect();
      const vh = window.innerHeight || 900;

      if (w && h && bb.bottom > 0 && bb.top < vh + 1000) {
        if (c.width !== w || c.height !== h) {
          c.width = w;
          c.height = h;
          gl.viewport(0, 0, w, h);
        }
        const tt = (performance.now() - t0) / 1000;
        const prog = Math.max(0, Math.min(1, -bb.top / Math.max(1, bb.height)));

        if (motionRef.current.auto && !motionRef.current.reduce) {
          motionRef.current.target = 0.5 + 0.45 * Math.sin(tt * 0.5);
        }

        const tgt = Math.min(0.999, Math.max(0, motionRef.current.target + prog * 0.6));
        motionRef.current.view += (tgt - motionRef.current.view) * 0.08;

        if (card && !motionRef.current.reduce) {
          card.style.transform = `rotateY(${((motionRef.current.view - 0.5) * 34).toFixed(2)}deg) rotateX(${((motionRef.current.my - 0.5) * -10).toFixed(2)}deg)`;
        }

        if (scrubThumbRef.current) {
          const pct = Math.max(0, Math.min(1, motionRef.current.view));
          scrubThumbRef.current.style.left = `${(pct * 100).toFixed(2)}%`;
        }

        for (let i = 0; i < 4; i++) {
          gl.activeTexture(gl.TEXTURE0 + i);
          gl.bindTexture(gl.TEXTURE_2D, T[i].t);
          gl.uniform1i(U[`T${i}`]!, i);
        }
        gl.uniform4f(U.A!, T[0].a, T[1].a, T[2].a, T[3].a);
        gl.uniform2f(U.r!, w, h);
        gl.uniform1f(U.v!, motionRef.current.view);
        gl.drawArrays(gl.TRIANGLES, 0, 3);

        const currentIdx = Math.min(3, Math.round(motionRef.current.view * 3));
        if (currentIdx !== lastIdx) {
          lastIdx = currentIdx;
          setActiveAngleIdx(currentIdx);
        }
      }
      motionRef.current.raf2 = requestAnimationFrame(renderLens);
    }
    renderLens();

    return () => {
      cancelAnimationFrame(motionRef.current.raf2);
    };
  }, [imageUrls]);

  // Pointer movement handlers over hero
  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const b = e.currentTarget.getBoundingClientRect();
    motionRef.current.auto = false;
    motionRef.current.target = Math.max(0, Math.min(1, (e.clientX - b.left) / b.width));
    motionRef.current.my = (e.clientY - b.top) / b.height;
  };

  const handlePointerLeave = () => {
    motionRef.current.auto = autoOrbit;
    motionRef.current.my = 0.5;
  };

  const snapToAngle = (index: number) => {
    motionRef.current.auto = false;
    setAutoOrbit(false);
    motionRef.current.target = index / 3;
    setActiveAngleIdx(index);
  };

  const toggleAutoOrbit = () => {
    setAutoOrbit((prev) => {
      const next = !prev;
      motionRef.current.auto = next;
      return next;
    });
  };

  const handleScrubPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    motionRef.current.auto = false;
    setAutoOrbit(false);
    handleScrubMove(e);
  };

  const handleScrubMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!scrubTrackRef.current) return;
    const rect = scrubTrackRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    motionRef.current.target = pct;
    motionRef.current.view = pct;
    const newIdx = Math.min(3, Math.round(pct * 3));
    setActiveAngleIdx(newIdx);
  };

  // Keyboard navigation for perspective switching
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) {
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        motionRef.current.auto = false;
        setAutoOrbit(false);
        setActiveAngleIdx((prev) => {
          const next = Math.min(3, prev + 1);
          motionRef.current.target = next / 3;
          return next;
        });
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        motionRef.current.auto = false;
        setAutoOrbit(false);
        setActiveAngleIdx((prev) => {
          const next = Math.max(0, prev - 1);
          motionRef.current.target = next / 3;
          return next;
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleAddBagClick = () => {
    const itemToAdd = {
      id: (product?.id || productId || activeLook.id).toString(),
      name: product?.title || activeLook.name,
      group: product?.productType || activeLook.defaultCategory,
      price: priceFormatted,
      image: `/fieldtrip/scan-${activeLook.gender}${activeLook.id.slice(1)}/a.jpg`,
      alt: product?.title || activeLook.outfit,
      description: product?.description || activeLook.outfit,
      colors: selectedColor ? [selectedColor] : [],
      sizes: selectedSize ? [selectedSize] : [],
      fits: selectedFit ? [selectedFit] : undefined,
      shopifyVariantId: product?.variants?.[0]?.id?.toString(),
      variantTitle: `${selectedSize} / ${selectedColor}${selectedFit ? ` / ${selectedFit}` : ""}`,
    };
    addToBag(itemToAdd as any);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2400);
    setBagOpen(true);
  };

  const currentAngleName = LENTICULAR_ANGLES[activeAngleIdx]?.name || "Front";

  return (
    <div className="ln-root">
      {/* Hero Section: 3-Column Asymmetric Lenticular Stage */}
      <section
        ref={heroRef}
        className="ln-hero-section"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div className="ln-hero-grid">
          {/* Left Column: Product Title & Specs */}
          <div className="ln-hero-left">
            <div className="ln-product-type-pill">
              <span className="ln-m" style={{ color: "var(--ln-clay)", fontWeight: 700 }}>
                ● DROP 001 // RUNWAY HERO
              </span>
              <span style={{ opacity: 0.3 }}>/</span>
              <span className="ln-m">LOOK {activeLook.lookNumber}</span>
              <span style={{ opacity: 0.3 }}>/</span>
              <span className="ln-m">{product?.productType || activeLook.defaultCategory}</span>
            </div>

            <h1 className="ln-hero-title">
              {product?.title || activeLook.pieces[0]?.name || "Vivre Runway Garment"}
            </h1>

            <div className="ln-hero-look-spec-bar">
              <span className="ln-m" style={{ color: "var(--ln-ink)", fontWeight: 700, fontSize: "11px" }}>
                RUNWAY SPEC //
              </span>
              <span className="ln-m" style={{ color: "var(--ln-ink-muted)", fontSize: "11px" }}>
                {activeLook.outfit}
              </span>
            </div>

            <p className="ln-hero-desc">
              {cleanDescription}
            </p>

            <div className="ln-hero-price-row">
              <span className="ln-price-val">{priceFormatted}</span>
              <span className="ln-m" style={{ opacity: 0.7 }}>Inclusive of duty &amp; taxes</span>
            </div>

            {/* Complete The Runway Look Pairing Card */}
            {companionPiece && (
              <div className="ln-hero-companion-box">
                <span className="ln-m" style={{ color: "var(--ln-clay)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em" }}>
                  RUNWAY OUTFIT PAIRING //
                </span>
                <Link to={`/products/${companionPiece.handle}`} className="ln-hero-companion-link">
                  <div className="ln-companion-swatch" style={{ backgroundColor: companionPiece.hue }} />
                  <span className="ln-companion-name">{companionPiece.name}</span>
                  <span className="ln-companion-arrow">→</span>
                </Link>
              </div>
            )}

            <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", marginTop: "2rem" }}>
              <a href="#ln-views" className="ln-m" style={{ textDecoration: "underline", color: "var(--ln-ink)", fontWeight: 700 }}>
                Four views &amp; print ↓
              </a>
              <a href="#ln-specs" className="ln-m" style={{ textDecoration: "underline", color: "var(--ln-ink-muted)" }}>
                Specifications ↓
              </a>
            </div>
          </div>

          {/* Center Column: 3D Lenticular Card with Interactive Controller Dock at Bottom */}
          <div className="ln-card-container">
            <div className="ln-card-column">
              <div ref={cardRef} className="ln-card">
                <canvas
                  ref={lensCanvasRef}
                  className="ln-lens-canvas"
                  role="img"
                  aria-label={`Lenticular view of ${product?.title || "garment"}, showing ${currentAngleName} view`}
                />
              </div>

              {/* Interactive Angle Controller Dock (Directly at bottom of picture) */}
              <div className="ln-angle-controller-bar">
                {/* Header: Title + Orbit Mode Button */}
                <div className="ln-angle-header">
                  <div>
                    <span className="ln-m" style={{ color: "var(--ln-clay)", display: "block", marginBottom: "2px" }}>
                      PERSPECTIVE 360°
                    </span>
                    <b className="ln-angle-heading-live">
                      {currentAngleName} · {LENTICULAR_ANGLES[activeAngleIdx]?.label.split(" ")[1] || "000°"}
                    </b>
                  </div>

                  <button
                    type="button"
                    className={`ln-orbit-toggle-btn ${autoOrbit ? "active" : ""}`}
                    onClick={toggleAutoOrbit}
                    title="Toggle auto-orbiting camera"
                  >
                    {autoOrbit ? (
                      <>
                        <Pause size={12} />
                        <span>Hold Angle</span>
                      </>
                    ) : (
                      <>
                        <Play size={12} />
                        <span>Auto Orbit</span>
                      </>
                    )}
                  </button>
                </div>

                {/* 4 Interactive Angle Choice Pills */}
                <div className="ln-angle-pills-grid">
                  {LENTICULAR_ANGLES.map((angle, idx) => {
                    const isSel = activeAngleIdx === idx;
                    return (
                      <button
                        key={angle.frame}
                        type="button"
                        className={`ln-angle-pill-btn ${isSel ? "active" : ""}`}
                        onClick={() => snapToAngle(idx)}
                        aria-pressed={isSel}
                        title={`Select ${angle.name} view`}
                      >
                        <span className="ln-angle-pill-name">{angle.name}</span>
                        <span className="ln-angle-pill-deg">{angle.label.split(" ")[1] || "000°"}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Interactive Drag Scrubber Rail */}
                <div className="ln-scrub-container">
                  <div
                    ref={scrubTrackRef}
                    className="ln-scrub-track"
                    onPointerDown={handleScrubPointerDown}
                    onPointerMove={(e) => {
                      if (e.buttons === 1) handleScrubMove(e);
                    }}
                    title="Drag or click to rotate view smoothly"
                  >
                    <div className="ln-scrub-rail" />
                    <div className="ln-scrub-ticks">
                      <span className="ln-scrub-tick" />
                      <span className="ln-scrub-tick" />
                      <span className="ln-scrub-tick" />
                      <span className="ln-scrub-tick" />
                    </div>
                    <div ref={scrubThumbRef} className="ln-scrub-thumb" />
                  </div>
                  <div className="ln-scrub-labels">
                    <span>000° FRONT</span>
                    <span>045° 3/4</span>
                    <span>090° PROFILE</span>
                    <span>180° BACK</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sizing, Colorway, Fit & Add to Bag on the side */}
          <div className="ln-hero-right">
            <div className="ln-side-order-card">
              <div className="ln-side-order-header">
                <span className="ln-m" style={{ color: "var(--ln-clay)", fontWeight: 700 }}>
                  SECURE YOUR ALLOCATION // DROP 001
                </span>
                <span className="ln-stock-beacon">
                  <span className="ln-beacon-dot" />
                  <span>IN STOCK</span>
                </span>
              </div>

              <h2 className="ln-side-order-title">ORDER GARMENT</h2>

              {/* Sizing Selector */}
              <div className="ln-side-option-group">
                <div className="ln-side-option-header">
                  <span className="ln-m" style={{ color: "var(--ln-ink)", fontWeight: 700 }}>SELECT SIZE</span>
                  <span className="ln-m" style={{ color: "var(--ln-clay)", fontSize: "10px" }}>
                    MODEL IS 6'1" WEARING SIZE L
                  </span>
                </div>
                <div className="ln-side-size-pills">
                  {sizes.map((sz: string) => (
                    <button
                      key={sz}
                      type="button"
                      className={`ln-side-size-btn ${selectedSize === sz ? "active" : ""}`}
                      onClick={() => setSelectedSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colorway Selector */}
              {colors.length > 0 && colors[0] !== "Default" && (
                <div className="ln-side-option-group">
                  <div className="ln-side-option-header">
                    <span className="ln-m" style={{ color: "var(--ln-ink)", fontWeight: 700 }}>SELECT COLORWAY</span>
                    <span className="ln-m" style={{ color: "var(--ln-ink-muted)", fontSize: "10px" }}>
                      {selectedColor}
                    </span>
                  </div>
                  <div className="ln-side-color-pills">
                    {colors.map((c: string) => (
                      <button
                        key={c}
                        type="button"
                        className={`ln-side-color-btn ${selectedColor === c ? "active" : ""}`}
                        onClick={() => setSelectedColor(c)}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Fit Silhouette Selector */}
              {fits.length > 0 && (
                <div className="ln-side-option-group">
                  <div className="ln-side-option-header">
                    <span className="ln-m" style={{ color: "var(--ln-ink)", fontWeight: 700 }}>FIT SILHOUETTE</span>
                    <span className="ln-m" style={{ color: "var(--ln-ink-muted)", fontSize: "10px" }}>
                      {selectedFit}
                    </span>
                  </div>
                  <div className="ln-side-fit-pills">
                    {fits.map((f: string) => (
                      <button
                        key={f}
                        type="button"
                        className={`ln-side-fit-btn ${selectedFit === f ? "active" : ""}`}
                        onClick={() => setSelectedFit(f)}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to Bag CTA Row */}
              <div className="ln-side-cta-block">
                <button
                  type="button"
                  className="ln-side-submit-btn"
                  onClick={handleAddBagClick}
                >
                  {addedNotice ? (
                    <>
                      <Check size={16} />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <span>Add to Bag — {priceFormatted}</span>
                  )}
                </button>

                <div className="ln-side-cta-meta">
                  <button
                    type="button"
                    className="ln-side-view-bag-link"
                    onClick={() => setBagOpen(true)}
                  >
                    View Bag ({bag.length}) →
                  </button>
                  <span className="ln-m" style={{ fontSize: "10px", color: "var(--ln-ink-muted)" }}>
                    Free express global shipping
                  </span>
                </div>
              </div>

              {/* Compact Model Scan Switcher at bottom of card */}
              <div className="ln-side-model-footer">
                <span className="ln-m" style={{ color: "var(--ln-ink-muted)", fontSize: "9px" }}>
                  Model Scan:
                </span>
                <select
                  value={activeLook.id}
                  onChange={(e) => {
                    const found = MODEL_SCAN_LOOKS.find((l) => l.id === e.target.value);
                    if (found) setActiveLook(found);
                  }}
                  className="ln-side-model-select"
                >
                  {MODEL_SCAN_LOOKS.map((look) => (
                    <option key={look.id} value={look.id}>
                      {look.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 02: Four Views, One Print Gallery */}
      <section id="ln-views" className="ln-gallery-section">
        <p className="ln-gallery-title ln-up">
          Four views, one print.
        </p>
        <p style={{ color: "var(--ln-ink-soft)", maxWidth: "52ch", marginTop: "0.8rem", fontSize: "15px" }}>
          Captured in our 360-degree scan chamber. Move your cursor across the card above to rotate in physical motion, or inspect the 4 orthogonal views and macro textile print below.
        </p>

        <div className="ln-gallery-grid">
          {LENTICULAR_ANGLES.map((angle, idx) => (
            <figure
              key={angle.frame}
              className="ln-thumb ln-up"
              onClick={() => snapToAngle(idx)}
            >
              <div className="ln-thumb-wrap">
                <img
                  src={`/fieldtrip/scan-${activeLook.id}/${angle.frame}.jpg`}
                  alt={`${product?.title || "Garment"} ${angle.name} view`}
                  loading="lazy"
                />
              </div>
              <figcaption className="ln-thumb-caption">
                <span className="ln-m" style={{ fontWeight: 700, color: "var(--ln-ink)" }}>
                  0{idx + 1} // {angle.name}
                </span>
                <span className="ln-m">{angle.label}</span>
              </figcaption>
            </figure>
          ))}

          {/* 5th Card: The One Print / Textile Macro View */}
          <figure
            key="print-detail"
            className="ln-thumb ln-thumb--print ln-up"
          >
            <div className="ln-thumb-wrap">
              <img
                src={activeLook.printImage}
                alt={`${product?.title || "Garment"} ${activeLook.printTitle}`}
                loading="lazy"
              />
              <span className="ln-print-chip">MACRO PRINT</span>
            </div>
            <figcaption className="ln-thumb-caption">
              <span className="ln-m" style={{ fontWeight: 700, color: "var(--ln-clay)" }}>
                05 // PRINT &amp; WEAVE
              </span>
              <span className="ln-m" style={{ fontSize: "10px" }}>Macro 1:1</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Section 03: Editorial Spec Rows */}
      <section id="ln-specs" className="ln-specs-section">
        <div className="ln-row ln-up">
          <b className="ln-row-title">Material &amp; Weave</b>
          <span className="ln-row-line">
            {activeLook.specGSM}. Sourced from specialist heritage mills, treated with a durable water-repellent finish that preserves breathability and natural handle.
          </span>
          <span className="ln-m ln-row-meta">
            Fabric GSM // High-Density Weave
          </span>
        </div>

        <div className="ln-row ln-up">
          <b className="ln-row-title">Hardware &amp; Seams</b>
          <span className="ln-row-line">
            {activeLook.specHardware}. Bonded internal seam allowances with reinforced bar-tacking along high-stress pocket apertures and zip ends.
          </span>
          <span className="ln-m ln-row-meta">
            Precision Machined // Sealed
          </span>
        </div>

        <div className="ln-row ln-up">
          <b className="ln-row-title">Cut &amp; Silhouette</b>
          <span className="ln-row-line">
            {activeLook.specSilhouette}. Drafted with ergonomic underarm gussets for unrestricted reach and clean horizontal drape over heavy knitwear.
          </span>
          <span className="ln-m ln-row-meta">
            Pattern Drafting // Articulated
          </span>
        </div>

        <div className="ln-row ln-up">
          <b className="ln-row-title">Provenance &amp; Care</b>
          <span className="ln-row-line">
            {activeLook.specOrigin}. Spot clean or gentle hand wash cold. Lay flat to dry away from direct heat to preserve fabric structure and deep dye saturation.
          </span>
          <span className="ln-m ln-row-meta">
            Handcrafted Batch // Care Guide
          </span>
        </div>
      </section>
    </div>
  );
}
