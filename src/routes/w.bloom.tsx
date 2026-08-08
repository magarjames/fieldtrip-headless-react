import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BRAND, SEASON, PIECE_COUNT } from "@/components/northline/data";
import { pageMeta, useReveal } from "@/components/northline/parts";
import { Catalogue, SkipLink, WorldFooter, WorldHeader , LookStyle } from "@/components/world/chrome";
import { LOOKS } from "@/components/world/looks";
import { Stage, useScrollRef } from "@/components/world/stage";
import { GL_PALETTE } from "@/components/world/shaders";

/* ============================================================================
   W08 — BLOOM
   Library: react-three-fiber, a point cloud with a custom size attenuation

   Twelve thousand points seeded on a torus knot, then pulled apart along
   their own normals as the page scrolls, so the form dissolves into lint and
   reassembles when you scroll back. Point size attenuates with depth in the
   vertex program rather than being fixed, which is what stops it reading as
   flat confetti.

   The only version of the ten with no photograph anywhere in the hero.
   ========================================================================== */

export const Route = createFileRoute("/w/bloom")({
  component: Bloom,
  head: () =>
    pageMeta(`${BRAND} — Bloom`, `A twelve thousand point cloud that dissolves as you scroll.`),
});

const COUNT = 12000;

const VERT = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  attribute vec3 aDir;
  attribute float aSeed;
  varying float vSeed;
  varying float vFade;

  void main(){
    vSeed = aSeed;
    vec3 p = position + aDir * uScroll * (2.6 + aSeed * 5.0);
    p.y += sin(uTime * 0.6 + aSeed * 6.28) * 0.06;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vFade = clamp(1.0 - uScroll * 0.75, 0.0, 1.0);

    gl_PointSize = (7.0 + aSeed * 6.0) * (12.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAG = /* glsl */ `
  precision mediump float;
  uniform vec3 uInk;
  uniform vec3 uAccent;
  varying float vSeed;
  varying float vFade;

  void main(){
    // round the square point sprite, and soften its edge
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.16, d) * vFade;

    vec3 col = mix(uInk, uAccent, step(0.88, fract(vSeed * 5.77)));
    gl_FragColor = vec4(col, a * 0.72);
  }
`;

function Cloud() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const pts = useRef<THREE.Points>(null);
  const scroll = useScrollRef();

  const geometry = useMemo(() => {
    // sample a torus knot's surface, then keep the normal as the escape vector
    const src = new THREE.TorusKnotGeometry(2.2, 0.72, 220, 32);
    const pos = src.attributes.position;
    const nor = src.attributes.normal;

    const position = new Float32Array(COUNT * 3);
    const dir = new Float32Array(COUNT * 3);
    const seed = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      const j = Math.floor(Math.random() * pos.count);
      position[i * 3] = pos.getX(j);
      position[i * 3 + 1] = pos.getY(j);
      position[i * 3 + 2] = pos.getZ(j);
      dir[i * 3] = nor.getX(j);
      dir[i * 3 + 1] = nor.getY(j);
      dir[i * 3 + 2] = nor.getZ(j);
      seed[i] = Math.random();
    }
    src.dispose();

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(position, 3));
    g.setAttribute("aDir", new THREE.BufferAttribute(dir, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    return g;
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uInk: { value: new THREE.Vector3(...GL_PALETTE.stone) },
      uAccent: { value: new THREE.Vector3(...GL_PALETTE.rust) },
    }),
    [],
  );

  useFrame((_, d) => {
    if (mat.current) {
      const u = mat.current.uniforms;
      u.uTime.value += d;
      u.uScroll.value += (scroll.current - u.uScroll.value) * 0.05;
    }
    if (pts.current) pts.current.rotation.y += d * 0.09;
  });

  return (
    <points ref={pts} geometry={geometry}>
      <shaderMaterial
        ref={mat}
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  );
}

function Bloom() {
  useReveal();
  const look = LOOKS.bloom;

  return (
    <div className="w-bloom min-h-dvh">
      <LookStyle look={look} />
      <SkipLink />
      <WorldHeader look={look} label={`${SEASON} · Bloom`} />

      <section className="relative h-[92vh] overflow-hidden">
        <Stage
          camera={{ position: [0, 0, 8.4], fov: 46 }}
          fallback={
            <div className="h-full w-full bg-[radial-gradient(50%_50%_at_50%_45%,#a8a196_0%,transparent_62%),#050505] opacity-70" />
          }
        >
          <Cloud />
        </Stage>

        <div className="pointer-events-none absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-[var(--shell)] px-5 pb-16 sm:px-8">
            <h1 className="d max-w-[12ch] text-[clamp(2.8rem,9.5vw,8.6rem)]">
              Nothing left over
            </h1>
            <p className="mt-6 max-w-[48ch] text-[1.04rem] leading-[1.6]" style={{ color: "var(--dim)" }}>
              Overproduction is the waste. Scroll and the form comes apart;
              {" "}{PIECE_COUNT} pieces is all that is ever made.
            </p>
          </div>
        </div>
      </section>

      <Catalogue look={look} heading="Made once" />
      <WorldFooter
        look={look}
        note="react-three-fiber · 12,000 point cloud sampled off a torus knot · points escape along their own normals with uScroll"
      />
    </div>
  );
}
