import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState, useRef } from 'react';
import { shopifyClient } from '@/lib/shopify';
import { VivreLayout } from '@/components/northline/VivreLayout';
import { useVivre } from '@/components/northline/VivreContext';
import { createPortal } from 'react-dom';

export const Route = createFileRoute('/products/$productId')({
  component: ProductDetailsPage,
});

function ProductDetailsPage() {
  const { productId } = Route.useParams();
  const { addToBag } = useVivre();
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [selectedColor, setSelectedColor] = useState<string>("Default");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  useEffect(() => {
    if (import.meta.env.VITE_SHOPIFY_DOMAIN && import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN) {
      shopifyClient.product.fetchByHandle(productId).then((fetchedProduct) => {
        setProduct(fetchedProduct);
        
        // Auto-select first options if available
        const colorOption = (fetchedProduct as any).options?.find((o: any) => o.name.toLowerCase() === 'color' || o.name.toLowerCase() === 'colour');
        const sizeOption = (fetchedProduct as any).options?.find((o: any) => o.name.toLowerCase() === 'size');
        
        if (colorOption?.values.length > 0) setSelectedColor(colorOption.values[0].value);
        if (sizeOption?.values.length > 0) setSelectedSize(sizeOption.values[0].value);
        
        setLoading(false);
      }).catch(err => {
        console.error("Shopify fetch error:", err);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [productId]);

  const sideableImagesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = sideableImagesRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [product]);

  const handleAddToBag = () => {
    if (!product) return;
    
    // Find the variant that matches selected options
    let selectedVariant = (product as any).variants[0]; // fallback
    if ((product as any).variants?.length > 1) {
      const match = (product as any).variants.find((v: any) => {
        const matchesColor = v.selectedOptions.some((o: any) => (o.name.toLowerCase() === 'color' || o.name.toLowerCase() === 'colour') && o.value === selectedColor);
        const matchesSize = v.selectedOptions.some((o: any) => o.name.toLowerCase() === 'size' && o.value === selectedSize);
        return matchesColor && matchesSize;
      });
      if (match) selectedVariant = match;
    }

    const mappedProduct = {
      id: product.id.toString(),
      name: product.title,
      group: (product.productType || "New Arrivals"),
      price: `GBP ${selectedVariant?.price?.amount || '0'}`,
      image: selectedVariant?.image?.src || product.images?.[0]?.src || "",
      alt: product.title,
      description: product.descriptionHtml || product.description,
      colors: [],
      sizes: [],
      shopifyVariantId: selectedVariant?.id?.toString(),
      variantTitle: selectedVariant?.title !== 'Default Title' ? selectedVariant?.title : undefined
    };

    addToBag(mappedProduct);
  };

  if (loading) {
    return (
      <VivreLayout>
        <div className="flex justify-center items-center h-[50vh]">
          <p className="text-xl text-black/50 tracking-widest uppercase">Loading Product...</p>
        </div>
      </VivreLayout>
    );
  }

  if (!product) {
    return (
      <VivreLayout>
        <div className="flex flex-col justify-center items-center h-[50vh]">
          <h1 className="text-4xl font-black mb-4 uppercase">Product Not Found</h1>
          <p className="text-black/50">The requested product could not be loaded.</p>
        </div>
      </VivreLayout>
    );
  }

  const colors = (product as any).options?.find((o: any) => o.name.toLowerCase() === 'color' || o.name.toLowerCase() === 'colour')?.values.map((v: any) => v.value) || [];
  const sizes = (product as any).options?.find((o: any) => o.name.toLowerCase() === 'size')?.values.map((v: any) => v.value) || [];
  const images = (product as any).images?.map((img: any) => img.src) || [];

  return (
    <VivreLayout>
      <div className="shell py-12 md:py-24">
        
        {/* Main PDP Grid */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Left Column: Details */}
          <div className="flex flex-col">
             <p className="font-mono text-xs tracking-[0.14em] uppercase text-black/50 mb-4">{product.productType || "New Arrivals"}</p>
             <h1 className="text-5xl md:text-6xl font-display font-black uppercase tracking-tighter mb-6">{product.title}</h1>
             
             <div className="w-full h-px bg-black/10 my-8"></div>
             
             <div className="flex justify-between items-center mb-8">
               <span className="font-mono text-xs tracking-[0.14em] uppercase font-bold text-black/50">Price</span>
               <span className="text-2xl font-medium">GBP {product.variants?.[0]?.price?.amount || '0'}</span>
             </div>

             {colors.length > 0 && colors[0] !== 'Default Title' && (
               <div className="mb-8">
                 <div className="flex justify-between items-center mb-4">
                   <span className="font-mono text-xs tracking-[0.14em] uppercase font-bold text-black/50">Color</span>
                 </div>
                 <div className="flex gap-3">
                   {colors.map((color: string) => (
                     <button
                       key={color}
                       onClick={() => setSelectedColor(color)}
                       className={`px-6 py-3 border rounded-full text-sm uppercase tracking-widest font-bold transition-all ${
                         selectedColor === color 
                         ? 'border-brand-black bg-brand-black text-white' 
                         : 'border-black/15 hover:border-black/30 bg-transparent'
                       }`}
                     >
                       {color}
                     </button>
                   ))}
                 </div>
               </div>
             )}

             {sizes.length > 0 && sizes[0] !== 'Default Title' && (
               <div className="mb-12">
                 <div className="flex justify-between items-center mb-4">
                   <span className="font-mono text-xs tracking-[0.14em] uppercase font-bold text-black/50">Size</span>
                   <button 
                     onClick={() => setSizeGuideOpen(true)}
                     className="text-xs font-bold uppercase tracking-widest underline underline-offset-4 opacity-50 hover:opacity-100 transition-opacity"
                   >
                     Size Guide
                   </button>
                 </div>
                 <div className="flex flex-wrap gap-3">
                   {sizes.map((size: string) => (
                     <button
                       key={size}
                       onClick={() => setSelectedSize(size)}
                       className={`w-14 h-14 border rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                         selectedSize === size 
                         ? 'border-brand-black bg-brand-black text-white' 
                         : 'border-black/15 hover:border-black/30 bg-transparent'
                       }`}
                     >
                       {size}
                     </button>
                   ))}
                 </div>
               </div>
             )}

             <button 
               onClick={handleAddToBag}
               className="w-full py-5 bg-brand-black text-white text-sm font-bold uppercase tracking-widest rounded-full hover:bg-black/80 transition-transform active:scale-[0.98]"
             >
               Add to Bag
             </button>
             
             <div className="mt-16">
               <h3 className="font-mono text-xs tracking-[0.14em] uppercase font-bold text-black/50 mb-6 border-b border-black/10 pb-4">Description</h3>
               <div 
                 className="prose prose-sm max-w-none text-black/70 leading-relaxed"
                 dangerouslySetInnerHTML={{ __html: product.descriptionHtml || product.description }}
               />
             </div>
          </div>
          
          {/* Right Column: Images */}
          <div className="flex flex-col gap-6" ref={sideableImagesRef} style={{ maxHeight: '100vh', overflowY: 'auto', paddingRight: '1rem', scrollbarWidth: 'none' }}>
             {images.map((img: string, i: number) => (
               <img 
                 key={i} 
                 src={img} 
                 alt={`${product.title} view ${i + 1}`} 
                 className="w-full rounded-2xl bg-black/5 aspect-[4/5] object-cover border border-black/5"
               />
             ))}
          </div>

        </div>
      </div>

      {/* Size Guide Modal */}
      {sizeGuideOpen && typeof document !== "undefined" && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
          <div className="bg-brand-paper w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col relative border border-black/10">
            <div className="p-8 border-b border-black/10 flex justify-between items-center bg-white/50 backdrop-blur-xl">
              <h2 className="text-2xl font-display font-black uppercase tracking-tighter">Size Guide</h2>
              <button onClick={() => setSizeGuideOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors">
                ✕
              </button>
            </div>
            <div className="p-8 overflow-y-auto bg-white/40">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-black/10">
                    <th className="py-4 font-bold uppercase tracking-widest text-black/50">Size</th>
                    <th className="py-4 font-bold uppercase tracking-widest text-black/50">Chest (in)</th>
                    <th className="py-4 font-bold uppercase tracking-widest text-black/50">Waist (in)</th>
                    <th className="py-4 font-bold uppercase tracking-widest text-black/50">Length (in)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-black/5">
                    <td className="py-4 font-medium">XS</td>
                    <td className="py-4">34-36</td>
                    <td className="py-4">28-30</td>
                    <td className="py-4">27</td>
                  </tr>
                  <tr className="border-b border-black/5">
                    <td className="py-4 font-medium">S</td>
                    <td className="py-4">36-38</td>
                    <td className="py-4">30-32</td>
                    <td className="py-4">28</td>
                  </tr>
                  <tr className="border-b border-black/5">
                    <td className="py-4 font-medium">M</td>
                    <td className="py-4">38-40</td>
                    <td className="py-4">32-34</td>
                    <td className="py-4">29</td>
                  </tr>
                  <tr className="border-b border-black/5">
                    <td className="py-4 font-medium">L</td>
                    <td className="py-4">40-42</td>
                    <td className="py-4">34-36</td>
                    <td className="py-4">30</td>
                  </tr>
                  <tr>
                    <td className="py-4 font-medium">XL</td>
                    <td className="py-4">42-44</td>
                    <td className="py-4">36-38</td>
                    <td className="py-4">31</td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-8 p-6 bg-brand-blue/10 rounded-2xl border border-brand-blue/20">
                <h4 className="font-bold uppercase tracking-widest text-brand-blue mb-2 text-xs">Fit Notes</h4>
                <p className="text-sm text-brand-blue/80 leading-relaxed">
                  Our garments are designed for a slightly relaxed, contemporary fit. We recommend taking your normal size for the intended aesthetic. If you prefer a closer fit, consider sizing down.
                </p>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </VivreLayout>
  );
}
