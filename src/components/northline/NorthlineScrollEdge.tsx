import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { NOISE } from "@/components/world/shaders";
import { Stage } from "@/components/world/stage";

export type NorthlineEdgeMotion = {
  progress: number;
};

const EDGE_PATH =
  "M0 74 C34 63 52 48 83 57 C104 65 119 46 143 51 C170 58 185 40 212 47 C246 59 261 67 290 56 C319 44 336 58 363 52 C390 45 407 62 437 54 C466 44 489 42 514 55 C544 69 562 47 590 51 C624 58 643 39 670 49 C702 61 724 51 751 48 C782 45 796 61 824 55 C855 48 873 37 902 49 C931 63 951 51 977 54 C1009 58 1028 41 1056 48 C1090 59 1111 68 1139 57 C1168 45 1190 49 1218 54 C1252 60 1270 43 1297 49 C1328 58 1350 68 1378 58 C1404 49 1420 52 1446 47 C1480 40 1505 61 1535 53 C1560 47 1583 42 1600 50 L1600 140 L0 140 Z";

const VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uProgress;
  uniform float uVelocity;
  uniform vec2 uResolution;
  uniform vec3 uColour;
  uniform float uToneStrength;
  varying vec2 vUv;

  ${NOISE}

  void main() {
    const float TAU = 6.28318530718;
    float progress = smoothstep(0.0, 1.0, uProgress);
    float velocity = clamp(uVelocity, -2.6, 2.6);
    float x = vUv.x;

    float grain = fbm(vec2(x * 5.1 + uTime * 0.055, progress * 1.8 - uTime * 0.025));
    float broadFold = sin(x * TAU * 2.15 + progress * 4.4) * mix(0.024, 0.052, progress);
    float shortFold = sin(x * TAU * 6.7 - progress * 7.2 + uTime * 0.16) * 0.014;
    float scrollTug = sin(x * TAU * 1.35 + progress * 2.6) * velocity * 0.014;
    float edge = 0.62 + broadFold + shortFold + (grain - 0.5) * 0.085 + scrollTug;

    float softness = 0.0045;
    float alpha = 1.0 - smoothstep(edge - softness, edge + softness, vUv.y);
    float rimDistance = (vUv.y - edge) / 0.018;
    float rim = exp(-(rimDistance * rimDistance));

    float warp = sin(vUv.x * uResolution.x * 0.21 + grain * 7.0) * 0.5 + 0.5;
    float weft = sin(vUv.y * uResolution.y * 0.34) * 0.5 + 0.5;
    float weave = warp * weft;

    float shade = (weave * 0.045 + rim * 0.065) * uToneStrength;
    vec3 colour = mix(uColour, vec3(0.0), shade);
    colour = mix(
      colour,
      vec3(1.0),
      max(velocity, 0.0) * rim * 0.018 * uToneStrength
    );

    gl_FragColor = vec4(colour, alpha);
    #include <colorspace_fragment>
  }
`;

function StaticEdge({ colour }: { colour: string }) {
  return (
    <svg
      className="nl-scroll-edge-fallback"
      viewBox="0 0 1600 140"
      preserveAspectRatio="none"
      focusable="false"
    >
      <path d={EDGE_PATH} fill={colour} />
    </svg>
  );
}

function ReactiveEdge({
  motion,
  colour,
  toneStrength,
}: {
  motion: { current: NorthlineEdgeMotion };
  colour: string;
  toneStrength: number;
}) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const smoothedProgress = useRef(0);
  const smoothedVelocity = useRef(0);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uVelocity: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uColour: { value: new THREE.Color(colour) },
      uToneStrength: { value: toneStrength },
    }),
    [colour, toneStrength],
  );

  useFrame((state, delta) => {
    if (!material.current) return;

    const frameDelta = Math.min(delta, 1 / 20);
    const previousProgress = smoothedProgress.current;
    const progressFollow = 1 - Math.exp(-11 * frameDelta);
    smoothedProgress.current += (motion.current.progress - previousProgress) * progressFollow;

    const instantVelocity =
      (smoothedProgress.current - previousProgress) / Math.max(frameDelta, 0.001);
    const velocityFollow = 1 - Math.exp(-7 * frameDelta);
    smoothedVelocity.current += (instantVelocity - smoothedVelocity.current) * velocityFollow;

    const shaderUniforms = material.current.uniforms;
    shaderUniforms.uTime.value +=
      frameDelta * (0.1 + Math.min(Math.abs(smoothedVelocity.current), 3) * 0.5);
    shaderUniforms.uProgress.value = smoothedProgress.current;
    shaderUniforms.uVelocity.value = THREE.MathUtils.clamp(smoothedVelocity.current, -2.6, 2.6);
    shaderUniforms.uResolution.value.set(state.size.width, state.size.height);
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={material}
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        depthTest={false}
        toneMapped={false}
      />
    </mesh>
  );
}

export function NorthlineScrollEdge({
  motion,
  colour = "#ffffff",
  toneStrength = 1,
  className = "nl-collection-edge",
}: {
  motion: { current: NorthlineEdgeMotion };
  colour?: string;
  toneStrength?: number;
  className?: string;
}) {
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 921px)");
    const update = () => setDesktop(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <div className={`nl-scroll-edge ${className}`} aria-hidden="true">
      {desktop ? (
        <Stage fallback={<StaticEdge colour={colour} />} dpr={[1, 1.2]}>
          <ReactiveEdge motion={motion} colour={colour} toneStrength={toneStrength} />
        </Stage>
      ) : (
        <StaticEdge colour={colour} />
      )}
    </div>
  );
}
