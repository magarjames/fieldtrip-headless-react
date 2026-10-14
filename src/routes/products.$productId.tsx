import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState, useMemo } from 'react';
import { shopifyClient } from '@/lib/shopify';
import { LenticularProductPage } from '@/components/product/LenticularProductPage';
import { VivreLayout } from '@/components/northline/VivreLayout';

export const Route = createFileRoute('/products/$productId')({
  component: ProductDetailsRoute,
});

// Rich catalog fallbacks when Shopify credentials are not set or handle is not in store
const CATALOG_FALLBACKS: Record<string, any> = {
  "suede-jacket": {
    id: "prod-suede-jacket",
    title: "Vivre Sand Suede Shift Jacket",
    productType: "Outerwear & Jackets",
    description: "Architectural boxy cropped jacket cut from 420 GSM Tuscan sanded calf suede. Features an articulated bi-swing back, custom gunmetal riveted snaps, and heavy cotton twill lining.",
    variants: [{ id: "var-1", price: { amount: "285.00", currencyCode: "GBP" }, title: "M / Sand Suede" }],
    options: [
      { name: "Color", values: [{ value: "Sand Suede" }, { value: "Washed Charcoal" }, { value: "Concrete" }] },
      { name: "Size", values: [{ value: "S" }, { value: "M" }, { value: "L" }, { value: "XL" }] },
      { name: "Fit", values: [{ value: "Boxy Crop" }, { value: "Standard" }] },
    ],
  },
  "skyline-zip-hoodie": {
    id: "prod-skyline-hoodie",
    title: "Fieldtrip Skyline Double-Zip Hoodie",
    productType: "Hoodies & Fleece",
    description: "480 GSM heavy French loopback terry knitted in Wakayama, Japan. Two-way matte nickel Raccagni double zip with extended webbing pulls and darted cocoon hood.",
    variants: [{ id: "var-2", price: { amount: "195.00", currencyCode: "GBP" }, title: "M / Sky Blue" }],
    options: [
      { name: "Color", values: [{ value: "Sky Blue" }, { value: "Faded Black" }, { value: "Bone White" }] },
      { name: "Size", values: [{ value: "XS" }, { value: "S" }, { value: "M" }, { value: "L" }, { value: "XL" }] },
      { name: "Fit", values: [{ value: "Cocoon Fit" }, { value: "Relaxed" }] },
    ],
  },
  "after-hours-tee": {
    id: "prod-boxy-tee",
    title: "Vivre Heavy After Hours Boxy Tee",
    productType: "Tees & Tops",
    description: "300 GSM combed carded jersey finished with an enzyme stone wash. Bound 1.25\" ribbed collar, dropped forward shoulders, and blind-stitched hems.",
    variants: [{ id: "var-3", price: { amount: "85.00", currencyCode: "GBP" }, title: "M / Washed Black" }],
    options: [
      { name: "Color", values: [{ value: "Washed Black" }, { value: "Optic White" }, { value: "Dust Taupe" }] },
      { name: "Size", values: [{ value: "S" }, { value: "M" }, { value: "L" }, { value: "XL" }] },
      { name: "Fit", values: [{ value: "Square Boxy" }] },
    ],
  },
  "layered-henley": {
    id: "prod-layered-henley",
    title: "Fieldtrip Layered Ribbed Henley",
    productType: "Thermal & Knits",
    description: "360 GSM double-face merino-cotton rib knit. Raw edge contrast cuffs and brushed horn buttons for temperature-adaptive layering.",
    variants: [{ id: "var-4", price: { amount: "145.00", currencyCode: "GBP" }, title: "M / Heather Grey" }],
    options: [
      { name: "Color", values: [{ value: "Heather Grey" }, { value: "Deep Ink" }, { value: "Oatmeal" }] },
      { name: "Size", values: [{ value: "S" }, { value: "M" }, { value: "L" }, { value: "XL" }] },
      { name: "Fit", values: [{ value: "Tailored Slim" }, { value: "Relaxed" }] },
    ],
  },
  "boatneck-top": {
    id: "prod-boatneck-top",
    title: "Vivre Shoreline Boatneck Top",
    productType: "Tops & Tunics",
    description: "260 GSM organic long-staple pima cotton interlock with structured neckline and minimal blind side slits.",
    variants: [{ id: "var-5", price: { amount: "110.00", currencyCode: "GBP" }, title: "M / Slate Grey" }],
    options: [
      { name: "Color", values: [{ value: "Slate Grey" }, { value: "Ecru" }, { value: "Navy" }] },
      { name: "Size", values: [{ value: "XS" }, { value: "S" }, { value: "M" }, { value: "L" }] },
      { name: "Fit", values: [{ value: "Straight Line" }] },
    ],
  },
  "tactical-crewneck": {
    id: "prod-tactical-crewneck",
    title: "Fieldtrip Tactical Slub Crewneck",
    productType: "Sweaters & Knits",
    description: "400 GSM dry slub cotton knit with reinforced elbow paneling and split drop hem.",
    variants: [{ id: "var-6", price: { amount: "165.00", currencyCode: "GBP" }, title: "M / Washed Olive" }],
    options: [
      { name: "Color", values: [{ value: "Washed Olive" }, { value: "Black" }, { value: "Sand" }] },
      { name: "Size", values: [{ value: "S" }, { value: "M" }, { value: "L" }, { value: "XL" }] },
      { name: "Fit", values: [{ value: "Drop Shoulder" }] },
    ],
  },
  "wide-leg-cargo": {
    id: "prod-wide-leg-cargo",
    title: "Vivre Pleated Wide-Leg Denim Trouser",
    productType: "Trousers & Denim",
    description: "14.5oz Japanese Kuroki selvedge denim in a relaxed double-pleated cut with brass button fly.",
    variants: [{ id: "var-7", price: { amount: "210.00", currencyCode: "GBP" }, title: "32 / Raw Indigo" }],
    options: [
      { name: "Color", values: [{ value: "Raw Indigo" }, { value: "Washed Charcoal" }, { value: "Bleach Fade" }] },
      { name: "Size", values: [{ value: "28" }, { value: "30" }, { value: "32" }, { value: "34" }, { value: "36" }] },
      { name: "Fit", values: [{ value: "Wide Leg" }, { value: "Tapered" }] },
    ],
  },
};

function generateFallbackProduct(handle: string) {
  // Check exact key match or partial match
  const lower = handle.toLowerCase();
  for (const [key, prod] of Object.entries(CATALOG_FALLBACKS)) {
    if (lower.includes(key) || key.includes(lower)) {
      return prod;
    }
  }

  // Format title from handle
  const title = handle
    .split(/[-_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  let type = "Outerwear & Jackets";
  let amount = "240.00";
  if (lower.includes("hoodie") || lower.includes("zip")) {
    type = "Hoodies & Fleece";
    amount = "195.00";
  } else if (lower.includes("tee") || lower.includes("shirt")) {
    type = "Tees & Tops";
    amount = "85.00";
  } else if (lower.includes("pant") || lower.includes("denim") || lower.includes("trouser")) {
    type = "Trousers & Denim";
    amount = "210.00";
  }

  return {
    id: `prod-${handle}`,
    title: title ? `Vivre ${title}` : "Vivre Sand Suede Shift Jacket",
    productType: type,
    description: `Architectural silhouette tailored in London from premium heavyweight textiles with articulated seam construction and custom matte hardware.`,
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
