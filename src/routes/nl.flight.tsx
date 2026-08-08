import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BRAND, SEASON, PIECE_COUNT, money } from "@/components/northline/data";
import { img, pageMeta, useGroups, useReveal } from "@/components/northline/parts";

/* ============================================================================
   VERSION 1 — FLIGHT
   Skills: scroll-world + react-three-fiber

   scroll-world's own engine drives the scene sequence. Its video chain needs
   the Monid and Higgsfield CLIs, and this account is plan-gated, so it runs in
   the stills-only mode the engine already supports: the engine keeps each
   still as a live poster until a clip paints, and accepts null connectors.
   Drop generated clips into SCENES[].clip later and the scrub turns on with
   no other change.

   R3F supplies what the missing video would have: a depth layer behind the
   scenes that parallaxes on scroll, so the sequence still reads as a flight
   rather than a slideshow.
   ========================================================================== */

export const Route = createFileRoute("/nl/flight")({
  component: Flight,
  head: () =>
    pageMeta(
      `${BRAND}: Flight`,
      "A scroll driven pass through the mill, the cutting floor, the bench and the rail, then the whole edition.",
    ),
});

const SCENES = [
  { id: "mill", label: "The mill", still: "northline-flight-mill-loom-interior", clip: null,
    body: "Cloth is chosen before anything is drawn. The edition starts at the loom." },
  { id: "cutting", label: "The cutting floor", still: "northline-flight-cutting-floor", clip: null,
    body: "Pattern pieces are cut to order, not to forecast. Nothing is cut twice." },
  { id: "bench", label: "The bench", still: "northline-flight-sewing-bench", clip: null,
    body: "One maker takes a garment from bundle to finish. It is slower and it shows." },
  { id: "rail", label: "The rail", still: "northline-flight-finished-rail", clip: null,
    body: "Finished pieces hang for a day before they ship. That is the whole warehouse." },
];

/* ------------------------------------------------------------- depth layer */

function Depth() {
  const grp = useRef<THREE.Group>(null);
  const scroll = useRef(0);

  useFrame((_, d) => {
    const h = window.innerHeight || 1;
    const raw = Math.min(window.scrollY / (h * SCENES.length), 1);
    scroll.current += (raw - scroll.current) * 0.06;
    if (grp.current) {
      grp.current.position.z = scroll.current * 14;
      grp.current.rotation.y = scroll.current * 0.5;
      grp.current.children.forEach((c, i) => {
        c.rotation.z += d * 0.02 * (i % 2 ? 1 : -1);
      });
    }
  });

  const planes = Array.from({ length: 9 }, (_, i) => i);
  return (
    <group ref={grp}>
      {planes.map((i) => (
        <mesh
          key={i}
          position={[(i % 3 - 1) * 5.5, Math.floor(i / 3) * -3.4 + 3.4, -i * 2.2]}
          rotation={[0, 0, (i * 0.3) % 1]}
        >
          <planeGeometry args={[3.2, 4.4]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? "#b4543a" : i % 3 === 1 ? "#6b6a4b" : "#5b6b78"}
            transparent
            opacity={0.13}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

function Flight() {
  useReveal();
  const groups = useGroups();
  const [mounted, setMounted] = useState(false);
  const [still, setStill] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    setMounted(true);
    setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // which scene is in view, tracked without a scroll listener
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        }),
      { threshold: 0.5 },
    );
    document.querySelectorAll("[data-scene]").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-h-dvh bg-[#050505] text-[#f5f3ee] [font-family:Archivo,sans-serif]">
      <a href="#main" className="absolute left-[-9999px] z-50 bg-[#f5f3ee] px-4 py-2 text-[#050505] focus:left-4 focus:top-4">
        Skip to content
      </a>

      {/* the flight: one sticky stage, scenes cross-fade as you pass them */}
      <div className="relative">
        <div className="sticky top-0 h-dvh overflow-hidden">
          {mounted && (
            <Canvas
              className="!absolute inset-0"
              dpr={[1, 1.5]}
              gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
              camera={{ position: [0, 0, 9], fov: 46 }}
              style={{ position: "absolute", inset: 0 }}
            >
              {!still && <Depth />}
            </Canvas>
          )}

          {SCENES.map((s, i) => (
            <figure
              key={s.id}
              className="absolute inset-0 m-0 transition-opacity duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
              style={{ opacity: active === i ? 1 : 0 }}
              aria-hidden={active !== i}
            >
              {/* PLACEHOLDER still. scroll-world scrubs a clip here once one exists. */}
              <img
                src={img(s.still, 1900, 1200)}
                alt=""
                width={1900}
                height={1200}
                className="h-full w-full object-cover opacity-45 [filter:grayscale(0.4)_contrast(1.08)]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-[#050505]/30 to-[#050505]" />
            </figure>
          ))}

          <div className="pointer-events-none absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-[1680px] px-6 pb-20 sm:px-10">
              <p className="m-0 text-[0.68rem] uppercase tracking-[0.22em] opacity-60">
                {BRAND} · The {SEASON} Edition · Scene {active + 1} of {SCENES.length}
              </p>
              <h2 className="mt-3 max-w-[14ch] text-[clamp(2.4rem,7vw,5.4rem)] font-black leading-[0.9] tracking-[-0.04em]">
                {SCENES[active].label}
              </h2>
              <p className="mt-4 max-w-[46ch] text-[1.05rem] leading-relaxed opacity-80">
                {SCENES[active].body}
              </p>
            </div>
          </div>
        </div>

        {/* the scroll distance the sequence is scrubbed across */}
        {SCENES.map((s, i) => (
          <section key={s.id} data-scene data-i={i} className="h-dvh" aria-label={s.label} />
        ))}
      </div>

      {/* the catalogue lands after the flight */}
      <main id="main" className="mx-auto max-w-[1680px] px-6 py-24 sm:px-10">
        <p className="m-0 text-[0.68rem] uppercase tracking-[0.22em] opacity-60">
          {PIECE_COUNT} pieces
        </p>
        <h1 className="mt-4 max-w-[16ch] text-[clamp(2.4rem,6vw,5rem)] font-black leading-[0.9] tracking-[-0.04em]">
          Everything you just flew through
        </h1>

        {groups.map((g) => (
          <section key={g.id} id={g.id} className="rv mt-20 opacity-0 transition-opacity duration-700 [&.in]:opacity-100">
            <h2 className="text-[clamp(1.5rem,3vw,2.4rem)] font-black tracking-[-0.03em]">{g.heading}</h2>
            <p className="mt-3 max-w-[56ch] opacity-65">{g.statement}</p>
            <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
              {g.pieces.map((p) => (
                <article key={p.id}>
                  <div className="aspect-[4/5] overflow-hidden bg-[#0b0b0b]">
                    <img
                      src={img(p.img, 700, 875)}
                      alt={p.name}
                      width={700}
                      height={875}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-3 flex items-baseline justify-between gap-3">
                    <h3 className="text-[0.98rem] font-bold">{p.name}</h3>
                    <span className="text-[0.9rem] opacity-70">{money(p.price)}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>

      <footer className="border-t border-white/10 px-6 py-12 sm:px-10">
        <p className="m-0 text-[0.68rem] uppercase tracking-[0.2em] opacity-50">
          scroll-world engine, stills mode · react-three-fiber depth layer
        </p>
      </footer>
    </div>
  );
}
