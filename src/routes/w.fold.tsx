import { createFileRoute } from "@tanstack/react-router";
import { Suspense, useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { BRAND, SEASON, PIECE_COUNT } from "@/components/northline/data";
import { pageMeta, useReveal } from "@/components/northline/parts";
import { Catalogue, SkipLink, WorldFooter, WorldHeader , LookStyle } from "@/components/world/chrome";
import { LOOKS } from "@/components/world/looks";
import { Stage, useScrollRef } from "@/components/world/stage";
import { FOLD_FRAG, GL_PALETTE, QUAD_VERT } from "@/components/world/shaders";
import { media } from "@/components/world/media";

/* ============================================================================
   W04 — FOLD
   Library: react-three-fiber + a custom GLSL program over a real photograph

   The other GL versions draw their own imagery. This one takes the generated
   campaign photograph and creases it: uv displaced along an fbm field whose
   strength rises with scroll, with the colour channels split slightly across
   each fold so the distortion reads as material dispersion instead of a blur.

   Light tone on purpose. Six of the ten sit on the near-black field, and a
   fold effect is far more legible against paper than against void.
   ========================================================================== */

export const Route = createFileRoute("/w/fold")({
  component: Fold,
  head: () =>
    pageMeta(
      `${BRAND} — Fold`,
      `A campaign photograph creased in a fragment program as the page scrolls.`,
    ),
});

function Creased() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const scroll = useScrollRef();
  const tex = useLoader(THREE.TextureLoader, media("hero", 1600, 900));

  const uniforms = useMemo(
    () => ({
      uTex: { value: tex },
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uAccent: { value: new THREE.Vector3(...GL_PALETTE.rust) },
    }),
    [tex],
  );

  useFrame((_, d) => {
    if (!mat.current) return;
    const u = mat.current.uniforms;
    u.uTime.value += d;
    u.uScroll.value += (scroll.current - u.uScroll.value) * 0.07;
  });

  return (
    <mesh>
      <planeGeometry args={[14, 8]} />
      <shaderMaterial ref={mat} vertexShader={QUAD_VERT} fragmentShader={FOLD_FRAG} uniforms={uniforms} />
    </mesh>
  );
}

function Fold() {
  useReveal();
  const look = LOOKS.fold;

  return (
    <div className="w-fold min-h-dvh">
      <LookStyle look={look} />
      <SkipLink />
      <WorldHeader look={look} label={`${SEASON} · Fold`} />

      <section className="relative h-[86vh] overflow-hidden">
        <Stage
          camera={{ position: [0, 0, 5.6], fov: 50 }}
          fallback={
            <img
              src={media("hero", 1600, 900)}
              alt="The winter campaign"
              width={1600}
              height={900}
              className="h-full w-full object-cover"
            />
          }
        >
          <Suspense fallback={null}>
            <Creased />
          </Suspense>
        </Stage>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-[var(--shell)]">
          <h1 className="d max-w-[16ch] text-[clamp(2.4rem,8vw,7rem)]">
            Creases are the point
          </h1>
          <p className="mt-6 max-w-[56ch] text-[1.06rem] leading-[1.62]" style={{ color: "var(--dim)" }}>
            Waxed cotton improves where it folds. The photograph above is being
            creased live, in a fragment program, at a strength set by how far down
            this page you are. {PIECE_COUNT} pieces, none of them cut in advance.
          </p>
        </div>
      </section>

      <Catalogue look={look} heading="Made to crease" />
      <WorldFooter
        look={look}
        note="custom GLSL fold · fbm uv displacement over a generated photograph · per-channel split at the crease · uScroll sets strength"
      />
    </div>
  );
}
