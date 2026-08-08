import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function FloatingCore({ still }: { still: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current || still) return;

    const time = state.clock.getElapsedTime();
    group.current.rotation.y += delta * 0.2;
    group.current.rotation.x = Math.sin(time * 0.32) * 0.12;
    group.current.position.y = Math.sin(time * 0.52) * 0.1;
  });

  return (
    <group ref={group} rotation={[0.12, -0.24, 0]}>
      <ambientLight intensity={0.8} />
      <pointLight position={[2, 2, 3]} intensity={2.4} color="#d4ff66" />
      <pointLight position={[-3, -1, 1]} intensity={1.1} color="#344887" />
      <mesh>
        <icosahedronGeometry args={[1.18, 2]} />
        <meshStandardMaterial color="#111514" roughness={0.84} metalness={0.46} />
      </mesh>
      <mesh scale={1.035}>
        <icosahedronGeometry args={[1.18, 2]} />
        <meshBasicMaterial color="#c7f453" wireframe transparent opacity={0.62} />
      </mesh>
      <mesh rotation={[0.65, 0.2, 0]}>
        <torusGeometry args={[1.52, 0.014, 6, 96]} />
        <meshBasicMaterial color="#e8e7df" transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[-0.45, 1.25, 0.4]}>
        <torusGeometry args={[1.78, 0.009, 6, 96]} />
        <meshBasicMaterial color="#c7f453" transparent opacity={0.38} />
      </mesh>
    </group>
  );
}

export function NorthlineMesh({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    setMounted(true);
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setStill(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <div className={"nl-mesh " + className} aria-hidden="true">
      <div className="nl-mesh-fallback" />
      {mounted && (
        <Canvas
          className="nl-mesh-canvas"
          dpr={[1, 1.35]}
          frameloop={still ? "demand" : "always"}
          gl={{ antialias: true, powerPreference: "low-power", alpha: true }}
          camera={{ position: [0, 0, 4.4], fov: 42 }}
        >
          <FloatingCore still={still} />
        </Canvas>
      )}
    </div>
  );
}
