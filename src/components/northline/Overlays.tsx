import { useEffect, useRef, type ReactNode } from "react";
import { PIECES, money, type Piece } from "./data";

/**
 * Accessible overlay primitive shared by the quick view, the bag, search and
 * the mobile menu.
 *
 * Does the four things a hand-rolled drawer usually forgets:
 *   - traps Tab inside while open
 *   - closes on Escape and on scrim click
 *   - returns focus to whatever opened it
 *   - locks the page behind it without shifting layout
 */
export function Drawer({
  open,
  onClose,
  side = "right",
  label,
  children,
}: {
  open: boolean;
  onClose: () => void;
  side?: "right" | "left" | "top";
  label: string;
  children: ReactNode;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const opener = useRef<Element | null>(null);

  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement;

    // lock scroll without the layout jump a plain overflow:hidden causes
    const pad = window.innerWidth - document.documentElement.clientWidth;
    const prev = document.body.style.cssText;
    document.body.style.overflow = "hidden";
    if (pad > 0) document.body.style.paddingRight = `${pad}px`;

    const first = panel.current?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel.current) return;
      const focusable = Array.from(
        panel.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null);
      if (!focusable.length) return;
      const firstEl = focusable[0];
      const lastEl = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.cssText = prev;
      (opener.current as HTMLElement | null)?.focus?.();
    };
  }, [open, onClose]);

  const pos =
    side === "top"
      ? "inset-x-0 top-0 max-h-[85dvh] w-full"
      : side === "left"
        ? "inset-y-0 left-0 w-[min(420px,88vw)]"
        : "inset-y-0 right-0 w-[min(460px,92vw)]";

  return (
    <div
      className={`fixed inset-0 z-[120] ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        className="nl-scrim absolute inset-0 bg-black/70"
        data-open={open}
        onClick={onClose}
      />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        data-open={open}
        className={`nl-drawer ${side === "left" ? "nl-drawer--left" : ""} ${
          side === "top" ? "nl-drawer--top" : ""
        } absolute ${pos} overflow-y-auto bg-[var(--nl-panel)] border-[var(--nl-hair-lit)] ${
          side === "top" ? "border-b" : side === "left" ? "border-r" : "border-l"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export function DrawerHead({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[var(--nl-hair-lit)] px-6 py-5">
      <p className="nl-caption m-0">{title}</p>
      <button onClick={onClose} className="nl-caption m-0 min-h-11 px-2" aria-label="Close">
        Close
      </button>
    </div>
  );
}

/* --------------------------------------------------------------- quick view */

export function QuickView({
  piece,
  onClose,
  size,
  setSize,
  onAdd,
  added,
}: {
  piece: Piece | null;
  onClose: () => void;
  size: string;
  setSize: (s: string) => void;
  onAdd: () => void;
  added: boolean;
}) {
  return (
    <Drawer open={!!piece} onClose={onClose} label="Product quick view">
      {piece && (
        <>
          <DrawerHead title="Quick view" onClose={onClose} />
          <div className="nl-media aspect-[4/5]">
            <img
              src={`https://picsum.photos/seed/${piece.img}/900/1125`}
              alt={piece.name}
              width={900}
              height={1125}
              loading="lazy"
            />
          </div>
          <div className="px-6 py-6">
            <h3 className="nl-sub">{piece.name}</h3>
            <p className="mt-1 text-[var(--nl-ash)]">{money(piece.price)}</p>
            <p className="nl-body mt-4 text-[0.98rem]">{piece.detail}</p>

            <fieldset className="mt-6 border-0 p-0">
              <legend className="nl-caption mb-3 p-0">Size</legend>
              <div className="flex flex-wrap gap-2">
                {piece.sizes.map((s) => {
                  const on = s === size;
                  return (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      aria-pressed={on}
                      className={`nl-size min-h-11 border px-4 text-sm ${
                        on
                          ? "border-[var(--nl-ink)] bg-[var(--nl-ink)] text-[var(--nl-void)]"
                          : "border-[var(--nl-hair-lit)] text-[var(--nl-ink)]"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <button
              onClick={onAdd}
              disabled={!size}
              className={`nl-pill nl-confirm mt-6 w-full ${added ? "nl-pill--rust" : ""}`}
            >
              {added ? "Added to bag" : size ? "Add to bag" : "Select a size"}
            </button>
            <p className="nl-caption mt-4">Made to order. Ships in 10 to 21 days.</p>
          </div>
        </>
      )}
    </Drawer>
  );
}

/* --------------------------------------------------------------------- bag */

export type BagLine = { id: string; size: string; qty: number };

export function Bag({
  open,
  onClose,
  lines,
  setQty,
}: {
  open: boolean;
  onClose: () => void;
  lines: BagLine[];
  setQty: (id: string, size: string, qty: number) => void;
}) {
  const rows = lines
    .map((l) => ({ line: l, piece: PIECES.find((p) => p.id === l.id)! }))
    .filter((r) => r.piece);
  const subtotal = rows.reduce((n, r) => n + r.piece.price * r.line.qty, 0);

  return (
    <Drawer open={open} onClose={onClose} label="Shopping bag">
      <DrawerHead title={`Bag (${rows.reduce((n, r) => n + r.line.qty, 0)})`} onClose={onClose} />
      <div className="px-6 py-6">
        {rows.length === 0 && (
          <p className="nl-body">
            Nothing in the bag yet. The edition is open until it closes.
          </p>
        )}
        <ul className="m-0 grid list-none gap-5 p-0">
          {rows.map(({ line, piece }) => (
            <li key={`${line.id}-${line.size}`} className="grid grid-cols-[84px_1fr] gap-4">
              <div className="nl-media aspect-[4/5]">
                <img
                  src={`https://picsum.photos/seed/${piece.img}/240/300`}
                  alt=""
                  width={240}
                  height={300}
                  loading="lazy"
                />
              </div>
              <div>
                <p className="m-0 font-bold">{piece.name}</p>
                <p className="nl-caption m-0 mt-1">
                  {line.size} · {money(piece.price)}
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <button
                    className="nl-size min-h-11 w-11 border border-[var(--nl-hair-lit)]"
                    onClick={() => setQty(line.id, line.size, line.qty - 1)}
                    aria-label={`Decrease quantity of ${piece.name}`}
                  >
                    &minus;
                  </button>
                  <span aria-live="polite" className="min-w-6 text-center">
                    {line.qty}
                  </span>
                  <button
                    className="nl-size min-h-11 w-11 border border-[var(--nl-hair-lit)]"
                    onClick={() => setQty(line.id, line.size, line.qty + 1)}
                    aria-label={`Increase quantity of ${piece.name}`}
                  >
                    +
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {rows.length > 0 && (
          <>
            <hr className="nl-rule my-6" style={{ borderColor: "var(--nl-hair-lit)" }} />
            <div className="flex items-baseline justify-between">
              <span className="nl-caption">Subtotal</span>
              <span className="nl-sub">{money(subtotal)}</span>
            </div>
            <p className="nl-caption mt-2">Shipping and duties calculated at checkout.</p>
            {/* PLACEHOLDER: wire to Shopify, Stripe or your supplier's checkout. */}
            <button className="nl-pill mt-5 w-full">Checkout</button>
          </>
        )}
      </div>
    </Drawer>
  );
}
