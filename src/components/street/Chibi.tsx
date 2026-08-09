import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { Stage, useReducedMotion } from "@/components/world/stage";
import { VrmFigure, useModelAvailable, VRM_URL } from "./Vrm";
import { fabricTexture, disposeFabrics, type Fabric } from "./textures";
import { activeOutfit } from "./outfitSync";

/* ============================================================================
   FIELDTRIP — interactive chibi mascot
   Library: react-three-fiber, geometry built from primitives

   WHY IT IS MODELLED IN CODE RATHER THAN LOADED. A GLB would mean shipping
   someone else's asset under someone else's licence, and it could not change
   clothes. Building the figure from spheres, capsules and cone frustums costs
   nothing, has no licence, and means the model can actually wear the drop: the
   three outfits below are the three fits from the catalogue, so the toy and the
   merchandising are the same data.

   The chibi proportions are the whole trick: head radius 1.0 against a torso
   0.55 tall, so the head is roughly 45% of total height. Real chibi is 2 to 3
   heads tall; this sits at about 2.4.

   INTERACTION
     - the head and torso track the pointer, damped, with the head leading
     - click or press Enter on the figure to change outfit
     - idle breathing and a slow bob, both stopped under reduced motion
     - hover lifts the figure and tips it, so it reads as responsive before
       you work out that it is clickable

   ACCESSIBILITY. The canvas is not the only way to use this. Real buttons
   below it change the outfit, the current fit is announced through an
   aria-live region, and under reduced motion or before mount the whole thing
   falls back to a still image. Nothing here is the sole route to any content:
   the fits and the pieces are all in the page's HTML regardless.
   ========================================================================== */

type Outfit = {
  fitId: string;
  name: string;
  skin: string;
  hair: string;
  top: string;
  topAlt: string; // the open layer over the top, or a second panel
  legs: string;
  shoe: string;
  cap: string | null;
  shades: boolean;
  chains: boolean;
  /** the cloth each garment is cut from, per data.ts */
  topFabric: Fabric;
  altFabric: Fabric;
  legFabric: Fabric;
  /** legs are shorts rather than full-length */
  shorts: boolean;
  /** the sculpted model for this fit, when one has been generated */
  model: string;
  /** what the sculpted figure is actually wearing, spoken plainly — the
      caption under the figure describes the model, not the catalogue fit */
  wears: string;
};

const OUTFITS: Outfit[] = [
  {
    fitId: "f1",
    name: "Gallery Day",
    skin: "#f0cfae",
    hair: "#c6cde0",
    top: "#F1EDE3",
    topAlt: "#EFE6D2",
    legs: "#F1EDE3",
    shoe: "#f2f0ea",
    // no shades: the Sun Shade belongs to Rest Day (s17), and this is the fit
    // that shows the face
    cap: null,
    shades: false,
    chains: true,
    shorts: false,
    topFabric: "linen",
    altFabric: "crochet",
    legFabric: "linen",
    model: "/fieldtrip/mascot-euro.mobile.glb",
    wears: "Pale blue shirt, black wide trousers, chain at the hip.",
  },
  {
    fitId: "f2",
    name: "Off Duty",
    skin: "#f0cfae",
    hair: "#c6cde0",
    top: "#F5C518",
    topAlt: "#F5C518",
    legs: "#8FB6D9",
    shoe: "#ffffff",
    cap: "#6B7A42",
    shades: false,
    chains: true,
    shorts: false,
    topFabric: "jersey",
    altFabric: "jersey",
    legFabric: "denim",
    model: "/fieldtrip/mascot-corner.mobile.glb",
    wears: "Backwards red cap, red bandana, white tee, cuffed white jeans.",
  },
  {
    fitId: "f3",
    name: "Rest Day",
    skin: "#f0cfae",
    hair: "#c6cde0",
    top: "#3C6EA8",
    topAlt: "#2B5180",
    legs: "#E2673D",
    shoe: "#141317",
    cap: null,
    shades: true,
    chains: false,
    shorts: true,
    topFabric: "ripstop",
    altFabric: "ripstop",
    legFabric: "mesh",
    model: "/fieldtrip/mascot-rest.mobile.glb",
    wears: "Sweater vest over a white tee, wide brown shorts, white sneakers.",
  },
];

