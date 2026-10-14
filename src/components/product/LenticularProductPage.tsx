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
    name: "Look 01 · Key To My Heart Zip",
    heroName: "Key To My Heart Zip",
    gender: "f",
    outfit: "Sky blue rhinestone 'Key To My Heart' zip hoodie with washed charcoal double-knee carpenter denim",
    defaultCategory: "Hoodies & Fleece",
    specGSM: "480 GSM Loopback Fleece & 14.5oz Double-Knee Rigid Denim",
    specHardware: "Two-Way Silver Metal Zipper with Rhinestone Typography & Utility Hammer Loop",
    specSilhouette: "Dropped Cocoon Shoulder Hoodie with Stacking Double-Knee Carpenter Leg",
    specOrigin: "Loomed in Wakayama, Japan. Tailored in Small Batches in Portugal",
    printTitle: "'YOU ARE THE KEY TO MY HEART' Crystal Rhinestone Typography",
    printDesc: "Hand-applied crystal rhinestone lettering heat-sealed across split kangaroo pockets with embroidered heraldic chest crest.",
    printImage: "/brand/northline-detail-blue.jpg",
    pieces: [
      { name: "Rhinestone 'Key To My Heart' Zip Hoodie", keyword: "Hoodie", hue: "#9fb9c9", handle: "key-to-my-heart-zip-hoodie" },
      { name: "Washed Charcoal Double-Knee Carpenter Jeans", keyword: "Carpenter", hue: "#3a3a3d", handle: "washed-charcoal-carpenter-jeans" },
    ],
  },
  {
    id: "f1",
    lookNumber: "02",
    name: "Look 02 · Double Mouth Tee",
    heroName: "Double Mouth Tee",
    gender: "f",
    outfit: "White tee with stacked blue glitter mouth prints paired with olive utility cargo trousers",
    defaultCategory: "Tees & Cargo",
    specGSM: "280 GSM Heavyweight Cotton Jersey & Heavy Duty Cotton Ripstop",
    specHardware: "Concealed Military Pocket Snaps & Drawcord Ankle Cinchers",
    specSilhouette: "Boxy Dropped-Shoulder Tee with Wide Straight Bellows Cargo Silhouette",
    specOrigin: "Graphic Screened in Osaka, Japan. Trousers Constructed in Portugal",
    printTitle: "Dual Stacked Blue Glitter Mouth & Grillz Screenprint",
    printDesc: "Two-stage discharge water-base print overlaid with micro-glitter pigment and reflective teeth detail.",
    printImage: "/brand/vivre-tag.jpg",
    pieces: [
      { name: "Double Blue Mouth Graphic Tee", keyword: "Mouth", hue: "#f5f5f5", handle: "double-blue-mouth-tee" },
      { name: "Olive Drab Wide Utility Cargo Trousers", keyword: "Cargo", hue: "#585f47", handle: "olive-drab-cargo-trousers" },
    ],
  },
  {
    id: "f2",
    lookNumber: "03",
    name: "Look 03 · Second Skin Boatneck",
    heroName: "Second Skin Boatneck",
    gender: "f",
    outfit: "Optic white 3/4 sleeve boatneck top with belted deep indigo raw wide-leg denim",
    defaultCategory: "Tops & Denim",
    specGSM: "260 GSM Pima Modal Interlock & 14oz Japanese Raw Selvedge Denim",
    specHardware: "Brushed Silver Plaque Buckle & Custom Brass Button Fly Rivets",
    specSilhouette: "Sculpted 3/4 Sleeve Boatneck Line with High-Waisted Pooling Wide Denim",
    specOrigin: "Interlock Knit in Northern Portugal. Denim Woven in Okayama, Japan",
    printTitle: "Fine Double-Knit Modal Interlock & Raw Indigo Warp",
    printDesc: "Smooth, zero-grain tactile knit with clean bonded edges paired with unwashed deep indigo warp yarns.",
    printImage: "/brand/northline-materials.jpg",
    pieces: [
      { name: "Optic White 3/4 Boatneck Top", keyword: "Boatneck", hue: "#ffffff", handle: "optic-white-boatneck-top" },
      { name: "Deep Indigo Raw Wide-Leg Jeans", keyword: "Indigo", hue: "#1c2438", handle: "deep-indigo-raw-wide-jeans" },
    ],
  },
  {
    id: "f3",
    lookNumber: "04",
    name: "Look 04 · Infatuated Graphic Crew",
    heroName: "Infatuated Graphic Crew",
    gender: "f",
    outfit: "Cream 'Infatuated' graphic crew with printed sleeves and dark indigo wide-leg jeans",
    defaultCategory: "Sweaters & Knits",
    specGSM: "500 GSM Combed Cotton Loopback Fleece & 14oz Rigid Denim",
    specHardware: "Double-Needle Coverstitched Seams with 2x2 Heavy Spun Rib Trims",
    specSilhouette: "Boxy Slouch Drop-Shoulder with Full Extended Graphic Sleeves",
    specOrigin: "Loomed and Screened in Porto, Portugal",
    printTitle: "'Infatuated' Multi-Pass Discharge & Dual Sleeve Typography",
    printDesc: "Soft water-based discharge printing on natural cream base with graphic portrait and typographic arm runs.",
    printImage: "/brand/northline-fabric-landscape.jpg",
    pieces: [
      { name: "Infatuated Sleeve-Print Graphic Crew", keyword: "Infatuated", hue: "#ece3cb", handle: "infatuated-graphic-crew" },
      { name: "Dark Indigo Raw Wide-Leg Jeans", keyword: "Indigo", hue: "#232d43", handle: "deep-indigo-raw-wide-jeans" },
    ],
  },
  {
    id: "m1",
    lookNumber: "05",
    name: "Look 05 · Solid Black Boxy Tee",
    heroName: "Solid Black Boxy Tee",
    gender: "m",
    outfit: "Heavyweight solid black boxy tee with vintage razorcut distressed wide-leg jeans",
    defaultCategory: "Tees & Denim",
    specGSM: "300 GSM Combed Carded Pure Black Cotton & 14.5oz Japanese Denim",
    specHardware: "1.25\" Heavy Spun Rib Collar & Hand-Cut Razor Distressed Knee Panels",
    specSilhouette: "Oversized Boxy Tee with Curved-Seam Distressed Wide Leg",
    specOrigin: "Cotton Knitted in Los Angeles, Denim Hand-Finished in Kojima, Japan",
    printTitle: "Deep Mineral Pigment Dye & Hand-Frayed Slit Abrasions",
    printDesc: "Solid jet black pigment penetration paired with manual stone grinding and razor distressing.",
    printImage: "/brand/vivre-black.jpg",
    pieces: [
      { name: "Solid Black Boxy Oversized Tee", keyword: "Boxy", hue: "#181818", handle: "solid-black-boxy-tee" },
      { name: "Razorcut Distressed Knee-Panel Wide Jeans", keyword: "Razorcut", hue: "#7892bd", handle: "razorcut-distressed-wide-jeans" },
    ],
  },
  {
    id: "m2",
    lookNumber: "06",
    name: "Look 06 · Heather Grey Henley",
    heroName: "Layered Grey Henley",
    gender: "m",
    outfit: "Heather grey 3-button knit henley layered over white tee with classic blue wide-leg jeans",
    defaultCategory: "Thermal & Knits",
    specGSM: "360 GSM Merino-Cotton Double Rib Knit & 14oz Classic Blue Denim",
    specHardware: "Turned Natural Corozo Nut Buttons with Clean Reinforced Placket",
    specSilhouette: "Relaxed Layered Henley Knit with Roomy 90s Baggy Wide-Leg Jean",
    specOrigin: "Knitted in Biella, Italy. Denim Woven in Okayama, Japan",
    printTitle: "Fine Two-Ply Heather Rib & Authentic 90s Ring-Spun Denim",
    printDesc: "Subtle two-tone heather melange rib structure paired with vintage rope-dyed indigo twill.",
    printImage: "/brand/northline-flatlay.jpg",
    pieces: [
      { name: "Heather Grey Knitted 3-Button Henley", keyword: "Henley", hue: "#95989e", handle: "heather-grey-knit-henley" },
      { name: "Classic Blue Baggy Wide-Leg Jeans", keyword: "Baggy", hue: "#4f6e99", handle: "classic-blue-baggy-jeans" },
    ],
  },
  {
    id: "m3",
    lookNumber: "07",
    name: "Look 07 · Sand Suede Blouson",
    heroName: "Sand Suede Blouson",
    gender: "m",
    outfit: "Sand suede zip blouson layered over pinstripe shirt and plaid tie with 15oz raw selvedge denim",
    defaultCategory: "Outerwear & Jackets",
    specGSM: "420 GSM Tuscan Sanded Calf Suede & 15oz Heavyweight Okayama Selvedge",
    specHardware: "Antiqued Gunmetal Zipper Track & Hand-Set Selvedge Copper Rivets",
    specSilhouette: "Pointed Collar Blouson with Elasticated Waist & Rigid Wide Raw Leg",
    specOrigin: "Tanned in Tuscany, Italy. Denim Woven on Vintage Toyoda Shuttles in Japan",
    printTitle: "Hand-Sanded Tuscan Calf Suede & 15oz Raw Redline Selvedge",
    printDesc: "Soft velvety suede nap with natural tone depth, contrasted by unwashed 15oz raw shuttle loom twill.",
    printImage: "/brand/northline-materials.jpg",
    pieces: [
      { name: "Sand Suede Zip Blouson Jacket", keyword: "Suede", hue: "#c7b192", handle: "sand-suede-blouson-jacket" },
      { name: "Ironwork 15oz Raw Selvedge Denim Jeans – Black", keyword: "Ironwork", hue: "#252528", handle: "ironwork-15oz-raw-denim-jeans" },
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

  // 2. Look 01 (f4) — Key To My Heart zip & Washed charcoal carpenter denim
  if (s.includes("heart") || s.includes("skyline") || s.includes("f4") || s.includes("charcoal") || s.includes("carpenter")) {
    return MODEL_SCAN_LOOKS[0]; // f4
  }

  // 3. Look 02 (f1) — Double Mouth tee & Olive cargo
  if (s.includes("mouth") || s.includes("f1") || s.includes("olive") || s.includes("cargo") || s.includes("drab")) {
    return MODEL_SCAN_LOOKS[1]; // f1
  }

  // 4. Look 03 (f2) — Shoreline / Optic white boat neck top & Deep indigo raw jeans
  if (s.includes("shoreline") || s.includes("boat") || s.includes("second-skin") || s.includes("f2") || s.includes("optic-white")) {
    return MODEL_SCAN_LOOKS[2]; // f2
  }

  // 5. Look 04 (f3) — Infatuated graphic crew sweatshirt & Archive layer
  if (s.includes("infatuated") || s.includes("graphic-crew") || s.includes("archive") || s.includes("f3") || s.includes("crew-sweatshirt")) {
    return MODEL_SCAN_LOOKS[3]; // f3
  }

  // 6. Look 05 (m1) — Solid black boxy tee & Razorcut ripped wide jeans
  if (s.includes("razorcut") || s.includes("after-hours") || s.includes("m1") || (s.includes("boxy") && s.includes("tee")) || s.includes("solid-black")) {
    return MODEL_SCAN_LOOKS[4]; // m1
  }

  // 7. Look 06 (m2) — Grey knitted henley & Classic blue baggy jeans
  if (s.includes("henley") || s.includes("m2") || s.includes("overset") || s.includes("baggy") || s.includes("classic-blue")) {
    return MODEL_SCAN_LOOKS[5]; // m2
  }

  // 8. Look 07 (m3) — Sand suede blouson jacket & Ironwork 15oz denim
  if (s.includes("suede") || s.includes("blouson") || s.includes("m3") || s.includes("ironwork") || s.includes("15oz")) {
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

// 7 Frame names and angles matching ScanRunwayHero exactly
export const FRAME_NAMES = ["a", "b", "c", "d", "e", "f", "g"] as const;
export const ANGLES = ["000", "045", "090", "135", "180", "225", "360"] as const;
export const SCAN_ASSET_VERSION = "hair-edge-3";

export const frameUrl = (lookId: string, frame: number) =>
  `/fieldtrip/scan-${lookId}/${FRAME_NAMES[frame]}.webp?v=${SCAN_ASSET_VERSION}`;

export const wrapFrame = (frame: number) =>
  ((frame % FRAME_NAMES.length) + FRAME_NAMES.length) % FRAME_NAMES.length;

// 4 Orthogonal Views mapping for Section 02: Front (0), 3/4 (1), Profile (2), Back (4)
export const FOUR_VIEWS = [
  { frameIdx: 0, frameName: "a", name: "Front", label: "Front 000°", deg: "000°" },
  { frameIdx: 1, frameName: "b", name: "Three-quarter", label: "Three-quarter 045°", deg: "045°" },
  { frameIdx: 2, frameName: "c", name: "Profile", label: "Profile 090°", deg: "090°" },
  { frameIdx: 4, frameName: "e", name: "Back", label: "Back 180°", deg: "180°" },
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
  const [frameIndex, setFrameIndex] = useState(0);
  const frameIndexRef = useRef(0);
  const dragRef = useRef({ active: false, startX: 0, startFrame: 0 });
  const [autoOrbit, setAutoOrbit] = useState(false);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const scrubTrackRef = useRef<HTMLDivElement | null>(null);

  // Synchronize active look whenever product or route param updates
  useEffect(() => {
    setActiveLook(getLookForProduct(product, productId));
    frameIndexRef.current = 0;
    setFrameIndex(0);
  }, [product, productId]);

  // Preload all 7 frames for the active look so rotation is instant
  useEffect(() => {
    FRAME_NAMES.forEach((_, idx) => {
      const img = new Image();
      img.decoding = "async";
      img.src = frameUrl(activeLook.id, idx);
    });
  }, [activeLook.id]);

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

  // Change frame helper
  const changeFrame = (next: number) => {
    const wrapped = wrapFrame(next);
    frameIndexRef.current = wrapped;
    setFrameIndex(wrapped);
  };

  // Direct Drag rotation matching ScanRunwayHero
  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = {
      active: true,
      startX: event.clientX,
      startFrame: frameIndexRef.current,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    if (autoOrbit) setAutoOrbit(false);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    const travelled = event.clientX - dragRef.current.startX;
    const stepped = Math.round(travelled / 48);
    const next = wrapFrame(dragRef.current.startFrame + stepped);
    if (next !== frameIndexRef.current) {
      changeFrame(next);
    }
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current.active = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      changeFrame(frameIndexRef.current - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      changeFrame(frameIndexRef.current + 1);
    }
  };

  // Keyboard navigation for perspective switching
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        changeFrame(frameIndexRef.current + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        changeFrame(frameIndexRef.current - 1);
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  // Smooth Auto-orbit option
  useEffect(() => {
    if (!autoOrbit) return;
    const timer = setInterval(() => {
      changeFrame(frameIndexRef.current + 1);
    }, 800);
    return () => clearInterval(timer);
  }, [autoOrbit]);

  const handleScrubPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    if (autoOrbit) setAutoOrbit(false);
    handleScrubMove(e);
  };

  const handleScrubMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!scrubTrackRef.current) return;
    const rect = scrubTrackRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const targetIdx = Math.min(FRAME_NAMES.length - 1, Math.round(pct * (FRAME_NAMES.length - 1)));
    changeFrame(targetIdx);
  };

  const handleAddBagClick = () => {
    const itemToAdd = {
      id: (product?.id || productId || activeLook.id).toString(),
      name: product?.title || activeLook.name,
      group: product?.productType || activeLook.defaultCategory,
      price: priceFormatted,
      image: frameUrl(activeLook.id, 0),
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

  // Scan chamber optical echo indices matching ScanRunwayHero
  const leftFrame = wrapFrame(frameIndex - 2);
  const rearFrame = wrapFrame(frameIndex + 3);
  const rightFrame = wrapFrame(frameIndex + 2);
  const currentAngleName = frameIndex === 0 ? "Front" : frameIndex === 1 ? "Three-quarter" : frameIndex === 2 ? "Profile" : frameIndex === 3 ? "Rear Three-quarter" : frameIndex === 4 ? "Back" : frameIndex === 5 ? "Opposite Three-quarter" : "Complete Turn";

  return (
    <div className="ln-root">
      {/* Hero Section: 3-Column Asymmetric Lenticular Stage */}
      <section className="ln-hero-section">
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

          {/* Center Column: 360 Scan Chamber Stage matching Hero Section */}
          <div className="ln-card-container">
            <div className="ln-card-column">
              <div
                ref={stageRef}
                className="ln-scan-chamber-stage"
                role="group"
                aria-label={`Rotate ${product?.title || activeLook.name}. Current angle ${ANGLES[frameIndex]} degrees. Drag horizontally or use arrow keys.`}
                tabIndex={0}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                onKeyDown={onKeyDown}
              >
                {/* Floor Podium & Ring Atmosphere matching Hero Section */}
                <div className="ln-stage-floor-podium" aria-hidden="true">
                  <div className="ln-podium-spotlight" />
                  <div className="ln-podium-ring" />
                  <div className="ln-floor-ticks">
                    {ANGLES.map((ang, idx) => (
                      <span
                        key={ang}
                        className={`ln-floor-tick-label ${frameIndex === idx ? "active" : ""}`}
                      >
                        {ang}°
                      </span>
                    ))}
                  </div>
                </div>

                {/* Left Echo Silhouette */}
                <img
                  className="ln-scan-echo ln-scan-echo--left"
                  src={frameUrl(activeLook.id, leftFrame)}
                  alt=""
                  width={960}
                  height={1720}
                  decoding="async"
                  draggable={false}
                />

                {/* Rear Echo Silhouette */}
                <img
                  className="ln-scan-echo ln-scan-echo--rear"
                  src={frameUrl(activeLook.id, rearFrame)}
                  alt=""
                  width={960}
                  height={1720}
                  decoding="async"
                  draggable={false}
                />

                {/* Right Echo Silhouette */}
                <img
                  className="ln-scan-echo ln-scan-echo--right"
                  src={frameUrl(activeLook.id, rightFrame)}
                  alt=""
                  width={960}
                  height={1720}
                  decoding="async"
                  draggable={false}
                />

                {/* Primary Model Scan Frame */}
                <img
                  className="ln-scan-model-frame"
                  key={`${activeLook.id}-${frameIndex}`}
                  src={frameUrl(activeLook.id, frameIndex)}
                  alt={`${product?.title || activeLook.name}, ${ANGLES[frameIndex]} degree view`}
                  width={960}
                  height={1720}
                  draggable={false}
                  decoding="async"
                  fetchPriority="high"
                />

                {/* Interactive Drag Hint */}
                <div className="ln-scan-drag-hint">
                  <span>↔ DRAG TO ROTATE 360°</span>
                </div>
              </div>

              {/* Interactive Angle Controller Dock (Directly at bottom of scan picture) */}
              <div className="ln-angle-controller-bar">
                {/* Header: Title + Orbit Mode Button */}
                <div className="ln-angle-header">
                  <div>
                    <span className="ln-m" style={{ color: "var(--ln-clay)", display: "block", marginBottom: "2px" }}>
                      CHAMBER SCAN 360°
                    </span>
                    <b className="ln-angle-heading-live">
                      {ANGLES[frameIndex]}° · {
                        frameIndex === 0 ? "FRONT VIEW" :
                        frameIndex === 1 ? "THREE-QUARTER" :
                        frameIndex === 2 ? "PROFILE VIEW" :
                        frameIndex === 3 ? "REAR THREE-QUARTER" :
                        frameIndex === 4 ? "BACK VIEW" :
                        frameIndex === 5 ? "OPPOSITE THREE-QUARTER" :
                        "TURNAROUND VIEW"
                      }
                    </b>
                  </div>

                  <button
                    type="button"
                    className={`ln-orbit-toggle-btn ${autoOrbit ? "active" : ""}`}
                    onClick={() => setAutoOrbit(!autoOrbit)}
                    title="Toggle auto-orbiting rotation"
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

                {/* 7 Interactive Angle Choice Pills */}
                <div className="ln-angle-pills-grid">
                  {FRAME_NAMES.map((fName, idx) => {
                    const isSel = frameIndex === idx;
                    const angleDeg = ANGLES[idx];
                    const label = idx === 0 ? "000° Front" : idx === 1 ? "045° 3/4" : idx === 2 ? "090° Prof" : idx === 3 ? "135° R-3/4" : idx === 4 ? "180° Back" : idx === 5 ? "225° Opp" : "360° Full";
                    return (
                      <button
                        key={fName}
                        type="button"
                        className={`ln-angle-pill-btn ${isSel ? "active" : ""}`}
                        onClick={() => changeFrame(idx)}
                        aria-pressed={isSel}
                        title={`Select ${label} view`}
                      >
                        <span className="ln-angle-pill-name">{label.split(" ")[1]}</span>
                        <span className="ln-angle-pill-deg">{angleDeg}°</span>
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
                      {FRAME_NAMES.map((_, idx) => (
                        <span key={idx} className="ln-scrub-tick" />
                      ))}
                    </div>
                    <div
                      className="ln-scrub-thumb"
                      style={{ left: `${(frameIndex / (FRAME_NAMES.length - 1)) * 100}%` }}
                    />
                  </div>
                  <div className="ln-scrub-labels">
                    <span>000° FRONT</span>
                    <span>090° PROFILE</span>
                    <span>180° BACK</span>
                    <span>360° TURN</span>
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
          Captured in our 360-degree scan chamber. Drag across the stage above to rotate in physical motion, or inspect the 4 orthogonal views and macro textile print below.
        </p>

        <div className="ln-gallery-grid">
          {FOUR_VIEWS.map((view, idx) => (
            <figure
              key={view.frameName}
              className={`ln-thumb ln-up ${frameIndex === view.frameIdx ? "active" : ""}`}
              onClick={() => changeFrame(view.frameIdx)}
            >
              <div className="ln-thumb-wrap">
                <img
                  src={frameUrl(activeLook.id, view.frameIdx)}
                  alt={`${product?.title || "Garment"} ${view.name} view`}
                  loading="lazy"
                />
              </div>
              <figcaption className="ln-thumb-caption">
                <span className="ln-m" style={{ fontWeight: 700, color: "var(--ln-ink)" }}>
                  0{idx + 1} // {view.name}
                </span>
                <span className="ln-m">{view.label}</span>
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
