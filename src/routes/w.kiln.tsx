import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { BRAND, SEASON, JOURNAL } from "@/components/northline/data";
import { pageMeta, useReveal } from "@/components/northline/parts";
import { Catalogue, SkipLink, WorldFooter, WorldHeader , LookStyle } from "@/components/world/chrome";
import { LOOKS } from "@/components/world/looks";
import { Stage, useScrollRef } from "@/components/world/stage";
import { GL_PALETTE, KILN_FRAG, QUAD_VERT } from "@/components/world/shaders";

/* ============================================================================
   W05 — KILN
   Library: react-three-fiber + a custom GLSL program

   Four fbm slabs marched at different rates to fake volume in 2D, lit by one
   directional source that scroll swings across the frame. No geometry beyond
   a single full-screen quad, so it costs almost nothing next to the plate rig
   in W03 while looking like the most expensive page of the ten.

   uRes comes from useThree rather than window, so the field stays correct
   inside the canvas's own drawing buffer on resize and on high-DPI screens.
   ========================================================================== */

export const Route = createFileRoute("/w/kiln")({
  component: Kiln,
  head: () =>
    pageMeta(`${BRAND} — Kiln`, `A volumetric field lit by one source that scroll walks across.`),
});

function Field() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const scroll = useScrollRef();
  const { size, viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uDeep: { value: new THREE.Vector3(...GL_PALETTE.void) },
      uEmber: { value: new THREE.Vector3(...GL_PALETTE.rust) },
    }),
    [],
  );

  useFrame((_, d) => {
    if (!mat.current) return;
    const u = mat.current.uniforms;
    u.uTime.value += d;
    u.uScroll.value += (scroll.current - u.uScroll.value) * 0.05;
    u.uRes.value.set(size.width, size.height);
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial ref={mat} vertexShader={QUAD_VERT} fragmentShader={KILN_FRAG} uniforms={uniforms} />
    </mesh>
  );
}

function Kiln() {
  useReveal();
  const look = LOOKS.kiln;

  return (
    <div className="w-kiln min-h-dvh">
      <LookStyle look={look} />
      <SkipLink />

      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <Stage
          camera={{ position: [0, 0, 1], fov: 50 }}
          fallback={
            <div className="h-full w-full bg-[radial-gradient(70%_60%_at_30%_35%,#3a1c13_0%,#120b08_55%,#050505_100%)]" />
          }
        >
          <Field />
        </Stage>
      </div>

      <div className="relative z-10">
        <WorldHeader look={look} label={`${SEASON} · Kiln`} />

        <section className="flex min-h-[88vh] items-center px-5 sm:px-8">
          <div className="mx-auto w-full max-w-[var(--shell)]">
            <h1 className="d max-w-[12ch] text-[clamp(3rem,11vw,10rem)]">
              Slow heat
            </h1>
            <p className="mt-7 max-w-[50ch] text-[1.05rem] leading-[1.6]" style={{ color: "var(--dim)" }}>
              Nothing is rushed and nothing is held. Ten to fourteen days from the
              order to the door, every time.
            </p>
          </div>
        </section>

        {/* the notes read over the live field with no scrim, which the palette allows */}
        <section className="px-5 py-24 sm:px-8">
          <div className="mx-auto grid max-w-[var(--shell)] gap-10 md:grid-cols-3">
            {JOURNAL.map((j) => (
              <article key={j.id} className="rv border-t pt-5" style={{ borderColor: "var(--hair)" }}>
                <p className="m-0 text-[0.66rem] uppercase tracking-[0.18em]" style={{ color: "var(--dim)" }}>
                  {j.kicker}
                </p>
                <h2 className="d mt-3">{j.title}</h2>
                <p className="mt-3 text-[0.95rem] leading-[1.6]" style={{ color: "var(--dim)" }}>
                  {j.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <div style={{ background: "var(--bg)" }}>
          <Catalogue look={look} heading="Fired slowly" />
          <WorldFooter
            look={look}
            note="custom GLSL volumetric · four fbm slabs marched in 2D · one light swung across by uScroll · a single full-screen quad"
          />
        </div>
      </div>
    </div>
  );
}
