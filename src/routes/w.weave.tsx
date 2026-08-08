import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BRAND, SEASON, PIECE_COUNT } from "@/components/northline/data";
import { pageMeta, useReveal } from "@/components/northline/parts";
import { Catalogue, SkipLink, WorldFooter, WorldHeader , LookStyle } from "@/components/world/chrome";
import { LOOKS } from "@/components/world/looks";
import { Stage, useScrollRef } from "@/components/world/stage";
import { GL_PALETTE, WEAVE_FRAG, WEAVE_VERT } from "@/components/world/shaders";

/* ============================================================================
   W06 — WEAVE
   Library: react-three-fiber, InstancedBufferGeometry, no drei

   Six hundred thread instances on a lattice, each offset along its own
   lissajous path in the vertex program. One instance in roughly twelve takes
   the rust accent, chosen by its seed rather than its index, so the accent
   scatters instead of banding.

   Built by hand with InstancedBufferAttribute because the whole point is that
   the GPU moves six hundred threads without six hundred draw calls.
   ========================================================================== */

export const Route = createFileRoute("/w/weave")({
  component: Weave,
  head: () =>
    pageMeta(`${BRAND} — Weave`, `Six hundred instanced threads under tension, driven by scroll.`),
});

const COUNT = 600;

function Threads() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const scroll = useScrollRef();

  const geometry = useMemo(() => {
    const base = new THREE.PlaneGeometry(0.035, 1.5);
    const g = new THREE.InstancedBufferGeometry();
    g.index = base.index;
    g.attributes.position = base.attributes.position;
    g.attributes.uv = base.attributes.uv;

    const offset = new Float32Array(COUNT * 3);
    const seed = new Float32Array(COUNT);
    const cols = 40;
    for (let i = 0; i < COUNT; i++) {
      const x = (i % cols) - cols / 2;
      const y = Math.floor(i / cols) - COUNT / cols / 2;
      offset[i * 3] = x * 0.42;
      offset[i * 3 + 1] = y * 0.72;
      offset[i * 3 + 2] = -Math.abs(x) * 0.18;
      seed[i] = Math.random();
    }
    g.setAttribute("iOffset", new THREE.InstancedBufferAttribute(offset, 3));
    g.setAttribute("iSeed", new THREE.InstancedBufferAttribute(seed, 1));
    g.instanceCount = COUNT;
    base.dispose();
    return g;
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uThread: { value: new THREE.Vector3(...GL_PALETTE.stone) },
      uAccent: { value: new THREE.Vector3(...GL_PALETTE.rust) },
    }),
    [],
  );

  useFrame((_, d) => {
    if (!mat.current) return;
    const u = mat.current.uniforms;
    u.uTime.value += d;
    u.uScroll.value += (scroll.current - u.uScroll.value) * 0.05;
  });

  return (
    <mesh geometry={geometry} rotation={[0, 0, 0.08]}>
      <shaderMaterial
        ref={mat}
        vertexShader={WEAVE_VERT}
        fragmentShader={WEAVE_FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function Weave() {
  useReveal();
  const look = LOOKS.weave;

  return (
    <div className="w-weave min-h-dvh">
      <LookStyle look={look} />
      <SkipLink />
      <WorldHeader look={look} label={`${SEASON} · Weave`} />

      <section className="relative h-[92vh] overflow-hidden">
        <Stage
          camera={{ position: [0, 0, 13], fov: 45 }}
          fallback={
            <div
              className="h-full w-full"
              style={{
                background:
                  "repeating-linear-gradient(90deg,#a8a196 0 1px,transparent 1px 14px),#050505",
                opacity: 0.5,
              }}
            />
          }
        >
          <Threads />
        </Stage>

        <div className="pointer-events-none absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-[var(--shell)] px-5 sm:px-8">
            <h1 className="d max-w-[11ch] text-[clamp(2.8rem,10vw,9rem)]">
              Under tension
            </h1>
            <p className="mt-6 max-w-[46ch] text-[1.04rem] leading-[1.6]" style={{ color: "var(--dim)" }}>
              {PIECE_COUNT} pieces from one loom. Six hundred threads above, all
              moved by the GPU in a single draw call.
            </p>
          </div>
        </div>
      </section>

      <Catalogue look={look} heading="Off the loom" />
      <WorldFooter
        look={look}
        note="react-three-fiber · InstancedBufferGeometry, 600 instances, one draw call · lissajous offset in the vertex stage"
      />
    </div>
  );
}
