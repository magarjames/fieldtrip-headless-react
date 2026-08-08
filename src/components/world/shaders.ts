/**
 * GLSL for the /w versions.
 *
 * Each program is written for this project rather than lifted from a gallery:
 * the palette uniforms are the NORTHLINE tokens, and every one of them takes
 * uScroll so the page's scroll position is an input to the image rather than
 * something layered on top of it afterwards.
 *
 * Shared conventions: uTime seconds, uScroll 0 to 1, uPointer in clip space,
 * uRes pixels. Colours arrive as vec3 in linear-ish sRGB, close enough for
 * decorative work and cheaper than a full transfer.
 */

/** classic 2D value noise + fbm, used by several of the fragment programs */
export const NOISE = /* glsl */ `
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
      mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x),
      u.y);
  }

  float fbm(vec2 p){
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++){
      v += a * noise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }
`;

/* ---------------------------------------------------------------- CLOTH ---
   A plane displaced by two crossed travelling waves plus fbm, so it reads as
   heavy fabric settling rather than water. Scroll increases the amplitude and
   drags the wave phase, so the cloth "falls" as the page moves.
--------------------------------------------------------------------------- */

export const CLOTH_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  varying vec2 vUv;
  varying float vShade;

  ${NOISE}

  void main(){
    vUv = uv;
    vec3 p = position;

    float amp = 0.16 + uScroll * 0.42;
    float phase = uTime * 0.42 + uScroll * 5.2;

    float w =
        sin(p.x * 1.9 + phase) * 0.5
      + sin(p.y * 2.7 - phase * 0.8) * 0.35
      + (fbm(p.xy * 0.9 + phase * 0.12) - 0.5) * 1.15;

    p.z += w * amp;

    // cheap lambert-ish term from the analytic slope, no normals needed
    float dx = cos(p.x * 1.9 + phase) * 1.9 * 0.5;
    vShade = clamp(0.5 + dx * 0.34, 0.0, 1.0);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

export const CLOTH_FRAG = /* glsl */ `
  precision highp float;
  uniform vec3 uWarp;    // the dominant cloth colour
  uniform vec3 uWeft;    // the cross-thread colour
  uniform vec3 uAccent;  // the single warm note
  uniform float uScroll;
  varying vec2 vUv;
  varying float vShade;

  void main(){
    vec3 base = mix(uWarp, uWeft, vShade);

    // the weave itself: two out-of-phase stripe fields multiplied together
    float warp = smoothstep(0.42, 0.58, fract(vUv.x * 220.0));
    float weft = smoothstep(0.42, 0.58, fract(vUv.y * 220.0));
    float weave = mix(0.94, 1.06, warp * 0.5 + weft * 0.5);

    // the accent only surfaces in the troughs, and only once scrolled in
    float pool = smoothstep(0.62, 0.18, vShade) * uScroll * 0.5;
    vec3 col = base * weave + uAccent * pool;

    // vignette so the plane never shows a hard edge against the page
    float d = distance(vUv, vec2(0.5));
    col *= smoothstep(0.86, 0.24, d);

    gl_FragColor = vec4(col, 1.0);
  }
`;

/* ----------------------------------------------------------------- FOLD ---
   Samples a real garment photograph and folds it: uv displaced along a noise
   field whose strength is driven by scroll, with a chromatic split at the
   fold lines so the paper-thin distortion reads as material, not a filter.
--------------------------------------------------------------------------- */

export const FOLD_FRAG = /* glsl */ `
  precision highp float;
  uniform sampler2D uTex;
  uniform float uTime;
  uniform float uScroll;
  uniform vec3 uAccent;
  varying vec2 vUv;

  ${NOISE}

  void main(){
    vec2 uv = vUv;

    float n = fbm(uv * 3.4 + uTime * 0.06);
    float creases = abs(sin((uv.y + n * 0.35) * 22.0 + uScroll * 3.0));
    float strength = (0.012 + uScroll * 0.05);

    vec2 off = vec2(n - 0.5, creases - 0.5) * strength;

    // split the channels across the fold so edges show material dispersion
    float r = texture2D(uTex, uv + off * 1.16).r;
    float g = texture2D(uTex, uv + off).g;
    float b = texture2D(uTex, uv + off * 0.84).b;
    vec3 col = vec3(r, g, b);

    // the crease highlight, tinted with the accent rather than plain white
    float lip = smoothstep(0.94, 1.0, creases) * (0.25 + uScroll * 0.4);
    col += uAccent * lip * 0.5;

    col *= smoothstep(1.05, 0.35, distance(uv, vec2(0.5)));
    gl_FragColor = vec4(col, 1.0);
  }
`;

/* ----------------------------------------------------------------- KILN ---
   A dark volumetric field: layered fbm marched in 2D to fake depth, lit from
   one side. Scroll pushes the light across and thins the medium.
--------------------------------------------------------------------------- */

export const KILN_FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uRes;
  uniform vec3 uDeep;
  uniform vec3 uEmber;
  varying vec2 vUv;

  ${NOISE}

  void main(){
    vec2 uv = (vUv - 0.5) * vec2(uRes.x / max(uRes.y, 1.0), 1.0);

    float t = uTime * 0.05;
    float density = 0.0;

    // four slabs at different depths, each drifting at its own rate
    for (int i = 0; i < 4; i++){
      float fi = float(i);
      vec2 p = uv * (1.0 + fi * 0.55) + vec2(t * (0.4 + fi * 0.2), -t * 0.3 + uScroll * (0.6 + fi * 0.3));
      density += fbm(p * 1.6) * (0.34 - fi * 0.06);
    }

    // one directional source, swung across by scroll
    vec2 lightPos = vec2(-0.6 + uScroll * 1.4, 0.35);
    float lit = 1.0 - smoothstep(0.0, 1.35, distance(uv, lightPos));

    float body = smoothstep(0.28, 0.86, density);
    vec3 col = mix(uDeep, uEmber, body * lit * (0.5 + uScroll * 0.7));
    col += uEmber * pow(lit, 3.4) * 0.16;

    col *= smoothstep(1.25, 0.28, length(uv));
    gl_FragColor = vec4(col, 1.0);
  }
`;

/* ---------------------------------------------------------------- WEAVE ---
   Instanced lattice. The vertex program offsets each instance on a lissajous
   path so the grid breathes like a loom under tension.
--------------------------------------------------------------------------- */

export const WEAVE_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  attribute vec3 iOffset;
  attribute float iSeed;
  varying float vDepth;
  varying float vSeed;

  void main(){
    vSeed = iSeed;

    vec3 o = iOffset;
    float t = uTime * 0.5 + iSeed * 6.28;

    o.z += sin(t + o.x * 0.6) * (0.22 + uScroll * 0.9);
    o.x += cos(t * 0.7 + o.y * 0.5) * 0.12 * uScroll;

    vec3 p = position + o;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vDepth = clamp(-mv.z / 26.0, 0.0, 1.0);

    gl_Position = projectionMatrix * mv;
  }
`;

export const WEAVE_FRAG = /* glsl */ `
  precision highp float;
  uniform vec3 uThread;
  uniform vec3 uAccent;
  uniform float uScroll;
  varying float vDepth;
  varying float vSeed;

  void main(){
    // one thread in roughly twelve takes the accent, chosen by its seed
    float pick = step(0.92, fract(vSeed * 7.31));
    vec3 col = mix(uThread, uAccent, pick * (0.35 + uScroll * 0.65));

    // fade with depth so the lattice recedes instead of stacking flat
    float fade = 1.0 - vDepth;
    gl_FragColor = vec4(col * (0.35 + fade * 0.65), fade * 0.85);
  }
`;

/** the plain full-screen vertex program the fragment-only effects pair with */
export const QUAD_VERT = /* glsl */ `
  varying vec2 vUv;
  void main(){
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

/** NORTHLINE tokens as GL-ready triples, so the shaders and the CSS agree */
export const GL_PALETTE = {
  void: [0.02, 0.02, 0.02],
  ink: [0.96, 0.95, 0.93],
  rust: [0.71, 0.33, 0.23],
  olive: [0.42, 0.42, 0.29],
  stone: [0.66, 0.63, 0.59],
  smoke: [0.36, 0.42, 0.47],
  band: [0.04, 0.04, 0.04],
} as const;
