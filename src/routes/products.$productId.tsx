import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState, useMemo } from 'react';
import { shopifyClient } from '@/lib/shopify';
import { LenticularProductPage } from '@/components/product/LenticularProductPage';
import { VivreLayout } from '@/components/northline/VivreLayout';

export const Route = createFileRoute('/products/$productId')({
  component: ProductDetailsRoute,
});

// Rich catalog fallbacks when Shopify credentials are not set or handle is not in store
// Rich catalog of products accurately matched to the 7 Runway Hero looks
const CATALOG_FALLBACKS: Record<string, any> = {
  // Look 01 (f4) — Skyline zip
  "skyline-zip-hoodie": {
    id: "prod-skyline-hoodie",
    handle: "skyline-zip-hoodie",
    title: "Fieldtrip Skyline Double-Zip Hoodie",
    productType: "Hoodies & Fleece",
    lookId: "f4",
    description: "480 GSM heavy French loopback terry knitted in Wakayama, Japan. Two-way matte nickel Raccagni double zip with extended webbing pulls and darted cocoon hood.",
    variants: [{ id: "var-f4-1", price: { amount: "195.00", currencyCode: "GBP" }, title: "M / Skyline Blue" }],
    options: [
      { name: "Color", values: [{ value: "Skyline Blue" }, { value: "Washed Charcoal" }, { value: "Bone White" }] },
      { name: "Size", values: [{ value: "XS" }, { value: "S" }, { value: "M" }, { value: "L" }, { value: "XL" }] },
      { name: "Fit", values: [{ value: "Cocoon Fit" }, { value: "Relaxed" }] },
    ],
  },
  "washed-charcoal-denim": {
    id: "prod-washed-charcoal-denim",
    handle: "washed-charcoal-denim",
    title: "Vivre Washed Charcoal Wide-Leg Denim",
    productType: "Trousers & Denim",
    lookId: "f4",
    description: "14.5oz rigid selvedge denim in a rich washed charcoal tint. Cut deliberately wide through hip and leg to puddle naturally over sneakers and boots.",
    variants: [{ id: "var-f4-2", price: { amount: "175.00", currencyCode: "GBP" }, title: "32 / Washed Charcoal" }],
    options: [
      { name: "Color", values: [{ value: "Washed Charcoal" }, { value: "Faded Ink" }, { value: "Raw Black" }] },
      { name: "Size", values: [{ value: "28" }, { value: "30" }, { value: "32" }, { value: "34" }, { value: "36" }] },
      { name: "Fit", values: [{ value: "Wide Leg" }, { value: "Puddle Stack" }] },
    ],
  },

  // Look 02 (f1) — Mouth tee
  "mouth-tee": {
    id: "prod-mouth-tee",
    handle: "mouth-tee",
    title: "Vivre Mouth Print Boxy Graphic Tee",
    productType: "Tees & Tops",
    lookId: "f1",
    description: "280 GSM ring-spun compact cotton jersey. Front silkscreen discharge print with breathable ink hand, dropped shoulder cut, and reinforced ribbed collar.",
    variants: [{ id: "var-f1-1", price: { amount: "75.00", currencyCode: "GBP" }, title: "M / Optic White" }],
    options: [
      { name: "Color", values: [{ value: "Optic White" }, { value: "Vintage Black" }, { value: "Chalk" }] },
      { name: "Size", values: [{ value: "XS" }, { value: "S" }, { value: "M" }, { value: "L" }, { value: "XL" }] },
      { name: "Fit", values: [{ value: "Boxy Cut" }, { value: "Oversized" }] },
    ],
  },
  "olive-cargo-trousers": {
    id: "prod-olive-cargo",
    handle: "olive-cargo-trousers",
    title: "Fieldtrip Relaxed Olive Utility Cargo Trousers",
    productType: "Trousers & Bottoms",
    lookId: "f1",
    description: "Military-grade cotton ripstop with dual bellows cargo pockets, articulated knee pleats, reinforced seat panel, and internal drawstring hem cinches.",
    variants: [{ id: "var-f1-2", price: { amount: "165.00", currencyCode: "GBP" }, title: "32 / Washed Olive" }],
    options: [
      { name: "Color", values: [{ value: "Washed Olive" }, { value: "Dark Earth" }, { value: "Charcoal" }] },
      { name: "Size", values: [{ value: "28" }, { value: "30" }, { value: "32" }, { value: "34" }, { value: "36" }] },
      { name: "Fit", values: [{ value: "Relaxed Articulated" }, { value: "Cinch Ankle" }] },
    ],
  },

  // Look 03 (f2) — Second skin
  "shoreline-boat-neck-top": {
    id: "prod-boatneck-top",
    handle: "shoreline-boat-neck-top",
    title: "Vivre Shoreline Boat Neck Top – Women’s White",
    productType: "Tops & Tunics",
    lookId: "f2",
    description: "240 GSM organic long-staple pima cotton interlock with structured boat neckline, ergonomic lateral armholes, and clean bonded hem construction.",
    variants: [{ id: "var-f2-1", price: { amount: "110.00", currencyCode: "GBP" }, title: "S / White" }],
    options: [
      { name: "Color", values: [{ value: "White" }, { value: "Ink Black" }, { value: "Slate" }] },
      { name: "Size", values: [{ value: "XS" }, { value: "S" }, { value: "M" }, { value: "L" }] },
      { name: "Fit", values: [{ value: "Fitted Line" }, { value: "Second Skin" }] },
    ],
  },
  "longform-wide-leg-jeans": {
    id: "prod-longform-jeans",
    handle: "longform-wide-leg-jeans",
    title: "Vivre Longform Wide Leg Jeans – Deep Blue",
    productType: "Trousers & Denim",
    lookId: "f2",
    description: "14oz deep indigo ring-spun denim tailored with extended inseam length, relaxed through hip and thigh with clean copper rivets and soft crease fall.",
    variants: [{ id: "var-f2-2", price: { amount: "190.00", currencyCode: "GBP" }, title: "30 / Deep Blue" }],
    options: [
      { name: "Color", values: [{ value: "Deep Blue" }, { value: "Ink Wash" }, { value: "Raw Indigo" }] },
      { name: "Size", values: [{ value: "26" }, { value: "28" }, { value: "30" }, { value: "32" }, { value: "34" }] },
      { name: "Fit", values: [{ value: "Longform Wide" }, { value: "Relaxed High Rise" }] },
    ],
  },

  // Look 04 (f3) — Archive layer
  "graphic-crew-sweatshirt": {
    id: "prod-graphic-crew",
    handle: "graphic-crew-sweatshirt",
    title: "Fieldtrip Graphic Crew Sweatshirt – Archive Layer",
    productType: "Sweaters & Knits",
    lookId: "f3",
    description: "520 GSM heavyweight combed fleece featuring an archive intarsia chest motif, tubular ribbed collar, and double-needle cover-stitched seams.",
    variants: [{ id: "var-f3-1", price: { amount: "180.00", currencyCode: "GBP" }, title: "M / Cream Oat" }],
    options: [
      { name: "Color", values: [{ value: "Cream Oat" }, { value: "Heather Grey" }, { value: "Charcoal" }] },
      { name: "Size", values: [{ value: "S" }, { value: "M" }, { value: "L" }, { value: "XL" }] },
      { name: "Fit", values: [{ value: "Boxy Slouch" }, { value: "Drop Shoulder" }] },
    ],
  },

  // Look 05 (m1) — After hours
  "black-boxy-tee": {
    id: "prod-boxy-tee",
    handle: "black-boxy-tee",
    title: "Vivre Black Boxy Tee – After Hours",
    productType: "Tees & Tops",
    lookId: "m1",
    description: "300 GSM combed carded jersey finished with an enzyme stone wash. Bound 1.25\" ribbed collar, dropped forward shoulders, and blind-stitched hems.",
    variants: [{ id: "var-m1-1", price: { amount: "85.00", currencyCode: "GBP" }, title: "L / Washed Black" }],
    options: [
      { name: "Color", values: [{ value: "Washed Black" }, { value: "Pitch Black" }, { value: "Asphalt" }] },
      { name: "Size", values: [{ value: "S" }, { value: "M" }, { value: "L" }, { value: "XL" }] },
      { name: "Fit", values: [{ value: "Square Boxy" }] },
    ],
  },
  "razorcut-ripped-wide-leg-jeans": {
    id: "prod-razorcut-jeans",
    handle: "razorcut-ripped-wide-leg-jeans",
    title: "Vivre Razorcut Ripped Wide Leg Jeans – Dark Blue",
    productType: "Trousers & Denim",
    lookId: "m1",
    description: "15oz washed selvedge denim featuring hand-applied horizontal razor distressing, reinforced backing stitches, and wide straight leg profile.",
    variants: [{ id: "var-m1-2", price: { amount: "210.00", currencyCode: "GBP" }, title: "32 / Dark Blue Wash" }],
    options: [
      { name: "Color", values: [{ value: "Dark Blue Wash" }, { value: "Faded Bleach" }, { value: "Vintage Tint" }] },
      { name: "Size", values: [{ value: "30" }, { value: "32" }, { value: "34" }, { value: "36" }] },
      { name: "Fit", values: [{ value: "Wide Leg" }, { value: "Distressed" }] },
    ],
  },

  // Look 06 (m2) — Layered henley
  "grey-ribbed-henley": {
    id: "prod-layered-henley",
    handle: "grey-ribbed-henley",
    title: "Fieldtrip Grey Ribbed Thermal Henley",
    productType: "Thermal & Knits",
    lookId: "m2",
    description: "360 GSM double-face merino-cotton rib knit. Raw edge contrast cuffs and turned corozo nut buttons for temperature-adaptive city layering.",
    variants: [{ id: "var-m2-1", price: { amount: "145.00", currencyCode: "GBP" }, title: "M / Heather Grey" }],
    options: [
      { name: "Color", values: [{ value: "Heather Grey" }, { value: "Deep Ink" }, { value: "Oatmeal" }] },
      { name: "Size", values: [{ value: "S" }, { value: "M" }, { value: "L" }, { value: "XL" }] },
      { name: "Fit", values: [{ value: "Tailored Slim" }, { value: "Relaxed Layer" }] },
    ],
  },
  "overset-wide-leg-jeans": {
    id: "prod-overset-jeans",
    handle: "overset-wide-leg-jeans",
    title: "Vivre Overset Wide Leg Jeans – Navy",
    productType: "Trousers & Denim",
    lookId: "m2",
    description: "14oz Kuroki Japanese indigo denim cut with an oversized waistband block meant to sit relaxed on the hips with heavy creased drape.",
    variants: [{ id: "var-m2-2", price: { amount: "195.00", currencyCode: "GBP" }, title: "32 / Overset Navy" }],
    options: [
      { name: "Color", values: [{ value: "Overset Navy" }, { value: "Dark Indigo" }, { value: "Washed Blue" }] },
      { name: "Size", values: [{ value: "30" }, { value: "32" }, { value: "34" }, { value: "36" }] },
      { name: "Fit", values: [{ value: "Overset Wide" }, { value: "Relaxed Straight" }] },
    ],
  },

  // Look 07 (m3) — Suede shift
  "sand-suede-jacket": {
    id: "prod-suede-jacket",
    handle: "sand-suede-jacket",
    title: "Vivre Sand Suede Shift Jacket",
    productType: "Outerwear & Jackets",
    lookId: "m3",
    description: "Architectural boxy cropped jacket cut from 420 GSM Tuscan sanded calf suede. Features an articulated bi-swing back, custom gunmetal riveted snaps, and heavy cotton twill lining.",
    variants: [{ id: "var-m3-1", price: { amount: "285.00", currencyCode: "GBP" }, title: "L / Sand Suede" }],
    options: [
      { name: "Color", values: [{ value: "Sand Suede" }, { value: "Washed Charcoal" }, { value: "Concrete" }] },
      { name: "Size", values: [{ value: "S" }, { value: "M" }, { value: "L" }, { value: "XL" }] },
      { name: "Fit", values: [{ value: "Boxy Crop" }, { value: "Standard" }] },
    ],
  },
  "ironwork-15oz-raw-denim-jeans": {
    id: "prod-ironwork-jeans",
    handle: "ironwork-15oz-raw-denim-jeans",
    title: "Vivre Ironwork 15oz Raw Denim Jeans – Black",
    productType: "Trousers & Denim",
    lookId: "m3",
    description: "15oz sanforized raw black selvedge denim woven on shuttle looms in Okayama. Heavy brass hardware, hidden back pocket rivets, and leather waistband patch.",
    variants: [{ id: "var-m3-2", price: { amount: "220.00", currencyCode: "GBP" }, title: "32 / Raw Black" }],
    options: [
      { name: "Color", values: [{ value: "Raw Black" }, { value: "Double Indigo" }, { value: "Bleach Fade" }] },
      { name: "Size", values: [{ value: "30" }, { value: "32" }, { value: "34" }, { value: "36" }] },
      { name: "Fit", values: [{ value: "Straight Raw" }, { value: "Cuffed" }] },
    ],
  },

  // Legacy route aliases
  "suede-jacket": { $ref: "sand-suede-jacket" },
  "after-hours-tee": { $ref: "black-boxy-tee" },
  "layered-henley": { $ref: "grey-ribbed-henley" },
  "boatneck-top": { $ref: "shoreline-boat-neck-top" },
  "tactical-crewneck": { $ref: "graphic-crew-sweatshirt" },
  "wide-leg-cargo": { $ref: "olive-cargo-trousers" },
};

