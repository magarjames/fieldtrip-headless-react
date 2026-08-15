import { createFileRoute } from '@tanstack/react-router';
import { VivreLayout } from '@/components/northline/VivreLayout';

export const Route = createFileRoute('/faq')({
  component: FAQPage,
});

function FAQPage() {
  return (
    <VivreLayout>
      <div className="shell py-24 md:py-32">
        <div className="max-w-3xl mx-auto flex flex-col gap-12">
          
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter mb-6">FAQ</h1>
            <p className="font-mono text-sm tracking-[0.14em] uppercase text-black/50">Frequently Asked Questions</p>
          </div>

          <div className="w-full h-px bg-black/10"></div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h3 className="font-display font-black text-2xl uppercase tracking-tighter text-brand-black">When will my order ship?</h3>
              <p className="text-black/70 leading-relaxed">
                Orders placed before 2PM GMT Monday through Friday are processed the same day. Orders placed after 2PM or on weekends will be processed the following business day. Once your order has shipped, you will receive an email with tracking information.
              </p>
            </div>

            <div className="w-full h-px bg-black/5"></div>

            <div className="flex flex-col gap-4">
              <h3 className="font-display font-black text-2xl uppercase tracking-tighter text-brand-black">Do you ship internationally?</h3>
              <p className="text-black/70 leading-relaxed">
                Yes, we ship globally. International shipping rates and transit times are calculated at checkout based on your destination. Please note that international orders may be subject to customs duties and taxes, which are the responsibility of the recipient.
              </p>
            </div>

            <div className="w-full h-px bg-black/5"></div>

            <div className="flex flex-col gap-4">
              <h3 className="font-display font-black text-2xl uppercase tracking-tighter text-brand-black">How do your garments fit?</h3>
              <p className="text-black/70 leading-relaxed">
                Our silhouettes are designed with a slightly relaxed, contemporary drape. We highly recommend consulting the Size Guide located on every product page for exact garment measurements before purchasing.
              </p>
            </div>

            <div className="w-full h-px bg-black/5"></div>

            <div className="flex flex-col gap-4">
              <h3 className="font-display font-black text-2xl uppercase tracking-tighter text-brand-black">How do I care for my technical garments?</h3>
              <p className="text-black/70 leading-relaxed">
                Machine wash cold on a gentle cycle with like colors. Do not use fabric softeners or bleach, as this will degrade the DWR (Durable Water Repellent) finish on our outerwear. Hang dry only. Do not iron or dry clean.
              </p>
            </div>
            
            <div className="w-full h-px bg-black/5"></div>

            <div className="flex flex-col gap-4">
              <h3 className="font-display font-black text-2xl uppercase tracking-tighter text-brand-black">Can I modify or cancel my order?</h3>
              <p className="text-black/70 leading-relaxed">
                Because we process orders rapidly, we are unable to modify or cancel an order once it has been placed. Please ensure your shipping address and selected sizes are correct before checking out.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </VivreLayout>
  );
}
