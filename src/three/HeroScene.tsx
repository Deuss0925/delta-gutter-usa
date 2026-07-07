import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import {
  kStyleCenterline,
  strokeToShape,
} from "./gutterProfiles";

type HeroSceneProps = {
  /** Rain particle budget — lower on mobile. */
  rainCount?: number;
  /** Cap device pixel ratio for perf. */
  maxDpr?: number;
  /** Enable pointer parallax (off for touch). */
  parallax?: boolean;
  /** Pause the render loop when the hero is scrolled out of view. */
  active?: boolean;
};

const GUTTER_LENGTH = 2.6;
const RIG_SCALE = 5;

/* ----------------------------- Geometry pieces ---------------------------- */

function GutterRun() {
  const geo = useMemo(() => {
    const shape = strokeToShape(kStyleCenterline());
    const g = new THREE.ExtrudeGeometry(shape, {
      depth: GUTTER_LENGTH,
      bevelEnabled: false,
      steps: 1,
    });
    g.translate(-0.065, 0, -GUTTER_LENGTH / 2);
    g.computeVertexNormals();
    return g;
  }, []);

  return (
    <mesh geometry={geo} castShadow receiveShadow>
      <meshStandardMaterial
        color="#b9c4cc"
        metalness={0.6}
        roughness={0.35}
        flatShading
      />
    </mesh>
  );
}

function WaterInGutter() {
  const ref = useRef<THREE.MeshStandardMaterial>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.emissiveIntensity =
      0.9 + Math.sin(state.clock.elapsedTime * 2.2) * 0.25;
  });
  return (
    <mesh position={[0, 0.03, 0]}>
      <boxGeometry args={[0.1, 0.012, GUTTER_LENGTH * 0.98]} />
      <meshStandardMaterial
        ref={ref}
        color="#2fb1e8"
        emissive="#2fb1e8"
        emissiveIntensity={1}
        transparent
        opacity={0.85}
        roughness={0.1}
        metalness={0}
      />
    </mesh>
  );
}

function Downspout() {
  return (
    <group>
      {/* vertical run */}
      <mesh position={[0.055, -0.5, GUTTER_LENGTH / 2 - 0.06]} castShadow>
        <boxGeometry args={[0.055, 1.05, 0.038]} />
        <meshStandardMaterial
          color="#b9c4cc"
          metalness={0.6}
          roughness={0.35}
          flatShading
        />
      </mesh>
      {/* elbow at the bottom that kicks water away from the base */}
      <mesh
        position={[0.11, -1.0, GUTTER_LENGTH / 2 - 0.06]}
        rotation={[0, 0, -Math.PI / 3.2]}
        castShadow
      >
        <boxGeometry args={[0.05, 0.16, 0.038]} />
        <meshStandardMaterial
          color="#b9c4cc"
          metalness={0.6}
          roughness={0.35}
          flatShading
        />
      </mesh>
    </group>
  );
}

/** A few emissive droplets thrown out of the downspout, away from the wall. */
function DownspoutOutflow() {
  const N = 7;
  const ref = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(
    () => Array.from({ length: N }, (_, i) => i / N),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    for (let i = 0; i < N; i++) {
      const phase = (t * 0.9 + seeds[i]) % 1;
      const x = 0.14 + phase * 0.42; // travels away from the base (+X)
      const y = -1.06 - phase * phase * 0.5; // arcs down
      const z = GUTTER_LENGTH / 2 - 0.06;
      dummy.position.set(x, y, z);
      const s = 0.02 * (1 - phase * 0.5);
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, N]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial
        color="#2fb1e8"
        emissive="#2fb1e8"
        emissiveIntensity={1.4}
        transparent
        opacity={0.9}
      />
    </instancedMesh>
  );
}