function generateFallbackProduct(handle: string) {
  const lower = handle.toLowerCase();
  
  // Check exact key match
  if (CATALOG_FALLBACKS[lower]) {
    const item = CATALOG_FALLBACKS[lower];
    return item.$ref ? CATALOG_FALLBACKS[item.$ref] : item;
  }

  // Check partial key match
  for (const [key, prod] of Object.entries(CATALOG_FALLBACKS)) {
    if (lower.includes(key) || key.includes(lower)) {
      return prod.$ref ? CATALOG_FALLBACKS[prod.$ref] : prod;
    }
  }

  // Determine Look ID and characteristics intelligently
  let lookId = "f4";
  let type = "Outerwear & Jackets";
  let amount = "240.00";

  if (lower.includes("suede") || lower.includes("m3") || lower.includes("ironwork")) {
    lookId = "m3";
    type = lower.includes("denim") || lower.includes("jeans") ? "Trousers & Denim" : "Outerwear & Jackets";
    amount = "285.00";
  } else if (lower.includes("henley") || lower.includes("m2") || lower.includes("overset")) {
    lookId = "m2";
    type = lower.includes("denim") || lower.includes("jeans") ? "Trousers & Denim" : "Thermal & Knits";
    amount = "145.00";
  } else if (lower.includes("boxy") || lower.includes("m1") || lower.includes("razorcut")) {
    lookId = "m1";
    type = lower.includes("denim") || lower.includes("jeans") ? "Trousers & Denim" : "Tees & Tops";
    amount = "85.00";
  } else if (lower.includes("graphic") || lower.includes("f3") || lower.includes("archive")) {
    lookId = "f3";
    type = "Sweaters & Knits";
    amount = "180.00";
  } else if (lower.includes("shoreline") || lower.includes("boat") || lower.includes("f2")) {
    lookId = "f2";
    type = lower.includes("denim") || lower.includes("jeans") ? "Trousers & Denim" : "Tops & Tunics";
    amount = "110.00";
  } else if (lower.includes("mouth") || lower.includes("cargo") || lower.includes("f1")) {
    lookId = "f1";
    type = lower.includes("cargo") || lower.includes("trouser") ? "Trousers & Bottoms" : "Tees & Tops";
    amount = "75.00";
  } else if (lower.includes("hoodie") || lower.includes("zip") || lower.includes("f4")) {
    lookId = "f4";
    type = "Hoodies & Fleece";
    amount = "195.00";
  }

  // Format title from handle
  const title = handle
    .split(/[-_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    id: `prod-${handle}`,
    handle,
    title: title ? `Vivre ${title}` : "Vivre Atelier Garment",
    productType: type,
    lookId,
    description: `Architectural utility piece cut and tailored in small studio runs. Articulated seam construction, high-tensile threading, and clean geometric drape.`,
    variants: [{ id: `var-${handle}`, price: { amount, currencyCode: "GBP" }, title: "M / Standard" }],
    options: [
      { name: "Color", values: [{ value: "Standard Edition" }, { value: "Ink Black" }, { value: "Concrete" }] },
      { name: "Size", values: [{ value: "S" }, { value: "M" }, { value: "L" }, { value: "XL" }] },
      { name: "Fit", values: [{ value: "Boxy Cut" }, { value: "Relaxed" }] },
    ],
  };
}

function ProductDetailsRoute() {
  const { productId } = Route.useParams();
  const [product, setProduct] = useState<any>(() => generateFallbackProduct(productId));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (import.meta.env.VITE_SHOPIFY_DOMAIN && import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN) {
      shopifyClient.product
        .fetchByHandle(productId)
        .then((fetchedProduct) => {
          if (!isMounted) return;
          if (fetchedProduct) {
            setProduct(fetchedProduct);
          } else {
            setProduct(generateFallbackProduct(productId));
          }
          setLoading(false);
        })
        .catch((err) => {
          console.warn("Shopify fetch failed, falling back to local catalog:", err);
          if (isMounted) {
            setProduct(generateFallbackProduct(productId));
            setLoading(false);
          }
        });
    } else {
      setProduct(generateFallbackProduct(productId));
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [productId]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#e6e7e9",
          color: "#101114",
          fontFamily: "'Geist Mono', monospace",
          letterSpacing: "0.14em",
          fontSize: "0.8rem",
          textTransform: "uppercase",
        }}
      >
        <span>Loading Atelier Piece...</span>
      </div>
    );
  }

  return (
    <VivreLayout>
      <LenticularProductPage product={product} productId={productId} />
    </VivreLayout>
  );
}
