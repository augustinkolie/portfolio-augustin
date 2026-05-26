import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Center, Text3D, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler';
import { motion, AnimatePresence } from 'framer-motion';

// --- CONSTANTS ---
const PARTICLE_COUNT = 30000;
const SPHERE_RADIUS = 3.2;
const FONT_URL = "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/fonts/helvetiker_bold.typeface.json";

// --- SHADERS ---
const particleVertexShader = `
  uniform float uTime;
  attribute float size;
  attribute vec3 color;
  varying vec3 vColor;
  
  void main() {
    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    
    // Scintillation boost for visibility
    float scintillate = 0.85 + 0.4 * sin(uTime * 6.0 + position.x * 5.0 + position.y * 3.0);
    
    gl_PointSize = size * scintillate * (550.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const particleFragmentShader = `
  varying vec3 vColor;
  
  float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  void main() {
    float r = distance(gl_PointCoord, vec2(0.5));
    if (r > 0.5) discard;
    
    float noise = random(gl_PointCoord);
    float alpha = (1.0 - (r * 2.0)) * (0.75 + 0.25 * noise);
    alpha = pow(alpha, 1.2);
    
    gl_FragColor = vec4(vColor, alpha);
  }
`;

const ParticleSystem = ({ stage, progress }) => {
  const pointsRef = useRef();
  const [targetPositions, setTargetPositions] = useState(null);
  const { viewport } = useThree();
  const scale = viewport.width < 10 ? 0.6 : 1.1;

  const sphereData = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const phi = Math.acos(-1 + (2 * i) / PARTICLE_COUNT);
        const theta = Math.sqrt(PARTICLE_COUNT * Math.PI) * phi;
        pos[i * 3] = SPHERE_RADIUS * Math.cos(theta) * Math.sin(phi);
        pos[i * 3 + 1] = SPHERE_RADIUS * Math.sin(theta) * Math.sin(phi);
        pos[i * 3 + 2] = SPHERE_RADIUS * Math.cos(phi);
    }
    return pos;
  }, []);

  const explosionData = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 15 + Math.random() * 20;
        pos[i * 3] = Math.cos(angle) * radius;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
        pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  const [textCenter, setTextCenter] = useState(new THREE.Vector3(0, 0, 0));

  const handleTextReady = (mesh) => {
    if (!mesh || !mesh.geometry) return;
    const geometry = mesh.geometry;
    geometry.computeBoundingBox();
    const box = geometry.boundingBox;
    const center = new THREE.Vector3();
    box.getCenter(center);
    setTextCenter(center);

    try {
        const sampler = new MeshSurfaceSampler(mesh).build();
        const pos = new Float32Array(PARTICLE_COUNT * 3);
        const tempP = new THREE.Vector3();
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            sampler.sample(tempP);
            pos[i * 3] = tempP.x;
            pos[i * 3 + 1] = tempP.y;
            pos[i * 3 + 2] = tempP.z;
        }
        setTargetPositions(pos);
    } catch (e) {
        console.error("Sampler Error:", e);
    }
  };

  const positions = useMemo(() => new Float32Array(sphereData), [sphereData]);
  const colors = useMemo(() => {
    const c = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        c[i * 3] = 1.0; c[i * 3 + 1] = 0.05; c[i * 3 + 2] = 0.7;
    }
    return c;
  }, []);
  const sizes = useMemo(() => {
    const s = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) s[i] = Math.random() * 0.07 + 0.02;
    return s;
  }, []);

  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    uniforms.uTime.value = time;

    const posAttr = pointsRef.current.geometry.attributes.position;
    const colorAttr = pointsRef.current.geometry.attributes.color;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      let tX, tY, tZ, cR, cG, cB;

      if (stage === 'sphere') {
        const vibration = Math.sin(time * 8 + i) * 0.04;
        let cY = 0;
        if (progress > 0.85) {
            const cavity = (progress - 0.85) * 6.0;
            if (sphereData[i * 3 + 1] < -1.2) cY = -cavity * 2.0;
        }
        tX = (sphereData[i * 3] + vibration) * scale;
        tY = (sphereData[i * 3 + 1] + vibration + cY) * scale;
        tZ = (sphereData[i * 3 + 2] + vibration) * scale;

        if (progress < 0.5) {
            const t = progress * 2.0;
            cR = 1.0; cG = THREE.MathUtils.lerp(0.05, 0.45, t); cB = THREE.MathUtils.lerp(0.7, 0.0, t);
        } else {
            const t = (progress - 0.5) * 2.0;
            cR = 1.0; cG = THREE.MathUtils.lerp(0.45, 0.85, t); cB = THREE.MathUtils.lerp(0.0, 0.1, t);
        }
      } 
      else if (stage === 'exploded' || (stage === 'text' && !targetPositions)) {
        tX = explosionData[i * 3] * scale;
        tY = explosionData[i * 3 + 1] * scale;
        tZ = explosionData[i * 3 + 2] * scale;
        cR = 1.0; cG = 0.85; cB = 0.2;
      } 
      else if (stage === 'text' && targetPositions) {
        const goalX = (targetPositions[i * 3] - textCenter.x) * scale;
        const goalY = (targetPositions[i * 3 + 1] - textCenter.y) * scale;
        const goalZ = targetPositions[i * 3 + 2] * scale;

        const charOrder = Math.max(0, Math.min(1, (progress * 1.8) - (targetPositions[i * 3] / 15)));
        
        if (charOrder <= 0) {
            tX = explosionData[i * 3] * scale;
            tY = explosionData[i * 3 + 1] * scale;
            tZ = explosionData[i * 3 + 2] * scale;
            cR = 1.0; cG = 0.85; cB = 0.2;
        } else {
            tX = goalX; tY = goalY; tZ = goalZ;
            // Silver / Metallic palette
            const silverBase = 0.75 + Math.sin(i + time) * 0.1;
            cR = silverBase;
            cG = silverBase;
            cB = silverBase + 0.05; // Slightly cooler silver
        }
      }

      const lerpSpeed = stage === 'exploded' ? 0.015 : 0.08;
      posAttr.array[i * 3] += (tX - posAttr.array[i * 3]) * lerpSpeed;
      posAttr.array[i * 3 + 1] += (tY - posAttr.array[i * 3 + 1]) * lerpSpeed;
      posAttr.array[i * 3 + 2] += (tZ - posAttr.array[i * 3 + 2]) * lerpSpeed;

      colorAttr.array[i * 3] += (cR - colorAttr.array[i * 3]) * 0.1;
      colorAttr.array[i * 3 + 1] += (cG - colorAttr.array[i * 3 + 1]) * 0.1;
      colorAttr.array[i * 3 + 2] += (cB - colorAttr.array[i * 3 + 2]) * 0.1;
    }

    posAttr.needsUpdate = true;
    colorAttr.needsUpdate = true;
    
    if (stage === 'sphere') pointsRef.current.rotation.y += 0.003;
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={PARTICLE_COUNT} array={colors} itemSize={3} />
          <bufferAttribute attach="attributes-size" count={PARTICLE_COUNT} array={sizes} itemSize={1} />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={particleVertexShader}
          fragmentShader={particleFragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <Text3D 
        font={FONT_URL} 
        size={3.5} 
        height={0.5} 
        onUpdate={handleTextReady} 
        visible={false}
        bevelEnabled
        bevelThickness={0.1}
        bevelSize={0.05}
      >
          Augustin
      </Text3D>
    </>
  );
};

const LoadingBarUI = ({ progress }) => {
    return (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[85%] max-w-sm flex flex-col items-center">
            <div className="relative w-full h-[8px] bg-white/5 rounded-full overflow-hidden border border-white/10 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                <motion.div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-600 via-blue-500 to-cyan-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ type: "spring", stiffness: 40, damping: 15 }}
                >
                    <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-24 h-full"
                        animate={{ x: ['-200%', '300%'] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                    />
                </motion.div>
            </div>
            <div className="mt-4 flex justify-between w-full px-2">
                <span className="text-[10px] font-mono tracking-[0.4em] text-cyan-400/70 uppercase">Initializing...</span>
                <span className="text-[13px] font-mono text-cyan-400 font-bold drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">
                    {Math.round(progress)}%
                </span>
            </div>
        </div>
    );
};

const Preloader = ({ onFinish }) => {
  const [stage, setStage] = useState('sphere');
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let t;
    if (stage === 'sphere') {
        const i = setInterval(() => {
            setProgress(p => {
                if (p >= 1) {
                    clearInterval(i);
                    setStage('exploded');
                    t = setTimeout(() => { setStage('text'); setProgress(0); }, 800);
                    return 1;
                }
                return p + 0.009;
            });
        }, 16);
        return () => { clearInterval(i); clearTimeout(t); };
    } else if (stage === 'text') {
        const i = setInterval(() => {
            setProgress(p => {
                if (p >= 1) {
                    clearInterval(i);
                    setTimeout(() => {
                        setIsDone(true);
                        if (onFinish) onFinish();
                    }, 2500);
                    return 1;
                }
                return p + 0.014;
            });
        }, 16);
        return () => clearInterval(i);
    }
  }, [stage, onFinish]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 2.5 } }}
          className="fixed inset-0 z-[100000] bg-[#000000] flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 w-full h-full">
            <Canvas>
              <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={50} />
              <color attach="background" args={['#000000']} />
              <ambientLight intensity={0.6} />
              <pointLight position={[0, 0, 15]} intensity={3} color="#ffffff" />
              <ParticleSystem stage={stage} progress={progress} />
            </Canvas>
          </div>

          {/* New "Welcome" Typewriter Text */}
          {stage === 'text' && (
            <div className="absolute top-[28%] left-1/2 -translate-x-1/2 flex gap-[0.2em] pointer-events-none w-full justify-center">
              {"Bienvenue dans l'univers de".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: i * 0.08, 
                    duration: 0.4,
                    ease: "easeOut"
                  }}
                  className="text-orange-500 text-lg md:text-xl font-light tracking-[0.3em] uppercase"
                  style={{ color: '#EA580C', textShadow: '0 0 10px rgba(234, 88, 12, 0.3)' }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>
          )}

          <LoadingBarUI progress={progress * 100} />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)] shadow-[inset_0_0_150px_rgba(0,0,0,1)]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