function HouseCorner() {
  return (
    <group>
      {/* fascia board the gutter mounts to */}
      <mesh position={[-0.02, 0.09, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.03, 0.14, GUTTER_LENGTH]} />
        <meshStandardMaterial color="#0d3a54" roughness={0.9} flatShading />
      </mesh>
      {/* roof plane, sloping up and back */}
      <mesh
        position={[-0.35, 0.42, 0]}
        rotation={[0, 0, Math.PI / 5]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.9, 0.04, GUTTER_LENGTH + 0.2]} />
        <meshStandardMaterial color="#082033" roughness={0.85} flatShading />
      </mesh>
      {/* thin shadow-line under the roof edge */}
      <mesh position={[-0.03, 0.17, 0]}>
        <boxGeometry args={[0.02, 0.02, GUTTER_LENGTH]} />
        <meshStandardMaterial color="#04141f" roughness={1} />
      </mesh>
    </group>
  );
}

function Rain({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null!);
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 1] = Math.random() * 6 - 0.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      velocities[i] = 3 + Math.random() * 3;
    }
    return { positions, velocities };
  }, [count]);

  useFrame((_, delta) => {
    const p = ref.current.geometry.attributes.position.array as Float32Array;
    const dt = Math.min(delta, 0.05);
    for (let i = 0; i < count; i++) {
      p[i * 3 + 1] -= velocities[i] * dt;
      p[i * 3] += 0.4 * dt; // wind drift
      if (p[i * 3 + 1] < -0.6) {
        p[i * 3 + 1] = 5.5;
        p[i * 3] = (Math.random() - 0.5) * 6;
        p[i * 3 + 2] = (Math.random() - 0.5) * 4;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#9bd8f2"
        size={0.028}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.15, 0]} receiveShadow>
      <planeGeometry args={[14, 14]} />
      <meshStandardMaterial color="#061f2e" roughness={1} />
    </mesh>
  );
}

/* ------------------------------- Camera rig ------------------------------- */

function CameraRig({ parallax }: { parallax: boolean }) {
  const { camera } = useThree();
  const pointer = useRef({ x: 0, y: 0 });
  const base = useMemo(() => new THREE.Vector3(1.6, 1.1, 4.2), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const px = parallax ? pointer.current.x : 0;
    const py = parallax ? pointer.current.y : 0;
    const idleX = Math.sin(t * 0.35) * 0.12;
    const idleY = Math.cos(t * 0.28) * 0.08;

    const targetX = base.x + px * 0.6 + idleX;
    const targetY = base.y + py * 0.4 + idleY;
    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (targetY - camera.position.y) * 0.04;
    camera.position.z += (base.z - camera.position.z) * 0.04;
    camera.lookAt(0.1, 0.1, 0);
  });

  // Track pointer relative to viewport center.
  useMemo(() => {
    if (!parallax || typeof window === "undefined") return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [parallax]);

  return null;
}

/* --------------------------------- Scene ---------------------------------- */

export default function HeroScene({
  rainCount = 1500,
  maxDpr = 2,
  parallax = true,
  active = true,
}: HeroSceneProps) {
  return (
    <Canvas
      dpr={[1, maxDpr]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [1.6, 1.1, 4.2], fov: 42 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      shadows={false}
    >
      <color attach="background" args={["#082f45"]} />
      <fog attach="fog" args={["#082f45", 4, 11]} />

      <ambientLight intensity={0.55} color="#cfe6f3" />
      <directionalLight
        position={[-3, 4, 2]}
        intensity={1.1}
        color="#bcd6ea"
      />
      <pointLight
        position={[0.6, -0.6, 1]}
        intensity={2.2}
        distance={4}
        color="#2fb1e8"
      />

      <group scale={RIG_SCALE} position={[0, -0.4, 0]}>
        <HouseCorner />
        <GutterRun />
        <WaterInGutter />
        <Downspout />
        <DownspoutOutflow />
        <Ground />
      </group>

      <Rain count={rainCount} />
      <CameraRig parallax={parallax} />
    </Canvas>
  );
}
