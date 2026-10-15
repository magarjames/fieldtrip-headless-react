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
  // 1. Look 04 (f3) — Real Shopify Products
  "static-graphic-crew-sweatshirt": {
    id: "gid://shopify/Product/15963123679562",
    handle: "static-graphic-crew-sweatshirt",
    title: "Graphic Crew Sweatshirt",
    productType: "Sweatshirts",
    lookId: "f3",
    description: "A crew neck sweatshirt with a bold graphic print. Apricot - a colour that works against black and washed denim. The explosion-style print is large and unsubtle. That is the point. Worn loose, slightly oversized. American street aesthetic with a Y2K edge.\n\nDetails\nLoose crew neck fit • Cotton-blend fleece, apricot • Bold graphic front print • Men’s sizing, M - XL\n\nHow it fits\nCut loose. Take your usual size or size down for a standard fit.",
    variants: [{ id: "var-crew-1", price: { amount: "44.99", currencyCode: "GBP" }, title: "M / Apricot" }],
    options: [
      { name: "Color", values: [{ value: "apricot" }] },
      { name: "size", values: [{ value: "M" }, { value: "L" }, { value: "XL" }] },
    ],
  },
  "longform-wide-leg-jeans-deep-blue": {
    id: "gid://shopify/Product/15960128651594",
    handle: "longform-wide-leg-jeans-deep-blue",
    title: "Longform Wide Leg Jeans – Deep Blue",
    productType: "Jeans",
    lookId: "f3",
    description: "Loose wide leg jeans in deep blue, cut straight and left to fall. The weight of the denim does the work it drapes from the hip rather than holding a shape, which is what makes the leg read long instead of merely wide. Deep blue and black tea, in standard and lighter-weight versions. Floor length as intended. Do not hem it short.\n\nDetails\nLoose wide leg, straight cut, floor length • Drapey cotton denim, deep blue or black tea • Petite, regular and extended lengths • Women's sizing, XS–XL\n\nHow it fits\nRelaxed throughout. Choose your length by height under 158cm, 158–165cm, or 165cm and over.",
    variants: [{ id: "var-longform-1", price: { amount: "49.99", currencyCode: "GBP" }, title: "Dark Blue (Regular) / M" }],
    options: [
      { name: "Fit", values: [{ value: "Dark Blue (Petite)" }, { value: "Dark Blue (Regular)" }, { value: "Dark Blue (Extended)" }] },
      { name: "size", values: [{ value: "XS" }, { value: "S" }, { value: "M" }, { value: "L" }, { value: "XL" }] },
    ],
  },

  // 2. Look 02 (f1) — Real Shopify Products
  "graphic-lip-boxy-tee-white": {
    id: "gid://shopify/Product/15960128618826",
    handle: "graphic-lip-boxy-tee-white",
    title: "Graphic Lip Boxy Tee – White",
    productType: "T-Shirts",
    lookId: "f1",
    description: "A boxy cotton t-shirt in white with a bold graphic print. Wide through the chest, straight at the hem. Dual stacked blue glitter and discharge mouth graphic with metallic grillz detail.\n\nDetails\nBoxy cut, straight hem, ribbed neck • Cotton jersey, white • Bold graphic front print • Unisex sizing, S–XXXL\n\nHow it fits\nCut loose and wide as drafted. True to size with dropped shoulder.",
    variants: [{ id: "var-lip-1", price: { amount: "22.99", currencyCode: "GBP" }, title: "M / White" }],
    options: [
      { name: "Color", values: [{ value: "White" }] },
      { name: "size", values: [{ value: "S" }, { value: "M" }, { value: "L" }, { value: "XL" }, { value: "XXL" }, { value: "XXXL" }] },
    ],
  },
  "sidestep-cargo-wide-leg-jeans": {
    id: "gid://shopify/Product/15960128717130",
    handle: "sidestep-cargo-wide-leg-jeans",
    title: "Sidestep Cargo Wide Leg – Grey Green",
    productType: "Trousers",
    lookId: "f1",
    description: "High waisted cargo jeans in grey green, cut wide and left to drape. A retro straight leg with cargo pocketing, sitting high on the waist so the length reads long. The grey green is muted enough to work as a neutral against black, denim and bone.\n\nDetails\nHigh waisted wide leg, loose drape • Cargo side pockets • Petite (145–155cm) and standard (156–165cm) lengths • Women's sizing, XS–XL\n\nHow it fits\nHigh waisted and relaxed. Choose petite or standard by your height.",
    variants: [{ id: "var-sidestep-1", price: { amount: "37.99", currencyCode: "GBP" }, title: "M / Gray-green" }],
    options: [
      { name: "Fit", values: [{ value: "Gray-green (petite 145-155CM)" }] },
      { name: "size", values: [{ value: "XS" }, { value: "S" }, { value: "M" }, { value: "L" }, { value: "XL" }] },
    ],
  },

  // 3. Look 03 (f2) — Real Shopify Products
  "shoreline-boat-neck-knit-top": {
    id: "gid://shopify/Product/15963129053514",
    handle: "shoreline-boat-neck-knit-top",
    title: "Shoreline Boat Neck Top – Women’s White",
    productType: "T-Shirts",
    lookId: "f2",
    description: "A slim-fit boat neck top in White. Mid-sleeve. The boat neck sits wide on the shoulder — a cleaner line than a crew or V. Tencel-blend knit keeps it light and breathable against the skin. Works as a base layer under an open jacket or worn alone.\n\nDetails\nSlim fit, wide boat neckline • Tencel-blend knit, breathable mid-sleeve • Women’s sizing, 0–3\n\nHow it fits\nSlim fit across shoulders and bust. Follow height/weight chart in Size Guide.",
    variants: [{ id: "var-shoreline-1", price: { amount: "44.99", currencyCode: "GBP" }, title: "1 / White" }],
    options: [
      { name: "colour", values: [{ value: "White" }] },
      { name: "size", values: [{ value: "0" }, { value: "1" }, { value: "2" }, { value: "3" }] },
    ],
  },

  // 4. Look 05 (m1) — Real Shopify Products
  "black-boxy-tee": {
    id: "gid://shopify/Product/15963128987978",
    handle: "black-boxy-tee",
    title: "Black Boxy Tee",
    productType: "T-Shirts",
    lookId: "m1",
    description: "A boxy tee in black. Short body, wide cut, heavy cotton. Cut square rather than tapered the shoulder sits wide and the body hangs clean. No print, no branding. The black version of the blank everything else gets built on top of.\n\nDetails\nBoxy short-crop fit, small neckline • Heavy cotton, vintage washed black • Short-sleeve • Men’s sizing, XS - 2XL\n\nHow it fits\nShort and wide as cut. True to size the crop is intentional.",
    variants: [{ id: "var-black-tee-1", price: { amount: "24.99", currencyCode: "GBP" }, title: "L / Black" }],
    options: [
      { name: "Color", values: [{ value: "Black" }] },
      { name: "size", values: [{ value: "XS" }, { value: "S" }, { value: "M" }, { value: "L" }, { value: "XL" }, { value: "2XL" }] },
    ],
  },
  "razorcut-ripped-wide-leg-jeans": {
    id: "gid://shopify/Product/15963063517514",
    handle: "razorcut-ripped-wide-leg-jeans",
    title: "Razorcut Ripped Wide Leg Jeans – Dark Blue",
    productType: "Jeans",
    lookId: "m1",
    description: "Ripped wide leg jeans in washed dark blue. The distressing is set in not added after. A loose straight leg with a curved hem and ripped detailing at the thigh and knee. Washed so the fabric moves from day one.\n\nDetails\nWide straight leg, curved hem, loose fit • Washed cotton denim, ripped detailing • Dark blue • Men’s sizing, S - 3XL\n\nHow it fits\nLoose as cut. Take your usual waist size.",
    variants: [{ id: "var-razorcut-1", price: { amount: "44.99", currencyCode: "GBP" }, title: "32 / Dark Blue" }],
    options: [
      { name: "Color", values: [{ value: "Dark blue" }] },
      { name: "size", values: [{ value: "S" }, { value: "M" }, { value: "L" }, { value: "XL" }, { value: "2XL" }, { value: "3XL" }] },
    ],
  },

  // 5. Look 06 (m2) — Real Shopify Products
  "layered-henley-knit-sweater-black": {
    id: "gid://shopify/Product/15960279417162",
    handle: "layered-henley-knit-sweater-black",
    title: "Layered Henley Knit Sweater – Black",
    productType: "Knitwear",
    lookId: "m2",
    description: "A knit sweater that reads as two layers. It is one piece. Henley collar, patchwork construction, colour-blocked. Warm without being heavy. Black or dark grey.\n\nDetails\nLoose fit, henley collar • Knit cotton blend, black and dark grey • Layered patchwork construction • Men's sizing, M–3XL\n\nHow it fits\nLoose as cut. Take your usual size.",
    variants: [{ id: "var-henley-1", price: { amount: "39.99", currencyCode: "GBP" }, title: "M / Light Grey" }],
    options: [
      { name: "Color", values: [{ value: "light grey" }] },
      { name: "size", values: [{ value: "M" }, { value: "L" }, { value: "XL" }, { value: "2XL" }, { value: "3XL" }] },
    ],
  },
  "overset-wide-leg-jeans-navy": {
    id: "gid://shopify/Product/15953547854154",
    handle: "overset-wide-leg-jeans-navy",
    title: "Overset Wide Leg Jeans – Navy",
    productType: "Jeans",
    lookId: "m2",
    description: "Wide leg jeans in navy, cut for a larger build. Straight and clean from hip to hem. The navy tone pairs easily with knitwear and tees.\n\nDetails\nWide straight leg, full length • Denim-cotton blend, navy • Machine washable • Sizing by build\n\nHow it fits\nStraight cut through leg with generous break over shoes.",
    variants: [{ id: "var-overset-1", price: { amount: "40.00", currencyCode: "GBP" }, title: "L / Navy" }],
    options: [
      { name: "Color", values: [{ value: "Navy" }] },
      { name: "size", values: [{ value: "M" }, { value: "L" }, { value: "XL" }] },
    ],
  },

  // 6. Look 07 (m3) — Real Shopify Products
  "driftwood-retro-leather-jacket": {
    id: "gid://shopify/Product/15960279515466",
    handle: "driftwood-retro-leather-jacket",
    title: "Driftwood Retro Leather Jacket – Men’s",
    productType: "Jackets",
    lookId: "m3",
    description: "A loose retro PU leather jacket. Wide shoulder, boxy body. Brown with cashmere lining for winter. Khaki lighter. Sits over a hoodie or heavy knit without pulling. Looks better slightly too big.\n\nDetails\nLoose relaxed fit, lapel collar • PU leather, brown (cashmere-lined) and khaki • Zip and button front • Men’s sizing, S–3XL\n\nHow it fits\nCut generously. Size down for a closer fit.",
    variants: [{ id: "var-driftwood-1", price: { amount: "89.99", currencyCode: "GBP" }, title: "L / Khaki" }],
    options: [
      { name: "Color", values: [{ value: "Khaki" }] },
      { name: "size", values: [{ value: "S" }, { value: "M" }, { value: "L" }, { value: "XL" }, { value: "2XL" }, { value: "3XL" }] },
    ],
  },
  "ironwork-raw-denim-jeans-black": {
    id: "gid://shopify/Product/15961479217482",
    handle: "ironwork-raw-denim-jeans-black",
    title: "Ironwork 15oz Raw Denim Jeans – Black",
    productType: "Jeans",
    lookId: "m3",
    description: "15oz raw cow denim. Wide-leg, straight, built to age. No pre-wash. The indigo breaks down where your body moves - behind the knee, pocket corners, along the thigh. The result is jeans that become yours. Heavier than standard denim. The weight holds the leg shape.\n\nDetails\n15oz raw cow denim, original black • Straight wide-leg, baggy fit, mid rise • Unisex sizing, S - 2XL\n\nHow it fits\nStiff at first - correct. Take your usual size. Will not stretch.",
    variants: [{ id: "var-ironwork-1", price: { amount: "69.99", currencyCode: "GBP" }, title: "L / Cow Black" }],
    options: [
      { name: "Color", values: [{ value: "Cow Black" }] },
      { name: "size", values: [{ value: "S" }, { value: "M" }, { value: "L" }, { value: "XL" }, { value: "2XL" }] },
    ],
  },

  // 7. Look 01 (f4) — Transitional pairing
  "key-to-my-heart-zip-hoodie": { $ref: "static-graphic-crew-sweatshirt" },
  "washed-charcoal-carpenter-jeans": { $ref: "longform-wide-leg-jeans-deep-blue" },

  // Aliases mapping old / generated handles directly to live Shopify products
  "infatuated-graphic-crew": { $ref: "static-graphic-crew-sweatshirt" },
  "infatuated-crew": { $ref: "static-graphic-crew-sweatshirt" },
  "graphic-crew-sweatshirt": { $ref: "static-graphic-crew-sweatshirt" },
  "tactical-crewneck": { $ref: "static-graphic-crew-sweatshirt" },
  "double-blue-mouth-tee": { $ref: "graphic-lip-boxy-tee-white" },
  "graphic-lip-boxy-tee": { $ref: "graphic-lip-boxy-tee-white" },
  "graphic-lip": { $ref: "graphic-lip-boxy-tee-white" },
  "lip-boxy-tee": { $ref: "graphic-lip-boxy-tee-white" },
  "lip-tee": { $ref: "graphic-lip-boxy-tee-white" },
  "mouth-tee": { $ref: "graphic-lip-boxy-tee-white" },
  "olive-drab-cargo-trousers": { $ref: "sidestep-cargo-wide-leg-jeans" },
  "olive-cargo-trousers": { $ref: "sidestep-cargo-wide-leg-jeans" },
  "wide-leg-cargo": { $ref: "sidestep-cargo-wide-leg-jeans" },
  "optic-white-boatneck-top": { $ref: "shoreline-boat-neck-knit-top" },
  "shoreline-boat-neck-top": { $ref: "shoreline-boat-neck-knit-top" },
  "boatneck-top": { $ref: "shoreline-boat-neck-knit-top" },
  "deep-indigo-raw-wide-jeans": { $ref: "longform-wide-leg-jeans-deep-blue" },
  "longform-wide-leg-jeans": { $ref: "longform-wide-leg-jeans-deep-blue" },
  "solid-black-boxy-tee": { $ref: "black-boxy-tee" },
  "after-hours-tee": { $ref: "black-boxy-tee" },
  "razorcut-distressed-wide-jeans": { $ref: "razorcut-ripped-wide-leg-jeans" },
  "heather-grey-knit-henley": { $ref: "layered-henley-knit-sweater-black" },
  "layered-henley": { $ref: "layered-henley-knit-sweater-black" },
  "grey-ribbed-henley": { $ref: "layered-henley-knit-sweater-black" },
  "classic-blue-baggy-jeans": { $ref: "overset-wide-leg-jeans-navy" },
  "overset-wide-leg-jeans": { $ref: "overset-wide-leg-jeans-navy" },
  "sand-suede-blouson-jacket": { $ref: "driftwood-retro-leather-jacket" },
  "sand-suede-jacket": { $ref: "driftwood-retro-leather-jacket" },
  "suede-jacket": { $ref: "driftwood-retro-leather-jacket" },
  "ironwork-15oz-raw-denim-jeans": { $ref: "ironwork-raw-denim-jeans-black" },
  "skyline-zip-hoodie": { $ref: "static-graphic-crew-sweatshirt" },
  "washed-charcoal-denim": { $ref: "longform-wide-leg-jeans-deep-blue" },
};

