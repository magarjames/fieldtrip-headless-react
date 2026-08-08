import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Stage, useScrollRef } from "@/components/world/stage";
import { NOISE } from "@/components/world/shaders";
import { activeOutfit } from "./outfitSync";

/* ============================================================================
   FOLD BACKDROP — the /w/fold crease field over a clean per-outfit gradient

   The crease program from /w/fold, but the palette follows the figure on
   stage: each fit's gradient is built from what that chibi is wearing, and
   the uniforms crossfade when the visitor switches chips. Light at the top
   where the hero type sits, the outfit's deep colour pooling at the bottom.
   tone="dark" regrades the same fits onto the ink field for dark pages (v5).
   ========================================================================== */

/* passthrough: the plane is already in clip space, no camera math needed */
const VERT = /* glsl */ `
  varying vec2 vUv;
  void main(){
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uRes;
  uniform vec3 uBase;
  uniform vec3 uMid;
  uniform vec3 uCrest;
  uniform vec3 uLip;
  varying vec2 vUv;

  ${NOISE}

  vec3 grad(float t){
    vec3 col = mix(uBase, uMid, smoothstep(0.06, 0.66, t));
    return mix(col, uCrest, smoothstep(0.58, 1.0, t));
  }

  void main(){
    vec2 uv = vUv;
    vec2 asp = vec2(uRes.x / max(uRes.y, 1.0), 1.0);

    float n = fbm(uv * asp * 3.4 + uTime * 0.06);
    float creases = abs(sin((uv.y + n * 0.35) * 22.0 + uScroll * 3.0 + uTime * 0.12));
    float strength = 0.012 + uScroll * 0.05;
    vec2 off = vec2(n - 0.5, creases - 0.5) * strength;

    // per-channel split as /w/fold, walked along the ramp; flipped vertical so
    // the pale end sits under the hero type and the deep end pools below
    float t = clamp((1.0 - uv.y) * 0.62 + n * 0.35, 0.0, 1.0);
    float r = grad(t + off.y * 1.16).r;
    float g = grad(t + off.y).g;
    float b = grad(t + off.y * 0.84).b;
    vec3 col = vec3(r, g, b);

    // crease lip in the outfit's accent
    float lip = smoothstep(0.94, 1.0, creases) * (0.25 + uScroll * 0.4);
    col = mix(col, uLip, lip * 0.5);

    gl_FragColor = vec4(col, 1.0);
  }
`;

type Rgb = [number, number, number];
type Palette = { base: Rgb; mid: Rgb; crest: Rgb; lip: Rgb };

const rgb = (h: string): Rgb => {
  const n = parseInt(h.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

/* one gradient per fit, in OUTFITS order, drawn from what the figure wears */
const PALETTES: Palette[] = [
  // Gallery Day — pale blue shirt, black wide trousers, chain
  { base: rgb("#F5F8FB"), mid: rgb("#BCD6E7"), crest: rgb("#3A414D"), lip: rgb("#7FA8C9") },
  // Off Duty — backwards red cap, red bandana, white tee and jeans
  { base: rgb("#FCF8F6"), mid: rgb("#F2D2C7"), crest: rgb("#C8402F"), lip: rgb("#E0684F") },
  // Rest Day — sweater vest over white tee, wide brown shorts
  { base: rgb("#F8F3EB"), mid: rgb("#DEC39B"), crest: rgb("#8A5F42"), lip: rgb("#C49A6C") },
];

/* the same three fits graded onto the ink field, for dark pages: the
   outfit's colour runs deep instead of pale so the page's light type holds */
const DARK_PALETTES: Palette[] = [
  // Gallery Day — deep slate blue
  { base: rgb("#121419"), mid: rgb("#22394E"), crest: rgb("#3A6A8C"), lip: rgb("#7FA8C9") },
  // Off Duty — deep oxblood red
  { base: rgb("#171213"), mid: rgb("#4E1F1B"), crest: rgb("#8C2F23"), lip: rgb("#E0684F") },
  // Rest Day — deep umber
  { base: rgb("#151310"), mid: rgb("#42301D"), crest: rgb("#6B4A2E"), lip: rgb("#C49A6C") },
];

type Tone = "light" | "dark";

const palettesFor = (tone: Tone): Palette[] =>
  tone === "dark" ? DARK_PALETTES : PALETTES;

function CreasedGradient({ tone = "light" }: { tone?: Tone }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const scroll = useScrollRef();

  const targets = useMemo(
    () =>
      palettesFor(tone).map((p) => ({
        base: new THREE.Vector3(...p.base),
        mid: new THREE.Vector3(...p.mid),
        crest: new THREE.Vector3(...p.crest),
        lip: new THREE.Vector3(...p.lip),
      })),
    [tone],
  );

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uBase: { value: targets[0].base.clone() },
      uMid: { value: targets[0].mid.clone() },
      uCrest: { value: targets[0].crest.clone() },
      uLip: { value: targets[0].lip.clone() },
    }),
    [targets],
  );

  useFrame((state, d) => {
    if (!mat.current) return;
    const u = mat.current.uniforms;
    u.uTime.value += d;
    u.uScroll.value += (scroll.current - u.uScroll.value) * 0.07;
    u.uRes.value.set(state.size.width, state.size.height);

    // crossfade toward whichever palette the figure on stage is wearing
    const t = targets[activeOutfit.index] ?? targets[0];
    const k = 1 - Math.exp(-3.5 * d);
    (u.uBase.value as THREE.Vector3).lerp(t.base, k);
    (u.uMid.value as THREE.Vector3).lerp(t.mid, k);
    (u.uCrest.value as THREE.Vector3).lerp(t.crest, k);
    (u.uLip.value as THREE.Vector3).lerp(t.lip, k);
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={mat}
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

/** fixed full-viewport creased gradient; renders behind the page. "light" is
    v4's paper field, "dark" grades the same fits onto ink for dark pages */
export function FoldBackdrop({ tone = "light" }: { tone?: Tone }) {
  const p = palettesFor(tone)[0];
  const css = (c: Rgb) =>
    `rgb(${Math.round(c[0] * 255)}, ${Math.round(c[1] * 255)}, ${Math.round(c[2] * 255)})`;
  return (
    <Stage
      camera={{ position: [0, 0, 1], fov: 50 }}
      fallback={
        <div
          className="h-full w-full"
          style={{
            background: `linear-gradient(180deg, ${css(p.base)} 0%, ${css(p.mid)} 62%, ${css(p.crest)} 140%)`,
          }}
        />
      }
    >
      <CreasedGradient tone={tone} />
    </Stage>
  );
}
