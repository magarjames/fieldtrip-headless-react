import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react";
import { useEffect, useState } from "react";

export function NorthlineAtmosphere({ className = "" }: { className?: string }) {
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
    <div className={"nl-atmosphere " + className} aria-hidden="true">
      <div className="nl-atmosphere-fallback" />
      {mounted && (
        <ShaderGradientCanvas
          className="nl-atmosphere-canvas"
          pointerEvents="none"
          pixelDensity={1}
          fov={42}
          lazyLoad
          powerPreference="low-power"
          style={{ position: "absolute", inset: 0 }}
        >
          <ShaderGradient
            control="props"
            type="waterPlane"
            animate={still ? "off" : "on"}
            uSpeed={0.11}
            uAmplitude={1.05}
            uDensity={1.25}
            uStrength={2.1}
            uFrequency={4.6}
            cAzimuthAngle={180}
            cPolarAngle={72}
            cDistance={3.3}
            cameraZoom={8.7}
            color1="#0b0f0f"
            color2="#263768"
            color3="#c7f453"
            brightness={0.82}
            reflection={0.08}
            grain="on"
            lightType="3d"
            envPreset="city"
            positionX={0}
            positionY={0}
            positionZ={0}
            rotationX={48}
            rotationY={0}
            rotationZ={-54}
          />
        </ShaderGradientCanvas>
      )}
    </div>
  );
}
