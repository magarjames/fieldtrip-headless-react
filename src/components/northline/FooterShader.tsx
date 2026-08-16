import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text3D, Center, MeshTransmissionMaterial, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float u_time;
  uniform sampler2D u_texture;
  varying vec2 vUv;

  // Noise for dry brush / calligraphy effect
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    // The canvas gives us a smooth white stroke with splatters on transparent
    float brush = texture2D(u_texture, vUv).a;
    
    // High-frequency noise for paper texture / dry brush
    float noise1 = snoise(vUv * 50.0);
    float noise2 = snoise(vUv * 150.0);
    // Paper texture using noise
    float paperTexture = snoise(vUv * 100.0) * 0.5 + 0.5;
    
    // Soft spray-paint edges
    float ink = smoothstep(0.1, 0.8, brush * paperTexture * 2.0);
    
    // Grid pattern
    vec2 gridUV = vUv * vec2(40.0, 20.0);
    vec2 gridLines = fract(gridUV);
    float grid = step(0.98, gridLines.x) + step(0.98, gridLines.y);
    
    vec3 lightCobalt = vec3(0.02, 0.06, 0.16); // Dark navy blue
    vec3 gridLineColor = vec3(0.04, 0.10, 0.22); // Slightly lighter navy for grid
    vec3 baseColor = mix(lightCobalt, gridLineColor, clamp(grid, 0.0, 1.0));
    
    vec3 redSpray = vec3(0.92, 0.23, 0.18);
    vec3 inkColor = redSpray;
    
    vec3 finalColor = mix(baseColor, inkColor, ink);
    
    // Set alpha to 1.0 for 100% opacity as requested
    float alpha = 1.0;
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

function CalligraphyMesh({ pointerPos }: { pointerPos: React.MutableRefObject<{x: number, y: number, active: boolean}> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const textureRef = useRef<THREE.CanvasTexture | null>(null);
  
  const lastPoint = useRef({ x: -1000, y: -1000 });
  const velocity = useRef(0);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = size.width;
    canvas.height = size.height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctxRef.current = ctx;
    }
    canvasRef.current = canvas;
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    textureRef.current = texture;
    
    if (materialRef.current) {
      materialRef.current.uniforms.u_texture.value = texture;
    }
  }, [size]);

  const uniforms = useMemo(() => ({
    u_time: { value: 0 },
    u_texture: { value: null }
  }), []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = state.clock.elapsedTime;
    }

    if (ctxRef.current && canvasRef.current && textureRef.current) {
      const ctx = ctxRef.current;
      const w = canvasRef.current.width;
      const h = canvasRef.current.height;
      
      // Fade out cleanly without accumulating grey pixels
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.fillRect(0, 0, w, h);

      // Reset to draw
      ctx.globalCompositeOperation = 'source-over';

      const px = pointerPos.current.x;
      const py = pointerPos.current.y;
      const active = pointerPos.current.active;

      if (active) {
        if (lastPoint.current.x === -1000) {
          lastPoint.current.x = px;
          lastPoint.current.y = py;
        }

        const dx = px - lastPoint.current.x;
        const dy = py - lastPoint.current.y;
        const dist = Math.hypot(dx, dy);
        
        // Calculate velocity for brush thickness (faster = thinner line, like a real brush)
        velocity.current += (dist - velocity.current) * 0.2;
        const thickness = Math.max(8, 60 - velocity.current);

        if (dist > 0.5) {
          // Draw stroke
          ctx.beginPath();
          ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
          ctx.lineTo(px, py);
          ctx.strokeStyle = 'white';
          ctx.lineWidth = thickness;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.shadowBlur = 10;
          ctx.shadowColor = 'white';
          ctx.stroke();

          // Draw splatters based on speed
          if (Math.random() < 0.2 + (velocity.current / 150)) {
            const splatCount = Math.floor(Math.random() * 3);
            for (let i = 0; i < splatCount; i++) {
              const r = Math.random() * thickness * 1.5;
              const angle = Math.random() * Math.PI * 2;
              const sx = px + Math.cos(angle) * r;
              const sy = py + Math.sin(angle) * r;
              const sSize = Math.random() * (thickness * 0.15) + 1;
              
              ctx.beginPath();
              ctx.arc(sx, sy, sSize, 0, Math.PI * 2);
              ctx.fillStyle = 'white';
              ctx.shadowBlur = 2;
              ctx.fill();
            }
          }
        }
        
        lastPoint.current.x = px;
        lastPoint.current.y = py;
      } else {
        lastPoint.current.x = -1000;
        lastPoint.current.y = -1000;
      }

      textureRef.current.needsUpdate = true;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        ref={materialRef}
        transparent={true}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

// 3D Glass text removed for performance

export function FooterShader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerPos = useRef({ x: -1000, y: -1000, active: false });

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    pointerPos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true
    };
  };

  const handlePointerLeave = () => {
    pointerPos.current.active = false;
  };

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-auto"
      style={{ 
        backdropFilter: 'blur(32px) saturate(150%)', 
        WebkitBackdropFilter: 'blur(32px) saturate(150%)' 
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <CalligraphyMesh pointerPos={pointerPos} />
        <React.Suspense fallback={null}>
          {/* GlassText removed for performance */}
        </React.Suspense>
      </Canvas>
    </div>
  );
}
