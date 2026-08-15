import { createFileRoute } from '@tanstack/react-router';
import { VivreLayout } from '@/components/northline/VivreLayout';

export const Route = createFileRoute('/privacy')({
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <VivreLayout>
      <div className="shell py-24 md:py-32">
        <div className="max-w-2xl mx-auto flex flex-col gap-8">
          
          <p className="font-mono text-[10px] md:text-xs tracking-[0.35em] uppercase text-black/50 font-bold mb-[-1rem]">Privacy Policy</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-[-0.01em] leading-[1.1] mb-6">What we collect and why.</h1>

          <div className="prose prose-lg max-w-none font-sans text-black/70">
            <p className="text-xl md:text-[22px] leading-[1.6] text-brand-black mb-6">
              VIVRE-CLUB collects only the data needed to process your order and improve the store. We do not sell your data. We do not share it beyond what's required to fulfil your order.
            </p>

            <p className="mb-4 text-[17px]">
              <strong>Last updated:</strong> August 2026
            </p>

            <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-brand-black mb-4 pb-3 border-b border-black/10 mt-12">What We Collect</h2>
            <table className="w-full table-fixed text-[14px] mt-4 mb-2 border-collapse">
              <tbody>
                <tr className="border-b border-black/10">
                  <td className="py-4 text-[13px] text-black/60 w-5/12 align-top">Name & contact details</td>
                  <td className="py-4 font-medium text-brand-black align-top">Required to process and fulfil your order</td>
                </tr>
                <tr className="border-b border-black/10">
                  <td className="py-4 text-[13px] text-black/60 w-5/12 align-top">Delivery address</td>
                  <td className="py-4 font-medium text-brand-black align-top">Required for shipping</td>
                </tr>
                <tr className="border-b border-black/10">
                  <td className="py-4 text-[13px] text-black/60 w-5/12 align-top">Payment information</td>
                  <td className="py-4 font-medium text-brand-black align-top">Processed securely by Shopify Payments — we never see your full card details</td>
                </tr>
                <tr className="border-b border-black/10">
                  <td className="py-4 text-[13px] text-black/60 w-5/12 align-top">Order history</td>
                  <td className="py-4 font-medium text-brand-black align-top">Retained to manage returns and customer support</td>
                </tr>
                <tr className="border-b border-black/10">
                  <td className="py-4 text-[13px] text-black/60 w-5/12 align-top">Browsing behaviour</td>
                  <td className="py-4 font-medium text-brand-black align-top">Via cookies — used to improve the store and measure marketing performance</td>
                </tr>
              </tbody>
            </table>

            <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-brand-black mb-4 pb-3 border-b border-black/10 mt-12">Who We Share It With</h2>
            <p className="mb-4 text-[17px]">
              Your data is shared only with third parties required to operate the store:
            </p>
            <p className="mb-4 text-[17px]">
              <strong>Shopify</strong> — our store platform, which processes payments and stores order data. Shopify is GDPR compliant.
            </p>
            <p className="mb-4 text-[17px]">
              <strong>Shipping partners</strong> — your name and address are shared with our logistics providers to fulfil delivery.
            </p>
            <p className="mb-4 text-[17px]">
              <strong>Marketing platforms</strong> — if you opt into marketing emails, your email address is held in our email platform. You can unsubscribe at any time.
            </p>

            <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-brand-black mb-4 pb-3 border-b border-black/10 mt-12">Your Rights (GDPR)</h2>
            <p className="mb-4 text-[17px]">
              You have the right to access, correct, or delete the personal data we hold about you. You can also request that we restrict processing or object to it. To exercise any of these rights, email <strong>support@vivre.studio</strong>.
            </p>

            <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-brand-black mb-4 pb-3 border-b border-black/10 mt-12">Cookies</h2>
            <p className="mb-4 text-[17px]">
              We use essential cookies to operate the store and optional analytics cookies to understand how people use it. You can manage cookie preferences via the banner on your first visit.
            </p>

            <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-brand-black mb-4 pb-3 border-b border-black/10 mt-12">Data Retention</h2>
            <p className="mb-4 text-[17px]">
              Order data is retained for 7 years in line with UK financial record-keeping requirements. Marketing data is retained until you unsubscribe. You can request deletion of any other data at any time.
            </p>

            <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-brand-black mb-4 pb-3 border-b border-black/10 mt-12">Contact</h2>
            <p className="mb-4 text-[17px]">
              For any privacy-related queries: <strong>support@vivre.studio</strong>
            </p>
          </div>
          
        </div>
      </div>
    </VivreLayout>
  );
}
