"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type BridgeElementProps = {
  isMobile: boolean;
  isAmbient: boolean;
};

type SceneCanvasProps = {
  mode?: "full" | "ambient";
};

function BridgeParticles({ isMobile, isAmbient }: BridgeElementProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors, seeds, lanes, depths, phases } = useMemo(() => {
    const count = isAmbient
      ? isMobile
        ? 900
        : 1800
      : isMobile
        ? 2200
        : 4600;
    const positionArray = new Float32Array(count * 3);
    const colorArray = new Float32Array(count * 3);
    const seedArray = new Float32Array(count);
    const laneArray = new Float32Array(count);
    const depthArray = new Float32Array(count);
    const phaseArray = new Float32Array(count);
    const palette = [
      new THREE.Color("#1e88e5"),
      new THREE.Color("#ff4d5a"),
      new THREE.Color("#ffc94a"),
      new THREE.Color("#f7f4ed"),
      new THREE.Color("#9ca3af"),
    ];

    for (let i = 0; i < count; i += 1) {
      const noise = Math.sin(i * 12.9898) * 43758.5453;
      const random = noise - Math.floor(noise);
      const t = (i / count + random * 0.18) % 1;
      const lane = Math.sin(i * 0.087) * 0.92 + (random - 0.5) * 0.8;
      const depth = (random - 0.5) * 2.8;
      const phase = random * Math.PI * 2;
      const side = (t - 0.5) * 11.2;
      const arch = Math.sin(t * Math.PI) * 2.15;
      const lift = Math.cos(phase) * 0.42;

      positionArray[i * 3] = side + lane;
      positionArray[i * 3 + 1] = arch + lift - 0.08;
      positionArray[i * 3 + 2] = depth + Math.sin(t * Math.PI * 3) * 0.72;

      const color = palette[(i + Math.floor(random * 7)) % palette.length];
      colorArray[i * 3] = color.r;
      colorArray[i * 3 + 1] = color.g;
      colorArray[i * 3 + 2] = color.b;
      seedArray[i] = t;
      laneArray[i] = lane;
      depthArray[i] = depth;
      phaseArray[i] = phase;
    }

    return {
      positions: positionArray,
      colors: colorArray,
      seeds: seedArray,
      lanes: laneArray,
      depths: depthArray,
      phases: phaseArray,
    };
  }, [isAmbient, isMobile]);

  useFrame(({ clock, pointer }) => {
    if (!pointsRef.current) return;

    const time = clock.elapsedTime * 0.3;
    const geometry = pointsRef.current.geometry;
    const attribute = geometry.getAttribute("position") as THREE.BufferAttribute;
    const array = attribute.array as Float32Array;

    for (let i = 0; i < seeds.length; i += 1) {
      const index = i * 3;
      const t = (seeds[i] + time * (isMobile ? 0.048 : 0.036)) % 1;
      const lane = lanes[i];
      const phase = phases[i];
      const arch = Math.sin(t * Math.PI) * 2.15;
      const breathing = Math.sin(t * Math.PI * 16 + time * 1.8 + phase);
      const sidePulse = Math.sin(t * Math.PI * 7 + phase + time * 0.8);

      array[index] = (t - 0.5) * 11.2 + lane * 0.72 + sidePulse * 0.2;
      array[index + 1] =
        arch +
        Math.cos(phase + time * 0.7) * 0.3 +
        breathing * (isMobile ? 0.13 : 0.09) +
        -0.08;
      array[index + 2] =
        depths[i] +
        Math.sin(t * Math.PI * 3 + phase) * 0.72 +
        Math.cos(time + phase) * 0.08;
    }

    attribute.needsUpdate = true;
    pointsRef.current.rotation.y =
      Math.sin(time * 0.2) * 0.1 + pointer.x * 0.12;
    pointsRef.current.rotation.x = -0.2 + pointer.y * 0.06;
    pointsRef.current.position.y = Math.sin(time * 0.42) * 0.08;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={isAmbient ? (isMobile ? 0.072 : 0.052) : isMobile ? 0.062 : 0.04}
        vertexColors
        transparent
        opacity={isAmbient ? 0.72 : isMobile ? 0.98 : 0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function BridgeThreads({ isMobile }: BridgeElementProps) {
  const lineRef = useRef<THREE.LineSegments>(null);

  const positions = useMemo(() => {
    const lanes = [-1.45, -0.95, -0.48, 0, 0.48, 0.95, 1.45];
    const segments = 120;
    const vertices: number[] = [];

    lanes.forEach((lane, laneIndex) => {
      for (let i = 0; i < segments; i += 1) {
        const a = i / segments;
        const b = (i + 1) / segments;

        [a, b].forEach((t) => {
          const x = (t - 0.5) * 11.2;
          const y =
            Math.sin(t * Math.PI) * (1.62 + laneIndex * 0.04) -
            0.14 +
            Math.sin(t * Math.PI * 5 + laneIndex) * 0.04;
          const z = lane + Math.sin(t * Math.PI * 2 + laneIndex) * 0.18;

          vertices.push(x, y, z);
        });
      }
    });

    return new Float32Array(vertices);
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!lineRef.current) return;
    const time = clock.elapsedTime * 0.3;

    lineRef.current.rotation.y =
      Math.sin(time * 0.2) * 0.1 + pointer.x * 0.12;
    lineRef.current.rotation.x = -0.2 + pointer.y * 0.06;
    lineRef.current.position.y = Math.sin(time * 0.35) * 0.045;
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial
        color="#f7f4ed"
        transparent
        opacity={isMobile ? 0.3 : 0.2}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

function BridgeWorld({ mode }: Required<SceneCanvasProps>) {
  const { size } = useThree();
  const isMobile = size.width < 640;
  const isAmbient = mode === "ambient";

  return (
    <group
      position={
        isAmbient
          ? isMobile
            ? [0, -0.52, 0.2]
            : [0, -0.86, 0]
          : isMobile
            ? [0, -1.0, 0.2]
            : [0, -1.18, 0]
      }
      scale={
        isAmbient
          ? isMobile
            ? 1.36
            : 1.05
          : isMobile
            ? 1.62
            : 1.28
      }
    >
      {!isAmbient && <BridgeThreads isMobile={isMobile} isAmbient={isAmbient} />}
      <BridgeParticles isMobile={isMobile} isAmbient={isAmbient} />
    </group>
  );
}

export function SceneCanvas({ mode = "full" }: SceneCanvasProps) {
  const isAmbient = mode === "ambient";
  const [isReady, setIsReady] = useState(false);

  return (
    <div className="relative h-full w-full">
      <div
        aria-hidden
        className={`particle-bridge-fallback transition-opacity duration-700 ${
          isReady ? "opacity-0" : "opacity-100"
        }`}
      >
        <span className="particle-bridge-dot" />
      </div>
      <Canvas
        camera={{ position: [0, 1.08, 6.65], fov: 42 }}
        dpr={isAmbient ? [1, 1.1] : [1, 1.15]}
        gl={{
          antialias: false,
          alpha: true,
          failIfMajorPerformanceCaveat: false,
          powerPreference: "low-power",
        }}
        onCreated={() => setIsReady(true)}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={isAmbient ? 0.8 : 0.42} />
          {!isAmbient && (
            <>
              <directionalLight position={[4, 4, 4]} intensity={0.8} />
              <pointLight position={[-4, -1, 3]} color="#ffc94a" intensity={0.8} />
            </>
          )}
          <BridgeWorld mode={mode} />
          {!isAmbient && <Environment preset="city" />}
        </Suspense>
      </Canvas>
    </div>
  );
}
