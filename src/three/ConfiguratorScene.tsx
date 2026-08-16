import { Canvas } from "@react-three/fiber";
import { PresentationControls } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import {
  capShape,
  centerlineBounds,
  halfRoundCenterline,
  kStyleCenterline,
  strokeToShape,
} from "./gutterProfiles";
import type { GutterProfile } from "../config/content";

type ConfiguratorSceneProps = {
  profile: GutterProfile;
  color: string;
  active?: boolean;
  maxDpr?: number;
};

const LENGTH = 1.2;

function GutterSection({
  profile,
  color,
}: {
  profile: GutterProfile;
  color: string;
}) {
  const { runGeo, capGeo } = useMemo(() => {
    const centerline =
      profile === "kstyle" ? kStyleCenterline() : halfRoundCenterline();
    const bounds = centerlineBounds(centerline);
    const ox = -bounds.center.x;
    const oy = -bounds.center.y;

    const runGeo = new THREE.ExtrudeGeometry(strokeToShape(centerline), {
      depth: LENGTH,
      bevelEnabled: false,
      steps: 1,
    });
    runGeo.translate(ox, oy, -LENGTH / 2);
    runGeo.computeVertexNormals();

    // Solid end cap on the +Z end.
    const capGeo = new THREE.ExtrudeGeometry(capShape(centerline), {
      depth: 0.014,
      bevelEnabled: false,
    });
    capGeo.translate(ox, oy, LENGTH / 2 - 0.014);
    capGeo.computeVertexNormals();

    return { runGeo, capGeo };
  }, [profile]);

  return (
    <group rotation={[0.35, -0.5, 0]} scale={3.4}>
      {/* Painted aluminum → low metalness so color reads true without an env map. */}
      <mesh geometry={runGeo}>
        <meshStandardMaterial
          color={color}
          metalness={0.18}
          roughness={0.48}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh geometry={capGeo}>
        <meshStandardMaterial
          color={color}
          metalness={0.18}
          roughness={0.48}
        />
      </mesh>
    </group>
  );
}

export default function ConfiguratorScene({
  profile,
  color,
  active = true,
  maxDpr = 2,
}: ConfiguratorSceneProps) {
  return (
    <Canvas
      dpr={[1, maxDpr]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0.2, 3.2], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
    >
      {/* Three-point studio lighting — no network HDR/Environment. */}
      <ambientLight intensity={0.5} color="#e6f2fb" />
      {/* key */}
      <directionalLight position={[3, 4, 3]} intensity={1.6} color="#ffffff" />
      {/* fill */}
      <directionalLight
        position={[-4, 1, 2]}
        intensity={0.5}
        color="#bcd6ea"
      />
      {/* rim / back */}
      <directionalLight
        position={[0, 2, -4]}
        intensity={0.8}
        color="#2fb1e8"
      />

      {/* No `snap` — the section keeps whatever angle the visitor leaves it at.
          Full azimuth so the profile can be inspected from every side. */}
      <PresentationControls
        global
        cursor
        speed={1.2}
        polar={[-0.6, 0.6]}
        azimuth={[-Math.PI, Math.PI]}
      >
        <GutterSection profile={profile} color={color} />
      </PresentationControls>
    </Canvas>
  );
}
