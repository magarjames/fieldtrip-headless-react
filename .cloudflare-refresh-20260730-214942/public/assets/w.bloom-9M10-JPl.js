import{i as e,t}from"./jsx-runtime-DUAcabCT.js";import{T as n,g as r,u as i}from"./index-Cggakw9N.js";import{Zt as a,_ as o,a as s,rn as c,v as l}from"./react-three-fiber.esm-DVYqMTBt.js";import{a as u,t as d}from"./stage-C86yqgp4.js";import{a as f,i as p,n as m,o as h,r as g,t as _}from"./looks-BHKllm_V.js";import{i as v}from"./shaders-DrDHMxnI.js";var y=e(n()),b=t(),x=12e3,S=`
  uniform float uTime;
  uniform float uScroll;
  attribute vec3 aDir;
  attribute float aSeed;
  varying float vSeed;
  varying float vFade;

  void main(){
    vSeed = aSeed;
    vec3 p = position + aDir * uScroll * (2.6 + aSeed * 5.0);
    p.y += sin(uTime * 0.6 + aSeed * 6.28) * 0.06;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vFade = clamp(1.0 - uScroll * 0.75, 0.0, 1.0);

    gl_PointSize = (7.0 + aSeed * 6.0) * (12.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`,C=`
  precision mediump float;
  uniform vec3 uInk;
  uniform vec3 uAccent;
  varying float vSeed;
  varying float vFade;

  void main(){
    // round the square point sprite, and soften its edge
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.16, d) * vFade;

    vec3 col = mix(uInk, uAccent, step(0.88, fract(vSeed * 5.77)));
    gl_FragColor = vec4(col, a * 0.72);
  }
`;function w(){let e=(0,y.useRef)(null),t=(0,y.useRef)(null),n=u(),r=(0,y.useMemo)(()=>{let e=new a(2.2,.72,220,32),t=e.attributes.position,n=e.attributes.normal,r=new Float32Array(x*3),i=new Float32Array(x*3),s=new Float32Array(x);for(let e=0;e<x;e++){let a=Math.floor(Math.random()*t.count);r[e*3]=t.getX(a),r[e*3+1]=t.getY(a),r[e*3+2]=t.getZ(a),i[e*3]=n.getX(a),i[e*3+1]=n.getY(a),i[e*3+2]=n.getZ(a),s[e]=Math.random()}e.dispose();let c=new l;return c.setAttribute(`position`,new o(r,3)),c.setAttribute(`aDir`,new o(i,3)),c.setAttribute(`aSeed`,new o(s,1)),c},[]),i=(0,y.useMemo)(()=>({uTime:{value:0},uScroll:{value:0},uInk:{value:new c(...v.stone)},uAccent:{value:new c(...v.rust)}}),[]);return s((r,i)=>{if(e.current){let t=e.current.uniforms;t.uTime.value+=i,t.uScroll.value+=(n.current-t.uScroll.value)*.05}t.current&&(t.current.rotation.y+=i*.09)}),(0,b.jsx)(`points`,{ref:t,geometry:r,children:(0,b.jsx)(`shaderMaterial`,{ref:e,vertexShader:S,fragmentShader:C,uniforms:i,transparent:!0,depthWrite:!1})})}function T(){i();let e=_.bloom;return(0,b.jsxs)(`div`,{className:`w-bloom min-h-dvh`,children:[(0,b.jsx)(g,{look:e}),(0,b.jsx)(p,{}),(0,b.jsx)(h,{look:e,label:`${r} · Bloom`}),(0,b.jsxs)(`section`,{className:`relative h-[92vh] overflow-hidden`,children:[(0,b.jsx)(d,{camera:{position:[0,0,8.4],fov:46},fallback:(0,b.jsx)(`div`,{className:`h-full w-full bg-[radial-gradient(50%_50%_at_50%_45%,#a8a196_0%,transparent_62%),#050505] opacity-70`}),children:(0,b.jsx)(w,{})}),(0,b.jsx)(`div`,{className:`pointer-events-none absolute inset-0 flex items-end`,children:(0,b.jsxs)(`div`,{className:`mx-auto w-full max-w-[var(--shell)] px-5 pb-16 sm:px-8`,children:[(0,b.jsx)(`h1`,{className:`d max-w-[12ch] text-[clamp(2.8rem,9.5vw,8.6rem)]`,children:`Nothing left over`}),(0,b.jsxs)(`p`,{className:`mt-6 max-w-[48ch] text-[1.04rem] leading-[1.6]`,style:{color:`var(--dim)`},children:[`Overproduction is the waste. Scroll and the form comes apart;`,` `,24,` pieces is all that is ever made.`]})]})})]}),(0,b.jsx)(m,{look:e,heading:`Made once`}),(0,b.jsx)(f,{look:e,note:`react-three-fiber · 12,000 point cloud sampled off a torus knot · points escape along their own normals with uScroll`})]})}export{T as component};