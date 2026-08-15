import { createFileRoute } from '@tanstack/react-router';
import { VivreLayout } from '@/components/northline/VivreLayout';

export const Route = createFileRoute('/about')({
  component: AboutPage,
});

function AboutPage() {
  return (
    <VivreLayout>
      <div className="shell py-24 md:py-32">
        <div className="max-w-2xl mx-auto flex flex-col gap-8">
          
          <p className="font-mono text-[10px] md:text-xs tracking-[0.35em] uppercase text-black/50 font-bold mb-[-1rem]">About VIVRE-CLUB</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-[-0.01em] leading-[1.1] mb-6">Clothes built to be worn. Not collected.</h1>

          <div className="prose prose-lg max-w-none font-sans text-black/70">
            <p className="text-xl md:text-[22px] leading-[1.6] text-brand-black mb-6">
              VIVRE-CLUB is a UK streetwear brand operating on a capsule drop model. No permanent collection. No restocks. Each drop runs for a fixed window — when it closes, it's done.
            </p>

            <p className="mb-4 text-[17px]">
              The pieces are sourced for wearability and longevity. Raw denim that fades with wear. Washed fleece that looks better after six months. Leather that develops character. Nothing is here to sit in a wardrobe.
            </p>

            <p className="mb-4 text-[17px]">
              Each capsule is built around a mood, not a season. The clothes are chosen to work together — you can pull any two pieces from a drop and they'll make sense. That's the intention.
            </p>

            <div className="w-full h-px bg-black/10 my-10"></div>

            <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-brand-black mb-4 pb-3 border-b border-black/10 mt-12">How it works</h2>
            <p className="mb-4 text-[17px]">
              Drops are released on a rolling schedule — roughly every three to four months. Each drop has a name, a limited window, and a fixed product selection. Once the window closes, the products are removed regardless of stock remaining.
            </p>
            <p className="mb-4 text-[17px]">
              No discounting. No sale events. If you want it, get it when it's live.
            </p>

            <div className="w-full h-px bg-black/10 my-10"></div>

            <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-brand-black mb-4 pb-3 border-b border-black/10 mt-12">The product</h2>
            <p className="mb-4 text-[17px]">
              Every piece goes through a selection process before it makes a drop. We test fit, fabric weight, construction quality, and how it holds up after washing. If it doesn't meet the standard, it doesn't go in.
            </p>
            <p className="mb-4 text-[17px]">
              Sizing information and fit notes are on every product page. Read them. The returns process exists but it costs everyone time.
            </p>

            <div className="inline-block mt-12 px-4 py-2 border border-black/10 text-[10px] font-bold tracking-[0.25em] uppercase text-black/50">
              DROP 001 — AFTER HOURS — Live Now
            </div>
          </div>
          
        </div>
      </div>
    </VivreLayout>
  );
}
