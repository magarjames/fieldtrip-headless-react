import { useEffect, useState } from "react";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";

/**
 * The reference runs an enormous painterly image behind its masthead. This is
 * the equivalent built from the libraries installed this session: a live
 * WebGL gradient mesh via ShaderGradient, which renders through
 * @react-three/fiber onto a three.js canvas.
 *
 * Two things this has to get right in a TanStack Start app:
 *
 *  1. It is SSR. WebGL does not exist on the server, so the canvas only
 *     mounts after hydration. Rendering it during SSR throws.
 *  2. It is decorative. pointerEvents stays off so it never eats a click,
 *     and it is hidden from assistive tech.
 *
 * Under prefers-reduced-motion the mesh is frozen rather than removed, so the
 * composition survives but nothing moves.
 */
export function ShaderBackdrop({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setStill(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setStill(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <div className={`absolute inset-0 ${className}`} aria-hidden="true">
      {/* Painted in before hydration and behind the canvas after, so the
          masthead never flashes an empty box on a slow connection. */}
      <div className="absolute inset-0 bg-[var(--ed-ground)] [background-image:radial-gradient(120%_90%_at_20%_0%,#22303a_0%,#0f1310_60%)]" />

      {mounted && (
        <ShaderGradientCanvas
          className="!absolute inset-0"
          pointerEvents="none"
          pixelDensity={1}
          fov={40}
          lazyLoad
          powerPreference="low-power"
          style={{ position: "absolute", inset: 0 }}
        >
          <ShaderGradient
            control="props"
            type="waterPlane"
            animate={still ? "off" : "on"}
            uSpeed={0.14}
            uAmplitude={1.2}
            uDensity={1.1}
            uStrength={2.4}
            uFrequency={5.5}
            cAzimuthAngle={180}
            cPolarAngle={80}
            cDistance={3.2}
            cameraZoom={9.1}
            color1="#22303a"
            color2="#7aa5dd"
            color3="#243328"
            brightness={1.05}
            reflection={0.1}
            grain="on"
            lightType="3d"
            envPreset="city"
            positionX={0}
            positionY={0}
            positionZ={0}
            rotationX={50}
            rotationY={0}
            rotationZ={-60}
          />
        </ShaderGradientCanvas>
      )}

      {/* The reference keeps its type legible over busy artwork with a scrim.
          Same job here. */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--ed-ground)]/60 via-[var(--ed-ground)]/35 to-[var(--ed-ground)]" />
    </div>
  );
}
