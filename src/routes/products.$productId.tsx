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
  // Look 01 (f4) — Key To My Heart zip & carpenter jeans
  "key-to-my-heart-zip-hoodie": {
    id: "prod-key-to-my-heart-hoodie",
    handle: "key-to-my-heart-zip-hoodie",
    title: "Vivre Rhinestone 'Key To My Heart' Zip Hoodie",
    productType: "Hoodies & Fleece",
    lookId: "f4",
    description: "480 GSM heavy Japanese loopback cotton fleece in skyline pale blue. Features hand-set crystal rhinestone lettering 'YOU ARE THE KEY TO MY HEART' across split kangaroo pockets, heraldic embroidered chest crest patch, and custom two-way silver zipper.",
    variants: [{ id: "var-f4-1", price: { amount: "195.00", currencyCode: "GBP" }, title: "M / Skyline Blue" }],
    options: [
      { name: "Color", values: [{ value: "Skyline Blue" }, { value: "Washed Charcoal" }, { value: "Bone White" }] },
      { name: "Size", values: [{ value: "XS" }, { value: "S" }, { value: "M" }, { value: "L" }, { value: "XL" }] },
      { name: "Fit", values: [{ value: "Cocoon Fit" }, { value: "Relaxed" }] },
    ],
  },
  "washed-charcoal-carpenter-jeans": {
    id: "prod-washed-charcoal-carpenter",
    handle: "washed-charcoal-carpenter-jeans",
    title: "Vivre Washed Charcoal Double-Knee Carpenter Jeans",
    productType: "Trousers & Denim",
    lookId: "f4",
    description: "14.5oz rigid selvedge denim in a rich washed charcoal tint. Reinforced double-knee utility patch panels, carpenter hammer loop, contrast silver-grey stitching, and wide pooling cuffs.",
    variants: [{ id: "var-f4-2", price: { amount: "175.00", currencyCode: "GBP" }, title: "32 / Washed Charcoal" }],
    options: [
      { name: "Color", values: [{ value: "Washed Charcoal" }, { value: "Faded Ink" }, { value: "Raw Black" }] },
      { name: "Size", values: [{ value: "28" }, { value: "30" }, { value: "32" }, { value: "34" }, { value: "36" }] },
      { name: "Fit", values: [{ value: "Double-Knee Wide" }, { value: "Puddle Stack" }] },
    ],
  },

  // Look 02 (f1) — Double Mouth tee & olive cargo
  "double-blue-mouth-tee": {
    id: "prod-double-blue-mouth-tee",
    handle: "double-blue-mouth-tee",
    title: "Vivre Double Blue Mouth Graphic Tee",
    productType: "Tees & Tops",
    lookId: "f1",
    description: "280 GSM heavyweight ring-spun compact cotton jersey. Dual stacked blue glitter and discharge mouth graphic with metallic grillz detail. Cut boxy with relaxed dropped shoulder and blind-stitched hem.",
    variants: [{ id: "var-f1-1", price: { amount: "75.00", currencyCode: "GBP" }, title: "M / Optic White" }],
    options: [
      { name: "Color", values: [{ value: "Optic White" }, { value: "Vintage Black" }, { value: "Chalk" }] },
      { name: "Size", values: [{ value: "XS" }, { value: "S" }, { value: "M" }, { value: "L" }, { value: "XL" }] },
      { name: "Fit", values: [{ value: "Boxy Cut" }, { value: "Oversized" }] },
    ],
  },
  "olive-drab-cargo-trousers": {
    id: "prod-olive-drab-cargo",
    handle: "olive-drab-cargo-trousers",
    title: "Fieldtrip Olive Drab Wide Utility Cargo Trousers",
    productType: "Trousers & Bottoms",
    lookId: "f1",
    description: "Heavyweight military-grade cotton ripstop in washed olive drab. Built with dual bellowed cargo thigh pockets with hidden storm flaps, articulated knee darts, and adjustable wide-leg hem cinches.",
    variants: [{ id: "var-f1-2", price: { amount: "165.00", currencyCode: "GBP" }, title: "32 / Washed Olive" }],
    options: [
      { name: "Color", values: [{ value: "Washed Olive" }, { value: "Dark Earth" }, { value: "Charcoal" }] },
      { name: "Size", values: [{ value: "28" }, { value: "30" }, { value: "32" }, { value: "34" }, { value: "36" }] },
      { name: "Fit", values: [{ value: "Wide Utility" }, { value: "Cinch Ankle" }] },
    ],
  },

  // Look 03 (f2) — Second skin boatneck & deep indigo wide jeans
  "optic-white-boatneck-top": {
    id: "prod-optic-white-boatneck",
    handle: "optic-white-boatneck-top",
    title: "Vivre Optic White 3/4 Boatneck Top",
    productType: "Tops & Tunics",
    lookId: "f2",
    description: "260 GSM double-knit modal pima cotton interlock with four-way stretch. Elegant wide boatneck neckline, refined 3/4 elbow-length sleeve, and bonded seamless cuffs for a sculpted second-skin contour.",
    variants: [{ id: "var-f2-1", price: { amount: "110.00", currencyCode: "GBP" }, title: "S / Optic White" }],
    options: [
      { name: "Color", values: [{ value: "Optic White" }, { value: "Ink Black" }, { value: "Slate" }] },
      { name: "Size", values: [{ value: "XS" }, { value: "S" }, { value: "M" }, { value: "L" }] },
      { name: "Fit", values: [{ value: "Fitted Line" }, { value: "Second Skin" }] },
    ],
  },
  "deep-indigo-raw-wide-jeans": {
    id: "prod-deep-indigo-wide-jeans",
    handle: "deep-indigo-raw-wide-jeans",
    title: "Vivre Deep Indigo Raw Wide-Leg Jeans",
    productType: "Trousers & Denim",
    lookId: "f2",
    description: "14oz rigid unwashed deep ink raw denim. Tailored with a flattering high-rise waistband, contrast tobacco topstitching, custom brushed silver rectangular plaque belt loop buckle, and an exaggerated wide leg pooling hem.",
    variants: [{ id: "var-f2-2", price: { amount: "190.00", currencyCode: "GBP" }, title: "30 / Deep Blue" }],
    options: [
      { name: "Color", values: [{ value: "Deep Blue" }, { value: "Ink Wash" }, { value: "Raw Indigo" }] },
      { name: "Size", values: [{ value: "26" }, { value: "28" }, { value: "30" }, { value: "32" }, { value: "34" }] },
      { name: "Fit", values: [{ value: "High-Rise Wide" }, { value: "Puddle Drape" }] },
    ],
  },

  // Look 04 (f3) — Infatuated graphic crew
  "infatuated-graphic-crew": {
    id: "prod-infatuated-crew",
    handle: "infatuated-graphic-crew",
    title: "Fieldtrip 'Infatuated' Sleeve-Print Graphic Crew",
    productType: "Sweaters & Knits",
    lookId: "f3",
    description: "500 GSM heavy combed organic cotton fleece in natural oatmeal cream. Features bold 'MENT INFATUATED / DONT FUCK YOURSELF' portrait chest graphic, full typographic typography down both sleeves, and heavy 2x2 ribbed trims.",
    variants: [{ id: "var-f3-1", price: { amount: "180.00", currencyCode: "GBP" }, title: "M / Cream Oat" }],
    options: [
      { name: "Color", values: [{ value: "Cream Oat" }, { value: "Heather Grey" }, { value: "Charcoal" }] },
      { name: "Size", values: [{ value: "S" }, { value: "M" }, { value: "L" }, { value: "XL" }] },
      { name: "Fit", values: [{ value: "Boxy Slouch" }, { value: "Drop Shoulder" }] },
    ],
  },

  // Look 05 (m1) — Solid black boxy tee & razorcut jeans
  "solid-black-boxy-tee": {
    id: "prod-solid-black-boxy-tee",
    handle: "solid-black-boxy-tee",
    title: "Vivre Solid Black Boxy Oversized Tee",
    productType: "Tees & Tops",
    lookId: "m1",
    description: "300 GSM ultra-heavy combed carded cotton jersey in pure solid pitch black. Engineered with a square boxy drape, dropped forward shoulder seams, 1.25\" thick bound ribbed collar, and wide elbow sleeves with zero exterior graphics.",
    variants: [{ id: "var-m1-1", price: { amount: "85.00", currencyCode: "GBP" }, title: "L / Pitch Black" }],
    options: [
      { name: "Color", values: [{ value: "Pitch Black" }, { value: "Washed Black" }, { value: "Carbon" }] },
      { name: "Size", values: [{ value: "S" }, { value: "M" }, { value: "L" }, { value: "XL" }] },
      { name: "Fit", values: [{ value: "Square Boxy" }, { value: "Oversized Drop" }] },
    ],
  },
  "razorcut-distressed-wide-jeans": {
    id: "prod-razorcut-distressed-jeans",
    handle: "razorcut-distressed-wide-jeans",
    title: "Vivre Razorcut Distressed Knee-Panel Wide Jeans – Light Blue",
    productType: "Trousers & Denim",
    lookId: "m1",
    description: "14.5oz Japanese selvedge denim in a vintage stone bleach wash. Hand-applied horizontal razorcut abrasions, curved arc knee panel seams, and an exaggerated loose skate silhouette stacking over footwear.",
    variants: [{ id: "var-m1-2", price: { amount: "210.00", currencyCode: "GBP" }, title: "32 / Light Vintage Blue" }],
    options: [
      { name: "Color", values: [{ value: "Light Vintage Blue" }, { value: "Faded Bleach" }, { value: "Vintage Tint" }] },
      { name: "Size", values: [{ value: "30" }, { value: "32" }, { value: "34" }, { value: "36" }] },
      { name: "Fit", values: [{ value: "Skate Wide" }, { value: "Distressed Stack" }] },
    ],
  },

  // Look 06 (m2) — Layered henley & baggy jeans
  "heather-grey-knit-henley": {
    id: "prod-heather-grey-henley",
    handle: "heather-grey-knit-henley",
    title: "Fieldtrip Heather Grey Knitted 3-Button Henley",
    productType: "Thermal & Knits",
    lookId: "m2",
    description: "360 GSM ultra-fine merino and pima cotton ribbed knit in heather grey. Features a three-button placket with natural corozo nut buttons, designed for seamless layering over a clean white tee, with extended ribbed cuffs and relaxed body.",
    variants: [{ id: "var-m2-1", price: { amount: "145.00", currencyCode: "GBP" }, title: "M / Heather Grey" }],
    options: [
      { name: "Color", values: [{ value: "Heather Grey" }, { value: "Deep Ink" }, { value: "Oatmeal" }] },
      { name: "Size", values: [{ value: "S" }, { value: "M" }, { value: "L" }, { value: "XL" }] },
      { name: "Fit", values: [{ value: "Relaxed Layer" }, { value: "Classic Fit" }] },
    ],
  },
  "classic-blue-baggy-jeans": {
    id: "prod-classic-blue-baggy-jeans",
    handle: "classic-blue-baggy-jeans",
    title: "Vivre Classic Blue Baggy Wide-Leg Jeans",
    productType: "Trousers & Denim",
    lookId: "m2",
    description: "14oz ring-spun denim in a classic 90s mid-blue wash. Cut roomy through seat and thigh with an authentic skate-inspired wide straight leg that settles with natural drape over low-profile sneakers.",
    variants: [{ id: "var-m2-2", price: { amount: "195.00", currencyCode: "GBP" }, title: "32 / Classic Mid Blue" }],
    options: [
      { name: "Color", values: [{ value: "Classic Mid Blue" }, { value: "Vintage Stone" }, { value: "Dark Wash" }] },
      { name: "Size", values: [{ value: "30" }, { value: "32" }, { value: "34" }, { value: "36" }] },
      { name: "Fit", values: [{ value: "Baggy Skate" }, { value: "Wide Straight" }] },
    ],
  },

  // Look 07 (m3) — Sand suede blouson & raw selvedge
  "sand-suede-blouson-jacket": {
    id: "prod-sand-suede-blouson",
    handle: "sand-suede-blouson-jacket",
    title: "Vivre Sand Suede Zip Blouson Jacket",
    productType: "Outerwear & Jackets",
    lookId: "m3",
    description: "Architectural blouson jacket crafted from 420 GSM supple sanded calf suede in warm sand tan. Styled with an pointed collar, full front zip closure, horizontal chest yoke detail, elasticized blouson hem, and designed for tailoring layers over dress shirts and ties.",
    variants: [{ id: "var-m3-1", price: { amount: "285.00", currencyCode: "GBP" }, title: "L / Sand Suede" }],
    options: [
      { name: "Color", values: [{ value: "Sand Suede" }, { value: "Warm Camel" }, { value: "Espresso" }] },
      { name: "Size", values: [{ value: "S" }, { value: "M" }, { value: "L" }, { value: "XL" }] },
      { name: "Fit", values: [{ value: "Tailored Blouson" }, { value: "Relaxed Crop" }] },
    ],
  },
  "ironwork-15oz-raw-denim-jeans": {
    id: "prod-ironwork-jeans",
    handle: "ironwork-15oz-raw-denim-jeans",
    title: "Vivre Ironwork 15oz Raw Selvedge Denim Jeans – Black",
    productType: "Trousers & Denim",
    lookId: "m3",
    description: "15oz sanforized rigid raw black selvedge denim woven on vintage shuttle looms in Okayama. Finished with copper rivets, heavy redline selvedge ID, and a tailored wide straight fall.",
    variants: [{ id: "var-m3-2", price: { amount: "220.00", currencyCode: "GBP" }, title: "32 / Raw Black" }],
    options: [
      { name: "Color", values: [{ value: "Raw Black" }, { value: "Double Black" }, { value: "Raw Indigo" }] },
      { name: "Size", values: [{ value: "30" }, { value: "32" }, { value: "34" }, { value: "36" }] },
      { name: "Fit", values: [{ value: "Straight Raw" }, { value: "Cuffed" }] },
    ],
  },

  // Legacy route aliases & synonyms so no existing links break
  "skyline-zip-hoodie": { $ref: "key-to-my-heart-zip-hoodie" },
  "washed-charcoal-denim": { $ref: "washed-charcoal-carpenter-jeans" },
  "mouth-tee": { $ref: "double-blue-mouth-tee" },
  "olive-cargo-trousers": { $ref: "olive-drab-cargo-trousers" },
  "shoreline-boat-neck-top": { $ref: "optic-white-boatneck-top" },
  "longform-wide-leg-jeans": { $ref: "deep-indigo-raw-wide-jeans" },
  "graphic-crew-sweatshirt": { $ref: "infatuated-graphic-crew" },
  "black-boxy-tee": { $ref: "solid-black-boxy-tee" },
  "razorcut-ripped-wide-leg-jeans": { $ref: "razorcut-distressed-wide-jeans" },
  "grey-ribbed-henley": { $ref: "heather-grey-knit-henley" },
  "overset-wide-leg-jeans": { $ref: "classic-blue-baggy-jeans" },
  "sand-suede-jacket": { $ref: "sand-suede-blouson-jacket" },
  "suede-jacket": { $ref: "sand-suede-blouson-jacket" },
  "after-hours-tee": { $ref: "solid-black-boxy-tee" },
  "layered-henley": { $ref: "heather-grey-knit-henley" },
  "boatneck-top": { $ref: "optic-white-boatneck-top" },
  "tactical-crewneck": { $ref: "infatuated-graphic-crew" },
  "wide-leg-cargo": { $ref: "olive-drab-cargo-trousers" },
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

  if (lower.includes("suede") || lower.includes("m3") || lower.includes("ironwork") || lower.includes("blouson")) {
    lookId = "m3";
    type = lower.includes("denim") || lower.includes("jeans") ? "Trousers & Denim" : "Outerwear & Jackets";
    amount = "285.00";
  } else if (lower.includes("henley") || lower.includes("m2") || lower.includes("overset") || lower.includes("baggy")) {
    lookId = "m2";
    type = lower.includes("denim") || lower.includes("jeans") ? "Trousers & Denim" : "Thermal & Knits";
    amount = "145.00";
  } else if (lower.includes("boxy") || lower.includes("m1") || lower.includes("razorcut") || lower.includes("distressed")) {
    lookId = "m1";
    type = lower.includes("denim") || lower.includes("jeans") ? "Trousers & Denim" : "Tees & Tops";
    amount = "85.00";
  } else if (lower.includes("graphic") || lower.includes("f3") || lower.includes("archive") || lower.includes("infatuated")) {
    lookId = "f3";
    type = "Sweaters & Knits";
    amount = "180.00";
  } else if (lower.includes("shoreline") || lower.includes("boat") || lower.includes("f2") || lower.includes("optic-white")) {
    lookId = "f2";
    type = lower.includes("denim") || lower.includes("jeans") ? "Trousers & Denim" : "Tops & Tunics";
    amount = "110.00";
  } else if (lower.includes("mouth") || lower.includes("cargo") || lower.includes("f1") || lower.includes("olive")) {
    lookId = "f1";
    type = lower.includes("cargo") || lower.includes("trouser") ? "Trousers & Bottoms" : "Tees & Tops";
    amount = "75.00";
  } else if (lower.includes("hoodie") || lower.includes("zip") || lower.includes("f4") || lower.includes("carpenter") || lower.includes("heart")) {
    lookId = "f4";
    type = lower.includes("carpenter") || lower.includes("denim") || lower.includes("jeans") ? "Trousers & Denim" : "Hoodies & Fleece";
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
