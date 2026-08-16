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
  images?: string[];
  rawPrice?: number;
  shopifyVariantId?: string;
  variantTitle?: string;
}

interface VivreContextType {
  bag: Product[];
  bagOpen: boolean;
  setBagOpen: (open: boolean) => void;
  addToBag: (product: Product) => void;
  removeFromBag: (index: number) => void;
  checkout: () => Promise<void>;
  isCheckingOut: boolean;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
}

const VivreContext = createContext<VivreContextType | undefined>(undefined);

export function VivreProvider({ children }: { children: ReactNode }) {
  const [bag, setBag] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vivre-bag');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse bag from localStorage', e);
        }
      }
    }
    return [];
  });
  const [bagOpen, setBagOpen] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('vivre-bag', JSON.stringify(bag));
    }
  }, [bag]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const addToBag = (product: Product) => {
    setBag((prev) => [...prev, product]);
    setBagOpen(true);
  };

  const removeFromBag = (index: number) => {
    setBag((prev) => prev.filter((_, i) => i !== index));
  };

  const checkout = async () => {
    if (bag.length === 0) return;
    setIsCheckingOut(true);
    
    try {
      if (!import.meta.env.VITE_SHOPIFY_DOMAIN || !import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN) {
        alert("Shopify credentials missing. Checkout disabled in prototype.");
        setIsCheckingOut(false);
        return;
      }

      const checkoutSession = await shopifyClient.checkout.create();
      
      const lineItemsToAdd = bag
        .filter(item => !!item.shopifyVariantId)
        .map(item => ({
          variantId: item.shopifyVariantId,
          quantity: 1,
        }));

      if (lineItemsToAdd.length > 0) {
        await shopifyClient.checkout.addLineItems(checkoutSession.id, lineItemsToAdd);
        window.location.href = checkoutSession.webUrl;
      } else {
        alert("No valid products in bag to checkout.");
        setIsCheckingOut(false);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setIsCheckingOut(false);
    }
  };

  useEffect(() => {
    if (bagOpen || searchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [bagOpen, searchOpen]);

  return (
    <VivreContext.Provider value={{
      bag,
      bagOpen,
      setBagOpen,
      addToBag,
      removeFromBag,
      checkout,
      isCheckingOut,
      searchOpen,
      setSearchOpen
    }}>
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