export const SHOPIFY_HANDLE_ALIASES: Record<string, string> = {
  "infatuated-graphic-crew": "static-graphic-crew-sweatshirt",
  "infatuated-crew": "static-graphic-crew-sweatshirt",
  "graphic-crew-sweatshirt": "static-graphic-crew-sweatshirt",
  "tactical-crewneck": "static-graphic-crew-sweatshirt",
  "double-blue-mouth-tee": "graphic-lip-boxy-tee-white",
  "mouth-tee": "graphic-lip-boxy-tee-white",
  "graphic-lip": "graphic-lip-boxy-tee-white",
  "graphic-lip-boxy-tee": "graphic-lip-boxy-tee-white",
  "lip-boxy-tee": "graphic-lip-boxy-tee-white",
  "lip-tee": "graphic-lip-boxy-tee-white",
  "olive-drab-cargo-trousers": "sidestep-cargo-wide-leg-jeans",
  "olive-cargo-trousers": "sidestep-cargo-wide-leg-jeans",
  "wide-leg-cargo": "sidestep-cargo-wide-leg-jeans",
  "optic-white-boatneck-top": "shoreline-boat-neck-knit-top",
  "shoreline-boat-neck-top": "shoreline-boat-neck-knit-top",
  "boatneck-top": "shoreline-boat-neck-knit-top",
  "deep-indigo-raw-wide-jeans": "longform-wide-leg-jeans-deep-blue",
  "longform-wide-leg-jeans": "longform-wide-leg-jeans-deep-blue",
  "solid-black-boxy-tee": "black-boxy-tee",
  "after-hours-tee": "black-boxy-tee",
  "razorcut-distressed-wide-jeans": "razorcut-ripped-wide-leg-jeans",
  "heather-grey-knit-henley": "layered-henley-knit-sweater-black",
  "layered-henley": "layered-henley-knit-sweater-black",
  "grey-ribbed-henley": "layered-henley-knit-sweater-black",
  "classic-blue-baggy-jeans": "overset-wide-leg-jeans-navy",
  "overset-wide-leg-jeans": "overset-wide-leg-jeans-navy",
  "sand-suede-blouson-jacket": "driftwood-retro-leather-jacket",
  "sand-suede-jacket": "driftwood-retro-leather-jacket",
  "suede-jacket": "driftwood-retro-leather-jacket",
  "ironwork-15oz-raw-denim-jeans": "ironwork-raw-denim-jeans-black",
  "key-to-my-heart-zip-hoodie": "static-graphic-crew-sweatshirt",
  "skyline-zip-hoodie": "static-graphic-crew-sweatshirt",
  "washed-charcoal-carpenter-jeans": "longform-wide-leg-jeans-deep-blue",
  "washed-charcoal-denim": "longform-wide-leg-jeans-deep-blue",
};

