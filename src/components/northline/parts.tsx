import { useEffect, useMemo, useState } from "react";
import { PIECES, SECTIONS, type CategoryId, type Piece } from "./data";

/** Shared behaviour for all six versions. The design systems differ; the
 *  accessibility floor and the catalogue do not. */

export const img = (seed: string, w: number, h: number) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

/** __root.tsx carries the Count Club card as the site-wide default, and a
 *  route that only overrides `title` still ships Count Club's description and
 *  og:title. These pages are a different brand, so each one states its own. */
export const pageMeta = (title: string, description: string) => ({
  meta: [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
  ],
});

export function useReveal(selector = ".rv") {
  useEffect(() => {
    const nodes = document.querySelectorAll(selector);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((n) => n.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.14 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [selector]);
}

export function useActive(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-30% 0px -60% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids.join("|")]);
  return active;
}

/** header state without a scroll listener */
export function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const el = document.createElement("div");
    el.style.cssText = "position:absolute;top:80vh;height:1px;width:1px;pointer-events:none";
    document.body.appendChild(el);
    const io = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting));
    io.observe(el);
    return () => {
      io.disconnect();
      el.remove();
    };
  }, []);
  return scrolled;
}

/** the catalogue grouped the way every version presents it */
export function useGroups(filter: CategoryId | "all" = "all") {
  return useMemo(
    () =>
      SECTIONS.map((s) => ({
        ...s,
        pieces: PIECES.filter(
          (p) => s.cats.includes(p.category) && (filter === "all" || p.category === filter),
        ),
      })).filter((s) => s.pieces.length),
    [filter],
  );
}

/** a tiny bag used by the versions that do not ship the full drawer set */
export function useBag() {
  const [n, setN] = useState(0);
  const [pulse, setPulse] = useState(false);
  const add = () => {
    setN((v) => v + 1);
    setPulse(true);
    setTimeout(() => setPulse(false), 340);
  };
  return { n, pulse, add };
}

export type { Piece };
