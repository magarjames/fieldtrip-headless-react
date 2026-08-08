import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BRAND, SEASON, PIECE_COUNT } from "@/components/northline/data";
import { pageMeta, useReveal } from "@/components/northline/parts";
import { Catalogue, SkipLink, WorldFooter, WorldHeader , LookStyle } from "@/components/world/chrome";
import { LOOKS } from "@/components/world/looks";
import { Stage, useScrollRef } from "@/components/world/stage";
import { CLOTH_FRAG, CLOTH_VERT, GL_PALETTE } from "@/components/world/shaders";

/* ============================================================================
   W02 — CLOTH
   Library: react-three-fiber + a custom GLSL program

   A 96x96 plane displaced by two crossed travelling waves and an fbm term, so
   it behaves like heavy canvas settling rather than the usual water surface.
   The fragment program draws the weave itself as two out-of-phase stripe
   fields, and lets the rust accent pool only in the troughs, and only once the
   page has been scrolled.

   Scroll is a uniform, not a CSS transform: uScroll raises the wave amplitude
   and drags the phase, so the cloth genuinely falls as you read.
   ========================================================================== */

export const Route = createFileRoute("/w/cloth")({
  component: Cloth,
  head: () =>
    pageMeta(
      `${BRAND} — Cloth`,
      `A GLSL canvas that behaves like heavy fabric, driven by scroll position.`,
    ),
});

function Sheet() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const scroll = useScrollRef();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uWarp: { value: new THREE.Vector3(...GL_PALETTE.olive) },
      uWeft: { value: new THREE.Vector3(...GL_PALETTE.stone) },
      uAccent: { value: new THREE.Vector3(...GL_PALETTE.rust) },
    }),
    [],
  );

  useFrame((_, d) => {
    if (!mat.current) return;
    const u = mat.current.uniforms;
    u.uTime.value += d;
    // ease toward the scroll target so a flick does not snap the cloth
    u.uScroll.value += (scroll.current - u.uScroll.value) * 0.06;
  });

  return (
    <mesh rotation={[-0.42, 0, 0.16]}>
      <planeGeometry args={[13, 9, 96, 96]} />
      <shaderMaterial
        ref={mat}
        vertexShader={CLOTH_VERT}
        fragmentShader={CLOTH_FRAG}
        uniforms={uniforms}
      />
    </mesh>
  );
}

function Cloth() {
  useReveal();
  const look = LOOKS.cloth;

  return (
    <div className="w-cloth min-h-dvh">
      <LookStyle look={look} />
      <SkipLink />
      <WorldHeader look={look} label={`${SEASON} · Cloth`} />

      <section className="relative min-h-[92vh] overflow-hidden">
        <div className="absolute inset-0">
          <Stage
            camera={{ position: [0, 0, 7.4], fov: 42 }}
            fallback={
              <div className="h-full w-full bg-[radial-gradient(90%_70%_at_50%_40%,#6b6a4b_0%,#2a2a20_58%,#050505_100%)]" />
            }
          >
            <Sheet />
          </Stage>
        </div>

        {/* the type sits over the weave, with a scrim only where it needs one */}
        <div className="pointer-events-none absolute inset-0 flex items-end">
          <div
            className="w-full px-5 pb-16 pt-40 sm:px-8"
            style={{ background: "linear-gradient(to top, #050505 12%, transparent 100%)" }}
          >
            <div className="mx-auto max-w-[var(--shell)]">
              <h1 className="d max-w-[13ch] text-[clamp(2.8rem,10.5vw,9.5rem)]">
                340gsm
              </h1>
              <p className="mt-6 max-w-[50ch] text-[1.05rem] leading-[1.6]" style={{ color: "var(--dim)" }}>
                Dry cotton canvas, woven and not printed. The surface above is drawn
                thread by thread in a fragment program, and it settles as you scroll.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Catalogue look={look} heading="Woven, cut, and nothing held" />
      <WorldFooter
        look={look}
        note="custom GLSL cloth · 96x96 displaced plane · weave drawn in the fragment stage · uScroll drives amplitude and phase"
      />
    </div>
  );
}