function generateFallbackProduct(handle: string) {
  const lower = handle.toLowerCase();
  const resolved = SHOPIFY_HANDLE_ALIASES[lower] || lower;
  
  // Check exact key match with resolved alias
  if (CATALOG_FALLBACKS[resolved]) {
    const item = CATALOG_FALLBACKS[resolved];
    return item.$ref ? CATALOG_FALLBACKS[item.$ref] : item;
  }

  // Check exact key match with raw lower
  if (CATALOG_FALLBACKS[lower]) {
    const item = CATALOG_FALLBACKS[lower];
    return item.$ref ? CATALOG_FALLBACKS[item.$ref] : item;
  }

  // Check partial key match
  for (const [key, prod] of Object.entries(CATALOG_FALLBACKS)) {
    if (resolved.includes(key) || key.includes(resolved) || lower.includes(key) || key.includes(lower)) {
      return prod.$ref ? CATALOG_FALLBACKS[prod.$ref] : prod;
    }
  }

  // Determine Look ID and characteristics intelligently with real pricing
  let lookId = "f4";
  let type = "Outerwear & Jackets";
  let amount = "44.99";

  if (lower.includes("longform") || lower.includes("infatuated") || lower.includes("graphic-crew") || (lower.includes("deep-blue") && lower.includes("jean"))) {
    lookId = "f3";
    type = lower.includes("denim") || lower.includes("jean") ? "Jeans" : "Sweatshirts";
    amount = "44.99";
  } else if (lower.includes("lip") || lower.includes("mouth") || lower.includes("cargo") || lower.includes("f1") || lower.includes("olive")) {
    lookId = "f1";
    type = lower.includes("cargo") || lower.includes("trouser") ? "Trousers" : "T-Shirts";
    amount = "22.99";
  } else if (lower.includes("suede") || lower.includes("m3") || lower.includes("ironwork") || lower.includes("blouson") || lower.includes("leather")) {
    lookId = "m3";
    type = lower.includes("denim") || lower.includes("jeans") ? "Jeans" : "Jackets";
    amount = "69.99";
  } else if (lower.includes("henley") || lower.includes("m2") || lower.includes("overset") || lower.includes("baggy")) {
    lookId = "m2";
    type = lower.includes("denim") || lower.includes("jeans") ? "Jeans" : "Knitwear";
    amount = "39.99";
  } else if (lower.includes("boxy") || lower.includes("m1") || lower.includes("razorcut") || lower.includes("distressed")) {
    lookId = "m1";
    type = lower.includes("denim") || lower.includes("jeans") ? "Jeans" : "T-Shirts";
    amount = "24.99";
  } else if (lower.includes("graphic") || lower.includes("f3") || lower.includes("archive") || lower.includes("crew")) {
    lookId = "f3";
    type = "Sweatshirts";
    amount = "44.99";
  } else if (lower.includes("shoreline") || lower.includes("boat") || lower.includes("f2") || lower.includes("optic-white")) {
    lookId = "f2";
    type = lower.includes("denim") || lower.includes("jeans") ? "Jeans" : "T-Shirts";
    amount = "44.99";
  } else if (lower.includes("hoodie") || lower.includes("zip") || lower.includes("f4") || lower.includes("carpenter") || lower.includes("heart")) {
    lookId = "f4";
    type = lower.includes("carpenter") || lower.includes("denim") || lower.includes("jeans") ? "Jeans" : "Sweatshirts";
    amount = "44.99";
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
      { name: "Color", values: [{ value: "Standard Edition" }] },
      { name: "Size", values: [{ value: "S" }, { value: "M" }, { value: "L" }, { value: "XL" }] },
    ],
  };
}

function ProductDetailsRoute() {
  const { productId } = Route.useParams();
  const resolvedHandle = SHOPIFY_HANDLE_ALIASES[productId?.toLowerCase() || ""] || productId;
  const [product, setProduct] = useState<any>(() => generateFallbackProduct(resolvedHandle));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // Direct fetch from live Shopify store using the resolved handle
    shopifyClient.product
      .fetchByHandle(resolvedHandle)
      .then((fetchedProduct) => {
        if (!isMounted) return;
        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          setProduct(generateFallbackProduct(resolvedHandle));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Shopify fetch failed, falling back to local verified catalog:", err);
        if (isMounted) {
          setProduct(generateFallbackProduct(resolvedHandle));
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [resolvedHandle]);

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
      <LenticularProductPage product={product} productId={resolvedHandle} />
    </VivreLayout>
  );
}
