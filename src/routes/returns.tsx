import { createFileRoute } from '@tanstack/react-router';
import { VivreLayout } from '@/components/northline/VivreLayout';

export const Route = createFileRoute('/returns')({
  component: ReturnsPage,
});

function ReturnsPage() {
  return (
    <VivreLayout>
      <div className="shell py-24 md:py-32">
        <div className="max-w-2xl mx-auto flex flex-col gap-16">
          
          {/* SHIPPING SECTION */}
          <div>
            <p className="font-mono text-[10px] md:text-xs tracking-[0.35em] uppercase text-black/50 font-bold mb-4">Shipping Policy</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-[-0.01em] leading-[1.1] mb-6">Where it goes and how long it takes.</h1>

            <div className="prose prose-lg max-w-none font-sans text-black/70">
              <p className="text-xl md:text-[22px] leading-[1.6] text-brand-black mb-10">
                We ship to the UK and internationally. All orders are tracked from dispatch. Delivery windows below are estimates — not guarantees.
              </p>

              <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-brand-black mb-4 pb-3 border-b border-black/10 mt-12">Processing</h2>
              <table className="w-full table-fixed text-[14px] mt-4 mb-2 border-collapse">
                <tbody>
                  <tr className="border-b border-black/10">
                    <td className="py-4 text-[13px] text-black/60 w-5/12 align-top">Processing time</td>
                    <td className="py-4 font-medium text-brand-black align-top">1–3 business days</td>
                  </tr>
                  <tr className="border-b border-black/10">
                    <td className="py-4 text-[13px] text-black/60 w-5/12 align-top">Order confirmation</td>
                    <td className="py-4 font-medium text-brand-black align-top">Emailed immediately</td>
                  </tr>
                  <tr className="border-b border-black/10">
                    <td className="py-4 text-[13px] text-black/60 w-5/12 align-top">Dispatch notification</td>
                    <td className="py-4 font-medium text-brand-black align-top">Emailed with tracking link</td>
                  </tr>
                </tbody>
              </table>

              <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-brand-black mb-4 pb-3 border-b border-black/10 mt-12">Delivery — UK</h2>
              <table className="w-full table-fixed text-[14px] mt-4 mb-2 border-collapse">
                <tbody>
                  <tr className="border-b border-black/10">
                    <td className="py-4 text-[13px] text-black/60 w-5/12 align-top">Standard (tracked)</td>
                    <td className="py-4 font-medium text-brand-black align-top">10–18 business days</td>
                  </tr>
                  <tr className="border-b border-black/10">
                    <td className="py-4 text-[13px] text-black/60 w-5/12 align-top">Express (tracked)</td>
                    <td className="py-4 font-medium text-brand-black align-top">5–10 business days</td>
                  </tr>
                  <tr className="border-b border-black/10">
                    <td className="py-4 text-[13px] text-black/60 w-5/12 align-top">Free standard shipping</td>
                    <td className="py-4 font-medium text-brand-black align-top">Orders over £80</td>
                  </tr>
                </tbody>
              </table>

              <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-brand-black mb-4 pb-3 border-b border-black/10 mt-12">Delivery — International</h2>
              <table className="w-full table-fixed text-[14px] mt-4 mb-2 border-collapse">
                <tbody>
                  <tr className="border-b border-black/10">
                    <td className="py-4 text-[13px] text-black/60 w-5/12 align-top">Standard (tracked)</td>
                    <td className="py-4 font-medium text-brand-black align-top">12–22 business days</td>
                  </tr>
                  <tr className="border-b border-black/10">
                    <td className="py-4 text-[13px] text-black/60 w-5/12 align-top">Express (tracked)</td>
                    <td className="py-4 font-medium text-brand-black align-top">7–14 business days</td>
                  </tr>
                </tbody>
              </table>

              <div className="border-l-2 border-brand-taupe/40 bg-brand-taupe/5 p-4 my-6 text-[13px] text-black/60">
                Delivery times are estimates from dispatch, not from order date. Processing adds 1–3 days on top. During high-demand periods (drop launches, holidays) expect the upper end of the window.
              </div>

              <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-brand-black mb-4 pb-3 border-b border-black/10 mt-12">Customs & Duties</h2>
              <p className="mb-4 text-[17px]">
                International orders may be subject to import duties and taxes on arrival. These charges are the customer's responsibility and are not included in the order total. We have no control over customs processing times.
              </p>

              <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-brand-black mb-4 pb-3 border-b border-black/10 mt-12">Tracking</h2>
              <p className="mb-4 text-[17px]">
                Every order ships with a tracking number. You'll receive this by email when your order dispatches. If tracking hasn't updated in 5 business days after dispatch, contact us.
              </p>

              <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-brand-black mb-4 pb-3 border-b border-black/10 mt-12">Issues</h2>
              <p className="mb-4 text-[17px]">
                If your order hasn't arrived within the delivery window, email <strong>support@vivre.studio</strong> with your order number. We'll investigate and resolve it.
              </p>
            </div>
          </div>

          <div className="w-full h-px bg-black/10 my-8"></div>

          {/* RETURNS SECTION */}
          <div>
            <p className="font-mono text-[10px] md:text-xs tracking-[0.35em] uppercase text-black/50 font-bold mb-4">Returns Policy</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-[-0.01em] leading-[1.1] mb-6">14 days. Unworn. Tags on.</h1>

            <div className="prose prose-lg max-w-none font-sans text-black/70">
              <p className="text-xl md:text-[22px] leading-[1.6] text-brand-black mb-10">
                We accept returns within 14 days of delivery. Items must be in original condition — unworn, unwashed, with all tags attached. No exceptions.
              </p>

              <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-brand-black mb-4 pb-3 border-b border-black/10 mt-12">Eligibility</h2>
              <table className="w-full table-fixed text-[14px] mt-4 mb-2 border-collapse">
                <tbody>
                  <tr className="border-b border-black/10">
                    <td className="py-4 text-[13px] text-black/60 w-5/12 align-top">Return window</td>
                    <td className="py-4 font-medium text-brand-black align-top">14 days from delivery date</td>
                  </tr>
                  <tr className="border-b border-black/10">
                    <td className="py-4 text-[13px] text-black/60 w-5/12 align-top">Condition required</td>
                    <td className="py-4 font-medium text-brand-black align-top">Unworn, unwashed, tags attached</td>
                  </tr>
                  <tr className="border-b border-black/10">
                    <td className="py-4 text-[13px] text-black/60 w-5/12 align-top">Return shipping cost</td>
                    <td className="py-4 font-medium text-brand-black align-top">Paid by customer</td>
                  </tr>
                  <tr className="border-b border-black/10">
                    <td className="py-4 text-[13px] text-black/60 w-[44%] align-top">Refund method</td>
                    <td className="py-4 font-medium text-brand-black align-top">Original payment method</td>
                  </tr>
                  <tr className="border-b border-black/10">
                    <td className="py-4 text-[13px] text-black/60 w-[44%] align-top">Refund processing time</td>
                    <td className="py-4 font-medium text-brand-black align-top">5 business days after receipt</td>
                  </tr>
                </tbody>
              </table>

              <div className="border-l-2 border-brand-taupe/40 bg-brand-taupe/5 p-4 my-6 text-[13px] text-black/60">
                We do not offer exchanges. Stock is limited and cannot be held. If you want a different size or colour, return the original item and place a new order.
              </div>

              <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-brand-black mb-4 pb-3 border-b border-black/10 mt-12">How to Return</h2>
              <p className="mb-4 text-[17px]">
                Email <strong>support@vivre.studio</strong> with your order number and reason for return. We'll confirm eligibility and send return instructions. Do not send items back without confirmation — unannounced returns cannot be processed.
              </p>

              <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-brand-black mb-4 pb-3 border-b border-black/10 mt-12">Non-Returnable Items</h2>
              <p className="mb-4 text-[17px]">
                Items showing signs of wear, washing, or damage will not be accepted and will be returned to you at your cost. Sale items and gift cards are non-returnable.
              </p>

              <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-brand-black mb-4 pb-3 border-b border-black/10 mt-12">Faulty or Incorrect Items</h2>
              <p className="mb-4 text-[17px]">
                If you receive a faulty or incorrect item, email us within 7 days of delivery with photos. We'll cover return shipping and resolve it — replacement or full refund, your choice.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </VivreLayout>
  );
}
