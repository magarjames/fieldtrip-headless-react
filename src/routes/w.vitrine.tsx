import { createFileRoute } from "@tanstack/react-router";
import { Suspense, useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { BRAND, SEASON, PIECE_COUNT, PIECES } from "@/components/northline/data";
import { pageMeta, useReveal } from "@/components/northline/parts";
import { Catalogue, SkipLink, WorldFooter, WorldHeader, pieceImage , LookStyle } from "@/components/world/chrome";
import { LOOKS } from "@/components/world/looks";
import { Stage, useScrollRef } from "@/components/world/stage";

/* ============================================================================
   W03 — VITRINE
   Library: react-three-fiber (TextureLoader, no drei)

   The generated photographs are the geometry. Seven garment plates hang in a
   shallow arc in real 3D space; scroll rotates the rig and pushes the camera
   through it, so the pieces pass the viewer rather than scrolling past.

   Textures are loaded through useLoader inside Suspense, which is why the
   whole rig sits behind a fallback rather than popping in plate by plate.
   ========================================================================== */

export const Route = createFileRoute("/w/vitrine")({
  component: Vitrine,
  head: () =>
    pageMeta(
      `${BRAND} — Vitrine`,
      `The ${SEASON.toLowerCase()} edition hung as plates in real 3D space.`,
    ),
});

const PLATES = PIECES.slice(0, 7);

function Rig() {
  const grp = useRef<THREE.Group>(null);
  const scroll = useScrollRef();

  const urls = useMemo(() => PLATES.map((p) => pieceImage(p.id, 600, 750)), []);
  const textures = useLoader(THREE.TextureLoader, urls);

  useFrame(() => {
    if (!grp.current) return;
    const t = scroll.current;
    grp.current.rotation.y = -0.5 + t * 1.9;
    grp.current.position.z = 1.4 + t * 5.2;
    grp.current.position.y = t * 0.7;
  });

  return (
    <group ref={grp}>
      {textures.map((tex, i) => {
        const a = (i / PLATES.length) * Math.PI * 1.35 - Math.PI * 0.68;
        const r = 6.2;
        return (
          <mesh
            key={i}
            position={[Math.sin(a) * r, (i % 2 ? 0.4 : -0.4), Math.cos(a) * r * -1]}
            rotation={[0, -a, 0]}
          >
            <planeGeometry args={[2.5, 3.1]} />
            <meshBasicMaterial map={tex} toneMapped={false} side={THREE.DoubleSide} />
          </mesh>
        );
      })}
    </group>
  );
}

function Vitrine() {
  useReveal();
  const look = LOOKS.vitrine;

  return (
    <div className="w-vitrine min-h-dvh">
      <LookStyle look={look} />
      <SkipLink />
      <WorldHeader look={look} label={`${SEASON} · Vitrine`} />

      {/* the rig is sticky, the scroll distance below it is what drives the pass */}
      <div className="relative h-[300vh]">
        <div className="sticky top-0 h-dvh overflow-hidden">
          <Stage
            camera={{ position: [0, 0, 9], fov: 48 }}
            fallback={
              <div className="grid h-full w-full place-items-center bg-[#0b0b0b]">
                <img
                  src={pieceImage("p01", 800, 1000)}
                  alt="The Ridge Overshirt"
                  width={800}
                  height={1000}
                  className="h-[70%] w-auto object-cover"
                />
              </div>
            }
          >
            <Suspense fallback={null}>
              <Rig />
            </Suspense>
          </Stage>

          <div className="pointer-events-none absolute inset-0 flex items-end">
            <div className="w-full bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent px-5 pb-14 pt-32 sm:px-8">
              <div className="mx-auto max-w-[var(--shell)]">
                <h1 className="d max-w-[14ch] text-[clamp(2.4rem,8.4vw,7.4rem)]">
                  Walk the rail
                </h1>
                <p className="mt-5 max-w-[48ch] text-[1.02rem] leading-[1.6]" style={{ color: "var(--dim)" }}>
                  {PIECE_COUNT} pieces hung in a shallow arc. Keep scrolling and the
                  camera moves through them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Catalogue look={look} heading="Everything on the rail" />
      <WorldFooter
        look={look}
        note="react-three-fiber · TextureLoader through Suspense · scroll rotates the rig and pushes the camera through it"
      />
    </div>
  );
}
