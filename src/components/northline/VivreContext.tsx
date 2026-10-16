import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { shopifyClient } from "@/lib/shopify";

interface Product {
  id: string;
  name: string;
  group: string;
  price: string;
  image: string;
  alt: string;
  description: string;
  colors: string[];
  sizes: string[];
  fits?: string[];
  images?: string[];
  rawPrice?: number;
  shopifyVariantId?: string;
  variantTitle?: string;
  quantity?: number;
  handle?: string;
}

interface AddToBagOptions {
  openDrawer?: boolean;
}

interface VivreContextType {
  bag: Product[];
  bagCount: number;
  subtotal: number;
  subtotalFormatted: string;
  bagOpen: boolean;
  setBagOpen: (open: boolean) => void;
  addToBag: (product: Product, options?: AddToBagOptions) => void;
  removeFromBag: (index: number) => void;
  updateQuantity: (index: number, delta: number) => void;
  checkout: () => Promise<void>;
  isCheckingOut: boolean;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
}

function parseItemUnitPrice(item: Product): number {
  if (typeof item.rawPrice === "number" && !Number.isNaN(item.rawPrice) && item.rawPrice > 0) {
    return item.rawPrice;
  }
  const match = String(item.price || "").match(/([0-9]+(?:\.[0-9]+)?)/);
  return match ? parseFloat(match[1]) : 0;
}

const VivreContext = createContext<VivreContextType | undefined>(undefined);

export function VivreProvider({ children }: { children: ReactNode }) {
  const [bag, setBag] = useState<Product[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("vivre-bag");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            return parsed.map((item) => ({
              ...item,
              quantity: typeof item.quantity === "number" && item.quantity > 0 ? item.quantity : 1,
            }));
          }
        } catch (e) {
          console.error("Failed to parse bag from localStorage", e);
        }
      }
    }
    return [];
  });
  const [bagOpen, setBagOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("vivre-bag", JSON.stringify(bag));
    }
  }, [bag]);

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Reset checkout loading state when user navigates Back from Shopify (bfcache / pageshow / popstate / focus)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const resetCheckoutLoading = () => {
      setIsCheckingOut(false);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setIsCheckingOut(false);
      }
    };

    window.addEventListener("pageshow", resetCheckoutLoading);
    window.addEventListener("popstate", resetCheckoutLoading);
    window.addEventListener("focus", resetCheckoutLoading);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("pageshow", resetCheckoutLoading);
      window.removeEventListener("popstate", resetCheckoutLoading);
      window.removeEventListener("focus", resetCheckoutLoading);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const addToBag = (product: Product, options?: AddToBagOptions) => {
    const incomingQty = product.quantity && product.quantity > 0 ? product.quantity : 1;
    setBag((prev) => {
      const matchIndex = prev.findIndex(
        (existing) =>
          existing.id === product.id &&
          (existing.variantTitle || "") === (product.variantTitle || "") &&
          (existing.shopifyVariantId || "") === (product.shopifyVariantId || "")
      );
      if (matchIndex > -1) {
        return prev.map((existing, idx) =>
          idx === matchIndex
            ? { ...existing, quantity: (existing.quantity || 1) + incomingQty }
            : existing
        );
      }
      return [...prev, { ...product, quantity: incomingQty }];
    });
    if (options?.openDrawer) {
      setBagOpen(true);
    }
  };

  const removeFromBag = (index: number) => {
    setBag((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, delta: number) => {
    setBag((prev) =>
      prev.flatMap((item, i) => {
        if (i !== index) return [item];
        const nextQty = (item.quantity || 1) + delta;
        if (nextQty <= 0) return [];
        return [{ ...item, quantity: nextQty }];
      })
    );
  };

  const bagCount = bag.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const subtotal = bag.reduce(
    (sum, item) => sum + parseItemUnitPrice(item) * (item.quantity || 1),
    0
  );

  const subtotalFormatted = `GBP £${subtotal.toFixed(2)}`;

  const checkout = async () => {
    if (bag.length === 0) return;
    setIsCheckingOut(true);

    // Fallback timer so button never stays permanently disabled if redirect is blocked or cancelled
    const safetyTimer = window.setTimeout(() => {
      setIsCheckingOut(false);
    }, 8000);

    try {
      const checkoutSession = await shopifyClient.checkout.create();

      let resolvedBag = bag;
      const needsVariantLookup = bag.some((item) => !item.shopifyVariantId);
      if (needsVariantLookup) {
        try {
          const allProducts = (await shopifyClient.product.fetchAll()) as any[];
          resolvedBag = bag.map((item) => {
            if (item.shopifyVariantId) return item;
            const matchedProduct =
              allProducts.find(
                (p) =>
                  p.id === item.id ||
                  p.handle === item.handle ||
                  p.title?.toLowerCase() === item.name?.toLowerCase()
              ) || allProducts[0];
            return {
              ...item,
              shopifyVariantId: matchedProduct?.variants?.[0]?.id?.toString(),
            };
          });
        } catch (lookupErr) {
          console.warn("Could not resolve fallback Shopify variants:", lookupErr);
        }
      }

      const lineItemsToAdd = resolvedBag
        .filter((item) => !!item.shopifyVariantId)
        .map((item) => ({
          variantId: item.shopifyVariantId!,
          quantity: item.quantity || 1,
        }));

      if (lineItemsToAdd.length > 0) {
        await shopifyClient.checkout.addLineItems(checkoutSession.id, lineItemsToAdd);
        window.location.href = checkoutSession.webUrl;
      } else {
        window.clearTimeout(safetyTimer);
        setIsCheckingOut(false);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      window.clearTimeout(safetyTimer);
      setIsCheckingOut(false);
    }
  };

  useEffect(() => {
    if (bagOpen || searchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [bagOpen, searchOpen]);

  return (
    <VivreContext.Provider
      value={{
        bag,
        bagCount,
        subtotal,
        subtotalFormatted,
        bagOpen,
        setBagOpen,
        addToBag,
        removeFromBag,
        updateQuantity,
        checkout,
        isCheckingOut,
        searchOpen,
        setSearchOpen,
      }}
    >
      {children}
    </VivreContext.Provider>
  );
}

export function useVivre() {
  const context = useContext(VivreContext);
  if (context === undefined) {
    throw new Error("useVivre must be used within a VivreProvider");
  }
  return context;
}