/* --------------------------------------------------------------- the figure */

export function Figure({
  outfit,
  onPick,
  still,
}: {
  outfit: Outfit;
  onPick: () => void;
  still: boolean;
}) {
  const root = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const chest = useRef<THREE.Group>(null);
  const armL = useRef<THREE.Group>(null);
  const armR = useRef<THREE.Group>(null);
  const [hot, setHot] = useState(false);
  const { pointer } = useThree();
  const t = useRef(0);

  useFrame((_, d) => {
    t.current += d;

    // pointer tracking, damped. The head leads and the chest follows at a
    // third of the angle, which is what makes it read as a neck rather than
    // a rigid body rotating.
    const tx = still ? 0 : pointer.x;
    const ty = still ? 0 : pointer.y;

    if (head.current) {
      head.current.rotation.y += (tx * 0.55 - head.current.rotation.y) * 0.08;
      head.current.rotation.x += (-ty * 0.32 - head.current.rotation.x) * 0.08;
    }
    if (chest.current) {
      chest.current.rotation.y += (tx * 0.2 - chest.current.rotation.y) * 0.06;
    }

    if (root.current) {
      const lift = hot ? 0.12 : 0;
      const bob = still ? 0 : Math.sin(t.current * 1.5) * 0.035;
      root.current.position.y += (-0.62 + bob + lift - root.current.position.y) * 0.12;
      const tilt = hot ? -0.08 : 0;
      root.current.rotation.z += (tilt - root.current.rotation.z) * 0.1;
    }

    // breathing: the chest scales a hair on Y, never on X, or it looks inflated
    if (chest.current && !still) {
      const b = 1 + Math.sin(t.current * 2.1) * 0.018;
      chest.current.scale.y = b;
    }

    // arms swing very slightly out of phase with each other
    if (armL.current && armR.current && !still) {
      armL.current.rotation.x = Math.sin(t.current * 1.4) * 0.12;
      armR.current.rotation.x = Math.sin(t.current * 1.4 + 1.1) * 0.12;
    }
  });

  /* Woven material: the same vinyl finish, plus the fabric's colour map and a
     matching bump map so the weave catches the key light. Falls back to the
     plain material during SSR, when there is no canvas to draw on. */
  const cloth = (color: string, fabric: Fabric, repeat = 4, rough = 0.78) => {
    const tex = fabricTexture(fabric, color, repeat);
    if (!tex) return mat(color, rough);
    return (
      <meshPhysicalMaterial
        map={tex.map}
        bumpMap={tex.bump}
        bumpScale={fabric === "crochet" || fabric === "mesh" ? 0.14 : 0.055}
        roughness={rough}
        metalness={0}
        clearcoat={fabric === "ripstop" ? 0.7 : 0.25}
        clearcoatRoughness={fabric === "ripstop" ? 0.2 : 0.5}
        sheen={fabric === "linen" || fabric === "jersey" ? 0.5 : 0.2}
        sheenRoughness={0.75}
        sheenColor="#ffffff"
      />
    );
  };

  /* The designer-toy finish is a matte body with a thin gloss coat over it.
     meshPhysicalMaterial's clearcoat does exactly that in one pass, and it is
     what separates "vinyl figure" from "flat coloured shape". */
  const mat = (color: string, rough = 0.62) => (
    <meshPhysicalMaterial
      color={color}
      roughness={rough}
      metalness={0}
      clearcoat={0.55}
      clearcoatRoughness={0.35}
      sheen={0.3}
      sheenRoughness={0.7}
      sheenColor="#ffffff"
      /* the hair cones are open-ended so their base caps can't read as teeth
         along the hairline; double-sided so the open rims don't show through */
      side={THREE.DoubleSide}
    />
  );

  return (
    <group
      ref={root}
      position={[0, -0.62, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHot(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHot(false);
        document.body.style.cursor = "";
      }}
      onClick={(e) => {
        e.stopPropagation();
        onPick();
      }}
    >
      {/* ---------------------------------------------------------- head */}
      <group ref={head} position={[0, 1.28, 0]}>
        {/* squashed sphere: chibi heads are wider than they are tall */}
        <mesh scale={[1, 0.94, 0.96]} castShadow>
          <sphereGeometry args={[0.82, 64, 48]} />
          {mat(outfit.skin, 0.62)}
        </mesh>

        {/* HAIR — the reference's whole read: silver curtain hair, parted in
            the middle, long layered strands framing the face to the jaw and a
            shoulder-length fan at the back. Built from flattened cones over a
            smooth skull shell; the cones are pointed pieces, not spikes, so
            they read as sculpted Nendoroid hair. */}
        <mesh scale={[1.06, 1.02, 1.08]} position={[0, 0.03, -0.06]}>
          <sphereGeometry args={[0.83, 36, 28, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          {mat(outfit.hair, 0.5)}
        </mesh>

        {/* fringe: seven pointed strands swept off a centre part, tips ending
            at the lash line the way the reference bangs do */}
        {(
          [
            [-0.6, 0.36, 0.32, 0.55, -0.35, 0.3, 0.62, 0.22],
            [-0.4, 0.37, 0.48, 0.32, -0.33, 0.32, 0.74, 0.24],
            [-0.17, 0.38, 0.58, 0.13, -0.3, 0.33, 0.66, 0.24],
            [0.03, 0.38, 0.61, -0.06, -0.3, 0.33, 0.58, 0.24],
            [0.24, 0.37, 0.57, -0.17, -0.3, 0.33, 0.68, 0.24],
            [0.46, 0.36, 0.46, -0.36, -0.33, 0.32, 0.76, 0.24],
            [0.64, 0.33, 0.3, -0.58, -0.35, 0.3, 0.6, 0.22],
          ] as [number, number, number, number, number, number, number, number][]
        ).map(([lx, ly, lz, rz, rx, sx, sy, sz], n) => (
          <mesh
            key={`fringe${n}`}
            position={[lx, ly, lz]}
            rotation={[Math.PI + rx, 0, rz]}
            scale={[sx, sy, sz]}
          >
            <coneGeometry args={[0.5, 1, 8, 1, true]} />
            {mat(outfit.hair, 0.55)}
          </mesh>
        ))}

        {/* side locks: the long face-framing strands that reach the jaw */}
        {(
          [
            [-0.74, 0.05, 0.22, 0.2, 0.02, 0.34, 1.45, 0.26],
            [-0.7, 0.1, -0.05, 0.12, 0.0, 0.32, 1.25, 0.26],
            [0.74, 0.05, 0.22, -0.2, 0.02, 0.34, 1.45, 0.26],
            [0.7, 0.1, -0.05, -0.12, 0.0, 0.32, 1.25, 0.26],
          ] as [number, number, number, number, number, number, number, number][]
        ).map(([lx, ly, lz, rz, rx, sx, sy, sz], n) => (
          <mesh
            key={`side${n}`}
            position={[lx, ly, lz]}
            rotation={[Math.PI + rx, 0, rz]}
            scale={[sx, sy, sz]}
          >
            <coneGeometry args={[0.5, 1, 8, 1, true]} />
            {mat(outfit.hair, 0.55)}
          </mesh>
        ))}

        {/* back: a smooth shell plus a five-piece fan down to the shoulders */}
        <mesh scale={[1.04, 1.02, 1.02]} position={[0, -0.02, -0.14]}>
          <sphereGeometry args={[0.83, 36, 28, 0, Math.PI * 2, 0, Math.PI * 0.72]} />
          {mat(outfit.hair, 0.55)}
        </mesh>
        {(
          [
            [-0.55, 0.1, -0.5, 0.3, 0.12, 0.36, 1.3, 0.28],
            [-0.28, 0.12, -0.62, 0.14, 0.14, 0.38, 1.4, 0.3],
            [0.0, 0.12, -0.66, 0.0, 0.15, 0.4, 1.45, 0.3],
            [0.28, 0.12, -0.62, -0.14, 0.14, 0.38, 1.4, 0.3],
            [0.55, 0.1, -0.5, -0.3, 0.12, 0.36, 1.3, 0.28],
          ] as [number, number, number, number, number, number, number, number][]
        ).map(([lx, ly, lz, rz, rx, sx, sy, sz], n) => (
          <mesh
            key={`back${n}`}
            position={[lx, ly, lz]}
            rotation={[Math.PI + rx, 0, rz]}
            scale={[sx, sy, sz]}
          >
            <coneGeometry args={[0.5, 1, 8, 1, true]} />
            {mat(outfit.hair, 0.55)}
          </mesh>
        ))}

        {/* EYES — anime figure style: the iris is enormous and teal with a dark
            rim and pupil, not a dome of near-black. Stack: sclera, rim, iris,
            pupil, two catchlights, upper lash. */}
        {[-0.3, 0.3].map((x) => (
          <group key={x} position={[x, 0.0, 0.7]}>
            <mesh scale={[1, 1.32, 0.52]}>
              <sphereGeometry args={[0.175, 32, 24]} />
              <meshPhysicalMaterial
                color="#fdfbf7"
                roughness={0.22}
                clearcoat={1}
                clearcoatRoughness={0.04}
              />
            </mesh>
            <mesh position={[0, -0.012, 0.056]} scale={[1, 1.2, 0.4]}>
              <sphereGeometry args={[0.128, 32, 24]} />
              <meshPhysicalMaterial
                color="#17584c"
                roughness={0.12}
                clearcoat={1}
                clearcoatRoughness={0.04}
              />
            </mesh>
            <mesh position={[0, -0.012, 0.062]} scale={[1, 1.18, 0.4]}>
              <sphereGeometry args={[0.112, 32, 24]} />
              <meshPhysicalMaterial
                color="#3aa795"
                roughness={0.1}
                clearcoat={1}
                clearcoatRoughness={0.03}
              />
            </mesh>
            <mesh position={[0, -0.012, 0.104]} scale={[1, 1.25, 0.32]}>
              <sphereGeometry args={[0.05, 20, 14]} />
              <meshPhysicalMaterial
                color="#0f2c26"
                roughness={0.15}
                clearcoat={1}
                clearcoatRoughness={0.05}
              />
            </mesh>
            <mesh position={[x > 0 ? 0.048 : -0.048, 0.058, 0.108]}>
              <sphereGeometry args={[0.042, 16, 12]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
            <mesh position={[x > 0 ? -0.032 : 0.032, -0.052, 0.1]}>
              <sphereGeometry args={[0.02, 12, 10]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.65} />
            </mesh>
            {/* the upper lash line — dark slate, not hair colour, or it
                vanishes against silver */}
            <mesh position={[0, 0.118, 0.045]} scale={[1.04, 0.26, 0.42]}>
              <sphereGeometry args={[0.172, 24, 14]} />
              {mat("#343a44", 0.5)}
            </mesh>
          </group>
        ))}

        {/* thin light brows, lowered to peek out under the fringe */}
        {[-0.3, 0.3].map((x) => (
          <mesh
            key={`brow${x}`}
            position={[x, 0.235, 0.74]}
            rotation={[0, 0, x > 0 ? -0.14 : 0.14]}
            scale={[0.9, 0.2, 0.24]}
          >
            <sphereGeometry args={[0.12, 20, 12]} />
            {mat("#8a8f9c", 0.62)}
          </mesh>
        ))}
        {/* the reference mouth is a tiny neat shape high on the face */}
        <mesh position={[0, -0.31, 0.745]} scale={[1, 0.6, 0.34]}>
          <sphereGeometry args={[0.046, 20, 14]} />
          <meshPhysicalMaterial
            color="#a05a50"
            roughness={0.3}
            clearcoat={0.85}
            clearcoatRoughness={0.1}
          />
        </mesh>

        {/* the blush that makes it a chibi rather than a doll */}
        {[-0.45, 0.45].map((x) => (
          <mesh key={x} position={[x, -0.17, 0.7]} rotation={[0, x > 0 ? -0.42 : 0.42, 0]}>
            <circleGeometry args={[0.11, 20]} />
            <meshBasicMaterial color="#e8846f" transparent opacity={0.45} />
          </mesh>
        ))}

        {outfit.shades && (
          <group position={[0, 0.02, 0.8]}>
            {/* one-piece wrap lens, which is what the source styling uses */}
            <RoundedBox
              args={[0.98, 0.21, 0.24]}
              radius={0.055}
              smoothness={4}
              scale={[1, 1, 0.45]}
            >
              <meshPhysicalMaterial
                color="#141317"
                roughness={0.08}
                metalness={0.2}
                clearcoat={1}
                clearcoatRoughness={0.04}
              />
            </RoundedBox>
            {[-0.47, 0.47].map((x) => (
              <mesh key={x} position={[x, 0.02, -0.19]} rotation={[0, x > 0 ? 0.62 : -0.62, 0]}>
                <boxGeometry args={[0.3, 0.07, 0.05]} />
                {mat("#141317", 0.3)}
              </mesh>
            ))}
          </group>
        )}

        {outfit.cap && (
          <group position={[0, 0.62, 0.02]}>
            <mesh scale={[1, 0.6, 1]} position={[0, -0.04, 0]}>
              <sphereGeometry args={[0.845, 44, 24, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
              {mat(outfit.cap, 0.8)}
            </mesh>
            {/* The brim. A half-cylinder read as a flat plank across the face
                because its theta arc faced sideways; a squashed dome pushed
                forward gives a curved peak whose back half hides inside the
                crown, so it only projects at the front. Low and long, per the
                Trail Cap. */}
            <mesh position={[0, -0.07, 0.3]} rotation={[-0.1, 0, 0]} scale={[1.02, 0.085, 1.42]}>
              <sphereGeometry args={[0.6, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
              {mat(outfit.cap, 0.72)}
            </mesh>
          </group>
        )}
      </group>

      {/* --------------------------------------------------------- torso */}
      <group ref={chest} position={[0, 0.52, 0]}>
        {/* the boxy oversized tee. A box, because the copy says boxy. */}
        <RoundedBox args={[1.06, 0.78, 0.62]} radius={0.14} smoothness={5} castShadow receiveShadow>
          {cloth(outfit.top, outfit.topFabric, 1.6)}
        </RoundedBox>

        {/* the open layer: two panels hanging either side of the front. They
            sit at the torso's side edge, shallower than the torso, so the arms
            stay visible in front of them — otherwise the figure reads as
            holding two posts. */}
        {outfit.topAlt !== outfit.top &&
          [-0.6, 0.6].map((x) => (
            <RoundedBox
              key={x}
              args={[0.15, 0.92, 0.56]}
              radius={0.06}
              smoothness={4}
              position={[x, -0.06, -0.04]}
              rotation={[0, 0, x > 0 ? -0.08 : 0.08]}
              castShadow
            >
              {cloth(outfit.topAlt, outfit.altFabric, 1.4)}
            </RoundedBox>
          ))}

        {outfit.chains && (
          /* negative tilt: the ring's low edge swings out over the chest. With
             a positive tilt the front edge tucks up under the chin and the
             oversized head occludes the whole thing — the chains rendered but
             were never visible. Kept high and shallow: any lower and the arc
             floats off the chest, any higher and it reads as a smile. */
          <mesh position={[0, 0.08, 0.34]} rotation={[-0.5, 0, 0]}>
            <torusGeometry args={[0.26, 0.028, 10, 40]} />
            <meshStandardMaterial color="#d8d8de" roughness={0.22} metalness={0.85} />
          </mesh>
        )}

        {/* arms: stubby capsules, wide sleeves implied by the shoulder box */}
        <group ref={armL} position={[-0.62, 0.2, 0.06]}>
          <mesh position={[0, -0.24, 0]} rotation={[0, 0, 0.12]}>
            <capsuleGeometry args={[0.15, 0.34, 10, 32]} />
            {cloth(outfit.top, outfit.topFabric, 1.2)}
          </mesh>
          <mesh position={[-0.04, -0.58, 0]}>
            <sphereGeometry args={[0.145, 32, 24]} />
            {mat(outfit.skin, 0.62)}
          </mesh>
        </group>
        <group ref={armR} position={[0.62, 0.2, 0.06]}>
          <mesh position={[0, -0.24, 0]} rotation={[0, 0, -0.12]}>
            <capsuleGeometry args={[0.15, 0.34, 10, 32]} />
            {cloth(outfit.top, outfit.topFabric, 1.2)}
          </mesh>
          <mesh position={[0.04, -0.58, 0]}>
            <sphereGeometry args={[0.145, 32, 24]} />
            {mat(outfit.skin, 0.62)}
          </mesh>
        </group>
      </group>

      {/* ---------------------------------------------------------- legs */}
      {[-0.24, 0.24].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          {/* cone frustum, narrow at the hip and wide at the floor: this is
              the Puddle Jean silhouette, and it is why the figure reads as
              wearing these clothes and not generic trousers */}
          <mesh position={[0, outfit.shorts ? -0.02 : -0.24, 0]} castShadow>
            <cylinderGeometry
              args={outfit.shorts ? [0.24, 0.34, 0.42, 40] : [0.25, 0.44, 0.86, 44]}
            />
            {cloth(outfit.legs, outfit.legFabric, outfit.shorts ? 1.0 : 0.8)}
          </mesh>

          {outfit.shorts && (
            <mesh position={[0, -0.42, 0]}>
              <capsuleGeometry args={[0.12, 0.3, 6, 16]} />
              {mat(outfit.skin, 0.62)}
            </mesh>
          )}

          {/* chunky shoe */}
          <RoundedBox
            args={[0.34, 0.19, 0.56]}
            radius={0.075}
            smoothness={5}
            position={[x > 0 ? 0.02 : -0.02, -0.72, 0.09]}
            castShadow
          >
            {mat(outfit.shoe, 0.45)}
          </RoundedBox>
        </group>
      ))}

      {/* The display base. Every figurine in the reference sits on one, and it
          is the cheapest single cue that says "collectible figure" rather than
          "cartoon character". The sole sits at root-relative -0.815 (shoe
          centre -0.72, half height 0.095), so the group goes at -0.865 for the
          top plate to meet it; any lower and the figure floats off the base. */}
      <group position={[0, -0.865, 0]}>
        <mesh receiveShadow>
          <cylinderGeometry args={[0.86, 0.94, 0.1, 56]} />
          <meshPhysicalMaterial
            color="#1b1a1f"
            roughness={0.32}
            metalness={0.12}
            clearcoat={0.9}
            clearcoatRoughness={0.14}
          />
        </mesh>
        <mesh position={[0, 0.058, 0]} receiveShadow>
          <cylinderGeometry args={[0.8, 0.86, 0.022, 56]} />
          <meshPhysicalMaterial
            color="#2b2a32"
            roughness={0.26}
            clearcoat={1}
            clearcoatRoughness={0.08}
          />
        </mesh>
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------- export */

/** every model file the hero can use: a rigged VRM wins outright, otherwise
    each fit wears its own sculpted glb. Pages that collect per-fit VRM
    replicas pass them in and those join the probe. */
const GLB_CANDIDATES = OUTFITS.map((o) => o.model);

export function ChibiHero({
  fallbackSrc,
  vrmUrls,
  layout = "framed",
  outfitIndex,
  onOutfitChange,
  showControls = true,
}: {
  fallbackSrc: string;
  /** one .vrm replica per outfit, in OUTFITS order; a present replica
      outranks that fit's glb but not a shared mascot.vrm */
  vrmUrls?: readonly string[];
  /** "framed" is the bordered 3:4 card; "stage" is an unframed full-bleed
      block for the figure-shop pages */
  layout?: "framed" | "stage" | "map";
  /** Optional controlled outfit index for destination-led hero layouts. */
  outfitIndex?: number;
  onOutfitChange?: (index: number) => void;
  showControls?: boolean;
}) {
  const [internalIndex, setInternalIndex] = useState(0);
  const controlledIndex =
    typeof outfitIndex === "number"
      ? Math.max(0, Math.min(OUTFITS.length - 1, outfitIndex))
      : undefined;
  const i = controlledIndex ?? internalIndex;
  const reduced = useReducedMotion();
  const outfit = OUTFITS[i];
  const stageRef = useRef<HTMLDivElement>(null);
  const [stageVisible, setStageVisible] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    if (!("IntersectionObserver" in window)) {
      setStageVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => setStageVisible(entry.isIntersecting), {
      rootMargin: "100% 0px",
    });
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  const selectOutfit = useCallback(
    (index: number) => {
      if (controlledIndex === undefined) setInternalIndex(index);
      onOutfitChange?.(index);
    },
    [controlledIndex, onOutfitChange],
  );

  const next = useCallback(() => selectOutfit((i + 1) % OUTFITS.length), [i, selectOutfit]);

  // publish the active fit so the v4 backdrop can retint itself per frame
  useEffect(() => {
    activeOutfit.index = i;
  }, [i]);

  // the fabric canvases are cached module-wide, so release them on unmount
  useEffect(() => () => disposeFabrics(), []);

  /* Five tiers, best first: a shared rigged VRM if one has been dropped in,
     then this fit's VRM replica, then the fit's sculpted GLB, then the
     procedural chibi, and a still image if there is no GL at all or the
     visitor asked for reduced motion. A model file can also fail at parse
     time, and `vrmBroken` demotes it for the rest of the session. */
  const candidates = useMemo(() => [VRM_URL, ...(vrmUrls ?? []), ...GLB_CANDIDATES], [vrmUrls]);
  const modelProbe = useModelAvailable(candidates);
  const [vrmBroken, setVrmBroken] = useState(false);
  const replicaUrl = vrmUrls?.[i];
  const modelUrl =
    modelProbe.state === "ready" && !vrmBroken
      ? modelProbe.present.has(VRM_URL)
        ? VRM_URL
        : replicaUrl && modelProbe.present.has(replicaUrl)
          ? replicaUrl
          : modelProbe.present.has(outfit.model)
            ? outfit.model
            : undefined
      : undefined;
  const onVrmFail = useCallback((reason: string) => {
    console.warn(`[FIELDTRIP] model unavailable, using the procedural chibi: ${reason}`);
    setVrmBroken(true);
  }, []);

  // Alternate fits are large. Warm them one at a time when the browser is
  // idle so they never compete with the model visible in the opening frame.
  useEffect(() => {
    if (!stageVisible || modelProbe.state !== "ready") return;
    let cancelled = false;
    const alternates = [...modelProbe.present].filter((url) => url !== GLB_CANDIDATES[0]);
    const warmAlternates = async () => {
      for (const url of alternates) {
        if (cancelled) return;
        try {
          const response = await fetch(url, { cache: "force-cache" });
          await response.arrayBuffer();
        } catch {
          // A missing optional model falls through to the procedural figure.
        }
      }
    };
    const idleId = window.requestIdleCallback(() => void warmAlternates(), { timeout: 4000 });
    return () => {
      cancelled = true;
      window.cancelIdleCallback(idleId);
    };
  }, [modelProbe, stageVisible]);

  return (
    <div className={layout === "map" ? "h-full" : undefined}>
      <div
        ref={stageRef}
        className={
          layout === "stage"
            ? "ft-chibi-stage relative h-[min(74vh,880px)] w-full"
            : layout === "map"
              ? "ft-chibi-stage relative h-full w-full"
              : "ft-chibi-stage relative aspect-[3/4] w-full overflow-hidden"
        }
      >
        <Stage
          active={stageVisible}
          /* the stage layout has more viewport to fill, so the camera moves in.
             The framed camera is tuned for the sculpted GLBs (2.35 units); the
             taller procedural fallback still just fits at this distance. */
          camera={
            layout === "stage"
              ? { position: [0, 0.3, 4.6], fov: 36 }
              : layout === "map"
                ? { position: [0, 0.12, 8], fov: 34 }
                : { position: [0, 0.05, 4.9], fov: 38 }
          }
          dpr={layout === "map" ? [1, 1.35] : [1, 2]}
          antialias
          shadows
          /* no still while the model loads: the space stays empty until the
             figure arrives. The photo fallback only remains for reduced
             motion, where there is no GL at all. */
          fallback={
            reduced ? (
              <img
                src={fallbackSrc}
                alt="A full look from the drop: graphic tee under an open crochet shirt with wide jeans."
                width={900}
                height={1200}
                className="h-full w-full object-cover"
              />
            ) : null
          }
        >
          {/* A studio built out of lightformers rather than an HDR file. drei's
              Environment presets fetch from a CDN, and this page has no other
              external asset dependency, so the env map is rendered in-scene:
              soft box reflections in the clearcoat, no network. */}
          <Environment resolution={layout === "map" ? 128 : 256}>
            <Lightformer
              form="rect"
              intensity={2.4}
              position={[2.5, 3, 3]}
              scale={[6, 6, 1]}
              target={[0, 0, 0]}
            />
            <Lightformer
              form="rect"
              intensity={0.9}
              position={[-3.5, 1, -1]}
              scale={[5, 5, 1]}
              color="#a8c4e0"
              target={[0, 0, 0]}
            />
            <Lightformer
              form="ring"
              intensity={0.7}
              position={[0, -2, 2]}
              scale={3}
              color="#ffe9c9"
              target={[0, 0, 0]}
            />
          </Environment>

          <ambientLight intensity={0.4} />
          {/* the key, and the only caster: one crisp shadow reads better than
              three overlapping soft ones on a figure this small */}
          <directionalLight
            position={[2.6, 4.4, 3.2]}
            intensity={2.1}
            castShadow
            shadow-mapSize={layout === "map" ? [512, 512] : [1024, 1024]}
            shadow-bias={-0.0012}
            shadow-normalBias={0.02}
          />
          <directionalLight position={[-4, 1, -2]} intensity={0.35} color="#9fb8d6" />

          {/* the real grounded shadow that replaced the painted disc. On the
              dark figure-shop stage the page-ink colour disappears, so the
              stage gets a deeper pool instead. */}
          <ContactShadows
            position={[0, -1.58, 0]}
            opacity={layout === "stage" ? 0.55 : layout === "map" ? 0.22 : 0.28}
            scale={4.4}
            blur={2.6}
            far={2.2}
            resolution={layout === "map" ? 256 : 512}
            color="#000000"
          />
          {modelUrl ? (
            <VrmFigure
              url={modelUrl}
              still={reduced}
              onPick={next}
              onFail={onVrmFail}
              loadingFallback={<Figure outfit={outfit} onPick={next} still={reduced} />}
              /* the rig's garment meshes for the fits we are not wearing */
              hide={OUTFITS.filter((o) => o !== outfit).map((o) => o.name)}
            />
          ) : (
            <Figure outfit={outfit} onPick={next} still={reduced} />
          )}
        </Stage>

        {/* the hint. Decorative: the button below does the same job. */}
        {layout === "framed" && (
          <p
            className="lbl pointer-events-none absolute bottom-3 left-3 px-2 py-1"
            style={{ background: "var(--ink)", color: "var(--paper)" }}
            aria-hidden
          >
            Tap to change fit
          </p>
        )}
      </div>

      {/* real controls, so the model is never the only way through */}
      {showControls && (
        <div className="ft-fit-controls mt-3 flex flex-wrap items-center gap-2">
          <button className="chip" onClick={next}>
            Change the fit
          </button>
          {OUTFITS.map((o, n) => (
            <button
              key={o.fitId}
              className="chip"
              aria-pressed={n === i}
              onClick={() => selectOutfit(n)}
            >
              {o.name}
            </button>
          ))}
        </div>
      )}

      {/* every fit takes two lines, whether its description wraps or not:
          Gallery Day's short text no longer pulls the layout up a line when
          the other two wrap. lineHeight is inline because the page's .ft p
          rule outranks a utility class, and a fractional mismatch shifted
          the whole hero (the tagline shares an items-end row with this
          column) by a few pixels on the short fits. mt-4 gives it air from
          the chips */}
      {showControls && (
        <p
          className="ft-fit-description lbl mt-4 min-h-[2.8em]"
          aria-live="polite"
          style={{ lineHeight: 1.4, color: "var(--dim)" }}
        >
          Wearing: {outfit.name} · {outfit.wears}
        </p>
      )}
    </div>
  );
}
