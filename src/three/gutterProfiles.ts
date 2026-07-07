import * as THREE from "three";

/**
 * Gutter cross-sections as THREE.Shape, extruded along Z into a trough.
 * Profiles are defined as an OPEN centerline (the wall midline). `strokeToShape`
 * turns that centerline into a thin-walled ribbon so the extruded result is a
 * real open-top trough with visible wall thickness — water can sit inside.
 * Units are meters; a K-Style run is ~0.11 m tall.
 */

export const WALL_THICKNESS = 0.008;

/** K-Style profile: flat back (against fascia) + decorative ogee front face. */
export function kStyleCenterline(): THREE.Vector2[] {
  const W = 0.13; // width
  const H = 0.1; // height
  const v = (x: number, y: number) => new THREE.Vector2(x, y);
  return [
    v(W, H * 1.0), // front top lip
    v(W, H * 0.6), // upper front face
    v(W * 0.8, H * 0.36), // ogee curves inward (the S)
    v(W * 0.93, H * 0.14), // ogee curves back outward
    v(W * 0.72, 0.0), // bottom-front corner
    v(W * 0.18, 0.0), // bottom
    v(0.0, H * 0.16), // back lower
    v(0.0, H * 1.12), // back top (taller flat wall)
  ];
}

/** Half-Round profile: clean semicircular trough with small roll lips. */
export function halfRoundCenterline(): THREE.Vector2[] {
  const R = 0.06;
  const cx = R;
  const cy = R + 0.01;
  const pts: THREE.Vector2[] = [];
  // small outward lip on the left
  pts.push(new THREE.Vector2(cx - R - 0.008, cy + 0.02));
  const N = 22;
  for (let i = 0; i <= N; i++) {
    const a = Math.PI + (i / N) * Math.PI; // lower semicircle
    pts.push(new THREE.Vector2(cx + R * Math.cos(a), cy + R * Math.sin(a)));
  }
  // small outward lip on the right
  pts.push(new THREE.Vector2(cx + R + 0.008, cy + 0.02));
  return pts;
}

/** Builds a thin-walled ribbon polygon that follows an open centerline. */
export function strokeToShape(
  pts: THREE.Vector2[],
  thickness = WALL_THICKNESS
): THREE.Shape {
  const half = thickness / 2;
  const left: THREE.Vector2[] = [];
  const right: THREE.Vector2[] = [];

  for (let i = 0; i < pts.length; i++) {
    const prev = pts[Math.max(0, i - 1)];
    const next = pts[Math.min(pts.length - 1, i + 1)];
    const dir = new THREE.Vector2().subVectors(next, prev);
    if (dir.lengthSq() === 0) dir.set(1, 0);
    dir.normalize();
    const normal = new THREE.Vector2(-dir.y, dir.x); // left-hand normal
    left.push(
      new THREE.Vector2(
        pts[i].x + normal.x * half,
        pts[i].y + normal.y * half
      )
    );
    right.push(
      new THREE.Vector2(
        pts[i].x - normal.x * half,
        pts[i].y - normal.y * half
      )
    );
  }

  const shape = new THREE.Shape();
  shape.moveTo(left[0].x, left[0].y);
  for (let i = 1; i < left.length; i++) shape.lineTo(left[i].x, left[i].y);
  for (let i = right.length - 1; i >= 0; i--) shape.lineTo(right[i].x, right[i].y);
  shape.closePath();
  return shape;
}

/** Filled cross-section (closes across the open top) — used as a solid end cap. */
export function capShape(pts: THREE.Vector2[]): THREE.Shape {
  const shape = new THREE.Shape();
  shape.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) shape.lineTo(pts[i].x, pts[i].y);
  shape.closePath();
  return shape;
}

/** Approximate width/height of a centerline, for centering meshes. */
export function centerlineBounds(pts: THREE.Vector2[]) {
  const box = new THREE.Box2().setFromPoints(pts);
  return {
    width: box.max.x - box.min.x,
    height: box.max.y - box.min.y,
    center: box.getCenter(new THREE.Vector2()),
    box,
  };
}
