import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * A cloth field, written directly against react-three-fiber.
 *
 * ShaderGradient gave the page a gradient mesh, which is a preset. This is the
 * opposite: a plane with a custom vertex shader that moves like fabric, which
 * is the one thing a clothing shop can put on screen that a template cannot.
 *
 * How it works
 *   vertex    three travelling sine bands at different frequencies, plus a
 *             pointer-driven bulge, displace z. Cheap enough to run on a
 *             phone; no noise texture, no physics solver.
 *   fragment  colour mixes across the displaced height, so the folds read as
 *             light catching a weave rather than as a gradient.
 *
 * Everything it needs to survive production
 *   - SSR safe: the caller only mounts it after hydration.
 *   - Colours are read from the CSS custom properties, so it tracks the
 *     palette and the light/dark flip instead of hard-coding hex.
 *   - Pauses entirely when scrolled out of view.
 *   - Freezes on the first frame under prefers-reduced-motion; the drape is
 *     still there, it just stops moving.
 */

const vertex = /* glsl */ `
  uniform float uTime;
  uniform vec2  uPointer;
  uniform float uAmp;
  uniform float uScroll;
  varying float vH;
  varying vec2  vUv;

  void main() {
    vUv = uv;
    vec3 p = position;

    // three bands, deliberately non-harmonic so the cloth never visibly loops
    float w1 = sin(p.x * 1.6 + uTime * 0.55) * 0.42;
    float w2 = sin(p.y * 2.1 - uTime * 0.37) * 0.28;
    float w3 = sin((p.x + p.y) * 0.9 + uTime * 0.23) * 0.34;

    // the pointer pushes a soft bulge through the sheet
    float d = distance(vec2(p.x, p.y), uPointer * 2.2);
    float lift = exp(-d * d * 0.35) * 0.75;

    // hold the top edge so it hangs rather than floats
    float hang = smoothstep(1.0, -1.0, p.y);

    // scrolling settles the cloth: the folds flatten and the sheet tilts away,
    // so the hero reads as still fabric by the time the first section lands
    float settle = 1.0 - uScroll * 0.72;
    float h = (w1 + w2 + w3) * hang * uAmp * settle + lift * (1.0 - uScroll);
    p.y += uScroll * 0.9;
    p.z -= uScroll * 0.6;
    p.z += h;

    vH = h;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision mediump float;
  uniform vec3  uDeep;
  uniform vec3  uMid;
  uniform vec3  uLit;
  varying float vH;
  varying vec2  vUv;

  void main() {
    // height drives the shade, so folds catch light like a weave
    float t = clamp(vH * 0.9 + 0.5, 0.0, 1.0);
    vec3 c = mix(uDeep, uMid, smoothstep(0.0, 0.6, t));
    c = mix(c, uLit, smoothstep(0.55, 1.0, t));

    // fade the bottom edge into the page rather than cutting it off
    c = mix(c, uDeep, smoothstep(0.35, 0.0, vUv.y));
    gl_FragColor = vec4(c, 1.0);
  }
`;

function readVar(el: HTMLElement, name: string, fallback: string) {
  const v = getComputedStyle(el).getPropertyValue(name).trim();
  return v || fallback;
}

function Cloth({ still, colors }: { still: boolean; colors: [string, string, string] }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uAmp: { value: 1 },
      uScroll: { value: 0 },
      uDeep: { value: new THREE.Color(colors[0]) },
      uMid: { value: new THREE.Color(colors[1]) },
      uLit: { value: new THREE.Color(colors[2]) },
    }),
    [],
  );

  // recolour in place when the theme flips, rather than remounting the canvas
  useEffect(() => {
    uniforms.uDeep.value.set(colors[0]);
    uniforms.uMid.value.set(colors[1]);
    uniforms.uLit.value.set(colors[2]);
  }, [colors, uniforms]);

  const target = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
      );
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, delta) => {
    if (!mat.current) return;
    if (!still) uniforms.uTime.value += delta;
    // ease toward the pointer so it trails rather than snaps
    uniforms.uPointer.value.lerp(target.current, still ? 1 : 0.045);

    // Scroll progress read in the render loop rather than from a scroll
    // listener. The loop is already running, so this is free, and it can
    // never fire between frames and cause a jump.
    const h = window.innerHeight || 1;
    const raw = Math.min(Math.max(window.scrollY / h, 0), 1);
    const cur = uniforms.uScroll.value;
    uniforms.uScroll.value = still ? raw : cur + (raw - cur) * 0.08;
  });

  // more segments on a wide screen, fewer on a phone
  const seg = size.width < 700 ? 48 : 96;

  return (
    <mesh rotation={[-0.32, 0, 0.06]} position={[0, -0.3, 0]}>
      <planeGeometry args={[9, 5.4, seg, Math.round(seg * 0.6)]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export function ClothField({ className = "" }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [still, setStill] = useState(false);
  const [visible, setVisible] = useState(true);
  const [colors, setColors] = useState<[string, string, string]>([
    "#0f1310",
    "#22303a",
    "#7aa5dd",
  ]);

  useEffect(() => {
    setMounted(true);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setStill(mq.matches);
    const onMq = (e: MediaQueryListEvent) => setStill(e.matches);
    mq.addEventListener("change", onMq);

    // pull the palette out of CSS so the shader follows the theme
    const read = () => {
      const el = host.current;
      if (!el) return;
      setColors([
        readVar(el, "--ed-ground", "#0f1310"),
        readVar(el, "--ed-tint-3", "#22303a"),
        readVar(el, "--ed-accent", "#7aa5dd"),
      ]);
    };
    read();
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    scheme.addEventListener("change", read);

    // stop rendering entirely once it scrolls away
    let io: IntersectionObserver | undefined;
    if (host.current) {
      io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
        rootMargin: "120px",
      });
      io.observe(host.current);
    }

    return () => {
      mq.removeEventListener("change", onMq);
      scheme.removeEventListener("change", read);
      io?.disconnect();
    };
  }, []);

  return (
    <div ref={host} className={`absolute inset-0 ${className}`} aria-hidden="true">
      {/* painted before hydration so the masthead never flashes empty */}
      <div className="absolute inset-0 bg-[var(--ed-ground)]" />

      {mounted && (
        <Canvas
          className="!absolute inset-0"
          dpr={[1, 1.6]}
          frameloop={visible ? "always" : "never"}
          gl={{ antialias: false, powerPreference: "low-power", alpha: false }}
          camera={{ position: [0, 0, 4.2], fov: 42 }}
          style={{ position: "absolute", inset: 0 }}
        >
          <Cloth still={still} colors={colors} />
        </Canvas>
      )}

      {/* keeps the type legible over the folds */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--ed-ground)]/45 via-transparent to-[var(--ed-ground)]" />
    </div>
  );
}
