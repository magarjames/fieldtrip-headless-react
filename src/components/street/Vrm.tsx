import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Center } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { VRMLoaderPlugin, VRMUtils, type VRM } from "@pixiv/three-vrm";

/* ============================================================================
   Loaded-model figure for the FIELDTRIP hero.

   TWO MODEL FORMATS, ONE SLOT. A .vrm is preferred: it arrives with a
   normalised humanoid rig and named bones, so the head still follows the
   cursor and garment meshes can be toggled per outfit. A plain .glb (which is
   what AI 3D generators like Meshy or Tripo export) has no guaranteed rig, so
   it gets the same interaction at whole-model level instead: the figure turns
   to face the pointer, bobs, and lifts on hover. Either drops into
   public/fieldtrip/ with no code change; the .vrm wins when both exist.

   NOTHING IS REQUIRED TO EXIST. No model file is committed to this repo, on
   purpose: shipping someone else's avatar would drag their licence in with
   it. The component probes for the files, and if both are absent, unreadable,
   or the parse fails, it reports back and the caller falls through to the
   procedural chibi.

   Sourcing, when you add one:
   - VRoid Studio (free) — build the character yourself and own it outright;
     export .vrm. This is the recommended route.
   - VRoid Hub — models carry per-author permission flags; check individually.
   - Meshy / Tripo image-to-3D — exports .glb. Check the plan's commercial
     terms, and style the prompt original rather than tracing an existing
     character: the page's own footer promises no real person or likeness.
   ========================================================================== */

export const VRM_URL = "/fieldtrip/mascot.vrm";
/** one sculpted model per fit, in catalogue order (f1, f2, f3) */

export type ModelProbe =
  | { state: "checking" }
  | { state: "ready"; present: ReadonlySet<string> };

/** HEAD-probe every candidate so the caller can decide before mounting a Canvas */
export function useModelAvailable(urls: readonly string[]): ModelProbe {
  const [probe, setProbe] = useState<ModelProbe>({ state: "checking" });
  useEffect(() => {
    let live = true;
    (async () => {
      const present = new Set<string>();
      await Promise.all(
        urls.map(async (url) => {
          try {
            const r = await fetch(url, { method: "HEAD" });
            // a dev server that rewrites unknown paths to index.html will answer
            // 200 with HTML, so the content type has to be checked too
            const ct = r.headers.get("content-type") ?? "";
            if (r.ok && !ct.includes("text/html")) present.add(url);
          } catch {
            // unreachable — simply not added
          }
        }),
      );
      if (live) setProbe({ state: "ready", present });
    })();
    return () => {
      live = false;
    };
    // callers pass a module-level constant
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return probe;
}

type Loaded = { kind: "vrm"; vrm: VRM } | { kind: "glb"; scene: THREE.Group };

type Props = {
  url?: string;
  /** hide these mesh names, which is how the outfit swap survives a rig */
  hide?: string[];
  still: boolean;
  onPick: () => void;
  onFail: (reason: string) => void;
};

/** a loaded figure is scaled so its height matches the procedural chibi */
const FIGURE_HEIGHT = 2.35;

export function VrmFigure({ url = VRM_URL, hide = [], still, onPick, onFail }: Props) {
  const [model, setModel] = useState<Loaded | null>(null);
  const { pointer } = useThree();
  const glbRoot = useRef<THREE.Group>(null);
  const t = useRef(0);
  const hot = useRef(false);

  useEffect(() => {
    let live = true;
    const loader = new GLTFLoader();
    loader.register((parser) => new VRMLoaderPlugin(parser));

    loader.load(
      url,
      (gltf) => {
        if (!live) return;
        const vrm = gltf.userData.vrm as VRM | undefined;
        if (vrm) {
          // VRM 0.x faces the opposite way to 1.0; this normalises both
          VRMUtils.rotateVRM0(vrm);
          // trim what we will never draw, and merge skeletons for fewer draws
          VRMUtils.removeUnnecessaryVertices(vrm.scene);
          VRMUtils.combineSkeletons(vrm.scene);
          vrm.scene.traverse((o) => {
            o.frustumCulled = false;
          });
          setModel({ kind: "vrm", vrm });
          return;
        }
        // no VRM extension: treat it as a plain sculpted model. Generators
        // export at arbitrary scales, so normalise height to the figure slot.
        const scene = gltf.scene;
        const size = new THREE.Box3().setFromObject(scene).getSize(new THREE.Vector3());
        if (size.y > 0) scene.scale.setScalar(FIGURE_HEIGHT / size.y);
        scene.traverse((o) => {
          o.frustumCulled = false;
        });
        setModel({ kind: "glb", scene });
      },
      undefined,
      () => live && onFail("could not parse the model file"),
    );

    return () => {
      live = false;
    };
  }, [url, onFail]);

  // garment visibility, which is the outfit swap on a rigged model. Harmless
  // on a plain glb: generated meshes simply never match the names.
  useEffect(() => {
    if (!model) return;
    const root = model.kind === "vrm" ? model.vrm.scene : model.scene;
    const wanted = new Set(hide.map((h) => h.toLowerCase()));
    root.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) o.visible = !wanted.has(o.name.toLowerCase());
    });
  }, [model, hide]);

  useFrame((_, d) => {
    if (!model) return;
    t.current += d;
    const tx = still ? 0 : pointer.x;
    const ty = still ? 0 : pointer.y;

    if (model.kind === "vrm") {
      const { vrm } = model;
      const h = vrm.humanoid?.getNormalizedBoneNode("head");
      const chest = vrm.humanoid?.getNormalizedBoneNode("chest");

      // the same damped lead-and-follow as the procedural version, except these
      // are real bones so the neck deforms instead of the whole head rotating
      if (h) {
        h.rotation.y += (tx * 0.5 - h.rotation.y) * 0.08;
        h.rotation.x += (-ty * 0.28 - h.rotation.x) * 0.08;
      }
      if (chest) {
        chest.rotation.y += (tx * 0.16 - chest.rotation.y) * 0.06;
      }

      if (!still) {
        const bob = Math.sin(t.current * 1.5) * 0.012;
        vrm.scene.position.y = bob + (hot.current ? 0.03 : 0);
      }

      // three-vrm needs this every frame: it drives spring bones and lookAt
      vrm.update(d);
      return;
    }

    // plain glb: no bones, so the whole figure takes the tracking instead —
    // a slow turntable toward the pointer rather than a head turn
    const root = glbRoot.current;
    if (root) {
      root.rotation.y += (tx * 0.45 - root.rotation.y) * 0.06;
      root.rotation.x += (-ty * 0.1 - root.rotation.x) * 0.06;
      if (!still) {
        const bob = Math.sin(t.current * 1.5) * 0.03;
        root.position.y += (-0.12 + bob + (hot.current ? 0.06 : 0) - root.position.y) * 0.1;
      }
    }
  });

  if (!model) return null;

  return (
    <Center
      onPointerOver={(e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        hot.current = true;
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        hot.current = false;
        document.body.style.cursor = "";
      }}
      onClick={(e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        onPick();
      }}
    >
      {model.kind === "vrm" ? (
        <primitive object={model.vrm.scene} />
      ) : (
        <group ref={glbRoot} position={[0, -0.12, 0]}>
          <primitive object={model.scene} />
        </group>
      )}
    </Center>
  );
}
