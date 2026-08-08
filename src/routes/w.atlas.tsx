import { createFileRoute } from "@tanstack/react-router";
import { Suspense, useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { BRAND, SEASON, PIECES } from "@/components/northline/data";
import { pageMeta, useReveal } from "@/components/northline/parts";
import { Catalogue, SkipLink, WorldFooter, WorldHeader, pieceImage , LookStyle } from "@/components/world/chrome";
import { LOOKS } from "@/components/world/looks";
import { Stage, useScrollRef } from "@/components/world/stage";

/* ============================================================================
   W09 — ATLAS
   Library: react-three-fiber (TextureLoader, no drei)

   W03 hangs the pieces in an arc and moves the camera through them. This one
   builds a flat wall of the whole edition and tracks the camera across it,
   which is a different reading of the same data: a contact sheet you fly over
   rather than a rail you walk down.

   The camera pans on X and pulls back on Z simultaneously, so the wall starts
   as one plate and ends as the whole grid, which is the only honest way to
   show sixteen pieces without shrinking them all to thumbnails at the start.
   ========================================================================== */

export const Route = createFileRoute("/w/atlas")({
  component: Atlas,
  head: () =>
    pageMeta(`${BRAND} — Atlas`, `The whole edition as one wall, flown across by scroll.`),
});

const COLS = 4;

function Wall() {
  const grp = useRef<THREE.Group>(null);
  const scroll = useScrollRef();

  const urls = useMemo(() => PIECES.map((p) => pieceImage(p.id, 520, 650)), []);
  const textures = useLoader(THREE.TextureLoader, urls);

  useFrame(({ camera }) => {
    const t = scroll.current;
    // pan across and pull back at once
    camera.position.x = -3.4 + t * 7.0;
    camera.position.y = 1.2 - t * 2.6;
    camera.position.z = 5.2 + t * 9.0;
    camera.lookAt(camera.position.x * 0.55, camera.position.y * 0.55, 0);
    if (grp.current) grp.current.rotation.y = Math.sin(t * 3.14) * 0.05;
  });

  return (
    <group ref={grp}>
      {textures.map((tex, i) => {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        return (
          <mesh
            key={i}
            position={[(col - (COLS - 1) / 2) * 2.5, -(row - 1.5) * 3.1, (col % 2 ? -0.3 : 0.3)]}
          >
            <planeGeometry args={[2.2, 2.75]} />
            <meshBasicMaterial map={tex} toneMapped={false} />
          </mesh>
        );
      })}
    </group>
  );
}

function Atlas() {
  useReveal();
  const look = LOOKS.atlas;

  return (
    <div className="w-atlas min-h-dvh">
      <LookStyle look={look} />
      <SkipLink />
      <WorldHeader look={look} label={`${SEASON} · Atlas`} />

      <div className="relative h-[320vh]">
        <div className="sticky top-0 h-dvh overflow-hidden" style={{ background: "var(--bg)" }}>
          <Stage
            camera={{ position: [-3.4, 1.2, 5.2], fov: 50 }}
            fallback={
              <div className="grid h-full w-full grid-cols-4 gap-1 p-1">
                {PIECES.slice(0, 8).map((p) => (
                  <img
                    key={p.id}
                    src={pieceImage(p.id, 520, 650)}
                    alt={p.name}
                    width={520}
                    height={650}
                    className="h-full w-full object-cover"
                  />
                ))}
              </div>
            }
          >
            <Suspense fallback={null}>
              <Wall />
            </Suspense>
          </Stage>

          <div className="pointer-events-none absolute inset-x-0 top-0 px-5 pt-10 sm:px-8">
            <div className="mx-auto max-w-[var(--shell)]">
              <h1 className="d max-w-[14ch] text-[clamp(2.2rem,7vw,6rem)]">
                The whole wall
              </h1>
              <p className="mt-4 max-w-[44ch] text-[1rem] leading-[1.6]" style={{ color: "var(--dim)" }}>
                Every piece in the edition, at once. Scroll pulls the camera back
                until the last one is in frame.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Catalogue look={look} heading="Read it as a list instead" />
      <WorldFooter
        look={look}
        note="react-three-fiber · a flat wall of the full catalogue · camera pans on X and retreats on Z together"
      />
    </div>
  );
}
