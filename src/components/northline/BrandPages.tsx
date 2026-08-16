import React, { useState } from "react";
import { VivreLayout } from "./VivreLayout";

export type BrandTab = "about" | "shipping" | "returns" | "privacy";

export function BrandPages({ initialTab = "about" }: { initialTab?: BrandTab }) {
  const [activeTab, setActiveTab] = useState<BrandTab>(initialTab);

  const tabs: { id: BrandTab; label: string }[] = [
    { id: "about", label: "About" },
    { id: "shipping", label: "Shipping" },
    { id: "returns", label: "Returns" },
    { id: "privacy", label: "Privacy" },
  ];

  return (
    <VivreLayout>
      <div className="shell py-24 md:py-32">
        <div
          className="max-w-3xl mx-auto rounded-[2rem] overflow-hidden"
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.1)",
          }}
        >
          {/* Glass Nav */}
          <nav
            className="flex flex-col sm:flex-row items-center justify-between p-6 md:px-10 md:py-6 border-b border-white/10 gap-6 sm:gap-0 sticky top-0 z-20"
            style={{ background: "rgba(0, 0, 0, 0.2)", backdropFilter: "blur(12px)" }}
          >
            <div className="text-[12px] font-bold tracking-[0.3em] uppercase text-white">
              Vivre—Club
            </div>
            <div className="flex border border-white/10 rounded-full overflow-hidden p-1 bg-white/5">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2 text-[10px] font-bold tracking-[0.2em] uppercase rounded-full transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-white text-black"
                      : "text-white/50 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </nav>

          {/* Content Area */}
          <div className="p-8 md:p-14 lg:p-20 text-white/80 text-[15px] leading-[1.65]">
            {activeTab === "about" && (
              <div className="animate-in fade-in duration-500">
                <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-white/50 mb-5">
                  About VIVRE-CLUB
                </p>
                <h1 className="text-[clamp(28px,5vw,42px)] font-bold tracking-[-0.01em] leading-[1.1] mb-10 text-white">
                  Clothes built to be worn. Not collected.
                </h1>

                <p className="text-[17px] leading-[1.6] text-white mb-5">
                  VIVRE-CLUB is a UK streetwear brand operating on a capsule drop model. No
                  permanent collection. No restocks. Each drop runs for a fixed window — when it
                  closes, it's done.
                </p>

                <p className="mb-4">
                  The pieces are sourced for wearability and longevity. Raw denim that fades with
                  wear. Washed fleece that looks better after six months. Leather that develops
                  character. Nothing is here to sit in a wardrobe.
                </p>

                <p className="mb-4">
                  Each capsule is built around a mood, not a season. The clothes are chosen to work
                  together — you can pull any two pieces from a drop and they'll make sense. That's
                  the intention.
                </p>

                <div className="h-px bg-white/10 my-10"></div>

                <h2 className="text-[11px] font-bold tracking-[0.25em] uppercase mt-[52px] mb-4 pb-3 border-b border-white/10 text-white">
                  How it works
                </h2>
                <p className="mb-4">
                  Drops are released on a rolling schedule — roughly every three to four months.
                  Each drop has a name, a limited window, and a fixed product selection. Once the
                  window closes, the products are removed regardless of stock remaining.
                </p>
                <p className="mb-4">
                  No discounting. No sale events. If you want it, get it when it's live.
                </p>

                <div className="h-px bg-white/10 my-10"></div>

                <h2 className="text-[11px] font-bold tracking-[0.25em] uppercase mt-[52px] mb-4 pb-3 border-b border-white/10 text-white">
                  The product
                </h2>
                <p className="mb-4">
                  Every piece goes through a selection process before it makes a drop. We test fit,
                  fabric weight, construction quality, and how it holds up after washing. If it
                  doesn't meet the standard, it doesn't go in.
                </p>
                <p className="mb-4">
                  Sizing information and fit notes are on every product page. Read them. The returns
                  process exists but it costs everyone time.
                </p>

                <div className="inline-block border border-white/20 px-4 py-2 mt-12 text-[9px] font-bold tracking-[0.25em] uppercase text-white/50 rounded-lg">
                  DROP 001 — AFTER HOURS — Live Now
                </div>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="animate-in fade-in duration-500">
                <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-white/50 mb-5">
                  Shipping Policy
                </p>
                <h1 className="text-[clamp(28px,5vw,42px)] font-bold tracking-[-0.01em] leading-[1.1] mb-10 text-white">
                  Where it goes and how long it takes.
                </h1>

                <p className="text-[17px] leading-[1.6] text-white mb-5">
                  We ship to the UK and internationally. All orders are tracked from dispatch.
                  Delivery windows below are estimates — not guarantees.
                </p>

                <h2 className="text-[11px] font-bold tracking-[0.25em] uppercase mt-[52px] mb-4 pb-3 border-b border-white/10 text-white">
                  Processing
                </h2>
                <table className="w-full border-collapse my-5 text-[14px]">
                  <tbody>
                    <tr className="border-b border-white/10">
                      <td className="py-3.5 text-white/60 w-[44%] text-[13px] align-top">
                        Processing time
                      </td>
                      <td className="py-3.5 text-white font-medium align-top">1–3 business days</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3.5 text-white/60 w-[44%] text-[13px] align-top">
                        Order confirmation
                      </td>
                      <td className="py-3.5 text-white font-medium align-top">
                        Emailed immediately
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3.5 text-white/60 w-[44%] text-[13px] align-top">
                        Dispatch notification
                      </td>
                      <td className="py-3.5 text-white font-medium align-top">
                        Emailed with tracking link
                      </td>
                    </tr>
                  </tbody>
                </table>

                <h2 className="text-[11px] font-bold tracking-[0.25em] uppercase mt-[52px] mb-4 pb-3 border-b border-white/10 text-white">
                  Delivery — UK
                </h2>
                <table className="w-full border-collapse my-5 text-[14px]">
                  <tbody>
                    <tr className="border-b border-white/10">
                      <td className="py-3.5 text-white/60 w-[44%] text-[13px] align-top">
                        Standard (tracked)
                      </td>
                      <td className="py-3.5 text-white font-medium align-top">
                        10–18 business days
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3.5 text-white/60 w-[44%] text-[13px] align-top">
                        Express (tracked)
                      </td>
                      <td className="py-3.5 text-white font-medium align-top">
                        5–10 business days
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3.5 text-white/60 w-[44%] text-[13px] align-top">
                        Free standard shipping
                      </td>
                      <td className="py-3.5 text-white font-medium align-top">Orders over £80</td>
                    </tr>
                  </tbody>
                </table>

                <h2 className="text-[11px] font-bold tracking-[0.25em] uppercase mt-[52px] mb-4 pb-3 border-b border-white/10 text-white">
                  Delivery — International
                </h2>
                <table className="w-full border-collapse my-5 text-[14px]">
                  <tbody>
                    <tr className="border-b border-white/10">
                      <td className="py-3.5 text-white/60 w-[44%] text-[13px] align-top">
                        Standard (tracked)
                      </td>
                      <td className="py-3.5 text-white font-medium align-top">
                        12–22 business days
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3.5 text-white/60 w-[44%] text-[13px] align-top">
                        Express (tracked)
                      </td>
                      <td className="py-3.5 text-white font-medium align-top">
                        7–14 business days
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="border-l-2 border-white/30 p-5 my-8 bg-white/5 text-[13px] text-white/70 rounded-r-lg">
                  Delivery times are estimates from dispatch, not from order date. Processing adds
                  1–3 days on top. During high-demand periods (drop launches, holidays) expect the
                  upper end of the window.
                </div>

                <h2 className="text-[11px] font-bold tracking-[0.25em] uppercase mt-[52px] mb-4 pb-3 border-b border-white/10 text-white">
                  Customs & Duties
                </h2>
                <p className="mb-4">
                  International orders may be subject to import duties and taxes on arrival. These
                  charges are the customer's responsibility and are not included in the order total.
                  We have no control over customs processing times.
                </p>

                <h2 className="text-[11px] font-bold tracking-[0.25em] uppercase mt-[52px] mb-4 pb-3 border-b border-white/10 text-white">
                  Tracking
                </h2>
                <p className="mb-4">
                  Every order ships with a tracking number. You'll receive this by email when your
                  order dispatches. If tracking hasn't updated in 5 business days after dispatch,
                  contact us.
                </p>

                <h2 className="text-[11px] font-bold tracking-[0.25em] uppercase mt-[52px] mb-4 pb-3 border-b border-white/10 text-white">
                  Issues
                </h2>
                <p className="mb-4">
                  If your order hasn't arrived within the delivery window, email{" "}
                  <strong className="text-white font-semibold">support@vivre-club.com</strong> with
                  your order number. We'll investigate and resolve it.
                </p>
              </div>
            )}

            {activeTab === "returns" && (
              <div className="animate-in fade-in duration-500">
                <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-white/50 mb-5">
                  Returns Policy
                </p>
                <h1 className="text-[clamp(28px,5vw,42px)] font-bold tracking-[-0.01em] leading-[1.1] mb-10 text-white">
                  14 days. Unworn. Tags on.
                </h1>

                <p className="text-[17px] leading-[1.6] text-white mb-5">
                  We accept returns within 14 days of delivery. Items must be in original condition
                  — unworn, unwashed, with all tags attached. No exceptions.
                </p>

                <h2 className="text-[11px] font-bold tracking-[0.25em] uppercase mt-[52px] mb-4 pb-3 border-b border-white/10 text-white">
                  Eligibility
                </h2>
                <table className="w-full border-collapse my-5 text-[14px]">
                  <tbody>
                    <tr className="border-b border-white/10">
                      <td className="py-3.5 text-white/60 w-[44%] text-[13px] align-top">
                        Return window
                      </td>
                      <td className="py-3.5 text-white font-medium align-top">
                        14 days from delivery date
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3.5 text-white/60 w-[44%] text-[13px] align-top">
                        Condition required
                      </td>
                      <td className="py-3.5 text-white font-medium align-top">
                        Unworn, unwashed, tags attached
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3.5 text-white/60 w-[44%] text-[13px] align-top">
                        Return shipping cost
                      </td>
                      <td className="py-3.5 text-white font-medium align-top">Paid by customer</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3.5 text-white/60 w-[44%] text-[13px] align-top">
                        Refund method
                      </td>
                      <td className="py-3.5 text-white font-medium align-top">
                        Original payment method
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3.5 text-white/60 w-[44%] text-[13px] align-top">
                        Refund processing time
                      </td>
                      <td className="py-3.5 text-white font-medium align-top">
                        5 business days after receipt
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="border-l-2 border-white/30 p-5 my-8 bg-white/5 text-[13px] text-white/70 rounded-r-lg">
                  We do not offer exchanges. Stock is limited and cannot be held. If you want a
                  different size or colour, return the original item and place a new order.
                </div>

                <h2 className="text-[11px] font-bold tracking-[0.25em] uppercase mt-[52px] mb-4 pb-3 border-b border-white/10 text-white">
                  How to Return
                </h2>
                <p className="mb-4">
                  Email <strong className="text-white font-semibold">support@vivre-club.com</strong>{" "}
                  with your order number and reason for return. We'll confirm eligibility and send
                  return instructions. Do not send items back without confirmation — unannounced
                  returns cannot be processed.
                </p>

                <h2 className="text-[11px] font-bold tracking-[0.25em] uppercase mt-[52px] mb-4 pb-3 border-b border-white/10 text-white">
                  Non-Returnable Items
                </h2>
                <p className="mb-4">
                  Items showing signs of wear, washing, or damage will not be accepted and will be
                  returned to you at your cost. Sale items and gift cards are non-returnable.
                </p>

                <h2 className="text-[11px] font-bold tracking-[0.25em] uppercase mt-[52px] mb-4 pb-3 border-b border-white/10 text-white">
                  Faulty or Incorrect Items
                </h2>
                <p className="mb-4">
                  If you receive a faulty or incorrect item, email us within 7 days of delivery with
                  photos. We'll cover return shipping and resolve it — replacement or full refund,
                  your choice.
                </p>
              </div>
            )}

            {activeTab === "privacy" && (
              <div className="animate-in fade-in duration-500">
                <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-white/50 mb-5">
                  Privacy Policy
                </p>
                <h1 className="text-[clamp(28px,5vw,42px)] font-bold tracking-[-0.01em] leading-[1.1] mb-10 text-white">
                  What we collect and why.
                </h1>

                <p className="text-[17px] leading-[1.6] text-white mb-5">
                  VIVRE-CLUB collects only the data needed to process your order and improve the
                  store. We do not sell your data. We do not share it beyond what's required to
                  fulfil your order.
                </p>

                <p className="mb-4">
                  <strong className="text-white font-semibold">Last updated:</strong> August 2026
                </p>

                <h2 className="text-[11px] font-bold tracking-[0.25em] uppercase mt-[52px] mb-4 pb-3 border-b border-white/10 text-white">
                  What We Collect
                </h2>
                <table className="w-full border-collapse my-5 text-[14px]">
                  <tbody>
                    <tr className="border-b border-white/10">
                      <td className="py-3.5 text-white/60 w-[44%] text-[13px] align-top">
                        Name & contact details
                      </td>
                      <td className="py-3.5 text-white font-medium align-top">
                        Required to process and fulfil your order
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3.5 text-white/60 w-[44%] text-[13px] align-top">
                        Delivery address
                      </td>
                      <td className="py-3.5 text-white font-medium align-top">
                        Required for shipping
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3.5 text-white/60 w-[44%] text-[13px] align-top">
                        Payment information
                      </td>
                      <td className="py-3.5 text-white font-medium align-top">
                        Processed securely by Shopify Payments — we never see your full card details
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3.5 text-white/60 w-[44%] text-[13px] align-top">
                        Order history
                      </td>
                      <td className="py-3.5 text-white font-medium align-top">
                        Retained to manage returns and customer support
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3.5 text-white/60 w-[44%] text-[13px] align-top">
                        Browsing behaviour
                      </td>
                      <td className="py-3.5 text-white font-medium align-top">
                        Via cookies — used to improve the store and measure marketing performance
                      </td>
                    </tr>
                  </tbody>
                </table>

                <h2 className="text-[11px] font-bold tracking-[0.25em] uppercase mt-[52px] mb-4 pb-3 border-b border-white/10 text-white">
                  Who We Share It With
                </h2>
                <p className="mb-4">
                  Your data is shared only with third parties required to operate the store:
                </p>
                <p className="mb-4">
                  <strong className="text-white font-semibold">Shopify</strong> — our store
                  platform, which processes payments and stores order data. Shopify is GDPR
                  compliant.
                </p>
                <p className="mb-4">
                  <strong className="text-white font-semibold">Shipping partners</strong> — your
                  name and address are shared with our logistics providers to fulfil delivery.
                </p>
                <p className="mb-4">
                  <strong className="text-white font-semibold">Marketing platforms</strong> — if you
                  opt into marketing emails, your email address is held in our email platform. You
                  can unsubscribe at any time.
                </p>

                <h2 className="text-[11px] font-bold tracking-[0.25em] uppercase mt-[52px] mb-4 pb-3 border-b border-white/10 text-white">
                  Your Rights (GDPR)
                </h2>
                <p className="mb-4">
                  You have the right to access, correct, or delete the personal data we hold about
                  you. You can also request that we restrict processing or object to it. To exercise
                  any of these rights, email{" "}
                  <strong className="text-white font-semibold">support@vivre-club.com</strong>.
                </p>

                <h2 className="text-[11px] font-bold tracking-[0.25em] uppercase mt-[52px] mb-4 pb-3 border-b border-white/10 text-white">
                  Cookies
                </h2>
                <p className="mb-4">
                  We use essential cookies to operate the store and optional analytics cookies to
                  understand how people use it. You can manage cookie preferences via the banner on
                  your first visit.
                </p>

                <h2 className="text-[11px] font-bold tracking-[0.25em] uppercase mt-[52px] mb-4 pb-3 border-b border-white/10 text-white">
                  Data Retention
                </h2>
                <p className="mb-4">
                  Order data is retained for 7 years in line with UK financial record-keeping
                  requirements. Marketing data is retained until you unsubscribe. You can request
                  deletion of any other data at any time.
                </p>

                <h2 className="text-[11px] font-bold tracking-[0.25em] uppercase mt-[52px] mb-4 pb-3 border-b border-white/10 text-white">
                  Contact
                </h2>
                <p className="mb-4">
                  For any privacy-related queries:{" "}
                  <strong className="text-white font-semibold">support@vivre-club.com</strong>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </VivreLayout>
  );
}
